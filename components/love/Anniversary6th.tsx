'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Gift, RotateCw, Ticket, Sparkles, Award } from 'lucide-react';
import confetti from 'canvas-confetti';

const wheelSlices = [
  {
    id: 1,
    title: 'Sınırsız Sarılma Kuponu 🤗',
    desc: 'Kavuştuğumuz ilk an geçerli olmak üzere, kollarımda istediğin kadar kalma hakkı! Süresi asla dolmaz bebeğimm. ❤️',
    color: 'bg-rose-500',
    emoji: '🤗',
  },
  {
    id: 2,
    title: 'Çilekli Tatlı Ismarlama Kuponu 🍓',
    desc: 'En sevdiğin çilekli tatlıyı beraber yiyeceğimiz o gün hesaplar benden pıttık bebik! 🍓🍰',
    color: 'bg-pink-500',
    emoji: '🍓',
  },
  {
    id: 3,
    title: '1 Saat Kesintisiz Aşk Saati 📱',
    desc: 'İş, okul, mesafe fark etmeksizin; sadece sana odaklandığım, yüzünü izlediğim kesintisiz görüntülü konuşma randevusu! 💕',
    color: 'bg-purple-500',
    emoji: '📱',
  },
  {
    id: 4,
    title: 'En Sevdiğin Yemek Benden 🍔',
    desc: 'Canın ne çekiyorsa, Düzce veya Erzurum fark etmez, en sevdiğin menü benden sana hediye! 🍕🍿',
    color: 'bg-amber-500',
    emoji: '🍔',
  },
  {
    id: 5,
    title: 'Şarkı Söyleme Sözü 🎵',
    desc: 'Sana özel, istediğin o güzel Skapova şarkısını (veya herhangi birini) telefonda mırıldanma sözü! 🎵🎤',
    color: 'bg-indigo-500',
    emoji: '🎵',
  },
  {
    id: 6,
    title: 'Sonsuz Sevgi Sertifikası 📜',
    desc: 'Düzce - Erzurum hattında tescillenmiş, 6. ayımıza özel verilmiş ömür boyu geçerli "En Çok Sevilen Kadın" sertifikası! 🏆❤️',
    color: 'bg-teal-500',
    emoji: '📜',
  }
];

export default function Anniversary6th() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [wheelRotation, setWheelRotation] = useState(0);
  const [selectedCoupon, setSelectedCoupon] = useState<typeof wheelSlices[0] | null>(null);

  const startSpin = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setSelectedCoupon(null);

    // Spin at least 5 full rotations (1800 degrees) plus a random slice angle
    const randomSliceIndex = Math.floor(Math.random() * wheelSlices.length);
    const sliceAngle = 360 / wheelSlices.length;
    // Align center of selected slice to top (270 degrees offset or similar depending on draw direction)
    const targetAngle = 360 - (randomSliceIndex * sliceAngle) - (sliceAngle / 2);
    const totalRotation = wheelRotation + 1800 + targetAngle;

    setWheelRotation(totalRotation);

    setTimeout(() => {
      setIsSpinning(false);
      const coupon = wheelSlices[randomSliceIndex];
      setSelectedCoupon(coupon);

      // Fire celebratory confetti!
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#fb7185', '#e11d48', '#fef08a']
      });
    }, 4000); // match duration of CSS transition
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-12 px-4">
      {/* 6th Month Header */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-rose-500/10 via-amber-500/5 to-rose-500/10 border border-rose-500/20 p-8 md:p-12 shadow-2xl text-center flex flex-col items-center gap-6 backdrop-blur-md"
      >
        {/* Decorative Blur Backgrounds */}
        <div className="absolute -top-12 -left-12 w-40 h-40 bg-rose-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Big Celebration Badge */}
        <motion.div
          animate={{ rotate: [0, 4, -4, 0], scale: [1, 1.03, 1] }}
          transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
          className="relative w-24 h-24 flex items-center justify-center bg-gradient-to-tr from-[#e11d48] to-[#fb7185] rounded-full shadow-[0_0_25px_rgba(225,29,72,0.4)] border-2 border-white/20"
        >
          <Heart className="w-12 h-12 text-white/20 absolute fill-current" />
          <span className="text-4xl font-black text-white relative z-10 drop-shadow-md">6</span>
          <span className="text-[10px] font-bold text-yellow-200 absolute bottom-2 z-10 tracking-widest">AY</span>
        </motion.div>

        <div className="space-y-3">
          <div className="flex items-center justify-center gap-2 text-yellow-300 font-bold text-xs tracking-widest uppercase">
            <Award className="w-4 h-4" />
            <span>6. Ay Dönümü Özel Sürprizi 🏆</span>
            <Sparkles className="w-4 h-4" />
          </div>
          <h2 className="text-3xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white via-rose-200 to-white">
            Aşk Çarkı ve Hediye Kuponları! 🍓🎡
          </h2>
        </div>

        <p className="text-rose-100/90 text-base md:text-lg leading-relaxed max-w-2xl font-light">
          Bugün 6. ayımız bebeğimm! Sana olan sevgimi kutlamak için klasikten farklı bir sürpriz hazırladım. 
          Aşağıdaki çarkı çevirerek 6 özel hediyeden birini kazanabilirsin pıttık bebik! 🎁❤️
        </p>

        {/* Spinning Wheel Section */}
        <div className="w-full flex flex-col items-center justify-center gap-10 mt-6">
          <div className="relative w-72 h-72 md:w-80 md:h-80 flex items-center justify-center">
            
            {/* Pointer Arrow */}
            <div className="absolute -top-4 z-30 flex flex-col items-center">
              <div className="w-0 h-0 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-t-[20px] border-t-yellow-400 drop-shadow-md"></div>
              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-[-2px]"></div>
            </div>

            {/* Circular Spin Container */}
            <motion.div
              style={{ rotate: wheelRotation }}
              animate={{ rotate: wheelRotation }}
              transition={isSpinning ? { duration: 4, ease: [0.2, 0.8, 0.2, 1] } : { duration: 0 }}
              className="w-full h-full rounded-full border-4 border-white/20 shadow-[0_0_35px_rgba(251,113,133,0.3)] bg-[#0f1218] overflow-hidden relative flex items-center justify-center"
            >
              {/* Draw Slices */}
              {wheelSlices.map((slice, index) => {
                const angle = 360 / wheelSlices.length;
                const rotation = index * angle;
                return (
                  <div
                    key={slice.id}
                    className="absolute w-full h-full top-0 left-0 origin-center flex justify-center pt-6 pointer-events-none"
                    style={{
                      transform: `rotate(${rotation}deg)`,
                    }}
                  >
                    {/* Slice Line Border */}
                    <div 
                      className="absolute w-[2px] h-1/2 bg-white/10 left-1/2 -translate-x-1/2 top-0 origin-bottom"
                      style={{ transform: `rotate(${angle / 2}deg)` }}
                    />
                    
                    {/* Content */}
                    <div className="flex flex-col items-center gap-1 z-10">
                      <span className="text-3xl select-none">{slice.emoji}</span>
                      <span className="text-[10px] font-black text-white/80 bg-[#0a0c10]/60 px-1.5 py-0.5 rounded-full border border-white/5 whitespace-nowrap">
                        {slice.id}
                      </span>
                    </div>
                  </div>
                );
              })}

              {/* Center Circle Pin */}
              <div className="absolute w-12 h-12 rounded-full bg-gradient-to-tr from-rose-500 to-rose-600 border-2 border-white/30 z-20 flex items-center justify-center shadow-lg">
                <Heart className="w-5 h-5 text-white fill-current animate-pulse" />
              </div>
            </motion.div>
          </div>

          {/* Spin Trigger Button */}
          <button
            onClick={startSpin}
            disabled={isSpinning}
            className={`px-8 py-3.5 rounded-full text-white font-bold text-lg shadow-[0_0_20px_rgba(225,29,72,0.4)] transition-all duration-300 flex items-center gap-3 select-none ${
              isSpinning 
                ? 'opacity-50 cursor-not-allowed bg-rose-600' 
                : 'bg-gradient-to-r from-[#fb7185] to-[#e11d48] hover:scale-105 hover:shadow-[0_0_30px_rgba(225,29,72,0.6)] cursor-pointer'
            }`}
          >
            <RotateCw className={`w-5 h-5 ${isSpinning ? 'animate-spin' : ''}`} />
            <span>{isSpinning ? 'Çark Dönüyor...' : 'Çarkı Çevir! 🍓'}</span>
          </button>

          {/* Display Winner Coupon Card */}
          <AnimatePresence>
            {selectedCoupon && (
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 30, scale: 0.9 }}
                transition={{ type: 'spring', damping: 20 }}
                className="w-full max-w-md p-6 bg-white/10 backdrop-blur-xl border border-rose-500/30 rounded-3xl shadow-[0_0_35px_rgba(225,29,72,0.4)] text-left relative overflow-hidden"
              >
                <div className="absolute -top-6 -right-6 w-20 h-20 bg-rose-500/10 rounded-full blur-xl pointer-events-none"></div>
                <span className="absolute top-4 right-4 text-4xl select-none">🎁</span>
                
                <div className="flex items-center gap-2 text-yellow-300 font-bold text-xs uppercase tracking-widest mb-3">
                  <Ticket className="w-4 h-4" />
                  <span>Kuponun Tanımlandı! 🎉</span>
                </div>

                <h4 className="text-xl md:text-2xl font-black text-white mb-2">
                  {selectedCoupon.title}
                </h4>

                <p className="text-white/90 text-sm md:text-base leading-relaxed mb-4">
                  {selectedCoupon.desc}
                </p>

                <div className="text-[10px] text-white/40 border-t border-white/10 pt-3 text-center">
                  *Bu kupon 6. ayımıza özeldir, ekran görüntüsü alarak her zaman kullanabilirsin bebeğimm. 🍓❤️
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
