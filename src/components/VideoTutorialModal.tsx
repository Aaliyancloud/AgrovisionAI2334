import React, { useEffect } from 'react';
import { X, Play, CheckCircle2, Sparkles, Smartphone, Eye } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface VideoTutorialModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTryScanner?: () => void;
}

export const VideoTutorialModal: React.FC<VideoTutorialModalProps> = ({
  isOpen,
  onClose,
  onTryScanner
}) => {
  const { isUrdu } = useLanguage();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl bg-[#faf8f2] border border-[#cbdcd0] rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#cbdcd0] bg-white">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <Play className="w-4 h-4 fill-emerald-800" />
            </div>
            <div>
              <h3 className="font-display font-bold text-base sm:text-lg text-[#13281c]">
                {isUrdu ? 'فیلڈ گائیڈ: پودے کی بیماری کیسے پہچانیں؟' : 'Field Tutorial: How to Scan Tomato Leaves'}
              </h3>
              <p className="text-xs text-[#3d5947]">
                {isUrdu ? 'کھیت میں کھڑے ہو کر فوری تشخیصی عمل کی عملی ویڈیو' : 'Live field demonstration of quick mobile scanning in the garden'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#3d5947] hover:text-[#13281c] rounded-xl hover:bg-[#edf5ef] transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player Container */}
        <div className="relative w-full bg-black aspect-video flex items-center justify-center overflow-hidden">
          <video
            src="/assets/aistudio/tutorial-demo__2__9e77b096.mp4"
            className="w-full h-full object-contain"
            controls
            autoPlay
            playsInline
          >
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Action & Walkthrough Notes */}
        <div className="p-6 bg-white flex flex-col gap-4 border-t border-[#cbdcd0]">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-[#edf5ef] border border-emerald-200">
              <Eye className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-[#13281c] block mb-0.5">
                  {isUrdu ? '1. پتے کی علامات دیکھیں' : '1. Spot the Leaf'}
                </span>
                <span className="text-[#3d5947]">
                  {isUrdu ? 'پتے پر پیلے یا بھورے دھبے تلاش کریں' : 'Notice spots or curling on lower tomato leaves'}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-[#edf5ef] border border-emerald-200">
              <Smartphone className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-[#13281c] block mb-0.5">
                  {isUrdu ? '2. موبائل سے اسکین کریں' : '2. Scan with Phone'}
                </span>
                <span className="text-[#3d5947]">
                  {isUrdu ? 'کیمرے سے پتے کی واضح تصویر لیں' : 'Hold phone steady under natural sunlight'}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-[#edf5ef] border border-emerald-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-[#13281c] block mb-0.5">
                  {isUrdu ? '3. فوری قدرتی علاج' : '3. Immediate Care'}
                </span>
                <span className="text-[#3d5947]">
                  {isUrdu ? 'اے آئی کے مطابق نیم اسپرے یا کٹائی کریں' : 'Apply organic treatment before spores spread'}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-semibold text-[#3d5947] hover:text-[#13281c] transition-colors"
            >
              {isUrdu ? 'بند کریں' : 'Close'}
            </button>
            {onTryScanner && (
              <button
                onClick={() => {
                  onClose();
                  onTryScanner();
                }}
                className="px-5 py-2.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-sm transition-all flex items-center gap-2 active:scale-95"
              >
                <Sparkles className="w-4 h-4" />
                <span>{isUrdu ? 'ابھی پتے کا معائنہ کریں' : 'Try Scanner Now'}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
