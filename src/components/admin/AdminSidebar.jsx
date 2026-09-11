import React from 'react';
import { useTriage } from '../../context/TriageContext';
import {
  LayoutDashboard,
  ClipboardList,
  AlertTriangle,
  FolderArchive,
  BarChart3,
  Server,
  ShieldCheck
} from 'lucide-react';

const NAV_ITEMS = [
  { id: 'ADM01', label: 'Live Triage Queue', code: 'ADM-01', icon: LayoutDashboard },
  { id: 'ADM02', label: 'Patient Clinical Dossier', code: 'ADM-02', icon: ClipboardList },
  { id: 'ADM03', label: 'Emergency Console', code: 'ADM-03', icon: AlertTriangle, hasAlert: true },
  { id: 'ADM04', label: 'Patient Directory', code: 'ADM-04', icon: FolderArchive },
  { id: 'ADM05', label: 'Operational Reports', code: 'ADM-05', icon: BarChart3 },
  { id: 'ADM06', label: 'Kiosk Fleet & Settings', code: 'ADM-06', icon: Server }
];

export function AdminSidebar() {
  const { activeAdminTab, setActiveAdminTab, emergencyAlert, intakes } = useTriage();

  const newCount = intakes.filter((i) => i.status === 'New').length;

  return (
    <aside className="w-[260px] bg-surface border-r border-border-main flex flex-col justify-between p-5 shrink-0 select-none">
      {/* Top Nav Links */}
      <div className="flex flex-col gap-1.5">
        <div className="text-[11px] font-bold uppercase tracking-wider text-text-secondary px-3 pb-2">
          Clinical Workstation
        </div>

        {NAV_ITEMS.map((item) => {
          const isActive = activeAdminTab === item.id;
          const Icon = item.icon;
          const isEmergency = item.id === 'ADM03' && emergencyAlert.active;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveAdminTab(item.id)}
              className={`flex items-center justify-between px-3.5 py-3 rounded-md text-sm font-semibold transition-all duration-150 text-left ${
                isEmergency
                  ? 'bg-emergency-surface text-emergency border border-emergency font-bold'
                  : isActive
                  ? 'bg-brand-green-light text-brand-green font-bold shadow-subtle'
                  : 'text-text-primary hover:bg-slate-100/80'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  size={18}
                  className={
                    isEmergency
                      ? 'text-emergency'
                      : isActive
                      ? 'text-brand-green'
                      : 'text-text-secondary'
                  }
                  strokeWidth={2.2}
                />
                <span>{item.label}</span>
              </div>

              {/* Badges */}
              {item.id === 'ADM01' && newCount > 0 && (
                <span className="bg-brand-green text-white text-[11px] font-bold px-2 py-0.5 rounded-full">
                  {newCount} New
                </span>
              )}

              {isEmergency && (
                <span className="bg-emergency text-white text-[11px] font-extrabold px-2 py-0.5 rounded-full animate-pulse">
                  ALERT!
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Bottom Clinical Station Status */}
      <div className="p-3.5 rounded-md bg-canvas border border-border-main flex flex-col gap-1">
        <div className="flex items-center gap-1.5 text-xs font-bold text-text-primary">
          <ShieldCheck size={15} className="text-brand-green shrink-0" />
          <span>Triage Desk 1 Active</span>
        </div>
        <p className="text-[11px] text-text-secondary">
          Live ED Intake Feed • Online
        </p>
      </div>
    </aside>
  );
}
