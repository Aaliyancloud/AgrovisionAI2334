import React, { useState } from 'react';
import { TOMATO_DISEASES } from '../data/tomatoDiseases';
import { DiseaseInfo, PathogenType } from '../types/disease';
import { Search, Sparkles, Droplets, Thermometer, Wind, Check, ChevronRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface DiseaseLibraryProps {
  onSelectForDiagnosis?: (diseaseId: string) => void;
}

export const DiseaseLibrary: React.FC<DiseaseLibraryProps> = ({ onSelectForDiagnosis }) => {
  const { t, isUrdu } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'All' | PathogenType>('All');
  const [selectedDisease, setSelectedDisease] = useState<DiseaseInfo>(TOMATO_DISEASES[1]);

  const getUrduName = (id: string, def: string) => {
    if (id === 'early_blight') return 'ارلی بلائیٹ (پتوں کا ابتدائی جھلساؤ)';
    if (id === 'late_blight') return 'لیٹ بلائیٹ (پتوں کا شدید جھلساؤ)';
    if (id === 'bacterial_spot') return 'بیکٹیریل اسپاٹ (پتوں کے سیاہ دھبے)';
    if (id === 'yellow_leaf_curl') return 'پیلا پتہ مروڑ وائرس';
    if (id === 'healthy') return 'صحت مند ٹماٹر کا پودا';
    if (id === 'septoria_leaf_spot') return 'سیپٹوریا لیف اسپاٹ (باریک دھبے)';
    if (id === 'spider_mites') return 'دو دھبے والی لال مکڑی';
    if (id === 'target_spot') return 'ٹارگٹ اسپاٹ (حلقہ دار نشان)';
    if (id === 'mosaic_virus') return 'ٹماٹر کا موزیک وائرس';
    if (id === 'leaf_mold') return 'پتوں کی پیلی پھپھوندی (مولڈ)';
    return def;
  };

  const filteredDiseases = TOMATO_DISEASES.filter((d) => {
    const matchesFilter = selectedFilter === 'All' || d.pathogenType === selectedFilter;
    const matchesQuery =
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.scientificName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      getUrduName(d.id, d.name).toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesQuery;
  });

  const filterTabs: { key: 'All' | PathogenType; label: string }[] = [
    { key: 'All', label: isUrdu ? 'تمام' : 'All' },
    { key: 'Fungal', label: isUrdu ? 'فنگس / پھپھوندی' : 'Fungal' },
    { key: 'Bacterial', label: isUrdu ? 'بیکٹیریا' : 'Bacterial' },
    { key: 'Viral', label: isUrdu ? 'وائرس' : 'Viral' },
    { key: 'Pest', label: isUrdu ? 'کیڑے' : 'Pest' },
    { key: 'Healthy', label: isUrdu ? 'صحت مند پتے' : 'Healthy' }
  ];

  return (
    <section id="care-library" className="relative w-full py-20 bg-[#f4f1e8] border-t border-[#cbdcd0]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="text-xs font-mono uppercase tracking-wider text-emerald-800 font-semibold mb-2">
            {t.library.badge}
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#13281c] tracking-tight leading-tight text-balance">
            {t.library.title}
          </h2>
          <p className="mt-4 text-[#3d5947] text-base sm:text-lg leading-relaxed">
            {t.library.subtitle}
          </p>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          {/* Search Box */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-emerald-700 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder={isUrdu ? 'بیماری یا علامات تلاش کریں...' : 'Search diseases or symptoms...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-[#cbdcd0] text-xs text-[#13281c] placeholder-[#3d5947]/60 focus:outline-none focus:border-emerald-600 transition-colors shadow-sm"
            />
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center gap-1 p-1 bg-white rounded-2xl border border-[#cbdcd0] overflow-x-auto max-w-full shadow-sm">
            {filterTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setSelectedFilter(tab.key)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-colors whitespace-nowrap ${
                  selectedFilter === tab.key
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-[#3d5947] hover:text-[#13281c]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 2-Column Catalog & Detail Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Disease List */}
          <div className="lg:col-span-5 space-y-3">
            {filteredDiseases.length === 0 ? (
              <div className="p-8 text-center bg-white rounded-3xl border border-[#cbdcd0] text-xs text-[#3d5947]">
                {isUrdu ? 'کوئی بیماری نہیں ملی۔ کچھ اور لکھ کر دیکھیں۔' : 'No matching plant diseases found. Try typing a different name.'}
              </div>
            ) : (
              filteredDiseases.map((disease) => {
                const isSelected = selectedDisease.id === disease.id;
                return (
                  <button
                    key={disease.id}
                    onClick={() => setSelectedDisease(disease)}
                    className={`w-full p-4 rounded-2xl border text-left transition-all flex items-center justify-between ${
                      isSelected
                        ? 'border-emerald-600 bg-white shadow-md'
                        : 'border-[#cbdcd0] bg-[#fcfbf9] hover:bg-white'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2 text-[11px] font-mono font-medium mb-1">
                        <span
                          className={
                            disease.pathogenType === 'Healthy'
                              ? 'text-emerald-700 font-bold'
                              : disease.pathogenType === 'Viral'
                              ? 'text-amber-700 font-bold'
                              : disease.pathogenType === 'Bacterial'
                              ? 'text-purple-700 font-bold'
                              : 'text-rose-700 font-bold'
                          }
                        >
                          {disease.pathogenType}
                        </span>
                        <span className="text-[#cbdcd0]">·</span>
                        <span className="text-[#3d5947]">{disease.typicalSeverity}</span>
                      </div>
                      <div className="font-display font-bold text-sm text-[#13281c]">
                        {isUrdu ? getUrduName(disease.id, disease.name) : disease.name}
                      </div>
                      <div className="text-xs text-[#3d5947] italic mt-0.5">
                        {disease.scientificName}
                      </div>
                    </div>

                    <ChevronRight
                      className={`w-4 h-4 transition-transform ${
                        isSelected ? 'text-emerald-700 translate-x-1' : 'text-[#cbdcd0]'
                      }`}
                    />
                  </button>
                );
              })
            )}
          </div>

          {/* Right Column: Selected Disease Dossier */}
          <div className="lg:col-span-7 bg-white border border-[#cbdcd0] rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 text-left">
            <div>
              <div className="flex items-center justify-between gap-4 mb-2">
                <span className="text-xs font-mono uppercase tracking-wider text-emerald-800 font-semibold">
                  {isUrdu ? 'مکمل بیماری کا فائل' : 'Disease File'} · {selectedDisease.pathogenType}
                </span>
                <span className="text-xs font-mono font-bold px-2 py-0.5 bg-[#edf5ef] text-emerald-900 rounded-md border border-emerald-200">
                  {selectedDisease.contagionRisk} Risk
                </span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#13281c]">
                {isUrdu ? getUrduName(selectedDisease.id, selectedDisease.name) : selectedDisease.name}
              </h3>
              <p className="text-xs text-[#3d5947] italic mt-1">
                {selectedDisease.scientificName}
              </p>
              <p className="text-sm text-[#3d5947] mt-3 leading-relaxed">
                {selectedDisease.description}
              </p>
            </div>

            {/* Environmental Conditions */}
            <div className="p-4 rounded-2xl bg-[#faf8f2] border border-[#cbdcd0] grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <div className="flex items-center gap-1.5 text-emerald-800 font-bold mb-1">
                  <Thermometer className="w-3.5 h-3.5" />
                  <span>{isUrdu ? 'درجہ حرارت' : 'Temperature'}</span>
                </div>
                <div className="text-[#3d5947]">{selectedDisease.favorableConditions.temperature}</div>
              </div>
              <div>
                <div className="flex items-center gap-1.5 text-emerald-800 font-bold mb-1">
                  <Droplets className="w-3.5 h-3.5" />
                  <span>{isUrdu ? 'نمی کا تناسب' : 'Humidity'}</span>
                </div>
                <div className="text-[#3d5947]">{selectedDisease.favorableConditions.humidity}</div>
              </div>
              <div>
                <div className="flex items-center gap-1.5 text-emerald-800 font-bold mb-1">
                  <Wind className="w-3.5 h-3.5" />
                  <span>{isUrdu ? 'پھیلاؤ کا ذریعہ' : 'Vector Spread'}</span>
                </div>
                <div className="text-[#3d5947] truncate">{selectedDisease.favorableConditions.spreadVector}</div>
              </div>
            </div>

            {/* Symptoms */}
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-emerald-800 font-semibold mb-2">
                {isUrdu ? 'اہم ظاہری علامات' : 'Primary Symptoms'}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#3d5947]">
                {selectedDisease.primarySymptoms.map((sym, idx) => (
                  <div key={idx} className="flex items-start gap-2 p-2.5 rounded-xl bg-[#fcfbf9] border border-[#cbdcd0]">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{sym}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Treatment recommendations */}
            <div className="pt-4 border-t border-[#cbdcd0] space-y-3">
              <div className="text-xs font-mono uppercase tracking-wider text-emerald-800 font-semibold">
                {isUrdu ? 'تجویز کردہ آسان علاج اور نگہداشت' : 'Recommended Organic Care'}
              </div>
              <div className="p-4 rounded-2xl bg-[#edf5ef] border border-emerald-200 text-xs text-[#13281c]">
                <ul className="space-y-1.5 list-disc list-inside">
                  {selectedDisease.treatment.organic.map((step, idx) => (
                    <li key={idx} className="leading-relaxed">{step}</li>
                  ))}
                </ul>
              </div>
            </div>

            {onSelectForDiagnosis && (
              <div className="pt-2">
                <button
                  onClick={() => onSelectForDiagnosis(selectedDisease.id)}
                  className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{t.library.testThisLeafBtn}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
