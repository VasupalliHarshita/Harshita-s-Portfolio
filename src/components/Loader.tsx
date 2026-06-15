import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Progress interval
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setVisible(false);
            // call onComplete shortly after fading starts
            setTimeout(onComplete, 600);
          }, 300);
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 120);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          id="loader-screen"
          className="fixed inset-0 bg-[#050508] z-[99999] flex flex-col items-center justify-center text-white"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: 'easeInOut' } }}
        >
          {/* Ambient light glow behind the logo */}
          <div className="absolute w-[300px] h-[300px] bg-brand-purple/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute w-[200px] h-[200px] bg-brand-blue/15 rounded-full blur-[80px] pointer-events-none translate-x-[50px] translate-y-[-50px]" />

          <div className="flex flex-col items-center max-w-sm w-full px-6 z-10 text-center">
            {/* Spinning & Breathing custom geometric glyph */}
            <motion.div
              className="relative w-16 h-16 flex items-center justify-center mb-8"
              initial={{ scale: 0.8, rotate: 0 }}
              animate={{ scale: [0.8, 1.1, 1], rotate: 360 }}
              transition={{ duration: 1.8, ease: 'easeInOut' }}
            >
              {/* Outer double glowing spinning rings */}
              <div className="absolute inset-0 rounded-xl border border-brand-purple/40 animate-spin" style={{ animationDuration: '4s' }} />
              <div className="absolute inset-1.5 rounded-xl border border-brand-blue/30 animate-spin" style={{ animationDuration: '6s', animationDirection: 'reverse' }} />
              
              {/* Inner Monogram */}
              <span className="text-xl font-bold tracking-widest text-[#f3f4f6] text-glow-purple">
                HV
              </span>
            </motion.div>

            {/* Title / Name text */}
            <motion.h1 
              className="text-2xl font-bold tracking-[0.25em] text-white uppercase mb-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              HARSHITA VASUPALLI
            </motion.h1>

            <motion.p 
              className="text-xs font-mono text-purple-400 tracking-widest uppercase mb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              PORTFOLIO INITIALIZING
            </motion.p>

            {/* Modern micro-progress bar */}
            <div className="w-full h-[3px] bg-white/5 rounded-full overflow-hidden relative mb-3">
              <motion.div 
                className="h-full bg-gradient-to-r from-brand-blue via-brand-purple to-purple-400"
                style={{ width: `${Math.min(progress, 100)}%` }}
                initial={{ width: '0%' }}
                animate={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>

            {/* Percentage count & status log */}
            <div className="flex justify-between w-full text-[10px] font-mono text-gray-400">
              <span className="animate-pulse">
                {progress < 40 
                  ? 'LOADING REQS...' 
                  : progress < 75 
                  ? 'PARSING RESUME...' 
                  : progress < 95 
                  ? 'COMPILING PROJECTS...' 
                  : 'READY'}
              </span>
              <span>{Math.min(progress, 100)}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
