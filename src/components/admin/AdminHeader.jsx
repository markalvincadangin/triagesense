import React, { useState, useEffect } from 'react';
import { useTriage } from '../../context/TriageContext';
import { Activity, Bell, BellOff, AlertTriangle } from 'lucide-react';

export function AdminHeader() {
  const { emergencyAlert, setActiveAdminTab } = useTriage();
  const [currentTime, setCurrentTime] = useState('');
  const [soundEnabled, setSoundEnabled] = useState(true);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' PST'
      );
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="h-[70px] bg-surface border-b border-border-main flex items-center justify-between px-8 shrink-0 select-none">
      {/* Hospital & Workspace Identifier */}
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-md bg-brand-green flex items-center justify-center text-white shadow-sm">
          <Activity size={22} strokeWidth={2.5} />
        </div>

        <div>
          <div className="text-[17px] font-bold text-text-primary tracking-tight">
            WVSU Medical Center — Emergency Department
          </div>
          <div className="text-xs font-semibold text-brand-green">
            Triage Staff Workstation
          </div>
        </div>
      </div>

      {/* Center Emergency Alert Banner Pill if Alert is Active */}
      {emergencyAlert.active && (
        <button
          type="button"
          onClick={() => setActiveAdminTab('ADM03')}
          className="flex items-center gap-2.5 px-5 py-2 rounded-full bg-emergency text-white text-sm font-bold shadow-emergency hover:bg-emergency-dark transition-all animate-pulse"
        >
          <AlertTriangle size={18} strokeWidth={2.5} />
          <span>EMERGENCY ALERT: {emergencyAlert.kioskId} ({emergencyAlert.elapsedSeconds}s)</span>
        </button>
      )}

      {/* Staff Context & Utility Controls */}
      <div className="flex items-center gap-5">
        {/* Audio Chime Toggle */}
        <button
          type="button"
          onClick={() => setSoundEnabled(!soundEnabled)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md border text-xs font-semibold transition-colors ${
            soundEnabled
              ? 'bg-brand-green-light border-brand-green/30 text-brand-green'
              : 'bg-canvas border-border-main text-text-secondary hover:bg-slate-100'
          }`}
          title={soundEnabled ? 'Disable auditory triage alert chime' : 'Enable auditory triage alert chime'}
        >
          {soundEnabled ? <Bell size={15} /> : <BellOff size={15} />}
          <span>{soundEnabled ? 'Chime ON' : 'Muted'}</span>
        </button>

        {/* Active Nurse Badge */}
        <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-canvas border border-border-main shadow-subtle">
          <div className="w-7 h-7 rounded-full bg-brand-gold text-slate-900 flex items-center justify-center text-xs font-extrabold">
            NK
          </div>
          <div className="text-xs font-bold text-text-primary">
            Triage Desk 1 • Nurse Kristine, RN
          </div>
        </div>

        {/* Live Clock */}
        <div className="text-xs font-semibold text-text-secondary tabular-nums">
          {currentTime || '17:40:00 PST'}
        </div>
      </div>
    </header>
  );
}
