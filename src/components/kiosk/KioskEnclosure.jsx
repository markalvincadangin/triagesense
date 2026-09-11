import React from 'react';
import { Wifi, Activity } from 'lucide-react';
import wvsumcLogo from '../../assets/wvsumc-logo.png';

export const TOTEM_WIDTH = 1180;
export const TOTEM_HEIGHT = 2400;

export function KioskEnclosure({ children, scale = 1.0 }) {
  return (
    <div
      style={{
        width: `${TOTEM_WIDTH * scale}px`,
        height: `${TOTEM_HEIGHT * scale}px`,
        position: 'relative'
      }}
      className="select-none transition-all duration-200"
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
        {/* Top Camera Module Head (As seen in CAD technical drawing & 3D render) */}
        <div className="w-[380px] h-[52px] bg-[#E8EEEC] rounded-t-2xl border-t-[3px] border-x-[3px] border-[#CBD6D1] flex items-center justify-center shadow-md relative z-10 shrink-0">
          {/* Dark Camera Glass Capsule */}
          <div className="w-[170px] h-[28px] bg-slate-950 rounded-full border border-slate-700 flex items-center justify-around px-4 shadow-inner">
            {/* Left 3D Depth Lens */}
            <div className="w-3.5 h-3.5 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500/70" />
            </div>
            {/* Center RGB Camera Lens */}
            <div className="w-4 h-4 rounded-full bg-slate-900 border border-slate-600 flex items-center justify-center ring-1 ring-emerald-500/30">
              <div className="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_4px_rgba(96,165,250,0.8)]" />
            </div>
            {/* Right Ambient IR / Liveness Emitter */}
            <div className="w-3 h-3 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center">
              <div className="w-1 h-1 rounded-full bg-red-600/70" />
            </div>
          </div>
          {/* Subtle Side Accent Lines on Camera Module */}
          <div className="absolute right-3 inset-y-2 w-1.5 bg-[#006B3F] rounded-full opacity-80" />
          <div className="absolute left-3 inset-y-2 w-1.5 bg-[#006B3F] rounded-full opacity-80" />
        </div>

        {/* Main Kiosk Body Enclosure (Powder-coated clinical steel with WVSUMC Emerald side accent trim) */}
        <div
          className="w-[1160px] flex flex-col items-center bg-[#F4F7F5] border-[3px] border-[#CBD6D1] rounded-t-[38px] shadow-2xl relative overflow-hidden shrink-0"
          style={{ height: '2312px' }}
        >
          {/* Vertical Lateral Accent Stripes (WVSUMC Emerald, replacing unfinalized blue in 3D CAD render) */}
          <div className="absolute left-0 top-0 bottom-0 w-3 bg-[#006B3F] border-r border-[#005230] shadow-sm z-20" />
          <div className="absolute right-0 top-0 bottom-0 w-3 bg-[#006B3F] border-l border-[#005230] shadow-sm z-20" />

          {/* Forehead Section: WVSUMC Official Circular Seal Emblem */}
          <div className="w-full h-[46px] flex items-center justify-center relative shrink-0">
            <div className="w-9 h-9 rounded-full bg-white border-2 border-[#006B3F] shadow-sm p-0.5 flex items-center justify-center">
              <img
                src={wvsumcLogo}
                alt="WVSU Medical Center Official Seal"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Touchscreen Glass Housing (1080 × 1920 Native Portrait Screen) */}
          <div className="w-[1080px] h-[1920px] rounded-[16px] overflow-hidden shadow-inner border-[3.5px] border-slate-800/85 bg-canvas relative shrink-0">
            {children}
          </div>

          {/* Sub-Screen Peripheral Control & Hardware Section (346px) */}
          <div className="w-[1080px] h-[346px] flex flex-col justify-between py-4 px-10 shrink-0 relative">

            {/* Top Peripheral Row: NFC / RFID (Left), Ticket (Center) & VITAL SIGNS SENSOR BAY (Right) */}
            <div className="flex items-start justify-between w-full">

              {/* Left Column: NFC/RFID Reader & Speaker/Mic Matrix */}
              <div className="flex flex-col items-start gap-3">
                {/* Contactless RFID / NFC Wave Zone (Matching 3D render square pad) */}
                <div
                  className="w-44 h-24 rounded-xl bg-[#E4ECE8] border-2 border-[#C5D3CD] shadow-sm flex items-center justify-center gap-3 px-3 py-2 relative group"
                  title="Contactless NFC / RFID Tap Reader (13.56 MHz)"
                >
                  <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-[#006B3F] shadow-md border border-slate-200 shrink-0">
                    <Wifi size={24} className="rotate-90" strokeWidth={2.5} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[11px] font-black uppercase tracking-wider text-slate-700">
                      NFC / RFID
                    </span>
                    <span className="text-[8px] font-mono text-slate-500">
                      TAP CARD HERE
                    </span>
                  </div>
                  {/* Corner Accent Markers */}
                  <div className="absolute top-1.5 left-1.5 w-1.5 h-1.5 border-t border-l border-[#006B3F]/60" />
                  <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 border-t border-r border-[#006B3F]/60" />
                  <div className="absolute bottom-1.5 left-1.5 w-1.5 h-1.5 border-b border-l border-[#006B3F]/60" />
                  <div className="absolute bottom-1.5 right-1.5 w-1.5 h-1.5 border-b border-r border-[#006B3F]/60" />
                </div>

                {/* Microphone & 5W Speaker Perforation Grid */}
                <div className="flex flex-col gap-1 pl-1">
                  <div className="flex gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-500/70" />
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-500/70" />
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-500/70" />
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-500/70" />
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-500/70" />
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-500/70" />
                  </div>
                  <div className="flex gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-500/70" />
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-500/70" />
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-500/70" />
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-500/70" />
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-500/70" />
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-500/70" />
                  </div>
                  <span className="text-[8px] font-mono font-bold text-slate-500 uppercase tracking-widest mt-0.5">
                    MIC / 5W AUDIO
                  </span>
                </div>
              </div>

              {/* Center Thermal Receipt Exit Slot */}
              <div className="flex flex-col items-center justify-center gap-2 pt-2">
                {/* Center Pinhole Indicator LED */}
                <div className="w-2 h-2 rounded-full bg-slate-800 border border-slate-600" />

                {/* High-Speed Thermal Receipt / Ticket Dispenser Slot */}
                <div className="w-56 h-14 rounded-xl bg-[#E2EAE6] border border-[#CBD6D1] flex flex-col items-center justify-center px-3 shadow-inner">
                  <div className="flex items-center gap-1.5 mb-1">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[9px] font-extrabold uppercase tracking-wider text-slate-700">
                      Thermal Queue Ticket
                    </span>
                  </div>
                  {/* Paper Exit Mouth with LED Guide Slit */}
                  <div className="w-40 h-2 bg-slate-950 rounded-full border border-slate-700 relative overflow-hidden flex items-center justify-center shadow-inner">
                    <div className="w-24 h-0.5 bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,1)]" />
                  </div>
                  <span className="text-[7px] font-mono text-slate-500 font-bold uppercase mt-0.5">
                    TAKE TICKET HERE
                  </span>
                </div>
              </div>

              {/* Right Column: VITAL SIGNS SENSOR BAY (Replacing old optical barcode scanner) */}
              {/* Exactly matching 3D render detail circle labeled: "Sensor Bay (Optional)" */}
              <div className="flex flex-col items-center">
                <div
                  className="w-48 h-36 rounded-2xl bg-[#E2EAE6] border-2 border-[#C2D2CB] shadow-md flex flex-col items-center justify-between p-2.5 relative group"
                  title="Integrated Vital Signs Sensor Bay (SpO2 & Pulse Rate Optical Chamber)"
                >
                  {/* Header Title with Live Pulsing Halo Indicator */}
                  <div className="flex items-center justify-between w-full px-1">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.9)] animate-pulse" />
                      <span className="text-[10px] font-black tracking-tight text-slate-800 uppercase">
                        Vitals Sensor
                      </span>
                    </div>
                    <span className="text-[8px] font-mono font-bold text-[#006B3F] bg-emerald-100/80 px-1 py-0.5 rounded border border-emerald-300">
                      SpO₂ • PR
                    </span>
                  </div>

                  {/* Deep Recessed Finger Insertion Chamber (Matching 3D CAD Beveled Window) */}
                  <div className="w-32 h-20 rounded-xl bg-slate-950 border-2 border-slate-700 shadow-inner flex flex-col items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/60 pointer-events-none" />

                    {/* Status Halo LED Ring */}
                    <div className="w-14 h-14 rounded-full border-2 border-emerald-400/70 shadow-[0_0_10px_rgba(16,185,129,0.6)] flex items-center justify-center relative">
                      <div className="w-4 h-4 rounded-full bg-red-600/90 blur-[1px] animate-ping opacity-80" />
                      <div className="w-2 h-2 rounded-full bg-red-600 shadow-[0_0_6px_rgba(239,68,68,1)] absolute" />
                      <div className="absolute inset-x-2 bottom-1 h-1.5 border-b-2 border-emerald-400/80 rounded-b-sm" />
                    </div>

                    <div className="absolute bottom-1 right-2 text-emerald-400/60">
                      <Activity size={10} />
                    </div>
                  </div>

                  {/* Silkscreen Instructions */}
                  <div className="text-center w-full">
                    <span className="text-[9px] font-black text-slate-700 uppercase tracking-tight block">
                      INSERT FINGER
                    </span>
                    <span className="text-[7px] text-slate-500 font-mono tracking-tighter block">
                      AUTOMATIC VITALS SENSOR BAY
                    </span>
                  </div>
                </div>
              </div>

            </div>

            {/* Lower Body Cabinet Door (Matching the Sketch and 3D CAD Render) */}
            <div className="w-full h-24 rounded-xl bg-[#E8EFEA] border-2 border-[#CBD8D2] shadow-sm flex items-center justify-center relative px-6">
              {/* Corner Bolt Accents */}
              <div className="absolute top-2 left-2 w-1.5 h-1.5 rounded-full bg-[#B8C8C1] border border-slate-400/60" />
              <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#B8C8C1] border border-slate-400/60" />
              <div className="absolute bottom-2 left-2 w-1.5 h-1.5 rounded-full bg-[#B8C8C1] border border-slate-400/60" />
              <div className="absolute bottom-2 right-2 w-1.5 h-1.5 rounded-full bg-[#B8C8C1] border border-slate-400/60" />

              <div className="flex items-center gap-3 text-slate-700">
                <div className="flex items-center text-[#006B3F]">
                  <Activity size={28} strokeWidth={2.2} className="animate-pulse" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[13px] font-black uppercase tracking-wider text-slate-800">
                    VITAL SIGNS SENSORS
                  </span>
                  <span className="text-[9px] font-mono text-slate-500 tracking-wide">
                    AUTOMATIC HEART RATE & PULSE SENSING PAD
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Dual-Tier Weighted Freestanding Pedestal Base ($600mm × $380mm CAD footprint) */}
        <div className="w-[1180px] h-[36px] bg-[#1E293B] rounded-b-[18px] shadow-2xl border-t-2 border-[#006B3F] shrink-0 relative flex items-center justify-between px-8">
          <div className="w-14 h-2 rounded-full bg-slate-700/80" />
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#006B3F] border border-emerald-400/40" />
            <span className="text-[9px] font-mono font-bold tracking-widest text-slate-400 uppercase">
              WVSU MEDICAL CENTER • EMERGENCY INTAKE KIOSK
            </span>
          </div>
          <div className="w-14 h-2 rounded-full bg-slate-700/80" />
        </div>

        {/* Floor Contact Ambient Shadow */}
        <div className="w-[1220px] h-5 bg-black/25 blur-md rounded-full -mt-2 -z-10" />
      </div>
    </div>
  );
}
