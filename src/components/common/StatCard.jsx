import React from 'react';

export function StatCard({
  label,
  value,
  subtext,
  icon: Icon,
  variant = 'default', // 'default' | 'success' | 'warning' | 'emergency' | 'brand'
  size = 'md', // 'sm' | 'md' | 'lg'
  className = ''
}) {
  const variantStyles = {
    default: {
      card: 'bg-white border-border-main text-text-primary',
      value: 'text-text-primary',
      iconBg: 'bg-slate-100 text-slate-600',
      subtext: 'text-text-secondary'
    },
    success: {
      card: 'bg-emerald-50/60 border-emerald-200 text-emerald-950',
      value: 'text-brand-green',
      iconBg: 'bg-emerald-100 text-brand-green',
      subtext: 'text-emerald-700'
    },
    warning: {
      card: 'bg-amber-50/60 border-amber-200 text-amber-950',
      value: 'text-amber-700',
      iconBg: 'bg-amber-100 text-amber-700',
      subtext: 'text-amber-700'
    },
    emergency: {
      card: 'bg-red-50/60 border-red-200 text-red-950',
      value: 'text-emergency',
      iconBg: 'bg-red-100 text-emergency',
      subtext: 'text-red-700'
    },
    brand: {
      card: 'bg-emerald-900 text-white border-emerald-800',
      value: 'text-brand-gold',
      iconBg: 'bg-emerald-800 text-white',
      subtext: 'text-emerald-200'
    }
  };

  const style = variantStyles[variant] || variantStyles.default;

  return (
    <div className={`p-4 rounded-xl border flex flex-col justify-between shadow-2xs transition-all ${style.card} ${className}`}>
      <div className="flex items-center justify-between gap-2 mb-1.5">
        <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
          {label}
        </span>
        {Icon && (
          <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${style.iconBg}`}>
            <Icon size={14} strokeWidth={2.2} />
          </div>
        )}
      </div>

      <div>
        <div className={`font-black tracking-tight ${size === 'lg' ? 'text-3xl' : size === 'sm' ? 'text-xl' : 'text-2xl'} ${style.value}`}>
          {value}
        </div>
        {subtext && (
          <div className={`text-[11px] font-medium mt-0.5 ${style.subtext}`}>
            {subtext}
          </div>
        )}
      </div>
    </div>
  );
}
