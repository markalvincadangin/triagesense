import React, { useState } from 'react';
import { useTriage } from '../../context/TriageContext';
import { Button } from '../../components/common/Button';
import { AssistanceModal } from '../../components/kiosk/AssistanceModal';
import {
  AlertTriangle,
  ArrowRight,
  Clock,
  QrCode,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  HeartPulse,
  Activity,
  UserCheck
} from 'lucide-react';
import wvsumcLogo from '../../assets/wvsumc-logo.png';

export function Welcome() {
  const {
    updateDraft,
    updateDraftPatientInfo,
    setKioskStep,
    kioskLanguage,
    isAssistanceModalOpen,
    triggerEmergencyModal,
    cancelEmergencyModal,
    confirmEmergencyAssistance,
    assistanceCooldownRemaining,
    assistanceDispatched
  } = useTriage();

  const [scanFeedback, setScanFeedback] = useState(false);
  const isCooldown = assistanceCooldownRemaining > 0;

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
      setKioskStep('patient-info');
    }, 1200);
  };

  const handleDemoFill = () => {
    updateDraft({ identification: 'Hospital ID' });
    updateDraftPatientInfo({
      fullName: 'Juan Carlos M. Delgado',
      dob: '1984-05-22',
      gender: 'Male',
      contact: '0928-555-1294'
    });
    setKioskStep('patient-info');
  };

  return (
    <div className="flex flex-col items-center justify-between h-full px-12 py-10 bg-canvas select-none font-sans">
      
      {/* 1. Welcoming Institutional Identity */}
      <div className="flex flex-col items-center text-center max-w-3xl mt-4">
        {/* Official WVSUMC Emblem Seal */}
        <div className="w-28 h-28 rounded-full bg-white border-[3px] border-[#006B3F] p-1.5 shadow-lg flex items-center justify-center mb-4">
          <img
            src={wvsumcLogo}
            alt="WVSU Medical Center Official Seal"
            className="w-full h-full object-contain"
          />
        </div>

        <div className="text-xs font-black tracking-widest text-brand-green uppercase mb-1">
          West Visayas State University Medical Center
        </div>

        <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-tight">
          {kioskLanguage === 'hil'
            ? 'Maayong Pag-abot sa TriageSense'
            : kioskLanguage === 'fil'
            ? 'Maligayang Pagdating sa TriageSense'
            : kioskLanguage === 'ceb'
            ? 'Maayong Pag-abot sa TriageSense'
            : 'Welcome to TriageSense ED Intake'}
        </h1>

        <p className="text-base font-semibold text-slate-600 mt-2">
          {kioskLanguage === 'hil'
            ? 'Pang-emerhensya nga Pag-rehistro kag Triage Support • Iloilo City'
            : 'Emergency Department Patient Intake & Triage Support • Iloilo City'}
        </p>

        <p className="text-xs text-slate-500 max-w-xl mt-3 leading-relaxed">
          {kioskLanguage === 'hil'
            ? 'Ini nga self-service kiosk nagapadasig sang imo pag-rehistro kag nagadirekta sa imo detalye sa nurse triage desk. Sunda ang mga masunod nga tikang.'
            : 'This self-service kiosk accelerates your emergency registration and sends your intake directly to the clinical triage nurse. Please tap below to begin.'}
        </p>
      </div>

      {/* Dispatched Alert Banner (If Assistance Modal was triggered) */}
      {assistanceDispatched && (
        <div className="w-full max-w-2xl mx-auto p-4 rounded-2xl bg-emerald-50 border-2 border-emerald-500 flex items-center gap-3 shadow-md animate-fade-in">
          <CheckCircle2 size={28} className="text-emerald-600 shrink-0" />
          <div className="text-left">
            <div className="text-sm font-black text-emerald-900">
              Emergency Triage Staff Dispatched to this Terminal
            </div>
            <div className="text-xs text-emerald-700">
              Clinical team has been alerted to your position. Please remain at the kiosk. Cooldown lock: ({assistanceCooldownRemaining}s).
            </div>
          </div>
        </div>
      )}

      {/* 2. Primary Hero Action (Fitts's Law Large Touch Target) */}
      <div className="w-full max-w-2xl flex flex-col items-center gap-5 my-2">
        <Button
          variant="primary"
          size="lg"
          trailingIcon={ArrowRight}
          onClick={() => setKioskStep('patient-info')}
          className="w-full py-6 text-2xl font-black tracking-wide shadow-2xl bg-[#006B3F] hover:bg-[#005230] rounded-2xl flex items-center justify-center gap-3"
        >
          {kioskLanguage === 'hil'
            ? 'MAGSUGOD SA PAG-REHISTRO / START >'
            : 'START EMERGENCY INTAKE >'}
        </Button>

        {/* Secondary Fast-Track Ingress Cards */}
        <div className="grid grid-cols-2 gap-4 w-full">
          {/* Fast Scan ID Card */}
          <button
            onClick={handleSimulateScan}
            className={`p-4 rounded-2xl border-2 transition-all flex items-center justify-between text-left shadow-sm ${
              scanFeedback
                ? 'bg-emerald-50 border-emerald-500 text-emerald-800'
                : 'bg-white border-slate-200 hover:border-[#006B3F] hover:shadow-md text-slate-800'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-[#006B3F] shrink-0">
                <QrCode size={24} />
              </div>
              <div>
                <div className="text-sm font-extrabold text-slate-900">Scan ID / Card</div>
                <div className="text-xs text-slate-500">PhilHealth, National ID, or Hospital Card</div>
              </div>
            </div>
            {scanFeedback ? (
              <CheckCircle2 size={20} className="text-emerald-600 shrink-0" />
            ) : (
              <span className="text-xs font-bold text-[#006B3F] shrink-0">Tap to Scan</span>
            )}
          </button>

          {/* Quick Demo Autofill Card */}
          <button
            onClick={handleDemoFill}
            className="p-4 rounded-2xl border-2 border-dashed border-amber-300 bg-amber-50/70 hover:bg-amber-100/70 text-amber-950 transition-all flex items-center justify-between text-left shadow-sm hover:shadow-md"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700 shrink-0">
                <Sparkles size={24} />
              </div>
              <div>
                <div className="text-sm font-extrabold text-amber-950">Demo Autofill</div>
                <div className="text-xs text-amber-800">Pre-fill test patient for evaluation</div>
              </div>
            </div>
            <span className="text-xs font-bold text-amber-800 shrink-0">Auto-fill</span>
          </button>
        </div>
      </div>

      {/* 3. Acute Life-Threatening Emergency Call Card */}
      <div className="w-full max-w-2xl bg-red-50/90 border-2 border-red-300 rounded-2xl p-5 shadow-sm flex items-center justify-between gap-5">
        <div className="flex items-center gap-3.5 text-left">
          <div className="w-12 h-12 rounded-xl bg-red-600 text-white flex items-center justify-center shrink-0 shadow-sm animate-pulse">
            <AlertTriangle size={24} strokeWidth={2.5} />
          </div>
          <div>
            <div className="text-sm font-black text-red-950 uppercase tracking-tight">
              Life-Threatening Emergency? / Emerhensya?
            </div>
            <div className="text-xs text-red-800 leading-snug">
              Severe chest pain, profuse bleeding, or difficulty breathing? Press for immediate emergency nurse response.
            </div>
          </div>
        </div>

        <Button
          variant={isCooldown ? 'cooldown' : 'emergency'}
          size="md"
          icon={isCooldown ? Clock : AlertTriangle}
          disabled={isCooldown}
          onClick={triggerEmergencyModal}
          className="px-6 py-3 text-xs font-black shrink-0 shadow-md whitespace-nowrap"
        >
          {isCooldown
            ? `DISPATCHED (${assistanceCooldownRemaining}s)`
            : 'REQUEST IMMEDIATE NURSE'}
        </Button>
      </div>

      {/* Reassurance Footer */}
      <div className="text-center text-xs text-slate-500 flex items-center justify-center gap-2 mb-2">
        <ShieldCheck size={16} className="text-[#006B3F]" />
        <span>WVSUMC Emergency Department • Republic Act 10173 (Data Privacy Act) Protected</span>
      </div>

      {/* Emergency Confirmation Modal */}
      <AssistanceModal
        isOpen={isAssistanceModalOpen}
        onCancel={cancelEmergencyModal}
        onConfirm={confirmEmergencyAssistance}
      />
    </div>
  );
}
