import React from 'react';
import { PhoneCall, Moon, Sun, Key, ShieldCheck, HeartPulse } from 'lucide-react';
import { Language, ScreenName } from '../types';

interface HeaderProps {
  language: Language;
  onToggleLanguage: (lang: Language) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenDialModal: () => void;
  userApiKeyActive: boolean;
  activeScreen: ScreenName;
  onNavigate: (screen: ScreenName) => void;
  onOpenApiKeyGuide?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  onToggleLanguage,
  darkMode,
  onToggleDarkMode,
  onOpenDialModal,
  userApiKeyActive,
  activeScreen,
  onNavigate,
  onOpenApiKeyGuide,
}) => {
  return (
    <header id="main-header" className="sticky top-0 z-40 w-full border-b border-emerald-900/10 dark:border-emerald-500/20 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md transition-colors shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Logo & Brand */}
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => onNavigate('home')}
          id="brand-logo-btn"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 via-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-md shadow-emerald-600/30 group-hover:scale-105 transition-transform">
            <HeartPulse className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl text-slate-900 dark:text-white tracking-tight">
                Fauri<span className="text-emerald-600 dark:text-emerald-400">Madad</span>
              </span>
              <span className="px-2 py-0.5 text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 rounded-md border border-emerald-200 dark:border-emerald-800">
                فوری امداد
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium hidden sm:block">
              {language === 'ur' ? 'پاکستان کی باآواز فرسٹ ایڈ ہیلپ لائن' : 'Voice Emergency First-Aid • Pakistan 1122'}
            </p>
          </div>
        </div>

        {/* Right Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* API Key Guide / Active Status Button */}
          {onOpenApiKeyGuide && (
            <button
              id="header-api-key-guide-btn"
              onClick={onOpenApiKeyGuide}
              title={userApiKeyActive ? "Personal Key Active — Click for Guide" : "Get Free Gemini API Key Guide"}
              className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl transition-all border ${
                userApiKeyActive
                  ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800 hover:bg-emerald-100'
                  : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200'
              }`}
            >
              <Key className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>{userApiKeyActive ? 'Personal Key' : 'API Key Guide'}</span>
            </button>
          )}

          {/* Language Toggle Button */}
          <button
            id="header-lang-toggle-btn"
            onClick={() => onToggleLanguage(language === 'en' ? 'ur' : 'en')}
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors border border-slate-200 dark:border-slate-700"
            aria-label="Toggle Language"
          >
            <span className={language === 'en' ? 'text-emerald-600 dark:text-emerald-400 font-extrabold' : 'opacity-60'}>EN</span>
            <span className="text-slate-300 dark:text-slate-600">/</span>
            <span className={language === 'ur' ? 'text-emerald-600 dark:text-emerald-400 font-extrabold' : 'opacity-60'}>اردو</span>
          </button>

          {/* Dark / Light Theme Mode Toggle */}
          <button
            id="header-theme-toggle-btn"
            onClick={onToggleDarkMode}
            className="p-2.5 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all border border-slate-200 dark:border-slate-800"
            aria-label="Toggle Dark Mode"
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {darkMode ? (
              <Sun className="w-5 h-5 text-amber-400 fill-amber-400/20" />
            ) : (
              <Moon className="w-5 h-5 text-slate-700 fill-slate-700/20" />
            )}
          </button>

          {/* Emergency 1122 Red Call Button */}
          <button
            id="header-call-1122-btn"
            onClick={onOpenDialModal}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md shadow-red-600/30 transition-all hover:scale-105"
          >
            <PhoneCall className="w-4 h-4 animate-bounce" />
            <span>Call 1122</span>
          </button>

        </div>

      </div>
    </header>
  );
};
