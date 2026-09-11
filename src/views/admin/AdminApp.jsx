import React from 'react';
import { useTriage } from '../../context/TriageContext';
import { AdminHeader } from '../../components/admin/AdminHeader';
import { AdminSidebar } from '../../components/admin/AdminSidebar';
import { ADM01LiveQueue } from './ADM01LiveQueue';
import { ADM02PatientDossier } from './ADM02PatientDossier';
import { ADM03EmergencyConsole } from './ADM03EmergencyConsole';
import { ADM04PatientDirectory } from './ADM04PatientDirectory';
import { ADM05Analytics } from './ADM05Analytics';
import { ADM06FleetManager } from './ADM06FleetManager';

export function AdminApp() {
  const { activeAdminTab } = useTriage();

  const renderActiveTab = () => {
    switch (activeAdminTab) {
      case 'ADM01': return <ADM01LiveQueue />;
      case 'ADM02': return <ADM02PatientDossier />;
      case 'ADM03': return <ADM03EmergencyConsole />;
      case 'ADM04': return <ADM04PatientDirectory />;
      case 'ADM05': return <ADM05Analytics />;
      case 'ADM06': return <ADM06FleetManager />;
      default: return <ADM01LiveQueue />;
    }
  };

  return (
    <div className="w-full h-full flex flex-col bg-canvas overflow-hidden font-sans">
      {/* Staff Workstation Header */}
      <AdminHeader />

      {/* Main Workstation Body: Left Clinical Sidebar + Active Screen */}
      <div className="flex flex-1 overflow-hidden">
        <AdminSidebar />
        <main className="flex-1 overflow-hidden bg-canvas">
          {renderActiveTab()}
        </main>
      </div>
    </div>
  );
}
