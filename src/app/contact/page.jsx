'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import properties from '../../../public/data/properties.json';

function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-ocean-100 rounded-2xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-ocean-50 transition-colors"
      >
        <span className="font-medium text-ocean-800 pr-4">{question}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-azure-500 text-xl flex-shrink-0"
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
            <div className="px-5 pb-5 text-ocean-600 text-sm leading-relaxed border-t border-ocean-50 pt-4">
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
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    room: '',
    checkin: '',
    checkout: '',
    guests: '2',
    message: '',
  });

  const faqs = [
    { q: t('contact.faq_1_q'), a: t('contact.faq_1_a') },
    { q: t('contact.faq_2_q'), a: t('contact.faq_2_a') },
    { q: t('contact.faq_3_q'), a: t('contact.faq_3_a') },
    { q: t('contact.faq_4_q'), a: t('contact.faq_4_a') },
    { q: t('contact.faq_5_q'), a: t('contact.faq_5_a') },
    { q: t('contact.faq_6_q'), a: t('contact.faq_6_a') },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      setSubmitted(true);
    } catch (err) {
      setSubmitted(true);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-ocean-50 to-white">
      {/* Header */}
      <div className="relative bg-ocean-800 text-white py-32 px-4 text-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80"
            alt="bg"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          <h1 className="heading-xl text-white mb-4">{t('contact.title')}</h1>
          <p className="text-white/70 text-lg max-w-xl mx-auto">{t('contact.subtitle')}</p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="glass-card p-8 border-ocean-100">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="text-6xl mb-4">✅</div>
                  <h3 className="heading-md text-ocean-800 mb-2">Thank you!</h3>
                  <p className="text-ocean-500">{t('contact.form_success')}</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-ocean-500 mb-1">
                        {t('contact.form_name')} *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full border border-ocean-200 rounded-xl px-4 py-3 text-sm text-ocean-700 focus:outline-none focus:ring-2 focus:ring-azure-300"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-ocean-500 mb-1">
                        {t('contact.form_email')} *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full border border-ocean-200 rounded-xl px-4 py-3 text-sm text-ocean-700 focus:outline-none focus:ring-2 focus:ring-azure-300"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-ocean-500 mb-1">
                      {t('contact.form_room')}
                    </label>
                    <select
                      name="room"
                      value={formData.room}
                      onChange={handleChange}
                      className="w-full border border-ocean-200 rounded-xl px-4 py-3 text-sm text-ocean-700 focus:outline-none focus:ring-2 focus:ring-azure-300"
                    >
                      <option value="">{t('contact.form_room_default')}</option>
                      {properties.map((p) => (
                        <option key={p.id} value={p.id}>{p.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-ocean-500 mb-1">
                        {t('contact.form_checkin')}
                      </label>
                      <input
                        type="date"
                        name="checkin"
                        value={formData.checkin}
                        onChange={handleChange}
                        className="w-full border border-ocean-200 rounded-xl px-4 py-3 text-sm text-ocean-700 focus:outline-none focus:ring-2 focus:ring-azure-300"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-ocean-500 mb-1">
                        {t('contact.form_checkout')}
                      </label>
                      <input
                        type="date"
                        name="checkout"
                        value={formData.checkout}
                        onChange={handleChange}
                        className="w-full border border-ocean-200 rounded-xl px-4 py-3 text-sm text-ocean-700 focus:outline-none focus:ring-2 focus:ring-azure-300"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-ocean-500 mb-1">
                        {t('contact.form_guests')}
                      </label>
                      <select
                        name="guests"
                        value={formData.guests}
                        onChange={handleChange}
                        className="w-full border border-ocean-200 rounded-xl px-4 py-3 text-sm text-ocean-700 focus:outline-none focus:ring-2 focus:ring-azure-300"
                      >
                        {[1,2,3,4,5,6].map((n) => (
                          <option key={n} value={n}>{n}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-ocean-500 mb-1">
                      {t('contact.form_message')}
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full border border-ocean-200 rounded-xl px-4 py-3 text-sm text-ocean-700 focus:outline-none focus:ring-2 focus:ring-azure-300 resize-none"
                      placeholder="Tell us about your trip..."
                    />
                  </div>

                  <button type="submit" className="w-full btn-primary py-4 text-base">
                    {t('contact.form_submit')}
                  </button>
                </form>
              )}
            </div>

            {/* Contact Info */}
            <div className="mt-6 grid grid-cols-3 gap-4">
              {[
                { icon: '📞', text: t('contact.phone') },
                { icon: '✉️', text: t('contact.email') },
                { icon: '📍', text: t('contact.address') },
              ].map((item) => (
                <div key={item.text} className="text-center p-4 bg-white rounded-2xl shadow-sm border border-ocean-50">
                  <div className="text-2xl mb-2">{item.icon}</div>
                  <div className="text-xs text-ocean-500">{item.text}</div>
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
            <h2 className="heading-md text-ocean-800 mb-8">{t('contact.faq_title')}</h2>
            <div className="space-y-3">
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
