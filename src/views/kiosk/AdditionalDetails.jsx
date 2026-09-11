import React, { useState } from 'react';
import { useTriage } from '../../context/TriageContext';
import { Button } from '../../components/common/Button';
import { Check, Mic, ArrowRight, ArrowLeft, MessageSquare } from 'lucide-react';

const ADDITIONAL_SYMPTOMS = [
  { id: 'Nausea', label: 'Nausea / Pagsuka', dialect: 'Galingin ang tiyan ukon masuka' },
  { id: 'Dizziness', label: 'Dizziness / Lipong', dialect: 'Daw nagatuyok ang palibot' },
  { id: 'Loss of appetite', label: 'Loss of Appetite / Wala Gana', dialect: 'Wala gana magkaon' },
  { id: 'Fatigue', label: 'Fatigue / Palangluya', dialect: 'Grabe nga kapoy sang lawas' },
  { id: 'Other', label: 'Other Concerns / Iban pa', dialect: 'Iban pa nga ginabatyag' }
];

export function AdditionalDetails() {
  const { intakeDraft, toggleAdditionalSymptom, updateDraft, setKioskStep } = useTriage();
  const [isRecording, setIsRecording] = useState(false);

  const selectedAdditional = intakeDraft.additionalSymptoms || [];

  const handleToggleVoice = () => {
    if (!isRecording) {
      setIsRecording(true);
      setTimeout(() => {
        setIsRecording(false);
        updateDraft({ voiceNoteRecorded: true });
      }, 4000);
    } else {
      setIsRecording(false);
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
          Additional Symptom Details
        </h1>
        <h2
          style={{
            fontSize: '18px',
            fontWeight: '500',
            color: 'var(--color-text-secondary)',
            marginTop: '4px'
          }}
        >
          May iban pa bala nga ginabatyag? (Optional additional notes for triage staff)
        </h2>
      </div>

      {/* Main Container */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          maxWidth: '820px',
          width: '100%',
          margin: '16px auto 0'
        }}
      >
        {/* Additional Symptom Chips */}
        <div>
          <div
            style={{
              fontSize: '16px',
              fontWeight: '700',
              color: 'var(--color-text-primary)',
              marginBottom: '12px'
            }}
          >
            Select Any Accompanying Symptoms:
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
            {ADDITIONAL_SYMPTOMS.map((symp) => {
              const isSelected = selectedAdditional.includes(symp.id);

              return (
                <button
                  key={symp.id}
                  type="button"
                  onClick={() => toggleAdditionalSymptom(symp.id)}
                  style={{
                    minHeight: '68px',
                    padding: '12px 18px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: isSelected ? 'var(--color-wvsu-primary-light)' : 'var(--color-bg-surface)',
                    border: isSelected ? '2.5px solid var(--color-wvsu-primary)' : '1.5px solid var(--color-border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    textAlign: 'left',
                    boxShadow: isSelected ? 'var(--shadow-card)' : 'none',
                    transition: 'all 0.15s ease-in-out'
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: '16px',
                        fontWeight: isSelected ? '700' : '600',
                        color: isSelected ? 'var(--color-wvsu-primary)' : 'var(--color-text-primary)'
                      }}
                    >
                      {symp.label.split(' / ')[0]}
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
                      {symp.dialect}
                    </div>
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
                </button>
              );
            })}
          </div>
        </div>

        {/* Custom Clinical Notes Textarea */}
        <div>
          <label
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '16px',
              fontWeight: '700',
              color: 'var(--color-text-primary)',
              marginBottom: '8px'
            }}
          >
            <MessageSquare size={18} color="var(--color-wvsu-primary)" />
            <span>Additional Notes / Iban pa nga Mensahe (Optional):</span>
          </label>
          <textarea
            rows={3}
            placeholder="e.g. Any specific events, medications taken, or details you want the triage nurse to know..."
            value={intakeDraft.customNotes || ''}
            onChange={(e) => updateDraft({ customNotes: e.target.value })}
            style={{
              width: '100%',
              padding: '16px',
              borderRadius: 'var(--radius-md)',
              border: '1.5px solid var(--color-border)',
              fontSize: '16px',
              fontFamily: 'var(--font-family)',
              backgroundColor: 'var(--color-bg-surface)',
              resize: 'vertical'
            }}
          />
        </div>

        {/* Optional Voice Note Status */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '14px 20px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: intakeDraft.voiceNoteRecorded ? 'var(--color-success-light)' : 'var(--color-bg-surface)',
            border: `1.5px solid ${intakeDraft.voiceNoteRecorded ? 'var(--color-success)' : 'var(--color-border)'}`
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Mic
              size={22}
              color={intakeDraft.voiceNoteRecorded ? 'var(--color-success)' : 'var(--color-wvsu-blue)'}
            />
            <div>
              <div style={{ fontSize: '15px', fontWeight: '700', color: 'var(--color-text-primary)' }}>
                {intakeDraft.voiceNoteRecorded
                  ? 'Voice Memo Recorded & Attached'
                  : 'Optional Voice Note Recording'}
              </div>
              <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>
                {intakeDraft.voiceNoteRecorded
                  ? 'Audio file is ready for triage nurse playback in clinical dossier.'
                  : 'Record a quick audio message to explain in your own words.'}
              </div>
            </div>
          </div>

          <Button
            variant={isRecording ? 'emergency' : intakeDraft.voiceNoteRecorded ? 'outline' : 'secondary'}
            size="sm"
            onClick={handleToggleVoice}
            style={{ width: '160px' }}
          >
            {isRecording ? 'Recording (4s)...' : intakeDraft.voiceNoteRecorded ? 'Re-record Audio' : 'Record Audio'}
          </Button>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          maxWidth: '820px',
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
          onClick={() => setKioskStep('pain-duration')}
          style={{ width: '180px' }}
        >
          Back / Balik
        </Button>

        <Button
          variant="primary"
          size="lg"
          trailingIcon={ArrowRight}
          onClick={() => setKioskStep('review')}
          style={{ width: '280px' }}
        >
          Proceed to Review
        </Button>
      </div>
    </div>
  );
}
