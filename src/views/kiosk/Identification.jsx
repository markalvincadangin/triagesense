import React, { useState } from 'react';
import { useTriage } from '../../context/TriageContext';
import { Button } from '../../components/common/Button';
import {
  CreditCard,
  QrCode,
  Wifi,
  Edit3,
  Check,
  ArrowRight,
  ArrowLeft,
  Sparkles
} from 'lucide-react';

const ID_OPTIONS = [
  {
    id: 'Hospital ID',
    title: 'WVSUMC Patient Hospital ID',
    desc: 'Scan barcode or enter your existing patient number',
    icon: CreditCard,
    accent: '#006B3F'
  },
  {
    id: 'QR Code',
    title: 'PhilHealth or National ID QR',
    desc: 'Hold digital or physical QR code below the scanner',
    icon: QrCode,
    accent: '#0057A8'
  },
  {
    id: 'NFC',
    title: 'NFC Contactless Card Tap',
    desc: 'Tap your hospital health card or PhilSys smart card',
    icon: Wifi,
    accent: '#F2B705'
  },
  {
    id: 'Manual Entry',
    title: 'First-Time Visit / Manual Entry',
    desc: 'Register manually using on-screen keyboard',
    icon: Edit3,
    accent: '#505F78'
  }
];

export function Identification() {
  const { intakeDraft, updateDraft, setKioskStep } = useTriage();
  const [simulatedScan, setSimulatedScan] = useState(false);

  const selectedId = intakeDraft.identification || 'Hospital ID';

  const handleSelect = (idType) => {
    updateDraft({ identification: idType });
    if (idType === 'QR Code' || idType === 'NFC' || idType === 'Hospital ID') {
      setSimulatedScan(true);
      setTimeout(() => {
        setSimulatedScan(false);
      }, 1200);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        padding: '36px 48px',
        backgroundColor: 'var(--color-bg-canvas)'
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
          Patient Identification
        </h1>
        <h2
          style={{
            fontSize: '18px',
            fontWeight: '500',
            color: 'var(--color-text-secondary)',
            marginTop: '4px'
          }}
        >
          Choose how you would like to identify yourself at this terminal
        </h2>
      </div>

      {/* 4 Cards Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '20px',
          maxWidth: '820px',
          width: '100%',
          margin: '0 auto'
        }}
      >
        {ID_OPTIONS.map((opt) => {
          const isSelected = selectedId === opt.id;
          const Icon = opt.icon;

          return (
            <div
              key={opt.id}
              onClick={() => handleSelect(opt.id)}
              style={{
                minHeight: '140px',
                padding: '24px',
                borderRadius: 'var(--radius-lg)',
                backgroundColor: isSelected ? 'var(--color-wvsu-primary-light)' : 'var(--color-bg-surface)',
                border: isSelected ? '3px solid var(--color-wvsu-primary)' : '1.5px solid var(--color-border)',
                boxShadow: isSelected ? 'var(--shadow-hover)' : 'var(--shadow-card)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                transition: 'all 0.16s ease-in-out'
              }}
            >
              <div style={{ display: 'flex', gap: '16px' }}>
                <div
                  style={{
                    width: '54px',
                    height: '54px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: isSelected ? 'var(--color-wvsu-primary)' : 'var(--color-bg-canvas)',
                    color: isSelected ? '#FFFFFF' : opt.accent,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <Icon size={28} strokeWidth={2.2} />
                </div>

                <div>
                  <div
                    style={{
                      fontSize: '19px',
                      fontWeight: '700',
                      color: isSelected ? 'var(--color-wvsu-primary)' : 'var(--color-text-primary)'
                    }}
                  >
                    {opt.title}
                  </div>
                  <div
                    style={{
                      fontSize: '14px',
                      color: 'var(--color-text-secondary)',
                      marginTop: '4px',
                      lineHeight: '20px'
                    }}
                  >
                    {opt.desc}
                  </div>
                </div>
              </div>

              <div
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: 'var(--radius-full)',
                  border: isSelected ? 'none' : '1.5px solid var(--color-border)',
                  backgroundColor: isSelected ? 'var(--color-wvsu-primary)' : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  flexShrink: 0
                }}
              >
                {isSelected && <Check size={18} strokeWidth={3} />}
              </div>
            </div>
          );
        })}
      </div>

      {/* Simulated Scanner Feedback Banner */}
      <div
        style={{
          maxWidth: '820px',
          width: '100%',
          margin: '0 auto',
          minHeight: '44px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {simulatedScan && (
          <div
            className="animate-fade-in"
            style={{
              padding: '8px 20px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--color-wvsu-gold-light)',
              border: '1.5px solid var(--color-wvsu-gold)',
              color: 'var(--color-text-primary)',
              fontSize: '14px',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <Sparkles size={16} color="var(--color-wvsu-gold)" />
            <span>Scanning {selectedId} — please hold steady...</span>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          maxWidth: '820px',
          width: '100%',
          margin: '0 auto',
          paddingTop: '20px',
          borderTop: '1px solid var(--color-border)'
        }}
      >
        <Button
          variant="outline"
          size="md"
          icon={ArrowLeft}
          onClick={() => setKioskStep('language')}
          style={{ width: '180px' }}
        >
          Back / Balik
        </Button>

        <Button
          variant="primary"
          size="lg"
          trailingIcon={ArrowRight}
          onClick={() => setKioskStep('patient-info')}
          style={{ width: '280px' }}
        >
          Continue / Padayon
        </Button>
      </div>
    </div>
  );
}
