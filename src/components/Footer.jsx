'use client';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import WaveLogo from '@/components/WaveLogo';

export default function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-charcoal text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-flex items-center gap-3 mb-4">
              <WaveLogo size={38} className="text-brand-gold" />
              <div>
                <span className="font-serif text-xl font-bold text-white leading-none">
                  Wave<span className="text-brand-gold">point</span>
                </span>
                <span className="text-[10px] font-medium tracking-[0.1em] text-white/40 block mt-0.5">
                  APARTMENTS
                </span>
              </div>
            </Link>
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
              <li>📞 <a href="tel:+306948145850" className="text-inherit no-underline">{t('contact.phone')}</a></li>
              <li>✉️ <a href="mailto:contact@wavepoint-apartments.com" className="text-inherit no-underline">{t('contact.email')}</a></li>
              <li>📍 <a href="https://maps.app.goo.gl/LEoZcePyCrqQsDQt9" className="text-inherit no-underline">{t('contact.address1')}</a></li>
              <li>📍 <a href="https://maps.app.goo.gl/LEoZcePyCrqQsDQt9" className="text-inherit no-underline">{t('contact.address2')}</a></li>
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
