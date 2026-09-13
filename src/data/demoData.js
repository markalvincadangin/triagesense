/**
 * WVSU Medical Center — TriageSense Fictional Demo Datasets
 * STRICT NOTICE: All patient records, clinical staff names, queue tokens,
 * and operational metrics are fictional sample data for CIT 213 HCI 2 evaluation.
 */

export const INITIAL_INTAKES = [
  {
    id: 'TS-2026-9912',
    timestamp: '17:42',
    elapsedSeconds: 900,
    waitTime: '15m',
    status: 'In Triage', // 'New' | 'Waiting' | 'In Triage' | 'Completed'
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
    customNotes: 'Severe crushing chest pain radiating to left arm. Started 2 hours ago while gardening.',
    voiceNoteRecorded: true,
    vitalsTelemetry: {
      spo2: '94%',
      pulseRate: '104',
      perfusionIndex: '3.8%',
      capturedAt: '17:43',
      source: 'Kiosk PPG Sensor (Right Slot)'
    },
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
      assessedAt: '17:48'
    }
  },
  {
    id: 'TS-2026-9907',
    timestamp: '17:36',
    elapsedSeconds: 1260,
    waitTime: '21m',
    status: 'Waiting',
    language: 'English',
    patientInfo: {
      fullName: 'Maria Santos',
      dob: '1992-09-23',
      age: 34,
      gender: 'Female',
      contact: '0920-555-0814',
      idType: 'QR PhilHealth (#PH-99214)'
    },
    symptoms: ['Fever', 'Cough'],
    bodyLocations: ['Respiratory'],
    painLevel: 5,
    duration: '1–3 days',
    additionalSymptoms: ['Chills', 'Fatigue'],
    customNotes: 'Persistent high-grade fever with productive cough. Responsive to paracetamol temporarily.',
    voiceNoteRecorded: false,
    vitalsTelemetry: {
      spo2: '97%',
      pulseRate: '84',
      perfusionIndex: '4.5%',
      capturedAt: '17:37',
      source: 'Kiosk PPG Sensor (Right Slot)'
    },
    nurseAssessment: {
      assignedESI: 'ESI-3',
      vitals: { bp: '118/76', hr: '84', temp: '38.4', o2: '97%', rr: '18' },
      clinicalNotes: 'Chest auscultation reveals mild right base rhonchi. Sputum culture and CBC requested.',
      bedDisposition: 'Waiting Lounge Area B',
      nurseName: 'Nurse Kristine, RN',
      assessedAt: '17:40'
    }
  },
  {
    id: 'TS-2026-9903',
    timestamp: '17:28',
    elapsedSeconds: 1680,
    waitTime: '28m',
    status: 'Waiting',
    language: 'Filipino',
    patientInfo: {
      fullName: 'Roberto Ramos',
      dob: '1974-02-18',
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
    customNotes: 'Right lower quadrant pain worsening with movement. Localized guarding.',
    voiceNoteRecorded: true,
    vitalsTelemetry: {
      spo2: '98%',
      pulseRate: '88',
      perfusionIndex: '4.0%',
      capturedAt: '17:29',
      source: 'Kiosk PPG Sensor (Right Slot)'
    },
    nurseAssessment: {
      assignedESI: 'ESI-3',
      vitals: { bp: '138/86', hr: '88', temp: '38.1', o2: '98%', rr: '18' },
      clinicalNotes: 'Suspected acute appendicitis. IV access secured. Surgical consult requested.',
      bedDisposition: 'Acute Observation Bed 04',
      nurseName: 'Nurse Kristine, RN',
      assessedAt: '17:32'
    }
  },
  {
    id: 'TS-2026-9898',
    timestamp: '17:21',
    elapsedSeconds: 2100,
    waitTime: '35m',
    status: 'New',
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
    duration: '< 1 hour',
    additionalSymptoms: [],
    customNotes: 'Laceration on right forearm from shattered window glass. Bleeding controlled with direct pressure.',
    voiceNoteRecorded: false,
    nurseAssessment: {
      assignedESI: 'ESI-4',
      vitals: { bp: '122/78', hr: '76', temp: '36.8', o2: '99%', rr: '16' },
      clinicalNotes: 'Superficial 3cm laceration, clean edges. Tetanus immunization updated.',
      bedDisposition: 'Minor Procedure Bay 1',
      nurseName: 'Nurse Reyes, RN',
      assessedAt: '17:25'
    }
  },
  {
    id: 'TS-2026-9887',
    timestamp: '16:50',
    elapsedSeconds: 3900,
    waitTime: '1h 5m',
    status: 'Completed',
    language: 'Filipino',
    patientInfo: {
      fullName: 'Jose Ramirez',
      dob: '1965-06-30',
      age: 61,
      gender: 'Male',
      contact: '0919-555-0321',
      idType: 'Senior Citizen ID (#SC-10294)'
    },
    symptoms: ['Headache'],
    bodyLocations: ['Head'],
    painLevel: 6,
    duration: '1–6 hours',
    additionalSymptoms: ['Dizziness'],
    customNotes: 'Occipital throbbing headache with elevated systolic readings at home.',
    voiceNoteRecorded: false,
    nurseAssessment: {
      assignedESI: 'ESI-4',
      vitals: { bp: '144/90', hr: '78', temp: '36.6', o2: '98%', rr: '16' },
      clinicalNotes: 'Oral antihypertensive dose given. Symptoms relieved. Discharged with outpatient follow-up.',
      bedDisposition: 'Discharged / Home',
      nurseName: 'Nurse Kristine, RN',
      assessedAt: '17:05'
    }
  },
  {
    id: 'TS-2026-9876',
    timestamp: '16:32',
    elapsedSeconds: 5520,
    waitTime: '1h 32m',
    status: 'In Triage',
    language: 'Cebuano',
    patientInfo: {
      fullName: 'Liza Fernandez',
      dob: '1997-10-15',
      age: 29,
      gender: 'Female',
      contact: '0921-555-0765',
      idType: 'National ID (#PhilSys-4821)'
    },
    symptoms: ['Nausea, Vomiting'],
    bodyLocations: ['Abdomen'],
    painLevel: 5,
    duration: '6–24 hours',
    additionalSymptoms: ['Dehydration', 'Weakness'],
    customNotes: 'Episodes of vomiting post dietary intake. Mild epigastric discomfort.',
    voiceNoteRecorded: true,
    nurseAssessment: {
      assignedESI: 'ESI-3',
      vitals: { bp: '110/70', hr: '82', temp: '37.0', o2: '99%', rr: '18' },
      clinicalNotes: 'IV hydration with Plain LR 1L initiated. Antiemetic administered.',
      bedDisposition: 'Observation Bay 3',
      nurseName: 'Nurse Kristine, RN',
      assessedAt: '16:45'
    }
  },
  {
    id: 'TS-2026-9865',
    timestamp: '16:18',
    elapsedSeconds: 6480,
    waitTime: '1h 48m',
    status: 'Waiting',
    language: 'English',
    patientInfo: {
      fullName: 'Mark dela Torre',
      dob: '1981-05-19',
      age: 45,
      gender: 'Male',
      contact: '0917-555-0456',
      idType: 'Driver License (#DL-90812)'
    },
    symptoms: ['Shortness of Breath'],
    bodyLocations: ['Chest'],
    painLevel: 8,
    duration: '1–6 hours',
    additionalSymptoms: ['Wheezing', 'Tightness'],
    customNotes: 'Acute exacerbation of bronchial asthma triggered by outdoor smoke exposure.',
    voiceNoteRecorded: false,
    nurseAssessment: {
      assignedESI: 'ESI-2',
      vitals: { bp: '130/84', hr: '96', temp: '36.9', o2: '93%', rr: '24' },
      clinicalNotes: 'Salbutamol + Ipratropium nebulization administered. Peak flow monitored.',
      bedDisposition: 'Respiratory Cubicle 1',
      nurseName: 'Nurse Reyes, RN',
      assessedAt: '16:25'
    }
  },
  {
    id: 'TS-2026-9854',
    timestamp: '15:52',
    elapsedSeconds: 7920,
    waitTime: '2h 12m',
    status: 'Completed',
    language: 'Hiligaynon',
    patientInfo: {
      fullName: 'Sofia Santos',
      dob: '2004-08-11',
      age: 22,
      gender: 'Female',
      contact: '0929-555-0899',
      idType: 'Student ID (#WVSU-2024-0012)'
    },
    symptoms: ['Fever, Body Aches'],
    bodyLocations: ['General'],
    painLevel: 3,
    duration: '1–3 days',
    additionalSymptoms: ['Fatigue'],
    customNotes: 'Low-grade fever with diffuse myalgia. Dengue NS1 rapid test requested.',
    voiceNoteRecorded: false,
    nurseAssessment: {
      assignedESI: 'ESI-5',
      vitals: { bp: '112/74', hr: '74', temp: '37.8', o2: '99%', rr: '16' },
      clinicalNotes: 'NS1 negative. Platelet count adequate (240k). Prescribed oral hydration and antipyretics.',
      bedDisposition: 'Discharged / Home',
      nurseName: 'Nurse Kristine, RN',
      assessedAt: '16:10'
    }
  },
  {
    id: 'TS-2026-9842',
    timestamp: '15:30',
    elapsedSeconds: 9240,
    waitTime: '2h 30m',
    status: 'Waiting',
    language: 'Filipino',
    patientInfo: {
      fullName: 'Alfredo Garcia',
      dob: '1968-12-03',
      age: 58,
      gender: 'Male',
      contact: '0918-555-0723',
      idType: 'PhilHealth (#PH-88219)'
    },
    symptoms: ['Dizziness, High BP'],
    bodyLocations: ['Head'],
    painLevel: 5,
    duration: '6–24 hours',
    additionalSymptoms: ['Blurred vision'],
    customNotes: 'Hypertension urgencies; BP measured 170/100 at health center.',
    voiceNoteRecorded: false,
    nurseAssessment: {
      assignedESI: 'ESI-3',
      vitals: { bp: '168/98', hr: '82', temp: '36.7', o2: '98%', rr: '18' },
      clinicalNotes: 'Oral amlodipine given. Serial BP monitoring in lounge.',
      bedDisposition: 'Lounge Bay C',
      nurseName: 'Nurse Kristine, RN',
      assessedAt: '15:45'
    }
  },
  {
    id: 'TS-2026-9831',
    timestamp: '15:15',
    elapsedSeconds: 10140,
    waitTime: '2h 45m',
    status: 'In Triage',
    language: 'Hiligaynon',
    patientInfo: {
      fullName: 'Soraya Lim',
      dob: '1999-03-22',
      age: 27,
      gender: 'Female',
      contact: '0922-555-0612',
      idType: 'Hospital ID (#WVSU-09941)'
    },
    symptoms: ['Allergic Reaction'],
    bodyLocations: ['Skin'],
    painLevel: 4,
    duration: '< 1 hour',
    additionalSymptoms: ['Pruritus', 'Erythema'],
    customNotes: 'Urticarial rash after seafood ingestion. No stridor or airway compromise.',
    voiceNoteRecorded: false,
    nurseAssessment: {
      assignedESI: 'ESI-3',
      vitals: { bp: '116/72', hr: '80', temp: '36.8', o2: '99%', rr: '18' },
      clinicalNotes: 'Diphenhydramine 50mg IM given. Observed for bronchospasm.',
      bedDisposition: 'Observation Bay 1',
      nurseName: 'Nurse Kristine, RN',
      assessedAt: '15:25'
    }
  },
  {
    id: 'TS-2026-9820',
    timestamp: '14:48',
    elapsedSeconds: 11760,
    waitTime: '3h 10m',
    status: 'In Triage',
    language: 'English',
    patientInfo: {
      fullName: 'Benjamin Cruz',
      dob: '1955-09-08',
      age: 71,
      gender: 'Male',
      contact: '0917-555-0988',
      idType: 'Senior Citizen ID (#SC-0981)'
    },
    symptoms: ['Acute Chest Discomfort'],
    bodyLocations: ['Chest'],
    painLevel: 9,
    duration: '1–6 hours',
    additionalSymptoms: ['Diaphoresis', 'Syncope'],
    customNotes: 'Severe substernal pressure with cold diaphoresis. Prior MI in 2021.',
    voiceNoteRecorded: true,
    vitalsTelemetry: {
      spo2: '91%',
      pulseRate: '116',
      perfusionIndex: '4.2%',
      capturedAt: '14:49',
      source: 'Kiosk PPG Sensor (Right Slot)'
    },
    nurseAssessment: {
      assignedESI: 'ESI-1',
      vitals: { bp: '92/58', hr: '116', temp: '36.4', o2: '91%', rr: '26' },
      clinicalNotes: 'STEMI code activated. Immediate cardiology and cath lab transfer initiated.',
      bedDisposition: 'Resuscitation Bay 1',
      nurseName: 'Nurse Kristine, RN',
      assessedAt: '14:52'
    }
  },
  {
    id: 'TS-2026-9810',
    timestamp: '14:10',
    elapsedSeconds: 14040,
    waitTime: '3h 48m',
    status: 'Completed',
    language: 'Hiligaynon',
    patientInfo: {
      fullName: 'Elena Morales',
      dob: '1977-07-14',
      age: 49,
      gender: 'Female',
      contact: '0928-555-0455',
      idType: 'National ID (#PhilSys-9011)'
    },
    symptoms: ['Sprained Ankle'],
    bodyLocations: ['Legs'],
    painLevel: 4,
    duration: '1–6 hours',
    additionalSymptoms: ['Swelling'],
    customNotes: 'Inversion injury of right ankle during staircase descent. Weight-bearing tolerated with difficulty.',
    voiceNoteRecorded: false,
    nurseAssessment: {
      assignedESI: 'ESI-5',
      vitals: { bp: '120/78', hr: '72', temp: '36.7', o2: '99%', rr: '16' },
      clinicalNotes: 'X-ray negative for fracture. Elastic bandage applied. RICE protocol instructed.',
      bedDisposition: 'Discharged / Home',
      nurseName: 'Nurse Reyes, RN',
      assessedAt: '14:40'
    }
  }
];

export const RECENT_ACTIVITIES = [
  { id: 1, text: 'New intake received', token: 'TS-2026-9907', time: '17:36', type: 'intake', dotColor: 'bg-brand-blue' },
  { id: 2, text: 'Nurse assessment saved', token: 'TS-2026-9912 (ESI-2)', time: '17:48', type: 'assessment', dotColor: 'bg-brand-green' },
  { id: 3, text: 'Status updated', token: 'TS-2026-9887 → Completed', time: '16:50', type: 'status', dotColor: 'bg-brand-green' },
  { id: 4, text: 'Emergency assistance', token: 'Kiosk 01 (Lobby)', time: '15:42', type: 'emergency', dotColor: 'bg-brand-blue' }
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
