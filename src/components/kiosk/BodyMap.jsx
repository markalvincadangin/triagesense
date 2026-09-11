import React, { useState } from 'react';
import { RotateCw, Check, User } from 'lucide-react';

const REGIONS = [
  { id: 'Head', label: 'Head / Ulo', view: 'both' },
  { id: 'Neck', label: 'Neck / Liog', view: 'both' },
  { id: 'Shoulder', label: 'Shoulders / Abaga', view: 'both' },
  { id: 'Chest', label: 'Chest / Dughan', view: 'front' },
  { id: 'Abdomen', label: 'Abdomen / Tiyan', view: 'front' },
  { id: 'Back', label: 'Back / Likod', view: 'back' },
  { id: 'Arms', label: 'Arms / Takyag', view: 'both' },
  { id: 'Legs', label: 'Legs / Tiil', view: 'both' }
];

export function BodyMap({ selectedLocations = [], onToggleLocation }) {
  const [activeView, setActiveView] = useState('front'); // 'front' | 'back'

  const isSelected = (id) => selectedLocations.includes(id);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '24px',
        width: '100%'
      }}
    >
      {/* Front / Back Toggle Controls */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          backgroundColor: 'var(--color-bg-canvas)',
          padding: '6px',
          borderRadius: 'var(--radius-full)',
          border: '1.5px solid var(--color-border)'
        }}
      >
        <button
          type="button"
          onClick={() => setActiveView('front')}
          style={{
            padding: '10px 24px',
            borderRadius: 'var(--radius-full)',
            border: 'none',
            fontSize: '15px',
            fontWeight: '700',
            cursor: 'pointer',
            backgroundColor: activeView === 'front' ? 'var(--color-wvsu-primary)' : 'transparent',
            color: activeView === 'front' ? '#FFFFFF' : 'var(--color-text-secondary)',
            transition: 'all 0.18s ease-in-out'
          }}
        >
          Front View / Atubang
        </button>

        <button
          type="button"
          onClick={() => setActiveView('back')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 24px',
            borderRadius: 'var(--radius-full)',
            border: 'none',
            fontSize: '15px',
            fontWeight: '700',
            cursor: 'pointer',
            backgroundColor: activeView === 'back' ? 'var(--color-wvsu-primary)' : 'transparent',
            color: activeView === 'back' ? '#FFFFFF' : 'var(--color-text-secondary)',
            transition: 'all 0.18s ease-in-out'
          }}
        >
          <RotateCw size={16} />
          <span>Back View / Likod</span>
        </button>
      </div>

      {/* Main Interactive Diagram + Quick Select Grid */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '40px',
          width: '100%',
          flexWrap: 'wrap'
        }}
      >
        {/* Visual Body Silhouette with Hotspots */}
        <div
          style={{
            width: '280px',
            height: '460px',
            backgroundColor: 'var(--color-bg-surface)',
            borderRadius: 'var(--radius-xl)',
            border: '2px solid var(--color-border)',
            boxShadow: 'var(--shadow-card)',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            userSelect: 'none'
          }}
        >
          {/* Anatomical Silhouette Graphic */}
          <svg
            viewBox="0 0 200 360"
            style={{ width: '220px', height: '400px' }}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Body Base Silhouette Outline */}
            <path
              d="M100 20 C112 20 122 30 122 45 C122 58 114 68 104 70 C106 75 110 78 118 80 L145 90 C154 94 158 104 156 112 L144 185 C142 195 130 198 124 190 L120 160 L122 210 L130 320 C131 332 120 340 110 340 C102 340 96 332 96 322 L98 240 L102 240 L104 322 C104 332 98 340 90 340 C80 340 69 332 70 320 L78 210 L80 160 L76 190 C70 198 58 195 56 185 L44 112 C42 104 46 94 55 90 L82 80 C90 78 94 75 96 70 C86 68 78 58 78 45 C78 30 88 20 100 20 Z"
              fill="#F1F5F9"
              stroke="#CBD5E1"
              strokeWidth="2.5"
            />

            {/* Region Hotspots */}
            {/* Head */}
            <circle
              cx="100"
              cy="45"
              r="24"
              fill={isSelected('Head') ? 'var(--color-wvsu-primary)' : 'transparent'}
              fillOpacity={isSelected('Head') ? 0.7 : 0}
              stroke={isSelected('Head') ? 'var(--color-wvsu-primary)' : '#94A3B8'}
              strokeWidth="2.5"
              strokeDasharray={isSelected('Head') ? 'none' : '3 3'}
              style={{ cursor: 'pointer', transition: 'all 0.18s' }}
              onClick={() => onToggleLocation('Head')}
            />

            {/* Neck */}
            <rect
              x="92"
              y="69"
              width="16"
              height="14"
              rx="4"
              fill={isSelected('Neck') ? 'var(--color-wvsu-primary)' : 'transparent'}
              fillOpacity={isSelected('Neck') ? 0.7 : 0}
              stroke={isSelected('Neck') ? 'var(--color-wvsu-primary)' : '#94A3B8'}
              strokeWidth="2"
              style={{ cursor: 'pointer' }}
              onClick={() => onToggleLocation('Neck')}
            />

            {/* Shoulders */}
            <circle
              cx="68"
              cy="88"
              r="12"
              fill={isSelected('Shoulder') ? 'var(--color-wvsu-primary)' : 'transparent'}
              fillOpacity={isSelected('Shoulder') ? 0.7 : 0}
              stroke={isSelected('Shoulder') ? 'var(--color-wvsu-primary)' : '#94A3B8'}
              strokeWidth="2"
              style={{ cursor: 'pointer' }}
              onClick={() => onToggleLocation('Shoulder')}
            />
            <circle
              cx="132"
              cy="88"
              r="12"
              fill={isSelected('Shoulder') ? 'var(--color-wvsu-primary)' : 'transparent'}
              fillOpacity={isSelected('Shoulder') ? 0.7 : 0}
              stroke={isSelected('Shoulder') ? 'var(--color-wvsu-primary)' : '#94A3B8'}
              strokeWidth="2"
              style={{ cursor: 'pointer' }}
              onClick={() => onToggleLocation('Shoulder')}
            />

            {/* Chest (Front) or Back (Back) */}
            {activeView === 'front' ? (
              <rect
                x="80"
                y="96"
                width="40"
                height="34"
                rx="8"
                fill={isSelected('Chest') ? 'var(--color-wvsu-primary)' : 'transparent'}
                fillOpacity={isSelected('Chest') ? 0.7 : 0}
                stroke={isSelected('Chest') ? 'var(--color-wvsu-primary)' : '#94A3B8'}
                strokeWidth="2.5"
                style={{ cursor: 'pointer' }}
                onClick={() => onToggleLocation('Chest')}
              />
            ) : (
              <rect
                x="80"
                y="98"
                width="40"
                height="65"
                rx="8"
                fill={isSelected('Back') ? 'var(--color-wvsu-primary)' : 'transparent'}
                fillOpacity={isSelected('Back') ? 0.7 : 0}
                stroke={isSelected('Back') ? 'var(--color-wvsu-primary)' : '#94A3B8'}
                strokeWidth="2.5"
                style={{ cursor: 'pointer' }}
                onClick={() => onToggleLocation('Back')}
              />
            )}

            {/* Abdomen (Front View Only) */}
            {activeView === 'front' && (
              <rect
                x="82"
                y="136"
                width="36"
                height="34"
                rx="6"
                fill={isSelected('Abdomen') ? 'var(--color-wvsu-primary)' : 'transparent'}
                fillOpacity={isSelected('Abdomen') ? 0.7 : 0}
                stroke={isSelected('Abdomen') ? 'var(--color-wvsu-primary)' : '#94A3B8'}
                strokeWidth="2.5"
                style={{ cursor: 'pointer' }}
                onClick={() => onToggleLocation('Abdomen')}
              />
            )}

            {/* Arms (Left & Right) */}
            <rect
              x="44"
              y="115"
              width="18"
              height="65"
              rx="9"
              fill={isSelected('Arms') ? 'var(--color-wvsu-primary)' : 'transparent'}
              fillOpacity={isSelected('Arms') ? 0.7 : 0}
              stroke={isSelected('Arms') ? 'var(--color-wvsu-primary)' : '#94A3B8'}
              strokeWidth="2"
              style={{ cursor: 'pointer' }}
              onClick={() => onToggleLocation('Arms')}
            />
            <rect
              x="138"
              y="115"
              width="18"
              height="65"
              rx="9"
              fill={isSelected('Arms') ? 'var(--color-wvsu-primary)' : 'transparent'}
              fillOpacity={isSelected('Arms') ? 0.7 : 0}
              stroke={isSelected('Arms') ? 'var(--color-wvsu-primary)' : '#94A3B8'}
              strokeWidth="2"
              style={{ cursor: 'pointer' }}
              onClick={() => onToggleLocation('Arms')}
            />

            {/* Legs (Left & Right) */}
            <rect
              x="76"
              y="200"
              width="20"
              height="120"
              rx="10"
              fill={isSelected('Legs') ? 'var(--color-wvsu-primary)' : 'transparent'}
              fillOpacity={isSelected('Legs') ? 0.7 : 0}
              stroke={isSelected('Legs') ? 'var(--color-wvsu-primary)' : '#94A3B8'}
              strokeWidth="2"
              style={{ cursor: 'pointer' }}
              onClick={() => onToggleLocation('Legs')}
            />
            <rect
              x="104"
              y="200"
              width="20"
              height="120"
              rx="10"
              fill={isSelected('Legs') ? 'var(--color-wvsu-primary)' : 'transparent'}
              fillOpacity={isSelected('Legs') ? 0.7 : 0}
              stroke={isSelected('Legs') ? 'var(--color-wvsu-primary)' : '#94A3B8'}
              strokeWidth="2"
              style={{ cursor: 'pointer' }}
              onClick={() => onToggleLocation('Legs')}
            />
          </svg>

          {/* View Label Badge */}
          <div
            style={{
              position: 'absolute',
              bottom: '12px',
              fontSize: '12px',
              fontWeight: '700',
              color: 'var(--color-text-secondary)',
              textTransform: 'uppercase',
              letterSpacing: '0.06em'
            }}
          >
            {activeView === 'front' ? 'Front Orientation' : 'Back Orientation'}
          </div>
        </div>

        {/* High-Contrast Direct Touch Selection Buttons */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '12px',
            maxWidth: '460px',
            width: '100%'
          }}
        >
          {REGIONS.map((region) => {
            const active = isSelected(region.id);

            return (
              <button
                key={region.id}
                type="button"
                onClick={() => onToggleLocation(region.id)}
                style={{
                  minHeight: '64px',
                  padding: '12px 18px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: active ? 'var(--color-wvsu-primary-light)' : 'var(--color-bg-surface)',
                  border: active ? '2.5px solid var(--color-wvsu-primary)' : '1.5px solid var(--color-border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  textAlign: 'left',
                  boxShadow: active ? 'var(--shadow-card)' : 'none',
                  transition: 'all 0.15s ease-in-out'
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: '16px',
                      fontWeight: active ? '700' : '600',
                      color: active ? 'var(--color-wvsu-primary)' : 'var(--color-text-primary)'
                    }}
                  >
                    {region.label.split(' / ')[0]}
                  </div>
                  <div
                    style={{
                      fontSize: '13px',
                      color: 'var(--color-text-secondary)',
                      marginTop: '2px'
                    }}
                  >
                    {region.label.split(' / ')[1]}
                  </div>
                </div>

                <div
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: 'var(--radius-full)',
                    border: active ? 'none' : '1.5px solid var(--color-border)',
                    backgroundColor: active ? 'var(--color-wvsu-primary)' : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFFFFF'
                  }}
                >
                  {active && <Check size={16} strokeWidth={3} />}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Locations Summary Pill Cluster */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          flexWrap: 'wrap',
          justifyContent: 'center',
          minHeight: '36px'
        }}
      >
        <span style={{ fontSize: '14px', fontWeight: '600', color: 'var(--color-text-secondary)' }}>
          Selected Areas ({selectedLocations.length}):
        </span>

        {selectedLocations.length === 0 ? (
          <span style={{ fontSize: '14px', color: 'var(--color-text-disabled)', fontStyle: 'italic' }}>
            None selected yet (tap body diagram or buttons above)
          </span>
        ) : (
          selectedLocations.map((loc) => (
            <span
              key={loc}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '5px 14px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--color-wvsu-primary-light)',
                border: '1.5px solid var(--color-wvsu-primary)',
                color: 'var(--color-wvsu-primary)',
                fontSize: '14px',
                fontWeight: '700'
              }}
            >
              <Check size={14} strokeWidth={2.5} />
              {loc}
            </span>
          ))
        )}
      </div>
    </div>
  );
}
