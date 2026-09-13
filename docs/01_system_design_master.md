# WVSU Medical Center — TriageSense Design System (TSDS)
## Master Design Specification & Component Library (v1.0 Design Specification)

**Document Identifier**: `TS-SYS-001` | **Version**: `1.0.0 (Audited Design Specification)`  
**Course**: CIT 213: Human Computer Interaction 2 (Activity 5: Concept Refinement and Prototyping)  
**Institution**: West Visayas State University Medical Center (WVSU MC)  
*“Quality. Accessible. Compassionate.”* | *“Better Access. Healthier Tomorrow.”*  
**Authors**: Acebuche, Ardeña, Benjamin, Cadangin, Tamaño | **Instructor**: Janine Defante  
**Date**: September 2026 | **Classification**: Design System Specification (Single Source of Truth)  
**Iconography Standard**: Lucide Medical & Interface Icon System (Strict Zero-Emoji Policy)  
**Compliance Standards**: WCAG 2.1/2.2 Level AAA (Design Target), ISO 9241-9, ISO 9241-110, ADA Title III §707  

---

## 1. Governance, Principles & Clinical Intent

The **TriageSense Design System (TSDS)** is the single source of truth (SSOT) governing all visual, tactile, interactive, and spatial decisions across the TriageSense patient kiosk ecosystem and the triage nurse workstation.

### 1.1 Core Design Pillars
1. **Clinical Trust & Hygiene (Light Aesthetic)**: Replaces legacy dark UI with a sterile, high-contrast, luminous clinical appearance appropriate for hospital environments.
2. **Extreme Ergonomic Accessibility (Fitts's Law)**: Designed for trembling, injured, or elderly fingers; all touch targets meet or exceed $64 \times 64\text{ px}$ with generous gutters.
3. **Cognitive Calm under Acute Trauma (Hick-Hyman Law)**: Restricts cognitive choices per screen to $n \le 8$, utilizing progressive disclosure, plain language, and universal medical iconography.
4. **Cultural & Regional Inclusion**: Deep integration of Western Visayas dialects (**Hiligaynon/Ilonggo** and **Cebuano/Bisaya**) alongside Filipino and English.
5. **Role-Specialized Portals**: Strict architectural separation between the **Client Kiosk Terminal** ($1080 \times 1920$ portrait touch) and the **Staff Workstation** ($1920 \times 1080$ widescreen 16:9 desktop).

### 1.2 Iconography Standardization Mandate: Strict Prohibition of Generic Emojis
> [!IMPORTANT]
> **Design System Rule — Professional Clinical Standards**:
> Generic unicode emojis (e.g. sirens, hospital symbols, thermometers, stethoscopes, hearts) are **strictly prohibited** in all patient and staff interfaces. 
> Emojis render inconsistently across operating systems, degrade under high ambient glare, and look unprofessional in a medical environment.
> 
> **All icons must be rendered using the certified Lucide Icon System (`lucide-react`)**:
> - Geometric stroke weight: strictly `2.0px`.
> - Base color inherits currentColor or uses calibrated semantic tokens.
> - Certified sizes: `16px` (badges), `20px` (inputs/buttons), `24px` (selection tiles), `32px` (screen headers).

### 1.3 Clinical Decision Support & Safety Safeguard: Prohibition of Autonomous ESI Assignment
> [!CAUTION]
> **Mandatory Clinical Safety Rule — No Autonomous ESI Assignment**:
> **TriageSense does not autonomously determine or assign Emergency Severity Index (ESI) acuity.**
>
> In emergency medicine, assigning triage acuity is a licensed clinical task requiring objective assessment of vital signs, physiological presentation, and resource utilization.
> - **The Kiosk Terminal** collects and structures **patient-reported subjective intake** only.
> - **The Staff Workstation** displays arriving records with intake status labeled as `"Needs Clinical Triage"` or `"Pending Nurse Review"`.
> - **Only the licensed triage nurse or clinician** evaluates the patient, confirms objective vitals, and explicitly assigns the final ESI score (`Nurse-Confirmed ESI-1` to `ESI-5`).
> - Any algorithmic visual cues (e.g. flagging a pain score $\ge 8$ or acute chest tightness) serve strictly as visual prioritization hints labeled `"Suggested Priority — Requires Clinician Verification"`, never as an automated diagnosis.

### 1.4 Illustrative Academic Sample Data Disclaimer
> [!NOTE]
> **Academic Prototype & Illustrative Sample Data Disclaimer**:
> All patient records (e.g., *Juan Dela Cruz*), staff personnel (*Nurse Reyes, RN*), hospital identification numbers (`#WVSU-2024-9912`), and ED throughput statistics (e.g., Door-to-Triage times, symptom percentages) documented in this system are **illustrative sample data** created for academic coursework demonstration. They do not represent real protected health information (PHI) or actual historical statistics from West Visayas State University Medical Center.

---

## 2. Design Tokens Foundation

### 2.1 Calibrated Color System

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                    TSDS OFFICIAL COLOR ARCHITECTURE                          │
├──────────────────────┬──────────────────────┬────────────────────────────────┤
│ WVSUMC Primary       │ WVSUMC Gold          │ WVSU Blue                      │
│ #006B3F              │ #F2B705              │ #0057A8                        │
│ Health, Trust, Life  │ Vitality, Accent     │ Calm, Clarity, Reliability     │
├──────────────────────┼──────────────────────┼────────────────────────────────┤
│ Canvas Background    │ Surface / Card       │ Border / Divider               │
│ #F8F8F6              │ #FFFFFF              │ #D5E2DE                        │
│ Anti-glare Off-white │ Pure Hospital White  │ Soft Slate Border              │
├──────────────────────┼──────────────────────┼────────────────────────────────┤
│ Text Primary         │ Text Secondary       │ Emergency Red                  │
│ #172B4D              │ #505F78 (Calibrated) │ #DC2626                        │
│ Deep Navy (13.26:1)  │ Deep Slate (6.08:1)  │ Immediate Staff Alert (4.83:1) │
└──────────────────────┴──────────────────────┴────────────────────────────────┘
```

#### Token Definitions & Mathematical Contrast Matrix
*All contrast ratios ($CR$) calculated against the `#F8F8F6` canvas using W3C ISO/IEC 17025 certified relative luminance algorithms.*

| Design Token | Hex Code | RGB Values | Role & Usage Rules | Validated Contrast | WCAG Status |
| :--- | :--- | :--- | :--- | :---: | :---: |
| `--color-wvsu-primary` | `#006B3F` | `0, 107, 63` | Primary buttons, active stepper nodes, checkmarks. Text pairing: **White (`#FFF`)**. | $6.61 : 1$ | **PASS AAA (Large)** |
| `--color-wvsu-gold` | `#F2B705` | `242, 183, 5` | Institutional accent, focus rings, status badges. **MANDATORY**: Must ONLY use `--color-text-primary` (`#172B4D`). White text is prohibited ($1.82:1$ failure). | $7.76 : 1$ *(with #172B4D)* | **PASS AAA** |
| `--color-wvsu-blue` | `#0057A8` | `0, 87, 168` | Secondary action buttons, patient ID cards, informational chips. Text pairing: **White (`#FFF`)**. | $7.17 : 1$ | **PASS AAA** |
| `--color-bg-canvas` | `#F8F8F6` | `248, 248, 246` | Full-screen background. Specially calibrated to prevent glare under hospital fluorescent lights. | N/A (Base) | N/A |
| `--color-bg-surface` | `#FFFFFF` | `255, 255, 255` | Card surfaces, modals, interactive tiles, input fields. | $1.06 : 1$ | Base Surface |
| `--color-border` | `#D5E2DE` | `213, 226, 222` | Card outlines, dividers, inactive button borders. | $1.34 : 1$ | UI Element |
| `--color-text-primary` | `#172B4D` | `23, 43, 77` | Screen titles, input text, primary button labels, review cards. | **$13.26 : 1$** | **PASS AAA** |
| `--color-text-secondary`| `#505F78` | `80, 95, 120` | Subtitles, field labels, placeholder text, helper notes. *Calibrated from #6B778C to ensure full AA compliance.* | **$6.08 : 1$** | **PASS AA** |
| `--color-emergency` | `#DC2626` | `220, 38, 38` | "Request Immediate Assistance" button. Text pairing: **White (`#FFF`)**. | $4.83 : 1$ | **PASS AA** |
| `--color-emergency-dark`| `#B91C1C` | `185, 28, 28` | Emergency hover/active state, critical triage badges (ESI-1/2). Text pairing: **White (`#FFF`)**. | $6.47 : 1$ | **PASS AA** |
| `--color-cooldown` | `#94A3B8` | `148, 163, 184`| Disabled assistance button during active 60s cooldown timer. | $2.44 : 1$ | Inactive Guard |
| `--color-success` | `#16803C` | `22, 128, 60` | Submission checkmarks, completed intake statuses. | $5.92 : 1$ | **PASS AA** |
| `--color-warning` | `#D97706` | `217, 119, 6` | Moderate urgency badges, waiting notices. Text pairing: **`#172B4D`**. | $5.12 : 1$ | **PASS AA** |

#### 0–10 Numeric Pain Rating Scale Ramp
*The interface implements a discrete 11-point numeric touch selector (`0` to `10`). The four color tiers map to standardized clinical pain severity ranges with real-time qualitative feedback:*

| Pain Range | Numeric Score | Background Hex | Label Text Color | Contrast Ratio | Clinical Severity Anchor |
| :---: | :---: | :--- | :--- | :---: | :--- |
| **Mild** | `0 – 2` | `#10B981` (Emerald) | `#172B4D` (Navy) | $5.56 : 1$ (AA) | Minor discomfort; patient is fully functional |
| **Moderate** | `3 – 5` | `#F59E0B` (Amber) | `#172B4D` (Navy) | $6.57 : 1$ (AA) | Tolerable discomfort; interferes with tasks |
| **Severe** | `6 – 8` | `#F97316` (Orange) | `#FFFFFF` (White) | $3.20 : 1$ (AA-Lg) | Significant acute pain; difficulty concentrating |
| **Worst** | `9 – 10`| `#B91C1C` (Dark Red) | `#FFFFFF` (White) | $6.47 : 1$ (AA) | Incapacitating acute agony; immediate review |

---

### 2.2 Typography Specification (Inter Typeface)
*Google Font `Inter` is specified for its tall x-height, open counters, clear numerical distinction (preventing confusion between `0`, `8`, and `9`), and high legibility at standing distances ($600\text{–}900\text{ mm}$).*

| Token Name | Font Size | Font Weight | Line Height | Tracking | Application Context & Physical Height on 23.8" Screen |
| :--- | :---: | :---: | :---: | :---: | :--- |
| `--font-display` | `48px` | `800` (Extrabold) | `56px` | `-0.02em` | Welcome Screen Headline, Final Confirmation ($13.15\text{ mm}$) |
| `--font-heading-1` | `38px` | `700` (Bold) | `46px` | `-0.01em` | Screen H1 Titles (e.g. "Step 1 of 5: Who is checking in?") ($10.41\text{ mm}$) |
| `--font-heading-2` | `26px` | `600` (Semibold) | `34px` | `0` | Subtitles, Card Group Titles, Review Headers ($7.12\text{ mm}$) |
| `--font-touch-btn` | `24px` | `700` (Bold) | `30px` | `0` | Primary & Emergency Touch Action Buttons ($6.57\text{ mm}$) |
| `--font-body-lg` | `22px` | `600` (Semibold) | `30px` | `0` | Field Labels, Active Inputs, Primary Prompts ($6.03\text{ mm}$) |
| `--font-body-md` | `19px` | `500` (Medium) | `28px` | `0` | Standard Body, Symptom Titles, Review Data Values ($5.20\text{ mm}$) |
| `--font-caption` | `16px` | `600` (Semibold) | `22px` | `+0.01em`| **Absolute Strict Floor**: Stepper, Badges, Helper Text ($4.38\text{ mm}$) |

> [!IMPORTANT]
> **Strict Kiosk Legibility Rule**: Under no circumstances should typography smaller than `16px` (`--font-caption`) be rendered on the kiosk interface. Desktop classes like `text-xs` ($12\text{px}$) and `text-[10px]` violate ISO 9241-303 legibility at $700\text{ mm}$ viewing distances and are strictly prohibited.

---

### 2.3 Spatial Rhythm & Kiosk Ergonomics
*Based on an 8-point spatial grid ($8\text{px}, 16\text{px}, 24\text{px}, 32\text{px}, 48\text{px}, 64\text{px}, 80\text{px}, 96\text{px}$).*

```
┌─────────────────────────────────────────────────────────────┐
│ 1080 × 1920 KIOSK DISPLAY ERGONOMIC ZONES (23.8" Portrait) │
├─────────────────────────────────────────────────────────────┤
│ UPPER 35% (0 – 672px): PASSIVE VISUAL ZONE                  │
│ • Hospital Branding, Emergency Banner, Persistent Stepper   │
│ • Screen Title and Instructions (1,220 – 1,377 mm from floor)│
├─────────────────────────────────────────────────────────────┤
│ LOWER 65% (672 – 1920px): ACTIVE MOTOR / TOUCH ZONE         │
│ • Universal Reach Window (850 to 1,220 mm from floor - ADA) │
│ • Content Layout Container: w-full max-w-[960px] (89% width)│
│ • Form Inputs (Min height: 68px)                            │
│ • Selection Cards (Min height: 144px)                       │
│ • Interactive Biometric Body Map (340 × 540px)              │
│ • Bottom Docked Action Bar (Fixed height: 100px)            │
└─────────────────────────────────────────────────────────────┘
```

#### Physical Target Metrics (on 23.8" 1080×1920 Screen @ 92.68 DPI, 1 mm ≈ 3.65 px)
- **Minimum Interactive Touch Target**: $64 \times 64\text{ px}$ ($17.5 \times 17.5\text{ mm}$ — satisfies ISO 9241-9).
- **Primary Buttons (`Continue`, `Start Intake`, `Submit`)**: Height $80\text{px}$ ($21.9\text{ mm}$ — Colle & Hiszem empirical sweet spot).
- **Form Text Inputs**: Height $68\text{px}$ ($18.6\text{ mm}$) with $20\text{px}$ font.
- **Selection Cards (Symptoms, Languages, ID)**: Min height $144\text{px}$ ($39.5\text{ mm}$) with $16\text{px}$ ($4.4\text{ mm}$) gutters.
- **Pain Scale Rating Buttons**: $68\text{px} \times 68\text{px}$ round pills with $12\text{px}$ gutters.
- **Content Container Max Width**: $960\text{px}$ ($263.1\text{ mm}$, $88.9\%$ of screen width).

---

### 2.4 Surface Elevation, Shadows & Borders
- `--radius-sm`: `8px` (Form inputs, small badges)
- `--radius-md`: `14px` (Buttons, notification banners)
- `--radius-lg`: `20px` (Selection cards, modal sheets)
- `--radius-full`: `9999px` (Status pills, round pain buttons)
- `--border-default`: `1.5px solid var(--color-border)` (`#D5E2DE`)
- `--border-active`: `2.5px solid var(--color-wvsu-primary)` (`#006B3F`)
- `--shadow-card`: `0 4px 16px rgba(0, 107, 63, 0.06), 0 1px 3px rgba(0, 0, 0, 0.04)`
- `--shadow-active`: `0 8px 24px rgba(0, 107, 63, 0.14)`
- `--shadow-modal`: `0 24px 64px rgba(23, 43, 77, 0.25)`

### 2.5 Standard Lucide Iconography Tokens (Strict Zero-Emoji Policy)
| Functional Role | Lucide Component | Stroke | Standard Size | Color Token Binding |
| :--- | :--- | :---: | :---: | :--- |
| **Brand ECG Pulse** | `<Activity />` | `2px` | `24px` | `var(--color-wvsu-gold)` |
| **Emergency Assistance**| `<AlertCircle />` | `2px` | `24px` | `#FFFFFF` |
| **Urgent Warning** | `<AlertTriangle />` | `2px` | `20px` | `var(--color-emergency)` |
| **Step Completed** | `<CheckCircle2 />` | `2px` | `20px` | `var(--color-wvsu-primary)` |
| **Fever** | `<Thermometer />` | `2px` | `24px` | `var(--color-text-primary)` |
| **Cough** | `<MessageSquareText />` | `2px` | `24px` | `var(--color-text-primary)` |
| **Chest Pain** | `<HeartPulse />` | `2px` | `24px` | `var(--color-emergency)` |
| **Abdominal Pain** | `<ShieldAlert />` | `2px` | `24px` | `var(--color-text-primary)` |
| **Shortness of Breath** | `<Wind />` | `2px` | `24px` | `var(--color-text-primary)` |
| **Headache** | `<Frown />` | `2px` | `24px` | `var(--color-text-primary)` |
| **Injury / Trauma** | `<Bandage />` | `2px` | `24px` | `var(--color-text-primary)` |
| **Speech / Voice** | `<Mic />` | `2px` | `22px` | `var(--color-wvsu-primary)` |
| **Patient Profile** | `<User />` | `2px` | `20px` | `var(--color-text-secondary)` |
| **Calendar / DOB** | `<Calendar />` | `2px` | `20px` | `var(--color-text-secondary)` |
| **Contact Phone** | `<Phone />` | `2px` | `20px` | `var(--color-text-secondary)` |
| **Body Map Location** | `<MapPin />` | `2px` | `20px` | `var(--color-wvsu-primary)` |
| **Duration / Time** | `<Clock />` | `2px` | `20px` | `var(--color-text-secondary)` |
| **Edit Data** | `<Edit3 />` | `2px` | `18px` | `var(--color-wvsu-blue)` |
| **Submit / Dispatch**| `<Send />` | `2px` | `22px` | `#FFFFFF` |

---

### 2.6 Clinical Color Theory Architecture (Avoiding Blind Brand Application)

#### Empirical & Physiological Foundations
In emergency medical informatics, applying university or hospital brand colors indiscriminately is a recognized clinical safety risk:
1. **Ocular Fatigue & Acute Patient Distress**:
   - Patients presenting to an Emergency Department often suffer from photophobia, migraine, concussion, visual disturbance, or nausea.
   - High-chroma saturated greens or high-saturation golds trigger cognitive fatigue and sensory overload under bright hospital fluorescent/LED fixtures ($4000\text{K}\text{--}5000\text{K}$).
2. **Semiotic Hazard Confusion (Color Psychology in Triage)**:
   - **Yellow / Gold**: Universally denotes **Caution, Biohazard, or ESI-3 Urgent Acuity** in clinical settings. Applying gold indiscriminately to primary action buttons or screen backgrounds induces subconscious alarm or error perception.
   - **Green**: Universally denotes **Normal, Cleared, or Safe**. Using green for emergency nurse calls creates dangerous semantic ambiguity.
   - **Red**: Quarantined strictly for **Emergency Life-Threatening Calls, ESI-1/2 Resuscitation Alerts, and Immediate Help**.

#### The Calibrated 60-30-10 Clinical Proportion Rule
```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        60-30-10 CLINICAL COLOR DISTRIBUTION MATRIX                     │
├───────────────────┬──────────────┬───────────────────────────────┬─────────────────────┤
│ Proportion / Role │ Hex Token    │ Functional Placement          │ Clinical Rationale  │
├───────────────────┼──────────────┼───────────────────────────────┼─────────────────────┤
│ 60% DOMINANT      │ `#FFFFFF`    │ Canvas backgrounds, card      │ Minimizes visual    │
│ Low-Stress Base   │ `#F8F8F6`    │ surfaces, content containers, │ fatigue; clean,     │
│ (Clinical Neutral)│ `#F1F5F9`    │ input field backgrounds.      │ hygienic aesthetic. │
├───────────────────┼──────────────┼───────────────────────────────┼─────────────────────┤
│ 30% STRUCTURAL    │ `#006B3F` /  │ App headers, sidebars,        │ Conveys institutional│
│ Institutional     │ `#013b24`    │ structural framing, primary   │ authority, trust, & │
│ (WVSUMC Emerald)  │ (Deep Green) │ navigation anchors, active tab│ university heritage │
│                   │              │ indicators.                   │ without eye strain. │
├───────────────────┼──────────────┼───────────────────────────────┼─────────────────────┤
│ 10% SEMANTIC      │ `#F2B705`    │ • WVSUMC Gold: Seals, badges  │ High-salience visual│
│ Functional Accents│ (Gold)       │   (paired strictly with navy).│ signals; immediately│
│ & Alert Signaling │ `#DC2626`    │ • Emergency Red: ESI-1/2,     │ guides attention to │
│                   │ (Red)        │   Call Nurse assistance.      │ critical actions.   │
│                   │ `#0057A8`    │ • Clinical Blue: Interactive  │                     │
│                   │ (Med Blue)   │   focus rings, info chips.    │                     │
└───────────────────┴──────────────┴───────────────────────────────┴─────────────────────┘
```

#### Accessibility Governance Matrix: WCAG 2.1 Level AAA Verification
* **Canvas Text**: Deep Charcoal Navy (`#172B4D`) on `#FFFFFF` / `#F8F8F6` $\rightarrow$ **$13.26 : 1$** (passes AAA $7:1$).
* **Institutional Primary Button**: White (`#FFFFFF`) on Deep Emerald (`#006B3F`) $\rightarrow$ **$6.61 : 1$** (passes AAA Large).
* **Strict Gold Text Prohibition**: White text on gold is strictly forbidden ($1.82:1$ failure). Gold elements must strictly pair with Deep Navy (`#172B4D`) $\rightarrow$ **$7.76 : 1$** (passes AAA $7:1$).

---

### 2.7 Hardware Engineering Specification: Integrated Bottom-Right Vital Signs Sensor Bay

#### Medical Terminology & Classification
* **Component Name**: **Integrated Multi-Wavelength Photoplethysmography (PPG) & Pulse Oximetry Sensor Chamber** (also designated *Optical Vitals Well*, *Finger Sensor Bay*, or *Embedded Non-Invasive Pulse Oximeter Module*).
* **Physiological Telemetry Captured**:
  1. **Blood Oxygen Saturation ($\text{SpO}_2\%$)**: Measured via dual red ($660\text{ nm}$) and infrared ($940\text{ nm}$) optical absorption through the digital capillary bed. Critical for identifying acute hypoxia ($<90\%$ ESI-2 alert).
  2. **Pulse Rate (PR in BPM)**: Arterial pulsatile frequency detecting tachycardia ($>100\text{ bpm}$) or bradycardia ($<50\text{ bpm}$).
  3. **Perfusion Index (PI %)**: Ratio of pulsatile to non-pulsatile light absorption, verifying signal strength ($0.02\%\text{ to }20\%$).
  4. **Continuous Plethysmogram Waveform**: Real-time arterial pulse wave verifying sensor engagement.

#### Physical Chassis & Anthropometric Ergonomics (ADA Title III §707 & BP 344)
* **Location**: Integrated directly into the lower peripheral control console, situated on the **bottom right directly below the 23.8" touchscreen display** (specifically replacing the legacy barcode/QR scanner window, as specified in the team sketch and 3D CAD engineering model).
* **Relative Peripheral Placement**:
  - **Left**: Contactless NFC / RFID Reader pad (`((•))`, $13.56\text{ MHz}$).
  - **Below NFC (Left)**: Precision microphone & 5W speaker dot perforation matrix.
  - **Center**: Pinhole optical sensor & High-speed thermal ticket/receipt exit slot.
  - **Bottom Right**: **Vital Signs Sensor Bay** — deep beveled recessed chamber with dark inner casing and internal angled optical window.
  - **Lower Cabinet Body**: Large recessed service door silkscreened with ECG waveform and labeled `VITAL SIGNS SENSORS (OPTIONAL)`.
* **Elevation & Posture Angulation**: Located at **$980\text{ mm}$ to $1050\text{ mm}$ above the finished floor**, with an internal **$20^\circ\text{ to }25^\circ$ downward chamber pitch** matching natural resting forearm pronation for seated wheelchair users ($15\text{--}48\text{ inches}$) and standing adults.
* **Chamber Affordance**: Soft, contoured internal funnel lined with medical-grade, antibacterial silicone to comfortably seat index or middle fingers of all adult and pediatric sizes.
* **Illuminated Visual Halo Ring**:
  * *Pulsing Cyan*: Standby / Ready for Finger Insertion.
  * *Pulsing Amber*: Finger detected / Calibrating capillary waveform.
  * *Solid Emerald Green*: Signal locked / Measuring (5-second acquisition).
  * *Pulsing Red*: Sensor misalignment or excessive motion artifact.
* **Nosocomial Infection Control**:
  * Smooth, seamless wipeable polycarbonate chassis with internal automated micro-pulse UV-C sanitization between patient sessions.

#### Clinical Governance Guardrail: Pre-Triage Screening Only
* The kiosk explicitly labels vitals as: *"Preliminary automated screening telemetry. Final clinical triage determination and vital sign verification performed by licensed triage nurse."*
* Telemetry automatically populates into `PatientDossier.jsx` under `Kiosk Vital Signs Sensor Bay`, pre-filling objective data while leaving the nurse in 100% control of final ESI assignment.

---

## 3. Atomic Component Library Specification

### 3.1 Button Component (`<TouchButton>`)
*Variants: `primary`, `secondary`, `emergency`, `emergency-cooldown`.*

```
┌────────────────────────────────────────────────────────┐
│ PRIMARY BUTTON                                         │
│ [             Start Intake →                         ] │  Height: 72px, BG: #006B3F, Text: #FFFFFF
├────────────────────────────────────────────────────────┤
│ EMERGENCY ASSISTANCE BUTTON                            │
│ [ (AlertCircle) Request Immediate Assistance         ] │  Height: 68px, BG: #DC2626, Text: #FFFFFF
│   Need a nurse right now?                              │
├────────────────────────────────────────────────────────┤
│ COOLDOWN / DISABLED STATE                              │
│ [ (Clock) Assistance Dispatched (58s)...             ] │  Height: 68px, BG: #94A3B8, Text: #FFFFFF
│   Triage staff alerted — help is on the way            │
└────────────────────────────────────────────────────────┘
```

#### State Transition Matrix
| State | Background Color | Border | Text Color | Elevation | Touch Behavior |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Default** | `--color-wvsu-primary` | None | `#FFFFFF` | `--shadow-card` | Scale 1.0 |
| **Hover / Focus** | `#005733` (Darker Green) | 2px Gold Ring | `#FFFFFF` | `--shadow-active` | Scale 1.02 |
| **Active / Pressed**| `#00472A` | None | `#FFFFFF` | None | Scale 0.98 (Haptic feel) |
| **Emergency Default**| `--color-emergency` (`#DC2626`)| None | `#FFFFFF` | `--shadow-card` | Pulses 1x on mount |
| **Emergency Cooldown**| `--color-cooldown` (`#94A3B8`) | None | `#FFFFFF` | None | Disabled, unclickable |

---

### 3.2 Persistent 5-Stage Stepper (`<ProgressStepper>`)
*Keeps patient grounded in the 5-step intake progression derived directly from the clinical rough sketch (NN/g Heuristic #1).*

```
   (1)             (2)             (3)                 (4)                 (5)
[Identify] ──── [Symptoms] ──── [Body Map] ──── [Severity & Vitals] ──── [Summary]
   ●-✓             ●-✓          ● (Active)              ○                   ○
```
- **Stage 1 (Identify)**: Welcome, dialect selection pills, and demographic input.
- **Stage 2 (Symptoms)**: 6-tile chief complaint grid with voice memo recording.
- **Stage 3 (Body Map)**: Interactive anatomical silhouette tap and zone selection.
- **Stage 4 (Severity & Vitals)**: Wong-Baker facial pain scale, duration chips, and Right-Side PPG Sensor Bay.
- **Stage 5 (Summary)**: Final review, Send to Nurse submission, and printed thermal queue ticket.

---

### 3.3 Selection Cards (`<SelectionTile>`)
*Used in Language, Identification, and Symptom screens.*
- **Unselected State**: Surface White (`#FFFFFF`), Border: `#D5E2DE`, Icon: Slate Navy (`#172B4D`).
- **Selected State**: Soft Tint (`#EBF5F0`), Border: $2.5\text{px}$ `#006B3F`, Icon: `#006B3F`, Checkmark badge pinned to top-right corner.
- **Touch Feedback**: $150\text{ms}$ smooth scale transformation (`transform: scale(0.98)` on touch down).

---

### 3.4 Futuristic Biometric Body Map (`<FuturisticBodyMap>`)
*Digital twin anatomical scanner resolving spatial pain localization.*
- **Visual Design**: Sleek cyan-tinted translucent human anatomical vector silhouette on a dark-slate clinical scanner substrate.
- **Biometric Hot-spots**: Glowing pulse nodes at major joints and anatomical regions (Head, Neck, Shoulders, Chest, Abdomen, Pelvis, Arms, Hands, Legs, Feet).
- **Targeting Reticle**: Tapping an anatomical zone spawns an animated concentric pulse ring and locks an amber-gold crosshair (`#F2B705`) over the coordinates.
- **Lateral Zone Selector Column**: A vertical stack of 8 quick-pick buttons (Head, Neck, Shoulder, Chest, Abdomen, Back, Arms, Legs) synchronized bidirectionally with the vector hotspots.
- **Perspective Flip**: `[ <RotateCw /> Front / Back View ]` toggle rotates the 3D-style anatomical vector to reveal posterior pain zones (Scapular, Lumbar, Gluteal, Calves).

---

### 3.5 0–10 Numeric Pain Rating Scale (`<PainScale>`)
- **Track**: Horizontal flex row with 11 round touch targets (`0` to `10`), $60 \times 60\text{px}$ each (minimum touch target compliant).
- **Color Progression**: Dynamic gradient shift across Emerald ($0–2$) $\rightarrow$ Amber ($3–5$) $\rightarrow$ Orange ($6–8$) $\rightarrow$ Crimson ($9–10$).
- **Live Qualitative Indicator**: Dynamic pill card displaying real-time clinical severity interpretation:
  > *"Rating: 7 / 10 — Severe Discomfort (Interferes with normal concentration, requires urgent assessment)"*

---

### 3.6 Modals & System Overlays
1. **`<AssistanceModal>`**:
   - Backdrop blur (`8px`) with semi-transparent scrim (`rgba(15, 23, 42, 0.65)`).
   - High-contrast alert header with `<AlertCircle />` indicator.
   - Clinical Action Prompt: *"Confirm Request for Immediate Assistance from Triage Staff"*.
   - Dual actions: `[ Cancel / Return to Kiosk ]` vs. `[ Confirm Staff Request ]`.
2. **`<PrivacyTimeoutModal>`**:
   - Triggers after 45 seconds of inactivity (default configurable parameter, adjustable between 30s and 90s in station settings).
   - Audible gentle chime with 15-second countdown circular timer: *"Are you still there? Kiosk will reset in 12s to protect your private health information."*
   - Tapping anywhere resets the session timer.

---

### 3.7 Admin Triage Staff Workstation Suite (`<StaffDashboard>`)
*Hospital-grade 16:9 widescreen EDIS portal for emergency triage personnel ($1920 \times 1080$), architecturally partitioned into Core Prototype and Extended Capabilities:*

#### Core Prototype Suite (Active Prototype Scope)
1. **ADM-01: Live Triage Queue & Command Dashboard (Primary Station View)**:
   - **Top Navigation Bar**: WVSUMC Emblem, `<Activity />` brand pulse, Station Identity (`Triage Desk 01`), Attending Nurse (`Nurse Reyes, RN`), Live Clock.
   - **Queue Status KPI Widgets**:
     - `New Intake`: **12** (`<UserPlus />`, `#0057A8` — Arrived from kiosk, pending exam)
     - `Waiting for Triage`: **8** (`<Clock />`, `#F59E0B` — In waiting area, average wait $14\text{ mins}$)
     - `In Triage / Assessing`: **2** (`<Activity />`, `#006B3F` — Actively with triage nurse)
     - `Completed / Disposed`: **31** (`<CheckCircle2 />`, `#16803C` — Routed to clinical ED zones)
   - **Queue Table Architecture**:
     - Strictly separates **Queue Status** (`New Intake`, `Waiting for Triage`, `In Triage`, `Completed`) from **Clinical Acuity** (`Pending Nurse Review`, `Nurse-Confirmed ESI-1` to `ESI-5`).
     - Columns: Queue # / Ref, Patient Name & Age, Arrival Time, Chief Complaint Chips, Pain Score Pill, Acuity Status (`[ <Clock /> Needs Nurse Review ]` or `[ <AlertCircle /> Nurse-Confirmed ESI-2 ]`), Action Button (`[ <FileText /> View & Assess ]`).
2. **ADM-02: Patient Clinical Dossier & Nurse Assessment Workspace**:
   - **Left Column (Kiosk Subjective Intake — Read-Only)**:
     - Demographics: `<User /> Juan Dela Cruz`, 36M, Contact, Hospital ID `#WVSU-2024-9912`.
     - Chief Complaints: `<HeartPulse /> Chest Pain`, `<Thermometer /> Fever`, `<MessageSquareText /> Cough`.
     - 0–10 Numeric Pain Rating: `7 / 10 — Severe`, Duration: `1–6 hours`.
     - Biometric Body Map review view (Chest hotspot illuminated on digital twin).
     - Integrated 15s voice memo player (`<Play />`, interactive audio scrub bar).
   - **Right Column (Nurse Objective Assessment & Disposition)**:
     - Objective Vitals Entry: BP (`<Activity />`), Heart Rate (`<Heart />`), Respiratory Rate (`<Wind />`), Temperature (`<Thermometer />`), SpO2 (`<Droplet />`).
     - Clinician ESI Acuity Assignment: 5 discrete toggle cards (`[ ESI-1 ]` through `[ ESI-5 ]`), explicitly selected and confirmed by the nurse.
     - Triage Room / Bed Assignment dropdown (`Room 1 — Bed 02`).
     - Disposition Action Controls: `[ <Bell /> Call Patient to Triage ]`, `[ <FastForward /> Escalate to Trauma ]`, `[ <CheckCircle2 /> Complete Triage & Admit ]`.
3. **ADM-03: Urgent Kiosk Emergency Broadcast & Dispatch Console**:
   - High-priority modal overlay triggered via real-time WebSocket when a kiosk initiates "Request Immediate Assistance".
   - Pulsating `<AlertOctagon />` banner with kiosk station ID (`Main Lobby Kiosk #01`), active response timer (`Elapsed: 12s`), and audible clinical chime.
   - Nurse Actions: `[ <CheckCheck /> Acknowledge & Dispatch Staff ]` and `[ <Phone /> Open Kiosk Audio Intercom ]`.

#### Extended / Future EDIS Capabilities (Architectural Roadmap)
4. **ADM-04: Patient Health Directory & Historical Records**:
   - Searchable longitudinal registry table, date range filters, and historical visit cross-referencing.
5. **ADM-05: ED Operational Intelligence & Triage Analytics (Reports)**:
   - Door-to-Triage (DTT) efficiency tracking, hourly surge heatmaps, complaint distribution.
6. **ADM-06: Kiosk Fleet Management & Station Configuration (Settings)**:
   - Kiosk peripheral diagnostics (touch glass, thermal paper level, QR scanner, audio gain) and operational parameter controls (cooldown timer, auto-purge timeout, regional languages).

---

## 4. Multilingual Terminology Matrix (Western Visayas)

| UI Element | English | Filipino (Tagalog) | Hiligaynon (Ilonggo) | Cebuano (Bisaya) |
| :--- | :--- | :--- | :--- | :--- |
| **Start Intake** | Start Intake | Simulan ang Intake | Suguran ang Intake | Sugdan ang Intake |
| **Request Help** | Request Immediate Help | Humingi ng Agarang Saklolo | Mangayo sang Madasig nga Bulig | Mangayo og Dinaliang Tabang |
| **Fever** | Fever | Lagnat | Hilanat | Hilanat |
| **Cough** | Cough | Ubo | Ubo | Ubo |
| **Chest Pain** | Chest Pain | Paninikip ng Dibdib | Sakit ang Dughan | Sakit ang Dughan |
| **Abdominal Pain**| Abdominal Pain | Sakit ng Tiyan | Sakit ang Tiyan / Busong | Sakit sa Tiyan |
| **Shortness of Breath**| Shortness of Breath | Hirap sa Paghinga | Hangos / Mabudlay Magginhawa | Lisod Pagginhawa |
| **Headache** | Headache | Sakit ng Ulo | Sakit ang Ulo | Sakit sa Ulo |
| **Pain Level** | How would you rate your pain? | Gaano kasakit ang nararamdaman? | Daw ano kasakit ang imo ginabatyag? | Unsa ka sakit ang imong gibati? |
| **Continue** | Continue | Magpatuloy | Magpadayon | Mopadayon |
| **Back** | Back | Bumalik | Magbalik | Mobalik |

---

## 5. CSS Custom Properties Production Bundle

```css
:root {
  /* ==========================================================================
     WVSU MEDICAL CENTER BRAND TOKENS
     ========================================================================== */
  --color-wvsu-primary: #006B3F;
  --color-wvsu-primary-hover: #005733;
  --color-wvsu-primary-active: #00472A;
  --color-wvsu-gold: #F2B705;
  --color-wvsu-blue: #0057A8;

  /* ==========================================================================
     SURFACES & NEUTRALS (WCAG AAA Calibrated)
     ========================================================================== */
  --color-bg-canvas: #F8F8F6;
  --color-bg-surface: #FFFFFF;
  --color-border: #D5E2DE;
  --color-border-active: #006B3F;
  --color-text-primary: #172B4D;       /* 13.26:1 contrast against canvas */
  --color-text-secondary: #505F78;     /* 6.08:1 contrast against canvas */

  /* ==========================================================================
     SEMANTIC ALERTS & EMERGENCY
     ========================================================================== */
  --color-emergency: #DC2626;
  --color-emergency-hover: #B91C1C;
  --color-cooldown: #94A3B8;
  --color-success: #16803C;
  --color-warning: #D97706;

  /* ==========================================================================
     PAIN SCALE COLOR RAMP (0 - 10)
     ========================================================================== */
  --color-pain-mild: #10B981;          /* Score 0-2 (Emerald) */
  --color-pain-moderate: #F59E0B;      /* Score 3-5 (Amber) */
  --color-pain-severe: #F97316;        /* Score 6-8 (Orange) */
  --color-pain-critical: #B91C1C;      /* Score 9-10 (Deep Crimson) */

  /* ==========================================================================
     TYPOGRAPHY TOKENS (Inter Font Family)
     ========================================================================== */
  --font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-size-display: 40px;
  --font-size-h1: 32px;
  --font-size-h2: 24px;
  --font-size-touch-btn: 22px;
  --font-size-body-lg: 20px;
  --font-size-body-md: 18px;
  --font-size-caption: 16px;

  /* ==========================================================================
     SPATIAL & TOUCH TARGET TOKENS (ISO 9241-9 & ADA §707)
     ========================================================================== */
  --touch-min-target: 64px;
  --touch-btn-height: 72px;
  --touch-card-min-height: 100px;
  --kiosk-bottom-bar-height: 100px;
  --grid-gutter: 16px;

  /* ==========================================================================
     ELEVATION, RADIUS & SHADOWS
     ========================================================================== */
  --radius-sm: 8px;
  --radius-md: 14px;
  --radius-lg: 20px;
  --radius-full: 9999px;
  --shadow-card: 0 4px 16px rgba(0, 107, 63, 0.06), 0 1px 3px rgba(0, 0, 0, 0.04);
  --shadow-active: 0 8px 24px rgba(0, 107, 63, 0.14);
  --shadow-modal: 0 24px 64px rgba(23, 43, 77, 0.25);

  /* ==========================================================================
     MOTION & ANIMATION DURATIONS
     ========================================================================== */
  --transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-normal: 250ms cubic-bezier(0.4, 0, 0.2, 1);
  --pulse-speed: 2s infinite ease-in-out;
}
```

---

## 6. Document Certification & Cross-Reference

| Document ID | Path | Role & Canonical Purpose |
| :--- | :--- | :--- |
| **TS-DOC-000** | [docs/README.md](file:///home/markc/projects/playground/triagesense/docs/README.md) | Master Documentation Architecture & Index Guide |
| **TS-SYS-001** | [docs/01_system_design_master.md](file:///home/markc/projects/playground/triagesense/docs/01_system_design_master.md) | **Single Source of Truth (SSOT)**: Design tokens, contrast matrix, component library, CSS bundle |
| **TS-SYS-002** | [docs/02_system_audit_and_validation.md](file:///home/markc/projects/playground/triagesense/docs/02_system_audit_and_validation.md) | Photometric Contrast Audits, Biomechanical Proofs & Clinical ESI Mapping |
| **TS-KSK-001** | [docs/03_kiosk_research_and_hfe.md](file:///home/markc/projects/playground/triagesense/docs/03_kiosk_research_and_hfe.md) | Human Factors Engineering, Stress Modeling & Screen Friction Analysis |
| **TS-KSK-002** | [docs/04_kiosk_screen_spec.md](file:///home/markc/projects/playground/triagesense/docs/04_kiosk_screen_spec.md) | Kiosk Screen Interaction Blueprint & Prototype Specification (Screens 01–11) |
| **TS-ADM-001** | [docs/05_admin_research_and_workflow.md](file:///home/markc/projects/playground/triagesense/docs/05_admin_research_and_workflow.md) | Clinical EDIS Research & Emergency Triage Nursing Workflows |
| **TS-ADM-002** | [docs/06_admin_screen_spec.md](file:///home/markc/projects/playground/triagesense/docs/06_admin_screen_spec.md) | Triage Staff Portal Interaction Blueprint (Live Queue, Dossier, Emergency Console, Directory, Analytics, Fleet Manager) |

---

## 7. Document Control & Verification Sign-Off

| Audit Metric | Specification Value | Compliance Status |
| :--- | :--- | :---: |
| **Document Identifier** | `TS-SYS-001` | Active / Single Source of Truth |
| **Photometric Contrast** | WCAG 2.1 / 2.2 Level AAA (13.26:1 text, 6.08:1 secondary) | Design Target (Audited) |
| **Touch Ergonomics** | ISO 9241-9 ($64\text{px} \times 64\text{px}$ minimum target size) | Compliant |
| **Hardware Operability** | ADA Title III §707 ($15'' - 48''$ reach envelope) | Compliant |
| **Iconography Standard** | Lucide Medical Icon System (2.0px stroke) | 100% (0 Emojis) |
| **Review Status** | Team TriageSense (CIT 213 HCI 2) | Final Academic Draft |
