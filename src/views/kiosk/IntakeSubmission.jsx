import React, { useState } from 'react';
import { useTriage } from '../../context/TriageContext';
import { Button } from '../../components/common/Button';
import { ShieldCheck, Lock, Send, ArrowLeft, AlertCircle, Sparkles } from 'lucide-react';

export function IntakeSubmission() {
  const { submitKioskIntake, setKioskStep } = useTriage();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      submitKioskIntake();
    }, 1200);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        padding: '36px 48px',
        backgroundColor: 'var(--color-bg-canvas)',
        overflowY: 'auto'
      }}
    >
      {/* Header */}
      <div style={{ textAlign: 'center' }}>
        <h1
          style={{
            fontSize: '32px',
            fontWeight: '800',
            color: 'var(--color-text-primary)'
          }}
        >
          Submit Intake Record
        </h1>
        <h2
          style={{
            fontSize: '18px',
            fontWeight: '500',
            color: 'var(--color-text-secondary)',
            marginTop: '4px'
          }}
        >
          Ipasa ang imo impormasyon direkta sa triage staff station
        </h2>
      </div>

      {/* Main Submission Card */}
      <div
        style={{
          maxWidth: '720px',
          width: '100%',
          margin: '0 auto',
          backgroundColor: 'var(--color-bg-surface)',
          padding: '36px',
          borderRadius: 'var(--radius-xl)',
          border: '1.5px solid var(--color-border)',
          boxShadow: 'var(--shadow-card)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: '24px'
        }}
      >
        {/* Animated Icon Container */}
        <div
          style={{
            width: '80px',
            height: '80px',
            borderRadius: 'var(--radius-full)',
            backgroundColor: isSubmitting ? 'var(--color-wvsu-gold-light)' : 'var(--color-wvsu-primary-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: isSubmitting ? 'var(--color-wvsu-gold)' : 'var(--color-wvsu-primary)',
            transition: 'all 0.3s'
          }}
        >
          {isSubmitting ? (
            <Sparkles size={44} strokeWidth={2.4} />
          ) : (
            <ShieldCheck size={48} strokeWidth={2.4} />
          )}
        </div>

        <div>
          <h2 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--color-text-primary)' }}>
            {isSubmitting ? 'Packaging & Transmitting Record...' : 'Ready to Send to Triage Desk'}
          </h2>
          <p
            style={{
              fontSize: '16px',
              color: 'var(--color-text-secondary)',
              marginTop: '8px',
              lineHeight: '24px'
            }}
          >
            Upon clicking submit, your patient-reported intake will be securely transmitted to the Authorized Nurse Workstation in the Emergency Department.
          </p>
        </div>

        {/* Mandatory Clinical Non-Diagnostic Disclaimer Box */}
        <div
          style={{
            width: '100%',
            padding: '20px 24px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--color-bg-canvas)',
            border: '1.5px solid var(--color-border)',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '14px',
            textAlign: 'left'
          }}
        >
          <AlertCircle size={24} color="var(--color-wvsu-blue)" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div>
            <div style={{ fontSize: '15px', fontWeight: '700', color: 'var(--color-text-primary)' }}>
              Important Clinical Notice / Pahibalo:
            </div>
            <div
              style={{
                fontSize: '14px',
                color: 'var(--color-text-secondary)',
                lineHeight: '22px',
                marginTop: '4px'
              }}
            >
              "TriageSense provides preliminary patient-reported information only. It does not diagnose medical conditions or replace clinical triage."
            </div>
          </div>
        </div>

        {/* Encryption & Privacy Assurance */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--color-text-secondary)' }}>
          <Lock size={15} color="var(--color-wvsu-primary)" />
          <span>Compliant with DOH Healthcare Privacy & Data Protection Protocols</span>
        </div>

        {/* Submit Button */}
        <Button
          variant="primary"
          size="lg"
          fullWidth
          disabled={isSubmitting}
          icon={Send}
          onClick={handleSubmit}
          style={{ height: '74px', fontSize: '20px' }}
        >
          {isSubmitting ? 'TRANSMITTING INTAKE...' : 'SUBMIT INTAKE TO TRIAGE DESK'}
        </Button>
      </div>

      {/* Back Navigation */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          maxWidth: '720px',
          width: '100%',
          margin: '20px auto 0',
          paddingTop: '20px',
          borderTop: '1px solid var(--color-border)'
        }}
      >
        <Button
          variant="outline"
          size="md"
          icon={ArrowLeft}
          disabled={isSubmitting}
          onClick={() => setKioskStep('review')}
          style={{ width: '180px' }}
        >
          Back to Review
        </Button>
      </div>
    </div>
  );
}
