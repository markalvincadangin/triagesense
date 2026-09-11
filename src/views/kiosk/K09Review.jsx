import React from 'react';
import { useTriage } from '../../context/TriageContext';
import { Button } from '../../components/common/Button';
import { Edit3, Check, ArrowRight, ArrowLeft, User, Activity, MapPin, AlertCircle, MessageSquare } from 'lucide-react';

export function K09Review() {
  const { intakeDraft, setKioskStep } = useTriage();

  const patient = intakeDraft.patientInfo || {};
  const symptoms = intakeDraft.symptoms || [];
  const locations = intakeDraft.bodyLocations || [];
  const additional = intakeDraft.additionalSymptoms || [];

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
          Review Your Intake Information
        </h1>
        <h2
          style={{
            fontSize: '18px',
            fontWeight: '500',
            color: 'var(--color-text-secondary)',
            marginTop: '4px'
          }}
        >
          Palihog lantawa kag kumpirmaha ang tanan nga impormasyon bag-o ipasa
        </h2>
      </div>

      {/* Review Summary Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '18px',
          maxWidth: '860px',
          width: '100%',
          margin: '16px auto 0'
        }}
      >
        {/* Card 1: Patient Information */}
        <div
          style={{
            backgroundColor: 'var(--color-bg-surface)',
            padding: '20px 24px',
            borderRadius: 'var(--radius-lg)',
            border: '1.5px solid var(--color-border)',
            boxShadow: 'var(--shadow-sm)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '700', fontSize: '16px', color: 'var(--color-wvsu-primary)' }}>
                <User size={18} />
                <span>Patient Identification</span>
              </div>
              <Button
                variant="subtle"
                size="sm"
                icon={Edit3}
                onClick={() => setKioskStep('K04')}
                style={{ height: '32px', padding: '0 8px', fontSize: '13px' }}
              >
                EDIT
              </Button>
            </div>

            <div style={{ fontSize: '15px', color: 'var(--color-text-primary)', lineHeight: '22px' }}>
              <div><strong>Name:</strong> {patient.fullName || 'Juan Dela Cruz'}</div>
              <div><strong>Date of Birth:</strong> {patient.dob || '1956-04-12'}</div>
              <div><strong>Gender:</strong> {patient.gender || 'Male'}</div>
              <div><strong>Contact:</strong> {patient.contact || '0917-555-0192'}</div>
              <div><strong>ID Method:</strong> {intakeDraft.identification || 'Hospital ID'}</div>
            </div>
          </div>
        </div>

        {/* Card 2: Main Symptoms */}
        <div
          style={{
            backgroundColor: 'var(--color-bg-surface)',
            padding: '20px 24px',
            borderRadius: 'var(--radius-lg)',
            border: '1.5px solid var(--color-border)',
            boxShadow: 'var(--shadow-sm)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '700', fontSize: '16px', color: 'var(--color-wvsu-primary)' }}>
                <Activity size={18} />
                <span>Reported Symptoms</span>
              </div>
              <Button
                variant="subtle"
                size="sm"
                icon={Edit3}
                onClick={() => setKioskStep('K05')}
                style={{ height: '32px', padding: '0 8px', fontSize: '13px' }}
              >
                EDIT
              </Button>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {symptoms.length > 0 ? (
                symptoms.map((s) => (
                  <span
                    key={s}
                    style={{
                      padding: '4px 10px',
                      borderRadius: 'var(--radius-full)',
                      backgroundColor: 'var(--color-wvsu-primary-light)',
                      border: '1px solid var(--color-wvsu-primary)',
                      color: 'var(--color-wvsu-primary)',
                      fontSize: '13px',
                      fontWeight: '600'
                    }}
                  >
                    {s}
                  </span>
                ))
              ) : (
                <span style={{ fontSize: '14px', color: 'var(--color-text-secondary)', fontStyle: 'italic' }}>
                  No symptoms selected
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Card 3: Body Location & Pain */}
        <div
          style={{
            backgroundColor: 'var(--color-bg-surface)',
            padding: '20px 24px',
            borderRadius: 'var(--radius-lg)',
            border: '1.5px solid var(--color-border)',
            boxShadow: 'var(--shadow-sm)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '700', fontSize: '16px', color: 'var(--color-wvsu-primary)' }}>
                <MapPin size={18} />
                <span>Body Location & Pain</span>
              </div>
              <Button
                variant="subtle"
                size="sm"
                icon={Edit3}
                onClick={() => setKioskStep('K06')}
                style={{ height: '32px', padding: '0 8px', fontSize: '13px' }}
              >
                EDIT
              </Button>
            </div>

            <div style={{ fontSize: '15px', color: 'var(--color-text-primary)', lineHeight: '24px' }}>
              <div><strong>Selected Areas:</strong> {locations.length > 0 ? locations.join(', ') : 'Chest, Left Arm'}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                <strong>Pain Score:</strong>
                <span
                  style={{
                    padding: '2px 10px',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: intakeDraft.painLevel >= 8 ? '#FEE2E2' : '#FEF3C7',
                    color: intakeDraft.painLevel >= 8 ? '#B91C1C' : '#B45309',
                    fontWeight: '700',
                    fontSize: '14px'
                  }}
                >
                  {intakeDraft.painLevel || 8} / 10
                </span>
              </div>
              <div><strong>Duration:</strong> {intakeDraft.duration || '1–6 hours'}</div>
            </div>
          </div>
        </div>

        {/* Card 4: Additional Notes & Voice Memo */}
        <div
          style={{
            backgroundColor: 'var(--color-bg-surface)',
            padding: '20px 24px',
            borderRadius: 'var(--radius-lg)',
            border: '1.5px solid var(--color-border)',
            boxShadow: 'var(--shadow-sm)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '700', fontSize: '16px', color: 'var(--color-wvsu-primary)' }}>
                <MessageSquare size={18} />
                <span>Additional Details</span>
              </div>
              <Button
                variant="subtle"
                size="sm"
                icon={Edit3}
                onClick={() => setKioskStep('K08')}
                style={{ height: '32px', padding: '0 8px', fontSize: '13px' }}
              >
                EDIT
              </Button>
            </div>

            <div style={{ fontSize: '14px', color: 'var(--color-text-primary)', lineHeight: '20px' }}>
              <div>
                <strong>Accompanying:</strong> {additional.length > 0 ? additional.join(', ') : 'None indicated'}
              </div>
              <div style={{ marginTop: '4px' }}>
                <strong>Patient Notes:</strong> {intakeDraft.customNotes ? `"${intakeDraft.customNotes}"` : 'No written notes entered'}
              </div>
              <div style={{ marginTop: '4px' }}>
                <strong>Voice Note:</strong> {intakeDraft.voiceNoteRecorded ? 'Attached (Available for nurse playback)' : 'None recorded'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          maxWidth: '860px',
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
          onClick={() => setKioskStep('K08')}
          style={{ width: '180px' }}
        >
          Back / Balik
        </Button>

        <Button
          variant="primary"
          size="lg"
          trailingIcon={ArrowRight}
          onClick={() => setKioskStep('K10')}
          style={{ width: '320px' }}
        >
          CONFIRM & CONTINUE
        </Button>
      </div>
    </div>
  );
}
