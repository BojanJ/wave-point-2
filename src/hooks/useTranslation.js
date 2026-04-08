'use client';
import { useState, useEffect, useCallback } from 'react';

const cache = {};

export function useTranslation() {
  const [locale, setLocale] = useState('en');
  const [translations, setTranslations] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedLocale = typeof window !== 'undefined' 
      ? localStorage.getItem('wavepoint-locale') || 'en'
      : 'en';
    setLocale(savedLocale);
  }, []);

  useEffect(() => {
    async function loadTranslations() {
      setLoading(true);
      try {
        if (cache[locale]) {
          setTranslations(cache[locale]);
        } else {
          const response = await fetch(`/locales/${locale}.json`);
          const data = await response.json();
          cache[locale] = data;
          setTranslations(data);
        }
      } catch (err) {
        console.error('Failed to load translations:', err);
      }
      setLoading(false);
    }
    loadTranslations();
  }, [locale]);

  const changeLocale = useCallback((newLocale) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('wavepoint-locale', newLocale);
    }
    setLocale(newLocale);
  }, []);

  const t = useCallback((key) => {
    const keys = key.split('.');
    let value = translations;
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key;
      }
    }
    return typeof value === 'string' ? value : key;
  }, [translations]);

  return { t, locale, changeLocale, loading };
}
