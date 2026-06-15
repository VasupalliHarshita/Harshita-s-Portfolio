import { motion } from 'motion/react';
import { GraduationCap, Briefcase, Calendar, MapPin, Sparkles, BookOpen, Layers, CheckCircle2 } from 'lucide-react';
import { educationHistory, internshipsList } from '../data';

export default function Experience() {
  return (
    <section
      id="experience"
      className="relative py-24 px-6 md:px-12 bg-[#050508] overflow-hidden"
    >
      {/* Anchor nodes for active section detection in parent */}
      <span id="education" className="absolute top-0" />
      <span id="internships" className="absolute top-1/2" />

      {/* Decorative center accent */}
      <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-brand-purple/5 blur-[120px] rounded-full -translate-x-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto z-10 relative">
        {/* Section Heading */}
        <div className="text-center md:text-left mb-16 space-y-3">
          <div className="flex items-center gap-2 justify-center md:justify-start text-xs font-mono tracking-widest text-[#8b5cf6]">
            <span className="w-8 h-[1px] bg-[#8b5cf6]" />
            <span>03 // PROFESSIONAL TIMELINE</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tighter text-white leading-none">
            Journey & Achievements
          </h2>
          <p className="text-white/40 max-w-xl text-xs font-sans">
            Chartered timeline tracking my academic excellence and hands-on professional virtual internships.
          </p>
        </div>

        {/* Dual Split Timelines Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Education Pathways */}
          <div className="lg:col-span-6 space-y-8 text-left bg-white/[0.02] border border-white/10 rounded-3xl p-6 md:p-8">
            <div className="flex items-center gap-3 border-b border-white/10 pb-4">
              <GraduationCap className="w-6 h-6 text-brand-purple" />
              <h3 className="text-xl font-bold text-white tracking-tight">Academic Foundations</h3>
            </div>

            <div className="relative border-l-2 border-white/10 pl-6 md:pl-8 ml-3 space-y-12">
              {educationHistory.map((edu, index) => (
                <motion.div
                  key={edu.id}
                  className="relative group"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                >
                  {/* Timeline bullet handle node */}
                  <div className="absolute -left-[35px] md:-left-[43px] top-1.5 w-6 h-6 rounded-full bg-[#050508] border-2 border-brand-purple flex items-center justify-center shadow-[0_0_8px_#8b5cf6] group-hover:scale-110 transition-transform">
                    {index === 0 ? (
                      <Sparkles className="w-2.5 h-2.5 text-brand-purple animate-pulse" />
                    ) : (
                      <BookOpen className="w-2.5 h-2.5 text-brand-purple" />
                    )}
                  </div>

                  <div className="space-y-2">
                    {/* Date period Badge */}
                    <div className="inline-flex items-center gap-1.5 text-xs font-mono text-purple-400 uppercase tracking-widest">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{edu.period}</span>
                    </div>

                    {/* Institution Name */}
                    <h4 className="text-lg font-bold text-white group-hover:text-brand-purple transition-colors">
                      {edu.institution}
                    </h4>

                    {/* Core description indices */}
                    <p className="text-sm font-medium text-white/70 font-sans">
                      {edu.degree}
                    </p>

                    {/* Marks/Details block badge */}
                    <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-gray-400 mt-2">
                      <span className="px-2 py-1 bg-white/5 border border-white/10 rounded-lg text-brand-purple font-bold">
                        {edu.percentageOrCgpa}
                      </span>
                      <span className="flex items-center gap-1 text-[11px] text-white/40">
                        <MapPin className="w-3.5 h-3.5" />
                        {edu.location}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Virtual Internships pathways */}
          <div className="lg:col-span-6 space-y-8 text-left bg-white/[0.02] border border-white/10 rounded-3xl p-6 md:p-8">
            <div className="flex items-center gap-3 border-b border-white/10 pb-4">
              <Briefcase className="w-6 h-6 text-brand-blue" />
              <h3 className="text-xl font-bold text-white tracking-tight">Internship Milestones</h3>
            </div>

            <div className="relative border-l-2 border-white/10 pl-6 md:pl-8 ml-3 space-y-12">
              {internshipsList.map((intern, index) => (
                <motion.div
                  key={intern.id}
                  className="relative group"
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  {/* Timeline bullet handle node */}
                  <div className="absolute -left-[35px] md:-left-[43px] top-1.5 w-6 h-6 rounded-full bg-[#050508] border-2 border-brand-blue flex items-center justify-center shadow-[0_0_8px_#3b82f6] group-hover:scale-110 transition-transform">
                    <Layers className="w-2.5 h-2.5 text-brand-blue" />
                  </div>

                  <div className="space-y-4">
                    {/* Period header */}
                    <div className="space-y-1">
                      <div className="inline-flex items-center gap-1.5 text-xs font-mono text-brand-blue uppercase tracking-widest">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{intern.period}</span>
                      </div>
                      <h4 className="text-lg font-bold text-white group-hover:text-brand-blue transition-colors mt-1">
                        {intern.title}
                      </h4>
                      <p className="text-[11px] font-mono text-white/40 uppercase tracking-widest">
                        {intern.role}
                      </p>
                    </div>

                    {/* Bullet Highlights bento panel */}
                    <div className="p-5 rounded-2xl bg-[#0a0a0f] border border-white/5 space-y-3">
                      {intern.highlights.map((bullet, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-white/60 leading-relaxed font-sans">
                          <CheckCircle2 className="w-4 h-4 text-brand-blue shrink-0 mt-0.5" />
                          <span>{bullet}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
