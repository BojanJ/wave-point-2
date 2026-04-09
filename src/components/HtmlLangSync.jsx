'use client';
import { useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';

/**
 * Syncs the <html lang> attribute with the active locale so that
 * screen readers and search engine crawlers receive the correct
 * language tag after client-side language switching.
 */
export default function HtmlLangSync() {
  const { locale } = useLanguage();

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = locale;
    }
  }, [locale]);

  return null;
}
