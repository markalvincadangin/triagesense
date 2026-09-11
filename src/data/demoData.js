/**
 * WVSU Medical Center — TriageSense Fictional Demo Datasets
 * STRICT NOTICE: All patient records, clinical staff names, queue tokens,
 * and operational metrics are fictional sample data for CIT 213 HCI 2 evaluation.
 */

export const INITIAL_INTAKES = [
  {
    id: 'TS-2026-9912',
    timestamp: '17:18 PST',
    elapsedSeconds: 245,
    status: 'Waiting', // 'New' | 'Waiting' | 'In Triage' | 'Completed'
    language: 'Hiligaynon',
    patientInfo: {
      fullName: 'Juan Dela Cruz',
      dob: '1956-04-12',
      age: 68,
      gender: 'Male',
      contact: '0917-555-0192',
      idType: 'Hospital ID (#WVSU-08412)'
    },
    symptoms: ['Chest Pain', 'Shortness of Breath'],
    bodyLocations: ['Chest', 'Arms'],
    painLevel: 8,
    duration: '1–6 hours',
    additionalSymptoms: ['Dizziness', 'Fatigue'],
    customNotes: 'Severe crushing sensation radiating down left arm. Sudden onset while walking.',
    voiceNoteRecorded: true,
    nurseAssessment: {
      assignedESI: 'ESI-2', // strictly nurse-assigned
      vitals: {
        bp: '158/94',
        hr: '104',
        temp: '37.1',
        o2: '94%',
        rr: '22'
      },
      clinicalNotes: 'Administered supplemental O2 via nasal cannula @ 2L/min. Urgent stat 12-lead ECG dispatched. Immediate physician consult requested.',
      bedDisposition: 'Resuscitation Bay 2',
      nurseName: 'Nurse Kristine, RN',
      assessedAt: '17:21 PST'
    }
  },
  {
    id: 'TS-2026-9914',
    timestamp: '17:24 PST',
    elapsedSeconds: 110,
    status: 'New',
    language: 'English',
    patientInfo: {
      fullName: 'Maria Santos',
      dob: '1992-09-23',
      age: 34,
      gender: 'Female',
      contact: '0920-555-0814',
      idType: 'QR PhilHealth (#PH-99214)'
    },
    symptoms: ['Fever', 'Cough', 'Shortness of Breath'],
    bodyLocations: ['Chest', 'Neck'],
    painLevel: 5,
    duration: '1–3 days',
    additionalSymptoms: ['Chills', 'Fatigue', 'Loss of appetite'],
    customNotes: 'High fever for 48 hours not responsive to paracetamol. Wheezing on inhalation.',
    voiceNoteRecorded: false,
    nurseAssessment: {
      assignedESI: null, // Needs nurse review
      vitals: { bp: '', hr: '', temp: '', o2: '', rr: '' },
      clinicalNotes: '',
      bedDisposition: 'Pending Assessment',
      nurseName: '',
      assessedAt: ''
    }
  },
  {
    id: 'TS-2026-9915',
    timestamp: '17:12 PST',
    elapsedSeconds: 430,
    status: 'In Triage',
    language: 'Filipino',
    patientInfo: {
      fullName: 'Roberto Ramos',
      dob: '1972-11-05',
      age: 52,
      gender: 'Male',
      contact: '0918-555-0431',
      idType: 'Manual Entry'
    },
    symptoms: ['Abdominal Pain'],
    bodyLocations: ['Abdomen'],
    painLevel: 7,
    duration: '6–24 hours',
    additionalSymptoms: ['Nausea', 'Loss of appetite'],
    customNotes: 'Right lower quadrant tenderness with guarding. Nausea after eating.',
    voiceNoteRecorded: true,
    nurseAssessment: {
      assignedESI: 'ESI-3',
      vitals: {
        bp: '138/86',
        hr: '88',
        temp: '38.2',
        o2: '98%',
        rr: '18'
      },
      clinicalNotes: 'Suspected acute appendicitis. IV line established. Fasting protocol initiated pending surgical evaluation.',
      bedDisposition: 'Acute Bed 04',
      nurseName: 'Nurse Kristine, RN',
      assessedAt: '17:15 PST'
    }
  },
  {
    id: 'TS-2026-9908',
    timestamp: '16:50 PST',
    elapsedSeconds: 1540,
    status: 'Completed',
    language: 'Hiligaynon',
    patientInfo: {
      fullName: 'Ana Reyes',
      dob: '1988-02-14',
      age: 38,
      gender: 'Female',
      contact: '0928-555-0992',
      idType: 'Hospital ID (#WVSU-01124)'
    },
    symptoms: ['Injury / Trauma'],
    bodyLocations: ['Arms'],
    painLevel: 4,
    duration: 'Less than 1 hour',
    additionalSymptoms: [],
    customNotes: 'Clean 4cm laceration on right forearm from broken glass at work. Controlled bleeding.',
    voiceNoteRecorded: false,
    nurseAssessment: {
      assignedESI: 'ESI-4',
      vitals: {
        bp: '122/78',
        hr: '76',
        temp: '36.8',
        o2: '99%',
        rr: '16'
      },
      clinicalNotes: 'Wound irrigated with sterile saline. Tetanus toxoid booster administered. Primary suture completed.',
      bedDisposition: 'Minor Care Bay 1',
      nurseName: 'Nurse Reyes, RN',
      assessedAt: '16:58 PST'
    }
  }
];

export const INITIAL_KIOSKS = [
  {
    id: 'kiosk-01',
    name: 'Kiosk 01 — Entrance Lobby',
    location: 'Main ER Entrance (Near Triage Desk 1)',
    status: 'Online',
    battery: '100% (AC Wired)',
    paperLevel: '88% Remaining (Est. 310 slips)',
    nfcStatus: 'Active / Polling',
    qrStatus: 'Calibrated',
    lastSync: 'Just now',
    activeIntakesToday: 42
  },
  {
    id: 'kiosk-02',
    name: 'Kiosk 02 — Ambulatory Lounge',
    location: 'Ambulatory Waiting Corridor',
    status: 'Online',
    battery: '100% (AC Wired)',
    paperLevel: '94% Remaining (Est. 440 slips)',
    nfcStatus: 'Active / Polling',
    qrStatus: 'Calibrated',
    lastSync: '12s ago',
    activeIntakesToday: 36
  }
];

export const DEMO_ANALYTICS = {
  averageDoorToTriage: '2.4 min',
  triageAcceleration: '58%',
  totalIntakesToday: 78,
  highAcuityProportion: '16.7%',
  chiefComplaints: [
    { name: 'Chest Pain / Cardiac', count: 21, percent: '27%', color: '#DC2626' },
    { name: 'Respiratory / Dyspnea', count: 18, percent: '23%', color: '#F97316' },
    { name: 'Abdominal / Gastro', count: 15, percent: '19%', color: '#F59E0B' },
    { name: 'Trauma & Lacerations', count: 14, percent: '18%', color: '#0057A8' },
    { name: 'Fever & Infectious', count: 10, percent: '13%', color: '#10B981' }
  ],
  languageUtilization: [
    { dialect: 'Hiligaynon (Ilonggo)', count: 32, percent: '41%' },
    { dialect: 'English', count: 26, percent: '33%' },
    { dialect: 'Filipino (Tagalog)', count: 14, percent: '18%' },
    { dialect: 'Cebuano (Bisaya)', count: 6, percent: '8%' }
  ],
  hourlySurge: [
    { hour: '08:00', count: 4 },
    { hour: '10:00', count: 9 },
    { hour: '12:00', count: 14 },
    { hour: '14:00', count: 18 },
    { hour: '16:00', count: 15 },
    { hour: '18:00', count: 11 },
    { hour: '20:00', count: 7 }
  ]
};
