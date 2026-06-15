import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';
import { personalInfo } from '../data';

export default function Footer() {
  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer id="footer-section" className="bg-[#050508] border-t border-white/10 py-12 px-6 md:px-12 relative text-left">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left Side details */}
        <div className="space-y-1.5 text-center md:text-left">
          <div className="flex items-center gap-2 justify-center md:justify-start">
            <div className="w-6 h-6 rounded bg-gradient-to-tr from-brand-purple to-brand-blue flex items-center justify-center text-white text-[10px] font-extrabold">
              HV
            </div>
            <h4 className="text-sm font-bold text-white tracking-widest uppercase">
              {personalInfo.name}
            </h4>
          </div>
          <p className="text-gray-400 text-xs font-mono tracking-wider">
            {personalInfo.role} &mdash; Visakhapatnam, AP, IN
          </p>
        </div>

        {/* Center Icons social links */}
        <div className="flex items-center gap-4">
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-lg bg-white/5 border border-white/5 text-gray-400 hover:text-white transition-all hover:bg-brand-purple/20 clickable-card"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-lg bg-white/5 border border-white/5 text-gray-400 hover:text-white transition-all hover:bg-brand-blue/20 clickable-card"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href={`mailto:${personalInfo.email}`}
            className="p-2.5 rounded-lg bg-white/5 border border-white/5 text-gray-400 hover:text-white transition-all hover:bg-purple-500/20 clickable-card"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>

        {/* Right Side back to top trigger */}
        <div className="text-center md:text-right flex items-center gap-4">
          <span className="text-gray-500 font-mono text-[10px] uppercase select-none">
            &copy; 2026 Harshita Vasupalli. All Rights Reserved.
          </span>
          
          <button
            onClick={handleScrollTop}
            className="p-2.5 rounded-lg bg-gradient-to-tr from-[#8b5cf6]/20 to-[#3b82f6]/20 border border-[#8b5cf6]/20 hover:border-[#8b5cf6] text-white transition-all transform hover:-translate-y-0.5 clickable-card"
            title="Scroll back to top index"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
