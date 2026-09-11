import React from 'react';
import { useTriage } from '../../context/TriageContext';
import { BarChart3, Clock, TrendingUp, Users, Globe, Info, Activity } from 'lucide-react';

export function OperationalAnalytics() {
  const { analytics } = useTriage();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', height: '100%', overflowY: 'auto', padding: '24px 32px' }}>
      {/* Top Header */}
      <div>
        <h1 style={{ fontSize: '26px', fontWeight: '800', color: 'var(--color-text-primary)' }}>
          ED Operational Intelligence & Triage Analytics
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
          Throughput acceleration metrics, arrival surge models, and regional dialect utilization.
        </p>
      </div>

      {/* Prominent Illustrative Demo Data Banner */}
      <div
        style={{
          padding: '12px 20px',
          borderRadius: 'var(--radius-md)',
          backgroundColor: 'var(--color-wvsu-gold-light)',
          border: '1.5px solid var(--color-wvsu-gold)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          fontSize: '13px',
          fontWeight: '600',
          color: 'var(--color-text-primary)'
        }}
      >
        <Info size={18} color="var(--color-wvsu-gold)" style={{ flexShrink: 0 }} />
        <span>
          <strong>Academic Prototype Notice</strong>: All figures, Door-to-Triage (DTT) benchmarks, surge heatmaps, and dialect distribution percentages are <strong>illustrative simulated demo datasets</strong> for CIT 213 HCI 2 evaluation. They do not represent official clinical findings of WVSU Medical Center.
        </span>
      </div>

      {/* Key Metric Ribbon */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
        <div style={{ backgroundColor: 'var(--color-bg-surface)', padding: '20px', borderRadius: 'var(--radius-lg)', border: '1.5px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: '700', color: 'var(--color-text-secondary)', textTransform: 'uppercase' }}>
            <Clock size={16} color="var(--color-wvsu-primary)" />
            <span>Avg Door-to-Triage (DTT)*</span>
          </div>
          <div style={{ fontSize: '32px', fontWeight: '900', color: 'var(--color-wvsu-primary)', marginTop: '8px' }}>
            {analytics.averageDoorToTriage}
          </div>
          <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
            Target benchmark: &lt; 5.0 minutes
          </div>
        </div>

        <div style={{ backgroundColor: 'var(--color-bg-surface)', padding: '20px', borderRadius: 'var(--radius-lg)', border: '1.5px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: '700', color: 'var(--color-text-secondary)', textTransform: 'uppercase' }}>
            <TrendingUp size={16} color="#0057A8" />
            <span>Throughput Acceleration*</span>
          </div>
          <div style={{ fontSize: '32px', fontWeight: '900', color: '#0057A8', marginTop: '8px' }}>
            +{analytics.triageAcceleration}
          </div>
          <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
            Vs manual paper intake registration
          </div>
        </div>

        <div style={{ backgroundColor: 'var(--color-bg-surface)', padding: '20px', borderRadius: 'var(--radius-lg)', border: '1.5px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: '700', color: 'var(--color-text-secondary)', textTransform: 'uppercase' }}>
            <Users size={16} color="#7C3AED" />
            <span>Total Kiosk Intakes Today*</span>
          </div>
          <div style={{ fontSize: '32px', fontWeight: '900', color: '#7C3AED', marginTop: '8px' }}>
            {analytics.totalIntakesToday}
          </div>
          <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
            Across Kiosk 01 & Kiosk 02
          </div>
        </div>

        <div style={{ backgroundColor: 'var(--color-bg-surface)', padding: '20px', borderRadius: 'var(--radius-lg)', border: '1.5px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: '700', color: 'var(--color-text-secondary)', textTransform: 'uppercase' }}>
            <Activity size={16} color="#DC2626" />
            <span>High Urgency Proportion*</span>
          </div>
          <div style={{ fontSize: '32px', fontWeight: '900', color: '#DC2626', marginTop: '8px' }}>
            {analytics.highAcuityProportion}
          </div>
          <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
            Nurse-confirmed ESI-1 & ESI-2 cases
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
        {/* Chief Complaint Distribution Chart */}
        <div style={{ backgroundColor: 'var(--color-bg-surface)', padding: '24px', borderRadius: 'var(--radius-xl)', border: '1.5px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ fontSize: '16px', fontWeight: '800', color: 'var(--color-text-primary)', marginBottom: '16px' }}>
            Presenting Chief Complaints (Sample Breakdown)*
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {analytics.chiefComplaints.map((item) => (
              <div key={item.name}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: '600', marginBottom: '4px' }}>
                  <span>{item.name}</span>
                  <span style={{ fontWeight: '700' }}>{item.count} pts ({item.percent})</span>
                </div>
                <div style={{ height: '10px', backgroundColor: 'var(--color-bg-canvas)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                  <div style={{ width: item.percent, height: '100%', backgroundColor: item.color, borderRadius: 'var(--radius-full)' }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Regional Dialect Utilization */}
        <div style={{ backgroundColor: 'var(--color-bg-surface)', padding: '24px', borderRadius: 'var(--radius-xl)', border: '1.5px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ fontSize: '16px', fontWeight: '800', color: 'var(--color-text-primary)', marginBottom: '16px' }}>
            Language & Regional Dialect Utilization*
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {analytics.languageUtilization.map((lang) => (
              <div key={lang.dialect}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: '600', marginBottom: '4px' }}>
                  <span>{lang.dialect}</span>
                  <span style={{ fontWeight: '700' }}>{lang.count} users ({lang.percent})</span>
                </div>
                <div style={{ height: '10px', backgroundColor: 'var(--color-bg-canvas)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                  <div style={{ width: lang.percent, height: '100%', backgroundColor: 'var(--color-wvsu-primary)', borderRadius: 'var(--radius-full)' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Hourly Arrival Surge Heatmap */}
      <div style={{ backgroundColor: 'var(--color-bg-surface)', padding: '24px', borderRadius: 'var(--radius-xl)', border: '1.5px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
        <div style={{ fontSize: '16px', fontWeight: '800', color: 'var(--color-text-primary)', marginBottom: '14px' }}>
          Simulated Hourly Arrival Surge Heatmap (8:00 AM – 8:00 PM)*
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '12px' }}>
          {analytics.hourlySurge.map((surge) => {
            const intensity = surge.count >= 16 ? '#DC2626' : surge.count >= 12 ? '#F97316' : surge.count >= 8 ? '#F59E0B' : '#10B981';

            return (
              <div
                key={surge.hour}
                style={{
                  backgroundColor: 'var(--color-bg-canvas)',
                  padding: '16px',
                  borderRadius: 'var(--radius-md)',
                  textAlign: 'center',
                  border: `2px solid ${intensity}40`
                }}
              >
                <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--color-text-secondary)' }}>
                  {surge.hour}
                </div>
                <div style={{ fontSize: '24px', fontWeight: '900', color: intensity, marginTop: '4px' }}>
                  {surge.count}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
                  Intakes / hr
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
