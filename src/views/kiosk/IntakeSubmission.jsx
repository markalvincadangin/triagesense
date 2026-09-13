import React, { useState } from 'react';
import { useTriage } from '../../context/TriageContext';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { KioskFooterNav } from '../../components/kiosk/KioskFooterNav';
import { ShieldCheck, Lock, Send, AlertCircle, Sparkles } from 'lucide-react';

export function IntakeSubmission() {
  const { submitKioskIntake, setKioskStep, t } = useTriage();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      submitKioskIntake();
    }, 1200);
  };

  return (
    <div className="flex flex-col justify-between h-full px-12 py-8 bg-canvas overflow-y-auto select-none font-sans">
      {/* Header */}
      <div className="text-center shrink-0 mb-4">
        <h1 className="text-4xl font-black text-text-primary tracking-tight">
          {t('submission.stepTitle')}
        </h1>
      </div>

      {/* Main Container */}
      <Card variant="kiosk" className="max-w-2xl w-full mx-auto my-auto text-center gap-6 p-10">
        <div className="w-20 h-20 rounded-full bg-brand-green-light flex items-center justify-center text-brand-green mx-auto shadow-subtle animate-bounce">
          <Sparkles size={40} />
        </div>

        <div>
          <h2 className="text-2xl font-black text-text-primary">
            {isSubmitting ? t('submission.transmittingTitle') : t('submission.readyTitle')}
          </h2>
          <p className="text-base text-text-secondary mt-2 leading-relaxed max-w-lg mx-auto">
            {t('submission.description')}
          </p>
        </div>

        {/* Mandatory Clinical Non-Diagnostic Disclaimer Box */}
        <div className="w-full p-5 rounded-2xl bg-canvas border border-border-main flex items-start gap-4 text-left">
          <AlertCircle size={24} className="text-brand-blue shrink-0 mt-0.5" />
          <div>
            <div className="text-base font-bold text-text-primary">
              {t('submission.disclaimerTitle')}
            </div>
            <div className="text-sm text-text-secondary leading-relaxed mt-1">
              {t('submission.disclaimerText')}
            </div>
          </div>
        </div>

        {/* Encryption & Privacy Assurance */}
        <div className="flex items-center gap-2 text-sm text-text-secondary">
          <Lock size={16} className="text-brand-green" />
          <span>{t('submission.privacyAssurance')}</span>
        </div>

        {/* Submit Button */}
        <Button
          variant="primary"
          size="lg"
          fullWidth
          disabled={isSubmitting}
          icon={Send}
          onClick={handleSubmit}
          className="h-18 text-xl font-black shadow-xl rounded-2xl"
        >
          {isSubmitting ? t('submission.submittingBtn') : t('submission.submitBtn')}
        </Button>
      </Card>

      {/* Standardized Bottom Navigation */}
      <KioskFooterNav
        onBack={() => setKioskStep('review')}
        backDisabled={isSubmitting}
        backLabel={t('submission.backBtn')}
      />
    </div>
  );
}
