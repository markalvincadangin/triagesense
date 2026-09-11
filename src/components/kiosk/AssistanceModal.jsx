import React from 'react';
import { AlertCircle, AlertTriangle } from 'lucide-react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';

export function AssistanceModal({ isOpen, onCancel, onConfirm }) {
  return (
    <Modal isOpen={isOpen} onClose={onCancel} maxWidth="600px">
      <div className="p-8 flex flex-col gap-5 select-none font-sans">
        {/* Warning Badge & Icon */}
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-red-100 border-2 border-red-300 flex items-center justify-center text-emergency shrink-0 shadow-2xs">
            <AlertTriangle size={30} strokeWidth={2.4} />
          </div>

          <div>
            <h2 className="text-2xl font-black text-text-primary leading-tight tracking-tight">
              Request ER Staff Assistance?
            </h2>
            <div className="text-sm font-bold text-emergency mt-0.5">
              For Acute & Life-Threatening Emergencies
            </div>
          </div>
        </div>

        {/* Clinical Instruction Text */}
        <div className="bg-canvas rounded-xl p-4 border border-border-main text-sm leading-relaxed text-text-primary">
          Select this if the patient has <strong>severe chest pain</strong>, <strong>cannot breathe</strong>, is <strong>bleeding heavily</strong>, or is <strong>losing consciousness</strong>.
          <p className="mt-2 text-xs text-text-secondary">
            An emergency nurse will come to assist you at this kiosk right away.
          </p>
        </div>

        {/* Button Actions */}
        <div className="flex flex-col gap-3 mt-1">
          <Button
            variant="emergency"
            size="lg"
            fullWidth
            icon={AlertCircle}
            onClick={onConfirm}
            className="h-14 text-base font-black tracking-wide rounded-xl shadow-md"
          >
            YES, REQUEST ASSISTANCE
          </Button>

          <Button
            variant="outline"
            size="md"
            fullWidth
            onClick={onCancel}
            className="h-12 text-sm font-bold rounded-xl"
          >
            Cancel / I Can Use Kiosk
          </Button>
        </div>
      </div>
    </Modal>
  );
}
