import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { useTriage } from '../../context/TriageContext';
import { BodyMap as BodyMapSelector } from '../../components/kiosk/BodyMap';
import { KioskFooterNav } from '../../components/kiosk/KioskFooterNav';

export function BodyMap() {
  const { intakeDraft, toggleBodyLocation, setKioskStep, t } = useTriage();
  const [errorMsg, setErrorMsg] = useState('');

  const selectedLocations = intakeDraft.bodyLocations || [];

  const handleToggleLocation = (locId, view) => {
    toggleBodyLocation(locId, view);
    if (errorMsg) setErrorMsg('');
  };

  const handleNext = () => {
    if (selectedLocations.length === 0) {
      setErrorMsg(t('bodyMap.errorRequired'));
      return;
    }
    setErrorMsg('');
    setKioskStep('pain-duration');
  };

  return (
    <div className="flex flex-col h-full px-12 py-8 bg-canvas select-none overflow-y-auto">
      {/* Header */}
      <div className="text-center mb-6 shrink-0">
        <h1 className="text-4xl font-black text-text-primary tracking-tight">
          {t('bodyMap.stepTitle')}
        </h1>
        <h2 className="text-xl font-bold text-text-secondary mt-2">
          {t('bodyMap.stepSubtitle')}
        </h2>
      </div>

      {/* Anatomical Body Location Selector */}
      <div className="w-full max-w-[960px] mx-auto my-2 shrink-0">
        <BodyMapSelector
          selectedLocations={selectedLocations}
          onToggleLocation={handleToggleLocation}
        />
      </div>

      {/* Validation Error Banner */}
      {errorMsg && (
        <div className="w-full max-w-[960px] mx-auto mt-4 p-4 rounded-2xl bg-red-50 border border-emergency-border text-emergency-dark text-base font-bold flex items-center gap-3 animate-shake shrink-0">
          <AlertCircle size={22} className="text-emergency shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Standardized Bottom Navigation */}
      <KioskFooterNav
        onBack={() => setKioskStep('symptoms')}
        onNext={handleNext}
        backLabel={t('bodyMap.btnBack')}
        nextLabel={t('bodyMap.btnNext')}
      />
    </div>
  );
}
