import React from 'react';
import { useTriage } from '../../context/TriageContext';
import {
  LayoutDashboard,
  ClipboardList,
  SlidersHorizontal,
  FolderArchive,
  BarChart3,
  Server,
  AlertTriangle
} from 'lucide-react';

const NAV_ITEMS = [
  { id: 'live-queue', label: 'Live Triage Queue', icon: LayoutDashboard },
  { id: 'patient-dossier', label: 'Patient Dossier', icon: ClipboardList },
  { id: 'emergency-console', label: 'Emergency Console', icon: SlidersHorizontal, hasAlert: true },
  { id: 'patient-directory', label: 'Patient Directory', icon: FolderArchive },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'fleet-manager', label: 'Kiosk Fleet & Settings', icon: Server }
];

export function AdminSidebar() {
  const { activeAdminTab, setActiveAdminTab, emergencyAlert, intakes } = useTriage();

  const newCount = intakes.filter((i) => i.status === 'New').length;

  return (
    <aside className="w-[250px] bg-[#013b24] flex flex-col justify-between p-4 shrink-0 select-none text-white relative overflow-hidden">
      {/* Top Navigation Links */}
      <div className="flex flex-col gap-1.5 z-10">
        <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-300/60 px-3 pt-1 pb-2">
          Clinical Navigation
        </div>

        {NAV_ITEMS.map((item) => {
          const isActive =
            activeAdminTab === item.id ||
            (activeAdminTab === 'ADM01' && item.id === 'live-queue') ||
            (activeAdminTab === 'ADM02' && item.id === 'patient-dossier') ||
            (activeAdminTab === 'ADM03' && item.id === 'emergency-console') ||
            (activeAdminTab === 'ADM04' && item.id === 'patient-directory') ||
            (activeAdminTab === 'ADM05' && item.id === 'analytics') ||
            (activeAdminTab === 'ADM06' && item.id === 'fleet-manager');

          const Icon = item.icon;
          const isEmergency = item.id === 'emergency-console' && emergencyAlert.active;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveAdminTab(item.id)}
              className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-[13.5px] font-semibold transition-all duration-150 text-left ${
                isEmergency
                  ? 'bg-red-600 text-white font-bold animate-pulse shadow-md'
                  : isActive
                  ? 'bg-[#0c5838] text-white font-bold shadow-sm'
                  : 'text-emerald-100/75 hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  size={19}
                  className={
                    isEmergency
                      ? 'text-white'
                      : isActive
                      ? 'text-emerald-300'
                      : 'text-emerald-300/70'
                  }
                  strokeWidth={2.2}
                />
                <span className="tracking-tight">{item.label}</span>
              </div>

              {/* Dynamic Badges */}
              {item.id === 'live-queue' && newCount > 0 && (
                <span className="bg-emerald-400 text-emerald-950 text-[10px] font-black px-2 py-0.5 rounded-full">
                  {newCount}
                </span>
              )}

              {isEmergency && (
                <span className="bg-white text-red-700 text-[10px] font-black px-2 py-0.5 rounded-full animate-pulse">
                  ALERT
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Bottom Slogan Branding with Subtle Wave Graphic (from Inspo) */}
      <div className="pt-6 pb-2 px-3 z-10 relative">
        <div className="border-l-[3px] border-brand-gold pl-3 py-0.5">
          <div className="text-[13px] font-bold text-white tracking-tight leading-snug">
            Better Triage.
          </div>
          <div className="text-[13px] font-medium text-emerald-200/90 tracking-tight leading-snug">
            Safer Care.
          </div>
        </div>
      </div>

      {/* Elegant SVG Wave Texture Overlay in Bottom Corner */}
      <div className="absolute -bottom-4 -left-4 -right-4 h-36 opacity-20 pointer-events-none z-0">
        <svg
          viewBox="0 0 300 150"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full object-cover"
        >
          <path
            d="M0,100 C80,120 140,60 220,90 C260,105 280,130 300,120 L300,150 L0,150 Z"
            fill="currentColor"
            className="text-emerald-400"
          />
          <path
            d="M0,70 C70,100 150,40 230,80 C270,95 290,110 300,105 L300,150 L0,150 Z"
            fill="currentColor"
            className="text-emerald-300"
          />
        </svg>
      </div>
    </aside>
  );
}
