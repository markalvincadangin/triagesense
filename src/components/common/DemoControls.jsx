import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useTriage } from '../../context/TriageContext';
import {
  SlidersHorizontal,
  X,
  Smartphone,
  Monitor,
  Columns,
  RotateCcw,
  AlertTriangle,
  ExternalLink,
  Info,
  GripHorizontal
} from 'lucide-react';

export function DemoControls() {
  const [isOpen, setIsOpen] = useState(false);
  const {
    viewMode,
    setViewMode,
    emergencyAlert,
    setActiveAdminTab,
    resetDemoData
  } = useTriage();

  // Draggable position state (defaulting to top-right corner)
  const [position, setPosition] = useState(() => {
    if (typeof window !== 'undefined') {
      return { x: window.innerWidth - 64, y: 20 };
    }
    return { x: 1200, y: 20 };
  });

  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef({
    startX: 0,
    startY: 0,
    origX: 0,
    origY: 0,
    hasMoved: false
  });

  const panelRef = useRef(null);

  // Keep button within screen boundaries on window resize
  useEffect(() => {
    const handleResize = () => {
      setPosition((prev) => ({
        x: Math.min(prev.x, window.innerWidth - 60),
        y: Math.min(prev.y, window.innerHeight - 60)
      }));
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Drag listeners
  const handleStartDrag = (clientX, clientY) => {
    dragRef.current = {
      startX: clientX,
      startY: clientY,
      origX: position.x,
      origY: position.y,
      hasMoved: false
    };
    setIsDragging(true);
  };

  const handleMouseDown = (e) => {
    // Only left click
    if (e.button !== 0) return;
    handleStartDrag(e.clientX, e.clientY);
  };

  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    handleStartDrag(touch.clientX, touch.clientY);
  };

  const handleMove = useCallback((clientX, clientY) => {
    const dx = clientX - dragRef.current.startX;
    const dy = clientY - dragRef.current.startY;
    if (Math.abs(dx) > 4 || Math.abs(dy) > 4) {
      dragRef.current.hasMoved = true;
    }

    const newX = Math.max(12, Math.min(window.innerWidth - 56, dragRef.current.origX + dx));
    const newY = Math.max(12, Math.min(window.innerHeight - 56, dragRef.current.origY + dy));
    setPosition({ x: newX, y: newY });
  }, []);

  const handleEndDrag = useCallback(() => {
    setIsDragging(false);
    // If user clicked without dragging, toggle menu
    if (!dragRef.current.hasMoved) {
      setIsOpen((prev) => !prev);
    }
  }, []);

  useEffect(() => {
    if (!isDragging) return;

    const onMouseMove = (e) => {
      e.preventDefault();
      handleMove(e.clientX, e.clientY);
    };

    const onTouchMove = (e) => {
      const touch = e.touches[0];
      handleMove(touch.clientX, touch.clientY);
    };

    const onMouseUp = () => handleEndDrag();
    const onTouchEnd = () => handleEndDrag();

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onTouchEnd);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [isDragging, handleMove, handleEndDrag]);

  // Close on Escape or click outside
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    const handleClickOutside = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleOpenEmergencyConsole = () => {
    setViewMode('admin');
    setActiveAdminTab('ADM03');
    setIsOpen(false);
  };

  // Determine smart alignment for popup menu
  const isNearRight = position.x > (typeof window !== 'undefined' ? window.innerWidth / 2 : 600);
  const isNearBottom = position.y > (typeof window !== 'undefined' ? window.innerHeight / 2 : 400);

  return (
    <aside
      aria-label="Demo controls"
      className="fixed z-[9999] font-sans select-none"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`
      }}
      ref={panelRef}
    >
      {/* Turbopack-Style Floating Draggable Icon Badge */}
      <div className="relative group">
        <button
          type="button"
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          className={`w-11 h-11 rounded-2xl flex items-center justify-center shadow-2xl backdrop-blur-xl border transition-all duration-150 ${
            isDragging
              ? 'cursor-grabbing scale-105 bg-slate-900 ring-2 ring-brand-green border-brand-green'
              : 'cursor-grab bg-slate-900/90 hover:bg-slate-900 border-slate-700/80 text-slate-200 hover:text-white hover:scale-105'
          } ${isOpen ? 'ring-2 ring-brand-green/80 bg-slate-900 text-white' : ''}`}
          title="Demo Controls (Click to open, drag to move anywhere)"
        >
          {/* Active Emergency Alert Beacon Pip */}
          {emergencyAlert.active ? (
            <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-80" />
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-red-500 border-2 border-slate-900" />
            </span>
          ) : null}

          <SlidersHorizontal size={19} strokeWidth={2.2} className={emergencyAlert.active ? 'text-red-400' : 'text-brand-gold'} />
        </button>

        {/* Hover Tooltip when not open & not dragging */}
        {!isOpen && !isDragging && (
          <div
            className={`absolute pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-150 px-2.5 py-1 bg-slate-950/95 text-slate-300 text-[11px] font-medium rounded-md shadow-lg border border-slate-800 whitespace-nowrap ${
              isNearRight ? 'right-12 top-1.5' : 'left-12 top-1.5'
            }`}
          >
            Demo Controls (Drag to move)
          </div>
        )}
      </div>

      {/* Floating Popover Menu Panel (Smart-Anchored so it never overflows) */}
      {isOpen && (
        <div
          className={`absolute w-72 bg-slate-900/95 text-slate-100 rounded-2xl shadow-2xl border border-slate-700/80 backdrop-blur-2xl p-4 animate-fade-in flex flex-col gap-3.5 ${
            isNearRight ? 'right-0' : 'left-0'
          } ${isNearBottom ? 'bottom-14' : 'top-14'}`}
          style={{ maxWidth: '90vw' }}
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <GripHorizontal size={14} className="text-slate-500" />
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Presentation Controls
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="Close (Esc)"
            >
              <X size={14} />
            </button>
          </div>

          {/* Viewport Mode Switcher */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Active Viewport
            </label>
            <div className="grid grid-cols-3 gap-1 bg-slate-950/80 p-1 rounded-xl border border-slate-800">
              <button
                type="button"
                onClick={() => {
                  setViewMode('kiosk');
                  setIsOpen(false);
                }}
                className={`flex flex-col items-center gap-1 py-2 px-1 rounded-lg text-xs font-semibold transition-all ${
                  viewMode === 'kiosk'
                    ? 'bg-brand-green text-white shadow'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Smartphone size={15} strokeWidth={2} />
                <span>Kiosk</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setViewMode('admin');
                  setIsOpen(false);
                }}
                className={`flex flex-col items-center gap-1 py-2 px-1 rounded-lg text-xs font-semibold transition-all ${
                  viewMode === 'admin'
                    ? 'bg-brand-blue text-white shadow'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Monitor size={15} strokeWidth={2} />
                <span>Staff</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setViewMode('split');
                  setIsOpen(false);
                }}
                className={`flex flex-col items-center gap-1 py-2 px-1 rounded-lg text-xs font-semibold transition-all ${
                  viewMode === 'split'
                    ? 'bg-blue-600 text-white shadow'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Columns size={15} strokeWidth={2} />
                <span>Dual</span>
              </button>
            </div>
          </div>

          {/* Active Emergency Alert Quick Jump */}
          {emergencyAlert.active && (
            <div className="p-2.5 rounded-xl bg-red-950/80 border border-red-800/70 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-xs font-bold text-red-300">
                <AlertTriangle size={14} className="text-red-400 shrink-0 animate-pulse" />
                <span>Emergency Broadcast Active</span>
              </div>
              <p className="text-[11px] text-red-200/90 leading-tight">
                {emergencyAlert.kioskId} ({emergencyAlert.elapsedSeconds}s)
              </p>
              <button
                type="button"
                onClick={handleOpenEmergencyConsole}
                className="w-full py-1.5 bg-red-600 hover:bg-red-500 text-white rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow"
              >
                <ExternalLink size={12} />
                <span>Open Emergency Console</span>
              </button>
            </div>
          )}

          {/* Reset Demo State Action */}
          <div className="pt-1.5 border-t border-slate-800 flex flex-col gap-2">
            <button
              type="button"
              onClick={() => {
                resetDemoData();
                setIsOpen(false);
              }}
              className="w-full py-1.5 px-3 bg-slate-800 hover:bg-slate-700/80 text-slate-200 hover:text-white rounded-xl text-xs font-semibold border border-slate-700/50 flex items-center justify-center gap-2 transition-colors"
            >
              <RotateCcw size={13} strokeWidth={2} />
              <span>Reset Demo State</span>
            </button>
          </div>

          {/* Drag Reposition Hint & Academic Metadata */}
          <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px] text-slate-400">
            <span>Drag icon to move</span>
            <span>CIT 213 HCI 2</span>
          </div>
        </div>
      )}
    </aside>
  );
}
