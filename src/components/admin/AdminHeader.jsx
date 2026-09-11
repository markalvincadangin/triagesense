import React, { useState, useEffect } from 'react';
import { useTriage } from '../../context/TriageContext';
import {
  Activity,
  Bell,
  Volume2,
  VolumeX,
  AlertTriangle,
  ChevronDown,
  ShieldCheck,
  UserCheck
} from 'lucide-react';
import wvsumcLogo from '../../assets/wvsumc-logo.png';

export function AdminHeader() {
  const { emergencyAlert, setActiveAdminTab, intakes } = useTriage();
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true })
      );
      setCurrentDate(
        now.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })
      );
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  const newIntakesCount = intakes.filter((i) => i.status === 'New').length;

  return (
    <header className="h-[74px] bg-white border-b border-slate-200 flex items-center justify-between px-7 shrink-0 select-none relative z-30">
      {/* Left: TriageSense Logomark + WVSUMC Hospital Identifier */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-[#013b24] flex items-center justify-center text-emerald-400 shadow-sm">
            <Activity size={24} strokeWidth={2.6} />
          </div>
          <span className="text-[22px] font-extrabold text-[#013b24] tracking-tight">
            TriageSense
          </span>
        </div>

        <div className="h-7 w-[1.5px] bg-slate-200 mx-1 hidden sm:block" />

        <div className="flex items-center gap-3">
          <img
            src={wvsumcLogo}
            alt="WVSU Medical Center Seal"
            className="w-9 h-9 object-contain drop-shadow-sm hidden md:block"
          />
          <div>
            <div className="text-[14px] font-bold text-slate-800 tracking-tight leading-tight">
              WVSU Medical Center
            </div>
            <div className="text-[12px] font-medium text-slate-500 leading-tight">
              Emergency Department
            </div>
          </div>
        </div>
      </div>

      {/* Center Emergency Alert Banner Pill if Alert is Active */}
      {emergencyAlert.active && (
        <button
          type="button"
          onClick={() => setActiveAdminTab('emergency-console')}
          className="flex items-center gap-2.5 px-5 py-2 rounded-full bg-emergency text-white text-xs font-bold shadow-emergency hover:bg-emergency-dark transition-all animate-pulse"
        >
          <AlertTriangle size={16} strokeWidth={2.5} />
          <span>EMERGENCY ALERT: {emergencyAlert.kioskId} ({emergencyAlert.elapsedSeconds}s)</span>
        </button>
      )}

      {/* Right Controls: Desk Badge, Notifications, Sound Toggle, Nurse Profile, Clock */}
      <div className="flex items-center gap-4">
        {/* Triage Desk 1 Live Status Pill */}
        <div className="hidden lg:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold shadow-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Triage Desk 1</span>
        </div>

        {/* Notification Bell with Badge */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setShowNotifications(!showNotifications);
              if (!showNotifications) setUnreadCount(0);
            }}
            className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-50 relative transition-colors"
            title="Intake & System Notifications"
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-red-500 text-white text-[10px] font-extrabold flex items-center justify-center shadow-xs">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notification Popover Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 top-12 w-80 bg-white rounded-xl shadow-card border border-slate-200 p-4 z-50 text-xs flex flex-col gap-2.5 animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between font-bold text-slate-800 border-b pb-2">
                <span>Recent Notifications</span>
                <span className="text-[11px] text-emerald-700 font-semibold">Mark all read</span>
              </div>
              <div className="flex flex-col gap-2">
                <div className="p-2 rounded-lg bg-emerald-50 border border-emerald-100 flex items-start gap-2">
                  <UserCheck size={16} className="text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-slate-800">New intake arrived: TS-2026-9898</div>
                    <div className="text-slate-500 text-[11px]">Ana Reyes • Needs Nurse Review (17:21)</div>
                  </div>
                </div>
                <div className="p-2 rounded-lg bg-slate-50 border border-slate-100 flex items-start gap-2">
                  <ShieldCheck size={16} className="text-slate-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-slate-700">Assessment confirmed: TS-2026-9912</div>
                    <div className="text-slate-500 text-[11px]">Juan Dela Cruz • ESI-2 assigned</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Audio Alert Chime Toggle */}
        <button
          type="button"
          onClick={() => setSoundEnabled(!soundEnabled)}
          className={`w-10 h-10 rounded-full border flex items-center justify-center transition-colors ${
            soundEnabled
              ? 'border-slate-200 text-slate-700 hover:bg-slate-50'
              : 'border-amber-200 bg-amber-50 text-amber-700'
          }`}
          title={soundEnabled ? 'Mute emergency alert chime' : 'Enable emergency alert chime'}
        >
          {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
        </button>

        {/* Active Nurse Profile Chip */}
        <div className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-full border border-slate-200 bg-slate-50 hover:bg-slate-100/80 cursor-pointer transition-colors">
          <div className="w-7 h-7 rounded-full bg-slate-800 text-white flex items-center justify-center text-[11px] font-extrabold shadow-xs">
            NK
          </div>
          <span className="text-xs font-bold text-slate-800">Nurse Kristine, RN</span>
          <ChevronDown size={14} className="text-slate-400" />
        </div>

        {/* Live Clock & Date */}
        <div className="text-right pl-1 border-l border-slate-200">
          <div className="text-[13px] font-bold text-slate-800 tabular-nums leading-tight">
            {currentTime || '5:57 PM'}
          </div>
          <div className="text-[11px] font-medium text-slate-400 leading-tight">
            {currentDate || 'Apr 26, 2026'}
          </div>
        </div>
      </div>
    </header>
  );
}
