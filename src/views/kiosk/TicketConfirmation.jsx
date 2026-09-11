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
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '100%',
        padding: '36px 48px',
        backgroundColor: 'var(--color-bg-canvas)',
        overflowY: 'auto'
      }}
    >
      {/* Header */}
      <div style={{ textAlign: 'center' }}>
        <div
          style={{
            width: '84px',
            height: '84px',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'var(--color-success-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--color-success)',
            margin: '0 auto 16px',
            boxShadow: 'var(--shadow-card)'
          }}
        >
          <CheckCircle2 size={52} strokeWidth={2.5} />
        </div>

        <h1
          style={{
            fontSize: '36px',
            fontWeight: '800',
            color: 'var(--color-text-primary)'
          }}
        >
          You're Checked In!
        </h1>
        <h2
          style={{
            fontSize: '18px',
            fontWeight: '500',
            color: 'var(--color-success)',
            marginTop: '4px'
          }}
        >
          Narehistro Ka Na! Nabatun na sang Nurse ang imo impormasyon
        </h2>
      </div>

      {/* Queue Token Ticket Slip Mockup */}
      <div
        className="animate-fade-in"
        style={{
          maxWidth: '520px',
          width: '100%',
          margin: '16px auto',
          backgroundColor: 'var(--color-bg-surface)',
          padding: '32px',
          borderRadius: 'var(--radius-xl)',
          border: '2px dashed var(--color-wvsu-primary)',
          boxShadow: 'var(--shadow-hover)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: '16px',
          position: 'relative'
        }}
      >
        <div
          style={{
            fontSize: '13px',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: 'var(--color-text-secondary)'
          }}
        >
          WVSU MEDICAL CENTER • EMERGENCY DEPARTMENT
        </div>

        <div>
          <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--color-text-secondary)' }}>
            YOUR QUEUE TICKET NUMBER:
          </div>
          <div
            style={{
              fontSize: '40px',
              fontWeight: '900',
              color: 'var(--color-wvsu-primary)',
              letterSpacing: '0.04em',
              fontVariantNumeric: 'tabular-nums',
              marginTop: '4px'
            }}
          >
            {referenceCode}
          </div>
        </div>

        {/* Clear Lounge Instructions */}
        <div
          style={{
            backgroundColor: 'var(--color-bg-canvas)',
            padding: '16px 20px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-border)',
            fontSize: '15px',
            lineHeight: '22px',
            color: 'var(--color-text-primary)'
          }}
        >
          "Please take a seat in the waiting area. A triage nurse will call your ticket number shortly."
        </div>

        {/* Note on Non-Autonomous Triage */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--color-text-secondary)' }}>
          <ShieldCheck size={16} color="var(--color-wvsu-primary)" />
          <span>Next Step: In-Person Nurse Assessment</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--color-text-secondary)' }}>
          <Printer size={16} />
          <span>Please take your printed ticket from the slot below</span>
        </div>
      </div>

      {/* Auto Reset Timer & Manual Return Button */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '14px',
          maxWidth: '520px',
          width: '100%',
          margin: '0 auto'
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '14px',
            color: 'var(--color-text-secondary)'
          }}
        >
          <Clock size={16} />
          <span>Terminal screen will reset for next patient in <strong>{countdown}s</strong></span>
        </div>

        <Button
          variant="primary"
          size="lg"
          fullWidth
          trailingIcon={ArrowRight}
          onClick={resetKioskSession}
          style={{ height: '68px', fontSize: '18px' }}
        >
          DONE / TAPUS NA
        </Button>

        {/* Shortcut button to view the newly submitted record in Staff Portal */}
        <button
          type="button"
          onClick={() => setViewMode('admin')}
          className="flex items-center justify-center gap-1 text-sm font-bold text-[#0057A8] hover:underline cursor-pointer mt-1"
        >
          <span>View this record on Nurse Triage Portal</span>
          <ArrowRight size={14} className="inline shrink-0" />
        </button>
      </div>
    </div>
  );
}
