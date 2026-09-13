import React from 'react';
import { useTriage } from '../../context/TriageContext';
import { Card } from '../../components/common/Card';
import { StatCard } from '../../components/common/StatCard';
import { AlertBanner } from '../../components/common/AlertBanner';
import { BarChart3, Clock, TrendingUp, Users, Globe, Info, Activity } from 'lucide-react';

const COMPLAINT_COLOR_CLASSES = {
  'Chest Pain / Cardiac': 'bg-emergency',
  'Respiratory / Dyspnea': 'bg-orange-500',
  'Abdominal / Gastro': 'bg-amber-500',
  'Trauma & Lacerations': 'bg-brand-blue',
  'Fever & Infectious': 'bg-brand-green',
};

export function OperationalAnalytics() {
  const { analytics } = useTriage();

  return (
    <div className="flex flex-col gap-6 h-full overflow-y-auto p-6 md:p-8 font-sans">
      {/* Top Header */}
      <div>
        <h1 className="text-2xl font-black text-text-primary tracking-tight">
          ED Census, Flow & Triage Analytics
        </h1>
        <p className="text-xs text-text-secondary mt-0.5">
          Patient flow metrics, arrival patterns, and regional dialect usage across the emergency department.
        </p>
      </div>

      {/* Prominent Illustrative Demo Data Banner */}
      <AlertBanner variant="warning" icon={Info} title="Academic Prototype Notice">
        All figures, Door-to-Triage (DTT) benchmarks, surge heatmaps, and dialect distribution percentages are <strong>illustrative simulated demo datasets</strong> for CIT 213 HCI 2 evaluation. They do not represent official clinical findings of WVSU Medical Center.
      </AlertBanner>

      {/* Key Metric Ribbon using reusable StatCard components */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Avg Door-to-Triage (DTT)*"
          value={analytics.averageDoorToTriage}
          subtext="Target benchmark: under 5.0 minutes"
          icon={Clock}
          variant="success"
          size="lg"
        />

        <StatCard
          label="Throughput Acceleration*"
          value={`+${analytics.triageAcceleration}`}
          subtext="Vs manual paper intake registration"
          icon={TrendingUp}
          variant="default"
          size="lg"
        />

        <StatCard
          label="Total Kiosk Intakes Today*"
          value={analytics.totalIntakesToday}
          subtext="Across Kiosk 01 & Kiosk 02"
          icon={Users}
          variant="default"
          size="lg"
        />

        <StatCard
          label="High Urgency Proportion*"
          value={analytics.highAcuityProportion}
          subtext="Nurse-confirmed ESI-1 & ESI-2 cases"
          icon={Activity}
          variant="emergency"
          size="lg"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Chief Complaint Distribution Chart */}
        <Card variant="default">
          <Card.Header
            icon={BarChart3}
            title="Presenting Chief Complaints (Sample Breakdown)*"
          />

          <Card.Body className="gap-3.5">
            {analytics.chiefComplaints.map((item) => (
              <div key={item.name} className="flex flex-col gap-1">
                <div className="flex justify-between text-xs font-semibold text-text-primary">
                  <span>{item.name}</span>
                  <span className="font-bold">{item.count} pts ({item.percent})</span>
                </div>
                <div className="h-2.5 bg-canvas rounded-full overflow-hidden border border-border-main/50">
                  <div
                    className={`h-full rounded-full transition-all ${COMPLAINT_COLOR_CLASSES[item.name] || 'bg-brand-green'}`}
                    style={{ width: item.percent }}
                  />
                </div>
              </div>
            ))}
          </Card.Body>
        </Card>

        {/* Regional Dialect Utilization */}
        <Card variant="default">
          <Card.Header
            icon={Globe}
            title="Language & Regional Dialect Utilization*"
          />

          <Card.Body className="gap-3.5">
            {analytics.languageUtilization.map((lang) => (
              <div key={lang.dialect} className="flex flex-col gap-1">
                <div className="flex justify-between text-xs font-semibold text-text-primary">
                  <span>{lang.dialect}</span>
                  <span className="font-bold">{lang.count} users ({lang.percent})</span>
                </div>
                <div className="h-2.5 bg-canvas rounded-full overflow-hidden border border-border-main/50">
                  <div
                    className="h-full bg-brand-green rounded-full transition-all"
                    style={{ width: lang.percent }}
                  />
                </div>
              </div>
            ))}
          </Card.Body>
        </Card>
      </div>

      {/* Hourly Arrival Surge Heatmap */}
      <Card variant="default">
        <Card.Header
          icon={Activity}
          title="Simulated Hourly Arrival Surge Heatmap (8:00 AM – 8:00 PM)*"
          subtitle="Hourly intake volume showing peak afternoon rush"
        />

        <Card.Body>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
            {analytics.hourlySurge.map((surge) => {
              const intensityBorder =
                surge.count >= 16
                  ? 'border-red-400 bg-red-50/50 text-red-600'
                  : surge.count >= 12
                  ? 'border-orange-400 bg-orange-50/50 text-orange-600'
                  : surge.count >= 8
                  ? 'border-amber-400 bg-amber-50/50 text-amber-600'
                  : 'border-emerald-300 bg-emerald-50/50 text-emerald-600';

              return (
                <div
                  key={surge.hour}
                  className={`p-3.5 rounded-xl text-center border-2 transition-all flex flex-col justify-center ${intensityBorder}`}
                >
                  <div className="text-xs font-bold text-text-secondary">
                    {surge.hour}
                  </div>
                  <div className="text-2xl font-black mt-1 font-mono">
                    {surge.count}
                  </div>
                  <div className="text-[10px] font-medium text-text-secondary mt-0.5">
                    Intakes / hr
                  </div>
                </div>
              );
            })}
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
