import React, { useState } from 'react';
import { useTriage } from '../../context/TriageContext';
import { Button } from '../../components/common/Button';
import { User, Calendar, Phone, ArrowRight, ArrowLeft, Sparkles } from 'lucide-react';

export function K04PatientInfo() {
  const { intakeDraft, updateDraftPatientInfo, setKioskStep } = useTriage();
  const [errorMsg, setErrorMsg] = useState('');

  const patient = intakeDraft.patientInfo || {};

  const handleNext = () => {
    if (!patient.fullName || patient.fullName.trim().length === 0) {
      setErrorMsg('Please enter your name or use the Demo Fill button to proceed.');
      return;
    }
    setErrorMsg('');
    setKioskStep('K05');
  };

  const handleDemoFill = () => {
    updateDraftPatientInfo({
      fullName: 'Juan Dela Cruz',
      dob: '1956-04-12',
      gender: 'Male',
      contact: '0917-555-0192'
    });
    setErrorMsg('');
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        padding: '36px 48px',
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
          Basic Patient Information
        </h1>
        <h2
          style={{
            fontSize: '18px',
            fontWeight: '500',
            color: 'var(--color-text-secondary)',
            marginTop: '4px'
          }}
        >
          Palihog isulat ang imo impormasyon para sa opisyal nga rekord
        </h2>
      </div>

      {/* Form Container */}
      <div
        style={{
          maxWidth: '680px',
          width: '100%',
          margin: '0 auto',
          backgroundColor: 'var(--color-bg-surface)',
          padding: '32px',
          borderRadius: 'var(--radius-xl)',
          border: '1.5px solid var(--color-border)',
          boxShadow: 'var(--shadow-card)',
          display: 'flex',
          flexDirection: 'column',
          gap: '22px'
        }}
      >
        {/* Full Name Input */}
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
            <User size={18} color="var(--color-wvsu-primary)" />
            <span>Full Name / Bug-os nga Ngalan:</span>
            <span style={{ color: 'var(--color-emergency)', fontSize: '14px' }}>*Required</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Juan Dela Cruz"
            value={patient.fullName || ''}
            onChange={(e) => {
              updateDraftPatientInfo({ fullName: e.target.value });
              if (errorMsg) setErrorMsg('');
            }}
            style={{
              width: '100%',
              height: '60px',
              padding: '0 20px',
              borderRadius: 'var(--radius-md)',
              border: errorMsg ? '2px solid var(--color-emergency)' : '1.5px solid var(--color-border)',
              fontSize: '18px',
              fontFamily: 'var(--font-family)',
              backgroundColor: 'var(--color-bg-canvas)'
            }}
          />
        </div>

        {/* Date of Birth & Gender Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
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
              <Calendar size={18} color="var(--color-wvsu-primary)" />
              <span>Date of Birth / Kaadlawan:</span>
            </label>
            <input
              type="date"
              value={patient.dob || ''}
              onChange={(e) => updateDraftPatientInfo({ dob: e.target.value })}
              style={{
                width: '100%',
                height: '60px',
                padding: '0 16px',
                borderRadius: 'var(--radius-md)',
                border: '1.5px solid var(--color-border)',
                fontSize: '18px',
                fontFamily: 'var(--font-family)',
                backgroundColor: 'var(--color-bg-canvas)'
              }}
            />
          </div>

          <div>
            <label
              style={{
                display: 'block',
                fontSize: '16px',
                fontWeight: '700',
                color: 'var(--color-text-primary)',
                marginBottom: '8px'
              }}
            >
              Gender / Sekso:
            </label>
            <select
              value={patient.gender || 'Male'}
              onChange={(e) => updateDraftPatientInfo({ gender: e.target.value })}
              style={{
                width: '100%',
                height: '60px',
                padding: '0 16px',
                borderRadius: 'var(--radius-md)',
                border: '1.5px solid var(--color-border)',
                fontSize: '18px',
                fontFamily: 'var(--font-family)',
                backgroundColor: 'var(--color-bg-canvas)'
              }}
            >
              <option value="Male">Male / Lalaki</option>
              <option value="Female">Female / Babayi</option>
              <option value="Other">Other / Iban pa</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>
          </div>
        </div>

        {/* Contact Number */}
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
            <Phone size={18} color="var(--color-wvsu-primary)" />
            <span>Mobile Contact / Numero sang Telepono:</span>
          </label>
          <input
            type="tel"
            placeholder="09XX-XXX-XXXX"
            value={patient.contact || ''}
            onChange={(e) => updateDraftPatientInfo({ contact: e.target.value })}
            style={{
              width: '100%',
              height: '60px',
              padding: '0 20px',
              borderRadius: 'var(--radius-md)',
              border: '1.5px solid var(--color-border)',
              fontSize: '18px',
              fontFamily: 'var(--font-family)',
              backgroundColor: 'var(--color-bg-canvas)'
            }}
          />
        </div>

        {/* Error Notification */}
        {errorMsg && (
          <div
            style={{
              padding: '10px 16px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'var(--color-emergency-surface)',
              border: '1px solid var(--color-emergency-border)',
              color: 'var(--color-emergency)',
              fontSize: '14px',
              fontWeight: '600'
            }}
          >
            {errorMsg}
          </div>
        )}

        {/* Demo Fast-Fill Pill Button */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '4px' }}>
          <button
            type="button"
            onClick={handleDemoFill}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--color-wvsu-gold-light)',
              border: '1px solid var(--color-wvsu-gold)',
              color: 'var(--color-text-primary)',
              fontSize: '13px',
              fontWeight: '700',
              cursor: 'pointer'
            }}
          >
            <Sparkles size={14} color="var(--color-wvsu-gold)" />
            <span>Fill Demo Patient (Juan Dela Cruz)</span>
          </button>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          maxWidth: '680px',
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
          onClick={() => setKioskStep('K03')}
          style={{ width: '180px' }}
        >
          Back / Balik
        </Button>

        <Button
          variant="primary"
          size="lg"
          trailingIcon={ArrowRight}
          onClick={handleNext}
          style={{ width: '280px' }}
        >
          Continue / Padayon
        </Button>
      </div>
    </div>
  );
}
