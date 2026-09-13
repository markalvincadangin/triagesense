import React from 'react';
import { useTriage } from '../../context/TriageContext';

const PAIN_SCORES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export function PainScale({ value = 0, onChange }) {
  const { t } = useTriage();

  const getSeverityInfo = (score) => {
    if (score <= 2) {
      return {
        tier: t('painScale.tiers.mild.title'),
        desc: t('painScale.tiers.mild.desc'),
        bgClass: 'bg-pain-mild text-white',
        borderClass: 'border-pain-mild',
        badgeClass: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      };
    }
    if (score <= 5) {
      return {
        tier: t('painScale.tiers.moderate.title'),
        desc: t('painScale.tiers.moderate.desc'),
        bgClass: 'bg-pain-moderate text-white',
        borderClass: 'border-pain-moderate',
        badgeClass: 'bg-amber-100 text-amber-900 border-amber-300'
      };
    }
    if (score <= 8) {
      return {
        tier: t('painScale.tiers.high.title'),
        desc: t('painScale.tiers.high.desc'),
        bgClass: 'bg-pain-severe text-white',
        borderClass: 'border-pain-severe',
        badgeClass: 'bg-orange-100 text-orange-900 border-orange-300'
      };
    }
    return {
      tier: t('painScale.tiers.severe.title'),
      desc: t('painScale.tiers.severe.desc'),
      bgClass: 'bg-pain-worst text-white',
      borderClass: 'border-pain-worst',
      badgeClass: 'bg-red-100 text-red-900 border-red-300'
    };
  };

  const currentSeverity = getSeverityInfo(value);

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-[880px] mx-auto select-none">
      {/* Real-Time Qualitative Banner */}
      <div
        className={`w-full p-5 rounded-2xl bg-surface border-2 ${currentSeverity.borderClass} shadow-card flex items-center justify-between flex-wrap gap-3 transition-all duration-200`}
      >
        <div className="flex items-center gap-4">
          <div
            className={`w-14 h-14 rounded-full ${currentSeverity.bgClass} text-2xl font-black flex items-center justify-center shadow-sm shrink-0`}
          >
            {value}
          </div>

          <div>
            <div className="text-xl font-bold text-text-primary">
              {currentSeverity.tier}
            </div>
            <div className="text-base text-text-secondary mt-0.5">
              {currentSeverity.desc}
            </div>
          </div>
        </div>

        <div
          className={`text-sm font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full border ${currentSeverity.badgeClass}`}
        >
          {t('painScale.selected')}: {value} / 10
        </div>
      </div>

      {/* 11-Pill Numeric Touch Button Matrix - P2 Expanded Padding & Tremor Compensation */}
      <div className="flex items-center justify-between gap-2 sm:gap-3 w-full py-2 px-1">
        {PAIN_SCORES.map((score) => {
          const isSelected = value === score;
          const scoreInfo = getSeverityInfo(score);

          return (
            <div key={score} className="p-0.5 flex items-center justify-center">
              <button
                type="button"
                onClick={() => onChange(score)}
                className={`w-[68px] h-[68px] sm:w-[72px] sm:h-[72px] rounded-full font-black text-2xl sm:text-3xl flex items-center justify-center cursor-pointer transition-all duration-150 relative ${
                  isSelected
                    ? `${scoreInfo.bgClass} scale-115 shadow-card-hover border-3 border-white ring-4 ring-brand-green/40 z-10`
                    : 'bg-surface text-text-primary border-2 border-slate-300 hover:border-slate-500 shadow-subtle hover:scale-105 active:scale-95 hover:bg-slate-50'
                }`}
              >
                {score}
              </button>
            </div>
          );
        })}
      </div>

      {/* Range Indicator Labels with Color Badges */}
      <div className="flex justify-between w-full px-2 text-sm font-bold text-text-secondary">
        <span className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-pain-mild shrink-0" />
          <span>{t('painScale.rangeNoPain')}</span>
        </span>
        <span className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-pain-moderate shrink-0" />
          <span>{t('painScale.rangeModerate')}</span>
        </span>
        <span className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-pain-worst shrink-0" />
          <span>{t('painScale.rangeWorst')}</span>
        </span>
      </div>
    </div>
  );
}

