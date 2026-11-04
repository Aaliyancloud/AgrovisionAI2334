import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Sparkles, BookOpen, Presentation, CheckCircle2, Award } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const ExhibitionHub: React.FC = () => {
  const { t, isUrdu } = useLanguage();
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [showDemoGuide, setShowDemoGuide] = useState<boolean>(false);

  const practicalQuestions = [
    {
      q: isUrdu
        ? 'کیا یہ اسکینر انٹرنیٹ کے بغیر بھی کھیت میں کام کر سکتا ہے؟'
        : 'Does this plant disease detector work offline directly in the field?',
      a: isUrdu
        ? 'جی ہاں! پورا تھری ڈی ماڈل اور پتے کا تشخیصی نظام 100 فیصد آپ کے فون یا لیپ ٹاپ کے براؤزر میں چلتا ہے۔ کھیت میں انٹرنیٹ بند بھی ہو تب بھی آپ پتے کا فوری معائنہ کر سکتے ہیں۔'
        : 'Yes! The entire 3D plant simulation and the leaf scanner run 100% locally inside your web browser. You can inspect leaves on any smartphone, tablet, or laptop even when field signal is unavailable.'
    },
    {
      q: isUrdu
        ? 'ٹماٹر کے پودے میں سب سے پہلے پتوں کو دیکھنا کیوں ضروری ہے؟'
        : 'Why are tomato leaves the first place to check?',
      a: isUrdu
        ? 'ٹماٹر کے پودے پر بیماری کا حملہ ہمیشہ نچلے پتوں سے شروع ہوتا ہے۔ اگر ابتدائی 48 گھنٹوں میں پیلے یا بھورے دھبے پکڑ لیے جائیں، تو صرف اس پتے کی کٹائی سے پورے پودے اور ٹماٹروں کو محفوظ رکھا جا سکتا ہے۔'
        : 'Tomato blights and molds almost always start on older lower leaves. Catching spots within the first 48 hours allows you to trim off that single leaf and stop spores before they enter the stem and ruin developing fruit.'
    },
    {
      q: isUrdu
        ? 'اگر غلطی سے کسی انسان، کمرے یا پالتو جانور کی تصویر اپلوڈ ہو جائے؟'
        : 'What happens if someone accidentally uploads a photo that is not a leaf?',
      a: isUrdu
        ? 'ہمارا جدید فلٹر کلوروفیل اور پتوں کی ساخت کو پرکھتا ہے۔ اگر کوئی غیر پودے کی تصویر آئے تو سسٹم غلط تشخیص کی بجائے پیار سے یاد دہانی کراتا ہے: "پودے کا پتہ نہیں ملا، برائے مہربانی پتے کی تصویر فراہم کریں۔"'
        : 'Our intelligent scanner inspects green chlorophyll levels and leaf geometries first. If someone uploads a selfie, a room, or another object, the app kindly informs them no leaf was detected rather than producing a false diagnosis.'
    },
    {
      q: isUrdu
        ? 'قدرتی نسخے جیسے نیم کا اسپرے کیمیائی ادویات سے کیسے بہتر ہیں؟'
        : 'How do natural remedies like neem spray protect crops better than harsh chemicals?',
      a: isUrdu
        ? 'نیم کا تیل اور بیکنگ سوڈا فنگس کے خلیات کی جھلی توڑتے ہیں لیکن زیر زمین پانی، انسانوں اور دوست کیڑوں (جیسے شہد کی مکھیاں) کو نقصان نہیں پہنچاتے۔ اس سے کسانوں کے اخراجات میں بھی بڑی بچت ہوتی ہے۔'
        : 'Gentle organic treatments like cold-pressed neem spray break down fungal cell walls without poisoning groundwater, beneficial pollinators (like bees), or human food, cutting chemical input costs significantly.'
    },
    {
      q: isUrdu
        ? 'بروقت تشخیص پاکستان کی زرعی معیشت کو کیسے مضبوط بناتی ہے؟'
        : 'How does early leaf detection strengthen agriculture in Pakistan?',
      a: isUrdu
        ? 'پاکستان میں زراعت معیشت کی ریڑھ کی ہڈی ہے۔ ہر سال ٹماٹر کی فصل پر پھپھوندی کا حملہ ہوتا ہے۔ اگر کسانوں کو فوری موبائل گائیڈ مل جائے تو لاکھوں روپے کا نقصان بچایا جا سکتا ہے اور صاف ستھری فصل مارکیٹ پہنچتی ہے۔'
        : 'Agriculture is Pakistan’s economic backbone. Every season, fungal blights threaten tomato yields. Putting instant diagnostics in growers’ pockets prevents devastating crop loss and elevates sustainable food security.'
    }
  ];

  return (
    <section id="questions" className="relative w-full py-20 bg-[#faf8f2] border-t border-[#cbdcd0]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="text-xs font-mono uppercase tracking-wider text-emerald-800 font-semibold mb-2">
            {t.qa.badge}
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#13281c] tracking-tight leading-tight text-balance">
            {t.qa.title}
          </h2>
          <p className="mt-4 text-[#3d5947] text-base sm:text-lg leading-relaxed">
            {t.qa.subtitle}
          </p>

          {/* Exhibition Quick Demo Mode Toggle (Section 12) */}
          <div className="mt-5 flex items-center justify-center">
            <button
              onClick={() => setShowDemoGuide(!showDemoGuide)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-[#edf5ef] border border-[#cbdcd0] text-xs font-semibold text-emerald-900 transition-all shadow-sm active:scale-95"
            >
              <Presentation className="w-3.5 h-3.5 text-emerald-700" />
              <span>
                {showDemoGuide
                  ? isUrdu
                    ? 'نمائش ڈیمو گائیڈ چھپائیں'
                    : 'Hide Exhibition Demo Guide'
                  : isUrdu
                  ? 'نمائش ڈیمو گائیڈ دیکھیں (STEAM Exhibition)'
                  : 'View Exhibition Demo Guide (STEAM Exhibition)'}
              </span>
            </button>
          </div>
        </div>

        {/* Collapsible Exhibition / Judge Demonstration Guide (Section 12) */}
        {showDemoGuide && (
          <div className="max-w-3xl mx-auto mb-10 p-6 bg-white border border-emerald-300 rounded-3xl shadow-md text-left animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <Award className="w-4 h-4 text-emerald-700" />
              </div>
              <div>
                <h4 className="font-display font-bold text-base text-[#13281c]">
                  {isUrdu ? '2 منٹ لائیو نمائش پریزنٹیشن گائیڈ' : '2-Minute Exhibition Demonstration Protocol'}
                </h4>
                <p className="text-xs text-[#3d5947]">
                  {isUrdu ? 'نمائش میں ججز اور آنے والوں کو پروجیکٹ دکھانے کا آسان طریقہ' : 'Guided presentation flow for exhibition visitors and evaluators'}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-[#cbdcd0]/60 text-xs">
              <div className="p-3 bg-[#edf5ef] rounded-xl border border-emerald-200">
                <span className="font-bold text-[#13281c] block mb-1">
                  {isUrdu ? '1. تھری ڈی ماڈل' : '1. 3D Model & Healing'}
                </span>
                <span className="text-[#3d5947]">
                  {isUrdu
                    ? 'ٹماٹر پر کلک کر کے زوم کریں اور اے آئی اسکین چلا کر پودے کو صحت یاب ہوتے دیکھیں۔'
                    : 'Click tomato to zoom in, then click "Simulate AI Scan" to watch blighted leaves heal.'}
                </span>
              </div>

              <div className="p-3 bg-[#edf5ef] rounded-xl border border-emerald-200">
                <span className="font-bold text-[#13281c] block mb-1">
                  {isUrdu ? '2. پتے کا لائیو اسکین' : '2. Instant Leaf Scan'}
                </span>
                <span className="text-[#3d5947]">
                  {isUrdu
                    ? 'آزمائشی پتوں میں سے ارلی بلائیٹ منتخب کریں اور اسکیننگ لیزر دیکھیں۔'
                    : 'Click test leaves or use camera to trigger in-browser computer vision.'}
                </span>
              </div>

              <div className="p-3 bg-[#edf5ef] rounded-xl border border-emerald-200">
                <span className="font-bold text-[#13281c] block mb-1">
                  {isUrdu ? '3. تشخیصی ڈیش بورڈ' : '3. Results & Remedies'}
                </span>
                <span className="text-[#3d5947]">
                  {isUrdu
                    ? 'درستگی کا اسکور، دھبوں کی میپنگ اور قدرتی دیسی علاج ملاحظہ کریں۔'
                    : 'Review certainty score, mapped lesion boxes, and organic neem remedies.'}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* FAQ Accordion List */}
        <div className="max-w-3xl mx-auto space-y-3.5 text-left">
          {practicalQuestions.map((item, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div
                key={idx}
                className="bg-white border border-[#cbdcd0] rounded-2xl overflow-hidden transition-all shadow-sm"
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-display font-bold text-base sm:text-lg text-[#13281c] hover:text-emerald-800 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-[#edf5ef] border border-emerald-300 text-emerald-800 flex items-center justify-center font-mono text-xs font-bold shrink-0">
                      0{idx + 1}
                    </span>
                    <span>{item.q}</span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-emerald-700 transition-transform duration-300 shrink-0 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-sm text-[#3d5947] leading-relaxed border-t border-[#cbdcd0]/40 animate-in fade-in duration-200">
                    <p>{item.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
