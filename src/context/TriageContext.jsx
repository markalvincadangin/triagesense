import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_INTAKES, INITIAL_KIOSKS, DEMO_ANALYTICS } from '../data/demoData';

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
  painLevel: 0,
  duration: '1–6 hours',
  additionalSymptoms: [],
  customNotes: '',
  voiceNoteRecorded: false
};

export function TriageProvider({ children }) {
  // Top-level Viewport & Presentation Mode
  const [viewMode, setViewMode] = useState('kiosk'); // 'kiosk' | 'admin' | 'split'

  // Central Patient Intakes Repository
  const [intakes, setIntakes] = useState(INITIAL_INTAKES);
  const [selectedIntakeId, setSelectedIntakeId] = useState('TS-2026-9912');

  // Admin Navigation Tab
  const [activeAdminTab, setActiveAdminTab] = useState('ADM01');

  // Kiosk Session State
  const [kioskStep, setKioskStep] = useState('K01'); // K01 to K11
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

  // Settings Simulation
  const [settings, setSettings] = useState({
    inactivityTimeout: 45,
    emergencyCooldown: 60,
    soundChimeEnabled: true,
    supportedLanguages: ['en', 'hil', 'fil', 'ceb']
  });

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

  const toggleBodyLocation = (location) => {
    setIntakeDraft((prev) => {
      const exists = prev.bodyLocations.includes(location);
      return {
        ...prev,
        bodyLocations: exists
          ? prev.bodyLocations.filter((l) => l !== location)
          : [...prev.bodyLocations, location]
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
      nurseAssessment: {
        assignedESI: null, // Strictly clinician-assigned! Never calculated by kiosk
        vitals: { bp: '', hr: '', temp: '', o2: '', rr: '' },
        clinicalNotes: '',
        bedDisposition: 'Pending Nurse Assessment',
        nurseName: '',
        assessedAt: ''
      }
    };

    setIntakes((prev) => [newRecord, ...prev]);
    setLastSubmittedId(newId);
    setKioskStep('K11');
  };

  const resetKioskSession = () => {
    setIntakeDraft(DEFAULT_INTAKE_DRAFT);
    setKioskStep('K01');
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
    setActiveAdminTab('ADM02');
  };

  const resetDemoData = () => {
    setIntakes(INITIAL_INTAKES);
    setSelectedIntakeId('TS-2026-9912');
    resetKioskSession();
    dismissEmergency();
  };

  const value = {
    viewMode,
    setViewMode,
    intakes,
    selectedIntakeId,
    setSelectedIntakeId,
    activeAdminTab,
    setActiveAdminTab,
    kioskStep,
    setKioskStep,
    kioskLanguage,
    setKioskLanguage,
    intakeDraft,
    updateDraft,
    updateDraftPatientInfo,
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
    kiosks: INITIAL_KIOSKS,
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
