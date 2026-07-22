"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import confetti from "canvas-confetti";

const REASONS = [
  "G├╝l├╝┼ş├╝n kalbimi eritiyor", "Sar─▒lman d├╝nyan─▒n en g├╝zel hissi", "Her mesaj─▒n g├╝n├╝m├╝ ayd─▒nlat─▒yor", "G├Âzlerin beni b├╝y├╝l├╝yor", "Sesin kulaklar─▒mda m├╝zik gibi",
  "Dokunu┼şun her ┼şeyi g├╝zelle┼ştiriyor", "Yan─▒ndayken zaman─▒n nas─▒l ge├ğti─şini anlam─▒yorum", "Kokuun beni sarho┼ş ediyor", "Benimle payla┼şt─▒─ş─▒n her an ├ğok de─şerli", "Seni d├╝┼ş├╝n├╝nce g├╝l├╝ms├╝yorum",
  "Kalbim sadece senin i├ğin at─▒yor", "Hayallerimizin ortak olmas─▒", "Birlikte g├╝lmek her ┼şeye de─şer", "Sana her bakt─▒─ş─▒mda a┼ş─▒k oluyorum", "Ellerini tutmak huzur veriyor",
  "Yan─▒nda olmak evde olmak gibi", "Sa├ğlar─▒n─▒ ok┼şamak en sevdi─şim ┼şey", "Birlikte uyumak d├╝nyan─▒n en g├╝zel hissi", "Sabah ilk seni d├╝┼ş├╝n├╝yorum", "Gece son d├╝┼ş├╝ncem sen oluyorsun",
  "Beni oldu─şum gibi seviyorsun", "Her kavgam─▒z bizi g├╝├ğlendiriyor", "Birlikte yemek yapmak ├ğok e─şlenceli", "Film izlerken sar─▒lman", "Beni g├╝ld├╝ren esprilerin",
  "Her zaman yan─▒mda olman", "K├Ât├╝ g├╝nlerimde beni teselli etmen", "Ba┼şar─▒lar─▒mla gurur duyman", "Bana inanman ve g├╝venmen", "K├╝├ğ├╝k s├╝rprizlerin",
  "Birlikte m├╝zik dinlemek", "Seninle dans etmek", "Birlikte y├╝r├╝y├╝┼ş yapmak", "G├╝n bat─▒m─▒ izlemek seninle", "Birlikte hayal kurmak",
  "Seninle seyahat planlar─▒ yapmak", "Birlikte kahve i├ğmek", "Bana ┼şark─▒ s├Âylemen", "Foto─şraflar─▒m─▒z", "Birlikte g├╝l├╝msedi─şimiz anlar",
  "Seninle tart─▒┼ş─▒p bar─▒┼şmak", "─░lk bulu┼şmam─▒z─▒ hat─▒rlamak", "Seni g├Ârd├╝─ş├╝mde kalbimin h─▒zlanmas─▒", "Mesajla┼ş─▒rken saatlerin u├ğmas─▒", "Video aramalar─▒m─▒z",
  "Birbirimize olan sadakatimiz", "Seni her g├╝n daha ├ğok sevmem", "Gelece─şimiz i├ğin birlikte ├ğal─▒┼şmam─▒z", "Birlikte b├╝y├╝memiz", "Her zorlu─şun ├╝stesinden gelmemiz",
  "Sana sar─▒l─▒nca her ┼şeyin d├╝zelmesi", "G├╝l├╝┼ş├╝n├╝n bula┼ş─▒c─▒ olmas─▒", "Bana sab─▒rl─▒ olman", "Beni dinlemen", "Fikirlerime de─şer vermen",
  "Her konuda d├╝r├╝st olman", "Bana g├╝ven vermen", "Sevgin ko┼şulsuz olmas─▒", "Bana ilham vermen", "Daha iyi biri olmam─▒ sa─şlaman",
  "Seninle olan her an─▒n ├Âzel olmas─▒", "G├Âzlerindeki sevgiyi g├Ârmek", "Bana yazd─▒─ş─▒n mesajlar", "Birlikte ├ğay i├ğmek", "K─▒┼ş g├╝nlerinde battaniyeye sar─▒lmak",
  "Birlikte ya─şmur izlemek", "Seninle sessizli─şin bile g├╝zel olmas─▒", "Birbirimizi tamamlamam─▒z", "Ayn─▒ ┼şeylere g├╝lmemiz", "Birbirimizin en iyi arkada┼ş─▒ olmam─▒z",
  "Seni her g├Ârd├╝─ş├╝mde mutlu olmam", "Ayr─▒yken bile yak─▒n hissetmem", "Seninle payla┼ş─▒lan bir g├╝l├╝mseme", "Birlikte b├╝y├╝k hayaller kurmak", "K├╝├ğ├╝k anlara bile anlam katman",
  "Her sabah g├╝nayd─▒n mesaj─▒n", "Her gece iyi geceler demen", "Seninle ├ğ─▒kt─▒─ş─▒m─▒z yolculuklar", "Beraber ke┼şfetti─şimiz yerler", "─░lk el ele tutu┼şmam─▒z",
  "─░lk ├Âp├╝c├╝─ş├╝m├╝z", "Sana bakt─▒─ş─▒mda g├Ârd├╝─ş├╝m gelecek", "Birlikte ya┼şlanma hayalim", "Seninle kuraca─ş─▒m─▒z yuva", "Her g├╝n seni se├ğmem",
  "Sen oldu─şun i├ğin", "Kalbimin tek sahibi olman", "Bana verdi─şin huzur", "Seninle ge├ğen her saniye", "G├╝l├╝┼ş├╝n├╝n sesini duymak",
  "Birlikte a─şlamak bile g├╝zel", "Beni en ├ğok sen anl─▒yorsun", "Hayat─▒m─▒n anlam─▒ olman", "Seni sevmenin kolay olmas─▒", "Her bak─▒┼ş─▒nda eriyorum",
  "R├╝yalar─▒ma girmen", "Seninle olan gelecek planlar─▒m─▒z", "Beni tamamlaman", "Her ┼şeye ra─şmen birbirimizi se├ğmemiz", "Sen, sadece sen oldu─şun i├ğin seni seviyorum ÔØñ´©Å"
];

export default function Reasons100() {
  const [flippedCards, setFlippedCards] = useState<boolean[]>(new Array(100).fill(false));
  const [showCelebration, setShowCelebration] = useState(false);

  const flippedCount = flippedCards.filter(Boolean).length;

  useEffect(() => {
    if (flippedCount === 100 && !showCelebration) {
      setShowCelebration(true);
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#e11d48", "#fb7185", "#fef08a", "#ffffff"]
      });
    }
  }, [flippedCount, showCelebration]);

  const toggleCard = (index: number) => {
    const newFlipped = [...flippedCards];
    newFlipped[index] = !newFlipped[index];
    setFlippedCards(newFlipped);
  };

  const revealAll = () => {
    setFlippedCards(new Array(100).fill(true));
  };

  return (
    <section className="min-h-screen bg-[#0a0c10] py-20 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Heart className="w-8 h-8" style={{ color: "#e11d48", fill: "#e11d48" }} />
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">Seni Sevmemin 100 Sebebi ÔØñ´©Å</h2>
          </div>
          
          <div className="max-w-md mx-auto bg-white/5 p-4 rounded-2xl border border-rose-900/30 backdrop-blur-sm">
            <div className="flex justify-between items-center mb-2">
              <span className="text-rose-200 font-medium">{flippedCount} / 100 Sebep A├ğ─▒ld─▒</span>
              <button
                onClick={revealAll}
                className="text-xs px-3 py-1 bg-rose-500/20 hover:bg-rose-500/40 text-rose-100 rounded-full transition-colors border border-rose-500/30"
              >
                T├╝m├╝n├╝ A├ğ
              </button>
            </div>
            <div className="h-3 bg-black/50 rounded-full overflow-hidden">
              <motion.div 
                className="h-full rounded-full"
                style={{ backgroundImage: "linear-gradient(to right, #fb7185, #e11d48)" }}
                initial={{ width: 0 }}
                animate={{ width: `${(flippedCount / 100) * 100}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {REASONS.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: (index % 10) * 0.05 }}
              className="relative h-40 group cursor-pointer"
              style={{ perspective: "1000px" }}
              onClick={() => toggleCard(index)}
            >
              <div
                className="w-full h-full relative transition-transform duration-700 hover:shadow-[0_0_15px_rgba(251,113,133,0.3)] rounded-xl"
                style={{
                  transformStyle: "preserve-3d",
                  transform: flippedCards[index] ? "rotateY(180deg)" : "rotateY(0deg)"
                }}
              >
                {/* Front side */}
                <div 
                  className="absolute inset-0 w-full h-full bg-white/5 border border-rose-900/40 rounded-xl flex flex-col items-center justify-center p-4 backdrop-blur-sm"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <Heart className="w-8 h-8 text-rose-400/50 mb-2" />
                  <span className="text-2xl font-bold text-rose-200/70">#{index + 1}</span>
                </div>

                {/* Back side */}
                <div 
                  className={`absolute inset-0 w-full h-full flex flex-col items-center justify-center p-4 rounded-xl backdrop-blur-sm text-center shadow-lg ${index === 99 ? 'bg-gradient-to-br from-rose-900/80 to-[#e11d48] border-2 border-[#fef08a]' : 'bg-gradient-to-br from-[#1a0a0a] to-[#0d0515] border border-rose-500/50'}`}
                  style={{ 
                    backfaceVisibility: "hidden", 
                    transform: "rotateY(180deg)",
                  }}
                >
                  <p className={`text-rose-100 ${index === 99 ? 'font-bold text-lg text-[#fef08a]' : 'text-sm font-medium'}`}>
                    {reason}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {showCelebration && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowCelebration(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-gradient-to-b from-[#1a0a0a] to-[#0d0515] p-8 md:p-12 rounded-3xl border border-[#fef08a]/50 shadow-[0_0_50px_rgba(254,240,138,0.2)] max-w-2xl text-center relative overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#fef08a] to-transparent" />
              <Heart className="w-16 h-16 mx-auto mb-6" style={{ color: "#e11d48", fill: "#e11d48" }} />
              <h3 className="text-3xl md:text-5xl font-bold text-white mb-4">100 sebep bile yetmez seni sevmeye... ÔØñ´©Å</h3>
              <p className="text-xl md:text-2xl text-rose-200 font-serif italic">Sen benim her ┼şeyimsin.</p>
              
              <button 
                onClick={() => setShowCelebration(false)}
                className="mt-8 px-8 py-3 bg-rose-600 hover:bg-rose-500 text-white rounded-full font-medium transition-colors"
              >
                Kapat
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
