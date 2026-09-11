import React, { useState } from 'react';
import { useTriage } from '../../context/TriageContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Button } from '../../components/common/Button';
import { Search, FolderArchive, ArrowUpRight, Calendar, User, Eye } from 'lucide-react';

export function PatientDirectory() {
  const { intakes, selectIntakeForDossier } = useTriage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRecord, setSelectedRecord] = useState(null);

  const filtered = intakes.filter((item) => {
    if (!searchTerm.trim()) return true;
    const q = searchTerm.toLowerCase();
    return (
      item.patientInfo?.fullName?.toLowerCase().includes(q) ||
      item.id?.toLowerCase().includes(q) ||
      item.symptoms?.some((s) => s.toLowerCase().includes(q))
    );
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', height: '100%', overflowY: 'auto', padding: '24px 32px' }}>
      {/* Title & Search Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontSize: '26px', fontWeight: '800', color: 'var(--color-text-primary)' }}>
            Emergency Patient Records & Archive
          </h1>
          <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
            Historical index of emergency department intakes and clinical triage assessments.
          </p>
        </div>

        {/* Search Input */}
        <div style={{ position: 'relative', width: '320px' }}>
          <Search size={16} color="var(--color-text-secondary)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Search patient name, ticket #, or chief complaint..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              height: '42px',
              padding: '0 14px 0 38px',
              borderRadius: 'var(--radius-md)',
              border: '1.5px solid var(--color-border)',
              fontSize: '14px',
              fontFamily: 'var(--font-family)',
              backgroundColor: 'var(--color-bg-surface)'
            }}
          />
        </div>
      </div>

      {/* Main Archive Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: selectedRecord ? '1.2fr 1fr' : '1fr', gap: '24px', alignItems: 'start' }}>
        {/* Records Table */}
        <div
          style={{
            backgroundColor: 'var(--color-bg-surface)',
            borderRadius: 'var(--radius-xl)',
            border: '1.5px solid var(--color-border)',
            boxShadow: 'var(--shadow-sm)',
            overflow: 'hidden'
          }}
        >
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr
                style={{
                  backgroundColor: 'var(--color-bg-canvas)',
                  borderBottom: '1.5px solid var(--color-border)',
                  height: '46px',
                  fontSize: '12px',
                  fontWeight: '700',
                  color: 'var(--color-text-secondary)',
                  textTransform: 'uppercase'
                }}
              >
                <th style={{ padding: '0 20px' }}>Ticket #</th>
                <th style={{ padding: '0 16px' }}>Patient Name</th>
                <th style={{ padding: '0 16px' }}>Timestamp</th>
                <th style={{ padding: '0 16px' }}>Workflow Status</th>
                <th style={{ padding: '0 16px' }}>Acuity (ESI)</th>
                <th style={{ padding: '0 20px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr
                  key={item.id}
                  style={{
                    borderBottom: '1px solid var(--color-border)',
                    height: '60px',
                    backgroundColor: selectedRecord?.id === item.id ? 'var(--color-wvsu-primary-light)' : '#FFFFFF'
                  }}
                >
                  <td style={{ padding: '0 20px', fontWeight: '700', color: 'var(--color-wvsu-primary)', fontSize: '14px' }}>
                    {item.id}
                  </td>
                  <td style={{ padding: '0 16px', fontWeight: '700', color: 'var(--color-text-primary)', fontSize: '15px' }}>
                    {item.patientInfo?.fullName}
                  </td>
                  <td style={{ padding: '0 16px', fontSize: '13px', color: 'var(--color-text-secondary)' }}>
                    {item.timestamp}
                  </td>
                  <td style={{ padding: '0 16px' }}>
                    <StatusBadge type="status" value={item.status} />
                  </td>
                  <td style={{ padding: '0 16px' }}>
                    <StatusBadge type="acuity" value={item.nurseAssessment?.assignedESI} />
                  </td>
                  <td style={{ padding: '0 20px', textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: '8px' }}>
                      <Button
                        variant="outline"
                        size="sm"
                        icon={Eye}
                        onClick={() => setSelectedRecord(item)}
                        style={{ height: '34px', padding: '0 12px' }}
                      >
                        Inspect
                      </Button>
                      <Button
                        variant="primary"
                        size="sm"
                        trailingIcon={ArrowUpRight}
                        onClick={() => selectIntakeForDossier(item.id)}
                        style={{ height: '34px', padding: '0 12px' }}
                      >
                        Triage Chart
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Selected Record Quick Preview Panel */}
        {selectedRecord && (
          <div
            className="animate-fade-in"
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
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border)', paddingBottom: '12px' }}>
              <div>
                <div style={{ fontSize: '18px', fontWeight: '800', color: 'var(--color-text-primary)' }}>
                  {selectedRecord.patientInfo?.fullName}
                </div>
                <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--color-wvsu-primary)' }}>
                  {selectedRecord.id} • {selectedRecord.timestamp}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedRecord(null)}
                style={{ background: 'none', border: 'none', fontSize: '13px', color: 'var(--color-text-secondary)', cursor: 'pointer', fontWeight: '700' }}
              >
                Close &times;
              </button>
            </div>

            <div style={{ fontSize: '14px', lineHeight: '22px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div><strong>Age / Gender:</strong> {selectedRecord.patientInfo?.age}y • {selectedRecord.patientInfo?.gender}</div>
              <div><strong>Contact:</strong> {selectedRecord.patientInfo?.contact}</div>
              <div><strong>Identification:</strong> {selectedRecord.patientInfo?.idType}</div>
              <div><strong>Symptoms:</strong> {selectedRecord.symptoms?.join(', ')}</div>
              <div><strong>Location:</strong> {selectedRecord.bodyLocations?.join(', ')}</div>
              <div><strong>Pain Score:</strong> {selectedRecord.painLevel} / 10 ({selectedRecord.duration})</div>
              <div><strong>Clinical Notes:</strong> {selectedRecord.nurseAssessment?.clinicalNotes || 'No notes added yet.'}</div>
              <div><strong>Assigned Bed:</strong> {selectedRecord.nurseAssessment?.bedDisposition}</div>
            </div>

            <Button
              variant="primary"
              size="md"
              fullWidth
              trailingIcon={ArrowUpRight}
              onClick={() => selectIntakeForDossier(selectedRecord.id)}
            >
               Open Full Patient Triage Chart
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
