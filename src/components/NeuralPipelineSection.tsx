import React, { useState } from 'react';
import { Eye, Search, BarChart2, ShieldCheck, CheckCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { ArchitectureDiagram } from './ArchitectureDiagram';

export const NeuralPipelineSection: React.FC = () => {
  const { t, isUrdu } = useLanguage();
  const [activeStep, setActiveStep] = useState<number>(1);

  const pipelineSteps = [
    {
      step: 1,
      title: isUrdu ? 'مرحلہ 1: پتے کے رنگوں کا جائزہ' : 'Step 1: Check Leaf Colors',
      simpleTag: isUrdu ? 'رنگوں کی شناخت' : 'Color Check',
      icon: Eye,
      description: isUrdu
        ? 'کیمرہ سب سے پہلے پتے کے تمام رنگوں کا تجزیہ کرتا ہے۔ صحت مند پودے کا رنگ گہرا زمردی سبز ہوتا ہے۔ اگر کمپیوٹر ہلکے پیلے یا سیاہ بھورے دھبے دیکھے تو ان حصوں کو نشان زد کر لیتا ہے۔'
        : 'The camera first looks at all the colors across the leaf. A strong plant has rich emerald green. If the computer spots pale yellow circles or dark brown patches, it marks those areas for closer inspection.',
      points: [
        isUrdu ? 'پتے کو پس منظر اور مٹی سے الگ کرتا ہے' : 'Separates the green leaf from background soil or fingers',
        isUrdu ? 'صحت مند سبز اور بیمار پیلے پکسلز کی پیمائش' : 'Measures healthy green vs. sick yellow and brown pixels',
        isUrdu ? 'عام دن کی روشنی میں فوری نتائج' : 'Works instantly under daylight or indoor lamps'
      ]
    },
    {
      step: 2,
      title: isUrdu ? 'مرحلہ 2: دھبوں اور ساخت کی تلاش' : 'Step 2: Find Spots and Shapes',
      simpleTag: isUrdu ? 'شکل و صورت کا اسکین' : 'Shape Scanner',
      icon: Search,
      description: isUrdu
        ? 'اس کے بعد کمپیوٹر دھبوں کی شکل دیکھتا ہے۔ مختلف بیماریاں مختلف نشان چھوڑتی ہیں: ارلی بلائیٹ کے دھبے دائروں میں ہوتے ہیں جبکہ وائرس پتے کو چمچ کی طرح موڑ دیتا ہے۔'
        : 'Next, the computer examines the shape of the spots. Different plant diseases leave different signatures: Early Blight leaves circular target rings, Septoria leaves tiny dots, and viruses make the leaf curl up like a spoon.',
      points: [
        isUrdu ? 'ہر مشکوک دھبے کے کناروں کی تفصیلی پیمائش' : 'Traces the edges of every suspicious spot',
        isUrdu ? 'گول حلقوں اور پانی کے عام چھینٹوں میں فرق' : 'Identifies concentric rings vs. random water blotches',
        isUrdu ? 'پتے کی باریک رگوں کے ٹیڑھے پن کی جانچ' : 'Checks if leaf veins are straight or distorted'
      ]
    },
    {
      step: 3,
      title: isUrdu ? 'مرحلہ 3: بیماری کی شدت کا تخمینہ' : 'Step 3: Measure the Sickness',
      simpleTag: isUrdu ? 'نقصان کا تناسب' : 'Damage Gauge',
      icon: BarChart2,
      description: isUrdu
        ? 'کمپیوٹر اندازہ لگاتا ہے کہ پتے کا کتنا فیصد حصہ بیمار ہے۔ اگر صرف 5 فیصد پر دھبے ہوں تو بیماری ابتدائی مرحلے میں ہے۔ اگر 40 فیصد خراب ہو تو فوری بچاؤ کی تدابیر ضروری ہیں۔'
        : 'The computer calculates how much of the leaf has been damaged. If only 5% has spots, the disease is caught in the early stage. If 40% is brown, urgent care is needed to prevent other tomato plants from catching it.',
      points: [
        isUrdu ? 'متاثرہ سطح کے فیصد کا درست حساب' : 'Calculates exact percentage of damaged surface area',
        isUrdu ? 'شدت کی درجہ بندی: ہلکی، درمیانی، یا شدید' : 'Scores severity as Mild, Moderate, or Severe',
        isUrdu ? 'انفیکشن کے آغاز کے مقام کا تعین' : 'Pinpoints where the main infection started'
      ]
    },
    {
      step: 4,
      title: isUrdu ? 'مرحلہ 4: قدرتی اور آسان علاج' : 'Step 4: Give the Healing Plan',
      simpleTag: isUrdu ? 'نسخہ اور احتیاط' : 'Care Prescription',
      icon: ShieldCheck,
      description: isUrdu
        ? 'آخر میں نظام بیماری کو مستند نباتاتی حل سے ملا کر دکھاتا ہے۔ یہ فوری طور پر گھریلو قدرتی علاج (جیسے نیم کا اسپرے یا میٹھا سوڈا)، کٹائی کی ہدایات اور پانی دینے کے اصول بتاتا ہے۔'
        : 'Finally, the system matches the disease with tested botanical recipes. It immediately shows you household organic remedies (like baking soda spray or neem oil), trimming instructions, and watering tips to nurse the plant back to health.',
      points: [
        isUrdu ? 'آسان اور مؤثر گھریلو قدرتی طریقے' : 'Gives easy step-by-step organic remedies',
        isUrdu ? 'متاثرہ پتوں کو کاٹنے کی درست رہنمائی' : 'Explains which leaves should be gently trimmed',
        isUrdu ? 'آئندہ بیماری سے پودے کو محفوظ رکھنے کے مشورے' : 'Offers advice to stop the sickness from coming back'
      ]
    }
  ];

  const currentStep = pipelineSteps[activeStep - 1];

  return (
    <section id="how-ai-sees" className="relative w-full py-20 bg-[#faf8f2] border-t border-[#cbdcd0]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-xs font-mono uppercase tracking-wider text-emerald-800 font-semibold mb-2">
            {t.pipeline.badge}
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#13281c] tracking-tight leading-tight text-balance">
            {t.pipeline.title}
          </h2>
          <p className="mt-4 text-[#3d5947] text-base sm:text-lg leading-relaxed">
            {t.pipeline.subtitle}
          </p>
        </div>

        {/* 4 Step Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {pipelineSteps.map((s) => {
            const Icon = s.icon;
            const isSelected = activeStep === s.step;
            return (
              <button
                key={s.step}
                onClick={() => setActiveStep(s.step)}
                className={`p-5 rounded-3xl border text-left transition-all ${
                  isSelected
                    ? 'border-emerald-600 bg-white shadow-md'
                    : 'border-[#cbdcd0] bg-[#fcfbf9] hover:border-emerald-300'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
                      isSelected
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'bg-[#edf5ef] text-emerald-800'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-800">
                    {s.step}/4
                  </span>
                </div>
                <div className="font-display font-bold text-sm text-[#13281c]">
                  {s.title}
                </div>
                <div className="text-[11px] text-[#3d5947] mt-1">
                  {s.simpleTag}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Step Detail Showcase Card */}
        <div className="bg-white border border-[#cbdcd0] rounded-3xl p-6 sm:p-8 shadow-sm text-left">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="text-xs font-mono uppercase tracking-wider text-emerald-800 font-semibold">
                {currentStep.simpleTag}
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#13281c]">
                {currentStep.title}
              </h3>
              <p className="text-sm sm:text-base text-[#3d5947] leading-relaxed">
                {currentStep.description}
              </p>

              <div className="space-y-2 pt-2">
                {currentStep.points.map((pt, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-[#3d5947]">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 bg-[#edf5ef] border border-emerald-200 rounded-3xl p-6 flex flex-col justify-between gap-4">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-900">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>{isUrdu ? 'آف لائن اور فوری پراسیسنگ' : 'Instant Browser Intelligence'}</span>
              </div>
              <p className="text-xs text-[#3d5947] leading-relaxed">
                {isUrdu
                  ? 'یہ پورا تشخیصی عمل سیکنڈ کے دسویں حصے میں براہِ راست آپ کے براؤزر کے اندر مکمل ہو جاتا ہے۔ انٹرنیٹ کے بغیر بھی کسان اور طلبہ اسے باآسانی استعمال کر سکتے ہیں۔'
                  : 'This entire process takes under a single second and executes directly in your browser. No slow uploads or high-speed field internet required.'}
              </p>
              <div className="p-3 bg-white rounded-xl border border-emerald-300 text-[11px] font-mono text-emerald-900 font-semibold flex items-center justify-between">
                <span>{isUrdu ? 'تجزیاتی رفتار:' : 'Scan Latency:'}</span>
                <span className="text-emerald-700 font-bold">&lt; 350 ms</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 13 Master Prompt Architecture Diagram */}
        <div className="mt-12">
          <ArchitectureDiagram />
        </div>
      </div>
    </section>
  );
};
