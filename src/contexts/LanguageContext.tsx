import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import translations, { LanguageCode, TranslationKey, langToSpeechLocale } from '@/data/translations';

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (key: TranslationKey) => string;
  speak: (text: string) => void;
  stopSpeaking: () => void;
  isSpeaking: boolean;
  readPageAloud: () => void;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key) => key,
  speak: () => {},
  stopSpeaking: () => {},
  isSpeaking: false,
  readPageAloud: () => {},
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<LanguageCode>('en');
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('preferredLanguage') as LanguageCode;
    if (saved && translations[saved]) {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    localStorage.setItem('preferredLanguage', lang);
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  const t = (key: TranslationKey): string => {
    return translations[language]?.[key] || translations['en'][key] || key;
  };

  const getVoiceForLanguage = useCallback((lang: LanguageCode) => {
    const locale = langToSpeechLocale[lang];
    const voices = window.speechSynthesis.getVoices();
    return voices.find(v => v.lang.startsWith(locale.split('-')[0])) || voices[0];
  }, []);

  const speak = useCallback((text: string) => {
    window.speechSynthesis.cancel();
    const cleanText = text.replace(/[🚀🌟✨🔭💫⭐🪐🌙☄️🛸👽🌌🎮📚🤯⚡🎨🔧🏠📍💥☀️🌍]/g, '').replace(/\s+/g, ' ').trim();
    if (!cleanText) return;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 1;

    const voice = getVoiceForLanguage(language);
    if (voice) utterance.voice = voice;
    utterance.lang = langToSpeechLocale[language];

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  }, [language, getVoiceForLanguage]);

  const stopSpeaking = useCallback(() => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }, []);

  const readPageAloud = useCallback(() => {
    if (isSpeaking) {
      stopSpeaking();
      return;
    }
    // Gather visible text from main content
    const main = document.querySelector('main');
    if (!main) return;
    const headings = main.querySelectorAll('h1, h2, h3, p');
    const texts: string[] = [];
    headings.forEach(el => {
      const text = el.textContent?.trim();
      if (text && text.length > 3) texts.push(text);
    });
    const pageText = texts.slice(0, 20).join('. ');
    if (pageText) speak(pageText);
  }, [isSpeaking, speak, stopSpeaking]);

  // Load voices
  useEffect(() => {
    window.speechSynthesis.getVoices();
    window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
    return () => { window.speechSynthesis.cancel(); };
  }, []);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, speak, stopSpeaking, isSpeaking, readPageAloud }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
