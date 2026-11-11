import React, { createContext, useState } from 'react';
import type { Language } from '../types';
import { translations } from '../translations';
import type { TranslationDict } from '../translations';

// ── Language metadata ──────────────────────────────────────────────────────
export const LANGUAGE_OPTIONS = [
  { code: 'en' as const, label: 'English', nativeLabel: 'English' },
  { code: 'am' as const, label: 'Amharic', nativeLabel: 'አማርኛ' },
  { code: 'om' as const, label: 'Afaan Oromo', nativeLabel: 'Afaan Oromoo' },
] as const;

// ── Context type ──────────────────────────────────────────────────────────
interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationDict;
  languages: typeof LANGUAGE_OPTIONS;
}

// ── Context creation ──────────────────────────────────────────────────────
export const LanguageContext = createContext<LanguageContextValue>({
  language: 'en',
  setLanguage: () => {},
  t: translations.en,
  languages: LANGUAGE_OPTIONS,
});

// ── Storage key ────────────────────────────────────────────────────────────
const STORAGE_KEY = 'mulee-language';

// ── Provider component ─────────────────────────────────────────────────────
export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLangState] = useState<Language>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'en' || stored === 'am' || stored === 'om') return stored;
    } catch {
      // localStorage unavailable
    }
    return 'en';
  });

  const setLanguage = (lang: Language) => {
    setLangState(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // ignore
    }
    // Update html lang attribute
    document.documentElement.lang = lang === 'am' ? 'am' : lang === 'om' ? 'om' : 'en';
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t: translations[language],
        languages: LANGUAGE_OPTIONS,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
