import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { FolderGit2, CalendarRange, Award, BrainCircuit, UserCheck, Heart } from 'lucide-react';
import { personalInfo } from '../data';

export default function About() {
  const [counts, setCounts] = useState({ projects: 0, certs: 0, interns: 0, target: 1 });

  useEffect(() => {
    // Dynamic numeric animations
    const interval = setInterval(() => {
      setCounts((prev) => {
        const nextProjects = prev.projects < 6 ? prev.projects + 1 : 6;
        const nextCerts = prev.certs < 10 ? prev.certs + 1 : 10;
        const nextInterns = prev.interns < 2 ? prev.interns + 1 : 2;
        
        if (nextProjects === 6 && nextCerts === 10 && nextInterns === 2) {
          clearInterval(interval);
        }
        return {
          projects: nextProjects,
          certs: nextCerts,
          interns: nextInterns,
          target: prev.target,
        };
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  const stats = [
    {
      id: "stat-1",
      number: `${counts.projects}+`,
      label: 'Projects Completed',
      desc: 'Machine learning & web apps',
      icon: <FolderGit2 className="w-5 h-5 text-brand-purple" />,
      color: 'rgba(139, 92, 246, 0.1)',
      borderColor: 'rgba(139, 92, 246, 0.2)'
    },
    {
      id: "stat-2",
      number: `${counts.certs}+`,
      label: 'Certifications',
      desc: 'Google, Oracle, NPTEL, Infosys',
      icon: <Award className="w-5 h-5 text-amber-400" />,
      color: 'rgba(251, 191, 36, 0.1)',
      borderColor: 'rgba(251, 191, 36, 0.2)'
    },
    {
      id: "stat-3",
      number: `${counts.interns}`,
      label: 'Interships Completed',
      desc: 'AWS & AI/ML Virtual foundations',
      icon: <CalendarRange className="w-5 h-5 text-brand-blue" />,
      color: 'rgba(59, 130, 246, 0.1)',
      borderColor: 'rgba(59, 130, 246, 0.2)'
    },
    {
      id: "stat-4",
      number: 'AI & ML',
      label: 'Academic Specialization',
      desc: 'B.Tech Vignan AIML Major',
      icon: <BrainCircuit className="w-5 h-5 text-emerald-400" />,
      color: 'rgba(52, 211, 153, 0.1)',
      borderColor: 'rgba(52, 211, 153, 0.2)'
    }
  ];

  return (
    <section
      id="about"
      className="relative py-24 px-6 md:px-12 bg-[#050508] overflow-hidden"
    >
      <div className="absolute top-1/4 left-1/2 w-96 h-96 bg-brand-purple/5 blur-[120px] rounded-full -translate-x-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto z-10 relative">
        
        {/* Section Heading */}
        <div className="text-center md:text-left mb-16 space-y-3">
          <div className="flex items-center gap-2 justify-center md:justify-start text-xs font-mono tracking-widest text-[#8b5cf6]">
            <span className="w-8 h-[1px] bg-[#8b5cf6]" />
            <span>01 // PROFESSIONAL SUMMARY</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tighter text-white leading-none">
            About Me
          </h2>
          <p className="text-white/40 max-w-xl text-xs font-sans">
            A glance into my background, academic passion, and core technical drivers.
          </p>
        </div>

        {/* Content Splitting Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Narrative Bio */}
          <div className="lg:col-span-6 space-y-6">
            <motion.div
              className="p-6 md:p-8 rounded-3xl bg-[#0a0a0f] border border-white/10 space-y-6"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                <UserCheck className="w-5 h-5 text-brand-purple" />
                <h3 className="text-lg font-bold text-white tracking-tight">My Academic Profile</h3>
              </div>

              <p className="text-white/70 text-sm leading-relaxed font-sans">
                {personalInfo.bio}
              </p>

              <div className="pt-4 border-t border-white/5 grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-xs text-gray-500 font-mono">// CURRENT CITY</h4>
                  <p className="text-sm text-white font-medium mt-1">{personalInfo.location}</p>
                </div>
                <div>
                  <h4 className="text-xs text-gray-500 font-mono">// LANGUAGES</h4>
                  <p className="text-sm text-white font-medium mt-1">English, Telugu</p>
                </div>
              </div>
            </motion.div>

            {/* Quick motivators */}
            <motion.div
              className="p-4 rounded-2xl border border-dashed border-[#8b5cf6]/20 bg-[#8b5cf6]/5 flex items-start gap-3"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Heart className="w-5 h-5 text-[#8b5cf6] shrink-0 mt-0.5 animate-pulse" />
              <div className="text-left text-xs text-gray-400">
                <span className="text-white font-bold block mb-0.5">My Goal</span>
                Excited to innovate software systems, configure ML classifiers, and maintain robust cloud solutions to optimize operational pipelines. Let's build what matters!
              </div>
            </motion.div>
          </div>

          {/* Right Column: Interactive counters bento grid */}
          <div className="lg:col-span-6 grid grid-cols-1 md:grid-cols-2 gap-5 col-span-1">
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.id}
                className="p-6 rounded-3xl bg-white/[0.03] hover:bg-white/[0.05] relative overflow-hidden group border border-white/10 transition-all duration-300 clickable-card"
                style={{ contentVisibility: 'auto' }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                {/* Visual Icon backdrop shadow glow */}
                <div 
                  className="absolute top-0 right-0 w-24 h-24 rounded-full blur-3xl pointer-events-none opacity-20 -mr-6 -mt-6 transition-opacity group-hover:opacity-40"
                  style={{ backgroundColor: stat.borderColor }}
                />

                <div 
                  className="p-2.5 rounded-xl inline-block mb-4 border"
                  style={{ backgroundColor: stat.color, borderColor: stat.borderColor }}
                >
                  {stat.icon}
                </div>

                <div className="space-y-1 block text-left">
                  <h4 className="text-3xl font-extrabold text-white tracking-tight">
                    {stat.number}
                  </h4>
                  <p className="text-xs font-semibold text-white/50 tracking-wide uppercase">
                    {stat.label}
                  </p>
                  <p className="text-[11px] text-gray-400 leading-normal">
                    {stat.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
