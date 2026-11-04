# AgroVision AI: Bilingual English/Urdu, 3D Tomato Focus & Video Guide

A refined update to AgroVision AI introducing full bilingual localization (English & Urdu with RTL support), an interactive 3D tomato plant with click-to-zoom on fruit and 360° orbit inspection, a subtle 'Success' analysis toast, a dedicated video tutorial modal featuring the field demo video, and an updated layout celebrating Pakistan's agricultural backbone.

## User Review & Critical Decisions

> [!IMPORTANT]
> The following directions were confirmed during interactive clarification and user guidance:
> - **Video Placement**: Dedicated video guide modal and quick-start card prominently accessible from both the Hero section and Diagnostic Studio.
> - **Bilingual Typography**: Clean modern Noto Sans Arabic / Urdu typography with seamless `dir="rtl"` transition and animated iOS-style pill toggle.
> - **3D Interaction**: Direct click on the tomatoes triggers a smooth cinematic zoom close-up with 360° drag rotation and a 1-click reset view.
> - **Exhibition & Q&A Cleanup**: Replaced judge/rubric wording with practical, accessible "Questions / Q&A" (اکثر پوچھے گئے سوالات) and hidden presenter guides for a clean, human project feel.

---

## 1. Overview & Core Concept

- **What It Does**: AgroVision AI is an interactive plant health platform that analyzes tomato leaves for diseases (such as Early Blight, Late Blight, Bacterial Spot, and Yellow Leaf Curl), explains internal leaf biology, and provides clear care steps in both English and Urdu.
- **Target Audience / Persona**: Farmers, gardening enthusiasts, and young researchers across Pakistan and global communities seeking rapid, understandable botanical diagnosis.
- **Key Value**: Democratizes plant pathology with real-time AI leaf scanning, physical 3D plant examination, and native Urdu language accessibility.

---

## 2. User Experience & Visual Design

### Key User Flows
1. **Language Switching**: User clicks the animated `EN | اردو` switch in the navigation bar. The entire interface smoothly transitions layout direction (`ltr` vs `rtl`) with translated copy.
2. **3D Plant Inspection**: User sees the 3D tomato plant in the Hero section, drags to rotate 360°, and clicks directly on the ripe tomato fruit to trigger a camera glide right up to the fruit.
3. **Tutorial Video Walkthrough**: User clicks "Watch Tutorial / ویڈیو گائیڈ", opening a video modal playing `/public/assets/aistudio/tutorial-demo__2__9e77b096.mp4` showing the young explorer scanning a tomato leaf.
4. **Leaf Analysis & Success Toast**: User uploads an image, uses camera, or selects a sample. Upon completion, a subtle, dismissible **Success** toast notification glides in confirming diagnosis completion.
5. **Community Q&A & Pakistani Agricultural Tribute**: User navigates to the redesigned Q&A section and reads the tribute highlighting agriculture as Pakistan's economic backbone.

### Visual Identity & Theme
- **Color Palette**: Light Sage (#edf5ef, #e2ece5, #cbdcd0), Natural Forest Green (#13281c, #15803d), and Soft Warm Cream background (#faf8f2).
- **Typography**: Display headings in `Outfit`, readable body prose in `Plus Jakarta Sans`, and Urdu in `Noto Sans Arabic` with natural line heights and balanced text wrapping.
- **Motion & Micro-interactions**: Apple/iOS-inspired fluid spring animations (`cubic-bezier(0.16, 1, 0.3, 1)`), hover lift effects, and floating notification toast.

---

## 3. Key Product Decisions & Trade-Offs

- **Bilingual React Context**:
  - *Chosen Approach*: Centralized `LanguageContext` managing `language: 'en' | 'ur'` and `dir: 'ltr' | 'rtl'` with comprehensive translation dictionaries for all components.
  - *Why*: Allows instantaneous language switching with zero page reload and automatic DOM direction switching.
- **3D Tomato Interaction via Raycasting**:
  - *Chosen Approach*: Raycaster on the Three.js tomato meshes (`cluster1` & `cluster2`). Clicking a tomato triggers an interpolated camera glide to `(0.55, 1.25, 2.2)` focusing directly on the fruit.
  - *Why*: Immediate tactile feedback fulfilling the requirement to inspect fruit and leaf health closely.
- **Dedicated Video Guide Modal**:
  - *Chosen Approach*: Embed the provided video `/public/assets/aistudio/tutorial-demo__2__9e77b096.mp4` in a modal dialog with playback controls, plus an inline quick-start card next to the leaf scanner.
  - *Why*: Gives immediate visual context on how a student or farmer uses mobile scanning in the field.
- **Simplifying Exhibition / Rubrics into 'Questions' (Q&A)**:
  - *Chosen Approach*: Remove references to judges or rubrics; provide a friendly, educational Q&A section with Pakistani agricultural context.

---

## 4. Technical Architecture & Component Mapping

```
┌────────────────────────────────────────────────────────┐
│                   App.tsx (Root)                       │
│             LanguageProvider (en / ur)                 │
└──────────────────────────┬─────────────────────────────┘
                           │
  ┌────────────────────────┴──────────────────────────┐
  │                                                   │
┌─▼──────────────────┐                     ┌──────────▼──────────┐
│ Navbar.tsx         │                     │ Hero.tsx            │
│ • Links in EN/UR   │                     │ • Quick badges      │
│ • Animated Toggle  │                     │ • HeroPlantCanvas   │
└────────────────────┘                     │   - 3D Tomato Focus │
                                           │   - 360° Drag Orbit │
                                           └─────────────────────┘
  ┌───────────────────────────────────────────────────┐
  │                                                   │
┌─▼────────────────────────┐               ┌──────────▼──────────┐
│ DiagnosticStudio.tsx     │               │ VideoTutorialModal  │
│ • 3-Option Leaf Input    │               │ • MP4 Field Demo    │
│ • Success Toast Trigger  │               │ • Urdu/EN subtitles │
│ • Complete Urdu Report   │               └─────────────────────┘
└─┬────────────────────────┘
  │
  ├─► AgriculturalImpact.tsx (Pakistan Agriculture Backbone)
  ├─► LeafAnatomySection.tsx (Layers & Cellular Defense)
  ├─► NeuralPipelineSection.tsx (Step 1 & Step 2 Processing)
  ├─► DiseaseLibrary.tsx (10+ Disease Catalog)
  ├─► ExhibitionHub.tsx -> Questions & Community Q&A
  └─► Footer.tsx (AgroVision 2026 Safe & Clean Agriculture)
```

### Verification & Testing Plan
1. **Compilation Check**: Run `compile_applet` to verify TypeScript and build health.
2. **Language Toggle Verification**: Verify that toggling between English and Urdu updates all text, changes layout direction (`rtl`/`ltr`), and maintains clean typography.
3. **3D Plant Interaction**: Test clicking directly on the 3D tomato fruit to verify smooth camera zoom and 360° drag rotation.
4. **Diagnostic Success Toast**: Trigger a leaf analysis and verify the subtle Success toast appears with clear status indicators.
5. **Video Tutorial Playback**: Ensure `/public/assets/aistudio/tutorial-demo__2__9e77b096.mp4` loads and plays properly inside the modal dialog and quick-start card.
