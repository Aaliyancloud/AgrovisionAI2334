import React, { useEffect, useState } from 'react';
import { HeroPlantCanvas } from './3d/HeroPlantCanvas';
import { ArrowDown, Cpu, ShieldCheck, Activity, Camera, Play, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { VideoTutorialModal } from './VideoTutorialModal';

interface HeroProps {
  onScanClick: () => void;
  onExploreTechClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onScanClick, onExploreTechClick }) => {
  const { t, isUrdu } = useLanguage();
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
const [isPlantVisible, setIsPlantVisible] = useState(true);

useEffect(() => {
  if (isUrdu) return;

  const timer = window.setInterval(() => {
    setIsPlantVisible(visible => !visible);
  }, 850);

  return () => window.clearInterval(timer);
}, [isUrdu]);
  return (
    <section className="relative w-full min-h-[90vh] flex flex-col justify-between overflow-hidden bg-gradient-to-b from-[#faf8f2] via-[#f5f2e8] to-[#faf8f2]">
      {/* Background soft sage glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-emerald-200/35 rounded-full blur-[140px] pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 pt-8 pb-6 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Friendly Editorial & Calls to Action */}
          <div className="lg:col-span-5 flex flex-col gap-6 text-left">
            {/* Simple domain metadata */}
            <div className="flex items-center gap-2 text-xs font-mono font-medium text-emerald-800">
              <span>{isUrdu ? 'جدید زرعی ٹیکنالوجی' : 'Smart Farming'}</span>
              <span aria-hidden="true">·</span>
              <span>{isUrdu ? 'نباتاتی اے آئی' : 'Plant Health AI'}</span>
              <span aria-hidden="true">·</span>
              <span>{isUrdu ? 'ٹماٹر کا پودا' : 'Tomato Plants'}</span>
            </div>

            {/* Main Headline */}
         <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#13281c] leading-[1.1] text-balance">
  {t.hero.headlineStart}
  <span className="text-emerald-700">
    {isUrdu ? (
      t.hero.headlineHighlight
    ) : (
      <>
        Healthier{' '}
        <span
          className={`inline-block transition-opacity duration-150 ${isPlantVisible ? 'opacity-100' : 'opacity-0'}`}
          aria-hidden="true"
        >
          Plants.
        </span>
        <span
          className="inline-block h-[0.9em] border-r-[3px] border-emerald-700 ml-1 align-middle animate-pulse"
          aria-hidden="true"
        />
      </>
    )}
  </span>
</h1>
            {/* Simple Supporting Text */}
            <p className="text-base sm:text-lg text-[#3d5947] leading-relaxed font-sans max-w-xl">
              {t.hero.description}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onScanClick}
                className="px-6 py-3.5 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-all shadow-md shadow-emerald-900/15 flex items-center gap-2.5 active:scale-95 group"
              >
                <Camera className="w-4 h-4 transition-transform group-hover:scale-110" />
                <span>{t.hero.scanBtn}</span>
              </button>

              <button
                onClick={() => setIsVideoModalOpen(true)}
                className="px-5 py-3.5 text-sm font-semibold text-emerald-950 bg-[#edf5ef] hover:bg-emerald-100 border border-emerald-300 rounded-xl transition-all flex items-center gap-2 active:scale-95 shadow-sm group"
              >
                <div className="w-5 h-5 rounded-lg bg-emerald-600 text-white flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Play className="w-3 h-3 fill-white" />
                </div>
                <span>{t.hero.videoGuideBtn}</span>
              </button>

              <button
                onClick={onExploreTechClick}
                className="px-4 py-3.5 text-xs sm:text-sm font-medium text-[#13281c] hover:text-emerald-800 bg-white hover:bg-[#edf5ef] border border-[#cbdcd0] rounded-xl transition-all flex items-center gap-1.5 active:scale-95 shadow-sm"
              >
                <Cpu className="w-4 h-4 text-emerald-700" />
                <span>{t.hero.techBtn}</span>
              </button>
            </div>

            {/* Simple Trust Signals */}
            <div className="pt-4 border-t border-[#cbdcd0] grid grid-cols-3 gap-4 text-left">
              <div>
                <div className="flex items-center gap-1.5 text-emerald-700 text-sm font-bold font-mono">
                  <Activity className="w-4 h-4" />
                  <span>{t.hero.accuracyLabel}</span>
                </div>
                <div className="text-xs text-[#3d5947] mt-0.5">{t.hero.accuracySub}</div>
              </div>

              <div>
                <div className="flex items-center gap-1.5 text-emerald-700 text-sm font-bold font-mono">
                  <ShieldCheck className="w-4 h-4" />
                  <span>{t.hero.diseasesLabel}</span>
                </div>
                <div className="text-xs text-[#3d5947] mt-0.5">{t.hero.diseasesSub}</div>
              </div>

              <div>
                <div className="flex items-center gap-1.5 text-emerald-700 text-sm font-bold font-mono">
                  <Sparkles className="w-4 h-4" />
                  <span>{t.hero.instantLabel}</span>
                </div>
                <div className="text-xs text-[#3d5947] mt-0.5">{t.hero.instantSub}</div>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Plant Experience with Tomato Zoom */}
          <div className="lg:col-span-7 relative h-[520px] lg:h-[620px] w-full flex items-center justify-center">
            <HeroPlantCanvas
              onScanClick={onScanClick}
              onOpenVideo={() => setIsVideoModalOpen(true)}
            />
          </div>
        </div>
      </div>

      {/* Bottom Scroll Prompt */}
      <div className="relative z-10 w-full pb-4 flex flex-col items-center justify-center text-xs text-[#3d5947]">
        <a href="#why-leaves" className="flex flex-col items-center gap-1 hover:text-emerald-800 transition-colors">
          <span>{t.hero.scrollPrompt}</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce text-emerald-600" />
        </a>
      </div>

      {/* Video Tutorial Modal */}
      <VideoTutorialModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        onTryScanner={onScanClick}
      />
    </section>
  );
};
