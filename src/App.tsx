import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronUp, Eye } from 'lucide-react';

// Sections Imports
import Loader from './components/Loader';
import CustomCursor from './components/CustomCursor';
import ParticleBackground from './components/ParticleBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Certifications from './components/Certifications';
import GitHubShowcase from './components/GitHubShowcase';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AIAssistant from './components/AIAssistant';

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isAmbientGlow, setIsAmbientGlow] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    return (localStorage.getItem('portfolio-theme') as 'dark' | 'light') || 'dark';
  });

  // Keep theme class synchronized on root element
  useEffect(() => {
    localStorage.setItem('portfolio-theme', theme);
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.add('light-mode');
    } else {
      root.classList.remove('light-mode');
    }
  }, [theme]);

  // Intersection observer to track active screen section
  useEffect(() => {
    if (!isLoaded) return;

    const sections = [
      'home',
      'about',
      'skills',
      'experience',
      'projects',
      'certifications',
      'github-showcase',
      'contact'
    ];

    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -40% 0px', // trigger near center stage
      threshold: 0.1
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isLoaded]);

  // Monitor scroll for ScrollToTop capability
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleSectionScroll = (id: string) => {
    const target = document.getElementById(id);
    if (target) {
      const offset = 80;
      const pos = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: pos, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Intro transition loader */}
      <Loader onComplete={() => setIsLoaded(true)} />

      {/* Actual app page body renders once loaded completes */}
      {isLoaded && (
        <div className="relative min-h-screen bg-[#050508] text-white selection:bg-[#8b5cf6]/35 selection:text-white transition-colors overflow-x-hidden antialiased">
          
          {/* Custom Cursor Dot-Ring trailing */}
          <CustomCursor />

          {/* Background Ambient particles grid and spheres */}
          {isAmbientGlow && <ParticleBackground />}

          {/* Sticky Floating Glass Navbar */}
          <Navbar 
            activeSection={activeSection} 
            isAmbientGlow={isAmbientGlow}
            toggleAmbientGlow={() => setIsAmbientGlow(!isAmbientGlow)}
            theme={theme}
            toggleTheme={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))}
          />

          {/* Structured section viewport pages */}
          <main className="relative z-10 w-full">
            
            {/* Home/Hero */}
            <Hero 
              onProjectsClick={() => handleSectionScroll('projects')}
              onContactClick={() => handleSectionScroll('contact')}
            />

            {/* About Narrative & Counters block */}
            <About />

            {/* Timelines: Ed & Internship pathways */}
            <Experience />

            {/* Skill indices meters */}
            <Skills />

            {/* Projects filter grids */}
            <Projects />

            {/* Certifications badges list */}
            <Certifications />

            {/* Outbox records maps outlays & GitHub metrics */}
            <GitHubShowcase />

            {/* Geolocation visual check form */}
            <Contact />

          </main>

          {/* Footer branding copyright indicators */}
          <Footer />

          {/* AI Portfolio Interaction Assistant */}
          <AIAssistant />

          {/* Floating Action Scroll-to-Top button */}
          <AnimatePresence>
            {showScrollTop && (
              <motion.button
                onClick={handleScrollToTop}
                className="fixed bottom-6 right-6 p-3.5 bg-gradient-to-tr from-brand-purple to-brand-blue hover:from-purple-500 hover:to-brand-purple border border-brand-purple/20 text-white rounded-full shadow-[0_4px_15px_rgba(139,92,246,0.3)] hover:shadow-[0_4px_22px_rgba(139,92,246,0.55)] cursor-pointer z-40 transition-all font-semibold"
                initial={{ opacity: 0, scale: 0.5, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.5, y: 30 }}
                whileHover={{ y: -3 }}
                title="Scroll back to index head"
              >
                <ChevronUp className="w-4 h-4" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      )}
    </>
  );
}
