'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import properties from '../../../public/data/properties.json';

const apartmentImages = {
  'classic': 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
  '2-1': 'https://images.unsplash.com/photo-1615880484746-a134be9a6ecf?w=800&q=80',
  '2-2': 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80',
  '2-3': 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80',
};

export default function ApartmentsPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-b from-ocean-50 to-white">
      {/* Header */}
      <div className="relative bg-ocean-800 text-white py-32 px-4 text-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1602088113235-229c19758e9f?w=1920&q=80"
            alt="bg"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          <p className="text-azure-300 text-sm font-medium tracking-[0.3em] uppercase mb-4">
            Wavepoint Collection
          </p>
          <h1 className="heading-xl text-white mb-4">{t('apartments.title')}</h1>
          <p className="text-white/70 text-lg max-w-xl mx-auto">{t('apartments.subtitle')}</p>
        </motion.div>
      </div>

      {/* Apartments Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {properties.map((property, index) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
            >
              <div className="relative h-72 overflow-hidden">
                <img
                  src={apartmentImages[property.id]}
                  alt={property.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute top-5 left-5 flex gap-2">
                  <span className={`text-xs font-medium px-3 py-1 rounded-full backdrop-blur-sm ${
                    property.badge === 'Classic' 
                      ? 'bg-sand-100/90 text-sand-800' 
                      : property.badge === '2.0 Suite'
                      ? 'bg-purple-500/90 text-white'
                      : 'bg-azure-500/90 text-white'
                  }`}>
                    {property.badge}
                  </span>
                </div>
                <div className="absolute bottom-5 left-5 right-5">
                  <span className="inline-block bg-white/90 backdrop-blur-sm text-ocean-800 text-sm font-bold px-4 py-1.5 rounded-full">
                    From {property.price_from}
                  </span>
                </div>
              </div>

              <div className="p-8">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h2 className="font-serif text-2xl font-bold text-ocean-800">{property.name}</h2>
                    <p className="text-azure-500 text-sm font-medium mt-1">{property.tagline}</p>
                  </div>
                  <div className="text-right text-sm text-ocean-400">
                    <div>{property.floor}</div>
                    <div>{property.size}</div>
                  </div>
                </div>

                <p className="text-ocean-600 text-sm leading-relaxed mb-5 line-clamp-2">
                  {property.description}
                </p>

                <div className="flex flex-wrap gap-3 mb-6">
                  <div className="flex items-center gap-1 bg-ocean-50 text-ocean-600 text-xs px-3 py-1.5 rounded-full">
                    <span>👥</span>
                    <span>{property.capacity} {t('apartments.guests')}</span>
                  </div>
                  <div className="flex items-center gap-1 bg-ocean-50 text-ocean-600 text-xs px-3 py-1.5 rounded-full">
                    <span>🛏</span>
                    <span>{property.bedrooms} {t('apartments.bedrooms')}</span>
                  </div>
                  <div className="flex items-center gap-1 bg-ocean-50 text-ocean-600 text-xs px-3 py-1.5 rounded-full">
                    <span>🚿</span>
                    <span>{property.bathrooms} {t('apartments.bathrooms')}</span>
                  </div>
                  <div className="flex items-center gap-1 bg-azure-50 text-azure-600 text-xs px-3 py-1.5 rounded-full">
                    <span>🌊</span>
                    <span>{property.view}</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Link
                    href={`/apartments/${property.id}`}
                    className="flex-1 text-center btn-primary text-sm py-3"
                  >
                    {t('apartments.view_details')}
                  </Link>
                  <Link
                    href={`/contact?room=${property.id}`}
                    className="flex-1 text-center btn-outline text-sm py-3"
                  >
                    {t('apartments.book_now')}
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
