'use client';
import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import ParallaxImage from '@/components/ParallaxImage';
import properties from '../../public/data/properties.json';

function AnimatedSection({ children, className }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function HomePage() {
  const { t } = useLanguage();
  const featuredProperties = properties.slice(0, 3);

  const amenities = [
    { key: 'wifi', icon: '📶', label: t('home.amenity_wifi') },
    { key: 'pool', icon: '🏊', label: t('home.amenity_pool') },
    { key: 'view', icon: '🌊', label: t('home.amenity_view') },
    { key: 'kitchen', icon: '🍳', label: t('home.amenity_kitchen') },
    { key: 'ac', icon: '❄️', label: t('home.amenity_ac') },
    { key: 'parking', icon: '🚗', label: t('home.amenity_parking') },
    { key: 'beach', icon: '🏖️', label: t('home.amenity_beach') },
    { key: 'terrace', icon: '🌅', label: t('home.amenity_terrace') },
  ];

  return (
    <>
      {/* Hero Section */}
      <ParallaxImage
        src="https://images.unsplash.com/photo-1602088113235-229c19758e9f?w=1920&q=80"
        alt="Wavepoint Apartments Greece"
        className="h-screen min-h-[600px]"
      >
        <div className="text-center text-white px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <p className="text-azure-300 text-sm font-medium tracking-[0.3em] uppercase mb-4">
              Greece · Mediterranean · Luxury
            </p>
            <h1 className="heading-xl text-white mb-6 drop-shadow-lg">
              {t('home.hero_title')}
            </h1>
            <p className="text-white/80 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
              {t('home.hero_subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/apartments" className="btn-primary text-base px-8 py-4">
                {t('home.hero_cta')}
              </Link>
              <Link href="/contact" className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white font-medium px-8 py-4 rounded-full transition-all duration-200 border border-white/30">
                {t('home.book_now')}
              </Link>
            </div>
          </motion.div>
        </div>
      </ParallaxImage>

      {/* Concept Section */}
      <section className="section-padding bg-gradient-to-b from-ocean-50 to-white">
        <div className="container-max">
          <AnimatedSection className="text-center mb-16">
            <h2 className="heading-lg text-ocean-800 mb-4">{t('home.concept_title')}</h2>
            <div className="w-16 h-0.5 bg-azure-400 mx-auto" />
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Classic */}
            <AnimatedSection>
              <div className="group relative overflow-hidden rounded-2xl shadow-xl h-96">
                <img
                  src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80"
                  alt="Wavepoint Classic"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <div className="inline-block bg-white/20 backdrop-blur-sm text-white text-xs font-medium tracking-widest px-3 py-1 rounded-full mb-3">
                    CLASSIC
                  </div>
                  <h3 className="heading-md text-white mb-2">{t('home.concept_original_title')}</h3>
                  <p className="text-white/80 text-sm leading-relaxed line-clamp-3">
                    {t('home.concept_original_desc')}
                  </p>
                </div>
              </div>
            </AnimatedSection>

            {/* 2.0 */}
            <AnimatedSection>
              <div className="group relative overflow-hidden rounded-2xl shadow-xl h-96">
                <img
                  src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80"
                  alt="Wavepoint 2.0"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <div className="inline-block bg-azure-500/80 backdrop-blur-sm text-white text-xs font-medium tracking-widest px-3 py-1 rounded-full mb-3">
                    NEW · 2.0
                  </div>
                  <h3 className="heading-md text-white mb-2">{t('home.concept_new_title')}</h3>
                  <p className="text-white/80 text-sm leading-relaxed line-clamp-3">
                    {t('home.concept_new_desc')}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Amenities Section */}
      <section className="section-padding bg-ocean-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-azure-400 rounded-full filter blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-ocean-400 rounded-full filter blur-3xl" />
        </div>
        <div className="container-max relative z-10">
          <AnimatedSection className="text-center mb-16">
            <h2 className="heading-lg text-white mb-4">{t('home.amenities_title')}</h2>
            <div className="w-16 h-0.5 bg-azure-400 mx-auto" />
          </AnimatedSection>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {amenities.map((amenity, index) => (
              <motion.div
                key={amenity.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card bg-white/5 border-white/10 p-6 text-center hover:bg-white/10 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="text-4xl mb-3">{amenity.icon}</div>
                <p className="text-white/80 text-sm font-medium">{amenity.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Apartments */}
      <section className="section-padding bg-sand-50">
        <div className="container-max">
          <AnimatedSection className="text-center mb-16">
            <h2 className="heading-lg text-ocean-800 mb-4">{t('home.featured_title')}</h2>
            <div className="w-16 h-0.5 bg-azure-400 mx-auto" />
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProperties.map((property, index) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={`https://images.unsplash.com/photo-${index === 0 ? '1566073771259-6a8506099945' : index === 1 ? '1615880484746-a134be9a6ecf' : '1582719508461-905c673771fd'}?w=600&q=80`}
                    alt={property.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`text-xs font-medium px-3 py-1 rounded-full ${
                      property.badge === 'Classic' 
                        ? 'bg-sand-100 text-sand-700' 
                        : 'bg-azure-500 text-white'
                    }`}>
                      {property.badge}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-white/90 backdrop-blur-sm text-ocean-800 text-xs font-bold px-3 py-1 rounded-full">
                      {property.price_from}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-xl font-bold text-ocean-800 mb-1">{property.name}</h3>
                  <p className="text-ocean-500 text-sm mb-3">{property.tagline}</p>
                  <div className="flex items-center gap-4 text-xs text-ocean-400 mb-4">
                    <span>👥 {property.capacity} {t('apartments.guests')}</span>
                    <span>🛏 {property.bedrooms} {t('apartments.bedrooms')}</span>
                    <span>🌊 {property.view}</span>
                  </div>
                  <Link
                    href={`/apartments/${property.id}`}
                    className="block w-full text-center btn-primary text-sm py-2.5"
                  >
                    {t('apartments.view_details')}
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <AnimatedSection className="text-center mt-12">
            <Link href="/apartments" className="btn-outline text-base px-8 py-4">
              {t('home.view_all')}
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* Parallax CTA Section */}
      <ParallaxImage
        src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80"
        alt="Mediterranean beach"
        className="h-80"
      >
        <div className="text-center text-white px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="heading-lg text-white mb-6">Your Mediterranean Story Starts Here</h2>
            <Link href="/contact" className="bg-white text-ocean-800 hover:bg-ocean-50 font-semibold px-10 py-4 rounded-full transition-all duration-200 shadow-xl">
              {t('home.book_now')}
            </Link>
          </motion.div>
        </div>
      </ParallaxImage>
    </>
  );
}
