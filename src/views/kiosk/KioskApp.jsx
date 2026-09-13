import React from 'react';
import { useTriage } from '../../context/TriageContext';
import { KioskHeader } from '../../components/kiosk/KioskHeader';
import { ProgressStepper } from '../../components/kiosk/ProgressStepper';
import { Welcome } from './Welcome';
import { PatientInfo } from './PatientInfo';
import { Symptoms } from './Symptoms';
import { BodyMap } from './BodyMap';
import { PainDuration } from './PainDuration';
import { AdditionalDetails } from './AdditionalDetails';
import { IntakeReview } from './IntakeReview';
import { IntakeSubmission } from './IntakeSubmission';
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
      case 'K01':
        return <Welcome />;
      case 'patient-info':
      case 'K04':
        return <PatientInfo />;
      case 'symptoms':
      case 'K05':
        return <Symptoms />;
      case 'body-map':
      case 'K06':
        return <BodyMap />;
      case 'pain-duration':
      case 'K07':
        return <PainDuration />;
      case 'additional-details':
      case 'K08':
        return <AdditionalDetails />;
      case 'review':
      case 'K09':
        return <IntakeReview />;
      case 'submission':
      case 'K10':
        return <IntakeSubmission />;
      case 'confirmation':
      case 'K11':
        return <TicketConfirmation />;
      default:
        return <Welcome />;
    }
  };

  const showStepper =
    kioskStep !== 'welcome' &&
    kioskStep !== 'K01' &&
    kioskStep !== 'confirmation' &&
    kioskStep !== 'K11';

  return (
    <div data-kiosk-screen className="w-[1080px] h-[1920px] bg-canvas flex flex-col relative overflow-hidden font-sans">
      {/* Kiosk Hardware Header */}
      <KioskHeader onLogoClick={resetKioskSession} />

      {/* 6-Stage Progress Stepper */}
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
