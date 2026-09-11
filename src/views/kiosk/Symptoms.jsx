import React, { useState } from 'react';
import { useTriage } from '../../context/TriageContext';
import { Button } from '../../components/common/Button';
import {
  Thermometer,
  Activity,
  Wind,
  HeartPulse,
  AlertCircle,
  Zap,
  PlusSquare,
  HelpCircle,
  Mic,
  Check,
  ArrowRight,
  ArrowLeft,
  Volume2
} from 'lucide-react';

const SYMPTOMS_LIST = [
  { id: 'Fever', label: 'Fever / Hilanat', desc: 'High temperature, chills, sweating', icon: Thermometer, color: '#DC2626' },
  { id: 'Cough', label: 'Cough / Ubo', desc: 'Persistent dry or phlegm cough', icon: Activity, color: '#F97316' },
  { id: 'Shortness of Breath', label: 'Shortness of Breath / Hangos', desc: 'Difficulty breathing or wheezing', icon: Wind, color: '#0057A8' },
  { id: 'Chest Pain', label: 'Chest Pain / Sakit Dughan', desc: 'Pressure, tightness, crushing sensation', icon: HeartPulse, color: '#DC2626' },
  { id: 'Abdominal Pain', label: 'Abdominal Pain / Sakit Tiyan', desc: 'Cramping, sharp or dull stomach ache', icon: AlertCircle, color: '#D97706' },
  { id: 'Headache', label: 'Headache / Sakit Ulo', desc: 'Migraine, throbbing, dizziness', icon: Zap, color: '#7C3AED' },
  { id: 'Injury / Trauma', label: 'Injury / Samad o Pagkahulog', desc: 'Cut, fall, vehicular, fracture', icon: PlusSquare, color: '#16803C' },
  { id: 'Other', label: 'Other Symptoms / Iban Pa', desc: 'Other concerns to report to nurse', icon: HelpCircle, color: '#505F78' }
];

export function Symptoms() {
  const { intakeDraft, toggleSymptom, setKioskStep } = useTriage();
  const [isRecordingVoice, setIsRecordingVoice] = useState(false);
  const [voiceSeconds, setVoiceSeconds] = useState(0);

  const selectedSymptoms = intakeDraft.symptoms || [];

  const handleToggleVoice = () => {
    if (!isRecordingVoice) {
      setIsRecordingVoice(true);
      setVoiceSeconds(1);
      const interval = setInterval(() => {
        setVoiceSeconds((prev) => {
          if (prev >= 6) {
            clearInterval(interval);
            setIsRecordingVoice(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      setIsRecordingVoice(false);
      setVoiceSeconds(0);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        padding: '32px 48px',
        backgroundColor: 'var(--color-bg-canvas)',
        overflowY: 'auto'
      }}
    >
      {/* Header */}
      <div style={{ textAlign: 'center' }}>
        <h1
          style={{
            fontSize: '32px',
            fontWeight: '800',
            color: 'var(--color-text-primary)'
          }}
        >
          What Are Your Main Symptoms?
        </h1>
        <h2
          style={{
            fontSize: '18px',
            fontWeight: '500',
            color: 'var(--color-text-secondary)',
            marginTop: '4px'
          }}
        >
          Ano ang ginabatyag mo subong? (You can select more than one)
        </h2>
      </div>

      {/* 8 Symptom Cards Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '16px',
          maxWidth: '880px',
          width: '100%',
          margin: '20px auto 0'
        }}
      >
        {SYMPTOMS_LIST.map((symp) => {
          const isSelected = selectedSymptoms.includes(symp.id);
          const Icon = symp.icon;

          return (
            <div
              key={symp.id}
              onClick={() => toggleSymptom(symp.id)}
              style={{
                minHeight: '130px',
                padding: '18px',
                borderRadius: 'var(--radius-lg)',
                backgroundColor: isSelected ? 'var(--color-wvsu-primary-light)' : 'var(--color-bg-surface)',
                border: isSelected ? '3px solid var(--color-wvsu-primary)' : '1.5px solid var(--color-border)',
                boxShadow: isSelected ? 'var(--shadow-hover)' : 'var(--shadow-card)',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.15s ease-in-out'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: isSelected ? 'var(--color-wvsu-primary)' : 'var(--color-bg-canvas)',
                    color: isSelected ? '#FFFFFF' : symp.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Icon size={24} strokeWidth={2.2} />
                </div>

                <div
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: 'var(--radius-full)',
                    border: isSelected ? 'none' : '1.5px solid var(--color-border)',
                    backgroundColor: isSelected ? 'var(--color-wvsu-primary)' : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFFFFF'
                  }}
                >
                  {isSelected && <Check size={16} strokeWidth={3} />}
                </div>
              </div>

              <div>
                <div
                  style={{
                    fontSize: '16px',
                    fontWeight: isSelected ? '700' : '600',
                    color: isSelected ? 'var(--color-wvsu-primary)' : 'var(--color-text-primary)',
                    marginTop: '10px'
                  }}
                >
                  {symp.label.split(' / ')[0]}
                </div>
                <div
                  style={{
                    fontSize: '12px',
                    color: 'var(--color-text-secondary)',
                    marginTop: '2px'
                  }}
                >
                  {symp.label.split(' / ')[1]}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Voice Input Simulated Component */}
      <div
        style={{
          maxWidth: '880px',
          width: '100%',
          margin: '16px auto 0',
          backgroundColor: isRecordingVoice ? 'var(--color-emergency-surface)' : 'var(--color-bg-surface)',
          border: isRecordingVoice ? '2px solid var(--color-emergency)' : '1.5px solid var(--color-border)',
          borderRadius: 'var(--radius-lg)',
          padding: '14px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: 'var(--shadow-sm)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: isRecordingVoice ? 'var(--color-emergency)' : 'var(--color-wvsu-blue-light)',
              color: isRecordingVoice ? '#FFFFFF' : 'var(--color-wvsu-blue)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Mic size={22} />
          </div>

          <div>
            <div style={{ fontSize: '15px', fontWeight: '700', color: 'var(--color-text-primary)' }}>
              {isRecordingVoice
                ? `Voice Recording Active (${voiceSeconds}s) — Speak your symptoms now...`
                : 'Prefer to describe your symptoms with your voice?'}
            </div>
            <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>
              {isRecordingVoice
                ? 'Audio will be attached to your clinical intake note for the nurse.'
                : 'Tap the microphone to record a 10-second voice note in any dialect.'}
            </div>
          </div>
        </div>

        <Button
          variant={isRecordingVoice ? 'emergency' : 'outline'}
          size="sm"
          onClick={handleToggleVoice}
          style={{ width: '150px' }}
        >
          {isRecordingVoice ? 'Stop Recording' : 'Voice Input'}
        </Button>
      </div>

      {/* Navigation Buttons */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          maxWidth: '880px',
          width: '100%',
          margin: '20px auto 0',
          paddingTop: '20px',
          borderTop: '1px solid var(--color-border)'
        }}
      >
        <Button
          variant="outline"
          size="md"
          icon={ArrowLeft}
          onClick={() => setKioskStep('welcome')}
          style={{ width: '180px' }}
        >
          Back / Balik
        </Button>

        <Button
          variant="primary"
          size="lg"
          trailingIcon={ArrowRight}
          onClick={() => setKioskStep('body-map')}
          style={{ width: '280px' }}
        >
          Next: Body Location
        </Button>
      </div>
    </div>
  );
}
