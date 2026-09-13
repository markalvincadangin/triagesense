import React from 'react';
import { Button } from '../common/Button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useTriage } from '../../context/TriageContext';

export function KioskFooterNav({
  onBack,
  backLabel,
  backDisabled = false,
  onNext,
  nextLabel,
  nextDisabled = false,
  nextVariant = 'primary',
  centerContent = null,
  className = ''
}) {
  const { t } = useTriage();
  const effectiveBack = backLabel || t('common.back');
  const effectiveNext = nextLabel || t('common.continue');
  return (
    <div
      className={`w-full max-w-[960px] mx-auto mt-auto pt-6 border-t border-border-main flex items-center justify-between shrink-0 select-none ${className}`}
    >
      {onBack ? (
        <Button
          variant="outline"
          size="md"
          icon={ArrowLeft}
          disabled={backDisabled}
          onClick={onBack}
          className="h-16 px-8 text-base font-bold rounded-2xl"
        >
          {effectiveBack}
        </Button>
      ) : (
        <div className="w-32" />
      )}

      {centerContent && (
        <div className="flex items-center justify-center px-4">
          {centerContent}
        </div>
      )}

      {onNext && (
        <Button
          variant={nextVariant}
          size="lg"
          trailingIcon={ArrowRight}
          disabled={nextDisabled}
          onClick={onNext}
          className="h-18 px-12 text-2xl font-black shadow-xl bg-brand-green hover:bg-brand-green-hover rounded-2xl"
        >
          {effectiveNext}
        </Button>
      )}
    </div>
  );
}
