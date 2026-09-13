import React, { useState, useEffect } from 'react';
import { useTriage } from '../../context/TriageContext';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { PainScale } from '../../components/kiosk/PainScale';
import { DurationSelector } from '../../components/kiosk/DurationSelector';
import { KioskFooterNav } from '../../components/kiosk/KioskFooterNav';
import {
  Activity,
  ShieldAlert,
  CheckCircle2,
  RefreshCw,
  Info,
  ArrowDownRight,
  ArrowDown,
  AlertCircle
} from 'lucide-react';

export function PainDuration() {
  const { intakeDraft, updateDraft, updateVitals, setKioskStep, kioskLanguage, activeHardwareSensor, t } = useTriage();
  const [measuringStatus, setMeasuringStatus] = useState('idle'); // 'idle' | 'measuring' | 'completed' | 'skipped'
  const [countdown, setCountdown] = useState(5);
  const [livePulse, setLivePulse] = useState(72);

  const vitals = intakeDraft.vitals || {};

  // Synchronize with external hardware sensor events from Demo Controls
  useEffect(() => {
    if (activeHardwareSensor?.type === 'ppg') {
      if (activeHardwareSensor.status === 'active') {
        setMeasuringStatus('measuring');
        setCountdown(4);
      } else if (activeHardwareSensor.status === 'success') {
        setMeasuringStatus('completed');
      } else if (activeHardwareSensor.status === 'error') {
        setMeasuringStatus('idle');
      }
    }
  }, [activeHardwareSensor]);

  // If vitals are already populated in draft, auto-complete
  useEffect(() => {
    if (vitals.spo2 && measuringStatus === 'idle') {
      setMeasuringStatus('completed');
    }
  }, [vitals.spo2]);

  // Simulate PPG Waveform and countdown when measuring locally
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
    <div className="flex flex-col h-full px-12 py-8 bg-canvas select-none">
      {/* Header */}
      <div className="text-center shrink-0 mb-4">
        <h1 className="text-4xl font-black text-text-primary tracking-tight leading-tight">
          {t('painDuration.stepTitle')}
        </h1>
        <h2 className="text-xl font-bold text-brand-green mt-2">
          {t('painDuration.stepSubtitle')}
        </h2>
      </div>

      {/* Main Controls Stack */}
      <div className="w-full max-w-[960px] mx-auto my-2 flex flex-col gap-6">
        {/* Section 1: Pain Rating Scale */}
        <Card variant="kiosk">
          <div className="text-xl font-black text-text-primary mb-4 flex items-center justify-between">
            <span>{t('painDuration.scaleTitle')}</span>
            <span className="text-sm text-text-secondary font-semibold">{t('painDuration.scaleSubtitle')}</span>
          </div>
          <PainScale
            value={intakeDraft.painLevel || 0}
            onChange={(val) => updateDraft({ painLevel: val })}
          />
        </Card>

        {/* Section 2: Duration Selector */}
        <Card variant="kiosk">
          <div className="text-xl font-black text-text-primary mb-4">
            {t('painDuration.durationTitle')}
          </div>
          <DurationSelector
            value={intakeDraft.duration || '1–6 hours'}
            onChange={(val) => updateDraft({ duration: val })}
          />
        </Card>

        {/* Section 3: Integrated PPG Pulse Oximeter Finger Sensor Bay */}
        <Card variant="kiosk" className="border-2 border-brand-green/40 relative overflow-hidden">
          {/* Header Accent */}
          <div className="flex items-center justify-between border-b border-border-main pb-3.5 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-brand-green-light flex items-center justify-center text-brand-green">
                <Activity size={22} strokeWidth={2.5} />
              </div>
              <div>
                <div className="text-lg font-black text-text-primary">
                  3. Preliminary Vitals Check (Vital Signs Sensor Bay)
                </div>
                <div className="text-sm text-text-secondary font-medium mt-0.5">
                  Place your index finger into the illuminated Vital Signs Sensor Bay below the screen for 5 seconds
                </div>
              </div>
            </div>

            {/* Hardware Callout Tag */}
            <div className="flex items-center gap-2 h-9 px-4 bg-brand-green-50 text-emerald-900 rounded-full border border-emerald-200 text-xs font-black tracking-wide animate-pulse">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span>SENSOR BAY READY • OPTICAL PPG</span>
              <ArrowDownRight size={16} className="text-brand-green" />
            </div>
          </div>

          {/* NN/g Heuristic #9: Help Users Recognize, Diagnose, & Recover from Errors */}
          {activeHardwareSensor?.status === 'error' && (
            <div className="mb-4 p-4 rounded-2xl bg-red-50 border-2 border-red-500 text-red-950 flex items-center justify-between gap-4 animate-shake shadow-md">
              <div className="flex items-center gap-3">
                <AlertCircle size={24} className="text-red-600 shrink-0" />
                <div>
                  <div className="text-sm font-black uppercase tracking-wider text-red-900">
                    Sensor Read Notice
                  </div>
                  <div className="text-sm font-semibold text-red-950 mt-0.5">
                    {activeHardwareSensor.message}
                  </div>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleStartMeasurement}
                className="shrink-0 h-11 px-4 text-xs font-black border-red-300 text-red-900 hover:bg-red-100 cursor-pointer"
              >
                Retry Sensor
              </Button>
            </div>
          )}

          {/* Interactive States */}
          {measuringStatus === 'idle' && (
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 rounded-2xl bg-canvas border-2 border-border-main shadow-subtle relative overflow-hidden">
              {/* Left Side: Directional Hardware Callout (P1) */}
              <div className="flex items-center gap-5 text-left flex-1">
                {/* Physical Hardware Representation with Animated Downward Cue */}
                <div className="flex flex-col items-center gap-1.5 shrink-0">
                  <div className="w-22 h-22 rounded-2xl bg-slate-900 border-2 border-brand-green flex flex-col items-center justify-center text-emerald-400 shadow-md relative p-2 group">
                    <div className="w-3 h-3 rounded-full bg-emergency animate-ping absolute top-2 right-2" />
                    <Activity size={26} className="text-emerald-400" />
                    <span className="text-[10px] font-mono font-black tracking-wider text-emerald-300 mt-1 uppercase text-center leading-tight">
                      HARDWARE BAY
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-emerald-800 font-black text-xs uppercase tracking-wider animate-bounce">
                    <ArrowDown size={16} strokeWidth={3} className="text-brand-green" />
                    <span>{t('sensorBay.lookDownShort') || 'LOOK DOWN ↓'}</span>
                  </div>
                </div>

                <div>
                  <div className="text-lg font-black text-text-primary leading-snug">
                    {t('sensorBay.slotInstruction')}
                  </div>

                  <div className="text-sm font-bold text-emerald-900 mt-2 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-brand-green shrink-0 animate-pulse" />
                    <span>{t('sensorBay.doNotTapScreen')}</span>
                  </div>

                  <div className="text-sm text-text-secondary mt-1 font-medium">
                    {t('sensorBay.slotDurationNotice')}
                  </div>
                </div>
              </div>

              {/* Right Side Action Buttons: Primary Scan & Strengthened Ghost Skip (P3) */}
              <div className="flex items-center gap-3.5 shrink-0">
                <Button
                  variant="primary"
                  size="lg"
                  icon={Activity}
                  onClick={handleStartMeasurement}
                  className="h-16 px-8 text-lg font-black rounded-2xl whitespace-nowrap shadow-md"
                >
                  {t('sensorBay.startScanBtn')}
                </Button>
                <button
                  type="button"
                  onClick={handleSkipMeasurement}
                  className="h-16 px-6 text-base font-black text-slate-700 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 border-2 border-slate-300 hover:border-slate-400 rounded-2xl cursor-pointer transition-all shadow-subtle flex items-center justify-center whitespace-nowrap"
                >
                  {t('sensorBay.skipBtn')}
                </button>
              </div>
            </div>
          )}

          {measuringStatus === 'measuring' && (
            <div className="p-6 rounded-2xl bg-text-primary text-white flex flex-col items-center gap-4 relative overflow-hidden border-2 border-brand-green shadow-xl">
              <div className="flex items-center justify-between w-full max-w-md px-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emergency animate-ping" />
                  <span className="text-sm font-mono text-emerald-400 font-bold">
                    Sampling PPG Infrared Telemetry...
                  </span>
                </div>
                <div className="text-sm font-mono text-slate-400 font-semibold">
                  {countdown}s remaining
                </div>
              </div>

              {/* Animated Plethysmogram Waveform */}
              <div className="w-full max-w-md h-24 bg-slate-950 rounded-2xl border border-slate-800 p-2 flex items-center justify-center relative overflow-hidden">
                <svg className="w-full h-full text-emerald-400" viewBox="0 0 300 60" preserveAspectRatio="none">
                  <path
                    d="M0 30 L50 30 L60 10 L70 50 L80 20 L90 40 L100 30 L150 30 L160 10 L170 50 L180 20 L190 40 L200 30 L250 30 L260 10 L270 50 L280 20 L290 40 L300 30"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    className="animate-pulse"
                  />
                </svg>
                <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-slate-950 to-transparent" />
              </div>

              {/* Live Sensor Metrics Readout */}
              <div className="flex items-center gap-8">
                <div className="text-center">
                  <div className="text-xs font-mono text-slate-400 uppercase">SpO₂ Signal</div>
                  <div className="text-3xl font-black text-emerald-400 font-mono">98%</div>
                </div>
                <div className="text-center">
                  <div className="text-xs font-mono text-slate-400 uppercase">Pulse Track</div>
                  <div className="text-3xl font-black text-white font-mono">{livePulse} <span className="text-sm font-normal text-slate-400">BPM</span></div>
                </div>
              </div>

              <span className="text-xs text-slate-400 italic">
                Please keep your finger still inside the Vital Signs Sensor Bay...
              </span>
            </div>
          )}

          {measuringStatus === 'completed' && (
            <div className="p-5 rounded-2xl bg-brand-green-50/90 border-2 border-brand-green shadow-sm flex flex-col gap-4 animate-fade-in">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5 text-emerald-950 font-black text-base">
                  <CheckCircle2 size={24} className="text-brand-green shrink-0" />
                  <span>Preliminary Vitals Recorded Successfully!</span>
                </div>
                <button
                  type="button"
                  onClick={handleStartMeasurement}
                  className="flex items-center gap-1.5 text-sm font-black text-brand-green hover:text-brand-green-hover underline cursor-pointer"
                >
                  <RefreshCw size={16} />
                  <span>Retake</span>
                </button>
              </div>

              {/* Telemetry Result Chips */}
              <div className={`grid gap-4 ${vitals.temperature ? 'grid-cols-4' : 'grid-cols-3'}`}>
                <div className="bg-surface p-4 rounded-2xl border border-emerald-200 text-center shadow-subtle">
                  <div className="text-xs font-bold text-text-secondary uppercase tracking-wide">SpO₂ (Blood Oxygen)</div>
                  <div className="text-3xl font-black text-brand-green mt-1">
                    {vitals.spo2 || 98}%
                  </div>
                  <div className="text-xs text-emerald-800 font-semibold mt-0.5">
                    {(vitals.spo2 || 98) < 94 ? 'Hypoxic (Low O₂)' : 'Normal (95–100%)'}
                  </div>
                </div>

                <div className="bg-surface p-4 rounded-2xl border border-emerald-200 text-center shadow-subtle">
                  <div className="text-xs font-bold text-text-secondary uppercase tracking-wide">Pulse Rate</div>
                  <div className="text-3xl font-black text-brand-green mt-1">
                    {vitals.pulseRate || 76} <span className="text-sm font-semibold">BPM</span>
                  </div>
                  <div className="text-xs text-emerald-800 font-semibold mt-0.5">
                    {(vitals.pulseRate || 76) > 100 ? 'Tachycardic (Elevated)' : 'Normal Resting Rate'}
                  </div>
                </div>

                <div className="bg-surface p-4 rounded-2xl border border-emerald-200 text-center shadow-subtle">
                  <div className="text-xs font-bold text-text-secondary uppercase tracking-wide">Perfusion Index (PI)</div>
                  <div className="text-3xl font-black text-brand-green mt-1">
                    {vitals.perfusionIndex || '4.2%'}
                  </div>
                  <div className="text-xs text-emerald-800 font-semibold mt-0.5">Arterial Pulse Signal</div>
                </div>

                {vitals.temperature && (
                  <div className="bg-surface p-4 rounded-2xl border border-emerald-200 text-center shadow-subtle animate-fade-in">
                    <div className="text-xs font-bold text-text-secondary uppercase tracking-wide">Forehead Temp</div>
                    <div className="text-3xl font-black text-brand-green mt-1">
                      {vitals.temperature}
                    </div>
                    <div className="text-xs text-emerald-800 font-semibold mt-0.5">Infrared Thermal Sensor</div>
                  </div>
                )}
              </div>
            </div>
          )}

          {measuringStatus === 'skipped' && (
            <div className="flex items-center justify-between p-5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900">
              <div className="flex items-center gap-2.5 text-sm font-semibold">
                <Info size={18} className="text-amber-600 shrink-0" />
                <span>
                  Automatic vitals sensor was skipped. The triage nurse will measure your blood pressure and vitals manually at the triage desk.
                </span>
              </div>
              <Button
                variant="subtle"
                size="sm"
                onClick={handleStartMeasurement}
                className="h-12 px-5 text-sm font-bold text-amber-900 border border-amber-300 rounded-xl whitespace-nowrap"
              >
                Insert Finger
              </Button>
            </div>
          )}

          {/* Clinical Authority Disclaimer */}
          <div className="mt-3 text-xs text-text-secondary font-medium flex items-center gap-2">
            <ShieldAlert size={16} className="text-text-disabled shrink-0" />
            <span>
              {t('sensorBay.clinicalDisclaimer')}
            </span>
          </div>
        </Card>
      </div>

      {/* Standardized Bottom Navigation */}
      <KioskFooterNav
        onBack={() => setKioskStep('body-map')}
        onNext={() => setKioskStep('review')}
        backLabel={t('painDuration.btnBack')}
        nextLabel={t('painDuration.btnNext')}
      />
    </div>
  );
}
