import React, { useState } from 'react';
import { useTriage } from '../../context/TriageContext';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { AlertBanner } from '../../components/common/AlertBanner';
import { Server, Wifi, Sliders, RefreshCw } from 'lucide-react';

export function FleetManager() {
  const { kiosks, settings, setSettings, pingKiosk } = useTriage();
  const [cooldown, setCooldown] = useState(settings.emergencyCooldown || 60);
  const [timeoutSec, setTimeoutSec] = useState(settings.inactivityTimeout || 45);
  const [saveBanner, setSaveBanner] = useState(false);
  const [pingingKiosks, setPingingKiosks] = useState({});

  const handlePingStation = (kioskId) => {
    setPingingKiosks((prev) => ({ ...prev, [kioskId]: true }));
    setTimeout(() => {
      pingKiosk(kioskId);
      setPingingKiosks((prev) => ({ ...prev, [kioskId]: false }));
    }, 600);
  };

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
    <div className="flex flex-col gap-6 h-full overflow-y-auto p-6 md:p-8 font-sans">
      {/* Top Header */}
      <div>
        <h1 className="text-2xl font-black text-text-primary tracking-tight">
          Kiosk Stations & Hardware Status
        </h1>
        <p className="text-xs text-text-secondary mt-0.5">
          Physical terminal health, paper roll level, and global ER check-in settings.
        </p>
      </div>

      {saveBanner && (
        <AlertBanner variant="success" title="Success">
          Station Settings Successfully Saved & Applied to All Kiosks!
        </AlertBanner>
      )}

      {/* Kiosk Hardware Telemetry Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {kiosks.map((kiosk) => (
          <Card key={kiosk.id} variant="default">
            <Card.Header
              icon={Server}
              title={kiosk.name}
              subtitle={kiosk.location}
              action={
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-brand-green border border-emerald-300 text-xs font-bold">
                  <Wifi size={13} />
                  <span>{kiosk.status}</span>
                </span>
              }
            />

            <Card.Body className="gap-4">
              {/* Hardware Metric Grid */}
              <div className="grid grid-cols-2 gap-3 bg-canvas p-4 rounded-xl border border-border-main">
                <div>
                  <div className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">
                    Thermal Printer Paper
                  </div>
                  <div className="text-sm font-black text-text-primary mt-0.5">
                    {kiosk.paperLevel}
                  </div>
                </div>

                <div>
                  <div className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">
                    Power & Uptime
                  </div>
                  <div className="text-sm font-black text-text-primary mt-0.5">
                    {kiosk.battery}
                  </div>
                </div>

                <div>
                  <div className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">
                    NFC Contactless Reader
                  </div>
                  <div className="text-sm font-black text-brand-green mt-0.5">
                    {kiosk.nfcStatus}
                  </div>
                </div>

                <div>
                  <div className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">
                    Total Intakes Today
                  </div>
                  <div className="text-sm font-black text-brand-green mt-0.5">
                    {kiosk.activeIntakesToday} registered
                  </div>
                </div>
              </div>
            </Card.Body>

            <Card.Footer className="text-xs text-text-secondary">
              <span>Heartbeat: <strong className="text-slate-700">{kiosk.lastSync}</strong></span>
              <button
                type="button"
                onClick={() => handlePingStation(kiosk.id)}
                disabled={pingingKiosks[kiosk.id]}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-blue hover:text-brand-blue/80 hover:underline cursor-pointer disabled:opacity-50"
              >
                <RefreshCw size={12} className={pingingKiosks[kiosk.id] ? 'animate-spin' : ''} />
                <span>{pingingKiosks[kiosk.id] ? 'Connecting...' : 'Check Connection'}</span>
              </button>
            </Card.Footer>
          </Card>
        ))}
      </div>

      {/* Configuration Settings Form */}
      <form onSubmit={handleSaveSettings}>
        <Card variant="default">
          <Card.Header
            icon={Sliders}
            title="Intake Kiosk Operating Parameters"
            subtitle="Global parameters applied across all active intake terminals"
          />

          <Card.Body className="gap-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Emergency Cooldown Slider */}
              <div className="bg-canvas p-4 rounded-xl border border-border-main flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-text-primary uppercase tracking-wider">
                    Emergency Request Cooldown:
                  </label>
                  <span className="text-sm font-black text-emergency font-mono">
                    {cooldown}s
                  </span>
                </div>
                <input
                  type="range"
                  min={30}
                  max={120}
                  step={10}
                  value={cooldown}
                  onChange={(e) => setCooldown(e.target.value)}
                  className="w-full accent-emergency cursor-pointer"
                />
                <div className="text-[11px] text-text-secondary">
                  Prevents duplicate/accidental assistance activations from the kiosk waiting room.
                </div>
              </div>

              {/* Inactivity Privacy Timeout */}
              <div className="bg-canvas p-4 rounded-xl border border-border-main flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-text-primary uppercase tracking-wider">
                    Inactivity Reset Timeout:
                  </label>
                  <span className="text-sm font-black text-brand-green font-mono">
                    {timeoutSec}s
                  </span>
                </div>
                <input
                  type="range"
                  min={30}
                  max={180}
                  step={15}
                  value={timeoutSec}
                  onChange={(e) => setTimeoutSec(e.target.value)}
                  className="w-full accent-brand-green cursor-pointer"
                />
                <div className="text-[11px] text-text-secondary">
                  Auto-purges session if terminal is abandoned without input to protect patient privacy.
                </div>
              </div>
            </div>

            {/* Supported Languages Toggles */}
            <div>
              <div className="text-xs font-bold text-text-primary uppercase tracking-wider mb-2.5">
                Supported Languages Enabled on Kiosk:
              </div>
              <div className="flex gap-4 flex-wrap">
                {['Hiligaynon (Ilonggo)', 'English (Standard)', 'Filipino (Tagalog)', 'Cebuano (Bisaya)'].map((lang) => (
                  <label key={lang} className="flex items-center gap-2 text-xs font-semibold text-text-primary cursor-pointer select-none">
                    <input type="checkbox" defaultChecked className="accent-brand-green w-4 h-4 rounded" />
                    <span>{lang}</span>
                  </label>
                ))}
              </div>
            </div>
          </Card.Body>

          <Card.Footer className="justify-end">
            <Button type="submit" variant="primary" size="md" className="px-6 text-xs font-bold uppercase tracking-wider">
              Save Configuration
            </Button>
          </Card.Footer>
        </Card>
      </form>
    </div>
  );
}
