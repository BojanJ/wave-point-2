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
      transition={{ duration: 0.5, delay }}
      className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-ocean-50"
    >
      <div className="text-3xl mb-3">{icon}</div>
      <h3 className="font-serif text-lg font-bold text-ocean-800 mb-2">{title}</h3>
      <p className="text-ocean-500 text-sm leading-relaxed">{desc}</p>
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
            <p className="text-azure-300 text-sm font-medium tracking-[0.3em] uppercase mb-4">Greece</p>
            <h1 className="heading-xl text-white mb-4">{t('area.title')}</h1>
            <p className="text-white/80 text-lg max-w-xl mx-auto">{t('area.subtitle')}</p>
          </motion.div>
        </div>
      </ParallaxImage>

      {/* Location Description */}
      <section className="section-padding bg-gradient-to-b from-ocean-50 to-white">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center mb-20"
          >
            <h2 className="heading-lg text-ocean-800 mb-6">Our Corner of Paradise</h2>
            <p className="text-ocean-600 text-lg leading-relaxed">{t('area.location_desc')}</p>
          </motion.div>

          {/* Beaches */}
          <div className="mb-16">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="heading-md text-ocean-800 mb-8 text-center"
            >
              {t('area.beaches_title')}
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card icon="🏖️" title={t('area.beach_1')} desc={t('area.beach_1_desc')} delay={0} />
              <Card icon="🌊" title={t('area.beach_2')} desc={t('area.beach_2_desc')} delay={0.1} />
            </div>
          </div>

          {/* Restaurants */}
          <div className="mb-16">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="heading-md text-ocean-800 mb-8 text-center"
            >
              {t('area.restaurants_title')}
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card icon="🍽️" title={t('area.restaurant_1')} desc={t('area.restaurant_1_desc')} delay={0} />
              <Card icon="🫒" title={t('area.restaurant_2')} desc={t('area.restaurant_2_desc')} delay={0.1} />
            </div>
          </div>

          {/* Activities */}
          <div className="mb-16">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="heading-md text-ocean-800 mb-8 text-center"
            >
              {t('area.activities_title')}
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card icon="⛵" title={t('area.activity_1')} desc={t('area.activity_1_desc')} delay={0} />
              <Card icon="🥾" title={t('area.activity_2')} desc={t('area.activity_2_desc')} delay={0.1} />
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="section-padding bg-ocean-900">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="heading-lg text-white mb-4">{t('area.map_title')}</h2>
            <div className="w-16 h-0.5 bg-azure-400 mx-auto" />
          </motion.div>
          <div className="rounded-3xl overflow-hidden shadow-2xl h-96">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3144.0!2d24.0!3d37.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDA!5e0!3m2!1sen!2sgr!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Wavepoint Location"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
