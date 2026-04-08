'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

export default function Navbar() {
  const { t, locale, setLocale } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: t('nav.home') },
    { href: '/apartments', label: t('nav.apartments') },
    { href: '/area', label: t('nav.area') },
    { href: '/about', label: t('nav.about') },
    { href: '/contact', label: t('nav.contact') },
  ];

  const isActive = (href) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative">
              <span className={`text-2xl font-bold tracking-tight transition-colors ${
                isScrolled ? 'text-ocean-800' : 'text-white'
              }`}>
                Wave<span className="text-azure-400">point</span>
              </span>
              <span className={`text-xs font-medium tracking-widest block transition-colors ${
                isScrolled ? 'text-ocean-500' : 'text-white/80'
              }`}>
                APARTMENTS
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium tracking-wide transition-all duration-200 hover:text-azure-400 relative group ${
                  isScrolled
                    ? isActive(link.href) ? 'text-azure-500' : 'text-ocean-700'
                    : isActive(link.href) ? 'text-azure-300' : 'text-white/90'
                }`}
              >
                {link.label}
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-azure-400 transition-all duration-200 group-hover:w-full ${
                  isActive(link.href) ? 'w-full' : ''
                }`} />
              </Link>
            ))}
            
            {/* Language Toggle */}
            <button
              onClick={() => setLocale(locale === 'en' ? 'el' : 'en')}
              className={`text-sm font-medium tracking-widest px-3 py-1 rounded-full border transition-all duration-200 ${
                isScrolled
                  ? 'border-ocean-300 text-ocean-600 hover:bg-ocean-50'
                  : 'border-white/50 text-white hover:bg-white/10'
              }`}
            >
              {locale === 'en' ? 'GR' : 'EN'}
            </button>

            <Link
              href="/contact"
              className="bg-azure-500 hover:bg-azure-600 text-white text-sm font-medium px-5 py-2 rounded-full transition-all duration-200 shadow-md hover:shadow-lg"
            >
              {t('home.book_now')}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-3">
            <button
              onClick={() => setLocale(locale === 'en' ? 'el' : 'en')}
              className={`text-xs font-medium tracking-widest px-2 py-1 rounded-full border transition-all ${
                isScrolled ? 'border-ocean-300 text-ocean-600' : 'border-white/50 text-white'
              }`}
            >
              {locale === 'en' ? 'GR' : 'EN'}
            </button>
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className={`p-2 rounded-lg transition-colors ${
                isScrolled ? 'text-ocean-700' : 'text-white'
              }`}
              aria-label="Toggle menu"
            >
              <div className="w-6 h-4 flex flex-col justify-between">
                <motion.span
                  animate={isMobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                  className="block h-0.5 bg-current rounded-full"
                />
                <motion.span
                  animate={isMobileOpen ? { opacity: 0 } : { opacity: 1 }}
                  className="block h-0.5 bg-current rounded-full"
                />
                <motion.span
                  animate={isMobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                  className="block h-0.5 bg-current rounded-full"
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 backdrop-blur-md border-t border-ocean-100"
          >
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive(link.href)
                      ? 'bg-azure-50 text-azure-600'
                      : 'text-ocean-700 hover:bg-ocean-50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/contact"
                onClick={() => setIsMobileOpen(false)}
                className="block w-full text-center bg-azure-500 text-white px-4 py-3 rounded-lg text-sm font-medium mt-2"
              >
                {t('home.book_now')}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
