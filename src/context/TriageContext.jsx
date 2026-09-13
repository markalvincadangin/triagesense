import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_INTAKES, INITIAL_KIOSKS, DEMO_ANALYTICS } from '../data/demoData';
import { getTranslation, translations } from '../i18n/translations';

const TriageContext = createContext(null);

const DEFAULT_INTAKE_DRAFT = {
  identification: 'Hospital ID',
  patientInfo: {
    fullName: '',
    dob: '',
    gender: 'Male',
    contact: ''
  },
  symptoms: [],
  bodyLocations: [],
  bodyLocationOrientations: {},
  painLevel: 0,
  duration: '1–6 hours',
  additionalSymptoms: [],
  customNotes: '',
  voiceNoteRecorded: false,
  vitals: {
    spo2: null,
    pulseRate: null,
    perfusionIndex: null,
    measuredAt: null,
    method: 'kiosk-ppg-sensor',
    skipped: false
  }
};

export function TriageProvider({ children }) {
  // Top-level Viewport & Presentation Mode
  const [viewMode, setViewMode] = useState('kiosk'); // 'kiosk' | 'admin' | 'split'
  const [kioskFraming, setKioskFraming] = useState('focus'); // 'focus' (Interactive Screen Focus) | 'totem' (Full 1,780mm CAD Blueprint Totem)

  // Central Patient Intakes Repository
  const [intakes, setIntakes] = useState(INITIAL_INTAKES);
  const [selectedIntakeId, setSelectedIntakeId] = useState('TS-2026-9912');

  // Admin Navigation Tab ('live-queue' | 'patient-dossier' | 'emergency-console' | 'patient-directory' | 'analytics' | 'fleet-manager')
  const [activeAdminTab, setActiveAdminTab] = useState('live-queue');

  // Kiosk Session State ('welcome' | 'language' | 'identification' | 'patient-info' | 'symptoms' | 'body-map' | 'pain-duration' | 'additional-details' | 'review' | 'submission' | 'confirmation')
  const [kioskStep, setKioskStep] = useState('welcome');
  const [kioskLanguage, setKioskLanguage] = useState('en'); // 'en' | 'hil' | 'fil' | 'ceb'
  const [intakeDraft, setIntakeDraft] = useState(DEFAULT_INTAKE_DRAFT);
  const [lastSubmittedId, setLastSubmittedId] = useState(null);

  // Emergency Assistance Simulation State
  const [isAssistanceModalOpen, setIsAssistanceModalOpen] = useState(false);
  const [assistanceCooldownRemaining, setAssistanceCooldownRemaining] = useState(0);
  const [assistanceDispatched, setAssistanceDispatched] = useState(false);

  // Global Emergency Broadcast (propagate to Admin ADM-03)
  const [emergencyAlert, setEmergencyAlert] = useState({
    active: false,
    kioskId: 'Kiosk 01 (Entrance Lobby)',
    timestamp: null,
    status: 'idle', // 'idle' | 'triggered' | 'acknowledged' | 'dispatched'
    elapsedSeconds: 0,
    acknowledgedBy: null
  });

  // Physical Hardware Sensor Simulation State (NN/g Heuristic #1: Visibility of System Status)
  const [activeHardwareSensor, setActiveHardwareSensor] = useState({
    type: null, // 'qr' | 'nfc' | 'ppg' | 'thermal' | null
    status: 'idle', // 'idle' | 'active' | 'success' | 'error'
    message: '',
    data: null
  });

  // Settings Simulation
  const [settings, setSettings] = useState({
    inactivityTimeout: 45,
    emergencyCooldown: 60,
    soundChimeEnabled: true,
    supportedLanguages: ['en', 'hil', 'fil', 'ceb']
  });

  // Kiosk Fleet Management State
  const [kiosks, setKiosks] = useState(INITIAL_KIOSKS);

  const pingKiosk = (kioskId) => {
    setKiosks((prev) =>
      prev.map((k) =>
        k.id === kioskId
          ? { ...k, lastSync: 'Just now', status: 'Online' }
          : k
      )
    );
  };

  const simulateNewPatientIntake = (preset = null) => {
    const generatedNum = Math.floor(1000 + Math.random() * 9000);
    const newId = `TS-2026-${generatedNum}`;
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newRecord = preset || {
      id: newId,
      timestamp: timeString,
      elapsedSeconds: 0,
      waitTime: '0m',
      status: 'New',
      language: 'Hiligaynon',
      patientInfo: {
        fullName: 'Corazon A. Villanueva',
        dob: '1971-08-14',
        age: 54,
        gender: 'Female',
        contact: '0919-555-4821',
        idType: 'PhilHealth QR (#PH-88421)'
      },
      symptoms: ['Acute Abdominal Pain', 'Nausea'],
      bodyLocations: ['Abdomen'],
      painLevel: 7,
      duration: '1–6 hours',
      additionalSymptoms: ['Feverish', 'Loss of appetite'],
      customNotes: 'Severe right lower quadrant cramp-like pain. Onset this afternoon with low fever.',
      voiceNoteRecorded: false,
      vitalsTelemetry: {
        spo2: '97%',
        pulseRate: '88',
        perfusionIndex: '4.1%',
        capturedAt: timeString,
        source: 'Kiosk PPG Sensor (Right Slot)'
      },
      nurseAssessment: {
        assignedESI: null,
        vitals: { bp: '', hr: '88 bpm', temp: '', o2: '97%', rr: '' },
        clinicalNotes: '',
        bedDisposition: 'Pending Nurse Assessment',
        nurseName: '',
        assessedAt: ''
      }
    };

    setIntakes((prev) => [newRecord, ...prev]);
    return newRecord;
  };

  // Cooldown Countdown Timer
  useEffect(() => {
    let timer;
    if (assistanceCooldownRemaining > 0) {
      timer = setInterval(() => {
        setAssistanceCooldownRemaining((prev) => {
          if (prev <= 1) {
            setAssistanceDispatched(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [assistanceCooldownRemaining]);

  // Elapsed Timer for Active Emergency Broadcast
  useEffect(() => {
    let alertTimer;
    if (emergencyAlert.active && emergencyAlert.status !== 'idle') {
      alertTimer = setInterval(() => {
        setEmergencyAlert((prev) => ({
          ...prev,
          elapsedSeconds: prev.elapsedSeconds + 1
        }));
      }, 1000);
    }
    return () => clearInterval(alertTimer);
  }, [emergencyAlert.active, emergencyAlert.status]);

  // Actions
  const updateDraft = (fields) => {
    setIntakeDraft((prev) => ({
      ...prev,
      ...fields
    }));
  };

  const updateDraftPatientInfo = (fields) => {
    setIntakeDraft((prev) => ({
      ...prev,
      patientInfo: {
        ...prev.patientInfo,
        ...fields
      }
    }));
  };

  const toggleSymptom = (symptom) => {
    setIntakeDraft((prev) => {
      const exists = prev.symptoms.includes(symptom);
      return {
        ...prev,
        symptoms: exists
          ? prev.symptoms.filter((s) => s !== symptom)
          : [...prev.symptoms, symptom]
      };
    });
  };

  const toggleBodyLocation = (location, view = null) => {
    setIntakeDraft((prev) => {
      const exists = prev.bodyLocations.includes(location);
      const newLocations = exists
        ? prev.bodyLocations.filter((l) => l !== location)
        : [...prev.bodyLocations, location];

      const newOrientations = { ...(prev.bodyLocationOrientations || {}) };
      if (exists) {
        delete newOrientations[location];
      } else {
        newOrientations[location] = location === 'Back' ? 'back' : (location === 'Chest' || location === 'Abdomen' ? 'front' : (view || 'front'));
      }

      return {
        ...prev,
        bodyLocations: newLocations,
        bodyLocationOrientations: newOrientations
      };
    });
  };

  const toggleAdditionalSymptom = (symp) => {
    setIntakeDraft((prev) => {
      const exists = prev.additionalSymptoms.includes(symp);
      return {
        ...prev,
        additionalSymptoms: exists
          ? prev.additionalSymptoms.filter((s) => s !== symp)
          : [...prev.additionalSymptoms, symp]
      };
    });
  };

  const updateVitals = (vitalsData) => {
    setIntakeDraft((prev) => ({
      ...prev,
      vitals: {
        ...prev.vitals,
        ...vitalsData
      }
    }));
  };

  // Submit Intake: Kiosk -> Central State -> Admin Queue
  const submitKioskIntake = () => {
    const generatedNum = Math.floor(1000 + Math.random() * 9000);
    const newId = `TS-2026-${generatedNum}`;
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' PST';

    // Calculate approximate age if DOB entered
    let calculatedAge = 40;
    if (intakeDraft.patientInfo.dob) {
      const birthYear = new Date(intakeDraft.patientInfo.dob).getFullYear();
      if (!isNaN(birthYear)) {
        calculatedAge = Math.max(1, new Date().getFullYear() - birthYear);
      }
    }

    const newRecord = {
      id: newId,
      timestamp: timeString,
      elapsedSeconds: 0,
      status: 'New', // Workflow Status
      language: kioskLanguage === 'hil' ? 'Hiligaynon' : kioskLanguage === 'fil' ? 'Filipino' : kioskLanguage === 'ceb' ? 'Cebuano' : 'English',
      patientInfo: {
        fullName: intakeDraft.patientInfo.fullName.trim() || 'Unidentified Patient',
        dob: intakeDraft.patientInfo.dob || '1985-01-01',
        age: calculatedAge,
        gender: intakeDraft.patientInfo.gender || 'Not Disclosed',
        contact: intakeDraft.patientInfo.contact || 'None Provided',
        idType: intakeDraft.identification || 'Manual Entry'
      },
      symptoms: intakeDraft.symptoms.length > 0 ? intakeDraft.symptoms : ['Unspecified Symptoms'],
      bodyLocations: intakeDraft.bodyLocations.length > 0 ? intakeDraft.bodyLocations : ['General'],
      painLevel: Number(intakeDraft.painLevel) || 0,
      duration: intakeDraft.duration || '1–6 hours',
      additionalSymptoms: intakeDraft.additionalSymptoms,
      customNotes: intakeDraft.customNotes,
      voiceNoteRecorded: intakeDraft.voiceNoteRecorded,
      vitalsTelemetry: {
        spo2: intakeDraft.vitals?.spo2 || null,
        pulseRate: intakeDraft.vitals?.pulseRate || null,
        perfusionIndex: intakeDraft.vitals?.perfusionIndex || null,
        capturedAt: intakeDraft.vitals?.measuredAt || null,
        source: intakeDraft.vitals?.spo2 ? 'Kiosk PPG Sensor (Right Slot)' : 'None (Skipped/Manual)'
      },
      nurseAssessment: {
        assignedESI: null, // Strictly clinician-assigned! Never calculated by kiosk
        vitals: {
          bp: '',
          hr: intakeDraft.vitals?.pulseRate ? `${intakeDraft.vitals.pulseRate} bpm` : '',
          temp: '',
          o2: intakeDraft.vitals?.spo2 ? `${intakeDraft.vitals.spo2}%` : '',
          rr: '',
          source: intakeDraft.vitals?.spo2 ? 'Kiosk PPG Sensor' : 'Manual Triage Needed'
        },
        clinicalNotes: '',
        bedDisposition: 'Pending Nurse Assessment',
        nurseName: '',
        assessedAt: ''
      }
    };

    setIntakes((prev) => [newRecord, ...prev]);
    setLastSubmittedId(newId);
    setKioskStep('confirmation');
  };

  const resetKioskSession = () => {
    setIntakeDraft(DEFAULT_INTAKE_DRAFT);
    setKioskStep('welcome');
    setLastSubmittedId(null);
  };

  // Emergency Assistance Flow
  const triggerEmergencyModal = () => {
    if (assistanceCooldownRemaining > 0) return;
    setIsAssistanceModalOpen(true);
  };

  const cancelEmergencyModal = () => {
    setIsAssistanceModalOpen(false);
  };

  const confirmEmergencyAssistance = () => {
    setIsAssistanceModalOpen(false);
    setAssistanceDispatched(true);
    setAssistanceCooldownRemaining(settings.emergencyCooldown || 60);

    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' PST';

    setEmergencyAlert({
      active: true,
      kioskId: 'Kiosk 01 (Entrance Lobby)',
      timestamp: timeString,
      status: 'triggered',
      elapsedSeconds: 0,
      acknowledgedBy: null
    });
  };

  const acknowledgeEmergency = (nurseName = 'Nurse Kristine, RN') => {
    setEmergencyAlert((prev) => ({
      ...prev,
      status: 'acknowledged',
      acknowledgedBy: nurseName
    }));
  };

  const dispatchEmergency = () => {
    setEmergencyAlert((prev) => ({
      ...prev,
      status: 'dispatched'
    }));
  };

  const dismissEmergency = () => {
    setEmergencyAlert({
      active: false,
      kioskId: 'Kiosk 01 (Entrance Lobby)',
      timestamp: null,
      status: 'idle',
      elapsedSeconds: 0,
      acknowledgedBy: null
    });
  };

  // Nurse Assessment & Triage Actions
  const updateNurseAssessment = (intakeId, assessmentData) => {
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' PST';

    setIntakes((prev) =>
      prev.map((item) => {
        if (item.id === intakeId) {
          const currentAssessment = item.nurseAssessment || {};
          return {
            ...item,
            status: item.status === 'New' ? 'In Triage' : item.status,
            nurseAssessment: {
              ...currentAssessment,
              ...assessmentData,
              assessedAt: currentAssessment.assessedAt || timeString
            }
          };
        }
        return item;
      })
    );
  };

  const updateWorkflowStatus = (intakeId, newStatus) => {
    setIntakes((prev) =>
      prev.map((item) => (item.id === intakeId ? { ...item, status: newStatus } : item))
    );
  };

  const selectIntakeForDossier = (intakeId) => {
    setSelectedIntakeId(intakeId);
    setActiveAdminTab('patient-dossier');
  };

  // Physical Hardware Sensor Simulation Engine (NN/g Heuristic #1 & #9)
  const triggerHardwareSensor = (sensorType, options = {}) => {
    const isError = Boolean(options.isError);

    setActiveHardwareSensor({
      type: sensorType,
      status: 'active',
      message: options.activeMessage || (
        sensorType === 'qr' ? 'Optical Scanner active: Aligning barcode / QR code...' :
        sensorType === 'nfc' ? 'NFC field active: Reading 13.56 MHz RFID card...' :
        sensorType === 'ppg' ? 'Optical chamber engaged: Reading pulse & oxygen saturation...' :
        sensorType === 'thermal' ? 'Infrared thermopile reading core forehead temperature...' :
        'Hardware sensor active...'
      ),
      data: options.payload || null
    });

    setTimeout(() => {
      if (isError) {
        setActiveHardwareSensor({
          type: sensorType,
          status: 'error',
          message: options.errorMessage || (
            sensorType === 'qr' ? 'Scan Unsuccessful: Barcode obscured or unreadable. Please hold steady.' :
            sensorType === 'nfc' ? 'Card Read Error: Card removed too quickly. Please tap and hold for 1s.' :
            sensorType === 'ppg' ? 'Motion Artifact Detected: Please keep finger still in sensor cradle.' :
            'Sensor reading timed out. Please try again.'
          ),
          data: null
        });

        setTimeout(() => {
          setActiveHardwareSensor((prev) => (prev.status === 'error' ? { type: null, status: 'idle', message: '', data: null } : prev));
        }, 4500);
        return;
      }

      const now = new Date();
      const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' PST';

      if (sensorType === 'qr') {
        const payload = options.payload || {
          fullName: 'Maria Elena C. Lopez',
          dob: '1978-08-14',
          gender: 'Female',
          contact: '0917-882-9014',
          identification: 'PhilHealth QR'
        };
        updateDraft({ identification: payload.identification || 'PhilHealth QR' });
        updateDraftPatientInfo({
          fullName: payload.fullName,
          dob: payload.dob,
          gender: payload.gender,
          contact: payload.contact
        });
        setViewMode('kiosk');
        setKioskStep('patient-info');
      } else if (sensorType === 'nfc') {
        const payload = options.payload || {
          fullName: 'Juan Dela Cruz y Santos',
          dob: '1956-04-12',
          gender: 'Male',
          contact: '0917-555-1234',
          identification: 'PhilSys National ID NFC'
        };
        updateDraft({ identification: payload.identification || 'PhilSys NFC' });
        updateDraftPatientInfo({
          fullName: payload.fullName,
          dob: payload.dob,
          gender: payload.gender,
          contact: payload.contact
        });
        setViewMode('kiosk');
        setKioskStep('patient-info');
      } else if (sensorType === 'ppg') {
        const payload = options.payload || {
          spo2: 98,
          pulseRate: 74,
          perfusionIndex: '4.2%',
          temperature: '36.8°C'
        };
        updateVitals({
          spo2: payload.spo2,
          pulseRate: payload.pulseRate,
          perfusionIndex: payload.perfusionIndex,
          temperature: payload.temperature,
          measuredAt: timeString,
          method: 'kiosk-ppg-sensor',
          skipped: false
        });
      } else if (sensorType === 'thermal') {
        const payload = options.payload || { temperature: '36.6°C' };
        updateVitals({
          temperature: payload.temperature,
          measuredAt: timeString,
          method: 'overhead-infrared-sensor'
        });
      }

      setActiveHardwareSensor({
        type: sensorType,
        status: 'success',
        message: options.successMessage || (
          sensorType === 'qr' ? 'PhilHealth QR Verified: Credentials loaded into intake record.' :
          sensorType === 'nfc' ? 'PhilSys Smart Card Authenticated via 13.56 MHz NFC.' :
          sensorType === 'ppg' ? 'Vitals Telemetry Captured: SpO₂ and Pulse Rate recorded.' :
          sensorType === 'thermal' ? `Forehead Temperature Verified: ${options.payload?.temperature || '36.6°C'}.` :
          'Sensor reading successfully captured.'
        ),
        data: options.payload || null
      });

      setTimeout(() => {
        setActiveHardwareSensor((prev) => (prev.status === 'success' ? { type: null, status: 'idle', message: '', data: null } : prev));
      }, 3500);
    }, 1200);
  };

  const cancelHardwareSensor = () => {
    setActiveHardwareSensor({
      type: null,
      status: 'idle',
      message: '',
      data: null
    });
  };

  const resetDemoData = () => {
    setIntakes(INITIAL_INTAKES);
    setSelectedIntakeId('TS-2026-9912');
    setKiosks(INITIAL_KIOSKS);
    resetKioskSession();
    dismissEmergency();
    cancelHardwareSensor();
  };

  const value = {
    viewMode,
    setViewMode,
    kioskFraming,
    setKioskFraming,
    intakes,
    selectedIntakeId,
    setSelectedIntakeId,
    activeAdminTab,
    setActiveAdminTab,
    kioskStep,
    setKioskStep,
    kioskLanguage,
    setKioskLanguage,
    t: (key, fallback) => getTranslation(kioskLanguage, key, fallback),
    translations,
    intakeDraft,
    updateDraft,
    updateDraftPatientInfo,
    updateVitals,
    toggleSymptom,
    toggleBodyLocation,
    toggleAdditionalSymptom,
    lastSubmittedId,
    submitKioskIntake,
    resetKioskSession,
    isAssistanceModalOpen,
    triggerEmergencyModal,
    cancelEmergencyModal,
    confirmEmergencyAssistance,
    assistanceCooldownRemaining,
    assistanceDispatched,
    emergencyAlert,
    acknowledgeEmergency,
    dispatchEmergency,
    dismissEmergency,
    settings,
    setSettings,
    updateNurseAssessment,
    updateWorkflowStatus,
    selectIntakeForDossier,
    resetDemoData,
    activeHardwareSensor,
    triggerHardwareSensor,
    cancelHardwareSensor,
    kiosks,
    setKiosks,
    pingKiosk,
    simulateNewPatientIntake,
    analytics: DEMO_ANALYTICS
  };

  return <TriageContext.Provider value={value}>{children}</TriageContext.Provider>;
}

export function useTriage() {
  const context = useContext(TriageContext);
  if (!context) {
    throw new Error('useTriage must be used within a TriageProvider');
  }
  return context;
}
