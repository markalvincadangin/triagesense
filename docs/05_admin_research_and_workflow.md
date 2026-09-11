# WVSU Medical Center — TriageSense Admin Portal
## Clinical EDIS Research, Nursing Cognitive Ergonomics & Triage Workflows

**Document Identifier**: `TS-ADM-001` | **Version**: `1.0.0 (Audited Design Specification)`  
**Course**: CIT 213: Human Computer Interaction 2 (Activity 5: Concept Refinement and Prototyping)  
**Institution**: West Visayas State University Medical Center (WVSU MC)  
*“Quality. Accessible. Compassionate.”* | *“Better Access. Healthier Tomorrow.”*  
**Authors**: Acebuche, Ardeña, Benjamin, Cadangin, Tamaño | **Instructor**: Janine Defante  
**Date**: September 2026 | **Classification**: Clinical Emergency Department Information System (EDIS) Research  
**Iconography Standard**: Lucide Medical & Interface Icon System (Strict Zero-Emoji Policy)  
**Master Design System Reference**: `TS-SYS-001: docs/01_system_design_master.md`  
**Companion Screen Spec**: `TS-ADM-002: docs/06_admin_screen_spec.md`  

---

## 1. Executive Summary & Clinical Context

In emergency departments (EDs) such as **WVSU Medical Center**, triage is not a clerical logging task; it is a high-stakes, time-critical clinical decision process where seconds dictate patient morbidity and mortality.

This document establishes the clinical research, nursing cognitive ergonomics, and health informatics foundation for the **TriageSense Admin Portal & Clinical Workstation**.

> [!CAUTION]
> **Core Clinical Principle — No Autonomous ESI Triage**:
> TriageSense does not autonomously compute or assign emergency acuity. The kiosk provides structured, patient-reported subjective intake. The triage nurse alone performs the objective vital signs examination and assigns the official ESI level (ESI-1 through ESI-5).

> [!NOTE]
> **Illustrative Sample Data Disclaimer**:
> Nursing personas (*Kristine*, *Reyes*), patient identifiers, and operational throughput metrics in this research document are **illustrative sample data** for academic coursework evaluation and do not represent actual clinical telemetry from WVSU Medical Center.

```
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                    EMERGENCY DEPARTMENT TRIAGE INFORMATION PIPELINE                     │
│                                                                                         │
│  [Phase 1: Ingestion]   ──► [Phase 2: Acuity Flag] ──► [Phase 3: Clinical Exam]        │
│  Self-service intake at     Automated algorithm        Nurse assesses vitals,           │
│  Kiosk terminal.            calculates preliminary     confirms body map, listens       │
│                             ESI risk score.            to voice memo, assigns room.     │
│                                                                                         │
│                                  │                                                      │
│                                  ▼                                                      │
│  [Phase 5: Operational BI] ◄── [Phase 4: Disposition & Transfer]                        │
│  Real-time wait times,      Patient admitted to Trauma / Urgent Care / Fast Track,      │
│  bottleneck detection.      or scheduled for secondary waiting lounge.                  │
└─────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Emergency Nursing Personas & Cognitive Stress Modeling

### Persona 1: The Frontline Triage Nurse
* **Name**: *Nurse Kristine, RN* (32).
* **Role**: Primary Triage Desk 01, WVSU Medical Center Emergency Department.
* **Workload**: Manages an active 45-bed emergency room with 80–120 patient turnovers per 8-hour shift.
* **Psychological & Cognitive State**:
  - **Severe Alarm Fatigue**: Subjected to constant acoustic alarms (cardiac monitors, telemetry, ambulance sirens). Rejects systems with non-actionable auditory alerts.
  - **Cognitive Fragmentation**: Interruptions occur every $2.8\text{ minutes}$ (physicians asking questions, family members demanding updates, arriving stretchers).
  - **Clinical Skepticism**: Inherently distrusts "black-box" AI diagnoses; insists on seeing the patient's exact words and verifying objective vital signs herself.
* **HFE Design Imperatives**:
  - Requires an instantaneous **5-second clinical gestalt** (scannable priority badges, pain score, and chief complaints).
  - Subjective patient-reported data (kiosk intake) must be cleanly partitioned from nurse-entered objective clinical data (vitals, ESI score).
  - Auditory alarms must be reserved strictly for **acute emergencies** (`<AlertOctagon /> Kiosk Emergency Dispatch`).

### Persona 2: The Emergency Department Charge Nurse / Administrator
* **Name**: *Charge Nurse Reyes, RN, MAN* (46).
* **Role**: ED Operations Supervisor & Patient Flow Coordinator.
* **Responsibilities**: Bed management, nursing staff allocation, Door-to-Triage (DTT) time monitoring, and bottleneck prevention.
* **Cognitive Needs**:
  - Macro-level situational awareness (Endsley Level 3): Needs real-time counts of waiting patients, surge arrival hours, and bed turnaround latency.
  - Fleet visibility: Immediate notification if an entrance kiosk experiences hardware faults (low paper, scanner offline).

---

## 3. The 5-Phase Clinical Triage Informatics Workflow

### Phase 1: Contactless Intake Ingestion
- Incoming patient records arrive via WebSocket asynchronously from kiosk terminals.
- Records are stamped with arrival timestamp, kiosk ID (`KSK-01`), reference token (`TS-2026-000123`), and language used.

### Phase 2: Algorithmic Acuity Flagging
- Preliminary risk categorization automatically highlights potential ESI-2 cases (severe chest pain, dyspnea, pain score $\ge 8/10$) with prominent visual badges (`<AlertTriangle /> High Priority / ESI-2`).

### Phase 3: Rapid Clinical Assessment & Vitals Integration
- The triage nurse opens the patient's clinical dossier:
  - Inspects the **futuristic biometric body map** highlighting the affected anatomical zone.
  - Listens to the **15-second patient voice memo** to detect vocal respiratory distress (wheezing, stridor).
  - Records objective vital signs: Blood Pressure (`<Activity />`), Pulse Rate (`<Heart />`), Respiratory Rate (`<Wind />`), Temperature (`<Thermometer />`), and SpO2 (`<Droplet />`).

### Phase 4: Disposition & Bed Assignment
- The nurse assigns the official Emergency Severity Index (ESI Level 1–5).
- Routes the patient to the appropriate emergency zone:
  - *Resuscitation / Red Zone* (ESI-1)
  - *Acute Care / Orange Zone* (ESI-2)
  - *Urgent Care / Yellow Zone* (ESI-3)
  - *Fast Track / Green Zone* (ESI-4 & ESI-5)
- Dispatches notification to the waiting room overhead monitor via `[ Call Patient to Room 1 ]`.

### Phase 5: Operational Business Intelligence & Quality Auditing
- Longitudinal aggregation of Door-to-Triage (DTT) metrics, peak arrival heatmaps, symptom distribution, and hardware telemetry.

---

## 4. Why a Single-Screen Dashboard Fails in Emergency Medicine

Relying on a single dashboard screen produces critical clinical failure modes:
1. **The Inspection Blindspot**: Opening an inline detail drawer blocks the nurse from observing newly arriving acute patients in the queue.
2. **Delayed Emergency Response**: Without an active pop-up broadcast overlay, a patient collapsing at an entrance kiosk goes unnoticed during active queue reviewing.
3. **Loss of Historical Tracking**: Inability to cross-reference previous visits or re-admissions within 48 hours increases diagnostic error rates.
4. **Hardware Failure Unawareness**: An unattended kiosk running out of thermal paper halts intake flow without warning.

To resolve these failures, the TriageSense Admin Portal is partitioned into **Core Prototype Screens** and **Extended Roadmap Capabilities**:

**Core Prototype Scope (Current Active Prototype)**:
- `ADM-01`: Live Command Dashboard & Queue (Visual gestalt, separated queue status and clinical acuity)
- `ADM-02`: Patient Clinical Dossier & Assessment Workspace (Subjective kiosk intake vs. objective vitals entry)
- `ADM-03`: Urgent Kiosk Emergency Broadcast Console (Acoustic alarm, dispatch acknowledgment, two-way intercom)

**Extended / Future EDIS Capabilities (Product Roadmap)**:
- `ADM-04`: Patient Health Directory & Historical Archive (48-hour bounce-back tracking)
- `ADM-05`: ED Operational Intelligence & Analytics (DTT efficiency and hourly surge heatmaps)
- `ADM-06`: Kiosk Fleet Management & Station Configuration (Peripheral telemetry and timeout calibration)

---

## 5. Screen-by-Screen Nursing Cognitive Ergonomics & Friction Engineering (ADM-01–06)

### Screen ADM-01: Live Triage Queue & Command Dashboard

#### 1. Clinical Cognitive Friction Analysis
- **Change Blindness & Peripheral Neglect**: When a triage nurse is focused on inputting vitals or reviewing a patient, newly arriving critical patients (ESI-2) can easily go unnoticed in a static queue.
- **Information Density & Decision Paralysis**: Presenting dense 20-column EHR tables creates visual fatigue, slowing the charge nurse's ability to prioritize patients during surges.

#### 2. Engineering & Nursing HFE Countermeasures
- **The 5-Second Clinical Gestalt**:
  - The queue table is streamlined to 7 high-salience columns: Queue #, Patient Name/Age, Arrival Time, Chief Complaint Chips, Pain Severity Pill, Acuity Badge, and Action Button.
  - Acuity badges utilize verified contrast-safe colors (`#DC2626` Crimson for ESI-2, `#D97706` Amber for ESI-3) with distinct Lucide icons (`<AlertTriangle />`, `<Clock />`) to support rapid peripheral recognition.
- **Asynchronous Push Updates**:
  - New intake records smoothly slide in with a subtle 400ms background highlight animation without disrupting scroll position or focus.

---

### Screen ADM-02: Patient Clinical Dossier & Nurse Assessment Workspace

#### 1. Clinical Cognitive Friction Analysis
- **Subjective vs. Objective Data Conflation**: Nurses risk confusing subjective complaints self-reported by distressed patients at the kiosk with verified, objective clinical measurements.
- **Repetitive Transcription Fatigue**: Re-typing patient complaints from kiosk printouts into clinical charts slows triage throughput and introduces transcription errors.

#### 2. Engineering & Nursing HFE Countermeasures
- **Two-Column Cognitive Boundary**:
  - **Left Column (Kiosk Subjective Intake)**: Displays patient demographics, chief complaints, 15-second audio memo player, and the **biometric body map silhouette** showing the affected anatomical pain zone.
  - **Right Column (Nurse Objective Assessment)**: Dedicated entry fields for vital signs (BP, HR, RR, Temp, SpO2), formal ESI Acuity level assignment toggles, and bed disposition routing.
- **Clinical Range Guardrails**:
  - Vital signs fields feature automated clinical range validation (e.g. Temperature $>38.0^\circ\text{C}$ or SpO2 $<94\%$ immediately highlights in amber with clinical caution flags).
- **Acoustic Breath Assessment**:
  - Integrated 15-second voice memo player allows the nurse to audibly detect stridor, wheezing, or respiratory fatigue without making the patient repeat their story.

---

### Screen ADM-03: Urgent Kiosk Emergency Broadcast & Dispatch Console

#### 1. Clinical Cognitive Friction Analysis
- **Acoustic Alarm Fatigue**: In an ER filled with monitor beeps, nurses suffer sensory habituation, tuning out low-urgency chimes.
- **Spatial Ambiguity**: An emergency alert that fails to identify the physical entrance kiosk forces staff to search multiple lobby areas.

#### 2. Engineering & Nursing HFE Countermeasures
- **Modal Salience Interruption**:
  - High-contrast crimson modal overlay (`#DC2626`) with pulsating `<AlertOctagon />` icon and explicit physical station localization (`Main Emergency Entrance Kiosk 01`).
- **Two-Action Rapid Dispatch Protocol**:
  - `[ Acknowledge & Dispatch Staff ]`: Immediately silences the alarm, logs the responding nurse's badge ID, and updates the physical kiosk display to *"Assistance Dispatched — Nurse on the way"*.
  - `[ Open Audio Intercom ]`: Instantly initiates a direct two-way VOIP audio channel through the kiosk microphone array.
- **Hardware Anti-Spam Safeguard**:
  - Coupled with the kiosk's 60-second hardware cooldown lockout to prevent panic-driven multi-presses by frantic companions.

---

### Screen ADM-04: Patient Health Directory & Historical Records

#### 1. Clinical Cognitive Friction Analysis
- **Emergency Name Disambiguation**: Common regional Filipino surnames (e.g. *Dela Cruz*, *Santos*, *Reyes*) lead to frequent patient record confusion under emergency pressure.
- **Bounce-Back Blindness**: Failure to recognize a patient who was discharged within the past 48 hours and is now returning with deteriorating symptoms increases malpractice risk.

#### 2. Engineering & Nursing HFE Countermeasures
- **Tri-Factor Disambiguation Search**:
  - Search indexes simultaneously by Full Name, Date of Birth, and PhilHealth / WVSUMC Hospital ID.
- **48-Hour Bounce-Back Badge**:
  - Patients with an ED visit in the prior 48 hours are automatically flagged with an amber `<Clock /> Re-Visit (48h)` indicator.

---

### Screen ADM-05: ED Operational Intelligence & Triage Analytics (Reports)

#### 1. Clinical Cognitive Friction Analysis
- **Lagging vs. Actionable Operational Metrics**: End-of-month PDF reports do not empower charge nurses to allocate beds or manage acute Friday-night surge volumes.
- **Cognitive Clutter (Chart Junk)**: Overly complex multi-axis charts obscure critical operational bottlenecks.

#### 2. Engineering & Nursing HFE Countermeasures
- **Actionable Real-Time Flow Metrics**:
  - **Door-to-Triage (DTT) Efficiency**: Real-time average intake duration ($2.4\text{ mins}$, showing $58\%$ acceleration).
  - **Surge Arrival Heatmap**: Identifies peak intake windows (6:00 PM to 10:00 PM).
  - **Symptom & Dialect Breakdown**: Tracks regional presentation patterns across Hiligaynon, Cebuano, Filipino, and English.

---

### Screen ADM-06: Kiosk Fleet Management & Station Configuration (Settings)

#### 1. Clinical Cognitive Friction Analysis
- **Silent Peripheral Failures**: A kiosk running out of thermal paper or experiencing an offline QR scanner creates immediate patient bottlenecks at the entrance without alerting staff.
- **Configuration Drift**: Stations operating with mismatched timeout durations or dialect settings cause inconsistent patient intake experiences.

#### 2. Engineering & Nursing HFE Countermeasures
- **Real-Time Peripheral Telemetry**:
  - Live status cards for each kiosk monitoring touch glass, scanner, thermal paper level %, and network connectivity.
- **Centralized Parameter Governance**:
  - Unified configuration sliders for Emergency Cooldown (30–180s), Inactivity Auto-Purge (30–90s), and supported regional languages.

---

## 6. Document Control & Verification Sign-Off

| Audit Metric | Specification Value | Compliance Status |
| :--- | :--- | :---: |
| **Document Identifier** | `TS-ADM-001` | Active Clinical Research |
| **Nursing Personas** | Frontline Triage (*Kristine*) & Charge Nurse (*Reyes*) | 100% Modeled |
| **Workflow Standard** | 5-Phase EDIS Informatics Pipeline | Aligned |
| **Screen Ergonomics** | Screens ADM-01–03 (Core) & ADM-04–06 (Extended) | Cognitively Modeled |
| **Clinical Standard** | Emergency Severity Index (ESI v4/v5) / Clinician-Assigned | Grounded |
| **Iconography Standard** | Lucide Medical Icon System (2.0px stroke) | 100% (0 Emojis) |
| **Review Status** | Team TriageSense (CIT 213 HCI 2) | Final Academic Draft |
