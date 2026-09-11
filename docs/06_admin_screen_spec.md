# WVSU Medical Center — TriageSense Staff Portal
## Admin Screen Interaction Blueprint & Layout Specification

**Document Identifier**: `TS-ADM-002` | **Version**: `2.0.0 (Elevated Clinical Workstation Specification)`  
**Course**: CIT 213: Human Computer Interaction 2 (Activity 5: Concept Refinement and Prototyping)  
**Institution**: West Visayas State University Medical Center (WVSU MC)  
*“Quality. Accessible. Compassionate.”* | *“Better Access. Healthier Tomorrow.”*  
**Authors**: Acebuche, Ardeña, Benjamin, Cadangin, Tamaño | **Instructor**: Janine Defante  
**Date**: September 2026 | **Classification**: Clinical Emergency Department Information System (EDIS) Screen Blueprint  
**Iconography Standard**: Lucide Medical & Interface Icon System (Strict Zero-Emoji Policy)  
**Master Design System Reference**: `TS-SYS-001: docs/01_system_design_master.md`  
**Clinical Research Companion**: `TS-ADM-001: docs/05_admin_research_and_workflow.md`  

---

## 1. System Architecture, Clinical Safety & Scope Partitioning

The **TriageSense Staff Portal** is an enterprise-grade Emergency Department Information System (EDIS) interface engineered specifically for **16:9 widescreen desktop workstations ($1920 \times 1080$)** utilized at ER triage desks and charge nurse stations.

> [!CAUTION]
> **Mandatory Clinical Safety Rule — No Autonomous ESI Assignment**:
> **TriageSense does not autonomously determine or assign Emergency Severity Index (ESI) acuity.**
> - Arriving records from kiosks represent **subjective patient-reported intake**.
> - Arriving patients appear in the queue with an acuity state of **`Needs Nurse Review`**.
> - The triage nurse alone evaluates objective vital signs and assigns the final **`Nurse-Confirmed ESI-1` to `ESI-5`** level in Screen **Patient Clinical Dossier**.
> - Algorithmic flags (e.g., chest pain, pain $\ge 8$) serve strictly as visual prioritization hints labeled `"Suggested Priority — Requires Clinician Verification"`.

> [!NOTE]
> **Illustrative Sample Data Disclaimer**:
> All patient names (e.g., *Juan Dela Cruz*, *Maria Santos*), personnel names (*Nurse Kristine, RN*), hospital record IDs (`TS-2026-9912`), and operational throughput statistics in this document are **fictional sample data** designed for academic coursework demonstration.

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        TRIAGESENSE STAFF PORTAL SUITE MAP                              │
├───────────────────────────────┬──────────────────────────────────────────┬─────────────┤
│ Standardized Screen Name      │ Implementation Scope                     │ Function    │
├───────────────────────────────┼──────────────────────────────────────────┼─────────────┤
│ Live Triage Queue             │ Real-time intake queue, 4 KPI cards,     │ Core        │
│                               │ demographic table & operational rail     │ Prototype   │
├───────────────────────────────┼──────────────────────────────────────────┼─────────────┤
│ Patient Clinical Dossier      │ Full intake review, body map inspection, │ Core        │
│                               │ vitals capture & nurse-controlled ESI    │ Prototype   │
├───────────────────────────────┼──────────────────────────────────────────┼─────────────┤
│ Emergency Console             │ Full-screen audio-visual emergency alert │ Core        │
│                               │ & two-way kiosk broadcast dispatch       │ Prototype   │
├───────────────────────────────┼──────────────────────────────────────────┼─────────────┤
│ Patient Directory             │ Searchable past visits, filter by date   │ Extended    │
│                               │ and longitudinal intake archive          │ Capability  │
├───────────────────────────────┼──────────────────────────────────────────┼─────────────┤
│ Operational Analytics         │ Door-to-Triage (DTT) business metrics,   │ Extended    │
│                               │ peak surge hours & dialect utilization   │ Capability  │
├───────────────────────────────┼──────────────────────────────────────────┼─────────────┤
│ Kiosk Fleet & Settings        │ Kiosk hardware health, paper levels,     │ Extended    │
│                               │ cooldown timers & auto-purge timeouts    │ Capability  │
└───────────────────────────────┴──────────────────────────────────────────┴─────────────┘
```

---

## 2. Screen-by-Screen Interaction Specifications

### Screen: Live Triage Queue & Command Dashboard [Core Prototype]

```
┌──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ [Activity] TriageSense | WVSU Medical Center - Emergency Dept      [● Triage Desk 1]  [<Bell /> 3] [<Volume2 />] [NK Nurse Kristine] 5:57 PM │
├──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ [<Users /> Total Intakes: 12 ↑2]  [<Clock /> Waiting: 5 ↑1]  [<Bed /> In Triage: 4 ↑2]  [<CheckCircle2 /> Completed: 3 ↑1]       │
├───────────────────────────────────────────────────────────────────────────────────────────────────┬──────────────────────────────┤
│ [All] [New] [Waiting] [In Triage] [Completed]   ESI: [ESI-1] [ESI-2] [ESI-3] [ESI-4] [ESI-5]       │ [<Alert /> Emergency Assist] │
│ [<Search /> Search name, token, or symptoms...]                                                   │ 1 active alert >             │
├───────────────────────────────────────────────────────────────────────────────────────────────────┼──────────────────────────────┤
│ #   TIME   TOKEN         PATIENT          CHIEF COMPLAINT   PAIN   WAIT   STATUS      ESI   ACTION  │ Recent Activity:             │
│ 1   17:42  TS-2026-9912  Juan Dela Cruz   Chest Pain, SOB   [8/10] 15m    [In Triage] ESI-2 [Open>] │ • New intake TS-9907 (17:36) │
│                          68y · M · Hil    Loc: Chest, Arms                                        │ • Nurse assessed TS-9912     │
│ 2   17:36  TS-2026-9907  Maria Santos     Fever, Cough      [5/10] 21m    [Waiting]   ESI-3 [Open>] │ • Status TS-9887 -> Complete │
│                          34y · F · Eng    Respiratory                                             │ • Emergency Kiosk 01 (15:42) │
│ 3   17:28  TS-2026-9903  Roberto Ramos    Abdominal Pain    [7/10] 28m    [Waiting]   ESI-3 [Open>] ├──────────────────────────────┤
│                          52y · M · Fil    Abdomen                                                 │ Quick Actions:               │
│ 4   17:21  TS-2026-9898  Ana Reyes        Injury / Trauma   [4/10] 35m    [New]       ESI-4 [Open>] │ > Emergency Console          │
│                          38y · F · Hil    Arms · <1h                                              │ > Patient Directory          │
│ 5   16:50  TS-2026-9887  Jose Ramirez     Headache          [6/10] 1h 5m  [Completed] ESI-4 [Open>] │ > View Reports               │
│ 6   16:32  TS-2026-9876  Liza Fernandez   Nausea, Vomiting  [5/10] 1h 32m [In Triage] ESI-3 [Open>] │ > Kiosk Settings             │
│ 7   16:18  TS-2026-9865  Mark dela Torre  Shortness of Breath [8/10] 1h 48m [Waiting] ESI-2 [Open>] ├──────────────────────────────┤
│ 8   15:52  TS-2026-9854  Sofia Santos     Fever, Body Aches [3/10] 2h 12m [Completed] ESI-5 [Open>] │ (i) Nurse-Controlled ESI     │
├───────────────────────────────────────────────────────────────────────────────────────────────────│ ESI is manually assigned by  │
│ Showing 8 of 12 patients                                                                < 1 2 >   │ the nurse upon exam.         │
└───────────────────────────────────────────────────────────────────────────────────────────────────┴──────────────────────────────┘
```

* **Purpose**: Primary operational cockpit for the triage charge nurse to monitor real-time intake registry, distinguish unassessed arrivals from nurse-confirmed triaged patients, and prioritize emergent cases.
* **Top Navigation Bar**:
  * Institution: TriageSense emerald pulse badge + WVSU Medical Center & Emergency Department wordmark.
  * Station Identity: `● Triage Desk 1` green status indicator pill.
  * Notification Bell: Unread badge counter with clickable interactive flyout.
  * Audio Alert Chime Toggle: Enable/mute acoustic alarm.
  * Nurse Badge: `Nurse Kristine, RN` profile chip with avatar and role indicator.
  * Live Real-Time Clock & Date: `5:57 PM / Apr 26, 2026` ticker.
* **Queue Status KPI Metric Cards (Top Row)**:
  1. **Total Intakes**: Count `12`, delta indicator `↑ 2 today` (Light blue `Users` icon circle).
  2. **Waiting**: Count `5`, delta indicator `↑ 1` (Light amber `Clock` icon circle).
  3. **In Triage**: Count `4`, delta indicator `↑ 2` (Light blue `Bed` icon circle).
  4. **Completed**: Count `3`, delta indicator `↑ 1` (Light green `CheckCircle2` icon circle).
* **Live Queue Table Architecture**:
  * **Workflow Filters**: `All`, `New`, `Waiting`, `In Triage`, `Completed`.
  * **Acuity Filters**: `ESI Filter` with colored badges (`ESI-1`, `ESI-2`, `ESI-3`, `ESI-4`, `ESI-5`).
  * **Search Bar**: Real-time matching across Patient Name, Reference Token `TS-2026-XXXX`, Symptoms, or Dialect.
  * **Row Elements**:
    * Sequence number `#`, arrival time, token.
    * Patient Demographics: Full name + Age, Gender, Dialect subtitle.
    * Chief Complaint: Primary complaints + anatomical location & duration subtitle.
    * Pain Score Pill: Color-coded severity badge (`0–10`).
    * Wait Time: Real-time clock counter (`15m`, `21m`, `1h 5m`).
    * Workflow Status: Soft pill badge with Lucide icon.
    * ESI Badge: Assigned acuity badge or `Needs Exam` tag.
    * Action: `Open >` button opening the patient dossier.
* **Right Operational Intelligence Rail**:
  * **Emergency Assistance Banner**: Direct red highlight card for kiosk assistance calls.
  * **Recent Activity Feed**: Real-time chronological audit trail of intakes, assessments, and status transitions.
  * **Quick Actions**: Rapid navigation shortcuts.
  * **Nurse-Controlled ESI Governance**: Institutional clinical governance reminder.

---

### Screen: Patient Clinical Dossier & Nurse Assessment Workspace [Core Prototype]

* **Purpose**: Two-column clinical examination workspace where the triage nurse verifies subjective kiosk data, captures vital signs, and assigns hospital disposition.
* **Left Column (Subjective Intake Data)**:
  * Demographic verification card (Full name, DOB, ID verification).
  * Chief complaints, pain score ($8/10$), and duration ($1–6\text{h}$).
  * **Biometric Body Map Module**: Displays patient's selected pain zone (Chest, Arms) highlighted on vector silhouette.
  * **Voice Memo Player**: Interactive audio player allowing nurse to hear patient's recorded symptom statement.
* **Right Column (Objective Clinical Capture)**:
  * Vitals entry fields with abnormal value highlights (BP $158/94$, HR $104$, SpO2 $94\%$, Temp $37.1^\circ\text{C}$).
  * Nurse-assigned ESI Acuity selector (`ESI-1` through `ESI-5`).
  * Clinical notes and bed/room disposition selector.
  * Direct action buttons: Call Patient to Room, Escalate to Trauma, Complete Admission.

---

### Screen: Emergency Console & Broadcast Dispatch [Core Prototype]

* **Purpose**: Full-screen emergency interrupt overlay triggered when a patient activates "Request Immediate Assistance" at any kiosk.
* **Sensory Affordance**: Flashing red emergency border (`#DC2626`), high-contrast alert card, and repeating acoustic chime.
* **Nurse Actions**:
  * `[ Acknowledge & Dispatch Staff ]`: Silences chime, logs responding nurse ID, and transmits dispatch confirmation to the physical kiosk display.
  * `[ Open Two-Way Audio Intercom ]`: Establishes real-time audio connection through kiosk microphone and speaker array.

---

### Screen: Patient Directory & Historical Archive [Extended Capability]

* **Purpose**: Searchable patient archive for retrieving past triage records, cross-referencing re-admissions, and auditing intake logs.
* **Components**:
  * Global search bar with autocomplete by Name, PhilHealth Number, or Reference Token.
  * Filter by date ranges: `Today`, `Past 24 Hours`, `Past 7 Days`.
  * Patient record detail slide-over with historical acuity and disposition summary.

---

### Screen: Operational Analytics & Triage Intelligence [Extended Capability]

* **Purpose**: Real-time business intelligence dashboard for nurse supervisors and ED directors to monitor flow and eliminate bottlenecks.
* **Key Visualizations**:
  1. **Door-to-Triage (DTT) Efficiency Metric**: Average time from kiosk arrival to nurse assessment ($2.4\text{ minutes}$, representing a $58\%$ acceleration).
  2. **Hourly Arrival Surge Model**: Surge arrival distribution showing peak ED hours.
  3. **Chief Complaint Distribution Bar Chart**: Chest Pain ($27\%$), Respiratory ($23\%$), Abdominal ($19\%$), Trauma ($18\%$), Infectious ($13\%$).
  4. **Regional Language Utilization**: Hiligaynon ($41\%$), English ($33\%$), Filipino ($18\%$), Cebuano ($8\%$).

---

### Screen: Kiosk Fleet & Station Settings [Extended Capability]

* **Purpose**: Hardware telemetry, peripheral diagnostics, and operational parameter adjustments for physical kiosks.
* **Telemetry**:
  * Kiosk 01 (Entrance Lobby): Status `Online`, Thermal Paper `88%`, Battery `100%`, NFC Scanner `Active`.
  * Kiosk 02 (Ambulatory Lounge): Status `Online`, Thermal Paper `94%`, NFC Scanner `Active`.
* **Parameter Controls**:
  * Inactivity Auto-Purge Timeout: Number stepper (Default: `45s`).
  * Emergency Cooldown Lockout: Number stepper (Default: `60s`).
  * Supported Dialects Multi-Select: Hiligaynon, Cebuano, Filipino, English.

---

## 3. Document Control & Verification Sign-Off

| Audit Metric | Specification Value | Compliance Status |
| :--- | :--- | :---: |
| **Document Identifier** | `TS-ADM-002` | Active Staff Blueprint |
| **Standardized Screens** | Live Triage Queue, Patient Clinical Dossier, Emergency Console, Patient Directory, Operational Analytics, Fleet Manager | 100% Prefix-Free |
| **Form Factor** | Desktop 16:9 Widescreen ($1920 \times 1080$) | Optimized |
| **Clinical Standard** | Emergency Severity Index (ESI v4/v5) / Clinician-Assigned Model | Grounded |
| **Iconography Standard** | Lucide Medical Icon System (Strict Zero-Emoji Policy) | 100% Compliant |
