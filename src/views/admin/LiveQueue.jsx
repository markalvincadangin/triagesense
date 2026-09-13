import React, { useState } from 'react';
import { useTriage } from '../../context/TriageContext';
import { RECENT_ACTIVITIES } from '../../data/demoData';
import {
  Users,
  Clock,
  Bed,
  CheckCircle2,
  Search,
  ChevronRight,
  ChevronLeft,
  AlertTriangle,
  Info,
  FolderArchive,
  BarChart3,
  Server,
  Star,
  Activity,
  Layers,
  Sparkles
} from 'lucide-react';

export function LiveQueue() {
  const { intakes, selectIntakeForDossier, setActiveAdminTab, emergencyAlert } = useTriage();
  const [statusFilter, setStatusFilter] = useState('All');
  const [esiFilter, setEsiFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showRightRail, setShowRightRail] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // KPI Calculations
  const totalIntakes = intakes.length;
  const waitingCount = intakes.filter((i) => i.status === 'Waiting' || i.status === 'New').length;
  const inTriageCount = intakes.filter((i) => i.status === 'In Triage').length;
  const completedCount = intakes.filter((i) => i.status === 'Completed').length;

  // Filter Pipeline
  const filteredIntakes = intakes.filter((item) => {
    // Status Filter
    if (statusFilter !== 'All' && item.status !== statusFilter) return false;

    // ESI Filter
    if (esiFilter !== 'All') {
      if (item.nurseAssessment?.assignedESI !== esiFilter) return false;
    }

    // Search Query (Name, Token, Symptoms, Language)
    if (searchQuery.trim().length > 0) {
      const q = searchQuery.toLowerCase();
      const matchName = item.patientInfo?.fullName?.toLowerCase().includes(q);
      const matchToken = item.id?.toLowerCase().includes(q);
      const matchSymptoms = item.symptoms?.some((s) => s.toLowerCase().includes(q));
      const matchLang = item.language?.toLowerCase().includes(q);
      if (!matchName && !matchToken && !matchSymptoms && !matchLang) return false;
    }

    return true;
  });

  // Pagination
  const totalPages = Math.ceil(filteredIntakes.length / itemsPerPage) || 1;
  const paginatedIntakes = filteredIntakes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Status Badge Helper
  const renderStatusBadge = (status) => {
    switch (status) {
      case 'In Triage':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200">
            <Bed size={12} />
            <span>In Triage</span>
          </span>
        );
      case 'Waiting':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            <Star size={11} className="fill-amber-500 text-amber-500" />
            <span>Waiting</span>
          </span>
        );
      case 'New':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-sky-50 text-sky-700 border border-sky-200">
            <Activity size={12} />
            <span>New</span>
          </span>
        );
      case 'Completed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 size={12} />
            <span>Completed</span>
          </span>
        );
      default:
        return <span className="text-xs text-slate-600">{status}</span>;
    }
  };

  // Pain Pill Helper
  const renderPainBadge = (level) => {
    const p = level || 0;
    let bg = 'bg-emerald-50 text-emerald-700 border-emerald-200';
    if (p >= 8) bg = 'bg-red-50 text-red-700 border-red-200';
    else if (p >= 7) bg = 'bg-orange-50 text-orange-700 border-orange-200';
    else if (p >= 5) bg = 'bg-amber-50 text-amber-700 border-amber-200';

    return (
      <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold border ${bg}`}>
        {p}/10
      </span>
    );
  };

  // ESI Badge Helper
  const renderEsiBadge = (esi) => {
    if (!esi) {
      return (
        <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-500 border border-slate-200">
          Pending Nurse Exam
        </span>
      );
    }
    switch (esi) {
      case 'ESI-1':
        return (
          <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-800 border border-red-300">
            ESI-1
          </span>
        );
      case 'ESI-2':
        return (
          <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold bg-orange-100 text-orange-800 border border-orange-300">
            ESI-2
          </span>
        );
      case 'ESI-3':
        return (
          <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">
            ESI-3
          </span>
        );
      case 'ESI-4':
        return (
          <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold bg-sky-100 text-sky-800 border border-sky-300">
            ESI-4
          </span>
        );
      case 'ESI-5':
        return (
          <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
            ESI-5
          </span>
        );
      default:
        return <span className="text-xs font-bold text-slate-600">{esi}</span>;
    }
  };

  return (
    <div className="h-full overflow-y-auto bg-canvas p-6 flex flex-col gap-5 select-none font-sans">
      {/* Top Title Bar */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[24px] font-extrabold text-slate-900 tracking-tight leading-tight">
            Live Emergency Triage Queue
          </h1>
          <p className="text-[13px] text-slate-500 mt-0.5">
            Real-time patient registrations and clinical nurse assessments.
          </p>
        </div>

        {/* View Layout Toggle (Toggle Right Rail for Full Width Inspo 2 vs Dual Rail Inspo 1) */}
        <button
          type="button"
          onClick={() => setShowRightRail(!showRightRail)}
          className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-xs transition-colors"
          title="Toggle Operational Side Panel"
        >
          <Layers size={14} />
          <span>{showRightRail ? 'Expand Full Table' : 'Show Activity Rail'}</span>
        </button>
      </div>

      {/* 4 Stat Metric KPI Cards in a Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Patients Registered */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
            <Users size={24} strokeWidth={2.2} />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-500">Patients Registered</div>
            <div className="text-2xl font-black text-slate-900 leading-tight">
              {totalIntakes}
            </div>
            <div className="text-[11px] font-bold text-emerald-600 flex items-center gap-1 mt-0.5">
              <span>↑ 2 today</span>
            </div>
          </div>
        </div>

        {/* Card 2: Waiting for Triage */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <Clock size={24} strokeWidth={2.2} />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-500">Waiting for Triage</div>
            <div className="text-2xl font-black text-slate-900 leading-tight">
              {waitingCount}
            </div>
            <div className="text-[11px] font-bold text-emerald-600 flex items-center gap-1 mt-0.5">
              <span>↑ 1</span>
            </div>
          </div>
        </div>

        {/* Card 3: Under Assessment */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Bed size={24} strokeWidth={2.2} />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-500">Under Assessment</div>
            <div className="text-2xl font-black text-slate-900 leading-tight">
              {inTriageCount}
            </div>
            <div className="text-[11px] font-bold text-emerald-600 flex items-center gap-1 mt-0.5">
              <span>↑ 2</span>
            </div>
          </div>
        </div>

        {/* Card 4: Triage Completed */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <CheckCircle2 size={24} strokeWidth={2.2} />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-500">Completed</div>
            <div className="text-2xl font-black text-slate-900 leading-tight">
              {completedCount}
            </div>
            <div className="text-[11px] font-bold text-emerald-600 flex items-center gap-1 mt-0.5">
              <span>↑ 1</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Ribbon: Status Pills + ESI Filter + Search */}
      <div className="bg-white rounded-2xl p-3.5 border border-slate-100 shadow-xs flex flex-wrap items-center justify-between gap-4">
        {/* Left: Workflow Status Segmented Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {['All', 'New', 'Waiting', 'In Triage', 'Completed'].map((tab) => {
            const isActive = statusFilter === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => {
                  setStatusFilter(tab);
                  setCurrentPage(1);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-150 ${
                  isActive
                    ? 'bg-brand-green text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Center: ESI Acuity Filter Pills */}
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-bold text-slate-400 mr-1">ESI Filter</span>
          {['ESI-1', 'ESI-2', 'ESI-3', 'ESI-4', 'ESI-5'].map((esi) => {
            const isSelected = esiFilter === esi;
            let colorCls = 'text-slate-600 border-slate-200';
            if (esi === 'ESI-1') colorCls = isSelected ? 'bg-red-600 text-white border-red-600' : 'text-red-700 bg-red-50 border-red-200';
            else if (esi === 'ESI-2') colorCls = isSelected ? 'bg-orange-500 text-white border-orange-500' : 'text-orange-700 bg-orange-50 border-orange-200';
            else if (esi === 'ESI-3') colorCls = isSelected ? 'bg-amber-500 text-white border-amber-500' : 'text-amber-700 bg-amber-50 border-amber-200';
            else if (esi === 'ESI-4') colorCls = isSelected ? 'bg-blue-600 text-white border-blue-600' : 'text-blue-700 bg-blue-50 border-blue-200';
            else if (esi === 'ESI-5') colorCls = isSelected ? 'bg-emerald-600 text-white border-emerald-600' : 'text-emerald-700 bg-emerald-50 border-emerald-200';

            return (
              <button
                key={esi}
                type="button"
                onClick={() => {
                  setEsiFilter(isSelected ? 'All' : esi);
                  setCurrentPage(1);
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition-colors ${colorCls}`}
              >
                {esi}
              </button>
            );
          })}
        </div>

        {/* Right: Search Input */}
        <div className="relative min-w-[240px]">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search patient name, ticket #, or symptoms..."
            className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
          />
        </div>
      </div>

      {/* Main Content Area: Table (Left) + Right Operational Rail (Right) */}
      <div className="flex gap-5 items-start">
        {/* Left Column: Live Queue Table */}
        <div className="flex-1 bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/70 text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">
                  <th className="py-3.5 px-4 text-center w-12">#</th>
                  <th className="py-3.5 px-4 w-20">Time</th>
                  <th className="py-3.5 px-4 w-32">Ticket #</th>
                  <th className="py-3.5 px-4">Patient</th>
                  <th className="py-3.5 px-4">Chief Complaint</th>
                  <th className="py-3.5 px-4 text-center w-24">Pain</th>
                  <th className="py-3.5 px-4 w-28">Wait Time</th>
                  <th className="py-3.5 px-4 w-32">Status</th>
                  <th className="py-3.5 px-4 text-center w-24">ESI</th>
                  <th className="py-3.5 px-4 text-right w-24">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {paginatedIntakes.length > 0 ? (
                  paginatedIntakes.map((item, idx) => {
                    const rowNumber = (currentPage - 1) * itemsPerPage + idx + 1;
                    const patient = item.patientInfo || {};
                    const symptomsStr = (item.symptoms || []).join(', ');
                    const locationStr = (item.bodyLocations || []).join(', ');

                    return (
                      <tr
                        key={item.id}
                        className="hover:bg-emerald-50/30 transition-colors group cursor-pointer"
                        onClick={() => selectIntakeForDossier(item.id)}
                      >
                        {/* Sequence Number */}
                        <td className="py-4 px-4 text-center font-bold text-slate-400">
                          {rowNumber}
                        </td>

                        {/* Arrival Time */}
                        <td className="py-4 px-4 font-semibold text-slate-600 whitespace-nowrap">
                          {item.timestamp}
                        </td>

                        {/* Ticket Identifier */}
                        <td className="py-4 px-4 whitespace-nowrap">
                          <span className="font-mono font-bold text-emerald-700">
                            {item.id}
                          </span>
                        </td>

                        {/* Patient Demographics */}
                        <td className="py-4 px-4">
                          <div className="font-bold text-slate-900 text-[13px]">
                            {patient.fullName || 'Patient Intake'}
                          </div>
                          <div className="text-[11px] text-slate-600 font-medium mt-0.5">
                            {patient.age ? `${patient.age}y` : ''}
                            {patient.gender ? ` • ${patient.gender}` : ''}
                            {item.language ? ` • ${item.language}` : ''}
                          </div>
                        </td>

                        {/* Chief Complaint */}
                        <td className="py-4 px-4 max-w-[260px]">
                          <div className="font-black text-slate-950 text-[13px] tracking-tight leading-snug truncate" title={symptomsStr}>
                            {symptomsStr || 'Subjective complaints'}
                          </div>
                          <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                            {locationStr && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 text-slate-800 font-bold text-[10.5px] border border-slate-300 shadow-2xs">
                                <span className="text-slate-500 uppercase text-[9px] font-black tracking-wider">Loc</span>
                                <span>{locationStr}</span>
                              </span>
                            )}
                            {item.duration && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 text-slate-800 font-bold text-[10.5px] border border-slate-300 shadow-2xs">
                                <span className="text-slate-500 uppercase text-[9px] font-black tracking-wider">Dur</span>
                                <span>{item.duration}</span>
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Pain Score */}
                        <td className="py-4 px-4 text-center">
                          {renderPainBadge(item.painLevel)}
                        </td>

                        {/* Wait Time */}
                        <td className="py-4 px-4 whitespace-nowrap">
                          <div className="flex items-center gap-1.5 text-slate-700 font-semibold">
                            <Clock size={13} className="text-slate-500" />
                            <span>{item.waitTime || '12m'}</span>
                          </div>
                        </td>

                        {/* Workflow Status */}
                        <td className="py-4 px-4 whitespace-nowrap">
                          {renderStatusBadge(item.status)}
                        </td>

                        {/* ESI Acuity */}
                        <td className="py-4 px-4 text-center whitespace-nowrap">
                          {renderEsiBadge(item.nurseAssessment?.assignedESI)}
                        </td>

                        {/* Open Action Button */}
                        <td className="py-4 px-4 text-right whitespace-nowrap">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              selectIntakeForDossier(item.id);
                            }}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-brand-green hover:bg-brand-green-hover text-white text-xs font-bold shadow-xs transition-colors"
                          >
                            <span>Assess</span>
                            <ChevronRight size={13} />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={10} className="py-12 text-center text-slate-400 text-sm">
                      No matching patient intakes found for the active filter.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer: Record count & Pagination */}
          <div className="p-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <div>
              Showing {paginatedIntakes.length} of {filteredIntakes.length} patients
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                disabled={currentPage <= 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center disabled:opacity-30 hover:bg-slate-50 text-slate-600"
              >
                <ChevronLeft size={14} />
              </button>
              {Array.from({ length: totalPages }).map((_, i) => {
                const page = i + 1;
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-7 h-7 rounded-lg text-xs font-bold transition-colors ${
                      currentPage === page
                        ? 'bg-brand-green text-white'
                        : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {i + 1}
                  </button>
                );
              })}
              <button
                type="button"
                disabled={currentPage >= totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center disabled:opacity-30 hover:bg-slate-50 text-slate-600"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Right Operational Rail (from Inspo 1) */}
        {showRightRail && (
          <div className="w-[300px] shrink-0 flex flex-col gap-4">
            {/* 1. Emergency Assistance Card */}
            <button
              type="button"
              onClick={() => setActiveAdminTab('emergency-console')}
              className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between transition-all ${
                emergencyAlert.active
                  ? 'bg-red-50 border-red-300 text-red-700 animate-pulse shadow-emergency'
                  : 'bg-red-50/60 border-red-100 text-red-600 hover:bg-red-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-red-100 flex items-center justify-center text-red-600 shrink-0">
                  <AlertTriangle size={18} strokeWidth={2.4} />
                </div>
                <div>
                  <div className="text-xs font-extrabold text-red-800">
                    Emergency Assistance
                  </div>
                  <div className="text-[11px] text-red-600 font-medium">
                    {emergencyAlert.active ? '1 active alert' : '0 active alerts'}
                  </div>
                </div>
              </div>
              <ChevronRight size={16} className="text-red-400" />
            </button>

            {/* 2. Recent Activity Card */}
            <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs flex flex-col gap-3">
              <div className="text-xs font-bold text-slate-800">Recent Activity</div>

              <div className="flex flex-col gap-3.5 relative pl-2">
                {/* Timeline vertical connector */}
                <div className="absolute left-[11px] top-2 bottom-2 w-[1.5px] bg-slate-100" />

                {RECENT_ACTIVITIES.map((act) => (
                  <div key={act.id} className="flex items-start justify-between gap-2 relative z-10">
                    <div className="flex items-start gap-2.5">
                      <span className={`w-2 h-2 rounded-full ${act.dotColor} mt-1.5 shrink-0 ring-4 ring-white`} />
                      <div>
                        <div className="text-xs font-semibold text-slate-800 leading-tight">
                          {act.text}
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5">
                          {act.token}
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 whitespace-nowrap">
                      {act.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Quick Actions Card */}
            <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs flex flex-col gap-2">
              <div className="text-xs font-bold text-slate-800 mb-1">Quick Actions</div>

              <button
                type="button"
                onClick={() => setActiveAdminTab('emergency-console')}
                className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition-colors text-left"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">
                    <AlertTriangle size={15} />
                  </div>
                  <span className="text-xs font-semibold text-slate-700">Emergency Console</span>
                </div>
                <ChevronRight size={14} className="text-slate-400" />
              </button>

              <button
                type="button"
                onClick={() => setActiveAdminTab('patient-directory')}
                className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition-colors text-left"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                    <FolderArchive size={15} />
                  </div>
                  <span className="text-xs font-semibold text-slate-700">Patient Directory</span>
                </div>
                <ChevronRight size={14} className="text-slate-400" />
              </button>

              <button
                type="button"
                onClick={() => setActiveAdminTab('analytics')}
                className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition-colors text-left"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                    <BarChart3 size={15} />
                  </div>
                  <span className="text-xs font-semibold text-slate-700">View Reports</span>
                </div>
                <ChevronRight size={14} className="text-slate-400" />
              </button>

              <button
                type="button"
                onClick={() => setActiveAdminTab('fleet-manager')}
                className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition-colors text-left"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <Server size={15} />
                  </div>
                  <span className="text-xs font-semibold text-slate-700">Kiosk Settings</span>
                </div>
                <ChevronRight size={14} className="text-slate-400" />
              </button>
            </div>

            {/* 4. Nurse-Controlled ESI Informational Card (Clinical Governance Callout) */}
            <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-100 flex items-start gap-2.5">
              <div className="w-6 h-6 rounded-full bg-emerald-700 text-white flex items-center justify-center shrink-0 mt-0.5">
                <Info size={14} strokeWidth={2.5} />
              </div>
              <div>
                <div className="text-xs font-bold text-emerald-900 leading-tight">
                  Nurse-Controlled ESI
                </div>
                <p className="text-[11px] text-emerald-700 mt-1 leading-normal">
                  ESI is manually assigned by the nurse based on clinical assessment.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
