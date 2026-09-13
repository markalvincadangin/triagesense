import React, { useState } from 'react';
import { useTriage } from '../../context/TriageContext';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { FormInput } from '../../components/common/FormInput';
import { KioskFooterNav } from '../../components/kiosk/KioskFooterNav';
import {
  User,
  Calendar,
  Phone,
  Mic,
  MicOff,
  AlertCircle,
  Keyboard
} from 'lucide-react';
import { KioskKeyboard } from '../../components/kiosk/KioskKeyboard';

export function PatientInfo() {
  const {
    intakeDraft,
    updateDraftPatientInfo,
    setKioskStep,
    kioskLanguage,
    t
  } = useTriage();

  const patient = intakeDraft.patientInfo || {};
  const [errorMsg, setErrorMsg] = useState('');
  const [isDictating, setIsDictating] = useState(false);
  const [activeField, setActiveField] = useState('fullName'); // Default to full name for immediate virtual keyboard readiness

  // Clinical Date of Birth Mask (YYYY-MM-DD)
  const formatDobMask = (val) => {
    if (!val) return '';
    const digits = val.replace(/\D/g, '').slice(0, 8);
    if (digits.length <= 4) return digits;
    if (digits.length <= 6) return `${digits.slice(0, 4)}-${digits.slice(4)}`;
    return `${digits.slice(0, 4)}-${digits.slice(4, 6)}-${digits.slice(6)}`;
  };

  // Philippine Mobile Phone Mask (09XX-XXX-XXXX)
  const formatPhoneMask = (val) => {
    if (!val) return '';
    const digits = val.replace(/\D/g, '').slice(0, 11);
    if (digits.length <= 4) return digits;
    if (digits.length <= 7) return `${digits.slice(0, 4)}-${digits.slice(4)}`;
    return `${digits.slice(0, 4)}-${digits.slice(4, 7)}-${digits.slice(7)}`;
  };

  // Virtual Keyboard event handlers
  const handleKeyPress = (char) => {
    if (!activeField) return;
    if (errorMsg) setErrorMsg('');

    if (activeField === 'fullName') {
      updateDraftPatientInfo({ fullName: (patient.fullName || '') + char });
    } else if (activeField === 'contact') {
      const raw = (patient.contact || '') + char;
      updateDraftPatientInfo({ contact: formatPhoneMask(raw) });
    } else if (activeField === 'dob') {
      const raw = (patient.dob || '') + char;
      updateDraftPatientInfo({ dob: formatDobMask(raw) });
    }
  };

  const handleBackspace = () => {
    if (!activeField) return;
    if (activeField === 'fullName') {
      const current = patient.fullName || '';
      updateDraftPatientInfo({ fullName: current.slice(0, -1) });
    } else if (activeField === 'contact') {
      const digits = (patient.contact || '').replace(/\D/g, '');
      const newDigits = digits.slice(0, -1);
      updateDraftPatientInfo({ contact: formatPhoneMask(newDigits) });
    } else if (activeField === 'dob') {
      const digits = (patient.dob || '').replace(/\D/g, '');
      const newDigits = digits.slice(0, -1);
      updateDraftPatientInfo({ dob: formatDobMask(newDigits) });
    }
  };

  const handleClear = () => {
    if (!activeField) return;
    if (activeField === 'fullName') {
      updateDraftPatientInfo({ fullName: '' });
    } else if (activeField === 'contact') {
      updateDraftPatientInfo({ contact: '' });
    } else if (activeField === 'dob') {
      updateDraftPatientInfo({ dob: '' });
    }
  };

  const handleNextField = () => {
    if (activeField === 'fullName') {
      setActiveField('dob');
    } else if (activeField === 'dob') {
      setActiveField('contact');
    } else {
      setActiveField(null);
    }
  };

  // Auto calculate age from DOB with strict clinical validation gating
  const calculateAge = (dobString) => {
    if (!dobString) return null;
    // Strict ISO date format: exactly YYYY-MM-DD (10 characters)
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dobString.trim());
    if (!match) return null;

    const year = parseInt(match[1], 10);
    const month = parseInt(match[2], 10);
    const day = parseInt(match[3], 10);

    const today = new Date();
    const currentYear = today.getFullYear();

    // Clinical sanity boundaries (1900 to current year, valid calendar month/day)
    if (year < 1900 || year > currentYear) return null;
    if (month < 1 || month > 12) return null;
    if (day < 1 || day > 31) return null;

    const birthDate = new Date(year, month - 1, day);
    // Ensure day didn't roll over (e.g. Feb 31 -> March 3)
    if (birthDate.getFullYear() !== year || birthDate.getMonth() !== month - 1 || birthDate.getDate() !== day) {
      return null;
    }

    if (birthDate > today) return null;

    let age = currentYear - year;
    const monthDiff = today.getMonth() - (month - 1);
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < day)) {
      age--;
    }

    // Only render age badge for clinically plausible human ages (0 to 125)
    return age >= 0 && age <= 125 ? age : null;
  };

  const calculatedAge = calculateAge(patient.dob);

  // Web Speech API for Hands-Free Demographic Entry
  const handleVoiceDictate = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Speech recognition is not supported on this browser device.');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = kioskLanguage === 'hil' ? 'fil-PH' : kioskLanguage === 'fil' ? 'fil-PH' : 'en-US';

    if (!isDictating) {
      setIsDictating(true);
      recognition.start();

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          updateDraftPatientInfo({ fullName: transcript });
        }
        setIsDictating(false);
      };

      recognition.onerror = () => setIsDictating(false);
      recognition.onend = () => setIsDictating(false);
    } else {
      setIsDictating(false);
    }
  };

  // Auto-scroll handler to ensure input visibility when OSK docks
  const handleInputFocus = (e) => {
    setTimeout(() => {
      e.target?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 150);
  };

  const handleNext = () => {
    if (!patient.fullName || patient.fullName.trim().length === 0) {
      setErrorMsg(t('patientInfo.errorEmptyName'));
      return;
    }
    if (!patient.dob) {
      setErrorMsg(t('patientInfo.errorInvalidDob'));
      return;
    }
    const dobDate = new Date(patient.dob);
    const today = new Date();
    if (isNaN(dobDate.getTime()) || dobDate > today || dobDate.getFullYear() < 1900) {
      setErrorMsg(t('patientInfo.errorInvalidDob'));
      return;
    }
    if (!patient.gender) {
      setErrorMsg(t('patientInfo.errorEmptyGender'));
      return;
    }
    setErrorMsg('');
    setKioskStep('symptoms');
  };

  return (
    <div className="flex flex-col h-full px-12 py-8 bg-canvas select-none font-sans overflow-y-auto">
      {/* 1. Header Prompt */}
      <div className="text-center mb-6 shrink-0">
        <h1 className="text-4xl font-black text-text-primary tracking-tight">
          {t('patientInfo.stepTitle')}
        </h1>
        <h2 className="text-xl font-bold text-text-secondary mt-2">
          {t('patientInfo.stepSubtitle')}
        </h2>
      </div>

      {/* 2. Main Accessible Form Card (Card variant="kiosk") */}
      <Card variant="kiosk" className="w-full max-w-[960px] mx-auto p-10 gap-7">
        {/* Full Name Input with Speech-to-Text Voice Dictation */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="flex items-center gap-2 text-xl font-black text-text-primary">
              <User size={22} className="text-brand-green" />
              <span>{t('patientInfo.fullNameLabel')}</span>
              <span className="text-sm font-bold text-emergency">*{t('common.required')}</span>
            </label>

            {/* Voice Dictate Accessibility Button */}
            <button
              type="button"
              onClick={handleVoiceDictate}
              className={`flex items-center gap-2.5 h-12 min-h-[48px] px-5 rounded-full text-base font-black border-2 transition-all cursor-pointer shadow-sm active:scale-95 ${
                isDictating
                  ? 'bg-red-50 border-emergency text-emergency-dark animate-pulse ring-2 ring-red-200'
                  : 'bg-brand-green-light border-emerald-300 text-brand-green hover:bg-emerald-100'
              }`}
            >
              {isDictating ? <MicOff size={20} className="shrink-0" /> : <Mic size={20} className="shrink-0" />}
              <span>{isDictating ? t('patientInfo.voiceListening') : t('patientInfo.voiceDictate')}</span>
            </button>
          </div>

          <FormInput
            size="kiosk"
            placeholder={t('patientInfo.fullNamePlaceholder')}
            value={patient.fullName || ''}
            error={errorMsg && (!patient.fullName || patient.fullName.trim().length === 0) ? errorMsg : ''}
            inputClassName={activeField === 'fullName' ? 'border-brand-green ring-4 ring-emerald-500/25 bg-emerald-50/20' : ''}
            onFocus={() => {
              setActiveField('fullName');
              handleInputFocus();
            }}
            onClick={() => setActiveField('fullName')}
            onChange={(e) => {
              updateDraftPatientInfo({ fullName: e.target.value });
              if (errorMsg) setErrorMsg('');
            }}
          />
        </div>

        {/* Date of Birth & Gender */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <div className="flex items-center justify-between mb-2 text-xl font-black text-text-primary">
              <span className="flex items-center gap-2">
                <Calendar size={22} className="text-brand-green" />
                <span>{t('patientInfo.dobLabel')}</span>
                <span className="text-sm font-bold text-emergency">*{t('common.required')}</span>
              </span>
              {calculatedAge !== null && (
                <span className="text-sm font-black text-brand-green bg-brand-green-light px-3 py-0.5 rounded-full border border-emerald-300">
                  {calculatedAge} {t('common.yearsOld')}
                </span>
              )}
            </div>

            <FormInput
              type="text"
              inputMode="numeric"
              size="kiosk"
              placeholder={t('patientInfo.dobPlaceholder') || 'YYYY-MM-DD'}
              maxLength={10}
              value={patient.dob || ''}
              inputClassName={`font-mono tracking-wider ${
                activeField === 'dob' ? 'border-brand-green ring-4 ring-emerald-500/25 bg-emerald-50/20' : ''
              }`}
              onFocus={() => {
                setActiveField('dob');
                handleInputFocus();
              }}
              onClick={() => setActiveField('dob')}
              onChange={(e) => {
                updateDraftPatientInfo({ dob: formatDobMask(e.target.value) });
                if (errorMsg) setErrorMsg('');
              }}
            />
          </div>

          {/* Gender Selection Chips */}
          <div>
            <div className="flex items-center gap-2 mb-2 text-xl font-black text-text-primary">
              <span>{t('patientInfo.genderLabel')}</span>
              <span className="text-sm font-bold text-emergency">*{t('common.required')}</span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {['Male', 'Female', 'Other'].map((g) => {
                const isSelected = (patient.gender || 'Male') === g;
                const genderLabel =
                  g === 'Male'
                    ? t('patientInfo.genderMale')
                    : g === 'Female'
                    ? t('patientInfo.genderFemale')
                    : t('patientInfo.genderOther');

                return (
                  <button
                    key={g}
                    type="button"
                    onClick={() => {
                      updateDraftPatientInfo({ gender: g });
                      if (errorMsg) setErrorMsg('');
                    }}
                    className={`h-[72px] rounded-2xl border-2 text-xl font-black transition-all cursor-pointer flex items-center justify-center ${
                      isSelected
                        ? 'bg-brand-green border-brand-green text-white shadow-md ring-2 ring-emerald-200'
                        : 'bg-canvas border-border-main text-text-primary hover:border-border-hover'
                    }`}
                  >
                    <span>{genderLabel}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Contact Phone Number */}
        <div>
          <label className="flex items-center gap-2 mb-2 text-xl font-black text-text-primary">
            <Phone size={22} className="text-brand-green" />
            <span>{t('patientInfo.contactLabel')}</span>
          </label>
          <FormInput
            type="tel"
            inputMode="numeric"
            size="kiosk"
            placeholder={t('patientInfo.contactPlaceholder')}
            maxLength={13}
            value={patient.contact || ''}
            inputClassName={activeField === 'contact' ? 'border-brand-green ring-4 ring-emerald-500/25 bg-emerald-50/20' : ''}
            onFocus={() => {
              setActiveField('contact');
              handleInputFocus();
            }}
            onClick={() => setActiveField('contact')}
            onChange={(e) => updateDraftPatientInfo({ contact: formatPhoneMask(e.target.value) })}
          />
        </div>

        {/* Validation Error Message */}
        {errorMsg && (
          <div className="p-4 rounded-xl bg-red-50 border border-emergency-border text-emergency-dark text-sm font-bold flex items-center gap-2.5 animate-shake">
            <AlertCircle size={20} className="text-emergency shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}
      </Card>

      {/* 3. Dedicated Touchscreen Virtual Keyboard (Occupying Lower Void) */}
      <div className="w-full my-auto py-2 shrink-0">
        {activeField ? (
          <KioskKeyboard
            activeField={activeField}
            onKeyPress={handleKeyPress}
            onBackspace={handleBackspace}
            onClear={handleClear}
            onNextField={handleNextField}
            onClose={() => setActiveField(null)}
          />
        ) : (
          <div className="flex justify-center py-2">
            <button
              type="button"
              onClick={() => setActiveField('fullName')}
              className="flex items-center gap-2.5 h-14 px-8 rounded-full bg-white hover:bg-slate-50 border-2 border-slate-300 text-slate-800 text-base font-black shadow-sm transition-all cursor-pointer active:scale-95"
            >
              <Keyboard size={22} className="text-brand-green" />
              <span>{t('keyboard.show')}</span>
            </button>
          </div>
        )}
      </div>

      {/* 4. Bottom Navigation Controls (Standardized Reusable KioskFooterNav) */}
      <KioskFooterNav
        onBack={() => setKioskStep('welcome')}
        backLabel={t('patientInfo.btnBack')}
        onNext={handleNext}
        nextLabel={t('patientInfo.btnNext')}
      />
    </div>
  );
}
