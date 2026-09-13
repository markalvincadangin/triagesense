import React from 'react';
import { AlertCircle, AlertTriangle, CheckCircle2, Clock } from 'lucide-react';
import { useTriage } from '../../context/TriageContext';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';

export function AssistanceModal({ isOpen, onCancel, onConfirm }) {
  const { t, kioskLanguage } = useTriage();

  const symptomsList = [
    t('assistanceModal.symptoms.0', 'Severe, crushing chest pain'),
    t('assistanceModal.symptoms.1', 'Unable to breathe or choking'),
    t('assistanceModal.symptoms.2', 'Uncontrolled, heavy bleeding'),
    t('assistanceModal.symptoms.3', 'Loss of consciousness or seizures')
  ];

  return (
    <Modal isOpen={isOpen} onClose={onCancel} maxWidth="760px" contained={true}>
      <div className="p-8 sm:p-10 flex flex-col gap-6 select-none font-sans">
        {/* Warning Badge & Icon */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-red-100 border-2 border-red-300 flex items-center justify-center text-emergency shrink-0 shadow-2xs">
            <AlertTriangle size={34} strokeWidth={2.6} />
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-text-primary leading-tight tracking-tight">
              {t('assistanceModal.title')}
            </h2>
            <div className="text-sm sm:text-base font-bold text-emergency mt-0.5">
              {t('assistanceModal.badge')}
            </div>
          </div>
        </div>

        {/* Structured, Highly Scannable Clinical Symptoms Criteria */}
        <div className="bg-canvas rounded-2xl p-5 border border-border-main flex flex-col gap-3">
          <div className="text-sm sm:text-base font-bold text-slate-800">
            {t('assistanceModal.prompt', 'Select this if the patient has any of the following:')}
          </div>

          <ul className="grid grid-cols-1 gap-2.5">
            {symptomsList.map((symptom, idx) => (
              <li
                key={idx}
                className="flex items-center gap-3 bg-red-50/90 border border-red-200/90 rounded-xl px-4 py-2.5 text-base font-bold text-red-950"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-emergency shrink-0 ring-2 ring-red-300" />
                <span>{symptom}</span>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2 mt-2 pt-3 border-t border-border-main text-xs sm:text-sm text-text-secondary font-semibold">
            <Clock size={16} className="text-brand-green shrink-0" />
            <span>{t('assistanceModal.nurseArriving')}</span>
          </div>
        </div>

        {/* Button Actions */}
        <div className="flex flex-col gap-3 mt-1">
          <Button
            variant="emergency"
            size="lg"
            fullWidth
            icon={AlertCircle}
            onClick={onConfirm}
            className="h-16 text-lg sm:text-xl font-black tracking-wide rounded-2xl shadow-lg ring-2 ring-red-300 active:scale-[0.99] transition-all flex items-center justify-center gap-3"
          >
            {t('assistanceModal.confirmBtn')}
          </Button>

          <Button
            variant="outline"
            size="md"
            fullWidth
            onClick={onCancel}
            className="h-14 text-base font-bold rounded-2xl bg-slate-100 hover:bg-slate-200 border-2 border-slate-300 text-slate-800 shadow-sm active:scale-[0.99] transition-all"
          >
            {t('assistanceModal.cancelBtn')}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
