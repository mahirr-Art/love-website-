'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Compass, Sparkles, Send } from 'lucide-react';

const missingQuotes = [
  {
    id: 1,
    title: 'Mesafeler Üzerine... 🗺️',
    text: 'Aramızdaki kilometreler ne kadar çok olursa olsun, kalbim her saniye senin yanında atıyor bebeğimm. Düzce\'den Erzurum\'a uzanan bu yollarda, sevgimiz tüm mesafeleri eritiyor. ❤️🍓',
  },
  {
    id: 2,
    title: 'Sarılamamak... 💑',
    text: 'Her gün sesini duymak yetmiyor artık pıttık bebik. Kokunu içime çekerek, sana doyasıya sarılacağım o anı ve zamanı iple çekiyorum.',
  },
  {
    id: 3,
    title: 'Her Halinle Aklımdasın... 💭',
    text: 'Gözlerimi kapattığımda o güzel gülüşün, açtığımda ise sadece senin hayalin var karşımda. Güzelliğine kurbaan olduğum, seni düşünmediğim tek bir saniyem bile yok.',
  },
  {
    id: 4,
    title: 'Kalp Kalbe... 💞',
    text: 'Mesafeler sadece yollar içindir, kalplerimiz birbirine her zaman bir nefes kadar yakın. Seni çok ama çok özledim, her şeyim... 🍓',
  }
];

export default function MissYou() {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  return (
    <div className="w-full max-w-4xl mx-auto py-12 px-4">
      {/* Header */}
      <div className="flex flex-col items-center mb-12 text-center">
        <motion.div 
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex items-center justify-center gap-2 mb-4"
        >
          <span className="text-3xl">🍓</span>
          <Heart className="w-8 h-8 text-[#e11d48] fill-current" />
          <span className="text-3xl">🍓</span>
        </motion.div>
        <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-rose-200 via-white to-rose-200 mb-4">
          Seni Çok Özledim... ❤️
        </h2>
        <p className="text-rose-200/70 text-lg max-w-lg">
          Düzce ile Erzurum arasındaki tüm yolları sevgimizle dolduralım. Sana olan özlemimi fısıldayan küçük kelimeler... ✨
        </p>
      </div>

      {/* Main Big Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl mb-10 relative overflow-hidden text-center flex flex-col items-center gap-6"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#e11d48]/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#fef08a]/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <span className="text-4xl animate-bounce">💌</span>
        
        <h3 className="text-2xl md:text-3xl font-bold text-[#fb7185] tracking-wide" style={{ fontFamily: "'Dancing Script', cursive" }}>
          "Seni Çok Ama Çok Özledim Bebeğimm"
        </h3>
        
        <p className="text-white/90 text-lg md:text-xl leading-relaxed max-w-2xl font-light">
          Yanında olamadığım her an içimde kocaman bir özlem büyüyor. Kokunu, sıcaklığını, elini tutmayı, gözlerinin içine bakıp kaybolmayı öyle çok özledim ki... 
          Sen benim başıma gelen en güzel şeysin pıttık bebik, güzelliğine kurbaan olduğum. 🍓❤️
        </p>
        
        <div className="flex gap-2 text-rose-400 font-medium text-sm items-center mt-2">
          <Compass className="w-4 h-4 animate-spin-slow" />
          <span>Düzce ➔ Erzurum (780 km)</span>
          <Heart className="w-3 h-3 fill-current text-[#e11d48]" />
        </div>
      </motion.div>

      {/* Interactive Longing Quote Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {missingQuotes.map((quote) => (
          <motion.div
            key={quote.id}
            whileHover={{ scale: 1.02 }}
            onClick={() => setActiveCard(activeCard === quote.id ? null : quote.id)}
            className="cursor-pointer backdrop-blur-md bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-6 transition-all duration-300 relative overflow-hidden group"
          >
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-lg font-bold text-white group-hover:text-[#fb7185] transition-colors">
                {quote.title}
              </h4>
              <Sparkles className="w-4 h-4 text-[#fef08a] opacity-60 group-hover:opacity-100 transition-opacity" />
            </div>
            
            <p className="text-white/70 text-sm leading-relaxed">
              {quote.text}
            </p>

            {/* Subtle background decoration */}
            <div className="absolute right-2 bottom-2 text-3xl opacity-5 group-hover:opacity-20 transition-opacity pointer-events-none select-none">
              🍓
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
