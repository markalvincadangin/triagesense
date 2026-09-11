import React, { useState, useEffect } from 'react';
import { useTriage } from '../../context/TriageContext';
import { DemoControls } from './DemoControls';
import { KioskEnclosure } from '../kiosk/KioskEnclosure';

export function ViewportFrame({ kioskContent, adminContent }) {
  const { viewMode } = useTriage();
  const [dimensions, setDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1920,
    height: typeof window !== 'undefined' ? window.innerHeight : 1080
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { width: winW, height: winH } = dimensions;

  // 1. Standalone Kiosk Scaling (Totem: 1140px × 2248px)
  const padH = 40;
  const padW = 40;
  const standaloneKioskScale = Math.min(
    (winH - padH) / 2248,
    (winW - padW) / 1140,
    1.0
  );

  // 2. Dual View Scaling (Hierarchy: Kiosk ~26-28% width, Staff Portal ~72-74% width)
  const dualPad = 40;
  const targetKioskWidth = Math.max(winW * 0.27, 280);
  const dualKioskScale = Math.min(
    targetKioskWidth / 1140,
    (winH - dualPad) / 2248
  );
  const actualDualKioskWidth = 1140 * dualKioskScale;

  // Remaining width for Staff Portal (1920px × 1080px)
  const remainingAdminWidth = winW - actualDualKioskWidth - 64; // gap & padding allowance
  const dualAdminScale = Math.min(
    remainingAdminWidth / 1920,
    (winH - dualPad) / 1080
  );

  return (
    <div className="relative w-screen h-screen overflow-hidden select-none bg-gradient-to-b from-[#E6EBE8] via-[#F2F5F3] to-[#E3E8E5] font-sans">
      {/* 1. STANDALONE PATIENT KIOSK MODE */}
      {viewMode === 'kiosk' && (
        <div className="w-full h-full flex items-center justify-center p-4">
          <KioskEnclosure scale={standaloneKioskScale}>
            {kioskContent}
          </KioskEnclosure>
        </div>
      )}

      {/* 2. STANDALONE STAFF PORTAL MODE */}
      {viewMode === 'admin' && (
        <div className="w-full h-full flex flex-col bg-canvas overflow-hidden">
          {adminContent}
        </div>
      )}

      {/* 3. DUAL VIEW (PHYSICAL CONTEXT HIERARCHY: ~28% KIOSK / ~72% STAFF PORTAL) */}
      {viewMode === 'split' && (
        <div className="w-full h-full flex items-center justify-between px-8 py-6 gap-8 overflow-hidden">
          {/* Left Column: Freestanding Portrait Kiosk (~28% width hierarchy) */}
          <div className="flex items-center justify-center shrink-0">
            <KioskEnclosure scale={dualKioskScale}>
              {kioskContent}
            </KioskEnclosure>
          </div>

          {/* Right Column: Widescreen Clinical Workstation (~72% width hierarchy) */}
          <div className="flex-1 h-full flex items-center justify-center">
            <div
              style={{
                width: `${1920 * dualAdminScale}px`,
                height: `${1080 * dualAdminScale}px`,
                position: 'relative'
              }}
              className="shrink-0 transition-all duration-200"
            >
              <div
                style={{
                  width: '1920px',
                  height: '1080px',
                  transform: `scale(${dualAdminScale})`,
                  transformOrigin: 'top left',
                  position: 'absolute',
                  top: 0,
                  left: 0
                }}
                className="rounded-2xl overflow-hidden shadow-2xl border-[3px] border-slate-700/80 bg-canvas flex flex-col"
              >
                {adminContent}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Discreet Floating Presentation Controller (Top-Right Pill, Hidden Dropdown by Default) */}
      <DemoControls />
    </div>
  );
}
