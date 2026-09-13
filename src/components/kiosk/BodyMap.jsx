import React, { useState } from 'react';
import { RotateCw, Check } from 'lucide-react';
import { useTriage } from '../../context/TriageContext';

const REGIONS = [
  { id: 'Head', view: 'both' },
  { id: 'Neck', view: 'both' },
  { id: 'Shoulder', view: 'both' },
  { id: 'Chest', view: 'front' },
  { id: 'Abdomen', view: 'front' },
  { id: 'Back', view: 'back' },
  { id: 'Arms', view: 'both' },
  { id: 'Legs', view: 'both' }
];

export function BodyMap({ selectedLocations = [], onToggleLocation }) {
  const { t } = useTriage();
  const [activeView, setActiveView] = useState('front'); // 'front' | 'back'

  const isSelected = (id) => selectedLocations.includes(id);

  return (
    <div className="flex flex-col items-center gap-6 w-full select-none">
      {/* Front / Back Toggle Controls */}
      <div className="flex items-center gap-2 bg-canvas p-1.5 rounded-full border-2 border-border-main shadow-subtle">
        <button
          type="button"
          onClick={() => setActiveView('front')}
          className={`px-8 py-3 rounded-full text-lg font-black transition-all duration-150 cursor-pointer ${
            activeView === 'front'
              ? 'bg-brand-green text-white shadow-md'
              : 'text-text-secondary hover:text-text-primary hover:bg-surface'
          }`}
        >
          {t('bodyMap.front')}
        </button>

        <button
          type="button"
          onClick={() => setActiveView('back')}
          className={`flex items-center gap-2 px-8 py-3 rounded-full text-lg font-black transition-all duration-150 cursor-pointer ${
            activeView === 'back'
              ? 'bg-brand-green text-white shadow-md'
              : 'text-text-secondary hover:text-text-primary hover:bg-surface'
          }`}
        >
          <RotateCw size={20} strokeWidth={2.5} />
          <span>{t('bodyMap.back')}</span>
        </button>
      </div>

      {/* Main Interactive Diagram + Quick Select Grid */}
      <div className="flex items-center justify-center gap-10 w-full flex-wrap">
        {/* Visual Body Silhouette with Hotspots */}
        <div className="w-[330px] h-[520px] bg-surface rounded-3xl border-2 border-border-main shadow-card relative flex items-center justify-center overflow-hidden">
          {/* Anatomical Silhouette Graphic */}
          <svg
            viewBox="0 0 200 360"
            className="w-[270px] h-[470px]"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Body Base Silhouette Outline - High Contrast P3 */}
            <path
              d="M100 20 C112 20 122 30 122 45 C122 58 114 68 104 70 C106 75 110 78 118 80 L145 90 C154 94 158 104 156 112 L144 185 C142 195 130 198 124 190 L120 160 L122 210 L130 320 C131 332 120 340 110 340 C102 340 96 332 96 322 L98 240 L102 240 L104 322 C104 332 98 340 90 340 C80 340 69 332 70 320 L78 210 L80 160 L76 190 C70 198 58 195 56 185 L44 112 C42 104 46 94 55 90 L82 80 C90 78 94 75 96 70 C86 68 78 58 78 45 C78 30 88 20 100 20 Z"
              fill="#F8FAFC"
              stroke="#475569"
              strokeWidth="3.5"
            />

            {/* Region Hotspots with P1 Invisible Expanded Hitboxes & P3 Contrast */}
            {/* Head */}
            <g
              className="cursor-pointer group"
              onClick={() => onToggleLocation('Head', activeView)}
            >
              {/* Invisible Hitbox */}
              <circle cx="100" cy="45" r="36" fill="transparent" pointerEvents="all" />
              {/* Visible Circle */}
              <circle
                cx="100"
                cy="45"
                r="24"
                fill={isSelected('Head') ? '#059669' : '#F1F5F9'}
                fillOpacity={isSelected('Head') ? 0.85 : 0.6}
                stroke={isSelected('Head') ? '#047857' : '#475569'}
                strokeWidth={isSelected('Head') ? '3.5' : '2.5'}
                strokeDasharray={isSelected('Head') ? 'none' : '4 3'}
                className="transition-all duration-150"
              />
            </g>

            {/* Neck */}
            <g
              className="cursor-pointer group"
              onClick={() => onToggleLocation('Neck', activeView)}
            >
              {/* Invisible Hitbox */}
              <rect x="78" y="62" width="44" height="26" rx="8" fill="transparent" pointerEvents="all" />
              {/* Visible Rect */}
              <rect
                x="92"
                y="69"
                width="16"
                height="14"
                rx="4"
                fill={isSelected('Neck') ? '#059669' : '#F1F5F9'}
                fillOpacity={isSelected('Neck') ? 0.85 : 0.6}
                stroke={isSelected('Neck') ? '#047857' : '#475569'}
                strokeWidth={isSelected('Neck') ? '3.5' : '2.5'}
                className="transition-all duration-150"
              />
            </g>

            {/* Shoulders (Left & Right) */}
            <g
              className="cursor-pointer group"
              onClick={() => onToggleLocation('Shoulder', activeView)}
            >
              {/* Left Shoulder Hitbox */}
              <circle cx="68" cy="88" r="22" fill="transparent" pointerEvents="all" />
              {/* Left Shoulder Visible */}
              <circle
                cx="68"
                cy="88"
                r="13"
                fill={isSelected('Shoulder') ? '#059669' : '#F1F5F9'}
                fillOpacity={isSelected('Shoulder') ? 0.85 : 0.6}
                stroke={isSelected('Shoulder') ? '#047857' : '#475569'}
                strokeWidth={isSelected('Shoulder') ? '3.5' : '2.5'}
                className="transition-all duration-150"
              />

              {/* Right Shoulder Hitbox */}
              <circle cx="132" cy="88" r="22" fill="transparent" pointerEvents="all" />
              {/* Right Shoulder Visible */}
              <circle
                cx="132"
                cy="88"
                r="13"
                fill={isSelected('Shoulder') ? '#059669' : '#F1F5F9'}
                fillOpacity={isSelected('Shoulder') ? 0.85 : 0.6}
                stroke={isSelected('Shoulder') ? '#047857' : '#475569'}
                strokeWidth={isSelected('Shoulder') ? '3.5' : '2.5'}
                className="transition-all duration-150"
              />
            </g>

            {/* Chest (Front) or Back (Back) */}
            {activeView === 'front' ? (
              <g
                className="cursor-pointer group"
                onClick={() => onToggleLocation('Chest')}
              >
                {/* Chest Hitbox */}
                <rect x="70" y="90" width="60" height="46" rx="10" fill="transparent" pointerEvents="all" />
                {/* Chest Visible */}
                <rect
                  x="80"
                  y="96"
                  width="40"
                  height="34"
                  rx="8"
                  fill={isSelected('Chest') ? '#059669' : '#F1F5F9'}
                  fillOpacity={isSelected('Chest') ? 0.85 : 0.6}
                  stroke={isSelected('Chest') ? '#047857' : '#475569'}
                  strokeWidth={isSelected('Chest') ? '3.5' : '2.5'}
                  className="transition-all duration-150"
                />
              </g>
            ) : (
              <g
                className="cursor-pointer group"
                onClick={() => onToggleLocation('Back')}
              >
                {/* Back Hitbox */}
                <rect x="68" y="90" width="64" height="80" rx="10" fill="transparent" pointerEvents="all" />
                {/* Back Visible */}
                <rect
                  x="80"
                  y="98"
                  width="40"
                  height="65"
                  rx="8"
                  fill={isSelected('Back') ? '#059669' : '#F1F5F9'}
                  fillOpacity={isSelected('Back') ? 0.85 : 0.6}
                  stroke={isSelected('Back') ? '#047857' : '#475569'}
                  strokeWidth={isSelected('Back') ? '3.5' : '2.5'}
                  className="transition-all duration-150"
                />
              </g>
            )}

            {/* Abdomen (Front View Only) */}
            {activeView === 'front' && (
              <g
                className="cursor-pointer group"
                onClick={() => onToggleLocation('Abdomen')}
              >
                {/* Abdomen Hitbox */}
                <rect x="72" y="130" width="56" height="46" rx="8" fill="transparent" pointerEvents="all" />
                {/* Abdomen Visible */}
                <rect
                  x="82"
                  y="136"
                  width="36"
                  height="34"
                  rx="6"
                  fill={isSelected('Abdomen') ? '#059669' : '#F1F5F9'}
                  fillOpacity={isSelected('Abdomen') ? 0.85 : 0.6}
                  stroke={isSelected('Abdomen') ? '#047857' : '#475569'}
                  strokeWidth={isSelected('Abdomen') ? '3.5' : '2.5'}
                  className="transition-all duration-150"
                />
              </g>
            )}

            {/* Arms (Left & Right) */}
            <g
              className="cursor-pointer group"
              onClick={() => onToggleLocation('Arms', activeView)}
            >
              {/* Left Arm Hitbox */}
              <rect x="32" y="105" width="40" height="85" rx="16" fill="transparent" pointerEvents="all" />
              {/* Left Arm Visible */}
              <rect
                x="44"
                y="115"
                width="18"
                height="65"
                rx="9"
                fill={isSelected('Arms') ? '#059669' : '#F1F5F9'}
                fillOpacity={isSelected('Arms') ? 0.85 : 0.6}
                stroke={isSelected('Arms') ? '#047857' : '#475569'}
                strokeWidth={isSelected('Arms') ? '3.5' : '2.5'}
                className="transition-all duration-150"
              />

              {/* Right Arm Hitbox */}
              <rect x="128" y="105" width="40" height="85" rx="16" fill="transparent" pointerEvents="all" />
              {/* Right Arm Visible */}
              <rect
                x="138"
                y="115"
                width="18"
                height="65"
                rx="9"
                fill={isSelected('Arms') ? '#059669' : '#F1F5F9'}
                fillOpacity={isSelected('Arms') ? 0.85 : 0.6}
                stroke={isSelected('Arms') ? '#047857' : '#475569'}
                strokeWidth={isSelected('Arms') ? '3.5' : '2.5'}
                className="transition-all duration-150"
              />
            </g>

            {/* Legs (Left & Right) */}
            <g
              className="cursor-pointer group"
              onClick={() => onToggleLocation('Legs', activeView)}
            >
              {/* Left Leg Hitbox */}
              <rect x="64" y="192" width="38" height="140" rx="14" fill="transparent" pointerEvents="all" />
              {/* Left Leg Visible */}
              <rect
                x="76"
                y="200"
                width="20"
                height="120"
                rx="10"
                fill={isSelected('Legs') ? '#059669' : '#F1F5F9'}
                fillOpacity={isSelected('Legs') ? 0.85 : 0.6}
                stroke={isSelected('Legs') ? '#047857' : '#475569'}
                strokeWidth={isSelected('Legs') ? '3.5' : '2.5'}
                className="transition-all duration-150"
              />

              {/* Right Leg Hitbox */}
              <rect x="98" y="192" width="38" height="140" rx="14" fill="transparent" pointerEvents="all" />
              {/* Right Leg Visible */}
              <rect
                x="104"
                y="200"
                width="20"
                height="120"
                rx="10"
                fill={isSelected('Legs') ? '#059669' : '#F1F5F9'}
                fillOpacity={isSelected('Legs') ? 0.85 : 0.6}
                stroke={isSelected('Legs') ? '#047857' : '#475569'}
                strokeWidth={isSelected('Legs') ? '3.5' : '2.5'}
                className="transition-all duration-150"
              />
            </g>
          </svg>

          {/* View Label Badge - Localized */}
          <div className="absolute bottom-3 text-xs font-black text-text-secondary uppercase tracking-wider bg-canvas/90 px-3 py-1.5 rounded-full border-2 border-border-main shadow-2xs">
            {activeView === 'front' ? t('bodyMap.orientationFront') : t('bodyMap.orientationBack')}
          </div>
        </div>

        {/* High-Contrast Direct Touch Selection Buttons with Rounded Square Checkbox Affordance (P2) */}
        <div className="grid grid-cols-2 gap-3.5 max-w-[520px] w-full">
          {REGIONS.map((region) => {
            const active = isSelected(region.id);

            return (
              <button
                key={region.id}
                type="button"
                aria-pressed={active}
                onClick={() => onToggleLocation(region.id, activeView)}
                className={`min-h-[76px] px-5 py-4 rounded-2xl border-2 flex items-center justify-between cursor-pointer text-left transition-all duration-150 group ${
                  active
                    ? 'bg-emerald-50/90 border-brand-green shadow-card ring-2 ring-brand-green/25'
                    : 'bg-surface border-border-main hover:border-slate-400 shadow-subtle hover:bg-canvas'
                }`}
              >
                <div>
                  <div
                    className={`text-lg ${
                      active ? 'font-black text-brand-green' : 'font-bold text-text-primary'
                    }`}
                  >
                    {t(`bodyMap.regions.${region.id}`) || region.id}
                  </div>
                </div>

                {/* 36px Rounded Square Checkbox Pill */}
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-150 ${
                    active
                      ? 'bg-brand-green text-white shadow-sm ring-2 ring-brand-green/30'
                      : 'border-2 border-slate-300 bg-surface/60 group-hover:border-slate-400'
                  }`}
                >
                  {active && <Check size={20} strokeWidth={3.5} />}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Locations Summary Pill Cluster */}
      <div className="flex items-center gap-3 flex-wrap justify-center min-h-[48px] mt-1">
        <span className="text-base font-black text-text-primary">
          {t('bodyMap.selectedTitle')} ({selectedLocations.length}):
        </span>

        {selectedLocations.length === 0 ? (
          <span className="text-base text-text-disabled italic font-medium">
            {t('bodyMap.noneSelected')}
          </span>
        ) : (
          selectedLocations.map((loc) => (
            <span
              key={loc}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border-2 border-brand-green text-brand-green text-base font-black shadow-2xs animate-fade-in"
            >
              <Check size={16} strokeWidth={3.5} />
              <span>{t(`bodyMap.regions.${loc}`) || loc}</span>
            </span>
          ))
        )}
      </div>
    </div>
  );
}
