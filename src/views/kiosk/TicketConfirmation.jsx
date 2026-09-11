import React, { useState, useEffect } from 'react';
import { useTriage } from '../../context/TriageContext';
import { Button } from '../../components/common/Button';
import { CheckCircle2, Printer, ArrowRight, Clock, ShieldCheck } from 'lucide-react';

export function TicketConfirmation() {
  const { lastSubmittedId, resetKioskSession, setViewMode } = useTriage();
  const [countdown, setCountdown] = useState(30);

  const referenceCode = lastSubmittedId || 'TS-2026-9920';

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
      {/* Header */}
      <div className="text-center mt-2">
        <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center text-brand-green mx-auto mb-3.5 shadow-sm">
          <CheckCircle2 size={48} strokeWidth={2.5} />
        </div>

        <h1 className="text-4xl font-black text-text-primary tracking-tight">
          You're Checked In!
        </h1>
        <h2 className="text-base font-bold text-brand-green mt-1">
          Narehistro Ka Na! Nabatun na sang Nurse ang imo impormasyon
        </h2>
      </div>

      {/* Queue Token Ticket Slip Mockup */}
      <div className="w-full max-w-lg mx-auto my-3 bg-white p-7 rounded-2xl border-2 border-dashed border-brand-green shadow-md flex flex-col items-center text-center gap-3.5 animate-fade-in">
        <div className="text-xs font-black tracking-widest text-text-secondary uppercase">
          WVSU MEDICAL CENTER • EMERGENCY DEPARTMENT
        </div>

        <div>
          <div className="text-xs font-bold text-text-secondary uppercase tracking-wider">
            YOUR QUEUE TICKET NUMBER:
          </div>
          <div className="text-4xl font-black text-brand-green tracking-wider font-mono mt-1">
            {referenceCode}
          </div>
        </div>

        {/* Clear Lounge Instructions */}
        <div className="w-full bg-canvas p-4 rounded-xl border border-border-main text-sm leading-relaxed text-text-primary font-medium">
          "Please take a seat in the waiting area. A triage nurse will call your ticket number shortly."
        </div>

        {/* Note on Non-Autonomous Triage */}
        <div className="flex items-center gap-2 text-xs font-semibold text-text-secondary">
          <ShieldCheck size={16} className="text-brand-green shrink-0" />
          <span>Next Step: In-Person Nurse Assessment</span>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-text-secondary">
          <Printer size={16} className="text-slate-500 shrink-0" />
          <span>Please take your printed ticket from the slot below</span>
        </div>
      </div>

      {/* Auto Reset Timer & Manual Return Button */}
      <div className="w-full max-w-lg mx-auto flex flex-col items-center gap-3.5 mt-auto">
        <div className="flex items-center gap-2 text-xs font-semibold text-text-secondary">
          <Clock size={16} className="text-slate-400" />
          <span>Terminal screen will reset for next patient in <strong className="text-slate-800 font-bold">{countdown}s</strong></span>
        </div>

        <Button
          variant="primary"
          size="lg"
          fullWidth
          trailingIcon={ArrowRight}
          onClick={resetKioskSession}
          className="h-16 text-lg font-black tracking-wide shadow-xl bg-brand-green rounded-2xl"
        >
          DONE / TAPUS NA
        </Button>

        {/* Shortcut button to view the newly submitted record in Staff Portal */}
        <button
          type="button"
          onClick={() => setViewMode('admin')}
          className="flex items-center justify-center gap-1.5 text-xs font-bold text-brand-blue hover:underline cursor-pointer py-1"
        >
          <span>View this record on Nurse Triage Portal</span>
          <ArrowRight size={14} className="shrink-0" />
        </button>
      </div>
    </div>
  );
}
