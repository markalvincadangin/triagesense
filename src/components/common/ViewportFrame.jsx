import React, { useState, useEffect } from 'react';
import { useTriage } from '../../context/TriageContext';
import { DemoControls } from './DemoControls';
import { KioskEnclosure, TOTEM_WIDTH, TOTEM_HEIGHT } from '../kiosk/KioskEnclosure';

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

  // 1. STANDALONE KIOSK SCALING (Canonical Totem: TOTEM_WIDTH × TOTEM_HEIGHT)
  // Guarantees zero vertical/horizontal overflow with balanced surrounding margins
  const kioskPadY = 48; // 24px top & bottom margin
  const kioskPadX = 48; // 24px left & right margin
  const standaloneKioskScale = Math.min(
    (winH - kioskPadY) / TOTEM_HEIGHT,
    (winW - kioskPadX) / TOTEM_WIDTH
  );

  // 2. DUAL VIEW BALANCED SCALING (~26% Kiosk / ~74% Staff Portal)
  // Optimizes heights, gaps, and widths simultaneously for zero clipping
  const dualPadY = 56; // 28px top & bottom margin
  const dualPadX = 64; // 32px left & right margin
  const availH = Math.max(winH - dualPadY, 300);
  const availW = Math.max(winW - dualPadX, 600);
  const dualGap = 36; // Gap between kiosk totem and staff workstation

  // Target heights for visual balance in dual mode
  let dualKioskScale = (availH * 0.96) / TOTEM_HEIGHT;
  let dualAdminScale = (availH * 0.88) / 1080;

  // Verify total horizontal width fits available canvas
  const totalWidthNeeded = (TOTEM_WIDTH * dualKioskScale) + dualGap + (1920 * dualAdminScale);
  if (totalWidthNeeded > availW) {
    const widthShrinkRatio = availW / totalWidthNeeded;
    dualKioskScale *= widthShrinkRatio;
    dualAdminScale *= widthShrinkRatio;
  }

  return (
    <div data-viewport-root className="relative w-screen h-screen overflow-hidden select-none bg-gradient-to-b from-[#E2E8E5] via-[#EDF2EF] to-[#DFE6E2] font-sans">
      
      {/* 1. STANDALONE PATIENT KIOSK MODE */}
      {viewMode === 'kiosk' && (
        <div className="w-full h-full flex items-center justify-center p-4 overflow-hidden">
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

      {/* 3. DUAL VIEW (PHYSICAL CONTEXT HIERARCHY: BALANCED & OPTIMIZED VIEWPORT) */}
      {viewMode === 'split' && (
        <div className="w-full h-full flex items-center justify-center px-8 py-4 gap-9 overflow-hidden">
          
          {/* Left Column: Freestanding Portrait Kiosk (Auto-scaled to fit viewport) */}
          <div className="flex items-center justify-center shrink-0">
            <KioskEnclosure scale={dualKioskScale}>
              {kioskContent}
            </KioskEnclosure>
          </div>

          {/* Right Column: Widescreen Clinical Workstation (Auto-scaled & centered) */}
          <div className="flex items-center justify-center shrink-0">
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

      {/* Turbopack-Style Draggable Demo Controls */}
      <DemoControls />
    </div>
  );
}
