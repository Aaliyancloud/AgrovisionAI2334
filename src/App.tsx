import React from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AgriculturalImpact } from './components/AgriculturalImpact';
import { LeafAnatomySection } from './components/LeafAnatomySection';
import { WeatherAlertCard } from './components/WeatherAlertCard';
import { DiagnosticStudio } from './components/DiagnosticStudio';
import { NeuralPipelineSection } from './components/NeuralPipelineSection';
import { DiseaseLibrary } from './components/DiseaseLibrary';
import { ExhibitionHub } from './components/ExhibitionHub';
import { Footer } from './components/Footer';

function MainAppContent() {
  const { isUrdu } = useLanguage();

  const scrollToDiagnostic = () => {
    const el = document.getElementById('diagnostic');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTechnology = () => {
    const el = document.getElementById('how-ai-sees');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      className={`min-h-screen bg-[#faf8f2] text-[#13281c] flex flex-col font-sans selection:bg-emerald-200 selection:text-emerald-950 transition-colors ${
        isUrdu ? 'font-urdu' : ''
      }`}
    >
      <Navbar onScanClick={scrollToDiagnostic} />

      <main className="flex-1">
        <Hero
          onScanClick={scrollToDiagnostic}
          onExploreTechClick={scrollToTechnology}
        />

        <AgriculturalImpact />

        <LeafAnatomySection />

        {/* Section 10 Agricultural Weather & Blight Microclimate */}
        <section className="w-full py-12 bg-[#faf8f2] border-t border-[#cbdcd0]">
          <div className="max-w-7xl mx-auto px-6">
            <WeatherAlertCard />
          </div>
        </section>

        <DiagnosticStudio />

        <NeuralPipelineSection />

        <DiseaseLibrary onSelectForDiagnosis={scrollToDiagnostic} />

        <ExhibitionHub />
      </main>

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <MainAppContent />
    </LanguageProvider>
  );
}
