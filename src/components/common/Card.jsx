import React from 'react';

export function Card({
  children,
  variant = 'default', // 'default' | 'highlight' | 'emergency' | 'canvas' | 'bordered' | 'kiosk'
  className = '',
  onClick,
  ...props
}) {
  const variantClasses = {
    default: 'bg-surface border border-border-main shadow-xs',
    highlight: 'bg-surface border-2 border-brand-green shadow-md',
    emergency: 'bg-surface border-2 border-emergency shadow-emergency',
    canvas: 'bg-canvas border border-border-main',
    bordered: 'bg-surface border-2 border-slate-200 shadow-sm',
    kiosk: 'bg-surface border border-border-main rounded-3xl shadow-md p-6'
  };

  return (
    <div
      onClick={onClick}
      className={`overflow-hidden flex flex-col transition-all ${
        variant === 'kiosk' ? '' : 'rounded-2xl'
      } ${variantClasses[variant] || variantClasses.default} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

Card.Header = function CardHeader({
  children,
  icon: Icon,
  title,
  subtitle,
  action,
  variant = 'default', // 'default' | 'brand' | 'emergency' | 'canvas'
  className = ''
}) {
  const headerVariantClasses = {
    default: 'bg-canvas border-b border-border-main text-text-primary',
    brand: 'bg-brand-green text-white',
    emergency: 'bg-emergency text-white',
    canvas: 'bg-slate-50 border-b border-slate-200 text-slate-900'
  };

  return (
    <div
      className={`px-6 py-4 flex items-center justify-between gap-3 select-none ${headerVariantClasses[variant] || headerVariantClasses.default} ${className}`}
    >
      <div className="flex items-center gap-2.5 min-w-0">
        {Icon && <Icon size={18} className="shrink-0" />}
        {title ? (
          <div>
            <div className="text-sm font-extrabold tracking-wide uppercase">{title}</div>
            {subtitle && <div className="text-xs opacity-80 font-normal">{subtitle}</div>}
          </div>
        ) : (
          children
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
};

Card.Body = function CardBody({ children, className = '', noPadding = false }) {
  return (
    <div className={`${noPadding ? '' : 'p-6'} flex-1 flex flex-col ${className}`}>
      {children}
    </div>
  );
};

Card.Footer = function CardFooter({ children, className = '' }) {
  return (
    <div className={`px-6 py-4 bg-canvas border-t border-border-main flex items-center justify-between gap-3 ${className}`}>
      {children}
    </div>
  );
};
