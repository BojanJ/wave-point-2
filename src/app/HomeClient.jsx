'use client';
import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { Wifi, Waves, CookingPot, Snowflake, Car, Umbrella, Sunrise, Users, BedDouble } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import ParallaxImage from '@/components/ParallaxImage';
import WaveLogo from '@/components/WaveLogo';
import StackingSection from '@/components/StackingSection';
import properties from '../../public/data/properties.json';

function AnimatedSection({ children, className }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function HomePage() {
  const { t } = useLanguage();

  const amenities = [
    { key: 'wifi', Icon: Wifi, label: t('home.amenity_wifi') },
    { key: 'pool', Icon: Waves, label: t('home.amenity_pool') },
    { key: 'view', Icon: Waves, label: t('home.amenity_view') },
    { key: 'kitchen', Icon: CookingPot, label: t('home.amenity_kitchen') },
    { key: 'ac', Icon: Snowflake, label: t('home.amenity_ac') },
    { key: 'parking', Icon: Car, label: t('home.amenity_parking') },
    { key: 'beach', Icon: Umbrella, label: t('home.amenity_beach') },
    { key: 'terrace', Icon: Sunrise, label: t('home.amenity_terrace') },
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
            transition={{ duration: 1.1, delay: 0.3 }}
          >
            <WaveLogo size={64} className="text-white/90 mx-auto mb-6" />
            <p className="text-brand-stone text-xs font-medium tracking-[0.2em] uppercase mb-6">
              Greece · Mediterranean · Luxury
            </p>
            <h1 className="heading-xl text-white mb-6 drop-shadow-lg">
              {t('home.hero_title')}
            </h1>
            <p className="text-white/75 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed font-light">
              {t('home.hero_subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/apartments" className="btn-primary text-sm px-10 py-4">
                {t('home.hero_cta')}
              </Link>
              <Link href="/contact" className="bg-white/15 backdrop-blur-sm hover:bg-white/25 text-white font-medium px-10 py-4 rounded-full transition-all duration-300 border border-white/25 text-sm tracking-wide">
                {t('home.book_now')}
              </Link>
            </div>
          </motion.div>
        </div>
      </ParallaxImage>

      {/* Concept Section */}
      <section className="section-padding bg-brand-sand">
        <div className="container-max">
          <AnimatedSection className="text-center mb-16">
            <p className="text-brand-clay text-xs tracking-[0.3em] uppercase mb-4">Our Collection</p>
            <h2 className="heading-lg text-brand-charcoal mb-5">{t('home.concept_title')}</h2>
            <div className="w-12 h-px bg-brand-gold mx-auto" />
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Classic */}
            <AnimatedSection>
              <div className="group relative overflow-hidden rounded-3xl h-96">
                <img
                  src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80"
                  alt="Wavepoint Classic"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/80 via-brand-charcoal/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <div className="inline-block border border-white/30 text-white/80 text-xs font-medium tracking-[0.2em] px-3 py-1 mb-4">
                    CLASSIC
                  </div>
                  <h3 className="heading-md text-white mb-2">{t('home.concept_original_title')}</h3>
                  <p className="text-white/70 text-sm leading-relaxed line-clamp-3">
                    {t('home.concept_original_desc')}
                  </p>
                </div>
              </div>
            </AnimatedSection>

            {/* 2.0 */}
            <AnimatedSection>
              <div className="group relative overflow-hidden rounded-3xl h-96">
                <img
                  src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80"
                  alt="Wavepoint 2.0"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/80 via-brand-charcoal/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <div className="inline-block bg-brand-gold/80 text-white text-xs font-medium tracking-[0.2em] px-3 py-1 mb-4">
                    NEW · 2.0
                  </div>
                  <h3 className="heading-md text-white mb-2">{t('home.concept_new_title')}</h3>
                  <p className="text-white/70 text-sm leading-relaxed line-clamp-3">
                    {t('home.concept_new_desc')}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Amenities Section */}
      <section className="section-padding bg-brand-charcoal text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-gold rounded-full filter blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-clay rounded-full filter blur-3xl" />
        </div>
        <div className="container-max relative z-10">
          <AnimatedSection className="text-center mb-16">
            <p className="text-brand-gold text-xs tracking-[0.3em] uppercase mb-4">Included</p>
            <h2 className="heading-lg text-white mb-5">{t('home.amenities_title')}</h2>
            <div className="w-12 h-px bg-brand-gold mx-auto" />
          </AnimatedSection>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {amenities.map((amenity, index) => (
              <motion.div
                key={amenity.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                className="border border-white/10 p-6 text-center hover:border-brand-gold/40 transition-all duration-400 hover:-translate-y-1"
              >
                <div className="flex justify-center mb-3"><amenity.Icon size={28} className="text-brand-gold" /></div>
                <p className="text-white/65 text-xs font-medium tracking-wide uppercase">{amenity.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stacking Apartment Gallery */}
      <section>
        <AnimatedSection className="text-center py-20 px-4 bg-brand-sand">
          <p className="text-brand-clay text-xs tracking-[0.3em] uppercase mb-4">The Collection</p>
          <h2 className="heading-lg text-brand-charcoal mb-5">{t('home.featured_title')}</h2>
          <div className="w-12 h-px bg-brand-gold mx-auto mb-6" />
          <p className="text-brand-clay text-sm max-w-md mx-auto leading-relaxed font-light">
            Scroll through our four apartments — each a world of its own.
          </p>
        </AnimatedSection>

        <StackingSection properties={properties} />

        <AnimatedSection className="text-center py-16 px-4 bg-brand-charcoal">
          <Link href="/apartments" className="btn-outline border-brand-clay text-brand-clay-light hover:bg-brand-clay hover:text-white text-sm px-10 py-4">
            {t('home.view_all')}
          </Link>
        </AnimatedSection>
      </section>

      {/* Parallax CTA Section */}
      <ParallaxImage
        src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80"
        alt="Mediterranean beach"
        className="h-80"
      >
        <div className="text-center text-white px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <WaveLogo size={40} className="text-brand-gold mx-auto mb-5 opacity-90" />
            <p className="text-brand-stone text-xs tracking-[0.4em] uppercase mb-4">Reserve Your Stay</p>
            <h2 className="heading-lg text-white mb-8">Your Mediterranean Story Starts Here</h2>
            <Link href="/contact" className="bg-brand-gold hover:bg-brand-gold-dark text-white font-medium px-10 py-4 rounded-full transition-all duration-300 text-sm tracking-wide shadow-lg hover:shadow-xl">
              {t('home.book_now')}
            </Link>
          </motion.div>
        </div>
      </ParallaxImage>
    </>
  );
}
