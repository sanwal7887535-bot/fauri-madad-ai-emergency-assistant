import React from 'react';
import { Home, BookOpen, History, Info, Settings, Mic } from 'lucide-react';
import { ScreenName, Language } from '../types';

interface NavigationProps {
  activeScreen: ScreenName;
  onNavigate: (screen: ScreenName) => void;
  language: Language;
}

export const Navigation: React.FC<NavigationProps> = ({ activeScreen, onNavigate, language }) => {
  const navItems = [
    { id: 'home' as ScreenName, labelEn: 'Home', labelUr: 'صفحہ اول', icon: Home },
    { id: 'listening' as ScreenName, labelEn: 'Voice AI', labelUr: 'آواز ہدایت', icon: Mic },
    { id: 'library' as ScreenName, labelEn: 'Library', labelUr: 'رہنما ڈائریکٹری', icon: BookOpen },
    { id: 'history' as ScreenName, labelEn: 'History', labelUr: 'سابقی ریکارڈ', icon: History },
    { id: 'about' as ScreenName, labelEn: 'Directory', labelUr: 'ایمرجنسی نمبر', icon: Info },
    { id: 'settings' as ScreenName, labelEn: 'Settings', labelUr: 'ترتیبات', icon: Settings },
  ];

  return (
    <>
      {/* Desktop Sub-Header Navigation */}
      <nav id="desktop-subnav" className="hidden md:block w-full bg-slate-100/70 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-1.5 py-2 overflow-x-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeScreen === item.id || (item.id === 'home' && (activeScreen === 'processing' || activeScreen === 'guidance'));
            return (
              <button
                key={item.id}
                id={`desktop-nav-${item.id}`}
                onClick={() => onNavigate(item.id)}
                className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl transition-all ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200/80 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{language === 'ur' ? item.labelUr : item.labelEn}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Mobile Floating Bottom Navigation Bar */}
      <nav id="mobile-bottom-nav" className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-950/95 border-t border-slate-200 dark:border-slate-800 backdrop-blur-lg px-2 py-1.5 shadow-xl">
        <div className="grid grid-cols-5 items-center justify-items-center">
          {navItems.filter(i => i.id !== 'listening').map((item) => {
            const Icon = item.icon;
            const isActive = activeScreen === item.id || (item.id === 'home' && (activeScreen === 'processing' || activeScreen === 'guidance'));
            return (
              <button
                key={item.id}
                id={`mobile-nav-${item.id}`}
                onClick={() => onNavigate(item.id)}
                className={`flex flex-col items-center justify-center py-1 px-2 w-full rounded-xl transition-all ${
                  isActive
                    ? 'text-emerald-600 dark:text-emerald-400 font-extrabold'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'scale-110' : ''}`} />
                <span className="text-[10px] mt-0.5 tracking-tight truncate max-w-full">
                  {language === 'ur' ? item.labelUr : item.labelEn}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};
