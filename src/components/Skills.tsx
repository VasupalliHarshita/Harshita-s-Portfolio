import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Code2, Globe, Database, Cloud, ListTodo, Wrench, ShieldAlert } from 'lucide-react';
import { skillsList } from '../data';

export default function Skills() {
  const [activeTab, setActiveTab] = useState<'All' | 'Programming Languages' | 'Web Technologies' | 'Databases' | 'Cloud Platform' | 'Core Subjects' | 'Tools'>('All');

  const categories = [
    { label: 'All Skills', id: 'All', icon: <ListTodo className="w-4 h-4" /> },
    { label: 'Languages', id: 'Programming Languages', icon: <Code2 className="w-4 h-4" /> },
    { label: 'Web Tech', id: 'Web Technologies', icon: <Globe className="w-4 h-4" /> },
    { label: 'Databases', id: 'Databases', icon: <Database className="w-4 h-4" /> },
    { label: 'Cloud', id: 'Cloud Platform', icon: <Cloud className="w-4 h-4" /> },
    { label: 'Core CS', id: 'Core Subjects', icon: <ShieldAlert className="w-4 h-4" /> },
    { label: 'Tools', id: 'Tools', icon: <Wrench className="w-4 h-4" /> }
  ];

  const filteredSkills = skillsList.filter((skill) => {
    if (activeTab === 'All') return true;
    return skill.category === activeTab;
  });

  // Helper to color-code skill chips/indicators
  const getCategoryTheme = (cat: string) => {
    switch (cat) {
      case 'Programming Languages':
        return {
          bg: 'bg-emerald-500/10',
          border: 'border-emerald-500/20 text-emerald-400',
          bar: 'bg-emerald-500',
          glow: 'shadow-emerald-500/20'
        };
      case 'Web Technologies':
        return {
          bg: 'bg-amber-500/10',
          border: 'border-amber-500/20 text-amber-400',
          bar: 'bg-amber-500',
          glow: 'shadow-amber-500/20'
        };
      case 'Databases':
        return {
          bg: 'bg-brand-blue/10',
          border: 'border-brand-blue/20 text-brand-blue',
          bar: 'bg-brand-blue',
          glow: 'shadow-brand-blue/20'
        };
      case 'Cloud Platform':
        return {
          bg: 'bg-sky-500/10',
          border: 'border-sky-500/20 text-sky-400',
          bar: 'bg-sky-400',
          glow: 'shadow-sky-500/20'
        };
      case 'Core Subjects':
        return {
          bg: 'bg-purple-500/10',
          border: 'border-purple-500/20 text-purple-400',
          bar: 'bg-brand-purple',
          glow: 'shadow-brand-purple/20'
        };
      default:
        return {
          bg: 'bg-slate-500/10',
          border: 'border-slate-500/20 text-slate-300',
          bar: 'bg-slate-400',
          glow: 'shadow-slate-500/20'
        };
    }
  };

  return (
    <section
      id="skills"
      className="relative py-24 px-6 md:px-12 bg-[#050508] overflow-hidden"
    >
      <div className="absolute top-[30%] left-[-10vw] w-[45vw] h-[45vw] rounded-full bg-brand-blue/5 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Heading */}
        <div className="text-center md:text-left mb-16 space-y-3">
          <div className="flex items-center gap-2 justify-center md:justify-start text-xs font-mono tracking-widest text-brand-blue">
            <span className="w-8 h-[1px] bg-brand-blue" />
            <span>02 // SKILLS INDEX</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tighter text-white leading-none">
            Technical Stack
          </h2>
          <p className="text-white/40 max-w-xl text-xs font-sans">
            A comprehensive visual index charting my domain expertise and current competency vectors.
          </p>
        </div>

        {/* Tab Filters Slider Bar */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5 mb-12 border-b border-white/5 pb-6 overflow-x-auto no-scrollbar">
          {categories.map((cat) => {
            const isTabActive = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium tracking-wide transition-all duration-300 whitespace-nowrap border clickable-card cursor-pointer ${
                  isTabActive
                    ? 'bg-gradient-to-r from-brand-purple/20 to-brand-blue/20 border-brand-purple text-white shadow-[0_0_15px_rgba(139,92,246,0.2)]'
                    : 'bg-white/[0.02] hover:bg-white/[0.05] border-white/5 hover:border-white/10 text-gray-400 hover:text-white'
                }`}
              >
                {cat.icon}
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Skills Cards Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill, index) => {
              const theme = getCategoryTheme(skill.category);
              return (
                <motion.div
                  key={skill.name}
                  layout
                  initial={{ opacity: 0, scale: 0.95, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="p-6 md:p-7 rounded-3xl bg-white/[0.03] text-left relative overflow-hidden flex flex-col justify-between group border border-white/10 cursor-default"
                >
                  {/* Subtle hover gradient flare on card background */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-brand-purple/5 to-brand-blue/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none duration-500" />

                  <div className="space-y-4">
                    {/* Header: Skill Name & Category badge flag */}
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-sm font-semibold text-gray-500 font-mono tracking-widest text-[9px] uppercase">
                        // {skill.category}
                      </span>
                      <div className={`px-2.5 py-0.5 rounded-full text-[9px] font-mono border ${theme.bg} ${theme.border}`}>
                        {skill.level}%
                      </div>
                    </div>

                    {/* Skill Title */}
                    <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-brand-purple transition-all duration-300">
                      {skill.name}
                    </h3>
                  </div>

                  {/* Progressive indicator slider */}
                  <div className="mt-8 space-y-1.5 relative">
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="text-gray-500">PRO LEVEL</span>
                      <span className="text-gray-400 font-bold">{skill.level < 80 ? 'Capable' : 'Expert'}</span>
                    </div>

                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden relative">
                      <motion.div
                        className={`h-full rounded-full ${theme.bar} shadow-lg ${theme.glow}`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: 'easeOut', delay: index * 0.05 }}
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
