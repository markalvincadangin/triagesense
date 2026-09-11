import React from 'react';

export function Button({
  children,
  variant = 'primary', // 'primary' | 'secondary' | 'emergency' | 'cooldown' | 'outline' | 'subtle'
  size = 'md', // 'sm' | 'md' | 'lg' (kiosk primary is lg: 360x72)
  icon: Icon,
  trailingIcon: TrailingIcon,
  fullWidth = false,
  disabled = false,
  onClick,
  className = '',
  style = {},
  type = 'button',
  ...props
}) {
  const sizeClasses = {
    sm: 'h-10 px-4 text-sm rounded-sm',
    md: 'h-[52px] px-6 text-base rounded-md',
    lg: `h-[72px] px-7 text-xl rounded-md shadow-card ${fullWidth ? 'w-full' : 'w-[360px]'}`
  };

  const variantClasses = {
    primary: disabled
      ? 'bg-slate-200 text-text-disabled cursor-not-allowed shadow-none border-transparent'
      : 'bg-brand-green text-white hover:bg-brand-green-hover shadow-card active:scale-[0.99] border-transparent',
    secondary: 'bg-brand-blue text-white hover:bg-brand-blue-hover shadow-card active:scale-[0.99] border-transparent',
    emergency: 'bg-emergency text-white hover:bg-emergency-dark shadow-emergency active:scale-[0.99] border-transparent',
    cooldown: 'bg-cooldown text-white cursor-not-allowed border-transparent',
    outline: 'bg-surface text-text-primary border border-border-main hover:bg-canvas hover:border-border-hover active:scale-[0.99]',
    subtle: 'bg-transparent text-text-secondary hover:bg-slate-100 hover:text-text-primary border-transparent'
  };

  return (
    <button
      type={type}
      disabled={disabled || variant === 'cooldown'}
      onClick={disabled || variant === 'cooldown' ? undefined : onClick}
      style={style}
      className={`inline-flex items-center justify-center gap-3 font-semibold select-none transition-all duration-150 border focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-gold ${
        fullWidth ? 'w-full' : ''
      } ${sizeClasses[size] || sizeClasses.md} ${variantClasses[variant] || variantClasses.primary} ${className}`}
      {...props}
    >
      {Icon && <Icon size={size === 'lg' ? 24 : 18} strokeWidth={2} className="shrink-0" />}
      <span>{children}</span>
      {TrailingIcon && <TrailingIcon size={size === 'lg' ? 24 : 18} strokeWidth={2} className="shrink-0" />}
    </button>
  );
}
