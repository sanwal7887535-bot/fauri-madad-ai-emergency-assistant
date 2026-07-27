import React, { useState } from 'react';
import { Search, BookOpen, ShieldAlert, PhoneCall, ChevronDown, ChevronUp, Zap, Sun, Wind, Droplet, Flame, HeartPulse } from 'lucide-react';
import { Language } from '../../types';
import { EMERGENCY_LIBRARY } from '../../data/emergencyLibrary';

interface LibraryScreenProps {
  language: Language;
  onOpenDialModal: () => void;
  onSubmitQuery: (query: string) => void;
}

export const LibraryScreen: React.FC<LibraryScreenProps> = ({ language, onOpenDialModal, onSubmitQuery }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedTopicId, setExpandedTopicId] = useState<string | null>('snake_bite');

  const categoryItems = [
    { id: 'All', labelEn: 'All Scenarios', labelUr: 'تمام زمرے' },
    { id: 'Airway & Breathing', labelEn: 'Airway & Breathing', labelUr: 'سانس اور دم گھٹنا' },
    { id: 'Wounds & Circulation', labelEn: 'Wounds & Circulation', labelUr: 'خون اور زخم' },
    { id: 'Trauma & Environmental', labelEn: 'Trauma & Environmental', labelUr: 'کرنٹ اور زہر' },
    { id: 'Environmental', labelEn: 'Environmental', labelUr: 'ماحولیاتی و جانور' },
    { id: 'Skin & Thermal', labelEn: 'Skin & Thermal', labelUr: 'جلنا اور جلد' },
  ];

  const filteredTopics = EMERGENCY_LIBRARY.filter((topic) => {
    const matchesCategory = selectedCategory === 'All' || topic.category === selectedCategory;
    const term = searchTerm.toLowerCase().trim();
    const matchesSearch =
      !term ||
      topic.titleEn.toLowerCase().includes(term) ||
      topic.titleUr.includes(term) ||
      topic.descriptionEn.toLowerCase().includes(term) ||
      topic.descriptionUr.includes(term);

    return matchesCategory && matchesSearch;
  });

  const getTopicIcon = (iconName: string) => {
    switch (iconName) {
      case 'Zap': return <Zap className="w-5 h-5 text-amber-500" />;
      case 'Sun': return <Sun className="w-5 h-5 text-yellow-500" />;
      case 'Wind': return <Wind className="w-5 h-5 text-teal-500" />;
      case 'Droplet': return <Droplet className="w-5 h-5 text-red-500" />;
      case 'Flame': return <Flame className="w-5 h-5 text-orange-500" />;
      default: return <HeartPulse className="w-5 h-5 text-emerald-500" />;
    }
  };

  return (
    <div id="library-screen-container" className="space-y-6 pb-12 animate-in fade-in duration-300">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-950 rounded-2xl p-6 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border border-emerald-800/60">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-bold mb-2">
            <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
            <span>{language === 'ur' ? 'آف لائن ڈائریکٹری • بغیر انٹرنیٹ' : 'Offline Reference • Zero API Calls Needed'}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white">
            {language === 'ur' ? 'پاکستان ایمرجنسی فرسٹ ایڈ ڈائریکٹری' : 'Pakistan Emergency First-Aid Library'}
          </h2>
          <p className="text-xs text-slate-300 mt-1 max-w-xl font-medium">
            {language === 'ur'
              ? 'سانپ کا کاٹنا، بجلی کا جھٹکا، ہیٹ اسٹروک اور حادثات کے اہم ترین فوری اقدامات پڑھیں۔'
              : 'Instant medical reference steps for common outdoor and domestic emergency situations.'}
          </p>
        </div>

        <button
          id="library-1122-call-btn"
          onClick={onOpenDialModal}
          className="shrink-0 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs rounded-xl shadow-md flex items-center gap-2"
        >
          <PhoneCall className="w-4 h-4" />
          <span>{language === 'ur' ? 'ڈائل 1122' : 'Call 1122'}</span>
        </button>
      </div>

      {/* Search Bar & Category Chips */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3" />
          <input
            id="library-search-input"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={
              language === 'ur'
                ? 'تلاش کریں (مثلاً: سانپ، کرنٹ، جلنا، خون)...'
                : 'Search library e.g., "Snake bite", "Electric shock", "Heatstroke"...'
            }
            className="w-full pl-11 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm"
          />
        </div>

        {/* Category Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {categoryItems.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {language === 'ur' ? cat.labelUr : cat.labelEn}
            </button>
          ))}
        </div>
      </div>

      {/* Topic List */}
      <div className="space-y-4">
        {filteredTopics.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-2">
            <BookOpen className="w-8 h-8 text-slate-400 mx-auto" />
            <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
              {language === 'ur' ? 'کوئی ایمرجنسی عنوان نہیں ملا' : 'No matching emergency topic found'}
            </p>
            <p className="text-xs text-slate-500">
              {language === 'ur' ? 'کوشش کریں کہ صوتی اسسٹنٹ پر پوچھیں۔' : 'Try searching another term or ask the Voice AI Assistant.'}
            </p>
          </div>
        ) : (
          filteredTopics.map((topic) => {
            const isExpanded = expandedTopicId === topic.id;
            const steps = language === 'ur' ? topic.stepsUr : topic.stepsEn;
            const doNots = language === 'ur' ? topic.doNotsUr : topic.doNotsEn;
            const title = language === 'ur' ? topic.titleUr : topic.titleEn;
            const desc = language === 'ur' ? topic.descriptionUr : topic.descriptionEn;
            const callReason = language === 'ur' ? topic.callReasonUr : topic.callReasonEn;

            return (
              <div
                key={topic.id}
                id={`library-card-${topic.id}`}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden transition-all"
              >
                {/* Header Toggle */}
                <div
                  onClick={() => setExpandedTopicId(isExpanded ? null : topic.id)}
                  className="p-4 sm:p-5 flex items-center justify-between cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/40 dark:border-emerald-800/40 shrink-0">
                      {getTopicIcon(topic.iconName)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                          {title}
                        </h3>
                        {topic.call1122Immediate && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-red-100 text-red-700 dark:bg-red-950/80 dark:text-red-300 border border-red-200 dark:border-red-800">
                            1122 Urgent
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-medium">
                        {desc}
                      </p>
                    </div>
                  </div>

                  <button className="p-1 text-slate-400">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="px-5 pb-5 pt-2 border-t border-slate-100 dark:border-slate-800 space-y-4">
                    
                    {/* Call 1122 Reason Box */}
                    <div className="p-3.5 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 rounded-xl text-xs text-red-900 dark:text-red-200 flex items-start gap-2.5">
                      <ShieldAlert className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-extrabold">{language === 'ur' ? '1122 کی وجہ:' : '1122 Call Reason:'}</span>{' '}
                        {callReason}
                      </div>
                    </div>

                    {/* Step List */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
                        {language === 'ur' ? 'ابتدائی طبی تدابیر (Do This Now):' : 'Immediate First-Aid Action Steps:'}
                      </h4>
                      <ol className="space-y-2">
                        {steps.map((st, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-800 dark:text-slate-200">
                            <span className="w-5 h-5 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-extrabold text-xs flex items-center justify-center shrink-0 mt-0.5 border border-emerald-300 dark:border-emerald-800">
                              {i + 1}
                            </span>
                            <span className="leading-relaxed font-semibold">{st}</span>
                          </li>
                        ))}
                      </ol>
                    </div>

                    {/* Do NOT list */}
                    <div className="p-3.5 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 rounded-xl space-y-1.5">
                      <h4 className="text-xs font-extrabold text-amber-900 dark:text-amber-200">
                        {language === 'ur' ? 'یہ غلطیاں نہ کریں (Do NOT):' : 'Do NOT:'}
                      </h4>
                      <ul className="space-y-1">
                        {doNots.map((dn, i) => (
                          <li key={i} className="text-xs font-bold text-amber-950 dark:text-amber-100 flex items-start gap-1.5">
                            <span className="text-red-600 font-extrabold">•</span>
                            <span>{dn}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Ask AI Voice for this topic */}
                    <div className="pt-2 flex justify-end">
                      <button
                        id={`ask-ai-for-topic-${topic.id}`}
                        onClick={() => onSubmitQuery(`First aid steps for ${topic.titleEn}`)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-sm"
                      >
                        <span>{language === 'ur' ? 'AI سے باآواز پوچھیں' : 'Ask AI Voice for this topic'}</span>
                      </button>
                    </div>

                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

    </div>
  );
};
