import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { EmergencyDialModal } from './components/EmergencyDialModal';
import { ApiKeyGuideModal } from './components/ApiKeyGuideModal';

import { HomeScreen } from './components/screens/HomeScreen';
import { ListeningScreen } from './components/screens/ListeningScreen';
import { ProcessingScreen } from './components/screens/ProcessingScreen';
import { GuidanceScreen } from './components/screens/GuidanceScreen';
import { LibraryScreen } from './components/screens/LibraryScreen';
import { HistoryScreen } from './components/screens/HistoryScreen';
import { AboutScreen } from './components/screens/AboutScreen';
import { SettingsScreen } from './components/screens/SettingsScreen';

import { useSpeechRecognition } from './hooks/useSpeechRecognition';
import { useSpeechSynthesis } from './hooks/useSpeechSynthesis';

import { ScreenName, Language, AppSettings, EmergencyGuidance, HistorySession } from './types';
import { AlertCircle, X, Key } from 'lucide-react';

const SETTINGS_KEY = 'fauri_madad_settings';
const HISTORY_KEY = 'fauri_madad_history';

export default function App() {
  // 1. Settings State Persisted in LocalStorage
  const [settings, setSettings] = useState<AppSettings>(() => {
    try {
      const saved = localStorage.getItem(SETTINGS_KEY);
      if (saved) return JSON.parse(saved);
    } catch (_) {}
    return {
      language: 'en',
      darkMode: false,
      autoReadSpeech: true,
      speechSpeed: 1.0,
      speechVoice: '',
      userApiKey: '',
    };
  });

  // 2. History Sessions State
  const [historySessions, setHistorySessions] = useState<HistorySession[]>(() => {
    try {
      const saved = localStorage.getItem(HISTORY_KEY);
      if (saved) return JSON.parse(saved);
    } catch (_) {}
    return [];
  });

  // Screen & Guidance State
  const [activeScreen, setActiveScreen] = useState<ScreenName>('home');
  const [currentGuidance, setCurrentGuidance] = useState<EmergencyGuidance | null>(null);
  const [currentQuery, setCurrentQuery] = useState<string>('');
  const [isSavedInHistory, setIsSavedInHistory] = useState<boolean>(false);

  // Modals & Toast Error
  const [isDialModalOpen, setIsDialModalOpen] = useState(false);
  const [isApiKeyGuideOpen, setIsApiKeyGuideOpen] = useState(false);
  const [errorToast, setErrorToast] = useState<string | null>(null);

  // Custom Hooks
  const speechRec = useSpeechRecognition();
  const speechSynthesis = useSpeechSynthesis();

  // Sync Dark Mode Class & Language Direction to HTML Element
  useEffect(() => {
    if (settings.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Set document lang and dir for Jameel Noori Nastaleeq Urdu support
    document.documentElement.lang = settings.language;
    document.documentElement.dir = settings.language === 'ur' ? 'rtl' : 'ltr';
  }, [settings.darkMode, settings.language]);

  // Persist Settings
  const updateSettings = (newPartial: Partial<AppSettings>) => {
    setSettings((prev) => {
      const updated = { ...prev, ...newPartial };
      try {
        localStorage.setItem(SETTINGS_KEY, JSON.stringify(updated));
      } catch (_) {}
      return updated;
    });
  };

  // Persist History
  const saveToHistoryStorage = (newHistory: HistorySession[]) => {
    setHistorySessions(newHistory);
    try {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
    } catch (_) {}
  };

  const handleSaveGuidanceToHistory = () => {
    if (!currentGuidance || !currentQuery) return;

    const newSession: HistorySession = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      query: currentQuery,
      language: settings.language,
      guidance: currentGuidance,
    };

    const updated = [newSession, ...historySessions.filter((s) => s.query !== currentQuery)];
    saveToHistoryStorage(updated);
    setIsSavedInHistory(true);
  };

  const handleClearAllHistory = () => {
    saveToHistoryStorage([]);
  };

  const handleDeleteHistorySession = (id: string) => {
    const updated = historySessions.filter((s) => s.id !== id);
    saveToHistoryStorage(updated);
  };

  // Main Emergency AI Guidance Submission Handler
  const handleSubmitQuery = async (queryText: string) => {
    if (!queryText.trim()) return;

    setCurrentQuery(queryText);
    setActiveScreen('processing');
    setErrorToast(null);
    setIsSavedInHistory(false);

    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };

      if (settings.userApiKey && settings.userApiKey.trim()) {
        headers['x-user-api-key'] = settings.userApiKey.trim();
      }

      const res = await fetch('/api/guidance', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          query: queryText,
          language: settings.language,
        }),
      });

      const result = await res.json();

      if (result.success && result.data) {
        setCurrentGuidance(result.data);
        setActiveScreen('guidance');

        // Auto save to session history
        const newSession: HistorySession = {
          id: Date.now().toString(),
          timestamp: new Date().toISOString(),
          query: queryText,
          language: settings.language,
          guidance: result.data,
        };
        saveToHistoryStorage([newSession, ...historySessions.filter((s) => s.query !== queryText)]);
        setIsSavedInHistory(true);
      } else {
        throw new Error(result.error || 'Failed to generate guidance. Please dial 1122 or check the library.');
      }
    } catch (err: any) {
      console.error('Guidance submit error:', err);
      setErrorToast(
        err.message || 'Network issue connecting to first-aid server. Dial 1122 or open the Offline Library.'
      );
      setActiveScreen('home');
    }
  };

  // Speech Recording Handlers
  const handleStartSpeech = () => {
    setActiveScreen('listening');
    const recLang = settings.language === 'ur' ? 'ur-PK' : 'en-US';
    speechRec.startListening(recLang);
  };

  const handleOpenSavedSession = (guidance: EmergencyGuidance, query: string) => {
    setCurrentGuidance(guidance);
    setCurrentQuery(query);
    setIsSavedInHistory(true);
    setActiveScreen('guidance');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors selection:bg-emerald-500 selection:text-white">
      
      {/* Header */}
      <Header
        language={settings.language}
        onToggleLanguage={(lang) => updateSettings({ language: lang })}
        darkMode={settings.darkMode}
        onToggleDarkMode={() => updateSettings({ darkMode: !settings.darkMode })}
        onOpenDialModal={() => setIsDialModalOpen(true)}
        userApiKeyActive={!!settings.userApiKey}
        activeScreen={activeScreen}
        onNavigate={setActiveScreen}
        onOpenApiKeyGuide={() => setIsApiKeyGuideOpen(true)}
      />

      {/* Subnav Navigation */}
      <Navigation
        activeScreen={activeScreen}
        onNavigate={setActiveScreen}
        language={settings.language}
      />

      {/* Non-blocking Error Toast */}
      {errorToast && (
        <div id="error-toast-bar" className="bg-red-600 text-white p-3.5 shadow-lg border-b border-red-700 flex items-center justify-between px-4 max-w-7xl mx-auto w-full animate-in slide-in-from-top-2">
          <div className="flex items-center gap-2 text-xs font-bold">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorToast}</span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setIsApiKeyGuideOpen(true)}
              className="px-2.5 py-1 bg-white text-red-700 rounded-lg text-xs font-extrabold uppercase hover:bg-red-50 flex items-center gap-1"
            >
              <Key className="w-3 h-3" />
              <span>Get Free Key</span>
            </button>
            <button
              onClick={() => setIsDialModalOpen(true)}
              className="px-2.5 py-1 bg-red-800 hover:bg-red-900 text-white rounded-lg text-xs font-extrabold uppercase"
            >
              Call 1122
            </button>
            <button
              onClick={() => setErrorToast(null)}
              className="p-1 text-white hover:opacity-80"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Main Screen Content View */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
        
        {activeScreen === 'home' && (
          <HomeScreen
            language={settings.language}
            onNavigate={setActiveScreen}
            onStartSpeech={handleStartSpeech}
            onSubmitQuery={handleSubmitQuery}
            onOpenDialModal={() => setIsDialModalOpen(true)}
            recentQuery={historySessions[0]?.query}
          />
        )}

        {activeScreen === 'listening' && (
          <ListeningScreen
            language={settings.language}
            transcript={speechRec.transcript}
            interimTranscript={speechRec.interimTranscript}
            isListening={speechRec.isListening}
            error={speechRec.error}
            onStartListening={speechRec.startListening}
            onStopListening={speechRec.stopListening}
            onResetTranscript={speechRec.resetTranscript}
            onSubmitQuery={handleSubmitQuery}
            onCancel={() => setActiveScreen('home')}
            isSpeechSupported={speechRec.isSupported}
          />
        )}

        {activeScreen === 'processing' && (
          <ProcessingScreen
            language={settings.language}
            onOpenDialModal={() => setIsDialModalOpen(true)}
          />
        )}

        {activeScreen === 'guidance' && currentGuidance && (
          <GuidanceScreen
            guidance={currentGuidance}
            language={settings.language}
            onToggleLanguage={(lang) => updateSettings({ language: lang })}
            onOpenDialModal={() => setIsDialModalOpen(true)}
            onNewEmergency={() => setActiveScreen('home')}
            onSaveHistory={handleSaveGuidanceToHistory}
            isSaved={isSavedInHistory}
            speak={speechSynthesis.speak}
            speakStep={speechSynthesis.speakStep}
            pauseSpeech={speechSynthesis.pause}
            resumeSpeech={speechSynthesis.resume}
            cancelSpeech={speechSynthesis.cancel}
            isSpeaking={speechSynthesis.isSpeaking}
            isPaused={speechSynthesis.isPaused}
            currentChunkIndex={speechSynthesis.currentChunkIndex}
            totalChunks={speechSynthesis.totalChunks}
            speechSpeed={settings.speechSpeed}
            userApiKeyActive={!!settings.userApiKey}
          />
        )}

        {activeScreen === 'library' && (
          <LibraryScreen
            language={settings.language}
            onOpenDialModal={() => setIsDialModalOpen(true)}
            onSubmitQuery={handleSubmitQuery}
          />
        )}

        {activeScreen === 'history' && (
          <HistoryScreen
            sessions={historySessions}
            language={settings.language}
            onOpenSession={handleOpenSavedSession}
            onClearHistory={handleClearAllHistory}
            onDeleteSession={handleDeleteHistorySession}
          />
        )}

        {activeScreen === 'about' && (
          <AboutScreen
            language={settings.language}
            onOpenDialModal={() => setIsDialModalOpen(true)}
          />
        )}

        {activeScreen === 'settings' && (
          <SettingsScreen
            settings={settings}
            onUpdateSettings={updateSettings}
            language={settings.language}
            onOpenApiKeyGuide={() => setIsApiKeyGuideOpen(true)}
            onTestVoice={(text, lang) => speechSynthesis.speak(text, lang, settings.speechSpeed)}
          />
        )}

      </main>

      {/* Emergency Dial Modal */}
      <EmergencyDialModal
        isOpen={isDialModalOpen}
        onClose={() => setIsDialModalOpen(false)}
        language={settings.language}
      />

      {/* Step by Step API Key Guide Modal */}
      <ApiKeyGuideModal
        isOpen={isApiKeyGuideOpen}
        onClose={() => setIsApiKeyGuideOpen(false)}
        language={settings.language}
        currentApiKey={settings.userApiKey}
        onSaveApiKey={(key) => updateSettings({ userApiKey: key })}
      />

    </div>
  );
}
