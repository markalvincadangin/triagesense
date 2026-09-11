import React, { useState } from 'react';
import { useTriage } from '../../context/TriageContext';
import { Button } from '../../components/common/Button';
import {
  User,
  Calendar,
  Phone,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Mic,
  MicOff,
  QrCode,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export function PatientInfo() {
  const {
    intakeDraft,
    updateDraft,
    updateDraftPatientInfo,
    setKioskStep,
    kioskLanguage
  } = useTriage();

  const [errorMsg, setErrorMsg] = useState('');
  const [isDictating, setIsDictating] = useState(false);
  const [scanFeedback, setScanFeedback] = useState(false);

  const patient = intakeDraft.patientInfo || {};

  // Compute age from date of birth
  const computeAge = (dobString) => {
    if (!dobString) return null;
    const birthDate = new Date(dobString);
    if (isNaN(birthDate.getTime())) return null;
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age >= 0 ? age : null;
  };

  const calculatedAge = computeAge(patient.dob);

  // Web Speech API Voice Dictation
  const handleVoiceDictate = () => {
    if (!isDictating) {
      setIsDictating(true);
      if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.lang = kioskLanguage === 'hil' ? 'fil-PH' : kioskLanguage === 'fil' ? 'fil-PH' : 'en-US';
        recognition.onresult = (e) => {
          const transcript = e.results[0][0].transcript;
          updateDraftPatientInfo({ fullName: transcript });
          setIsDictating(false);
          setErrorMsg('');
        };
        recognition.onerror = () => setIsDictating(false);
        recognition.onend = () => setIsDictating(false);
        recognition.start();
      } else {
        // Fallback simulation
        setTimeout(() => {
          updateDraftPatientInfo({ fullName: 'Ramon S. Gonzales' });
          setIsDictating(false);
          setErrorMsg('');
        }, 1500);
      }
    } else {
      setIsDictating(false);
    }
  };

  const handleSimulateScan = () => {
    setScanFeedback(true);
    updateDraft({ identification: 'PhilHealth QR' });
    updateDraftPatientInfo({
      fullName: 'Maria Elena C. Lopez',
      dob: '1978-08-14',
      gender: 'Female',
      contact: '0917-882-9014'
    });
    setErrorMsg('');
    setTimeout(() => {
      setScanFeedback(false);
    }, 1200);
  };

  const handleDemoFill = () => {
    updateDraft({ identification: 'Hospital ID' });
    updateDraftPatientInfo({
      fullName: 'Juan Dela Cruz',
      dob: '1956-04-12',
      gender: 'Male',
      contact: '0917-555-0192'
    });
    setErrorMsg('');
  };

  const handleNext = () => {
    if (!patient.fullName || patient.fullName.trim().length === 0) {
      setErrorMsg(
        kioskLanguage === 'hil'
          ? 'Palihog isulat ang imo ngalan ukon gamita ang mikropono para magpadayon.'
          : 'Please enter patient name or tap the microphone to dictate.'
      );
      return;
    }
    setErrorMsg('');
    setKioskStep('symptoms');
  };

  return (
    <div className="flex flex-col h-full px-12 py-8 bg-canvas select-none font-sans">
      
      {/* 1. Header Prompt */}
      <div className="text-center mb-6 shrink-0">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          {kioskLanguage === 'hil'
            ? 'Tikang 1: Sin-o ang magapabulong subong?'
            : 'Step 1 of 5: Who is checking in today?'}
        </h1>
        <h2 className="text-base font-semibold text-slate-600 mt-1">
          {kioskLanguage === 'hil'
            ? 'Palihog isulat ang imo ngalan kag kaadlawan agud mabuligan ka gilayon sang nurse'
            : 'Please enter your name and birthday so the nurse can prepare your record'}
        </h2>
      </div>

      {/* 2. Main Accessible Form Card */}
      <div className="w-full max-w-3xl mx-auto bg-white p-8 rounded-3xl border border-slate-200 shadow-md flex flex-col gap-6">
        
        {/* Full Name Input with Speech-to-Text Voice Dictation */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="flex items-center gap-2 text-base font-extrabold text-slate-900">
              <User size={18} className="text-[#006B3F]" />
              <span>Full Name (First, Middle, Last) / Bug-os nga Ngalan:</span>
              <span className="text-xs font-bold text-red-600">*Required</span>
            </label>
            
            {/* Voice Dictate Accessibility Button */}
            <button
              type="button"
              onClick={handleVoiceDictate}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${
                isDictating
                  ? 'bg-red-50 border-red-500 text-red-700 animate-pulse'
                  : 'bg-emerald-50 border-emerald-300 text-[#006B3F] hover:bg-emerald-100'
              }`}
            >
              {isDictating ? <MicOff size={14} /> : <Mic size={14} />}
              <span>{isDictating ? 'Listening (Speak now)...' : 'Voice Dictate (Speak Name)'}</span>
            </button>
          </div>

          <input
            type="text"
            placeholder={kioskLanguage === 'hil' ? 'Halimbawa: Juan Dela Cruz' : 'e.g. Juan Dela Cruz'}
            value={patient.fullName || ''}
            onChange={(e) => {
              updateDraftPatientInfo({ fullName: e.target.value });
              if (errorMsg) setErrorMsg('');
            }}
            className={`w-full h-14 px-5 rounded-2xl border-2 text-lg font-bold transition-all focus:outline-none ${
              errorMsg
                ? 'border-red-500 bg-red-50/40 focus:ring-2 focus:ring-red-400'
                : 'border-slate-300 bg-slate-50 focus:border-[#006B3F] focus:bg-white focus:ring-2 focus:ring-emerald-400/20'
            }`}
          />
        </div>

        {/* Date of Birth & Age Indicator */}
        <div className="grid grid-cols-2 gap-5">
          <div>
            <label className="flex items-center justify-between mb-2 text-base font-extrabold text-slate-900">
              <span className="flex items-center gap-2">
                <Calendar size={18} className="text-[#006B3F]" />
                <span>Date of Birth / Kaadlawan:</span>
              </span>
              {calculatedAge !== null && (
                <span className="text-xs font-black text-[#006B3F] bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-300">
                  {calculatedAge} years old
                </span>
              )}
            </label>
            <input
              type="date"
              value={patient.dob || ''}
              onChange={(e) => updateDraftPatientInfo({ dob: e.target.value })}
              className="w-full h-14 px-4 rounded-2xl border-2 border-slate-300 bg-slate-50 text-base font-semibold text-slate-800 focus:border-[#006B3F] focus:bg-white focus:outline-none"
            />
          </div>

          {/* Gender Selection Chips (Accessible Touch Buttons) */}
          <div>
            <label className="block mb-2 text-base font-extrabold text-slate-900">
              Gender / Sekso:
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['Male', 'Female', 'Other'].map((g) => {
                const isSelected = (patient.gender || 'Male') === g;
                return (
                  <button
                    key={g}
                    type="button"
                    onClick={() => updateDraftPatientInfo({ gender: g })}
                    className={`h-14 rounded-2xl border-2 text-sm font-black transition-all flex flex-col items-center justify-center ${
                      isSelected
                        ? 'bg-[#006B3F] border-[#006B3F] text-white shadow-md'
                        : 'bg-slate-50 border-slate-300 text-slate-700 hover:border-slate-400'
                    }`}
                  >
                    <span>{g}</span>
                    <span className="text-[10px] font-normal opacity-80">
                      {g === 'Male' ? 'Lalaki' : g === 'Female' ? 'Babaye' : 'Iban'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Contact Phone Number */}
        <div>
          <label className="flex items-center gap-2 mb-2 text-base font-extrabold text-slate-900">
            <Phone size={18} className="text-[#006B3F]" />
            <span>Cellphone / Contact Number (Yours or Companion's):</span>
          </label>
          <input
            type="tel"
            placeholder="09XX-XXX-XXXX"
            value={patient.contact || ''}
            onChange={(e) => updateDraftPatientInfo({ contact: e.target.value })}
            className="w-full h-14 px-5 rounded-2xl border-2 border-slate-300 bg-slate-50 text-lg font-bold text-slate-800 focus:border-[#006B3F] focus:bg-white focus:outline-none"
          />
        </div>

        {/* Fast Scan / Demo Fill Shortcut Strip */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleSimulateScan}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-xs font-bold transition-all ${
              scanFeedback
                ? 'bg-emerald-50 border-emerald-500 text-emerald-800'
                : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700'
            }`}
          >
            <QrCode size={16} className="text-[#006B3F]" />
            <span>{scanFeedback ? 'Card Scanned!' : 'Scan ID Card (PhilHealth / National ID)'}</span>
          </button>

          <button
            type="button"
            onClick={handleDemoFill}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 hover:bg-amber-100 text-xs font-bold transition-all"
          >
            <Sparkles size={14} className="text-amber-600" />
            <span>Autofill Test Patient</span>
          </button>
        </div>

        {/* Validation Error Message */}
        {errorMsg && (
          <div className="p-3.5 rounded-xl bg-red-50 border border-red-300 text-red-800 text-xs font-bold flex items-center gap-2 animate-shake">
            <AlertCircle size={18} className="text-red-600 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}
      </div>

      {/* 3. Bottom Navigation Controls (Docked cleanly at bottom) */}
      <div className="w-full max-w-3xl mx-auto mt-auto pt-5 border-t border-slate-200 flex items-center justify-between shrink-0">
        <Button
          variant="outline"
          size="md"
          icon={ArrowLeft}
          onClick={() => setKioskStep('welcome')}
          className="px-8 py-3.5 text-sm font-bold"
        >
          {kioskLanguage === 'hil' ? 'Balik sa Pamuno' : 'Back to Home'}
        </Button>

        <Button
          variant="primary"
          size="lg"
          trailingIcon={ArrowRight}
          onClick={handleNext}
          className="px-10 py-4 text-base font-black shadow-lg bg-brand-green"
        >
          {kioskLanguage === 'hil'
            ? 'Padayon: Ano ang Ginabatyag?'
            : 'Next: What Hurts?'}
        </Button>
      </div>

    </div>
  );
}
