import React, { useState } from 'react';
import {
  Smartphone,
  Camera,
  Cpu,
  Layers,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Zap,
  Activity
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const ArchitectureDiagram: React.FC = () => {
  const { t, isUrdu } = useLanguage();
  const [activeStep, setActiveStep] = useState<number>(3); // Default on AI model stage

  const stages = [
    {
      id: 1,
      title: t.architecture.step1Title,
      shortLabel: isUrdu ? '1. فیلڈ ان پٹ' : '1. Field Input',
      icon: Smartphone,
      desc: t.architecture.step1Desc,
      tech: 'Mobile Web API / Camera API'
    },
    {
      id: 2,
      title: t.architecture.step2Title,
      shortLabel: isUrdu ? '2. نباتاتی فلٹر' : '2. Chlorophyll Filter',
      icon: Layers,
      desc: t.architecture.step2Desc,
      tech: 'RGB / HSV Threshold Analysis'
    },
    {
      id: 3,
      title: t.architecture.step3Title,
      shortLabel: isUrdu ? '3. روشنی توازن' : '3. Normalization',
      icon: Sparkles,
      desc: t.architecture.step3Desc,
      tech: 'Adaptive Histogram Equalization'
    },
    {
      id: 4,
      title: t.architecture.step4Title,
      shortLabel: isUrdu ? '4. نیورل ویژن' : '4. AI Inference',
      icon: Cpu,
      desc: t.architecture.step4Desc,
      tech: 'PlantVillage Trained Vision Backbone'
    },
    {
      id: 5,
      title: t.architecture.step5Title,
      shortLabel: isUrdu ? '5. بیماری درجہ بندی' : '5. Classification',
      icon: Activity,
      desc: t.architecture.step5Desc,
      tech: 'Multi-Class Softmax Certainty'
    },
    {
      id: 6,
      title: t.architecture.step6Title,
      shortLabel: isUrdu ? '6. قدرتی علاج' : '6. Prescription',
      icon: ShieldCheck,
      desc: t.architecture.step6Desc,
      tech: 'Verified Botanical Knowledge Base'
    }
  ];

  return (
    <div className="w-full bg-white border border-[#cbdcd0] rounded-3xl p-6 lg:p-8 shadow-sm text-left">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="text-xs font-mono uppercase tracking-wider text-emerald-800 font-semibold mb-1">
            {t.architecture.badge}
          </div>
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#13281c]">
            {t.architecture.title}
          </h3>
          <p className="text-xs sm:text-sm text-[#3d5947] mt-1 max-w-2xl">
            {t.architecture.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#edf5ef] border border-emerald-300 text-xs font-mono text-emerald-900 font-bold shrink-0">
          <Zap className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
          <span>&lt; 350ms In-Browser Pipeline</span>
        </div>
      </div>

      {/* Animated Pipeline Nodes */}
      <div className="relative mb-8">
        {/* Connection flow background line */}
        <div className="hidden lg:block absolute top-1/2 left-8 right-8 -translate-y-1/2 h-1 bg-[#e2ede5] rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-600 w-1/3 animate-[pulse_2s_infinite]" />
        </div>

        {/* 6 Stage Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 relative z-10">
          {stages.map((stage) => {
            const Icon = stage.icon;
            const isCurrent = activeStep === stage.id;
            return (
              <button
                key={stage.id}
                onClick={() => setActiveStep(stage.id)}
                className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between min-h-[110px] group ${
                  isCurrent
                    ? 'border-emerald-600 bg-[#edf5ef] shadow-md -translate-y-1'
                    : 'border-[#cbdcd0] bg-white hover:border-emerald-300 hover:bg-[#faf8f2]'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-2">
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${
                      isCurrent
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'bg-[#faf8f2] text-emerald-800 border border-[#cbdcd0]'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="font-mono text-[10px] text-emerald-800 font-bold">
                    0{stage.id}
                  </span>
                </div>
                <div>
                  <div className="font-display text-xs font-bold text-[#13281c] truncate">
                    {stage.shortLabel}
                  </div>
                  <div className="text-[10px] font-mono text-[#3d5947] truncate mt-0.5">
                    {stage.tech}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Stage Detail Dossier */}
      {(() => {
        const sel = stages.find((s) => s.id === activeStep) || stages[0];
        const SelIcon = sel.icon;
        return (
          <div className="p-5 sm:p-6 rounded-2xl bg-[#fcfbf9] border border-[#cbdcd0] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 animate-in fade-in duration-200">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                <SelIcon className="w-6 h-6" />
              </div>
              <div>
                <div className="text-[11px] font-mono text-emerald-800 font-semibold uppercase mb-1">
                  Stage {sel.id} Architecture Detail
                </div>
                <h4 className="font-display text-lg sm:text-xl font-bold text-[#13281c]">
                  {sel.title}
                </h4>
                <p className="text-xs sm:text-sm text-[#3d5947] mt-1 leading-relaxed max-w-2xl">
                  {sel.desc}
                </p>
              </div>
            </div>

            <div className="shrink-0 w-full sm:w-auto p-3.5 bg-white rounded-xl border border-[#cbdcd0] text-xs font-mono">
              <span className="text-[#3d5947] block text-[10px]">EXECUTION ENVIRONMENT</span>
              <span className="font-bold text-emerald-800">{sel.tech}</span>
            </div>
          </div>
        );
      })()}
    </div>
  );
};
