import React, { useState } from 'react';
import { Leaf, Menu, X, Sparkles, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface NavbarProps {
  onScanClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onScanClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage, toggleLanguage, t, isUrdu } = useLanguage();

  return (
    <header className="sticky top-0 z-50 w-full bg-[#faf8f2]/95 backdrop-blur-md border-b border-[#cbdcd0]/80 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-6 px-6 py-3.5">
        {/* Zone 1: Brand Wordmark */}
        <a
          href="#"
          className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-[#13281c] whitespace-nowrap shrink-0 group"
        >
          <div className="w-8 h-8 rounded-xl bg-[#edf5ef] border border-emerald-300 flex items-center justify-center text-emerald-700 group-hover:bg-emerald-100 transition-colors shadow-sm">
            <Leaf className="w-4 h-4" />
          </div>
          <span className="font-display tracking-tight text-xl font-bold text-[#13281c]">
            {isUrdu ? 'ایگرو وژن ' : 'AgroVision '}
            <span className="text-emerald-700">AI</span>
          </span>
        </a>

        {/* Zone 2: Clean Single-Line Text Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-[#3d5947]">
          <a
            href="#why-leaves"
            className="hover:text-emerald-800 transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-4"
          >
            {t.nav.whyLeaves}
          </a>
          <a
            href="#inside-leaf"
            className="hover:text-emerald-800 transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-4"
          >
            {t.nav.insideLeaf}
          </a>
          <a
            href="#how-ai-sees"
            className="hover:text-emerald-800 transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-4"
          >
            {t.nav.howAiWorks}
          </a>
          <a
            href="#care-library"
            className="hover:text-emerald-800 transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-4"
          >
            {t.nav.careLibrary}
          </a>
          <a
            href="#weather"
            className="hover:text-emerald-800 transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-4"
          >
            {t.nav.weather}
          </a>
          <a
            href="#questions"
            className="hover:text-emerald-800 transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-4"
          >
            {t.nav.exhibition}
          </a>
        </nav>

        {/* Zone 3: Language Toggle & Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Animated iOS-style Language Pill Toggle */}
          <div
            className="relative flex items-center bg-[#e4ede7] p-1 rounded-full border border-[#cbdcd0] shadow-inner select-none cursor-pointer"
            onClick={toggleLanguage}
            title={isUrdu ? 'Switch to English' : 'اردو میں تبدیل کریں'}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') toggleLanguage();
            }}
          >
            <div
              className={`absolute top-1 bottom-1 w-[46px] bg-white rounded-full shadow-sm transition-all duration-300 ease-out border border-emerald-200 ${
                language === 'ur' ? 'left-[47px]' : 'left-1'
              }`}
            />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setLanguage('en');
              }}
              className={`relative z-10 w-[46px] py-1 text-xs font-bold text-center rounded-full transition-colors ${
                language === 'en' ? 'text-emerald-950 font-black' : 'text-[#3d5947] hover:text-[#13281c]'
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setLanguage('ur');
              }}
              className={`relative z-10 w-[46px] py-1 text-xs font-bold text-center rounded-full transition-colors ${
                language === 'ur' ? 'text-emerald-950 font-black' : 'text-[#3d5947] hover:text-[#13281c]'
              }`}
            >
              اردو
            </button>
          </div>

          <button
            onClick={onScanClick}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-all shadow-sm whitespace-nowrap shrink-0 active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.nav.checkLeafBtn}</span>
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#13281c] hover:text-emerald-700 transition-colors rounded-lg"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-[#cbdcd0] bg-[#faf8f2] px-6 py-4 flex flex-col gap-3 text-sm animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-[#cbdcd0]">
            <span className="text-xs font-medium text-[#3d5947] flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-emerald-700" />
              <span>{isUrdu ? 'زبان منتخب کریں' : 'Choose Language'}</span>
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 text-xs font-bold rounded-lg border ${
                  language === 'en' ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-[#3d5947] border-[#cbdcd0]'
                }`}
              >
                English
              </button>
              <button
                onClick={() => setLanguage('ur')}
                className={`px-3 py-1 text-xs font-bold rounded-lg border ${
                  language === 'ur' ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-[#3d5947] border-[#cbdcd0]'
                }`}
              >
                اردو
              </button>
            </div>
          </div>

          <a
            href="#why-leaves"
            onClick={() => setMobileMenuOpen(false)}
            className="text-[#3d5947] hover:text-[#13281c] py-1.5"
          >
            {t.nav.whyLeaves}
          </a>
          <a
            href="#inside-leaf"
            onClick={() => setMobileMenuOpen(false)}
            className="text-[#3d5947] hover:text-[#13281c] py-1.5"
          >
            {t.nav.insideLeaf}
          </a>
          <a
            href="#how-ai-sees"
            onClick={() => setMobileMenuOpen(false)}
            className="text-[#3d5947] hover:text-[#13281c] py-1.5"
          >
            {t.nav.howAiWorks}
          </a>
          <a
            href="#care-library"
            onClick={() => setMobileMenuOpen(false)}
            className="text-[#3d5947] hover:text-[#13281c] py-1.5"
          >
            {t.nav.careLibrary}
          </a>
          <a
            href="#weather"
            onClick={() => setMobileMenuOpen(false)}
            className="text-[#3d5947] hover:text-[#13281c] py-1.5"
          >
            {t.nav.weather}
          </a>
          <a
            href="#questions"
            onClick={() => setMobileMenuOpen(false)}
            className="text-[#3d5947] hover:text-[#13281c] py-1.5"
          >
            {t.nav.exhibition}
          </a>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onScanClick();
            }}
            className="w-full mt-2 py-2.5 text-center text-xs font-semibold text-white bg-emerald-600 rounded-xl hover:bg-emerald-700 shadow-sm"
          >
            {t.nav.checkLeafBtn}
          </button>
        </div>
      )}
    </header>
  );
};
