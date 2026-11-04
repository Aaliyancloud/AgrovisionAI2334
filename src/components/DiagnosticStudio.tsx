import React, { useState, useRef, useEffect } from 'react';
import {
  UploadCloud,
  Camera,
  Layers,
  Sparkles,
  AlertTriangle,
  CheckCircle,
  RotateCcw,
  Printer,
  ShieldCheck,
  Eye,
  Crosshair,
  HelpCircle,
  Leaf,
  Play,
  CheckCircle2,
  X
} from 'lucide-react';
import { DiagnosisResult, SampleLeaf } from '../types/disease';
import { STEAM_EXHIBITION_SAMPLES } from '../data/tomatoDiseases';
import { analyzeLeafImage } from '../services/diseaseClassifier';
import { useLanguage } from '../context/LanguageContext';
import { VideoTutorialModal } from './VideoTutorialModal';

export const DiagnosticStudio: React.FC = () => {
  const { t, isUrdu } = useLanguage();
  const [activeInputTab, setActiveInputTab] = useState<'samples' | 'upload' | 'camera'>('samples');
  const [selectedImageUri, setSelectedImageUri] = useState<string | null>(STEAM_EXHIBITION_SAMPLES[1].imageUrl);
  const [selectedSampleId, setSelectedSampleId] = useState<string>(STEAM_EXHIBITION_SAMPLES[1].id);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisProgress, setAnalysisProgress] = useState<number>(0);
  const [analysisStepText, setAnalysisStepText] = useState<string>('');
  const [diagnosticResult, setDiagnosticResult] = useState<DiagnosisResult | null>(null);
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState<boolean>(false);
  const [showSuccessToast, setShowSuccessToast] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);

  const stopCamera = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }
    setIsCameraActive(false);
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const handleStartCamera = async () => {
    setCameraError(null);
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error(isUrdu ? 'براؤزر میں کیمرہ سپورٹ دستیاب نہیں ہے۔' : 'Camera is not supported in this browser environment.');
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false
      });
      mediaStreamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setIsCameraActive(true);
    } catch (err: any) {
      setCameraError(
        err.message ||
          (isUrdu
            ? 'کیمرے تک رسائی ممکن نہیں۔ برائے مہربانی اجازت دیں یا تصویر اپلوڈ کریں۔'
            : 'Unable to access camera. Please allow camera permissions or upload a picture.')
      );
      setIsCameraActive(false);
    }
  };

  const handleCaptureFromCamera = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth || 640;
    canvas.height = videoRef.current.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const dataUri = canvas.toDataURL('image/jpeg', 0.9);
      setSelectedImageUri(dataUri);
      stopCamera();
      runDiagnostic(dataUri, 'camera');
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUri = event.target?.result as string;
      setSelectedImageUri(dataUri);
      runDiagnostic(dataUri, 'upload');
    };
    reader.readAsDataURL(file);
    // Reset file input so same file can be selected again if needed
    e.target.value = '';
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUri = event.target?.result as string;
      setSelectedImageUri(dataUri);
      runDiagnostic(dataUri, 'upload');
    };
    reader.readAsDataURL(file);
  };

  const handleSelectSample = (sample: SampleLeaf) => {
    setSelectedSampleId(sample.id);
    setSelectedImageUri(sample.imageUrl);

    let suggestedDiseaseId = 'early_blight';
    if (sample.id === 'sample_healthy') suggestedDiseaseId = 'healthy';
    if (sample.id === 'sample_late_blight') suggestedDiseaseId = 'late_blight';
    if (sample.id === 'sample_bacterial_spot') suggestedDiseaseId = 'bacterial_spot';
    if (sample.id === 'sample_yellow_curl') suggestedDiseaseId = 'yellow_leaf_curl';

    runDiagnostic(sample.imageUrl, 'sample', suggestedDiseaseId);
  };

  const runDiagnostic = async (
    imageUri: string,
    source: 'upload' | 'camera' | 'sample',
    suggestedDiseaseId?: string
  ) => {
    setIsAnalyzing(true);
    setShowSuccessToast(false);
    setAnalysisProgress(15);
    setAnalysisStepText(
      isUrdu
        ? 'تصویر کی تصدیق کی جا رہی ہے کہ یہ پودے کا پتہ ہے...'
        : 'Checking photo to make sure it is a plant leaf...'
    );

    setTimeout(() => {
      setAnalysisProgress(45);
      setAnalysisStepText(
        isUrdu
          ? 'پتے کے رنگوں (سبز، پیلے اور بھورے دھبوں) کا تجزیہ...'
          : 'Checking leaf colors (greens, yellows, and brown spots)...'
      );
    }, 250);

    setTimeout(() => {
      setAnalysisProgress(75);
      setAnalysisStepText(
        isUrdu
          ? 'دھبوں کے سائز اور بیماری کے پیٹرن کی پیمائش...'
          : 'Measuring spot size and finding disease pattern...'
      );
    }, 500);

    setTimeout(() => {
      setAnalysisProgress(92);
      setAnalysisStepText(
        isUrdu
          ? 'پودے کی صحت یابی اور قدرتی علاج کا لائحہ عمل تیار کیا جا رہا ہے...'
          : 'Writing your easy plant care and healing plan...'
      );
    }, 750);

    setTimeout(async () => {
      const result = await analyzeLeafImage(imageUri, source, suggestedDiseaseId);
      setDiagnosticResult(result);
      setAnalysisProgress(100);
      setIsAnalyzing(false);

      if (result.isPlantLeaf) {
        setShowSuccessToast(true);
        // Auto-dismiss after 4.5 seconds
        setTimeout(() => setShowSuccessToast(false), 4500);
      }
    }, 1000);
  };

  useEffect(() => {
    if (selectedImageUri && !diagnosticResult) {
      runDiagnostic(selectedImageUri, 'sample', 'early_blight');
    }
  }, []);

  const handlePrint = () => {
    window.print();
  };

  // Quick Urdu disease label helpers
  const getUrduDiseaseName = (id: string, def: string) => {
    if (id === 'early_blight') return 'ارلی بلائیٹ (پتوں کا ابتدائی جھلساؤ)';
    if (id === 'late_blight') return 'لیٹ بلائیٹ (پتوں کا شدید جھلساؤ)';
    if (id === 'bacterial_spot') return 'بیکٹیریل اسپاٹ (پتوں کے سیاہ دھبے)';
    if (id === 'yellow_leaf_curl') return 'پیلا پتہ مروڑ وائرس';
    if (id === 'healthy') return 'صحت مند ٹماٹر کا پودا';
    return def;
  };

  return (
    <section id="diagnostic" className="relative w-full py-20 bg-[#f4f1e8] border-t border-[#cbdcd0]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="text-xs font-mono uppercase tracking-wider text-emerald-800 font-semibold mb-2">
            {t.scanner.badge}
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#13281c] tracking-tight leading-tight text-balance">
            {t.scanner.title}
          </h2>
          <p className="mt-4 text-[#3d5947] text-base sm:text-lg leading-relaxed">
            {t.scanner.subtitle}
          </p>

          {/* Video Guide Shortcut Button */}
          <div className="mt-4 flex items-center justify-center">
            <button
              onClick={() => setIsVideoModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-[#edf5ef] border border-emerald-300 text-xs font-semibold text-emerald-900 transition-all shadow-sm active:scale-95 group"
            >
              <div className="w-5 h-5 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-800 group-hover:bg-emerald-200 transition-colors">
                <Play className="w-3 h-3 fill-emerald-800" />
              </div>
              <span>{t.scanner.quickVideoBtn}</span>
            </button>
          </div>
        </div>

        {/* Studio Workspace Card */}
        <div className="relative bg-white border border-[#cbdcd0] rounded-3xl p-6 lg:p-8 shadow-sm">
          {/* Subtle Success Toast Notification */}
          {showSuccessToast && (
            <div className="absolute top-6 left-1/2 -translate-x-1/2 z-30 max-w-md w-[90%] bg-emerald-900 text-white px-4 py-3 rounded-2xl shadow-xl border border-emerald-600 flex items-center justify-between gap-3 animate-in fade-in slide-in-from-top-4 duration-300">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-emerald-300" />
                </div>
                <div>
                  <div className="font-bold text-xs sm:text-sm text-emerald-100">
                    {t.scanner.successToastTitle}
                  </div>
                  <div className="text-[11px] text-emerald-200/90">
                    {t.scanner.successToastDesc}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setShowSuccessToast(false)}
                className="text-emerald-300 hover:text-white p-1 rounded-lg transition-colors"
                aria-label="Dismiss toast"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Top Mode Segmented Selector (3 Clear Options) */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#cbdcd0]/60">
            <div className="flex items-center gap-1.5 p-1 bg-[#f4f7f5] rounded-2xl border border-[#cbdcd0]">
              <button
                onClick={() => {
                  stopCamera();
                  setActiveInputTab('samples');
                }}
                className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
                  activeInputTab === 'samples'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-[#3d5947] hover:text-[#13281c]'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>{t.scanner.tabSamples}</span>
              </button>

              <button
                onClick={() => {
                  stopCamera();
                  setActiveInputTab('upload');
                }}
                className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
                  activeInputTab === 'upload'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-[#3d5947] hover:text-[#13281c]'
                }`}
              >
                <UploadCloud className="w-3.5 h-3.5" />
                <span>{t.scanner.tabUpload}</span>
              </button>

              <button
                onClick={() => {
                  setActiveInputTab('camera');
                  handleStartCamera();
                }}
                className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
                  activeInputTab === 'camera'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-[#3d5947] hover:text-[#13281c]'
                }`}
              >
                <Camera className="w-3.5 h-3.5" />
                <span>{t.scanner.tabCamera}</span>
              </button>
            </div>

            <div className="flex items-center gap-2 text-xs text-emerald-800 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>{isUrdu ? 'اسکینر تیار ہے' : 'Plant Checker Ready'}</span>
            </div>
          </div>

          {/* Input Method Content */}
          <div className="py-6">
            {/* 1. Test Leaves (Samples) */}
            {activeInputTab === 'samples' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-[#3d5947]">
                  <span>{isUrdu ? 'کسی بھی پتے پر کلک کریں تاکہ اے آئی فوری معائنہ کرے:' : 'Click any leaf below to see the AI scan it:'}</span>
                  <span className="font-semibold text-emerald-800">{isUrdu ? '5 آزمائشی پتے' : '5 Example Leaves'}</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
                  {STEAM_EXHIBITION_SAMPLES.map((sample) => (
                    <button
                      key={sample.id}
                      onClick={() => handleSelectSample(sample)}
                      className={`group relative p-2.5 rounded-2xl border text-left transition-all overflow-hidden ${
                        selectedSampleId === sample.id
                          ? 'border-emerald-600 bg-[#edf5ef] shadow-sm'
                          : 'border-[#cbdcd0] bg-[#fcfbf9] hover:border-emerald-300'
                      }`}
                    >
                      <div className="relative h-28 w-full rounded-xl overflow-hidden mb-2 bg-[#e2ede5]">
                        <img
                          src={sample.imageUrl}
                          alt={sample.title}
                          className="w-full h-full object-cover transition-transform group-hover:scale-105"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded text-[10px] font-mono bg-white/90 text-emerald-800 border border-emerald-200">
                          {sample.pathogen}
                        </div>
                      </div>

                      <div className="font-display text-xs font-bold text-[#13281c] truncate">
                        {isUrdu ? getUrduDiseaseName(sample.id.replace('sample_', ''), sample.title) : sample.title}
                      </div>
                      <div className="text-[11px] text-[#3d5947] truncate mt-0.5">
                        {sample.condition}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 2. Upload Box */}
            {activeInputTab === 'upload' && (
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-[#cbdcd0] hover:border-emerald-500 rounded-3xl p-10 text-center cursor-pointer transition-colors bg-[#fcfbf9] flex flex-col items-center justify-center gap-3"
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                />
                <div className="w-14 h-14 rounded-2xl bg-[#edf5ef] border border-emerald-200 flex items-center justify-center text-emerald-700">
                  <UploadCloud className="w-7 h-7" />
                </div>
                <div className="font-display text-lg font-bold text-[#13281c]">
                  {t.scanner.dragDropText}, <span className="text-emerald-700 underline">{t.scanner.orBrowse}</span>
                </div>
                <p className="text-xs text-[#3d5947] max-w-md">
                  {isUrdu
                    ? 'جے پی جی، پی این جی اور ویب پی تصاویر سپورٹڈ ہیں۔ برائے مہربانی پتے کو اچھی روشنی میں رکھیں۔'
                    : 'Works with JPG, PNG, and WEBP photos. Please make sure the leaf is in focus and well lit!'}
                </p>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    fileInputRef.current?.click();
                  }}
                  className="mt-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl shadow-sm transition-all"
                >
                  {t.scanner.selectFileBtn}
                </button>
              </div>
            )}

            {/* 3. Live Camera */}
            {activeInputTab === 'camera' && (
              <div className="relative rounded-3xl overflow-hidden bg-[#13281c] border border-[#cbdcd0] flex flex-col items-center justify-center min-h-[380px]">
                {cameraError ? (
                  <div className="p-8 text-center max-w-md bg-white rounded-2xl m-4">
                    <AlertTriangle className="w-10 h-10 text-amber-600 mx-auto mb-3" />
                    <div className="text-sm font-bold text-[#13281c]">{isUrdu ? 'کیمرہ الرٹ' : 'Camera Notice'}</div>
                    <p className="text-xs text-[#3d5947] mt-2">{cameraError}</p>
                    <button
                      onClick={handleStartCamera}
                      className="mt-4 px-4 py-2 bg-emerald-600 text-white text-xs font-semibold rounded-xl hover:bg-emerald-700"
                    >
                      {isUrdu ? 'دوبارہ کیمرہ شروع کریں' : 'Try Camera Again'}
                    </button>
                  </div>
                ) : (
                  <div className="relative w-full h-[400px] flex items-center justify-center">
                    <video
                      ref={videoRef}
                      playsInline
                      muted
                      autoPlay
                      className="w-full h-full object-contain"
                    />

                    {/* Camera Target Frame Overlay */}
                    <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                      <div className="w-64 h-64 border-2 border-emerald-400 rounded-3xl relative shadow-2xl">
                        <div className="absolute top-2 left-2 text-[10px] font-mono text-emerald-950 bg-white/90 px-2 py-0.5 rounded-md font-semibold">
                          {isUrdu ? 'پتہ یہاں رکھیں' : 'HOLD LEAF HERE'}
                        </div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/70">
                          <Crosshair className="w-8 h-8" />
                        </div>
                      </div>
                    </div>

                    <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-3">
                      <button
                        onClick={handleCaptureFromCamera}
                        className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-lg transition-all flex items-center gap-2 active:scale-95"
                      >
                        <Camera className="w-4 h-4" />
                        <span>{t.scanner.captureBtn}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Analysis Progress Animation */}
          {isAnalyzing && (
            <div className="py-8 border-t border-[#cbdcd0]/60">
              <div className="max-w-xl mx-auto space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-emerald-800 flex items-center gap-2 font-medium">
                    <Sparkles className="w-4 h-4 animate-spin text-emerald-600" />
                    <span>{analysisStepText}</span>
                  </span>
                  <span className="text-[#13281c] font-bold">{analysisProgress}%</span>
                </div>

                <div className="w-full h-2.5 rounded-full bg-[#edf5ef] border border-[#cbdcd0] overflow-hidden">
                  <div
                    className="h-full bg-emerald-600 transition-all duration-300 rounded-full"
                    style={{ width: `${analysisProgress}%` }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* FRIENDLY NON-LEAF VALIDATION SCREEN */}
          {diagnosticResult && !isAnalyzing && !diagnosticResult.isPlantLeaf && (
            <div className="mt-6 pt-8 border-t border-[#cbdcd0]/60 text-center">
              <div className="max-w-xl mx-auto p-8 bg-[#edf5ef] border border-emerald-300 rounded-3xl shadow-sm">
                <div className="w-16 h-16 rounded-3xl bg-white border border-emerald-200 flex items-center justify-center text-emerald-700 mx-auto mb-4 shadow-sm">
                  <Leaf className="w-8 h-8 text-emerald-600" />
                </div>

                <h3 className="font-display text-2xl font-bold text-[#13281c] mb-2">
                  {t.scanner.notLeafTitle} 😊
                </h3>

                <p className="text-sm text-[#3d5947] leading-relaxed mb-6">
                  {isUrdu ? t.scanner.notLeafAdvice : diagnosticResult.validationMessage}
                </p>

                <div className="p-4 bg-white rounded-2xl border border-[#cbdcd0] text-xs text-[#3d5947] mb-6 text-left">
                  <div className="font-semibold text-[#13281c] mb-1.5 flex items-center gap-1.5">
                    <HelpCircle className="w-4 h-4 text-emerald-700" />
                    <span>{isUrdu ? 'ایسا کیوں ہوا؟' : 'Why did this happen?'}</span>
                  </div>
                  {isUrdu
                    ? 'ہمارا اسکینر پودے میں موجود کلوروفیل اور پتوں کی فطری ساخت تلاش کرتا ہے۔ اگر غلطی سے کسی کمرے، انسان یا جانور کی تصویر آ جائے تو غلط تشخیص کی بجائے اسکینر آپ کو پودے کی تصویر دینے کی یاد دہانی کراتا ہے۔'
                    : 'Our scanner looks for green plant chlorophyll and leaf shapes. If you accidentally uploaded a photo of yourself, a room, or another object, the scanner will kindly ask you for a plant photo instead of giving a wrong diagnosis!'}
                </div>

                {/* 1-click test button */}
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={() => {
                      setActiveInputTab('samples');
                      handleSelectSample(STEAM_EXHIBITION_SAMPLES[1]);
                    }}
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl shadow-sm transition-all"
                  >
                    {isUrdu ? 'آزمائشی پتہ چیک کریں (ارلی بلائیٹ)' : 'Try Sample Leaf (Early Blight)'}
                  </button>

                  <button
                    onClick={() => {
                      setActiveInputTab('samples');
                      handleSelectSample(STEAM_EXHIBITION_SAMPLES[0]);
                    }}
                    className="px-5 py-2.5 bg-white border border-[#cbdcd0] hover:bg-[#faf8f2] text-[#13281c] font-semibold text-xs rounded-xl transition-all"
                  >
                    {isUrdu ? 'صحت مند پتہ آزمائیں' : 'Try Healthy Leaf'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* REAL PLANT DIAGNOSIS OUTPUT DASHBOARD */}
          {diagnosticResult && !isAnalyzing && diagnosticResult.isPlantLeaf && (
            <div className="mt-6 pt-8 border-t border-[#cbdcd0]/60">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left: Scanned Image with Highlighted Spots */}
                <div className="lg:col-span-5 flex flex-col gap-4">
                  <div className="relative rounded-3xl overflow-hidden border border-[#cbdcd0] bg-[#fcfbf9] aspect-square shadow-sm">
                    <img
                      src={diagnosticResult.imageUri}
                      alt="Scanned tomato leaf"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />

                    {/* Laser Line */}
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="w-full h-0.5 bg-emerald-500 shadow-[0_0_8px_#10b981] animate-[bounce_3s_infinite]" />
                    </div>

                    {/* Detected Spots */}
                    {diagnosticResult.detectedLesions.map((box, i) => (
                      <div
                        key={i}
                        className="absolute border-2 border-amber-500 bg-amber-400/20 rounded-md"
                        style={{
                          left: `${box.x}%`,
                          top: `${box.y}%`,
                          width: `${box.width}%`,
                          height: `${box.height}%`
                        }}
                      >
                        <div className="absolute -top-5 left-0 px-1.5 py-0.5 rounded text-[9px] font-mono bg-white text-amber-900 border border-amber-400 font-semibold shadow-sm whitespace-nowrap">
                          {box.label}
                        </div>
                      </div>
                    ))}

                    <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-xl text-xs bg-white/90 backdrop-blur-md text-emerald-950 border border-emerald-200 font-medium flex items-center gap-1.5 shadow-sm">
                      <Eye className="w-3.5 h-3.5 text-emerald-700" />
                      <span>
                        {isUrdu
                          ? `${diagnosticResult.detectedLesions.length} متاثرہ مقامات نشان زد`
                          : `${diagnosticResult.detectedLesions.length} Problem Spots Mapped`}
                      </span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-[#faf8f2] border border-[#cbdcd0] flex items-center justify-between text-xs text-[#3d5947]">
                    <span>
                      {isUrdu ? 'تجزیاتی رفتار: ' : 'Checked in: '}
                      <strong className="text-[#13281c]">{diagnosticResult.processingTimeMs}ms</strong>
                    </span>
                    <span>
                      {isUrdu ? 'حالت: ' : 'Status: '}
                      <strong className="text-emerald-700">{isUrdu ? 'مکمل' : 'Complete'}</strong>
                    </span>
                  </div>
                </div>

                {/* Right: Plain English / Urdu Results & Easy Treatment Plan */}
                <div className="lg:col-span-7 flex flex-col gap-5 text-left">
                  {/* Diagnosis Headline */}
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-mono font-medium text-emerald-800 mb-1">
                        <span>{isUrdu ? 'اے آئی کا نتیجہ' : 'WHAT WE FOUND'}</span>
                        <span aria-hidden="true">·</span>
                        <span className="uppercase">{diagnosticResult.pathogenType}</span>
                      </div>
                      <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#13281c]">
                        {isUrdu
                          ? getUrduDiseaseName(diagnosticResult.diseaseId, diagnosticResult.diseaseName)
                          : diagnosticResult.diseaseName}
                      </h3>
                      <div className="text-xs text-[#3d5947] italic mt-0.5">
                        {isUrdu ? 'سائنسی نام: ' : 'Scientific: '}
                        {diagnosticResult.scientificName}
                      </div>
                    </div>

                    {/* Confidence & Severity */}
                    <div className="flex items-center gap-4 bg-[#f4f7f5] px-4 py-2 rounded-2xl border border-[#cbdcd0]">
                      <div>
                        <div className="text-[10px] font-mono text-[#3d5947]">
                          {isUrdu ? 'درستگی' : 'CERTAINTY'}
                        </div>
                        <div className="font-mono text-xl font-bold text-emerald-700">
                          {diagnosticResult.confidence}%
                        </div>
                      </div>

                      <div className="h-7 w-px bg-[#cbdcd0]" />

                      <div>
                        <div className="text-[10px] font-mono text-[#3d5947]">
                          {isUrdu ? 'شدت' : 'STAGE'}
                        </div>
                        <div
                          className={`font-mono text-sm font-bold uppercase ${
                            diagnosticResult.severity === 'Severe'
                              ? 'text-rose-600'
                              : diagnosticResult.severity === 'Moderate'
                              ? 'text-amber-600'
                              : 'text-emerald-700'
                          }`}
                        >
                          {diagnosticResult.severity}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="p-4 rounded-2xl bg-[#edf5ef] border border-emerald-200 text-sm text-[#13281c] leading-relaxed">
                    {diagnosticResult.summary}
                  </div>

                  {/* Observations */}
                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-wider text-emerald-800 font-semibold mb-2">
                      {isUrdu ? 'کیمرے نے کیا علامات نوٹ کیں:' : 'What the camera noticed:'}
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#3d5947]">
                      {diagnosticResult.keyObservations.map((obs, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2 p-2.5 rounded-xl bg-white border border-[#cbdcd0]"
                        >
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{obs}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 4 Easy Treatment Boxes */}
                  <div className="p-5 rounded-3xl bg-[#fcfbf9] border border-[#cbdcd0]">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-emerald-800 font-semibold mb-3 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-700" />
                      <span>{t.scanner.treatmentTitle}</span>
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-xs">
                      {/* Organic Solutions */}
                      <div className="p-3.5 rounded-2xl bg-white border border-emerald-200">
                        <div className="font-bold text-emerald-900 mb-2 flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-emerald-500" />
                          <span>{isUrdu ? 'قدرتی اور گھریلو علاج' : 'Natural & Household Remedies'}</span>
                        </div>
                        <ul className="space-y-1.5 text-[#3d5947] list-disc list-inside">
                          {diagnosticResult.treatment.organic.map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      </div>

                      {/* Plant Medicines */}
                      <div className="p-3.5 rounded-2xl bg-white border border-amber-200">
                        <div className="font-bold text-amber-900 mb-2 flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-amber-500" />
                          <span>{isUrdu ? 'پودے کے اسپرے اور دیکھ بھال' : 'Plant Sprays & Care'}</span>
                        </div>
                        <ul className="space-y-1.5 text-[#3d5947] list-disc list-inside">
                          {diagnosticResult.treatment.chemical.map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      </div>

                      {/* Pruning & Garden Habits */}
                      <div className="p-3.5 rounded-2xl bg-white border border-[#cbdcd0]">
                        <div className="font-bold text-[#13281c] mb-2 flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-emerald-500" />
                          <span>{isUrdu ? 'پتوں کی کٹائی اور پانی کے اصول' : 'Trimming & Watering Tips'}</span>
                        </div>
                        <ul className="space-y-1.5 text-[#3d5947] list-disc list-inside">
                          {diagnosticResult.treatment.cultural.map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      </div>

                      {/* Prevention */}
                      <div className="p-3.5 rounded-2xl bg-white border border-[#cbdcd0]">
                        <div className="font-bold text-[#13281c] mb-2 flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-emerald-500" />
                          <span>{isUrdu ? 'آئندہ بیماری سے بچاؤ کی تدابیر' : 'How to Stop It Next Time'}</span>
                        </div>
                        <ul className="space-y-1.5 text-[#3d5947] list-disc list-inside">
                          {diagnosticResult.treatment.prevention.map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                    <button
                      onClick={handlePrint}
                      className="px-4 py-2 text-xs font-semibold text-[#13281c] hover:text-emerald-800 bg-white border border-[#cbdcd0] rounded-xl transition-all flex items-center gap-2 shadow-sm"
                    >
                      <Printer className="w-3.5 h-3.5 text-emerald-700" />
                      <span>{t.scanner.printReportBtn}</span>
                    </button>

                    <button
                      onClick={() => {
                        if (selectedImageUri) {
                          runDiagnostic(selectedImageUri, diagnosticResult.sourceType);
                        }
                      }}
                      className="px-4 py-2 text-xs font-medium text-[#3d5947] hover:text-[#13281c] bg-[#edf5ef] rounded-xl transition-all flex items-center gap-1.5"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>{t.scanner.testAnotherBtn}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Embedded Video Guide Modal */}
      <VideoTutorialModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        onTryScanner={() => {
          setIsVideoModalOpen(false);
          setActiveInputTab('samples');
        }}
      />
    </section>
  );
};
