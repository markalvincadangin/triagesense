import React from 'react';
import { useTriage } from '../../context/TriageContext';
import { KioskHeader } from '../../components/kiosk/KioskHeader';
import { ProgressStepper } from '../../components/kiosk/ProgressStepper';
import { K01Welcome } from './K01Welcome';
import { K02Language } from './K02Language';
import { K03Identification } from './K03Identification';
import { K04PatientInfo } from './K04PatientInfo';
import { K05Symptoms } from './K05Symptoms';
import { K06BodyMap } from './K06BodyMap';
import { K07PainDuration } from './K07PainDuration';
import { K08AdditionalDetails } from './K08AdditionalDetails';
import { K09Review } from './K09Review';
import { K10Submit } from './K10Submit';
import { K11Confirmation } from './K11Confirmation';

export function KioskApp() {
  const { kioskStep, resetKioskSession } = useTriage();

  const renderCurrentStep = () => {
    switch (kioskStep) {
      case 'K01': return <K01Welcome />;
      case 'K02': return <K02Language />;
      case 'K03': return <K03Identification />;
      case 'K04': return <K04PatientInfo />;
      case 'K05': return <K05Symptoms />;
      case 'K06': return <K06BodyMap />;
      case 'K07': return <K07PainDuration />;
      case 'K08': return <K08AdditionalDetails />;
      case 'K09': return <K09Review />;
      case 'K10': return <K10Submit />;
      case 'K11': return <K11Confirmation />;
      default: return <K01Welcome />;
    }
  };

  const showStepper = kioskStep !== 'K01' && kioskStep !== 'K11';

  return (
    <div className="w-[1080px] h-[1920px] bg-canvas flex flex-col relative overflow-hidden font-sans">
      {/* Kiosk Hardware Header */}
      <KioskHeader onLogoClick={resetKioskSession} />

      {/* 6-Stage Progress Stepper (Intake steps K02 - K10) */}
      {showStepper && <ProgressStepper currentStep={kioskStep} />}

      {/* Main Screen Content Body */}
      <main className="flex-1 overflow-y-auto flex flex-col">
        {renderCurrentStep()}
      </main>
    </div>
  );
}
