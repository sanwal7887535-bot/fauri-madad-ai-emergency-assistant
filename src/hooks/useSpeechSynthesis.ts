import { useState, useEffect, useCallback, useRef } from 'react';

interface SpeechSynthesisHook {
  isSpeaking: boolean;
  isPaused: boolean;
  isSupported: boolean;
  currentChunkIndex: number;
  totalChunks: number;
  voices: SpeechSynthesisVoice[];
  speak: (text: string, lang?: 'en' | 'ur', rate?: number) => void;
  speakStep: (stepText: string, stepNum: number, lang?: 'en' | 'ur', rate?: number) => void;
  pause: () => void;
  resume: () => void;
  cancel: () => void;
}

export function useSpeechSynthesis(): SpeechSynthesisHook {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [isSupported, setIsSupported] = useState(true);
  const [currentChunkIndex, setCurrentChunkIndex] = useState(0);
  const [totalChunks, setTotalChunks] = useState(0);

  const synthRef = useRef<SpeechSynthesis | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const chunksRef = useRef<string[]>([]);
  const chunkIndexRef = useRef<number>(0);
  const langRef = useRef<'en' | 'ur'>('en');
  const rateRef = useRef<number>(1.0);
  const isCancelledRef = useRef<boolean>(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;

      const updateVoices = () => {
        if (synthRef.current) {
          const availableVoices = synthRef.current.getVoices();
          setVoices(availableVoices);
        }
      };

      updateVoices();
      if (synthRef.current.onvoiceschanged !== undefined) {
        synthRef.current.onvoiceschanged = updateVoices;
      }
    } else {
      setIsSupported(false);
    }

    return () => {
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, []);

  const playNextChunk = useCallback(() => {
    if (
      !synthRef.current ||
      isCancelledRef.current ||
      chunkIndexRef.current >= chunksRef.current.length
    ) {
      setIsSpeaking(false);
      setIsPaused(false);
      setCurrentChunkIndex(0);
      setTotalChunks(0);
      return;
    }

    const chunkText = chunksRef.current[chunkIndexRef.current];
    setCurrentChunkIndex(chunkIndexRef.current + 1);

    const utterance = new SpeechSynthesisUtterance(chunkText);
    utteranceRef.current = utterance; // Keep active reference to prevent GC

    const lang = langRef.current;
    const rate = rateRef.current;

    utterance.rate = Math.max(0.7, Math.min(rate, 1.3));
    utterance.pitch = 1.0;

    const availableVoices = synthRef.current ? synthRef.current.getVoices() : [];
    let selectedVoice: SpeechSynthesisVoice | null = null;

    if (lang === 'ur') {
      utterance.lang = 'ur-PK';
      selectedVoice =
        availableVoices.find((v) => v.lang.toLowerCase().includes('ur')) ||
        availableVoices.find((v) => v.lang.toLowerCase().includes('hi')) ||
        availableVoices.find((v) => v.lang.toLowerCase().includes('en-in')) ||
        null;
    } else {
      utterance.lang = 'en-US';
      selectedVoice =
        availableVoices.find((v) => v.lang === 'en-US') ||
        availableVoices.find((v) => v.lang.startsWith('en-US')) ||
        availableVoices.find((v) => v.lang.startsWith('en-GB')) ||
        availableVoices.find((v) => v.lang.toLowerCase().startsWith('en')) ||
        null;
    }

    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    utterance.onstart = () => {
      setIsSpeaking(true);
      setIsPaused(false);
    };

    utterance.onend = () => {
      chunkIndexRef.current += 1;
      if (!isCancelledRef.current) {
        // Small gap between sentences for clear natural listening
        setTimeout(() => {
          playNextChunk();
        }, 120);
      }
    };

    utterance.onerror = (e) => {
      console.warn('Speech chunk error:', e);
      chunkIndexRef.current += 1;
      if (!isCancelledRef.current && chunkIndexRef.current < chunksRef.current.length) {
        setTimeout(() => {
          playNextChunk();
        }, 150);
      } else {
        setIsSpeaking(false);
        setIsPaused(false);
      }
    };

    try {
      // Unfreeze Chrome speech synthesis queue if paused
      if (synthRef.current.paused) {
        synthRef.current.resume();
      }
      synthRef.current.speak(utterance);
    } catch (err) {
      console.error('Failed to speak utterance chunk:', err);
      setIsSpeaking(false);
    }
  }, []);

  const speak = useCallback((text: string, lang: 'en' | 'ur' = 'en', rate: number = 1.0) => {
    if (!synthRef.current || !text || !text.trim()) return;

    // Reset cancellation flag
    isCancelledRef.current = false;

    // Unfreeze and cancel any previous speech
    if (synthRef.current.paused) {
      synthRef.current.resume();
    }
    synthRef.current.cancel();

    // Clean formatting and split text into manageable sentences
    const cleanText = text
      .replace(/[*#_~`]/g, '')
      .replace(/\s+/g, ' ')
      .trim();

    // Split on sentence boundaries (. ! ? ۔) or comma boundaries for long blocks
    let validChunks: string[] = [];
    const rawChunks = cleanText.split(/(?<=[.!?۔\n])\s+/);
    for (const chunk of rawChunks) {
      const trimmed = chunk.trim();
      if (!trimmed) continue;
      if (trimmed.length > 180) {
        const subChunks = trimmed.split(/(?<=[,;،])\s+/);
        for (const sub of subChunks) {
          if (sub.trim()) validChunks.push(sub.trim());
        }
      } else {
        validChunks.push(trimmed);
      }
    }

    if (validChunks.length === 0) validChunks = [cleanText];

    chunksRef.current = validChunks;
    chunkIndexRef.current = 0;
    langRef.current = lang;
    rateRef.current = rate;

    setTotalChunks(validChunks.length);
    setCurrentChunkIndex(1);

    // Short timeout to clear previous audio buffer cleanly
    setTimeout(() => {
      if (!isCancelledRef.current) {
        playNextChunk();
      }
    }, 60);
  }, [playNextChunk]);

  // Read a single step aloud
  const speakStep = useCallback((stepText: string, stepNum: number, lang: 'en' | 'ur' = 'en', rate: number = 1.0) => {
    const announcement = lang === 'ur'
      ? `اقدام نمبر ${stepNum}: ${stepText}`
      : `Step ${stepNum}: ${stepText}`;
    speak(announcement, lang, rate);
  }, [speak]);

  const pause = useCallback(() => {
    if (synthRef.current && synthRef.current.speaking) {
      synthRef.current.pause();
      setIsPaused(true);
    }
  }, []);

  const resume = useCallback(() => {
    if (synthRef.current && synthRef.current.paused) {
      synthRef.current.resume();
      setIsPaused(false);
    }
  }, []);

  const cancel = useCallback(() => {
    isCancelledRef.current = true;
    if (synthRef.current) {
      synthRef.current.cancel();
    }
    setIsSpeaking(false);
    setIsPaused(false);
    setCurrentChunkIndex(0);
    setTotalChunks(0);
  }, []);

  return {
    isSpeaking,
    isPaused,
    isSupported,
    currentChunkIndex,
    totalChunks,
    voices,
    speak,
    speakStep,
    pause,
    resume,
    cancel,
  };
}

