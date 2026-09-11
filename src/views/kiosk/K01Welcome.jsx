import React from 'react';
import { useTriage } from '../../context/TriageContext';
import { Button } from '../../components/common/Button';
import { AssistanceModal } from '../../components/kiosk/AssistanceModal';
import {
  ShieldCheck,
  AlertTriangle,
  ArrowRight,
  Clock,
  Accessibility,
  Eye,
  PhoneCall,
  CheckCircle2
} from 'lucide-react';
import wvsumcLogo from '../../assets/wvsumc-logo.png';

export function K01Welcome() {
  const {
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

  const isCooldown = assistanceCooldownRemaining > 0;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '100%',
        padding: '32px 48px 24px',
        backgroundColor: 'var(--color-bg-canvas)',
        overflowY: 'auto'
      }}
    >
      {/* Top Reassurance & Hospital Badge */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: '14px',
          marginTop: '8px'
        }}
      >
        <img
          src={wvsumcLogo}
          alt="WVSU Medical Center Official Seal"
          className="w-24 h-24 object-contain drop-shadow-md shrink-0"
        />

        <div>
          <h1
            style={{
              fontSize: '34px',
              fontWeight: '800',
              color: 'var(--color-text-primary)',
              lineHeight: '42px',
              letterSpacing: '-0.02em'
            }}
          >
            Maayong Pag-abot sa WVSU MC
          </h1>
          <h2
            style={{
              fontSize: '22px',
              fontWeight: '600',
              color: 'var(--color-wvsu-primary)',
              marginTop: '4px'
            }}
          >
            Emergency Department Self-Service Intake
          </h2>
          <p
            style={{
              fontSize: '16px',
              color: 'var(--color-text-secondary)',
              maxWidth: '680px',
              margin: '8px auto 0',
              lineHeight: '24px'
            }}
          >
            TriageSense collects preliminary patient-provided information for triage staff review. Please check in to enter the nurse assessment queue.
          </p>
        </div>
      </div>

      {/* Dispatched / Cooldown Alert Banner */}
      {assistanceDispatched && (
        <div
          className="animate-fade-in"
          style={{
            width: '100%',
            maxWidth: '720px',
            padding: '16px 24px',
            borderRadius: 'var(--radius-lg)',
            backgroundColor: 'var(--color-success-light)',
            border: '2px solid var(--color-success)',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            boxShadow: 'var(--shadow-card)'
          }}
        >
          <CheckCircle2 size={28} color="var(--color-success)" strokeWidth={2.4} />
          <div>
            <div style={{ fontSize: '17px', fontWeight: '700', color: 'var(--color-success)' }}>
              Emergency Staff Dispatched to this Kiosk
            </div>
            <div style={{ fontSize: '14px', color: 'var(--color-text-primary)', marginTop: '2px' }}>
              Triage personnel have been alerted. Please stay at this kiosk. Cooldown lock active: ({assistanceCooldownRemaining}s).
            </div>
          </div>
        </div>
      )}

      {/* Core Action Zone */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '24px',
          width: '100%',
          maxWidth: '560px',
          margin: '20px 0'
        }}
      >
        {/* High-Urgency Emergency Box */}
        <div
          style={{
            width: '100%',
            padding: '20px 24px',
            borderRadius: 'var(--radius-xl)',
            backgroundColor: isCooldown ? '#F1F5F9' : 'var(--color-emergency-surface)',
            border: `2px solid ${isCooldown ? 'var(--color-border)' : 'var(--color-emergency-border)'}`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: '12px'
          }}
        >
          <div>
            <div
              style={{
                fontSize: '17px',
                fontWeight: '800',
                color: isCooldown ? 'var(--color-text-secondary)' : 'var(--color-emergency)',
                letterSpacing: '0.01em'
              }}
            >
              EXPERIENCING LIFE-THREATENING SYMPTOMS?
            </div>
            <div
              style={{
                fontSize: '13px',
                color: 'var(--color-text-secondary)',
                marginTop: '2px'
              }}
            >
              Chest pain, severe bleeding, or difficulty breathing
            </div>
          </div>

          <Button
            variant={isCooldown ? 'cooldown' : 'emergency'}
            size="lg"
            fullWidth
            icon={isCooldown ? Clock : AlertTriangle}
            disabled={isCooldown}
            onClick={triggerEmergencyModal}
          >
            {isCooldown
              ? `ASSISTANCE DISPATCHED (${assistanceCooldownRemaining}s)`
              : 'REQUEST IMMEDIATE ASSISTANCE'}
          </Button>
        </div>

        {/* Visual Divider */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            width: '100%'
          }}
        >
          <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--color-border)' }} />
          <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--color-text-secondary)' }}>
            OR START STANDARD INTAKE
          </span>
          <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--color-border)' }} />
        </div>

        {/* Primary Action Button */}
        <Button
          variant="primary"
          size="lg"
          fullWidth
          trailingIcon={ArrowRight}
          onClick={() => setKioskStep('K02')}
          style={{ height: '76px', fontSize: '22px' }}
        >
          START INTAKE / SUGDAN
        </Button>
      </div>

      {/* Language Quick-Selector Bar */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px',
          width: '100%',
          maxWidth: '640px'
        }}
      >
        <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--color-text-secondary)' }}>
          Preferred Language / Pilia ang Pulong:
        </span>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {[
            { id: 'hil', label: 'Hiligaynon (Ilonggo)' },
            { id: 'en', label: 'English' },
            { id: 'fil', label: 'Filipino (Tagalog)' },
            { id: 'ceb', label: 'Cebuano (Bisaya)' }
          ].map((lang) => (
            <button
              key={lang.id}
              type="button"
              onClick={() => setKioskLanguage(lang.id)}
              style={{
                padding: '8px 16px',
                borderRadius: 'var(--radius-full)',
                fontSize: '14px',
                fontWeight: kioskLanguage === lang.id ? '700' : '500',
                border: kioskLanguage === lang.id
                  ? '2px solid var(--color-wvsu-primary)'
                  : '1.5px solid var(--color-border)',
                backgroundColor: kioskLanguage === lang.id
                  ? 'var(--color-wvsu-primary-light)'
                  : 'var(--color-bg-surface)',
                color: kioskLanguage === lang.id
                  ? 'var(--color-wvsu-primary)'
                  : 'var(--color-text-secondary)',
                cursor: 'pointer'
              }}
            >
              {lang.label}
            </button>
          ))}
        </div>
      </div>

      {/* Accessibility & Institutional Footer */}
      <footer
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderTop: '1px solid var(--color-border)',
          paddingTop: '16px',
          marginTop: '16px',
          fontSize: '13px',
          color: 'var(--color-text-secondary)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button
            type="button"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              border: 'none',
              background: 'transparent',
              color: 'var(--color-text-secondary)',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            <Accessibility size={16} />
            <span>Lower Screen Access</span>
          </button>

          <button
            type="button"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              border: 'none',
              background: 'transparent',
              color: 'var(--color-text-secondary)',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            <Eye size={16} />
            <span>High Contrast</span>
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '600' }}>
          <PhoneCall size={14} color="var(--color-wvsu-primary)" />
          <span>Staff Hotline: Local 101</span>
        </div>
      </footer>

      {/* Anti-Spam Confirmation Modal */}
      <AssistanceModal
        isOpen={isAssistanceModalOpen}
        onCancel={cancelEmergencyModal}
        onConfirm={confirmEmergencyAssistance}
      />
    </div>
  );
}
