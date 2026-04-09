const BASE_URL = 'https://wavepoint-apartments.com';

export const LOCALES = ['en', 'el', 'mk', 'sr', 'bg', 'ro'];

export const OG_LOCALE_MAP = {
  en: 'en_US',
  el: 'el_GR',
  mk: 'mk_MK',
  sr: 'sr_RS',
  bg: 'bg_BG',
  ro: 'ro_RO',
};

const sharedImages = [
  {
    url: `${BASE_URL}/og-image.jpg`,
    width: 1200,
    height: 630,
    alt: 'Wavepoint 2.0 — Luxury Apartments Greece',
  },
];

/** Build the alternates.languages block pointing every locale to the same path */
function buildLanguageAlternates(path = '') {
  const langs = {};
  LOCALES.forEach((locale) => {
    langs[locale] = `${BASE_URL}${path}`;
  });
  langs['x-default'] = `${BASE_URL}${path}`;
  return langs;
}

/** Per-page, per-locale metadata definitions */
const pageMetaByLocale = {
  home: {
    en: {
      title: 'Wavepoint 2.0 | Luxury Apartments Greece | Mediterranean Sea Views',
      description:
        'Discover Wavepoint 2.0 — boutique luxury apartments in Asprovalta, Greece. Panoramic Aegean sea views, private terraces, pool access. Book your Mediterranean escape today.',
      keywords: [
        'Luxury Apartments Greece',
        'Wavepoint 2.0',
        'Mediterranean apartments',
        'Asprovalta accommodation',
        'sea view apartments Greece',
        'boutique vacation rental Greece',
      ],
    },
    el: {
      title: 'Wavepoint 2.0 | Πολυτελή Διαμερίσματα Ελλάδα | Θέα Αιγαίο',
      description:
        'Ανακαλύψτε το Wavepoint 2.0 — μπουτίκ πολυτελή διαμερίσματα στην Ασπροβάλτα, Ελλάδα. Πανοραμική θέα στο Αιγαίο, ιδιωτικές βεράντες, πρόσβαση σε πισίνα.',
      keywords: [
        'πολυτελή διαμερίσματα Ελλάδα',
        'Wavepoint 2.0',
        'Ασπροβάλτα διαμονή',
        'θέα θάλασσα Ελλάδα',
        'Μεσογειακά διαμερίσματα',
      ],
    },
    mk: {
      title: 'Wavepoint 2.0 | Луксузни Апартмани Грција | Поглед на Егејско Море',
      description:
        'Откријте Wavepoint 2.0 — бутик луксузни апартмани во Аспровалта, Грција. Панорамски поглед на Егејот, приватни тераси, пристап до базен.',
      keywords: [
        'луксузни апартмани Грција',
        'Wavepoint 2.0',
        'Аспровалта сместување',
        'поглед море Грција',
        'Медитерански апартмани',
      ],
    },
    sr: {
      title: 'Wavepoint 2.0 | Luksuzni Apartmani Grčka | Pogled na Egejsko More',
      description:
        'Otkrijte Wavepoint 2.0 — butik luksuzne apartmane u Asprovaltи, Grčka. Panoramski pogled na Egejsko more, privatne terase, pristup bazenu.',
      keywords: [
        'luksuzni apartmani Grčka',
        'Wavepoint 2.0',
        'Asprovalta smeštaj',
        'more pogled Grčka',
        'Mediteranski apartmani',
      ],
    },
    bg: {
      title: 'Wavepoint 2.0 | Луксозни Апартаменти Гърция | Изглед към Егейско Море',
      description:
        'Открийте Wavepoint 2.0 — бутик луксозни апартаменти в Аспровалта, Гърция. Панорамна гледка към Егейско море, частни тераси, достъп до басейн.',
      keywords: [
        'луксозни апартаменти Гърция',
        'Wavepoint 2.0',
        'Аспровалта настаняване',
        'изглед море Гърция',
        'Средиземноморски апартаменти',
      ],
    },
    ro: {
      title: 'Wavepoint 2.0 | Apartamente de Lux Grecia | Vedere la Marea Egee',
      description:
        'Descoperă Wavepoint 2.0 — apartamente boutique de lux în Asprovalta, Grecia. Vedere panoramică la Marea Egee, terase private, acces la piscină.',
      keywords: [
        'apartamente de lux Grecia',
        'Wavepoint 2.0',
        'cazare Asprovalta',
        'vedere mare Grecia',
        'apartamente mediteraneene',
      ],
    },
  },

  apartments: {
    en: {
      title: 'Our Apartments | Wavepoint 2.0 | Luxury Vacation Rentals Greece',
      description:
        'Browse the full Wavepoint collection — Wavepoint Classic, 2.1, 2.2 and 2.3. Luxury vacation rentals in Asprovalta, Greece with Aegean sea views from €110/night.',
      keywords: [
        'Luxury Apartments Greece',
        'vacation rentals Greece',
        'Wavepoint apartments',
        'sea view apartments',
        'Asprovalta rentals',
        'Mediterranean holiday apartments',
      ],
    },
    el: {
      title: 'Τα Διαμερίσματά Μας | Wavepoint 2.0 | Πολυτελείς Διακοπές Ελλάδα',
      description:
        'Περιηγηθείτε στη συλλογή Wavepoint — Classic, 2.1, 2.2 και 2.3. Πολυτελείς διακοπές στην Ασπροβάλτα με θέα Αιγαίο από €110/νύχτα.',
      keywords: [
        'πολυτελή διαμερίσματα Ελλάδα',
        'ενοικίαση διακοπών Ελλάδα',
        'Wavepoint Ασπροβάλτα',
      ],
    },
    mk: {
      title: 'Нашите Апартмани | Wavepoint 2.0 | Луксузни Одмори Грција',
      description:
        'Прегледајте ја колекцијата Wavepoint — Classic, 2.1, 2.2 и 2.3. Луксузни одмори во Аспровалта, Грција со поглед на Егејот од €110/ноќ.',
      keywords: ['луксузни апартмани Грција', 'одмор Аспровалта', 'Wavepoint'],
    },
    sr: {
      title: 'Naši Apartmani | Wavepoint 2.0 | Luksuzni Odmor Grčka',
      description:
        'Pregledajte Wavepoint kolekciju — Classic, 2.1, 2.2 i 2.3. Luksuzni odmori u Asprovaltи, Grčka sa pogledom na Egejsko more od €110/noć.',
      keywords: ['luksuzni apartmani Grčka', 'odmor Asprovalta', 'Wavepoint'],
    },
    bg: {
      title: 'Нашите Апартаменти | Wavepoint 2.0 | Луксозна Почивка Гърция',
      description:
        'Разгледайте колекцията Wavepoint — Classic, 2.1, 2.2 и 2.3. Луксозни апартаменти в Аспровалта, Гърция с изглед към Егейско море от €110/нощ.',
      keywords: ['луксозни апартаменти Гърция', 'почивка Аспровалта', 'Wavepoint'],
    },
    ro: {
      title: 'Apartamentele Noastre | Wavepoint 2.0 | Vacanțe de Lux Grecia',
      description:
        'Explorează colecția Wavepoint — Classic, 2.1, 2.2 și 2.3. Vacanțe de lux în Asprovalta, Grecia cu vedere la Marea Egee de la €110/noapte.',
      keywords: ['apartamente de lux Grecia', 'vacanță Asprovalta', 'Wavepoint'],
    },
  },

  about: {
    en: {
      title: 'About Wavepoint | Greek Island Hospitality Since 2018',
      description:
        'Learn about Wavepoint Apartments — born from a love of the Greek sea. Our boutique collection in Asprovalta combines authentic Mediterranean hospitality with modern luxury.',
      keywords: [
        'about Wavepoint Apartments',
        'Greek hospitality',
        'Mediterranean boutique apartments',
        'Asprovalta Greece',
      ],
    },
    el: {
      title: 'Σχετικά με Wavepoint | Ελληνική Φιλοξενία από το 2018',
      description:
        'Μάθετε για τα Wavepoint Apartments — γεννημένα από αγάπη για την ελληνική θάλασσα. Μπουτίκ διαμερίσματα στην Ασπροβάλτα με αυθεντική μεσογειακή φιλοξενία.',
      keywords: ['Wavepoint Apartments', 'Ελληνική φιλοξενία', 'Ασπροβάλτα'],
    },
    mk: {
      title: 'За Wavepoint | Грчка Гостопримливост од 2018',
      description:
        'Дознајте за Wavepoint Apartments — создадени од љубов кон грчкото море. Бутик апартмани во Аспровалта со автентична медитеранска гостопримливост.',
      keywords: ['Wavepoint Apartments', 'грчка гостопримливост', 'Аспровалта'],
    },
    sr: {
      title: 'O Wavepointu | Grčko Gostoprimstvo od 2018',
      description:
        'Saznajte o Wavepoint Apartments — nastali iz ljubavi prema grčkom moru. Butik apartmani u Asprovaltи sa autentičnim mediteranskim gostoprimstvom.',
      keywords: ['Wavepoint Apartments', 'grčko gostoprimstvo', 'Asprovalta'],
    },
    bg: {
      title: 'За Wavepoint | Гръцко Гостоприемство от 2018',
      description:
        'Научете за Wavepoint Apartments — родени от любов към гръцкото море. Бутик апартаменти в Аспровалта с автентично средиземноморско гостоприемство.',
      keywords: ['Wavepoint Apartments', 'гръцко гостоприемство', 'Аспровалта'],
    },
    ro: {
      title: 'Despre Wavepoint | Ospitalitate Grecească din 2018',
      description:
        'Aflați despre Wavepoint Apartments — născute dintr-o dragoste pentru marea grecească. Apartamente boutique în Asprovalta cu ospitalitate mediteraneană autentică.',
      keywords: ['Wavepoint Apartments', 'ospitalitate grecească', 'Asprovalta'],
    },
  },

  area: {
    en: {
      title: 'The Area | Asprovalta Greece | Mediterranean Coastal Location',
      description:
        'Explore the stunning surroundings of Wavepoint Apartments in Asprovalta, Greece. Crystal-clear Aegean beaches, local tavernas, boat tours, and breathtaking coastal trails.',
      keywords: [
        'Asprovalta Greece',
        'Aegean beaches',
        'Greece coastal location',
        'Mediterranean travel',
        'things to do Asprovalta',
      ],
    },
    el: {
      title: 'Η Περιοχή | Ασπροβάλτα Ελλάδα | Μεσογειακή Παραλιακή Τοποθεσία',
      description:
        'Εξερευνήστε την εκπληκτική περιοχή γύρω από τα Wavepoint Apartments στην Ασπροβάλτα. Αιγαιοπελαγίτικες παραλίες, ταβέρνες, βαρκάδες.',
      keywords: ['Ασπροβάλτα Ελλάδα', 'παραλίες Αιγαίο', 'Μεσόγειος'],
    },
    mk: {
      title: 'Местото | Аспровалта Грција | Медитеранска Крајбрежна Локација',
      description:
        'Истражете ги прекрасните околини на Wavepoint Apartments во Аспровалта, Грција. Егејски плажи, локални таверни, чамчиња тури.',
      keywords: ['Аспровалта Грција', 'Егејски плажи', 'Медитеран'],
    },
    sr: {
      title: 'Oblast | Asprovalta Grčka | Mediteranska Obalna Lokacija',
      description:
        'Istražite predivnu okolinu Wavepoint Apartments u Asprovaltи, Grčka. Egejske plaže, lokalne taverne, ture čamcem.',
      keywords: ['Asprovalta Grčka', 'Egejske plaže', 'Mediteran'],
    },
    bg: {
      title: 'Районът | Аспровалта Гърция | Средиземноморска Крайбрежна Локация',
      description:
        'Разгледайте прекрасните околности на Wavepoint Apartments в Аспровалта, Гърция. Егейски плажове, местни таверни, разходки с лодка.',
      keywords: ['Аспровалта Гърция', 'Егейски плажове', 'Средиземноморие'],
    },
    ro: {
      title: 'Zona | Asprovalta Grecia | Locație Mediteraneană pe Coastă',
      description:
        'Explorează împrejurimile spectaculoase ale Wavepoint Apartments în Asprovalta, Grecia. Plaje egeeene cristaline, taverne locale, excursii cu barca.',
      keywords: ['Asprovalta Grecia', 'plaje egeene', 'Mediterana'],
    },
  },

  contact: {
    en: {
      title: 'Book Your Stay | Contact Wavepoint Apartments Greece',
      description:
        'Ready to book? Contact Wavepoint Apartments in Asprovalta, Greece. Send an inquiry, check availability, and get answers to your questions. We\'d love to host you.',
      keywords: [
        'book apartments Greece',
        'contact Wavepoint',
        'vacation rental inquiry Greece',
        'Asprovalta booking',
      ],
    },
    el: {
      title: 'Κράτηση | Επικοινωνία Wavepoint Apartments Ελλάδα',
      description:
        'Επικοινωνήστε με τα Wavepoint Apartments στην Ασπροβάλτα. Στείλτε αίτημα, ελέγξτε διαθεσιμότητα και κάντε κράτηση.',
      keywords: ['κράτηση Ελλάδα', 'Wavepoint επικοινωνία', 'Ασπροβάλτα'],
    },
    mk: {
      title: 'Резервирај | Контакт Wavepoint Apartments Грција',
      description:
        'Контактирајте ги Wavepoint Apartments во Аспровалта. Испратете барање и резервирајте го вашиот медитерански одмор.',
      keywords: ['резервација Грција', 'Wavepoint контакт', 'Аспровалта'],
    },
    sr: {
      title: 'Rezervišite | Kontakt Wavepoint Apartments Grčka',
      description:
        'Kontaktirajte Wavepoint Apartments u Asprovaltи. Pošaljite upit i rezervišite mediteranski odmor.',
      keywords: ['rezervacija Grčka', 'Wavepoint kontakt', 'Asprovalta'],
    },
    bg: {
      title: 'Резервирайте | Контакт Wavepoint Apartments Гърция',
      description:
        'Свържете се с Wavepoint Apartments в Аспровалта. Изпратете запитване и резервирайте средиземноморска почивка.',
      keywords: ['резервация Гърция', 'Wavepoint контакт', 'Аспровалта'],
    },
    ro: {
      title: 'Rezervați | Contact Wavepoint Apartments Grecia',
      description:
        'Contactați Wavepoint Apartments în Asprovalta. Trimiteți o solicitare și rezervați vacanța voastră mediteraneană.',
      keywords: ['rezervare Grecia', 'contact Wavepoint', 'Asprovalta'],
    },
  },

  gallery: {
    en: {
      title: 'Gallery | Wavepoint Apartments Greece | Mediterranean Luxury',
      description:
        'Explore photos of Wavepoint Apartments — beautiful interiors, panoramic sea views, private terraces, and the stunning Mediterranean surroundings of Asprovalta, Greece.',
      keywords: [
        'Wavepoint Apartments photos',
        'luxury apartment Greece photos',
        'Asprovalta gallery',
        'Mediterranean sea view photos',
      ],
    },
    el: {
      title: 'Γκαλερί | Wavepoint Apartments Ελλάδα',
      description:
        'Εξερευνήστε φωτογραφίες των Wavepoint Apartments — εσωτερικά, θέα θάλασσα, ιδιωτικές βεράντες.',
      keywords: ['Wavepoint φωτογραφίες', 'διαμερίσματα Ελλάδα φωτογραφίες'],
    },
    mk: {
      title: 'Галерија | Wavepoint Apartments Грција',
      description:
        'Истражете фотографии на Wavepoint Apartments — прекрасни ентериери, поглед на морето, приватни тераси.',
      keywords: ['Wavepoint фотографии', 'апартмани Грција фотографии'],
    },
    sr: {
      title: 'Galerija | Wavepoint Apartments Grčka',
      description:
        'Istražite fotografije Wavepoint Apartments — prelepi enterijeri, pogled na more, privatne terase.',
      keywords: ['Wavepoint fotografije', 'apartmani Grčka fotografije'],
    },
    bg: {
      title: 'Галерия | Wavepoint Apartments Гърция',
      description:
        'Разгледайте снимки на Wavepoint Apartments — красиви интериори, изглед към морето, частни тераси.',
      keywords: ['Wavepoint снимки', 'апартаменти Гърция снимки'],
    },
    ro: {
      title: 'Galerie | Wavepoint Apartments Grecia',
      description:
        'Explorează fotografii ale Wavepoint Apartments — interioare frumoase, vedere la mare, terase private.',
      keywords: ['Wavepoint fotografii', 'apartamente Grecia fotografii'],
    },
  },
};

/**
 * Returns the Next.js `metadata` object for a given page.
 * Falls back to English if the locale is not found.
 */
export function getPageMetadata(page, locale = 'en', path = '') {
  const localeData =
    pageMetaByLocale[page]?.[locale] ?? pageMetaByLocale[page]?.['en'] ?? {};

  const { title, description, keywords = [] } = localeData;

  return {
    metadataBase: new URL(BASE_URL),
    title,
    description,
    keywords,
    authors: [{ name: 'Wavepoint Apartments' }],
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
    alternates: {
      canonical: `${BASE_URL}${path}`,
      languages: buildLanguageAlternates(path),
    },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}${path}`,
      siteName: 'Wavepoint 2.0',
      locale: OG_LOCALE_MAP[locale] ?? 'en_US',
      alternateLocale: LOCALES.filter((l) => l !== locale).map((l) => OG_LOCALE_MAP[l]),
      type: 'website',
      images: sharedImages,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [sharedImages[0].url],
    },
  };
}

/**
 * Returns Next.js `metadata` for an individual apartment page.
 */
export function getApartmentMetadata(property) {
  const title = `${property.name} | Wavepoint 2.0 | Luxury Apartment Greece`;
  const description = `${property.tagline}. ${property.description.slice(0, 120)}… Capacity: ${property.capacity} guests · ${property.bedrooms} bedroom · ${property.view}. From ${property.price_from}.`;
  const path = `/apartments/${property.id}`;

  return {
    metadataBase: new URL(BASE_URL),
    title,
    description,
    keywords: [
      property.name,
      'Luxury Apartments Greece',
      'Wavepoint 2.0',
      'sea view apartment Greece',
      'Asprovalta accommodation',
      property.view,
    ],
    authors: [{ name: 'Wavepoint Apartments' }],
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
    alternates: {
      canonical: `${BASE_URL}${path}`,
      languages: buildLanguageAlternates(path),
    },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}${path}`,
      siteName: 'Wavepoint 2.0',
      locale: 'en_US',
      alternateLocale: ['el_GR', 'mk_MK', 'sr_RS', 'bg_BG', 'ro_RO'],
      type: 'website',
      images: sharedImages,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [sharedImages[0].url],
    },
  };
}

/** JSON-LD structured data for the business */
export const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LodgingBusiness',
  name: 'Wavepoint Apartments',
  alternateName: 'Wavepoint 2.0',
  description:
    'Boutique luxury apartments in Asprovalta, Greece. Panoramic Aegean sea views, private terraces, pool access. Classic and 2.0 collection.',
  url: BASE_URL,
  telephone: '+30 694 814 5850',
  email: 'contact@wavepoint-apartments.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Asprovalta',
    addressLocality: 'Asprovalta',
    addressCountry: 'GR',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 40.7434,
    longitude: 23.7044,
  },
  priceRange: '€€€',
  currenciesAccepted: 'EUR',
  amenityFeature: [
    { '@type': 'LocationFeatureSpecification', name: 'Swimming Pool', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Air Conditioning', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Free WiFi', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Private Parking', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Sea View', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Private Terrace', value: true },
  ],
  availableLanguage: [
    { '@type': 'Language', name: 'English' },
    { '@type': 'Language', name: 'Greek' },
    { '@type': 'Language', name: 'Macedonian' },
    { '@type': 'Language', name: 'Serbian' },
    { '@type': 'Language', name: 'Bulgarian' },
    { '@type': 'Language', name: 'Romanian' },
  ],
};
