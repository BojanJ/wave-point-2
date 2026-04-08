'use client';
import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const cache = {};

const LanguageContext = createContext({
  locale: 'en',
  setLocale: () => {},
  t: (key) => key,
  loading: true,
});

export function LanguageProvider({ children }) {
  const [locale, setLocaleState] = useState('en');
  const [translations, setTranslations] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = typeof window !== 'undefined'
      ? localStorage.getItem('wavepoint-locale') || 'en'
      : 'en';
    setLocaleState(saved);
  }, []);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        if (cache[locale]) {
          setTranslations(cache[locale]);
        } else {
          const res = await fetch(`/locales/${locale}.json`);
          const data = await res.json();
          cache[locale] = data;
          setTranslations(data);
        }
      } catch (e) {
        console.error(e);
      }
      setLoading(false);
    }
    load();
  }, [locale]);

  const setLocale = useCallback((l) => {
    if (typeof window !== 'undefined') localStorage.setItem('wavepoint-locale', l);
    setLocaleState(l);
  }, []);

  const t = useCallback((key) => {
    const keys = key.split('.');
    let val = translations;
    for (const k of keys) {
      if (val && typeof val === 'object' && k in val) val = val[k];
      else return key;
    }
    return typeof val === 'string' ? val : key;
  }, [translations]);

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t, loading }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
