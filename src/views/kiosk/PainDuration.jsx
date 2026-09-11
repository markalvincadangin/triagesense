import React, { useState, useEffect } from 'react';
import { useTriage } from '../../context/TriageContext';
import { Button } from '../../components/common/Button';
import { PainScale } from '../../components/kiosk/PainScale';
import { DurationSelector } from '../../components/kiosk/DurationSelector';
import {
  ArrowRight,
  ArrowLeft,
  Activity,
  Heart,
  ShieldAlert,
  CheckCircle2,
  RefreshCw,
  Info
} from 'lucide-react';

export function PainDuration() {
  const { intakeDraft, updateDraft, updateVitals, setKioskStep, kioskLanguage } = useTriage();
  const [measuringStatus, setMeasuringStatus] = useState('idle'); // 'idle' | 'measuring' | 'completed' | 'skipped'
  const [countdown, setCountdown] = useState(5);
  const [livePulse, setLivePulse] = useState(72);

  const vitals = intakeDraft.vitals || {};

  // Simulate PPG Waveform and countdown when measuring
  useEffect(() => {
    let timer;
    let pulseInterval;
    if (measuringStatus === 'measuring') {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setMeasuringStatus('completed');
            const now = new Date();
            const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            updateVitals({
              spo2: 98,
              pulseRate: 76,
              perfusionIndex: '4.2%',
              measuredAt: `${timeString} PST`,
              method: 'kiosk-ppg-sensor',
              skipped: false
            });
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      pulseInterval = setInterval(() => {
        setLivePulse((p) => Math.floor(74 + Math.random() * 5));
      }, 600);
    }
    return () => {
      clearInterval(timer);
      clearInterval(pulseInterval);
    };
  }, [measuringStatus]);

  const handleStartMeasurement = () => {
    setCountdown(5);
    setMeasuringStatus('measuring');
  };

  const handleSkipMeasurement = () => {
    setMeasuringStatus('skipped');
    updateVitals({
      spo2: null,
      pulseRate: null,
      perfusionIndex: null,
      measuredAt: null,
      method: 'skipped',
      skipped: true
    });
  };

  return (
    <div className="flex flex-col justify-between h-full px-12 py-8 bg-canvas overflow-y-auto font-sans select-none">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-extrabold text-slate-900 leading-tight">
          Step 4 of 5: Severity & Automated Vital Signs
        </h1>
        <h2 className="text-base font-semibold text-brand-green mt-1">
          {kioskLanguage === 'hil'
            ? 'Kadasig kag kalawig sang balatyagon kag awtomatiko nga vital signs'
            : 'Rate your pain, duration, and insert finger for automatic vital signs'}
        </h2>
      </div>

      {/* Main Controls Stack */}
      <div className="w-full max-w-4xl mx-auto my-4 flex flex-col gap-6">
        {/* Section 1: Pain Rating Scale */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-sm font-extrabold text-slate-800 mb-3 flex items-center justify-between">
            <span>1. Rate Your Current Pain Level / Kabug-at sang Sakit:</span>
            <span className="text-xs text-slate-500 font-normal">Wong-Baker Scale (0 = No Pain, 10 = Severe)</span>
          </div>
          <PainScale
            value={intakeDraft.painLevel || 0}
            onChange={(val) => updateDraft({ painLevel: val })}
          />
        </div>

        {/* Section 2: Duration Selector */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-sm font-extrabold text-slate-800 mb-3">
            2. How Long Have You Felt These Symptoms? / Pila na ka oras o adlaw?
          </div>
          <DurationSelector
            value={intakeDraft.duration || '1–6 hours'}
            onChange={(val) => updateDraft({ duration: val })}
          />
        </div>

        {/* Section 3: Integrated Right-Side PPG Pulse Oximeter Finger Sensor Bay */}
        <div className="bg-white p-6 rounded-2xl border-2 border-emerald-600/30 shadow-md relative overflow-hidden">
          {/* Subtle Institutional Brand Accent Header */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-brand-green-light flex items-center justify-center text-brand-green">
                <Activity size={18} strokeWidth={2.5} />
              </div>
              <div>
                <div className="text-sm font-extrabold text-slate-900">
                  3. Automated Vital Signs (Integrated PPG Finger Sensor)
                </div>
                <div className="text-xs text-slate-500">
                  Non-invasive optical finger measurement for Blood Oxygen (SpO₂) & Pulse Rate (BPM)
                </div>
              </div>
            </div>

            {/* Hardware Callout Tag */}
            <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-800 rounded-full border border-emerald-200 text-xs font-bold animate-pulse">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>SENSOR READY ON RIGHT CHASSIS ➔</span>
            </div>
          </div>

          {/* Interactive States */}
          {measuringStatus === 'idle' && (
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex items-center gap-4 text-left">
                {/* Finger slot instruction graphic */}
                <div className="w-16 h-16 rounded-2xl bg-slate-900 flex flex-col items-center justify-center text-emerald-400 border-2 border-emerald-500/80 shadow-md shrink-0 relative">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-ping mb-1" />
                  <span className="text-[9px] font-black tracking-widest text-white">SLOT</span>
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">
                    {kioskLanguage === 'hil'
                      ? 'Palihug isulod ang imo tudlo sa nagasiga nga Vital Signs Sensor Bay sa idalum sang screen (sa tuo nga bahin).'
                      : 'Please insert your index finger into the illuminated Vital Signs Sensor Bay below the screen (bottom right).'}
                  </div>
                  <div className="text-xs text-slate-600 mt-0.5">
                    Takes only 5 seconds. Captures baseline SpO₂ and pulse rate for the emergency doctor and nurse.
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <Button
                  variant="subtle"
                  size="md"
                  onClick={handleSkipMeasurement}
                  className="text-xs text-slate-600 hover:text-slate-900"
                >
                  Skip Vitals / Laktawan
                </Button>
                <Button
                  variant="primary"
                  size="md"
                  icon={Activity}
                  onClick={handleStartMeasurement}
                  className="px-6 py-2.5 text-sm font-bold shadow-md bg-brand-green"
                >
                  Insert Finger / Start Sensor
                </Button>
              </div>
            </div>
          )}

          {measuringStatus === 'measuring' && (
            <div className="flex flex-col items-center justify-center p-6 rounded-xl bg-slate-900 text-white shadow-inner gap-4">
              <div className="flex items-center justify-between w-full max-w-md px-4">
                <div className="flex items-center gap-2">
                  <Heart size={20} className="text-red-500 animate-ping" />
                  <span className="text-xs font-mono text-emerald-400 font-bold">
                    PPG PLETHYSMOGRAM WAVEFORM • LIVE
                  </span>
                </div>
                <div className="text-xs font-mono text-slate-400">
                  {countdown}s remaining
                </div>
              </div>

              {/* Animated Plethysmogram Waveform SVG */}
              <div className="w-full max-w-md h-20 bg-slate-950 rounded-xl border border-slate-800 p-2 flex items-center justify-center relative overflow-hidden">
                <svg className="w-full h-full" viewBox="0 0 400 60" preserveAspectRatio="none">
                  <path
                    d="M 0 30 L 40 30 L 50 30 L 55 10 L 60 50 L 65 20 L 70 35 L 75 30 L 120 30 L 130 30 L 135 10 L 140 50 L 145 20 L 150 35 L 155 30 L 200 30 L 210 30 L 215 10 L 220 50 L 225 20 L 230 35 L 235 30 L 280 30 L 290 30 L 295 10 L 300 50 L 305 20 L 310 35 L 315 30 L 360 30 L 370 30 L 375 10 L 380 50 L 385 20 L 390 35 L 400 30"
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    className="animate-pulse"
                  />
                </svg>
                {/* Scanning line sweep */}
                <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-slate-950 to-transparent" />
              </div>

              <div className="flex items-center gap-6">
                <div className="text-center">
                  <div className="text-[10px] uppercase font-mono text-slate-400">Arterial Pulse</div>
                  <div className="text-2xl font-black text-white font-mono">{livePulse} <span className="text-xs font-normal text-slate-400">BPM</span></div>
                </div>
                <div className="h-8 w-px bg-slate-700" />
                <div className="text-center">
                  <div className="text-[10px] uppercase font-mono text-slate-400">Acquisition</div>
                  <div className="text-sm font-bold text-emerald-400">Reading Capillaries...</div>
                </div>
              </div>

              <span className="text-xs text-slate-400 italic">
                Please hold your finger steady in the bottom-right sensor bay.
              </span>
            </div>
          )}

          {measuringStatus === 'completed' && (
            <div className="flex flex-col gap-3 p-4 rounded-xl bg-emerald-50 border border-emerald-300">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm">
                  <CheckCircle2 size={18} className="text-emerald-600" />
                  <span>Objective Telemetry Captured Successfully via Vital Signs Sensor Bay</span>
                </div>
                <button
                  onClick={handleStartMeasurement}
                  className="flex items-center gap-1 text-xs font-bold text-emerald-800 hover:text-emerald-950 underline"
                >
                  <RefreshCw size={12} />
                  <span>Retest</span>
                </button>
              </div>

              {/* Telemetry Result Chips */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-white p-3 rounded-xl border border-emerald-200 text-center shadow-sm">
                  <div className="text-[11px] font-bold text-slate-500 uppercase">SpO₂ (Blood Oxygen)</div>
                  <div className="text-2xl font-black text-brand-green">
                    {vitals.spo2 || 98}%
                  </div>
                  <div className="text-[10px] text-emerald-700 font-medium">Normal (95–100%)</div>
                </div>

                <div className="bg-white p-3 rounded-xl border border-emerald-200 text-center shadow-sm">
                  <div className="text-[11px] font-bold text-slate-500 uppercase">Pulse Rate</div>
                  <div className="text-2xl font-black text-brand-green">
                    {vitals.pulseRate || 76} <span className="text-xs font-semibold">BPM</span>
                  </div>
                  <div className="text-[10px] text-emerald-700 font-medium">Normal Resting Rate</div>
                </div>

                <div className="bg-white p-3 rounded-xl border border-emerald-200 text-center shadow-sm">
                  <div className="text-[11px] font-bold text-slate-500 uppercase">Perfusion Index (PI)</div>
                  <div className="text-2xl font-black text-brand-green">
                    {vitals.perfusionIndex || '4.2%'}
                  </div>
                  <div className="text-[10px] text-emerald-700 font-medium">Strong Arterial Pulse</div>
                </div>
              </div>
            </div>
          )}

          {measuringStatus === 'skipped' && (
            <div className="flex items-center justify-between p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900">
              <div className="flex items-center gap-2 text-xs font-medium">
                <Info size={16} className="text-amber-600 shrink-0" />
                <span>
                  Automatic vitals sensor was skipped. The triage nurse will measure your blood pressure and vitals manually at the triage desk.
                </span>
              </div>
              <Button
                variant="subtle"
                size="sm"
                onClick={handleStartMeasurement}
                className="text-xs font-bold text-amber-900 border border-amber-300"
              >
                Insert Finger
              </Button>
            </div>
          )}

          {/* Clinical Authority Disclaimer */}
          <div className="mt-3 text-[11px] text-slate-500 flex items-center gap-1.5">
            <ShieldAlert size={14} className="text-slate-400 shrink-0" />
            <span>
              Clinical Governance: Automated kiosk readings provide preliminary screening telemetry. Final clinical assessment, vital sign verification, and Emergency Severity Index (ESI 1–5) are determined exclusively by the triage nurse.
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Buttons (Step 4 -> Step 5 Review) */}
      <div className="w-full max-w-4xl mx-auto flex items-center justify-between pt-4 border-t border-slate-200">
        <Button
          variant="outline"
          size="md"
          icon={ArrowLeft}
          onClick={() => setKioskStep('body-map')}
          className="px-6"
        >
          Back / Balik
        </Button>

        <Button
          variant="primary"
          size="lg"
          trailingIcon={ArrowRight}
          onClick={() => setKioskStep('review')}
          className="px-10 py-4 text-lg font-bold shadow-lg"
        >
          Next: Review Summary
        </Button>
      </div>
    </div>
  );
}
