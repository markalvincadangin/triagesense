import React from 'react';
import { useTriage } from '../../context/TriageContext';
import { Button } from '../../components/common/Button';
import {
  AlertTriangle,
  ArrowRight,
  Clock,
  CheckCircle2,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

export function Welcome() {
  const {
    setKioskStep,
    triggerEmergencyModal,
    assistanceCooldownRemaining,
    assistanceDispatched,
    t
  } = useTriage();

  const isCooldown = assistanceCooldownRemaining > 0;

  return (
    <div className="flex flex-col items-center justify-between h-full px-12 py-8 bg-canvas select-none font-sans overflow-y-auto">
      {/* Centered Ergonomic Interaction Hub (Focal Eye & Chest Reach Band) */}
      <div className="w-full max-w-[960px] flex flex-col items-center gap-7 my-auto">
        {/* 1. Welcoming Institutional Identity */}
        <div className="flex flex-col items-center text-center">
          {/* Official Intake Department Badge */}
          <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-brand-green-50 border border-brand-green/20 text-brand-green font-bold text-base tracking-wide uppercase mb-4 shadow-xs">
            <ShieldCheck size={20} className="text-brand-green shrink-0" />
            <span>{t('welcome.badge')}</span>
          </div>

          <h1 className="text-5xl font-black text-text-primary tracking-tight leading-tight">
            {t('welcome.title')}
          </h1>

          <p className="text-2xl font-bold text-text-secondary mt-2.5">
            {t('welcome.subtitle')}
          </p>

          {/* High-Contrast Instructional Copy (WCAG AAA for 1.5m Viewing) */}
          <p className="text-xl text-slate-800 max-w-2xl mt-4 leading-relaxed font-semibold">
            {t('welcome.instruction')}
          </p>
        </div>

        {/* Dispatched Alert Banner (If Assistance Modal was triggered) */}
        {assistanceDispatched && (
          <div className="w-full p-5 rounded-2xl bg-brand-green-50 border-2 border-brand-green flex items-center gap-4 shadow-md animate-fade-in">
            <CheckCircle2 size={32} className="text-brand-green shrink-0" />
            <div className="text-left">
              <div className="text-lg font-black text-emerald-950">
                {t('welcome.dispatchedTitle')}
              </div>
              <div className="text-sm text-emerald-900 font-medium mt-0.5">
                {t('welcome.dispatchedSubtitle')} Cooldown: ({assistanceCooldownRemaining}s).
              </div>
            </div>
          </div>
        )}

        {/* 2. Primary Hero Action (Fitts's Law Centered Touch Target) */}
        <div className="w-full">
          <Button
            variant="primary"
            size="lg"
            trailingIcon={ArrowRight}
            onClick={() => setKioskStep('patient-info')}
            className="w-full h-22 py-6 text-2xl font-black tracking-wide shadow-xl rounded-2xl flex items-center justify-center gap-4 active:scale-[0.99] transition-all"
          >
            {t('welcome.startBtn')}
          </Button>
        </div>

        {/* 3. Acute Life-Threatening Emergency Call Card (Vertical Stack Layout - Zero Text Overflow) */}
        <div className="w-full bg-emergency-surface border-2 border-emergency-border rounded-3xl p-6 sm:p-7 shadow-sm flex flex-col gap-5 transition-all mt-6">
          <div className="flex items-start gap-4 text-left">
            <div className="w-14 h-14 rounded-2xl bg-emergency text-white flex items-center justify-center shrink-0 shadow-sm animate-pulse ring-4 ring-red-200 mt-0.5">
              <AlertTriangle size={30} strokeWidth={2.6} />
            </div>
            <div>
              <div className="text-xl font-black text-red-950 uppercase tracking-tight">
                {t('welcome.emergencyTitle')}
              </div>
              <div className="text-base text-red-900 leading-snug font-semibold mt-1">
                {t('welcome.emergencySubtitle')}
              </div>
            </div>
          </div>

          <Button
            variant={isCooldown ? 'cooldown' : 'emergency'}
            size="lg"
            fullWidth
            icon={isCooldown ? Clock : AlertCircle}
            disabled={isCooldown}
            onClick={triggerEmergencyModal}
            className="w-full h-16 py-4 px-6 text-lg sm:text-xl font-black shadow-md shadow-red-600/25 hover:shadow-lg rounded-2xl ring-2 ring-red-200 active:scale-[0.99] transition-all flex items-center justify-center gap-3"
          >
            {isCooldown
              ? `${t('welcome.nurseCalled')} (${assistanceCooldownRemaining}s)`
              : `${t('header.emergencyHelp')}: ${t('welcome.requestNurse')}`}
          </Button>
        </div>
      </div>

      {/* Reassurance Footer */}
      <div className="text-center text-sm font-semibold text-text-secondary flex items-center justify-center gap-2 mt-4 shrink-0">
        <ShieldCheck size={18} className="text-brand-green" />
        <span>{t('welcome.privacyNotice')}</span>
      </div>
    </div>
  );
}
