'use client';
import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import Lightbox from './Lightbox';

function GalleryImage({ image, index, onClick }) {
  const { t } = useLanguage();
  const [loaded, setLoaded] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      className="group relative overflow-hidden rounded-xl cursor-pointer aspect-video bg-ocean-100"
      onClick={() => onClick(index)}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}
    >
      {/* Blur-up placeholder */}
      {!loaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-ocean-100 to-azure-100 animate-pulse" />
      )}
      <img
        src={image.src}
        alt={t(image.alt)}
        className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={() => setLoaded(true)}
        loading="lazy"
      />
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      {/* Zoom icon */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
          </svg>
        </div>
      </div>
    </motion.div>
  );
}

export default function GalleryGrid({ images }) {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const openLightbox = useCallback((index) => setLightboxIndex(index), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const goPrev = useCallback(() =>
    setLightboxIndex((i) => (i - 1 + images.length) % images.length),
    [images.length]
  );

  const goNext = useCallback(() =>
    setLightboxIndex((i) => (i + 1) % images.length),
    [images.length]
  );

  const goTo = useCallback((index) => setLightboxIndex(index), []);

  if (images.length === 0) return null;

  return (
    <>
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
      >
        <AnimatePresence mode="popLayout">
          {images.map((image, index) => (
            <GalleryImage
              key={image.id}
              image={image}
              index={index}
              onClick={openLightbox}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            images={images}
            currentIndex={lightboxIndex}
            onClose={closeLightbox}
            onPrev={goPrev}
            onNext={goNext}
            onGoTo={goTo}
          />
        )}
      </AnimatePresence>
    </>
  );
}
