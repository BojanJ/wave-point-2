'use client';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import ParallaxImage from '@/components/ParallaxImage';

function Card({ icon, title, desc, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="bg-brand-sand border border-brand-stone p-7 hover:border-brand-clay transition-all duration-300"
    >
      <div className="text-3xl mb-4">{icon}</div>
      <h3 className="font-serif text-lg font-bold text-brand-charcoal mb-2">{title}</h3>
      <p className="text-brand-charcoal-light text-sm leading-relaxed">{desc}</p>
    </motion.div>
  );
}

export default function AreaPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <ParallaxImage
        src="https://images.unsplash.com/photo-1533105079780-92b9be482077?w=1920&q=80"
        alt="Greece coastal area"
        className="h-[60vh] min-h-[400px]"
      >
        <div className="text-center text-white px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-brand-stone text-xs font-medium tracking-[0.4em] uppercase mb-4">Greece</p>
            <h1 className="heading-xl text-white mb-4">{t('area.title')}</h1>
            <p className="text-white/70 text-lg max-w-xl mx-auto font-light">{t('area.subtitle')}</p>
          </motion.div>
        </div>
      </ParallaxImage>

      {/* Location Description */}
      <section className="section-padding bg-brand-sand">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center mb-24"
          >
            <p className="text-brand-clay text-xs tracking-[0.3em] uppercase mb-4">Location</p>
            <h2 className="heading-lg text-brand-charcoal mb-6">Our Corner of Paradise</h2>
            <p className="text-brand-charcoal-light text-lg leading-relaxed">{t('area.location_desc')}</p>
          </motion.div>

          {/* Beaches */}
          <div className="mb-16">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <p className="text-brand-clay text-xs tracking-[0.3em] uppercase mb-3">Swim</p>
              <h2 className="heading-md text-brand-charcoal">{t('area.beaches_title')}</h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card icon="🏖️" title={t('area.beach_1')} desc={t('area.beach_1_desc')} delay={0} />
              <Card icon="🌊" title={t('area.beach_2')} desc={t('area.beach_2_desc')} delay={0.1} />
            </div>
          </div>

          {/* Restaurants */}
          <div className="mb-16">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <p className="text-brand-clay text-xs tracking-[0.3em] uppercase mb-3">Dine</p>
              <h2 className="heading-md text-brand-charcoal">{t('area.restaurants_title')}</h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card icon="🍽️" title={t('area.restaurant_1')} desc={t('area.restaurant_1_desc')} delay={0} />
              <Card icon="🫒" title={t('area.restaurant_2')} desc={t('area.restaurant_2_desc')} delay={0.1} />
            </div>
          </div>

          {/* Activities */}
          <div className="mb-16">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <p className="text-brand-clay text-xs tracking-[0.3em] uppercase mb-3">Explore</p>
              <h2 className="heading-md text-brand-charcoal">{t('area.activities_title')}</h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card icon="⛵" title={t('area.activity_1')} desc={t('area.activity_1_desc')} delay={0} />
              <Card icon="🥾" title={t('area.activity_2')} desc={t('area.activity_2_desc')} delay={0.1} />
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="section-padding bg-brand-charcoal">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-brand-gold text-xs tracking-[0.3em] uppercase mb-3">Find Us</p>
            <h2 className="heading-lg text-white mb-4">{t('area.map_title')}</h2>
            <div className="w-12 h-px bg-brand-gold mx-auto" />
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="overflow-hidden h-80">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3144!2d23.7080713!3d40.7195454!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14a91f2a189177b9%3A0xbdd9645b7ad8d9f7!2sWave%20Point%20Apartment!5e0!3m2!1sen!2sgr!4v1744317600000!5m2!1sen!2sgr"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Wave Point Apartment"
              />
            </div>
            <div className="overflow-hidden h-80">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3144!2d23.7083191!3d40.7199581!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14a91f54cca06c93%3A0x99d59b5154bfe9e1!2sMassiseto%20Burger%20House!5e0!3m2!1sen!2sgr!4v1744317600001!5m2!1sen!2sgr"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Massiseto Burger House"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
