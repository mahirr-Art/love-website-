'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, MailOpen, Mail } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Anniversary6th() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      // Fire confetti when envelope is opened
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#fb7185', '#e11d48', '#fef08a']
      });
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-12 px-4">
      {/* 6. Ay Anniversary Header */}
      <div className="flex flex-col items-center mb-8 text-center">
        <motion.div 
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex items-center justify-center gap-2 mb-4"
        >
          <span className="text-3xl">🍓</span>
          <Heart className="w-8 h-8 text-[#e11d48] fill-current" />
          <span className="text-3xl">🍓</span>
        </motion.div>
        <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-rose-200 via-white to-rose-200 mb-2">
          6. Ay Dönümümüz Kutlu Olsun! 🎉
        </h2>
        <p className="text-rose-200/60 text-base">
          Mektuba tıklayıp senin için hazırladığım notu oku pıttık bebik... 🍓❤️
        </p>
      </div>

      <div className="flex flex-col items-center justify-center min-h-[350px] relative">
        <AnimatePresence mode="wait">
          {!isOpen ? (
            /* Envelope Cover */
            <motion.div
              key="closed-envelope"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={handleOpen}
              className="cursor-pointer bg-gradient-to-br from-[#fb7185]/20 to-[#e11d48]/10 hover:from-[#fb7185]/30 hover:to-[#e11d48]/20 border border-rose-400/30 rounded-3xl p-10 shadow-2xl flex flex-col items-center gap-6 max-w-md w-full text-center relative overflow-hidden group"
            >
              {/* Decorative strawberries on closed envelope */}
              <div className="absolute top-3 left-3 text-2xl group-hover:animate-bounce">🍓</div>
              <div className="absolute bottom-3 right-3 text-2xl group-hover:animate-bounce">🍓</div>

              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <Mail className="w-16 h-16 text-[#fb7185] group-hover:text-white transition-colors" />
              </motion.div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white tracking-wide">
                  Ecem'e Özel 6. Ay Mektubu 💌
                </h3>
                <p className="text-rose-100/70 text-sm">
                  Düzce'den Erzurum'a sevgiyle... Açmak için üzerine dokun bebeğimm.
                </p>
              </div>

              <div className="px-5 py-2.5 rounded-full bg-rose-500/20 text-xs font-bold text-white border border-rose-500/40 shadow-inner">
                Tıkla ve Aç 🍓
              </div>
            </motion.div>
          ) : (
            /* Opened Letter Card */
            <motion.div
              key="opened-letter"
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.9 }}
              className="w-full max-w-2xl bg-white p-8 md:p-12 rounded-2xl shadow-[0_20px_50px_rgba(225,29,72,0.3)] border border-neutral-200/50 flex flex-col relative text-neutral-800"
              style={{
                backgroundImage: 'radial-gradient(#f3f4f6 1px, transparent 0), radial-gradient(#f3f4f6 1px, transparent 0)',
                backgroundSize: '20px 20px',
                backgroundPosition: '0 0, 10px 10px'
              }}
            >
              {/* Close/Back Button */}
              <button
                onClick={handleOpen}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-neutral-600 transition-colors"
              >
                <MailOpen size={20} />
              </button>

              {/* Heart and Strawberry header inside letter */}
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-rose-100">
                <span className="text-2xl select-none">🍓</span>
                <h3 className="text-lg font-black text-rose-600 uppercase tracking-widest">
                  6. Ay Dönümü Notumuz
                </h3>
                <span className="text-2xl select-none">❤️</span>
              </div>

              {/* Letter Content written in personal, warm, Turkish couple style */}
              <div className="space-y-6 text-lg md:text-xl font-medium leading-relaxed tracking-wide" style={{ fontFamily: "'Dancing Script', cursive" }}>
                <p>Bugün bizim 6. ayımız bebeğimm! 6 koca ayı geride bıraktık pıttık bebik... 🍓❤️</p>
                
                <p>
                  Düzce'den Erzurum'a yollar çok uzun olsa da, aramızdaki mesafeler sana olan aşkımı azaltmaya yetmiyor, 
                  aksine seni her geçen gün daha da çok özlüyorum. Sesini her duyduğumda, o güzel yüzünü her gördüğümde 
                  resmen içim eriyor.
                </p>
                
                <p>
                  Güzelliğine kurbaan olduğum Ecem, iyi ki benim sevgilimsin, iyi ki hayatımdasın. Seninle geçecek 
                  daha nice güzel aylara, yıllara birlikte el ele girmek dileğiyle...
                </p>
                
                <p className="text-right font-bold text-rose-600 text-2xl pt-4">
                  Seni dünyalar kadar çok seviyorum! ❤️🍓
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-neutral-100 flex justify-between items-center text-xs text-neutral-400 font-bold">
                <span>Düzce ➔ Erzurum 📍</span>
                <span>27.07.2026 🗓️</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
