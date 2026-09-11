import React, { useState, useEffect } from 'react';
import { useTriage } from '../../context/TriageContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Button } from '../../components/common/Button';
import {
  User,
  Heart,
  Thermometer,
  Activity,
  Wind,
  ShieldAlert,
  Play,
  Pause,
  Save,
  CheckCircle2,
  ArrowLeft,
  Calendar,
  Phone,
  Clock,
  AlertTriangle
} from 'lucide-react';

export function PatientDossier() {
  const { intakes, selectedIntakeId, updateNurseAssessment, updateWorkflowStatus, setActiveAdminTab } = useTriage();

  const currentIntake = intakes.find((i) => i.id === selectedIntakeId) || intakes[0];

  // Local form state for Nurse Assessment
  const assessment = currentIntake?.nurseAssessment || {};
  const [bp, setBp] = useState(assessment.vitals?.bp || '');
  const [hr, setHr] = useState(assessment.vitals?.hr || '');
  const [temp, setTemp] = useState(assessment.vitals?.temp || '');
  const [o2, setO2] = useState(assessment.vitals?.o2 || '');
  const [rr, setRr] = useState(assessment.vitals?.rr || '');
  const [assignedESI, setAssignedESI] = useState(assessment.assignedESI || '');
  const [clinicalNotes, setClinicalNotes] = useState(assessment.clinicalNotes || '');
  const [bedDisposition, setBedDisposition] = useState(assessment.bedDisposition || 'Pending Assessment');
  const [workflowStatus, setWorkflowStatus] = useState(currentIntake?.status || 'Waiting');

  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Sync state if selected intake changes
  useEffect(() => {
    if (currentIntake) {
      const a = currentIntake.nurseAssessment || {};
      setBp(a.vitals?.bp || '');
      setHr(a.vitals?.hr || '');
      setTemp(a.vitals?.temp || '');
      setO2(a.vitals?.o2 || '');
      setRr(a.vitals?.rr || '');
      setAssignedESI(a.assignedESI || '');
      setClinicalNotes(a.clinicalNotes || '');
      setBedDisposition(a.bedDisposition || 'Pending Assessment');
      setWorkflowStatus(currentIntake.status || 'Waiting');
      setSavedSuccess(false);
    }
  }, [selectedIntakeId, currentIntake]);

  const handleSave = (e) => {
    e.preventDefault();
    updateNurseAssessment(currentIntake.id, {
      assignedESI: assignedESI || null,
      vitals: { bp, hr, temp, o2, rr },
      clinicalNotes,
      bedDisposition,
      nurseName: 'Nurse Kristine, RN'
    });

    if (workflowStatus) {
      updateWorkflowStatus(currentIntake.id, workflowStatus);
    }

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3500);
  };

  if (!currentIntake) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h2>No patient intake selected.</h2>
        <Button onClick={() => setActiveAdminTab('live-queue')} style={{ marginTop: '16px' }}>
          Return to Queue
        </Button>
      </div>
    );
  }

  const patient = currentIntake.patientInfo || {};

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', height: '100%', overflowY: 'auto', padding: '24px 32px' }}>
      {/* Top Header & Navigation */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <Button
            variant="outline"
            size="sm"
            icon={ArrowLeft}
            onClick={() => setActiveAdminTab('live-queue')}
            style={{ height: '38px' }}
          >
            Queue
          </Button>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <h1 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--color-text-primary)' }}>
                {patient.fullName}
              </h1>
              <span
                style={{
                  fontSize: '14px',
                  fontWeight: '700',
                  color: 'var(--color-wvsu-primary)',
                  backgroundColor: 'var(--color-wvsu-primary-light)',
                  padding: '2px 10px',
                  borderRadius: 'var(--radius-full)'
                }}
              >
                {currentIntake.id}
              </span>
              <StatusBadge type="status" value={currentIntake.status} />
              {currentIntake.nurseAssessment?.assignedESI && (
                <StatusBadge type="acuity" value={currentIntake.nurseAssessment.assignedESI} />
              )}
            </div>
            <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
              Received at: {currentIntake.timestamp} • Dialect: {currentIntake.language} • {patient.idType}
            </div>
          </div>
        </div>

        {/* Quick Save Feedback Banner */}
        {savedSuccess && (
          <div
            className="animate-fade-in"
            style={{
              padding: '8px 18px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--color-success-light)',
              border: '1.5px solid var(--color-success)',
              color: 'var(--color-success)',
              fontSize: '13px',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <CheckCircle2 size={16} />
            <span>Clinical assessment and ESI score updated in patient record.</span>
          </div>
        )}
      </div>

      {/* 2-Column Clinical Workspace */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.05fr 1fr',
          gap: '24px',
          alignItems: 'start'
        }}
      >
        {/* ================= LEFT COLUMN: PATIENT-REPORTED INTAKE ================= */}
        <div
          style={{
            backgroundColor: 'var(--color-bg-surface)',
            borderRadius: 'var(--radius-xl)',
            border: '1.5px solid var(--color-border)',
            boxShadow: 'var(--shadow-sm)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: '16px 24px',
              backgroundColor: 'var(--color-bg-canvas)',
              borderBottom: '1.5px solid var(--color-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <User size={18} color="var(--color-wvsu-blue)" />
              <span style={{ fontSize: '15px', fontWeight: '800', color: 'var(--color-text-primary)' }}>
                PATIENT-REPORTED INTAKE (SUBJECTIVE DATA)
              </span>
            </div>
            <span style={{ fontSize: '12px', fontWeight: '600', color: 'var(--color-text-secondary)' }}>
              Self-Reported via Kiosk
            </span>
          </div>

          <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Demographics Pill Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
              <div style={{ backgroundColor: 'var(--color-bg-canvas)', padding: '12px', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)', fontWeight: '700', textTransform: 'uppercase' }}>
                  Age / Gender
                </div>
                <div style={{ fontSize: '15px', fontWeight: '700', color: 'var(--color-text-primary)', marginTop: '2px' }}>
                  {patient.age || '40'}y • {patient.gender}
                </div>
              </div>

              <div style={{ backgroundColor: 'var(--color-bg-canvas)', padding: '12px', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)', fontWeight: '700', textTransform: 'uppercase' }}>
                  Date of Birth
                </div>
                <div style={{ fontSize: '15px', fontWeight: '700', color: 'var(--color-text-primary)', marginTop: '2px' }}>
                  {patient.dob || 'Not provided'}
                </div>
              </div>

              <div style={{ backgroundColor: 'var(--color-bg-canvas)', padding: '12px', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)', fontWeight: '700', textTransform: 'uppercase' }}>
                  Contact Phone
                </div>
                <div style={{ fontSize: '15px', fontWeight: '700', color: 'var(--color-text-primary)', marginTop: '2px' }}>
                  {patient.contact || 'None'}
                </div>
              </div>
            </div>

            {/* Presenting Symptoms */}
            <div>
              <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--color-text-secondary)', textTransform: 'uppercase', marginBottom: '8px' }}>
                Primary Reported Symptoms:
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {currentIntake.symptoms?.map((s) => (
                  <span
                    key={s}
                    style={{
                      padding: '6px 14px',
                      borderRadius: 'var(--radius-full)',
                      backgroundColor: 'var(--color-wvsu-primary-light)',
                      border: '1.5px solid var(--color-wvsu-primary)',
                      color: 'var(--color-wvsu-primary)',
                      fontSize: '14px',
                      fontWeight: '700'
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Body Locations & Pain Rating */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
              <div style={{ backgroundColor: 'var(--color-bg-canvas)', padding: '14px 18px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--color-text-secondary)', textTransform: 'uppercase' }}>
                  Body Locations
                </div>
                <div style={{ fontSize: '15px', fontWeight: '700', color: 'var(--color-text-primary)', marginTop: '4px' }}>
                  {currentIntake.bodyLocations?.join(', ') || 'Unspecified'}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginTop: '4px' }}>
                  Duration: <strong>{currentIntake.duration}</strong>
                </div>
              </div>

              <div style={{ backgroundColor: 'var(--color-bg-canvas)', padding: '14px 18px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--color-text-secondary)', textTransform: 'uppercase' }}>
                  Subjective Pain Rating (0–10)
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '4px' }}>
                  <span
                    style={{
                      fontSize: '22px',
                      fontWeight: '900',
                      color:
                        currentIntake.painLevel >= 8
                          ? 'var(--color-pain-worst)'
                          : currentIntake.painLevel >= 6
                          ? 'var(--color-pain-severe)'
                          : currentIntake.painLevel >= 3
                          ? 'var(--color-pain-moderate)'
                          : 'var(--color-pain-mild)'
                    }}
                  >
                    {currentIntake.painLevel} / 10
                  </span>
                  <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--color-text-secondary)' }}>
                    {currentIntake.painLevel >= 8
                      ? 'Severe Pain'
                      : currentIntake.painLevel >= 6
                      ? 'High Pain'
                      : currentIntake.painLevel >= 3
                      ? 'Moderate'
                      : 'Low'}
                  </span>
                </div>
              </div>
            </div>

            {/* Accompanying Symptoms & Notes */}
            <div>
              <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--color-text-secondary)', textTransform: 'uppercase', marginBottom: '6px' }}>
                Accompanying Details & Notes:
              </div>
              <div
                style={{
                  backgroundColor: 'var(--color-bg-canvas)',
                  padding: '14px 18px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-border)',
                  fontSize: '14px',
                  lineHeight: '22px',
                  color: 'var(--color-text-primary)'
                }}
              >
                {currentIntake.additionalSymptoms?.length > 0 && (
                  <div style={{ marginBottom: '6px' }}>
                    <strong>Secondary Symptoms:</strong> {currentIntake.additionalSymptoms.join(', ')}
                  </div>
                )}
                <div>
                  <strong>Patient Remarks:</strong> {currentIntake.customNotes ? `"${currentIntake.customNotes}"` : 'None entered.'}
                </div>
              </div>
            </div>

            {/* Objective Kiosk Telemetry Card */}
            {(currentIntake.vitalsTelemetry?.spo2 || currentIntake.nurseAssessment?.vitals?.o2) && (
              <div
                style={{
                  backgroundColor: '#ECFDF5',
                  border: '1.5px solid #A7F3D0',
                  borderRadius: 'var(--radius-md)',
                  padding: '14px 18px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', fontWeight: '800', color: '#065F46', textTransform: 'uppercase' }}>
                    <Activity size={16} />
                    <span>Preliminary Kiosk Vitals Screening</span>
                  </div>
                  <span style={{ fontSize: '11px', fontWeight: '700', padding: '2px 8px', borderRadius: 'var(--radius-full)', backgroundColor: '#D1FAE5', color: '#047857' }}>
                    {currentIntake.vitalsTelemetry?.capturedAt ? `Captured ${currentIntake.vitalsTelemetry.capturedAt}` : 'Automated Reading'}
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginTop: '4px' }}>
                  <div style={{ backgroundColor: '#FFFFFF', padding: '8px 12px', borderRadius: '8px', border: '1px solid #A7F3D0', textAlign: 'center' }}>
                    <div style={{ fontSize: '10px', fontWeight: '700', color: '#64748B', textTransform: 'uppercase' }}>SpO₂ (O₂ Sat)</div>
                    <div style={{ fontSize: '18px', fontWeight: '900', color: '#006B3F' }}>
                      {currentIntake.vitalsTelemetry?.spo2 || currentIntake.nurseAssessment?.vitals?.o2 || '98%'}
                    </div>
                  </div>

                  <div style={{ backgroundColor: '#FFFFFF', padding: '8px 12px', borderRadius: '8px', border: '1px solid #A7F3D0', textAlign: 'center' }}>
                    <div style={{ fontSize: '10px', fontWeight: '700', color: '#64748B', textTransform: 'uppercase' }}>Pulse Rate</div>
                    <div style={{ fontSize: '18px', fontWeight: '900', color: '#006B3F' }}>
                      {currentIntake.vitalsTelemetry?.pulseRate || currentIntake.nurseAssessment?.vitals?.hr || '76 bpm'}
                    </div>
                  </div>

                  <div style={{ backgroundColor: '#FFFFFF', padding: '8px 12px', borderRadius: '8px', border: '1px solid #A7F3D0', textAlign: 'center' }}>
                    <div style={{ fontSize: '10px', fontWeight: '700', color: '#64748B', textTransform: 'uppercase' }}>Perfusion Index</div>
                    <div style={{ fontSize: '18px', fontWeight: '900', color: '#006B3F' }}>
                      {currentIntake.vitalsTelemetry?.perfusionIndex || '4.2%'}
                    </div>
                  </div>
                </div>

                <div style={{ fontSize: '11px', color: '#047857' }}>
                  * Automated pre-screening data. Licensed nurse verifies and confirms telemetry on the right assessment panel.
                </div>
              </div>
            )}

            {/* Voice Memo Audio Player Simulation */}
            {currentIntake.voiceNoteRecorded && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 18px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: isPlayingAudio ? 'var(--color-wvsu-primary-light)' : 'var(--color-bg-canvas)',
                  border: `1.5px solid ${isPlayingAudio ? 'var(--color-wvsu-primary)' : 'var(--color-border)'}`
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <button
                    type="button"
                    onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: 'var(--radius-full)',
                      backgroundColor: 'var(--color-wvsu-primary)',
                      color: '#FFFFFF',
                      border: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer'
                    }}
                  >
                    {isPlayingAudio ? <Pause size={18} /> : <Play size={18} style={{ marginLeft: '2px' }} />}
                  </button>

                  <div>
                    <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--color-text-primary)' }}>
                      Patient Audio Note (0:14)
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>
                      {isPlayingAudio ? 'Playing patient voice note...' : 'Recorded in Hiligaynon dialect'}
                    </div>
                  </div>
                </div>

                <span style={{ fontSize: '12px', fontWeight: '600', color: 'var(--color-wvsu-primary)' }}>
                  {isPlayingAudio ? '0:04 / 0:14' : 'Ready'}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* ================= RIGHT COLUMN: NURSE CLINICAL ASSESSMENT ================= */}
        <form
          onSubmit={handleSave}
          style={{
            backgroundColor: 'var(--color-bg-surface)',
            borderRadius: 'var(--radius-xl)',
            border: '2px solid var(--color-wvsu-primary)',
            boxShadow: 'var(--shadow-card)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: '16px 24px',
              backgroundColor: 'var(--color-wvsu-primary)',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldAlert size={20} />
              <span style={{ fontSize: '15px', fontWeight: '800' }}>
                NURSE TRIAGE ASSESSMENT & ESI SCORING
              </span>
            </div>
            <span style={{ fontSize: '12px', fontWeight: '600', backgroundColor: '#005230', padding: '3px 10px', borderRadius: 'var(--radius-full)' }}>
              Nurse Kristine, RN
            </span>
          </div>

          <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Mandatory Non-Autonomous ESI Safeguard Box */}
            <div
              style={{
                backgroundColor: '#FEF3C7',
                border: '1.5px solid #FCD34D',
                borderRadius: 'var(--radius-md)',
                padding: '10px 14px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                fontSize: '12px',
                fontWeight: '600',
                color: '#92400E'
              }}
            >
              <AlertTriangle size={18} color="#D97706" style={{ flexShrink: 0 }} />
              <span>
                <strong>Clinical Safeguard</strong>: TriageSense does not calculate ESI. Acuity must be manually evaluated and assigned by the licensed triage nurse.
              </span>
            </div>

            {/* Vitals Input Grid */}
            <div>
              <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--color-text-primary)', marginBottom: '8px', textTransform: 'uppercase' }}>
                Objective Vitals:
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px' }}>
                <div>
                  <label style={{ fontSize: '11px', fontWeight: '700', color: 'var(--color-text-secondary)', display: 'block', marginBottom: '4px' }}>
                    BP (mmHg)
                  </label>
                  <input
                    type="text"
                    placeholder="120/80"
                    value={bp}
                    onChange={(e) => setBp(e.target.value)}
                    style={{ width: '100%', height: '42px', padding: '0 8px', borderRadius: 'var(--radius-sm)', border: '1.5px solid var(--color-border)', fontSize: '14px', fontWeight: '600', textAlign: 'center' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '11px', fontWeight: '700', color: 'var(--color-text-secondary)', display: 'block', marginBottom: '4px' }}>
                    HR (bpm)
                  </label>
                  <input
                    type="text"
                    placeholder="75"
                    value={hr}
                    onChange={(e) => setHr(e.target.value)}
                    style={{ width: '100%', height: '42px', padding: '0 8px', borderRadius: 'var(--radius-sm)', border: '1.5px solid var(--color-border)', fontSize: '14px', fontWeight: '600', textAlign: 'center' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '11px', fontWeight: '700', color: 'var(--color-text-secondary)', display: 'block', marginBottom: '4px' }}>
                    Temp (°C)
                  </label>
                  <input
                    type="text"
                    placeholder="36.8"
                    value={temp}
                    onChange={(e) => setTemp(e.target.value)}
                    style={{ width: '100%', height: '42px', padding: '0 8px', borderRadius: 'var(--radius-sm)', border: '1.5px solid var(--color-border)', fontSize: '14px', fontWeight: '600', textAlign: 'center' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '11px', fontWeight: '700', color: 'var(--color-text-secondary)', display: 'block', marginBottom: '4px' }}>
                    SpO2 (%)
                  </label>
                  <input
                    type="text"
                    placeholder="98%"
                    value={o2}
                    onChange={(e) => setO2(e.target.value)}
                    style={{ width: '100%', height: '42px', padding: '0 8px', borderRadius: 'var(--radius-sm)', border: '1.5px solid var(--color-border)', fontSize: '14px', fontWeight: '600', textAlign: 'center' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '11px', fontWeight: '700', color: 'var(--color-text-secondary)', display: 'block', marginBottom: '4px' }}>
                    RR (cpm)
                  </label>
                  <input
                    type="text"
                    placeholder="18"
                    value={rr}
                    onChange={(e) => setRr(e.target.value)}
                    style={{ width: '100%', height: '42px', padding: '0 8px', borderRadius: 'var(--radius-sm)', border: '1.5px solid var(--color-border)', fontSize: '14px', fontWeight: '600', textAlign: 'center' }}
                  />
                </div>
              </div>
            </div>

            {/* Manually Assigned ESI Dropdown */}
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: 'var(--color-text-primary)', marginBottom: '6px', textTransform: 'uppercase' }}>
                Nurse-Assigned ESI Acuity:
              </label>
              <select
                value={assignedESI}
                onChange={(e) => setAssignedESI(e.target.value)}
                style={{
                  width: '100%',
                  height: '46px',
                  padding: '0 14px',
                  borderRadius: 'var(--radius-md)',
                  border: '2px solid var(--color-wvsu-primary)',
                  fontSize: '15px',
                  fontWeight: '700',
                  color: 'var(--color-text-primary)',
                  backgroundColor: '#FFFFFF'
                }}
              >
                <option value="">-- Select Clinician ESI Rating --</option>
                <option value="ESI-1">ESI-1 Resuscitation (Immediate life-saving intervention)</option>
                <option value="ESI-2">ESI-2 Emergent (High risk, confused, severe distress)</option>
                <option value="ESI-3">ESI-3 Urgent (Stable, multiple diagnostic resources)</option>
                <option value="ESI-4">ESI-4 Less Urgent (Single diagnostic resource)</option>
                <option value="ESI-5">ESI-5 Non-Urgent (No diagnostic resources needed)</option>
              </select>
            </div>

            {/* Bed Disposition & Workflow Status */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: 'var(--color-text-secondary)', marginBottom: '4px', textTransform: 'uppercase' }}>
                  Bed Disposition:
                </label>
                <select
                  value={bedDisposition}
                  onChange={(e) => setBedDisposition(e.target.value)}
                  style={{
                    width: '100%',
                    height: '42px',
                    padding: '0 12px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1.5px solid var(--color-border)',
                    fontSize: '14px',
                    fontWeight: '600',
                    backgroundColor: '#FFFFFF'
                  }}
                >
                  <option value="Pending Assessment">Pending Assessment</option>
                  <option value="Resuscitation Bay 1">Resuscitation Bay 1</option>
                  <option value="Resuscitation Bay 2">Resuscitation Bay 2</option>
                  <option value="Acute Bed 01">Acute Bed 01</option>
                  <option value="Acute Bed 04">Acute Bed 04</option>
                  <option value="Minor Care Bay 1">Minor Care Bay 1</option>
                  <option value="Fast-Track Recliner">Fast-Track Recliner</option>
                  <option value="Ambulatory Lounge">Ambulatory Waiting</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: 'var(--color-text-secondary)', marginBottom: '4px', textTransform: 'uppercase' }}>
                  Workflow Status:
                </label>
                <select
                  value={workflowStatus}
                  onChange={(e) => setWorkflowStatus(e.target.value)}
                  style={{
                    width: '100%',
                    height: '42px',
                    padding: '0 12px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1.5px solid var(--color-border)',
                    fontSize: '14px',
                    fontWeight: '600',
                    backgroundColor: '#FFFFFF'
                  }}
                >
                  <option value="New">New Intake</option>
                  <option value="Waiting">Waiting in Lounge</option>
                  <option value="In Triage">In Triage (Active)</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>

            {/* Nurse Clinical Notes */}
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: 'var(--color-text-secondary)', marginBottom: '4px', textTransform: 'uppercase' }}>
                Clinical Notes & Immediate Actions:
              </label>
              <textarea
                rows={3}
                placeholder="Document nurse assessment findings, ordered labs/ECG, or interventions..."
                value={clinicalNotes}
                onChange={(e) => setClinicalNotes(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: 'var(--radius-md)',
                  border: '1.5px solid var(--color-border)',
                  fontSize: '14px',
                  fontFamily: 'var(--font-family)',
                  resize: 'vertical'
                }}
              />
            </div>

            {/* Submit Action */}
            <Button
              variant="primary"
              size="md"
              type="submit"
              icon={Save}
              fullWidth
              style={{ height: '52px', fontSize: '16px' }}
            >
              SAVE TRIAGE ASSESSMENT
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
