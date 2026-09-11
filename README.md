# WVSU Medical Center — TriageSense
### Emergency Department Patient Intake & Triage Support System
**CIT 213 Human-Computer Interaction 2 — Academic High-Fidelity Prototype**

---

## 🌐 Live Prototype Demos & Links

* **Permanent Live Prototype (GitHub Pages)**: [https://markalvincadangin.github.io/triagesense/](https://markalvincadangin.github.io/triagesense/)
* **Temporary Cloudflare Tunnel**: [https://forgotten-forests-passengers-poem.trycloudflare.com](https://forgotten-forests-passengers-poem.trycloudflare.com)
* **GitHub Repository**: [https://github.com/markalvincadangin/triagesense](https://github.com/markalvincadangin/triagesense)
* **Local Development**: `http://localhost:5173/`

> **Academic Notice**: This is an interactive high-fidelity frontend prototype developed for CIT 213 Human-Computer Interaction 2. All patient records, vitals, and operational metrics are illustrative simulated demo datasets.

---

## 🏥 Overview

**TriageSense** is a simulated patient intake and emergency triage support system designed for **West Visayas State University Medical Center (WVSUMC)**. The system models the clinical intake workflow across two connected physical viewports synchronized via centralized real-time frontend state:

1. **Patient Kiosk Terminal** ($1080 \times 1920$ portrait touch interface): Self-service check-in with regional dialect support, multi-modal identification, structured symptom reporting, interactive anatomical body map, numeric pain rating, and emergency distress assistance.
2. **Triage Staff Workstation** ($1920 \times 1080$ widescreen desktop): Clinical command center featuring a live intake queue, nurse-controlled ESI assessment dossier, real-time emergency assistance broadcast console, encounter directory, and operational analytics.

---

## 📱 Presentation Modes & Ergonomics

TriageSense includes three dedicated presentation modes, switchable on demand:

* **Patient Kiosk View**: Centered physical kiosk enclosure with ambient optical camera bezel, native $1080 \times 1920$ touchscreen housing, contactless NFC/RFID tapping zone, optical barcode/QR scanner window, and weighted pedestal base.
* **Staff Portal View**: Full presentation canvas widescreen clinical desktop workstation ($1920 \times 1080$) for triage nurses and ED staff.
* **Dual View (Side-by-Side Hierarchy)**: Reflects the real-world deployment contexts using an authentic **~28% Kiosk / ~72% Staff Portal** spatial hierarchy. Submitting an intake on the left immediately updates the queue on the right.

### 🕹️ Draggable Demo Controller (Turbopack-Style)
* **Floating Icon Badge**: A compact, floating $44 \times 44\text{px}$ badge that can be dragged anywhere on the screen so it never covers buttons or clinical tables.
* **Emergency Beacon**: Flashes a pulsing red beacon when distress is paged from Kiosk 01.
* **Pop-over Menu**: Toggle between Kiosk, Staff Portal, and Dual View, jump directly to the Emergency Console, or reset demo data in 1 click.

---

## 🛡️ Clinical Safeguards & Design Rules

* **Zero Autonomous ESI**: TriageSense **never** calculates or assigns clinical acuity. Kiosk data is strictly preliminary patient-reported intake. Acuity (`ESI-1` through `ESI-5`) must be manually confirmed and entered by the triage nurse in the **Patient Dossier**.
* **Status vs. Acuity Separation**: Operational workflow states (`New Intake`, `Waiting for Triage`, `In Triage`, `Completed`) are strictly disentangled from clinical acuity.
* **Zero-Emoji Mandate**: 100% compliant with professional healthcare interface standards. All UI icons are standard Lucide React (`lucide-react`) components with 2.0px stroke.
* **Touch-First Ergonomics**: $64\text{px}$ minimum touch targets and $360 \times 72\text{px}$ primary action buttons on the patient kiosk.

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
│   │   └── TriageContext.jsx    # Centralized Shared State & Actions
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
│   │   │   ├── KioskHeader.jsx
│   │   │   ├── KioskEnclosure.jsx # Physical freestanding kiosk chassis
│   │   │   ├── ProgressStepper.jsx
│   │   │   ├── AssistanceModal.jsx
│   │   │   ├── BodyMap.jsx
│   │   │   ├── PainScale.jsx
│   │   │   └── DurationSelector.jsx
│   │   └── admin/
│   │       ├── AdminHeader.jsx
│   │       └── AdminSidebar.jsx
│   └── views/
│       ├── kiosk/               # Patient Kiosk Intake Flow
│       │   ├── Welcome.jsx
│       │   ├── LanguageSelection.jsx
│       │   ├── Identification.jsx
│       │   ├── PatientInfo.jsx
│       │   ├── Symptoms.jsx
│       │   ├── BodyMap.jsx
│       │   ├── PainDuration.jsx
│       │   ├── AdditionalDetails.jsx
│       │   ├── IntakeReview.jsx
│       │   ├── IntakeSubmission.jsx
│       │   ├── TicketConfirmation.jsx
│       │   └── KioskApp.jsx
│       └── admin/               # Triage Staff Workstation
│           ├── LiveQueue.jsx
│           ├── PatientDossier.jsx
│           ├── EmergencyConsole.jsx
│           ├── PatientDirectory.jsx
│           ├── OperationalAnalytics.jsx
│           ├── FleetManager.jsx
│           └── AdminApp.jsx
│   └── assets/
│       └── wvsumc-logo.png      # 1024x1024 Official HD Transparent Seal
```

---

## 🚀 Quick Start (Running Locally)

### Prerequisites
* Node.js (v18 or higher recommended)
* npm

### Installation
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
Generates an optimized bundle in `dist/`.

---

## 👥 Academic Credits & Acknowledgments

* **Institution**: West Visayas State University — College of Information and Communications Technology (CICT)
* **Course**: CIT 213 Human-Computer Interaction 2
* **Project**: Emergency Department Patient Intake & Triage Support System (TriageSense)
* **Partner Facility Reference**: West Visayas State University Medical Center (WVSUMC)
