# WVSU Medical Center — TriageSense Admin Portal
## Admin Screen Interaction Blueprint & Layout Specification (Screens ADM-01–06)

**Document Identifier**: `TS-ADM-002` | **Version**: `1.0.0 (Audited Design Specification)`  
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

The **TriageSense Admin Portal** is an enterprise-grade Emergency Department Information System (EDIS) interface engineered specifically for **16:9 widescreen desktop workstations ($1920 \times 1080$)** utilized at ER triage desks and charge nurse stations.

> [!CAUTION]
> **Mandatory Clinical Safety Rule — No Autonomous ESI Assignment**:
> **TriageSense does not autonomously determine or assign Emergency Severity Index (ESI) acuity.**
> - Arriving records from kiosks represent **subjective patient-reported intake**.
> - Arriving patients appear in the queue with an acuity state of **`Needs Nurse Review`**.
> - The triage nurse alone evaluates objective vital signs and assigns the final **`Nurse-Confirmed ESI-1` to `ESI-5`** level in Screen ADM-02.
> - Algorithmic flags (e.g., chest pain, pain $\ge 8$) serve strictly as visual prioritization hints labeled `"Suggested Priority — Requires Clinician Verification"`.

> [!NOTE]
> **Illustrative Sample Data Disclaimer**:
> All patient names (e.g., *Juan Dela Cruz*), personnel names (*Nurse Reyes, RN*), hospital record IDs, and operational throughput statistics (DTT times, symptom percentages) in this document are **fictional sample data** designed for academic coursework demonstration.

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        TRIAGESENSE ADMIN PORTAL SUITE MAP                              │
├───────────────┬──────────────────────────────────────────┬─────────────────────────────┤
│ Screen Code   │ Screen Name & Implementation Scope       │ Clinical Function           │
├───────────────┼──────────────────────────────────────────┼─────────────────────────────┤
│ ADM-01        │ Live Triage Queue & Command Dashboard    │ Real-time patient queue,    │
│               │ [CORE PROTOTYPE SCOPE]                   │ wait times & KPI metrics    │
├───────────────┼──────────────────────────────────────────┼─────────────────────────────┤
│ ADM-02        │ Patient Clinical Dossier & Workspace     │ Full intake review, body map│
│               │ [CORE PROTOTYPE SCOPE]                   │ inspection, vitals & ESI    │
├───────────────┼──────────────────────────────────────────┼─────────────────────────────┤
│ ADM-03        │ Kiosk Emergency Broadcast Console        │ Real-time modal alert &     │
│               │ [CORE PROTOTYPE SCOPE]                   │ chime for assistance calls  │
├───────────────┼──────────────────────────────────────────┼─────────────────────────────┤
│ ADM-04        │ Patient Health Directory & Archive       │ Searchable past visits and  │
│               │ [EXTENDED ROADMAP CAPABILITY]            │ longitudinal medical records│
├───────────────┼──────────────────────────────────────────┼─────────────────────────────┤
│ ADM-05        │ ED Operational Intelligence (Reports)    │ Door-to-Triage (DTT) BI,    │
│               │ [EXTENDED ROADMAP CAPABILITY]            │ peak hours & symptom charts │
├───────────────┼──────────────────────────────────────────┼─────────────────────────────┤
│ ADM-06        │ Kiosk Fleet Manager & Settings           │ Kiosk hardware health, paper│
│               │ [EXTENDED ROADMAP CAPABILITY]            │ levels, timeout & cooldown  │
└───────────────┴──────────────────────────────────────────┴─────────────────────────────┘
```

---

## 2. Screen-by-Screen Interaction Specifications

### Screen ADM-01: Live Triage Queue & Command Dashboard [Core Prototype]

```
┌─────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ [WVSUMC Logo] TriageSense ER Portal — Desk 01          Nurse Reyes, RN  ● Online            10:24:18 AM │
├─────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ [<UserPlus /> 12 New Intake]  [<Clock /> 8 Waiting]  [<Activity /> 2 In Triage]  [<CheckCircle2 /> 31 Completed]│
├─────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ Queue View: [All Active (20) ▼]  [Filter by Acuity: All ▼]                     [<Search /> Search...]   │
│ ┌─────┬────────────────┬──────────┬───────────────────────┬────────────┬──────────────────────┬────────┐ │
│ │ Q#  │ Patient Name   │ Arrival  │ Chief Complaint       │ Pain Score │ Clinical Acuity      │ Action │ │
│ ├─────┼────────────────┼──────────┼───────────────────────┼────────────┼──────────────────────┼────────┤ │
│ │ #01 │ J. Dela Cruz   │ 10:24 AM │ Chest Pain, Fever     │ 7/10 (Sev) │ [<Clock /> Needs Exam]│[Assess]│ │
│ │ #02 │ M. Santos      │ 10:18 AM │ Abdominal Pain        │ 9/10 (Crit)│ [<Alert> Urgent Hint]│ [Assess]│ │
│ │ #03 │ P. Reyes       │ 10:12 AM │ Cough, Mild Fever     │ 4/10 (Mod) │ [<Clock /> Needs Exam]│[Assess]│ │
│ │ #04 │ A. Garcia      │ 10:05 AM │ Headache, Dizziness   │ 2/10 (Mild)│ [<Check> ESI-4 Conf] │ [Assess]│ │
│ └─────┴────────────────┴──────────┴───────────────────────┴────────────┴──────────────────────┴────────┘ │
└─────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

* **Purpose**: Primary operational cockpit for the triage charge nurse to monitor patient flow, distinguish unassessed arrivals from nurse-confirmed triaged patients, and prioritize acute patients.
* **Top Navigation Bar**:
  * Institution: WVSU Medical Center crest with `<Activity />` gold pulse icon.
  * Station Identity: `Triage Desk 01 — Emergency Department`.
  * Nurse Badge: `Nurse Reyes, RN` (ID: `#N-8402`) with online status badge.
  * System Real-Time Clock with seconds ticker (`10:24:18 AM`).
* **Queue Status KPI Metric Cards (Top Row)**:
  1. **New Intake**: `12` (`<UserPlus />`, Blue `#0057A8` — Arrived from kiosk, pending examination).
  2. **Waiting for Triage**: `8` (`<Clock />`, Amber `#F59E0B` — Seated in waiting area, average wait $14\text{ mins}$).
  3. **In Triage**: `2` (`<Activity />`, Green `#006B3F` — Actively undergoing examination).
  4. **Completed / Disposed**: `31` (`<CheckCircle2 />`, Slate `#16803C` — Successfully triaged and admitted to ED rooms).
* **Live Queue Table & Strict Separation of Status and Acuity**:
  * **Queue Status Filter Tabs**: `All Active (20)`, `New Intake (12)`, `Waiting for Triage (8)`, `In Triage (2)`.
  * **Clinical Acuity Filter**: `All Acuities`, `Needs Nurse Review`, `ESI-1`, `ESI-2`, `ESI-3`, `ESI-4`, `ESI-5`.
  * Search Bar: Search by Patient Name, Reference Number `TS-2026-XXXX`, or Hospital ID.
  * Action: Clicking `[ <FileText /> View & Assess ]` opens Screen **ADM-02**.

---

### Screen ADM-02: Patient Clinical Dossier & Nurse Assessment Workspace

```
┌──────────────────────────────────────────────────────────────────────────────────────────────┐
│ [← Back to Queue]    Patient Dossier: Juan Dela Cruz (#TS-2026-000123)       [<Clock /> 4m]   │
├───────────────────────────────────────────────┬──────────────────────────────────────────────┤
│ PATIENT-REPORTED INTAKE (KIOSK SUBJECTIVE)    │ NURSE OBJECTIVE ASSESSMENT & DISPOSITION     │
├───────────────────────────────────────────────┼──────────────────────────────────────────────┤
│ [<User />] Juan Dela Cruz (36M) — DOB: Jan 1, 1990  │ [<Activity />] Objective Vital Signs Entry   │
│ [<Phone />] Contact: 0912-345-6789                  │ BP: [ 138 ]/[ 88 ] mmHg  HR: [ 94 ] bpm     │
│ [<CreditCard />] Hospital ID: #WVSU-2024-9912       │ Temp: [ 38.6 ] °C        SpO2: [ 96 ] %      │
│                                                     │ RR: [ 22 ] cpm           GCS: [ 15 ] /15     │
│ [<HeartPulse />] Complaint: Chest Pain, Fever, Cough├──────────────────────────────────────────────┤
│ [<Clock />] Duration: 1–6 hours (Acute onset)       │ [<ShieldAlert />] Assign Final ESI Acuity    │
│ [<AlertTriangle />] Pain: 7 / 10 (Severe Pain)      │ [ESI-1]  [ ESI-2: Emergent ✓ ]  [ESI-3]      │
│ [<FileText />] Comorbidities: Nausea, Fatigue       │ [ESI-4]  [ ESI-5: Non-Urgent ]              │
│                                                     ├──────────────────────────────────────────────┤
│ [<MapPin />] Body Map: Anterior Thoracic            │ [<Building2 />] Bed / Room Disposition       │
│    [Visual Body Silhouette with Chest Pulse]        │ Triage Bed: [ Room 1 — Bed 02 ▼ ]            │
│                                                     ├──────────────────────────────────────────────┤
│ [<Mic />] Patient Voice Memo Playback               │ Actions:                                     │
│    [ <Play /> Play Audio Memo (0:15) ▂▄▆█▄▂ ]       │ [ <Bell /> Call Patient to Room 1 ]          │
│                                               │ [ <FastForward /> Escalate to Trauma Team ]  │
│                                               │ [ <CheckCircle2 /> Complete & Admit to ED ]  │
└───────────────────────────────────────────────┴──────────────────────────────────────────────┘
```

* **Purpose**: Two-column clinical examination workspace where the triage nurse verifies subjective kiosk data, captures vital signs, and assigns hospital disposition.
* **Left Column (Subjective Intake Data)**:
  * Demographic verification card.
  * Chief complaints, pain score ($7/10$), and duration ($1–6\text{h}$).
  * **Biometric Body Map Module**: Displays the patient's selected pain zone (Chest) highlighted on the vector silhouette.
  * **Voice Memo Player**: Interactive audio player allowing the nurse to hear the patient's vocalized complaint and assess respiratory effort.
* **Right Column (Objective Clinical Capture)**:
  * Vitals entry fields with abnormal value highlights (e.g. Temp $38.6^\circ\text{C}$ in amber).
  * ESI 1–5 Acuity assignment toggles.
  * Direct action buttons to call patient, fast-track to trauma, or complete admission.

---

### Screen ADM-03: Urgent Kiosk Emergency Broadcast & Dispatch Console

```
┌──────────────────────────────────────────────────────────────────────────────────────────────┐
│  [<AlertOctagon />] CRITICAL EMERGENCY ASSISTANCE DISPATCH — KIOSK #01                       │
├──────────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                              │
│        <AlertOctagon />   IMMEDIATE NURSE ASSISTANCE REQUESTED AT ENTRANCE KIOSK             │
│                                                                                              │
│        Station: Main Emergency Lobby Kiosk 01 (ID: KSK-WVSU-01)                              │
│        Timestamp: 10:25:02 AM (Active for 12 seconds)                                        │
│        Patient State: Emergency button confirmed by patient or companion.                   │
│                                                                                              │
│        ┌──────────────────────────────────┐      ┌──────────────────────────────────┐        │
│        │  [ <CheckCheck /> Acknowledge &  │      │   [ <Phone /> Open Two-Way       │        │
│        │    Dispatch Triage Staff ]       │      │     Audio Intercom to Kiosk ]    │        │
│        └──────────────────────────────────┘      └──────────────────────────────────┘        │
│                                                                                              │
└──────────────────────────────────────────────────────────────────────────────────────────────┘
```

* **Purpose**: Full-screen emergency interrupt overlay triggered via WebSocket when a patient taps "Request Immediate Assistance" at any kiosk.
* **Sensory Affordance**: Flashing red emergency border (`#DC2626`), high-contrast alert card, and repeating acoustic chime.
* **Nurse Actions**:
  * `[ <CheckCheck /> Acknowledge & Dispatch Staff ]`: Stops chime, logs responding nurse ID, and updates the physical kiosk display to *"Staff Dispatched — Nurse on the way"*.
  * `[ <Phone /> Open Two-Way Audio Intercom ]`: Establishes real-time VOIP connection to speak directly to the patient through the kiosk microphone and speaker array.

---

### Screen ADM-04: Patient Health Directory & Historical Records

* **Purpose**: Searchable patient archive for retrieving past triage records, cross-referencing re-admissions, and auditing intake logs.
* **Components**:
  * Global search bar with autocomplete by Name, PhilHealth Number, or Hospital ID.
  * Date range filters: `Today`, `Past 24 Hours`, `Past 7 Days`, `Custom Range`.
  * Tabular results displaying Patient Name, Record Date, Chief Complaint, Assigned ESI Level, and Attending Triage Nurse.
  * `[ <ExternalLink /> View Past Intake Summary ]` action.

---

### Screen ADM-05: ED Operational Intelligence & Triage Analytics (Reports)

* **Purpose**: Real-time business intelligence dashboard for nurse supervisors and ED directors to monitor flow and eliminate bottlenecks.
* **Key Visualizations**:
  1. **Door-to-Triage (DTT) Efficiency Metric**: Average time from kiosk arrival to nurse assessment ($2.4\text{ minutes}$, representing a $58\%$ acceleration).
  2. **Hourly Arrival Heatmap**: Surge arrival distribution showing peak ED hours (6:00 PM to 10:00 PM).
  3. **Chief Complaint Distribution Bar Chart**: Chest Pain ($26\%$), Abdominal Pain ($22\%$), Trauma ($18\%$), Respiratory ($16\%$), Other ($18\%$).
  4. **Regional Language Utilization**: English ($42\%$), Hiligaynon ($38\%$), Filipino ($16\%$), Cebuano ($4\%$).

---

### Screen ADM-06: Kiosk Fleet Management & Station Configuration (Settings)

* **Purpose**: Hardware telemetry, peripheral diagnostics, and operational parameter adjustments for all physical kiosks.
* **Kiosk Fleet Status Cards**:
  * `Kiosk 01 (Main Emergency Entrance)`: Status `Online`, Touch Glass `OK`, QR/NFC Scanner `OK`, Thermal Paper `84%`, Mic Array `Active`.
  * `Kiosk 02 (Ambulance Bay Entrance)`: Status `Online`, Thermal Paper `18% (Low Paper Warning - <AlertTriangle />)`.
* **System Parameter Controls**:
  * **Emergency Cooldown Lockout**: Number stepper (Default: `60 seconds`, adjustable).
  * **Inactivity Auto-Purge Timeout**: Number stepper (Default: `45 seconds`).
  * **Supported Languages Multi-Select**: Toggles for English, Filipino, Hiligaynon, Cebuano.
  * **Audio Intercom Volume & Mic Gain Slider**.

---

## 3. Document Control & Verification Sign-Off

| Audit Metric | Specification Value | Compliance Status |
| :--- | :--- | :---: |
| **Document Identifier** | `TS-ADM-002` | Active Admin Blueprint |
| **Screen Coverage** | Screens ADM-01–03 (Core Prototype); ADM-04–06 (Extended Roadmap) | 100% Specified |
| **Form Factor** | Desktop 16:9 Widescreen ($1920 \times 1080$) | Optimized |
| **Clinical Standard** | Emergency Severity Index (ESI v4/v5) / Clinician-Assigned Model | Grounded |
| **Iconography Standard** | Lucide Medical Icon System (2.0px stroke) | 100% (0 Emojis) |
| **Review Status** | Team TriageSense (CIT 213 HCI 2) | Final Academic Draft |
