import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Send, X, AlertCircle, RotateCcw, MessageSquareText } from 'lucide-react';
import { Language } from '../../types';

interface ListeningScreenProps {
  language: Language;
  transcript: string;
  interimTranscript: string;
  isListening: boolean;
  error: string | null;
  onStartListening: (lang?: string) => void;
  onStopListening: () => void;
  onResetTranscript: () => void;
  onSubmitQuery: (query: string) => void;
  onCancel: () => void;
  isSpeechSupported: boolean;
}

export const ListeningScreen: React.FC<ListeningScreenProps> = ({
  language,
  transcript,
  interimTranscript,
  isListening,
  error,
  onStartListening,
  onStopListening,
  onResetTranscript,
  onSubmitQuery,
  onCancel,
  isSpeechSupported,
}) => {
  const [manualText, setManualText] = useState('');

  useEffect(() => {
    if (isSpeechSupported && !isListening && !transcript) {
      const recognitionLang = language === 'ur' ? 'ur-PK' : 'en-US';
      onStartListening(recognitionLang);
    }
  }, [language, isSpeechSupported]);

  const activeText = (transcript + ' ' + interimTranscript).trim() || manualText;

  const handleSend = () => {
    if (activeText.trim()) {
      onStopListening();
      onSubmitQuery(activeText.trim());
    }
  };

  const handleToggleVoice = () => {
    if (isListening) {
      onStopListening();
    } else {
      const recognitionLang = language === 'ur' ? 'ur-PK' : 'en-US';
      onStartListening(recognitionLang);
    }
  };

  return (
    <div id="listening-screen-container" className="max-w-2xl mx-auto space-y-6 py-4 animate-in zoom-in-95 duration-200">
      
      {/* Top Title Bar */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-600 animate-ping" />
            {language === 'ur' ? 'صوتی ہنگامی رہنمائی' : 'Emergency Voice Input'}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {language === 'ur' ? 'حادثہ یا صورتحال واضح بیان کریں' : 'Describe what is happening right now'}
          </p>
        </div>

        <button
          id="listening-cancel-btn"
          onClick={onCancel}
          className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Voice Visualizer Box */}
      <div className="bg-gradient-to-b from-slate-900 via-emerald-950 to-slate-950 rounded-3xl p-8 border border-emerald-800/60 text-white text-center shadow-2xl relative overflow-hidden space-y-6">
        
        {/* Animated Wave Rings */}
        <div className="flex items-center justify-center py-4">
          <div className="relative">
            {isListening && (
              <>
                <div className="absolute -inset-6 rounded-full bg-emerald-500/30 animate-ping" />
                <div className="absolute -inset-12 rounded-full bg-teal-500/20 animate-pulse" />
              </>
            )}

            <button
              id="listening-toggle-mic-btn"
              onClick={handleToggleVoice}
              className={`relative z-10 w-24 h-24 rounded-full flex flex-col items-center justify-center transition-all ${
                isListening
                  ? 'bg-red-600 text-white shadow-lg shadow-red-600/50 scale-105 border-2 border-white/40'
                  : 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/50 hover:scale-105 border-2 border-white/30'
              }`}
            >
              {isListening ? <Mic className="w-10 h-10 animate-pulse" /> : <MicOff className="w-10 h-10" />}
            </button>
          </div>
        </div>

        <p className="text-xs font-bold uppercase tracking-wider text-emerald-300">
          {isListening
            ? language === 'ur' ? 'سن رہا ہے... بولیں' : 'Listening... Speak clearly now'
            : language === 'ur' ? 'مائیک بند ہے۔ بولنے کے لیے کلک کریں' : 'Microphone paused. Tap to record.'}
        </p>

        {/* Live Transcript Display Box */}
        <div className="bg-slate-950/90 border border-emerald-800/80 rounded-2xl p-5 min-h-[120px] text-left text-slate-100 text-base leading-relaxed relative font-medium shadow-inner">
          {activeText ? (
            <div>
              <span>{transcript}</span>
              <span className="text-emerald-400 italic ml-1">{interimTranscript}</span>
            </div>
          ) : (
            <span className="text-slate-500 italic text-sm">
              {language === 'ur'
                ? 'مثلاً: "ایک شخص گر گیا ہے اور اس کے سر سے خون بہہ رہا ہے..."'
                : 'e.g., "Child choked on food and cannot breathe..."'}
            </span>
          )}
        </div>

        {/* Quick Clear / Reset Transcript button */}
        {activeText && (
          <div className="flex justify-end">
            <button
              id="reset-transcript-btn"
              onClick={() => {
                onResetTranscript();
                setManualText('');
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{language === 'ur' ? 'دوبارہ بولیں' : 'Clear & Re-record'}</span>
            </button>
          </div>
        )}

      </div>

      {/* Speech Error Callout if any */}
      {error && (
        <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div className="text-xs text-amber-900 dark:text-amber-200">
            <span className="font-bold">Voice Notice:</span> {error}
          </div>
        </div>
      )}

      {/* Manual Text Editing / Fallback Mode Toggle */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-3 shadow-sm">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
            <MessageSquareText className="w-4 h-4 text-emerald-600" />
            <span>{language === 'ur' ? 'تفصیل کی تصدیق یا ایڈٹ کریں:' : 'Verify or Edit Emergency Query:'}</span>
          </label>
        </div>

        <textarea
          id="listening-manual-textarea"
          rows={3}
          value={manualText || activeText}
          onChange={(e) => setManualText(e.target.value)}
          placeholder={
            language === 'ur'
              ? 'یہاں اپنی بقیہ بات ٹائپ کریں...'
              : 'Type or edit additional emergency details here...'
          }
          className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />

        <div className="flex items-center justify-between gap-3 pt-2">
          <button
            id="listening-cancel-secondary-btn"
            onClick={onCancel}
            className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {language === 'ur' ? 'منسوخ کریں' : 'Cancel'}
          </button>

          <button
            id="listening-send-ai-btn"
            onClick={handleSend}
            disabled={!activeText.trim()}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 disabled:opacity-50 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-emerald-600/30 transition-all"
          >
            <Send className="w-4 h-4" />
            <span>{language === 'ur' ? 'ابتدائی طبی ہدایت حاصل کریں' : 'GET AI FIRST-AID GUIDANCE'}</span>
          </button>
        </div>
      </div>

    </div>
  );
};
