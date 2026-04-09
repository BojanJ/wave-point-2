'use client';
import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
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
  const images = imageMap[property.id] || imageMap['classic'];
  const roomGalleryImages = galleryImages.filter((img) => img.category === property.id);

  return (
    <div className="min-h-screen bg-white">
      {/* Back Link */}
      <div className="fixed top-24 left-4 z-30 md:left-8">
        <Link
          href="/apartments"
          className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm text-ocean-700 hover:text-azure-500 text-sm font-medium px-4 py-2 rounded-full shadow-md transition-colors"
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
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
        
        {/* Property Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
          <div className="max-w-7xl mx-auto">
            <span className={`inline-block text-xs font-medium px-3 py-1 rounded-full mb-4 ${
              property.badge === 'Classic'
                ? 'bg-sand-100 text-sand-800'
                : 'bg-azure-500 text-white'
            }`}>
              {property.badge}
            </span>
            <h1 className="heading-xl text-white mb-2">{property.name}</h1>
            <p className="text-white/80 text-xl">{property.tagline}</p>
          </div>
        </div>

        {/* Thumbnail Navigation */}
        <div className="absolute bottom-8 right-8 md:right-12 flex gap-2">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveImage(i)}
              className={`w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                i === activeImage ? 'border-white scale-110' : 'border-white/40 opacity-60'
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
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10 p-6 bg-ocean-50 rounded-2xl">
              {[
                { label: t('apartment_detail.capacity'), value: `${property.capacity} guests` },
                { label: t('apartments.bedrooms'), value: `${property.bedrooms} bed${property.bedrooms > 1 ? 's' : ''}` },
                { label: t('apartments.bathrooms'), value: `${property.bathrooms} bath` },
                { label: 'Size', value: property.size },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-xl font-bold text-ocean-800">{stat.value}</div>
                  <div className="text-xs text-ocean-400 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="mb-10">
              <h2 className="heading-md text-ocean-800 mb-4">{t('apartment_detail.description')}</h2>
              <p className="text-ocean-600 leading-relaxed">{property.description}</p>
            </div>

            {/* Features */}
            <div className="mb-10">
              <h2 className="heading-md text-ocean-800 mb-4">{t('apartment_detail.features')}</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {property.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-ocean-600">
                    <span className="w-5 h-5 bg-azure-100 text-azure-600 rounded-full flex items-center justify-center text-xs">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Amenities */}
            <div>
              <h2 className="heading-md text-ocean-800 mb-4">{t('apartment_detail.amenities')}</h2>
              <div className="flex flex-wrap gap-2">
                {property.amenities.map((amenity) => (
                  <span
                    key={amenity}
                    className="bg-ocean-50 text-ocean-700 text-sm px-4 py-2 rounded-full border border-ocean-100"
                  >
                    {amenity}
                  </span>
                ))}
              </div>
            </div>

            {/* Room Gallery */}
            {roomGalleryImages.length > 0 && (
              <div className="mt-10">
                <h2 className="heading-md text-ocean-800 mb-4">{t('apartment_detail.gallery')}</h2>
                <GalleryGrid images={roomGalleryImages} />
              </div>
            )}
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-28">
              <div className="glass-card p-6 border-ocean-100">
                <h3 className="font-serif text-xl font-bold text-ocean-800 mb-2">
                  {t('apartment_detail.book_title')}
                </h3>
                <p className="text-azure-500 text-2xl font-bold mb-6">{property.price_from}</p>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-xs font-medium text-ocean-500 mb-1">
                      {t('apartment_detail.check_in')}
                    </label>
                    <input
                      type="date"
                      className="w-full border border-ocean-200 rounded-xl px-4 py-3 text-sm text-ocean-700 focus:outline-none focus:ring-2 focus:ring-azure-300"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-ocean-500 mb-1">
                      {t('apartment_detail.check_out')}
                    </label>
                    <input
                      type="date"
                      className="w-full border border-ocean-200 rounded-xl px-4 py-3 text-sm text-ocean-700 focus:outline-none focus:ring-2 focus:ring-azure-300"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-ocean-500 mb-1">
                      {t('apartment_detail.guests_label')}
                    </label>
                    <select className="w-full border border-ocean-200 rounded-xl px-4 py-3 text-sm text-ocean-700 focus:outline-none focus:ring-2 focus:ring-azure-300">
                      {Array.from({ length: property.capacity }, (_, i) => i + 1).map((n) => (
                        <option key={n} value={n}>{n} {n === 1 ? 'guest' : 'guests'}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <Link
                  href={`/contact?room=${property.id}`}
                  className="block w-full text-center btn-primary py-4 text-base"
                >
                  {t('apartment_detail.inquire')}
                </Link>

                <div className="mt-4 text-center">
                  <p className="text-ocean-400 text-xs">No booking fees · Instant confirmation</p>
                </div>
              </div>

              {/* View Info */}
              <div className="mt-4 p-4 bg-azure-50 rounded-2xl">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🌊</span>
                  <div>
                    <div className="text-sm font-medium text-ocean-800">{property.view}</div>
                    <div className="text-xs text-ocean-400">{property.floor}</div>
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
