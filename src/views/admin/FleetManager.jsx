import React, { useState } from 'react';
import { useTriage } from '../../context/TriageContext';
import { Button } from '../../components/common/Button';
import { Server, Wifi, Battery, Printer, Clock, Sliders, CheckCircle2, ShieldCheck, RefreshCw } from 'lucide-react';

export function FleetManager() {
  const { kiosks, settings, setSettings } = useTriage();
  const [cooldown, setCooldown] = useState(settings.emergencyCooldown || 60);
  const [timeoutSec, setTimeoutSec] = useState(settings.inactivityTimeout || 45);
  const [saveBanner, setSaveBanner] = useState(false);

  const handleSaveSettings = (e) => {
    e.preventDefault();
    setSettings((prev) => ({
      ...prev,
      emergencyCooldown: Number(cooldown),
      inactivityTimeout: Number(timeoutSec)
    }));
    setSaveBanner(true);
    setTimeout(() => setSaveBanner(false), 3000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', height: '100%', overflowY: 'auto', padding: '24px 32px' }}>
      {/* Top Header */}
      <div>
        <h1 style={{ fontSize: '26px', fontWeight: '800', color: 'var(--color-text-primary)' }}>
          Kiosk Fleet Management & Station Configuration
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
          Hardware status telemetry for physical ER terminals and global intake parameter configuration.
        </p>
      </div>

      {saveBanner && (
        <div
          className="animate-fade-in"
          style={{
            padding: '12px 20px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--color-success-light)',
            border: '1.5px solid var(--color-success)',
            color: 'var(--color-success)',
            fontSize: '14px',
            fontWeight: '700',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <CheckCircle2 size={18} />
          <span>Kiosk Fleet Parameters Successfully Synchronized across Terminals!</span>
        </div>
      )}

      {/* Kiosk Hardware Telemetry Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
        {kiosks.map((kiosk) => (
          <div
            key={kiosk.id}
            style={{
              backgroundColor: 'var(--color-bg-surface)',
              borderRadius: 'var(--radius-xl)',
              border: '1.5px solid var(--color-border)',
              padding: '24px',
              boxShadow: 'var(--shadow-sm)',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--color-wvsu-primary-light)',
                    color: 'var(--color-wvsu-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Server size={22} />
                </div>
                <div>
                  <div style={{ fontSize: '18px', fontWeight: '800', color: 'var(--color-text-primary)' }}>
                    {kiosk.name}
                  </div>
                  <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>
                    {kiosk.location}
                  </div>
                </div>
              </div>

              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '4px 12px',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'var(--color-success-light)',
                  color: 'var(--color-success)',
                  fontSize: '13px',
                  fontWeight: '700'
                }}
              >
                <Wifi size={14} />
                {kiosk.status}
              </span>
            </div>

            {/* Telemetry Metric Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', backgroundColor: 'var(--color-bg-canvas)', padding: '16px', borderRadius: 'var(--radius-md)' }}>
              <div>
                <div style={{ fontSize: '11px', fontWeight: '700', color: 'var(--color-text-secondary)', textTransform: 'uppercase' }}>
                  Thermal Printer Paper
                </div>
                <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--color-text-primary)', marginTop: '2px' }}>
                  {kiosk.paperLevel}
                </div>
              </div>

              <div>
                <div style={{ fontSize: '11px', fontWeight: '700', color: 'var(--color-text-secondary)', textTransform: 'uppercase' }}>
                  Power & Uptime
                </div>
                <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--color-text-primary)', marginTop: '2px' }}>
                  {kiosk.battery}
                </div>
              </div>

              <div>
                <div style={{ fontSize: '11px', fontWeight: '700', color: 'var(--color-text-secondary)', textTransform: 'uppercase' }}>
                  NFC Contactless Reader
                </div>
                <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--color-success)', marginTop: '2px' }}>
                  {kiosk.nfcStatus}
                </div>
              </div>

              <div>
                <div style={{ fontSize: '11px', fontWeight: '700', color: 'var(--color-text-secondary)', textTransform: 'uppercase' }}>
                  Total Intakes Today
                </div>
                <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--color-wvsu-primary)', marginTop: '2px' }}>
                  {kiosk.activeIntakesToday} patients registered
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px', color: 'var(--color-text-secondary)' }}>
              <span>Heartbeat: {kiosk.lastSync}</span>
              <button
                type="button"
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--color-wvsu-blue)',
                  fontWeight: '700',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <RefreshCw size={13} />
                <span>Simulate Ping</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Configuration Settings Form */}
      <form
        onSubmit={handleSaveSettings}
        style={{
          backgroundColor: 'var(--color-bg-surface)',
          borderRadius: 'var(--radius-xl)',
          border: '1.5px solid var(--color-border)',
          padding: '28px',
          boxShadow: 'var(--shadow-sm)',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '18px', fontWeight: '800', color: 'var(--color-text-primary)' }}>
          <Sliders size={20} color="var(--color-wvsu-primary)" />
          <span>Intake Kiosk Operating Parameters</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
          {/* Emergency Cooldown Slider */}
          <div style={{ backgroundColor: 'var(--color-bg-canvas)', padding: '18px', borderRadius: 'var(--radius-md)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <label style={{ fontSize: '14px', fontWeight: '700', color: 'var(--color-text-primary)' }}>
                Emergency Request Cooldown Lockout:
              </label>
              <span style={{ fontSize: '16px', fontWeight: '800', color: 'var(--color-emergency)' }}>
                {cooldown} seconds
              </span>
            </div>
            <input
              type="range"
              min={30}
              max={120}
              step={10}
              value={cooldown}
              onChange={(e) => setCooldown(e.target.value)}
              style={{ width: '100%', accentColor: 'var(--color-emergency)' }}
            />
            <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginTop: '6px' }}>
              Prevents duplicate/spam assistance activations from the kiosk waiting room.
            </div>
          </div>

          {/* Inactivity Privacy Timeout */}
          <div style={{ backgroundColor: 'var(--color-bg-canvas)', padding: '18px', borderRadius: 'var(--radius-md)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <label style={{ fontSize: '14px', fontWeight: '700', color: 'var(--color-text-primary)' }}>
                Inactivity Reset Timeout:
              </label>
              <span style={{ fontSize: '16px', fontWeight: '800', color: 'var(--color-wvsu-primary)' }}>
                {timeoutSec} seconds
              </span>
            </div>
            <input
              type="range"
              min={30}
              max={180}
              step={15}
              value={timeoutSec}
              onChange={(e) => setTimeoutSec(e.target.value)}
              style={{ width: '100%', accentColor: 'var(--color-wvsu-primary)' }}
            />
            <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginTop: '6px' }}>
              Auto-purges session if terminal is abandoned without input.
            </div>
          </div>
        </div>

        {/* Supported Languages Toggles */}
        <div>
          <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--color-text-primary)', marginBottom: '10px' }}>
            Supported Languages Enabled on Kiosk:
          </div>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            {['Hiligaynon (Ilonggo)', 'English (Standard)', 'Filipino (Tagalog)', 'Cebuano (Bisaya)'].map((lang) => (
              <label key={lang} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: '600', color: 'var(--color-text-primary)' }}>
                <input type="checkbox" defaultChecked style={{ accentColor: 'var(--color-wvsu-primary)', width: '16px', height: '16px' }} />
                <span>{lang}</span>
              </label>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
          <Button type="submit" variant="primary" size="md" style={{ width: '220px' }}>
            Save Configuration
          </Button>
        </div>
      </form>
    </div>
  );
}
