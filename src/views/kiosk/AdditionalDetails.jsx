import React, { useState } from 'react';
import { useTriage } from '../../context/TriageContext';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { KioskFooterNav } from '../../components/kiosk/KioskFooterNav';
import { Check, Mic, MessageSquare } from 'lucide-react';

const ADDITIONAL_SYMPTOMS = [
  { id: 'Nausea' },
  { id: 'Dizziness' },
  { id: 'Loss of appetite' },
  { id: 'Fatigue' },
  { id: 'Other' }
];

export function AdditionalDetails() {
  const { intakeDraft, toggleAdditionalSymptom, updateDraft, setKioskStep, t } = useTriage();
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
    <div className="flex flex-col justify-between h-full px-12 py-8 bg-canvas overflow-y-auto select-none font-sans">
      {/* Header */}
      <div className="text-center shrink-0 mb-4">
        <h1 className="text-4xl font-black text-text-primary tracking-tight">
          {t('additional.title')}
        </h1>
        <h2 className="text-xl font-bold text-text-secondary mt-1">
          {t('additional.subtitle')}
        </h2>
      </div>

      {/* Main Container */}
      <Card variant="kiosk" className="max-w-[960px] w-full mx-auto my-auto gap-6">
        {/* Additional Symptom Chips */}
        <div>
          <div className="text-lg font-bold text-text-primary mb-3">
            {t('additional.selectPrompt')}
          </div>
          <div className="grid grid-cols-3 gap-3.5">
            {ADDITIONAL_SYMPTOMS.map((symp) => {
              const isSelected = selectedAdditional.includes(symp.id);

              return (
                <button
                  key={symp.id}
                  type="button"
                  onClick={() => toggleAdditionalSymptom(symp.id)}
                  className={`min-h-[72px] p-4 rounded-2xl border-2 flex items-center justify-between cursor-pointer text-left transition-all duration-150 ${
                    isSelected
                      ? 'bg-brand-green-light border-brand-green shadow-card ring-2 ring-brand-green/20'
                      : 'bg-surface border-border-main hover:border-border-hover shadow-subtle hover:bg-canvas'
                  }`}
                >
                  <div>
                    <div
                      className={`text-base ${
                        isSelected ? 'font-black text-brand-green' : 'font-bold text-text-primary'
                      }`}
                    >
                      {t(`additional.items.${symp.id}`) || symp.id}
                    </div>
                  </div>

                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-all ${
                      isSelected
                        ? 'bg-brand-green text-white shadow-xs'
                        : 'border-2 border-border-main bg-transparent'
                    }`}
                  >
                    {isSelected && <Check size={14} strokeWidth={3} />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Custom Clinical Notes Textarea */}
        <div>
          <label className="flex items-center gap-2 text-base font-bold text-text-primary mb-2">
            <MessageSquare size={18} className="text-brand-green" />
            <span>{t('additional.notesLabel')}</span>
          </label>
          <textarea
            rows={3}
            placeholder={t('additional.notesPlaceholder')}
            value={intakeDraft.customNotes || ''}
            onChange={(e) => updateDraft({ customNotes: e.target.value })}
            className="w-full p-4 rounded-2xl border-2 border-border-main text-base bg-surface text-text-primary placeholder:text-text-disabled focus:border-brand-green focus:outline-none transition-all resize-y"
          />
        </div>

        {/* Optional Voice Note Status */}
        <div
          className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all ${
            intakeDraft.voiceNoteRecorded
              ? 'bg-brand-green-light border-brand-green'
              : 'bg-surface border-border-main'
          }`}
        >
          <div className="flex items-center gap-3">
            <Mic
              size={24}
              className={intakeDraft.voiceNoteRecorded ? 'text-brand-green' : 'text-brand-blue'}
            />
            <div>
              <div className="text-base font-bold text-text-primary">
                {intakeDraft.voiceNoteRecorded
                  ? 'Voice Memo Recorded & Attached'
                  : 'Optional Voice Note Recording'}
              </div>
              <div className="text-sm text-text-secondary">
                {intakeDraft.voiceNoteRecorded
                  ? 'Your voice note is saved and will be played for the triage nurse.'
                  : 'Record a quick audio message to explain in your own words.'}
              </div>
            </div>
          </div>

          <Button
            variant={isRecording ? 'emergency' : intakeDraft.voiceNoteRecorded ? 'outline' : 'secondary'}
            size="sm"
            onClick={handleToggleVoice}
            className="h-11 px-5 text-sm font-bold shrink-0 rounded-xl"
          >
            {isRecording ? 'Recording (4s)...' : intakeDraft.voiceNoteRecorded ? 'Re-record Audio' : 'Record Audio'}
          </Button>
        </div>
      </Card>

      {/* Standardized Bottom Navigation */}
      <KioskFooterNav
        onBack={() => setKioskStep('pain-duration')}
        onNext={() => setKioskStep('review')}
        nextLabel="Proceed to Review"
      />
    </div>
  );
}
