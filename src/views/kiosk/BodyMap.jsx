import React from 'react';
import { useTriage } from '../../context/TriageContext';
import { Button } from '../../components/common/Button';
import { BodyMap as BodyMapSelector } from '../../components/kiosk/BodyMap';
import { ArrowRight, ArrowLeft } from 'lucide-react';

export function BodyMap() {
  const { intakeDraft, toggleBodyLocation, setKioskStep } = useTriage();

  return (
    <div className="flex flex-col h-full px-12 py-8 bg-canvas select-none">
      {/* Header */}
      <div className="text-center mb-4 shrink-0">
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
        <BodyMapSelector
          selectedLocations={intakeDraft.bodyLocations}
          onToggleLocation={toggleBodyLocation}
        />
      </div>

      {/* Navigation Buttons (Docked cleanly at bottom) */}
      <div className="w-full max-w-4xl mx-auto mt-auto pt-4 border-t border-slate-200 flex items-center justify-between shrink-0">
        <Button
          variant="outline"
          size="md"
          icon={ArrowLeft}
          onClick={() => setKioskStep('symptoms')}
          className="px-8 py-3.5 text-sm font-bold"
        >
          Back / Balik
        </Button>

        <Button
          variant="primary"
          size="lg"
          trailingIcon={ArrowRight}
          onClick={() => setKioskStep('pain-duration')}
          className="px-10 py-4 text-base font-black shadow-lg bg-brand-green"
        >
          Next: Pain & Duration
        </Button>
      </div>
    </div>
  );
}
