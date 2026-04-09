'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import properties from '../../public/data/properties.json';

const WHATSAPP_NUMBER = '306948145850';

export default function BookingForm() {
  const { t, locale } = useLanguage();

  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    room: '',
    checkin: '',
    checkout: '',
    guests: '2',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const payload = { ...formData, language: locale };
      const res = await fetch('/mailer.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  return (
    <AnimatePresence mode="wait">
      {status === 'success' ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center py-16"
        >
          <div className="text-5xl mb-6">✦</div>
          <h3 className="heading-md text-brand-charcoal mb-3">
            {t('contact.form_success').split('!')[0]}!
          </h3>
          <p className="text-brand-clay">
            {t('contact.form_success').split('!').slice(1).join('!').trim()}
          </p>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          onSubmit={handleSubmit}
          className="space-y-7"
          noValidate
        >
          {/* Name + Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
            <div>
              <label className="block text-xs font-medium tracking-[0.12em] text-brand-clay uppercase mb-2">
                {t('contact.form_name')} *
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="input-luxury"
                placeholder={t('contact.form_name_placeholder')}
              />
            </div>
            <div>
              <label className="block text-xs font-medium tracking-[0.12em] text-brand-clay uppercase mb-2">
                {t('contact.form_email')} *
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="input-luxury"
                placeholder={t('contact.form_email_placeholder')}
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-xs font-medium tracking-[0.12em] text-brand-clay uppercase mb-2">
              {t('contact.form_phone')}
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="input-luxury"
              placeholder={t('contact.form_phone_placeholder')}
            />
          </div>

          {/* Room */}
          <div>
            <label className="block text-xs font-medium tracking-[0.12em] text-brand-clay uppercase mb-2">
              {t('contact.form_room')}
            </label>
            <select
              name="room"
              value={formData.room}
              onChange={handleChange}
              className="input-luxury bg-transparent"
            >
              <option value="">{t('contact.form_room_default')}</option>
              {properties.map((p) => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>

          {/* Dates + Guests */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-7">
            <div>
              <label className="block text-xs font-medium tracking-[0.12em] text-brand-clay uppercase mb-2">
                {t('contact.form_checkin')}
              </label>
              <input
                type="date"
                name="checkin"
                value={formData.checkin}
                onChange={handleChange}
                className="input-luxury"
              />
            </div>
            <div>
              <label className="block text-xs font-medium tracking-[0.12em] text-brand-clay uppercase mb-2">
                {t('contact.form_checkout')}
              </label>
              <input
                type="date"
                name="checkout"
                value={formData.checkout}
                onChange={handleChange}
                className="input-luxury"
              />
            </div>
            <div>
              <label className="block text-xs font-medium tracking-[0.12em] text-brand-clay uppercase mb-2">
                {t('contact.form_guests')}
              </label>
              <select
                name="guests"
                value={formData.guests}
                onChange={handleChange}
                className="input-luxury bg-transparent"
              >
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block text-xs font-medium tracking-[0.12em] text-brand-clay uppercase mb-2">
              {t('contact.form_message')}
            </label>
            <textarea
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              className="input-luxury resize-none"
              placeholder={t('contact.form_message_placeholder')}
            />
          </div>

          {/* Hidden language field */}
          <input type="hidden" name="language" value={locale} />

          {/* Error message */}
          <AnimatePresence>
            {status === 'error' && (
              <motion.p
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-sm text-red-600"
              >
                {t('contact.form_error')}{' '}
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-brand-gold hover:text-brand-gold-dark"
                >
                  {t('contact.form_error_whatsapp')}
                </a>
                .
              </motion.p>
            )}
          </AnimatePresence>

          {/* Submit */}
          <button
            type="submit"
            disabled={status === 'sending'}
            className="w-full btn-primary py-4 text-sm tracking-widest disabled:opacity-60 disabled:cursor-not-allowed transition-opacity"
          >
            {status === 'sending' ? t('contact.form_sending') : t('contact.form_submit')}
          </button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
