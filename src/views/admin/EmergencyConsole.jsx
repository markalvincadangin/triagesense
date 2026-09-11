import React, { useState } from 'react';
import { useTriage } from '../../context/TriageContext';
import { Button } from '../../components/common/Button';
import {
  AlertTriangle,
  Clock,
  MapPin,
  CheckCircle2,
  Mic,
  Volume2,
  Send,
  Radio,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';

export function EmergencyConsole() {
  const { emergencyAlert, acknowledgeEmergency, dispatchEmergency, dismissEmergency } = useTriage();
  const [intercomConnected, setIntercomConnected] = useState(false);
  const [intercomMessage, setIntercomMessage] = useState('');
  const [sentMessages, setSentMessages] = useState([
    'Automated broadcast: "Triage staff notified. A nurse is attending."'
  ]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!intercomMessage.trim()) return;
    setSentMessages((prev) => [...prev, `Nurse Kristine: "${intercomMessage}"`]);
    setIntercomMessage('');
  };

  const isAlertActive = emergencyAlert.active;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', height: '100%', overflowY: 'auto', padding: '24px 32px' }}>
      {/* Top Title */}
      <div>
        <h1 style={{ fontSize: '26px', fontWeight: '800', color: 'var(--color-text-primary)' }}>
          Emergency Assistance Broadcast Console
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
          Real-time terminal distress dispatch monitoring & two-way kiosk intercom.
        </p>
      </div>

      {isAlertActive ? (
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '24px', alignItems: 'start' }}>
          {/* Main Emergency Alert Banner Card */}
          <div
            style={{
              backgroundColor: 'var(--color-bg-surface)',
              borderRadius: 'var(--radius-xl)',
              border: '2px solid var(--color-emergency)',
              boxShadow: 'var(--shadow-emergency)',
              overflow: 'hidden'
            }}
          >
            {/* Urgent Red Header */}
            <div
              style={{
                backgroundColor: 'var(--color-emergency)',
                color: '#FFFFFF',
                padding: '20px 28px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <AlertTriangle size={28} strokeWidth={2.5} />
                </div>

                <div>
                  <div style={{ fontSize: '20px', fontWeight: '800', letterSpacing: '0.02em' }}>
                    IMMEDIATE ASSISTANCE REQUESTED
                  </div>
                  <div style={{ fontSize: '13px', opacity: 0.9 }}>
                    Incoming alert triggered from patient kiosk terminal
                  </div>
                </div>
              </div>

              {/* Status Badge */}
              <div
                style={{
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: '#FFFFFF',
                  color: 'var(--color-emergency)',
                  fontSize: '13px',
                  fontWeight: '800',
                  textTransform: 'uppercase'
                }}
              >
                {emergencyAlert.status}
              </div>
            </div>

            {/* Alert Details Body */}
            <div style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
                <div style={{ backgroundColor: 'var(--color-bg-canvas)', padding: '16px', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ fontSize: '11px', fontWeight: '700', color: 'var(--color-text-secondary)', textTransform: 'uppercase' }}>
                    Kiosk Location
                  </div>
                  <div style={{ fontSize: '16px', fontWeight: '800', color: 'var(--color-text-primary)', marginTop: '4px' }}>
                    {emergencyAlert.kioskId}
                  </div>
                </div>

                <div style={{ backgroundColor: 'var(--color-bg-canvas)', padding: '16px', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ fontSize: '11px', fontWeight: '700', color: 'var(--color-text-secondary)', textTransform: 'uppercase' }}>
                    Trigger Timestamp
                  </div>
                  <div style={{ fontSize: '16px', fontWeight: '800', color: 'var(--color-text-primary)', marginTop: '4px' }}>
                    {emergencyAlert.timestamp || 'Just now'}
                  </div>
                </div>

                <div style={{ backgroundColor: 'var(--color-bg-canvas)', padding: '16px', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ fontSize: '11px', fontWeight: '700', color: 'var(--color-text-secondary)', textTransform: 'uppercase' }}>
                    Elapsed Time
                  </div>
                  <div style={{ fontSize: '20px', fontWeight: '900', color: 'var(--color-emergency)', marginTop: '2px' }}>
                    {emergencyAlert.elapsedSeconds} seconds
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '14px', marginTop: '10px' }}>
                {emergencyAlert.status === 'triggered' && (
                  <Button
                    variant="primary"
                    size="md"
                    fullWidth
                    icon={CheckCircle2}
                    onClick={() => acknowledgeEmergency('Nurse Kristine, RN')}
                    style={{ height: '54px', fontSize: '16px' }}
                  >
                    ACKNOWLEDGE ALERT
                  </Button>
                )}

                {emergencyAlert.status === 'acknowledged' && (
                  <Button
                    variant="emergency"
                    size="md"
                    fullWidth
                    icon={Send}
                    onClick={dispatchEmergency}
                    style={{ height: '54px', fontSize: '16px' }}
                  >
                    DISPATCH ER RESPONSE TEAM
                  </Button>
                )}

                {emergencyAlert.status === 'dispatched' && (
                  <div
                    style={{
                      width: '100%',
                      padding: '16px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--color-success-light)',
                      border: '1.5px solid var(--color-success)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <CheckCircle2 size={20} color="var(--color-success)" />
                      <span style={{ fontSize: '15px', fontWeight: '700', color: 'var(--color-success)' }}>
                        ER Team Dispatched to {emergencyAlert.kioskId}
                      </span>
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={dismissEmergency}
                      style={{ height: '36px' }}
                    >
                      Clear / Resolve Alert
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Simulated Two-Way Intercom Console */}
          <div
            style={{
              backgroundColor: 'var(--color-bg-surface)',
              borderRadius: 'var(--radius-xl)',
              border: '1.5px solid var(--color-border)',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '700', fontSize: '16px' }}>
                <Radio size={20} color="var(--color-wvsu-primary)" />
                <span>Kiosk Intercom Channel</span>
              </div>
              <button
                type="button"
                onClick={() => setIntercomConnected(!intercomConnected)}
                style={{
                  padding: '4px 12px',
                  borderRadius: 'var(--radius-full)',
                  border: 'none',
                  backgroundColor: intercomConnected ? 'var(--color-success-light)' : 'var(--color-bg-canvas)',
                  color: intercomConnected ? 'var(--color-success)' : 'var(--color-text-secondary)',
                  fontSize: '12px',
                  fontWeight: '700',
                  cursor: 'pointer'
                }}
              >
                {intercomConnected ? 'Audio Channel Active' : 'Connect Intercom'}
              </button>
            </div>

            {/* Intercom Transcript Feed */}
            <div
              style={{
                height: '180px',
                backgroundColor: 'var(--color-bg-canvas)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-border)',
                padding: '12px 16px',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                fontSize: '13px'
              }}
            >
              {sentMessages.map((msg, idx) => (
                <div key={idx} style={{ color: 'var(--color-text-primary)' }}>
                  {msg}
                </div>
              ))}
            </div>

            {/* Intercom Quick Speak Input */}
            <form onSubmit={handleSendMessage} style={{ display: 'flex', gap: '8px' }}>
              <input
                type="text"
                placeholder="Type quick announcement to kiosk..."
                value={intercomMessage}
                onChange={(e) => setIntercomMessage(e.target.value)}
                style={{
                  flex: 1,
                  height: '42px',
                  padding: '0 14px',
                  borderRadius: 'var(--radius-md)',
                  border: '1.5px solid var(--color-border)',
                  fontSize: '13px',
                  fontFamily: 'var(--font-family)'
                }}
              />
              <Button type="submit" size="sm" style={{ height: '42px', padding: '0 16px' }}>
                Speak
              </Button>
            </form>
          </div>
        </div>
      ) : (
        /* Idle Emergency System State */
        <div
          style={{
            backgroundColor: 'var(--color-bg-surface)',
            borderRadius: 'var(--radius-xl)',
            border: '1.5px solid var(--color-border)',
            padding: '60px 40px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px'
          }}
        >
          <div
            style={{
              width: '72px',
              height: '72px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--color-wvsu-primary-light)',
              color: 'var(--color-wvsu-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <ShieldCheck size={40} strokeWidth={2.2} />
          </div>

          <div>
            <h2 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--color-text-primary)' }}>
              Emergency Broadcast System Normal
            </h2>
            <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginTop: '4px', maxWidth: '520px' }}>
              No active distress alerts from Kiosk 01 or Kiosk 02. If a patient taps "Request Immediate Assistance" at any terminal, high-priority acoustic and visual alerts will immediately engage here.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
