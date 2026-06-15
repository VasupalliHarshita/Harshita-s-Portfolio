import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, Linkedin, MapPin, Send, CheckCircle2, History, Trash2, MailCheck } from 'lucide-react';
import { personalInfo } from '../data';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
}

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [messagesHistory, setMessagesHistory] = useState<ContactMessage[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Load outbox logs on mount
  useEffect(() => {
    const local = localStorage.getItem('hv_portfolio_outbox');
    if (local) {
      try {
        setMessagesHistory(JSON.parse(local));
      } catch (err) {
        console.error(err);
      }
    }
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    
    // Simulate real network route debounce
    setTimeout(() => {
      const newMessage: ContactMessage = {
        id: `msg-${Date.now()}`,
        name: formData.name,
        email: formData.email,
        subject: formData.subject || 'General Inquiry',
        message: formData.message,
        timestamp: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      };

      const updated = [newMessage, ...messagesHistory];
      setMessagesHistory(updated);
      localStorage.setItem('hv_portfolio_outbox', JSON.stringify(updated));

      setIsSubmitting(false);
      setSubmitSuccess(true);
      // Reset fields
      setFormData({ name: '', email: '', subject: '', message: '' });

      // Clear toast shortly
      setTimeout(() => setSubmitSuccess(false), 4000);
    }, 1000);
  };

  const handleClearHistory = () => {
    localStorage.removeItem('hv_portfolio_outbox');
    setMessagesHistory([]);
    setShowHistory(false);
  };

  return (
    <section
      id="contact"
      className="relative py-24 px-6 md:px-12 bg-[#050508] overflow-hidden"
    >
      {/* Background ambient elements */}
      <div className="absolute bottom-[-10vw] left-[-10vw] w-[40vw] h-[40vw] bg-brand-purple/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Heading */}
        <div className="text-center md:text-left mb-16 space-y-3">
          <div className="flex items-center gap-2 justify-center md:justify-start text-xs font-mono tracking-widest text-[#8b5cf6]">
            <span className="w-8 h-[1px] bg-[#8b5cf6]" />
            <span>07 // OUTBOX PORTAL</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tighter text-white leading-none">
            Get In Touch
          </h2>
          <p className="text-white/40 max-w-xl text-xs font-sans">
            Ready to design intelligent classifiers or scale cloud structures. Submit message logs directly to browser storage.
          </p>
        </div>

        {/* Contact Split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Coordinates & Abstract Radar map */}
          <div className="lg:col-span-5 space-y-8 text-left">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              
              {/* Coordination Cards */}
              {/* Phone */}
              <div className="p-5 rounded-3xl bg-white/[0.03] border border-white/10 flex items-start gap-4">
                <div className="p-3 rounded-xl bg-brand-purple/10 border border-brand-purple/20 text-brand-purple shrink-0">
                  <Phone className="w-5 h-5 text-purple-400" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs font-mono text-gray-500 uppercase tracking-widest">// PHONE CALL</h4>
                  <a href={`tel:${personalInfo.phone}`} className="text-white hover:text-brand-purple transition-colors font-mono font-medium block text-xs">
                    {personalInfo.phone}
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="p-5 rounded-3xl bg-white/[0.03] border border-white/10 flex items-start gap-4">
                <div className="p-3 rounded-xl bg-brand-blue/10 border border-brand-blue/20 text-brand-blue shrink-0">
                  <Mail className="w-5 h-5 text-sky-400" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs font-mono text-gray-500 uppercase tracking-widest font-bold">// EMAIL MAIL</h4>
                  <a href={`mailto:${personalInfo.email}`} className="text-white hover:text-brand-blue transition-colors font-mono font-medium block break-all text-xs">
                    {personalInfo.email}
                  </a>
                </div>
              </div>

              {/* LinkedIn */}
              <div className="p-5 rounded-3xl bg-white/[0.03] border border-white/10 flex items-start gap-4">
                <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 shrink-0">
                  <Linkedin className="w-5 h-5 text-indigo-400" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs font-mono text-gray-500 uppercase tracking-widest">// LINKEDIN SOCIAL</h4>
                  <a
                    href={personalInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-purple-300 transition-colors font-medium text-xs break-all"
                  >
                    linkedin.com/in/harshita-vasupalli
                  </a>
                </div>
              </div>

              {/* Location Map visualizer */}
              <div className="p-5 rounded-3xl bg-white/[0.03] border border-white/10 flex items-start gap-4">
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs font-mono text-gray-500 uppercase tracking-widest">// PRIMARY RESIDENCE</h4>
                  <p className="text-white font-semibold flex items-center gap-1.5 font-sans leading-none text-xs">
                    {personalInfo.location}
                  </p>
                </div>
              </div>
            </div>

            {/* Abstract map layout Visakhapatnam radar */}
            <div className="p-4 rounded-3xl border border-white/10 bg-[#0a0a0f] relative overflow-hidden h-[180px] flex flex-col justify-between">
              {/* Radar Circles SVG */}
              <svg className="absolute inset-x-0 top-0 w-full h-[150px] opacity-35" viewBox="0 0 400 150" fill="none">
                <circle cx="200" cy="75" r="70" stroke="rgba(139,92,246,0.3)" strokeWidth="1" strokeDasharray="3 3" />
                <circle cx="200" cy="75" r="45" stroke="rgba(59,130,246,0.3)" strokeWidth="1" />
                <circle cx="200" cy="75" r="20" stroke="rgba(139,92,246,0.5)" strokeWidth="1.5" />
                
                {/* Radar sweep lines */}
                <path d="M 130 75 L 270 75" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                <path d="M 200 5 L 200 145" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
              </svg>

              {/* Radar pointer ripple */}
              <div className="absolute top-[75px] left-[200px] -translate-x-1/2 -translate-y-1/2">
                <div className="w-3 h-3 rounded-full bg-[#8b5cf6] shadow-[0_0_12px_#8b5cf6]" />
                <div className="absolute inset-0 rounded-full bg-[#8b5cf6] animate-ping opacity-75" />
              </div>

              <div className="relative mt-auto text-left space-y-1 z-10 p-2">
                <span className="text-[10px] font-mono text-purple-400 font-bold uppercase block tracking-wider">VISAKHAPATNAM RIPPLE COORDINATES</span>
                <span className="text-[9px] text-gray-500 font-mono block">Latitude: 17.7041° N | Longitude: 83.2977° E</span>
              </div>
            </div>
          </div>

          {/* Right Column: Custom Message log Form */}
          <div className="lg:col-span-7 space-y-6">
            <motion.div
              className="p-6 md:p-8 rounded-3xl bg-[#0a0a0f] border border-white/10 relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              
              {/* Form title */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <div className="flex items-center gap-2 font-bold text-white text-base">
                  <MailCheck className="w-5 h-5 text-[#8b5cf6]" />
                  <span>Send Local Log Mail</span>
                </div>

                {messagesHistory.length > 0 && (
                  <button
                    onClick={() => setShowHistory(!showHistory)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[10px] font-mono text-gray-300 font-bold tracking-wide transition-all uppercase cursor-pointer"
                  >
                    <History className="w-3.5 h-3.5 text-brand-blue" />
                    <span>Outbox ({messagesHistory.length})</span>
                  </button>
                )}
              </div>

              {/* OUTGOING LOG VIEWER OVERLAY */}
              <AnimatePresence>
                {showHistory && (
                  <motion.div
                    className="absolute inset-0 bg-[#0a0a0f] rounded-3xl p-6 md:p-8 z-30 flex flex-col justify-between overflow-hidden"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                  >
                    <div className="space-y-4 flex-1 overflow-y-auto max-h-[85%] text-left pr-1">
                      <div className="flex items-center justify-between border-b border-white/10 pb-3">
                        <span className="text-xs font-mono font-bold text-white flex items-center gap-2">
                          <History className="w-4 h-4 text-[#8b5cf6]" />
                          OUTGOING HISTORY LOGS
                        </span>
                        <button
                          onClick={() => setShowHistory(false)}
                          className="text-xs text-gray-400 hover:text-white font-mono cursor-pointer"
                        >
                          [Close Outbox]
                        </button>
                      </div>

                      <div className="space-y-3">
                        {messagesHistory.map((item) => (
                          <div key={item.id} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1.5 text-xs">
                            <div className="flex items-center justify-between text-gray-400 font-mono text-[10px]">
                              <span>Subject: {item.subject}</span>
                              <span>{item.timestamp}</span>
                            </div>
                            <h4 className="text-white font-bold">{item.name} &lt;{item.email}&gt;</h4>
                            <p className="text-gray-300 italic">"{item.message}"</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                      <button
                        onClick={handleClearHistory}
                        className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-rose-400 text-xs font-semibold font-mono transition-all cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        Clear Outbox
                      </button>

                      <button
                        onClick={() => setShowHistory(false)}
                        className="px-4 py-2 bg-white/5 text-gray-300 hover:text-white rounded-lg text-xs font-semibold cursor-pointer"
                      >
                        Return Form
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Forms element layout */}
              <form onSubmit={handleFormSubmit} className="space-y-5 text-left">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label htmlFor="name-input" className="text-xs font-mono text-gray-400 uppercase tracking-widest">// YOUR NAME</label>
                    <input
                      id="name-input"
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. John Doe"
                      className="w-full px-4 py-3 bg-[#050508]/50 border border-white/10 rounded-xl text-xs font-semibold text-white focus:outline-none focus:border-[#8b5cf6] transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="email-input" className="text-xs font-mono text-gray-400 uppercase tracking-widest">// EMAIL ADDRESS</label>
                    <input
                      id="email-input"
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g. john@example.com"
                      className="w-full px-4 py-3 bg-[#050508]/50 border border-white/10 rounded-xl text-xs font-semibold text-white focus:outline-none focus:border-[#8b5cf6] transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="subject-input" className="text-xs font-mono text-gray-400 uppercase tracking-widest">// INQUIRY SUBJECT</label>
                  <input
                    id="subject-input"
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="e.g. AI / ML Intern opportunity"
                    className="w-full px-[#050508]/50 py-3 bg-[#050508]/50 border border-white/10 rounded-xl text-xs font-semibold text-white focus:outline-none focus:border-[#8b5cf6] transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="message-input" className="text-xs font-mono text-gray-400 uppercase tracking-widest">// MESSAGE CONTEXT</label>
                  <textarea
                    id="message-input"
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="State opportunities, project feedback, or queries here..."
                    className="w-full px-4 py-3 bg-[#050508]/50 border border-white/10 rounded-xl text-xs font-semibold text-white focus:outline-none focus:border-[#8b5cf6] transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-gradient-to-r from-brand-purple to-indigo-700 hover:from-brand-purple hover:to-brand-blue text-white rounded-xl text-xs font-bold shadow-[0_4px_15px_rgba(139,92,246,0.25)] flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 clickable-card cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      <span>transmitting payload logs...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Transmit Message log</span>
                    </>
                  )}
                </button>
              </form>

              {/* Form submit toast feedback */}
              <AnimatePresence>
                {submitSuccess && (
                  <motion.div
                    className="mt-4 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono flex items-center gap-2"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    <div className="text-left font-sans">
                      <span className="font-bold font-mono block">TRANSMISSION COMPLETED!</span>
                      Your message log has been compiled and saved to local memory successfully.
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
