import React from 'react';
import { useTriage } from '../../context/TriageContext';
import { AdminHeader } from '../../components/admin/AdminHeader';
import { AdminSidebar } from '../../components/admin/AdminSidebar';
import { LiveQueue } from './LiveQueue';
import { PatientDossier } from './PatientDossier';
import { EmergencyConsole } from './EmergencyConsole';
import { PatientDirectory } from './PatientDirectory';
import { OperationalAnalytics } from './OperationalAnalytics';
import { FleetManager } from './FleetManager';

export function AdminApp() {
  const { activeAdminTab } = useTriage();

  const renderActiveTab = () => {
    switch (activeAdminTab) {
      case 'live-queue':
      case 'ADM01':
        return <LiveQueue />;
      case 'patient-dossier':
      case 'ADM02':
        return <PatientDossier />;
      case 'emergency-console':
      case 'ADM03':
        return <EmergencyConsole />;
      case 'patient-directory':
      case 'ADM04':
        return <PatientDirectory />;
      case 'analytics':
      case 'ADM05':
        return <OperationalAnalytics />;
      case 'fleet-manager':
      case 'ADM06':
        return <FleetManager />;
      default:
        return <LiveQueue />;
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
