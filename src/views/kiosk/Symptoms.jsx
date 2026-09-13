import React, { useState } from 'react';
import { useTriage } from '../../context/TriageContext';
import { KioskFooterNav } from '../../components/kiosk/KioskFooterNav';
import {
  Thermometer,
  Activity,
  Wind,
  HeartPulse,
  AlertCircle,
  Zap,
  PlusSquare,
  HelpCircle,
  Mic,
  Check
} from 'lucide-react';

const SYMPTOMS_LIST = [
  { id: 'Chest Pain', icon: HeartPulse, iconColor: 'text-red-600' },
  { id: 'Shortness of Breath', icon: Wind, iconColor: 'text-brand-blue' },
  { id: 'Fever', icon: Thermometer, iconColor: 'text-red-600' },
  { id: 'Abdominal Pain', icon: AlertCircle, iconColor: 'text-amber-600' },
  { id: 'Headache', icon: Zap, iconColor: 'text-purple-600' },
  { id: 'Injury / Trauma', icon: PlusSquare, iconColor: 'text-emerald-600' },
  { id: 'Cough', icon: Activity, iconColor: 'text-orange-600' },
  { id: 'Other', icon: HelpCircle, iconColor: 'text-text-secondary' }
];

export function Symptoms() {
  const { intakeDraft, toggleSymptom, setKioskStep, t } = useTriage();
  const [isRecordingVoice, setIsRecordingVoice] = useState(false);
  const [voiceSeconds, setVoiceSeconds] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');

  const selectedSymptoms = intakeDraft.symptoms || [];

  const handleToggleSymptom = (sympId) => {
    toggleSymptom(sympId);
    if (errorMsg) setErrorMsg('');
  };

  const handleToggleVoice = () => {
    if (!isRecordingVoice) {
      setIsRecordingVoice(true);
      setVoiceSeconds(1);
      const interval = setInterval(() => {
        setVoiceSeconds((prev) => {
          if (prev >= 6) {
            clearInterval(interval);
            setIsRecordingVoice(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      setIsRecordingVoice(false);
      setVoiceSeconds(0);
    }
  };

  const handleNext = () => {
    if (selectedSymptoms.length === 0 && !intakeDraft.voiceNoteRecorded) {
      setErrorMsg(t('symptoms.errorRequired'));
      return;
    }
    setErrorMsg('');
    setKioskStep('body-map');
  };

  return (
    <div className="flex flex-col h-full px-12 py-8 bg-canvas select-none overflow-y-auto">
      {/* Screen Title & Instruction Header */}
      <div className="text-center mb-6 shrink-0">
        <h1 className="text-4xl font-black text-text-primary tracking-tight">
          {t('symptoms.stepTitle')}
        </h1>
        <h2 className="text-xl font-bold text-text-secondary mt-2 flex items-center justify-center gap-2 flex-wrap">
          <span>{t('symptoms.stepSubtitle')}</span>
          <span className="text-text-secondary/80 text-lg font-normal">
            {t('symptoms.tapAll')}
          </span>
          {selectedSymptoms.length > 0 && (
            <span className="font-black text-brand-green bg-brand-green-light px-3 py-0.5 rounded-full text-sm border border-emerald-300 animate-fadeIn">
              {selectedSymptoms.length} {t('symptoms.selectedBadge')}
            </span>
          )}
        </h2>
      </div>

      {/* Balanced 2-Column Symptom Grid */}
      <div className="grid grid-cols-2 gap-6 w-full max-w-[960px] mx-auto">
        {SYMPTOMS_LIST.map((symp) => {
          const isSelected = selectedSymptoms.includes(symp.id);
          const Icon = symp.icon;
          const translatedItem = t(`symptoms.items.${symp.id}`);
          const label = translatedItem?.label || symp.id;
          const desc = translatedItem?.desc || symp.desc;

          return (
            <div
              key={symp.id}
              onClick={() => handleToggleSymptom(symp.id)}
              className={`min-h-[148px] p-6 rounded-3xl border-2 transition-all duration-150 cursor-pointer flex items-center justify-between gap-5 select-none ${
                isSelected
                  ? 'bg-emerald-100/80 border-brand-green shadow-card ring-4 ring-emerald-600/30 scale-[1.01]'
                  : 'bg-surface border-border-main hover:border-border-hover shadow-subtle hover:shadow-card'
              }`}
            >
              <div className="flex items-center gap-5">
                {/* Visual Icon Badge */}
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 shadow-sm transition-colors ${
                    isSelected
                      ? 'bg-brand-green text-white shadow-md'
                      : `bg-slate-100 ${symp.iconColor}`
                  }`}
                >
                  <Icon size={32} strokeWidth={2.4} />
                </div>

                {/* Symptom Phrasing & Localized Subtext */}
                <div className="flex flex-col text-left">
                  <span
                    className={`text-xl font-black leading-snug transition-colors ${
                      isSelected ? 'text-emerald-950 font-black' : 'text-text-primary'
                    }`}
                  >
                    {label}
                  </span>
                  <span className="text-sm text-text-secondary mt-1 leading-relaxed font-medium">
                    {desc}
                  </span>
                </div>
              </div>

              {/* Touch Multi-Select Checkbox Square (44px x 44px) */}
              <div
                className={`w-11 h-11 rounded-2xl border-2 flex items-center justify-center shrink-0 transition-all shadow-sm ${
                  isSelected
                    ? 'bg-brand-green border-brand-green text-white shadow-md ring-2 ring-emerald-300'
                    : 'border-slate-300 bg-white hover:border-slate-400'
                }`}
              >
                {isSelected && <Check size={26} strokeWidth={3.5} />}
              </div>
            </div>
          );
        })}
      </div>

      {/* Multimodal Voice Dictation Accessibility Utility Bar */}
      <div className="w-full max-w-[960px] mx-auto mt-6 bg-gradient-to-r from-blue-50/90 via-indigo-50/40 to-blue-50/90 border-2 border-blue-200/90 rounded-3xl p-5 shadow-sm flex items-center justify-between gap-6 shrink-0 select-none">
        <div className="flex items-center gap-4">
          <div
            className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-sm transition-all ${
              isRecordingVoice
                ? 'bg-emergency text-white animate-pulse ring-4 ring-red-300'
                : 'bg-brand-blue text-white'
            }`}
          >
            <Mic size={26} strokeWidth={2.4} />
          </div>
          <div className="text-left">
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-[11px] uppercase tracking-wider font-black text-brand-blue bg-blue-100/90 px-2.5 py-0.5 rounded-full border border-blue-200">
                Voice Assist
              </span>
              <span className="text-base font-black text-slate-900">
                {isRecordingVoice
                  ? `${t('symptoms.voiceRecording')} (${voiceSeconds}s / 6s)`
                  : t('symptoms.voiceCardTitle')}
              </span>
            </div>
            <div className="text-sm text-slate-600 font-medium leading-normal">
              {isRecordingVoice
                ? t('symptoms.voiceRecording')
                : t('symptoms.voiceCardSubtitle')}
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleToggleVoice}
          className={`h-12 px-6 text-sm font-black shrink-0 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-center gap-2 shadow-sm active:scale-95 ${
            isRecordingVoice
              ? 'bg-emergency hover:bg-emergency-dark text-white border-emergency shadow-md animate-pulse'
              : 'bg-brand-blue hover:bg-brand-blue-hover text-white border-brand-blue shadow-md'
          }`}
        >
          <Mic size={18} strokeWidth={2.4} />
          <span>{isRecordingVoice ? t('common.cancel') : t('patientInfo.voiceDictate')}</span>
        </button>
      </div>

      {/* Validation Error Message */}
      {errorMsg && (
        <div className="w-full max-w-[960px] mx-auto mt-4 p-4 rounded-2xl bg-red-50 border border-emergency-border text-emergency-dark text-base font-bold flex items-center gap-3 animate-shake shrink-0">
          <AlertCircle size={22} className="text-emergency shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Bottom Navigation Controls */}
      <KioskFooterNav
        onBack={() => setKioskStep('patient-info')}
        onNext={handleNext}
        backLabel={t('symptoms.btnBack')}
        nextLabel={t('symptoms.btnNext')}
      />
    </div>
  );
}
