'use client';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-charcoal text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <h3 className="font-serif text-2xl font-bold mb-2">
              Wave<span className="text-brand-gold">point</span>
            </h3>
            <p className="text-white/40 text-xs tracking-[0.25em] mb-5">APARTMENTS</p>
            <p className="text-white/55 text-sm leading-relaxed">
              {t('footer.tagline')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold tracking-[0.2em] text-brand-clay-light uppercase mb-5">
              {t('footer.links_title')}
            </h4>
            <ul className="space-y-2.5">
              {[
                { href: '/', label: t('nav.home') },
                { href: '/apartments', label: t('nav.apartments') },
                { href: '/area', label: t('nav.area') },
                { href: '/about', label: t('nav.about') },
                { href: '/contact', label: t('nav.contact') },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/55 hover:text-brand-gold text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-semibold tracking-[0.2em] text-brand-clay-light uppercase mb-5">
              {t('contact.contact_info_title')}
            </h4>
            <ul className="space-y-2.5 text-sm text-white/55">
              <li>📞 {t('contact.phone')}</li>
              <li>✉️ {t('contact.email')}</li>
              <li>📍 {t('contact.address')}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 text-center text-white/30 text-xs tracking-wider">
          © {currentYear} Wavepoint Apartments. {t('footer.rights')}
        </div>
      </div>
    </footer>
  );
}
