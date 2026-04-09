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
            <p className="text-brand-stone text-xs font-medium tracking-[0.4em] uppercase mb-4">
              Since 2018
            </p>
            <h1 className="heading-xl text-white mb-4">{t('about.title')}</h1>
            <p className="text-white/70 text-lg max-w-xl mx-auto font-light">{t('about.subtitle')}</p>
          </motion.div>
        </div>
      </ParallaxImage>

      {/* Story */}
      <section className="section-padding bg-brand-sand">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <p className="text-brand-clay text-xs tracking-[0.3em] uppercase mb-4">Our Story</p>
              <h2 className="heading-lg text-brand-charcoal mb-6">{t('about.story_title')}</h2>
              <p className="text-brand-charcoal-light text-lg leading-relaxed mb-6">{t('about.story_desc')}</p>
              <p className="text-brand-charcoal-light leading-relaxed">{t('about.story_desc_2')}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1602088113235-229c19758e9f?w=800&q=80"
                  alt="Wavepoint Story"
                  className="w-full h-80 object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-brand-stone border border-brand-clay/20 flex items-center justify-center">
                <div className="text-center">
                  <div className="font-serif text-2xl font-bold text-brand-gold">8+</div>
                  <div className="text-xs text-brand-clay-dark mt-1">Years of<br/>hospitality</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Values */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-brand-clay text-xs tracking-[0.3em] uppercase mb-3">Principles</p>
            <h2 className="heading-lg text-brand-charcoal">{t('about.values_title')}</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="text-center p-10 bg-brand-sand border border-brand-stone hover:border-brand-clay transition-all duration-300"
              >
                <div className="text-4xl mb-5">{value.icon}</div>
                <h3 className="font-serif text-xl font-bold text-brand-charcoal mb-3">{value.title}</h3>
                <p className="text-brand-charcoal-light text-sm leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* House Rules */}
          <div className="bg-brand-charcoal p-8 md:p-12">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <p className="text-brand-gold text-xs tracking-[0.3em] uppercase mb-3">Guidelines</p>
              <h2 className="heading-md text-white">{t('about.rules_title')}</h2>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {rules.map((rule, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className="flex items-center gap-3 border border-white/10 px-5 py-4 hover:border-brand-gold/30 transition-colors"
                >
                  <span className="w-5 h-5 border border-brand-gold text-brand-gold flex items-center justify-center text-xs flex-shrink-0">✓</span>
                  <span className="text-white/75 text-sm">{rule}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
