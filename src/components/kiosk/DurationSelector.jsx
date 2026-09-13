import React from 'react';
import { useTriage } from '../../context/TriageContext';
import { Check, Clock } from 'lucide-react';

const DURATION_KEYS = [
  'Less than 1 hour',
  '1–6 hours',
  '6–24 hours',
  '1–3 days',
  'More than 3 days',
  'Not sure'
];

export function DurationSelector({ value, onChange }) {
  const { t } = useTriage();

  return (
    <div className="grid grid-cols-2 gap-4 w-full max-w-[880px] mx-auto select-none">
      {DURATION_KEYS.map((key) => {
        const isSelected = value === key;
        const localizedLabel = t(`durations.${key}`, key);

        return (
          <button
            key={key}
            type="button"
            onClick={() => onChange(key)}
            className={`min-h-[80px] p-5 sm:px-6 rounded-2xl flex items-center justify-between cursor-pointer text-left transition-all duration-150 border-2 group ${
              isSelected
                ? 'bg-emerald-50/90 border-brand-green shadow-card ring-2 ring-brand-green/25'
                : 'bg-surface border-border-main hover:border-border-hover hover:bg-canvas shadow-subtle'
            }`}
          >
            <div className="flex items-center gap-4 flex-1">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                  isSelected
                    ? 'bg-brand-green text-white shadow-sm'
                    : 'bg-canvas text-text-secondary'
                }`}
              >
                <Clock size={24} strokeWidth={2.2} />
              </div>

              <div className="flex-1">
                <div
                  className={`text-xl leading-snug ${
                    isSelected ? 'font-black text-brand-green' : 'font-bold text-text-primary'
                  }`}
                >
                  {localizedLabel}
                </div>
              </div>
            </div>

            {/* Checkbox Icon Pill - Vertically Centered with Card */}
            <div
              className={`w-9 h-9 rounded-xl shrink-0 flex items-center justify-center transition-all duration-150 ${
                isSelected
                  ? 'bg-brand-green text-white shadow-sm ring-2 ring-brand-green/30'
                  : 'border-2 border-slate-300 bg-surface/60 group-hover:border-slate-400'
              }`}
            >
              {isSelected && <Check size={20} strokeWidth={3.5} />}
            </div>
          </button>
        );
      })}
    </div>
  );
}
