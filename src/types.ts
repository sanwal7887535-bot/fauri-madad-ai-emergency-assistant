export type Language = 'en' | 'ur';

export interface EmergencyGuidance {
  situation: string;
  steps: string[];
  doNots: string[];
  urgent: boolean;
  urgencyReason: string;
  disclaimer: string;
  urdu?: {
    situation: string;
    steps: string[];
    doNots: string[];
    urgencyReason: string;
    disclaimer: string;
  };
}

export interface GuidanceResponse {
  success: boolean;
  data?: EmergencyGuidance;
  error?: string;
  sourceKey?: 'default' | 'personal';
}

export interface HistorySession {
  id: string;
  timestamp: string; // ISO date string
  query: string;
  language: Language;
  guidance: EmergencyGuidance;
  notes?: string;
}

export interface EmergencyLibraryTopic {
  id: string;
  titleEn: string;
  titleUr: string;
  category: string;
  iconName: string;
  descriptionEn: string;
  descriptionUr: string;
  stepsEn: string[];
  stepsUr: string[];
  doNotsEn: string[];
  doNotsUr: string[];
  call1122Immediate: boolean;
  callReasonEn: string;
  callReasonUr: string;
}

export interface EmergencyCategory {
  id: string;
  nameEn: string;
  nameUr: string;
  iconName: string;
  descriptionEn: string;
  descriptionUr: string;
  sampleQueryEn: string;
  sampleQueryUr: string;
  bgGradient: string;
  borderColor: string;
}

export interface AppSettings {
  language: Language;
  darkMode: boolean;
  autoReadSpeech: boolean;
  speechSpeed: number; // 0.8, 1.0, 1.2
  speechVoice: string;
  userApiKey: string;
}

export type ScreenName = 'home' | 'listening' | 'processing' | 'guidance' | 'library' | 'history' | 'about' | 'settings';
