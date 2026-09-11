import React from 'react';

export function FormInput({
  label,
  unit,
  type = 'text',
  value,
  onChange,
  placeholder = '',
  disabled = false,
  readOnly = false,
  align = 'left', // 'left' | 'center' | 'right'
  size = 'md', // 'sm' | 'md' | 'lg'
  error = '',
  required = false,
  icon: Icon,
  className = '',
  inputClassName = '',
  ...props
}) {
  const sizeClasses = {
    sm: 'h-9 text-xs px-3',
    md: 'h-11 text-sm px-3.5',
    lg: 'h-14 text-base px-4'
  };

  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  };

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label className="flex items-center justify-between text-xs font-bold text-text-secondary tracking-wide uppercase">
          <span className="flex items-center gap-1.5">
            {Icon && <Icon size={13} className="text-brand-green shrink-0" />}
            <span>{label}</span>
            {required && <span className="text-emergency font-bold">*</span>}
          </span>
          {unit && (
            <span className="text-[10px] font-mono text-slate-400 lowercase">
              ({unit})
            </span>
          )}
        </label>
      )}

      <div className="relative flex items-center">
        <input
          type={type}
          value={value ?? ''}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          className={`w-full rounded-lg border font-semibold transition-all outline-none ${
            sizeClasses[size] || sizeClasses.md
          } ${alignClasses[align] || alignClasses.left} ${
            error
              ? 'border-emergency bg-red-50/50 text-red-950 focus:ring-2 focus:ring-red-400/30'
              : 'border-border-main bg-white text-text-primary focus:border-brand-green focus:ring-2 focus:ring-emerald-500/20'
          } ${disabled ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : ''} ${inputClassName}`}
          {...props}
        />
      </div>

      {error && (
        <span className="text-[11px] font-semibold text-emergency">{error}</span>
      )}
    </div>
  );
}
