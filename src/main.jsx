import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { TriageProvider } from './context/TriageContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TriageProvider>
      <App />
    </TriageProvider>
  </React.StrictMode>
);
