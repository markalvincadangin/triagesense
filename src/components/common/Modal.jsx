import React, { useEffect } from 'react';

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = '720px',
  contained = true
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && onClose) {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className={`${
        contained ? 'absolute' : 'fixed'
      } inset-0 z-[999] flex items-center justify-center bg-slate-950/75 backdrop-blur-sm p-8 select-none`}
      onClick={(e) => {
        if (e.target === e.currentTarget && onClose) onClose();
      }}
    >
      <div
        className="animate-fade-in w-full bg-surface rounded-3xl shadow-2xl border-2 border-border-main overflow-hidden flex flex-col"
        style={{ maxWidth }}
      >
        {children}
      </div>
    </div>
  );
}
