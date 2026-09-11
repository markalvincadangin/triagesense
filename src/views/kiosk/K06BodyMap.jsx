import React from 'react';
import { useTriage } from '../../context/TriageContext';
import { Button } from '../../components/common/Button';
import { BodyMap } from '../../components/kiosk/BodyMap';
import { ArrowRight, ArrowLeft } from 'lucide-react';

export function K06BodyMap() {
  const { intakeDraft, toggleBodyLocation, setKioskStep } = useTriage();

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
          Select Body Location
        </h1>
        <h2
          style={{
            fontSize: '18px',
            fontWeight: '500',
            color: 'var(--color-text-secondary)',
            marginTop: '4px'
          }}
        >
          Diin dampi ang imo ginabatyag nga sakit ukon samad? (Tap on the diagram or region buttons)
        </h2>
      </div>

      {/* Anatomical Body Location Selector */}
      <div style={{ width: '100%', maxWidth: '840px', margin: '16px auto 0' }}>
        <BodyMap
          selectedLocations={intakeDraft.bodyLocations}
          onToggleLocation={toggleBodyLocation}
        />
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
          onClick={() => setKioskStep('K05')}
          style={{ width: '180px' }}
        >
          Back / Balik
        </Button>

        <Button
          variant="primary"
          size="lg"
          trailingIcon={ArrowRight}
          onClick={() => setKioskStep('K07')}
          style={{ width: '280px' }}
        >
          Next: Pain & Duration
        </Button>
      </div>
    </div>
  );
}
