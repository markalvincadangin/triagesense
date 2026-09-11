# WVSU Medical Center — TriageSense
### Emergency Department Patient Intake & Triage Support System
**CIT 213 Human-Computer Interaction 2 — Academic High-Fidelity Prototype**

---

## 🌐 Live Prototype Demos & Links

* **Permanent Live Prototype (GitHub Pages)**: [https://markalvincadangin.github.io/triagesense/](https://markalvincadangin.github.io/triagesense/)
* **Temporary Cloudflare Tunnel**: [https://forgotten-forests-passengers-poem.trycloudflare.com](https://forgotten-forests-passengers-poem.trycloudflare.com)
* **GitHub Repository**: [https://github.com/markalvincadangin/triagesense](https://github.com/markalvincadangin/triagesense)
* **Local Development**: `http://localhost:5173/`

> **Academic Notice**: This is an interactive high-fidelity frontend prototype developed for CIT 213 Human-Computer Interaction 2. All patient records, vitals telemetry, and operational metrics are illustrative simulated demo datasets.

---

## 🏥 Overview

**TriageSense** is an emergency department patient intake and triage support system engineered for **West Visayas State University Medical Center (WVSUMC)**. The system models the clinical intake workflow across two connected physical viewports synchronized via centralized real-time frontend state:

1. **Patient Kiosk Terminal** ($1080 \times 1920$ portrait touch interface): Streamlined 5-step self-service check-in with regional dialect support, multimodal speech-to-text dictation, structured symptom reporting, interactive anatomical body map, numeric pain rating, and an **Integrated Right-Side Vital Signs Sensor Bay** measuring preliminary $\text{SpO}_2\%$ and Pulse Rate.
2. **Triage Staff Workstation** ($1920 \times 1080$ widescreen desktop): Clinical command center featuring a live intake queue, nurse-controlled ESI assessment dossier, real-time emergency assistance broadcast console, encounter directory, and operational analytics.

---

## 🎯 Streamlined 5-Step Kiosk Workflow

Synthesized directly from the clinical human factors research and hand-drawn intake sketches, the kiosk streamlines emergency registration into 5 single-task, cognitive-load-minimizing stages:

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

1. **Step 1: Identify** (`Welcome.jsx`): In-place language selection pills (`Hiligaynon`, `English`, `Filipino`, `Cebuano`), quick scan simulation, patient demographic inputs, integrated Web Speech API `<Mic />` voice dictation, test patient autofill, and two-step emergency assistance call.
2. **Step 2: Symptoms** (`Symptoms.jsx`): 6 high-salience chief complaint cards (`Chest Pain`, `Breathing Difficulty`, `High Fever`, `Abdominal Pain`, `Severe Headache`, `Injury/Trauma`) plus multimodal voice memo input.
3. **Step 3: Body Map** (`BodyMap.jsx`): Biometric anatomical wireframe with front/back toggle (`<RotateCw />`) and synchronized regional selector cards.
4. **Step 4: Severity & Vitals** (`PainDuration.jsx`): Wong-Baker facial pain scale + 0–10 numeric selector, 6 clinical duration options, and the **Integrated Vital Signs Sensor Bay Simulation** ($\text{SpO}_2\%$, Pulse Rate in BPM, Perfusion Index) with live plethysmogram pulse wave animation.
5. **Step 5: Summary & Send to Nurse** (`IntakeReview.jsx`): Structured verification cards with inline edit links, direct `[ SEND TO NURSE > ]` dispatch action, and printed thermal ticket confirmation with 30-second auto-reset.

---

## 🔬 Hardware Engineering: Integrated Vital Signs Sensor Bay (Bottom-Right Panel)

The physical kiosk enclosure models an **Integrated Multi-Wavelength Photoplethysmography (PPG) & Pulse Oximetry Sensor Chamber** mounted directly beneath the touchscreen display on the **bottom right of the peripheral console** (specifically replacing the legacy optical barcode scanner window, as specified in the team CAD drawing and sketch):
* **Physiological Telemetry**: Measures preliminary Blood Oxygen Saturation ($\text{SpO}_2\%$), Pulse Rate (BPM), and Perfusion Index (PI %) through dual red ($660\text{ nm}$) and infrared ($940\text{ nm}$) optical absorption.
* **Ergonomics & Accessibility (ADA §707 & BP 344)**: Elevated at $1000\text{ mm}$ above finished floor with a $22^\circ$ downward contour for comfortable forearm resting posture for both wheelchair users and standing patients.
* **Peripheral Architecture**: Complemented by the contactless NFC/RFID reader pad on the left, microphone & speaker dot matrix, center thermal queue ticket dispenser slot, and the lower cabinet door silkscreened with `VITAL SIGNS SENSORS (OPTIONAL)` housing telemetry expansion modules.
* **Visual Guidance Ring**: Illuminated status halo ring cycling from standby cyan to measuring emerald green.
* **Clinical Safety Boundary**: Kiosk telemetry is designated strictly as preliminary screening data; certified triage nurses retain 100% authority over verified vitals and ESI categorization.

---

## 🎨 Clinical Color Theory & Visual System

To prevent visual fatigue and semiotic hazard confusion in acute care environments, TriageSense applies an empirically grounded color framework:
* **Mitigating Hospital Glare**: Soft clinical off-white canvas (`#F8F8F6`) reduces photophobia and ocular strain under bright hospital fluorescent/LED fixtures.
* **The 60-30-10 Distribution Rule**:
  * **60% Low-Stress Base**: `#FFFFFF` surfaces and `#F8F8F6` canvas.
  * **30% Structural Framing**: Institutional WVSUMC Emerald (`#006B3F`) conveys medical stability and trust.
  * **10% Semantic Signaling**: Emergency Red (`#DC2626`) for life-threatening alerts, WVSUMC Gold (`#F2B705`) for subtle accents, and Clinical Blue (`#0057A8`) for informational chips.
* **WCAG 2.1 Level AAA Verification**:
  * Deep Charcoal Navy (`#172B4D`) on light canvas achieves **$13.26:1$** contrast ratio.
  * **Strict Gold Contrast Rule**: White text on gold ($1.82:1$) is strictly prohibited; gold elements strictly pair with navy text ($7.76:1$ AAA).

---

## ♿ Multimodal Accessibility Suite

* **Manual Touch**: Minimum $64 \times 64\text{ px}$ oversized touch targets with $300\text{ms}$ software debouncing to support shaky or injured hands.
* **Voice Speech-to-Text**: Built-in Web Speech API microphone dictation for hands-free patient name, chief complaint, and clinical notes entry.
* **Text-to-Speech Audio Guidance**: Dynamic `<Volume2 /> Read Aloud` header button that reads screen prompts and options aloud in the selected regional dialect.
* **Regional Languages**: Native localization in **Hiligaynon (Ilonggo)**, **English**, **Filipino**, and **Cebuano**.

---

## 📱 Presentation Modes & Controls

* **Patient Kiosk View**: Centered physical kiosk enclosure with top 3D depth/RGB camera module, native $1080 \times 1920$ touchscreen housing, bottom-right integrated vital signs sensor bay, contactless NFC/RFID tapping zone, microphone/speaker dot matrix, thermal ticket slot, and lower telemetry cabinet door.
* **Staff Portal View**: Clinical desktop command center ($1920 \times 1080$) for triage nurses and ED staff.
* **Dual View (Side-by-Side)**: Authentic ~28% Kiosk / ~72% Staff Portal layout reflecting real-world hospital deployment. Submitting an intake on the left instantly updates the queue on the right.
* **Draggable Demo Controller (Turbopack-Style)**: A compact $44 \times 44\text{px}$ floating icon badge that can be moved anywhere on the screen so it never covers clinical controls.

---

## 📁 Repository Structure

```
triagesense/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── docs/                        # Complete SSOT Documentation Suite
│   ├── 01_system_design_master.md
│   ├── 02_system_audit_and_validation.md
│   ├── 03_kiosk_research_and_hfe.md
│   ├── 04_kiosk_screen_spec.md
│   ├── 05_admin_research_and_workflow.md
│   ├── 06_admin_screen_spec.md
│   └── README.md
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── index.css
│   ├── context/
│   │   └── TriageContext.jsx    # Centralized State, Vitals Telemetry & Actions
│   ├── data/
│   │   └── demoData.js         # Illustrative Fictional Dataset
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── StatusBadge.jsx
│   │   │   ├── DemoControls.jsx # Turbopack-style draggable controller
│   │   │   └── ViewportFrame.jsx
│   │   ├── kiosk/
│   │   │   ├── KioskHeader.jsx  # Dialect pills, Read Aloud, Emergency call
│   │   │   ├── KioskEnclosure.jsx # Right-side PPG sensor bay & chassis
│   │   │   ├── ProgressStepper.jsx # 5-step intake progress tracker
│   │   │   ├── AssistanceModal.jsx # 2-step confirmation + 60s cooldown
│   │   │   ├── BodyMap.jsx      # Anatomical wireframe with front/back toggle
│   │   │   ├── PainScale.jsx    # Wong-Baker + 0-10 numeric selector
│   │   │   └── DurationSelector.jsx
│   │   └── admin/
│   │       ├── AdminHeader.jsx
│   │       └── AdminSidebar.jsx
│   └── views/
│       ├── kiosk/               # Streamlined 5-Step Intake Flow
│       │   ├── Welcome.jsx      # Step 1: Identify & Language
│       │   ├── Symptoms.jsx     # Step 2: 6-Tile Chief Complaints
│       │   ├── BodyMap.jsx      # Step 3: Anatomical Localization
│       │   ├── PainDuration.jsx # Step 4: Severity & Right-Side PPG Sensor
│       │   ├── IntakeReview.jsx # Step 5: Summary & Send to Nurse
│       │   └── KioskApp.jsx     # Kiosk container & route coordinator
│       └── admin/               # Triage Staff Workstation
│           ├── LiveQueue.jsx    # Live patient intake queue
│           ├── PatientDossier.jsx # Nurse clinical evaluation & vitals review
│           ├── EmergencyConsole.jsx # Paged emergency distress console
│           ├── PatientDirectory.jsx # Historical encounters
│           ├── OperationalAnalytics.jsx # ED turnaround KPIs
│           ├── FleetManager.jsx # Kiosk hardware & peripheral health
│           └── AdminApp.jsx     # Admin container & route coordinator
└── public/
    └── assets/
        └── wvsumc-logo.png      # 1024x1024 Official HD Transparent Seal
```

---

## 🚀 Quick Start (Running Locally)

### Prerequisites
* Node.js (v18 or higher recommended)
* npm

### Installation & Run
```bash
# Clone the repository
git clone https://github.com/markalvincadangin/triagesense.git
cd triagesense

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173/` in your browser.

### Production Build
```bash
npm run build
```
Generates an optimized production bundle in `dist/`.

---

## 👥 Academic Credits & Acknowledgments

* **Institution**: West Visayas State University — College of Information and Communications Technology (CICT)
* **Course**: CIT 213 Human-Computer Interaction 2 (Activity 5: Concept Refinement and Prototyping)
* **Project**: Emergency Department Patient Intake & Triage Support System (TriageSense)
* **Partner Facility Reference**: West Visayas State University Medical Center (WVSUMC)
* **Student Researchers**: Acebuche, Ardeña, Benjamin, Cadangin, Tamaño
* **Course Instructor**: Janine Defante
