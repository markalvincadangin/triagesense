import React, { useState, useEffect } from 'react';
import { ShieldCheck, Activity } from 'lucide-react';

export function KioskHeader({ onLogoClick }) {
  const [currentTime, setCurrentTime] = useState('');

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
    <header className="w-full h-24 bg-surface border-b border-border-main flex items-center justify-between px-10 shrink-0 select-none">
      {/* Brand Cluster */}
      <div
        onClick={onLogoClick}
        className={`flex items-center gap-4 ${onLogoClick ? 'cursor-pointer hover:opacity-95' : 'cursor-default'}`}
      >
        {/* WVSUMC Emblem Seal */}
        <div className="w-14 h-14 rounded-md bg-brand-green flex items-center justify-center text-white shadow-sm shrink-0">
          <Activity size={32} strokeWidth={2.5} />
        </div>

        <div>
          <div className="text-[15px] font-bold text-brand-green tracking-wide leading-tight">
            WEST VISAYAS STATE UNIVERSITY
          </div>
          <div className="text-[13px] font-semibold text-text-secondary tracking-wider mt-0.5">
            MEDICAL CENTER • EMERGENCY INTAKE KIOSK
          </div>
        </div>
      </div>

      {/* Live System Time & Terminal Status */}
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2 px-3.5 py-1.5 bg-brand-green-light rounded-full text-brand-green text-xs font-semibold">
          <ShieldCheck size={16} strokeWidth={2.2} />
          <span>Kiosk 01 • Ready</span>
        </div>

        <div className="text-sm font-semibold text-text-secondary tabular-nums">
          {currentTime || '17:40:00 PST'}
        </div>
      </div>
    </header>
  );
}
