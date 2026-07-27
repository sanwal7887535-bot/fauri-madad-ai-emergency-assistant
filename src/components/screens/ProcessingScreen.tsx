import React, { useState, useEffect } from 'react';
import { HeartPulse, PhoneCall } from 'lucide-react';
import { Language } from '../../types';

interface ProcessingScreenProps {
  language: Language;
  onOpenDialModal: () => void;
}

export const ProcessingScreen: React.FC<ProcessingScreenProps> = ({ language, onOpenDialModal }) => {
  const [msgIndex, setMsgIndex] = useState(0);

  const messagesEn = [
    'Connecting to emergency guidance model...',
    'Checking Rescue 1122 safety constraints...',
    'Formatting 4-6 clear one-breath action steps...',
    'Generating Do NOT warning list...',
    'Translating guidance for bilingual readout...'
  ];

  const messagesUr = [
    'ایمرجنسی ماڈل سے رابطہ کیا جا رہا ہے...',
    'ریسکیو 1122 کے حفاظتی اصولوں کی جانچ...',
    'واضح 4 سے 6 ابتدائی تدابیر تیار کی جا رہی ہیں...',
    'بچنے کی اہم باتوں کی فہرست بنائی جا رہی ہے...',
    'صوتی اور تحریری رہنمائی کی تیاری...'
  ];

  const activeMessages = language === 'ur' ? messagesUr : messagesEn;

  useEffect(() => {
    const timer = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % activeMessages.length);
    }, 1800);

    return () => clearInterval(timer);
  }, [activeMessages.length]);

  return (
    <div id="processing-screen-container" className="max-w-md mx-auto py-16 text-center space-y-8 animate-in fade-in duration-300">
      
      {/* Central Pulsing Emerald Emblem */}
      <div className="relative inline-block">
        <div className="absolute -inset-6 rounded-full bg-emerald-500/20 dark:bg-emerald-500/30 animate-ping" />
        <div className="absolute -inset-12 rounded-full bg-teal-500/10 dark:bg-teal-500/20 animate-pulse" />
        
        <div className="relative w-24 h-24 rounded-3xl bg-gradient-to-tr from-emerald-700 via-emerald-600 to-teal-500 text-white flex items-center justify-center shadow-2xl shadow-emerald-600/40 border-2 border-white/20">
          <HeartPulse className="w-12 h-12 animate-pulse" />
        </div>
      </div>

      {/* Title & Rotating Message */}
      <div className="space-y-3">
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
          {language === 'ur' ? 'ابتدائی طبی ہدایت تیار ہو رہی ہے' : 'Generating First-Aid Guidance'}
        </h2>
        
        <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400 min-h-[24px] transition-all">
          {activeMessages[msgIndex]}
        </p>
      </div>

      {/* Call 1122 Quick Backup Button during wait */}
      <div className="bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 rounded-2xl p-5 space-y-3">
        <p className="text-xs text-slate-700 dark:text-slate-300 font-medium">
          {language === 'ur'
            ? 'اگر حالت مسلسل بگڑ رہی ہو یا جان لیوا خطرہ ہو تو فوراً 1122 ڈائل کریں۔'
            : 'If the victim is completely unresponsive or in extreme life threat, dial 1122 right now.'}
        </p>

        <button
          id="processing-call-1122-btn"
          onClick={onOpenDialModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs rounded-xl shadow-md shadow-red-600/30 transition-all hover:scale-105"
        >
          <PhoneCall className="w-4 h-4 animate-bounce" />
          <span>{language === 'ur' ? 'ڈائل کریں 1122' : 'Call 1122 Immediately'}</span>
        </button>
      </div>

    </div>
  );
};
