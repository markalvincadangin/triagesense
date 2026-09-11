import React, { useState } from 'react';
import { useTriage } from '../../context/TriageContext';
import { Button } from '../../components/common/Button';
import { AssistanceModal } from '../../components/kiosk/AssistanceModal';
import {
  AlertTriangle,
  ArrowRight,
  Clock,
  Mic,
  MicOff,
  User,
  Calendar,
  Phone,
  QrCode,
  Sparkles,
  CheckCircle2,
  Globe
} from 'lucide-react';
import wvsumcLogo from '../../assets/wvsumc-logo.png';

export function Welcome() {
  const {
    intakeDraft,
    updateDraft,
    updateDraftPatientInfo,
    setKioskStep,
    kioskLanguage,
    setKioskLanguage,
    isAssistanceModalOpen,
    triggerEmergencyModal,
    cancelEmergencyModal,
    confirmEmergencyAssistance,
    assistanceCooldownRemaining,
    assistanceDispatched
  } = useTriage();

  const [isDictating, setIsDictating] = useState(false);
  const [scanFeedback, setScanFeedback] = useState(false);

  const isCooldown = assistanceCooldownRemaining > 0;
  const patient = intakeDraft.patientInfo || {};

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
        };
        recognition.onerror = () => setIsDictating(false);
        recognition.onend = () => setIsDictating(false);
        recognition.start();
      } else {
        // Fallback simulation
        setTimeout(() => {
          updateDraftPatientInfo({ fullName: 'Ramon S. Gonzales' });
          setIsDictating(false);
        }, 1800);
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
    setTimeout(() => {
      setScanFeedback(false);
    }, 1500);
  };

  const handleDemoFill = () => {
    updateDraft({ identification: 'Hospital ID' });
    updateDraftPatientInfo({
      fullName: 'Juan Carlos M. Delgado',
      dob: '1984-05-22',
      gender: 'Male',
      contact: '0928-555-1294'
    });
  };

  const DIALECTS = [
    { code: 'hil', label: 'Hiligaynon', sub: 'Ilonggo' },
    { code: 'en', label: 'English', sub: 'Standard' },
    { code: 'fil', label: 'Filipino', sub: 'Tagalog' },
    { code: 'ceb', label: 'Cebuano', sub: 'Bisaya' }
  ];

  return (
    <div className="flex flex-col justify-between h-full px-12 py-8 bg-canvas overflow-y-auto font-sans select-none">
      {/* Top Identity & Welcome Banner */}
      <div className="flex flex-col items-center text-center gap-3">
        <div className="flex items-center gap-4">
          <img
            src={wvsumcLogo}
            alt="WVSU Medical Center Official Seal"
            className="w-20 h-20 object-contain drop-shadow-md shrink-0"
          />
          <div className="text-left">
            <div className="text-xs font-black tracking-widest text-brand-green uppercase">
              West Visayas State University Medical Center
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 leading-tight">
              {kioskLanguage === 'hil'
                ? 'Maayong Pag-abot sa TriageSense'
                : kioskLanguage === 'fil'
                ? 'Maligayang Pagdating sa TriageSense'
                : kioskLanguage === 'ceb'
                ? 'Maayong Pag-abot sa TriageSense'
                : 'Welcome to TriageSense ED Intake'}
            </h1>
            <p className="text-sm text-slate-600 font-medium">
              Step 1 of 5 • Patient Identification & Language • Iloilo City, Philippines
            </p>
          </div>
        </div>

        {/* Integrated Language Selection Pills (Research: Eliminating Barrier Splash) */}
        <div className="w-full max-w-2xl mt-1 bg-white p-2 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 pl-3 text-slate-400">
            <Globe size={18} />
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Language:</span>
          </div>
          <div className="grid grid-cols-4 gap-2 flex-1">
            {DIALECTS.map((d) => (
              <button
                key={d.code}
                onClick={() => setKioskLanguage(d.code)}
                className={`py-2 px-3 rounded-xl text-center transition-all ${
                  kioskLanguage === d.code
                    ? 'bg-brand-green text-white shadow-md font-bold'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100 font-medium'
                }`}
              >
                <div className="text-xs">{d.label}</div>
                <div className="text-[10px] opacity-75 font-normal">{d.sub}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Dispatched Alert Banner */}
      {assistanceDispatched && (
        <div className="w-full max-w-2xl mx-auto my-2 p-4 rounded-xl bg-emerald-50 border-2 border-emerald-500 flex items-center gap-3 shadow-sm animate-fade-in">
          <CheckCircle2 size={26} className="text-emerald-600 shrink-0" />
          <div className="text-left">
            <div className="text-sm font-bold text-emerald-800">
              Emergency Triage Staff Dispatched to this Kiosk
            </div>
            <div className="text-xs text-emerald-700">
              Clinical team has been alerted. Please stay at the kiosk. Cooldown lock: ({assistanceCooldownRemaining}s).
            </div>
          </div>
        </div>
      )}

      {/* Main Two-Column Layout: Emergency Box & Demographic Intake */}
      <div className="w-full max-w-4xl mx-auto my-4 grid grid-cols-12 gap-6 items-start">
        {/* Left Column (5 cols): Life-Threatening Alert & Quick Scanner */}
        <div className="col-span-5 flex flex-col gap-4">
          {/* Life Threatening Emergency Box */}
          <div className="p-5 rounded-2xl bg-red-50/80 border-2 border-red-200 flex flex-col gap-3 shadow-sm text-center">
            <div className="flex items-center justify-center gap-2 text-red-700">
              <AlertTriangle size={20} strokeWidth={2.6} />
              <span className="text-xs font-black tracking-wider uppercase">Emergency Warning</span>
            </div>
            <div className="text-sm font-bold text-red-900 leading-snug">
              Experiencing Severe Chest Pain, Uncontrolled Bleeding, or Inability to Breathe?
            </div>
            <p className="text-xs text-red-700/90">
              Do not wait. Press below for immediate emergency nurse response at this terminal.
            </p>
            <Button
              variant={isCooldown ? 'cooldown' : 'emergency'}
              size="md"
              fullWidth
              icon={isCooldown ? Clock : AlertTriangle}
              disabled={isCooldown}
              onClick={triggerEmergencyModal}
              className="py-3 text-sm font-black"
            >
              {isCooldown
                ? `DISPATCHED (${assistanceCooldownRemaining}s)`
                : 'REQUEST IMMEDIATE NURSE'}
            </Button>
          </div>

          {/* Rapid Identification Mode Switchers */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col gap-2.5">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">
              Fast Identification Options
            </span>
            <button
              onClick={handleSimulateScan}
              className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                scanFeedback
                  ? 'bg-emerald-50 border-emerald-500 text-emerald-800'
                  : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-800'
              }`}
            >
              <div className="flex items-center gap-2.5 text-left">
                <QrCode size={20} className="text-brand-green shrink-0" />
                <div>
                  <div className="text-xs font-bold">Scan PhilHealth / National ID</div>
                  <div className="text-[11px] text-slate-500">Hold QR code to scanner window</div>
                </div>
              </div>
              {scanFeedback ? (
                <CheckCircle2 size={18} className="text-emerald-600" />
              ) : (
                <span className="text-[11px] font-bold text-brand-green">Scan Now</span>
              )}
            </button>

            <button
              onClick={handleDemoFill}
              className="flex items-center justify-between p-3 rounded-xl border border-dashed border-amber-300 bg-amber-50/60 hover:bg-amber-100/60 text-amber-900 transition-all text-left"
            >
              <div className="flex items-center gap-2.5">
                <Sparkles size={18} className="text-amber-600 shrink-0" />
                <div>
                  <div className="text-xs font-bold">Demo Autofill (Test Patient)</div>
                  <div className="text-[11px] text-amber-700">Pre-fill sample data for quick review</div>
                </div>
              </div>
              <span className="text-[11px] font-bold text-amber-800">Auto-fill</span>
            </button>
          </div>
        </div>

        {/* Right Column (7 cols): Patient Information Fields */}
        <div className="col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <User size={20} className="text-brand-green" />
              <h2 className="text-base font-extrabold text-slate-900">
                Patient Demographics / Impormasyon sang Pasyente
              </h2>
            </div>
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              Manual Entry
            </span>
          </div>

          {/* Full Name with Voice Input Button */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
              <span>Full Name / Bug-os nga Ngalan:</span>
              <button
                type="button"
                onClick={handleVoiceDictate}
                className={`flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full transition-all ${
                  isDictating
                    ? 'bg-red-100 text-red-700 ring-2 ring-red-400 animate-pulse'
                    : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                }`}
              >
                {isDictating ? <MicOff size={12} /> : <Mic size={12} />}
                <span>{isDictating ? 'Listening...' : 'Voice Dictate'}</span>
              </button>
            </label>
            <input
              type="text"
              value={patient.fullName || ''}
              onChange={(e) => updateDraftPatientInfo({ fullName: e.target.value })}
              placeholder="e.g. Juan C. Dela Cruz"
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-brand-green text-base text-slate-900 font-semibold"
            />
          </div>

          {/* Date of Birth & Gender Row */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                <Calendar size={13} className="text-slate-500" />
                <span>Birthdate / Kaadlawan:</span>
              </label>
              <input
                type="date"
                value={patient.dob || '1984-05-22'}
                onChange={(e) => updateDraftPatientInfo({ dob: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-green text-sm text-slate-900 font-medium"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-700">Gender / Sekso:</label>
              <div className="grid grid-cols-2 gap-2">
                {['Male', 'Female'].map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => updateDraftPatientInfo({ gender: g })}
                    className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                      patient.gender === g
                        ? 'bg-brand-green text-white border-brand-green'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Number */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
              <Phone size={13} className="text-slate-500" />
              <span>Contact / Mobile Number (Self or Companion):</span>
            </label>
            <input
              type="tel"
              value={patient.contact || ''}
              onChange={(e) => updateDraftPatientInfo({ contact: e.target.value })}
              placeholder="e.g. 0917-555-0192"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-green text-sm text-slate-900 font-medium"
            />
          </div>

          <div className="text-[11px] text-slate-500 italic">
            * Information is confidential under RA 10173 (Data Privacy Act) and used solely for emergency triaging.
          </div>
        </div>
      </div>

      {/* Primary Action Button (Transitions directly to Step 2: Symptoms) */}
      <div className="w-full max-w-4xl mx-auto flex items-center justify-between pt-4 border-t border-slate-200">
        <div className="text-xs text-slate-500 font-medium">
          Ready to proceed? Click Start Triage to describe what brings you in today.
        </div>

        <Button
          variant="primary"
          size="lg"
          trailingIcon={ArrowRight}
          onClick={() => setKioskStep('symptoms')}
          className="px-10 py-4 text-lg font-bold shadow-lg"
        >
          {kioskLanguage === 'hil'
            ? 'SUGDAN ANG TRIAGE >'
            : kioskLanguage === 'fil'
            ? 'SIMULAN ANG TRIAGE >'
            : 'START TRIAGE >'}
        </Button>
      </div>
      {/* Emergency Assistance Modal */}
      {isAssistanceModalOpen && (
        <AssistanceModal
          onCancel={cancelEmergencyModal}
          onConfirm={confirmEmergencyAssistance}
        />
      )}
    </div>
  );
}
