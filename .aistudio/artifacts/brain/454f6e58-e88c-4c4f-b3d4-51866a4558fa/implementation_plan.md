# AgroVision AI — Light Garden Redesign & Plain English Simplification

Transform AgroVision AI into a clean, bright, high-contrast light theme (**Soft Warm Cream and Sage Garden**), rewrite all scientific jargon into simple everyday English, and introduce leaf-validation so non-plant photos (like humans or objects) receive friendly guidance rather than false disease diagnoses.

---

### User Review & Critical Decisions

> [!IMPORTANT]
> The following directions have been confirmed and will guide the execution:
> - **Visual Theme**: Soft Warm Cream (`#fbf9f4`) and Sage Garden (`#eef4f0`) palette with crisp dark botanical green typography (`#13281c`) for maximum readability.
> - **Language & Tone**: All technical terminology (multispectral processing, convolutional layers, cellular layers) will be rewritten in friendly, plain everyday English with clear explanations of why leaves are scanned.
> - **Non-Leaf Validation**: When a photo without a plant leaf is uploaded, the AI will display a friendly notice asking for a tomato leaf instead of giving a false diagnosis.

---

### 1. Overview & Core Concept

- **What It Does**: A bright, easy-to-use web application where gardeners, students, and farmers can inspect tomato leaves in 3D, understand how plant diseases develop, and get instant, accurate sickness diagnoses from photos or live camera captures.
- **Target Audience**: School STEAM exhibition judges, students, home gardeners, and agricultural scouts who need clear, straightforward answers without confusing academic jargon.
- **Key Value**: Demystifies plant pathology with simple explanations, delightful 3D interactive visuals, and reliable image checking.

---

### 2. User Experience & Visual Design

#### Visual Identity & Light Theme ("Soft Warm Cream & Sage Garden")
- **Canvas (60%)**: Warm soft cream background (`#faf8f2` and `#f4f1e8`) providing a bright, natural, sunny greenhouse feeling.
- **Structural Surfaces (30%)**: Pure white cards (`#ffffff`) and soft tinted sage containers (`#edf5ef` / `#e2ece5`) with subtle hairline botanical borders (`#d2e2d6`).
- **Typography & Text (High Contrast)**:
  - Headings: Deep forest evergreen (`#0d2317`) in `Outfit`.
  - Body copy: Clear charcoal-forest (`#1f3528`) in `Plus Jakarta Sans` for effortless readability (WCAG AA compliant, > 7:1 contrast ratio).
- **Accents (10%)**: Fresh leaf green (`#16a34a`), ripe tomato red (`#dc2626`), and soft sun amber (`#d97706`) for action buttons and status indicators.

#### 3D Plant & Leaf Lighting Adjustments
- Re-tune Three.js scene fog to match `#faf8f2` and calibrate the studio environment lights (`RoomEnvironment`) so the 3D tomato plant, stem, fruits, and leaves look vibrant, lifelike, and clearly defined against the light backdrop.
- Ensure the 3D leaf scanner's laser beam (532nm emerald) stands out crisply on the light background with distinct contrast.

#### Simple English Section Rewrites
1. **Hero**:
   - Headline: *Smarter Detection. Healthier Plants.*
   - Subtitle: *A simple, smart way to keep your tomato plants healthy. AgroVision AI checks leaf photos to spot plant sickness before it spreads.*
2. **"Why Check Leaves?" (Replacing Problem & Impact)**:
   - Clear analogy: *"Just like humans get a cough or fever when sick, tomato plants show warning signs on their leaves first. Catching leaf spots within 48 hours lets gardeners heal the plant naturally without heavy chemical sprays."*
3. **"Look Inside a Tomato Leaf" (Replacing Cellular Anatomy)**:
   - *Outer Skin (Cuticle)*: Like sunscreen and an umbrella for the leaf.
   - *Food Factory (Mesophyll)*: Where sunlight turns into food for the tomato.
   - *Water Pipes (Veins)*: Straws carrying water and nutrients up the plant.
   - *Breathing Pores (Stomata)*: Tiny mouths where the leaf breathes fresh air.
4. **"How the Computer Vision Works" (Replacing Neural Pipeline)**:
   - *Step 1: Check Leaf Colors* (Looking for healthy greens, pale yellows, and dark spots).
   - *Step 2: Find Spots and Rings* (Detecting target-shaped patches and borders).
   - *Step 3: Measure the Damage* (Counting how much of the leaf is affected).
   - *Step 4: Give the Treatment Plan* (Sharing easy steps to heal the plant).

---

### 3. Key Product Decisions & Non-Leaf Detection

```
┌─────────────────────────────────────────────────────────────┐
│                   IMAGE INPUT PIPELINE                      │
│      [ Upload Photo ]   [ Live Camera ]   [ Test Samples ]  │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
               ┌───────────────────────────────┐
               │  IS THIS A TOMATO / PLANT?    │
               │  Checks green/leaf ratio &    │
               │  plant pixel characteristics  │
               └───────┬───────────────┬───────┘
                       │               │
             [NO: Human / Object]      [YES: Plant Leaf]
                       │               │
                       ▼               ▼
          ┌────────────────────────┐  ┌─────────────────────────┐
          │ FRIENDLY NOTICE MODAL  │  │ RUN PLANT VISION MODEL  │
          │ "Oops! This looks like │  │ 1. Scan color & lesions │
          │  a person or object.   │  │ 2. Map sick spots       │
          │  Please upload a photo │  │ 3. Give plain remedy    │
          │  of a tomato leaf!"    │  │    (organic + care)     │
          │ [Try a Sample Leaf →]  │  └─────────────────────────┘
          └────────────────────────┘
```

#### Non-Leaf Image Validation
- **Problem**: When a user mistakenly uploads a selfie or photo of an object, the classifier previously attempted to guess a disease like Early Blight.
- **Solution**: The pixel pre-filter checks whether the image contains characteristic plant foliage patterns (chlorophyll hue ranges, leaf texture density, and plant pixel ratios). If the photo is non-plant (human face, room, vehicle, pet), the app displays a warm, friendly card:
  - *"We couldn't find a plant leaf in this photo! 😊 It looks like a photo of a person or object. Please upload or snap a photo of a tomato leaf so we can diagnose it."*
  - Includes a prominent 1-click button: *"Try One of Our Tomato Leaf Samples"* to test the system immediately.

---

### 4. Technical Architecture & Modifications

```
┌────────────────────────────────────────────────────────────────────────────┐
│                              AgroVision AI                                 │
│                   Theme: Soft Warm Cream & Sage Garden                     │
├────────────────────────────────────────────────────────────────────────────┤
│ 1. Top Navigation Bar (Logo, Simple Links, Light Theme)                    │
│ 2. Hero Section (Vibrant 3D Tomato Plant on Light Canvas, Plain English)   │
│ 3. "Why Leaves Matter" (Simple explanations of plant sickness & 48h cure)  │
│ 4. "Inside the Leaf" (3D Leaf Model, 4 simple tissue layers, laser beam)   │
│ 5. AI Diagnostic Studio (Photo upload, camera, sample leaf testbench)       │
│    ├── Image Validation: Leaf vs. Non-Leaf filter                          │
│    └── Plain English Report: Disease Name, What Happened, How to Fix It    │
│ 6. "How the AI Sees" (4 simple steps: Colors → Spots → Size → Care)        │
│ 7. Tomato Plant Care Library (10 conditions with simple care tips)         │
│ 8. School STEAM Exhibition Guide (Simple talking points & demo guide)      │
│ 9. Clean Footer                                                            │
└────────────────────────────────────────────────────────────────────────────┘
```

#### Proposed Component Updates:
1. `index.html` & `src/index.css`: Switch global background to warm cream (`#faf8f2`), remove `.dark` root enforcement, update Tailwind color tokens to warm garden tones.
2. `src/services/diseaseClassifier.ts`: Add `isPlantLeafImage()` heuristic checking color distribution and plant spectral presence; return friendly non-leaf validation state when non-plant imagery is submitted.
3. `src/components/3d/HeroPlantCanvas.tsx`: Update lighting, background fog (`#faf8f2`), and shadow opacity for clear visibility on bright cream background; streamline bottom dock controls to be intuitive and clean.
4. `src/components/3d/LeafScannerCanvas.tsx`: Update 3D leaf lighting, fog, and materials to look striking on a soft cream background.
5. `src/components/Navbar.tsx`: Light theme styling with crisp dark forest text, clean borders, and accessible active states.
6. `src/components/Hero.tsx`: Light theme layout, simplified headline, friendly supporting text, and high-contrast call-to-action buttons.
7. `src/components/AgriculturalImpact.tsx`: Rebrand as "Why Leaf Health Matters", rewrite in simple plain English with relatable analogies.
8. `src/components/LeafAnatomySection.tsx`: Rebrand as "Look Inside a Leaf", simplify tissue layers into easy plant analogies.
9. `src/components/DiagnosticStudio.tsx`: Add the friendly non-leaf warning screen, light theme styling, and easy-to-read prescription report.
10. `src/components/NeuralPipelineSection.tsx`: Rewrite 4-step pipeline in everyday plain English (Colors, Spots, Size, Remedy).
11. `src/components/DiseaseLibrary.tsx`: Light theme card layouts, simple symptom descriptions, and easy care tips.
12. `src/components/ExhibitionHub.tsx`: Light theme presenter card with straightforward talking points for school judges.
