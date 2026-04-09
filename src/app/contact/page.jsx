'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import BookingForm from '@/components/BookingForm';

function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-brand-stone">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-5 text-left hover:text-brand-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 transition-colors group"
        aria-expanded={isOpen}
      >
        <span className="font-medium text-brand-charcoal group-hover:text-brand-gold pr-4 text-sm transition-colors">{question}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-brand-gold text-lg flex-shrink-0"
        >
          ↓
        </motion.span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="pb-5 text-brand-charcoal-light text-sm leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ContactPage() {
  const { t } = useLanguage();

  const faqs = [
    { q: t('contact.faq_1_q'), a: t('contact.faq_1_a') },
    { q: t('contact.faq_2_q'), a: t('contact.faq_2_a') },
    { q: t('contact.faq_3_q'), a: t('contact.faq_3_a') },
    { q: t('contact.faq_4_q'), a: t('contact.faq_4_a') },
    { q: t('contact.faq_5_q'), a: t('contact.faq_5_a') },
    { q: t('contact.faq_6_q'), a: t('contact.faq_6_a') },
  ];

  return (
    <div className="min-h-screen bg-brand-sand">
      {/* Header */}
      <div className="relative bg-brand-charcoal text-white py-32 px-4 text-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80"
            alt="bg"
            className="w-full h-full object-cover opacity-15"
          />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          <p className="text-brand-gold text-xs font-medium tracking-[0.35em] uppercase mb-4">Enquire</p>
          <h1 className="heading-xl text-white mb-4">{t('contact.title')}</h1>
          <p className="text-white/55 text-lg max-w-xl mx-auto font-light">{t('contact.subtitle')}</p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Booking Form */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="bg-brand-sand border border-brand-stone p-8">
              <BookingForm />
            </div>

            {/* Contact Info */}
            <div className="mt-6 grid grid-cols-3 gap-4">
              {[
                { icon: '📞', text: t('contact.phone') },
                { icon: '✉️', text: t('contact.email') },
                { icon: '📍', text: t('contact.address') },
              ].map((item) => (
                <div key={item.text} className="text-center p-4 bg-brand-stone/40 border border-brand-stone">
                  <div className="text-2xl mb-2">{item.icon}</div>
                  <div className="text-xs text-brand-clay-dark">{item.text}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* FAQ */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-brand-clay text-xs tracking-[0.3em] uppercase mb-3">Questions</p>
            <h2 className="heading-md text-brand-charcoal mb-8">{t('contact.faq_title')}</h2>
            <div className="border-t border-brand-stone">
              {faqs.map((faq, index) => (
                <FAQItem key={index} question={faq.q} answer={faq.a} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
