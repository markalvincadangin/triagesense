import React from 'react';
import { Check } from 'lucide-react';

const STAGES = [
  { id: 1, name: 'Language', key: 'K02' },
  { id: 2, name: 'Identification', key: 'K03' },
  { id: 3, name: 'Patient Info', key: 'K04' },
  { id: 4, name: 'Symptoms', key: 'symptoms' }, // K05, K06, K07, K08
  { id: 5, name: 'Review', key: 'K09' },
  { id: 6, name: 'Submit', key: 'K10' }
];

export function ProgressStepper({ currentStep }) {
  // Map step code to 1-based stage number
  const getActiveStageNumber = () => {
    switch (currentStep) {
      case 'language':
      case 'K02': return 1;
      case 'identification':
      case 'K03': return 2;
      case 'patient-info':
      case 'K04': return 3;
      case 'symptoms':
      case 'body-map':
      case 'pain-duration':
      case 'additional-details':
      case 'K05':
      case 'K06':
      case 'K07':
      case 'K08':
        return 4;
      case 'review':
      case 'K09': return 5;
      case 'submission':
      case 'confirmation':
      case 'K10':
      case 'K11': return 6;
      default: return 1;
    }
  };

  const getSubstepIndicator = () => {
    if (currentStep === 'symptoms' || currentStep === 'K05') return 'Step 4.1 of 4 • Main Symptoms';
    if (currentStep === 'body-map' || currentStep === 'K06') return 'Step 4.2 of 4 • Body Location';
    if (currentStep === 'pain-duration' || currentStep === 'K07') return 'Step 4.3 of 4 • Pain & Duration';
    if (currentStep === 'additional-details' || currentStep === 'K08') return 'Step 4.4 of 4 • Additional Details';
    return null;
  };

  const activeStage = getActiveStageNumber();
  const substepText = getSubstepIndicator();

  return (
    <div className="w-full bg-surface border-b border-border-main px-10 py-3.5 flex flex-col gap-2 shrink-0 select-none">
      {/* 6 Stage Indicators */}
      <div className="flex items-center justify-between relative">
        {/* Background Connecting Line */}
        <div className="absolute top-[18px] left-8 right-8 h-[3px] bg-border-main z-0" />

        {/* Dynamic Progress Fill Line */}
        <div
          className="absolute top-[18px] left-8 h-[3px] bg-brand-green z-[1] transition-all duration-300 ease-in-out"
          style={{ width: `${((activeStage - 1) / (STAGES.length - 1)) * 100}%` }}
        />

        {STAGES.map((stage) => {
          const isCompleted = stage.id < activeStage;
          const isCurrent = stage.id === activeStage;

          return (
            <div key={stage.id} className="flex flex-col items-center gap-1.5 z-[2]">
              {/* Node Circle */}
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-200 ${
                  isCompleted
                    ? 'bg-brand-green text-white border-2 border-brand-green'
                    : isCurrent
                    ? 'bg-surface text-brand-green border-[3px] border-brand-green ring-4 ring-brand-gold-light'
                    : 'bg-surface text-text-secondary border-2 border-border-main'
                }`}
              >
                {isCompleted ? <Check size={18} strokeWidth={3} /> : stage.id}
              </div>

              {/* Stage Label */}
              <span
                className={`text-[13px] whitespace-nowrap ${
                  isCurrent
                    ? 'font-bold text-brand-green'
                    : isCompleted
                    ? 'font-medium text-text-primary'
                    : 'font-normal text-text-secondary'
                }`}
              >
                {stage.name}
              </span>
            </div>
          );
        })}
      </div>

      {/* Substep Clarification Indicator if in Stage 4 */}
      {substepText && (
        <div className="flex items-center justify-center mt-0.5">
          <span className="text-xs font-semibold px-3 py-0.5 rounded-full bg-brand-gold-light text-text-primary border border-amber-200">
            {substepText}
          </span>
        </div>
      )}
    </div>
  );
}
