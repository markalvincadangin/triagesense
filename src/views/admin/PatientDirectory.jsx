import React, { useState } from 'react';
import { useTriage } from '../../context/TriageContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { Search, FolderArchive, ArrowUpRight, Calendar, User, Eye, X } from 'lucide-react';

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
    <div className="flex flex-col gap-5 h-full overflow-y-auto p-6 md:p-8 font-sans">
      {/* Title & Search Bar */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-black text-text-primary tracking-tight">
            Emergency Patient Records & Archive
          </h1>
          <p className="text-xs text-text-secondary mt-0.5">
            Historical index of emergency department intakes and clinical triage assessments.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-80">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search name, ticket #, symptom..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-10 pl-9 pr-4 rounded-lg border border-border-main text-xs font-semibold bg-white focus:border-brand-green focus:outline-none shadow-2xs"
          />
        </div>
      </div>

      {/* Main Archive Grid */}
      <div className={`grid ${selectedRecord ? 'grid-cols-1 lg:grid-cols-[1.2fr_1fr]' : 'grid-cols-1'} gap-6 items-start`}>
        {/* Records Table */}
        <Card variant="default" className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-canvas border-b border-border-main text-[11px] font-bold text-text-secondary uppercase tracking-wider h-11">
                  <th className="px-5">Ticket #</th>
                  <th className="px-4">Patient Name</th>
                  <th className="px-4">Timestamp</th>
                  <th className="px-4">Workflow Status</th>
                  <th className="px-4">Acuity (ESI)</th>
                  <th className="px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-main">
                {filtered.map((item) => {
                  const isSelected = selectedRecord?.id === item.id;
                  return (
                    <tr
                      key={item.id}
                      className={`h-14 transition-colors ${
                        isSelected ? 'bg-brand-green-light' : 'bg-white hover:bg-canvas'
                      }`}
                    >
                      <td className="px-5 font-mono font-bold text-brand-green text-xs">
                        {item.id}
                      </td>
                      <td className="px-4 font-bold text-text-primary text-sm">
                        {item.patientInfo?.fullName}
                      </td>
                      <td className="px-4 text-xs text-text-secondary">
                        {item.timestamp}
                      </td>
                      <td className="px-4">
                        <StatusBadge type="status" value={item.status} />
                      </td>
                      <td className="px-4">
                        <StatusBadge type="acuity" value={item.nurseAssessment?.assignedESI} />
                      </td>
                      <td className="px-5 text-right">
                        <div className="inline-flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            icon={Eye}
                            onClick={() => setSelectedRecord(item)}
                            className="h-8 px-2.5 text-xs font-semibold"
                          >
                            Inspect
                          </Button>
                          <Button
                            variant="primary"
                            size="sm"
                            trailingIcon={ArrowUpRight}
                            onClick={() => selectIntakeForDossier(item.id)}
                            className="h-8 px-2.5 text-xs font-bold"
                          >
                            Triage Chart
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Selected Record Quick Preview Panel */}
        {selectedRecord && (
          <Card variant="highlight" className="animate-fade-in">
            <Card.Header
              title={selectedRecord.patientInfo?.fullName}
              subtitle={`${selectedRecord.id} • ${selectedRecord.timestamp}`}
              action={
                <button
                  type="button"
                  onClick={() => setSelectedRecord(null)}
                  className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all"
                >
                  <X size={16} />
                </button>
              }
            />

            <Card.Body className="gap-3 text-xs leading-relaxed text-text-primary">
              <div className="space-y-2">
                <div><span className="text-text-secondary font-bold">Age / Gender:</span> {selectedRecord.patientInfo?.age}y • {selectedRecord.patientInfo?.gender}</div>
                <div><span className="text-text-secondary font-bold">Contact:</span> {selectedRecord.patientInfo?.contact || 'None'}</div>
                <div><span className="text-text-secondary font-bold">ID Method:</span> {selectedRecord.patientInfo?.idType || 'Kiosk Self-Entry'}</div>
                <div><span className="text-text-secondary font-bold">Symptoms:</span> {selectedRecord.symptoms?.join(', ')}</div>
                <div><span className="text-text-secondary font-bold">Location:</span> {selectedRecord.bodyLocations?.join(', ')}</div>
                <div><span className="text-text-secondary font-bold">Pain Score:</span> {selectedRecord.painLevel} / 10 ({selectedRecord.duration})</div>
                <div><span className="text-text-secondary font-bold">Clinical Notes:</span> {selectedRecord.nurseAssessment?.clinicalNotes || 'No notes added yet.'}</div>
                <div><span className="text-text-secondary font-bold">Assigned Bed:</span> {selectedRecord.nurseAssessment?.bedDisposition}</div>
              </div>
            </Card.Body>

            <Card.Footer>
              <Button
                variant="primary"
                size="md"
                fullWidth
                trailingIcon={ArrowUpRight}
                onClick={() => selectIntakeForDossier(selectedRecord.id)}
                className="h-10 text-xs font-bold uppercase tracking-wider"
              >
                Open Full Patient Triage Chart
              </Button>
            </Card.Footer>
          </Card>
        )}
      </div>
    </div>
  );
}
