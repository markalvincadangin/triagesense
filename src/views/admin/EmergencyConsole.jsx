import React, { useState } from 'react';
import { useTriage } from '../../context/TriageContext';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import {
  AlertTriangle,
  CheckCircle2,
  Send,
  Radio,
  ShieldCheck
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
    <div className="flex flex-col gap-5 h-full overflow-y-auto p-6 md:p-8 font-sans">
      {/* Top Title */}
      <div>
        <h1 className="text-2xl font-black text-text-primary tracking-tight">
          Kiosk Emergency Calls & Duress Alarms
        </h1>
        <p className="text-xs text-text-secondary mt-0.5">
          Real-time patient distress calls from check-in kiosks and two-way nurse intercom.
        </p>
      </div>

      {isAlertActive ? (
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-6 items-start">
          {/* Main Emergency Alert Banner Card */}
          <Card variant="emergency">
            {/* Urgent Red Header */}
            <Card.Header
              variant="emergency"
              icon={AlertTriangle}
              title="Immediate Assistance Requested"
              subtitle="Incoming alert triggered from patient kiosk terminal"
              action={
                <span className="px-3 py-1 rounded-full bg-white text-emergency text-xs font-black uppercase tracking-wider shadow-xs">
                  {emergencyAlert.status}
                </span>
              }
            />

            {/* Alert Details Body */}
            <Card.Body className="gap-5">
              <div className="grid grid-cols-3 gap-3.5">
                <div className="bg-canvas p-4 rounded-xl border border-border-main">
                  <div className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">
                    Kiosk Location
                  </div>
                  <div className="text-base font-black text-text-primary mt-1">
                    {emergencyAlert.kioskId}
                  </div>
                </div>

                <div className="bg-canvas p-4 rounded-xl border border-border-main">
                  <div className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">
                    Trigger Timestamp
                  </div>
                  <div className="text-base font-black text-text-primary mt-1">
                    {emergencyAlert.timestamp || 'Just now'}
                  </div>
                </div>

                <div className="bg-canvas p-4 rounded-xl border border-border-main">
                  <div className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">
                    Elapsed Time
                  </div>
                  <div className="text-xl font-black text-emergency mt-0.5">
                    {emergencyAlert.elapsedSeconds}s
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2">
                {emergencyAlert.status === 'triggered' && (
                  <Button
                    variant="primary"
                    size="md"
                    fullWidth
                    icon={CheckCircle2}
                    onClick={() => acknowledgeEmergency('Nurse Kristine, RN')}
                    className="h-12 text-sm font-bold uppercase tracking-wider shadow-md"
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
                    className="h-12 text-sm font-bold uppercase tracking-wider shadow-md"
                  >
                    DISPATCH ER RESPONSE TEAM
                  </Button>
                )}

                {emergencyAlert.status === 'dispatched' && (
                  <div className="w-full p-4 rounded-xl bg-emerald-50 border border-emerald-300 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-sm font-bold text-brand-green">
                      <CheckCircle2 size={20} className="text-brand-green shrink-0" />
                      <span>ER Team Dispatched to {emergencyAlert.kioskId}</span>
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={dismissEmergency}
                      className="h-9 text-xs font-bold"
                    >
                      Clear / Resolve Alert
                    </Button>
                  </div>
                )}
              </div>
            </Card.Body>
          </Card>

          {/* Two-Way Intercom Console */}
          <Card variant="default">
            <Card.Header
              icon={Radio}
              title="Kiosk Intercom Channel"
              action={
                <button
                  type="button"
                  onClick={() => setIntercomConnected(!intercomConnected)}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all border ${
                    intercomConnected
                      ? 'bg-emerald-100 text-brand-green border-emerald-300'
                      : 'bg-canvas text-text-secondary border-border-main hover:bg-slate-100'
                  }`}
                >
                  {intercomConnected ? 'Audio Channel Active' : 'Connect Intercom'}
                </button>
              }
            />

            <Card.Body className="gap-3.5">
              {/* Intercom Transcript Feed */}
              <div className="h-44 bg-canvas rounded-xl border border-border-main p-3.5 overflow-y-auto flex flex-col gap-2 text-xs">
                {sentMessages.map((msg, idx) => (
                  <div key={idx} className="text-text-primary font-medium">
                    {msg}
                  </div>
                ))}
              </div>

              {/* Intercom Quick Speak Input */}
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Type quick announcement to kiosk..."
                  value={intercomMessage}
                  onChange={(e) => setIntercomMessage(e.target.value)}
                  className="flex-1 h-10 px-3.5 rounded-lg border border-border-main text-xs font-medium focus:border-brand-green focus:outline-none"
                />
                <Button type="submit" size="sm" className="h-10 px-4 text-xs font-bold">
                  Speak
                </Button>
              </form>
            </Card.Body>
          </Card>
        </div>
      ) : (
        /* Idle Emergency System State */
        <Card variant="default" className="py-16 px-8 items-center text-center">
          <div className="w-16 h-16 rounded-full bg-brand-green-light text-brand-green flex items-center justify-center mb-4 shadow-2xs">
            <ShieldCheck size={36} strokeWidth={2.2} />
          </div>

          <div className="max-w-md">
            <h2 className="text-lg font-extrabold text-text-primary">
              Emergency Broadcast System Normal
            </h2>
            <p className="text-xs text-text-secondary mt-1 leading-relaxed">
              No active distress alerts from Kiosk 01 or Kiosk 02. If a patient taps "Request Immediate Assistance" at any terminal, high-priority acoustic and visual alerts will immediately engage here.
            </p>
          </div>
        </Card>
      )}
    </div>
  );
}
