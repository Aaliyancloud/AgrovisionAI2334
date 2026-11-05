import React from 'react';
import { TrendingDown, Clock, ShieldCheck, HeartHandshake, Sprout, ShieldAlert } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import greenhouseImage from '../assets/images/smart_greenhouse_tech_1793801738048.jpg';
export const AgriculturalImpact: React.FC = () => {
  const { t, isUrdu } = useLanguage();

  return (
    <section id="why-leaves" className="relative w-full py-20 bg-[#f4f1e8] border-t border-[#cbdcd0]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 text-left">
          <div className="text-xs font-mono uppercase tracking-wider text-emerald-800 font-semibold mb-2">
            {t.impact.badge}
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#13281c] tracking-tight leading-tight text-balance">
            {t.impact.title}
          </h2>
          <p className="mt-4 text-[#3d5947] text-base sm:text-lg leading-relaxed">
            {t.impact.subtitle}
          </p>
        </div>

        {/* Featured Pakistan Agriculture Backbone Banner */}
        <div className="mb-8 bg-white border border-[#cbdcd0] rounded-3xl p-7 lg:p-8 shadow-sm">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-800 shrink-0">
                <Sprout className="w-6 h-6 text-emerald-700" />
              </div>
              <div className="text-left">
                <div className="text-xs font-mono uppercase tracking-wider text-emerald-800 font-semibold mb-1">
                  {isUrdu ? 'قومی زرعی اہمیت' : 'National Agricultural Lifeline'}
                </div>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-[#13281c]">
                  {t.impact.backboneTitle}
                </h3>
                <p className="mt-2 text-sm text-[#3d5947] leading-relaxed max-w-4xl">
                  {t.impact.backboneDesc}
                </p>
              </div>
            </div>

            <div className="shrink-0 flex items-center gap-3 bg-[#edf5ef] px-4 py-3 rounded-2xl border border-emerald-200">
              <div className="font-mono text-2xl font-black text-emerald-800">
                65%+
              </div>
              <div className="text-[11px] text-[#3d5947] leading-tight text-left">
                {isUrdu ? 'دیہی آبادی زراعت پر منحصر' : 'Rural population depends on farming'}
              </div>
            </div>
          </div>
        </div>

        {/* Bento Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          {/* Card 1: Tomato Crop Loss */}
          <div className="md:col-span-4 bg-white border border-[#cbdcd0] rounded-3xl p-7 flex flex-col justify-between shadow-sm text-left">
            <div>
              <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600 mb-6">
                <TrendingDown className="w-5 h-5" />
              </div>
              <div className="font-mono text-4xl sm:text-5xl font-extrabold text-rose-600 tracking-tight">
                35%
              </div>
              <h3 className="font-display text-xl font-bold text-[#13281c] mt-2">
                {isUrdu ? 'بیماری سے ضائع ہونے والے ٹماٹر' : 'Tomatoes Lost to Sickness'}
              </h3>
              <p className="text-sm text-[#3d5947] mt-3 leading-relaxed">
                {isUrdu
                  ? 'ملک بھر اور دنیا میں ایک تہائی سے زیادہ ٹماٹر کی فصل صرف پتوں کے دھبوں، فنگس اور وائرس کے بروقت علاج نہ ہونے سے خراب ہو جاتی ہے۔'
                  : 'Over a third of farm and garden tomatoes are lost to leaf spots, mold, and viruses before harvest if not diagnosed early.'}
              </p>
            </div>

            <div className="pt-6 border-t border-[#cbdcd0]/60 text-xs font-semibold text-emerald-800">
              {isUrdu ? 'ہمارا ہدف: پھل تک پہنچنے سے پہلے پتے کا علاج' : 'Goal: Treat leaves before rot reaches the fruit'}
            </div>
          </div>

          {/* Card 2: The 48-Hour Window */}
          <div className="md:col-span-8 bg-white border border-[#cbdcd0] rounded-3xl p-7 flex flex-col justify-between shadow-sm relative overflow-hidden text-left">
            <div className="relative z-10">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 mb-6">
                <Clock className="w-5 h-5" />
              </div>
              <div className="font-mono text-3xl sm:text-4xl font-bold text-[#13281c] tracking-tight">
                {isUrdu ? 'ابتدائی 48 گھنٹے کا سنہری وقت' : 'The 48-Hour Golden Window'}
              </div>
              <h3 className="font-display text-lg text-emerald-800 font-semibold mt-1">
                {isUrdu ? 'پھل خراب ہونے سے پہلے پودے کی حفاظت' : 'Plant Health Before Fruit Spread'}
              </h3>
              <p className="text-sm text-[#3d5947] mt-3 leading-relaxed max-w-2xl">
                {isUrdu
                  ? 'جب پہلے دو دن میں پتے پر ہلکے پیلے یا بھورے دھبے ظاہر ہوتے ہیں، تو صرف اس پتے کو کاٹ کر اور قدرتی نیم اسپرے کر کے پورے پودے کو بچایا جا سکتا ہے۔ ایک ہفتے بعد بیماری تنے اور ٹماٹر تک چلی جاتی ہے۔'
                  : 'Catching sickness during the first 48 hours allows gardeners to save the plant simply by pruning that leaf and using gentle organic sprays like neem oil before spores reach the stem.'}
              </p>
            </div>

            {/* Simple 3-step timeline */}
            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 mt-6 border-t border-[#cbdcd0]/60">
              <div className="bg-[#fcfbf9] p-3.5 rounded-2xl border border-emerald-200">
                <div className="text-xs font-mono text-emerald-800 font-bold">
                  {isUrdu ? 'پہلا اور دوسرا دن' : 'DAYS 1 - 2'}
                </div>
                <div className="text-xs text-[#13281c] font-bold mt-1">
                  {isUrdu ? 'باریک دھبے ظاہر ہوتے ہیں' : 'Tiny Specks Appear'}
                </div>
                <div className="text-[11px] text-[#3d5947] mt-1">
                  {isUrdu ? '90 فیصد بحالی کا امکان' : 'Easy to cure · 90% recovery'}
                </div>
              </div>
              <div className="bg-[#fcfbf9] p-3.5 rounded-2xl border border-amber-200">
                <div className="text-xs font-mono text-amber-700 font-bold">
                  {isUrdu ? 'تیسرا سے پانچواں دن' : 'DAYS 3 - 5'}
                </div>
                <div className="text-xs text-[#13281c] font-bold mt-1">
                  {isUrdu ? 'بھورے حلقے بڑھتے ہیں' : 'Brown Rings Grow'}
                </div>
                <div className="text-[11px] text-[#3d5947] mt-1">
                  {isUrdu ? 'دوسرے پتوں تک پھیلاؤ' : 'Spreads to neighbor leaves'}
                </div>
              </div>
              <div className="bg-[#fcfbf9] p-3.5 rounded-2xl border border-rose-200">
                <div className="text-xs font-mono text-rose-700 font-bold">
                  {isUrdu ? 'چھٹا دن اور آگے' : 'DAYS 6+'}
                </div>
                <div className="text-xs text-[#13281c] font-bold mt-1">
                  {isUrdu ? 'مرکزی تنا مرجھا جاتا ہے' : 'Main Vine Wilts'}
                </div>
                <div className="text-[11px] text-[#3d5947] mt-1">
                  {isUrdu ? 'ٹماٹر کا بچاؤ مشکل' : 'Difficult to save tomatoes'}
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Photo of Greenhouse */}
          <div className="md:col-span-7 bg-white border border-[#cbdcd0] rounded-3xl overflow-hidden flex flex-col justify-between shadow-sm">
            <div className="relative h-64 sm:h-72 w-full overflow-hidden">
              <img
                src={greenhouseImage}
                alt="Greenhouse tomato plants"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-6 right-6 text-left">
                <div className="text-xs font-mono text-emerald-300 uppercase tracking-wider font-semibold">
                  {isUrdu ? 'جدید گرین ہاؤس اور زرعی تحقیق' : 'Clean Farming'}
                </div>
                <div className="text-lg font-display font-bold text-white">
                  {isUrdu ? 'پودوں کی قدرتی اور محفوظ نگہداشت' : 'Protecting Plants Naturally'}
                </div>
              </div>
            </div>
            <div className="p-6 text-left">
              <h3 className="font-display text-lg font-bold text-[#13281c]">
                {t.impact.card2Title}
              </h3>
              <p className="text-sm text-[#3d5947] mt-2 leading-relaxed">
                {t.impact.card2Desc}
              </p>
            </div>
          </div>

          {/* Card 4: Farm Device Sensor */}
          <div className="md:col-span-5 bg-white border border-[#cbdcd0] rounded-3xl p-6 sm:p-7 flex flex-col justify-between shadow-sm text-left">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 mb-4">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h3 className="font-display text-lg font-bold text-[#13281c]">
                {t.impact.card3Title}
              </h3>
              <p className="text-sm text-[#3d5947] mt-2 leading-relaxed">
                {t.impact.card3Desc}
              </p>
            </div>

            <div className="mt-6 p-4 rounded-2xl bg-[#edf5ef] border border-emerald-200">
              <div className="text-xs font-bold text-emerald-900 mb-1">
                {isUrdu ? 'آسان اور تیز رفتار' : 'Instant Field Intelligence'}
              </div>
              <div className="text-[11px] text-[#3d5947] leading-relaxed">
                {isUrdu
                  ? 'کوئی بھی کسان یا طالب علم بغیر کسی مہنگی مشین کے اپنے عام موبائل سے پودے کا معائنہ کر سکتا ہے۔'
                  : 'Runs on standard mobile devices without complex lab machinery.'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
