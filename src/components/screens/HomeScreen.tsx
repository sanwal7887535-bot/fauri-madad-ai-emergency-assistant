import React, { useState } from 'react';
import { Mic, ArrowRight, ShieldCheck, HeartPulse, Droplet, Wind, Flame, Bone, Sun, Sparkles, Send, Volume2, PhoneCall } from 'lucide-react';
import { Language, ScreenName, EmergencyCategory } from '../../types';
import { EMERGENCY_CATEGORIES } from '../../data/emergencyCategories';

interface HomeScreenProps {
  language: Language;
  onNavigate: (screen: ScreenName) => void;
  onStartSpeech: () => void;
  onSubmitQuery: (query: string) => void;
  onOpenDialModal: () => void;
  recentQuery?: string;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  language,
  onNavigate,
  onStartSpeech,
  onSubmitQuery,
  onOpenDialModal,
  recentQuery,
}) => {
  const [textInput, setTextInput] = useState('');

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (textInput.trim()) {
      onSubmitQuery(textInput.trim());
    }
  };

  const handleCategorySelect = (category: EmergencyCategory) => {
    const query = language === 'ur' ? category.sampleQueryUr : category.sampleQueryEn;
    onSubmitQuery(query);
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Droplet': return <Droplet className="w-6 h-6 text-red-500" />;
      case 'Wind': return <Wind className="w-6 h-6 text-amber-500" />;
      case 'Flame': return <Flame className="w-6 h-6 text-orange-500" />;
      case 'HeartPulse': return <HeartPulse className="w-6 h-6 text-emerald-500" />;
      case 'Bone': return <Bone className="w-6 h-6 text-teal-500" />;
      case 'Sun': return <Sun className="w-6 h-6 text-yellow-500" />;
      default: return <HeartPulse className="w-6 h-6 text-emerald-500" />;
    }
  };

  return (
    <div id="home-screen-container" className="space-y-8 pb-12 animate-in fade-in duration-300">
      
      {/* Hero Section with Emerald & Red Emergency Glow */}
      <section id="hero-mic-section" className="relative rounded-3xl bg-gradient-to-b from-slate-900 via-emerald-950 to-slate-950 text-white p-6 sm:p-10 shadow-2xl overflow-hidden border border-emerald-800/40">
        
        {/* Soft Glowing Orbs */}
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-80 h-80 bg-red-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>
              {language === 'ur'
                ? 'پاکستان کی باآواز فرسٹ ایڈ ہیلپ لائن • 1122'
                : 'Pakistan Voice First-Aid • Instant AI Guidance'}
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            {language === 'ur' ? (
              <>
                کیا ہنگامی صورتحال ہے؟ <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-red-300">
                  مائیک پر بولیں یا نیچے ٹائپ کریں
                </span>
              </>
            ) : (
              <>
                What is the emergency? <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-red-300">
                  Tap to speak or describe below
                </span>
              </>
            )}
          </h1>

          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto font-medium">
            {language === 'ur'
              ? 'حادثہ، خون بہنا، کرنٹ یا جلنے کی صورت میں فوری باآواز فرسٹ ایڈ کی ہدایت حاصل کریں۔'
              : 'Get instant, simple step-by-step first-aid guidance in plain English & Urdu before help arrives.'}
          </p>

          {/* GIANT EMERALD VOICE MIC BUTTON */}
          <div className="py-4 flex flex-col items-center justify-center">
            
            <div className="relative group">
              {/* Pulsing Ripple Rings */}
              <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full blur-xl opacity-50 group-hover:opacity-80 transition-opacity animate-pulse" />
              
              <button
                id="hero-voice-mic-btn"
                onClick={onStartSpeech}
                className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-gradient-to-tr from-emerald-700 via-emerald-600 to-teal-500 text-white flex flex-col items-center justify-center shadow-2xl shadow-emerald-600/50 hover:scale-105 active:scale-95 transition-transform border-4 border-white/20"
                aria-label="Start Voice Recording"
              >
                <Mic className="w-10 h-10 sm:w-14 sm:h-14 animate-pulse" />
                <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-widest mt-1 opacity-95">
                  {language === 'ur' ? 'بولیں' : 'SPEAK NOW'}
                </span>
              </button>
            </div>

            <p className="text-xs text-emerald-200 mt-4 font-bold flex items-center gap-1.5">
              <Volume2 className="w-4 h-4 text-emerald-400" />
              <span>
                {language === 'ur'
                  ? 'مکمل صوتی ہدایت باآواز سنیں'
                  : 'Voice Assistant reads steps aloud immediately'}
              </span>
            </p>

          </div>

          {/* Fallback Text Input Form */}
          <form id="hero-text-input-form" onSubmit={handleFormSubmit} className="max-w-xl mx-auto pt-2">
            <div className="relative flex items-center">
              <input
                id="hero-emergency-text-input"
                type="text"
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder={
                  language === 'ur'
                    ? 'مثلاً: بازو سے تیز خون بہہ رہا ہے یا بچہ جل گیا ہے...'
                    : 'Or type e.g., "Deep wound bleeding heavily from leg"'
                }
                className="w-full pl-4 pr-12 py-3.5 bg-slate-900/90 border border-emerald-700/50 rounded-2xl text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-inner"
              />
              <button
                id="submit-emergency-text-btn"
                type="submit"
                disabled={!textInput.trim()}
                className="absolute right-2 p-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl disabled:opacity-40 transition-all font-bold"
                title="Send description"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Recent Query Pill */}
          {recentQuery && (
            <div className="pt-2">
              <button
                onClick={() => onSubmitQuery(recentQuery)}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-300 text-xs border border-emerald-800/40"
              >
                <span className="text-emerald-400 font-bold">{language === 'ur' ? 'حالیہ:' : 'Recent:'}</span>
                <span className="truncate max-w-xs">{recentQuery}</span>
              </button>
            </div>
          )}

        </div>
      </section>

      {/* QUICK ACCESS EMERGENCY GRID (6 main types) */}
      <section id="quick-emergency-grid-section" className="space-y-4">
        
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">
              {language === 'ur' ? 'فوری ہنگامی زمرے' : 'Quick Emergency Categories'}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {language === 'ur' ? 'ایک کلک پر فوری طبی ابتدائی تدابیر حاصل کریں' : 'Tap any scenario for instant safety steps'}
            </p>
          </div>

          <button
            id="browse-all-library-btn"
            onClick={() => onNavigate('library')}
            className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
          >
            <span>{language === 'ur' ? 'تمام زمرے دیکھیں' : 'View Library'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {EMERGENCY_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              id={`category-card-${cat.id}`}
              onClick={() => handleCategorySelect(cat)}
              className="flex items-start gap-3.5 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500 dark:hover:border-emerald-500 hover:shadow-md transition-all text-left group"
            >
              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 shrink-0 group-hover:scale-110 transition-transform border border-emerald-200/50 dark:border-emerald-800/50">
                {getIcon(cat.iconName)}
              </div>
              <div className="space-y-1 min-w-0">
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors truncate">
                  {language === 'ur' ? cat.nameUr : cat.nameEn}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                  {language === 'ur' ? cat.descriptionUr : cat.descriptionEn}
                </p>
              </div>
            </button>
          ))}
        </div>

      </section>

      {/* 3-STEP PROCESS CARDS */}
      <section id="process-steps-section" className="bg-slate-100/90 dark:bg-slate-900/60 rounded-2xl p-5 border border-slate-200 dark:border-slate-800">
        <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4 text-center">
          {language === 'ur' ? 'فوری امداد کے 3 آسان مراحل' : 'How Fauri Madad Assists You'}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          
          <div className="bg-white dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
            <div className="w-9 h-9 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-extrabold text-sm flex items-center justify-center mx-auto mb-2 border border-emerald-300 dark:border-emerald-800">
              1
            </div>
            <h4 className="font-extrabold text-xs text-slate-900 dark:text-white">
              {language === 'ur' ? '1. آواز میں بولیں' : '1. Speak or Type'}
            </h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
              {language === 'ur' ? 'مریض کی حالت اور حادثہ بیان کریں۔' : 'Describe the victim’s condition or injury clearly.'}
            </p>
          </div>

          <div className="bg-white dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
            <div className="w-9 h-9 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-extrabold text-sm flex items-center justify-center mx-auto mb-2 border border-emerald-300 dark:border-emerald-800">
              2
            </div>
            <h4 className="font-extrabold text-xs text-slate-900 dark:text-white">
              {language === 'ur' ? '2. محفوظ تدابیر حاصل کریں' : '2. Actionable Steps'}
            </h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
              {language === 'ur' ? '4-6 نمبر وار ابتدائی طبی مراحل حاصل کریں۔' : 'Get 4-6 immediate first-aid steps & critical warnings.'}
            </p>
          </div>

          <div className="bg-white dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
            <div className="w-9 h-9 rounded-full bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300 font-extrabold text-sm flex items-center justify-center mx-auto mb-2 border border-red-300 dark:border-red-800">
              3
            </div>
            <h4 className="font-extrabold text-xs text-slate-900 dark:text-white">
              {language === 'ur' ? '3. باآواز سنیں اور 1122 ڈائل کریں' : '3. Listen & Call 1122'}
            </h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
              {language === 'ur' ? 'آڈیو سنیں اور ضرورت پڑنے پر 1122 ڈائل کریں۔' : 'Voice assistant speaks steps aloud immediately.'}
            </p>
          </div>

        </div>
      </section>

      {/* Safety Disclaimer Banner */}
      <footer id="home-disclaimer-footer" className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
        <div className="text-xs text-amber-950 dark:text-amber-200 leading-relaxed font-medium">
          <span className="font-extrabold">{language === 'ur' ? 'اہم قانونی و طبی تنبیہ:' : 'Important First-Aid Notice:'}</span>{' '}
          {language === 'ur'
            ? 'فوری امداد ایک ابتدائی طبی انتظامی معاون ہے۔ یہ پیشہ ورانہ طبی معائنے یا ریسکیو 1122 کا متبادل نہیں ہے۔ شدید نوعیت میں 1122 ڈائل کریں۔'
            : 'Fauri Madad provides first-aid informational guidance only. It does not provide medical diagnosis or replace emergency professional response. Always dial 1122 in critical emergencies.'}
        </div>
      </footer>

    </div>
  );
};
