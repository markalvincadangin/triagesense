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
  Sparkles,
  UserCheck,
  HeartPulse,
  Activity,
  QrCode,
  Wifi,
  Thermometer,
  AlertCircle,
  Radio,
  Check,
  UserPlus,
  RefreshCw,
  Bell,
  ShieldAlert
} from 'lucide-react';

// ─── Screen name maps for navigation & labels ───────────────────────────────
const KIOSK_SCREENS = [
  { key: 'welcome', label: 'Welcome' },
  { key: 'patient-info', label: 'Patient Info' },
  { key: 'symptoms', label: 'Symptoms' },
  { key: 'body-map', label: 'Body Map' },
  { key: 'pain-duration', label: 'Pain & Pulse' },
  { key: 'additional-details', label: 'Extra Details' },
  { key: 'review', label: 'Review & Send' },
  { key: 'confirmation', label: 'Confirmation' }
];

const ADMIN_SCREENS = [
  { key: 'live-queue', label: 'Live Queue' },
  { key: 'patient-dossier', label: 'Patient Dossier' },
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
    kioskFraming,
    setKioskFraming,
    emergencyAlert,
    setActiveAdminTab,
    activeAdminTab,
    kioskStep,
    setKioskStep,
    resetDemoData,
    updateDraft,
    updateDraftPatientInfo,
    updateVitals,
    triggerEmergencyModal,
    confirmEmergencyAssistance,
    dismissEmergency,
    pingKiosk,
    simulateNewPatientIntake,
    activeHardwareSensor,
    triggerHardwareSensor,
    cancelHardwareSensor
  } = useTriage();

  // ─── Zoom state ──────────────────────────────────────────────────────────
  const [zoomLevel, setZoomLevel] = useState(100);
  const ZOOM_STEPS = [50, 67, 75, 80, 90, 100, 110, 125, 150];

  // ─── Screenshot flash feedback & copy status ────────────────────────────
  const [screenshotFlash, setScreenshotFlash] = useState(false);
  const [copied, setCopied] = useState(false);

  // ─── Active Category Tab ────────────────────────────────────────────────
  const [activeTab, setActiveTab] = useState('display'); // 'display' | 'sensors' | 'screens'

  // ─── Page label overlay toggle ───────────────────────────────────────────
  const [showPageLabel, setShowPageLabel] = useState(false);

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
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
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

  // ─── Prototype Demo Simulations & Shortcuts ──────────────────────────────
  const [simulationNotice, setSimulationNotice] = useState(null);
  const [pingingKiosks, setPingingKiosks] = useState(false);

  const showSimNotice = (msg) => {
    setSimulationNotice(msg);
    setTimeout(() => setSimulationNotice(null), 3500);
  };

  const handleAutofillSeniorPatient = () => {
    updateDraft({ identification: 'Hospital ID' });
    updateDraftPatientInfo({
      fullName: 'Juan Dela Cruz y Santos',
      dob: '1956-04-12',
      gender: 'Male',
      contact: '0917-555-1234'
    });
    setViewMode('kiosk');
    setKioskStep('patient-info');
    showSimNotice('Senior citizen intake populated in Step 1.');
  };

  const handleAutofillCompleteCase = () => {
    updateDraft({
      identification: 'PhilHealth QR',
      symptoms: ['Chest Pain / Discomfort', 'Shortness of Breath', 'Cold Sweats'],
      bodyLocations: ['Chest'],
      painLevel: 8,
      duration: '1–6 hours',
      additionalSymptoms: ['Diabetic', 'Hypertension'],
      customNotes: 'Patient reports acute squeezing retrosternal chest pain radiating to left shoulder and arm while climbing stairs.',
      voiceNoteRecorded: true
    });
    updateDraftPatientInfo({
      fullName: 'Roberto Gonzales Ramos',
      dob: '1965-11-23',
      gender: 'Male',
      contact: '0918-771-4432'
    });
    updateVitals({
      spo2: 93,
      pulseRate: 114,
      perfusionIndex: 3.8,
      measuredAt: 'Just now',
      skipped: false
    });
    setViewMode('kiosk');
    setKioskStep('review');
    showSimNotice('Acute emergency case populated in Review step.');
  };

  const handleAutofillPediatricCase = () => {
    updateDraft({
      identification: 'Hospital ID',
      symptoms: ['Fever', 'Cough'],
      bodyLocations: ['Head', 'Respiratory'],
      painLevel: 4,
      duration: '1–3 days',
      additionalSymptoms: ['Loss of appetite', 'Fatigue'],
      customNotes: 'Parent reports persistent high fever since yesterday with barking cough.',
      voiceNoteRecorded: false
    });
    updateDraftPatientInfo({
      fullName: 'Maria Elena Santos',
      dob: '2020-05-14',
      gender: 'Female',
      contact: '0922-441-9982 (Mother)'
    });
    updateVitals({
      spo2: 98,
      pulseRate: 98,
      perfusionIndex: 4.8,
      measuredAt: 'Just now',
      skipped: false
    });
    setViewMode('kiosk');
    setKioskStep('review');
    showSimNotice('Pediatric fever scenario populated in Review step.');
  };

  const handleToggleEmergencyDuress = () => {
    if (emergencyAlert.active) {
      dismissEmergency();
      showSimNotice('Emergency duress broadcast resolved & dismissed.');
    } else {
      confirmEmergencyAssistance('Kiosk 01 (Entrance Lobby)');
      showSimNotice('Emergency duress distress call triggered to Admin Console!');
    }
  };

  const handleSimulateNewIntake = () => {
    const record = simulateNewPatientIntake();
    showSimNotice(`Simulated patient check-in created (${record.id}) in Live Queue!`);
  };

  const handleSimulateKioskPing = () => {
    setPingingKiosks(true);
    setTimeout(() => {
      pingKiosk('kiosk-01');
      pingKiosk('kiosk-02');
      setPingingKiosks(false);
      showSimNotice('Kiosk station heartbeats synchronized (Just now).');
    }, 600);
  };

  // Determine smart alignment for popup menu
  const isNearRight = position.x > (typeof window !== 'undefined' ? window.innerWidth / 2 : 600);
  const isNearBottom = position.y > (typeof window !== 'undefined' ? window.innerHeight / 2 : 400);

  return (
    <>
      {/* Screenshot camera-flash overlay */}
      {screenshotFlash && (
        <div className="fixed inset-0 z-[99999] bg-white/70 pointer-events-none" />
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

      {/* NN/g Heuristic #1: Visibility of System Status (Hardware Sensor Telemetry Toast) */}
      {activeHardwareSensor?.status !== 'idle' && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[99998] px-5 py-2.5 rounded-2xl shadow-2xl border backdrop-blur-2xl flex items-center gap-3 animate-fade-in pointer-events-none transition-all duration-200 bg-slate-900/95 text-white border-slate-700/80">
          <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${
            activeHardwareSensor.status === 'error'
              ? 'bg-red-500 text-white animate-shake'
              : activeHardwareSensor.status === 'success'
              ? 'bg-emerald-500 text-white'
              : 'bg-brand-blue text-white animate-pulse'
          }`}>
            {activeHardwareSensor.type === 'qr' && <QrCode size={18} />}
            {activeHardwareSensor.type === 'nfc' && <Wifi size={18} className="rotate-90" />}
            {activeHardwareSensor.type === 'ppg' && <Activity size={18} />}
            {activeHardwareSensor.type === 'thermal' && <Thermometer size={18} />}
            {!['qr', 'nfc', 'ppg', 'thermal'].includes(activeHardwareSensor.type) && <Radio size={18} />}
          </div>

          <div className="flex flex-col text-left">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-slate-400">
                Hardware Sensor • {activeHardwareSensor.type?.toUpperCase()}
              </span>
              <span className={`text-[9px] px-1.5 py-0.2 rounded font-bold uppercase ${
                activeHardwareSensor.status === 'error' ? 'bg-red-900/80 text-red-200' :
                activeHardwareSensor.status === 'success' ? 'bg-emerald-900/80 text-emerald-200' :
                'bg-blue-900/80 text-blue-200 animate-pulse'
              }`}>
                {activeHardwareSensor.status}
              </span>
            </div>
            <span className="text-xs font-semibold text-slate-100 max-w-sm truncate">
              {activeHardwareSensor.message}
            </span>
          </div>
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
            className={`absolute w-[390px] max-w-[92vw] max-h-[85vh] overflow-y-auto bg-slate-900 text-slate-100 rounded-2xl shadow-2xl border border-slate-700/80 backdrop-blur-2xl p-4 animate-fade-in flex flex-col gap-3.5 ${
              isNearRight ? 'right-0' : 'left-0'
            } ${isNearBottom ? 'bottom-14' : 'top-14'}`}
          >
            {/* ── Top Bar ─────────────────────────────────────────────── */}
            <div className="flex items-center justify-between pb-2.5 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <GripHorizontal size={15} className="text-slate-400 cursor-grab" />
                <div>
                  <h2 className="text-xs font-bold uppercase tracking-wider text-white">
                    Demo & Testing Controls
                  </h2>
                  <p className="text-[10px] text-slate-300">
                    TriageSense • WVSU Medical Center
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => {
                    resetDemoData();
                  }}
                  className="p-1.5 rounded-lg text-slate-300 hover:text-amber-400 hover:bg-slate-800 transition-colors cursor-pointer"
                  title="Reset Demo State to Initial"
                >
                  <RotateCcw size={13} />
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                  title="Close Controls (Esc)"
                >
                  <X size={14} />
                </button>
              </div>
            </div>

            {/* ── Active Emergency Alert Banner (Global) ───────────────── */}
            {emergencyAlert.active && (
              <div className="p-3 rounded-xl bg-red-950/90 border border-red-800/90 flex flex-col gap-2 shadow-lg shadow-red-950/40">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-red-300">
                    <AlertTriangle size={14} className="text-red-400 shrink-0 animate-pulse" />
                    <span>Emergency Call Broadcast</span>
                  </div>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-red-900/80 text-red-200 font-semibold">
                    {emergencyAlert.elapsedSeconds}s elapsed
                  </span>
                </div>
                <p className="text-[11px] text-red-200/90 leading-tight">
                  Origin: {emergencyAlert.kioskId}
                </p>
                <button
                  type="button"
                  onClick={handleOpenEmergencyConsole}
                  className="w-full py-1.5 bg-red-600 hover:bg-red-500 text-white rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow cursor-pointer"
                >
                  <ExternalLink size={12} />
                  <span>Open Emergency Console</span>
                </button>
              </div>
            )}

            {/* ── Category Navigation Tabs ─────────────────────────────── */}
            <div className="grid grid-cols-3 p-1 bg-slate-950 rounded-xl border border-slate-800 gap-1">
              <button
                type="button"
                onClick={() => setActiveTab('display')}
                className={`py-1.5 px-2 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeTab === 'display'
                    ? 'bg-slate-800 text-white shadow-sm border border-slate-700/80'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Monitor size={13} />
                <span>Display</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('sensors')}
                className={`py-1.5 px-2 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeTab === 'sensors'
                    ? 'bg-slate-800 text-white shadow-sm border border-slate-700/80'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Sparkles size={13} className="text-brand-gold" />
                <span>Simulations</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('screens')}
                className={`py-1.5 px-2 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeTab === 'screens'
                    ? 'bg-slate-800 text-white shadow-sm border border-slate-700/80'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Navigation size={13} />
                <span>Screens</span>
              </button>
            </div>

            {/* ═══════════════════════════════════════════════════════════════
                TAB 1: DISPLAY & VIEWPORT CONTROLS
            ═══════════════════════════════════════════════════════════════ */}
            {activeTab === 'display' && (
              <div className="flex flex-col gap-3.5 animate-fade-in">
                {/* ── Viewport Mode Switcher ─────────────────────────────── */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-300">
                      Display Mode
                    </label>
                    <span className="text-[10px] text-slate-300 font-medium">
                      {viewMode === 'kiosk' ? 'Patient Facing' : viewMode === 'admin' ? 'Staff Workstation' : 'Side-by-Side Dual'}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
                    <button
                      type="button"
                      onClick={() => { setViewMode('kiosk'); }}
                      className={`flex flex-col items-center gap-1 py-2 px-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        viewMode === 'kiosk'
                          ? 'bg-brand-green text-white shadow'
                          : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                      }`}
                    >
                      <Smartphone size={15} strokeWidth={2} />
                      <span>Kiosk</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => { setViewMode('admin'); }}
                      className={`flex flex-col items-center gap-1 py-2 px-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        viewMode === 'admin'
                          ? 'bg-brand-blue text-white shadow'
                          : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                      }`}
                    >
                      <Monitor size={15} strokeWidth={2} />
                      <span>Staff</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => { setViewMode('split'); }}
                      className={`flex flex-col items-center gap-1 py-2 px-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        viewMode === 'split'
                          ? 'bg-blue-600 text-white shadow'
                          : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                      }`}
                    >
                      <Columns size={15} strokeWidth={2} />
                      <span>Dual View</span>
                    </button>
                  </div>
                </div>

                {/* ── Kiosk Framing Switcher (Screen Focus vs Totem CAD) ─── */}
                {(viewMode === 'kiosk' || viewMode === 'split') && (
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-300">
                        Kiosk Enclosure Framing
                      </label>
                      <span className="text-[10px] font-medium text-emerald-400">
                        {kioskFraming === 'focus' ? 'Clean 23.8" Screen' : '1,780mm Hardware Enclosure'}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
                      <button
                        type="button"
                        onClick={() => setKioskFraming('focus')}
                        className={`py-2 px-2.5 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                          kioskFraming === 'focus'
                            ? 'bg-brand-green text-white shadow'
                            : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                        }`}
                      >
                        <Smartphone size={14} />
                        <div className="flex flex-col text-left">
                          <span className="leading-tight">Screen Focus</span>
                          <span className="text-[9px] font-normal opacity-80">Clean display</span>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setKioskFraming('totem')}
                        className={`py-2 px-2.5 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                          kioskFraming === 'totem'
                            ? 'bg-brand-blue text-white shadow'
                            : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                        }`}
                      >
                        <Monitor size={14} />
                        <div className="flex flex-col text-left">
                          <span className="leading-tight">Full Totem</span>
                          <span className="text-[9px] font-normal opacity-80">CAD housing</span>
                        </div>
                      </button>
                    </div>
                  </div>
                )}

                {/* ── Zoom & Canvas Scale ──────────────────────────────── */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-300">
                      Canvas Scale
                    </label>
                    <span className="text-[10px] font-mono text-slate-300">
                      {zoomLevel}%
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={zoomOut}
                      disabled={zoomLevel <= ZOOM_STEPS[0]}
                      className="w-9 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 flex items-center justify-center text-slate-200 hover:text-white transition-colors border border-slate-700/60 cursor-pointer"
                      title="Zoom Out"
                    >
                      <ZoomOut size={14} />
                    </button>

                    <button
                      type="button"
                      onClick={resetZoom}
                      className="flex-1 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white border border-slate-700/60 transition-colors cursor-pointer"
                      title="Reset to 100%"
                    >
                      Reset (100%)
                    </button>

                    <button
                      type="button"
                      onClick={zoomIn}
                      disabled={zoomLevel >= ZOOM_STEPS[ZOOM_STEPS.length - 1]}
                      className="w-9 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 flex items-center justify-center text-slate-200 hover:text-white transition-colors border border-slate-700/60 cursor-pointer"
                      title="Zoom In"
                    >
                      <ZoomIn size={14} />
                    </button>

                    <button
                      type="button"
                      onClick={toggleFullscreen}
                      className="w-9 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-200 hover:text-white transition-colors border border-slate-700/60 cursor-pointer"
                      title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
                    >
                      {isFullscreen ? <Minimize size={14} /> : <Maximize size={14} />}
                    </button>
                  </div>
                </div>

                {/* ── Screenshot & Capture ──────────────────────────────── */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-300">
                    Export & Screenshots
                  </label>
                  <div className="grid grid-cols-2 gap-1.5">
                    <button
                      type="button"
                      onClick={() => captureScreenshot('current')}
                      className="flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white border border-slate-700/60 transition-colors cursor-pointer"
                      title="Download high-resolution PNG of current active screen"
                    >
                      <Camera size={13} />
                      <span>Save PNG</span>
                    </button>

                    <button
                      type="button"
                      onClick={copyScreenshotToClipboard}
                      className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-xs font-semibold border transition-colors cursor-pointer ${
                        copied
                          ? 'bg-emerald-900/80 text-emerald-200 border-emerald-600'
                          : 'bg-slate-800 hover:bg-slate-700 text-white border-slate-700/60'
                      }`}
                      title="Copy screenshot directly to clipboard"
                    >
                      {copied ? <Check size={13} className="text-emerald-400" /> : <Clipboard size={13} />}
                      <span>{copied ? 'Copied!' : 'Copy to Clipboard'}</span>
                    </button>
                  </div>

                  {/* Dual view: separate kiosk / admin capture */}
                  {viewMode === 'split' && (
                    <div className="grid grid-cols-2 gap-1.5 mt-0.5">
                      <button
                        type="button"
                        onClick={() => captureScreenshot('kiosk')}
                        className="flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg bg-emerald-950 hover:bg-emerald-900 text-[11px] font-semibold text-emerald-200 border border-emerald-800/80 transition-colors cursor-pointer"
                      >
                        <Smartphone size={11} />
                        <span>Kiosk Screen Only</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => captureScreenshot('admin')}
                        className="flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg bg-blue-950 hover:bg-blue-900 text-[11px] font-semibold text-blue-200 border border-blue-800/80 transition-colors cursor-pointer"
                      >
                        <Monitor size={11} />
                        <span>Staff Console Only</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* ── Page Label Toggle ─────────────────────────────────── */}
                <div className="flex items-center justify-between p-2 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                      <Tag size={12} className="text-brand-gold" />
                      Screen Label Badge
                    </span>
                    <span className="text-[10px] text-slate-300">
                      Display active page name banner on screen
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowPageLabel(!showPageLabel)}
                    className={`w-10 h-5 rounded-full flex items-center transition-colors p-0.5 cursor-pointer ${
                      showPageLabel ? 'bg-brand-green justify-end' : 'bg-slate-700 justify-start'
                    }`}
                  >
                    <span className="w-4 h-4 rounded-full bg-white shadow-sm transition-transform flex items-center justify-center">
                      {showPageLabel ? <Eye size={9} className="text-emerald-700" /> : <EyeOff size={9} className="text-slate-500" />}
                    </span>
                  </button>
                </div>
              </div>
            )}

            {/* ═══════════════════════════════════════════════════════════════
                TAB 2: SENSORS & SIMULATIONS
            ═══════════════════════════════════════════════════════════════ */}
            {activeTab === 'sensors' && (
              <div className="flex flex-col gap-3.5 animate-fade-in">
                {/* ── Status Feedback Banner (if simulated action triggered) ── */}
                {simulationNotice && (
                  <div className="p-2.5 rounded-xl bg-emerald-950/90 border border-emerald-700/80 text-emerald-200 text-xs font-bold flex items-center gap-2 animate-fade-in shadow-md">
                    <Check size={14} className="text-emerald-400 shrink-0" />
                    <span className="leading-tight">{simulationNotice}</span>
                  </div>
                )}

                {/* ── Section 1: Demo Patient Intake Autofills ──────────── */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-brand-gold flex items-center gap-1.5">
                    <Sparkles size={11} className="text-brand-gold" />
                    Patient Intake Autofills
                  </label>
                  <div className="flex flex-col gap-1.5">
                    <button
                      type="button"
                      onClick={handleAutofillSeniorPatient}
                      className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-left border border-slate-700/70 transition-colors group cursor-pointer"
                      title="Populate Step 1 with senior patient (Juan Dela Cruz, 70yo)"
                    >
                      <div className="w-8 h-8 rounded-lg bg-emerald-950/80 border border-emerald-700/60 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                        <UserCheck size={15} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-white">
                            Senior Citizen Intake
                          </span>
                          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-700">
                            Step 1
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-300 mt-0.5 leading-snug">
                          Juan Dela Cruz (70y) • PhilSys ID, senior demographics
                        </p>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={handleAutofillCompleteCase}
                      className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-left border border-slate-700/70 transition-colors group cursor-pointer"
                      title="Populate complete emergency case with vitals, pain level, and notes ready for review"
                    >
                      <div className="w-8 h-8 rounded-lg bg-red-950/80 border border-red-700/60 flex items-center justify-center text-red-400 shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                        <HeartPulse size={15} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-white">
                            Acute Emergency Case
                          </span>
                          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-red-950 text-red-300 border border-red-800/80">
                            Review
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-300 mt-0.5 leading-snug">
                          Severe chest pain (Level 8) • 114 bpm, 93% SpO2
                        </p>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={handleAutofillPediatricCase}
                      className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-left border border-slate-700/70 transition-colors group cursor-pointer"
                      title="Populate pediatric fever case ready for review"
                    >
                      <div className="w-8 h-8 rounded-lg bg-amber-950/80 border border-amber-700/60 flex items-center justify-center text-amber-400 shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                        <Thermometer size={15} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-white">
                            Pediatric Fever & Cough
                          </span>
                          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800/80">
                            Review
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-300 mt-0.5 leading-snug">
                          Maria Elena Santos (6y) • 38.8°C fever, cough, Level 4 pain
                        </p>
                      </div>
                    </button>
                  </div>
                </div>

                {/* ── Section 2: Clinical & ED Operations Simulations ─────── */}
                <div className="flex flex-col gap-1.5 p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-red-400 flex items-center gap-1.5">
                    <ShieldAlert size={11} className="text-red-400" />
                    ED Operations & Duress Simulations
                  </label>

                  <div className="flex flex-col gap-1.5">
                    {/* Trigger/Clear Emergency Duress Call */}
                    <button
                      type="button"
                      onClick={handleToggleEmergencyDuress}
                      className={`flex items-start gap-2.5 p-2.5 rounded-xl text-left border transition-all cursor-pointer ${
                        emergencyAlert.active
                          ? 'bg-red-950/90 border-red-600 ring-1 ring-red-500 hover:bg-red-900/90'
                          : 'bg-slate-800 hover:bg-slate-700 border-slate-700/70'
                      }`}
                      title={emergencyAlert.active ? 'Click to clear active emergency broadcast' : 'Simulate patient distress call from Kiosk 01'}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                        emergencyAlert.active
                          ? 'bg-red-600 text-white animate-pulse'
                          : 'bg-red-950/80 border border-red-700/60 text-red-400'
                      }`}>
                        <Bell size={15} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className={`text-xs font-bold ${emergencyAlert.active ? 'text-red-200' : 'text-white'}`}>
                            {emergencyAlert.active ? 'Clear Duress Alert (Active)' : 'Simulate Kiosk Emergency Call'}
                          </span>
                          <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded font-black ${
                            emergencyAlert.active
                              ? 'bg-red-600 text-white animate-pulse'
                              : 'bg-slate-950 text-slate-300 border border-slate-700'
                          }`}>
                            {emergencyAlert.active ? 'ACTIVE' : 'ADM-03'}
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-300 mt-0.5 leading-snug">
                          {emergencyAlert.active
                            ? 'Broadcasting from Kiosk 01. Click to resolve/clear alarm.'
                            : 'Dispatches urgent duress alert to Staff Emergency Console'}
                        </p>
                      </div>
                    </button>

                    {/* Simulate Real-Time Patient Check-In to Live Queue */}
                    <button
                      type="button"
                      onClick={handleSimulateNewIntake}
                      className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-left border border-slate-700/70 transition-colors cursor-pointer"
                      title="Inject a real-time intake registration directly into Live Triage Queue"
                    >
                      <div className="w-8 h-8 rounded-lg bg-blue-950/80 border border-blue-700/60 flex items-center justify-center text-blue-400 shrink-0 mt-0.5">
                        <UserPlus size={15} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-white">
                            Inject Patient into Live Queue
                          </span>
                          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-700">
                            ADM-01
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-300 mt-0.5 leading-snug">
                          Simulates real-time kiosk check-in appearing instantly in queue
                        </p>
                      </div>
                    </button>

                    {/* Simulate Kiosk Station Heartbeat Ping */}
                    <button
                      type="button"
                      onClick={handleSimulateKioskPing}
                      disabled={pingingKiosks}
                      className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-left border border-slate-700/70 transition-colors cursor-pointer disabled:opacity-50"
                      title="Send network heartbeat to Kiosk 01 & 02"
                    >
                      <div className="w-8 h-8 rounded-lg bg-emerald-950/80 border border-emerald-700/60 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                        <RefreshCw size={15} className={pingingKiosks ? 'animate-spin' : ''} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-white">
                            {pingingKiosks ? 'Pinging Kiosk Terminals...' : 'Simulate Kiosk Station Ping'}
                          </span>
                          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-700">
                            ADM-06
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-300 mt-0.5 leading-snug">
                          Updates station heartbeat timestamps to &quot;Just now&quot;
                        </p>
                      </div>
                    </button>
                  </div>
                </div>

                {/* ── Hardware Sensor Simulation Bay ────────────────────── */}
                <div className="flex flex-col gap-2.5 p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-blue-400 flex items-center gap-1.5">
                      <Radio size={11} className="text-blue-400" />
                      Hardware Sensor Simulation
                    </label>
                    {activeHardwareSensor?.status && activeHardwareSensor.status !== 'idle' && (
                      <button
                        type="button"
                        onClick={cancelHardwareSensor}
                        className="text-[10px] font-bold text-red-400 hover:text-red-300 underline cursor-pointer"
                        title="Cancel active sensor reading"
                      >
                        Cancel
                      </button>
                    )}
                  </div>

                  {/* Active Sensor Status Pill */}
                  {activeHardwareSensor?.status && activeHardwareSensor.status !== 'idle' && (
                    <div className={`p-2 rounded-lg text-[11px] font-semibold flex items-center gap-2 ${
                      activeHardwareSensor.status === 'error' ? 'bg-red-950/80 text-red-300 border border-red-800/80' :
                      activeHardwareSensor.status === 'success' ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800/80' :
                      'bg-blue-950/80 text-blue-300 border border-blue-800/80 animate-pulse'
                    }`}>
                      <div className={`w-2 h-2 rounded-full ${
                        activeHardwareSensor.status === 'error' ? 'bg-red-400' :
                        activeHardwareSensor.status === 'success' ? 'bg-emerald-400' : 'bg-blue-400 animate-ping'
                      }`} />
                      <span className="truncate">{activeHardwareSensor.message}</span>
                    </div>
                  )}

                  {/* 1. Identification Scanners */}
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-slate-300 px-0.5">
                      Patient Identification (QR & NFC)
                    </span>
                    <div className="grid grid-cols-2 gap-1.5">
                      <button
                        type="button"
                        onClick={() => {
                          triggerHardwareSensor('qr', {
                            payload: {
                              fullName: 'Maria Elena C. Lopez',
                              dob: '1978-08-14',
                              gender: 'Female',
                              contact: '0917-882-9014',
                              identification: 'PhilHealth QR'
                            }
                          });
                        }}
                        className="flex items-center gap-1.5 px-2.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-white border border-slate-700/60 transition-colors cursor-pointer"
                        title="Simulate presenting QR code to optical scanner bay"
                      >
                        <QrCode size={13} className="text-blue-400 shrink-0" />
                        <span className="truncate">Scan QR Code</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          triggerHardwareSensor('nfc', {
                            payload: {
                              fullName: 'Juan Dela Cruz y Santos',
                              dob: '1956-04-12',
                              gender: 'Male',
                              contact: '0917-555-1234',
                              identification: 'PhilSys National ID NFC'
                            }
                          });
                        }}
                        className="flex items-center gap-1.5 px-2.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-white border border-slate-700/60 transition-colors cursor-pointer"
                        title="Simulate tapping contactless PhilSys smart card on NFC wave pad"
                      >
                        <Wifi size={13} className="text-emerald-400 rotate-90 shrink-0" />
                        <span className="truncate">Tap NFC Card</span>
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        triggerHardwareSensor('qr', {
                          isError: true,
                          errorMessage: 'Scanner Bay: Barcode obscured or unreadable. Please wipe code and hold steady.'
                        });
                      }}
                      className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-red-950/50 hover:bg-red-900/60 text-[11px] font-semibold text-red-200 border border-red-900/80 transition-colors cursor-pointer"
                      title="Simulate unreadable barcode (Demonstrates Error Recovery flow)"
                    >
                      <span className="flex items-center gap-1.5">
                        <AlertCircle size={12} className="text-red-400" />
                        Simulate Code Read Failure
                      </span>
                      <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-red-900/80 text-red-200 font-mono">Error Demo</span>
                    </button>
                  </div>

                  {/* 2. Medical Vitals Sensors */}
                  <div className="flex flex-col gap-1.5 pt-1 border-t border-slate-800">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-slate-300 px-0.5">
                      Vitals & Temperature Sensors
                    </span>
                    <div className="grid grid-cols-2 gap-1.5">
                      <button
                        type="button"
                        onClick={() => {
                          triggerHardwareSensor('ppg', {
                            payload: {
                              spo2: 98,
                              pulseRate: 74,
                              perfusionIndex: '4.2%',
                              temperature: '36.8°C'
                            }
                          });
                          if (kioskStep !== 'pain-duration') {
                            setViewMode('kiosk');
                            setKioskStep('pain-duration');
                          }
                        }}
                        className="flex items-center gap-1.5 px-2.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-white border border-slate-700/60 transition-colors cursor-pointer"
                        title="Simulate normal vitals reading (98% SpO2, 74 bpm)"
                      >
                        <Activity size={13} className="text-emerald-400 shrink-0" />
                        <span className="truncate">Normal Vitals (98%/74)</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          triggerHardwareSensor('ppg', {
                            payload: {
                              spo2: 91,
                              pulseRate: 122,
                              perfusionIndex: '2.1%',
                              temperature: '38.5°C'
                            }
                          });
                          if (kioskStep !== 'pain-duration') {
                            setViewMode('kiosk');
                            setKioskStep('pain-duration');
                          }
                        }}
                        className="flex items-center gap-1.5 px-2.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-white border border-slate-700/60 transition-colors cursor-pointer"
                        title="Simulate acute vitals reading (91% SpO2, 122 bpm)"
                      >
                        <Activity size={13} className="text-red-400 shrink-0" />
                        <span className="truncate">Critical Vitals (91%/122)</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-1.5">
                      <button
                        type="button"
                        onClick={() => {
                          triggerHardwareSensor('thermal', {
                            payload: { temperature: '36.6°C' }
                          });
                        }}
                        className="flex items-center gap-1.5 px-2.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-white border border-slate-700/60 transition-colors cursor-pointer"
                        title="Simulate infrared core forehead scan (36.6°C Normal)"
                      >
                        <Thermometer size={13} className="text-cyan-400 shrink-0" />
                        <span className="truncate">Normal Temp (36.6°C)</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          triggerHardwareSensor('thermal', {
                            payload: { temperature: '38.9°C' }
                          });
                        }}
                        className="flex items-center gap-1.5 px-2.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-white border border-slate-700/60 transition-colors cursor-pointer"
                        title="Simulate infrared core forehead scan (38.9°C High Fever)"
                      >
                        <Thermometer size={13} className="text-amber-400 shrink-0" />
                        <span className="truncate">Fever Temp (38.9°C)</span>
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        triggerHardwareSensor('ppg', {
                          isError: true,
                          errorMessage: 'Vital Signs Bay: Motion artifact / loose finger contact. Please remain steady.'
                        });
                        if (kioskStep !== 'pain-duration') {
                          setViewMode('kiosk');
                          setKioskStep('pain-duration');
                        }
                      }}
                      className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-amber-950/50 hover:bg-amber-900/60 text-[11px] font-semibold text-amber-200 border border-amber-900/80 transition-colors cursor-pointer"
                      title="Simulate finger motion artifact error (Demonstrates Error Recovery flow)"
                    >
                      <span className="flex items-center gap-1.5">
                        <AlertCircle size={12} className="text-amber-400" />
                        Simulate Motion Artifact
                      </span>
                      <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-amber-900/80 text-amber-200 font-mono">Fault Demo</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ═══════════════════════════════════════════════════════════════
                TAB 3: SCREEN DIRECT NAVIGATOR
            ═══════════════════════════════════════════════════════════════ */}
            {activeTab === 'screens' && (
              <div className="flex flex-col gap-3.5 animate-fade-in">
                {/* ── Kiosk Screens Flow ─────────────────────────────────── */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                      <Smartphone size={11} />
                      Kiosk Flow (8 Steps)
                    </label>
                    <span className="text-[10px] text-slate-300 font-mono">
                      Step {KIOSK_SCREENS.findIndex(s => s.key === kioskStep) + 1} of 8
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-1.5">
                    {KIOSK_SCREENS.map((screen, idx) => {
                      const isActive = viewMode === 'kiosk' && kioskStep === screen.key;
                      return (
                        <button
                          key={screen.key}
                          type="button"
                          onClick={() => {
                            setViewMode('kiosk');
                            setKioskStep(screen.key);
                          }}
                          className={`text-left px-2.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center justify-between cursor-pointer ${
                            isActive
                              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/40 ring-1 ring-emerald-400'
                              : 'bg-slate-800 text-slate-200 hover:text-white hover:bg-slate-700 border border-slate-700/60'
                          }`}
                        >
                          <span className="truncate">
                            {idx + 1}. {screen.label}
                          </span>
                          {isActive && <Check size={12} className="text-white shrink-0 ml-1" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* ── Staff Workstation Screens ──────────────────────────── */}
                <div className="flex flex-col gap-1.5 pt-1 border-t border-slate-800">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-blue-400 flex items-center gap-1.5">
                      <Monitor size={11} />
                      Staff Workstation (6 Views)
                    </label>
                    <span className="text-[10px] text-slate-300 font-mono">
                      Clinical Console
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-1.5">
                    {ADMIN_SCREENS.map((screen) => {
                      const isActive = viewMode === 'admin' && activeAdminTab === screen.key;
                      return (
                        <button
                          key={screen.key}
                          type="button"
                          onClick={() => {
                            setViewMode('admin');
                            setActiveAdminTab(screen.key);
                          }}
                          className={`text-left px-2.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center justify-between cursor-pointer ${
                            isActive
                              ? 'bg-blue-600 text-white shadow-md shadow-blue-900/40 ring-1 ring-blue-400'
                              : 'bg-slate-800 text-slate-200 hover:text-white hover:bg-slate-700 border border-slate-700/60'
                          }`}
                        >
                          <span className="truncate">{screen.label}</span>
                          {isActive && <Check size={12} className="text-white shrink-0 ml-1" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* ── Footer ──────────────────────────────────────────────── */}
            <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center gap-1">
                <GripHorizontal size={12} className="text-slate-500" />
                Drag handle to reposition
              </span>
              <button
                type="button"
                onClick={resetDemoData}
                className="text-slate-300 hover:text-amber-400 transition-colors flex items-center gap-1 cursor-pointer"
                title="Reset intake forms and sensor mocks"
              >
                <RotateCcw size={10} />
                <span>Reset State</span>
              </button>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
