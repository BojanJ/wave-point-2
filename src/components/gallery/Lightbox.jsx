'use client';
import { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

export default function Lightbox({ images, currentIndex, onClose, onPrev, onNext, onGoTo }) {
  const { t } = useLanguage();
  const current = images[currentIndex];

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    },
    [onClose, onPrev, onNext]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleKeyDown]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
    >
      {/* Close button */}
      <button
        className="absolute top-4 right-4 z-10 text-white/80 hover:text-white bg-black/40 hover:bg-black/60 rounded-full p-3 transition-all"
        onClick={onClose}
        aria-label={t('gallery.lightbox_close')}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Counter */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white/70 text-sm tabular-nums">
        {currentIndex + 1} {t('gallery.image_count')} {images.length}
      </div>

      {/* Prev button */}
      {images.length > 1 && (
        <button
          className="absolute left-3 md:left-6 z-10 text-white/80 hover:text-white bg-black/40 hover:bg-black/60 rounded-full p-3 transition-all"
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          aria-label={t('gallery.lightbox_prev')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {/* Image container with swipe support */}
      <motion.div
        key={currentIndex}
        className="relative max-w-5xl max-h-[85vh] w-full mx-14 flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.2 }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.15}
        onDragEnd={(_, info) => {
          if (info.offset.x < -60) onNext();
          else if (info.offset.x > 60) onPrev();
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={current.src}
          alt={t(current.alt)}
          className="max-h-[85vh] max-w-full w-auto h-auto rounded-xl object-contain shadow-2xl select-none"
          draggable={false}
        />
        {/* Alt caption */}
        <div className="absolute bottom-0 left-0 right-0 text-center text-white/60 text-xs py-2 bg-gradient-to-t from-black/40 to-transparent rounded-b-xl px-4">
          {t(current.alt)}
        </div>
      </motion.div>

      {/* Next button */}
      {images.length > 1 && (
        <button
          className="absolute right-3 md:right-6 z-10 text-white/80 hover:text-white bg-black/40 hover:bg-black/60 rounded-full p-3 transition-all"
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          aria-label={t('gallery.lightbox_next')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 max-w-xs overflow-x-auto scrollbar-hide px-2">
          {images.map((img, i) => (
            <button
              key={img.id}
              onClick={(e) => { e.stopPropagation(); onGoTo(i); }}
              className={`flex-shrink-0 w-12 h-8 rounded overflow-hidden border-2 transition-all ${
                i === currentIndex ? 'border-white scale-110' : 'border-white/30 opacity-50'
              }`}
              aria-label={`Go to image ${i + 1}`}
            >
              <img src={img.src} alt="" className="w-full h-full object-cover" draggable={false} />
            </button>
          ))}
        </div>
      )}
    </motion.div>
  );
}
