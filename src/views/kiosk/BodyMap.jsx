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
        <h1 className="text-3xl font-black text-text-primary tracking-tight">
          Where on Your Body Does It Hurt?
        </h1>
        <h2 className="text-base font-semibold text-text-secondary mt-1">
          Diin dampi sa imo lawas ang nagasakit? (Tap on the diagram or buttons)
        </h2>
      </div>

      {/* Anatomical Body Location Selector */}
      <div className="w-full max-w-4xl mx-auto my-2">
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
          Next: How Bad is the Pain?
        </Button>
      </div>
    </div>
  );
}
