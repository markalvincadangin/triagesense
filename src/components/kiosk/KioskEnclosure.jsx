import React from 'react';
import { Wifi, Activity } from 'lucide-react';
import wvsumcLogo from '../../assets/wvsumc-logo.png';

export function KioskEnclosure({ children, scale = 1.0 }) {
  // Canonical Totem Dimensions (1080px screen width)
  // Totem Body Width: 1160px (40px bezel on sides)
  // Screen: 1080px × 1920px
  // Top Crown & Camera Housing: 110px
  // Lower Peripheral & Cabinet Section: 480px
  // Pedestal Base: 36px
  // Total Totem Height: 110 + 1920 + 480 + 36 = 2546px

  const totemWidth = 1160;
  const totemHeight = 2546;

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
        {/* Top Camera Module Head (As seen in CAD technical drawing & 3D render) */}
        <div className="w-[420px] h-[58px] bg-[#E8EEEC] rounded-t-2xl border-t-[3px] border-x-[3px] border-[#CBD6D1] flex items-center justify-center shadow-md relative z-10">
          {/* Dark Camera Glass Capsule */}
          <div className="w-[180px] h-[30px] bg-slate-950 rounded-full border border-slate-700 flex items-center justify-around px-4 shadow-inner">
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
          className="w-full flex flex-col items-center bg-[#F4F7F5] border-[3px] border-[#CBD6D1] rounded-t-[40px] shadow-2xl relative overflow-hidden"
          style={{ height: `${52 + 1920 + 480}px` }}
        >
          {/* Vertical Lateral Accent Stripes (WVSUMC Emerald, replacing unfinalized blue in 3D CAD render) */}
          <div className="absolute left-0 top-0 bottom-0 w-3 bg-[#006B3F] border-r border-[#005230] shadow-sm z-20" />
          <div className="absolute right-0 top-0 bottom-0 w-3 bg-[#006B3F] border-l border-[#005230] shadow-sm z-20" />

          {/* Forehead Section: WVSUMC Official Circular Seal Emblem */}
          <div className="w-full h-[52px] flex items-center justify-center relative shrink-0">
            <div className="w-10 h-10 rounded-full bg-white border-2 border-[#006B3F] shadow-sm p-0.5 flex items-center justify-center">
              <img
                src={wvsumcLogo}
                alt="WVSU Medical Center Official Seal"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Touchscreen Glass Housing (1080 × 1920 Native Portrait Screen) */}
          <div className="w-[1080px] h-[1920px] rounded-[18px] overflow-hidden shadow-inner border-[3.5px] border-slate-800/85 bg-canvas relative shrink-0">
            {children}
          </div>

          {/* Sub-Screen Peripheral Control & Hardware Section (480px) */}
          <div className="w-[1080px] h-[480px] flex flex-col justify-between py-6 px-12 shrink-0 relative">

            {/* Top Peripheral Row: NFC / RFID (Left) & VITAL SIGNS SENSOR BAY (Bottom Right) */}
            <div className="flex items-start justify-between w-full mt-2">

              {/* Left Column: NFC/RFID Reader & Speaker/Mic Matrix */}
              <div className="flex flex-col items-start gap-4">
                {/* Contactless RFID / NFC Wave Zone (Matching 3D render square pad) */}
                <div
                  className="w-48 h-32 rounded-2xl bg-[#E4ECE8] border-2 border-[#C5D3CD] shadow-sm flex flex-col items-center justify-center p-3 relative group"
                  title="Contactless NFC / RFID Tap Reader (13.56 MHz)"
                >
                  <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-[#006B3F] shadow-md border border-slate-200">
                    <Wifi size={28} className="rotate-90" strokeWidth={2.5} />
                  </div>
                  <span className="text-[12px] font-black uppercase tracking-wider text-slate-700 mt-2">
                    NFC / RFID Reader
                  </span>
                  <span className="text-[9px] font-mono text-slate-500">
                    TAP CARD HERE
                  </span>
                  {/* Subtle Corner Markers */}
                  <div className="absolute top-2 left-2 w-2 h-2 border-t-2 border-l-2 border-[#006B3F]/50" />
                  <div className="absolute top-2 right-2 w-2 h-2 border-t-2 border-r-2 border-[#006B3F]/50" />
                  <div className="absolute bottom-2 left-2 w-2 h-2 border-b-2 border-l-2 border-[#006B3F]/50" />
                  <div className="absolute bottom-2 right-2 w-2 h-2 border-b-2 border-r-2 border-[#006B3F]/50" />
                </div>

                {/* Microphone & 5W Speaker Perforation Grid (As seen in CAD drawing) */}
                <div className="flex flex-col gap-1.5 pl-2">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 rounded-full bg-slate-500/70" />
                    <div className="w-2 h-2 rounded-full bg-slate-500/70" />
                    <div className="w-2 h-2 rounded-full bg-slate-500/70" />
                    <div className="w-2 h-2 rounded-full bg-slate-500/70" />
                    <div className="w-2 h-2 rounded-full bg-slate-500/70" />
                    <div className="w-2 h-2 rounded-full bg-slate-500/70" />
                  </div>
                  <div className="flex gap-2">
                    <div className="w-2 h-2 rounded-full bg-slate-500/70" />
                    <div className="w-2 h-2 rounded-full bg-slate-500/70" />
                    <div className="w-2 h-2 rounded-full bg-slate-500/70" />
                    <div className="w-2 h-2 rounded-full bg-slate-500/70" />
                    <div className="w-2 h-2 rounded-full bg-slate-500/70" />
                    <div className="w-2 h-2 rounded-full bg-slate-500/70" />
                  </div>
                  <div className="flex gap-2">
                    <div className="w-2 h-2 rounded-full bg-slate-500/70" />
                    <div className="w-2 h-2 rounded-full bg-slate-500/70" />
                    <div className="w-2 h-2 rounded-full bg-slate-500/70" />
                    <div className="w-2 h-2 rounded-full bg-slate-500/70" />
                    <div className="w-2 h-2 rounded-full bg-slate-500/70" />
                    <div className="w-2 h-2 rounded-full bg-slate-500/70" />
                  </div>
                  <span className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest mt-0.5">
                    MIC / 5W AUDIO
                  </span>
                </div>
              </div>

              {/* Center Pinhole Sensor & Thermal Receipt Exit Slot */}
              <div className="flex flex-col items-center justify-center gap-3 pt-4">
                {/* Center Pinhole Indicator LED */}
                <div className="w-2 h-2 rounded-full bg-slate-800 border border-slate-600" />

                {/* High-Speed Thermal Receipt / Ticket Dispenser Slot */}
                <div className="w-64 h-16 rounded-xl bg-[#E2EAE6] border border-[#CBD6D1] flex flex-col items-center justify-center px-4 shadow-inner">
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-700">
                      Thermal Queue Ticket
                    </span>
                  </div>
                  {/* Paper Exit Mouth with LED Guide Slit */}
                  <div className="w-48 h-2 bg-slate-950 rounded-full border border-slate-700 relative overflow-hidden flex items-center justify-center shadow-inner">
                    <div className="w-28 h-0.5 bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,1)]" />
                  </div>
                  <span className="text-[8px] font-mono text-slate-500 font-bold uppercase mt-1">
                    TAKE TICKET HERE
                  </span>
                </div>
              </div>

              {/* Right Column: VITAL SIGNS SENSOR BAY (Replacing old optical barcode scanner) */}
              {/* Exactly matching 3D render detail circle labeled: "Sensor Bay (Optional)" */}
              <div className="flex flex-col items-center">
                <div
                  className="w-52 h-44 rounded-2xl bg-[#E2EAE6] border-2 border-[#C2D2CB] shadow-md flex flex-col items-center justify-between p-3.5 relative group"
                  title="Integrated Vital Signs Sensor Bay (SpO2 & Pulse Rate Optical Chamber)"
                >
                  {/* Header Title with Live Pulsing Halo Indicator */}
                  <div className="flex items-center justify-between w-full px-1">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.9)] animate-pulse" />
                      <span className="text-[11px] font-black tracking-tight text-slate-800 uppercase">
                        Vitals Sensor
                      </span>
                    </div>
                    <span className="text-[9px] font-mono font-bold text-[#006B3F] bg-emerald-100/80 px-1.5 py-0.5 rounded border border-emerald-300">
                      SpO₂ • PR
                    </span>
                  </div>

                  {/* Deep Recessed Finger Insertion Chamber (Matching 3D CAD Beveled Window) */}
                  <div className="w-36 h-24 rounded-xl bg-slate-950 border-[2.5px] border-slate-700 shadow-inner flex flex-col items-center justify-center relative overflow-hidden">
                    {/* Beveled Chamfer / Inset Shadow Illusion */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/60 pointer-events-none" />

                    {/* Status Halo LED Ring */}
                    <div className="w-16 h-16 rounded-full border-2 border-emerald-400/70 shadow-[0_0_12px_rgba(16,185,129,0.6)] flex items-center justify-center relative">
                      {/* Dual-Wavelength Optical PPG Emitter & Photodetector (660nm Red & 940nm IR) */}
                      <div className="w-5 h-5 rounded-full bg-red-600/90 blur-[1.5px] animate-ping opacity-80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-red-600 shadow-[0_0_8px_rgba(239,68,68,1)] absolute" />

                      {/* Finger Resting Cradle Marker */}
                      <div className="absolute inset-x-2 bottom-1.5 h-2 border-b-2 border-emerald-400/80 rounded-b-sm" />
                    </div>

                    {/* Subtle Activity Pulse Graphic */}
                    <div className="absolute bottom-1 right-2 text-emerald-400/60">
                      <Activity size={12} />
                    </div>
                  </div>

                  {/* Silkscreen Instructions */}
                  <div className="text-center w-full mt-1">
                    <span className="text-[10px] font-black text-slate-700 uppercase tracking-tight block">
                      INSERT FINGER
                    </span>
                    <span className="text-[8px] text-slate-500 font-mono tracking-tighter block">
                      AUTOMATIC VITALS SENSOR BAY
                    </span>
                  </div>
                </div>
              </div>

            </div>

            {/* Lower Body Cabinet Door (Matching the Sketch and 3D CAD Render) */}
            {/* "VITAL SIGNS SENSORS (OPTIONAL)" Cabinet Panel with ECG Waveform */}
            <div className="w-full h-32 rounded-2xl bg-[#E8EFEA] border-2 border-[#CBD8D2] shadow-sm flex flex-col items-center justify-center relative px-8">
              {/* 4 Corner Allen Bolt Accents */}
              <div className="absolute top-2.5 left-2.5 w-2 h-2 rounded-full bg-[#B8C8C1] border border-slate-400/60" />
              <div className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-[#B8C8C1] border border-slate-400/60" />
              <div className="absolute bottom-2.5 left-2.5 w-2 h-2 rounded-full bg-[#B8C8C1] border border-slate-400/60" />
              <div className="absolute bottom-2.5 right-2.5 w-2 h-2 rounded-full bg-[#B8C8C1] border border-slate-400/60" />

              {/* Recessed Door Seam */}
              <div className="flex items-center gap-4 text-slate-700">
                {/* Stylized ECG Heartbeat Pulse Line */}
                <div className="flex items-center text-[#006B3F]">
                  <Activity size={36} strokeWidth={2.2} className="animate-pulse" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[15px] font-black uppercase tracking-wider text-slate-800">
                    VITAL SIGNS SENSORS
                  </span>
                  <span className="text-[10px] font-mono text-slate-500 tracking-wide">
                    INTEGRATED BIO-TELEMETRY & OPTICAL SENSING MODULE
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Dual-Tier Weighted Freestanding Pedestal Base ($600mm × $380mm CAD footprint) */}
        <div className="w-[1200px] h-[36px] bg-[#1E293B] rounded-b-[20px] shadow-2xl border-t-2 border-[#006B3F] shrink-0 relative flex items-center justify-between px-10">
          {/* Left Leveling Foot Marker */}
          <div className="w-16 h-2 rounded-full bg-slate-700/80" />
          {/* Center Brand Accent Inlay */}
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#006B3F] border border-emerald-400/40" />
            <span className="text-[10px] font-mono font-bold tracking-widest text-slate-400 uppercase">
              WVSU MEDICAL CENTER • EMERGENCY INTAKE TOTEM
            </span>
          </div>
          {/* Right Leveling Foot Marker */}
          <div className="w-16 h-2 rounded-full bg-slate-700/80" />
        </div>

        {/* Floor Contact Ambient Shadow */}
        <div className="w-[1240px] h-6 bg-black/25 blur-lg rounded-full -mt-2 -z-10" />
      </div>
    </div>
  );
}
