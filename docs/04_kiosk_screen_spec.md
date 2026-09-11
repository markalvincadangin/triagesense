# WVSU Medical Center — TriageSense Kiosk
## Kiosk Screen Interaction Blueprint & Prototype Specification (Streamlined 5-Step Architecture)

**Document Identifier**: `TS-KSK-002` | **Version**: `2.0.0 (Streamlined 5-Step Flow & Hardware Vitals Integration)`  
**Course**: CIT 213: Human Computer Interaction 2 (Activity 5: Concept Refinement and Prototyping)  
**Institution**: West Visayas State University Medical Center (WVSU MC)  
*“Quality. Accessible. Compassionate.”* | *“Better Access. Healthier Tomorrow.”*  
**Authors**: Acebuche, Ardeña, Benjamin, Cadangin, Tamaño | **Instructor**: Janine Defante  
**Date**: September 2026 | **Classification**: 5-Step Multimodal Kiosk Blueprint  
**Iconography Standard**: Lucide Medical & Interface Icon System (Strict Zero-Emoji Policy)  
**Master Design System Reference**: `TS-SYS-001: docs/01_system_design_master.md`  
**Admin Portal Companion Spec**: `TS-ADM-002: docs/06_admin_screen_spec.md`  

---

## 1. Executive Summary & Design Transformation

### 1.1 Background & Context
Emergency Departments (EDs) are high-stress environments where arriving patients and companions experience acute physiological distress, cognitive tunneling, and anxiety. During initial triage, friction in self-service kiosks can cause cognitive overload, abandonment, or delayed triage.

Following iterative evaluation and synthesis of the team's hand-drawn rough sketch, TriageSense transitioned from an 11-step fragmented questionnaire to a **Streamlined 5-Step Progressive Intake Flow**:
1. **Step 1: Identify** (`Welcome.jsx`) — In-place dialect selection, fast scan/demographics, Web Speech voice dictation, and immediate emergency assistance call.
2. **Step 2: Symptoms** (`Symptoms.jsx`) — High-salience 6-tile chief complaint grid + multimodal voice memo.
3. **Step 3: Body Map** (`BodyMap.jsx`) — Interactive anatomical silhouette with front/back toggle and regional touch targets.
4. **Step 4: Severity & Vitals** (`PainDuration.jsx`) — Wong-Baker facial pain scale, clinical duration chips, and the **Integrated Right-Side PPG Sensor Bay** ($\text{SpO}_2\%$, Pulse Rate, Perfusion Index).
5. **Step 5: Summary & Send to Nurse** (`IntakeReview.jsx`) — Modular verification cards, edit shortcuts, direct nurse dispatch, and printed thermal queue ticket confirmation.

```
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                    STREAMLINED 5-STEP KIOSK INTAKE ARCHITECTURE                         │
│                                                                                         │
│  ┌──────────────┐   ┌──────────────┐   ┌──────────────┐   ┌──────────────┐   ┌────────┐ │
│  │ 1. IDENTIFY  ├──►│ 2. SYMPTOMS  ├──►│ 3. BODY MAP  ├──►│ 4. SEVERITY  ├──►│5.REVIEW│ │
│  │  Language +  │   │ 6-Tile Grid  │   │  Anatomical  │   │  Pain + PPG  │   │Send to │ │
│  │  Demographics│   │  Chief Comp. │   │  Projection  │   │  Sensor Bay  │   │ Nurse  │ │
│  └──────────────┘   └──────────────┘   └──────────────┘   └──────────────┘   └────────┘ │
│         ▲                                                        │                      │
│         │                                                        ▼                      │
│  [Emergency Call]                                      [Preliminary Vitals]             │
│  Two-step modal + 60s cooldown                         SpO2, BPM, Perfusion Index       │
└─────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Clinical Color Theory Architecture (Avoiding Blind Brand Application)

### 2.1 Medical Semiotics & Cognitive Load
Color application in hospital interfaces must never be decorative or blindly imported from university seals. In clinical informatics:
1. **Ocular Fatigue & Photophobia Mitigation**: Patients presenting with migraine, fever, concussion, or eye trauma suffer under bright hospital fluorescent fixtures ($4000\text{K}\text{--}5000\text{K}$). High-chroma neon fills or pure stark white glare exacerbate pain. TriageSense uses soft clinical off-white (`#F8F8F6`) and card white (`#FFFFFF`) to maintain visual comfort.
2. **Semiotic Safety & Color Psychology**:
   - **WVSUMC Gold (`#F2B705`)**: Gold and yellow universally signify **Caution, Biohazard, or ESI-3 Urgent Acuity** in clinical settings. Applying gold indiscriminately to primary action buttons causes subconscious hesitation or false alarm. In TriageSense, gold is strictly reserved for subtle accentuation (ECG pulse waves, seal outlines, focused indicators) and is **never** filled behind white text ($1.82:1$ contrast failure). Gold elements strictly use Deep Navy text (`#172B4D`, $7.76:1$ AAA).
   - **Emergency Red (`#DC2626`)**: Strictly quarantined for life-threatening assistance calls (`Request Immediate Assistance`) and acute pain badges (9–10 Worst Pain). It is never used for general styling.
   - **WVSUMC Emerald (`#006B3F`)**: Represents institutional healing, stability, and clinical authority. Used for structural headers, primary proceed actions, and completed steps.

### 2.2 The Calibrated 60-30-10 Clinical Proportion Rule
* **60% Dominant Base (Low-Stress Neutral)**: `#F8F8F6` canvas, `#FFFFFF` surfaces, `#F1F5F9` input fields.
* **30% Structural Framing (Institutional Trust)**: `#006B3F` primary headers, button fills, active step indicators.
* **10% High-Salience Accents (Semantic Signaling)**: `#DC2626` emergency distress, `#F2B705` gold brand accents (paired with navy), `#0057A8` medical blue badges.

---

## 3. Hardware Enclosure & Right-Side Vital Signs Sensor Bay

```
                       ┌────────────────────────────┐
                       │     [●] Wide Camera        │
                       │   WVSU MEDICAL CENTER      │
                       │   TriageSense Kiosk        │
                       ├────────────────────────────┤
                       │                            │
                       │      1080 × 1920           │
                       │      Full HD Touch         ├───[ Right-Side PPG Sensor Bay ]
                       │      Capacitive Display    │   [ SpO2 & Pulse Chamber     ]
                       │                            │   [ LED Halo Ring Guide      ]
                       │                            │
                       ├────────────────────────────┤
                       │  [(((o)))] NFC / RFID Bay  │
                       │  [ |||||| ] 2D QR Scanner  │
                       ├────────────────────────────┤
                       │  [======] Thermal Printer  │
                       │           Queue Ticket Bay │
                       └────────────────────────────┘
```

### 3.1 Integrated Multi-Wavelength PPG & Pulse Oximetry Sensor Chamber
Mounted on the **right lateral bezel of the kiosk chassis**, the vitals sensor bay provides automated, non-invasive vital sign screening:
- **Technical Specifications**:
  - Dual-wavelength optical emitter: $660\text{ nm}$ (Red) and $940\text{ nm}$ (Infrared).
  - High-sensitivity photodiode detecting arterial pulsatile blood flow through the digital capillary bed.
  - Telemetry parameters: Blood Oxygen Saturation ($\text{SpO}_2\%$), Pulse Rate (PR in BPM), and Perfusion Index (PI %).
- **Physical Chassis & Anthropometrics (ADA Title III §707 & BP 344)**:
  - Elevation: Centerline positioned **$1080\text{ mm}$ above finished floor level**, comfortably accessible to seated wheelchair users ($15\text{--}48\text{ inches}$) and standing adults.
  - Angle: Contoured with a **$20^\circ\text{ to }25^\circ$ downward pitch** supporting natural resting forearm pronation.
  - Chamber: Lined with medical-grade, hypoallergenic, antimicrobial silicone.
- **Illuminated Status Halo Ring**:
  - *Pulsing Cyan*: Standby / Waiting for finger insertion.
  - *Pulsing Amber*: Finger detected / Calibrating arterial signal.
  - *Solid Emerald Green*: Pulse wave locked / 5-second sampling active.
- **Clinical Governance Notice**:
  - The kiosk explicitly informs the patient: *"Kiosk telemetry provides preliminary vital sign screening. Final clinical assessment is performed by certified emergency triage personnel."*

---

## 4. Multimodal Accessibility Architecture

To ensure total inclusivity across Western Visayas demographics (elderly patients, illiterates, motor-impaired individuals, and non-English speakers), TriageSense implements three parallel interaction modalities:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                         TRIPLE-MODALITY ACCESSIBILITY SUITE                            │
├───────────────────────┬────────────────────────────────┬───────────────────────────────┤
│ 1. Manual Touch       │ 2. Speech-to-Text Dictation    │ 3. Text-to-Speech Guidance    │
│ • Oversized targets   │ • Integrated Web Speech API    │ • Dynamic audio read-aloud    │
│   (≥64×64px)          │ • One-tap <Mic /> pill         │ • In-header <Volume2 /> button│
│ • High contrast       │ • Live transcript feedback     │ • Dialect-adapted speech      │
│ • Debounced taps      │ • Automatic field population   │ • Visual waveform animation   │
└───────────────────────┴────────────────────────────────┴───────────────────────────────┘
```

1. **Regional Dialects**: Native in-place switching between **Hiligaynon (Ilonggo)**, **English**, **Filipino**, and **Cebuano**.
2. **Speech-to-Text Dictation**: Prominent `<Mic /> Voice Dictate` button allowing hands-free entry of names, complaints, and notes.
3. **Text-to-Speech Audio Read-Aloud**: The `<Volume2 /> Read Aloud` header button reads screen instructions and field labels aloud to assist visually impaired or illiterate patients.

---

## 5. Detailed 5-Step Screen Specification

### Step 1: Welcome & Identify (`Welcome.jsx`)
- **Stage in Stepper**: `(1) Identify`
- **Header Components**:
  - WVSU Medical Center official logo & seal.
  - In-place dialect pills (`Hiligaynon`, `English`, `Filipino`, `Cebuano`).
  - Text-to-Speech read-aloud toggle (`<Volume2 />`).
  - Red Emergency Assistance button (`<AlertCircle /> Request Immediate Assistance`).
- **Core Screen Content**:
  - Hero headline: *"Emergency Patient Check-in"* (localized).
  - Subtitle: *"Tap an option to begin. You will be registered in the triage queue immediately."*
  - **Quick Scan Barcode/QR Card**: One-tap simulation to scan Hospital ID, PhilHealth QR, or National ID.
  - **Manual Demographics Card**:
    - Full Name input with inline `<Mic /> Voice Dictate` button.
    - Date of Birth (`YYYY-MM-DD`).
    - Gender selector chips (`Male`, `Female`, `Other`).
    - Contact Phone number (`09XX-XXX-XXXX`).
  - **Demo Quick-Fill Shortcut**: `[ <Sparkles /> Autofill Test Patient ]` for rapid demonstration.
- **Bottom Action Bar**:
  - Fixed bottom bar with prominent `[ CONTINUE TO SYMPTOMS > ]` button ($64\text{px}$ height, emerald green `#006B3F`).

---

### Step 2: Main Symptoms (`Symptoms.jsx`)
- **Stage in Stepper**: `(2) Symptoms`
- **Header Prompt**: *"What brings you to the Emergency Department today?"*
- **Symptom Category Grid (6 Oversized Touch Cards, $2 \times 3$)**:
  1. `<HeartPulse /> Chest Pain or Tightness`
  2. `<Wind /> Breathing Difficulty`
  3. `<Thermometer /> High Fever / Chills`
  4. `<ShieldAlert /> Severe Abdominal Pain`
  5. `<Frown /> Severe Headache / Dizziness`
  6. `<Bandage /> Injury, Cut, or Trauma`
- **Voice Memo Integration**:
  - Prominent voice pill: `[ <Mic /> Describe your symptoms using your voice ]`.
  - Captures spoken description and appends it to clinical notes.
- **Navigation Controls**:
  - `[ < BACK ]` returns to Step 1.
  - `[ CONTINUE TO BODY MAP > ]` advances to Step 3.

---

### Step 3: Biometric Body Map (`BodyMap.jsx`)
- **Stage in Stepper**: `(3) Body Map`
- **Header Prompt**: *"Where is your pain or symptom located?"* | *"Tap the body area or select from the list below."*
- **Visual Anatomical Silhouette**:
  - Interactive glowing human anatomical wireframe.
  - `[ <RotateCw /> Flip to Back / Front ]` perspective switch.
  - Pulsing touch hotspot nodes corresponding to major anatomical regions.
- **Synchronized Zone Selector Cards**:
  - `[ <User /> Head / Neck ]`
  - `[ <HeartPulse /> Chest ]`
  - `[ <ShieldAlert /> Abdomen ]`
  - `[ <RotateCw /> Back / Spine ]`
  - `[ <Activity /> Arms & Hands ]`
  - `[ <Activity /> Legs & Feet ]`
- **Navigation Controls**:
  - `[ < BACK ]` returns to Step 2.
  - `[ CONTINUE TO SEVERITY > ]` advances to Step 4.

---

### Step 4: Severity & Vital Signs (`PainDuration.jsx`)
- **Stage in Stepper**: `(4) Severity & Vitals`
- **Section 1: Wong-Baker Facial & 0–10 Numeric Pain Rating Scale**:
  - Discrete rating chips (`0` to `10`) color-coded by clinical severity tier:
    - `0–2` Mild (Emerald)
    - `3–5` Moderate (Amber)
    - `6–8` Severe (Orange)
    - `9–10` Worst Possible (Dark Red)
  - Wong-Baker facial expressions: `😊 No Hurt`, `😐 Mild`, `😟 Moderate`, `😣 Severe`, `😭 Worst`.
- **Section 2: Symptom Duration Chips**:
  - 6 discrete clinical duration buckets: `< 1 hour`, `1–6 hours`, `6–24 hours`, `1–3 days`, `> 3 days`, `Not sure`.
- **Section 3: Integrated Right-Side PPG Sensor Bay Simulation**:
  - Visual diagram showing the right-side kiosk finger chamber with flashing LED ring.
  - Action button: `[ <Fingerprint /> Place Finger in Right Sensor Bay ]`.
  - Interactive 5-second sampling sequence:
    - Real-time animated plethysmogram pulse wave (`<Activity />`).
    - Dynamic countdown timer: *"Acquiring arterial pulse wave... 5s"*.
    - Telemetry results: $\text{SpO}_2: 98\%$, Pulse Rate: $76\text{ BPM}$, Perfusion Index: $4.2\%$.
  - Fallback: `[ Skip Sensor ]` button if patient has finger dressings or tremors.
  - Regulatory notice: *"Non-autonomous preliminary screening. Clinical evaluation performed by triage nurse."*
- **Navigation Controls**:
  - `[ < BACK ]` returns to Step 3.
  - `[ REVIEW SUMMARY > ]` advances to Step 5.

---

### Step 5: Summary & Send to Nurse (`IntakeReview.jsx`)
- **Stage in Stepper**: `(5) Summary`
- **Header Prompt**: *"Review Your Intake Information"* | *"Check your details before sending to the emergency triage nurse."*
- **Structured Verification Cards**:
  - **Patient Demographics Card**: Name, DOB, Age, Gender, Contact (`[ <Edit3 /> Edit ]` shortcut to Step 1).
  - **Reported Symptoms Card**: Selected complaints, anatomical pain zones (`[ <Edit3 /> Edit ]` shortcut to Step 2/3).
  - **Severity & Telemetry Card**: Pain rating ($0\text{--}10$), duration, and Right-Side PPG Sensor Vitals ($\text{SpO}_2$, Pulse, PI) with `[ Verified Sensor ]` badge.
- **Primary Dispatch Action**:
  - Oversized high-salience button: `[ <Check /> SEND TO NURSE > ]` ($72\text{px}$ height, `#006B3F` Emerald fill, white text).
  - Instantly transmits record to the triage nurse's Live Queue and opens the Thermal Ticket Confirmation modal.
- **Printed Thermal Ticket Confirmation Modal**:
  - Simulated printed queue slip featuring:
    - WVSU Medical Center official header.
    - High-contrast Queue Number: **`TS-2026-000123`**.
    - Assigned triage priority hint: *"Standard Intake — Waiting Room B"*.
    - 2D QR code for bedside nurse scanner.
    - 30-second auto-reset countdown returning kiosk to Step 1 for the next patient.

---

## 6. Shared Data Schema (Intake Record State)

```typescript
interface IntakeRecord {
  id: string; // e.g., "TS-2026-000123"
  timestamp: string;
  language: 'hil' | 'en' | 'fil' | 'ceb';
  patientInfo: {
    fullName: string;
    dob: string;
    gender: 'Male' | 'Female' | 'Other';
    contactNumber: string;
  };
  symptoms: string[]; // e.g., ['Chest Pain or Tightness']
  bodyLocations: string[]; // e.g., ['Chest']
  painLevel: number; // 0 to 10
  duration: '< 1 hour' | '1-6 hours' | '6-24 hours' | '1-3 days' | '> 3 days' | 'Not sure';
  // Automated Right-Side PPG Sensor Bay Telemetry
  vitalsTelemetry: {
    spo2: number | null; // e.g. 98%
    pulseRate: number | null; // e.g. 76 BPM
    perfusionIndex: number | null; // e.g. 4.2%
    sensorStatus: 'captured' | 'skipped' | 'pending';
    recordedAt: string | null;
  };
  customNotes?: string;
  queueStatus: 'New Intake' | 'Waiting for Triage' | 'In Triage' | 'Completed';
  acuityAssessment: {
    status: 'Pending Nurse Review' | 'Nurse-Confirmed';
    assignedEsiLevel?: 1 | 2 | 3 | 4 | 5; // Exclusively assigned by RN
    assessedByNurseId?: string;
  };
}
```

---

## 7. Verification & Academic Evaluation Checklist

| Evaluation Criterion | Standard / Heuristic | Verification Method in TriageSense |
| :--- | :--- | :--- |
| **Touch Ergonomics** | Fitts's Law ($W \ge 64\text{ px}$) | All buttons, chips, and cards meet or exceed $64\text{ px}$ target size. |
| **Cognitive Simplicity** | Hick-Hyman Law ($n \le 6$ choices) | Streamlined from 11 screens into 5 single-task stages. |
| **High-Contrast Readability** | WCAG 2.1 AAA Contrast ($\ge 7:1$) | Navy text (`#172B4D`) on light canvas (`#F8F8F6`) achieves $13.26:1$ contrast ratio. |
| **Color Theory Discipline** | 60-30-10 Clinical Palette | Strictly no white text on gold ($1.82:1$ failure); gold paired strictly with navy ($7.76:1$). |
| **Right-Side Hardware Bay** | ADA §707 / BP 344 compliant | Positioned at $1080\text{mm}$ elevation with $22^\circ$ downward pitch for wheelchair/standing accessibility. |
| **Multimodal Accessibility** | Triple-modality interaction | Web Speech API speech-to-text dictation, `<Volume2 />` text-to-speech audio read-aloud, and touch. |
| **Regional Appropriateness** | Western Visayas Localization | Hiligaynon (Ilonggo) and Cebuano integrated alongside Filipino and English. |
| **Clinical Safety** | Zero Autonomous ESI | Kiosk provides preliminary screening data; triage nurses retain 100% control over ESI triage level. |
