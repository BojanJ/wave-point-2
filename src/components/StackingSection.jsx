'use client';
import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Users, BedDouble, Waves } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const CARD_IMAGES = {
  'classic': 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&q=85',
  '2-1':     'https://images.unsplash.com/photo-1615880484746-a134be9a6ecf?w=1920&q=85',
  '2-2':     'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1920&q=85',
  '2-3':     'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1920&q=85',
};

const ROOM_LABELS = {
  'classic': 'I',
  '2-1':     '2.1',
  '2-2':     '2.2',
  '2-3':     '2.3',
};

// Gradient positions alternate left/right for an asymmetric editorial feel
const GRADIENT_SIDES = ['left', 'right', 'left', 'right'];

/**
 * Individual stacking card — scroll-driven via Framer Motion transforms
 * passed from the parent via `progress` MotionValue.
 */
function ApartmentCard({ property, index, total, progress }) {
  const N = total;
  const SLIDE_DURATION = 0.12; // fraction of total progress for each animation

  /* ── Slide-in (Y) ─────────────────────────────────────────── */
  const slideInStart = index === 0 ? 0 : Math.max(0, index / N - 0.02);
  const slideInEnd   = index === 0 ? 0 : index / N + SLIDE_DURATION;

  const y = useTransform(
    progress,
    index === 0 ? [0, 1] : [slideInStart, slideInEnd],
    index === 0 ? ['0%', '0%'] : ['100%', '0%'],
    { clamp: true },
  );

  /* ── Scale down when the next card arrives ─────────────────── */
  const nextCardIn    = (index + 1) / N;
  const nextCardInEnd = nextCardIn + SLIDE_DURATION;

  const scale = useTransform(
    progress,
    index === N - 1 ? [0, 1] : [nextCardIn, nextCardInEnd],
    index === N - 1 ? [1, 1] : [1, 0.94],
    { clamp: true },
  );

  /* ── Dim underlying card ───────────────────────────────────── */
  const cardOpacity = useTransform(
    progress,
    index === N - 1 ? [0, 1] : [nextCardIn, nextCardInEnd],
    index === N - 1 ? [1, 1] : [1, 0.72],
    { clamp: true },
  );

  const gradientSide = GRADIENT_SIDES[index % GRADIENT_SIDES.length];
  const img = CARD_IMAGES[property.id] || CARD_IMAGES['classic'];
  const roomLabel = ROOM_LABELS[property.id] || property.id;

  return (
    <motion.div
      className="absolute inset-0 overflow-hidden"
      style={{ y, scale, opacity: cardOpacity, zIndex: index, transformOrigin: 'top center' }}
    >
      {/* Full-bleed background */}
      <img
        src={img}
        alt={property.name}
        className="absolute inset-0 w-full h-full object-cover"
        loading={index === 0 ? 'eager' : 'lazy'}
      />

      {/* Gradient overlay — alternates left/right for asymmetry */}
      <div
        className="absolute inset-0"
        style={{
          background:
            gradientSide === 'left'
              ? 'linear-gradient(105deg, rgba(51,48,46,0.88) 0%, rgba(51,48,46,0.55) 45%, transparent 75%)'
              : 'linear-gradient(255deg, rgba(51,48,46,0.88) 0%, rgba(51,48,46,0.55) 45%, transparent 75%)',
        }}
      />

      {/* Content area */}
      <div
        className={`absolute inset-0 flex items-center ${
          gradientSide === 'left' ? 'justify-start' : 'justify-end'
        }`}
      >
        <div
          className={`max-w-lg px-10 md:px-16 lg:px-20 ${
            gradientSide === 'right' ? 'text-right' : 'text-left'
          }`}
        >
          {/* Room number — large editorial serif in gold */}
          <p
            className="font-serif text-brand-gold leading-none select-none"
            style={{ fontSize: 'clamp(5rem, 14vw, 11rem)', letterSpacing: '-0.03em', opacity: 0.95 }}
            aria-hidden="true"
          >
            {roomLabel}
          </p>

          {/* Badge */}
          <div className="mb-3 -mt-3">
            <span className="inline-block border border-brand-gold/50 text-brand-gold text-[10px] font-sans font-medium tracking-[0.25em] px-3 py-1 uppercase">
              {property.badge}
            </span>
          </div>

          {/* Name */}
          <h3 className="font-serif text-white font-bold mb-2" style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)' }}>
            {property.name}
          </h3>

          {/* Tagline */}
          <p className="text-white/70 font-sans text-sm tracking-wide leading-relaxed mb-5 max-w-sm">
            {property.tagline}
          </p>

          {/* Quick stats */}
          <div
            className={`flex gap-4 mb-7 text-xs font-sans font-medium text-white/60 tracking-wide ${
              gradientSide === 'right' ? 'justify-end' : 'justify-start'
            }`}
          >
            <span className="flex items-center gap-1.5"><Users size={13} />{property.capacity} guests</span>
            <span className="flex items-center gap-1.5"><BedDouble size={13} />{property.bedrooms} bed</span>
            <span className="flex items-center gap-1.5"><Waves size={13} />{property.view}</span>
          </div>

          {/* Price + CTA */}
          <div className={`flex items-center gap-4 flex-wrap ${gradientSide === 'right' ? 'justify-end' : 'justify-start'}`}>
            <span className="font-serif text-brand-gold font-semibold text-lg tracking-wide">
              {property.price_from}
            </span>
            <Link
              href={`/apartments/${property.id}`}
              className="btn-primary text-xs px-8 py-3"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll hint — only on the first card */}
      {index === 0 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40">
          <p className="text-[10px] font-sans tracking-[0.25em] uppercase">Scroll</p>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
            className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent"
          />
        </div>
      )}
    </motion.div>
  );
}

/**
 * StackingSection — desktop: scroll-driven stacking cards
 *                  mobile:  simple vertical list
 */
export default function StackingSection({ properties }) {
  const { t } = useLanguage();
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const N = properties.length; // 4

  return (
    <>
      {/* ── Desktop: stacking effect ──────────────────────────── */}
      <div
        ref={containerRef}
        className="hidden md:block relative"
        style={{ height: `${N * 100}vh` }}
        aria-label="Apartment collection"
      >
        <div className="sticky top-0 h-screen overflow-hidden">
          {properties.map((property, index) => (
            <ApartmentCard
              key={property.id}
              property={property}
              index={index}
              total={N}
              progress={scrollYProgress}
            />
          ))}
        </div>
      </div>

      {/* ── Mobile: clean vertical list ───────────────────────── */}
      <div className="md:hidden bg-brand-charcoal">
        {properties.map((property, index) => {
          const img = CARD_IMAGES[property.id] || CARD_IMAGES['classic'];
          const roomLabel = ROOM_LABELS[property.id] || property.id;
          return (
            <motion.article
              key={property.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: index * 0.08 }}
              className="relative overflow-hidden"
              style={{ minHeight: '85vh' }}
            >
              <img
                src={img}
                alt={property.name}
                className="absolute inset-0 w-full h-full object-cover"
                loading={index === 0 ? 'eager' : 'lazy'}
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(to top, rgba(51,48,46,0.92) 0%, rgba(51,48,46,0.5) 50%, transparent 80%)',
                }}
              />

              <div className="absolute bottom-0 left-0 right-0 p-8">
                <p className="font-serif text-brand-gold leading-none mb-1"
                   style={{ fontSize: 'clamp(3.5rem, 18vw, 6rem)', opacity: 0.9 }}>
                  {roomLabel}
                </p>
                <span className="inline-block border border-brand-gold/50 text-brand-gold text-[10px] font-sans font-medium tracking-[0.25em] px-3 py-1 uppercase mb-3">
                  {property.badge}
                </span>
                <h3 className="font-serif text-white text-2xl font-bold mb-1">{property.name}</h3>
                <p className="text-white/65 font-sans text-sm leading-relaxed mb-4">{property.tagline}</p>
                <div className="flex gap-3 text-xs font-sans text-white/55 mb-5">
                  <span className="flex items-center gap-1"><Users size={12} />{property.capacity} guests</span>
                  <span className="flex items-center gap-1"><BedDouble size={12} />{property.bedrooms} bed</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-serif text-brand-gold font-semibold text-base">{property.price_from}</span>
                  <Link href={`/apartments/${property.id}`} className="btn-primary text-xs px-6 py-3">
                    {t('apartments.view_details')}
                  </Link>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
    </>
  );
}
