'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import WaveLogo from '@/components/WaveLogo';
import LanguageDropdown from '@/components/LanguageDropdown';

export default function Navbar() {
  const { t } = useLanguage();
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
    { href: '/gallery', label: t('nav.gallery') },
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
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-brand-sand/90 backdrop-blur-md border-b border-brand-stone shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <WaveLogo
              size={36}
              className={`transition-colors duration-500 ${
                isScrolled ? 'text-brand-gold' : 'text-white'
              }`}
            />
            <div>
              <span className={`font-serif text-xl font-bold tracking-tight leading-none transition-colors duration-500 ${
                isScrolled ? 'text-brand-charcoal' : 'text-white'
              }`}>
                Wave<span className="text-brand-gold">point</span>
              </span>
              <span className={`text-[10px] font-medium tracking-[0.1em] block mt-0.5 transition-colors duration-500 ${
                isScrolled ? 'text-brand-clay' : 'text-white/70'
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
                className={`text-xs font-medium tracking-[0.12em] uppercase transition-all duration-200 relative group ${
                  isScrolled
                    ? isActive(link.href) ? 'text-brand-gold' : 'text-brand-charcoal hover:text-brand-gold'
                    : isActive(link.href) ? 'text-brand-gold' : 'text-white/85 hover:text-white'
                }`}
              >
                {link.label}
                <span className={`absolute -bottom-1 left-0 h-px bg-brand-gold transition-all duration-300 group-hover:w-full ${
                  isActive(link.href) ? 'w-full' : 'w-0'
                }`} />
              </Link>
            ))}

            {/* Language Dropdown */}
            <LanguageDropdown isScrolled={isScrolled} />

            <Link
              href="/contact"
              className="btn-primary text-xs py-2.5 px-6"
            >
              {t('home.book_now')}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-3">
            <LanguageDropdown isScrolled={isScrolled} />
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className={`p-2 rounded-lg transition-colors ${
                isScrolled ? 'text-brand-charcoal' : 'text-white'
              }`}
              aria-label="Toggle menu"
            >
              <div className="w-6 h-4 flex flex-col justify-between">
                <motion.span
                  animate={isMobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                  className="block h-px bg-current rounded-full"
                />
                <motion.span
                  animate={isMobileOpen ? { opacity: 0 } : { opacity: 1 }}
                  className="block h-px bg-current rounded-full"
                />
                <motion.span
                  animate={isMobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                  className="block h-px bg-current rounded-full"
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
            className="md:hidden bg-brand-sand/97 backdrop-blur-md border-t border-brand-stone"
          >
            <div className="px-4 py-6 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={`block px-4 py-3 text-xs font-medium tracking-[0.12em] uppercase transition-colors ${
                    isActive(link.href)
                      ? 'text-brand-gold bg-brand-stone/40 rounded-lg'
                      : 'text-brand-charcoal hover:text-brand-gold'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-3">
                <Link
                  href="/contact"
                  onClick={() => setIsMobileOpen(false)}
                  className="block w-full text-center btn-primary text-xs py-3"
                >
                  {t('home.book_now')}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
