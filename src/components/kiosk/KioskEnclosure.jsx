import React from 'react';
import { Wifi, QrCode, Activity } from 'lucide-react';

export function KioskEnclosure({ children, scale = 1.0 }) {
  // Canonical Totem Dimensions (1080px screen width)
  // Totem Body Width: 1140px (30px bezel on sides)
  // Screen: 1080px × 1920px
  // Top Crown Bezel: 64px
  // Lower Chin & Peripherals: 240px
  // Pedestal Base: 24px
  // Total Totem Height: 64 + 1920 + 240 + 24 = 2248px

  const totemWidth = 1140;
  const totemHeight = 2248;

  return (
    <div
      style={{
        width: `${totemWidth * scale}px`,
        height: `${totemHeight * scale}px`,
        position: 'relative'
      }}
      className="select-none transition-all duration-200"
    >
      {/* Scaled Physical Kiosk Chassis */}
      <div
        style={{
          width: `${totemWidth}px`,
          height: `${totemHeight}px`,
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          position: 'absolute',
          top: 0,
          left: 0
        }}
        className="flex flex-col items-center"
      >
        {/* Main Kiosk Body Enclosure */}
        <div
          className="w-full flex flex-col items-center bg-[#E6ECE9] border-[2.5px] border-[#CCD6D0] rounded-t-[48px] shadow-2xl relative"
          style={{ height: `${64 + 1920 + 240}px` }}
        >
          {/* Top Enclosure Crown Bezel (64px) */}
          <div className="w-full h-[64px] flex items-center justify-center relative shrink-0">
            {/* Ambient Optical Camera & Sensor Cluster */}
            <div className="flex items-center gap-2.5 bg-[#D7DFDC] px-3.5 py-1.5 rounded-full border border-[#BFCAC5] shadow-inner">
              <div className="w-3.5 h-3.5 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center">
                <div className="w-1 h-1 rounded-full bg-blue-400" />
              </div>
              {/* Speaker / Mic Slit */}
              <div className="w-8 h-1 rounded-full bg-slate-500/50" />
              <div className="w-2 h-2 rounded-full bg-slate-800" />
            </div>
          </div>

          {/* Touchscreen Glass Housing (1080 × 1920 Native Screen) */}
          <div className="w-[1080px] h-[1920px] rounded-[22px] overflow-hidden shadow-inner border-[3.5px] border-slate-800/85 bg-canvas relative shrink-0">
            {children}
          </div>

          {/* Lower Hardware Peripheral Chin (240px) */}
          <div className="w-[1080px] h-[240px] flex flex-col justify-between py-5 px-10 shrink-0">
            {/* Peripheral Sensors Row: RFID/NFC & Optical Barcode Scanner */}
            <div className="flex items-center justify-around w-full">
              {/* Contactless RFID / NFC Wave Zone */}
              <div className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-[#D7DFDC] border border-[#BAC7C1] shadow-sm w-40">
                <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center text-brand-green shadow-sm border border-slate-200">
                  <Wifi size={22} className="rotate-90" strokeWidth={2.5} />
                </div>
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-700">
                  NFC / RFID Tap
                </span>
              </div>

              {/* Speaker Perforation Matrix */}
              <div className="flex flex-col items-center justify-center gap-1.5 opacity-50">
                <div className="flex gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                </div>
                <div className="flex gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                </div>
                <div className="flex gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                </div>
              </div>

              {/* Optical Barcode & QR Scanner Window */}
              <div className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-[#D7DFDC] border border-[#BAC7C1] shadow-sm w-40">
                <div className="w-11 h-11 rounded-xl bg-slate-900 flex items-center justify-center text-brand-gold shadow-inner border border-slate-700 relative overflow-hidden">
                  <QrCode size={22} strokeWidth={2.2} />
                  <div className="absolute inset-x-0 top-1/2 h-0.5 bg-red-500/80 shadow-[0_0_4px_rgba(239,68,68,1)]" />
                </div>
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-700">
                  Barcode / QR Scan
                </span>
              </div>
            </div>

            {/* Vital Signs Bay Panel Door */}
            <div className="w-full h-12 rounded-xl bg-[#D9E1DE] border border-[#BDC9C3] flex items-center justify-center gap-2 text-slate-700 shadow-inner">
              <Activity size={16} className="text-brand-green" strokeWidth={2.2} />
              <span className="text-xs font-bold uppercase tracking-wider">
                Vital Signs Sensor Bay
              </span>
            </div>
          </div>
        </div>

        {/* Weighted Floor Stand Pedestal Base */}
        <div className="w-[1180px] h-[24px] bg-[#1E293B] rounded-b-[14px] shadow-xl border-t border-slate-600 shrink-0 relative flex items-center justify-center">
          <div className="w-20 h-1 rounded-full bg-slate-700/70" />
        </div>

        {/* Soft Ambient Floor Contact Shadow */}
        <div className="w-[1220px] h-5 bg-black/20 blur-md rounded-full -mt-1 -z-10" />
      </div>
    </div>
  );
}
