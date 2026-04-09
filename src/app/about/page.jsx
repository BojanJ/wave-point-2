'use client';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import ParallaxImage from '@/components/ParallaxImage';

export default function AboutPage() {
  const { t } = useLanguage();

  const values = [
    { icon: '🤝', title: t('about.value_1'), desc: t('about.value_1_desc') },
    { icon: '🌿', title: t('about.value_2'), desc: t('about.value_2_desc') },
    { icon: '✨', title: t('about.value_3'), desc: t('about.value_3_desc') },
  ];

  const rules = [
    t('about.rule_1'),
    t('about.rule_2'),
    t('about.rule_3'),
    t('about.rule_4'),
    t('about.rule_5'),
    t('about.rule_6'),
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <ParallaxImage
        src="https://images.unsplash.com/photo-1519046904884-53103b34b206?w=1920&q=80"
        alt="About Wavepoint"
        className="h-[60vh] min-h-[400px]"
      >
        <div className="text-center text-white px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-azure-300 text-sm font-medium tracking-[0.3em] uppercase mb-4">
              Since 2018
            </p>
            <h1 className="heading-xl text-white mb-4">{t('about.title')}</h1>
            <p className="text-white/80 text-lg max-w-xl mx-auto">{t('about.subtitle')}</p>
          </motion.div>
        </div>
      </ParallaxImage>

      {/* Story */}
      <section className="section-padding bg-gradient-to-b from-ocean-50 to-white">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="heading-lg text-ocean-800 mb-6">{t('about.story_title')}</h2>
              <p className="text-ocean-600 text-lg leading-relaxed mb-6">{t('about.story_desc')}</p>
              <p className="text-ocean-600 leading-relaxed">{t('about.story_desc_2')}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1602088113235-229c19758e9f?w=800&q=80"
                  alt="Wavepoint Story"
                  className="w-full h-80 object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-azure-100 rounded-2xl flex items-center justify-center shadow-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold text-azure-600">8+</div>
                  <div className="text-xs text-azure-500">Years of<br/>hospitality</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Values */}
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="heading-lg text-ocean-800 text-center mb-12"
          >
            {t('about.values_title')}
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="text-center p-8 bg-white rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 border border-ocean-50"
              >
                <div className="text-5xl mb-4">{value.icon}</div>
                <h3 className="font-serif text-xl font-bold text-ocean-800 mb-3">{value.title}</h3>
                <p className="text-ocean-500 leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* House Rules */}
          <div className="bg-ocean-800 rounded-3xl p-8 md:p-12 text-white">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="heading-md text-white mb-8 text-center"
            >
              {t('about.rules_title')}
            </motion.h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {rules.map((rule, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className="flex items-center gap-3 bg-white/10 rounded-xl px-5 py-4"
                >
                  <span className="w-6 h-6 bg-azure-500 rounded-full flex items-center justify-center text-xs flex-shrink-0">✓</span>
                  <span className="text-white/90 text-sm">{rule}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
