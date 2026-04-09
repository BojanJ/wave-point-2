import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HtmlLangSync from '@/components/HtmlLangSync';
import { localBusinessJsonLd } from '@/lib/seoMetadata';

export const metadata = {
  metadataBase: new URL('https://wavepoint-apartments.com'),
  title: {
    default: 'Wavepoint 2.0 | Luxury Apartments Greece | Mediterranean Sea Views',
    template: '%s | Wavepoint 2.0',
  },
  description:
    'Discover Wavepoint 2.0 — boutique luxury apartments in Asprovalta, Greece. Panoramic Aegean sea views, private terraces, pool access. Book your Mediterranean escape today.',
  keywords: [
    'Luxury Apartments Greece',
    'Wavepoint 2.0',
    'Mediterranean apartments',
    'Asprovalta accommodation',
    'sea view apartments Greece',
    'boutique vacation rental Greece',
    'луксузни апартмани Грција',
    'πολυτελή διαμερίσματα Ελλάδα',
    'луксозни апартаменти Гърция',
    'apartamente de lux Grecia',
    'luksuzni apartmani Grčka',
  ],
  authors: [{ name: 'Wavepoint Apartments' }],
  creator: 'Wavepoint Apartments',
  publisher: 'Wavepoint Apartments',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://wavepoint-apartments.com',
    languages: {
      en: 'https://wavepoint-apartments.com',
      el: 'https://wavepoint-apartments.com',
      mk: 'https://wavepoint-apartments.com',
      sr: 'https://wavepoint-apartments.com',
      bg: 'https://wavepoint-apartments.com',
      ro: 'https://wavepoint-apartments.com',
      'x-default': 'https://wavepoint-apartments.com',
    },
  },
  openGraph: {
    title: 'Wavepoint 2.0 | Luxury Apartments Greece',
    description:
      'Boutique luxury apartments in Asprovalta, Greece. Panoramic Aegean sea views, private terraces & pool access.',
    url: 'https://wavepoint-apartments.com',
    siteName: 'Wavepoint 2.0',
    locale: 'en_US',
    alternateLocale: ['el_GR', 'mk_MK', 'sr_RS', 'bg_BG', 'ro_RO'],
    type: 'website',
    images: [
      {
        url: 'https://wavepoint-apartments.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Wavepoint 2.0 — Luxury Apartments Greece',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wavepoint 2.0 | Luxury Apartments Greece',
    description:
      'Boutique luxury apartments in Asprovalta, Greece. Panoramic Aegean sea views, private terraces & pool access.',
    images: ['https://wavepoint-apartments.com/og-image.jpg'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700;800&family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
      </head>
      <body className="antialiased bg-brand-sand text-brand-charcoal">
        <LanguageProvider>
          <HtmlLangSync />
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
