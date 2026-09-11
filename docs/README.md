# WVSU Medical Center — TriageSense Documentation Suite
## Master Documentation Architecture & System Index Guide

**Document Identifier**: `TS-DOC-000` | **Version**: `1.0.0 Design Specification (Academic Review Draft)`  
**Course**: CIT 213: Human Computer Interaction 2 (Activity 5: Concept Refinement and Prototyping)  
**Institution**: West Visayas State University Medical Center (WVSU MC)  
*“Quality. Accessible. Compassionate.”* | *“Better Access. Healthier Tomorrow.”*  
**Authors**: Acebuche, Ardeña, Benjamin, Cadangin, Tamaño | **Instructor**: Janine Defante  
**Date**: September 2026 | **Classification**: Technical Documentation Master Index  
**Standard**: ISO/IEC/IEEE 29148 Systems & Software Engineering Documentation  

> **Illustrative Sample Data & Academic Prototype Notice**:  
> All patient records (*e.g., Juan Dela Cruz, Ernesto*), clinical staff names (*e.g., Nurse Kristine, Nurse Reyes*), queue tokens (*#WVSU-2024-9912*), and operational metrics (*e.g., DTT 2.4 min, throughput accelerations*) referenced throughout this documentation suite are **fictional sample datasets generated strictly for academic UI/UX prototyping and HCI evaluation**. They do not represent official patient records or clinical findings of West Visayas State University Medical Center (WVSUMC). Furthermore, **TriageSense does not autonomously compute or assign ESI acuity**; clinical acuity is strictly nurse-confirmed.

---

## 1. Documentation Suite Overview & Symmetric Architecture

The **TriageSense Documentation Suite** is organized into three symmetric, interconnected tiers:
1. **Tier 1: Global System Foundations** (Shared design tokens, contrast proofs, and biomechanical audits).
2. **Tier 2: Kiosk Client Suite** (Patient/Caregiver research, human factors, and the 11-screen kiosk blueprint).
3. **Tier 3: Admin Staff Suite** (Clinical triage workflows, nurse cognitive ergonomics, and the EDIS workstation blueprint partitioned into Core Prototype and Extended Capabilities).

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                     TRIAGESENSE SYMMETRIC DOCUMENTATION SUITE                          │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ TIER 1: GLOBAL SYSTEM FOUNDATIONS (SHARED TOKENS & AUDITS)                             │
├───────────────┬──────────────────────────────────────────┬─────────────────────────────┤
│ Document ID   │ File Path & Canonical Name               │ Scope & Authority           │
├───────────────┼──────────────────────────────────────────┼─────────────────────────────┤
│ TS-SYS-001    │ docs/01_system_design_master.md          │ Single Source of Truth:     │
│               │ Master Design System Specification       │ Tokens, WCAG AAA, CSS Bundle│
├───────────────┼──────────────────────────────────────────┼─────────────────────────────┤
│ TS-SYS-002    │ docs/02_system_audit_and_validation.md   │ Empirical Math Proofs,      │
│               │ Photometric & Biomechanical Audits       │ Fitts's Law, ADA, ESI v4    │
├───────────────┴──────────────────────────────────────────┴─────────────────────────────┤
│ TIER 2: KIOSK CLIENT SUITE (PATIENT & CAREGIVER INTAKE TERMINAL)                       │
├───────────────┬──────────────────────────────────────────┬─────────────────────────────┤
│ TS-KSK-001    │ docs/03_kiosk_research_and_hfe.md        │ Human Factors Engineering,  │
│               │ Kiosk UX Research & Stress Modeling      │ Personas, Cognitive Friction│
├───────────────┼──────────────────────────────────────────┼─────────────────────────────┤
│ TS-KSK-002    │ docs/04_kiosk_screen_spec.md             │ 11-Screen Kiosk Blueprint:  │
│               │ Kiosk Screen Interaction Blueprint       │ Screens 01–11 (Figures 1–11)│
├───────────────┴──────────────────────────────────────────┴─────────────────────────────┤
│ TIER 3: ADMIN STAFF SUITE (CLINICAL EDIS TRIAGE WORKSTATION)                           │
├───────────────┬──────────────────────────────────────────┬─────────────────────────────┤
│ TS-ADM-001    │ docs/05_admin_research_and_workflow.md   │ Clinical EDIS Research,     │
│               │ Admin Clinical Workflow & Nursing HFE    │ Triage Nursing Workflows    │
├───────────────┼──────────────────────────────────────────┼─────────────────────────────┤
│ TS-ADM-002    │ docs/06_admin_screen_spec.md             │ Admin Screen Blueprint:     │
│               │ Admin Screen Interaction Blueprint       │ Core ADM-01–03, Ext. 04–06  │
└───────────────┴──────────────────────────────────────────┴─────────────────────────────┘
```

---

## 2. Document Descriptions & Symmetry Mapping

### Tier 1: Shared System Foundations
* **`01_system_design_master.md` (`TS-SYS-001`)**:  
  The Single Source of Truth (SSOT) defining institutional colors (WVSUMC Green `#006B3F`, Gold `#F2B705`, Blue `#0057A8`), typography scale (Inter), touch metrics ($64\text{px}$ minimum targets, $360\times 72\text{px}$ primary buttons), elevation, strict zero-emoji mandate (Lucide icon library binding), clinical ESI safety rule (no autonomous triage), and the production-ready CSS `:root` bundle.
* **`02_system_audit_and_validation.md` (`TS-SYS-002`)**:  
  Empirical scientific audits providing exact relative luminance formulas, WCAG 2.1/2.2 AAA mathematical verification, pixel-to-millimeter conversions for 24" kiosks at 92 DPI, Fitts's law target benchmarks, and clinical mapping to the Emergency Severity Index (ESI v4).

### Tier 2: Kiosk Client Suite (Patient & Caregiver)
* **`03_kiosk_research_and_hfe.md` (`TS-KSK-001`)**:  
  Deep research into acute emergency distress, cognitive tunneling, and user friction. Contains detailed personas (*Tatay Ernesto & Grace*, *Bea*) and human factors engineering (HFE) countermeasures for panic, tremor, and regional dialect barriers.
* **`04_kiosk_screen_spec.md` (`TS-KSK-002`)**:  
  The complete interaction blueprint for Screens 01 to 11 (Welcome, Language, ID, Basic Info, Main Symptoms, Biometric Body Map, 0–10 Numeric Pain Level & Duration, Additional Details, Review, Submit, Confirmation) plus System Transition handoff to staff. Includes ASCII wireframes, state machines, and validation rules.

### Tier 3: Admin Staff Suite (Triage Nurse & Charge Admin)
* **`05_admin_research_and_workflow.md` (`TS-ADM-001`)**:  
  Clinical research examining emergency nursing cognitive workload, alarm fatigue, and the 5-phase Emergency Department Information System (EDIS) workflow. Analyzes nurse personas (*Nurse Kristine, RN*, *Charge Nurse Reyes, RN*) and situational awareness requirements.
* **`06_admin_screen_spec.md` (`TS-ADM-002`)**:  
  The interaction blueprint partitioned into **Core Prototype Screens** (ADM-01 Command Dashboard, ADM-02 Patient Clinical Dossier & Vitals Workspace, ADM-03 Emergency Assistance Broadcast Console) and **Extended Capabilities Roadmap** (ADM-04 Patient Health Directory, ADM-05 Triage Analytics Reports, ADM-06 Kiosk Fleet Manager).

---

## 3. Strict Quality & Standardization Standards

All documents in this repository adhere to the following standards:
1. **Zero-Emoji Policy**: All diagrams, wireframes, and tables use certified **Lucide Icons** (`<Activity />`, `<HeartPulse />`, `<AlertCircle />`). Generic emojis are strictly prohibited.
2. **Clinical Safety Safeguard**: TriageSense does not autonomously compute or assign ESI triage acuity. All acuity tags must be clinician-assigned.
3. **Unified Metadata Header**: Every document features identical institutional headers with unique document codes.
4. **Verified Cross-Referencing**: Bidirectional links connect research, design tokens, and screen blueprints.
5. **Document Control & Sign-Off**: Every document concludes with an official compliance table.

---

## 4. Document Control & Verification Sign-Off

| Audit Metric | Specification Value | Compliance Status |
| :--- | :--- | :---: |
| **Document Suite Code** | `TS-DOC-000` to `TS-DOC-006` | Canonical & Complete |
| **Symmetric Pairings** | Kiosk (Research + Spec) $\leftrightarrow$ Admin (Research + Spec) | 100% Symmetric |
| **Accessibility Compliance**| WCAG 2.1 / 2.2 Level AAA | Target Met (Design Target) |
| **Ergonomics Standards** | ISO 9241-9 / ISO 9241-110 / ADA §707 | Target Met |
| **Clinical Guidelines** | Emergency Severity Index (ESI v4/v5) | Aligned (Clinician Assessed) |
| **Sign-Off Authority** | Team TriageSense (CIT 213 / WVSUMC) | Final Academic Draft |
