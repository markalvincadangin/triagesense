import React from 'react';
import { useTriage } from '../../context/TriageContext';
import { Button } from '../../components/common/Button';
import { Check, ArrowRight, ArrowLeft, Globe } from 'lucide-react';

const LANGUAGES = [
  {
    id: 'hil',
    name: 'Hiligaynon',
    region: 'Ilonggo / Panay & Guimaras',
    greeting: 'Maayong adlaw! Palihog pilia ang Hiligaynon para sa imo pag-intake.',
    flag: 'HLG'
  },
  {
    id: 'en',
    name: 'English',
    region: 'Standard Clinical Interface',
    greeting: 'Welcome. Please select English to proceed with your self-service intake.',
    flag: 'ENG'
  },
  {
    id: 'fil',
    name: 'Filipino',
    region: 'Tagalog / Pambansang Wika',
    greeting: 'Magandang araw! Piliin ang Filipino para sa pagpapatala sa triage.',
    flag: 'FIL'
  },
  {
    id: 'ceb',
    name: 'Cebuano',
    region: 'Bisaya / Central Visayas',
    greeting: 'Maayong adlaw! Palihug pilia ang Binisaya aron makasugod.',
    flag: 'CEB'
  }
];

export function K02Language() {
  const { kioskLanguage, setKioskLanguage, setKioskStep } = useTriage();

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        padding: '36px 48px',
        backgroundColor: 'var(--color-bg-canvas)'
      }}
    >
      {/* Title & Instructions */}
      <div style={{ textAlign: 'center' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 16px',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'var(--color-wvsu-blue-light)',
            color: 'var(--color-wvsu-blue)',
            fontSize: '13px',
            fontWeight: '700',
            marginBottom: '12px'
          }}
        >
          <Globe size={16} />
          <span>Stage 1 of 6 • Language Selection</span>
        </div>

        <h1
          style={{
            fontSize: '32px',
            fontWeight: '800',
            color: 'var(--color-text-primary)'
          }}
        >
          Select Your Preferred Dialect
        </h1>
        <h2
          style={{
            fontSize: '20px',
            fontWeight: '500',
            color: 'var(--color-text-secondary)',
            marginTop: '4px'
          }}
        >
          Pilia ang pulong nga mas komportable ka gamiton
        </h2>
      </div>

      {/* 4 Large Touch Language Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '20px',
          maxWidth: '800px',
          width: '100%',
          margin: '0 auto'
        }}
      >
        {LANGUAGES.map((item) => {
          const isSelected = kioskLanguage === item.id;

          return (
            <div
              key={item.id}
              onClick={() => setKioskLanguage(item.id)}
              style={{
                minHeight: '130px',
                padding: '24px',
                borderRadius: 'var(--radius-lg)',
                backgroundColor: isSelected ? 'var(--color-wvsu-primary-light)' : 'var(--color-bg-surface)',
                border: isSelected ? '3px solid var(--color-wvsu-primary)' : '1.5px solid var(--color-border)',
                boxShadow: isSelected ? 'var(--shadow-hover)' : 'var(--shadow-card)',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.16s ease-in-out'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <div>
                  <div
                    style={{
                      fontSize: '24px',
                      fontWeight: '800',
                      color: isSelected ? 'var(--color-wvsu-primary)' : 'var(--color-text-primary)'
                    }}
                  >
                    {item.name}
                  </div>
                  <div
                    style={{
                      fontSize: '14px',
                      fontWeight: '500',
                      color: 'var(--color-text-secondary)',
                      marginTop: '2px'
                    }}
                  >
                    {item.region}
                  </div>
                </div>

                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: 'var(--radius-full)',
                    border: isSelected ? 'none' : '2px solid var(--color-border)',
                    backgroundColor: isSelected ? 'var(--color-wvsu-primary)' : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFFFFF'
                  }}
                >
                  {isSelected && <Check size={20} strokeWidth={3} />}
                </div>
              </div>

              <div
                style={{
                  fontSize: '13px',
                  color: isSelected ? 'var(--color-wvsu-primary)' : 'var(--color-text-secondary)',
                  fontStyle: 'italic',
                  marginTop: '12px'
                }}
              >
                "{item.greeting}"
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Controls */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          maxWidth: '800px',
          width: '100%',
          margin: '0 auto',
          paddingTop: '20px',
          borderTop: '1px solid var(--color-border)'
        }}
      >
        <Button
          variant="outline"
          size="md"
          icon={ArrowLeft}
          onClick={() => setKioskStep('K01')}
          style={{ width: '180px' }}
        >
          Back / Balik
        </Button>

        <Button
          variant="primary"
          size="lg"
          trailingIcon={ArrowRight}
          onClick={() => setKioskStep('K03')}
          style={{ width: '280px' }}
        >
          Continue / Padayon
        </Button>
      </div>
    </div>
  );
}
