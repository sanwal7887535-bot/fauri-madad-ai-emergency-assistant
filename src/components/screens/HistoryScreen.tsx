import React, { useState } from 'react';
import { History, Trash2, Search, ArrowRight, ShieldAlert, FileText, Download } from 'lucide-react';
import { HistorySession, Language, EmergencyGuidance } from '../../types';

interface HistoryScreenProps {
  sessions: HistorySession[];
  language: Language;
  onOpenSession: (guidance: EmergencyGuidance, query: string) => void;
  onClearHistory: () => void;
  onDeleteSession: (id: string) => void;
}

export const HistoryScreen: React.FC<HistoryScreenProps> = ({
  sessions,
  language,
  onOpenSession,
  onClearHistory,
  onDeleteSession,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const filteredSessions = sessions.filter(
    (s) =>
      !searchTerm.trim() ||
      s.query.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.guidance.situation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(sessions, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `fauri_madad_history_${new Date().toISOString().slice(0,10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div id="history-screen-container" className="space-y-6 pb-12 animate-in fade-in duration-300">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <History className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            <span>{language === 'ur' ? 'سابقی ایمرجنسی ریکارڈ' : 'First-Aid Session History'}</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            {language === 'ur'
              ? 'براؤزر کے لوکل اسٹوریج میں محفوظ کردہ سابقہ صوتی سوالات'
              : 'Past emergency queries saved locally on your device in browser localStorage'}
          </p>
        </div>

        {sessions.length > 0 && (
          <div className="flex items-center gap-2">
            <button
              id="export-history-btn"
              onClick={handleExportJSON}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold transition-colors border border-slate-200 dark:border-slate-700"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{language === 'ur' ? 'ایکسپورٹ' : 'Export JSON'}</span>
            </button>

            <button
              id="clear-history-trigger-btn"
              onClick={() => setShowClearConfirm(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-50 hover:bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-300 text-xs font-bold transition-colors border border-red-200 dark:border-red-900/50"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>{language === 'ur' ? 'ہسٹری صاف کریں' : 'Clear All'}</span>
            </button>
          </div>
        )}
      </div>

      {/* Search Input */}
      {sessions.length > 0 && (
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            id="history-search-input"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={
              language === 'ur' ? 'سابقی ہسٹری میں تلاش کریں...' : 'Search session logs by condition or query...'
            }
            className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm"
          />
        </div>
      )}

      {/* Session Cards List */}
      {filteredSessions.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200 dark:border-emerald-800">
            <FileText className="w-6 h-6" />
          </div>
          <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
            {language === 'ur' ? 'کوئی سابقہ ریکارڈ نہیں ملا' : 'No Saved Emergency Sessions'}
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto font-medium">
            {language === 'ur'
              ? 'جب آپ صوتی اسسٹنٹ استعمال کر کے ہدایت سیو کریں گے تو وہ یہاں محفوظ ہوگی۔'
              : 'When you ask for emergency guidance and tap "Save", it will appear here for instant offline review.'}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredSessions.map((session) => {
            const dateStr = new Date(session.timestamp).toLocaleDateString(undefined, {
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            });

            return (
              <div
                key={session.id}
                id={`history-item-${session.id}`}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm hover:border-emerald-500 dark:hover:border-emerald-500 transition-all space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[11px] font-bold text-slate-400 font-mono">
                        {dateStr}
                      </span>
                      {session.guidance.urgent && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-red-100 text-red-700 dark:bg-red-950/80 dark:text-red-300 uppercase border border-red-200 dark:border-red-800">
                          1122 Urgent
                        </span>
                      )}
                    </div>

                    <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
                      "{session.query}"
                    </h3>

                    <p className="text-xs text-emerald-600 dark:text-emerald-400 font-extrabold mt-1">
                      {language === 'ur' ? 'صورتحال:' : 'Situation:'} {language === 'ur' && session.guidance.urdu?.situation ? session.guidance.urdu.situation : session.guidance.situation}
                    </p>
                  </div>

                  <button
                    id={`delete-session-btn-${session.id}`}
                    onClick={() => onDeleteSession(session.id)}
                    className="p-1.5 text-slate-400 hover:text-red-600 dark:hover:text-red-400 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    title="Delete session"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
                  <span className="text-xs text-slate-500 font-medium">
                    {session.guidance.steps.length} {language === 'ur' ? 'اقدامات' : 'steps recorded'}
                  </span>

                  <button
                    id={`open-session-btn-${session.id}`}
                    onClick={() => onOpenSession(session.guidance, session.query)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-sm transition-all"
                  >
                    <span>{language === 'ur' ? 'ہدایات دوبارہ کھولیں' : 'Reopen Guidance'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Confirmation Modal for Clear History */}
      {showClearConfirm && (
        <div id="clear-history-confirm-modal" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 max-w-sm w-full space-y-4 shadow-2xl">
            <div className="flex items-center gap-3 text-red-600">
              <ShieldAlert className="w-6 h-6" />
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                {language === 'ur' ? 'ہسٹری صاف کریں؟' : 'Clear All History?'}
              </h3>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
              {language === 'ur'
                ? 'کیا آپ تمام محفوظ شدہ ہنگامی ہدایت کا ریکارڈ حذف کرنا چاہتے ہیں؟ یہ عمل واپس نہیں ہو سکتا۔'
                : 'Are you sure you want to delete all saved emergency guidance sessions? This cannot be undone.'}
            </p>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300"
              >
                {language === 'ur' ? 'منسوخ' : 'Cancel'}
              </button>

              <button
                id="confirm-clear-history-btn"
                onClick={() => {
                  onClearHistory();
                  setShowClearConfirm(false);
                }}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-extrabold shadow-md"
              >
                {language === 'ur' ? 'ہاں، حذف کریں' : 'Yes, Delete All'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
