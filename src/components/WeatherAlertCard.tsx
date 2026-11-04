import React, { useState } from 'react';
import {
  Thermometer,
  Droplets,
  CloudSun,
  ShieldAlert,
  Wind,
  CheckCircle2,
  AlertTriangle,
  Sun
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const WeatherAlertCard: React.FC = () => {
  const { t, isUrdu } = useLanguage();
  const [selectedZone, setSelectedZone] = useState<'punjab' | 'sindh' | 'greenhouse'>('punjab');

  const microclimates = {
    punjab: {
      name: t.weather.microclimatePunjab,
      temp: '25°C / 77°F',
      humidity: 64,
      condition: t.weather.conditionSunny,
      dewPoint: '17°C',
      blightRisk: 'Moderate' as const,
      blightAdvice: isUrdu
        ? 'ہوا میں نمی مناسب ہے لیکن شام کے وقت پتوں پر پانی نہ ڈالیں تاکہ پھپھوندی کو موقع نہ ملے۔'
        : 'Safe daylight warmth. Avoid overhead sprinkling in the evening to prevent prolonged leaf wetness.'
    },
    sindh: {
      name: t.weather.microclimateSindh,
      temp: '29°C / 84°F',
      humidity: 78,
      condition: t.weather.conditionHumid,
      dewPoint: '24°C',
      blightRisk: 'High' as const,
      blightAdvice: isUrdu
        ? 'انتباہ: زیادہ نمی (78%) کی وجہ سے لیٹ بلائیٹ اور بیکٹیریل اسپاٹ کا خطرہ زیادہ ہے۔ ہوا کی نکاسی بہتر کریں۔'
        : 'High humidity (>75%) accelerates fungal spore multiplication. Ensure 50cm vine spacing and mulch soil.'
    },
    greenhouse: {
      name: t.weather.microclimateGreenhouse,
      temp: '22°C / 72°F',
      humidity: 52,
      condition: isUrdu ? 'کنٹرول شدہ ماحول' : 'Climate Controlled',
      dewPoint: '12°C',
      blightRisk: 'Low' as const,
      blightAdvice: isUrdu
        ? 'گرین ہاؤس میں فنگس کا خطرہ بہت کم ہے۔ متوازن نمی ٹماٹر کی پیداوار کے لیے بہترین ہے۔'
        : 'Optimal growth conditions. Low blight spore risk with continuous drip irrigation.'
    }
  };

  const currentZone = microclimates[selectedZone];

  return (
    <div id="weather" className="w-full bg-white border border-[#cbdcd0] rounded-3xl p-6 sm:p-8 shadow-sm text-left">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-6">
        <div>
          <div className="text-xs font-mono uppercase tracking-wider text-emerald-800 font-semibold mb-1">
            {t.weather.badge}
          </div>
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#13281c]">
            {t.weather.title}
          </h3>
          <p className="text-xs sm:text-sm text-[#3d5947] mt-1 max-w-2xl">
            {t.weather.subtitle}
          </p>
        </div>

        {/* Zone Selector Buttons */}
        <div className="flex items-center gap-1.5 p-1 bg-[#f4f7f5] rounded-2xl border border-[#cbdcd0] self-stretch sm:self-auto overflow-x-auto">
          {(['punjab', 'sindh', 'greenhouse'] as const).map((zKey) => (
            <button
              key={zKey}
              onClick={() => setSelectedZone(zKey)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all whitespace-nowrap ${
                selectedZone === zKey
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-[#3d5947] hover:text-[#13281c]'
              }`}
            >
              {zKey === 'punjab'
                ? isUrdu
                  ? 'پنجاب بیلٹ'
                  : 'Punjab Belt'
                : zKey === 'sindh'
                ? isUrdu
                  ? 'سندھ بیلٹ'
                  : 'Sindh Belt'
                : isUrdu
                ? 'گرین ہاؤس'
                : 'Greenhouse'}
            </button>
          ))}
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Metric 1: Temp */}
        <div className="p-4 rounded-2xl bg-[#faf8f2] border border-[#cbdcd0] flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
            <Thermometer className="w-5 h-5 text-amber-700" />
          </div>
          <div>
            <div className="text-[11px] font-mono text-[#3d5947]">
              {t.weather.tempLabel}
            </div>
            <div className="font-mono text-lg font-bold text-[#13281c]">
              {currentZone.temp}
            </div>
          </div>
        </div>

        {/* Metric 2: Humidity */}
        <div className="p-4 rounded-2xl bg-[#faf8f2] border border-[#cbdcd0] flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-800 flex items-center justify-center shrink-0">
            <Droplets className="w-5 h-5 text-sky-700" />
          </div>
          <div>
            <div className="text-[11px] font-mono text-[#3d5947]">
              {t.weather.humidityLabel}
            </div>
            <div className="font-mono text-lg font-bold text-[#13281c]">
              {currentZone.humidity}%
            </div>
          </div>
        </div>

        {/* Metric 3: Dew Point */}
        <div className="p-4 rounded-2xl bg-[#faf8f2] border border-[#cbdcd0] flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
            <CloudSun className="w-5 h-5 text-emerald-700" />
          </div>
          <div>
            <div className="text-[11px] font-mono text-[#3d5947]">
              {t.weather.dewLabel}
            </div>
            <div className="font-mono text-lg font-bold text-[#13281c]">
              {currentZone.dewPoint}
            </div>
          </div>
        </div>

        {/* Metric 4: Blight Risk */}
        <div
          className={`p-4 rounded-2xl border flex items-center gap-3.5 ${
            currentZone.blightRisk === 'High'
              ? 'bg-rose-50/70 border-rose-300'
              : currentZone.blightRisk === 'Moderate'
              ? 'bg-amber-50/70 border-amber-300'
              : 'bg-[#edf5ef] border-emerald-300'
          }`}
        >
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
              currentZone.blightRisk === 'High'
                ? 'bg-rose-200 text-rose-800'
                : currentZone.blightRisk === 'Moderate'
                ? 'bg-amber-200 text-amber-800'
                : 'bg-emerald-200 text-emerald-800'
            }`}
          >
            {currentZone.blightRisk === 'High' ? (
              <ShieldAlert className="w-5 h-5 text-rose-700" />
            ) : currentZone.blightRisk === 'Moderate' ? (
              <AlertTriangle className="w-5 h-5 text-amber-700" />
            ) : (
              <CheckCircle2 className="w-5 h-5 text-emerald-700" />
            )}
          </div>
          <div>
            <div className="text-[11px] font-mono text-[#3d5947]">
              {t.weather.blightRiskLabel}
            </div>
            <div
              className={`font-mono text-lg font-bold uppercase ${
                currentZone.blightRisk === 'High'
                  ? 'text-rose-700'
                  : currentZone.blightRisk === 'Moderate'
                  ? 'text-amber-700'
                  : 'text-emerald-700'
              }`}
            >
              {currentZone.blightRisk}
            </div>
          </div>
        </div>
      </div>

      {/* Advisory Message */}
      <div className="p-4 rounded-2xl bg-[#fcfbf9] border border-[#cbdcd0] flex items-start gap-3 text-xs text-[#3d5947]">
        <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong className="text-[#13281c] font-semibold">
            {isUrdu ? 'زرعی موسمیاتی مشورہ: ' : 'Microclimate Agronomic Guidance: '}
          </strong>
          {currentZone.blightAdvice}
        </div>
      </div>
    </div>
  );
};
