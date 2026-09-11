import React, { useState } from 'react';
import { useTriage } from '../../context/TriageContext';
import { Button } from '../../components/common/Button';
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
  Check,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';

const SYMPTOMS_LIST = [
  { id: 'Chest Pain', label: 'Chest Pain / Sakit Dughan', desc: 'Pressure, tightness, crushing sensation', icon: HeartPulse, color: '#DC2626' },
  { id: 'Shortness of Breath', label: 'Breathing Difficulty / Hangos', desc: 'Difficulty breathing, wheezing, or gasping', icon: Wind, color: '#0057A8' },
  { id: 'Fever', label: 'Fever / Hilanat', desc: 'High body temperature, chills, sweating', icon: Thermometer, color: '#DC2626' },
  { id: 'Abdominal Pain', label: 'Abdominal Pain / Sakit Tiyan', desc: 'Severe stomach cramping, sharp or dull ache', icon: AlertCircle, color: '#D97706' },
  { id: 'Headache', label: 'Severe Headache / Sakit Ulo', desc: 'Migraine, sudden throbbing, dizziness', icon: Zap, color: '#7C3AED' },
  { id: 'Injury / Trauma', label: 'Injury / Samad o Pagkahulog', desc: 'Cut, deep wound, fall, vehicular trauma', icon: PlusSquare, color: '#16803C' },
  { id: 'Cough', label: 'Persistent Cough / Ubo', desc: 'Chronic dry cough or coughing with phlegm', icon: Activity, color: '#F97316' },
  { id: 'Other', label: 'Other Symptoms / Iban Pa', desc: 'Other physical concerns to report to nurse', icon: HelpCircle, color: '#505F78' }
];

export function Symptoms() {
  const { intakeDraft, toggleSymptom, setKioskStep } = useTriage();
  const [isRecordingVoice, setIsRecordingVoice] = useState(false);
  const [voiceSeconds, setVoiceSeconds] = useState(0);

  const selectedSymptoms = intakeDraft.symptoms || [];

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

  return (
    <div className="flex flex-col h-full px-12 py-8 bg-canvas select-none">
      {/* Screen Title & Instruction Header */}
      <div className="text-center mb-6 shrink-0">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          What Are Your Main Symptoms?
        </h1>
        <h2 className="text-lg font-medium text-slate-600 mt-1">
          Ano ang ginabatyag mo subong? <span className="text-slate-500 text-base font-normal">(Tap all that apply)</span>
        </h2>
      </div>

      {/* Balanced 2-Column Symptom Grid (Fills screen harmoniously with high-touch cards) */}
      <div className="grid grid-cols-2 gap-5 w-full max-w-4xl mx-auto">
        {SYMPTOMS_LIST.map((symp) => {
          const isSelected = selectedSymptoms.includes(symp.id);
          const Icon = symp.icon;

          return (
            <div
              key={symp.id}
              onClick={() => toggleSymptom(symp.id)}
              className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between gap-4 shadow-sm hover:shadow-md ${
                isSelected
                  ? 'bg-emerald-50/80 border-emerald-600 shadow-md ring-2 ring-emerald-500/30'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
              style={{ minHeight: '124px' }}
            >
              <div className="flex items-center gap-4">
                {/* Visual Icon Badge */}
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${
                    isSelected
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 text-slate-700'
                  }`}
                  style={{ color: isSelected ? '#FFFFFF' : symp.color }}
                >
                  <Icon size={28} strokeWidth={2.4} />
                </div>

                {/* Symptom Phrasing & Localized Subtext */}
                <div className="flex flex-col text-left">
                  <span className={`text-lg font-extrabold ${isSelected ? 'text-emerald-950' : 'text-slate-900'}`}>
                    {symp.label.split(' / ')[0]}
                  </span>
                  <span className={`text-xs font-semibold ${isSelected ? 'text-emerald-800' : 'text-[#006B3F]'}`}>
                    {symp.label.split(' / ')[1]}
                  </span>
                  <span className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                    {symp.desc}
                  </span>
                </div>
              </div>

              {/* Touch Checkmark Pill */}
              <div
                className={`w-8 h-8 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                  isSelected
                    ? 'bg-emerald-600 border-emerald-600 text-white shadow-sm'
                    : 'border-slate-300 bg-slate-50'
                }`}
              >
                {isSelected && <Check size={18} strokeWidth={3} />}
              </div>
            </div>
          );
        })}
      </div>

      {/* Multimodal Voice Input Bar */}
      <div
        className={`w-full max-w-4xl mx-auto mt-5 p-4 rounded-2xl border transition-all flex items-center justify-between shadow-sm ${
          isRecordingVoice
            ? 'bg-red-50 border-red-300 ring-2 ring-red-400/20'
            : 'bg-white border-slate-200'
        }`}
      >
        <div className="flex items-center gap-3.5">
          <div
            className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
              isRecordingVoice
                ? 'bg-red-600 text-white animate-pulse'
                : 'bg-blue-50 text-blue-700 border border-blue-200'
            }`}
          >
            <Mic size={22} />
          </div>
          <div className="text-left">
            <div className="text-sm font-bold text-slate-900">
              {isRecordingVoice
                ? `Recording Active (${voiceSeconds}s) — Speak your symptoms now...`
                : 'Prefer to describe your symptoms with your voice?'}
            </div>
            <div className="text-xs text-slate-500">
              {isRecordingVoice
                ? 'Audio memo will be securely attached to your clinical intake dossier for the triage nurse.'
                : 'Tap to record a 10-second voice memo in Hiligaynon, English, or Filipino.'}
            </div>
          </div>
        </div>

        <Button
          variant={isRecordingVoice ? 'emergency' : 'outline'}
          size="sm"
          onClick={handleToggleVoice}
          className="px-5 py-2 text-xs font-bold shrink-0"
        >
          {isRecordingVoice ? 'Stop Recording' : 'Voice Input'}
        </Button>
      </div>

      {/* Bottom Navigation Controls (Docked cleanly at bottom) */}
      <div className="w-full max-w-4xl mx-auto mt-auto pt-4 border-t border-slate-200 flex items-center justify-between shrink-0">
        <Button
          variant="outline"
          size="md"
          icon={ArrowLeft}
          onClick={() => setKioskStep('patient-info')}
          className="px-8 py-3.5 text-sm font-bold"
        >
          Back / Balik
        </Button>

        <Button
          variant="primary"
          size="lg"
          trailingIcon={ArrowRight}
          onClick={() => setKioskStep('body-map')}
          className="px-10 py-4 text-base font-black shadow-lg bg-brand-green"
        >
          Next: Body Location
        </Button>
      </div>
    </div>
  );
}
