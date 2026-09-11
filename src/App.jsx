import React from 'react';
import { ViewportFrame } from './components/common/ViewportFrame';
import { KioskApp } from './views/kiosk/KioskApp';
import { AdminApp } from './views/admin/AdminApp';

export default function App() {
  return (
    <ViewportFrame
      kioskContent={<KioskApp />}
      adminContent={<AdminApp />}
    />
  );
}
