import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Github, ExternalLink, Star, Layers, Check, X, Code, Filter } from 'lucide-react';
import { projectsList } from '../data';
import { Project } from '../types';

export default function Projects() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

  // List of unique categories derived dynamically
  const categories = ['All', 'Machine Learning', 'Data Analytics', 'Web Development', 'Python Application'];

  // Filtering + Searching logic
  const filteredProjects = projectsList.filter((project) => {
    const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory || (selectedCategory === 'Web Development' && project.category === 'Web Development');
    
    const matchesSearch = 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.techStack.some((tech) => tech.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <section
      id="projects"
      className="relative py-24 px-6 md:px-12 bg-[#050508] overflow-hidden"
    >
      {/* Decorative Blur Background circles */}
      <div className="absolute bottom-[20%] right-[-10vw] w-[45vw] h-[45vw] bg-brand-purple/5 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Heading */}
        <div className="text-center md:text-left mb-16 space-y-3">
          <div className="flex items-center gap-2 justify-center md:justify-start text-xs font-mono tracking-widest text-[#8b5cf6]">
            <span className="w-8 h-[1px] bg-[#8b5cf6]" />
            <span>04 // PORTFOLIO WORK</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tighter text-white leading-none">
            Featured Projects
          </h2>
          <p className="text-white/40 max-w-xl text-xs font-sans">
            Demonstrative compilation spanning statistical algorithms, automated scripts, and robust full stack interactive layouts.
          </p>
        </div>

        {/* Search, Filter Tools Board */}
        <div className="bg-[#0a0a0f] border border-white/10 rounded-3xl p-6 mb-12 flex flex-col md:flex-row gap-6 items-center justify-between backdrop-blur-md">
          {/* Search bar input with icon */}
          <div className="relative w-full md:max-w-sm">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search language, tech stack, features..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-[#050508]/50 border border-white/10 rounded-2xl text-xs font-medium text-white placeholder-gray-500 focus:outline-none focus:border-brand-purple transition-colors font-mono"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-0.5 hover:bg-white/15 rounded text-gray-400"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Filtering bar */}
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto overflow-x-auto no-scrollbar">
            <Filter className="w-3.5 h-3.5 text-brand-blue mr-1 hidden sm:inline shrink-0" />
            {categories.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-2.5 rounded-xl text-[11px] font-mono font-medium tracking-wide transition-all duration-300 whitespace-nowrap border clickable-card cursor-pointer ${
                    active
                      ? 'bg-gradient-to-r from-brand-purple/20 to-brand-blue/20 border-brand-purple text-white shadow-[0_0_12px_rgba(139,92,246,0.15)]'
                      : 'bg-[#050508]/50 border-white/5 hover:border-white/10 text-gray-400 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamically Filtered Projects Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => {
              const isCardHovered = hoveredCardId === project.id;
              
              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="rounded-3xl bg-white/[0.03] hover:bg-white/[0.05] flex flex-col justify-between overflow-hidden relative group border border-white/10 transition-all duration-300 clickable-card text-left"
                  onMouseEnter={() => setHoveredCardId(project.id)}
                  onMouseLeave={() => setHoveredCardId(null)}
                >
                  
                  {/* Decorative ambient top linear line gradient */}
                  <div className="h-1 w-full bg-gradient-to-r from-brand-purple via-pink-400 to-brand-blue opacity-30 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Card Content body */}
                  <div className="p-6 md:p-8 space-y-6">
                    {/* Header: Category Badge & Featured Icon */}
                    <div className="flex items-center justify-between gap-3">
                      <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[9px] font-mono tracking-widest text-gray-400 uppercase">
                        {project.category || 'Developer Utility'}
                      </span>

                      {project.isFeatured && (
                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-[9px] font-mono font-extrabold text-amber-400 animate-pulse">
                          <Star className="w-3 h-3 fill-amber-400" />
                          <span>FEATURED</span>
                        </div>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-brand-purple transition-all duration-300 tracking-tight leading-normal">
                      {project.title}
                    </h3>

                    {/* Narrative Description */}
                    <p className="text-white/60 text-xs leading-relaxed font-sans min-h-[50px]">
                      {project.description}
                    </p>

                    {/* Feature Lists Items checklist */}
                    {project.features && project.features.length > 0 && (
                      <div className="space-y-2 border-t border-white/5 pt-4">
                        <span className="text-[10px] font-mono text-gray-500 tracking-widest uppercase block">// KEY CAPABILITIES:</span>
                        <div className="grid grid-cols-1 gap-1.5">
                          {project.features.map((feature, fIdx) => (
                            <div key={fIdx} className="flex items-start gap-1.5 text-xs text-white/55">
                              <Check className="w-3.5 h-3.5 text-[#8b5cf6] shrink-0 mt-0.5" />
                              <span className="line-clamp-1">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Actions footer wrapper: Link metrics / tech indices */}
                  <div className="p-6 md:p-8 pt-0 mt-auto border-t border-white/5">
                    {/* Tech stack tags */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.techStack.map((tech) => (
                        <span key={tech} className="px-2 py-0.5 rounded bg-[#0a0a0f] text-[9px] font-mono text-gray-400 border border-white/5">
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Standard GitHub handles */}
                    <div className="flex items-center justify-between gap-4">
                      {project.githubUrl ? (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 py-2.5 px-4 rounded-xl bg-white/5 border border-white/10 hover:bg-brand-blue/20 hover:border-brand-blue/50 text-xs font-semibold text-white transition-all transform hover:-translate-y-0.5 clickable-card"
                        >
                          <Github className="w-3.5 h-3.5" />
                          <span>GitHub Source</span>
                        </a>
                      ) : (
                        <div className="text-[10px] font-mono text-gray-500 flex items-center gap-1 select-none">
                          <Code className="w-3.5 h-3.5" />
                          Academic Local App
                        </div>
                      )}

                      {/* Optional Live Prototype link mockup block */}
                      <a
                        href="#contact"
                        className="p-2.5 rounded-xl bg-gradient-to-r from-brand-purple to-indigo-700 hover:from-brand-purple hover:to-brand-blue border border-brand-purple/20 text-white transition-all transform hover:-translate-y-0.5 clickable-card"
                        title="Inquire about custom deployment"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <div className="py-20 text-center border border-dashed border-white/10 rounded-3xl bg-[#0a0a0f] max-w-xl mx-auto space-y-3">
            <Layers className="w-8 h-8 text-gray-500 mx-auto animate-bounce" />
            <h4 className="text-white font-bold font-mono text-sm tracking-wide">No Target Core Matches Found</h4>
            <p className="text-xs text-gray-400 font-sans px-6">
              There are no projects answering query matches for "{searchQuery}" under category "{selectedCategory}". Clear constraints to reset indices.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="px-4 py-2 bg-brand-purple text-white text-xs font-semibold rounded-lg hover:bg-brand-blue/80 transition-all font-mono cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
