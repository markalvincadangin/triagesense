import React from 'react';
import { useTriage } from '../../context/TriageContext';
import { Wifi, Activity, QrCode, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';

/**
 * TRIAGESENSE KIOSK — MECHANICAL PROTOTYPE VISUALIZATION
 * - Sourced from the Official 3D CAD Render and Mechanical Specification.
 * - Screen-to-Chassis Proportion: 80.6% front face coverage (1080 px display inside 1340 px chassis).
 * - Side Chassis Margins: 130 px on each side (sleek, modern, eliminates oversized empty padding).
 * - Display: 23.8" FHD Portrait Touchscreen (1080 × 1920 px, 16:9 aspect ratio).
 * - Finish: Medical Matte Hospital White (#FFFFFF / #F8FAFC) with Electric Cobalt Blue (#0060DF) accent pinstripes.
 */
export const TOTEM_WIDTH = 1340;
export const TOTEM_HEIGHT = 3600;

// Screen-only framing: just the 23.8" FHD display + thin bezel
export const SCREEN_BEZEL = 20; // px — thin device bezel on all sides
export const FOCUS_WIDTH = 1080 + SCREEN_BEZEL * 2;  // 1120
export const FOCUS_HEIGHT = 1920 + SCREEN_BEZEL * 2; // 1960

export function KioskEnclosure({ children, scale = 1.0, framing = 'focus' }) {
  const { activeHardwareSensor, lastSubmittedId, kioskFraming } = useTriage();
  const currentFraming = framing || kioskFraming || 'focus';

  const isNfcActive = activeHardwareSensor?.type === 'nfc';
  const isQrActive = activeHardwareSensor?.type === 'qr';
  const isPpgActive = activeHardwareSensor?.type === 'ppg';
  const isThermalActive = activeHardwareSensor?.type === 'thermal';

  // ── Screen Focus: just the display panel + thin device bezel ─────────────
  if (currentFraming === 'focus') {
    return (
      <div
        style={{
          width: `${FOCUS_WIDTH * scale}px`,
          height: `${FOCUS_HEIGHT * scale}px`,
          position: 'relative',
        }}
        className="select-none"
      >
        {/* Scaled screen-only frame */}
        <div
          style={{
            width: `${FOCUS_WIDTH}px`,
            height: `${FOCUS_HEIGHT}px`,
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
            position: 'absolute',
            top: 0,
            left: 0,
          }}
          className="bg-slate-950 rounded-[36px] shadow-2xl overflow-hidden border-[3px] border-slate-800"
        >
          {/* 23.8" FHD Touchscreen — fills the inner frame */}
          <div
            className="overflow-hidden bg-canvas"
            style={{
              width: '1080px',
              height: '1920px',
              margin: `${SCREEN_BEZEL}px`,
              borderRadius: '20px',
            }}
          >
            {children}
          </div>
        </div>
      </div>
    );
  }

  // ── Full Totem (CAD): complete chassis enclosure ───────────────────
  const effectiveHeight = TOTEM_HEIGHT;

  return (
    <div
      style={{
        width: `${TOTEM_WIDTH * scale}px`,
        height: `${effectiveHeight * scale}px`,
        position: 'relative'
      }}
      className="select-none transition-all duration-300 relative overflow-hidden"
    >
      {/* Scaled Physical Kiosk Chassis */}
      <div
        style={{
          width: `${TOTEM_WIDTH}px`,
          height: `${TOTEM_HEIGHT}px`,
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          position: 'absolute',
          top: 0,
          left: 0
        }}
        className="flex flex-col items-center"
      >
        {/* ═══════════════════════════════════════════════════════════════════
            1. TOP CAMERA MODULE (3D Render Specification)
               Width = 620 px, Height = 160 px
        ═══════════════════════════════════════════════════════════════════ */}
        <div className="w-[620px] h-[160px] bg-white rounded-t-[40px] border-t-[4px] border-x-[4px] border-slate-200/90 flex items-center justify-center shadow-lg relative z-10 shrink-0">
          {/* Lateral Electric Cobalt Blue Accent Stripes */}
          <div className="absolute left-5 inset-y-4 w-3.5 bg-[#0060DF] rounded-full shadow-[0_0_8px_rgba(0,96,223,0.6)]" />
          <div className="absolute right-5 inset-y-4 w-3.5 bg-[#0060DF] rounded-full shadow-[0_0_8px_rgba(0,96,223,0.6)]" />

          {/* Dark Camera Glass Capsule */}
          <div className="w-[320px] h-[76px] bg-slate-950 rounded-full border-2 border-slate-800 flex items-center justify-around px-6 shadow-inner relative overflow-hidden">
            {/* Left: 3D Depth / IR Lens */}
            <div className="w-10 h-10 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center shadow-sm">
              <div className="w-4 h-4 rounded-full bg-blue-500/80 shadow-[0_0_6px_rgba(59,130,246,0.8)]" />
            </div>

            {/* Center: RGB Presence Camera with Anti-Reflective Optical Ring */}
            <div className="w-13 h-13 rounded-full bg-slate-900 border-2 border-slate-600 flex items-center justify-center ring-2 ring-blue-500/40 shadow-md">
              <div className="w-6 h-6 rounded-full bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,1)]" />
            </div>

            {/* Right: Infrared Thermal Sensor & Status Emitter */}
            <div className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all shadow-sm ${
              isThermalActive
                ? 'border-amber-400 bg-amber-500/40 shadow-[0_0_16px_rgba(251,191,36,1)] animate-ping'
                : 'border-slate-700 bg-slate-900'
            }`}>
              <div className={`w-4 h-4 rounded-full ${isThermalActive ? 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,1)]' : 'bg-red-600/70'}`} />
            </div>

            {/* Thermal Sensor Active Sweep Beam */}
            {isThermalActive && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-400/35 to-transparent animate-pulse" />
            )}
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════════
            2. MAIN CHASSIS BODY (Medical Matte Powder-Coated Hospital White)
               Width = 1340 px, Height = 3280 px
        ═══════════════════════════════════════════════════════════════════ */}
        <div
          className="w-[1340px] flex flex-col items-center bg-white border-[5px] border-slate-200/90 rounded-t-[48px] shadow-2xl relative overflow-hidden shrink-0"
          style={{ height: '3280px' }}
        >
          {/* Continuous Electric Cobalt Blue Lateral Accent Pinstripes (Matching 3D Render) */}
          <div className="absolute left-0 top-0 bottom-0 w-4 bg-[#0060DF] border-r border-blue-700 shadow-sm z-20" />
          <div className="absolute right-0 top-0 bottom-0 w-4 bg-[#0060DF] border-l border-blue-700 shadow-sm z-20" />

          {/* Forehead Section: Clean Powder-Coated Metal Upper Bezel (Matching 3D CAD Render) */}
          <div className="w-full h-[70px] shrink-0" />

          {/* ═════════════════════════════════════════════════════════════════
              3. 23.8" FHD TOUCHSCREEN DISPLAY (1080 × 1920 px, 16:9 Portrait)
                 - Display Width: 1080 px = 80.6% of 1340 px chassis width
                 - Left Chassis Margin: 130 px
                 - Right Chassis Margin: 130 px
                 - Display Height: 1920 px
          ═════════════════════════════════════════════════════════════════ */}
          <div className="w-[1080px] h-[1920px] rounded-[24px] overflow-hidden shadow-2xl border-[6px] border-slate-950 bg-canvas relative shrink-0">
            {children}
          </div>

          {/* ═════════════════════════════════════════════════════════════════
              4. SUB-SCREEN INTERFACE (Matching 3D Render Layout)
                 - Left: NFC Reader
                 - Center: Microphone pinhole & Ticket dispenser
                 - Right: Recessed Optical Scanner Bay
                 - Lower Left: 5W Speaker perforation matrix
          ═════════════════════════════════════════════════════════════════ */}
          <div className="w-[1080px] h-[360px] flex flex-col justify-between py-6 px-4 shrink-0 relative mt-4">
            
            {/* Upper Row: NFC Reader (Left), Mic (Center), Scanner Bay (Right) */}
            <div className="flex items-start justify-between w-full">
              
              {/* Left: Contactless NFC / RFID Reader Pad (((•))) */}
              <div
                className={`w-[240px] h-[140px] rounded-2xl border-2 shadow-md flex items-center justify-center gap-3.5 px-4 py-3 relative transition-all duration-300 ${
                  isNfcActive
                    ? 'bg-emerald-50 border-emerald-500 ring-4 ring-emerald-400/40 shadow-[0_0_24px_rgba(16,185,129,0.7)]'
                    : 'bg-[#F8FAFC] border-slate-300'
                }`}
                title="Contactless NFC / RFID Tap Reader (13.56 MHz ISO/IEC 14443)"
              >
                <div className={`w-16 h-16 rounded-xl flex items-center justify-center shadow-md border transition-all ${
                  isNfcActive
                    ? 'bg-emerald-500 text-white border-emerald-400 animate-pulse'
                    : 'bg-white text-[#0060DF] border-slate-200'
                }`}>
                  <Wifi size={32} className="rotate-90" strokeWidth={2.5} />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-base font-black uppercase tracking-wider text-slate-800">
                    NFC / RFID
                  </span>
                  <span className={`text-xs font-mono font-bold mt-0.5 ${isNfcActive ? 'text-emerald-700' : 'text-slate-500'}`}>
                    {isNfcActive ? 'READING...' : 'TAP CARD'}
                  </span>
                </div>

                {/* Corner Alignment Ticks */}
                <div className="absolute top-1.5 left-1.5 w-2.5 h-2.5 border-t-2 border-l-2 border-[#0060DF]/70" />
                <div className="absolute top-1.5 right-1.5 w-2.5 h-2.5 border-t-2 border-r-2 border-[#0060DF]/70" />
                <div className="absolute bottom-1.5 left-1.5 w-2.5 h-2.5 border-b-2 border-l-2 border-[#0060DF]/70" />
                <div className="absolute bottom-1.5 right-1.5 w-2.5 h-2.5 border-b-2 border-r-2 border-[#0060DF]/70" />
              </div>

              {/* Center: Microphone Pinhole */}
              <div className="flex flex-col items-center justify-center gap-2 pt-4">
                <div className="w-4 h-4 rounded-full bg-slate-900 border border-slate-600 shadow-sm" />
                <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">
                  MIC
                </span>
              </div>

              {/* Right: Recessed Optical QR / Barcode Scanner Bay (Matching 3D Render) */}
              <div
                className={`w-[240px] h-[140px] rounded-2xl border-2 shadow-md flex flex-col items-center justify-between p-3 relative transition-all duration-300 ${
                  isQrActive
                    ? 'bg-blue-50 border-blue-500 ring-4 ring-blue-400/40 shadow-[0_0_24px_rgba(0,96,223,0.7)]'
                    : 'bg-[#F8FAFC] border-slate-300'
                }`}
                title="Recessed Optical QR & Barcode Scanner Bay (Down-Angled Window)"
              >
                <div className="flex items-center justify-between w-full px-1">
                  <span className="text-xs font-black uppercase tracking-wider text-slate-800">
                    SCANNER BAY
                  </span>
                  <span className="text-[10px] font-mono font-bold text-[#0060DF] bg-blue-100 px-1.5 py-0.2 rounded border border-blue-300">
                    QR • BARCODE
                  </span>
                </div>

                {/* Deep Recessed Beveled Scanning Chamber */}
                <div className="w-[180px] h-[72px] rounded-xl bg-slate-950 border-2 border-slate-700 shadow-inner flex flex-col items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-transparent to-black/70 pointer-events-none" />

                  {/* Red Optical Targeting Aiming Beam */}
                  <div className={`w-[130px] h-0.5 transition-all ${
                    isQrActive
                      ? 'bg-red-500 shadow-[0_0_12px_rgba(239,68,68,1)] animate-ping'
                      : 'bg-red-500/75 shadow-[0_0_6px_rgba(239,68,68,0.8)]'
                  }`} />
                  <div className="w-2 h-2 rounded-full bg-red-500 absolute shadow-[0_0_8px_rgba(239,68,68,1)]" />

                  {/* Laser Scan Sweep Animation */}
                  {isQrActive && (
                    <div className="absolute inset-x-0 h-1.5 bg-red-400/90 shadow-[0_0_12px_rgba(239,68,68,1)] animate-pulse" />
                  )}
                </div>

                <span className="text-[10px] font-mono font-bold text-slate-600 uppercase tracking-tight">
                  {isQrActive ? 'SCANNING CODE...' : 'HOLD CODE UNDER BAY'}
                </span>
              </div>
            </div>

            {/* Lower Row: 5W Speaker (Left), Ticket Slot (Center), Mount Marks (Right) */}
            <div className="flex items-center justify-between w-full pt-4">
              {/* Left: 5W Speaker Perforation Matrix ($6 \times 4$ holes) */}
              <div className="flex flex-col gap-1.5 pl-2">
                <div className="flex gap-2.5">
                  {[...Array(6)].map((_, i) => (
                    <div key={`r1-${i}`} className="w-2.5 h-2.5 rounded-full bg-slate-700 shadow-inner" />
                  ))}
                </div>
                <div className="flex gap-2.5">
                  {[...Array(6)].map((_, i) => (
                    <div key={`r2-${i}`} className="w-2.5 h-2.5 rounded-full bg-slate-700 shadow-inner" />
                  ))}
                </div>
                <div className="flex gap-2.5">
                  {[...Array(6)].map((_, i) => (
                    <div key={`r3-${i}`} className="w-2.5 h-2.5 rounded-full bg-slate-700 shadow-inner" />
                  ))}
                </div>
                <span className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest mt-0.5">
                  5W SPEAKER
                </span>
              </div>

              {/* Center: High-Speed Thermal Queue Ticket Slot */}
              <div className="w-[360px] h-[90px] rounded-xl bg-[#F8FAFC] border border-slate-300 flex flex-col items-center justify-center px-4 shadow-inner relative">
                <div className="flex items-center gap-1.5 mb-1">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-black uppercase tracking-wider text-slate-800">
                    Thermal Queue Ticket
                  </span>
                </div>
                {/* Paper Exit Mouth */}
                <div className="w-[280px] h-4 bg-slate-950 rounded-full border border-slate-700 relative overflow-hidden flex items-center justify-center shadow-inner">
                  <div className="w-[200px] h-1 bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,1)]" />
                </div>
                <span className="text-[9px] font-mono text-slate-500 font-bold uppercase mt-0.5">
                  TAKE TICKET HERE
                </span>

                {/* Animated Emerging Ticket Slip */}
                {lastSubmittedId && (
                  <div className="absolute -bottom-10 w-[240px] h-14 bg-white border border-slate-400 rounded shadow-lg flex flex-col items-center justify-center text-xs font-mono font-black text-slate-900 animate-bounce">
                    <span className="text-[9px] text-slate-500">TICKET DISPENSED</span>
                    <span className="text-sm text-emerald-800 font-bold">{lastSubmittedId}</span>
                  </div>
                )}
              </div>

              {/* Right: Technical Registration Marks (From 3D Render) */}
              <div className="flex items-center gap-2 pr-4">
                <div className="w-5 h-0.5 bg-slate-400" />
                <div className="w-2 h-2 rounded-full bg-slate-400" />
                <div className="w-5 h-0.5 bg-slate-400" />
              </div>
            </div>

          </div>

          {/* ═════════════════════════════════════════════════════════════════
              5. MODULAR VITAL SIGNS SENSOR BAY (Matching 3D Render Door)
                 Width = 980 px, Height = 680 px
          ═════════════════════════════════════════════════════════════════ */}
          <div className="w-[980px] h-[680px] rounded-[36px] border-[4px] border-slate-300/80 bg-[#FAFAFC] mt-4 p-8 flex flex-col justify-between relative shadow-md shrink-0">
            {/* Corner Fastener Screws */}
            <div className="absolute top-4 left-4 w-3.5 h-3.5 rounded-full bg-slate-400 border border-slate-600 shadow-inner" />
            <div className="absolute top-4 right-4 w-3.5 h-3.5 rounded-full bg-slate-400 border border-slate-600 shadow-inner" />
            <div className="absolute bottom-4 left-4 w-3.5 h-3.5 rounded-full bg-slate-400 border border-slate-600 shadow-inner" />
            <div className="absolute bottom-4 right-4 w-3.5 h-3.5 rounded-full bg-slate-400 border border-slate-600 shadow-inner" />

            {/* Door Header */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm border transition-all ${
                  isPpgActive
                    ? 'bg-emerald-500 text-white border-emerald-400 animate-pulse'
                    : 'bg-white text-brand-green border-slate-300'
                }`}>
                  <Activity size={28} strokeWidth={2.5} className={isPpgActive ? 'animate-bounce' : ''} />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-lg font-black uppercase tracking-wider text-slate-800">
                    VITAL SIGNS SENSOR BAY
                  </span>
                  <span className="text-xs font-mono text-slate-500 tracking-wide">
                    MODULAR BIO-TELEMETRY • SpO₂ • PULSE RATE • TEMPERATURE
                  </span>
                </div>
              </div>

              {/* Live Status Indicator */}
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-2xs">
                <div className={`w-3 h-3 rounded-full ${isPpgActive ? 'bg-emerald-500 animate-ping' : 'bg-slate-400'}`} />
                <span className={`text-xs font-mono font-bold uppercase tracking-wider ${isPpgActive ? 'text-emerald-700' : 'text-slate-500'}`}>
                  {isPpgActive ? 'SENSING...' : 'SENSOR READY'}
                </span>
              </div>
            </div>

            {/* Center: Recessed Finger Insertion Chamber (Cradle) */}
            <div className={`w-full h-[380px] rounded-2xl border-2 flex flex-col items-center justify-center p-6 transition-all duration-300 relative ${
              isPpgActive
                ? 'bg-emerald-50/70 border-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.3)]'
                : 'bg-white border-slate-300'
            }`}>
              <div className={`w-[360px] h-[160px] rounded-2xl bg-slate-950 border-3 flex flex-col items-center justify-center relative overflow-hidden shadow-xl transition-all ${
                isPpgActive
                  ? 'border-emerald-400 ring-4 ring-emerald-400/30'
                  : 'border-slate-700'
              }`}>
                {/* Status Halo Ring */}
                <div className={`w-20 h-20 rounded-full border-3 flex items-center justify-center transition-all ${
                  isPpgActive
                    ? 'border-emerald-400 bg-emerald-500/25 animate-pulse shadow-[0_0_20px_rgba(52,211,153,1)]'
                    : 'border-cyan-500/60 bg-cyan-950/40 shadow-[0_0_10px_rgba(6,182,212,0.4)]'
                }`}>
                  <Activity size={36} className={isPpgActive ? 'text-emerald-400' : 'text-cyan-400'} strokeWidth={2.5} />
                </div>

                <span className="text-[10px] font-mono font-bold tracking-widest text-slate-400 uppercase mt-2">
                  {isPpgActive ? 'SAMPLING PULSE WAVE...' : 'INSERT INDEX FINGER'}
                </span>
              </div>

              {/* Bio-telemetry ECG Line */}
              <div className="w-[450px] h-10 mt-4 flex items-center justify-center text-brand-green/60">
                <svg className="w-full h-full" viewBox="0 0 450 40" preserveAspectRatio="none">
                  <path
                    d="M0 20 L80 20 L100 8 L115 32 L130 14 L145 26 L160 20 L280 20 L300 8 L315 32 L330 14 L345 26 L360 20 L450 20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  />
                </svg>
              </div>
            </div>

            {/* Door Footer */}
            <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 border-t border-slate-200 pt-3">
              <span>WVSU MEDICAL CENTER • SERVICE ACCESS</span>
              <span>CALIBRATED: ISO 80601-2-61</span>
            </div>
          </div>

          {/* Lower Chassis Expansion Fill */}
          <div className="w-full flex-1" />

          {/* ═════════════════════════════════════════════════════════════════
              6. STABILIZING PEDESTAL BASE (Matching 3D Render)
                 - Width = 1340 px, Height = 100 px
                 - Continuous Electric Cobalt Blue Accent Trim Ring
          ═════════════════════════════════════════════════════════════════ */}
          <div className="w-full h-[100px] bg-white border-t-[4px] border-slate-300 relative flex items-center justify-between px-10 shrink-0 mt-auto shadow-xl">
            {/* Continuous Electric Cobalt Blue Accent Trim Ring */}
            <div className="absolute inset-x-0 top-1.5 h-4 bg-[#0060DF] shadow-[0_0_12px_rgba(0,96,223,0.7)]" />

            {/* Left Leveling Mount */}
            <div className="flex items-center gap-3 mt-3">
              <div className="w-8 h-4 rounded-full bg-slate-800 shadow-inner" />
              <span className="text-xs font-mono text-slate-500 font-bold uppercase">LEVELING MOUNT</span>
            </div>

            {/* Center Hospital Identity */}
            <div className="flex items-center gap-3 mt-3">
              <div className="w-3 h-3 rounded-full bg-[#0060DF]" />
              <span className="text-sm font-mono font-black tracking-widest text-slate-700 uppercase">
                WVSU MEDICAL CENTER • TRIAGE KIOSK
              </span>
              <div className="w-3 h-3 rounded-full bg-[#0060DF]" />
            </div>

            {/* Right Leveling Mount */}
            <div className="flex items-center gap-3 mt-3">
              <span className="text-xs font-mono text-slate-500 font-bold uppercase">LEVELING MOUNT</span>
              <div className="w-8 h-4 rounded-full bg-slate-800 shadow-inner" />
            </div>
          </div>
        </div>

        {/* 4× Heavy-Duty Black Rubber Leveling Feet */}
        <div className="w-[1260px] flex justify-between px-12 -mt-1 z-0">
          <div className="w-16 h-5 bg-slate-950 rounded-b-lg shadow-md border-t border-slate-800" />
          <div className="w-16 h-5 bg-slate-950 rounded-b-lg shadow-md border-t border-slate-800" />
          <div className="w-16 h-5 bg-slate-950 rounded-b-lg shadow-md border-t border-slate-800" />
          <div className="w-16 h-5 bg-slate-950 rounded-b-lg shadow-md border-t border-slate-800" />
        </div>

        {/* Ambient Floor Ground Shadow */}
        <div className="w-[1400px] h-10 bg-black/25 blur-xl rounded-full -mt-3 -z-10" />
      </div>
    </div>
  );
}
