import React from 'react';
import { AlertTriangle, Info, CheckCircle2, AlertCircle } from 'lucide-react';

export function AlertBanner({
  children,
  title,
  variant = 'warning', // 'warning' | 'info' | 'success' | 'emergency'
  icon: CustomIcon,
  action,
  className = ''
}) {
  const variantConfig = {
    warning: {
      container: 'bg-amber-50 border-amber-300 text-amber-900',
      iconColor: 'text-amber-600',
      defaultIcon: AlertTriangle
    },
    info: {
      container: 'bg-blue-50 border-blue-200 text-blue-900',
      iconColor: 'text-blue-600',
      defaultIcon: Info
    },
    success: {
      container: 'bg-emerald-50 border-emerald-300 text-emerald-900',
      iconColor: 'text-brand-green',
      defaultIcon: CheckCircle2
    },
    emergency: {
      container: 'bg-red-50 border-red-300 text-red-900',
      iconColor: 'text-emergency',
      defaultIcon: AlertCircle
    }
  };

  const config = variantConfig[variant] || variantConfig.warning;
  const IconComponent = CustomIcon || config.defaultIcon;

  return (
    <div
      className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 text-xs font-semibold select-none ${config.container} ${className}`}
    >
      <div className="flex items-center gap-2.5 min-w-0">
        <IconComponent size={18} className={`shrink-0 ${config.iconColor}`} />
        <div className="leading-relaxed">
          {title && <span className="font-extrabold mr-1.5">{title}:</span>}
          <span>{children}</span>
        </div>
      </div>

      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
