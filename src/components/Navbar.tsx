import { useState, useEffect, MouseEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Rocket, Sparkles, Flame, Sun, Moon } from 'lucide-react';
import { personalInfo } from '../data';

interface NavbarProps {
  activeSection: string;
  isAmbientGlow: boolean;
  toggleAmbientGlow: () => void;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

export default function Navbar({ activeSection, isAmbientGlow, toggleAmbientGlow, theme, toggleTheme }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  // Monitor Scroll state to add background blur/border effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', href: '#home', id: 'home' },
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Education', href: '#education', id: 'education' },
    { label: 'Skills', href: '#skills', id: 'skills' },
    { label: 'Internships', href: '#internships', id: 'internships' },
    { label: 'Projects', href: '#projects', id: 'projects' },
    { label: 'Certifications', href: '#certifications', id: 'certifications' },
    { label: 'GitHub', href: '#github-showcase', id: 'github-showcase' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetElement = document.querySelector(href);
    if (targetElement) {
      const offset = window.innerWidth < 1024 ? 140 : 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <motion.header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#050508]/80 backdrop-blur-md border-b border-white/5 py-2.5 md:py-3 shadow-[0_4px_30px_rgba(0,0,0,0.4)]'
          : 'bg-transparent py-4 md:py-5 border-b border-transparent'
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-12 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 md:gap-4">
        
        {/* Logo & Controls */}
        <div className="flex items-center justify-between w-full lg:w-auto">
          {/* Logo / Monogram */}
          <a 
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="flex items-center gap-2 md:gap-2.5 group clickable-card"
          >
            <div className="relative w-8 h-8 md:w-9 h-9 rounded-lg bg-gradient-to-tr from-brand-purple to-brand-blue flex items-center justify-center text-white font-extrabold text-xs md:text-sm shadow-[0_0_12px_rgba(139,92,246,0.3)] group-hover:scale-105 transition-transform shrink-0">
              HV
              <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-tr from-brand-purple to-brand-blue blur-sm opacity-50 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-white font-bold text-xs md:text-sm tracking-wide leading-none group-hover:text-purple-300 transition-colors">
                {personalInfo.name}
              </span>
              <span className="text-gray-400 text-[9px] md:text-[10px] font-mono tracking-widest mt-0.5 uppercase">
                AI / ML Engineer
              </span>
            </div>
          </a>

          {/* Quick controls on the right for mobile/tablet */}
          <div className="flex lg:hidden items-center gap-1.5 md:gap-2">
            <button
              onClick={toggleTheme}
              className="p-1.5 md:p-2 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:text-white cursor-pointer hover:bg-white/10 transition-colors"
              title="Toggle Theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-3.5 h-3.5 text-amber-400" />
              ) : (
                <Moon className="w-3.5 h-3.5 text-indigo-400" />
              )}
            </button>

            <button
              onClick={toggleAmbientGlow}
              className="p-1.5 md:p-2 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:text-white cursor-pointer hover:bg-white/10 transition-colors"
              title="Toggle Ambient Glow"
            >
              {isAmbientGlow ? (
                <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
              ) : (
                <Flame className="w-3.5 h-3.5 text-gray-500" />
              )}
            </button>

            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="px-2.5 py-1 bg-gradient-to-r from-brand-purple to-brand-blue text-white rounded-lg text-[10px] md:text-xs font-semibold shadow-md active:scale-95 transition-transform"
            >
              Contact
            </a>
          </div>
        </div>

        {/* Option Features directly on top, horizontally scrollable on small screens */}
        <div className="w-full lg:w-auto overflow-x-auto scrollbar-none py-1 -mx-2 px-2 select-none">
          <nav className="flex items-center gap-1 bg-white/[0.03] dark:bg-white/[0.02] border border-white/[0.05] rounded-full p-1 w-max mx-auto lg:mx-auto">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`px-3 py-1.5 rounded-full text-[11px] md:text-xs font-semibold tracking-wide transition-all duration-300 relative whitespace-nowrap ${
                    isActive 
                      ? 'text-white' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 bg-gradient-to-r from-brand-purple/20 to-brand-blue/20 border border-brand-purple/35 rounded-full -z-10 shadow-[0_0_8px_rgba(139,92,246,0.15)]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  {item.label}
                </a>
              );
            })}
          </nav>
        </div>

        {/* Desktop Control indicators */}
        <div className="hidden lg:flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 text-gray-300 hover:text-brand-purple transition-all relative group cursor-pointer"
            title={theme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-400" />
            )}
            {/* Tooltip */}
            <span className="absolute top-12 scale-0 group-hover:scale-100 transition-all rounded bg-gray-900 border border-white/10 px-2 py-1 text-[10px] text-white font-mono z-30 whitespace-nowrap">
              {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </span>
          </button>

          <button
            onClick={toggleAmbientGlow}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 text-gray-300 hover:text-brand-purple transition-all relative group cursor-pointer"
            title="Toggle Ambient Grid Glow"
          >
            {isAmbientGlow ? (
              <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
            ) : (
              <Flame className="w-4 h-4 text-gray-500 hover:text-white" />
            )}
            {/* Tooltip */}
            <span className="absolute top-12 scale-0 group-hover:scale-100 transition-all rounded bg-gray-900 border border-white/10 px-2 py-1 text-[10px] text-white font-mono z-30 whitespace-nowrap">
              {isAmbientGlow ? 'Ambient Glow: ON' : 'Ambient Glow: OFF'}
            </span>
          </button>

          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-brand-purple to-purple-700 hover:from-brand-purple hover:to-brand-blue text-white rounded-full text-xs font-semibold shadow-[0_0_15px_rgba(139,92,246,0.25)] hover:shadow-[0_0_20px_rgba(139,92,246,0.45)] transition-all transform hover:-translate-y-0.5"
          >
            Hire Me
            <Rocket className="w-3 h-3" />
          </a>
        </div>

      </div>
    </motion.header>
  );
}
