'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Calendar, Award, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

const monthlyMemories = [
  {
    month: 1,
    title: '1. Ay: Başlangıç ✨',
    text: 'Her şeyin başladığı o sihirli an... Kalbimin ritmini değiştiren, seninle ilk defa "biz" olduğumuz o en özel günümüz. İyi ki adımlarımız birbirine çıktı bebeğimm. ❤️',
  },
  {
    month: 2,
    title: '2. Ay: Alışmak ☕',
    text: 'Sana her geçen gün daha da çok alışıp, sesindeki huzurda kaybolduğum zamanlar. Her konuşmamızda heyecanımın katlanarak arttığı o tatlı dönem. 🥰',
  },
  {
    month: 3,
    title: '3. Ay: İnanç 🗺️',
    text: 'Aramızdaki mesafelerin (Düzce - Erzurum) sevgimizi azaltamayacağını, aksine bizi birbirimize daha sıkı bağladığını iyice anladığımız o güçlü dönem. 🍓',
  },
  {
    month: 4,
    title: '4. Ay: Köklenmek 🌟',
    text: 'Gözlerindeki o ışığı her gördüğümde, iyi ki hayatımdasın dediğim, aşkımızın kalbimizde iyice kök saldığı ve geleceğe umutla baktığımız günler. 🌸',
  },
  {
    month: 5,
    title: '5. Ay: Bütünleşmek 💑',
    text: 'Paylaştığımız her şaka, her dert, her kahkaha ile bir bütün olduğumuzu hissettiğimiz, birbirimizin en güvenli sığınağı haline geldiğimiz o harika ay. 💖',
  },
  {
    month: 6,
    title: '6. Ay: Yarım Asırlık Sevgi! 🏆',
    text: 'Bugün... Tam 6 ay oldu pıttık bebik! Göz açıp kapayıncaya kadar geçen bu sürede bana yaşattığın her güzel duygu için teşekkür ederim. Güzelliğine kurbaan olduğum, nice mutlu aylara ve yıllara! 🍓❤️',
  }
];

export default function Anniversary6th() {
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);

  useEffect(() => {
    // Fire confetti on load to celebrate
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#fb7185', '#e11d48', '#fef08a']
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#fb7185', '#e11d48', '#fef08a']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  }, []);

  const triggerMonthConfetti = (monthNum: number) => {
    setSelectedMonth(selectedMonth === monthNum ? null : monthNum);
    
    if (selectedMonth !== monthNum) {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#fb7185', '#e11d48', '#fef08a']
      });
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-12 px-4">
      {/* 6th Month Badge Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-rose-500/10 via-amber-500/5 to-rose-500/10 border border-rose-500/20 p-8 md:p-12 shadow-2xl text-center flex flex-col items-center gap-6 backdrop-blur-md"
      >
        {/* Glow Effects */}
        <div className="absolute -top-12 -left-12 w-40 h-40 bg-rose-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Big Celebration Badge */}
        <motion.div
          animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
          className="relative w-28 h-28 flex items-center justify-center bg-gradient-to-tr from-[#e11d48] to-[#fb7185] rounded-full shadow-[0_0_30px_rgba(225,29,72,0.5)] border-2 border-white/20"
        >
          <Heart className="w-16 h-16 text-white/20 absolute fill-current" />
          <span className="text-5xl font-black text-white relative z-10 drop-shadow-md">6</span>
          <span className="text-xs font-bold text-yellow-200 absolute bottom-3 z-10 tracking-widest">AY</span>
        </motion.div>

        <div className="space-y-3">
          <div className="flex items-center justify-center gap-2 text-yellow-300 font-bold text-sm tracking-widest uppercase">
            <Award className="w-4 h-4" />
            <span>Mutlu Dönüm Noktası 🏆</span>
            <Sparkles className="w-4 h-4" />
          </div>
          <h2 className="text-3xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white via-rose-200 to-white">
            6. Ay Dönümümüz Kutlu Olsun! 🍓🎉
          </h2>
        </div>

        <p className="text-rose-100/90 text-lg md:text-xl leading-relaxed max-w-2xl font-light">
          Tam 6 aydır hayatıma renk katıyorsun bebeğimm. Yan yana olamasak da kalplerimizin bir attığı bu yarım yılda, 
          seninle geçen her güne şükrediyorum. Pıttık bebik, güzelliğine kurbaan olduğum... Birlikte nice mutlu aylara! ❤️🍓
        </p>

        {/* Special 6-Month Timeline Card Grid */}
        <div className="w-full mt-6 space-y-4">
          <h3 className="text-white/80 font-bold text-lg text-left border-b border-white/10 pb-2">
            6 Ayın Hikayesi (Kartlara Tıkla! 🍓)
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {monthlyMemories.map((item) => (
              <motion.button
                key={item.month}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => triggerMonthConfetti(item.month)}
                className={`p-4 rounded-2xl border text-center transition-all duration-300 flex flex-col items-center justify-center gap-2 ${
                  selectedMonth === item.month
                    ? 'bg-gradient-to-br from-[#e11d48]/40 to-rose-600/20 border-rose-500 shadow-[0_0_15px_rgba(225,29,72,0.3)]'
                    : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                }`}
              >
                <Calendar className={`w-6 h-6 ${selectedMonth === item.month ? 'text-yellow-300' : 'text-rose-400'}`} />
                <span className="text-white font-bold text-sm">{item.month}. Ay</span>
                <span className="text-white/50 text-xs">Detayı Gör</span>
              </motion.button>
            ))}
          </div>

          {/* Interactive Memory Detail Pop-up inside section */}
          <AnimatePresence mode="wait">
            {selectedMonth !== null && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-6 bg-white/5 border border-rose-500/30 rounded-2xl text-left relative overflow-hidden backdrop-blur-md"
              >
                <div className="absolute top-2 right-2 text-4xl opacity-5 select-none pointer-events-none">🍓</div>
                <h4 className="text-yellow-200 font-bold text-lg mb-2">
                  {monthlyMemories[selectedMonth - 1].title}
                </h4>
                <p className="text-white/95 text-base leading-relaxed">
                  {monthlyMemories[selectedMonth - 1].text}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
