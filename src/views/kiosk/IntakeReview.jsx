import React from 'react';
import { useTriage } from '../../context/TriageContext';
import { Card } from '../../components/common/Card';
import { KioskFooterNav } from '../../components/kiosk/KioskFooterNav';
import { Edit3, User, Activity, MapPin, HeartPulse, ShieldCheck } from 'lucide-react';

export function IntakeReview() {
  const { intakeDraft, submitKioskIntake, setKioskStep, t } = useTriage();

  const patient = intakeDraft.patientInfo || {};
  const symptoms = intakeDraft.symptoms || [];
  const locations = intakeDraft.bodyLocations || [];
  const vitals = intakeDraft.vitals || {};

  // P3: Anatomical Orientation Resolver
  const getOrientationLabel = (loc) => {
    const orientation = intakeDraft.bodyLocationOrientations?.[loc] || (loc === 'Back' ? 'back' : 'front');
    return orientation === 'back' ? (t('bodyMap.backShort') || 'Back') : (t('bodyMap.frontShort') || 'Front');
  };

  // P1: Contextual Edit Button with >= 48px Touch Target
  const renderSectionHeader = (Icon, title, targetStep) => (
    <div className="flex items-center justify-between border-b border-border-main pb-2.5 mb-3.5">
      <div className="flex items-center gap-2.5 text-lg font-black text-text-primary">
        <Icon size={22} className="text-brand-green" />
        <span>{title}</span>
      </div>
      <button
        type="button"
        onClick={() => setKioskStep(targetStep)}
        className="min-h-[48px] px-4 py-2 rounded-xl border-2 border-slate-300 hover:border-brand-green bg-surface hover:bg-emerald-50/70 text-brand-green text-sm font-black flex items-center gap-2 cursor-pointer transition-all shadow-subtle hover:shadow-sm active:scale-95 shrink-0"
        title={`${t('common.edit')}: ${title}`}
      >
        <Edit3 size={18} strokeWidth={2.5} />
        <span>{t('common.edit')}</span>
      </button>
    </div>
  );

  return (
    <div className="flex flex-col h-full px-12 py-8 bg-canvas select-none overflow-y-auto">
      {/* Header */}
      <div className="text-center shrink-0 mb-4">
        <h1 className="text-4xl font-black text-text-primary tracking-tight">
          {t('review.stepTitle')}
        </h1>
        <h2 className="text-xl font-bold text-brand-green mt-2">
          {t('review.stepSubtitle')}
        </h2>
      </div>

      {/* Review Summary Grid */}
      <div className="w-full max-w-[960px] mx-auto my-3 grid grid-cols-2 gap-6">
        {/* Card 1: Patient Details */}
        <Card variant="kiosk" className="justify-between">
          <div>
            {renderSectionHeader(User, t('review.patientSection'), 'patient-info')}

            <div className="text-base text-text-primary space-y-2">
              <div><strong>{t('review.nameLabel')}</strong> {patient.fullName || 'Juan Dela Cruz'}</div>
              <div><strong>{t('review.dobLabel')}</strong> {patient.dob || '1984-05-22'}</div>
              <div><strong>{t('review.genderLabel')}</strong> {patient.gender ? t(`patientInfo.gender${patient.gender}`, patient.gender) : t('patientInfo.genderMale')}</div>
              <div><strong>{t('review.contactLabel')}</strong> {patient.contact || '0917-555-0192'}</div>
              <div><strong>{t('review.idMethodLabel')}</strong> {intakeDraft.identification || 'Hospital ID'}</div>
            </div>
          </div>
        </Card>

        {/* Card 2: Main Symptoms */}
        <Card variant="kiosk" className="justify-between">
          <div>
            {renderSectionHeader(Activity, t('review.symptomsSection'), 'symptoms')}

            <div className="flex flex-wrap gap-2 my-2">
              {symptoms.length > 0 ? (
                symptoms.map((s) => (
                  <span key={s} className="px-4 py-2 bg-emerald-50 text-brand-green border-2 border-emerald-300 rounded-xl text-sm font-black shadow-2xs">
                    {t(`symptoms.items.${s}.label`, s)}
                  </span>
                ))
              ) : (
                <span className="text-sm text-text-disabled italic">{t('review.noSymptomsSelected')}</span>
              )}
            </div>

            <div className="text-sm text-text-secondary mt-3 font-medium">
              <strong>{t('review.voiceMemoLabel')}</strong> {intakeDraft.voiceNoteRecorded ? t('review.voiceMemoAttached') : t('review.voiceMemoNone')}
            </div>
          </div>
        </Card>

        {/* Card 3: Anatomical Body Location with P3 Orientation */}
        <Card variant="kiosk" className="justify-between">
          <div>
            {renderSectionHeader(MapPin, t('review.locationsSection'), 'body-map')}

            <div className="flex flex-wrap gap-2.5 my-2">
              {locations.length > 0 ? (
                locations.map((loc) => (
                  <span
                    key={loc}
                    className="px-4 py-2 bg-brand-green-50/70 border-2 border-emerald-300 text-emerald-950 rounded-xl text-base font-black shadow-2xs flex items-center gap-2"
                  >
                    <span className="w-2 h-2 rounded-full bg-brand-green shrink-0" />
                    <span>{t(`bodyMap.regions.${loc}`, loc)} ({getOrientationLabel(loc)})</span>
                  </span>
                ))
              ) : (
                <span className="text-sm text-text-disabled italic">{t('review.generalBody')}</span>
              )}
            </div>
          </div>
        </Card>

        {/* Card 4: Pain & Quick Finger Check */}
        <Card variant="kiosk" className="justify-between">
          <div>
            {renderSectionHeader(HeartPulse, t('review.painSection'), 'pain-duration')}

            <div className="text-base text-text-primary space-y-2">
              <div className="flex items-center gap-2.5">
                <strong>{t('review.painScoreLabel')}</strong>
                <span className="px-3.5 py-1 rounded-full text-xs font-black bg-brand-gold-50 text-amber-900 border border-brand-gold-500/40">
                  {intakeDraft.painLevel || 0} / 10
                </span>
              </div>
              <div>
                <strong>{t('review.durationLabel')}</strong> {intakeDraft.duration ? t(`durations.${intakeDraft.duration}`, intakeDraft.duration) : t('durations.1–6 hours')}
              </div>
              <div className="border-t border-border-main pt-2 mt-2">
                <div className="text-xs font-black text-text-secondary uppercase tracking-wide">
                  {t('review.quickFingerCheckLabel')}
                </div>
                {vitals.spo2 ? (
                  <div className="flex items-center gap-3 mt-1.5">
                    <span className="text-sm font-bold text-emerald-800">SpO₂: {vitals.spo2}%</span>
                    <span className="text-border-main">•</span>
                    <span className="text-sm font-bold text-emerald-800">Pulse: {vitals.pulseRate} BPM</span>
                    <span className="text-border-main">•</span>
                    <span className="text-sm text-emerald-700 font-semibold">PI: {vitals.perfusionIndex || '4.2%'}</span>
                  </div>
                ) : (
                  <div className="text-xs text-text-disabled italic mt-1">
                    {t('review.sensorSkippedText')}
                  </div>
                )}
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* P2: Empathetic Patient Reassurance: What Happens Next? - Boosted Typography & Contrast */}
      <div className="w-full max-w-[960px] mx-auto my-3 p-6 rounded-3xl bg-emerald-50/90 border-2 border-emerald-300 text-text-primary shadow-subtle">
        <div className="text-lg font-black text-emerald-950 flex items-center gap-2.5 mb-4">
          <ShieldCheck size={24} className="text-brand-green" />
          <span>{t('review.whatHappensNext')}</span>
        </div>
        <div className="grid grid-cols-3 gap-5 text-sm leading-relaxed">
          <div className="bg-surface p-5 rounded-2xl border-2 border-emerald-100 shadow-2xs flex flex-col gap-2">
            <span className="font-black text-text-primary text-base">{t('review.step1Title')}</span>
            <span className="text-slate-800 font-semibold text-base leading-snug">{t('review.step1Desc')}</span>
          </div>
          <div className="bg-surface p-5 rounded-2xl border-2 border-emerald-100 shadow-2xs flex flex-col gap-2">
            <span className="font-black text-text-primary text-base">{t('review.step2Title')}</span>
            <span className="text-slate-800 font-semibold text-base leading-snug">{t('review.step2Desc')}</span>
          </div>
          <div className="bg-surface p-5 rounded-2xl border-2 border-emerald-100 shadow-2xs flex flex-col gap-2">
            <span className="font-black text-text-primary text-base">{t('review.step3Title')}</span>
            <span className="text-slate-800 font-semibold text-base leading-snug">{t('review.step3Desc')}</span>
          </div>
        </div>
      </div>

      {/* Confirmation & Submission Navigation */}
      <KioskFooterNav
        onBack={() => setKioskStep('pain-duration')}
        onNext={submitKioskIntake}
        backLabel={t('review.btnBack')}
        nextLabel={t('review.btnSubmit')}
        centerContent={
          <div className="flex items-center gap-2 text-xs text-text-secondary font-semibold">
            <ShieldCheck size={16} className="text-brand-green" />
            <span>{t('review.ticketPrintNote')}</span>
          </div>
        }
      />
    </div>
  );
}
