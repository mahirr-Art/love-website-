'use client';

import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, Volume1, VolumeX, Repeat, Music } from 'lucide-react';

export interface AudioPlayerRef {
  play: () => void;
  pause: () => void;
}

const AudioPlayer = forwardRef<AudioPlayerRef, {}>((props, ref) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isLooping, setIsLooping] = useState(true);
  const [showControls, setShowControls] = useState(false);
  const [showAutoplayHelper, setShowAutoplayHelper] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Try to auto-play after 1.5 seconds when main content loads
    const timer = setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch((err) => {
            console.log('Autoplay blocked by browser policy:', err);
            setShowAutoplayHelper(true);
          });
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes eq-bar-1 {
        0%, 100% { height: 3px; }
        50% { height: 14px; }
      }
      @keyframes eq-bar-2 {
        0%, 100% { height: 6px; }
        50% { height: 18px; }
      }
      @keyframes eq-bar-3 {
        0%, 100% { height: 4px; }
        50% { height: 11px; }
      }
      .eq-bar {
        width: 3px;
        background-color: #fef08a;
        border-radius: 1px;
        opacity: 0.8;
      }
      .eq-bar-1 { animation: eq-bar-1 0.8s ease-in-out infinite; }
      .eq-bar-2 { animation: eq-bar-2 1.1s ease-in-out infinite; }
      .eq-bar-3 { animation: eq-bar-3 0.9s ease-in-out infinite; }
    `;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, []);

  useImperativeHandle(ref, () => ({
    play: () => {
      if (audioRef.current) {
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch((e) => {
            console.log('Autoplay blocked', e);
            setShowAutoplayHelper(true);
          });
      }
    },
    pause: () => {
      if (audioRef.current) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    },
  }));

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.loop = isLooping;
    }
  }, [volume, isLooping]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch((e) => console.log('Playback failed', e));
        setShowAutoplayHelper(false);
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(e.target.value));
  };

  const VolumeIcon = volume === 0 ? VolumeX : volume < 0.5 ? Volume1 : Volume2;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-end justify-end">
      <audio
        ref={audioRef}
        src="/audio/love-song.mp3"
        onEnded={() => {
          if (!isLooping) setIsPlaying(false);
        }}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="backdrop-blur-xl bg-white/10 border border-white/10 rounded-2xl p-4 shadow-2xl flex flex-col gap-4 w-72 mb-16 origin-bottom-right absolute bottom-0 right-0"
          >
            <div className="flex items-center justify-between">
              <div className="overflow-hidden whitespace-nowrap w-48 relative flex items-center">
                <motion.div
                  animate={{ x: [0, -60, 0] }}
                  transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
                  className="inline-block text-white font-medium text-sm drop-shadow-md"
                >
                  Neden Bu Kadar Güzelsin - Skapova 🎵
                </motion.div>
              </div>
              <button
                onClick={() => setShowControls(false)}
                className="text-white/40 hover:text-[#fb7185] transition-colors text-xs font-semibold px-2 py-1 rounded hover:bg-white/5"
              >
                Gizle
              </button>
            </div>

            <div className="flex items-center justify-between bg-[#0a0c10]/40 rounded-xl p-3 border border-white/5">
              <button
                onClick={togglePlay}
                className="w-12 h-12 rounded-full bg-gradient-to-br from-[#e11d48] to-[#fb7185] flex items-center justify-center text-white hover:scale-105 transition-transform shadow-[0_0_15px_rgba(225,29,72,0.4)] flex-shrink-0"
              >
                {isPlaying ? (
                  <Pause size={20} className="fill-current" />
                ) : (
                  <Play size={20} className="fill-current ml-1" />
                )}
              </button>

              <div className="flex items-center gap-3 group flex-1 ml-4 mr-2">
                <VolumeIcon size={16} className="text-[#fef08a]/80" />
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#fb7185] hover:bg-white/20 transition-colors"
                />
              </div>

              <button
                onClick={() => setIsLooping(!isLooping)}
                className={`p-2 rounded-full transition-all duration-300 flex-shrink-0 ${
                  isLooping
                    ? 'text-[#fef08a] bg-white/10 shadow-[0_0_10px_rgba(254,240,138,0.2)]'
                    : 'text-white/40 hover:text-white hover:bg-white/5'
                }`}
              >
                <Repeat size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showAutoplayHelper && !isPlaying && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.9 }}
            className="absolute bottom-20 right-0 bg-[#e11d48] text-white p-4 rounded-2xl shadow-2xl w-64 border border-rose-400/40 text-xs font-semibold text-center select-none cursor-pointer z-50 hover:bg-[#be123c] transition-colors"
            onClick={() => {
              togglePlay();
            }}
          >
            Ecem bebeğimm, eğer müzik otomatik başlamadıysa buraya dokunup başlatabilirsin! 🎵🍓❤️
            <div className="absolute bottom-[-6px] right-6 w-3 h-3 bg-[#e11d48] transform rotate-45 border-r border-b border-rose-400/40"></div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        layout
        onClick={() => setShowControls(!showControls)}
        className="w-14 h-14 rounded-full backdrop-blur-xl bg-white/10 border border-white/20 flex items-center justify-center text-white shadow-[0_8px_30px_rgb(0,0,0,0.3)] hover:bg-white/20 transition-colors z-10 relative group"
      >
        <div className="relative flex items-center justify-center">
          <motion.div
            animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
            transition={{ repeat: Infinity, duration: 6, ease: 'linear' }}
            className="flex items-center justify-center"
          >
            <Music
              size={24}
              className={`transition-colors duration-300 ${
                isPlaying ? 'opacity-20' : 'text-white/80 group-hover:text-white'
              }`}
            />
          </motion.div>

          {/* Equalizer animation bars overlay */}
          {isPlaying && (
            <div className="flex gap-[3px] items-end h-[18px] absolute pointer-events-none z-20">
              <span className="eq-bar eq-bar-1"></span>
              <span className="eq-bar eq-bar-2"></span>
              <span className="eq-bar eq-bar-3"></span>
            </div>
          )}

          {isPlaying && (
            <motion.div
              animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute inset-[-12px] rounded-full border border-[#fef08a]/40"
            />
          )}
        </div>
      </motion.button>
    </div>
  );
});

AudioPlayer.displayName = 'AudioPlayer';

export default AudioPlayer;
