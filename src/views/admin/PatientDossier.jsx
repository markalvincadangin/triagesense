import React, { useState, useEffect } from 'react';
import { useTriage } from '../../context/TriageContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { FormInput } from '../../components/common/FormInput';
import { StatCard } from '../../components/common/StatCard';
import { AlertBanner } from '../../components/common/AlertBanner';
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
    if (!currentIntake) return;

    updateNurseAssessment(currentIntake.id, {
      vitals: { bp, hr, temp, o2, rr },
      assignedESI,
      clinicalNotes,
      bedDisposition
    });

    if (workflowStatus !== currentIntake.status) {
      updateWorkflowStatus(currentIntake.id, workflowStatus);
    }

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3500);
  };

  if (!currentIntake) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-xl font-bold text-text-primary">No patient intake selected.</h2>
        <Button onClick={() => setActiveAdminTab('live-queue')} className="mt-4">
          Return to Queue
        </Button>
      </div>
    );
  }

  const patient = currentIntake.patientInfo || {};

  return (
    <div className="flex flex-col gap-5 h-full overflow-y-auto p-6 md:p-8 font-sans">
      {/* Top Header & Navigation */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3.5">
          <Button
            variant="outline"
            size="sm"
            icon={ArrowLeft}
            onClick={() => setActiveAdminTab('live-queue')}
            className="h-9"
          >
            Queue
          </Button>

          <div>
            <div className="flex items-center flex-wrap gap-3">
              <h1 className="text-2xl font-black text-text-primary tracking-tight">
                {patient.fullName}
              </h1>
              <span className="text-xs font-mono font-bold text-brand-green bg-brand-green-light px-2.5 py-0.5 rounded-full border border-emerald-300">
                {currentIntake.id}
              </span>
              <StatusBadge type="status" value={currentIntake.status} />
              {currentIntake.nurseAssessment?.assignedESI && (
                <StatusBadge type="acuity" value={currentIntake.nurseAssessment.assignedESI} />
              )}
            </div>
            <div className="text-xs text-text-secondary mt-1">
              Received at: <span className="font-semibold text-slate-700">{currentIntake.timestamp}</span> • Dialect: <span className="font-semibold text-slate-700">{currentIntake.language}</span> • {patient.idType || 'Kiosk Self-Entry'}
            </div>
          </div>
        </div>

        {/* Quick Save Feedback Banner */}
        {savedSuccess && (
          <div className="animate-fade-in px-4 py-2 rounded-full bg-emerald-50 border border-emerald-400 text-emerald-800 text-xs font-bold flex items-center gap-2 shadow-xs">
            <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
            <span>Clinical assessment and ESI score updated in patient record.</span>
          </div>
        )}
      </div>

      {/* 2-Column Clinical Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-6 items-start">
        {/* ================= LEFT COLUMN: PATIENT-REPORTED INTAKE ================= */}
        <Card variant="default">
          <Card.Header
            icon={User}
            title="Patient-Reported Intake (Subjective Data)"
            subtitle="Self-Reported via Kiosk"
            variant="default"
          />

          <Card.Body className="gap-5">
            {/* Demographics Pill Grid */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-canvas p-3 rounded-xl border border-border-main">
                <div className="text-[10px] text-text-secondary font-bold uppercase tracking-wider">
                  Age / Gender
                </div>
                <div className="text-sm font-black text-text-primary mt-0.5">
                  {patient.age || '40'}y • {patient.gender}
                </div>
              </div>

              <div className="bg-canvas p-3 rounded-xl border border-border-main">
                <div className="text-[10px] text-text-secondary font-bold uppercase tracking-wider">
                  Date of Birth
                </div>
                <div className="text-sm font-black text-text-primary mt-0.5">
                  {patient.dob || 'Not provided'}
                </div>
              </div>

              <div className="bg-canvas p-3 rounded-xl border border-border-main">
                <div className="text-[10px] text-text-secondary font-bold uppercase tracking-wider">
                  Contact Phone
                </div>
                <div className="text-sm font-black text-text-primary mt-0.5">
                  {patient.contact || 'None'}
                </div>
              </div>
            </div>

            {/* Presenting Symptoms */}
            <div>
              <div className="text-[11px] font-bold text-text-secondary uppercase tracking-wider mb-2">
                Primary Reported Symptoms:
              </div>
              <div className="flex flex-wrap gap-2">
                {currentIntake.symptoms?.map((s) => (
                  <span
                    key={s}
                    className="px-3.5 py-1.5 rounded-full bg-brand-green-light border border-brand-green text-brand-green text-xs font-bold"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Body Locations & Pain Rating */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-canvas p-3.5 rounded-xl border border-border-main">
                <div className="text-[11px] font-bold text-text-secondary uppercase tracking-wider">
                  Body Locations
                </div>
                <div className="text-sm font-black text-text-primary mt-1">
                  {currentIntake.bodyLocations?.join(', ') || 'Unspecified'}
                </div>
                <div className="text-xs text-text-secondary mt-1">
                  Duration: <strong className="text-slate-800">{currentIntake.duration}</strong>
                </div>
              </div>

              <div className="bg-canvas p-3.5 rounded-xl border border-border-main">
                <div className="text-[11px] font-bold text-text-secondary uppercase tracking-wider">
                  Subjective Pain Rating (0–10)
                </div>
                <div className="flex items-center gap-2.5 mt-1">
                  <span
                    className={`text-xl font-black ${
                      currentIntake.painLevel >= 8
                        ? 'text-red-600'
                        : currentIntake.painLevel >= 6
                        ? 'text-orange-600'
                        : currentIntake.painLevel >= 3
                        ? 'text-amber-600'
                        : 'text-emerald-600'
                    }`}
                  >
                    {currentIntake.painLevel} / 10
                  </span>
                  <span className="text-xs font-bold text-text-secondary">
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
              <div className="text-[11px] font-bold text-text-secondary uppercase tracking-wider mb-1.5">
                Accompanying Details & Notes:
              </div>
              <div className="bg-canvas p-3.5 rounded-xl border border-border-main text-xs leading-relaxed text-text-primary space-y-1">
                {currentIntake.additionalSymptoms?.length > 0 && (
                  <div>
                    <strong>Secondary Symptoms:</strong> {currentIntake.additionalSymptoms.join(', ')}
                  </div>
                )}
                <div>
                  <strong>Patient Remarks:</strong> {currentIntake.customNotes ? `"${currentIntake.customNotes}"` : 'None entered.'}
                </div>
              </div>
            </div>

            {/* Objective Kiosk Telemetry Card using StatCard components */}
            {(currentIntake.vitalsTelemetry?.spo2 || currentIntake.nurseAssessment?.vitals?.o2) && (
              <div className="bg-emerald-50/70 border border-emerald-300 rounded-xl p-4 flex flex-col gap-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-black text-emerald-900 uppercase tracking-wider">
                    <Activity size={16} className="text-brand-green" />
                    <span>Preliminary Kiosk Vitals Screening</span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-200/80 text-emerald-900">
                    {currentIntake.vitalsTelemetry?.capturedAt ? `Captured ${currentIntake.vitalsTelemetry.capturedAt}` : 'Automated Reading'}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2.5">
                  <StatCard
                    label="SpO₂ (O₂ Sat)"
                    value={currentIntake.vitalsTelemetry?.spo2 || currentIntake.nurseAssessment?.vitals?.o2 || '98%'}
                    variant="success"
                    size="sm"
                  />
                  <StatCard
                    label="Pulse Rate"
                    value={currentIntake.vitalsTelemetry?.pulseRate || currentIntake.nurseAssessment?.vitals?.hr || '76 bpm'}
                    variant="success"
                    size="sm"
                  />
                  <StatCard
                    label="Perfusion Index"
                    value={currentIntake.vitalsTelemetry?.perfusionIndex || '4.2%'}
                    variant="success"
                    size="sm"
                  />
                </div>

                <div className="text-[11px] text-emerald-800">
                  * Automated pre-screening data. Licensed nurse verifies and confirms vital signs on the right assessment panel.
                </div>
              </div>
            )}

            {/* Voice Memo Audio Player Simulation */}
            {currentIntake.voiceNoteRecorded && (
              <div
                className={`flex items-center justify-between p-3.5 rounded-xl border transition-all ${
                  isPlayingAudio
                    ? 'bg-brand-green-light border-brand-green'
                    : 'bg-canvas border-border-main'
                }`}
              >
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                    className="w-9 h-9 rounded-full bg-brand-green text-white flex items-center justify-center hover:bg-brand-green-hover transition-transform active:scale-95 shadow-xs"
                  >
                    {isPlayingAudio ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
                  </button>

                  <div>
                    <div className="text-xs font-extrabold text-text-primary">
                      Patient Audio Note (0:14)
                    </div>
                    <div className="text-[11px] text-text-secondary">
                      {isPlayingAudio ? 'Playing patient voice note...' : 'Recorded in Hiligaynon dialect'}
                    </div>
                  </div>
                </div>

                <span className="text-xs font-mono font-bold text-brand-green">
                  {isPlayingAudio ? '0:04 / 0:14' : 'Ready'}
                </span>
              </div>
            )}
          </Card.Body>
        </Card>

        {/* ================= RIGHT COLUMN: NURSE CLINICAL ASSESSMENT ================= */}
        <form onSubmit={handleSave}>
          <Card variant="highlight">
            <Card.Header
              icon={ShieldAlert}
              title="Nurse Triage Assessment & ESI Scoring"
              variant="brand"
              action={
                <span className="text-xs font-bold bg-[#005230] text-white px-2.5 py-1 rounded-full border border-emerald-400/30">
                  Nurse Kristine, RN
                </span>
              }
            />

            <Card.Body className="gap-5">
              {/* Mandatory Non-Autonomous ESI Safeguard Box */}
              <AlertBanner variant="warning" title="Clinical Safeguard">
                TriageSense does not calculate ESI. Acuity must be manually evaluated and assigned by the licensed triage nurse.
              </AlertBanner>

              {/* Vitals Input Grid using standardized FormInput components */}
              <div>
                <div className="text-xs font-black text-text-primary uppercase tracking-wider mb-2.5">
                  Objective Vitals (Desk Measurement):
                </div>
                <div className="grid grid-cols-5 gap-2">
                  <FormInput
                    label="BP"
                    unit="mmHg"
                    placeholder="120/80"
                    value={bp}
                    onChange={(e) => setBp(e.target.value)}
                    align="center"
                    size="sm"
                  />
                  <FormInput
                    label="HR"
                    unit="bpm"
                    placeholder="75"
                    value={hr}
                    onChange={(e) => setHr(e.target.value)}
                    align="center"
                    size="sm"
                  />
                  <FormInput
                    label="Temp"
                    unit="°C"
                    placeholder="36.8"
                    value={temp}
                    onChange={(e) => setTemp(e.target.value)}
                    align="center"
                    size="sm"
                  />
                  <FormInput
                    label="SpO₂"
                    unit="%"
                    placeholder="98%"
                    value={o2}
                    onChange={(e) => setO2(e.target.value)}
                    align="center"
                    size="sm"
                  />
                  <FormInput
                    label="RR"
                    unit="cpm"
                    placeholder="18"
                    value={rr}
                    onChange={(e) => setRr(e.target.value)}
                    align="center"
                    size="sm"
                  />
                </div>
              </div>

              {/* Manually Assigned ESI Dropdown */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-black text-text-primary uppercase tracking-wider">
                  Nurse-Assigned ESI Acuity:
                </label>
                <select
                  value={assignedESI}
                  onChange={(e) => setAssignedESI(e.target.value)}
                  className="w-full h-11 px-3.5 rounded-lg border-2 border-brand-green text-sm font-bold text-text-primary bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
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
              <div className="grid grid-cols-2 gap-3.5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-text-secondary uppercase tracking-wider">
                    Bed Disposition:
                  </label>
                  <select
                    value={bedDisposition}
                    onChange={(e) => setBedDisposition(e.target.value)}
                    className="w-full h-10 px-3 rounded-lg border border-border-main text-xs font-semibold bg-white focus:border-brand-green focus:outline-none"
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

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-text-secondary uppercase tracking-wider">
                    Workflow Status:
                  </label>
                  <select
                    value={workflowStatus}
                    onChange={(e) => setWorkflowStatus(e.target.value)}
                    className="w-full h-10 px-3 rounded-lg border border-border-main text-xs font-semibold bg-white focus:border-brand-green focus:outline-none"
                  >
                    <option value="New">New Intake</option>
                    <option value="Waiting">Waiting in Lounge</option>
                    <option value="In Triage">In Triage (Active)</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>

              {/* Nurse Clinical Notes */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-text-secondary uppercase tracking-wider">
                  Clinical Notes & Immediate Actions:
                </label>
                <textarea
                  rows={3}
                  placeholder="Document nurse assessment findings, ordered labs/ECG, or interventions..."
                  value={clinicalNotes}
                  onChange={(e) => setClinicalNotes(e.target.value)}
                  className="w-full p-3 rounded-lg border border-border-main text-xs font-medium focus:border-brand-green focus:outline-none resize-y"
                />
              </div>

              {/* Submit Action */}
              <Button
                variant="primary"
                size="md"
                type="submit"
                icon={Save}
                fullWidth
                className="h-12 text-sm font-bold uppercase tracking-wider"
              >
                SAVE TRIAGE ASSESSMENT
              </Button>
            </Card.Body>
          </Card>
        </form>
      </div>
    </div>
  );
}
