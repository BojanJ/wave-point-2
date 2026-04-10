'use client';
import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check, Waves } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import GalleryGrid from '@/components/gallery/GalleryGrid';
import galleryImages from '../../../../public/data/gallery.json';

const imageMap = {
  'classic': [
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80',
    'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=80',
    'https://images.unsplash.com/photo-1560347876-aeef00ee58a1?w=1200&q=80',
  ],
  '2-1': [
    'https://images.unsplash.com/photo-1615880484746-a134be9a6ecf?w=1200&q=80',
    'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=80',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
  ],
  '2-2': [
    'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200&q=80',
    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80',
    'https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=1200&q=80',
  ],
  '2-3': [
    'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1200&q=80',
    'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=1200&q=80',
    'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=1200&q=80',
  ],
};

export default function RoomDetail({ property }) {
  const { t } = useLanguage();
  const [activeImage, setActiveImage] = useState(0);
  const [checkin, setCheckin] = useState('');
  const [checkout, setCheckout] = useState('');
  const [guests, setGuests] = useState('2');
  const images = imageMap[property.id] || imageMap['classic'];
  const roomGalleryImages = galleryImages.filter((img) => img.category === property.id);

  const inquireHref = (() => {
    const params = new URLSearchParams({ room: property.id });
    if (checkin) params.set('checkin', checkin);
    if (checkout) params.set('checkout', checkout);
    if (guests) params.set('guests', guests);
    return `/contact?${params.toString()}`;
  })();

  return (
    <div className="min-h-screen bg-brand-sand">
      {/* Back Link */}
      <div className="fixed top-24 left-4 z-30 md:left-8">
        <Link
          href="/apartments"
          className="inline-flex items-center gap-2 bg-brand-sand/90 backdrop-blur-sm text-brand-charcoal hover:text-brand-gold text-xs font-medium tracking-wide px-4 py-2 border border-brand-stone transition-colors"
        >
          ← {t('apartment_detail.back')}
        </Link>
      </div>

      {/* Hero Gallery */}
      <div className="relative h-screen max-h-[700px] overflow-hidden">
        <motion.img
          key={activeImage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          src={images[activeImage]}
          alt={property.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-charcoal/15 via-transparent to-brand-charcoal/70" />

        {/* Property Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
          <div className="max-w-7xl mx-auto">
            <span className="inline-block text-xs font-medium tracking-[0.2em] border border-white/30 text-white/80 px-3 py-1 mb-4">
              {property.badge}
            </span>
            <h1 className="heading-xl text-white mb-2">{property.name}</h1>
            <p className="text-white/70 text-xl font-light">{property.tagline}</p>
          </div>
        </div>

        {/* Thumbnail Navigation */}
        <div className="absolute top-40 left-4 md:top-auto md:bottom-8 md:right-12 flex gap-2">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveImage(i)}
              className={`w-16 h-12 overflow-hidden border transition-all ${
                i === activeImage ? 'border-brand-gold scale-110' : 'border-white/30 opacity-50'
              }`}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10 p-6 bg-brand-stone/40 border border-brand-stone">
              {[
                { label: t('apartment_detail.capacity'), value: `${property.capacity} guests` },
                { label: t('apartments.bedrooms'), value: `${property.bedrooms} bed${property.bedrooms > 1 ? 's' : ''}` },
                { label: t('apartments.bathrooms'), value: `${property.bathrooms} bath` },
                { label: 'Size', value: property.size },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="font-serif text-xl font-bold text-brand-charcoal">{stat.value}</div>
                  <div className="text-xs text-brand-clay mt-1 tracking-wide">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="mb-10">
              <h2 className="heading-md text-brand-charcoal mb-4">{t('apartment_detail.description')}</h2>
              <p className="text-brand-charcoal-light leading-relaxed">{property.description}</p>
            </div>

            {/* Features */}
            <div className="mb-10">
              <h2 className="heading-md text-brand-charcoal mb-5">{t('apartment_detail.features')}</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {property.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-brand-charcoal-light">
                    <span className="w-5 h-5 bg-brand-gold/15 text-brand-gold rounded-full flex items-center justify-center flex-shrink-0"><Check size={12} /></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Amenities */}
            <div>
              <h2 className="heading-md text-brand-charcoal mb-5">{t('apartment_detail.amenities')}</h2>
              <div className="flex flex-wrap gap-2">
                {property.amenities.map((amenity) => (
                  <span
                    key={amenity}
                    className="bg-brand-stone text-brand-charcoal text-xs px-4 py-2 border border-brand-stone"
                  >
                    {amenity}
                  </span>
                ))}
              </div>
            </div>

            {/* Room Gallery */}
            {roomGalleryImages.length > 0 && (
              <div className="mt-10">
                <h2 className="heading-md text-brand-charcoal mb-5">{t('apartment_detail.gallery')}</h2>
                <GalleryGrid images={roomGalleryImages} />
              </div>
            )}
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-28">
              <div className="bg-brand-sand border border-brand-stone p-7">
                <h3 className="font-serif text-xl font-bold text-brand-charcoal mb-2">
                  {t('apartment_detail.book_title')}
                </h3>
                <p className="text-brand-gold font-serif text-2xl font-bold mb-2">{property.price_from}</p>
                <p className="text-brand-clay text-xs tracking-wide mb-7">Limited Summer Dates Available</p>

                <div className="space-y-6 mb-7">
                  <div>
                    <label className="block text-xs font-medium tracking-[0.12em] text-brand-clay uppercase mb-2">
                      {t('apartment_detail.check_in')}
                    </label>
                    <input
                      type="date"
                      className="input-luxury"
                      value={checkin}
                      onChange={(e) => setCheckin(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium tracking-[0.12em] text-brand-clay uppercase mb-2">
                      {t('apartment_detail.check_out')}
                    </label>
                    <input
                      type="date"
                      className="input-luxury"
                      value={checkout}
                      onChange={(e) => setCheckout(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium tracking-[0.12em] text-brand-clay uppercase mb-2">
                      {t('apartment_detail.guests_label')}
                    </label>
                    <select
                      className="input-luxury bg-transparent"
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                    >
                      {Array.from({ length: property.capacity }, (_, i) => i + 1).map((n) => (
                        <option key={n} value={n}>{n} {n === 1 ? 'guest' : 'guests'}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <Link
                  href={inquireHref}
                  className="block w-full text-center btn-primary py-4 text-sm"
                >
                  {t('apartment_detail.inquire')}
                </Link>

                <div className="mt-5 text-center">
                  <p className="text-brand-clay text-xs tracking-wide">No booking fees · Personal service</p>
                </div>
              </div>

              {/* View Info */}
              <div className="mt-4 p-5 bg-brand-stone/40 border border-brand-stone">
                <div className="flex items-center gap-3">
                  <Waves size={24} className="text-brand-gold flex-shrink-0" />
                  <div>
                    <div className="text-sm font-medium text-brand-charcoal">{property.view}</div>
                    <div className="text-xs text-brand-clay mt-0.5">{property.floor}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
