import React from 'react';
import { Check } from 'lucide-react';

const STAGES = [
  { id: 1, name: 'Identify', key: 'patient-info' },
  { id: 2, name: 'Symptoms', key: 'symptoms' },
  { id: 3, name: 'Body Map', key: 'body-map' },
  { id: 4, name: 'Severity & Vitals', key: 'pain-duration' },
  { id: 5, name: 'Summary', key: 'review' }
];

export function ProgressStepper({ currentStep }) {
  // Map step code to 1-based stage number
  const getActiveStageNumber = () => {
    switch (currentStep) {
      case 'welcome':
      case 'language':
      case 'identification':
      case 'patient-info':
      case 'K01':
      case 'K02':
      case 'K03':
      case 'K04':
        return 1;
      case 'symptoms':
      case 'K05':
        return 2;
      case 'body-map':
      case 'K06':
        return 3;
      case 'pain-duration':
      case 'additional-details':
      case 'K07':
      case 'K08':
        return 4;
      case 'review':
      case 'submission':
      case 'confirmation':
      case 'K09':
      case 'K10':
      case 'K11':
        return 5;
      default:
        return 1;
    }
  };

  const getSubstepIndicator = () => {
    if (currentStep === 'patient-info') return 'Step 1 of 5 • Patient Demographics & Identification';
    if (currentStep === 'symptoms') return 'Step 2 of 5 • Chief Complaints & Voice Memo';
    if (currentStep === 'body-map') return 'Step 3 of 5 • Anatomical Location';
    if (currentStep === 'pain-duration') return 'Step 4 of 5 • Pain Scale & Vital Signs Sensor Bay';
    if (currentStep === 'review') return 'Step 5 of 5 • Review & Send to Triage Nurse';
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
