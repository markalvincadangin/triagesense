import React from 'react';
import { useTriage } from '../../context/TriageContext';
import { Button } from '../../components/common/Button';
import { Edit3, Check, ArrowLeft, User, Activity, MapPin, HeartPulse, ShieldCheck } from 'lucide-react';

export function IntakeReview() {
  const { intakeDraft, submitKioskIntake, setKioskStep, kioskLanguage } = useTriage();

  const patient = intakeDraft.patientInfo || {};
  const symptoms = intakeDraft.symptoms || [];
  const locations = intakeDraft.bodyLocations || [];
  const vitals = intakeDraft.vitals || {};

  return (
    <div className="flex flex-col justify-between h-full px-12 py-8 bg-canvas overflow-y-auto font-sans select-none">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-extrabold text-slate-900 leading-tight">
          Step 5 of 5: Review & Send to Triage Nurse
        </h1>
        <h2 className="text-base font-semibold text-brand-green mt-1">
          {kioskLanguage === 'hil'
            ? 'Palihog lantawa kag kumpirmaha ang tanan nga impormasyon bag-o ipasa sa nurse'
            : 'Please review and confirm your intake information before sending to the triage desk'}
        </h2>
      </div>

      {/* Review Summary Grid */}
      <div className="w-full max-w-4xl mx-auto my-4 grid grid-cols-2 gap-4">
        {/* Card 1: Patient Information */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5 mb-3">
              <div className="flex items-center gap-2 font-bold text-sm text-brand-green">
                <User size={18} />
                <span>Patient Identification</span>
              </div>
              <button
                onClick={() => setKioskStep('welcome')}
                className="flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-brand-green"
              >
                <Edit3 size={13} />
                <span>EDIT</span>
              </button>
            </div>

            <div className="text-sm text-slate-800 space-y-1.5">
              <div><strong>Name:</strong> {patient.fullName || 'Juan Dela Cruz'}</div>
              <div><strong>Birthdate:</strong> {patient.dob || '1984-05-22'}</div>
              <div><strong>Gender:</strong> {patient.gender || 'Male'}</div>
              <div><strong>Contact:</strong> {patient.contact || '0917-555-0192'}</div>
              <div><strong>ID Method:</strong> {intakeDraft.identification || 'Hospital ID'}</div>
            </div>
          </div>
        </div>

        {/* Card 2: Main Symptoms */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5 mb-3">
              <div className="flex items-center gap-2 font-bold text-sm text-brand-green">
                <Activity size={18} />
                <span>Reported Symptoms</span>
              </div>
              <button
                onClick={() => setKioskStep('symptoms')}
                className="flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-brand-green"
              >
                <Edit3 size={13} />
                <span>EDIT</span>
              </button>
            </div>

            <div className="flex flex-wrap gap-1.5 my-2">
              {symptoms.length > 0 ? (
                symptoms.map((s) => (
                  <span key={s} className="px-2.5 py-1 bg-emerald-50 text-brand-green border border-emerald-200 rounded-lg text-xs font-bold">
                    {s}
                  </span>
                ))
              ) : (
                <span className="text-xs text-slate-400 italic">No symptoms selected</span>
              )}
            </div>

            <div className="text-xs text-slate-600 mt-2">
              <strong>Voice Memo:</strong> {intakeDraft.voiceNoteRecorded ? 'Attached for nurse audio playback' : 'None recorded'}
            </div>
          </div>
        </div>

        {/* Card 3: Anatomical Body Location */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5 mb-3">
              <div className="flex items-center gap-2 font-bold text-sm text-brand-green">
                <MapPin size={18} />
                <span>Body Location</span>
              </div>
              <button
                onClick={() => setKioskStep('body-map')}
                className="flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-brand-green"
              >
                <Edit3 size={13} />
                <span>EDIT</span>
              </button>
            </div>

            <div className="flex flex-wrap gap-1.5 my-2">
              {locations.length > 0 ? (
                locations.map((loc) => (
                  <span key={loc} className="px-2.5 py-1 bg-slate-100 text-slate-800 rounded-lg text-xs font-bold">
                    {loc}
                  </span>
                ))
              ) : (
                <span className="text-xs text-slate-400 italic">General / Diffuse</span>
              )}
            </div>
          </div>
        </div>

        {/* Card 4: Severity & Vital Signs Telemetry */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5 mb-3">
              <div className="flex items-center gap-2 font-bold text-sm text-brand-green">
                <HeartPulse size={18} />
                <span>Pain & Vital Signs</span>
              </div>
              <button
                onClick={() => setKioskStep('pain-duration')}
                className="flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-brand-green"
              >
                <Edit3 size={13} />
                <span>EDIT</span>
              </button>
            </div>

            <div className="text-sm text-slate-800 space-y-1.5">
              <div className="flex items-center gap-2">
                <strong>Pain Score:</strong>
                <span className="px-2 py-0.5 rounded-full text-xs font-black bg-amber-100 text-amber-900">
                  {intakeDraft.painLevel || 0} / 10
                </span>
              </div>
              <div><strong>Duration:</strong> {intakeDraft.duration || '1–6 hours'}</div>
              <div className="border-t border-slate-100 pt-1.5 mt-1.5">
                <div className="text-xs font-bold text-slate-700">Right-Side PPG Sensor Telemetry:</div>
                {vitals.spo2 ? (
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs font-bold text-emerald-800">SpO₂: {vitals.spo2}%</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-xs font-bold text-emerald-800">Pulse: {vitals.pulseRate} BPM</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-xs text-emerald-700">PI: {vitals.perfusionIndex || '4.2%'}</span>
                  </div>
                ) : (
                  <div className="text-xs text-slate-500 italic mt-0.5">
                    Sensor skipped — Triage nurse will record vitals manually
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation & Submission Zone */}
      <div className="w-full max-w-4xl mx-auto flex items-center justify-between pt-4 border-t border-slate-200">
        <Button
          variant="outline"
          size="md"
          icon={ArrowLeft}
          onClick={() => setKioskStep('pain-duration')}
          className="px-6"
        >
          Back / Balik
        </Button>

        <div className="flex items-center gap-2 text-xs text-slate-500">
          <ShieldCheck size={16} className="text-brand-green" />
          <span>Ticket will print automatically at lower slot</span>
        </div>

        <Button
          variant="primary"
          size="lg"
          icon={Check}
          onClick={submitKioskIntake}
          className="px-10 py-4 text-lg font-bold shadow-xl bg-brand-green hover:bg-brand-green-hover"
        >
          {kioskLanguage === 'hil'
            ? 'IPASA SA NURSE / SEND TO NURSE >'
            : 'SEND TO NURSE >'}
        </Button>
      </div>
    </div>
  );
}
