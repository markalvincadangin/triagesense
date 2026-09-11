import React from 'react';
import { Check, Clock } from 'lucide-react';

const DURATIONS = [
  { id: 'Less than 1 hour', label: 'Less than 1 hour', dialect: 'Wala pa isa ka oras', urgent: true },
  { id: '1–6 hours', label: '1–6 hours', dialect: '1 tubtob 6 ka oras', urgent: false },
  { id: '6–24 hours', label: '6–24 hours', dialect: '6 tubtob 24 ka oras', urgent: false },
  { id: '1–3 days', label: '1–3 days', dialect: '1 tubtob 3 ka adlaw', urgent: false },
  { id: 'More than 3 days', label: 'More than 3 days', dialect: 'Sobra 3 ka adlaw', urgent: false },
  { id: 'Not sure', label: 'Not sure / Indeterminate', dialect: 'Wala sigurado', urgent: false }
];

export function DurationSelector({ value, onChange }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '16px',
        width: '100%',
        maxWidth: '840px'
      }}
    >
      {DURATIONS.map((item) => {
        const isSelected = value === item.id;

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onChange(item.id)}
            style={{
              minHeight: '74px',
              padding: '14px 20px',
              borderRadius: 'var(--radius-lg)',
              backgroundColor: isSelected ? 'var(--color-wvsu-primary-light)' : 'var(--color-bg-surface)',
              border: isSelected ? '2.5px solid var(--color-wvsu-primary)' : '1.5px solid var(--color-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
              textAlign: 'left',
              boxShadow: isSelected ? 'var(--shadow-card)' : 'none',
              transition: 'all 0.16s ease-in-out'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: isSelected ? 'var(--color-wvsu-primary)' : 'var(--color-bg-canvas)',
                  color: isSelected ? '#FFFFFF' : 'var(--color-text-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <Clock size={20} strokeWidth={2.2} />
              </div>

              <div>
                <div
                  style={{
                    fontSize: '17px',
                    fontWeight: isSelected ? '700' : '600',
                    color: isSelected ? 'var(--color-wvsu-primary)' : 'var(--color-text-primary)'
                  }}
                >
                  {item.label}
                </div>
                <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
                  {item.dialect}
                </div>
              </div>
            </div>

            <div
              style={{
                width: '26px',
                height: '26px',
                borderRadius: 'var(--radius-full)',
                border: isSelected ? 'none' : '1.5px solid var(--color-border)',
                backgroundColor: isSelected ? 'var(--color-wvsu-primary)' : 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF'
              }}
            >
              {isSelected && <Check size={18} strokeWidth={3} />}
            </div>
          </button>
        );
      })}
    </div>
  );
}
