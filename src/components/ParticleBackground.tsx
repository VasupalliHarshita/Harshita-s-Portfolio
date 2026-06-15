import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
}

export default function ParticleBackground() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate stable random items on mount to avoid server-hydration issues
    const generated: Particle[] = Array.from({ length: 25 }).map((_, i) => {
      const colors = [
        'bg-brand-purple/20 shadow-brand-purple/30',
        'bg-brand-blue/20 shadow-brand-blue/30',
        'bg-purple-400/15 shadow-purple-400/20',
        'bg-indigo-500/20 shadow-indigo-500/20'
      ];
      return {
        id: i,
        x: Math.random() * 100, // percentage
        y: Math.random() * 100, // percentage
        size: Math.random() * 4 + 2, // 2px to 6px
        duration: Math.random() * 15 + 15, // 15s to 30s
        delay: Math.random() * -15, // standard staggered start
        color: colors[Math.floor(Math.random() * colors.length)]
      };
    });
    setParticles(generated);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 bg-[#02000e]">
      {/* Decorative large ambient lights (glowing spheres) */}
      <div className="absolute top-[10%] left-[-10%] w-[35vw] h-[35vw] rounded-full bg-brand-purple/10 blur-[120px] mix-blend-screen animate-float-1" />
      <div className="absolute bottom-[10%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-brand-blue/10 blur-[130px] mix-blend-screen animate-float-2" />
      <div className="absolute top-[45%] left-[40%] w-[30vw] h-[30vw] rounded-full bg-purple-500/5 blur-[100px] mix-blend-screen animate-float-3" />

      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60" />

      {/* Grid fade masks for top, bottom, and side smooth blend */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#02000e] via-transparent to-[#02000e] opacity-[0.98]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#02000e] via-transparent to-[#02000e] opacity-[0.9]" />

      {/* Floating particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className={`absolute rounded-full shadow-lg ${p.color}`}
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            left: `${p.x}%`,
            top: `${p.y}%`,
          }}
          animate={{
            y: ['0px', '-120px', '0px'],
            x: ['0px', '40px', '0px'],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
