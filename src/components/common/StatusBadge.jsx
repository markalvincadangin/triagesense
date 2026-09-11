import React from 'react';
import { Clock, CheckCircle2, AlertCircle, AlertTriangle, ShieldCheck } from 'lucide-react';

export function StatusBadge({ type = 'status', value, className = '' }) {
  if (type === 'acuity') {
    // Clinical Acuity Badge (Nurse Confirmed)
    const acuityConfig = {
      'ESI-1': { label: 'ESI-1 Resuscitation', bgClass: 'bg-red-100 text-red-900 border-red-300', icon: AlertCircle },
      'ESI-2': { label: 'ESI-2 Emergent', bgClass: 'bg-orange-100 text-orange-900 border-orange-300', icon: AlertTriangle },
      'ESI-3': { label: 'ESI-3 Urgent', bgClass: 'bg-amber-100 text-amber-900 border-amber-300', icon: Clock },
      'ESI-4': { label: 'ESI-4 Less Urgent', bgClass: 'bg-blue-100 text-blue-900 border-blue-300', icon: ShieldCheck },
      'ESI-5': { label: 'ESI-5 Non-Urgent', bgClass: 'bg-emerald-100 text-emerald-900 border-emerald-300', icon: CheckCircle2 },
      'default': { label: 'Needs Nurse Review', bgClass: 'bg-purple-100 text-purple-900 border-purple-300', icon: Clock }
    };

    const config = acuityConfig[value] || acuityConfig['default'];
    const Icon = config.icon;

    return (
      <span
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[13px] font-bold border whitespace-nowrap select-none ${config.bgClass} ${className}`}
      >
        <Icon size={14} strokeWidth={2.2} />
        <span>{config.label}</span>
      </span>
    );
  }

  // Workflow Status Badge ('New' | 'Waiting' | 'In Triage' | 'Completed')
  const statusConfig = {
    'New': { label: 'New Intake', bgClass: 'bg-sky-100 text-sky-800 border-sky-300', icon: AlertCircle },
    'Waiting': { label: 'Waiting for Triage', bgClass: 'bg-amber-100 text-amber-800 border-amber-300', icon: Clock },
    'In Triage': { label: 'In Triage', bgClass: 'bg-purple-100 text-purple-800 border-purple-300', icon: Clock },
    'Completed': { label: 'Completed', bgClass: 'bg-emerald-100 text-emerald-800 border-emerald-300', icon: CheckCircle2 }
  };

  const config = statusConfig[value] || statusConfig['New'];
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[13px] font-semibold border whitespace-nowrap select-none ${config.bgClass} ${className}`}
    >
      <Icon size={14} strokeWidth={2} />
      <span>{config.label}</span>
    </span>
  );
}
