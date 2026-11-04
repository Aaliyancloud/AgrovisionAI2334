// Bilingual Translation Dictionary (English and Urdu)
// Designed for clean UI and accessibility for Pakistan & global users

export type Language = 'en' | 'ur';

export interface Translations {
  nav: {
    brandSubtitle: string;
    whyLeaves: string;
    insideLeaf: string;
    howAiWorks: string;
    leafScanner: string;
    careLibrary: string;
    exhibition: string;
    checkLeafBtn: string;
    weather: string;
  };
  hero: {
    kickerDomain: string;
    headlineStart: string;
    headlineHighlight: string;
    description: string;
    scanBtn: string;
    techBtn: string;
    videoGuideBtn: string;
    accuracyLabel: string;
    accuracySub: string;
    diseasesLabel: string;
    diseasesSub: string;
    instantLabel: string;
    instantSub: string;
    scrollPrompt: string;
  };
  plant3d: {
    badge: string;
    wholePlant: string;
    tomatoes: string;
    leaves: string;
    pauseSpin: string;
    spinPlant: string;
    checkLeaf: string;
    dragHint: string;
    clickTomatoHint: string;
    resetView: string;
    healthyMode: string;
    blightedMode: string;
    healSimulationBtn: string;
    healingToast: string;
  };
  weather: {
    badge: string;
    title: string;
    subtitle: string;
    tempLabel: string;
    humidityLabel: string;
    dewLabel: string;
    blightRiskLabel: string;
    blightRiskWarning: string;
    conditionSunny: string;
    conditionHumid: string;
    microclimatePunjab: string;
    microclimateSindh: string;
    microclimateGreenhouse: string;
  };
  architecture: {
    badge: string;
    title: string;
    subtitle: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
    step4Title: string;
    step4Desc: string;
    step5Title: string;
    step5Desc: string;
    step6Title: string;
    step6Desc: string;
  };
  scanner: {
    badge: string;
    title: string;
    subtitle: string;
    tabSamples: string;
    tabUpload: string;
    tabCamera: string;
    quickVideoBtn: string;
    videoTutorialTitle: string;
    videoTutorialDesc: string;
    dragDropText: string;
    orBrowse: string;
    selectFileBtn: string;
    cameraPrompt: string;
    startCameraBtn: string;
    captureBtn: string;
    retakeBtn: string;
    analyzingTitle: string;
    notLeafTitle: string;
    notLeafAdvice: string;
    successToastTitle: string;
    successToastDesc: string;
    reportTitle: string;
    confidenceLabel: string;
    damagedAreaLabel: string;
    riskLevelLabel: string;
    lowRisk: string;
    moderateRisk: string;
    highRisk: string;
    urgencyHigh: string;
    urgencyModerate: string;
    urgencyRoutine: string;
    whatHappening: string;
    symptomsTitle: string;
    treatmentTitle: string;
    printReportBtn: string;
    testAnotherBtn: string;
  };
  impact: {
    badge: string;
    title: string;
    subtitle: string;
    backboneTitle: string;
    backboneDesc: string;
    card1Title: string;
    card1Desc: string;
    card2Title: string;
    card2Desc: string;
    card3Title: string;
    card3Desc: string;
  };
  anatomy: {
    badge: string;
    title: string;
    subtitle: string;
  };
  pipeline: {
    badge: string;
    title: string;
    subtitle: string;
  };
  library: {
    badge: string;
    title: string;
    subtitle: string;
    allFilter: string;
    fungalFilter: string;
    bacterialFilter: string;
    viralFilter: string;
    healthyFilter: string;
    testThisLeafBtn: string;
  };
  qa: {
    badge: string;
    title: string;
    subtitle: string;
  };
  footer: {
    tagline: string;
    datasetLabel: string;
    exhibitionYear: string;
    safeAgri: string;
    pakistanBackbone: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    nav: {
      brandSubtitle: 'Tomato Plant Health AI',
      whyLeaves: 'Why Leaves Matter',
      insideLeaf: 'Inside the Leaf',
      howAiWorks: 'How AI Works',
      leafScanner: 'Leaf Scanner',
      careLibrary: 'Disease Library',
      exhibition: 'Plant Care & Q&A',
      checkLeafBtn: 'Check a Tomato Leaf',
      weather: 'Garden Weather'
    },
    hero: {
      kickerDomain: 'Smart Farming · Plant Health AI · Tomato Care',
      headlineStart: 'Smarter Detection. ',
      headlineHighlight: 'Healthier Plants.',
      description: 'Discover a smarter way to understand tomato plant health. AgroVision AI checks leaf photos to spot diseases early, giving you easy, natural steps to heal your crops.',
      scanBtn: 'Scan a Tomato Leaf',
      techBtn: 'See How It Works',
      videoGuideBtn: 'Watch Video Guide',
      accuracyLabel: '98.4%',
      accuracySub: 'Tested Accuracy',
      diseasesLabel: '10+ Diseases',
      diseasesSub: 'Spots, Molds & Virus',
      instantLabel: '< 1 Second',
      instantSub: 'Instant Check',
      scrollPrompt: 'Learn why leaf health matters'
    },
    plant3d: {
      badge: 'Interactive 3D Tomato Plant',
      wholePlant: 'Whole Plant',
      tomatoes: 'Focus on Tomatoes',
      leaves: 'Inspect Leaves',
      pauseSpin: 'Pause Spin',
      spinPlant: 'Spin Plant',
      checkLeaf: 'Check a Leaf',
      dragHint: 'Drag to rotate 360°',
      clickTomatoHint: 'Click red tomato to zoom in',
      resetView: 'Reset View',
      healthyMode: 'Vigorous Green',
      blightedMode: 'Blighted Leaf Spots',
      healSimulationBtn: 'Simulate AI Scan & Recovery',
      healingToast: 'AI scanning plant... Healing blighted lesions into healthy emerald leaves!'
    },
    weather: {
      badge: 'Agricultural Microclimate',
      title: 'Tomato Garden Weather & Blight Risk',
      subtitle: 'Environmental humidity and leaf moisture determine whether fungal spores germinate. Monitor your microclimate to take preventative action.',
      tempLabel: 'Air Temperature',
      humidityLabel: 'Relative Humidity',
      dewLabel: 'Leaf Wetness / Dew',
      blightRiskLabel: 'Fungal Blight Risk',
      blightRiskWarning: 'Warning: Relative humidity > 68% promotes Alternaria and late blight spores. Water at the base and prune lower foliage.',
      conditionSunny: 'Optimal Daylight',
      conditionHumid: 'Humid & Overcast',
      microclimatePunjab: 'Punjab Agricultural Plains',
      microclimateSindh: 'Sindh Tomato Belt',
      microclimateGreenhouse: 'Protected Greenhouse / Tunnel'
    },
    architecture: {
      badge: 'End-to-End System Pipeline',
      title: 'How AgroVision AI Processes a Leaf',
      subtitle: 'From local browser image capture through neural feature extraction to verified organic treatment prescriptions.',
      step1Title: 'User & Device Input',
      step1Desc: 'Farmer, gardener, or student points phone camera or uploads a leaf photo.',
      step2Title: 'Chlorophyll Validation',
      step2Desc: 'Filters non-leaf images and checks for green plant pigment.',
      step3Title: 'Color & Texture Normalization',
      step3Desc: 'Compensates for outdoor lighting, direct sunlight, and shadows.',
      step4Title: 'Neural Feature Extraction',
      step4Desc: 'Vision model traces spot geometries, concentric rings, and margin curling.',
      step5Title: 'Pathogen Classification',
      step5Desc: 'Maps features against 10 verified tomato disease classes with confidence scores.',
      step6Title: 'Bilingual Care Prescription',
      step6Desc: 'Delivers tailored organic remedies, neem spray guidance, and pruning advice.'
    },
    scanner: {
      badge: 'Leaf Scanner',
      title: 'Check Your Tomato Leaf',
      subtitle: 'Upload a leaf photo, use your smartphone camera, or click one of our test leaves below to see instant disease identification!',
      tabSamples: 'Test Leaves',
      tabUpload: 'Upload Photo',
      tabCamera: 'Live Camera',
      quickVideoBtn: 'Watch How to Scan (Video Guide)',
      videoTutorialTitle: 'Field Guide: How to Scan Leaves',
      videoTutorialDesc: 'Watch how our mobile leaf scanner helps detect plant sickness directly in the tomato garden.',
      dragDropText: 'Drag and drop your leaf photo here',
      orBrowse: 'or click to browse from your device',
      selectFileBtn: 'Choose Leaf Image',
      cameraPrompt: 'Point your camera closely at a tomato leaf with good natural lighting.',
      startCameraBtn: 'Open Camera',
      captureBtn: 'Capture & Scan Leaf',
      retakeBtn: 'Change Photo',
      analyzingTitle: 'Analyzing Leaf Pattern...',
      notLeafTitle: 'No Plant Leaf Detected',
      notLeafAdvice: 'The image provided does not look like a plant leaf. Please provide a clear, close-up photograph of a tomato leaf for diagnosis.',
      successToastTitle: 'Analysis Completed Successfully!',
      successToastDesc: 'Leaf health and disease diagnosis report is ready below.',
      reportTitle: 'Diagnosis Report',
      confidenceLabel: 'Model Confidence',
      damagedAreaLabel: 'Affected Area',
      riskLevelLabel: 'Risk Level',
      lowRisk: 'Low Risk',
      moderateRisk: 'Moderate Risk',
      highRisk: 'High Risk',
      urgencyHigh: 'Immediate Action Needed',
      urgencyModerate: 'Treatment Recommended',
      urgencyRoutine: 'Routine Maintenance',
      whatHappening: 'What is happening to your plant?',
      symptomsTitle: 'Visible Symptoms',
      treatmentTitle: 'Organic Care & Treatment Steps',
      printReportBtn: 'Print / Save Report',
      testAnotherBtn: 'Test Another Leaf'
    },
    impact: {
      badge: 'Agricultural Importance',
      title: 'Why Checking Tomato Leaves Matters',
      subtitle: 'Agriculture is the economic backbone of Pakistan. Early detection saves crops, protects livelihoods, and ensures clean harvests.',
      backboneTitle: 'Pakistan’s Agricultural Lifeline',
      backboneDesc: 'Over 65% of the rural population depends directly on farming. Tomato crops face devastating losses from blights each season. By catching symptoms within 48 hours, farmers protect their income without expensive chemical pesticides.',
      card1Title: 'Protect Harvests Early',
      card1Desc: 'Identifying leaf spots before spores spread across the stem protects the whole garden before tomatoes spoil.',
      card2Title: 'Save Water & Reduce Chemicals',
      card2Desc: 'Targeted organic treatments like neem spray prevent blanket chemical spraying, saving groundwater and soil quality.',
      card3Title: 'Empower Everyday Growers',
      card3Desc: 'Accessible tools turn any basic mobile device into an intelligent botanical diagnostic lab right in the field.'
    },
    anatomy: {
      badge: 'Plant Biology',
      title: 'Inside the Tomato Leaf',
      subtitle: 'Understanding leaf layers reveals how fungi penetrate tissues and how natural defenses fight back.'
    },
    pipeline: {
      badge: 'Computer Vision',
      title: 'How AI Analyzes Plant Health',
      subtitle: 'From pixel color analysis to neural spot detection, explore how machine learning classifies leaf conditions.'
    },
    library: {
      badge: 'Reference Catalog',
      title: 'Tomato Disease Library',
      subtitle: 'Explore the 10 most common tomato leaf conditions, visual symptoms, and organic healing solutions.',
      allFilter: 'All Conditions',
      fungalFilter: 'Fungi / Molds',
      bacterialFilter: 'Bacteria',
      viralFilter: 'Viruses',
      healthyFilter: 'Healthy Leaves',
      testThisLeafBtn: 'Test in Scanner'
    },
    qa: {
      badge: 'Community Knowledge',
      title: 'Questions & Answers',
      subtitle: 'Practical explanations on leaf diagnosis, offline browser capability, and safe agriculture.'
    },
    footer: {
      tagline: 'Smarter Detection. Healthier Plants.',
      datasetLabel: 'PlantVillage Dataset & AgroVision Model',
      exhibitionYear: 'Exhibition 2026',
      safeAgri: 'Safe and clean agriculture built to make an impact',
      pakistanBackbone: 'Agriculture is the backbone of Pakistan. AgroVision was built to put practical botanical science directly into the hands of farmers, students, and communities.'
    }
  },
  ur: {
    nav: {
      brandSubtitle: 'ٹماٹر کے پودوں کی صحت کا اے آئی نظام',
      whyLeaves: 'پتے کیوں اہم ہیں',
      insideLeaf: 'پتے کی اندرونی ساخت',
      howAiWorks: 'اے آئی کا طریقہ کار',
      leafScanner: 'پتے کا اسکینر',
      careLibrary: 'بیماریوں کی فہرست',
      exhibition: 'پودوں کی دیکھ بھال اور سوالات',
      checkLeafBtn: 'ٹماٹر کے پتے کا معائنہ',
      weather: 'باغ کا موسم'
    },
    hero: {
      kickerDomain: 'جدید زراعت · نباتاتی اے آئی · ٹماٹر کی نگہداشت',
      headlineStart: 'بہتر اور تیز تشخیص۔ ',
      headlineHighlight: 'صحت مند پودے۔',
      description: 'ٹماٹر کے پودوں کی صحت جانچنے کا آسان ترین طریقہ۔ ایگرو وژن اے آئی پتے کی تصویر دیکھ کر بیماری کی بروقت نشاندہی کرتا ہے تاکہ آپ قدرتی اور آسان طریقوں سے اپنی فصل بچا سکیں۔',
      scanBtn: 'ٹماٹر کا پتہ اسکین کریں',
      techBtn: 'طریقہ کار دیکھیں',
      videoGuideBtn: 'ویڈیو گائیڈ دیکھیں',
      accuracyLabel: '98.4%',
      accuracySub: 'آزمودہ درستگی',
      diseasesLabel: '10+ بیماریاں',
      diseasesSub: 'دھبے، پھپھوندی اور وائرس',
      instantLabel: '1 سیکنڈ سے کم',
      instantSub: 'فوری معائنہ',
      scrollPrompt: 'پتوں کی صحت کیوں ضروری ہے؟'
    },
    plant3d: {
      badge: 'انٹرایکٹو تھری ڈی ٹماٹر پودا',
      wholePlant: 'مکمل پودا',
      tomatoes: 'ٹماٹر پر زوم کریں',
      leaves: 'پتے دیکھیں',
      pauseSpin: 'گھماؤ روکیں',
      spinPlant: 'پودا گھمائیں',
      checkLeaf: 'پتہ چیک کریں',
      dragHint: 'ہر زاویے سے دیکھنے کے لیے ماؤس یا انگلی سے گھمائیں',
      clickTomatoHint: 'ٹماٹر کو قریب سے دیکھنے کے لیے اس پر کلک کریں',
      resetView: 'اصل زاویہ',
      healthyMode: 'صحت مند سبز پتے',
      blightedMode: 'بیمار اور دھبے دار پتے',
      healSimulationBtn: 'اے آئی اسکین اور صحت یابی کا مظاہرہ',
      healingToast: 'اے آئی اسکیننگ جاری... بیمار پتوں کو صحت مند زمردی رنگ میں تبدیل کیا جا رہا ہے!'
    },
    weather: {
      badge: 'زرعی موسمیاتی صورتحال',
      title: 'ٹماٹر کے کھیت کا موسم اور بیماری کا خطرہ',
      subtitle: 'ہوا میں نمی اور پتوں پر اوس کا پانی فنگس کے جراثیم پھیلنے کی سب سے بڑی وجہ ہے۔ موسمی صورتحال دیکھ کر حفاظتی اقدام کریں۔',
      tempLabel: 'درجہ حرارت',
      humidityLabel: 'ہوا میں نمی',
      dewLabel: 'پتے پر اوس / نمی',
      blightRiskLabel: 'پھپھوندی کا خطرہ',
      blightRiskWarning: 'انتباہ: نمی 68 فیصد سے زیادہ ہونے پر ارلی اور لیٹ بلائیٹ پھیلتی ہے۔ پانی ہمیشہ تنے کے پاس دیں، پتوں کو گیلا نہ کریں۔',
      conditionSunny: 'مناسب دھوپ',
      conditionHumid: 'نم آلود مطلع',
      microclimatePunjab: 'پنجاب کے زرعی میدانی علاقے',
      microclimateSindh: 'سندھ کا ٹماٹر کا علاقہ',
      microclimateGreenhouse: 'ٹنل فارمنگ / گرین ہاؤس'
    },
    architecture: {
      badge: 'مکمل خودکار نظام',
      title: 'ایگرو وژن اے آئی پتے کی جانچ کیسے کرتا ہے؟',
      subtitle: 'موبائل کیمرے کی تصویر سے لے کر نباتاتی فیچر اور قدرتی علاج کی تصدیق تک کا مکمل سفر۔',
      step1Title: 'کسان یا طالب علم کا ان پٹ',
      step1Desc: 'کھیت میں موجود کسان فون کیمرے سے پتے کی تصویر کھینچتا ہے۔',
      step2Title: 'کلوروفل کی تصدیق',
      step2Desc: 'نظام غیر پودے کی تصاویر کو فلٹر کر کے پودے کے سبز مادے کو پرکھتا ہے۔',
      step3Title: 'روشنی اور رنگ کا توازن',
      step3Desc: 'دھوپ، چھاؤں اور عکس کو متوازن کر کے اصلی دھبوں کو نمایاں کرتا ہے۔',
      step4Title: 'علامات اور خدوخال کی پیمائش',
      step4Desc: 'مشین لرننگ ماڈل دھبوں کے گول حلقوں اور کناروں کا تجزیہ کرتا ہے۔',
      step5Title: 'بیماری کی شناخت اور درجہ بندی',
      step5Desc: '10 اہم بیماریوں کے ڈیٹا کے ساتھ موازنہ کر کے درستگی ظاہر کرتا ہے۔',
      step6Title: 'بامقصد قدرتی نسخہ اور علاج',
      step6Desc: 'نیم اسپرے، پتوں کی تراش خراش اور گھریلو علاج کی واضح تجاویز۔'
    },
    scanner: {
      badge: 'پتے کا اسکینر',
      title: 'اپنے ٹماٹر کے پتے کا معائنہ کریں',
      subtitle: 'پتے کی تصویر اپلوڈ کریں، فون کیمرے سے تصویر کھینچیں، یا نیچے دیے گئے آزمائشی پتوں میں سے کسی ایک کو منتخب کر کے فوری نتیجہ دیکھیں!',
      tabSamples: 'آزمائشی پتے',
      tabUpload: 'تصویر اپلوڈ',
      tabCamera: 'لائیو کیمرہ',
      quickVideoBtn: 'ویڈیو ٹیوٹوریل دیکھیں (اسکین کرنے کا طریقہ)',
      videoTutorialTitle: 'فیلڈ گائیڈ: پتے اسکین کرنے کا طریقہ',
      videoTutorialDesc: 'دیکھیں کہ کس طرح ہمارے طالب علم نے کھیت میں کھڑے ہو کر اپنے موبائل سے پودے کی بیماری فوری طور پر پکڑ لی۔',
      dragDropText: 'پتے کی تصویر یہاں ڈریگ اور ڈراپ کریں',
      orBrowse: 'یا اپنے فون یا کمپیوٹر سے فائل چنیں',
      selectFileBtn: 'تصویر منتخب کریں',
      cameraPrompt: 'کیمرے کو ٹماٹر کے پتے کے بالکل سامنے قدرتی روشنی میں رکھیں۔',
      startCameraBtn: 'کیمرہ آن کریں',
      captureBtn: 'تصویر لیں اور معائنہ کریں',
      retakeBtn: 'دوسری تصویر لیں',
      analyzingTitle: 'پتے کے رنگوں اور دھبوں کا تجزیہ جاری ہے...',
      notLeafTitle: 'پودے کا پتہ نہیں ملا',
      notLeafAdvice: 'فراہم کردہ تصویر پودے کے پتے کی نہیں لگتی۔ درست تشخیص کے لیے برائے مہربانی ٹماٹر کے پتے کی واضح تصویر فراہم کریں۔',
      successToastTitle: 'تشخیص کامیابی سے مکمل ہو گئی!',
      successToastDesc: 'پتے کی صحت اور بیماری کی مکمل رپورٹ تیار ہے، نیچے ملاحظہ فرمائیں۔',
      reportTitle: 'تشخیصی رپورٹ',
      confidenceLabel: 'ماڈل کی درستگی',
      damagedAreaLabel: 'متاثرہ رقبہ',
      riskLevelLabel: 'خطرے کی سطح',
      lowRisk: 'کم خطرہ',
      moderateRisk: 'درمیانہ خطرہ',
      highRisk: 'زیادہ خطرہ',
      urgencyHigh: 'فوری علاج ضروری ہے',
      urgencyModerate: 'علاج تجویز کیا جاتا ہے',
      urgencyRoutine: 'معمول کی دیکھ بھال',
      whatHappening: 'پودے کے ساتھ کیا مسئلہ پیش آ رہا ہے؟',
      symptomsTitle: 'ظاہری علامات',
      treatmentTitle: 'قدرتی علاج اور حفاظتی تدابیر',
      printReportBtn: 'رپورٹ محفوظ / پرنٹ کریں',
      testAnotherBtn: 'دوسرا پتہ چیک کریں'
    },
    impact: {
      badge: 'زرعی اہمیت',
      title: 'ٹماٹر کے پتوں کا معائنہ کیوں ضروری ہے؟',
      subtitle: 'پاکستان میں زراعت ملکی معیشت کی ریڑھ کی ہڈی ہے۔ بروقت تشخیص کسانوں کی محنت، فصل اور آمدنی کو محفوظ بناتی ہے۔',
      backboneTitle: 'پاکستان کی زراعت: قومی معیشت کی ریڑھ کی ہڈی',
      backboneDesc: 'پاکستان کی 65 فیصد سے زیادہ دیہی آبادی براہِ راست زراعت سے منسلک ہے۔ ٹماٹر کی فصل پر ہر سال پھپھوندی اور دھبوں کے حملے ہوتے ہیں جس سے پیداوار متاثر ہوتی ہے۔ اگر ابتدائی 48 گھنٹوں میں بیماری کی نشاندہی ہو جائے تو کسان بغیر مہنگی کیمیائی ادویات کے اپنی فصل بچا سکتے ہیں۔',
      card1Title: 'پھیلاؤ سے پہلے تحفظ',
      card1Desc: 'پھپھوندی کے بیج تنے اور ٹماٹر تک پہنچنے سے پہلے متاثرہ پتے کا علاج کر کے پورے پودے کو بچایا جا سکتا ہے۔',
      card2Title: 'صاف ماحول اور کم زہر',
      card2Desc: 'نیم کے سپرے اور قدرتی طریقوں سے غیر ضروری زہریلے اسپرے کی ضرورت 70 فیصد تک کم ہو جاتی ہے جس سے زیر زمین پانی محفوظ رہتا ہے۔',
      card3Title: 'کسانوں اور طلبہ کی طاقت',
      card3Desc: 'یہ سادہ اور تیز نظام ہر عام موبائل فون کو کھیت میں ایک مکمل نباتاتی لیبارٹری بنا دیتا ہے۔'
    },
    anatomy: {
      badge: 'پودے کی ساخت',
      title: 'ٹماٹر کے پتے کے اندر کیا ہوتا ہے؟',
      subtitle: 'پتے کی قدرتی پرتیں کس طرح بیماری کا مقابلہ کرتی ہیں اور فنگس اندر کیسے داخل ہوتی ہے۔'
    },
    pipeline: {
      badge: 'کمپیوٹر ویژن',
      title: 'اے آئی پودے کی بیماری کیسے پہچانتا ہے؟',
      subtitle: 'تصویر کے پکسلز، رنگوں کی ساخت اور مشین لرننگ کے ذریعے بیماری کی دریافت کا سفر۔'
    },
    library: {
      badge: 'مکمل معلوماتی ڈائریکٹری',
      title: 'ٹماٹر کی بیماریوں کی لائبریری',
      subtitle: '10 سب سے اہم بیماریاں، علامات اور ان کا قدرتی دیسی علاج۔',
      allFilter: 'تمام حالات',
      fungalFilter: 'پھپھوندی (فنگس)',
      bacterialFilter: 'بیکٹیریا',
      viralFilter: 'وائرس',
      healthyFilter: 'صحت مند پتے',
      testThisLeafBtn: 'اسکینر میں چیک کریں'
    },
    qa: {
      badge: 'عملی رہنمائی',
      title: 'اکثر پوچھے جانے والے سوالات (Q&A)',
      subtitle: 'پودوں کی بیماریوں، اے آئی کی درستگی اور آف لائن کام کرنے کے طریقے کے بارے میں معلومات۔'
    },
    footer: {
      tagline: 'بہتر تشخیص۔ صحت مند پودے۔',
      datasetLabel: 'پلانٹ ولیج ڈیٹا سیٹ اور ایگرو وژن ماڈل',
      exhibitionYear: 'نمائش 2026',
      safeAgri: 'محفوظ اور شفاف زراعت - پائیدار مستقبل کے لیے',
      pakistanBackbone: 'پاکستان میں زراعت ملکی بقا اور معیشت کی بنیادی ریڑھ کی ہڈی ہے۔ ایگرو وژن کا مقصد جدید سائنس کو عام کسانوں اور طالب علموں کی دہلیز تک پہنچانا ہے۔'
    }
  }
};
