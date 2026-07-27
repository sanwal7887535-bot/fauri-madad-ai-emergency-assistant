import React, { useState, useEffect } from 'react';
import {
  PhoneCall, Volume2, VolumeX, Pause, Play, RotateCcw, AlertTriangle, CheckCircle2,
  Bookmark, Send, ShieldAlert, Share2, Check, ArrowLeft, MessageSquare, AlertCircle
} from 'lucide-react';
import { EmergencyGuidance, Language } from '../../types';

interface GuidanceScreenProps {
  guidance: EmergencyGuidance;
  language: Language;
  onToggleLanguage?: (lang: Language) => void;
  onOpenDialModal: () => void;
  onNewEmergency: () => void;
  onSaveHistory: () => void;
  isSaved: boolean;
  speak: (text: string, lang?: 'en' | 'ur', rate?: number) => void;
  speakStep: (stepText: string, stepNum: number, lang?: 'en' | 'ur', rate?: number) => void;
  pauseSpeech: () => void;
  resumeSpeech: () => void;
  cancelSpeech: () => void;
  isSpeaking: boolean;
  isPaused: boolean;
  currentChunkIndex?: number;
  totalChunks?: number;
  speechSpeed: number;
  userApiKeyActive?: boolean;
}

export const GuidanceScreen: React.FC<GuidanceScreenProps> = ({
  guidance,
  language,
  onToggleLanguage,
  onOpenDialModal,
  onNewEmergency,
  onSaveHistory,
  isSaved,
  speak,
  speakStep,
  pauseSpeech,
  resumeSpeech,
  cancelSpeech,
  isSpeaking,
  isPaused,
  currentChunkIndex = 0,
  totalChunks = 0,
  speechSpeed,
}) => {
  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>({});
  const [activeLang, setActiveLang] = useState<Language>(language);
  const [copied, setCopied] = useState(false);

  // Synchronize local activeLang state whenever parent language prop changes
  useEffect(() => {
    setActiveLang(language);
  }, [language]);

  // Handle local and global language toggles
  const handleToggleLang = () => {
    const nextLang = activeLang === 'en' ? 'ur' : 'en';
    setActiveLang(nextLang);
    if (onToggleLanguage) {
      onToggleLanguage(nextLang);
    }
  };

  // Follow-up state
  const [followUpInput, setFollowUpInput] = useState('');
  const [followUpList, setFollowUpList] = useState<{ q: string; a: string; ura: string }[]>([]);
  const [followUpLoading, setFollowUpLoading] = useState(false);

  const isUrdu = activeLang === 'ur' || language === 'ur';

  const displayData = isUrdu ? {
    situation: (guidance.urdu && guidance.urdu.situation) ? guidance.urdu.situation : guidance.situation,
    steps: (guidance.urdu && guidance.urdu.steps && guidance.urdu.steps.length > 0) ? guidance.urdu.steps : guidance.steps,
    doNots: (guidance.urdu && guidance.urdu.doNots && guidance.urdu.doNots.length > 0) ? guidance.urdu.doNots : guidance.doNots,
    urgencyReason: (guidance.urdu && guidance.urdu.urgencyReason) ? guidance.urdu.urgencyReason : guidance.urgencyReason,
    disclaimer: (guidance.urdu && guidance.urdu.disclaimer) ? guidance.urdu.disclaimer : guidance.disclaimer,
  } : {
    situation: guidance.situation,
    steps: guidance.steps,
    doNots: guidance.doNots,
    urgencyReason: guidance.urgencyReason,
    disclaimer: guidance.disclaimer,
  };

  // Direct, thorough, immediate Speech Text for Voice Assistant stating ALL immediate steps and warnings
  const fullSpeechText = activeLang === 'ur'
    ? `ایمرجنسی صورتحال: ${displayData.situation}۔ ${
        guidance.urgent ? 'فوری طور پر ریسکیو 1122 ڈائل کریں۔' : ''
      } تمام ضروری اور فوری ترین اقدامات درج ذیل ہیں: ${
        displayData.steps.map((s, i) => `اقدام نمبر ${i + 1}: ${s}۔`).join(' ')
      } اہم غلطیاں جن سے بچنا لازمی ہے: ${
        displayData.doNots.map((d) => `${d}۔`).join(' ')
      }`
    : `Emergency situation: ${displayData.situation}. ${
        guidance.urgent ? 'Call Rescue 1122 immediately.' : ''
      } Here are all the immediate steps you must take right now. ${
        displayData.steps.map((s, i) => `Step ${i + 1}: ${s}.`).join(' ')
      } Critical mistakes to avoid: ${
        displayData.doNots.map((d) => `Do not ${d}.`).join(' ')
      }`;

  useEffect(() => {
    // Automatically read guidance aloud on load
    speak(fullSpeechText, activeLang, speechSpeed);
    return () => cancelSpeech();
  }, [activeLang, speechSpeed]);

  const toggleStep = (index: number) => {
    setCompletedSteps((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const handleSpeechToggle = () => {
    if (isSpeaking) {
      pauseSpeech();
    } else if (isPaused) {
      resumeSpeech();
    } else {
      speak(fullSpeechText, activeLang, speechSpeed);
    }
  };

  const handleCopy = () => {
    const textToCopy = `FAURI MADAD EMERGENCY GUIDANCE\nSituation: ${displayData.situation}\n\nDO THIS NOW:\n${displayData.steps.map((s, i) => `${i + 1}. ${s}`).join('\n')}\n\nDO NOT:\n${displayData.doNots.map((d) => `- ${d}`).join('\n')}\n\nEmergency 1122: ${guidance.urgent ? 'YES' : 'NO'} (${displayData.urgencyReason})`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFollowUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!followUpInput.trim() || followUpLoading) return;

    const q = followUpInput.trim();
    setFollowUpInput('');
    setFollowUpLoading(true);

    try {
      const res = await fetch('/api/followup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          previousSituation: displayData.situation,
          question: q,
          language: activeLang,
        }),
      });

      const json = await res.json();
      if (json.success && json.data) {
        setFollowUpList((prev) => [
          ...prev,
          { q, a: json.data.answer || '', ura: json.data.urduAnswer || '' }
        ]);
      } else {
        setFollowUpList((prev) => [
          ...prev,
          { q, a: 'Call 1122 if condition worsens.', ura: 'حالت خراب ہونے پر 1122 ڈائل کریں۔' }
        ]);
      }
    } catch (_) {
      setFollowUpList((prev) => [
        ...prev,
        { q, a: 'Error getting follow-up. Always prioritize 1122.', ura: 'مسئلہ پیش آیا۔ 1122 پر کال کریں۔' }
      ]);
    } finally {
      setFollowUpLoading(false);
    }
  };

  return (
    <div id="guidance-screen-container" className="space-y-6 pb-12 animate-in fade-in duration-300">
      
      {/* Top Controls Bar */}
      <div className="flex items-center justify-between gap-3">
        <button
          id="guidance-back-home-btn"
          onClick={onNewEmergency}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{activeLang === 'ur' ? 'نیا صوتی سوال' : 'New Voice Query'}</span>
        </button>

        <div className="flex items-center gap-2">
          {/* Language Toggle */}
          <button
            id="guidance-lang-toggle"
            onClick={handleToggleLang}
            className="px-3 py-1.5 text-xs font-bold rounded-xl bg-emerald-50 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
          >
            {activeLang === 'en' ? 'اردو میں دیکھیں' : 'Switch to English'}
          </button>

          {/* Bookmark / Save History */}
          <button
            id="guidance-save-history-btn"
            onClick={onSaveHistory}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
              isSaved
                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300'
                : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-emerald-600' : ''}`} />
            <span>{isSaved ? (activeLang === 'ur' ? 'محفوظ شدہ' : 'Saved') : (activeLang === 'ur' ? 'سیو کریں' : 'Save')}</span>
          </button>
        </div>
      </div>

      {/* Situation Title Banner */}
      <div id="guidance-situation-card" className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 border border-emerald-800/80 rounded-2xl p-5 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 text-[11px] font-bold uppercase tracking-wider mb-2 border border-emerald-500/30">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>{activeLang === 'ur' ? 'ممکنہ ایمرجنسی صورتحال' : 'Likely Emergency Situation'}</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white">
            {displayData.situation}
          </h2>
        </div>

        {/* Pinned Call 1122 Badge Button */}
        <button
          id="guidance-pinned-1122-btn"
          onClick={onOpenDialModal}
          className={`shrink-0 flex items-center justify-center gap-2.5 px-5 py-3 rounded-xl font-extrabold text-sm shadow-lg transition-all hover:scale-105 ${
            guidance.urgent
              ? 'bg-red-600 hover:bg-red-700 text-white shadow-red-600/40 animate-pulse'
              : 'bg-amber-600 hover:bg-amber-700 text-white shadow-amber-600/30'
          }`}
        >
          <PhoneCall className="w-5 h-5" />
          <span>{activeLang === 'ur' ? '1122 ڈائل کریں' : 'CALL 1122 NOW'}</span>
        </button>
      </div>

      {/* Urgency Recommendation Callout Box */}
      <div className={`p-4 rounded-2xl border flex items-start gap-3.5 ${
        guidance.urgent
          ? 'bg-red-50 dark:bg-red-950/40 border-red-200 dark:border-red-900/60 text-red-900 dark:text-red-200'
          : 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-900/60 text-amber-900 dark:text-amber-200'
      }`}>
        <AlertTriangle className={`w-6 h-6 shrink-0 mt-0.5 ${guidance.urgent ? 'text-red-600 dark:text-red-400' : 'text-amber-600 dark:text-amber-400'}`} />
        <div>
          <div className="font-extrabold text-sm">
            {guidance.urgent
              ? (activeLang === 'ur' ? 'فوری 1122 کی ضرورت ہے:' : 'Call Rescue 1122 Recommended Immediately:')
              : (activeLang === 'ur' ? 'احتیاطی تدابیر کی ضرورت ہے:' : 'Monitor Victim & Prepare 1122 if needed:')}
          </div>
          <p className="text-xs mt-0.5 leading-relaxed font-semibold">
            {displayData.urgencyReason}
          </p>
        </div>
      </div>

      {/* Text-To-Speech Voice Audio Controller Bar */}
      <div id="guidance-tts-player-bar" className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        
        <div className="flex items-center gap-3">
          <button
            id="guidance-tts-play-pause-btn"
            onClick={handleSpeechToggle}
            className={`w-12 h-12 rounded-xl text-white flex items-center justify-center shadow-md transition-all active:scale-95 font-bold shrink-0 ${
              isSpeaking
                ? 'bg-amber-600 hover:bg-amber-700 shadow-amber-600/30 animate-pulse'
                : 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/30'
            }`}
            title={isSpeaking ? 'Pause Voice Assistant' : 'Play All Immediate Steps Aloud'}
          >
            {isSpeaking ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
          </button>

          <div>
            <div className="text-xs font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
              <Volume2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>{activeLang === 'ur' ? 'صوتی اسسٹنٹ — تمام اقدامات سنیں' : 'Voice Assistant — Read All Immediate Steps'}</span>
              {isSpeaking && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 animate-pulse">
                  {totalChunks > 0 ? `${currentChunkIndex}/${totalChunks}` : 'Speaking'}
                </span>
              )}
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
              {isSpeaking
                ? (activeLang === 'ur' ? 'تمام لائف سیونگ اقدامات باآواز پڑھے جا رہے ہیں...' : 'Dictating all immediate life-saving steps in order...')
                : (activeLang === 'ur' ? 'تمام بلا تاخیر اقدامات با آواز سننے کے لیے کلک کریں' : 'Tap to play all immediate emergency steps aloud')}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-center">
          <button
            id="guidance-tts-replay-btn"
            onClick={() => speak(fullSpeechText, activeLang, speechSpeed)}
            className="p-2.5 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-slate-200 dark:border-slate-800"
            title="Replay all steps from start"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            id="guidance-tts-stop-btn"
            onClick={cancelSpeech}
            className="p-2.5 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-slate-200 dark:border-slate-800"
            title="Stop voice playback"
          >
            <VolumeX className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* DO THIS NOW (Numbered Action Cards with large readable text) */}
      <div id="guidance-do-this-now-section" className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <span>{activeLang === 'ur' ? 'فوری کرنے والے تمام کام (بالترتیب):' : 'Do This Now (Sequential Action Steps):'}</span>
          </h3>

          <span className="text-xs font-bold text-slate-500">
            {Object.keys(completedSteps).filter(k => completedSteps[Number(k)]).length} / {displayData.steps.length} {activeLang === 'ur' ? 'مکمل' : 'Done'}
          </span>
        </div>

        <div className="space-y-3">
          {displayData.steps.map((step, idx) => {
            const isDone = !!completedSteps[idx];
            return (
              <div
                key={idx}
                id={`guidance-step-card-${idx}`}
                onClick={() => toggleStep(idx)}
                className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                  isDone
                    ? 'bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800 opacity-80'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-emerald-500 dark:hover:border-emerald-500 shadow-sm'
                }`}
              >
                {/* Step Number Badge */}
                <div className={`w-9 h-9 rounded-xl font-extrabold text-base flex items-center justify-center shrink-0 ${
                  isDone
                    ? 'bg-emerald-600 text-white'
                    : 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                }`}>
                  {isDone ? <Check className="w-5 h-5" /> : idx + 1}
                </div>

                <div className="flex-1 min-w-0 pt-0.5">
                  <p className={`text-base sm:text-lg font-bold leading-snug ${
                    isDone
                      ? 'line-through text-slate-500 dark:text-slate-400'
                      : 'text-slate-900 dark:text-slate-100'
                  }`}>
                    {step}
                  </p>
                </div>

                {/* Individual Step Voice Listen Button */}
                <button
                  id={`listen-step-btn-${idx}`}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    speakStep(step, idx + 1, activeLang, speechSpeed);
                  }}
                  className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-600 hover:text-white dark:hover:bg-emerald-600 transition-all border border-emerald-200/80 dark:border-emerald-800/80 shrink-0 self-center"
                  title={activeLang === 'ur' ? 'یہ قدم باآواز سنیں' : 'Listen to this specific step'}
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* DO NOT (Mistakes to Avoid in Cautions) */}
      <div id="guidance-do-nots-section" className="bg-amber-50/90 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 rounded-2xl p-5 space-y-3">
        <h3 className="text-sm font-extrabold text-amber-950 dark:text-amber-200 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
          <span>{activeLang === 'ur' ? 'یہ غلطیاں ہرگز نہ کریں (Do NOT):' : 'Do NOT (Critical Mistakes to Avoid):'}</span>
        </h3>

        <ul className="space-y-2">
          {displayData.doNots.map((dont, idx) => (
            <li key={idx} className="text-xs sm:text-sm font-bold text-amber-950 dark:text-amber-100 flex items-start gap-2">
              <span className="text-red-600 dark:text-red-400 font-extrabold text-base">•</span>
              <span>{dont}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Follow-up Question Section */}
      <div id="guidance-followup-section" className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <h4 className="text-xs font-extrabold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
          <MessageSquare className="w-4 h-4 text-emerald-600" />
          <span>{activeLang === 'ur' ? 'مزید سوال پوچھیں' : 'Ask a Follow-Up Question'}</span>
        </h4>

        {/* Previous Follow-up Q&A list */}
        {followUpList.length > 0 && (
          <div className="space-y-3">
            {followUpList.map((item, i) => (
              <div key={i} className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl space-y-1 text-xs">
                <p className="font-bold text-slate-900 dark:text-white">Q: {item.q}</p>
                <p className="text-slate-700 dark:text-slate-300">A: {activeLang === 'ur' ? item.ura : item.a}</p>
              </div>
            ))}
          </div>
        )}

        <form onSubmit={handleFollowUpSubmit} className="flex gap-2">
          <input
            id="followup-input-field"
            type="text"
            value={followUpInput}
            onChange={(e) => setFollowUpInput(e.target.value)}
            placeholder={
              activeLang === 'ur'
                ? 'مثلاً: اگر مریض کو ہوش نہ آئے تو کیا کریں؟'
                : 'e.g., "What if the person feels dizzy again?"'
            }
            className="flex-1 px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <button
            id="submit-followup-btn"
            type="submit"
            disabled={!followUpInput.trim() || followUpLoading}
            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl disabled:opacity-50 transition-colors flex items-center gap-1"
          >
            {followUpLoading ? (
              <span>...</span>
            ) : (
              <>
                <Send className="w-3.5 h-3.5" />
                <span>{activeLang === 'ur' ? 'بھیجیں' : 'Ask'}</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Share / Copy Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <button
          id="guidance-copy-share-btn"
          onClick={handleCopy}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs rounded-xl transition-colors border border-slate-200 dark:border-slate-700"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
          <span>{copied ? (activeLang === 'ur' ? 'کاپی ہو گیا' : 'Copied Guidance') : (activeLang === 'ur' ? 'کاپی / شیئر کریں' : 'Copy / Share First-Aid Steps')}</span>
        </button>

        <button
          id="guidance-new-emergency-btn"
          onClick={onNewEmergency}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-md shadow-emerald-600/30 transition-all"
        >
          <span>{activeLang === 'ur' ? 'نئی ایمرجنسی ہدایت' : 'New Emergency Query'}</span>
        </button>
      </div>

      {/* Mandatory Safety Disclaimer Footer */}
      <div className="p-3.5 bg-slate-100 dark:bg-slate-900 rounded-2xl text-[11px] text-slate-600 dark:text-slate-400 text-center italic border border-slate-200 dark:border-slate-800 font-medium">
        {displayData.disclaimer}
      </div>

    </div>
  );
};
