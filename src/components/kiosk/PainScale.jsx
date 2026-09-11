import React from 'react';

const PAIN_SCORES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export function PainScale({ value = 0, onChange }) {
  const getSeverityInfo = (score) => {
    if (score <= 2) {
      return {
        tier: 'Low Pain / Mahinay',
        desc: 'Minor discomfort; fully manageable and functional.',
        bg: 'var(--color-pain-mild)',
        textColor: '#172B4D',
        pillBg: '#10B981'
      };
    }
    if (score <= 5) {
      return {
        tier: 'Moderate Pain / Sakto Lang',
        desc: 'Noticeable discomfort; interferes with daily activities.',
        bg: 'var(--color-pain-moderate)',
        textColor: '#172B4D',
        pillBg: '#F59E0B'
      };
    }
    if (score <= 8) {
      return {
        tier: 'High Pain / Masakit Gid',
        desc: 'Severe pain; difficulty concentrating or moving comfortably.',
        bg: 'var(--color-pain-severe)',
        textColor: '#FFFFFF',
        pillBg: '#F97316'
      };
    }
    return {
      tier: 'Severe Pain / Sobra Kasakit',
      desc: 'Incapacitating, unbearable pain; requires urgent clinician review.',
      bg: 'var(--color-pain-worst)',
      textColor: '#FFFFFF',
      pillBg: '#B91C1C'
    };
  };

  const currentSeverity = getSeverityInfo(value);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '24px',
        width: '100%',
        maxWidth: '840px'
      }}
    >
      {/* Real-Time Qualitative Banner */}
      <div
        style={{
          width: '100%',
          padding: '20px 24px',
          borderRadius: 'var(--radius-lg)',
          backgroundColor: 'var(--color-bg-surface)',
          border: `2.5px solid ${currentSeverity.pillBg}`,
          boxShadow: 'var(--shadow-card)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: currentSeverity.pillBg,
              color: currentSeverity.textColor,
              fontSize: '24px',
              fontWeight: '800',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            {value}
          </div>

          <div>
            <div style={{ fontSize: '20px', fontWeight: '700', color: 'var(--color-text-primary)' }}>
              {currentSeverity.tier}
            </div>
            <div style={{ fontSize: '15px', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
              {currentSeverity.desc}
            </div>
          </div>
        </div>

        <div
          style={{
            fontSize: '13px',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            padding: '6px 14px',
            borderRadius: 'var(--radius-full)',
            backgroundColor: `${currentSeverity.pillBg}20`,
            color: currentSeverity.pillBg
          }}
        >
          Selected: {value} / 10
        </div>
      </div>

      {/* 11-Pill Numeric Touch Button Matrix */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          flexWrap: 'wrap',
          width: '100%'
        }}
      >
        {PAIN_SCORES.map((score) => {
          const isSelected = value === score;
          const scoreInfo = getSeverityInfo(score);

          return (
            <button
              key={score}
              type="button"
              onClick={() => onChange(score)}
              style={{
                width: '64px',
                height: '64px',
                borderRadius: 'var(--radius-full)',
                border: isSelected ? `3px solid ${scoreInfo.pillBg}` : '2px solid var(--color-border)',
                backgroundColor: isSelected ? scoreInfo.pillBg : 'var(--color-bg-surface)',
                color: isSelected ? scoreInfo.textColor : 'var(--color-text-primary)',
                fontSize: '22px',
                fontWeight: '800',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: isSelected ? 'var(--shadow-hover)' : 'var(--shadow-sm)',
                transform: isSelected ? 'scale(1.1)' : 'scale(1)',
                transition: 'all 0.16s ease-in-out'
              }}
            >
              {score}
            </button>
          );
        })}
      </div>

      {/* Range Indicator Labels */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          padding: '0 12px',
          fontSize: '13px',
          fontWeight: '600',
          color: 'var(--color-text-secondary)'
        }}
      >
        <span>0 = No Pain (Wala sing Sakit)</span>
        <span>5 = Moderate Pain</span>
        <span>10 = Worst Possible Pain</span>
      </div>
    </div>
  );
}
