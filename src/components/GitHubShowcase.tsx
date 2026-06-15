import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Github, Star, GitFork, BookOpen, Calendar, Info, LineChart, Code2, Sparkles, Check } from 'lucide-react';
import { mockGithubRepos, personalInfo } from '../data';

export default function GitHubShowcase() {
  const [activeTab, setActiveTab ] = useState<'heatmap' | 'languages'>('heatmap');
  const [selectedDay, setSelectedDay] = useState<{ date: string; count: number } | null>(null);

  // Contribution graph mock details
  // 7 rows (days), ~36 columns for compact mobile scale display grid
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const [contributionData, setContributionData] = useState<{ id: number; level: number; commits: number; date: string }[]>([]);

  useEffect(() => {
    // Generate stabilized contribution nodes on mount
    const data = Array.from({ length: 238 }).map((_, i) => {
      // Levels 0 to 4 corresponding to greens intensities on github
      const level = Math.random() < 0.25 ? 0 : Math.random() < 0.35 ? 1 : Math.random() < 0.25 ? 2 : Math.random() < 0.1 ? 3 : 4;
      const commits = level * Math.floor(Math.random() * 3 + 1);
      
      // Calculate fake dates
      const dateObject = new Date();
      dateObject.setDate(dateObject.getDate() - (238 - i));
      const formattedDate = dateObject.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

      return {
        id: i,
        level,
        commits,
        date: formattedDate
      };
    });
    setContributionData(data);
  }, []);

  const totalCommits = contributionData.reduce((acc, curr) => acc + curr.commits, 0);

  // Languages statistics dataset
  const languagesStatGroup = [
    { name: 'Python', percentage: 55, color: 'bg-emerald-500', barColor: '#34d399', shadow: 'rgba(52, 211, 153, 0.3)' },
    { name: 'Java', percentage: 18, color: 'bg-purple-500', barColor: '#a78bfa', shadow: 'rgba(167, 139, 250, 0.3)' },
    { name: 'HTML / CSS', percentage: 15, color: 'bg-amber-400', barColor: '#fbbf24', shadow: 'rgba(251, 191, 36, 0.3)' },
    { name: 'JavaScript', percentage: 8, color: 'bg-brand-blue', barColor: '#3b82f6', shadow: 'rgba(59, 130, 246, 0.3)' },
    { name: 'SQL', percentage: 4, color: 'bg-indigo-400', barColor: '#818cf8', shadow: 'rgba(129, 140, 248, 0.3)' },
  ];

  return (
    <section
      id="github-showcase"
      className="relative py-24 px-6 md:px-12 bg-[#050508] overflow-hidden"
    >
      {/* Upper gradient backdrop accent */}
      <div className="absolute top-[40%] right-[-10%] w-[35vw] h-[35vw] bg-brand-blue/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Heading */}
        <div className="text-center md:text-left mb-16 space-y-3">
          <div className="flex items-center gap-2 justify-center md:justify-start text-xs font-mono tracking-widest text-brand-blue">
            <span className="w-8 h-[1px] bg-brand-blue" />
            <span>06 // REPO METRICS</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tighter text-white leading-none">
            GitHub Showcase
          </h2>
          <p className="text-white/40 max-w-xl text-xs font-sans">
            Interactive analytical monitor showcasing repository listings, code statistics, and continuous learning contributions.
          </p>
        </div>

        {/* Profile Card and Stats Board Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          
          {/* Left Column: Premium GitHub Monogram card */}
          <div className="lg:col-span-4 space-y-6">
            <motion.div
              className="p-6 md:p-8 rounded-3xl bg-white/[0.03] hover:bg-white/[0.05] border border-white/10 relative overflow-hidden text-left"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              {/* Spinning background badge */}
              <div className="absolute -right-10 -bottom-10 w-44 h-44 rounded-full bg-slate-500/5 flex items-center justify-center animate-spin" style={{ animationDuration: '30s' }}>
                <Github className="w-28 h-28 text-white/5" />
              </div>

              {/* Profile Monogram details */}
              <div className="space-y-6 relative z-10">
                <div className="flex items-center gap-4">
                  {/* Avatar wrapper */}
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-brand-purple to-brand-blue p-0.5 shadow-[0_0_15px_rgba(139,92,246,0.3)]">
                    <div className="w-full h-full bg-[#0a0a0f] rounded-2xl flex items-center justify-center">
                      <Github className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-white tracking-tight">
                      @VasupalliHarshita
                    </h3>
                    <p className="text-[10px] font-mono text-purple-400 mt-1 uppercase tracking-wider">
                      // ACTIVE PROFILE
                    </p>
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-white/10">
                  <div className="flex items-center justify-between text-xs text-white/50">
                    <span>Public Repositories</span>
                    <span className="text-white font-bold font-mono">11</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-white/50">
                    <span>Total Commits</span>
                    <span className="text-brand-purple font-bold font-mono">{totalCommits}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-white/50">
                    <span>Followers Count</span>
                    <span className="text-white font-bold font-mono">14</span>
                  </div>
                </div>

                {/* Direct Action Link button */}
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 bg-gradient-to-r from-indigo-800 to-brand-purple hover:from-brand-purple hover:to-brand-blue text-white rounded-xl text-xs font-bold shadow-[0_4px_15px_rgba(139,92,246,0.2)] flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 clickable-card"
                >
                  <Github className="w-4 h-4" />
                  <span>View GitHub Profile</span>
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Controller with heatmaps and statistics */}
          <div className="lg:col-span-8 p-6 md:p-8 rounded-3xl bg-[#0a0a0f] border border-white/10 text-left relative">
            
            {/* Header section tabs */}
            <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4 mb-6">
              <div className="flex items-center gap-1.5 font-bold text-white text-base">
                <LineChart className="w-5 h-5 text-[#8b5cf6]" />
                <span>Analytical Dashboard</span>
              </div>

              {/* Toggle switch tabs */}
              <div className="flex bg-white/5 rounded-lg p-1 border border-white/10">
                <button
                  onClick={() => setActiveTab('heatmap')}
                  className={`px-3 py-1.5 rounded-md text-[9px] font-semibold tracking-wider uppercase transition-colors cursor-pointer ${
                    activeTab === 'heatmap' ? 'bg-[#8b5cf6]/20 border border-[#8b5cf6]/30 text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Activity Graph
                </button>
                <button
                  onClick={() => setActiveTab('languages')}
                  className={`px-3 py-1.5 rounded-md text-[9px] font-semibold tracking-wider uppercase transition-colors cursor-pointer ${
                    activeTab === 'languages' ? 'bg-[#8b5cf6]/20 border border-[#8b5cf6]/30 text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Languages Stats
                </button>
              </div>
            </div>

            {/* Display Screen */}
            <div className="min-h-[170px] flex items-center justify-center">
              <AnimatePresence mode="wait">
                {activeTab === 'heatmap' ? (
                  <motion.div
                    key="contribution"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    className="w-full space-y-4"
                  >
                    <div className="flex items-center justify-between text-xs text-white/40">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-brand-blue" />
                        <span>Continuous Learning Contributions Tracker</span>
                      </div>
                      <span className="font-mono text-[10px] text-brand-purple font-medium">
                        {totalCommits} Contributions in current layout cycle
                      </span>
                    </div>

                    {/* Heatmap Grid rendering */}
                    <div className="overflow-x-auto pb-2 no-scrollbar">
                      <div className="flex gap-[3.5px] min-w-[560px]">
                        {/* Days indicator column */}
                        <div className="flex flex-col justify-between text-[8px] font-mono text-gray-500 py-1.5 pr-2 select-none h-[82px]">
                          <span>Mon</span>
                          <span>Wed</span>
                          <span>Fri</span>
                        </div>

                        {/* Grid matrix column segments */}
                        <div className="grid grid-cols-34 gap-[3.5px] flex-1">
                          {contributionData.map((node) => {
                            // Style level colors matching GitHub Dark index
                            let colorClass = 'bg-white/5'; // Level 0
                            if (node.level === 1) colorClass = 'bg-emerald-950/40 text-emerald-900 border border-emerald-900/10';
                            if (node.level === 2) colorClass = 'bg-emerald-800/60 shadow-[inset_0_0_4px_rgba(52,211,153,0.1)]';
                            if (node.level === 3) colorClass = 'bg-emerald-600/80';
                            if (node.level === 4) colorClass = 'bg-emerald-400 shadow-[0_0_8px_#34d399]';
                            
                            return (
                              <div
                                key={node.id}
                                onClick={() => setSelectedDay(node)}
                                onMouseEnter={() => setSelectedDay(node)}
                                className={`w-3 h-3 rounded-[2.5px] cursor-pointer transition-all hover:scale-125 hover:z-20 ${colorClass}`}
                              />
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Selected Box details description */}
                    <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl flex items-center justify-between text-xs">
                      {selectedDay ? (
                        <div className="flex items-center gap-3 font-mono text-[11px] text-gray-400">
                          <span className="text-emerald-400 font-bold">&#9679;</span>
                          <span>{selectedDay.date}</span>
                          <span>&mdash;</span>
                          <span className="text-white font-bold">{selectedDay.commits} {selectedDay.commits === 1 ? 'commit' : 'commits'} compiled</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 font-mono text-gray-500 text-[10px]">
                          <Info className="w-3.5 h-3.5" />
                          <span>Hover over squares to show commit timestamps</span>
                        </div>
                      )}

                      {/* Level chart guide indicator */}
                      <div className="flex items-center gap-1.5 text-[9px] font-mono text-gray-500">
                        <span>Less</span>
                        <div className="w-2 h-2 rounded bg-white/5" />
                        <div className="w-2 h-2 rounded bg-emerald-950 border border-emerald-900/10" />
                        <div className="w-2 h-2 rounded bg-emerald-800" />
                        <div className="w-2 h-2 rounded bg-emerald-600" />
                        <div className="w-2 h-2 rounded bg-emerald-400" />
                        <span>More</span>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="languages"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    className="w-full space-y-5"
                  >
                    <div className="flex items-center gap-1.5 text-xs text-white/40">
                      <Code2 className="w-4 h-4 text-brand-blue" />
                      <span>Code Languages Competency Percentages (by active lines)</span>
                    </div>

                    {/* Progress tracking bars rows */}
                    <div className="space-y-3.5 max-w-xl">
                      {languagesStatGroup.map((lang, lIdx) => (
                        <div key={lang.name} className="space-y-1">
                          <div className="flex items-center justify-between text-xs font-mono">
                            <span className="text-white font-bold">{lang.name}</span>
                            <span className="text-gray-400">{lang.percentage}%</span>
                          </div>

                          <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden relative">
                            <motion.div
                              className={`h-full rounded-full ${lang.color}`}
                              style={{ width: `${lang.percentage}%`, boxShadow: `0 0 10px ${lang.shadow}` }}
                              initial={{ width: 0 }}
                              animate={{ width: `${lang.percentage}%` }}
                              transition={{ duration: 0.8, delay: lIdx * 0.05 }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Repository Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          {mockGithubRepos.map((repo, rIdx) => (
            <motion.div
              key={repo.name}
              className="p-6 rounded-3xl bg-white/[0.03] hover:bg-white/[0.05] relative group border border-white/10 flex flex-col justify-between hover:-translate-y-0.5 transition-all cursor-default"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: rIdx * 0.1 }}
            >
              {/* Spinning star accent decoration */}
              <div className="absolute top-6 right-6 p-1.5 rounded-lg bg-white/5 border border-white/5 text-gray-500 group-hover:text-brand-purple transition-all">
                <BookOpen className="w-4 h-4" />
              </div>

              <div className="space-y-4">
                <h4 className="text-lg font-bold text-white tracking-tight group-hover:text-brand-blue transition-colors">
                  {repo.name}
                </h4>

                <p className="text-xs text-white/60 leading-normal min-h-[36px]">
                  {repo.description}
                </p>
              </div>

              {/* Stats Footer bar */}
              <div className="flex items-center justify-between pt-6 border-t border-white/10 mt-6">
                <div className="flex items-center gap-4 text-xs font-mono text-gray-400">
                  <span className="flex items-center gap-1">
                    <span className={`w-2.5 h-2.5 rounded-full ${repo.language === 'Python' ? 'bg-emerald-400' : 'bg-purple-400'}`} />
                    {repo.language}
                  </span>

                  <span className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    {repo.stars}
                  </span>

                  <span className="flex items-center gap-1">
                    <GitFork className="w-3.5 h-3.5 text-sky-400" />
                    {repo.forks}
                  </span>
                </div>

                <a
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1 px-3 bg-white/5 border border-white/10 rounded-lg hover:border-brand-purple hover:bg-[#8b5cf6]/10 text-xs font-mono text-[#8b5cf6] transition-all"
                >
                  repo link
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
