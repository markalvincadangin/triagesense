/**
 * TriageSense Clinical Localization Dictionary (i18n)
 * Supported Dialects:
 *  - en: English (Default)
 *  - hil: Hiligaynon / Ilonggo (Primary Western Visayas Dialect)
 *  - fil: Filipino / Tagalog (National Language)
 *  - ceb: Cebuano / Bisaya (Central Visayas)
 */

export const translations = {
  en: {
    common: {
      back: 'Back',
      continue: 'Continue',
      cancel: 'Cancel',
      confirm: 'Confirm',
      required: 'Required',
      optional: 'Optional',
      yearsOld: 'years old',
      speaking: 'Speaking...',
      readAloud: 'Read Aloud',
      step: 'Step',
      of: 'of',
      edit: 'Edit'
    },
    stepper: {
      stages: {
        info: 'Your Info',
        symptoms: 'What Hurts',
        bodyMap: 'Where It Hurts',
        painVitals: 'Pain & Pulse',
        review: 'Review & Send'
      },
      substeps: {
        'patient-info': 'Step 1 of 5 • Your Name & Details',
        'symptoms': 'Step 2 of 5 • Tell Us What You Feel',
        'body-map': 'Step 3 of 5 • Tap Where It Hurts',
        'pain-duration': 'Step 4 of 5 • Pain Level & Finger Check',
        'review': 'Step 5 of 5 • Review & Let the Nurse Know'
      }
    },
    language: {
      badge: 'Language Selection',
      title: 'Select Your Preferred Dialect',
      subtitle: 'Choose the language you are most comfortable using',
      regions: {
        hil: 'Ilonggo • Panay & Guimaras',
        en: 'Standard Clinical Interface',
        fil: 'Tagalog • Pambansang Wika',
        ceb: 'Bisaya • Central Visayas'
      }
    },
    identification: {
      title: 'Patient Identification',
      subtitle: 'Choose how you would like to identify yourself at this terminal',
      scanning: 'Scanning',
      holdSteady: 'please hold steady...',
      options: {
        hospitalId: {
          title: 'WVSUMC Patient Hospital ID',
          desc: 'Scan barcode at the Scanner Bay (right) or enter your hospital ID number'
        },
        qrCode: {
          title: 'PhilHealth or National ID QR',
          desc: 'Hold digital or physical QR code directly under the Scanner Bay on the right'
        },
        nfc: {
          title: 'NFC Contactless Card Tap',
          desc: 'Tap your hospital health card or PhilSys smart card against the NFC pad on the left'
        },
        manual: {
          title: 'Manual Patient Registration',
          desc: 'Register manually using the on-screen touchscreen keyboard'
        }
      }
    },
    painScale: {
      selected: 'Selected',
      rangeNoPain: '0 = No Pain',
      rangeModerate: '5 = Moderate Pain',
      rangeWorst: '10 = Worst Possible Pain',
      tiers: {
        mild: {
          title: 'Low Pain',
          desc: 'Minor discomfort; fully manageable and functional.'
        },
        moderate: {
          title: 'Moderate Pain',
          desc: 'Noticeable discomfort; interferes with daily activities.'
        },
        high: {
          title: 'High Pain',
          desc: 'Severe pain; difficulty concentrating or moving comfortably.'
        },
        severe: {
          title: 'Severe Pain',
          desc: 'Incapacitating, unbearable pain; requires urgent clinician review.'
        }
      }
    },
    durations: {
      'Less than 1 hour': 'Less than 1 hour',
      '1–6 hours': '1 to 6 hours',
      '6–24 hours': '6 to 24 hours',
      '1–3 days': '1 to 3 days',
      'More than 3 days': 'More than 3 days',
      'Not sure': 'Not sure'
    },
    assistanceModal: {
      title: 'Request ER Staff Assistance?',
      badge: 'For Acute & Life-Threatening Emergencies',
      prompt: 'Select this if the patient has any of the following:',
      symptoms: [
        'Severe, crushing chest pain',
        'Unable to breathe or choking',
        'Uncontrolled, heavy bleeding',
        'Loss of consciousness or seizures'
      ],
      instruction: 'Select this if the patient has severe chest pain, cannot breathe, is bleeding heavily, or is losing consciousness.',
      nurseArriving: 'An emergency nurse will come to assist you at this kiosk right away.',
      confirmBtn: 'YES, REQUEST ASSISTANCE',
      cancelBtn: 'Cancel and Continue Self-Service'
    },
    sensorBay: {
      slotInstruction: 'Please insert your index finger into the illuminated Vital Signs Sensor Bay below the screen.',
      slotDurationNotice: 'Takes only 5 seconds. Captures baseline SpO₂ and pulse rate for the emergency doctor and nurse.',
      lookDownNotice: 'LOOK DOWN: Physical Sensor Below Screen',
      lookDownShort: 'LOOK DOWN ↓',
      doNotTapScreen: 'Do not tap screen • Insert finger into physical slot below kiosk frame',
      startScanBtn: 'Start Vitals Scan',
      skipBtn: 'Skip Finger Check',
      clinicalDisclaimer: 'Clinical Notice: Kiosk vitals are for preliminary check-in. The triage nurse will verify your vitals when they call your name.'
    },
    header: {
      title: 'WVSUMC',
      subtitle: 'EMERGENCY ROOM CHECK-IN',
      emergencyHelp: 'EMERGENCY HELP',
      readAloudPrompt: 'Read screen instructions aloud'
    },
    welcome: {
      badge: 'Department of Emergency Medicine • Triage Intake',
      title: 'Welcome to WVSUMC Emergency Check-In',
      subtitle: 'Quick Emergency Check-In • Tell us what hurts so the nurse can assist you',
      instruction: 'Tap below to begin. Your information goes directly to the triage nurse on duty so you can be attended to as quickly as possible.',
      startBtn: 'START EMERGENCY CHECK-IN',
      dispatchedTitle: 'A Triage Nurse is on the Way to Help You',
      dispatchedSubtitle: 'Please stay right here at this station. A nurse will attend to you shortly.',
      emergencyTitle: 'Life-Threatening Emergency?',
      emergencySubtitle: 'Severe chest pain, profuse bleeding, or difficulty breathing? Press for immediate emergency nurse response.',
      requestNurse: 'REQUEST IMMEDIATE NURSE',
      nurseCalled: 'NURSE CALLED',
      privacyNotice: 'WVSUMC Emergency Department • Republic Act 10173 (Data Privacy Act) Protected'
    },
    patientInfo: {
      stepTitle: 'Step 1 of 5: Who is checking in today?',
      stepSubtitle: 'Please enter your name and birthday so the nurse can prepare your record',
      fullNameLabel: 'Full Name (First, Middle, Last):',
      fullNamePlaceholder: 'e.g. Juan Dela Cruz',
      dobLabel: 'Date of Birth:',
      dobPlaceholder: 'YYYY-MM-DD',
      genderLabel: 'Gender:',
      genderMale: 'Male',
      genderFemale: 'Female',
      genderOther: 'Other',
      contactLabel: 'Contact Phone Number:',
      contactPlaceholder: '09XX-XXX-XXXX',
      voiceDictate: 'Voice Dictate',
      voiceListening: 'Listening... Speak clearly',
      errorEmptyName: 'Please enter patient name or tap the microphone to dictate.',
      errorInvalidDob: 'Please select a valid date of birth.',
      errorEmptyGender: 'Please select patient gender.',
      btnBack: 'Back to Home',
      btnNext: 'Next: What Hurts?'
    },
    keyboard: {
      typing: 'Typing into',
      space: 'SPACE',
      clear: 'CLEAR',
      hide: 'Hide Keyboard',
      show: 'Open Touchscreen Keyboard',
      nextField: 'Next Field',
      done: 'DONE',
      fullName: 'Full Name',
      contact: 'Phone Number',
      dob: 'Date of Birth',
      shortcut09: '09'
    },
    symptoms: {
      stepTitle: 'What Brings You to the Emergency Room Today?',
      stepSubtitle: 'Tell us what you are feeling right now',
      tapAll: '(Tap all that apply)',
      voiceCardTitle: 'Prefer to speak instead of tapping?',
      voiceCardSubtitle: 'Hold to record a quick 5-second voice description for the triage nurse',
      voiceRecording: 'Recording voice memo...',
      voiceSaved: 'Voice memo saved for the nurse. Tap to re-record.',
      errorRequired: 'Please select at least one symptom or choose "Other Concern".',
      selectedBadge: 'selected',
      btnBack: 'Back: Patient Info',
      btnNext: 'Next: Select Location on Body',
      items: {
        'Chest Pain': {
          label: 'Chest Pain or Pressure',
          desc: 'Tightness, crushing, or heavy chest feeling'
        },
        'Shortness of Breath': {
          label: 'Trouble Breathing',
          desc: 'Short of breath, wheezing, or gasping for air'
        },
        'Fever': {
          label: 'High Fever & Chills',
          desc: 'Very hot body, shivering, sweating'
        },
        'Abdominal Pain': {
          label: 'Stomach or Belly Pain',
          desc: 'Severe cramps, sharp or aching stomach'
        },
        'Headache': {
          label: 'Severe Headache',
          desc: 'Throbbing migraine, dizziness, confusion'
        },
        'Injury / Trauma': {
          label: 'Accident, Cut, or Fall',
          desc: 'Deep wound, bleeding, fractured bone, fall'
        },
        'Cough': {
          label: 'Persistent Cough',
          desc: 'Constant coughing, chest phlegm, throat pain'
        },
        'Other': {
          label: 'Other Concern',
          desc: 'Something else you want to tell the nurse'
        }
      }
    },
    bodyMap: {
      stepTitle: 'Where on Your Body Does It Hurt?',
      stepSubtitle: 'Tap the diagram or the buttons below to pinpoint the pain',
      front: 'Front View',
      back: 'Back View',
      frontShort: 'Front',
      backShort: 'Back',
      regions: {
        Head: 'Head',
        Neck: 'Neck',
        Shoulder: 'Shoulders',
        Chest: 'Chest',
        Abdomen: 'Stomach',
        Back: 'Back',
        Arms: 'Arms & Hands',
        Legs: 'Legs & Feet'
      },
      selectedTitle: 'Selected Areas',
      noneSelected: 'None selected yet (tap body diagram or buttons above)',
      orientationFront: 'Front Orientation',
      orientationBack: 'Back Orientation',
      errorRequired: 'Please select at least one body area where you feel pain.',
      btnBack: 'Back: Symptoms',
      btnNext: 'Next: Pain & Vitals'
    },
    painDuration: {
      stepTitle: 'Step 4 of 5: How Bad is the Pain & Quick Pulse Check',
      stepSubtitle: 'Select your pain score and slip your finger into the sensor below to check your pulse and oxygen',
      scaleTitle: '1. How Bad Does It Hurt Right Now?',
      scaleSubtitle: 'Tap the score that matches how you feel (0 = No Pain, 10 = Severe)',
      durationTitle: '2. How Long Have You Felt This Way?',
      durations: {
        'Just started (<1h)': 'Just started (<1 hour)',
        '1–6 hours': '1 to 6 hours',
        'Today (6–24h)': 'Today (6 to 24 hours)',
        'A few days': 'A few days',
        'More than a week': 'More than a week'
      },
      vitalsTitle: '3. Preliminary Vitals Check (Vital Signs Sensor Bay)',
      vitalsSubtitle: 'Place your index finger into the illuminated Vital Signs Sensor Bay below the screen for 5 seconds',
      sensorReady: 'SENSOR BAY READY • OPTICAL PPG',
      sensorMeasuring: 'READING PULSE & OXYGEN... HOLD STILL',
      sensorComplete: 'TELEMETRY LOCKED • RESULTS ATTACHED',
      heartRate: 'Heart Rate',
      oxygen: 'Oxygen (SpO2)',
      perfusion: 'Perfusion Index',
      btnBack: 'Back: Body Map',
      btnNext: 'Next: Review Answers'
    },
    additional: {
      title: 'Additional Symptom Details',
      subtitle: 'Any other symptoms you want the triage nurse to know about? (Optional)',
      selectPrompt: 'Select Any Accompanying Symptoms:',
      notesLabel: 'Additional Notes or Explanation (Optional):',
      notesPlaceholder: 'Type or dictate any other details about your illness...',
      voicePrompt: 'Or dictate notes with the microphone:',
      items: {
        Nausea: 'Nausea or Vomiting',
        Dizziness: 'Dizziness or Vertigo',
        'Loss of appetite': 'Loss of Appetite',
        Fatigue: 'Extreme Body Weakness',
        Other: 'Other Symptoms'
      }
    },
    review: {
      stepTitle: 'Step 5 of 5: Check Your Answers Before Sending',
      stepSubtitle: 'Review your information below so the triage nurse receives accurate details',
      patientSection: 'Patient Details',
      symptomsSection: 'What Hurts',
      locationsSection: 'Where It Hurts',
      painSection: 'Pain Level & Finger Check',
      nameLabel: 'Name:',
      dobLabel: 'Birthdate:',
      genderLabel: 'Gender:',
      contactLabel: 'Contact:',
      idMethodLabel: 'ID Method:',
      noSymptomsSelected: 'No symptoms selected',
      generalBody: 'General / Whole Body',
      voiceMemoLabel: 'Voice Memo:',
      voiceMemoAttached: 'Attached for nurse audio playback',
      voiceMemoNone: 'None recorded',
      painScoreLabel: 'Pain Score:',
      durationLabel: 'Duration:',
      quickFingerCheckLabel: 'Quick Finger Check:',
      sensorSkippedText: 'Sensor skipped — Triage nurse will record vitals manually',
      whatHappensNext: 'What Happens Next?',
      step1Title: '1. Nurse Receives Details',
      step1Desc: "Your information appears immediately on the triage nurse's station screen.",
      step2Title: '2. Take Your Paper Ticket',
      step2Desc: 'A ticket slip with your queue number prints automatically from the slot below.',
      step3Title: '3. Relax in Waiting Area',
      step3Desc: 'Please take a seat. The triage nurse will call your ticket number for in-person evaluation.',
      ticketPrintNote: 'Ticket will print automatically at lower slot',
      nurseAlertNotice: 'Your intake will be sent immediately to the ED Triage Nurse station.',
      btnBack: 'Back: Change Details',
      btnSubmit: 'SEND TO TRIAGE NURSE'
    },
    submission: {
      stepTitle: 'Submit Intake Record',
      readyTitle: 'Ready to Send to Triage Desk',
      transmittingTitle: 'Packaging & Transmitting Record...',
      description: 'Upon clicking submit, your patient-reported intake will be securely transmitted to the Authorized Nurse Workstation in the Emergency Department.',
      disclaimerTitle: 'Important Clinical Notice:',
      disclaimerText: '"TriageSense provides preliminary patient-reported information only. It does not diagnose medical conditions or replace clinical triage."',
      privacyAssurance: 'Compliant with DOH Healthcare Privacy & Data Protection Protocols',
      submitBtn: 'SUBMIT INTAKE TO TRIAGE DESK',
      submittingBtn: 'TRANSMITTING INTAKE...',
      backBtn: 'Back to Review'
    },
    confirmation: {
      hospitalDept: 'WVSU MEDICAL CENTER • EMERGENCY DEPARTMENT',
      title: 'You Are Checked In!',
      ticketReady: 'Process Complete',
      queueLabel: 'YOUR QUEUE TICKET NUMBER:',
      nurseWaiting: 'Please take a seat in the waiting area. A triage nurse will call your ticket number shortly.',
      nextStepAssessment: 'Next Step: In-Person Nurse Assessment',
      takeTicketSlot: 'Please take your printed ticket from the slot below',
      mobileTracking: 'Scan with phone for live queue tracking anywhere in the hospital',
      guideTitle: 'What to do while waiting in the lobby:',
      guideStep1Title: '1. Hold Your Ticket',
      guideStep1Desc: 'Keep this paper ticket with you. It is your official visit record.',
      guideStep2Title: '2. Watch Lobby Monitors',
      guideStep2Desc: 'Your number will flash on overhead displays with an audio announcement.',
      guideStep3Title: '3. If Condition Worsens',
      guideStep3Desc: 'Tell the triage desk nurse immediately if your pain or breathing gets worse.',
      resetTimerPrefix: 'Terminal screen will reset for next patient in',
      doneBtn: 'DONE'
    }
  },

  hil: {
    common: {
      back: 'Balik',
      continue: 'Padayon',
      cancel: 'Kanselahon',
      confirm: 'Kumpirmahon',
      required: 'Kinahanglanon',
      optional: 'Opsyonal',
      yearsOld: 'ka tuig',
      speaking: 'Nagahambal...',
      readAloud: 'Pamatian',
      step: 'Tikang',
      of: 'sang',
      edit: 'Ilisan'
    },
    stepper: {
      stages: {
        info: 'Imo Impormasyon',
        symptoms: 'Ano Nagasakit',
        bodyMap: 'Diin Dampi',
        painVitals: 'Kasakit kag Pulso',
        review: 'Lantaw kag Ipadala'
      },
      substeps: {
        'patient-info': 'Tikang 1 sang 5 • Imo Ngalan kag Detalye',
        'symptoms': 'Tikang 2 sang 5 • Isugid ang Ginabatyag',
        'body-map': 'Tikang 3 sang 5 • Pinduta Diin Nagasakit',
        'pain-duration': 'Tikang 4 sang 5 • Kasakit kag Pagsukol Tudlo',
        'review': 'Tikang 5 sang 5 • Lantawa Bag-o Ipadala sa Nurse'
      }
    },
    language: {
      badge: 'Pagpili sang Pulong',
      title: 'Pilia ang Imo Hambal',
      subtitle: 'Pilia ang pulong nga mas komportable ka gamiton',
      regions: {
        hil: 'Ilonggo • Panay kag Guimaras',
        en: 'Ingles • Standard Clinical',
        fil: 'Tagalog • Pambansang Wika',
        ceb: 'Bisaya • Sentral Visayas'
      }
    },
    identification: {
      title: 'Pagpakilala sang Pasyente',
      subtitle: 'Pilia kon paano mo luyag ipakilala ang imo kaugalingon sa sini nga kiosk',
      scanning: 'Ginascan',
      holdSteady: 'palihog indi paghulagon...',
      options: {
        hospitalId: {
          title: 'WVSUMC Patient Hospital ID',
          desc: 'I-scan ang barcode sa Scanner Bay (sa tuo) ukon isulat ang imo hospital ID number'
        },
        qrCode: {
          title: 'PhilHealth ukon National ID QR',
          desc: 'Itungod ang QR code sa idalom sang Scanner Bay sa tuo'
        },
        nfc: {
          title: 'NFC Contactless Card Tap',
          desc: 'I-tap ang imo hospital health card ukon PhilSys card sa NFC pad sa wala'
        },
        manual: {
          title: 'Manwal nga Pagpalista',
          desc: 'Ipasulod ang detalye gamit ang keyboard sa screen'
        }
      }
    },
    painScale: {
      selected: 'Napili',
      rangeNoPain: '0 = Wala Sing Sakit',
      rangeModerate: '5 = Sakto Lang nga Sakit',
      rangeWorst: '10 = Grabe Katama nga Sakit',
      tiers: {
        mild: {
          title: 'Mahinay nga Sakit',
          desc: 'Diutay nga pamatyag; masarangan pa kag makahulag sing maayo.'
        },
        moderate: {
          title: 'Sakto Lang nga Sakit',
          desc: 'Mabatyagan gid; nagasablag na sa ordinaryo nga hilikuton.'
        },
        high: {
          title: 'Masakit Gid',
          desc: 'Mabaskog nga sakit; mabudlay magpokus ukon maghulag sing komportable.'
        },
        severe: {
          title: 'Sobra Kasakit',
          desc: 'Indi na maagwanta nga sakit; nagakinahanglan sang gilayon nga pag-atipan sang doktor kag nurse.'
        }
      }
    },
    durations: {
      'Less than 1 hour': 'Wala pa 1 ka oras',
      '1–6 hours': '1 tubtob 6 ka oras',
      '6–24 hours': '6 tubtob 24 ka oras',
      '1–3 days': '1 tubtob 3 ka adlaw',
      'More than 3 days': 'Sobra sa 3 ka adlaw',
      'Not sure': 'Wala sigurado'
    },
    assistanceModal: {
      title: 'Mangayo sang Bulig sa Nurse?',
      badge: 'Para sa Makamaratay nga Emerhensya',
      prompt: 'Pilia ini kon ang pasyente may ara sang masunod:',
      symptoms: [
        'Grabe nga sakit sa dughan',
        'Indi makaginhawa ukon gahangos',
        'Todo kag sige-sige nga pagdugo',
        'Nagakadulaan sang buot ukon nagakumbulsyon'
      ],
      instruction: 'Pilia ini kon ang pasyente may grabe nga sakit sa dughan, indi makaginhawa, todo ang pagdugo, ukon nagakadulaan sang buot.',
      nurseArriving: 'May emergency nurse nga makadto gilayon sa sini nga kiosk agud magbulig.',
      confirmBtn: 'HUO, MANGAYO SANG TABANG',
      cancelBtn: 'Kanselahon kag Padayunon ang Kiosk'
    },
    sensorBay: {
      slotInstruction: 'Palihog isulod ang imo tudlo sa nagasiga nga Vital Signs Sensor Bay sa idalom sang screen.',
      slotDurationNotice: '5 ka segundo lamang. Ginatala ang SpO₂ kag pulso para sa emergency nurse kag doktor.',
      lookDownNotice: 'TULOK SA IDALOM: Pisikal nga Sensor sa Idalom sang Screen',
      lookDownShort: 'TULOK SA IDALOM ↓',
      doNotTapScreen: 'Indi pagpinduta ang screen • Isulod ang tudlo sa nagasiga nga slot sa idalom sang kiosk',
      startScanBtn: 'Sugdan ang Pagsukol sang Vitals',
      skipBtn: 'Laktawan ang Pagsukol',
      clinicalDisclaimer: 'Pahibalo sang Klinika: Ang vitals sa kiosk para sa pauna nga pagpalista. Suklon ini liwat sang nurse kon tawgon ang imo ngalan.'
    },
    header: {
      title: 'WVSUMC',
      subtitle: 'PAGPALISTA SA EMERGENCY ROOM',
      emergencyHelp: 'TABANG',
      readAloudPrompt: 'Basahon sing mabaskog ang mga panuytoy sa screen'
    },
    welcome: {
      badge: 'Departamento sang Emergency Medicine • Triage Intake',
      title: 'Maayong Pag-abot sa WVSUMC Emergency Room',
      subtitle: 'Dali nga Pagpalista • Isugid ang imo ginabatyag agud mabuligan ka gilayon sang nurse',
      instruction: 'Pinduta ang berde nga buton sa idalom agud makasugod. Ang imo impormasyon direktang makalab-ot sa triage nurse on duty.',
      startBtn: 'MAGSUGOD SA PAGPALISTA',
      dispatchedTitle: 'May Nurse nga Nagapakadto sa Imo Lugar',
      dispatchedSubtitle: 'Palihog pabilin diri sa kiosk station. Mabuligan ka sang nurse sa gilayon.',
      emergencyTitle: 'Makamaratay nga Emerhensya?',
      emergencySubtitle: 'Grabe nga sakit sa dughan, todo nga pagdugo, ukon indi makaginhawa? Pinduta para sa gilayon nga nurse.',
      requestNurse: 'MAGPANGAYO SANG NURSE',
      nurseCalled: 'NATAWAG NA ANG NURSE',
      privacyNotice: 'WVSUMC Emergency Department • Protektado sang Republic Act 10173 (Data Privacy Act)'
    },
    patientInfo: {
      stepTitle: 'Tikang 1 sang 5: Sin-o ang magapabulong subong?',
      stepSubtitle: 'Palihog isulat ang imo ngalan kag kaadlawan agud maihanda sang nurse ang imo rekord',
      fullNameLabel: 'Bug-os nga Ngalan (Ngalan, Tunga, Apelyido):',
      fullNamePlaceholder: 'Halimbawa: Juan Dela Cruz',
      dobLabel: 'Adlaw sang Pagkabun-ag (Kaadlawan):',
      dobPlaceholder: 'YYYY-MM-DD',
      genderLabel: 'Sekso:',
      genderMale: 'Lalaki',
      genderFemale: 'Babayi',
      genderOther: 'Iban pa',
      contactLabel: 'Numero sang Telepono / Selpon:',
      contactPlaceholder: '09XX-XXX-XXXX',
      voiceDictate: 'Irekord ang Tingog',
      voiceListening: 'Nagapamati... Ihambal sing maathag',
      errorEmptyName: 'Palihog isulat ang ngalan sang pasyente ukon gamita ang mikropono para magpadayon.',
      errorInvalidDob: 'Palihog pilia ang husto nga adlaw sang pagkabun-ag.',
      errorEmptyGender: 'Palihog pilia ang sekso sang pasyente.',
      btnBack: 'Balik sa Pamuno',
      btnNext: 'Padayon: Ano ang Ginabatyag?'
    },
    keyboard: {
      typing: 'Ginasulat sa',
      space: 'ESPASYO',
      clear: 'PANASON',
      hide: 'Itago ang Keyboard',
      show: 'Buksan ang Keyboard sa Screen',
      nextField: 'Masunod',
      done: 'TAPOS',
      fullName: 'Bug-os nga Ngalan',
      contact: 'Numero sang Telepono',
      dob: 'Kaadlawan',
      shortcut09: '09'
    },
    symptoms: {
      stepTitle: 'Ano ang Ginabatyag Mo Subong?',
      stepSubtitle: 'Pilia ang tanan nga nagasakit ukon imo ginabatyag',
      tapAll: '(Pilia ang tanan nga nagakaigo)',
      voiceCardTitle: 'Mas gusto mo ihambal sangsa magpindot?',
      voiceCardSubtitle: 'Pinduta kag hupti para sa 5-segundo nga voice memo para sa triage nurse',
      voiceRecording: 'Ginatala ang tingog...',
      voiceSaved: 'Natala na ang tingog para sa nurse. Pinduta liwat kon luyag mo ilisan.',
      errorRequired: 'Palihog magpili sang bisan isa ka balatian ukon pilia ang "Iban Pa nga Balatian".',
      selectedBadge: 'napili',
      btnBack: 'Balik: Impormasyon',
      btnNext: 'Padayon: Diin Dampi sa Lawas?',
      items: {
        'Chest Pain': {
          label: 'Sakit sa Dughan',
          desc: 'Gatig-a, gapit-os, ukon mabug-at nga pamatyag sa dughan'
        },
        'Shortness of Breath': {
          label: 'Mabudlay Magginhawa',
          desc: 'Kakulangan sa hangin, gahangos, ukon indi kahulag ang ginhawa'
        },
        'Fever': {
          label: 'Mataas nga Hilanat',
          desc: 'Mainit ang lawas, nagakurog, nagapalamalhas'
        },
        'Abdominal Pain': {
          label: 'Sakit sang Tiyan',
          desc: 'Grabe nga kulba sang tiyan, galusod, ukon nagapilipit'
        },
        'Headache': {
          label: 'Sakit sang Ulo',
          desc: 'Nagalukso-lukso nga sakit, galingin ang ulo, lipong'
        },
        'Injury / Trauma': {
          label: 'Disgrasya, Pilas, o Nabali',
          desc: 'Madalom nga pilas, nagadugo, nabali nga tul-an, nahulog'
        },
        'Cough': {
          label: 'Ubo nga Indi Mag-untat',
          desc: 'Sige-sige nga ubo, may plema sa dughan, masakit ang tutunlan'
        },
        'Other': {
          label: 'Iban Pa nga Balatian',
          desc: 'Iban pa nga pamatyag nga luyag mo isugid sa nurse'
        }
      }
    },
    bodyMap: {
      stepTitle: 'Diin Dampi sa Imo Lawas ang Nagasakit?',
      stepSubtitle: 'Pinduta ang parte sang lawas sa laragway ukon sa mga buton sa idalom',
      front: 'Sa Atubang',
      back: 'Sa Likod',
      frontShort: 'Atubang',
      backShort: 'Likod',
      regions: {
        Head: 'Ulo',
        Neck: 'Liog',
        Shoulder: 'Abaga',
        Chest: 'Dughan',
        Abdomen: 'Tiyan',
        Back: 'Likod',
        Arms: 'Takyag kag Kamot',
        Legs: 'Tiil kag Batiis'
      },
      selectedTitle: 'Mga Parte nga Napili',
      noneSelected: 'Wala pa sing napili (pinduta ang laragway ukon buton sa ibabaw)',
      orientationFront: 'Atubang nga Posisyon',
      orientationBack: 'Likod nga Posisyon',
      errorRequired: 'Palihog magpili sang bisan isa ka parte sang lawas nga nagasakit.',
      btnBack: 'Balik: Mga Sintomas',
      btnNext: 'Padayon: Kasakit kag Vitals'
    },
    painDuration: {
      stepTitle: 'Tikang 4 sang 5: Daw Ano Kasakit kag Pagsukol sang Pulso',
      stepSubtitle: 'Pilia kon daw ano kasakit kag isulod ang tudlo sa sensor agud masukol ang imo pulso kag oxygen',
      scaleTitle: '1. Daw Ano Kasakit ang Imo Ginabatyag Subong?',
      scaleSubtitle: 'Pilia ang numero nga nagasanto sa imo kasakit (0 = Wala Sakit, 10 = Grabe Katama)',
      durationTitle: '2. Pila Na Ka Oras ukon Adlaw nga Ginabatyag Ini?',
      durations: {
        'Just started (<1h)': 'Bag-o lang nagsugod (wala pa 1 ka oras)',
        '1–6 hours': '1 tubtob 6 ka oras',
        'Today (6–24h)': 'Subong nga adlaw (6 tubtob 24 ka oras)',
        'A few days': 'Pila na ka adlaw',
        'More than a week': 'Sobra na sa isa ka semana'
      },
      vitalsTitle: '3. Pagsukol sang Vital Signs (Sensor Bay sa Idalom)',
      vitalsSubtitle: 'Isulod ang imo tudlo sa nasanagan nga sensor sa idalom sang screen sa sulod sang 5 ka segundo',
      sensorReady: 'HANDA ANG SENSOR • OPTICAL PPG',
      sensorMeasuring: 'GINASUKOL ANG PULSO KAG OXYGEN... PABILIN NGA KALMA',
      sensorComplete: 'NATALA NA ANG VITALS • NALAKIP NA SA REKORD',
      heartRate: 'Kadasigon sang Tagipusuon',
      oxygen: 'Oxygen sa Dugo (SpO2)',
      perfusion: 'Perfusion Index',
      btnBack: 'Balik: Parte sang Lawas',
      btnNext: 'Padayon: Lantawa ang mga Sabat'
    },
    additional: {
      title: 'Dugang nga Impormasyon sa Ginabatyag',
      subtitle: 'May iban ka pa bala nga ginabatyag nga luyag mo mahibal-an sang nurse? (Opsyonal)',
      selectPrompt: 'Pilia ang mga Upod nga Sintomas:',
      notesLabel: 'Dugang nga Mensahe ukon Paathag (Opsyonal):',
      notesPlaceholder: 'Isulat ukon ihambal ang iban pa nga detalye...',
      voicePrompt: 'Ukon ihambal gamit ang mikropono:',
      items: {
        Nausea: 'Galingin ang Tiyan ukon Pagsuka',
        Dizziness: 'Lipong ukon Galikaw ang Panan-aw',
        'Loss of appetite': 'Wala Gana Magkaon',
        Fatigue: 'Grabe nga Kapoy kag Palangluya',
        Other: 'Iban Pa nga Ginabatyag'
      }
    },
    review: {
      stepTitle: 'Tikang 5 sang 5: Lantawa ang Imo mga Sabat Bag-o Ipadala',
      stepSubtitle: 'Siguruha nga husto ang impormasyon agud mabuligan ka sing maayo sang triage nurse',
      patientSection: 'Impormasyon sang Pasyente',
      symptomsSection: 'Ano ang Nagasakit',
      locationsSection: 'Diin Dampi sa Lawas',
      painSection: 'Kasakit kag Vital Signs',
      nameLabel: 'Ngalan:',
      dobLabel: 'Adlaw sang Pagkabun-ag:',
      genderLabel: 'Sekso:',
      contactLabel: 'Kontak:',
      idMethodLabel: 'ID nga Gingamit:',
      noSymptomsSelected: 'Wala sing napili nga sintomas',
      generalBody: 'Kabilugan / Tibuok Lawas',
      voiceMemoLabel: 'Voice Memo:',
      voiceMemoAttached: 'Nalakip para pamatian sang nurse',
      voiceMemoNone: 'Wala sing narekord',
      painScoreLabel: 'Iskor sang Kasakit:',
      durationLabel: 'Kabayad:',
      quickFingerCheckLabel: 'Pagsukol sang Tudlo:',
      sensorSkippedText: 'Ginlaktod ang sensor — Suklon sang nurse ang imo vitals sa triage desk',
      whatHappensNext: 'Ano ang Masunod Kon Mapadala ang Impormasyon?',
      step1Title: '1. Mabaton sang Nurse ang Detalye',
      step1Desc: 'Magaguwa dayon ang imo impormasyon sa screen sang triage nurse.',
      step2Title: '2. Kuhaa ang Imo Papel nga Tiket',
      step2Desc: 'Magaguwa ang tiket nga may numero sang imo linya sa idalom sang screen.',
      step3Title: '3. Magpungko sa Waiting Area',
      step3Desc: 'Palihog pungko. Tawgon sang nurse ang imo numero para sa personal nga eksaminasyon.',
      ticketPrintNote: 'Maga-print ang tiket sa idalom sang screen',
      nurseAlertNotice: 'Ang imo ginpalista igapadala dayon sa Triage Nurse station.',
      btnBack: 'Balik: Ilisi ang Sabat',
      btnSubmit: 'IPADALA SA TRIAGE NURSE'
    },
    submission: {
      stepTitle: 'Ipadala ang Rekord sa Pagpalista',
      readyTitle: 'Handa Na Ipadala sa Triage Desk',
      transmittingTitle: 'Ginatransmit ang Rekord...',
      description: 'Sa pagpindot sang ipadala, ang imo ginlista hilway kag sigurado nga makalab-ot sa Authorized Nurse Workstation sa Emergency Department.',
      disclaimerTitle: 'Importante nga Pahibalo sang Klinika:',
      disclaimerText: '"Ang TriageSense nagahatag lamang sang pauna nga impormasyon. Wala ini nagadiagnose sang balatian ukon nagailis sa personal nga triage sang nurse."',
      privacyAssurance: 'Nagasunod sa DOH Healthcare Privacy kag Data Protection Protocols',
      submitBtn: 'IPADALA ANG INTAKE SA TRIAGE DESK',
      submittingBtn: 'GINAPADALA ANG REKORD...',
      backBtn: 'Balik sa Paglantaw'
    },
    confirmation: {
      hospitalDept: 'WVSU MEDICAL CENTER • DEPARTAMENTO SANG EMERGENCY',
      title: 'Nakapalista Ka Na!',
      ticketReady: 'Tapos Na ang Pagpalista',
      queueLabel: 'NUMERO SANG IMO LINYA:',
      nurseWaiting: 'Palihog pungko sa waiting area. Tawgon sang triage nurse ang imo numero sa indi madugay.',
      nextStepAssessment: 'Masunod nga Tikang: Personal nga Pagtantiya sang Nurse',
      takeTicketSlot: 'Palihog kuhaa ang imo gi-print nga tiket sa idalom',
      mobileTracking: 'I-scan gamit ang cellphone para masubay ang pila bisan diin sa ospital',
      guideTitle: 'Ano ang imo himuon samtang nagahulat sa lobby:',
      guideStep1Title: '1. Uyati ang Imo Tiket',
      guideStep1Desc: 'Hupti ini nga papel. Amo ini ang imo opisyal nga rekord para sa sini nga pagpa-ospital.',
      guideStep2Title: '2. Bantayi ang mga Monitor',
      guideStep2Desc: 'Magwa ang imo numero sa screen sang lobby kaupod ang tunog.',
      guideStep3Title: '3. Kon Maglala ang Pamatyag',
      guideStep3Desc: 'Pahibalu-a gilayon ang triage nurse kon magbaskog ang kasakit ukon kabudlay sa pagginhawa.',
      resetTimerPrefix: 'Magabalik ang screen para sa masunod nga pasyente sa sulod sang',
      doneBtn: 'TAPUS NA'
    }
  },

  fil: {
    common: {
      back: 'Bumalik',
      continue: 'Magpatuloy',
      cancel: 'Kanselahin',
      confirm: 'Kumpirmahin',
      required: 'Kailangan',
      optional: 'Opsyonal',
      yearsOld: 'taong gulang',
      speaking: 'Nagsasalita...',
      readAloud: 'Pakinggan',
      step: 'Hakbang',
      of: 'ng',
      edit: 'Baguhin'
    },
    stepper: {
      stages: {
        info: 'Iyong Impormasyon',
        symptoms: 'Ang Sumasakit',
        bodyMap: 'Saan Sumasakit',
        painVitals: 'Sakit at Pulso',
        review: 'Suriin at Ipadala'
      },
      substeps: {
        'patient-info': 'Hakbang 1 ng 5 • Iyong Pangalan at Detalye',
        'symptoms': 'Hakbang 2 ng 5 • Sabihin ang Nararamdaman',
        'body-map': 'Hakbang 3 ng 5 • Pindutin Kung Saan Sumasakit',
        'pain-duration': 'Hakbang 4 ng 5 • Antas ng Sakit at Daliri',
        'review': 'Hakbang 5 ng 5 • Suriin Bago Ipadala sa Nurse'
      }
    },
    language: {
      badge: 'Pagpili ng Wika',
      title: 'Piliin ang Iyong Wika',
      subtitle: 'Piliin ang wikang mas komportable kang gamitin',
      regions: {
        hil: 'Ilonggo • Panay at Guimaras',
        en: 'Ingles • Standard Clinical',
        fil: 'Tagalog • Pambansang Wika',
        ceb: 'Bisaya • Gitnang Visayas'
      }
    },
    identification: {
      title: 'Pagkakakilanlan ng Pasyente',
      subtitle: 'Piliin kung paano mo nais magpakilala sa terminal na ito',
      scanning: 'Sinisuri',
      holdSteady: 'mangyaring huwag galawin...',
      options: {
        hospitalId: {
          title: 'WVSUMC Patient Hospital ID',
          desc: 'I-scan ang barcode sa Scanner Bay (kanan) o ilagay ang hospital ID number'
        },
        qrCode: {
          title: 'PhilHealth o National ID QR',
          desc: 'Itapat ang QR code sa ilalim ng Scanner Bay sa kanan'
        },
        nfc: {
          title: 'NFC Contactless Card Tap',
          desc: 'Itap ang hospital health card o PhilSys smart card sa NFC pad sa kaliwa'
        },
        manual: {
          title: 'Mano-manong Pagpapatala',
          desc: 'Magpatala gamit ang touchscreen keyboard sa screen'
        }
      }
    },
    painScale: {
      selected: 'Napili',
      rangeNoPain: '0 = Walang Sakit',
      rangeModerate: '5 = Katamtamang Sakit',
      rangeWorst: '10 = Pinakamatinding Sakit',
      tiers: {
        mild: {
          title: 'Mababang Sakit',
          desc: 'Bahagyang kirot; ganap na nakakakilos nang maayos.'
        },
        moderate: {
          title: 'Katamtamang Sakit',
          desc: 'Ramdam ang pananakit; nakakaabala sa mga pang-araw-araw na gawain.'
        },
        high: {
          title: 'Mataas na Sakit',
          desc: 'Matinding kirot; hirap mag-focus o gumalaw nang komportable.'
        },
        severe: {
          title: 'Napakasakit',
          desc: 'Hindi maipaliwanag na sakit; nangangailangan ng agarang pagsusuri ng clinician.'
        }
      }
    },
    durations: {
      'Less than 1 hour': 'Wala pang 1 oras',
      '1–6 hours': '1 hanggang 6 na oras',
      '6–24 hours': '6 hanggang 24 na oras',
      '1–3 days': '1 hanggang 3 araw',
      'More than 3 days': 'Mahigit 3 araw',
      'Not sure': 'Hindi sigurado'
    },
    assistanceModal: {
      title: 'Humingi ng Tulong sa Kawani ng ER?',
      badge: 'Para sa Agaran at Nakamamatay na Emerhensya',
      prompt: 'Piliin ito kung ang pasyente ay may alinman sa mga sumusunod:',
      symptoms: [
        'Matinding paninikip o sakit sa dibdib',
        'Hindi makahinga o kapos sa hangin',
        'Malakas at tuloy-tuloy na pagdurugo',
        'Nawawalan ng malay o nangingisay'
      ],
      instruction: 'Piliin ito kung ang pasyente ay may matinding paninikip ng dibdib, hindi makahinga, malakas ang pagdurugo, o nawawalan ng malay.',
      nurseArriving: 'Isang emergency nurse ang agad na pupunta sa kiosk na ito upang tumulong.',
      confirmBtn: 'OO, HUMINGI NG TULONG',
      cancelBtn: 'Kanselahin at Magpatuloy sa Kiosk'
    },
    sensorBay: {
      slotInstruction: 'Mangyaring ipasok ang iyong hintuturo sa may ilaw na Vital Signs Sensor Bay sa ibaba ng screen.',
      slotDurationNotice: '5 segundo lamang. Sinusukat ang SpO₂ at pulso para sa emergency doctor at nurse.',
      lookDownNotice: 'TINGNAN SA IBABA: Pisikal na Sensor sa Ilalim ng Screen',
      lookDownShort: 'TINGNAN SA IBABA ↓',
      doNotTapScreen: 'Huwag pindutin ang screen • Ipasok ang daliri sa umiilaw na slot sa ilalim ng kiosk',
      startScanBtn: 'Simulan ang Pagsusuri ng Vitals',
      skipBtn: 'Laktawan ang Pagsusuri',
      clinicalDisclaimer: 'Paunawa ng Klinika: Ang vitals sa kiosk ay para sa paunang pagsusuri. Susuriing muli ng triage nurse kapag tinawag ang iyong pangalan.'
    },
    header: {
      title: 'WVSUMC',
      subtitle: 'PAGPAPALISTA SA EMERGENCY ROOM',
      emergencyHelp: 'SAKLOLO',
      readAloudPrompt: 'Basahin nang malakas ang tagubilin sa screen'
    },
    welcome: {
      badge: 'Kagawaran ng Emergency Medicine • Triage Intake',
      title: 'Maligayang Pagdating sa WVSUMC Emergency Room',
      subtitle: 'Mabilisang Pagpapalista • Sabihin ang iyong nararamdaman upang matulungan ka agad ng nurse',
      instruction: 'Pindutin ang berdeng button sa ibaba upang magsimula. Direktang matatanggap ng triage nurse ang iyong impormasyon.',
      startBtn: 'SIMULAN ANG PAGPAPALISTA',
      dispatchedTitle: 'May Triage Nurse na Papunta sa Iyo',
      dispatchedSubtitle: 'Mangyaring manatili rito sa kiosk station. May nurse na tutulong sa iyo agad.',
      emergencyTitle: 'Nanganganib ang Buhay?',
      emergencySubtitle: 'Matinding paninikip ng dibdib, labis na pagdurugo, o hirap huminga? Pindutin para sa agarang tulong ng nurse.',
      requestNurse: 'HUMINGI NG AGARANG TULONG',
      nurseCalled: 'NATAWAG NA ANG NURSE',
      privacyNotice: 'WVSUMC Emergency Department • Protektado ng Republic Act 10173 (Data Privacy Act)'
    },
    patientInfo: {
      stepTitle: 'Hakbang 1 ng 5: Sino ang magpapatingin ngayon?',
      stepSubtitle: 'Ilagay ang iyong pangalan at kaarawan upang maihanda ng nurse ang iyong rekord',
      fullNameLabel: 'Buong Pangalan (Pangalan, Gitnang Pangalan, Apelyido):',
      fullNamePlaceholder: 'Halimbawa: Juan Dela Cruz',
      dobLabel: 'Araw ng Kapanganakan (Kaarawan):',
      dobPlaceholder: 'YYYY-MM-DD',
      genderLabel: 'Kasarian:',
      genderMale: 'Lalaki',
      genderFemale: 'Babae',
      genderOther: 'Iba pa',
      contactLabel: 'Numero ng Telepono / Cellphone:',
      contactPlaceholder: '09XX-XXX-XXXX',
      voiceDictate: 'Gamitin ang Boses',
      voiceListening: 'Nakikinig... Magsalita nang malinaw',
      errorEmptyName: 'Mangyaring ilagay ang pangalan ng pasyente o gamitin ang mikropono upang magpatuloy.',
      errorInvalidDob: 'Mangyaring pumili ng tamang araw ng kapanganakan.',
      errorEmptyGender: 'Mangyaring pumili ng kasarian ng pasyente.',
      btnBack: 'Bumalik sa Simula',
      btnNext: 'Magpatuloy: Ano ang Nararamdaman?'
    },
    keyboard: {
      typing: 'Isinusulat sa',
      space: 'ESPASYO',
      clear: 'BURAHIN',
      hide: 'Itago ang Keyboard',
      show: 'Buksan ang Touchscreen Keyboard',
      nextField: 'Susunod',
      done: 'TAPOS',
      fullName: 'Buong Pangalan',
      contact: 'Numero ng Telepono',
      dob: 'Kaarawan',
      shortcut09: '09'
    },
    symptoms: {
      stepTitle: 'Ano ang Iyong Nararamdaman Ngayon?',
      stepSubtitle: 'Piliin ang lahat ng sumasakit o iyong nararamdaman',
      tapAll: '(Piliin ang lahat ng nararapat)',
      voiceCardTitle: 'Mas nais mo bang magsalita kaysa pumindot?',
      voiceCardSubtitle: 'Pindutin nang matagal para sa 5-segundong voice memo para sa triage nurse',
      voiceRecording: 'Itinatala ang boses...',
      voiceSaved: 'Naitala na ang boses para sa nurse. Pindutin muli kung nais palitan.',
      errorRequired: 'Mangyaring pumili ng kahit isang sintomas o piliin ang "Iba Pang Nararamdaman".',
      selectedBadge: 'napili',
      btnBack: 'Bumalik: Impormasyon',
      btnNext: 'Magpatuloy: Saan sa Katawan?',
      items: {
        'Chest Pain': {
          label: 'Paninikip o Sakit sa Dibdib',
          desc: 'Mabigat, pumipisil, o naninikip na pakiramdam sa dibdib'
        },
        'Shortness of Breath': {
          label: 'Hirap Huminga',
          desc: 'Kinakapos ng hininga, humahingal, o hirap kumuha ng hangin'
        },
        'Fever': {
          label: 'Mataas na Lagnat at Pangangatog',
          desc: 'Napakainit ng katawan, nanginginig, pinapawisan'
        },
        'Abdominal Pain': {
          label: 'Sakit ng Tiyan',
          desc: 'Matinding pananakit, pamumulikat, o paghilab ng tiyan'
        },
        'Headache': {
          label: 'Matinding Sakit ng Ulo',
          desc: 'Pumipintig na migraine, pagkahilo, pagkalito'
        },
        'Injury / Trauma': {
          label: 'Aksidente, Sugat, o Bali',
          desc: 'Malalim na sugat, pagdurugo, nabaling buto, pagkahulog'
        },
        'Cough': {
          label: 'Ubong Hindi Humihinto',
          desc: 'Patuloy na pag-ubo, may plema sa dibdib, masakit na lalamunan'
        },
        'Other': {
          label: 'Iba Pang Karamdaman',
          desc: 'Iba pang nais mong ipagbigay-alam sa nurse'
        }
      }
    },
    bodyMap: {
      stepTitle: 'Saan sa Iyong Katawan ang Sumasakit?',
      stepSubtitle: 'Pindutin ang bahagi ng katawan sa larawan o sa mga button sa ibaba',
      front: 'Harap',
      back: 'Likod',
      frontShort: 'Harap',
      backShort: 'Likod',
      regions: {
        Head: 'Ulo',
        Neck: 'Leeg',
        Shoulder: 'Balikat',
        Chest: 'Dibdib',
        Abdomen: 'Tiyan',
        Back: 'Likod',
        Arms: 'Braso at Kamay',
        Legs: 'Binti at Paa'
      },
      selectedTitle: 'Mga Bahaging Napili',
      noneSelected: 'Wala pang napili (pindutin ang larawan o mga button sa itaas)',
      orientationFront: 'Harap na Posisyon',
      orientationBack: 'Likod na Posisyon',
      errorRequired: 'Mangyaring pumili ng kahit isang bahagi ng katawan na sumasakit.',
      btnBack: 'Bumalik: Mga Sintomas',
      btnNext: 'Magpatuloy: Sakit at Vitals'
    },
    painDuration: {
      stepTitle: 'Hakbang 4 ng 5: Gaano Kasakit at Pagsusuri ng Pulso',
      stepSubtitle: 'Piliin ang antas ng sakit at ipasok ang daliri sa sensor sa ibaba para sa pulso at oxygen',
      scaleTitle: '1. Gaano Kasakit ang Nararamdaman Mo Ngayon?',
      scaleSubtitle: 'Piliin ang numerong tumutugma sa iyong sakit (0 = Walang Sakit, 10 = Napakasakit)',
      durationTitle: '2. Gaano Na Katagal ang Nararamdamang Ito?',
      durations: {
        'Just started (<1h)': 'Kasisimula lamang (wala pang 1 oras)',
        '1–6 hours': '1 hanggang 6 na oras',
        'Today (6–24h)': 'Ngayong araw (6 hanggang 24 na oras)',
        'A few days': 'Ilang araw na',
        'More than a week': 'Mahigit isang linggo na'
      },
      vitalsTitle: '3. Pagsusuri ng Vital Signs (Sensor Bay sa Ibaba)',
      vitalsSubtitle: 'Ipasok ang iyong hintuturo sa may ilaw na sensor bay sa ibaba ng screen nang 5 segundo',
      sensorReady: 'HANDA ANG SENSOR • OPTICAL PPG',
      sensorMeasuring: 'SINUSURI ANG PULSO AT OXYGEN... MANATILING KALMADO',
      sensorComplete: 'NAITALA ANG VITALS • NALAKIP NA SA REKORD',
      heartRate: 'Bilis ng Puso (Heart Rate)',
      oxygen: 'Oxygen sa Dugo (SpO2)',
      perfusion: 'Perfusion Index',
      btnBack: 'Bumalik: Bahagi ng Katawan',
      btnNext: 'Magpatuloy: Suriin ang mga Sagot'
    },
    additional: {
      title: 'Karagdagang Impormasyon sa Sintomas',
      subtitle: 'May iba ka pa bang nararamdaman na nais ipaalam sa nurse? (Opsyonal)',
      selectPrompt: 'Piliin ang Iba Pang Kasamang Sintomas:',
      notesLabel: 'Karagdagang Mensahe o Paliwanag (Opsyonal):',
      notesPlaceholder: 'I-type o sabihin ang iba pang detalye ng iyong sakit...',
      voicePrompt: 'O sabihin gamit ang mikropono:',
      items: {
        Nausea: 'Pagsusuka o Pagkahilo ng Tiyan',
        Dizziness: 'Pagkahilo o Pag-ikot ng Paligid',
        'Loss of appetite': 'Kawalan ng Gana Kumain',
        Fatigue: 'Labis na Panghihina ng Katawan',
        Other: 'Iba Pang Karamdaman'
      }
    },
    review: {
      stepTitle: 'Hakbang 5 ng 5: Suriin ang Sagot Bago Ipadala',
      stepSubtitle: 'Tiyaking tama ang impormasyon upang matulungan ka nang maayos ng triage nurse',
      patientSection: 'Impormasyon ng Pasyente',
      symptomsSection: 'Ang Sumasakit',
      locationsSection: 'Bahagi sa Katawan',
      painSection: 'Antas ng Sakit at Vitals',
      nameLabel: 'Pangalan:',
      dobLabel: 'Kaarawan:',
      genderLabel: 'Kasarian:',
      contactLabel: 'Kontak:',
      idMethodLabel: 'Ginamit na ID:',
      noSymptomsSelected: 'Walang napiling sintomas',
      generalBody: 'Pangkalahatan / Buong Katawan',
      voiceMemoLabel: 'Voice Memo:',
      voiceMemoAttached: 'Nakalakip para pakinggan ng nurse',
      voiceMemoNone: 'Walang naitala',
      painScoreLabel: 'Iskor ng Sakit:',
      durationLabel: 'Tagal:',
      quickFingerCheckLabel: 'Pagsusuri ng Daliri:',
      sensorSkippedText: 'Nilaktawan ang sensor — Susukatin ng nurse ang vitals sa triage desk',
      whatHappensNext: 'Ano ang Susunod Pagkatapos Ipadala?',
      step1Title: '1. Matatanggap ng Nurse ang Detalye',
      step1Desc: 'Lalabas agad ang iyong impormasyon sa screen ng triage nurse.',
      step2Title: '2. Kunin ang Iyong Papel na Tiket',
      step2Desc: 'Awtomatikong lalabas ang tiket na may numero sa pila sa ibaba ng screen.',
      step3Title: '3. Maupo sa Waiting Area',
      step3Desc: 'Mangyaring maupo. Tatawagin ng nurse ang iyong numero para sa personal na pagsusuri.',
      ticketPrintNote: 'Awtomatikong lalabas ang tiket sa ibaba ng screen',
      nurseAlertNotice: 'Ang iyong pagpapalista ay agarang ipapadala sa Triage Nurse station.',
      btnBack: 'Bumalik: Baguhin ang Sagot',
      btnSubmit: 'IPADALA SA TRIAGE NURSE'
    },
    submission: {
      stepTitle: 'Isumite ang Rekord ng Pagpapalista',
      readyTitle: 'Handa nang Ipadala sa Triage Desk',
      transmittingTitle: 'Ipinapadala ang Rekord...',
      description: 'Sa pagpindot ng isumite, ligtas at kumpidensyal na maipapadala ang iyong rekord sa Authorized Nurse Workstation sa Emergency Department.',
      disclaimerTitle: 'Mahalagang Paunawa ng Klinika:',
      disclaimerText: '"Ang TriageSense ay nagbibigay lamang ng paunang impormasyon. Hindi ito nagbibigay ng pinal na diyagnosis o pumapalit sa personal na triage ng nurse."',
      privacyAssurance: 'Sumusunod sa mga Pamantayan ng DOH Healthcare Privacy at Data Protection',
      submitBtn: 'ISUMITE ANG INTAKE SA TRIAGE DESK',
      submittingBtn: 'IPINAPADALA ANG REKORD...',
      backBtn: 'Bumalik sa Pagsusuri'
    },
    confirmation: {
      hospitalDept: 'WVSU MEDICAL CENTER • KAGAWARAN NG EMERGENCY',
      title: 'Matagumpay ang Pagpapalista!',
      ticketReady: 'Kumpleto na ang Pagpapalista',
      queueLabel: 'NUMERO SA PILA:',
      nurseWaiting: 'Mangyaring maupo sa waiting area. Tatawagin ng triage nurse ang iyong numero sa lalong madaling panahon.',
      nextStepAssessment: 'Susunod na Hakbang: Personal na Pagsusuri ng Nurse',
      takeTicketSlot: 'Pakikuha ang iyong nakalimbag na tiket sa ibaba',
      mobileTracking: 'I-scan gamit ang cellphone upang masubaybayan ang pila kahit saan sa ospital',
      guideTitle: 'Ano ang gagawin habang naghihintay sa lobby:',
      guideStep1Title: '1. Hawakan ang Iyong Tiket',
      guideStep1Desc: 'Itabi ang papel na ito. Ito ang iyong opisyal na tala para sa pagpapatingin na ito.',
      guideStep2Title: '2. Bantayan ang mga Monitor',
      guideStep2Desc: 'Lalabas ang iyong numero sa mga screen ng lobby kasabay ng anunsyo.',
      guideStep3Title: '3. Kung Lumala ang Pakiramdam',
      guideStep3Desc: 'Ipagbigay-alam agad sa triage nurse kung lumubha ang pananakit o hirap sa paghinga.',
      resetTimerPrefix: 'Babalik ang screen para sa susunod na pasyente sa loob ng',
      doneBtn: 'TAPOS NA'
    }
  },

  ceb: {
    common: {
      back: 'Balik',
      continue: 'Padayon',
      cancel: 'Kanselahon',
      confirm: 'Kumpirmahon',
      required: 'Gikinahanglan',
      optional: 'Opsyonal',
      yearsOld: 'ka tuig',
      speaking: 'Nagsulti...',
      readAloud: 'Paminawa',
      step: 'Lakang',
      of: 'sa',
      edit: 'Usba'
    },
    stepper: {
      stages: {
        info: 'Imong Impormasyon',
        symptoms: 'Unsay Nagsakit',
        bodyMap: 'Asa Dapit',
        painVitals: 'Kasakit ug Pulso',
        review: 'Tan-aw ug Ipadala'
      },
      substeps: {
        'patient-info': 'Lakang 1 sa 5 • Imong Ngalan ug Detalye',
        'symptoms': 'Lakang 2 sa 5 • Isulti ang Gibati',
        'body-map': 'Lakang 3 sa 5 • Pindota Asa Nagsakit',
        'pain-duration': 'Lakang 4 sa 5 • Kasakit ug Pagsukod Tudlo',
        'review': 'Lakang 5 sa 5 • Tan-awa Bag-o Ipadala sa Nurse'
      }
    },
    language: {
      badge: 'Pagpili og Pinulongan',
      title: 'Pilia ang Imong Sinultihan',
      subtitle: 'Pilia ang pinulongan nga mas komportable ka gamiton',
      regions: {
        hil: 'Ilonggo • Panay ug Guimaras',
        en: 'Ingles • Standard Clinical',
        fil: 'Tagalog • Pambansang Wika',
        ceb: 'Bisaya • Central Visayas'
      }
    },
    identification: {
      title: 'Pagpaila sa Pasyente',
      subtitle: 'Pilia kung giunsa nimo gustong magpaila niini nga terminal',
      scanning: 'Gisusi',
      holdSteady: 'palihug ayaw lihoka...',
      options: {
        hospitalId: {
          title: 'WVSUMC Patient Hospital ID',
          desc: 'I-scan ang barcode sa Scanner Bay (tuo) o isulat ang imong hospital ID number'
        },
        qrCode: {
          title: 'PhilHealth o National ID QR',
          desc: 'Itungod ang QR code ilalom sa Scanner Bay sa tuo'
        },
        nfc: {
          title: 'NFC Contactless Card Tap',
          desc: 'I-tap ang hospital health card o PhilSys card sa NFC pad sa wala'
        },
        manual: {
          title: 'Mano-mano nga Pagpatala',
          desc: 'Ibutang ang detalye gamit ang touchscreen keyboard sa screen'
        }
      }
    },
    painScale: {
      selected: 'Napili',
      rangeNoPain: '0 = Walay Sakit',
      rangeModerate: '5 = Sakto Lang nga Sakit',
      rangeWorst: '10 = Grabe Kaayo nga Sakit',
      tiers: {
        mild: {
          title: 'Hinay nga Sakit',
          desc: 'Diyutay nga pamati; makalihok pa og tarong.'
        },
        moderate: {
          title: 'Sakto Lang nga Sakit',
          desc: 'Mabati gyud; makabalda na sa ordinaryong mga buhat.'
        },
        high: {
          title: 'Kusog nga Sakit',
          desc: 'Grabe nga kasakit; lisod mag-focus o molihok og komportable.'
        },
        severe: {
          title: 'Grabe Kaayo nga Sakit',
          desc: 'Dili na maagwanta nga kasakit; kinahanglan og dinalian nga pag-atiman sa doktor ug nurse.'
        }
      }
    },
    durations: {
      'Less than 1 hour': 'Wala pa 1 ka oras',
      '1–6 hours': '1 hangtod 6 ka oras',
      '6–24 hours': '6 hangtod 24 ka oras',
      '1–3 days': '1 hangtod 3 ka adlaw',
      'More than 3 days': 'Sobra sa 3 ka adlaw',
      'Not sure': 'Dili sigurado'
    },
    assistanceModal: {
      title: 'Mangayo og Tabang sa Nurse?',
      badge: 'Alang sa Kuyaw sa Kinabuhi nga Emerhensya',
      prompt: 'Pilia kini kung ang pasyente adunay bisan asa sa mosunod:',
      symptoms: [
        'Grabe nga sakit sa dughan',
        'Dili makaginhawa o naghangos',
        'Kusog ug walay hunong nga pagdugo',
        'Nawad-an sa panimuot o nagkumbulsyon'
      ],
      instruction: 'Pilia kini kung ang pasyente adunay grabe nga sakit sa dughan, dili makaginhawa, kusog ang pagdugo, o nawad-an sa panimuot.',
      nurseArriving: 'Adunay emergency nurse nga moabot dayon niini nga kiosk aron motabang.',
      confirmBtn: 'OO, MANGAYO OG TABANG',
      cancelBtn: 'Kanselahon ug Mopadayon sa Kiosk'
    },
    sensorBay: {
      slotInstruction: 'Palihug isulod ang imong tudlo sa may suga nga Vital Signs Sensor Bay sa ubos sa screen.',
      slotDurationNotice: '5 ka segundo lamang. Ginarekord ang SpO₂ ug pulso para sa emergency doctor ug nurse.',
      lookDownNotice: 'TAN-AWA SA UBOS: Pisikal nga Sensor sa Ilalom sa Screen',
      lookDownShort: 'TAN-AWA SA UBOS ↓',
      doNotTapScreen: 'Ayaw pindota ang screen • Isulod ang tudlo sa nagasiga nga slot sa ubos sa kiosk',
      startScanBtn: 'Sugdan ang Pagsukod sa Vitals',
      skipBtn: 'Laktawi ang Pagsukod',
      clinicalDisclaimer: 'Pahibalo sa Klinika: Ang vitals sa kiosk para sa pasiunang pagsusi. Sukdon kini pag-usab sa triage nurse inig tawag sa imong ngalan.'
    },
    header: {
      title: 'WVSUMC',
      subtitle: 'PAGPATALA SA EMERGENCY ROOM',
      emergencyHelp: 'TABANG',
      readAloudPrompt: 'Basahon og kusog ang mga direksyon sa screen'
    },
    welcome: {
      badge: 'Departamento sa Emergency Medicine • Triage Intake',
      title: 'Maayong Pag-abot sa WVSUMC Emergency Room',
      subtitle: 'Dali nga Pagpatala • Isulti ang imong gibati aron matabangan ka dayon sa nurse',
      instruction: 'Pindota ang berde nga buton sa ubos aron magsugod. Ang imong impormasyon direktang maabot sa triage nurse on duty.',
      startBtn: 'SUGOD SA PAGPATALA',
      dispatchedTitle: 'Adunay Triage Nurse nga Nagpadulong Kanimo',
      dispatchedSubtitle: 'Palihug pabilin dinhi sa kiosk station. Dunay nurse nga motabang kanimo dayon.',
      emergencyTitle: 'Kuyaw sa Kinabuhi nga Emerhensya?',
      emergencySubtitle: 'Grabe nga sakit sa dughan, kusog nga pagdugo, o lisod moginhawa? Pindota alang sa dinaliang tabang sa nurse.',
      requestNurse: 'MANGAYO OG TABANG SA NURSE',
      nurseCalled: 'NATAWAG NA ANG NURSE',
      privacyNotice: 'WVSUMC Emergency Department • Gipanalipdan ubos sa Republic Act 10173 (Data Privacy Act)'
    },
    patientInfo: {
      stepTitle: 'Lakang 1 sa 5: Kinsa ang magpatambal karon?',
      stepSubtitle: 'Palihug isuwat ang imong ngalan ug adlawng natawhan aron maandam sa nurse ang imong rekord',
      fullNameLabel: 'Tibuok Ngalan (Ngalan, Tunga, Apelyido):',
      fullNamePlaceholder: 'Pananglitan: Juan Dela Cruz',
      dobLabel: 'Adlawng Natawhan:',
      dobPlaceholder: 'YYYY-MM-DD',
      genderLabel: 'Sekso:',
      genderMale: 'Lalaki',
      genderFemale: 'Babaye',
      genderOther: 'Uban pa',
      contactLabel: 'Numero sa Telepono / Cellphone:',
      contactPlaceholder: '09XX-XXX-XXXX',
      voiceDictate: 'I-rekord ang Tingog',
      voiceListening: 'Namati... Isulti og klaro',
      errorEmptyName: 'Palihug isuwat ang ngalan sa pasyente o gamita ang mikropono aron mopadayon.',
      errorInvalidDob: 'Palihug pagpili og saktong adlawng natawhan.',
      errorEmptyGender: 'Palihug pagpili og sekso sa pasyente.',
      btnBack: 'Balik sa Sinugdanan',
      btnNext: 'Padayon: Unsay Gibati?'
    },
    keyboard: {
      typing: 'Ginasulat sa',
      space: 'ESPASYO',
      clear: 'PAPAS',
      hide: 'Itago ang Keyboard',
      show: 'Ablihan ang Touchscreen Keyboard',
      nextField: 'Sunod',
      done: 'HUMAN',
      fullName: 'Tibuok Ngalan',
      contact: 'Numero sa Telepono',
      dob: 'Adlawng Natawhan',
      shortcut09: '09'
    },
    symptoms: {
      stepTitle: 'Unsay Imong Gibati Karon?',
      stepSubtitle: 'Pilia ang tanan nga nagasakit o imong gibati',
      tapAll: '(Pilia ang tanan nga angay)',
      voiceCardTitle: 'Mas gusto ba nimo mosulti kaysa mopindot?',
      voiceCardSubtitle: 'Pindota og dugay para sa 5-segundo nga voice memo para sa triage nurse',
      voiceRecording: 'Ginatala ang tingog...',
      voiceSaved: 'Narecord na ang tingog para sa nurse. Pindota pag-usab kung gusto nimo usbon.',
      errorRequired: 'Palihug pagpili og bisan usa ka gibati o pilia ang "Uban Pang Gibati".',
      selectedBadge: 'napili',
      btnBack: 'Balik: Impormasyon',
      btnNext: 'Padayon: Asa Dapit sa Lawas?',
      items: {
        'Chest Pain': {
          label: 'Sakit sa Dughan',
          desc: 'Naghuot, nagpiot, o bug-at nga pamati sa dughan'
        },
        'Shortness of Breath': {
          label: 'Lisod Moginhawa',
          desc: 'Kulang sa hangin, naghangos, o naghupos ang ginhawa'
        },
        'Fever': {
          label: 'Taas nga Hilanat',
          desc: 'Init kaayo ang lawas, nagkurog, gipaningot'
        },
        'Abdominal Pain': {
          label: 'Sakit sa Tiyan',
          desc: 'Grabe nga sakit sa tiyan, naglubag, o nagkuriat'
        },
        'Headache': {
          label: 'Sakit sa Ulo',
          desc: 'Nagsakit og maayo, nagtuyok ang panan-aw, nalipong'
        },
        'Injury / Trauma': {
          label: 'Aksidente, Samad, o Nabali',
          desc: 'Lalom nga samad, nagdugo, nabali nga bukog, nahulog'
        },
        'Cough': {
          label: 'Ubo nga Dili Moundang',
          desc: 'Sige og ubo, naay plema sa dughan, sakit ang tutunlan'
        },
        'Other': {
          label: 'Uban Pang Gibati',
          desc: 'Uban pang mga gibati nga gusto nimong isulti sa nurse'
        }
      }
    },
    bodyMap: {
      stepTitle: 'Asa Dapit sa Imong Lawas ang Nagsakit?',
      stepSubtitle: 'Pindota ang parte sa lawas sa hulagway o sa mga buton sa ubos',
      front: 'Sa Atubangan',
      back: 'Sa Likod',
      frontShort: 'Atubangan',
      backShort: 'Likod',
      regions: {
        Head: 'Ulo',
        Neck: 'Liog',
        Shoulder: 'Abaga',
        Chest: 'Dughan',
        Abdomen: 'Tiyan',
        Back: 'Likod',
        Arms: 'Bukton ug Kamot',
        Legs: 'Batiis ug Tiil'
      },
      selectedTitle: 'Mga Bahin nga Napili',
      noneSelected: 'Wala pay napili (pindota ang hulagway o mga buton sa ibabaw)',
      orientationFront: 'Atubangan nga Posisyon',
      orientationBack: 'Likod nga Posisyon',
      errorRequired: 'Palihug pagpili og bisan usa ka bahin sa lawas nga nagasakit.',
      btnBack: 'Balik: Mga Sintomas',
      btnNext: 'Padayon: Kasakit ug Vitals'
    },
    painDuration: {
      stepTitle: 'Lakang 4 sa 5: Unsa Ka Sakit ug Pagsukod sa Pulso',
      stepSubtitle: 'Pilia unsa ka sakit ug isulod ang tudlo sa sensor sa ubos aron masukod ang pulso ug oxygen',
      scaleTitle: '1. Unsa Ka Sakit ang Imong Gibati Karon?',
      scaleSubtitle: 'Pilia ang numero nga nagtakdo sa imong sakit (0 = Walay Sakit, 10 = Grabe Kaayo)',
      durationTitle: '2. Unsa Na Ka Dugay nga Gibati Kini?',
      durations: {
        'Just started (<1h)': 'Bag-o pa nagsugod (wala pa 1 ka oras)',
        '1–6 hours': '1 hangtod 6 ka oras',
        'Today (6–24h)': 'Karon adlawa (6 hangtod 24 ka oras)',
        'A few days': 'Pipila na ka adlaw',
        'More than a week': 'Sobra na sa usa ka semana'
      },
      vitalsTitle: '3. Pagsukod sa Vital Signs (Sensor Bay sa Ubos)',
      vitalsSubtitle: 'Isulod ang imong tudlo sa may suga nga sensor bay sa ubos sa screen sulod sa 5 ka segundo',
      sensorReady: 'ANDA ANG SENSOR • OPTICAL PPG',
      sensorMeasuring: 'GISUKOD ANG PULSO UG OXYGEN... PABILIN NGA KALMA',
      sensorComplete: 'NAREKORD ANG VITALS • NALAKIP NA SA REKORD',
      heartRate: 'Pitik sa Kasingkasing',
      oxygen: 'Oxygen sa Dugo (SpO2)',
      perfusion: 'Perfusion Index',
      btnBack: 'Balik: Parte sa Lawas',
      btnNext: 'Padayon: Tan-awa ang mga Tubag'
    },
    additional: {
      title: 'Dugang nga Impormasyon sa Gibati',
      subtitle: 'Naa pa ba kay laing gibati nga gusto nimong mahibaloan sa nurse? (Opsyonal)',
      selectPrompt: 'Pilia ang mga Kaubang Sintomas:',
      notesLabel: 'Dugang nga Mensahe o Pagpasabot (Opsyonal):',
      notesPlaceholder: 'I-type o isulti ang ubang detalye sa imong sakit...',
      voicePrompt: 'O isulti gamit ang mikropono:',
      items: {
        Nausea: 'Kasukaon o Pagsuka',
        Dizziness: 'Pagkalipong o Pagtuyok sa Panan-aw',
        'Loss of appetite': 'Walay Gana Mokaon',
        Fatigue: 'Grabe nga Kaluyahon sa Lawas',
        Other: 'Uban Pang Gibati'
      }
    },
    review: {
      stepTitle: 'Lakang 5 sa 5: Tan-awa ang Imong mga Tubag Bag-o Ipadala',
      stepSubtitle: 'Siguruha nga husto ang impormasyon aron maatiman ka og tarong sa triage nurse',
      patientSection: 'Impormasyon sa Pasyente',
      symptomsSection: 'Unsay Nagsakit',
      locationsSection: 'Asa Dapit sa Lawas',
      painSection: 'Kasakit ug Vital Signs',
      nameLabel: 'Ngalan:',
      dobLabel: 'Adlawng Natawhan:',
      genderLabel: 'Sekso:',
      contactLabel: 'Kontak:',
      idMethodLabel: 'ID nga Gigamit:',
      noSymptomsSelected: 'Walay napili nga sintomas',
      generalBody: 'Tibuok / Tibuok Lawas',
      voiceMemoLabel: 'Voice Memo:',
      voiceMemoAttached: 'Nalakip aron paminawon sa nurse',
      voiceMemoNone: 'Walay narekord',
      painScoreLabel: 'Iskor sa Kasakit:',
      durationLabel: 'Kadugayon:',
      quickFingerCheckLabel: 'Pagsukod sa Tudlo:',
      sensorSkippedText: 'Gilikayan ang sensor — Sukdon sa nurse ang vitals sa triage desk',
      whatHappensNext: 'Unsay Masunod Human Mapadala?',
      step1Title: '1. Madawat sa Nurse ang Detalye',
      step1Desc: 'Mogawas dayon ang imong impormasyon sa screen sa triage nurse.',
      step2Title: '2. Kuhaa ang Imong Papel nga Tiket',
      step2Desc: 'Awtomatikong mogawas ang tiket nga may numero sa linya sa ubos sa screen.',
      step3Title: '3. Lingkod sa Waiting Area',
      step3Desc: 'Palihug lingkod. Tawgon sa nurse ang imong numero para sa personal nga pagsusi.',
      ticketPrintNote: 'Moprint ang tiket sa ubos sa screen',
      nurseAlertNotice: 'Ang imong gipanglista ipadala dayon ngadto sa Triage Nurse station.',
      btnBack: 'Balik: Usba ang Tubag',
      btnSubmit: 'IPADALA SA TRIAGE NURSE'
    },
    submission: {
      stepTitle: 'Ipadala ang Rekord sa Pagpatala',
      readyTitle: 'Andam Na Ipadala sa Triage Desk',
      transmittingTitle: 'Gipadala ang Rekord...',
      description: 'Inig pindot sa pagpadala, luwas ug pribado nga maabot ang imong rekord sa Authorized Nurse Workstation sa Emergency Department.',
      disclaimerTitle: 'Importante nga Pahibalo sa Klinika:',
      disclaimerText: '"Ang TriageSense naghatag lamang og pasiunang impormasyon. Wala kini nagahatag og pinal nga pagsusi sa sakit o nagpuli sa personal nga triage sa nurse."',
      privacyAssurance: 'Nagsunod sa mga Sumbanan sa DOH Healthcare Privacy ug Data Protection',
      submitBtn: 'IPADALA ANG INTAKE SA TRIAGE DESK',
      submittingBtn: 'GIPADALA ANG REKORD...',
      backBtn: 'Balik sa Pagsusi'
    },
    confirmation: {
      hospitalDept: 'WVSU MEDICAL CENTER • DEPARTAMENTO SA EMERGENCY',
      title: 'Malampuson ang Pagpatala!',
      ticketReady: 'Kompleto na ang Pagpatala',
      queueLabel: 'NUMERO SA IMONG LINYA:',
      nurseWaiting: 'Palihug lingkod sa waiting area. Tawgon sa triage nurse ang imong numero sa dili madugay.',
      nextStepAssessment: 'Sunod nga Lakang: Personal nga Pagsusi sa Nurse',
      takeTicketSlot: 'Palihug kuhaa ang imong gi-print nga tiket sa ubos',
      mobileTracking: 'I-scan gamit ang cellphone aron masubay ang linya bisan asa sa ospital',
      guideTitle: 'Unsa ang buhaton samtang naghulat sa lobby:',
      guideStep1Title: '1. Hupti ang Imong Tiket',
      guideStep1Desc: 'Tipigi kining papel nga tiket. Mao kini ang imong opisyal nga rekord.',
      guideStep2Title: '2. Tan-awa ang mga Monitor',
      guideStep2Desc: 'Mogawas ang imong numero sa mga display screen inubanan sa tingog.',
      guideStep3Title: '3. Kon Mosamot ang Gibati',
      guideStep3Desc: 'Pahibalo dayon sa triage nurse kon mosamot ang kasakit o kalisod sa pagginhawa.',
      resetTimerPrefix: 'Mobalik ang screen alang sa sunod nga pasyente sulod sa',
      doneBtn: 'HUMAN NA'
    }
  }
};

/**
 * Helper to resolve nested dot-separated keys, e.g. 'welcome.title'
 */
export function getTranslation(lang, key, fallback = '') {
  const selectedDict = translations[lang] || translations.en;
  const parts = key.split('.');
  let current = selectedDict;

  for (const part of parts) {
    if (current && typeof current === 'object' && part in current) {
      current = current[part];
    } else {
      // Fallback to English dictionary if key missing in selected dialect
      let engFallback = translations.en;
      for (const p of parts) {
        if (engFallback && typeof engFallback === 'object' && p in engFallback) {
          engFallback = engFallback[p];
        } else {
          return fallback || key;
        }
      }
      return engFallback || fallback || key;
    }
  }

  return current || fallback || key;
}
