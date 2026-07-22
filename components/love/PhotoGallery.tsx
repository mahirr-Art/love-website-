'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, ChevronLeft, ChevronRight, X } from 'lucide-react';

const galleryItems = [
  {
    id: 1,
    src: '/images/photo1.png',
    caption: 'Seninle her gün ışıl ışıl... ☀️❤️',
    rotation: '-rotate-3',
  },
  {
    id: 2,
    src: '/images/photo2.jpg',
    caption: 'En güvenli sığınağım... 💑✨',
    rotation: 'rotate-2',
  },
  {
    id: 3,
    src: '/images/photo3.jpg',
    caption: 'Yan yana, el ele, sonsuza... 🌹🖤',
    rotation: '-rotate-1',
  },
  {
    id: 4,
    src: '/images/photo4.png',
    caption: 'Gülüşünle dünyamı aydınlatan kadın... 🍓😍',
    rotation: 'rotate-3',
  },
  {
    id: 5,
    src: '/images/photo5.jpg',
    caption: 'Her halinle en güzelim... 🌸😜',
    rotation: '-rotate-2',
  },
];

export default function PhotoGallery() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = useCallback(() => {
    setCurrentIndex((prev) => (prev === galleryItems.length - 1 ? 0 : prev + 1));
  }, []);

  const prevImage = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? galleryItems.length - 1 : prev - 1));
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'Escape') closeLightbox();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, nextImage, prevImage]);

  return (
    <div className="w-full max-w-6xl mx-auto py-16">
      <div className="flex flex-col items-center mb-16 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Camera className="w-8 h-8 text-[#e11d48] animate-bounce" />
          <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
            Bizim Anılarımız 📸
          </h2>
          <span className="text-3xl">🍓</span>
        </div>
        <p className="text-white/60 text-lg max-w-lg">
          Seninle geçen her an, saklanmaya değer en güzel hatıram... ❤️
        </p>
      </div>

      {/* Polaroid Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 px-4 justify-items-center">
        {galleryItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ 
              scale: 1.05, 
              rotate: 0,
              zIndex: 10,
              boxShadow: '0 20px 25px -5px rgba(225, 29, 72, 0.2), 0 10px 10px -5px rgba(225, 29, 72, 0.1)'
            }}
            onClick={() => openLightbox(index)}
            className={`cursor-pointer bg-white p-4 pb-8 rounded-sm shadow-xl border border-neutral-200/50 flex flex-col items-center transition-all duration-300 ${item.rotation}`}
          >
            {/* Image Container */}
            <div className="relative w-full aspect-[3/4] bg-neutral-100 overflow-hidden border border-neutral-100">
              <img
                src={item.src}
                alt={item.caption}
                className="w-full h-full object-cover grayscale-[10%] hover:grayscale-0 transition-all duration-500"
              />
              {/* Cute Strawberry Badge overlay */}
              <div className="absolute top-2 right-2 bg-[#000000]/60 backdrop-blur-sm rounded-full p-1 border border-white/10 opacity-0 hover:opacity-100 transition-opacity duration-300">
                <span className="text-sm">🍓</span>
              </div>
            </div>

            {/* Polaroid Label */}
            <div className="mt-4 w-full text-center">
              <p 
                className="text-neutral-800 text-lg font-semibold tracking-wide"
                style={{ fontFamily: "'Dancing Script', cursive" }}
              >
                {item.caption}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#000000]/95 backdrop-blur-md flex items-center justify-center p-4"
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors border border-white/10 z-50"
            >
              <X size={24} />
            </button>

            {/* Left navigation arrow */}
            <button
              onClick={prevImage}
              className="absolute left-6 p-4 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors border border-white/10 z-40 hidden md:block"
            >
              <ChevronLeft size={28} />
            </button>

            {/* Right navigation arrow */}
            <button
              onClick={nextImage}
              className="absolute right-6 p-4 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors border border-white/10 z-40 hidden md:block"
            >
              <ChevronRight size={28} />
            </button>

            {/* Lightbox Slide Content */}
            <motion.div
              key={currentIndex}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="max-w-2xl w-full flex flex-col items-center justify-center relative select-none"
            >
              <div className="bg-white p-4 pb-12 rounded shadow-2xl relative max-w-[90%] md:max-w-full">
                {/* Main image in Lightbox */}
                <img
                  src={galleryItems[currentIndex].src}
                  alt={galleryItems[currentIndex].caption}
                  className="max-h-[70vh] w-auto object-contain rounded-sm"
                />

                {/* Polaroid text label */}
                <div className="absolute bottom-3 left-0 w-full text-center px-4">
                  <p 
                    className="text-neutral-800 text-2xl font-bold tracking-wide"
                    style={{ fontFamily: "'Dancing Script', cursive" }}
                  >
                    {galleryItems[currentIndex].caption}
                  </p>
                </div>
              </div>

              {/* Progress counter */}
              <div className="mt-6 flex items-center gap-2 text-white/55 font-medium text-sm">
                <span>{currentIndex + 1}</span>
                <span>/</span>
                <span>{galleryItems.length}</span>
                <span className="text-[#e11d48]">🍓</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
