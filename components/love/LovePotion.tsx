'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FlaskConical, Sparkles, Check, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function LovePotion() {
  const [laughs, setLaughs] = useState(50);
  const [trust, setTrust] = useState(50);
  const [sweetness, setSweetness] = useState(50);
  const [clumsiness, setClumsiness] = useState(30);

  const [isBrewing, setIsBrewing] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  useEffect(() => {
    // Inject custom bubble keyframes style
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes potion-bubble {
        0% { transform: translateY(100%) scale(0.8); opacity: 0; }
        50% { opacity: 0.8; }
        100% { transform: translateY(-20px) scale(1.2); opacity: 0; }
      }
      .potion-bubble-particle {
        animation: potion-bubble 2s infinite ease-in;
      }
    `;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, []);

  const handleBrew = () => {
    if (isBrewing) return;
    setIsBrewing(true);
    setResult(null);

    // Dynamic duration of brewing
    setTimeout(() => {
      setIsBrewing(false);
      
      // Determine the result based on the maximum value
      const maxVal = Math.max(laughs, trust, sweetness, clumsiness);
      let desc = '';

      if (maxVal === laughs) {
        desc = 'Bu iksirde kahkahalar tavan yapmış bebeğimm! 😂 Senin o içten, dünyaları aydınlatan gülüşün benim en büyük huzur kaynağım. Gülüşüne, neşene kurbaan olduğum Ecem... Bu iksir her içildiğinde bizi sonsuz neşeye boğacak! 🍓❤️';
      } else if (maxVal === trust) {
        desc = 'Düzce\'den Erzurum\'a uzanan en sarsılmaz sevgi köprüsü: Güvenimiz! 🛡️ Aramızdaki 780 km bile seninle kurduğumuz bu bağlılığın yanında ufacık kalıyor pıttık bebik. Birbirimize olan inancımız bu iksirin en değerli özü olmuş. 🗺️✨';
      } else if (maxVal === sweetness) {
        desc = 'Aşırı dozda çilek kokulu tatlılık ve sevgi içerir! 🍓 Bu karışım kalbimi eriten o tatlı ses tonunun, sıcacık kelimelerinin ve kavuşunca yapacağımız sarılmaların eseri. Şeker komasına girmeye hazırım bebeğimm! 😍🍬';
      } else {
        desc = 'Biraz sakarlık, bolca neşe ve didişme! 🤪 Bizim o komik didişmelerimiz, birbirimize takılmalarımız ve saçmalamalarımız bu aşkı bu kadar eğlenceli ve benzersiz kılıyor. Seninle en saçma şeyleri yapmak bile dünyanın en güzel hissi pıttık bebik! 💖';
      }

      setResult(desc);

      // Trigger magic confetti burst
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#fb7185', '#e11d48', '#fef08a']
      });
    }, 2500);
  };

  // Calculate liquid fill level based on values
  const totalPoints = laughs + trust + sweetness + clumsiness;
  const liquidHeight = Math.min(Math.max((totalPoints / 330) * 100, 20), 85); // clamp height percentage

  return (
    <div className="w-full max-w-4xl mx-auto py-12 px-4">
      {/* Header */}
      <div className="flex flex-col items-center mb-12 text-center">
        <motion.div 
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 2.5 }}
          className="flex items-center justify-center gap-2 mb-4"
        >
          <span className="text-3xl">🧪</span>
          <FlaskConical className="w-8 h-8 text-[#fb7185]" />
          <span className="text-3xl">🍓</span>
        </motion.div>
        <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-rose-200 via-white to-rose-200 mb-2">
          Çilekli Aşk İksiri 🧪🍓
        </h2>
        <p className="text-rose-200/60 text-base max-w-lg">
          Bizim sevgimizin malzemelerini dilediğince karıştır ve çilekli iksirimizin vereceği sihirli mesajı gör pıttık bebik! 💖
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        {/* Left Side: Sliders */}
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6">
          <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-yellow-300 animate-pulse" />
            İksir Malzemeleri Oranı
          </h3>

          {/* Slider 1: Laughs */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-white/80 font-semibold">
              <span>Gülüşler & Kahkahalar 😂</span>
              <span className="text-[#fb7185]">{laughs}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              value={laughs}
              onChange={(e) => setLaughs(parseInt(e.target.value))}
              disabled={isBrewing}
              className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-rose-500 hover:bg-white/20 transition-colors"
            />
          </div>

          {/* Slider 2: Trust */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-white/80 font-semibold">
              <span>Güven & Sadakat 🛡️</span>
              <span className="text-[#fb7185]">{trust}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              value={trust}
              onChange={(e) => setTrust(parseInt(e.target.value))}
              disabled={isBrewing}
              className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-pink-500 hover:bg-white/20 transition-colors"
            />
          </div>

          {/* Slider 3: Sweetness */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-white/80 font-semibold">
              <span>Çilek Kokulu Tatlılık 🍓</span>
              <span className="text-[#fb7185]">{sweetness}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              value={sweetness}
              onChange={(e) => setSweetness(parseInt(e.target.value))}
              disabled={isBrewing}
              className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-rose-400 hover:bg-white/20 transition-colors"
            />
          </div>

          {/* Slider 4: Clumsiness */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-white/80 font-semibold">
              <span>Tatlı Sakarlıklar & Didişmeler 🤪</span>
              <span className="text-[#fb7185]">{clumsiness}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              value={clumsiness}
              onChange={(e) => setClumsiness(parseInt(e.target.value))}
              disabled={isBrewing}
              className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-amber-500 hover:bg-white/20 transition-colors"
            />
          </div>

          {/* Brew Button */}
          <button
            onClick={handleBrew}
            disabled={isBrewing}
            className={`w-full py-4 rounded-xl text-white font-bold text-lg shadow-[0_0_20px_rgba(225,29,72,0.3)] transition-all duration-300 flex items-center justify-center gap-3 select-none ${
              isBrewing
                ? 'opacity-50 cursor-not-allowed bg-rose-600'
                : 'bg-gradient-to-r from-[#fb7185] to-[#e11d48] hover:scale-102 hover:shadow-[0_0_30px_rgba(225,29,72,0.5)] cursor-pointer'
            }`}
          >
            <FlaskConical className={`w-5 h-5 ${isBrewing ? 'animate-spin' : ''}`} />
            <span>{isBrewing ? 'İksir Kaynıyor...' : 'İksiri Karıştır! 🍓'}</span>
          </button>
        </div>

        {/* Right Side: Interactive Flask Beaker Visual & Result */}
        <div className="flex flex-col items-center justify-center min-h-[350px]">
          <div className="relative w-64 h-72 flex items-end justify-center pb-6">
            
            {/* The Beaker/Flask Glass Frame */}
            <div className="absolute inset-0 border-4 border-white/30 rounded-b-[80px] rounded-t-[30px] shadow-[0_15px_30px_rgba(0,0,0,0.4)] overflow-hidden bg-neutral-900/40 border-b-8 z-10 flex items-end">
              
              {/* Beaker Neck Ring */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-4 bg-white/20 rounded-full border border-white/30"></div>
              
              {/* Dynamic Liquid Level */}
              <motion.div
                animate={{
                  height: `${liquidHeight}%`,
                  backgroundImage: isBrewing
                    ? 'linear-gradient(to top, #9f1239, #f43f5e)'
                    : 'linear-gradient(to top, #be123c, #fb7185)',
                }}
                transition={{ duration: 0.6 }}
                className="w-full absolute bottom-0 left-0 bg-rose-500 rounded-b-[70px] shadow-[inset_0_10px_20px_rgba(255,255,255,0.2)] flex items-start justify-center"
              >
                {/* Wavy top surface of liquid */}
                <div className="absolute top-[-8px] w-full h-4 bg-[#fb7185] rounded-full opacity-90 blur-[1px]"></div>

                {/* Bubble Particles inside Flask Liquid */}
                {Array.from({ length: isBrewing ? 12 : 5 }).map((_, i) => (
                  <div
                    key={`bubble-${i}`}
                    className="absolute bottom-2 w-2.5 h-2.5 bg-white/40 rounded-full potion-bubble-particle"
                    style={{
                      left: `${15 + Math.random() * 70}%`,
                      animationDelay: `${Math.random() * 2}s`,
                      animationDuration: `${1.2 + Math.random() * 1.5}s`,
                    }}
                  />
                ))}
              </motion.div>
            </div>
            
            {/* Steam animation above flask mouth when brewing */}
            <AnimatePresence>
              {isBrewing && (
                <motion.div
                  initial={{ opacity: 0, y: 0 }}
                  animate={{ opacity: [0, 0.6, 0], y: [-20, -50], scale: [1, 1.4] }}
                  exit={{ opacity: 0 }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="absolute top-[-30px] w-8 h-8 bg-rose-400/30 rounded-full blur-md z-0"
                />
              )}
            </AnimatePresence>
          </div>

          {/* Result Card */}
          <div className="w-full mt-4 h-40">
            <AnimatePresence mode="wait">
              {result && !isBrewing && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  className="p-5 bg-gradient-to-tr from-white/10 to-white/5 border border-rose-500/20 rounded-2xl text-left relative overflow-hidden backdrop-blur-md"
                >
                  <div className="absolute top-2 right-2 text-4xl opacity-5 select-none pointer-events-none">🍓</div>
                  <div className="flex items-center gap-1.5 text-rose-300 font-bold text-xs uppercase tracking-wider mb-2">
                    <Heart className="w-4 h-4 fill-current text-rose-500" />
                    <span>İksirimizin Mesajı ❤️</span>
                  </div>
                  <p className="text-white/90 text-sm md:text-base leading-relaxed">
                    {result}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
