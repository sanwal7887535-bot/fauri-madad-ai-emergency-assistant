import React, { useState } from 'react';
import { Settings, Key, Eye, EyeOff, Moon, Sun, Volume2, Check, Trash2, Globe, HelpCircle, Play } from 'lucide-react';
import { AppSettings, Language } from '../../types';

interface SettingsScreenProps {
  settings: AppSettings;
  onUpdateSettings: (newSettings: Partial<AppSettings>) => void;
  language: Language;
  onOpenApiKeyGuide: () => void;
  onTestVoice: (text: string, lang: 'en' | 'ur') => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  settings,
  onUpdateSettings,
  language,
  onOpenApiKeyGuide,
  onTestVoice,
}) => {
  const [apiKeyInput, setApiKeyInput] = useState(settings.userApiKey || '');
  const [showKey, setShowKey] = useState(false);
  const [keySavedMsg, setKeySavedMsg] = useState(false);

  const handleSaveKey = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSettings({ userApiKey: apiKeyInput.trim() });
    setKeySavedMsg(true);
    setTimeout(() => setKeySavedMsg(false), 2500);
  };

  const handleRemoveKey = () => {
    setApiKeyInput('');
    onUpdateSettings({ userApiKey: '' });
    setKeySavedMsg(true);
    setTimeout(() => setKeySavedMsg(false), 2500);
  };

  return (
    <div id="settings-screen-container" className="max-w-2xl mx-auto space-y-6 pb-12 animate-in fade-in duration-300">
      
      {/* Title */}
      <div className="pb-3 border-b border-slate-200 dark:border-slate-800">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          <Settings className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
          <span>{language === 'ur' ? 'ترتیبات (Settings)' : 'Application Settings'}</span>
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
          {language === 'ur'
            ? 'صوتی اسسٹنٹ، زبان اور اختیاری Gemini API کی ترتیبات'
            : 'Configure voice assistant playback, default language, and personal API key'}
        </p>
      </div>

      {/* 1. OPTIONAL PERSONAL GEMINI API KEY SECTION */}
      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-4 shadow-sm">
        
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 flex items-center justify-center shrink-0 border border-emerald-200 dark:border-emerald-800">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <span>{language === 'ur' ? 'شخصی جیمنائی API کی (Personal Key)' : 'Personal Gemini API Key'}</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                {language === 'ur'
                  ? 'ڈیفالٹ سرور کی خودکار فعال ہوتی ہے۔ آپ اپنی 100% مفت API کی بھی درج کر سکتے ہیں۔'
                  : 'Shared default server key is active by default. You can also add your personal 100% free Gemini API key.'}
              </p>
            </div>
          </div>

          {/* Active Status Badge */}
          <span className={`shrink-0 px-2.5 py-1 rounded-full text-xs font-bold border ${
            settings.userApiKey
              ? 'bg-emerald-50 text-emerald-800 border-emerald-300 dark:bg-emerald-950/80 dark:text-emerald-300 dark:border-emerald-800'
              : 'bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700'
          }`}>
            {settings.userApiKey ? (language === 'ur' ? 'ذاتی کی فعال' : 'Personal Key Active') : (language === 'ur' ? 'ڈیفالٹ کی فعال' : 'Default Server Key Active')}
          </span>
        </div>

        {/* Button to Open API Key Guide Modal */}
        <div className="pt-1">
          <button
            id="open-api-key-guide-btn"
            type="button"
            onClick={onOpenApiKeyGuide}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/80 dark:hover:bg-emerald-900 text-emerald-800 dark:text-emerald-300 text-xs font-extrabold border border-emerald-200 dark:border-emerald-800 transition-colors"
          >
            <HelpCircle className="w-4 h-4 text-emerald-600" />
            <span>{language === 'ur' ? 'مفت API کی حاصل کرنے کی مرحلہ وار رہنمائی' : 'Step-by-Step Guide: How to Get a Free API Key'}</span>
          </button>
        </div>

        {keySavedMsg && (
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl flex items-center gap-2 text-xs font-bold text-emerald-800 dark:text-emerald-300">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>{settings.userApiKey ? 'API Key saved to browser localStorage!' : 'Key removed. Reverted to default key.'}</span>
          </div>
        )}

        <form onSubmit={handleSaveKey} className="space-y-3 pt-2">
          <div className="relative">
            <input
              id="settings-api-key-input"
              type={showKey ? 'text' : 'password'}
              value={apiKeyInput}
              onChange={(e) => setApiKeyInput(e.target.value)}
              placeholder="AIzaSy..."
              className="w-full pl-4 pr-10 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white text-xs font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button
              type="button"
              onClick={() => setShowKey(!showKey)}
              className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
            >
              {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          <p className="text-[11px] text-slate-400 font-medium">
            {language === 'ur'
              ? 'آپ کی کی صرف آپ کے براؤزر کے localStorage میں محفوظ رہتی ہے اور کسی سرور پر جمع نہیں ہوتی۔'
              : 'Your key stays 100% in your browser’s localStorage — never sent to external servers.'}
          </p>

          <div className="flex items-center gap-2 pt-1">
            <button
              id="settings-save-key-btn"
              type="submit"
              disabled={!apiKeyInput.trim()}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-extrabold text-xs rounded-xl shadow-sm transition-all"
            >
              {language === 'ur' ? 'محفوظ کریں' : 'Save Personal Key'}
            </button>

            {settings.userApiKey && (
              <button
                id="settings-remove-key-btn"
                type="button"
                onClick={handleRemoveKey}
                className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-300 border border-red-200 dark:border-red-900/50 font-bold text-xs rounded-xl transition-all flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>{language === 'ur' ? 'کی حذف کریں' : 'Remove Key'}</span>
              </button>
            )}
          </div>
        </form>

      </section>

      {/* 2. LANGUAGE PREFERENCE */}
      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-3 shadow-sm">
        <h3 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
          <Globe className="w-4 h-4 text-emerald-600" />
          <span>{language === 'ur' ? 'بنیادی زبان (Default Language)' : 'Default Language'}</span>
        </h3>

        <div className="grid grid-cols-2 gap-3">
          <button
            id="settings-lang-en-btn"
            onClick={() => onUpdateSettings({ language: 'en' })}
            className={`p-3 rounded-2xl border text-xs font-bold transition-all flex items-center justify-between ${
              settings.language === 'en'
                ? 'bg-emerald-50 dark:bg-emerald-950/80 border-emerald-500 text-emerald-800 dark:text-emerald-300'
                : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
            }`}
          >
            <span>English (US)</span>
            {settings.language === 'en' && <Check className="w-4 h-4 text-emerald-600" />}
          </button>

          <button
            id="settings-lang-ur-btn"
            onClick={() => onUpdateSettings({ language: 'ur' })}
            className={`p-3 rounded-2xl border text-xs font-bold transition-all flex items-center justify-between ${
              settings.language === 'ur'
                ? 'bg-emerald-50 dark:bg-emerald-950/80 border-emerald-500 text-emerald-800 dark:text-emerald-300'
                : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
            }`}
          >
            <span>اردو (Pakistan)</span>
            {settings.language === 'ur' && <Check className="w-4 h-4 text-emerald-600" />}
          </button>
        </div>
      </section>

      {/* 3. VOICE SPEECH PREFERENCES */}
      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-4 shadow-sm">
        <h3 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
          <Volume2 className="w-4 h-4 text-emerald-600" />
          <span>{language === 'ur' ? 'صوتی اسسٹنٹ کی رفتار' : 'Voice Assistant Playback Speed'}</span>
        </h3>

        <div className="grid grid-cols-3 gap-2">
          {[
            { rate: 0.8, labelEn: 'Slow (0.8x)', labelUr: 'آہستہ' },
            { rate: 1.0, labelEn: 'Normal (1.0x)', labelUr: 'عام رفتار' },
            { rate: 1.2, labelEn: 'Fast (1.2x)', labelUr: 'تیز' },
          ].map((item) => (
            <button
              key={item.rate}
              onClick={() => onUpdateSettings({ speechSpeed: item.rate })}
              className={`py-2 px-3 rounded-xl border text-xs font-extrabold transition-all ${
                settings.speechSpeed === item.rate
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                  : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              {language === 'ur' ? item.labelUr : item.labelEn}
            </button>
          ))}
        </div>

        {/* Test Voice Assistant Sound Button */}
        <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-between gap-3 border border-slate-200 dark:border-slate-700">
          <div className="text-xs">
            <span className="font-bold text-slate-900 dark:text-white block">
              {language === 'ur' ? 'صوتی اسسٹنٹ کی آواز چیک کریں' : 'Test Voice Assistant Sound'}
            </span>
            <span className="text-slate-500 dark:text-slate-400 text-[11px]">
              {language === 'ur' ? 'اپنے ڈیوائس پر اسپیکر اور آواز کی تصدیق کریں' : 'Test voice output on your current device speaker'}
            </span>
          </div>

          <button
            id="test-voice-btn"
            type="button"
            onClick={() => {
              const msg = language === 'ur'
                ? 'فوری امداد صوتی اسسٹنٹ بالکل ٹھیک کام کر رہا ہے۔'
                : 'Fauri Madad Voice Assistant is working properly on your device.';
              onTestVoice(msg, language);
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold rounded-xl shadow-sm transition-all shrink-0"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>{language === 'ur' ? 'آواز سنیں' : 'Test Speech'}</span>
          </button>
        </div>

        {/* Auto-read speech toggle */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
          <div>
            <span className="text-xs font-extrabold text-slate-800 dark:text-slate-200">
              {language === 'ur' ? 'خودکار صوتی آواز (Auto Readout)' : 'Auto-Read Guidance Aloud'}
            </span>
            <p className="text-[11px] text-slate-500 font-medium">
              {language === 'ur' ? 'نتیجہ آتے ہی باآواز پڑھنا شروع کرے' : 'Automatically speaks guidance as soon as AI response arrives'}
            </p>
          </div>

          <button
            id="settings-autoread-toggle"
            onClick={() => onUpdateSettings({ autoReadSpeech: !settings.autoReadSpeech })}
            className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
              settings.autoReadSpeech ? 'bg-emerald-600' : 'bg-slate-300 dark:bg-slate-700'
            }`}
          >
            <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
              settings.autoReadSpeech ? 'translate-x-6' : 'translate-x-0'
            }`} />
          </button>
        </div>
      </section>

      {/* 4. THEME MODE */}
      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-3 shadow-sm">
        <h3 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
          {settings.darkMode ? <Moon className="w-4 h-4 text-amber-400" /> : <Sun className="w-4 h-4 text-slate-600" />}
          <span>{language === 'ur' ? 'رنگ و تھیم' : 'Appearance'}</span>
        </h3>

        <div className="grid grid-cols-2 gap-3">
          <button
            id="settings-theme-light"
            onClick={() => onUpdateSettings({ darkMode: false })}
            className={`p-3 rounded-2xl border text-xs font-bold transition-all flex items-center gap-2 ${
              !settings.darkMode
                ? 'bg-emerald-50 border-emerald-500 text-emerald-800'
                : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
            }`}
          >
            <Sun className="w-4 h-4 text-amber-500" />
            <span>Light Mode</span>
          </button>

          <button
            id="settings-theme-dark"
            onClick={() => onUpdateSettings({ darkMode: true })}
            className={`p-3 rounded-2xl border text-xs font-bold transition-all flex items-center gap-2 ${
              settings.darkMode
                ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300'
                : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
            }`}
          >
            <Moon className="w-4 h-4 text-amber-400" />
            <span>Dark Mode</span>
          </button>
        </div>
      </section>

    </div>
  );
};
