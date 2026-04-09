"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import Flags from "country-flag-icons/react/3x2";

const LANGUAGES = [
  { code: "en", label: "English", iso: "EN", countryCode: "GB" },
  { code: "el", label: "Ελληνικά", iso: "GR", countryCode: "GR" },
  { code: "mk", label: "Македонски", iso: "MK", countryCode: "MK" },
  { code: "sr", label: "Српски", iso: "SR", countryCode: "RS" },
  { code: "bg", label: "Български", iso: "BG", countryCode: "BG" },
  { code: "ro", label: "Română", iso: "RO", countryCode: "RO" },
];

export default function LanguageDropdown({ isScrolled = true }) {
  const { locale, setLocale } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  const current = LANGUAGES.find((l) => l.code === locale) || LANGUAGES[0];

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={`flex items-center gap-1.5 text-xs font-medium tracking-widest px-3 py-1.5 rounded-full border transition-all duration-200 ${
          isScrolled
            ? "border-brand-clay/50 text-brand-clay-dark bg-brand-sand hover:bg-brand-stone/50"
            : "border-white/40 text-white/80 hover:bg-white/10"
        }`}
      >
        {(() => {
          const Flag = Flags[current.countryCode];
          return <Flag className="w-5 h-auto rounded-[2px]" />;
        })()}
        <span>{current.iso}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-[10px] leading-none"
        >
          ▾
        </motion.span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute right-0 top-full mt-2 min-w-[168px] bg-brand-sand border border-brand-stone rounded-2xl shadow-lg overflow-hidden z-50"
          >
            {LANGUAGES.map((lang) => (
              <li
                key={lang.code}
                role="option"
                aria-selected={locale === lang.code}
              >
                <button
                  onClick={() => {
                    setLocale(lang.code);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-medium tracking-wide transition-colors ${
                    locale === lang.code
                      ? "bg-brand-stone/60 text-brand-charcoal"
                      : "text-brand-clay-dark hover:bg-brand-stone/40 hover:text-brand-charcoal"
                  }`}
                >
                  {(() => {
                    const Flag = Flags[lang.countryCode];
                    return <Flag className="w-5 h-auto rounded-[2px]" />;
                  })()}
                  <span className="flex-1 text-left">{lang.label}</span>
                  <span className="text-brand-clay/60 text-[10px] tracking-widest">
                    {lang.iso}
                  </span>
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
