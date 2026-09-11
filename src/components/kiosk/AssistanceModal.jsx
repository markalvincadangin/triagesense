import React from 'react';
import { AlertCircle, AlertTriangle } from 'lucide-react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';

export function AssistanceModal({ isOpen, onCancel, onConfirm }) {
  return (
    <Modal isOpen={isOpen} onClose={onCancel} maxWidth="600px">
      <div style={{ padding: '36px 36px 32px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Warning Badge & Icon */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              width: '60px',
              height: '60px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--color-emergency-surface)',
              border: '2px solid var(--color-emergency-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-emergency)',
              flexShrink: 0
            }}
          >
            <AlertTriangle size={32} strokeWidth={2.4} />
          </div>

          <div>
            <h2
              style={{
                fontSize: '24px',
                fontWeight: '700',
                color: 'var(--color-text-primary)',
                lineHeight: '30px'
              }}
            >
              Request ER Staff Assistance?
            </h2>
            <div
              style={{
                fontSize: '15px',
                fontWeight: '600',
                color: 'var(--color-emergency)',
                marginTop: '4px'
              }}
            >
              For Acute & Life-Threatening Emergencies
            </div>
          </div>
        </div>

        {/* Clinical Instruction Text */}
        <div
          style={{
            backgroundColor: 'var(--color-bg-canvas)',
            borderRadius: 'var(--radius-md)',
            padding: '16px 20px',
            border: '1px solid var(--color-border)',
            fontSize: '16px',
            lineHeight: '24px',
            color: 'var(--color-text-primary)'
          }}
        >
          Select this if the patient has <strong>severe chest pain</strong>, <strong>cannot breathe</strong>, is <strong>bleeding heavily</strong>, or is <strong>losing consciousness</strong>.
          <p style={{ marginTop: '10px', fontSize: '14px', color: 'var(--color-text-secondary)' }}>
            An emergency nurse will be immediately dispatched to this kiosk terminal.
          </p>
        </div>

        {/* Button Actions */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            marginTop: '8px'
          }}
        >
          <Button
            variant="emergency"
            size="md"
            fullWidth
            icon={AlertCircle}
            onClick={onConfirm}
            style={{ height: '64px', fontSize: '18px' }}
          >
            YES, REQUEST ASSISTANCE
          </Button>

          <Button
            variant="outline"
            size="md"
            fullWidth
            onClick={onCancel}
            style={{ height: '56px', fontSize: '16px' }}
          >
            Cancel / I Can Use Kiosk
          </Button>
        </div>
      </div>
    </Modal>
  );
}
