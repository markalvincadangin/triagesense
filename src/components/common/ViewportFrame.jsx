import React, { useState, useEffect } from 'react';
import { useTriage } from '../../context/TriageContext';
import { DemoControls } from './DemoControls';
import { KioskEnclosure, TOTEM_WIDTH, TOTEM_HEIGHT, FOCUS_WIDTH, FOCUS_HEIGHT } from '../kiosk/KioskEnclosure';

export function ViewportFrame({ kioskContent, adminContent }) {
  const { viewMode, kioskFraming } = useTriage();
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

  // Active kiosk canvas dimensions based on framing mode
  const kioskW = kioskFraming === 'totem' ? TOTEM_WIDTH : FOCUS_WIDTH;
  const kioskH = kioskFraming === 'totem' ? TOTEM_HEIGHT : FOCUS_HEIGHT;

  // 1. STANDALONE KIOSK SCALING
  const kioskPadY = 48;
  const kioskPadX = 48;
  const standaloneKioskScale = Math.min(
    (winH - kioskPadY) / kioskH,
    (winW - kioskPadX) / kioskW
  );

  // 2. DUAL VIEW BALANCED SCALING (~28% Kiosk / ~72% Staff Portal)
  const dualPadY = 48;
  const dualPadX = 56;
  const availH = Math.max(winH - dualPadY, 300);
  const availW = Math.max(winW - dualPadX, 600);
  const dualGap = 32;

  let dualKioskScale = (availH * 0.95) / kioskH;
  let dualAdminScale = (availH * 0.88) / 1080;

  const totalWidthNeeded = (kioskW * dualKioskScale) + dualGap + (1920 * dualAdminScale);
  if (totalWidthNeeded > availW) {
    const widthShrinkRatio = availW / totalWidthNeeded;
    dualKioskScale *= widthShrinkRatio;
    dualAdminScale *= widthShrinkRatio;
  }

  return (
    <div
      data-viewport-root
      className="relative w-screen h-screen overflow-hidden select-none bg-gradient-to-b from-slate-100 via-slate-200 to-slate-300 font-sans"
    >
      {/* 1. STANDALONE PATIENT KIOSK MODE */}
      {viewMode === 'kiosk' && (
        <div className="w-full h-full flex items-center justify-center p-4 overflow-hidden">
          <KioskEnclosure scale={standaloneKioskScale} framing={kioskFraming}>
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
        <div className="w-full h-full flex items-center justify-center px-8 py-4 gap-8 overflow-hidden">
          {/* Left Column: Freestanding Portrait Kiosk (Auto-scaled to fit viewport) */}
          <div className="flex items-center justify-center shrink-0">
            <KioskEnclosure scale={dualKioskScale} framing={kioskFraming}>
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

      {/* Draggable Clinical Demo & Sensor Controls */}
      <DemoControls />
    </div>
  );
}
