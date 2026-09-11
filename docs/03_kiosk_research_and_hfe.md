# WVSU Medical Center — TriageSense
## Human Factors Engineering, Stress Modeling & Screen Friction Analysis

**Document Identifier**: `TS-KSK-001` | **Version**: `1.0.0 (Audited Design Specification)`  
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

This research document analyzes the **patient and caregiver personas**, catalogs all **sources of interaction friction**, and establishes **engineering and UI/UX countermeasures** for the 11-screen TriageSense kiosk sequence and staff handoff.

> [!NOTE]
> **Illustrative Sample Data Disclaimer**:
> Personas (*Tatay Ernesto*, *Grace*, *Bea*), sample case studies, and operational metrics are **illustrative academic models** engineered for CIT 213 coursework evaluation, not real patient health records from WVSU Medical Center.

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
* **Physical / Cognitive State**: Short of breath, trembling hands, mild cataract (low visual acuity), speaks predominantly **Hiligaynon (Ilonggo)**. Anxious about cost and line jumping.
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
| **Cognitive / Attentional** | Adrenaline surge, acute pain, and ambient sensory overload (alarms, shouting, sirens) in the ED. | Cognitive tunneling; inability to process complex instructions or multi-step questions. | **Hick-Hyman Law optimization**: 1 concept per screen, maximum 6–8 visually distinct choices, zero non-essential text. |
| **Linguistic & Literacy** | Medical jargon (e.g., "dyspnea", "epigastric distress") vs. regional colloquialisms. | Misunderstood questions, incorrect triage categorization. | Plain-language phrasing in 4 languages (English, Filipino, Cebuano, Hiligaynon) with universal medical iconography. |
| **Tactile & Environmental** | Clammy/sweaty hands from acute fever or shock; ambient overhead fluorescent lighting creating screen glare. | Capacitive touch failure, glare-induced eye strain. | Matte anti-glare screen specification, high contrast ratio ($13.26:1$), large tap targets with visual/auditory touch confirmation. |
| **Temporal / Anxiety** | Patient fears that using a machine will cause them to "lose their turn" to someone who talks to a nurse directly. | High bounce rate / kiosk refusal. | Clear reassurance banner on Screen 1: *"Using this kiosk places you directly into the digital nurse triage queue faster."* |
| **Privacy & Security** | Public terminal displaying sensitive medical conditions to patients standing in line behind them. | Patient hesitates or enters false symptom data due to embarrassment. | Narrow viewing-angle privacy filters ($30^\circ$ louvre optical film), auto-clearing session timer, obscured contact number entry. |

---

## 4. Screen-by-Screen UX & Engineering Deep-Dive

### Screen 1: Welcome & Immediate Assistance Guard

```
┌─────────────────────────────────────────────────────────┐
│ [WVSUMC Logo]       TriageSense           [English ▼]   │
├─────────────────────────────────────────────────────────┤
│                                                         │
│             Welcome to WVSU Medical Center              │
│       We're here to help you get the right care, faster.│
│                                                         │
│             ┌─────────────────────────────┐             │
│             │     Start Intake  →         │  (Primary)  │
│             └─────────────────────────────┘             │
│                                                         │
│             ┌─────────────────────────────┐             │
│             │ (AlertCircle) Urgent Help   │  (Emergency)│
│             │     Need a nurse right now? │             │
│             └─────────────────────────────┘             │
│                                                         │
│   [<ShieldCheck /> Safe] [<Zap /> Fast] [<Heart /> Care]│
└─────────────────────────────────────────────────────────┘
```

#### 1. Persona Friction Analysis
- **Crisis State Friction**: A patient in acute crisis (e.g., impending cardiac arrest or severe hemorrhage) cannot navigate a questionnaire. They need an emergency nurse immediately.
- **Accidental Tap / Prank Friction**: Unattended kiosks in public hospital waiting rooms are prone to children tapping red buttons or anxious companions repeatedly spamming the alert.

#### 2. Engineering & UX Countermeasures
- **Dual-Hierarchy Action Architecture**:
  - `Start Intake` occupies primary visual weight (Hospital Green `#006B3F`, dimensions $360 \times 72\text{px}$).
  - `Request Immediate Assistance` is styled as an urgent action (Medical Red `#DC2626`, dimensions $360 \times 72\text{px}$).
- **Two-Stage Confirmation Safeguard**:
  - Tapping the red button triggers a high-contrast modal dialog:
    > **"Do you need immediate emergency staff?"**  
    > *"Select this if the patient has severe chest pain, cannot breathe, is bleeding heavily, or is losing consciousness."*  
    > `[ Cancel / I Can Use Kiosk ]` `[ Request Immediate Assistance ]`
- **60-Second Hardware Lockout & State Transition**:
  - Upon confirmation, an instant high-priority packet is fired to the Nurse Dashboard with kiosk location ID.
  - The button enters a disabled state (`#94A3B8`), showing an active countdown: *"Assistance Dispatched (58s)..."*.
  - A persistent green alert box confirms: *"Triage staff has been notified and is on the way to this kiosk."*

---

### Screen 2: Language Selection

#### 1. Persona Friction Analysis
- **Regional Dialect Barrier**: In Iloilo City and Panay Island, elderly patients (like *Tatay Ernesto*) struggle with formal Tagalog and English. When in distress, patients instinctively revert to their mother tongue (**Hiligaynon**).
- **Cognitive Switching Friction**: If language selection feels complex, the user perceives the kiosk as inaccessible and walks away.

#### 2. Engineering & UX Countermeasures
- **$2 \times 2$ Ergonomic Grid**: 4 equal-sized cards ($240 \times 120\text{px}$) with generous touch targets:
  1. **English** (with UK/US/PH bilingual indicator)
  2. **Filipino** (*"Pambansang Wika / Tagalog"*)
  3. **Hiligaynon** (*"Ilonggo — Halin sa Panay kag Guimaras"*)
  4. **Cebuano** (*"Bisaya — Negros kag Mindanao"*)
- **Native Script Typography**: Each language is written in its native cultural spelling, accompanied by a subtle national/regional icon.
- **Persistent Global Language Switcher**: The selected language persists across all screens, but a persistent language dropdown remains in the top-right header so companions can switch back if needed.

---

### Screen 3: Patient Identification

```
┌─────────────────────────────────────────────────────────┐
│ [← Back]          Step 2 of 5: Identification           │
├─────────────────────────────────────────────────────────┤
│         How would you like to identify yourself?        │
│                                                         │
│     ┌──────────────────────┐  ┌──────────────────────┐  │
│     │ [<CreditCard /> ID]  │  │    [<QrCode /> QR]   │  │
│     │ Enter existing WVSU  │  │ Scan PhilHealth or   │  │
│     │ hospital number      │  │ appointment QR       │  │
│     └──────────────────────┘  └──────────────────────┘  │
│     ┌──────────────────────┐  ┌──────────────────────┐  │
│     │     [<Radio /> NFC]  │  │  [<Edit3 /> Manual]  │  │
│     │ Tap hospital card    │  │ First-time patient   │  │
│     │ or wristband         │  │ or no ID present     │  │
│     └──────────────────────┘  └──────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

#### 1. Persona Friction Analysis
- **Physical Searching Friction**: An injured patient cannot dig through their bag for an ID card without severe pain or dropping belongings.
- **First-Time Anxiety**: New patients worry they cannot use the kiosk without a prior hospital record number.

#### 2. Engineering & UX Countermeasures
- **Zero-Dead-End Philosophy**: "Enter Manually" is given equal visual prominence ($240 \times 130\text{px}$ card) to prevent first-time patients from feeling excluded.
- **Contactless Hardware Integration Cues**:
  - Selecting "QR Code" activates the hardware LED illumination ring around the optical scanner below the screen, guiding the user's gaze physically.
  - Selecting "NFC Tap" triggers an animated pulse icon demonstrating tapping a card against the reader icon.

---

### Screen 4: Basic Patient Information

#### 1. Persona Friction Analysis
- **The "Gorilla Arm" Virtual Keyboard Trap**: Typing full names, email addresses, and home addresses on an upright vertical glass screen causes rapid arm fatigue, high typo rates, and user frustration.
- **Over-Collection of Non-Essential Data**: Asking for insurance policy numbers, home addresses, or PhilHealth employer details during initial triage creates administrative friction and delays clinical assessment.

#### 2. Engineering & UX Countermeasures
- **Strict Data Minimization (Emergency Intake Only)**:
  - Restricted to strictly 4 fields: **Full Name**, **Date of Birth**, **Gender**, and **Contact Number**.
  - All extended billing and demographic info is deferred to post-triage registration.
- **Touch-Optimized Input Controls**:
  - **Gender**: 3 large pill chips (`[ Male ]`, `[ Female ]`, `[ Other ]`) — zero typing required.
  - **Date of Birth**: 3 separate large touch spinners or numeric keypad entry (`[MM] [DD] [YYYY]`) rather than a complex calendar datepicker.
  - **Contact Number**: Automatic numeric keypad popup with large $72 \times 72\text{px}$ keys; auto-masked as `09XX - XXX - XXXX`.

---

### Screen 5: Main Symptoms (Chief Complaint)

```
┌─────────────────────────────────────────────────────────┐
│ [← Back]            Step 3 of 5: Symptoms               │
├─────────────────────────────────────────────────────────┤
│              What are your main symptoms?               │
│                 Select all that apply                   │
│                                                         │
│   [<Thermometer /> Fever]  [<MessageSquare /> Cough]    │
│   [<Wind /> Dyspnea]       [<HeartPulse /> Chest Pain]  │
│   [<ShieldAlert /> Belly]  [<Frown /> Headache]         │
│   [<Bandage /> Injury]     [<PlusCircle /> Other...]    │
│                                                         │
│   ┌─────────────────────────────────────────────────┐   │
│   │   [<Mic /> Tap to Speak Symptoms (Voice Input)] │   │
│   └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

#### 1. Persona Friction Analysis
- **Medical Vocabulary Mismatch**: Patients describe symptoms phenomenologically (*"feeling burning in my belly"* rather than *"gastritis/epigastric distress"*).
- **Multiple Concurrent Symptoms**: Rare is the ED patient with only one symptom; forcing single-choice radio buttons results in inaccurate clinical data.

#### 2. Engineering & UX Countermeasures
- **High-Affordance Multi-Select Cards**:
  - $2 \times 4$ grid of oversized cards ($220 \times 110\text{px}$) with standardized medical iconography.
  - Selected state transforms from neutral grey to **WVSUMC Green outline (`#006B3F`)** with a bold green checkmark badge in the upper right corner.
- **Multimodal Voice Input Fallback**:
  - For patients with broken fingers, severe arthritis, or visual impairment, a prominent **"Tap to Speak"** button allows voice reporting.
  - *Engineering Note*: Integrates front-end Web Speech API with noise thresholding to accommodate noisy emergency waiting areas.

---

### Screen 6: Futuristic Biometric Body Map

```
┌─────────────────────────────────────────────────────────┐
│ [← Back]            Step 3 of 5: Symptoms               │
├─────────────────────────────────────────────────────────┤
│         Where is your pain or symptom located?          │
│                                                         │
│       [ <RotateCw /> Front/Back ]   Selected: [ Chest ] │
│                                                         │
│               .-.                  ┌────────────────┐   │
│              (   )                 │ [Head]         │   │
│              /|-|\                 │ [Neck]         │   │
│             / |•| \  <-(Chest Ping)│ [Shoulder]     │   │
│            (  | |  )               │ [Chest]    ✓   │   │
│               | |                  │ [Abdomen]      │   │
│               | |                  │ [Back]         │   │
│              /   \                 │ [Arms]         │   │
│             |     |                │ [Legs]         │   │
│                                    └────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

#### 1. Persona Friction Analysis
- **Spatial Ambiguity**: Patients often find anatomical diagrams confusing or fear they might tap the wrong exact organ on a 2D line drawing.
- **Back vs. Front Confusion**: Back pain (lumbar strain, kidney stones) cannot be marked on a static front-only drawing.

#### 2. Engineering & UX Countermeasures
- **Futuristic Holographic Aesthetic with Broad Target Hot-spots**:
  - Vector silhouette with glowing cyan/green biometric nodes.
  - Large interactive hit zones ($80 \times 80\text{px}$) over major anatomical clusters (Cranial, Cervical, Thoracic, Abdominal, Pelvic, Upper Limbs, Lower Limbs).
- **Synchronized Dual-Mode Interaction (Direct Map + Side Selector)**:
  - Users can either **tap directly on the body illustration** OR **tap the labeled button on the right**.
  - Selecting either element instantly animates a glowing pulse ring on the anatomical zone and highlights the button.
- **1-Tap Perspective Flip**: `[ <RotateCw /> Front / Back View ]` toggle allows effortless access to posterior pain zones.

---

### Screen 7: Pain Level & Duration

#### 1. Persona Friction Analysis
- **Subjectivity of Pain Numbers**: An elderly patient does not know what "7" means compared to "8". Without semantic anchoring, numerical pain scales produce inconsistent clinical data.
- **Instructor Feedback Addressed (Expanded Durations)**: Previous prototypes offered too few duration options (e.g., "Hours" vs "Days"), obscuring whether an acute condition (e.g., stroke within 3-hour thrombolytic window) was present.

#### 2. Engineering & UX Countermeasures
- **0–10 Numeric Pain Rating Scale (with Clinically-Aligned Severity Tiers)**:
  - 11 circular touch buttons ($60 \times 60\text{px}$) arranged horizontally with an $8\text{px}$ touch gutter.
  - **Dynamic Four-Tier Color Ramp**:
    - `0 – 2`: Emerald Green (`#10B981`) — *"Mild / Discomfort"*
    - `3 – 5`: Amber Yellow (`#F59E0B`) — *"Moderate Pain"*
    - `6 – 8`: Severe Orange (`#F97316`) — *"Severe Pain"*
    - `9 – 10`: Deep Crimson (`#B91C1C`) — *"Worst Possible Pain"*
  - Prominent real-time qualitative banner above the slider: *"Selected: 7 / 10 — Severe Pain (Difficulty concentrating, requires urgent review)"*.
- **Expanded 6-Choice Duration Grid ($3 \times 2$ Matrix)**:
  - Direct implementation of instructor feedback:
    1. `[ < 1 hour ]` (Vital for acute myocardial infarction / stroke windows)
    2. `[ 1 – 6 hours ]`
    3. `[ 6 – 24 hours ]`
    4. `[ 1 – 3 days ]`
    5. `[ > 3 days ]` (Chronic / sub-acute)
    6. `[ Not sure ]` (Prevents anxiety-driven guessing)

---

### Screen 8: Additional Details

#### 1. Persona Friction Analysis
- **Comorbidity Neglect**: Patients often forget to mention critical secondary symptoms (e.g., dizziness accompanying chest pain) because they were focused on the primary complaint.
- **Fatigue Barrier**: Patients do not want to fill out another long questionnaire.

#### 2. Engineering & UX Countermeasures
- **Quick-Check Comorbidity Chips**:
  - High-frequency associated symptoms presented as one-tap checkboxes: `[ ] Nausea`, `[ ] Dizziness`, `[ ] Loss of appetite`, `[ ] Fatigue`.
- **Audio Voice Note Recorder**:
  - Microphone card with one-touch recording: *"Tap to record a 15-second voice memo for the triage nurse"*.
  - Displays real-time audio wave animation and a replay button, catering to patients who find speaking easier than typing.

---

### Screen 9: Review Information

```
┌─────────────────────────────────────────────────────────┐
│ [← Back]             Step 5 of 5: Review                │
├─────────────────────────────────────────────────────────┤
│             Please review your information              │
│                                                         │
│  ┌───────────────────────────────────────────────────┐  │
│  │ (<User />) Patient: Juan Dela Cruz  [<Edit3 /> Edit│  │
│  │ (<Calendar />) DOB: Jan 1, 1990    Gender: Male   │  │
│  │ (<Phone />) Contact: 0912-345-6789                │  │
│  ├───────────────────────────────────────────────────┤  │
│  │ (<Activity />) Symptoms: Fever, Cough [<Edit3 />  │
│  │ (<MapPin />) Location: Chest    Pain: 7/10 (Severe│  │
│  │ (<Clock />) Duration: 1–6 hours Secondary: Fatigue│  │
│  └───────────────────────────────────────────────────┘  │
│                                                         │
│  [← Go Back / Change]            [ Looks Good, Submit → ]│
└─────────────────────────────────────────────────────────┘
```

#### 1. Persona Friction Analysis
- **"All-or-Nothing" Edit Anxiety**: If a patient notices a typo in their phone number, they dread tapping "Back" repeatedly and losing all their entered symptom data.

#### 2. Engineering & UX Countermeasures
- **Modular Data Cards with Deep In-Line Edit Links**:
  - Demographic block has a dedicated `[ <Edit3 /> Edit Info ]` button that deep-links directly to Screen 4 with state preserved.
  - Symptom block has a dedicated `[ <Edit3 /> Edit Symptoms ]` button linking to Screen 5.
- **Clear Scannable Visual Hierarchy**: Grouped summary using standardized Lucide icons (`<User />`, `<Calendar />`, `<HeartPulse />`, `<MapPin />`, `<AlertTriangle />`, `<Clock />`), enabling a 5-second verification glance.

---

### Screen 10: Submit Your Intake

#### 1. Persona Friction Analysis
- **Legal & Clinical Misunderstanding**: Patients may erroneously assume that submitting a kiosk form means they have been clinically diagnosed or that a doctor has already prescribed medication.

#### 2. Engineering & UX Countermeasures
- **Explicit Clinical Disclaimer (Non-Replacement of Medical Assessment)**:
  - Clear, prominent callout card:
    > *“Notice: TriageSense is a preliminary self-service intake kiosk. It does not provide medical diagnoses or replace clinical assessment by certified emergency personnel. A triage nurse will conduct your physical assessment.”*
- **High-Affordance Primary Submit Button**:
  - Full-width button ($100\text{px}$ height, `#006B3F`) with haptic and visual loading state on tap to confirm data dispatch.

---

### Screen 11: Submission Confirmation & Queue Handoff

```
┌─────────────────────────────────────────────────────────┐
│                 WVSU MEDICAL CENTER                     │
├─────────────────────────────────────────────────────────┤
│                                                         │
│                   [ <CheckCircle2 /> ]                  │
│                     Intake Submitted!                   │
│         Thank you for providing your information.       │
│        A triage nurse will review your details shortly. │
│                                                         │
│         ┌─────────────────────────────────────┐         │
│         │   Your Triage Reference Number      │         │
│         │          TS-2026-000123             │         │
│         │     Priority Category: HIGH         │         │
│         └─────────────────────────────────────┘         │
│                                                         │
│    Please proceed to ED Waiting Lounge Area B.          │
│    Watch the overhead display for your number.          │
│                                                         │
│           [ Done / Return to Welcome (24s) ]            │
└─────────────────────────────────────────────────────────┘
```

#### 1. Persona Friction Analysis
- **Post-Submission Disorientation**: *"What do I do now? Where do I sit? How will they call me?"*
- **Terminal Privacy Leak**: If a patient leaves the screen open, the next patient can see their name, phone number, and medical complaint.

#### 2. Engineering & UX Countermeasures
- **Tangible Queue Token (`TS-2026-000123`)**: Large high-contrast reference number that matches the physical ticket printer and the emergency room overhead monitors.
- **Clear Spatial Next Steps**: Directs patient to *"ED Waiting Lounge Area B"* and instructs them to watch overhead screens or listen for their name.
- **Privacy Auto-Purge Timer (30-Second Countdown)**:
  - Terminal displays a dynamic countdown: `[ Done / Return to Welcome (30s) ]`.
  - When timer reaches 0, the session cache is wiped from local memory and the kiosk returns cleanly to Screen 1.

---

### Screen 12: Triage Staff Desktop Dashboard (Nurse Station)

```
┌──────────────────────────────────────────────────────────────────────────────┐
│ [WVSUMC Logo] TriageSense ER Portal — Desk 1      Nurse Reyes, RN  ● Online  │
├──────────────────────────────────────────────────────────────────────────────┤
│ [ 12 New Intake ]   [ 8 Waiting ]   [ 2 Urgent / ESI-2 ]   [ 31 Completed ]  │
├──────────────────────────────────────────────────────────────────────────────┤
│ Live Intake Queue               [Filter: All Priorities ▼] [<Search /> Search] │
│ ┌──────────────┬──────────────┬───────────────┬────────────┬───────────────┐ │
│ │ Patient Name │ Arrival Time │ Chief Problem │ Pain / ESI │ Action        │ │
│ ├──────────────┼──────────────┼───────────────┼────────────┼───────────────┤ │
│ │ J. Dela Cruz │ 10:24 AM     │ Chest Pain    │ 7/10 [Urgent] [View Record]│ │
│ │ M. Santos    │ 10:18 AM     │ Abdominal     │ 9/10 [Urgent] [View Record]│ │
│ │ P. Reyes     │ 10:12 AM     │ Fever, Cough  │ 4/10 [High]   [View Record]│ │
│ │ A. Garcia    │ 10:05 AM     │ Headache      │ 2/10 [Low]    [View Record]│ │
│ └──────────────┴──────────────┴───────────────┴────────────┴───────────────┘ │
└──────────────────────────────────────────────────────────────────────────────┘
```

#### 1. Nurse Persona Friction Analysis
- **Data Overload & Chart Hunting**: Nurses cannot spend 3 minutes scrolling through raw patient answers. They need an instantaneous **5-second clinical gestalt**.
- **Lack of Prioritization**: If the queue is sorted only by arrival time, a myocardial infarction patient who arrived 2 minutes ago could sit behind 5 mild cough patients.

#### 2. Engineering & UX Countermeasures
- **Automated Clinical Urgency Highlighting**:
  - Automatically flags high-risk chief complaints (Chest pain, severe dyspnea, pain score $\ge 8$) with **High Priority Badges (`<AlertCircle /> High / ESI-2`)**.
- **One-Click Patient Intake Inspection Drawer**:
  - Clicking `[ View Record ]` slides out a clean dossier showing:
    1. Demographics & Contact.
    2. Holographic body map visual highlighting the chest area.
    3. Exact symptom duration (`1–6 hours`).
    4. Voice note playback button.
    5. Action buttons: `[ Call to Triage Desk 1 ]`, `[ Escalate to Trauma ]`, `[ Mark Triaged ]`.

---

## 5. Summary Matrix: HCI Heuristics vs. Friction Resolution

| Screen # | Screen Name | Key Persona Friction | HCI / Engineering Resolution | Usability Heuristic |
| :---: | :--- | :--- | :--- | :--- |
| **1** | Welcome / Start | Panic, accidental red button spam | Two-stage emergency modal + 60s cooldown lock | Error Prevention (H#5) |
| **2** | Language Selection | Non-English literacy in Western Visayas | Hiligaynon & Cebuano regional dialect integration | Match with Real World (H#2) |
| **3** | Patient Identification | Physical search for ID cards | Manual fallback + optical QR / NFC reader cues | Flexibility & Efficiency (H#7) |
| **4** | Patient Information | Typing fatigue on vertical glass | Elimination of non-essential fields; large keypad | Recognition over Recall (H#6) |
| **5** | Main Symptoms | Medical terminology confusion | 8 visual icon cards + Web Speech voice input | Aesthetic & Minimalist (H#8) |
| **6** | Biometric Body Map | Spatial inaccuracy on 2D body | Synchronized 3D-style map + lateral zone buttons | Consistency & Standards (H#4) |
| **7** | Pain & Duration | Vague pain ratings; rigid time options | 0–10 Numeric Pain Rating Scale + 6-option duration grid | Flexibility of Use (H#7) |
| **8** | Additional Details | Omission of secondary symptoms | Quick comorbidity chips + 15s voice memo | User Control & Freedom (H#3) |
| **9** | Review Information | Fear of losing data on edits | Modular summary cards with deep-edit links | Error Recovery (H#9) |
| **10** | Submit Intake | Belief that kiosk diagnoses patient | Explicit non-diagnostic clinical disclaimer | Visibility of Status (H#1) |
| **11** | Confirmation | Terminal abandonment / privacy leaks | 30s auto-purge timer + physical queue token | User Privacy & Handoff |
| **Handoff** | Staff Desktop Handoff | Clinical cognitive fatigue & delay | Real-time queue ingestion + 5-second intake dossier | Clinical Decision Support |

---

## 6. Document Control & Verification Sign-Off

| Audit Metric | Specification Value | Compliance Status |
| :--- | :--- | :---: |
| **Document Identifier** | `TS-KSK-001` | Academic Research & HFE Specification |
| **Persona Coverage** | Geriatric Caregiver (*Ernesto*), Acute Patient (*Bea*), Nurse (*Kristine*) | Fictional Case Models (Academic) |
| **Cognitive Modeling** | Hick-Hyman Law ($n \le 8$), Cognitive Tunneling Mitigation | Modeled & Targeted |
| **Biomechanical Safety** | Gorilla Arm Mitigation, $64\text{px}$ touch targets | Target Met |
| **Iconography Standard** | Lucide Medical Icon System (2.0px stroke) | 100% (0 Emojis) |
| **Sign-Off Authority** | Team TriageSense (CIT 213 HCI 2 / WVSUMC Study) | Final Academic Draft |
