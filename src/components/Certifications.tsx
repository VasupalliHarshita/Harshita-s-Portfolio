import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, ShieldCheck, Search, HelpCircle, ExternalLink, GraduationCap, X } from 'lucide-react';
import { certificationsList } from '../data';

export default function Certifications() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCertifications = certificationsList.filter((cert) => {
    return (
      cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.issuer.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <section
      id="certifications"
      className="relative py-24 px-6 md:px-12 bg-[#050508] overflow-hidden"
    >
      {/* Decorative center ambient light */}
      <div className="absolute top-1/4 left-1/3 w-80 h-80 bg-brand-blue/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto z-10 relative">
        {/* Section Heading */}
        <div className="text-center md:text-left mb-16 space-y-3 flex flex-col md:flex-row md:items-end md:justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2 justify-center md:justify-start text-xs font-mono tracking-widest text-[#8b5cf6]">
              <span className="w-8 h-[1px] bg-[#8b5cf6]" />
              <span>05 // VERIFIED BADGES</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tighter text-white leading-none">
              Certifications
            </h2>
            <p className="text-white/40 max-w-xl text-xs font-sans">
              Credentials covering machine learning algorithms, Java software engineering standards, and enterprise cybersecurity audits.
            </p>
          </div>

          {/* Search bar inside header for space optimization */}
          <div className="relative w-full md:max-w-xs mt-6 md:mt-0">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search certifications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-8 py-2.5 bg-[#050508]/50 border border-white/10 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-brand-purple transition-colors font-mono"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 p-0.5 hover:bg-white/10 rounded text-gray-400"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        {/* Certifications cards grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredCertifications.map((cert) => (
              <motion.div
                key={cert.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="p-5 rounded-3xl bg-white/[0.03] text-left relative overflow-hidden flex items-start gap-4 border border-white/10 transition-all cursor-default"
              >
                {/* Micro verified decoration badge */}
                <div className="p-3 rounded-xl bg-gradient-to-tr from-[#8b5cf6]/20 to-[#3b82f6]/20 border border-[#8b5cf6]/20 text-brand-purple shrink-0 group-hover:scale-105 transition-transform">
                  <Award className="w-5 h-5 text-purple-400" />
                </div>

                <div className="space-y-1 text-left min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 justify-between">
                    <span className="text-[10px] font-mono text-gray-500 tracking-widest uppercase">
                      {cert.year || 'VERIFIED'}
                    </span>
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 opacity-60" />
                  </div>

                  <h4 className="text-sm font-bold text-white tracking-tight group-hover:text-purple-300 transition-colors leading-snug line-clamp-2">
                    {cert.title}
                  </h4>

                  <p className="text-[11px] font-mono text-white/50">
                    {cert.issuer}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredCertifications.length === 0 && (
          <div className="py-20 text-center border border-dashed border-white/10 rounded-3xl bg-[#0a0a0f] max-w-sm mx-auto space-y-2">
            <HelpCircle className="w-6 h-6 text-gray-500 mx-auto animate-pulse" />
            <h4 className="text-white font-mono text-xs font-bold tracking-wide">No Certifications Match</h4>
            <p className="text-[10px] text-gray-400 font-sans">
              Clear search queries to recompile verified badges catalog.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
