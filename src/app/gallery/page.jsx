'use client';
import { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import GalleryGrid from '@/components/gallery/GalleryGrid';
import galleryImages from '../../../public/data/gallery.json';

const FILTERS = [
  { id: 'all', labelKey: 'gallery.filter_all' },
  { id: 'exterior', labelKey: 'gallery.filter_exterior' },
  { id: 'classic', labelKey: 'gallery.filter_classic' },
  { id: '2-1', labelKey: 'gallery.filter_2_1' },
  { id: '2-2', labelKey: 'gallery.filter_2_2' },
  { id: '2-3', labelKey: 'gallery.filter_2_3' },
];

function ParallaxHeader({ t }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  return (
    <div ref={ref} className="relative h-72 md:h-96 overflow-hidden flex items-center justify-center">
      <motion.div style={{ y }} className="absolute inset-0 w-full h-[130%] -top-[15%]">
        <img
          src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1920&q=80"
          alt="Wavepoint Gallery"
          className="w-full h-full object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />
      <div className="relative z-10 text-center text-white px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className="text-azure-300 text-xs font-medium tracking-[0.3em] uppercase mb-3">
            Wavepoint Apartments
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 drop-shadow-lg">
            {t('gallery.title')}
          </h1>
          <div className="w-12 h-0.5 bg-azure-400 mx-auto mb-4" />
          <p className="text-white/75 text-base md:text-lg max-w-xl mx-auto">
            {t('gallery.subtitle')}
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default function GalleryPage() {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredImages = useMemo(() => {
    if (activeFilter === 'all') return galleryImages;
    return galleryImages.filter((img) => img.category === activeFilter);
  }, [activeFilter]);

  return (
    <div className="min-h-screen bg-white">
      <ParallaxHeader t={t} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filter bar */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {FILTERS.map((filter) => (
            <motion.button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              whileTap={{ scale: 0.96 }}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                activeFilter === filter.id
                  ? 'bg-azure-500 text-white border-azure-500 shadow-md'
                  : 'bg-white text-ocean-700 border-ocean-200 hover:border-azure-400 hover:text-azure-500'
              }`}
            >
              {t(filter.labelKey)}
            </motion.button>
          ))}
        </div>

        {/* Gallery grid with animated count */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <GalleryGrid images={filteredImages} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
