import React, { useState, useEffect } from 'react';
import { Key, ExternalLink, CheckCircle2, Copy, X, ShieldCheck, Sparkles, AlertCircle } from 'lucide-react';
import { Language } from '../types';

interface ApiKeyGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  currentApiKey: string;
  onSaveApiKey: (key: string) => void;
}

export const ApiKeyGuideModal: React.FC<ApiKeyGuideModalProps> = ({
  isOpen,
  onClose,
  language,
  currentApiKey,
  onSaveApiKey,
}) => {
  const [inputKey, setInputKey] = useState(currentApiKey || '');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [showInnerBanner, setShowInnerBanner] = useState(true);

  // Close modal when Escape key is pressed
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveApiKey(inputKey.trim());
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1800);
  };

  const copyStudioUrl = () => {
    navigator.clipboard.writeText('https://aistudio.google.com/app/apikey');
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div
      id="api-key-guide-modal"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200 cursor-pointer"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-7 space-y-6 shadow-2xl relative overflow-hidden cursor-default max-h-[90vh] overflow-y-auto"
      >
        
        {/* Header Bar */}
        <div className="flex items-start justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-200 dark:border-emerald-800 shrink-0 shadow-sm">
              <Key className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white flex items-center gap-2">
                <span>{language === 'ur' ? 'جیمنائی API کی حاصل کرنے کا طریقہ' : 'How to Get a Free Gemini API Key'}</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                {language === 'ur'
                  ? 'گوگل AI اسٹوڈیو سے 1 منٹ میں مفت API کی حاصل کریں'
                  : 'Step-by-step guide to generate a 100% free key in Google AI Studio'}
              </p>
            </div>
          </div>

          <button
            id="close-api-key-modal-btn"
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-slate-200 dark:border-slate-800"
            title="Close Guide (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Informational Banner with Dismiss Option */}
        {showInnerBanner && (
          <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 rounded-2xl flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <div className="text-xs text-emerald-900 dark:text-emerald-200 font-medium leading-relaxed">
                {language === 'ur'
                  ? 'فوری امداد میں تمام صوتی اور فرسٹ ایڈ سہولیات بالکل مفت ہیں۔ آپ کی API کی صرف آپ کے براؤزر کے لوکل اسٹوریج میں محفوظ رہتی ہے۔'
                  : 'Google offers generous free Gemini API tier with zero credit card required. Your personal API key stays strictly in your browser.'}
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowInnerBanner(false)}
              className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-800 p-1 shrink-0"
              title="Dismiss note"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Step by Step Instructions */}
        <div className="space-y-3 text-xs text-slate-700 dark:text-slate-300">
          <h4 className="font-extrabold uppercase text-[11px] text-slate-500 dark:text-slate-400 tracking-wider">
            {language === 'ur' ? 'سادہ ۵ اقدامات:' : 'Follow These 5 Simple Steps:'}
          </h4>

          <ol className="space-y-3 font-medium">
            <li className="flex items-start gap-3 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-2xl border border-slate-100 dark:border-slate-800">
              <span className="w-6 h-6 rounded-xl bg-emerald-600 text-white font-extrabold text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                1
              </span>
              <div className="space-y-1.5 flex-1">
                <span className="font-bold text-slate-900 dark:text-white">
                  {language === 'ur' ? 'گوگل AI اسٹوڈیو کا صفحہ کھولیں:' : 'Open Google AI Studio Key Page:'}
                </span>
                <div className="flex items-center gap-2 pt-1">
                  <a
                    href="https://aistudio.google.com/app/apikey"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-sm transition-all"
                  >
                    <span>{language === 'ur' ? 'گوگل AI اسٹوڈیو کھولیں' : 'Open Google AI Studio'}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <button
                    type="button"
                    onClick={copyStudioUrl}
                    className="p-1.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
                    title="Copy URL"
                  >
                    {copiedLink ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </li>

            <li className="flex items-start gap-3 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-2xl border border-slate-100 dark:border-slate-800">
              <span className="w-6 h-6 rounded-xl bg-emerald-600 text-white font-extrabold text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                2
              </span>
              <div>
                <span className="font-bold text-slate-900 dark:text-white">
                  {language === 'ur' ? 'گوگل اکاؤنٹ سے سائن ان کریں' : 'Sign in with Google:'}
                </span>
                <p className="text-slate-500 dark:text-slate-400 mt-0.5">
                  {language === 'ur' ? 'اپنے کسی بھی عام جی میل یا گوگل اکاؤنٹ سے لاگ ان کریں۔' : 'Use any existing personal Gmail or Google account.'}
                </p>
              </div>
            </li>

            <li className="flex items-start gap-3 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-2xl border border-slate-100 dark:border-slate-800">
              <span className="w-6 h-6 rounded-xl bg-emerald-600 text-white font-extrabold text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                3
              </span>
              <div>
                <span className="font-bold text-slate-900 dark:text-white">
                  {language === 'ur' ? '"Create API Key" بٹن پر کلک کریں' : 'Click "Create API Key":'}
                </span>
                <p className="text-slate-500 dark:text-slate-400 mt-0.5">
                  {language === 'ur' ? 'صفحے پر موجود نیلے رنگ کے Create API Key بٹن کو دبائیں۔' : 'Press the blue "Create API key" button on top.'}
                </p>
              </div>
            </li>

            <li className="flex items-start gap-3 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-2xl border border-slate-100 dark:border-slate-800">
              <span className="w-6 h-6 rounded-xl bg-emerald-600 text-white font-extrabold text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                4
              </span>
              <div>
                <span className="font-bold text-slate-900 dark:text-white">
                  {language === 'ur' ? 'اپنی API کی کاپی کریں' : 'Copy Your API Key:'}
                </span>
                <p className="text-slate-500 dark:text-slate-400 mt-0.5 font-mono">
                  {language === 'ur' ? 'جنریٹ شدہ کوڈ (جو "AIzaSy..." سے شروع ہوتا ہے) کاپی کریں۔' : 'Copy the generated key string starting with AIzaSy...'}
                </p>
              </div>
            </li>

            <li className="flex items-start gap-3 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-2xl border border-slate-100 dark:border-slate-800">
              <span className="w-6 h-6 rounded-xl bg-emerald-600 text-white font-extrabold text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                5
              </span>
              <div className="w-full space-y-2">
                <span className="font-bold text-slate-900 dark:text-white">
                  {language === 'ur' ? 'نیچے کی چسپاں (Paste) کریں اور محفوظ کریں:' : 'Paste & Save Key Here:'}
                </span>

                {savedSuccess && (
                  <div className="p-2.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-200 rounded-xl font-extrabold text-xs flex items-center gap-1.5 border border-emerald-300 dark:border-emerald-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>{language === 'ur' ? 'API کی کامیابی سے محفوظ ہو گئی!' : 'Key saved successfully to localStorage!'}</span>
                  </div>
                )}

                <form onSubmit={handleSave} className="flex gap-2">
                  <input
                    id="guide-modal-api-key-input"
                    type="text"
                    value={inputKey}
                    onChange={(e) => setInputKey(e.target.value)}
                    placeholder="AIzaSy..."
                    className="flex-1 px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-mono text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <button
                    id="guide-modal-save-btn"
                    type="submit"
                    disabled={!inputKey.trim()}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-extrabold text-xs rounded-xl shadow-md transition-all shrink-0"
                  >
                    {language === 'ur' ? 'محفوظ کریں' : 'Save Key'}
                  </button>
                </form>
              </div>
            </li>
          </ol>
        </div>

        {/* Footer with Clear Close Option */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
          <span className="text-[11px] text-slate-400 font-medium">
            {language === 'ur' ? 'پریس Esc یا باہر کلک کر کے بند کریں' : 'Press Esc or click outside to close'}
          </span>

          <button
            id="close-api-key-guide-footer-btn"
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-extrabold text-xs rounded-xl transition-colors border border-slate-200 dark:border-slate-700"
          >
            {language === 'ur' ? 'رہنمائی بند کریں' : 'Close Guide Box'}
          </button>
        </div>

      </div>
    </div>
  );
};

