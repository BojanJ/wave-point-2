"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkle, Phone, Mail, MapPin } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import properties from "../../../public/data/properties.json";

function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-brand-stone">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-5 text-left hover:text-brand-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 transition-colors group"
        aria-expanded={isOpen}
      >
        <span className="font-medium text-brand-charcoal group-hover:text-brand-gold pr-4 text-sm transition-colors">
          {question}
        </span>
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
            animate={{ height: "auto", opacity: 1 }}
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
  const searchParams = useSearchParams();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    room: searchParams.get("room") || "",
    checkin: searchParams.get("checkin") || "",
    checkout: searchParams.get("checkout") || "",
    guests: searchParams.get("guests") || "2",
    message: "",
  });

  const faqs = [
    { q: t("contact.faq_1_q"), a: t("contact.faq_1_a") },
    { q: t("contact.faq_2_q"), a: t("contact.faq_2_a") },
    { q: t("contact.faq_3_q"), a: t("contact.faq_3_a") },
    { q: t("contact.faq_4_q"), a: t("contact.faq_4_a") },
    { q: t("contact.faq_5_q"), a: t("contact.faq_5_a") },
    { q: t("contact.faq_6_q"), a: t("contact.faq_6_a") },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch("/mailer.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
          <p className="text-brand-gold text-xs font-medium tracking-[0.35em] uppercase mb-4">
            Enquire
          </p>
          <h1 className="heading-xl text-white mb-4">{t("contact.title")}</h1>
          <p className="text-white/55 text-lg max-w-xl mx-auto font-light">
            {t("contact.subtitle")}
          </p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="bg-brand-sand border border-brand-stone p-8">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-16"
                >
                  <div className="flex justify-center mb-6"><Sparkle size={48} className="text-brand-gold" /></div>
                  <h3 className="heading-md text-brand-charcoal mb-3">
                    Thank you
                  </h3>
                  <p className="text-brand-clay">{t("contact.form_success")}</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-7">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
                    <div>
                      <label className="block text-xs font-medium tracking-[0.12em] text-brand-clay uppercase mb-2">
                        {t("contact.form_name")} *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="input-luxury"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium tracking-[0.12em] text-brand-clay uppercase mb-2">
                        {t("contact.form_email")} *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="input-luxury"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium tracking-[0.12em] text-brand-clay uppercase mb-2">
                      {t("contact.form_room")}
                    </label>
                    <select
                      name="room"
                      value={formData.room}
                      onChange={handleChange}
                      className="input-luxury bg-transparent"
                    >
                      <option value="">{t("contact.form_room_default")}</option>
                      {properties.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-7">
                    <div>
                      <label className="block text-xs font-medium tracking-[0.12em] text-brand-clay uppercase mb-2">
                        {t("contact.form_checkin")}
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
                        {t("contact.form_checkout")}
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
                        {t("contact.form_guests")}
                      </label>
                      <select
                        name="guests"
                        value={formData.guests}
                        onChange={handleChange}
                        className="input-luxury bg-transparent"
                      >
                        {[1, 2, 3, 4, 5, 6].map((n) => (
                          <option key={n} value={n}>
                            {n}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium tracking-[0.12em] text-brand-clay uppercase mb-2">
                      {t("contact.form_message")}
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      className="input-luxury resize-none"
                      placeholder="Tell us about your stay..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full btn-primary py-4 text-sm tracking-widest"
                  >
                    {t("contact.form_submit")}
                  </button>
                </form>
              )}
            </div>

            {/* Contact Info */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              {[
                {
                  Icon: Phone,
                  text: t("contact.phone"),
                  href: "tel:+306948145850",
                },
                {
                  Icon: Mail,
                  text: t("contact.email"),
                  href: "mailto:contact@wavepoint-apartments.com",
                },
              ].map((item) => (
                <div
                  key={item.text}
                  className="text-center p-4 bg-brand-stone/40 border border-brand-stone"
                >
                  <div className="flex justify-center mb-2"><item.Icon size={24} className="text-brand-clay" /></div>
                  <div className="text-xs text-brand-clay-dark">
                    <a href={item.href} className="text-inherit no-underline">
                      {item.text}
                    </a>
                  </div>
                </div>
              ))}
              <div className="col-span-2 text-center p-4 bg-brand-stone/40 border border-brand-stone">
                <div className="flex justify-center mb-2"><MapPin size={24} className="text-brand-clay" /></div>
                <div className="text-xs text-brand-clay-dark space-y-1">
                  <ul className="space-y-2.5">
                    <li>
                      <a
                        href="https://maps.app.goo.gl/LEoZcePyCrqQsDQt9"
                        className="text-inherit no-underline"
                      >
                        {t("contact.address1")}
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://maps.app.goo.gl/LEoZcePyCrqQsDQt9"
                        className="text-inherit no-underline"
                      >
                        {t("contact.address2")}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>

          {/* FAQ */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-brand-clay text-xs tracking-[0.3em] uppercase mb-3">
              Questions
            </p>
            <h2 className="heading-md text-brand-charcoal mb-8">
              {t("contact.faq_title")}
            </h2>
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
