import React from 'react';
import { Leaf, Heart } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const Footer: React.FC = () => {
  const { t, isUrdu } = useLanguage();

  return (
    <footer className="w-full bg-[#f4f1e8] border-t border-[#cbdcd0] py-12 text-xs text-[#3d5947]">
      <div className="max-w-7xl mx-auto px-6 flex flex-col gap-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand Lockup */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#edf5ef] border border-emerald-300 flex items-center justify-center text-emerald-700 shadow-sm">
              <Leaf className="w-4 h-4" />
            </div>
            <span className="font-display font-bold text-[#13281c] text-lg">
              {isUrdu ? 'ایگرو وژن ' : 'AgroVision '}
              <span className="text-emerald-700">AI</span>
            </span>
            <span className="text-[#cbdcd0]">·</span>
            <span className="text-sm font-medium text-[#13281c]">
              {t.footer.tagline}
            </span>
          </div>

          {/* References & Dataset */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] font-mono">
            <span className="px-2.5 py-1 rounded-lg bg-white border border-[#cbdcd0]">
              {t.footer.datasetLabel}
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-white border border-[#cbdcd0]">
              {t.footer.exhibitionYear}
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-emerald-100/70 border border-emerald-300 text-emerald-900 font-semibold">
              {t.footer.safeAgri}
            </span>
          </div>
        </div>

        {/* Tribute to Agriculture as Pakistan's Backbone */}
        <div className="p-6 bg-white border border-[#cbdcd0] rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-left">
          <p className="text-xs sm:text-sm text-[#3d5947] leading-relaxed max-w-3xl">
            {t.footer.pakistanBackbone}
          </p>
          <div className="shrink-0 text-[11px] text-emerald-800 font-semibold flex items-center gap-1.5 bg-[#edf5ef] px-3.5 py-2 rounded-xl border border-emerald-200">
            <Heart className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
            <span>{isUrdu ? 'قدرتی اور پائیدار زراعت' : 'Safe & Clean Agriculture'}</span>
          </div>
        </div>

        {/* Quiet copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#3d5947]/80 pt-2 border-t border-[#cbdcd0]/50">
          <div>
            © 2026 AgroVision AI. Built with practical care for farmers, students, and clean food.
          </div>
          <div className="flex items-center gap-4">
            <a href="#why-leaves" className="hover:text-emerald-800 transition-colors">
              {t.nav.whyLeaves}
            </a>
            <a href="#diagnostic" className="hover:text-emerald-800 transition-colors">
              {t.nav.leafScanner}
            </a>
            <a href="#questions" className="hover:text-emerald-800 transition-colors">
              {t.nav.exhibition}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
