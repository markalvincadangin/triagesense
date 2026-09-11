import React from 'react';
import { useTriage } from '../../context/TriageContext';
import { Button } from '../../components/common/Button';
import { PainScale } from '../../components/kiosk/PainScale';
import { DurationSelector } from '../../components/kiosk/DurationSelector';
import { ArrowRight, ArrowLeft } from 'lucide-react';

export function PainDuration() {
  const { intakeDraft, updateDraft, setKioskStep } = useTriage();

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        padding: '32px 48px',
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
          Pain Level & Symptom Duration
        </h1>
        <h2
          style={{
            fontSize: '18px',
            fontWeight: '500',
            color: 'var(--color-text-secondary)',
            marginTop: '4px'
          }}
        >
          Kadasig kag kalawig sang imo ginabatyag (0 = No Pain, 10 = Worst Possible)
        </h2>
      </div>

      {/* Main Controls Stack */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '28px',
          width: '100%',
          maxWidth: '840px',
          margin: '16px auto 0'
        }}
      >
        {/* Pain Rating Section */}
        <div style={{ width: '100%' }}>
          <div
            style={{
              fontSize: '17px',
              fontWeight: '700',
              color: 'var(--color-text-primary)',
              marginBottom: '12px'
            }}
          >
            1. Rate Your Current Pain Level / Kabug-at sang Sakit:
          </div>
          <PainScale
            value={intakeDraft.painLevel || 0}
            onChange={(val) => updateDraft({ painLevel: val })}
          />
        </div>

        {/* Duration Selection Section */}
        <div style={{ width: '100%' }}>
          <div
            style={{
              fontSize: '17px',
              fontWeight: '700',
              color: 'var(--color-text-primary)',
              marginBottom: '12px'
            }}
          >
            2. How Long Have You Experienced These Symptoms? / Pila na ka oras o adlaw?
          </div>
          <DurationSelector
            value={intakeDraft.duration || '1–6 hours'}
            onChange={(val) => updateDraft({ duration: val })}
          />
        </div>
      </div>

      {/* Navigation Buttons */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          maxWidth: '840px',
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
          onClick={() => setKioskStep('body-map')}
          style={{ width: '180px' }}
        >
          Back / Balik
        </Button>

        <Button
          variant="primary"
          size="lg"
          trailingIcon={ArrowRight}
          onClick={() => setKioskStep('additional-details')}
          style={{ width: '280px' }}
        >
          Next: Additional Details
        </Button>
      </div>
    </div>
  );
}
