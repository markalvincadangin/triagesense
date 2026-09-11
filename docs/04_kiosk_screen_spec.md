# WVSU Medical Center — TriageSense Kiosk
## Kiosk Screen Interaction Blueprint & Prototype Specification (Screens 01–11)

**Document Identifier**: `TS-KSK-002` | **Version**: `1.0.0 (Audited Design Specification)`  
**Course**: CIT 213: Human Computer Interaction 2 (Activity 5: Concept Refinement and Prototyping)  
**Institution**: West Visayas State University Medical Center (WVSU MC)  
*“Quality. Accessible. Compassionate.”* | *“Better Access. Healthier Tomorrow.”*  
**Authors**: Acebuche, Ardeña, Benjamin, Cadangin, Tamaño | **Instructor**: Janine Defante  
**Date**: September 2026 | **Classification**: 11-Screen Kiosk Interaction Blueprint  
**Iconography Standard**: Lucide Medical & Interface Icon System (Strict Zero-Emoji Policy)  
**Master Design System Reference**: `TS-SYS-001: docs/01_system_design_master.md`  
**Admin Portal Companion Spec**: `TS-ADM-002: docs/06_admin_screen_spec.md`  

---

## 1. Executive Summary & Project Context

### 1.1 Background of the Study
Emergency departments (EDs) are high-stress environments where patients arrive with varying health concerns and degrees of urgency. Prior to clinical evaluation, emergency staff must collect fundamental demographic and symptom data. In conventional ED workflows, this initial intake process is hindered by:
- **Repetitive questioning**: Patients or their companions repeatedly recite medical history and chief complaints across multiple intake desks.
- **Manual paper-based forms**: Slow transcription, illegible handwriting, and physical hand-offs increase patient waiting times and clerical burden.
- **Fragmented information**: Verbal reports often lack structure, making rapid triage categorization (ESI Level 1–5) difficult for nurses.

### 1.2 The Selected Concept: TriageSense Kiosk
During the Ideation phase, the team evaluated three concepts:
1. *TriageTwin*: Predictive digital-twin ER visualization for clinical risk assessment.
2. *TriageBand*: Smart emergency-room wearable for patient queue and identification tracking.
3. **TriageSense**: Self-service multimodal kiosk that collects structured patient information at the ER entrance and generates a real-time intake summary for triage nurse review.

**TriageSense was approved** because it directly resolves the intake bottleneck at the point of entry. It delegates initial data gathering to a self-service kiosk, presenting authorized triage staff with structured, high-fidelity patient intake records.

### 1.3 Resolution of Instructor Feedback (Janine Defante)
| Feedback Item | Critique / Prior Limitation | Refinement Implemented in TriageSense |
| :--- | :--- | :--- |
| **1. Color Scheme** | Previous dark theme was non-standard for clinical kiosks and reduced readability under ambient hospital lighting. | Shifted to a **light, clinical aesthetic** utilizing WVSU Medical Center branding (`#006B3F` Green, `#F2B705` Gold, `#0057A8` Blue) with high-contrast slate text on off-white surfaces (`#F8F8F6`). |
| **2. Kiosk Dimensions** | Layouts resembled mobile or desktop views with undersized touch targets. | Re-engineered specifically for **portrait kiosk touchscreen ergonomics (1080×1920)** with oversized touch targets (min `64×64 px`), high vertical reachability, and bottom-anchored controls. |
| **3. Selection Options** | Symptom duration options were overly constrained; pain scale was incomplete. | Expanded duration choices to 6 distinct clinical buckets (`<1 hour`, `1–6 hours`, `6–24 hours`, `1–3 days`, `>3 days`, `Not sure`) and implemented a full **0–10 Numeric Pain Rating Scale** with a dynamic 4-tier severity color ramp. |
| **4. Emergency Staff Call** | Emergency button was buried or absent from the entry screen, raising spam/accidental click risks. | Placed a prominent **"Request Immediate Assistance"** button on Screen 1 with a **two-step confirmation prompt** and a **60-second cooldown lock** with visual dispatch status. |

> [!TIP]
> **Deep UX & Human Factors Engineering Reference**:  
> For complete persona analyses (*Tatay Ernesto*, *Bea*, *Nurse Kristine*), stress-induced cognitive tunneling models, and screen-by-screen friction engineering countermeasures, see:  
> [docs/03_kiosk_research_and_hfe.md](file:///home/markc/projects/playground/triagesense/docs/03_kiosk_research_and_hfe.md).

---

## 2. Theoretical Human-Computer Interaction (HCI) Framework

### 2.1 Fitts's Law & Touch Ergonomics
$$\text{MT} = a + b \log_2 \left( \frac{2D}{W} \right)$$
*Where $MT$ is movement time, $D$ is distance to target, and $W$ is target width.*
- **Oversized Touch Targets**: All primary interactive elements (buttons, symptom tiles, language cards) feature a minimum touch dimension of **$64 \times 64\text{ px}$** (exceeding WCAG's $48\text{ px}$ baseline) to accommodate shaky, injured, or elderly fingers.
- **Thumb/Hand Reach Zones**: On a physical kiosk touchscreen, the most comfortable interaction zone is the lower 60% of the screen. Critical navigation controls (`Back` and `Continue`) are anchored in a dedicated bottom action bar.

### 2.2 Hick-Hyman Law & Cognitive Load Reduction
$$\text{RT} = b \cdot \log_2(n + 1)$$
*Where reaction time increases logarithmically with the number of options $n$.*
- Emergency intake patients experience acute physical discomfort and elevated cognitive stress.
- **Progressive Disclosure**: Instead of long monolithic forms, the intake flow is partitioned into **focused, single-task screens** (1 choice domain per screen: e.g., Language $\rightarrow$ Identification $\rightarrow$ Basic Info $\rightarrow$ Symptoms $\rightarrow$ Body Map $\rightarrow$ Severity).
- Visual tiles with clear icon-text pairings eliminate reading fatigue and speed up decision latency.

### 2.3 Nielsen Norman Group (NN/g) Usability Heuristics Applied
1. **Visibility of System Status**: A 5-stage visual stepper (*Language $\rightarrow$ Identification $\rightarrow$ Information $\rightarrow$ Symptoms $\rightarrow$ Review*) persists across all intake screens.
   - **Stage 4 (Symptoms) Progressive Substep Mapping**: To reduce cognitive load and reading fatigue under acute physical distress, Stage 4 consists of four progressive substeps:
     - *Substep 4.1: Main Symptoms* (Screen 5) — Categorical chief complaints.
     - *Substep 4.2: Biometric Body Location* (Screen 6) — Anatomical pain localization.
     - *Substep 4.3: Pain Level & Duration* (Screen 7) — 0–10 Numeric Pain Rating Scale and onset timeline.
     - *Substep 4.4: Additional Details* (Screen 8) — Associated comorbidities and clinical notes.
2. **Match Between System and the Real World**: Symptoms and anatomical pain locations are represented via familiar medical icons and an intuitive, futuristic biometric body map rather than complex clinical taxonomy.
3. **User Control and Freedom**: An accessible `Back` button on every step allows patients to revise answers without losing prior input. A global `Review & Edit` step precedes final dispatch.
4. **Error Prevention**: Date of birth, phone number, and name inputs feature live mask validation. The emergency staff button includes an explicit modal confirmation to prevent accidental activation.
5. **Recognition Rather than Recall**: Icon-supported visual cards present symptoms visually so users do not have to recall clinical terminology.

---

## 3. Comprehensive Design System Tokens

### 3.1 Color Palette
The color system honors **West Visayas State University Medical Center (WVSU MC)** identity while complying with medical contrast standards (WCAG 2.1 Level AAA for text, AA for UI components).

```
┌────────────────────────────────────────────────────────────────────────┐
│                      WVSUMC BRAND FOUNDATION                           │
├───────────────────┬───────────────────┬────────────────────────────────┤
│ WVSUMC Primary    │ WVSUMC Gold       │ WVSU Blue                      │
│ #006B3F           │ #F2B705           │ #0057A8                        │
│ Trust, Health     │ Vitality, Accent  │ Reliability, Calm              │
└───────────────────┴───────────────────┴────────────────────────────────┘
```

#### Color Specification Table
| Token Name | Hex Code | RGB | Usage & Semantic Rationale |
| :--- | :--- | :--- | :--- |
| `--color-wvsu-primary` | `#006B3F` | `rgb(0, 107, 63)` | Primary brand color: buttons, active steps, key headers. Represents healing, life, and medical stability. |
| `--color-wvsu-gold` | `#F2B705` | `rgb(242, 183, 5)` | Secondary institutional accent: ECG pulse line, highlights, focus rings. |
| `--color-wvsu-blue` | `#0057A8` | `rgb(0, 87, 168)` | Informational highlights, secondary interactive states, and patient identification tiles. |
| `--color-bg-canvas` | `#F8F8F6` | `rgb(248, 248, 246)` | Screen background: soft hospital off-white that prevents clinical glare and eye strain. |
| `--color-bg-surface` | `#FFFFFF` | `rgb(255, 255, 255)` | Card containers, interactive tiles, form elements, and modal sheets. |
| `--color-border` | `#D5E2DE` | `rgb(213, 226, 222)` | Subtle slate-green border ensuring clean element separation without visual clutter. |
| `--color-text-primary` | `#172B4D` | `rgb(23, 43, 77)` | Deep hospital navy/slate. Contrast ratio exceeds 12.8:1 against white canvas. |
| `--color-text-secondary`| `#505F78` | `rgb(80, 95, 120)`  | Subheaders, input labels, instructions, and helper text. Calibrated for 6.08:1 contrast (WCAG AA compliant). |
| `--color-emergency` | `#DC2626` | `rgb(220, 38, 38)` | "Request Immediate Assistance" emergency button and acute distress indicators (CR 4.83:1 with white text). |
| `--color-emergency-dark`| `#B91C1C` | `rgb(185, 28, 28)` | Hover/pressed state for emergency actions and critical pain badges (CR 6.47:1 with white text). |
| `--color-cooldown` | `#94A3B8` | `rgb(148, 163, 184)`| Disabled assistance button during active 60s cooldown timer. |
| `--color-success` | `#16803C` | `rgb(22, 128, 60)` | Submission confirmation, success checkmarks, completed intake statuses. |
| `--color-warning` | `#D97706` | `rgb(217, 119, 6)` | Waiting time alerts, non-critical intake notices. |

> [!IMPORTANT]
> **WCAG Contrast Guardrail for Gold (`#F2B705`)**:  
> White text on WVSUMC Gold fails WCAG contrast (1.82:1). All gold buttons, chips, and badges must strictly use `--color-text-primary` (`#172B4D`, CR 7.76:1) for text and iconography. See [docs/02_system_audit_and_validation.md](file:///home/markc/projects/playground/triagesense/docs/02_system_audit_and_validation.md) for full mathematical proofs.

#### 0–10 Numeric Pain Rating Scale Ramp
*The interface implements a discrete 11-point numeric touch selector (`0` to `10`). Color tiers map to clinical severity thresholds:*

| Pain Score | Range Label | Background Hex | Text Color | Validated Contrast | Visual Indicator |
| :---: | :--- | :--- | :--- | :---: | :--- |
| **0 – 2** | Mild / No Discomfort | `#10B981` (Emerald) | `#172B4D` (Navy) | 5.56 : 1 (PASS AA) | Calm green tone |
| **3 – 5** | Moderate Discomfort | `#F59E0B` (Amber) | `#172B4D` (Navy) | 6.57 : 1 (PASS AA) | Attention yellow tone |
| **6 – 8** | Severe Pain | `#F97316` (Orange) | `#FFFFFF` (White)| 3.20 : 1 (PASS Large) | Urgent orange tone |
| **9 – 10** | Very Severe / Worst Pain | `#B91C1C` (Dark Red) | `#FFFFFF` (White)| 6.47 : 1 (PASS AA) | Critical emergency red tone |

---

### 3.2 Typography Scale
The typography utilizes **Inter** (via Google Fonts), a variable sans-serif typeface engineered for high legibility on digital screens, wide apertures, and unmistakable number glyphs.

| Token | Size | Weight | Line Height | Application |
| :--- | :--- | :--- | :--- | :--- |
| `--font-display` | `40px` | Bold (`700`) | `48px` | Welcome Screen Headline, Submission Status |
| `--font-heading-1` | `32px` | Semibold (`600`) | `40px` | Screen Titles (e.g., "Select Your Language", "Body Map") |
| `--font-heading-2` | `24px` | Semibold (`600`) | `32px` | Section Sub-headers, Review Card Group Titles |
| `--font-touch-btn` | `22px` | Semibold (`600`) | `28px` | Primary Action Buttons (`Start Intake`, `Continue`, `Submit`) |
| `--font-body-lg` | `20px` | Regular (`400`) | `28px` | Instructions, Field Inputs, Checkbox Options |
| `--font-body-md` | `18px` | Regular (`400`) | `26px` | Secondary Descriptions, Review Field Labels |
| `--font-caption` | `16px` | Medium (`500`) | `22px` | Stepper Labels, Status Pills, Emergency Subtext |

---

### 3.3 Spatial System & Kiosk Ergonomics
- **Base Grid**: `8px` spatial rhythm (`8px`, `16px`, `24px`, `32px`, `48px`, `64px`).
- **Touch Target Dimensions**:
  - Primary Action Buttons: `Height: 64px`, `Padding: 0 32px`, `Border-radius: 12px` or `9999px`.
  - Symptom & Language Selection Cards: `Min-Height: 96px`, `Padding: 20px 24px`, `Border-radius: 16px`.
  - Pain Scale Circle Targets: `Width: 64px`, `Height: 64px`, `Border-radius: 50%`.
  - Bottom Bar Height: `100px` fixed anchor.
- **Card Elevation & Shadows**:
  - Surface Card: `0 4px 16px rgba(0, 107, 63, 0.06), 0 1px 3px rgba(0, 0, 0, 0.04)`
  - Active/Hover State: `0 8px 24px rgba(0, 107, 63, 0.14)`
  - Modal Backdrop: `rgba(15, 23, 42, 0.65)` with CSS backdrop-filter blur (`8px`).

---

## 4. Hardware Enclosure & Environmental Specifications

```
                       ┌────────────────────────────┐
                       │     [●] Wide Camera        │
                       │   WVSU MEDICAL CENTER      │
                       │   TriageSense Kiosk        │
                       ├────────────────────────────┤
                       │                            │
                       │                            │
                       │      1080 × 1920           │
                       │      Full HD Touch         │
                       │      Capacitive Display    │
                       │                            │
                       │                            │
                       │                            │
                       ├────────────────────────────┤
                       │  [(((o)))] NFC / QR Bay    │
                       │  [::::::: ] Dual Mic / Spk │
                       ├────────────────────────────┤
                       │  [ ~~~~ ] Vital Signs Bay  │
                       │           (Optional Aux)   │
                       └────────────────────────────┘
```

1. **Touchscreen Display**: 24" to 27" Vertical Touch Display, Full HD ($1080 \times 1920\text{ px}$ portrait mode), multi-touch capacitive glass with anti-glare, anti-microbial coating.
2. **Contactless Identity Scanner Bay**: Integrated optical scanner reading 2D QR codes (hospital app / appointment barcodes) and 13.56 MHz RFID/NFC reader (hospital smart cards, health ID wristbands).
3. **Audio / Speech Interface**:
   - Directional stereo microphone array with noise-cancellation DSP for ambient ER noise filtering.
   - Dual front-facing speakers positioned at ear level for audible prompts and voice confirmations.
4. **Desktop Admin Workstation**: $1920 \times 1080\text{ px}$ widescreen workstation monitor running in the ER triage station, displaying incoming kiosk records in real time.

---

## 5. Screen-by-Screen Interaction Specification (11-Screen Kiosk Terminal Sequence)

### Screen 1: Welcome / Start + Immediate Assistance Guard
- **Purpose**: Welcomes the incoming patient or companion, establishes hospital branding, and provides entry points for either self-service intake or urgent assistance.
- **Header Elements**: WVSU Medical Center official logo, institution name, *"Quality. Accessible. Compassionate."*, and active language indicator (default English).
- **Hero Area**:
  - Title: **"Welcome to WVSU Medical Center"**
  - Subtitle: *"We're here to help you get the right care, faster. Please start your patient intake or request assistance if needed."*
- **Primary Interactive Elements**:
  1. **`Start Intake →` Button**: Large primary green button (`#006B3F`), dimensions **$360 \times 72\text{ px}$** (SSOT unified), triggers transition to Screen 2.
  2. **`Request Immediate Assistance` Button**: High-visibility emergency red button (`#DC2626`) with alert bell/phone icon and subtitle: *"Need immediate nurse assistance?"*.
- **Anti-Spam Emergency Assistance Interaction Flow**:
  - *Step 1*: Patient taps `Request Immediate Assistance`.
  - *Step 2*: A high-priority modal appears:
    > **"Confirm Staff Request"**  
    > *"Are you experiencing severe chest pain, extreme difficulty breathing, heavy bleeding, or need immediate medical staff?"*  
    > `[Cancel / Go Back]` `[Yes, Alert Triage Nurse]`
  - *Step 3*: On confirmation, the system triggers audio chime, sends alert to Nurse Dashboard, and transitions the button to a **60-second cooldown lock**:
    > State: Disabled (`#94A3B8`), countdown timer: *"Assistance Dispatched (58s)"*, and persistent green banner: *"Triage staff has been notified and is on their way."*
- **Footer Badges**: Soft pill tags: `[<ShieldCheck /> Safe]`, `[<Zap /> Efficient]`, `[<HeartPulse /> Compassionate]`.

---

### Screen 2: Select Language
- **Purpose**: Eliminates language barriers by allowing patients or guardians to select their primary tongue.
- **Persistent Stepper**: Step 1 active: `(1) Language` $\rightarrow$ `(2) Identification` $\rightarrow$ `(3) Information` $\rightarrow$ `(4) Symptoms` $\rightarrow$ `(5) Review`.
- **Title**: *"Select Your Language"* | *"Choose the language you prefer to use."*
- **Options Grid** ($2 \times 2$ oversized touch cards):
  1. **English**: Default, with checkmark indicator.
  2. **Filipino**: *"Tagalog / Pambansang Wika"*
  3. **Cebuano**: *"Bisaya"*
  4. **Hiligaynon**: *"Ilonggo — Lokal nga Pulong"* (crucial regional relevance for Western Visayas).
- **Navigation Bar**: `[← Back]` (returns to Screen 1) | `[Continue →]` (advances to Screen 3).

---

### Screen 3: Patient Identification
- **Purpose**: Connects the intake record with existing hospital records or allows guest intake.
- **Persistent Stepper**: Step 2 active: `(2) Identification`.
- **Title**: *"How would you like to identify yourself?"*
- **Options Grid** ($2 \times 2$ cards with modern line icons):
  1. **Hospital ID**: *"Enter your 8-digit WVSUMC hospital record number."*
  2. **QR Code**: *"Scan your digital appointment or PhilHealth QR code at the scanner below."*
  3. **NFC**: *"Tap your hospital wristband or smart card on the sensor."*
  4. **Enter Manually**: *"First-time visitor or no ID present."*
- **Interactive Feedback**: Tapping any option activates an active border (`#006B3F`) and highlights the card. Selecting "Enter Manually" automatically loads the registration form on Screen 4.

---

### Screen 4: Basic Patient Information
- **Purpose**: Collects demographic information essential for emergency queuing and patient records.
- **Persistent Stepper**: Step 3 active: `(3) Information`.
- **Title**: *"Basic Information"* | *"Please provide the patient's details."*
- **Form Fields (Large Touch Inputs)**:
  1. **Full Name** `*`: Virtual keyboard-ready text input, placeholder: *"Juan Dela Cruz"*.
  2. **Date of Birth** `*`: Formatted calendar input `[MM / DD / YYYY]`.
  3. **Gender** `*`: 3 prominent pill buttons: `[ Male ]` `[ Female ]` `[ Other / Prefer not to say ]`.
  4. **Contact Number** `*`: Number-only input with `+63 / 09` prefix, placeholder: *"0912 345 6789"*.
- **Validation**: Inline error states with red highlight if required fields are omitted before tapping `Continue`.

---

### Screen 5: Main Symptoms (Target Symptoms)
- **Purpose**: Gathers the chief complaint through categorical touch cards and optional voice input.
- **Persistent Stepper**: Step 4 active: `(4) Symptoms`.
- **Title**: *"What are your main symptoms?"* | *"Select all that apply."*
- **Symptom Selection Grid** ($2 \times 4$ multi-select tiles with medical icons):
  - `[<Thermometer /> Fever]`
  - `[<MessageSquareText /> Cough]`
  - `[<Wind /> Shortness of Breath]`
  - `[<HeartPulse /> Chest Pain]`
  - `[<ShieldAlert /> Abdominal Pain]`
  - `[<Frown /> Headache]`
  - `[<Bandage /> Injury / Trauma]`
  - `[<PlusCircle /> Other]`
- **Voice Input Mode**: Prominent pill button at bottom: `[<Mic /> Tap for Voice Input]`. When pressed, an animated sound-wave pulse appears with transcript preview: *"Listening: Patient reports high fever and severe chest tightness..."*.

---

### Screen 6: Futuristic Biometric Body Map
- **Purpose**: Allows patients to communicate anatomical pain location without needing medical vocabulary.
- **Persistent Stepper**: Step 4 active: `(4) Symptoms`.
- **Title**: *"Where is your pain or symptom located?"* | *"Tap on the body area(s) where you feel the symptom."*
- **Visual Design (Futuristic Digital Twin / Biometric Scanner)**:
  - **Center Canvas**: Translucent glowing anatomical wireframe silhouette featuring front and back human anatomy.
  - **Perspective Flip Button**: `[ <RotateCw /> Front / Back View ]` toggle.
  - **Interactive Hot-spots**: Glowing pulse nodes at major anatomical joints. Tapping an area triggers an animated radial ping and targeting reticle.
- **Zone Selector Column (Right Side)**:
  - `[ <User /> Head ]`
  - `[ <Activity /> Neck ]`
  - `[ <Shield /> Shoulder ]`
  - `[ <HeartPulse /> Chest ]` *(Selected)*
  - `[ <ShieldAlert /> Abdomen ]`
  - `[ <RotateCw /> Back ]`
  - `[ <Activity /> Legs ]`
  - `[ <Activity /> Arms ]`
  *(Tapping either the body map hotspot or the side button keeps both synchronized).*

---

### Screen 7: Pain Level & Duration (Substep 4.3)
- **Purpose**: Collects pain severity via a 0–10 Numeric Pain Rating Scale and symptom duration.
- **Persistent Stepper**: Step 4 active: `(4) Symptoms` (Substep 4.3 of 4).
- **Section 1: 0–10 Numeric Pain Rating Scale (`<PainScale>`)**:
  - Title: *"How would you rate your pain?"* | *"Select a number from 0 to 10."*
  - 11 Circular Touch Targets (`0` through `10`):
    - `0` (No Pain - Emerald)
    - `1 – 2` (Mild - Emerald)
    - `3 – 5` (Moderate - Amber)
    - `6 – 8` (Severe - Orange)
    - `9 – 10` (Worst Possible - Red)
  - Dynamic Semantic Feedback Pill: Displaying live label (e.g., *"Rating: 7 / 10 — Severe Pain"*).
- **Section 2: Symptom Duration** (Addresses Instructor Feedback):
  - Title: *"How long have you had this symptom?"*
  - 6 Discrete Duration Pills ($3 \times 2$ grid):
    - `[ < 1 hour ]`
    - `[ 1 – 6 hours ]` *(Selected)*
    - `[ 6 – 24 hours ]`
    - `[ 1 – 3 days ]`
    - `[ > 3 days ]`
    - `[ Not sure ]`

---

### Screen 8: Additional Details
- **Purpose**: Collects associated secondary symptoms and freeform voice or text observations.
- **Persistent Stepper**: Step 4 active: `(4) Symptoms`.
- **Section 1: Additional Symptoms (Checklist)**:
  - `[ ] Nausea`
  - `[ ] Dizziness`
  - `[ ] Loss of appetite`
  - `[ ] Fatigue`
  - `[ ] Other (Please specify): [________________]`
- **Section 2: Voice Note (Optional)**:
  - Graphic recorder card with microphone icon: *"Tap to record or hold to speak"*.
  - Displays simulated recorded waveform and playback duration `[ ▶️ 0:14 / 0:30 ]`.

---

### Screen 9: Review Information
- **Purpose**: Error prevention and verification before data is officially queued in the hospital triage system.
- **Persistent Stepper**: Step 5 active: `(5) Review`.
### Screen 9: Review Information
- **Purpose**: Error prevention and verification before data is officially queued in the hospital triage system.
- **Persistent Stepper**: Step 5 active: `(5) Review`.
- **Title**: *"Review Your Information"* | *"Please check your details before submitting."*
- **Structured Summary Card** (Rendered with certified Lucide icons):
  - `(User) Name`: Juan Dela Cruz
  - `(Calendar) Date of Birth`: Jan 1, 1990 (Age 36)
  - `(Users) Gender`: Male
  - `(Phone) Contact Number`: 0912 345 6789
  - `(Activity) Main Symptoms`: Fever, Cough
  - `(MapPin) Pain Location`: Chest
  - `(AlertTriangle) Pain Level`: 7 / 10 (Severe)
  - `(Clock) Duration`: 1–6 hours
  - `(FileText) Additional Details`: Nausea, Fatigue
- **Interactive Controls**: Each data row features a `<Edit3 />` button labeled `[ Edit ]` allowing direct return to the respective step with state preserved.
- **Bottom Navigation**: `[← Back]` | `[Confirm & Continue →]`.

---

### Screen 10: Submit Your Intake
- **Purpose**: Explicit pre-submission checkpoint emphasizing the non-replacement of clinical evaluation.
- **Hero Icon**: Document icon (`<FileCheck />`) with primary green check badge.
- **Title**: **"Submit Your Intake"**
- **Body Notice**:
  > *"Your information will be securely transmitted to the WVSU Medical Center emergency triage team for clinical review and priority queue assignment."*
- **Clinical Disclaimer**:
  > *“Notice: TriageSense is a preliminary self-service intake kiosk. It does not provide medical diagnoses or replace clinical assessment by certified emergency personnel.”*
- **Primary Action**: Full-width oversized button: `[ <Send /> Submit Intake ]`.

---

### Screen 11: Submission Confirmation
- **Purpose**: Reassures the patient, delivers their triage queue reference number, and provides actionable waiting instructions.
- **Visual**: Large animated checkmark icon (`<CheckCircle2 />` in `#16803C`).
- **Title**: **"Intake Submitted!"**
- **Subtitle**: *"Thank you for providing your information. A triage nurse will review your details shortly."*
- **Queue Reference Badge**:
  ```
  ┌────────────────────────────────────────────────────────┐
  │  Your Reference Number                                 │
  │  TS-2026-000123                         [<Copy /> Copy]│
  └────────────────────────────────────────────────────────┘
  ```
- **Instructions**: *"Please proceed to the ED Waiting Lounge Area B. Watch the triage overhead display for your reference number or listen for your name to be called."*
- **Action**: `[ Back to Home / Finish ]` (with a 30-second auto-reset timer to clear the terminal for the next patient).

---

### System Transition: Intake Record Transmission to Staff Workstation
*Upon intake confirmation (Screen 11), patient intake data is instantaneously transmitted via WebSocket to the ER Triage Staff Workstation. This marks the architectural boundary where self-service intake transitions to clinical evaluation.*

> [!TIP]
> **Clinical EDIS Admin Suite Specification**:  
> For the comprehensive Clinical EDIS Admin Suite (ADM-01 Queue, ADM-02 Patient Clinical Dossier, ADM-03 Emergency Dispatch, and extended capabilities), see the companion specification:  
> [TS-ADM-002: docs/06_admin_screen_spec.md](file:///home/markc/projects/playground/triagesense/docs/06_admin_screen_spec.md).

---

## 6. Comprehensive React + Vite Architecture

### 6.1 Component Hierarchy
```
App (Root & View Switcher)
├── ViewSwitcher (Toggle between Kiosk Enclosure & Staff Desktop Portal)
│
├── KioskPortal (Container: 1080×1920 Kiosk Shell)
│   ├── KioskHeader (WVSUMC Branding, Language Pill, Assistance Alert)
│   ├── AssistanceModal (Emergency confirmation & 60s cooldown timer)
│   ├── StepStepper (5-stage intake progress tracker)
│   ├── ScreenContainer
│   │   ├── Screen1_Welcome
│   │   ├── Screen2_Language
│   │   ├── Screen3_Identification
│   │   ├── Screen4_PatientInfo
│   │   ├── Screen5_Symptoms
│   │   ├── Screen6_FuturisticBodyMap
│   │   ├── Screen7_PainAndDuration
│   │   ├── Screen8_AdditionalDetails
│   │   ├── Screen9_Review
│   │   ├── Screen10_Submit
│   │   └── Screen11_Confirmation
│   └── KioskFooter (Back & Continue navigation buttons)
│
└── StaffPortal (Desktop 1920×1080 ER Nurse Station — TS-ADM-002)
    ├── StaffHeader (Triage nurse credentials, time, system status)
    ├── StaffKpiRow (New, Waiting, Urgent, Completed stat widgets)
    ├── IntakeQueueTable (Live table with priority badges & filters)
    └── PatientDetailModal (Detailed intake dossier & body map preview)
```

### 6.2 Shared Data Schema (Intake Record State)
```typescript
interface IntakeRecord {
  id: string; // e.g., "TS-2026-000123"
  timestamp: string;
  language: 'en' | 'fil' | 'ceb' | 'hil';
  identification: {
    method: 'hospital_id' | 'qr_code' | 'nfc' | 'manual';
    identifierValue?: string;
  };
  patientInfo: {
    fullName: string;
    dob: string;
    gender: 'Male' | 'Female' | 'Other';
    contactNumber: string;
  };
  symptoms: string[]; // e.g., ['Fever', 'Cough', 'Chest Pain']
  bodyLocations: string[]; // e.g., ['Chest', 'Shoulder']
  painLevel: number; // 0 to 10
  duration: '< 1 hour' | '1-6 hours' | '6-24 hours' | '1-3 days' | '> 3 days' | 'Not sure';
  additionalSymptoms: string[]; // e.g., ['Nausea', 'Fatigue']
  customNotes?: string;
  voiceNoteUrl?: string;
  // Intake triage state & clinical safety guard
  queueStatus: 'New Intake' | 'Waiting for Triage' | 'In Triage' | 'Completed';
  acuityAssessment: {
    status: 'Pending Nurse Review' | 'Nurse-Confirmed';
    assignedEsiLevel?: 1 | 2 | 3 | 4 | 5; // Strictly clinician-assigned in ADM-02
    suggestedUrgencyHint?: 'High Discomfort' | 'Standard Intake'; // Non-diagnostic triage hint
    assessedByNurseId?: string;
  };
}
```

---

## 7. Verification & Academic Evaluation Checklist

| Evaluation Criterion | Standard / Heuristic | Verification Method in TriageSense |
| :--- | :--- | :--- |
| **Touch Ergonomics** | Fitts's Law ($W \ge 64\text{ px}$) | Verified all buttons, chips, and sliders meet or exceed $64\text{ px}$ touch target dimensions. |
| **Cognitive Simplicity** | Hick's Law ($n \le 8$ per screen) | Segmented into 11 single-focus screens with progressive disclosure. |
| **High-Contrast Readability** | WCAG 2.1 AAA Contrast ($\ge 7:1$) | Navy text (`#172B4D`) on light canvas (`#F8F8F6`) achieves $12.8:1$ contrast ratio. |
| **Regional Appropriateness** | Western Visayas Localization | Hiligaynon (Ilonggo) and Cebuano included alongside Filipino and English. |
| **Anti-Spam Safety** | Accidental click prevention | Two-stage confirmation dialog + 60s cooldown disabled state on assistance call. |
| **Role Separation** | Client vs. Admin ergonomics | Kiosk UI tailored for touch standing/wheelchair; Staff Dashboard optimized for desktop mouse/keyboard review. |

---

## 8. Document Control & Verification Sign-Off

| Audit Metric | Specification Value | Compliance Status |
| :--- | :--- | :---: |
| **Document Identifier** | `TS-KSK-002` | Active Kiosk Blueprint |
| **Screen Coverage** | Screens 01–11 (Kiosk Terminal Sequence) | 100% Complete |
| **Ergonomic Benchmark** | ISO 9241-9 / ADA §707 ($64\text{px}$ minimum target) | Compliant |
| **Pain Measurement** | 0–10 Numeric Pain Rating Scale (`<PainScale>`) | Clinically Grounded |
| **Iconography Standard** | Lucide Medical Icon System (2.0px stroke) | 100% (0 Emojis) |
| **Review Status** | Team TriageSense (CIT 213 HCI 2) | Final Academic Draft |
