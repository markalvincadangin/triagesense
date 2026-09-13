# WVSU Medical Center — TriageSense Kiosk Ergonomic Audit & Research
## Mechanical Grounding, Photometric Acuity, and Touch Interface Validation
**Document Identifier**: `TS-SYS-007` | **Version**: `1.0.0 (Engineering & Ergonomic Audit)`  
**Course**: CIT 213: Human Computer Interaction 2 | **Prototype**: Freestanding Medical Triage Kiosk  
**Institution**: West Visayas State University Medical Center (WVSUMC), Iloilo City  
**Hardware Specification Reference**: Product / Mechanical Specification (Prototype Version, Sept 2026)  
**Classification**: Physical Anthropometry, Biomechanical Audit, and Touchscreen Sizing Standards  

---

## 1. Physical Kiosk Hardware Specification Grounding

Based on the official CAD engineering drawings and mechanical blueprint:

| Engineering Dimension | Metric Specification | Imperial Equivalent | Ergonomic Significance |
| :--- | :---: | :---: | :--- |
| **Total Enclosure Height** | $1,780\text{ mm}$ | $70.1\text{ in}$ | Top camera capsule aligns with standing adult eye level ($1,500\text{–}1,700\text{ mm}$). |
| **Total Enclosure Width** | $600\text{ mm}$ | $23.6\text{ in}$ | Accommodates standard hospital corridor and triage ingress clearances. |
| **Base Footprint** | $600 \times 380\text{ mm}$ | $23.6 \times 15.0\text{ in}$ | High-stability anti-tip steel base plate with leveling rubber feet. |
| **Display Form Factor** | $23.8\text{ inches}$ (16:9) | $604.5\text{ mm}$ diag | Portrait orientation for document/intake flow. |
| **Active Screen Width** | **$296\text{ mm}$** | **$11.65\text{ in}$** | Native resolution: **$1080\text{ pixels}$**. |
| **Active Screen Height** | **$527\text{ mm}$** | **$20.75\text{ in}$** | Native resolution: **$1920\text{ pixels}$**. |
| **Screen Elevation from Floor** | **$850\text{ mm to }1,377\text{ mm}$** | **$33.5\text{ to }54.2\text{ in}$** | Lower 70% resides within ADA §707 wheelchair reach zone ($380\text{–}1,220\text{ mm}$). |

### 1.1 Exact Pixel-to-Physical Metric Conversion

$$\text{Horizontal Density} = \frac{1080\text{ px}}{296\text{ mm}} \approx \mathbf{3.6486\text{ px/mm}} \implies \mathbf{1\text{ mm} \approx 3.65\text{ px}} \quad (\mathbf{1\text{ px} \approx 0.274\text{ mm}})$$

$$\text{Vertical Density} = \frac{1920\text{ px}}{527\text{ mm}} \approx \mathbf{3.6433\text{ px/mm}} \implies \text{Pixel Density} = \mathbf{92.68\text{ DPI}}$$

---

## 2. Visual Acuity & Typography Audit (ISO 9241-303 & ANSI/HFS 100)

### 2.1 Viewing Distance and Visual Angle Formula
Public standing kiosks operate at a nominal viewing distance of **$D = 700\text{ mm}$ ($27.6\text{ inches}$)** (range: $600\text{–}900\text{ mm}$), compared to $400\text{–}500\text{ mm}$ for desktop monitors and $300\text{–}350\text{ mm}$ for smartphones.

Per **ISO 9241-303 (Electronic visual display requirements)**:
$$\text{Visual Angle } \theta \text{ (arcminutes)} = \arctan\left(\frac{h}{D}\right) \times \frac{180}{\pi} \times 60 \approx \frac{h}{D} \times 3437.75$$
where $h$ is character height in millimeters and $D$ is viewing distance ($700\text{ mm}$).

### 2.2 Empirical Legibility Audit of Current Codebase

| Token / Class | Pixel Size | Physical Height ($h$) | Visual Angle ($\theta$) at $700\text{ mm}$ | ISO 9241-303 Compliance | Audit Status & Clinical Risk |
| :--- | :---: | :---: | :---: | :---: | :--- |
| **`text-[10px]`** | $10\text{ px}$ | $2.74\text{ mm}$ (x-ht $\approx 1.8\text{ mm}$) | $8.8\text{ arcmin}$ | **CRITICAL FAIL** | Invisible to patients with presbyopia or fever. |
| **`text-[11px]`** | $11\text{ px}$ | $3.01\text{ mm}$ (x-ht $\approx 2.0\text{ mm}$) | $9.8\text{ arcmin}$ | **CRITICAL FAIL** | Subtext on Symptom cards unreadable while standing. |
| **`text-xs`** | $12\text{ px}$ | $3.29\text{ mm}$ (x-ht $\approx 2.1\text{ mm}$) | $10.3\text{ arcmin}$ | **FAIL** | Severe squinting required; causes intake abandonment. |
| **`text-sm`** | $14\text{ px}$ | $3.84\text{ mm}$ (x-ht $\approx 2.5\text{ mm}$) | $12.3\text{ arcmin}$ | **MARGINAL** | Only acceptable for non-critical fine print. |
| **`--font-caption`** | **$16\text{ px}$** | **$4.38\text{ mm}$** (x-ht $\approx 2.9\text{ mm}$) | **$14.2\text{ arcmin}$** | **PASS (Threshold)** | **Adopted as Absolute Strict Minimum Floor**. |
| **`--font-body-md`** | **$19\text{ px}$** | **$5.20\text{ mm}$** (x-ht $\approx 3.5\text{ mm}$) | **$17.2\text{ arcmin}$** | **PASS (Optimal)** | Standard body, field descriptions, and review values. |
| **`--font-body-lg`** | **$22\text{ px}$** | **$6.03\text{ mm}$** | **$19.9\text{ arcmin}$** | **PASS (Optimal)** | Inputs, selection titles, and primary prompt lines. |
| **`--font-touch-btn`**| **$24\text{ px}$** | **$6.57\text{ mm}$** | **$21.7\text{ arcmin}$** | **EXCELLENT** | Primary action buttons (`Continue`, `Submit`). |
| **`--font-heading-1`**| **$38\text{ px}$** | **$10.41\text{ mm}$** | **$34.4\text{ arcmin}$** | **COMMANDING** | Screen H1 Titles. |
| **`--font-display`**  | **$48\text{ px}$** | **$13.15\text{ mm}$** | **$43.5\text{ arcmin}$** | **COMMANDING** | Welcome Hero headline. |

---

## 3. Biomechanical Touch Ergonomics Audit (ISO 9241-9 & Fitts's Law)

### 3.1 Touch Target Dimensions on the 23.8" Screen
Empirical studies by **Colle & Hiszem (2004)** demonstrated that standing touch targets under $15\text{ mm}$ result in an exponential error surge ($4.8\times$). Target sizes between **$18\text{ mm}$ and $22\text{ mm}$** achieve maximum speed and near-zero error rates.

| Component Type | Current Code Dimension | Current Physical (mm) | Target Kiosk Standard | Target Physical (mm) | Ergonomic Benchmark |
| :--- | :---: | :---: | :---: | :---: | :--- |
| **Header Dialect Pills** | $28\text{ px}$ touch height | $7.7\text{ mm}$ | **$44\text{ px}$ height** | $12.1\text{ mm}$ | Compliant with secondary touch standard. |
| **Header Emergency Button**| $32\text{ px}$ height | $8.8\text{ mm}$ | **$48\text{ px}$ height** | $13.2\text{ mm}$ | Accessible emergency trigger. |
| **Stepper Node Circles** | $36 \times 36\text{ px}$ | $9.9 \times 9.9\text{ mm}$ | **$48 \times 48\text{ px}$** | $13.2 \times 13.2\text{ mm}$ | Prominent stage orientation marker. |
| **Text Input Fields** | $56\text{ px}$ height | $15.3\text{ mm}$ | **$68\text{ px}$ height** | $18.6\text{ mm}$ | Matches Colle & Hiszem empirical sweet spot. |
| **Gender / Choice Chips**| $56\text{ px}$ height | $15.3\text{ mm}$ | **$72\text{ px}$ height** | $19.7\text{ mm}$ | Effortless single-tap execution. |
| **Symptom Category Cards**| $124\text{ px}$ height | $34.0\text{ mm}$ | **$144\text{ px}$ height** | $39.5\text{ mm}$ | Allows entire palm/finger tap with tremors. |
| **Pain Rating Buttons** | $64 \times 64\text{ px}$ | $17.5 \times 17.5\text{ mm}$ | **$68 \times 68\text{ px}$** | $18.6 \times 18.6\text{ mm}$ | ISO 9241-9 & Fitts's Law compliant. |
| **Primary Action Buttons**| $56\text{–}64\text{ px}$ height | $15.3\text{–}17.5\text{ mm}$ | **$80\text{ px}$ height** | $21.9\text{ mm}$ | Unmissable tactile affordance. |
| **Review EDIT Buttons** | $24\text{ px}$ link (`size={13}`) | $6.6\text{ mm}$ (FAIL) | **$42\text{ px}$ button** | $11.5\text{ mm}$ | High-contrast tactile touch chip. |

---

## 4. Horizontal Canvas Utilization & Layout Geometry

### 4.1 The Horizontal Dead Space Problem
* **Active Screen Width**: $296\text{ mm}$ ($1080\text{ px}$).
* **Current Layout Containers**:
  * `max-w-2xl` ($672\text{ px}$): Spanned only $184.2\text{ mm}$ ($62.2\%$ of display), leaving **$111.8\text{ mm}$ ($4.4\text{ inches}$) of dead space**.
  * `max-w-3xl` ($768\text{ px}$): Spanned only $210.5\text{ mm}$ ($71.1\%$ of display), leaving **$85.5\text{ mm}$ ($3.4\text{ inches}$) of dead space**.
* **Audit Finding**: The kiosk felt like a desktop web page artificially floating inside an oversized portrait box.

### 4.2 Standardized Kiosk Layout Container
$$\text{Standard Container} = \mathbf{w\text{-full max-w-[960px]}} \implies \mathbf{263.1\text{ mm}}$$
* **Horizontal Coverage**: **$88.9\%$** of active display width.
* **Side Gutters**: **$16.4\text{ mm}$ ($60\text{ px}$)** on each side.
* **Ergonomic Effect**: Content fills the screen with visual stability while preserving bezel buffer margins against edge touch distortion.

---

## 5. Universal Reach & ADA Standards §707 Compliance

```
┌─────────────────────────────────────────────────────────────┐
│ 1,780 mm (70.1") - TOP OF KIOSK ENCLOSURE                   │
├─────────────────────────────────────────────────────────────┤
│ 1,500 – 1,700 mm: Standing Adult Eye Level                  │
│ • Camera & Microphone Array (1,380 – 1,780 mm)              │
├─────────────────────────────────────────────────────────────┤
│ 1,377 mm (54.2") - TOP OF 23.8" ACTIVE TOUCHSCREEN          │
│ • Hospital Branding, Persistent Stepper, Screen Titles      │
├─────────────────────────────────────────────────────────────┤
│ 1,220 mm (48.0") - ADA §707 MAXIMUM WHEELCHAIR REACH LINE   │
│ ═══════════════════════════════════════════════════════════ │
│ ACTIVE OPERABLE MOTOR ZONE (850 mm to 1,220 mm from floor)  │
│ • Form Inputs, Symptom Grid, Body Map Hotspots, Pain Chips   │
│ • Bottom Docked Navigation Bar (Back & Continue)            │
├─────────────────────────────────────────────────────────────┤
│ 850 mm (33.5") - BOTTOM OF 23.8" ACTIVE TOUCHSCREEN         │
├─────────────────────────────────────────────────────────────┤
│ SUB-SCREEN PERIPHERAL PANEL (490 – 850 mm)                  │
│ • NFC Tap Pad, Barcode Scanner, Speaker Grille              │
├─────────────────────────────────────────────────────────────┤
│ 70 – 490 mm: Modular Vital Signs Sensor Panel               │
│ 0 – 70 mm: Stabilizing Steel Base Platform (600 × 380 mm)   │
└─────────────────────────────────────────────────────────────┘
```

**Key Takeaway**: Primary navigation buttons (`Back`, `Continue`, `Submit`) must be anchored at the bottom edge of the display ($860\text{–}950\text{ mm}$ above finished floor). This ensures effortless reaching for wheelchair-seated patients and eliminates upper-arm fatigue ("Gorilla Arm") for standing patients.
