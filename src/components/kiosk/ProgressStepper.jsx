import React from 'react';
import { useTriage } from '../../context/TriageContext';
import { Check } from 'lucide-react';

const STAGE_KEYS = [
  { id: 1, key: 'info' },
  { id: 2, key: 'symptoms' },
  { id: 3, key: 'bodyMap' },
  { id: 4, key: 'painVitals' },
  { id: 5, key: 'review' }
];

export function ProgressStepper({ currentStep }) {
  const { t } = useTriage();

  // Map active kiosk step to 1-based stage number (Official 5-Step ESI Model)
  const getActiveStageNumber = () => {
    switch (currentStep) {
      case 'patient-info':
        return 1;
      case 'symptoms':
        return 2;
      case 'body-map':
        return 3;
      case 'pain-duration':
        return 4;
      case 'review':
        return 5;
      default:
        return 1;
    }
  };

  const getSubstepIndicator = () => {
    switch (currentStep) {
      case 'patient-info':
        return t('stepper.substeps.patient-info');
      case 'symptoms':
        return t('stepper.substeps.symptoms');
      case 'body-map':
        return t('stepper.substeps.body-map');
      case 'pain-duration':
        return t('stepper.substeps.pain-duration');
      case 'review':
        return t('stepper.substeps.review');
      default:
        return null;
    }
  };

  const activeStage = getActiveStageNumber();
  const substepText = getSubstepIndicator();

  return (
    <div className="w-full bg-surface border-b border-border-main px-12 py-5 flex flex-col gap-3 shrink-0 select-none">
      {/* 5 Stage Indicators */}
      <div className="flex items-center justify-between relative">
        {/* Background Connecting Line */}
        <div className="absolute top-[24px] left-10 right-10 h-[4px] bg-border-main z-0" />

        {/* Dynamic Progress Fill Line */}
        <div
          className="absolute top-[24px] left-10 h-[4px] bg-brand-green z-[1] transition-all duration-300 ease-in-out"
          style={{ width: `${((activeStage - 1) / (STAGE_KEYS.length - 1)) * 100}%` }}
        />

        {STAGE_KEYS.map((stage) => {
          const isCompleted = stage.id < activeStage;
          const isCurrent = stage.id === activeStage;
          const stageName = t(`stepper.stages.${stage.key}`);

          return (
            <div key={stage.id} className="flex flex-col items-center gap-2 z-[2]">
              {/* Node Circle (48px touch-sized orientation node) */}
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center text-base font-black transition-all duration-200 ${
                  isCompleted
                    ? 'bg-brand-green text-white border-2 border-brand-green shadow-sm'
                    : isCurrent
                    ? 'bg-surface text-brand-green border-[3px] border-brand-green ring-4 ring-emerald-100 shadow-md'
                    : 'bg-surface text-text-secondary border-2 border-border-main'
                }`}
              >
                {isCompleted ? <Check size={22} strokeWidth={3} /> : stage.id}
              </div>

              {/* Stage Label */}
              <span
                className={`text-[15px] whitespace-nowrap ${
                  isCurrent
                    ? 'font-bold text-brand-green'
                    : isCompleted
                    ? 'font-bold text-text-primary'
                    : 'font-medium text-text-secondary'
                }`}
              >
                {stageName}
              </span>
            </div>
          );
        })}
      </div>

      {/* Substep Clarification Indicator */}
      {substepText && (
        <div className="flex items-center justify-center mt-1">
          <span className="text-sm font-bold px-4 py-1 rounded-full bg-emerald-50 text-brand-green border border-emerald-200 shadow-sm">
            {substepText}
          </span>
        </div>
      )}
    </div>
  );
}

