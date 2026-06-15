import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Terminal, ArrowRight, Github, Linkedin, Award, Cloud, FileCode, Check } from 'lucide-react';
import { personalInfo } from '../data';
const harshitaAvatar = 'https://files.catbox.moe/okia8r.jpeg';

interface HeroProps {
  onProjectsClick: () => void;
  onContactClick: () => void;
}

export default function Hero({ onProjectsClick, onContactClick }: HeroProps) {
  const [typingIndex, setTypingIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [printSuccess, setPrintSuccess] = useState(false);

  const roles = personalInfo.typingRoles;

  // Typing animation effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentFullText = roles[typingIndex];
    
    const tick = () => {
      if (!isDeleting) {
        setDisplayText((prev) => currentFullText.substring(0, prev.length + 1));
        if (displayText === currentFullText) {
          timer = setTimeout(() => setIsDeleting(true), 2000); // Wait on complete
        } else {
          timer = setTimeout(tick, 100); // Speed typing
        }
      } else {
        setDisplayText((prev) => currentFullText.substring(0, prev.length - 1));
        if (displayText === '') {
          setIsDeleting(false);
          setTypingIndex((prev) => (prev + 1) % roles.length);
          timer = setTimeout(tick, 500); // Paused before restart
        } else {
          timer = setTimeout(tick, 40); // Fast delete
        }
      }
    };

    timer = setTimeout(tick, isDeleting ? 40 : 100);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, typingIndex, roles]);

  const handlePrintResume = () => {
    setPrintSuccess(true);
    setTimeout(() => {
      setPrintSuccess(false);
      window.print();
    }, 1200);
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-6 md:px-12 overflow-hidden bg-[#050508]"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center z-10">
        
        {/* Left Side: Harshita's Introduction as a Bento Block */}
        <div className="lg:col-span-7 flex flex-col text-left space-y-6 bg-white/[0.02] border border-white/10 rounded-3xl p-8 md:p-10 relative overflow-hidden backdrop-blur-md">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-purple/5 blur-[80px] rounded-full -mr-20 -mt-20 pointer-events-none"></div>
          
          {/* Top Pill Greeting */}
          <motion.div
            className="inline-flex items-center gap-1.5 self-start px-3.5 py-1.5 rounded-full bg-brand-purple/10 border border-brand-purple/20 text-purple-400 text-xs font-mono tracking-tight"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Sparkles className="w-3.5 h-3.5 animate-pulse text-brand-purple" />
            <span>AI & ML ENGINEERING STUDENT</span>
          </motion.div>
 
          {/* Main Name Heading with Gradient Text */}
          <div className="space-y-2">
            <motion.p
              className="text-gray-500 font-mono tracking-widest text-[10px] uppercase"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              // HELLO WORLD, I AM
            </motion.p>
            
            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter text-white leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Harshita <br/>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-purple to-brand-blue">
                Vasupalli.
              </span>
            </motion.h1>
 
            {/* Dynamic Typing Title */}
            <motion.div
              className="flex items-center gap-2.5 h-10 md:h-12 mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Terminal className="w-5 h-5 md:w-6 md:h-6 text-brand-blue" />
              <div className="text-lg md:text-2xl font-bold font-mono tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-brand-purple via-pink-400 to-brand-blue">
                {displayText}
                <span className="w-1.5 h-5 bg-brand-blue ml-1 inline-block animate-pulse align-middle" />
              </div>
            </motion.div>
          </div>
 
          {/* Core Tagline Bio */}
          <motion.p
            className="text-white/60 text-sm md:text-base max-w-xl leading-relaxed font-sans"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {personalInfo.tagline}
          </motion.p>
 
          {/* Social Platforms Quick Links */}
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 bg-white/5 hover:bg-brand-purple/20 border border-white/10 hover:border-brand-purple/50 rounded-xl text-gray-400 hover:text-white transition-all transform hover:-translate-y-1 clickable-card"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 bg-white/5 hover:bg-brand-blue/20 border border-white/10 hover:border-brand-blue/50 rounded-xl text-gray-400 hover:text-white transition-all transform hover:-translate-y-1 clickable-card"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              className="font-mono text-[10px] text-gray-400 hover:text-brand-purple px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl hover:border-brand-purple/50 transition-colors clickable-card"
            >
              {personalInfo.email}
            </a>
          </motion.div>
 
          {/* Action CTAs Buttons with Bento contrast */}
          <motion.div
            className="flex flex-wrap items-center gap-3.5 pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <button
              onClick={onProjectsClick}
              className="px-6 py-2.5 bg-white hover:bg-white/95 text-black rounded-xl text-xs font-semibold shadow-xl flex items-center gap-2 transform transition-all hover:-translate-y-0.5 cursor-pointer"
            >
              View Projects
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
 
            <button
              onClick={handlePrintResume}
              className={`px-6 py-2.5 rounded-xl text-xs font-semibold border transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                printSuccess
                  ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400'
                  : 'bg-white/5 hover:bg-white/10 border-white/10 text-white hover:border-white/20'
              }`}
            >
              {printSuccess ? (
                <>
                  <Check className="w-3.5 h-3.5 animate-bounce text-emerald-400" />
                  Printing PDF Setup...
                </>
              ) : (
                <>
                  <FileCode className="w-3.5 h-3.5 text-purple-400" />
                  Print Resume
                </>
              )}
            </button>
 
            <button
              onClick={onContactClick}
              className="px-6 py-2.5 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 rounded-xl text-xs font-semibold transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              Contact Me
            </button>
          </motion.div>
        </div>
 
        {/* Right Side: Futuristic Tech Profile Visualizer in a Bento container */}
        <div className="lg:col-span-5 h-[500px] relative flex items-center justify-center bg-white/[0.01] border border-white/10 rounded-3xl p-6 overflow-hidden">
          
          {/* Background Ambient Ring Glow */}
          <div className="absolute w-80 h-80 rounded-full bg-brand-purple/20 blur-[85px] animate-pulse pointer-events-none" />
          <div className="absolute w-64 h-64 rounded-full bg-brand-blue/15 blur-[75px] animate-pulse delay-500 pointer-events-none" />
 
          {/* High-Tech Radar Target Frame */}
          <motion.div
            className="relative w-80 h-80 md:w-96 md:h-96 flex items-center justify-center p-6 border border-dashed border-white/10 rounded-full"
            initial={{ opacity: 0, scale: 0.8, rotate: -45 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          >
            {/* Spinning Radar Circle */}
            <div className="absolute inset-0 rounded-full border border-brand-purple/10 animate-spin" style={{ animationDuration: '25s' }} />
            <div className="absolute inset-2 rounded-full border border-brand-blue/10 animate-spin" style={{ animationDuration: '40s', animationDirection: 'reverse' }} />
 
            {/* Corner Bracket accents representing professional engineering layout */}
            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-brand-purple" />
            <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-brand-purple" />
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-brand-blue" />
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-brand-blue" />
 
            {/* Simulated AI Grid Inner Frame */}
            <div className="relative w-full h-full bg-[#0a0a0f] border border-white/10 rounded-full overflow-hidden flex items-center justify-center flex-col text-center shadow-[inset_0_0_20px_rgba(255,255,255,0.05)]">
              {/* Decorative Sine wave and binary grids */}
              <div className="absolute top-8 text-[7px] font-mono text-purple-400/40 select-none tracking-widest max-w-[80%] leading-normal p-2 overflow-hidden truncate">
                010100101011100101 ML_TARGET_SET_01002
              </div>
 
              {/* Glowing vector profile shape or premium visual avatar */}
              <div className="relative w-56 h-56 md:w-64 md:h-64 rounded-full bg-gradient-to-tr from-brand-purple/30 via-brand-blue/20 to-purple-800/40 flex items-center justify-center border-2 border-white/30 p-1.5 shadow-[0_0_40px_rgba(139,92,246,0.3)] overflow-hidden">
                {/* Real High-Quality Photo of Harshita Vasupalli */}
                <img 
                  src={harshitaAvatar} 
                  alt="Harshita Vasupalli Professional Portrait" 
                  className="w-full h-full object-cover rounded-full"
                  referrerPolicy="no-referrer"
                />
                {/* Floating overlay scan lines */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-blue/15 to-transparent h-1/2 w-full top-0 animate-bounce" style={{ animationDuration: '3.5s' }} />
              </div>
 
              <span className="mt-3 font-mono text-purple-300 font-bold tracking-widest text-[11px] uppercase">
                HARSHITA_VASUPALLI
              </span>
              <span className="text-[9px] text-gray-400 font-mono tracking-wider">
                Visakhapatnam AP, IN
              </span>
            </div>
          </motion.div>
 
          {/* Floating Technology nodes revolving around */}
          {/* Node 1: Python */}
          <motion.div
            className="absolute top-6 left-12 p-2.5 bg-[#0a0a0f] border border-brand-purple/20 rounded-xl flex items-center gap-1.5 shadow-md clickable-card"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
            <span className="text-[10px] font-mono text-white font-medium">Python</span>
          </motion.div>
 
          {/* Node 2: AWS */}
          <motion.div
            className="absolute top-1/2 -right-4 p-2.5 bg-[#0a0a0f] border border-brand-blue/20 rounded-xl flex items-center gap-1.5 shadow-md clickable-card"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          >
            <Cloud className="w-3.5 h-3.5 text-sky-400" />
            <span className="text-[10px] font-mono text-white font-medium">AWS</span>
          </motion.div>
 
          {/* Node 3: ML Stats */}
          <motion.div
            className="absolute bottom-6 left-6 p-2.5 bg-[#0a0a0f] border border-indigo-400/20 rounded-xl flex items-center gap-1.5 shadow-md clickable-card"
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          >
            <Award className="w-3.5 h-3.5 text-purple-400" />
            <span className="text-[10px] font-mono text-white font-medium">8.31 CGPA</span>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll indicator chevron */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-1 cursor-pointer" onClick={onProjectsClick}>
        <span className="text-[9px] font-mono tracking-widest text-gray-500 uppercase">Scroll Explore</span>
        <motion.div
          className="w-1.5 h-6 rounded-full border border-white/20 p-0.5 flex justify-center"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="w-0.5 h-1.5 bg-brand-purple rounded-full" />
        </motion.div>
      </div>
    </section>
  );
}
