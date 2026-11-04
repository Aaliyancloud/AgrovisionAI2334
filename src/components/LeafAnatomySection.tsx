import React, { useState } from 'react';
import { LeafScannerCanvas, LeafConditionMode } from './3d/LeafScannerCanvas';
import { Layers, Shield, Eye, HelpCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const LeafAnatomySection: React.FC = () => {
  const { t, isUrdu } = useLanguage();
  const [selectedCondition, setSelectedCondition] = useState<LeafConditionMode>('early_blight');
  const [activeLayer, setActiveLayer] = useState<'skin' | 'factory' | 'pipes' | 'mouths'>('factory');

  const anatomicalLayers = {
    skin: {
      title: isUrdu ? 'پتے کی حفاظتی بیرونی جلد' : 'Leaf Skin (The Waxy Shield)',
      simpleName: isUrdu ? 'واٹر پروف ڈھال' : 'Waterproof Coat',
      role: isUrdu ? 'پتے کو چھتری کی طرح بارش اور نقصان دہ اثرات سے بچاتی ہے' : 'Protects the leaf like an umbrella and sunscreen',
      description: isUrdu
        ? 'پتے کے اوپر ایک قدرتی مومی تہہ ہوتی ہے جو فنگس اور جراثیم کو اندر جانے سے روکتی ہے۔ بارش کا پانی دیر تک کھڑا رہے تو جراثیم اندر گھسنے کی کوشش کرتے ہیں۔'
        : 'A thin, waxy coating on top of the leaf that stops water from soaking in. Germs and fungi try to pierce this protective coat when rain sits on the leaf for too long.',
      howSick: isUrdu
        ? 'اگر پانی 6 گھنٹے سے زیادہ رہے تو فنگس اس حفاظتی تہہ میں سوراخ کر لیتی ہے۔'
        : 'If leaves stay wet for over 6 hours, fungal spores germinate and drill through this skin.'
    },
    factory: {
      title: isUrdu ? 'سبز خلیات کی خوراک فیکٹری' : 'Food Factory (Green Cells)',
      simpleName: isUrdu ? 'توانائی کا مرکز' : 'Energy Maker',
      role: isUrdu ? 'دھوپ اور پانی سے ٹماٹر کے لیے میٹھی خوراک بناتی ہے' : 'Turns sunlight and water into sweet tomato food',
      description: isUrdu
        ? 'پتے کا نرم اور سبز درمیانی حصہ جہاں کلوروفل سورج کی روشنی پکڑتا ہے۔ بیماریاں ان سبز خلیات کو ختم کر کے بھورے اور پیلے مردہ دھبے بنا دیتی ہیں۔'
        : 'The soft green middle of the leaf where chlorophyll captures sunlight. When leaf diseases strike, they destroy these green cells, leaving circular brown and yellow dead spots.',
      howSick: isUrdu
        ? 'ارلی بلائیٹ ان خلیوں کو دائروں میں کھاتی ہے، جس سے مخصوص ہدف جیسے بھورے حلقے بن جاتے ہیں۔'
        : 'Early Blight eats these cells in circles, making the famous brown target rings you see on sick plants.'
    },
    pipes: {
      title: isUrdu ? 'پانی اور خوراک کی باریک رگیں' : 'Water Pipes (Leaf Veins)',
      simpleName: isUrdu ? 'رسانی نالیاں' : 'Drinking Straws',
      role: isUrdu ? 'جڑوں سے پانی اور ٹماٹر تک غذائیت پہنچاتی ہیں' : 'Carries water and nutrients up to growing tomatoes',
      description: isUrdu
        ? 'پتے کے اندر موجود باریک لکیریں جو نالیوں کا کام کرتی ہیں۔ یہ مٹی سے پانی پتے تک اور تیار خوراک ٹماٹر تک پہنچاتی ہیں۔'
        : 'The raised lines on the leaf that act like drinking straws. They carry water from the soil up to the leaves and send sweetness back down to growing tomatoes.',
      howSick: isUrdu
        ? 'سفید مکھی جیسے کیڑے ان نالیوں میں وائرس داخل کر دیتے ہیں جس سے پتہ پیالے کی طرح مڑ جاتا ہے۔'
        : 'Tiny whitefly insects inject plant viruses directly into these pipes, causing leaves to curl up like cups.'
    },
    mouths: {
      title: isUrdu ? 'سانس لینے کے باریک مسام (اسٹومیٹا)' : 'Breathing Mouths (Pores)',
      simpleName: isUrdu ? 'ہوائی راستے' : 'Air Gateways',
      role: isUrdu ? 'مائیکروسکوپک سوراخ جہاں سے پتہ تازہ ہوا میں سانس لیتا ہے' : 'Tiny microscopic holes where the leaf breathes air',
      description: isUrdu
        ? 'پتے کی نچلی سطح پر ہزاروں باریک سوراخ ہوتے ہیں۔ پودا دن کے وقت کاربن ڈائی آکسائیڈ اندر لینے اور آکسیجن خارج کرنے کے لیے انہیں کھولتا ہے۔'
        : 'Thousands of microscopic openings on the underside of the leaf. The plant opens them during daytime to breathe in carbon dioxide and release fresh oxygen.',
      howSick: isUrdu
        ? 'جب بارش کا گندا پانی مٹی سے اچھلتا ہے تو بیکٹیریا ان کھلے سوراخوں کے راستے اندر داخل ہو جاتے ہیں۔'
        : 'Bacteria swim right through these open breathing holes when dirty water splashes up from the soil.'
    }
  };

  const currentLayerData = anatomicalLayers[activeLayer];

  return (
    <section id="inside-leaf" className="relative w-full py-20 bg-[#faf8f2] border-t border-[#cbdcd0]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-xs font-mono uppercase tracking-wider text-emerald-800 font-semibold mb-2">
            {t.anatomy.badge}
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#13281c] tracking-tight leading-tight text-balance">
            {t.anatomy.title}
          </h2>
          <p className="mt-4 text-[#3d5947] text-base sm:text-lg leading-relaxed">
            {isUrdu
              ? 'ہم پتوں کا معائنہ کیوں کرتے ہیں؟ کیونکہ پتے مختلف پرتوں سے مل کر بنتے ہیں۔ جب بیماری حملہ کرتی ہے تو ان پرتوں کا رنگ بدل جاتا ہے۔ تھری ڈی ماڈل کو گھما کر دیکھیں!'
              : 'Why do we scan leaves? Because leaves are built with different layers. When sickness attacks, it changes how light reflects off these layers. Turn the 3D leaf model to see how different diseases look!'}
          </p>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: 3D Leaf Inspector */}
          <div className="lg:col-span-7 bg-white border border-[#cbdcd0] rounded-3xl overflow-hidden flex flex-col justify-between shadow-sm relative">
            <div className="relative w-full h-[480px] lg:h-[560px]">
              <LeafScannerCanvas initialCondition={selectedCondition} isScanningActive={true} />
            </div>
          </div>

          {/* Right Column: Plain English Explanations */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-5 text-left">
            {/* Layer Buttons */}
            <div className="bg-white border border-[#cbdcd0] rounded-3xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-sm font-bold text-[#13281c]">
                  <Layers className="w-4 h-4 text-emerald-700" />
                  <span>{isUrdu ? 'پتے کی 4 بنیادی پرتیں' : 'The 4 Parts of a Leaf'}</span>
                </div>
                <span className="text-xs text-emerald-800 font-medium">
                  {isUrdu ? 'معلومات کے لیے کلک کریں' : 'Click to learn'}
                </span>
              </div>

              {/* 4 Simple buttons */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                {(['skin', 'factory', 'pipes', 'mouths'] as const).map((lKey) => (
                  <button
                    key={lKey}
                    onClick={() => setActiveLayer(lKey)}
                    className={`p-3 text-xs font-semibold rounded-xl text-left transition-all ${
                      activeLayer === lKey
                        ? 'bg-[#edf5ef] border border-emerald-500 text-emerald-950 shadow-sm'
                        : 'bg-[#faf8f2] border border-[#cbdcd0] text-[#3d5947] hover:border-emerald-300'
                    }`}
                  >
                    <div>{anatomicalLayers[lKey].simpleName}</div>
                    <div className="text-[11px] font-normal text-[#3d5947]/80 mt-0.5">
                      {anatomicalLayers[lKey].title.split(' ')[0]}
                    </div>
                  </button>
                ))}
              </div>

              {/* Explanatory card */}
              <div className="p-4 rounded-2xl bg-[#fcfbf9] border border-[#cbdcd0] space-y-3">
                <div className="flex items-center justify-between">
                  <div className="font-display font-bold text-sm text-[#13281c]">
                    {currentLayerData.title}
                  </div>
                  <span className="text-[11px] font-mono text-emerald-800 font-semibold">
                    {currentLayerData.role.split(' ')[0]}
                  </span>
                </div>

                <p className="text-xs text-[#3d5947] leading-relaxed">
                  {currentLayerData.description}
                </p>

                <div className="pt-3 border-t border-[#cbdcd0] text-xs text-amber-900 bg-amber-50/70 p-3 rounded-xl border border-amber-200">
                  <strong className="block mb-1 text-amber-950 font-semibold">
                    {isUrdu ? 'بیماری کا اثر کیسے ہوتا ہے:' : 'How disease strikes here:'}
                  </strong>
                  <span>{currentLayerData.howSick}</span>
                </div>
              </div>
            </div>

            {/* Disease Selector for the 3D Leaf */}
            <div className="bg-white border border-[#cbdcd0] rounded-3xl p-6 shadow-sm">
              <div className="text-xs font-mono uppercase tracking-wider text-emerald-800 font-semibold mb-3">
                {isUrdu ? 'تھری ڈی پتے کا منظر بدلیں:' : 'Change 3D Leaf View:'}
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  onClick={() => setSelectedCondition('healthy')}
                  className={`p-2.5 rounded-xl border font-medium text-left transition-all ${
                    selectedCondition === 'healthy'
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : 'bg-[#faf8f2] border-[#cbdcd0] text-[#3d5947]'
                  }`}
                >
                  {isUrdu ? 'صحت مند پتہ' : 'Healthy Leaf'}
                </button>
                <button
                  onClick={() => setSelectedCondition('early_blight')}
                  className={`p-2.5 rounded-xl border font-medium text-left transition-all ${
                    selectedCondition === 'early_blight'
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : 'bg-[#faf8f2] border-[#cbdcd0] text-[#3d5947]'
                  }`}
                >
                  {isUrdu ? 'ارلی بلائیٹ (حلقے)' : 'Early Blight (Target)'}
                </button>
                <button
                  onClick={() => setSelectedCondition('late_blight')}
                  className={`p-2.5 rounded-xl border font-medium text-left transition-all ${
                    selectedCondition === 'late_blight'
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : 'bg-[#faf8f2] border-[#cbdcd0] text-[#3d5947]'
                  }`}
                >
                  {isUrdu ? 'لیٹ بلائیٹ (جھلساؤ)' : 'Late Blight (Dark Mold)'}
                </button>
                <button
                  onClick={() => setSelectedCondition('septoria')}
                  className={`p-2.5 rounded-xl border font-medium text-left transition-all ${
                    selectedCondition === 'septoria'
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : 'bg-[#faf8f2] border-[#cbdcd0] text-[#3d5947]'
                  }`}
                >
                  {isUrdu ? 'سیپٹوریا لیف اسپاٹ' : 'Septoria Leaf Spots'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
