import React, { useState } from 'react';
import { useTriage } from '../../context/TriageContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Button } from '../../components/common/Button';
import {
  Search,
  RefreshCw,
  Clock,
  ArrowUpRight,
  Filter,
  UserPlus,
  AlertCircle
} from 'lucide-react';

export function ADM01LiveQueue() {
  const { intakes, selectIntakeForDossier, setViewMode } = useTriage();
  const [statusFilter, setStatusFilter] = useState('All');
  const [acuityFilter, setAcuityFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // KPI Metrics Calculation
  const newCount = intakes.filter((i) => i.status === 'New').length;
  const waitingCount = intakes.filter((i) => i.status === 'Waiting').length;
  const urgentCount = intakes.filter(
    (i) => i.nurseAssessment?.assignedESI === 'ESI-1' || i.nurseAssessment?.assignedESI === 'ESI-2'
  ).length;
  const completedCount = intakes.filter((i) => i.status === 'Completed').length;

  // Filtered List
  const filteredIntakes = intakes.filter((item) => {
    // Status Filter
    if (statusFilter !== 'All' && item.status !== statusFilter) return false;

    // Acuity Filter
    if (acuityFilter === 'Review Required' && item.nurseAssessment?.assignedESI) return false;
    if (acuityFilter.startsWith('ESI-') && item.nurseAssessment?.assignedESI !== acuityFilter) return false;

    // Search Query
    if (searchQuery.trim().length > 0) {
      const q = searchQuery.toLowerCase();
      const matchName = item.patientInfo?.fullName?.toLowerCase().includes(q);
      const matchId = item.id?.toLowerCase().includes(q);
      const matchComplaint = item.symptoms?.some((s) => s.toLowerCase().includes(q));
      if (!matchName && !matchId && !matchComplaint) return false;
    }

    return true;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', height: '100%', overflowY: 'auto', padding: '24px 32px' }}>
      {/* Top Title Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontSize: '26px', fontWeight: '800', color: 'var(--color-text-primary)' }}>
            Live Emergency Triage Queue
          </h1>
          <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
            Real-time incoming intake registry from patient self-service kiosks.
          </p>
        </div>
      </div>

      {/* KPI Cards Ribbon */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
        {/* Card 1: New Intake */}
        <div
          style={{
            backgroundColor: 'var(--color-bg-surface)',
            padding: '20px 22px',
            borderRadius: 'var(--radius-lg)',
            border: '1.5px solid var(--color-border)',
            boxShadow: 'var(--shadow-sm)',
            borderLeft: '5px solid #0057A8'
          }}
        >
          <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--color-text-secondary)', textTransform: 'uppercase' }}>
            New Intakes
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '6px' }}>
            <span style={{ fontSize: '32px', fontWeight: '800', color: 'var(--color-text-primary)' }}>
              {newCount}
            </span>
            <span style={{ fontSize: '12px', fontWeight: '600', color: '#0057A8' }}>
              Requires Nurse Review
            </span>
          </div>
        </div>

        {/* Card 2: Waiting for Triage */}
        <div
          style={{
            backgroundColor: 'var(--color-bg-surface)',
            padding: '20px 22px',
            borderRadius: 'var(--radius-lg)',
            border: '1.5px solid var(--color-border)',
            boxShadow: 'var(--shadow-sm)',
            borderLeft: '5px solid #D97706'
          }}
        >
          <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--color-text-secondary)', textTransform: 'uppercase' }}>
            Waiting in Lounge
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '6px' }}>
            <span style={{ fontSize: '32px', fontWeight: '800', color: 'var(--color-text-primary)' }}>
              {waitingCount}
            </span>
            <span style={{ fontSize: '12px', fontWeight: '600', color: '#D97706' }}>
              Pending Assessment
            </span>
          </div>
        </div>

        {/* Card 3: Urgent Cases */}
        <div
          style={{
            backgroundColor: 'var(--color-bg-surface)',
            padding: '20px 22px',
            borderRadius: 'var(--radius-lg)',
            border: '1.5px solid var(--color-border)',
            boxShadow: 'var(--shadow-sm)',
            borderLeft: '5px solid #DC2626'
          }}
        >
          <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--color-text-secondary)', textTransform: 'uppercase' }}>
            Urgent Cases (ESI-1 / ESI-2)*
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '6px' }}>
            <span style={{ fontSize: '32px', fontWeight: '800', color: 'var(--color-text-primary)' }}>
              {urgentCount}
            </span>
            <span style={{ fontSize: '12px', fontWeight: '600', color: '#DC2626' }}>
              Clinician Assigned
            </span>
          </div>
        </div>

        {/* Card 4: Completed */}
        <div
          style={{
            backgroundColor: 'var(--color-bg-surface)',
            padding: '20px 22px',
            borderRadius: 'var(--radius-lg)',
            border: '1.5px solid var(--color-border)',
            boxShadow: 'var(--shadow-sm)',
            borderLeft: '5px solid #16803C'
          }}
        >
          <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--color-text-secondary)', textTransform: 'uppercase' }}>
            Completed Triage
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '6px' }}>
            <span style={{ fontSize: '32px', fontWeight: '800', color: 'var(--color-text-primary)' }}>
              {completedCount}
            </span>
            <span style={{ fontSize: '12px', fontWeight: '600', color: '#16803C' }}>
              Disposition Set
            </span>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          backgroundColor: 'var(--color-bg-surface)',
          padding: '14px 20px',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--color-border)'
        }}
      >
        {/* Status Segmented Tabs */}
        <div style={{ display: 'flex', gap: '6px', backgroundColor: 'var(--color-bg-canvas)', padding: '4px', borderRadius: 'var(--radius-md)' }}>
          {['All', 'New', 'Waiting', 'In Triage', 'Completed'].map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setStatusFilter(st)}
              style={{
                padding: '6px 14px',
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                backgroundColor: statusFilter === st ? '#FFFFFF' : 'transparent',
                color: statusFilter === st ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                fontWeight: statusFilter === st ? '700' : '500',
                fontSize: '13px',
                cursor: 'pointer',
                boxShadow: statusFilter === st ? 'var(--shadow-sm)' : 'none'
              }}
            >
              {st === 'All' ? 'All Queue' : st}
            </button>
          ))}
        </div>

        {/* Clinician-Assigned Acuity Filter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--color-text-secondary)' }}>
            Acuity:
          </span>
          <select
            value={acuityFilter}
            onChange={(e) => setAcuityFilter(e.target.value)}
            style={{
              padding: '6px 12px',
              borderRadius: 'var(--radius-sm)',
              border: '1.5px solid var(--color-border)',
              fontSize: '13px',
              fontWeight: '600',
              color: 'var(--color-text-primary)',
              backgroundColor: '#FFFFFF'
            }}
          >
            <option value="All">All Acuities</option>
            <option value="Review Required">Needs Nurse Review</option>
            <option value="ESI-1">ESI-1 Resuscitation</option>
            <option value="ESI-2">ESI-2 Emergent</option>
            <option value="ESI-3">ESI-3 Urgent</option>
            <option value="ESI-4">ESI-4 Less Urgent</option>
            <option value="ESI-5">ESI-5 Non-Urgent</option>
          </select>
        </div>

        {/* Search Field */}
        <div style={{ position: 'relative', width: '280px' }}>
          <Search
            size={16}
            color="var(--color-text-secondary)"
            style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}
          />
          <input
            type="text"
            placeholder="Search name, token #, symptom..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              height: '36px',
              padding: '0 12px 0 36px',
              borderRadius: 'var(--radius-md)',
              border: '1.5px solid var(--color-border)',
              fontSize: '13px',
              fontFamily: 'var(--font-family)',
              backgroundColor: 'var(--color-bg-canvas)'
            }}
          />
        </div>
      </div>

      {/* Live Triage Queue Table */}
      <div
        style={{
          backgroundColor: 'var(--color-bg-surface)',
          borderRadius: 'var(--radius-lg)',
          border: '1.5px solid var(--color-border)',
          boxShadow: 'var(--shadow-sm)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
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
                textTransform: 'uppercase',
                letterSpacing: '0.04em'
              }}
            >
              <th style={{ padding: '0 20px' }}>Acuity (Nurse-Assigned)</th>
              <th style={{ padding: '0 16px' }}>Token #</th>
              <th style={{ padding: '0 16px' }}>Patient</th>
              <th style={{ padding: '0 16px' }}>Chief Complaint</th>
              <th style={{ padding: '0 16px' }}>Pain (0–10)</th>
              <th style={{ padding: '0 16px' }}>Wait Time</th>
              <th style={{ padding: '0 16px' }}>Workflow Status</th>
              <th style={{ padding: '0 20px', textAlign: 'right' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredIntakes.length > 0 ? (
              filteredIntakes.map((intake) => (
                <tr
                  key={intake.id}
                  style={{
                    borderBottom: '1px solid var(--color-border)',
                    height: '68px',
                    transition: 'background-color 0.15s',
                    backgroundColor: intake.status === 'New' ? '#F0F9FF' : '#FFFFFF'
                  }}
                >
                  {/* Acuity */}
                  <td style={{ padding: '0 20px' }}>
                    <StatusBadge
                      type="acuity"
                      value={intake.nurseAssessment?.assignedESI}
                    />
                  </td>

                  {/* Token Reference */}
                  <td style={{ padding: '0 16px', fontWeight: '700', color: 'var(--color-wvsu-primary)', fontSize: '14px' }}>
                    {intake.id}
                  </td>

                  {/* Patient Name & Age */}
                  <td style={{ padding: '0 16px' }}>
                    <div style={{ fontWeight: '700', color: 'var(--color-text-primary)', fontSize: '15px' }}>
                      {intake.patientInfo?.fullName}
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
                      {intake.patientInfo?.age ? `${intake.patientInfo.age}y • ` : ''}{intake.patientInfo?.gender} • {intake.language}
                    </div>
                  </td>

                  {/* Chief Complaint */}
                  <td style={{ padding: '0 16px', maxWidth: '300px' }}>
                    <div style={{ fontWeight: '600', color: 'var(--color-text-primary)', fontSize: '14px' }}>
                      {intake.symptoms?.join(', ') || 'Unspecified'}
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginTop: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      Loc: {intake.bodyLocations?.join(', ')} • {intake.duration}
                    </div>
                  </td>

                  {/* Pain Score */}
                  <td style={{ padding: '0 16px' }}>
                    <span
                      style={{
                        display: 'inline-block',
                        padding: '3px 10px',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '13px',
                        fontWeight: '800',
                        backgroundColor:
                          intake.painLevel >= 8
                            ? '#FEE2E2'
                            : intake.painLevel >= 6
                            ? '#FFEDD5'
                            : intake.painLevel >= 3
                            ? '#FEF3C7'
                            : '#DCFCE7',
                        color:
                          intake.painLevel >= 8
                            ? '#B91C1C'
                            : intake.painLevel >= 6
                            ? '#C2410C'
                            : intake.painLevel >= 3
                            ? '#B45309'
                            : '#15803D'
                      }}
                    >
                      {intake.painLevel} / 10
                    </span>
                  </td>

                  {/* Wait Time */}
                  <td style={{ padding: '0 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: '600', color: 'var(--color-text-secondary)' }}>
                      <Clock size={14} />
                      <span>{intake.timestamp}</span>
                    </div>
                  </td>

                  {/* Workflow Status */}
                  <td style={{ padding: '0 16px' }}>
                    <StatusBadge type="status" value={intake.status} />
                  </td>

                  {/* Action */}
                  <td style={{ padding: '0 20px', textAlign: 'right' }}>
                    <Button
                      variant="primary"
                      size="sm"
                      trailingIcon={ArrowUpRight}
                      onClick={() => selectIntakeForDossier(intake.id)}
                      style={{ height: '36px', padding: '0 16px', fontSize: '13px' }}
                    >
                      OPEN
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} style={{ textAlign: 'center', padding: '40px', color: 'var(--color-text-secondary)' }}>
                  No intakes matching the selected status and acuity filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Table Footer */}
        <div
          style={{
            padding: '12px 20px',
            backgroundColor: 'var(--color-bg-canvas)',
            borderTop: '1px solid var(--color-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '13px',
            color: 'var(--color-text-secondary)'
          }}
        >
          <div>Showing {filteredIntakes.length} of {intakes.length} patient records in queue</div>
          <div style={{ fontStyle: 'italic', fontSize: '12px' }}>
            *Fictional illustrative demo data for academic evaluation in CIT 213
          </div>
        </div>
      </div>
    </div>
  );
}
