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
  GripHorizontal,
  ZoomIn,
  ZoomOut,
  Maximize,
  Minimize,
  Camera,
  Clipboard,
  Tag,
  Eye,
  EyeOff,
  Navigation,
  ChevronRight
} from 'lucide-react';

// ─── Screen name maps for navigation & labels ───────────────────────────────
const KIOSK_SCREENS = [
  { key: 'welcome', label: 'Welcome' },
  { key: 'language', label: 'Language Select' },
  { key: 'identification', label: 'ID Method' },
  { key: 'patient-info', label: 'Patient Info' },
  { key: 'symptoms', label: 'Symptoms' },
  { key: 'body-map', label: 'Body Map' },
  { key: 'pain-duration', label: 'Pain & Pulse' },
  { key: 'additional-details', label: 'Extra Details' },
  { key: 'review', label: 'Review & Send' },
  { key: 'confirmation', label: 'Confirmation' }
];

const ADMIN_SCREENS = [
  { key: 'live-queue', label: 'Live Triage Queue' },
  { key: 'patient-dossier', label: 'Patient Triage Chart' },
  { key: 'emergency-console', label: 'Emergency Calls' },
  { key: 'patient-directory', label: 'Patient Records' },
  { key: 'analytics', label: 'ED Analytics' },
  { key: 'fleet-manager', label: 'Kiosk Stations' }
];

export function DemoControls() {
  const [isOpen, setIsOpen] = useState(false);
  const {
    viewMode,
    setViewMode,
    emergencyAlert,
    setActiveAdminTab,
    activeAdminTab,
    kioskStep,
    setKioskStep,
    resetDemoData
  } = useTriage();

  // ─── Zoom state ──────────────────────────────────────────────────────────
  const [zoomLevel, setZoomLevel] = useState(100);
  const ZOOM_STEPS = [50, 67, 75, 80, 90, 100, 110, 125, 150];

  // ─── Screenshot flash feedback ───────────────────────────────────────────
  const [screenshotFlash, setScreenshotFlash] = useState(false);

  // ─── Page label overlay toggle ───────────────────────────────────────────
  const [showPageLabel, setShowPageLabel] = useState(false);

  // ─── Quick nav accordion ─────────────────────────────────────────────────
  const [navExpanded, setNavExpanded] = useState(false);

  // ─── Draggable position state ────────────────────────────────────────────
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

  // ─── Drag listeners ──────────────────────────────────────────────────────
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

  // ─── Apply zoom via CSS transform on the viewport root ───────────────────
  useEffect(() => {
    const viewportRoot = document.querySelector('[data-viewport-root]');
    if (viewportRoot) {
      const scale = zoomLevel / 100;
      viewportRoot.style.transform = `scale(${scale})`;
      viewportRoot.style.transformOrigin = 'center center';
    }
  }, [zoomLevel]);

  // ─── Zoom handlers ───────────────────────────────────────────────────────
  const zoomIn = () => {
    setZoomLevel((prev) => {
      const nextStep = ZOOM_STEPS.find((s) => s > prev);
      return nextStep || prev;
    });
  };

  const zoomOut = () => {
    setZoomLevel((prev) => {
      const prevStep = [...ZOOM_STEPS].reverse().find((s) => s < prev);
      return prevStep || prev;
    });
  };

  const resetZoom = () => setZoomLevel(100);

  // ─── Fullscreen toggle ────────────────────────────────────────────────────
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch (err) {
      console.warn('Fullscreen toggle failed:', err);
    }
  };

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  // ─── Screenshot capture (individual page content, not whole screen) ──────
  const captureScreenshot = async (target = 'current') => {
    try {
      let element = null;

      if (target === 'kiosk' || (target === 'current' && (viewMode === 'kiosk' || viewMode === 'split'))) {
        element = document.querySelector('[data-kiosk-screen]');
      }

      if (target === 'admin' || (target === 'current' && viewMode === 'admin')) {
        element = document.querySelector('[data-admin-screen]');
      }

      if (!element) {
        element = document.querySelector('[data-viewport-root]') || document.body;
      }

      const { toPng } = await import('html-to-image');

      setScreenshotFlash(true);
      setTimeout(() => setScreenshotFlash(false), 300);

      const dataUrl = await toPng(element, {
        quality: 1.0,
        pixelRatio: 2,
        backgroundColor: '#FFFFFF',
        filter: (node) => {
          if (node?.getAttribute?.('aria-label') === 'Demo controls') return false;
          return true;
        }
      });

      const pageName = getCurrentPageName();
      const timestamp = new Date().toISOString().slice(0, 19).replace(/[T:]/g, '-');
      const filename = `TriageSense_${pageName}_${timestamp}.png`;

      const link = document.createElement('a');
      link.download = filename;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Screenshot capture failed:', err);
    }
  };

  // ─── Copy screenshot to clipboard ────────────────────────────────────────
  const copyScreenshotToClipboard = async () => {
    try {
      let element = null;

      if (viewMode === 'kiosk' || viewMode === 'split') {
        element = document.querySelector('[data-kiosk-screen]');
      } else if (viewMode === 'admin') {
        element = document.querySelector('[data-admin-screen]');
      }

      if (!element) {
        element = document.querySelector('[data-viewport-root]') || document.body;
      }

      const { toBlob } = await import('html-to-image');

      setScreenshotFlash(true);
      setTimeout(() => setScreenshotFlash(false), 300);

      const blob = await toBlob(element, {
        quality: 1.0,
        pixelRatio: 2,
        backgroundColor: '#FFFFFF',
        filter: (node) => {
          if (node?.getAttribute?.('aria-label') === 'Demo controls') return false;
          return true;
        }
      });

      if (blob && navigator.clipboard?.write) {
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob })
        ]);
      }
    } catch (err) {
      console.error('Copy to clipboard failed:', err);
    }
  };

  // ─── Current page name helper ────────────────────────────────────────────
  const getCurrentPageName = () => {
    if (viewMode === 'kiosk' || viewMode === 'split') {
      const found = KIOSK_SCREENS.find((s) => s.key === kioskStep);
      return found ? found.label.replace(/\s+/g, '_') : kioskStep;
    }
    if (viewMode === 'admin') {
      const found = ADMIN_SCREENS.find((s) => s.key === activeAdminTab);
      return found ? found.label.replace(/\s+/g, '_') : activeAdminTab;
    }
    return 'Screen';
  };

  const getCurrentPageLabel = () => {
    if (viewMode === 'kiosk' || viewMode === 'split') {
      const found = KIOSK_SCREENS.find((s) => s.key === kioskStep);
      return found ? found.label : kioskStep;
    }
    if (viewMode === 'admin') {
      const found = ADMIN_SCREENS.find((s) => s.key === activeAdminTab);
      return found ? found.label : activeAdminTab;
    }
    return 'Screen';
  };

  const handleOpenEmergencyConsole = () => {
    setViewMode('admin');
    setActiveAdminTab('emergency-console');
    setIsOpen(false);
  };

  // Determine smart alignment for popup menu
  const isNearRight = position.x > (typeof window !== 'undefined' ? window.innerWidth / 2 : 600);
  const isNearBottom = position.y > (typeof window !== 'undefined' ? window.innerHeight / 2 : 400);

  return (
    <>
      {/* Screenshot camera-flash overlay */}
      {screenshotFlash && (
        <div className="fixed inset-0 z-[99999] bg-white/70 pointer-events-none animate-pulse" style={{ animationDuration: '200ms' }} />
      )}

      {/* Page label overlay (pinned to top-center of viewport) */}
      {showPageLabel && (
        <div className="fixed top-3 left-1/2 -translate-x-1/2 z-[9998] px-4 py-1.5 bg-slate-900/90 text-white text-xs font-bold rounded-full border border-slate-700/80 backdrop-blur-xl shadow-lg flex items-center gap-2 pointer-events-none">
          <Tag size={12} className="text-brand-gold" />
          <span>{viewMode === 'kiosk' ? 'Kiosk' : viewMode === 'admin' ? 'Staff Portal' : 'Dual View'}</span>
          <span className="text-slate-500">|</span>
          <span className="text-brand-gold">{getCurrentPageLabel()}</span>
        </div>
      )}

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

        {/* ═══════════════════════════════════════════════════════════════════
            Floating Popover Menu Panel
        ═══════════════════════════════════════════════════════════════════ */}
        {isOpen && (
          <div
            className={`absolute w-80 bg-slate-900/95 text-slate-100 rounded-2xl shadow-2xl border border-slate-700/80 backdrop-blur-2xl p-4 animate-fade-in flex flex-col gap-3 ${
              isNearRight ? 'right-0' : 'left-0'
            } ${isNearBottom ? 'bottom-14' : 'top-14'}`}
            style={{ maxWidth: '90vw', maxHeight: '85vh', overflowY: 'auto' }}
          >
            {/* ── Top Bar ─────────────────────────────────────────────── */}
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

            {/* ── Viewport Mode Switcher ───────────────────────────────── */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Active Viewport
              </label>
              <div className="grid grid-cols-3 gap-1 bg-slate-950/80 p-1 rounded-xl border border-slate-800">
                <button
                  type="button"
                  onClick={() => { setViewMode('kiosk'); }}
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
                  onClick={() => { setViewMode('admin'); }}
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
                  onClick={() => { setViewMode('split'); }}
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

            {/* ── Zoom Controls ────────────────────────────────────────── */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Zoom
              </label>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={zoomOut}
                  disabled={zoomLevel <= ZOOM_STEPS[0]}
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 flex items-center justify-center text-slate-300 transition-colors border border-slate-700/50"
                  title="Zoom Out"
                >
                  <ZoomOut size={14} />
                </button>

                <button
                  type="button"
                  onClick={resetZoom}
                  className="flex-1 h-8 rounded-lg bg-slate-800/60 hover:bg-slate-700/60 text-xs font-bold text-slate-200 border border-slate-700/50 transition-colors"
                  title="Reset to 100%"
                >
                  {zoomLevel}%
                </button>

                <button
                  type="button"
                  onClick={zoomIn}
                  disabled={zoomLevel >= ZOOM_STEPS[ZOOM_STEPS.length - 1]}
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 flex items-center justify-center text-slate-300 transition-colors border border-slate-700/50"
                  title="Zoom In"
                >
                  <ZoomIn size={14} />
                </button>

                <button
                  type="button"
                  onClick={toggleFullscreen}
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 transition-colors border border-slate-700/50"
                  title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
                >
                  {isFullscreen ? <Minimize size={14} /> : <Maximize size={14} />}
                </button>
              </div>
            </div>

            {/* ── Screenshot & Capture ──────────────────────────────────── */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Capture
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  type="button"
                  onClick={() => captureScreenshot('current')}
                  className="flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700/50 transition-colors"
                  title="Download screenshot of current page as PNG"
                >
                  <Camera size={13} />
                  <span>Save PNG</span>
                </button>

                <button
                  type="button"
                  onClick={copyScreenshotToClipboard}
                  className="flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700/50 transition-colors"
                  title="Copy screenshot to clipboard (Ctrl+V to paste)"
                >
                  <Clipboard size={13} />
                  <span>Copy</span>
                </button>
              </div>

              {/* Dual view: separate kiosk / admin capture */}
              {viewMode === 'split' && (
                <div className="grid grid-cols-2 gap-1.5 mt-0.5">
                  <button
                    type="button"
                    onClick={() => captureScreenshot('kiosk')}
                    className="flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg bg-emerald-900/40 hover:bg-emerald-800/50 text-[11px] font-semibold text-emerald-300 border border-emerald-700/40 transition-colors"
                  >
                    <Smartphone size={11} />
                    <span>Kiosk Only</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => captureScreenshot('admin')}
                    className="flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg bg-blue-900/40 hover:bg-blue-800/50 text-[11px] font-semibold text-blue-300 border border-blue-700/40 transition-colors"
                  >
                    <Monitor size={11} />
                    <span>Staff Only</span>
                  </button>
                </div>
              )}
            </div>

            {/* ── Quick Page Navigation ─────────────────────────────────── */}
            <div className="flex flex-col gap-1.5">
              <button
                type="button"
                onClick={() => setNavExpanded(!navExpanded)}
                className="flex items-center justify-between w-full text-[10px] font-bold uppercase tracking-wider text-slate-400 hover:text-slate-200 transition-colors"
              >
                <span className="flex items-center gap-1.5">
                  <Navigation size={10} />
                  Quick Navigate
                </span>
                <ChevronRight size={12} className={`transition-transform ${navExpanded ? 'rotate-90' : ''}`} />
              </button>

              {navExpanded && (
                <div className="flex flex-col gap-2 animate-fade-in">
                  {/* Kiosk screens */}
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-400 px-1">Kiosk Screens</span>
                    <div className="grid grid-cols-2 gap-1">
                      {KIOSK_SCREENS.map((screen) => (
                        <button
                          key={screen.key}
                          type="button"
                          onClick={() => {
                            setViewMode('kiosk');
                            setKioskStep(screen.key);
                          }}
                          className={`text-left px-2 py-1.5 rounded-lg text-[11px] font-medium transition-colors ${
                            viewMode === 'kiosk' && kioskStep === screen.key
                              ? 'bg-emerald-600 text-white'
                              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                          }`}
                        >
                          {screen.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Admin screens */}
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-blue-400 px-1">Staff Portal Screens</span>
                    <div className="grid grid-cols-2 gap-1">
                      {ADMIN_SCREENS.map((screen) => (
                        <button
                          key={screen.key}
                          type="button"
                          onClick={() => {
                            setViewMode('admin');
                            setActiveAdminTab(screen.key);
                          }}
                          className={`text-left px-2 py-1.5 rounded-lg text-[11px] font-medium transition-colors ${
                            viewMode === 'admin' && activeAdminTab === screen.key
                              ? 'bg-blue-600 text-white'
                              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                          }`}
                        >
                          {screen.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* ── Page Label Toggle ──────────────────────────────────────── */}
            <div className="flex items-center justify-between px-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Tag size={10} />
                Page Label Overlay
              </span>
              <button
                type="button"
                onClick={() => setShowPageLabel(!showPageLabel)}
                className={`w-9 h-5 rounded-full flex items-center transition-colors ${
                  showPageLabel ? 'bg-brand-green justify-end' : 'bg-slate-700 justify-start'
                }`}
              >
                <span className="w-4 h-4 rounded-full bg-white shadow-sm mx-0.5 transition-transform flex items-center justify-center">
                  {showPageLabel ? <Eye size={8} className="text-emerald-700" /> : <EyeOff size={8} className="text-slate-500" />}
                </span>
              </button>
            </div>

            {/* ── Active Emergency Alert Quick Jump ─────────────────────── */}
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

            {/* ── Reset Demo State ──────────────────────────────────────── */}
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

            {/* ── Footer ──────────────────────────────────────────────── */}
            <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px] text-slate-400">
              <span>Drag icon to reposition</span>
              <span>CIT 213 HCI 2</span>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
