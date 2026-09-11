# WVSU Medical Center — TriageSense
## Human Factors Engineering, Stress Modeling & Screen Friction Analysis

**Document Identifier**: `TS-KSK-001` | **Version**: `2.0.0 (Streamlined 5-Step Architecture & Hardware Vitals Integration)`  
**Course**: CIT 213: Human Computer Interaction 2 (Activity 5: Concept Refinement and Prototyping)  
**Institution**: West Visayas State University Medical Center (WVSU MC)  
*“Quality. Accessible. Compassionate.”* | *“Better Access. Healthier Tomorrow.”*  
**Authors**: Acebuche, Ardeña, Benjamin, Cadangin, Tamaño | **Instructor**: Janine Defante  
**Date**: September 2026 | **Classification**: Human Factors Engineering (HFE) & Usability Research  
**Standard Iconography**: Lucide Medical & Interface Icon System (Strict Zero-Emoji Policy)  
**Master Design System Reference**: `TS-SYS-001: docs/01_system_design_master.md`  
**Kiosk Screen Companion Spec**: `TS-KSK-002: docs/04_kiosk_screen_spec.md`  

---

## 1. Executive Summary & Research Scope

Deploying a self-service kiosk within an Emergency Department (ED) presents unique human factors engineering (HFE) challenges. Unlike commercial retail or airline check-in kiosks where users are calm and physically unimpaired, **ED kiosk users operate under acute physiological trauma, severe anxiety, cognitive tunneling, and physical weakness**.

This research document analyzes the **patient and caregiver personas**, catalogs all **sources of interaction friction**, and establishes **engineering and UI/UX countermeasures** for the streamlined 5-step TriageSense kiosk sequence and clinical staff handoff.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    THE EMERGENCY INTAKE STRESS MODEL                        │
│                                                                             │
│  [Acute Physical Pain]  ──┐                                                 │
│  [Fear of Delayed Care] ──┼──► [Cognitive Tunneling] ──► [High Interaction] │
│  [Sensory Overload]     ──┤    (Working Memory -50%)     [Friction & Error] │
│  [Physical Weakness]    ──┘                                                 │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. User Personas & Clinical Scenarios

To ground the UX engineering, three clinical personas representing the spectrum of emergency intake stakeholders were modeled based on Western Visayas public hospital demographics:

### Persona 1: The Geriatric Patient with Caregiver
* **Name**: *Tatay Ernesto* (71) assisted by his daughter *Grace* (38).
* **Chief Complaint**: Acute tightness in chest, history of hypertension.
* **Context**: Referred from a rural health unit in Guimaras to WVSU MC.
* **Physical / Cognitive State**: Short of breath, trembling hands, mild cataract (low visual acuity), speaks predominantly **Hiligaynon (Ilonggo)**. Anxious about cost and queue positioning.
* **Key Friction**:
  - Small text and crowded interfaces are completely illegible to Ernesto.
  - High physical fatigue: standing at a kiosk for more than 2 minutes causes dizziness.
  - Grace experiences high emotional anxiety and needs to input her father's details accurately on his behalf.
* **UX Imperatives**: Hiligaynon localization, high-contrast large fonts (min 20px), companion assistance affordances, rapid (<90 seconds) intake sequence.

### Persona 2: The Acutely Distressed Independent Patient
* **Name**: *Bea* (22), working student at a local university.
* **Chief Complaint**: Sudden-onset severe lower right quadrant abdominal pain (suspected acute appendicitis), high fever.
* **Context**: Arrives alone via tricycle at 9:30 PM.
* **Physical / Cognitive State**: Doubled over in pain, nauseated, sweaty palms, highly anxious, high digital literacy (smartphone native) but **cognitively incapacitated by acute pain**.
* **Key Friction**:
  - Cannot tolerate lengthy virtual keyboard typing on an upright glass screen.
  - Sweaty/clammy fingers lead to capacitive touch registration failures.
  - Prone to abandonment if the interface feels bureaucratic or stalls.
* **UX Imperatives**: One-tap selection chips, elimination of freeform typing, instant visual body map targeting, prominent emergency assistance button if pain spikes to 10/10.

### Persona 3: The Overburdened Triage Nurse
* **Name**: *Nurse Kristine, RN* (32), ED Triage Station 1.
* **Context**: Managing a 45-bed emergency room with 120+ patient turnovers per shift.
* **Physical / Cognitive State**: Severe alarm fatigue, constant task switching, skeptical of patient self-reported data.
* **Key Friction**:
  - Unstructured, rambling verbal complaints slow down clinical assessment.
  - Distrusts "black box" automated triage.
  - Needs structured, standardized chief complaints aligned with ESI (Emergency Severity Index).
* **UX Imperatives**: High-density desktop dashboard with standardized clinical badges (Pain 0-10, Duration, Chief Symptoms, Anatomical Zone), clear separation between patient-entered subjective data and nurse-confirmed clinical assessment.

---

## 3. Comprehensive Taxonomy of Friction in ED Kiosks

| Friction Domain | Root Cause in Emergency Context | Human Factors Engineering Impact | TriageSense Countermeasure |
| :--- | :--- | :--- | :--- |
| **Biomechanical / Motor** | Arm fatigue ("Gorilla Arm" syndrome) from interacting with vertical touchscreens; hand tremors from pain or fever. | Missed taps, accidental double clicks, inability to hold arm steady. | Minimum $64\text{px}$ touch targets, $16\text{px}$ gutter spacing, $300\text{ms}$ software debounce, interactive controls clustered in the lower 60% reach zone. |
| **Cognitive / Attentional** | Adrenaline surge, acute pain, and ambient sensory overload (alarms, shouting, sirens) in the ED. | Cognitive tunneling; inability to process complex instructions or multi-step questions. | **Hick-Hyman Law optimization**: 1 concept per screen, maximum 6 visually distinct choices, zero non-essential text. |
| **Linguistic & Literacy** | Medical jargon (e.g., "dyspnea", "epigastric distress") vs. regional colloquialisms. | Misunderstood questions, incorrect triage categorization. | Plain-language phrasing in 4 languages (English, Filipino, Cebuano, Hiligaynon) with universal medical iconography. |
| **Tactile & Environmental** | Clammy/sweaty hands from acute fever or shock; ambient overhead fluorescent lighting creating screen glare. | Capacitive touch failure, glare-induced eye strain. | Matte anti-glare screen specification, high contrast ratio ($13.26:1$), large tap targets with visual/auditory touch confirmation. |
| **Temporal / Anxiety** | Patient fears that using a machine will cause them to "lose their turn" to someone who talks to a nurse directly. | High bounce rate / kiosk refusal. | Clear reassurance banner on Screen 1: *"Using this kiosk places you directly into the digital nurse triage queue faster."* |
| **Privacy & Security** | Public terminal displaying sensitive medical conditions to patients standing in line behind them. | Patient hesitates or enters false symptom data due to embarrassment. | Narrow viewing-angle privacy filters ($30^\circ$ louvre optical film), auto-clearing session timer, obscured contact number entry. |

---

## 4. Deep-Dive Clinical & Ergonomic Research Topics

### Topic A: Clinical Color Theory (WVSUMC Brand Alignment vs. Medical Semiotics & Glare)
* **Problem**: Applying university colors (Green and Gold) blindly causes severe clinical usability failure:
  1. **Photophobia & Ocular Strain**: Patients in acute distress (headache, concussion, dehydration) experience increased pain under saturated, bright chromatic screens.
  2. **Semiotic Hazard Confusion**: In medicine, **Yellow / Gold denotes Biohazard, Caution, or ESI-3 Urgent Acuity**. Fills of bright gold on buttons induce false hazard signals.
  3. **WCAG Contrast Failure**: White text on gold (`#F2B705`) yields a catastrophic $1.82:1$ contrast ratio, failing all accessibility standards.
* **Resolution**:
  - Strict adoption of the **60-30-10 Clinical Proportion Rule**:
    - **60% Low-Stress Base**: `#F8F8F6` off-white canvas and `#FFFFFF` cards prevent screen glare.
    - **30% Institutional Anchor**: `#006B3F` WVSUMC Emerald provides clinical authority and structural grounding.
    - **10% Semantic Signals**: `#DC2626` Emergency Red (strictly for immediate assistance), `#F2B705` Gold (accents only, paired with `#172B4D` Navy text, $7.76:1$ AAA), `#0057A8` Medical Blue (info badges).

### Topic B: Hardware Engineering of the Integrated Vital Signs Sensor Bay (Bottom-Right Panel)
* **Medical Classification**: **Integrated Multi-Wavelength Photoplethysmography (PPG) & Pulse Oximetry Sensor Chamber**.
* **Physiological Measurement**: Dual-wavelength ($660\text{ nm}$ Red, $940\text{ nm}$ Infrared) non-invasive optical sensor measuring Blood Oxygen Saturation ($\text{SpO}_2\%$), Pulse Rate (BPM), and Perfusion Index (PI %).
* **Ergonomics & Anthropometrics (ADA §707 / Batas Pambansa 344)**:
  - Mounted directly beneath the touchscreen display on the **bottom right of the peripheral console** (replacing the legacy optical barcode scanner window, as modeled in the team CAD drawing).
  - Positioned at **$1000\text{ mm}$ elevation** with a **$22^\circ$ downward contour**.
  - Matches the natural resting forearm pronation of seated wheelchair patients ($15\text{--}48\text{ inches}$) and standing adults.
  - Complemented by the lower cabinet door silkscreened with `VITAL SIGNS SENSORS (OPTIONAL)` housing telemetry expansion modules.
* **Illuminated Status Halo Ring**:
  - *Pulsing Cyan*: Standby / Ready for Finger Insertion.
  - *Solid Emerald Green*: Pulse wave locked / 5-second sampling active.
* **Clinical Boundary**: Data is tagged as *preliminary kiosk screening* and never autonomously diagnoses the patient.

### Topic C: Multimodal Accessibility (Voice Dictation, Manual Touch, Audio Read-Aloud)
* **Problem**: A substantial portion of arriving patients cannot type due to fractured wrists, tremors, visual impairment, or illiteracy.
* **Resolution**:
  - **Speech-to-Text (`<Mic /> Voice Dictate`)**: Integrated Web Speech API allowing hands-free name, complaint, and notes entry.
  - **Text-to-Speech (`<Volume2 /> Read Aloud`)**: Dynamic in-header audio player reading screen prompts in the selected regional dialect.
  - **Touch Ergonomics**: All interactive elements exceed $64 \times 64\text{ px}$ with $300\text{ms}$ software debouncing.

### Topic D: Language Integration & Cultural Accessibility in Western Visayas
* **Demographic Reality**: While official hospital forms are English-based, emergency patients express acute distress most accurately in their mother tongue.
* **Implementation**: First-class support for **Hiligaynon (Ilonggo)** alongside **English**, **Filipino**, and **Cebuano**, with in-place dialect switching pills in the global kiosk header.

---

## 5. Screen-by-Screen Friction Engineering (5-Step Streamlined Flow)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       STREAMLINED 5-STEP KIOSK FLOW                         │
│                                                                             │
│  [ Step 1: Identify ] ──► [ Step 2: Symptoms ] ──► [ Step 3: Body Map ]     │
│   • Dialect Switch         • 6-Tile Chief Grid      • Anatomical Wireframe  │
│   • Voice Dictate          • Voice Memo Input       • Front / Back Toggle   │
│   • Demographics                                                            │
│                                  │                                          │
│                                  ▼                                          │
│  [ Step 5: Summary & Dispatch ] ◄── [ Step 4: Severity & Vitals ]           │
│   • Modular Review Cards             • Wong-Baker Facial Pain (0-10)        │
│   • Direct Send to Nurse Action      • Clinical Duration Chips              │
│   • Printed Queue Ticket Modal       • Right-Side PPG Sensor Bay Simulation │
└─────────────────────────────────────────────────────────────────────────────┘
```

| Step # | Screen Name | Key Persona Friction | Engineering & UX Countermeasure | Usability Heuristic |
| :---: | :--- | :--- | :--- | :--- |
| **1** | **Identify & Welcome** | Reading barriers, typing fatigue on vertical glass, fear of emergency button spam. | In-place dialect pills (`Hiligaynon`, etc.), Web Speech voice dictation, test autofill, 2-stage emergency modal with 60s cooldown lock. | Error Prevention (H#5) & Flexibility (H#7) |
| **2** | **Symptoms** | Medical jargon confusion, inability to articulate multi-symptom distress. | 6 high-salience category tiles (`Chest Pain`, `Dyspnea`, `Fever`, `Abdomen`, `Headache`, `Trauma`) + voice memo recording. | Recognition over Recall (H#6) |
| **3** | **Body Map** | Difficulty describing anatomical location in words. | 3D-styled glowing biometric anatomical wireframe with front/back toggle (`<RotateCw />`) and synchronized zone buttons. | Match with Real World (H#2) |
| **4** | **Severity & Vitals** | Vague pain self-reporting; physiological distress (hypoxia, tachycardia) unknown. | Wong-Baker visual facial pain scale (0–10), 6 discrete duration chips, and **Integrated Right-Side PPG Sensor Bay** ($\text{SpO}_2\%$, Pulse Rate, PI %). | Flexibility & Efficiency (H#7) |
| **5** | **Summary & Dispatch** | "Did my data go through? Who sees this?"; fear of kiosk making clinical decisions. | Modular verification cards with edit shortcuts, direct `[ SEND TO NURSE > ]` dispatch action, thermal queue ticket receipt, and non-autonomous clinical disclaimer. | Visibility of System Status (H#1) |

---

## 6. Document Control & Sign-Off

| Audit Metric | Specification Value | Compliance Status |
| :--- | :--- | :---: |
| **Document Identifier** | `TS-KSK-001` | Academic Research & HFE Specification |
| **Persona Coverage** | Geriatric Caregiver (*Ernesto*), Acute Patient (*Bea*), Nurse (*Kristine*) | Fictional Case Models (Academic) |
| **Cognitive Modeling** | Hick-Hyman Law ($n \le 6$), Cognitive Tunneling Mitigation | Modeled & Targeted |
| **Biomechanical Safety** | Gorilla Arm Mitigation, $64\text{px}$ touch targets | Target Met |
| **Hardware Bay Spec** | ADA §707 / BP 344 compliant right-side PPG chamber | Engineered & Specified |
| **Iconography Standard** | Lucide Medical Icon System (2.0px stroke) | 100% (0 Emojis) |
| **Sign-Off Authority** | Team TriageSense (CIT 213 HCI 2 / WVSUMC Study) | Final Academic Draft |
