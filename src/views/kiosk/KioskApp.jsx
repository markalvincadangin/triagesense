import React from 'react';
import { useTriage } from '../../context/TriageContext';
import { KioskHeader } from '../../components/kiosk/KioskHeader';
import { ProgressStepper } from '../../components/kiosk/ProgressStepper';
import { Welcome } from './Welcome';
import { PatientInfo } from './PatientInfo';
import { Symptoms } from './Symptoms';
import { BodyMap } from './BodyMap';
import { PainDuration } from './PainDuration';
import { IntakeReview } from './IntakeReview';
import { TicketConfirmation } from './TicketConfirmation';
import { AssistanceModal } from '../../components/kiosk/AssistanceModal';

export function KioskApp() {
  const {
    kioskStep,
    resetKioskSession,
    isAssistanceModalOpen,
    cancelEmergencyModal,
    confirmEmergencyAssistance
  } = useTriage();

  const renderCurrentStep = () => {
    switch (kioskStep) {
      case 'welcome':
        return <Welcome />;
      case 'patient-info':
        return <PatientInfo />;
      case 'symptoms':
        return <Symptoms />;
      case 'body-map':
        return <BodyMap />;
      case 'pain-duration':
        return <PainDuration />;
      case 'review':
        return <IntakeReview />;
      case 'confirmation':
        return <TicketConfirmation />;
      default:
        return <Welcome />;
    }
  };

  const showStepper = kioskStep !== 'welcome' && kioskStep !== 'confirmation';

  return (
    <div data-kiosk-screen className="w-[1080px] h-[1920px] bg-canvas flex flex-col relative overflow-hidden font-sans">
      {/* Kiosk Hardware Header */}
      <KioskHeader onLogoClick={resetKioskSession} />

      {/* 5-Stage Progress Stepper */}
      {showStepper && <ProgressStepper currentStep={kioskStep} />}

      {/* Main Screen Content Body */}
      <main className="flex-1 overflow-y-auto flex flex-col">
        {renderCurrentStep()}
      </main>

      {/* Global Kiosk Screen Assistance Modal (Contained strictly inside 1080x1920 kiosk display) */}
      <AssistanceModal
        isOpen={isAssistanceModalOpen}
        onCancel={cancelEmergencyModal}
        onConfirm={confirmEmergencyAssistance}
      />
    </div>
  );
}
