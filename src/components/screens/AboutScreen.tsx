import React, { useState } from 'react';
import { ShieldCheck, PhoneCall, Heart, Info, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { Language } from '../../types';

interface AboutScreenProps {
  language: Language;
  onOpenDialModal: () => void;
}

export const AboutScreen: React.FC<AboutScreenProps> = ({ language, onOpenDialModal }) => {
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (feedbackText.trim()) {
      setFeedbackSubmitted(true);
      setFeedbackText('');
      setTimeout(() => setFeedbackSubmitted(false), 4000);
    }
  };

  const emergencyServices = [
    { nameEn: 'Rescue 1122 (Government Service)', nameUr: 'ریسکیو 1122 (حکومتی سروس)', number: '1122', descEn: '24/7 Ambulance, Fire & Disaster Rescue in Pakistan', descUr: '24 گھنٹے ایمبولینس، فائر اور ریسکیو خدمات' },
    { nameEn: 'Edhi Foundation Ambulance', nameUr: 'ایدھی ایمبولینس سروس', number: '115', descEn: 'Nationwide ambulance transport and emergency assistance', descUr: 'سراسر پاکستان میں ایمبولینس اور امدادی سروس' },
    { nameEn: 'Chhipa Welfare Association', nameUr: 'چھیپا ویلفیئر سروس', number: '1020', descEn: 'Karachi & Sindh primary ambulance dispatch', descUr: 'کراچی و سندھ ایمرجنسی نیٹ ورک' },
    { nameEn: 'Police Emergency Helpline', nameUr: 'پولیس ہیلپ لائن', number: '15', descEn: 'Crime response, security & road traffic accidents', descUr: 'حفاظتی اور ٹریفک حادثات ہیلپ لائن' },
    { nameEn: 'Fire Brigade Department', nameUr: 'فائر برگیڈ ڈیپارٹمنٹ', number: '16', descEn: 'Municipal fire rescue and chemical hazard containment', descUr: 'بلدیاتی فائر فائٹنگ و بحران کاٹنے کی سروس' },
  ];

  return (
    <div id="about-screen-container" className="space-y-8 pb-12 animate-in fade-in duration-300">
      
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-950 border border-emerald-800/60 rounded-3xl p-6 sm:p-8 text-white shadow-2xl relative overflow-hidden">
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-extrabold">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Fauri Madad v1.0.0 • Voice First-Aid</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            {language === 'ur' ? 'فوری امداد کے بارے میں' : 'About Fauri Madad'}
          </h2>

          <p className="text-sm text-slate-300 leading-relaxed font-medium">
            {language === 'ur'
              ? 'فوری امداد ایک بلا معاوضہ صوتی ایمرجنسی اسسٹنٹ ہے جو پاکستان میں عام شہریوں کو ایمرجنسی میں فوری اور درست ابتدائی طبی ہدایات فراہم کرتا ہے۔'
              : 'Fauri Madad is a free, voice-first emergency guidance app engineered for untrained bystanders in Pakistan during the critical first minutes of a medical crisis.'}
          </p>

          <div className="pt-2">
            <button
              id="about-dial-1122-btn"
              onClick={onOpenDialModal}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-red-600/30 transition-all hover:scale-105"
            >
              <PhoneCall className="w-4 h-4 animate-pulse" />
              <span>{language === 'ur' ? '1122 ایمرجنسی ڈائل کریں' : 'Dial Rescue 1122'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Directory of Emergency Numbers in Pakistan */}
      <section className="space-y-4">
        <div>
          <h3 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <MapPin className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <span>{language === 'ur' ? 'پاکستان ایمرجنسی ہیلپ لائنز ڈائریکٹری' : 'Pakistan Emergency Directory'}</span>
          </h3>
          <p className="text-xs text-slate-500 font-medium">
            {language === 'ur' ? 'پاکستان بھر میں 24/7 مفت ہنگامی فون نمبرز' : 'Free 24/7 direct dial emergency service contacts in Pakistan'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {emergencyServices.map((srv) => (
            <div
              key={srv.number}
              className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between gap-3 hover:border-emerald-500 transition-colors"
            >
              <div>
                <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
                  {language === 'ur' ? srv.nameUr : srv.nameEn}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-medium">
                  {language === 'ur' ? srv.descUr : srv.descEn}
                </p>
              </div>

              <a
                href={`tel:${srv.number}`}
                className="shrink-0 px-3.5 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-600 hover:text-white font-extrabold font-mono text-sm border border-emerald-200 dark:border-emerald-800 transition-all"
              >
                {srv.number}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Medical & Legal Safety Disclaimer Section */}
      <section className="p-6 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 rounded-3xl space-y-3">
        <h3 className="font-extrabold text-sm text-amber-950 dark:text-amber-200 flex items-center gap-2">
          <Info className="w-5 h-5 text-amber-600 dark:text-amber-400" />
          <span>{language === 'ur' ? 'قانونی و طبی ڈس کلیمر (Medical Disclaimer)' : 'Medical & Safety Disclaimer'}</span>
        </h3>

        <div className="text-xs text-amber-950/90 dark:text-amber-200/90 leading-relaxed space-y-2 font-medium">
          <p>
            {language === 'ur'
              ? '1. فوری امداد مصنوعی ذہانت (Google Gemini AI) پر مبنی ایک تعلیمی اور ابتدائی معاون ایپ ہے۔ یہ پیشہ ور ڈاکٹر کی رائے یا ہسپتال کا متبادل نہیں ہے۔'
              : '1. Fauri Madad uses Artificial Intelligence (Google Gemini 2.5 Flash) to generate structured first-aid guidance. It does not provide medical diagnoses or replace licensed physicians.'}
          </p>
          <p>
            {language === 'ur'
              ? '2. کسی بھی ادویات کا نام یا خوراک تجویز نہیں کی جاتی۔ مقصد صرف فرسٹ ایڈ کے فوری حفاظتی اقدامات بتانا ہے۔'
              : '2. The application strictly avoids recommending prescription medications or dosages, focusing exclusively on layperson first-aid physical intervention.'}
          </p>
          <p>
            {language === 'ur'
              ? '3. شدید حادثے یا بے ہوشی کی صورت میں فوری طور پر 1122 ڈائل کریں۔'
              : '3. In any life-threatening collapse, massive hemorrhage, or cardiac arrest, immediate dispatch of Rescue 1122 takes priority over software usage.'}
          </p>
        </div>
      </section>

      {/* Feedback Form */}
      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-4 shadow-sm">
        <h3 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
          <Heart className="w-4 h-4 text-red-500" />
          <span>{language === 'ur' ? 'رائے اور تجاویز' : 'Feedback & Safety Suggestions'}</span>
        </h3>

        {feedbackSubmitted ? (
          <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-2xl flex items-center gap-2 text-xs font-extrabold text-emerald-800 dark:text-emerald-300">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{language === 'ur' ? 'آپ کی رائے موصول ہو گئی۔ شکریہ!' : 'Thank you! Your feedback helps keep first-aid guidance safe and accurate.'}</span>
          </div>
        ) : (
          <form onSubmit={handleFeedbackSubmit} className="space-y-3">
            <textarea
              id="about-feedback-textarea"
              rows={3}
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              placeholder={
                language === 'ur'
                  ? 'اپنی رائے، تجربہ یا بہتری کی تجاویز لکھیں...'
                  : 'Share feedback or suggest improvements for Pakistan emergency response...'
              }
              className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button
              id="submit-about-feedback-btn"
              type="submit"
              disabled={!feedbackText.trim()}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-extrabold text-xs rounded-xl shadow-sm transition-all flex items-center gap-2"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{language === 'ur' ? 'ارسال کریں' : 'Submit Feedback'}</span>
            </button>
          </form>
        )}
      </section>

    </div>
  );
};
