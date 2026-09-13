import React, { useState, useEffect } from 'react';
import { useTriage } from '../../context/TriageContext';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import {
  CheckCircle2,
  ArrowRight,
  Clock,
  ShieldCheck,
  ArrowDown,
  Tv,
  AlertTriangle,
  FileText
} from 'lucide-react';

export function TicketConfirmation() {
  const { lastSubmittedId, resetKioskSession, t } = useTriage();
  const [countdown, setCountdown] = useState(30);

  const referenceCode = lastSubmittedId || 'TS-2026-9515';
  const now = new Date();
  const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          resetKioskSession();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [resetKioskSession]);

  return (
    <div className="flex flex-col items-center justify-between h-full px-12 py-8 bg-canvas overflow-y-auto select-none font-sans">
      {/* 1. Header Section */}
      <div className="text-center mt-2 shrink-0">
        <div className="w-20 h-20 rounded-full bg-brand-green-light flex items-center justify-center text-brand-green mx-auto mb-4 shadow-subtle">
          <CheckCircle2 size={48} strokeWidth={2.5} />
        </div>

        <h1 className="text-4xl sm:text-5xl font-black text-text-primary tracking-tight">
          {t('confirmation.title')}
        </h1>
        <h2 className="text-xl sm:text-2xl font-bold text-brand-green mt-2.5">
          {t('confirmation.ticketReady')}
        </h2>
      </div>

      {/* 2. Main Content Flow: Realistic Queue Ticket + Waiting Guide */}
      <div className="w-full max-w-[820px] mx-auto my-3 flex flex-col items-center gap-5 shrink-0">
        {/* Realistic Thermal Queue Slip Card */}
        <div className="w-full bg-white rounded-3xl border-3 border-dashed border-brand-green shadow-xl p-7 relative overflow-hidden flex flex-col items-center text-center gap-4 animate-fade-in">
          {/* Subtle Hospital Watermark Header */}
          <div className="flex items-center justify-between w-full border-b border-slate-200 pb-3 text-xs font-mono text-slate-500 font-bold">
            <span>{t('confirmation.hospitalDept')}</span>
            <span>TERMINAL K01 • {timeString}</span>
          </div>

          {/* Queue Number Callout */}
          <div className="my-1">
            <div className="text-xs font-black text-text-secondary uppercase tracking-widest">
              {t('confirmation.queueLabel')}
            </div>
            <div className="text-6xl sm:text-7xl font-black text-brand-green tracking-wider font-mono my-2 select-all drop-shadow-xs">
              {referenceCode}
            </div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-black tracking-wide uppercase">
              <ShieldCheck size={16} className="text-brand-green" />
              <span>{t('confirmation.nextStepAssessment')}</span>
            </div>
          </div>

          {/* Waiting Message — full width, clean centered */}
          <div className="w-full bg-emerald-50/60 px-6 py-4 rounded-2xl border border-emerald-200 text-center">
            <p className="text-base font-black text-text-primary leading-snug">
              &ldquo;{t('confirmation.nurseWaiting')}&rdquo;
            </p>
            <p className="text-xs text-text-secondary font-medium mt-1.5">
              {t('confirmation.mobileTracking')}
            </p>
          </div>

          {/* Simulated Thermal Paper Barcode Strip */}
          <div className="w-full flex flex-col items-center gap-1 pt-1 opacity-70">
            <div className="h-6 w-3/4 flex items-center justify-between overflow-hidden">
              {[...Array(48)].map((_, i) => (
                <div
                  key={i}
                  className="bg-slate-800 h-full"
                  style={{ width: i % 3 === 0 ? '4px' : i % 5 === 0 ? '1px' : '2px' }}
                />
              ))}
            </div>
            <span className="text-[10px] font-mono text-slate-500 font-bold tracking-widest">
              *{referenceCode}*
            </span>
          </div>
        </div>

        {/* Physical Directional Cue: Direct Vector to Chassis Printer Mouth */}
        <div className="flex items-center gap-3.5 px-8 py-3.5 rounded-full bg-emerald-50 border-2 border-brand-green text-emerald-950 font-black text-base sm:text-lg shadow-sm">
          <ArrowDown size={22} strokeWidth={3.5} className="text-brand-green shrink-0 animate-bounce" />
          <span className="animate-bounce">{t('confirmation.takeTicketSlot')}</span>
          <ArrowDown size={22} strokeWidth={3.5} className="text-brand-green shrink-0 animate-bounce" />
        </div>

        {/* 3. Waiting Area Guidance Grid: Fills Void with High-Value Reassurance */}
        <div className="w-full bg-white border-2 border-slate-200 rounded-3xl p-5 sm:p-6 shadow-subtle">
          <div className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-700 mb-3.5 flex items-center gap-2">
            <Clock size={18} className="text-brand-green shrink-0" />
            <span>{t('confirmation.guideTitle')}</span>
          </div>

          <div className="grid grid-cols-3 gap-3 sm:gap-4 text-left">
            <div className="bg-canvas p-4 rounded-2xl border border-border-main flex flex-col gap-1.5 shadow-2xs">
              <div className="flex items-center gap-2 text-brand-green font-black text-sm sm:text-base">
                <FileText size={20} className="shrink-0" />
                <span>{t('confirmation.guideStep1Title')}</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 font-semibold leading-relaxed">
                {t('confirmation.guideStep1Desc')}
              </p>
            </div>

            <div className="bg-canvas p-4 rounded-2xl border border-border-main flex flex-col gap-1.5 shadow-2xs">
              <div className="flex items-center gap-2 text-brand-green font-black text-sm sm:text-base">
                <Tv size={20} className="shrink-0" />
                <span>{t('confirmation.guideStep2Title')}</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 font-semibold leading-relaxed">
                {t('confirmation.guideStep2Desc')}
              </p>
            </div>

            <div className="p-4 rounded-2xl border-2 border-amber-300 bg-amber-50/90 flex flex-col gap-1.5 shadow-2xs">
              <div className="flex items-center gap-2 text-amber-950 font-black text-sm sm:text-base">
                <AlertTriangle size={20} className="text-amber-600 shrink-0" />
                <span>{t('confirmation.guideStep3Title')}</span>
              </div>
              <p className="text-xs sm:text-sm text-amber-950 font-bold leading-relaxed">
                {t('confirmation.guideStep3Desc')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Bottom Reset Timer & Manual Return Button */}
      <div className="w-full max-w-[820px] mx-auto flex flex-col items-center gap-3.5 mt-auto shrink-0 pb-2">
        {/* Dynamic Countdown Status Pill */}
        <div
          className={`flex items-center gap-3 px-6 sm:px-8 py-3 rounded-full border-2 text-base sm:text-lg font-bold transition-all shadow-subtle ${
            countdown <= 10
              ? 'bg-amber-50 border-amber-400 text-amber-950 shadow-md animate-pulse'
              : 'bg-white border-slate-300 text-slate-700'
          }`}
        >
          <Clock
            size={24}
            className={countdown <= 10 ? 'text-amber-600' : 'text-brand-green'}
            strokeWidth={2.5}
          />
          <span className="flex items-center gap-2 flex-wrap justify-center">
            <span className="font-extrabold text-slate-700">{t('confirmation.resetTimerPrefix')}</span>
            <span
              className={`inline-flex items-center justify-center px-2.5 py-0.5 rounded-lg border-2 text-xl sm:text-2xl font-black font-mono leading-none ${
                countdown <= 10
                  ? 'bg-red-100 text-red-700 border-red-400 animate-pulse'
                  : 'bg-emerald-100 text-brand-green border-brand-green/40'
              }`}
            >
              {countdown}s
            </span>
          </span>
        </div>

        {/* Primary Action Button */}
        <Button
          variant="primary"
          size="lg"
          fullWidth
          trailingIcon={ArrowRight}
          onClick={resetKioskSession}
          className="h-18 text-2xl font-black tracking-wide shadow-xl rounded-2xl cursor-pointer"
        >
          {t('confirmation.doneBtn')}
        </Button>
      </div>
    </div>
  );
}
