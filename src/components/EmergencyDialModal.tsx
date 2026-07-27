import React from 'react';
import { PhoneCall, X, ShieldAlert, MapPin, ExternalLink, Copy, Check } from 'lucide-react';
import { Language } from '../types';

interface EmergencyDialModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const EmergencyDialModal: React.FC<EmergencyDialModalProps> = ({ isOpen, onClose, language }) => {
  const [copied, setCopied] = React.useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText('1122');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const emergencyContacts = [
    { nameEn: 'Rescue 1122 (Ambulance & Fire)', nameUr: 'ریسکیو 1122 (ایمبولینس و فائر)', number: '1122', primary: true },
    { nameEn: 'Edhi Foundation Ambulance', nameUr: 'ایدھی ایمبولینس سروس', number: '115', primary: false },
    { nameEn: 'Chhipa Welfare Emergency', nameUr: 'چھیپا ویلفیئر سروس', number: '1020', primary: false },
    { nameEn: 'Police Emergency Helpline', nameUr: 'پولیس ہيلپ لائن', number: '15', primary: false },
    { nameEn: 'Fire Brigade Service', nameUr: 'فائر برگیڈ سروس', number: '16', primary: false },
  ];

  return (
    <div id="emergency-dial-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        id="emergency-dial-modal-card"
        className="w-full max-w-lg bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-900/50 rounded-2xl shadow-2xl p-6 relative overflow-hidden"
      >
        {/* Top Accent Gradient Header */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-rose-600 via-red-500 to-rose-700" />

        <button
          id="close-dial-modal-btn"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-rose-100 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
            <ShieldAlert className="w-7 h-7 animate-pulse" />
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
              {language === 'ur' ? 'ایمرجنسی کال 1122' : 'Call Rescue 1122 Pakistan'}
            </h3>
            <p className="text-xs text-rose-600 dark:text-rose-400 font-semibold">
              {language === 'ur' ? 'کسی بھی جان لیوا صورتحال میں بلا تاخیر ڈائل کریں' : 'Free 24/7 Government Emergency Rescue'}
            </p>
          </div>
        </div>

        {/* Primary Giant Call Action */}
        <div className="bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 rounded-2xl p-5 mb-5 text-center">
          <p className="text-xs text-slate-600 dark:text-slate-300 mb-3 font-medium">
            {language === 'ur'
              ? 'ریسکیو آپریٹر کو اپنا پتہ، مریض کی حالت اور قریبی مشہور جگہ بتائیں۔'
              : 'Direct connection to Rescue 1122 Dispatch Operator in Pakistan.'}
          </p>

          <a
            id="direct-call-1122-link"
            href="tel:1122"
            className="w-full inline-flex items-center justify-center gap-3 px-6 py-4 bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white font-extrabold text-lg sm:text-xl rounded-xl shadow-lg shadow-rose-600/30 transition-all hover:scale-[1.02]"
          >
            <PhoneCall className="w-6 h-6 animate-bounce" />
            <span>{language === 'ur' ? 'ڈائل کریں 1122' : 'DIAL 1122 NOW'}</span>
            <ExternalLink className="w-5 h-5 opacity-80" />
          </a>

          <div className="flex items-center justify-center gap-2 mt-3">
            <button
              id="copy-1122-btn"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied 1122' : 'Copy Number 1122'}</span>
            </button>
          </div>
        </div>

        {/* Dispatch Location Advice */}
        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-3.5 mb-5 border border-slate-200/80 dark:border-slate-700/60 flex items-start gap-3">
          <MapPin className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
          <div className="text-xs text-slate-700 dark:text-slate-300">
            <span className="font-bold text-slate-900 dark:text-white">
              {language === 'ur' ? 'اہمت معلوماتی مشورہ:' : 'Location Tip:'}
            </span>{' '}
            {language === 'ur'
              ? 'کال ملتے ہی اپنے شہر کا نام، محلہ، گلی نمبر اور قریبی لینڈ مارک (مثلاً مسجد یا پٹرول پمپ) واضح بتائیں۔'
              : 'Speak clearly. Give your District/City, Street/Sector address, and nearest prominent landmark.'}
          </div>
        </div>

        {/* Other Pakistan Emergency Helplines */}
        <div>
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
            {language === 'ur' ? 'دیگر پاکستانی ایمرجنسی خدمات' : 'Other Pakistan Emergency Helplines'}
          </h4>
          <div className="space-y-1.5">
            {emergencyContacts.slice(1).map((contact) => (
              <a
                key={contact.number}
                href={`tel:${contact.number}`}
                className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700/80 text-slate-800 dark:text-slate-200 transition-colors border border-slate-200/60 dark:border-slate-700/50"
              >
                <span className="text-xs font-medium">
                  {language === 'ur' ? contact.nameUr : contact.nameEn}
                </span>
                <span className="text-xs font-bold font-mono px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                  {contact.number}
                </span>
              </a>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
