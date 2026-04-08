'use client';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-ocean-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-2">
              Wave<span className="text-azure-400">point</span>
            </h3>
            <p className="text-white/60 text-xs tracking-widest mb-4">APARTMENTS</p>
            <p className="text-ocean-300 text-sm leading-relaxed">
              {t('footer.tagline')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold tracking-wider text-ocean-300 uppercase mb-4">
              {t('footer.links_title')}
            </h4>
            <ul className="space-y-2">
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
                    className="text-ocean-300 hover:text-azure-400 text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold tracking-wider text-ocean-300 uppercase mb-4">
              {t('contact.contact_info_title')}
            </h4>
            <ul className="space-y-2 text-sm text-ocean-300">
              <li>📞 {t('contact.phone')}</li>
              <li>✉️ {t('contact.email')}</li>
              <li>📍 {t('contact.address')}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-ocean-800 text-center text-ocean-500 text-xs">
          © {currentYear} Wavepoint Apartments. {t('footer.rights')}
        </div>
      </div>
    </footer>
  );
}
