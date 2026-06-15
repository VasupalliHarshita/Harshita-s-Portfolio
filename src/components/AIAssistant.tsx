import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, X, MessageSquareCode, Send, RotateCcw, ArrowDownRight, Bot, User, Check, AlertCircle } from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: Date;
}

const SUGGESTIONS = [
  { id: 's1', label: 'Key Projects', query: 'What are Harshita\'s key featured projects?' },
  { id: 's2', label: 'AI/ML Experience', query: 'Tell me about Harshita\'s experience in AI & Machine Learning.' },
  { id: 's3', label: 'Certifications', query: 'What professional certifications does she hold?' },
  { id: 's4', label: 'Skills & Tools', query: 'What programming languages and developer tools does she know?' },
  { id: 's5', label: 'B.Tech Specialization', query: 'Where does she study and what is her CGPA?' }
];

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorStatus, setErrorStatus] = useState<string | null>(null);
  
  const bottomRef = useRef<HTMLDivElement>(null);

  // Set up default greeting message on mount
  useEffect(() => {
    setMessages([
      {
        id: 'greet',
        role: 'assistant',
        text: "Hi there! 👋 I am Harshita's Portfolio Assistant. I can help you search and verify details about her academic major, internships, programming skills, qualifications, or key projects. Ask me anything!",
        timestamp: new Date()
      }
    ]);
  }, []);

  // Soft auto-scroll to latest message
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend: string) => {
    const trimmed = textToSend.trim();
    if (!trimmed) return;

    setErrorStatus(null);
    setInputValue('');

    // Append user message
    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      text: trimmed,
      timestamp: new Date()
    };
    
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      // Prepare chat history to feed context
      const chatHistory = messages
        .filter((m) => m.id !== 'greet') // Skip initial greeting
        .map((m) => ({
          role: m.role === 'user' ? 'user' : 'model',
          text: m.text
        }));

      const res = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: trimmed,
          history: chatHistory
        })
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => null);
        throw new Error(errData?.error || 'Could not get a response from the serverside AI module.');
      }

      const data = await res.json();
      
      const aiResponse: ChatMessage = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        text: data.reply,
        timestamp: new Date()
      };

      setMessages((prev) => [...prev, aiResponse]);
    } catch (err: any) {
      console.error(err);
      setErrorStatus(err.message || 'Network transition issue occurred. Please test again!');
    } finally {
      setIsLoading(false);
    }
  };

  const clearChatHistory = () => {
    setMessages([
      {
        id: 'greet',
        role: 'assistant',
        text: "Portfolio chat reset! 💫 Ask me any questions about Harshita's skills, qualifications, B.Tech studies, or machine learning projects.",
        timestamp: new Date()
      }
    ]);
    setErrorStatus(null);
  };

  return (
    <>
      {/* Floating Sparkle Action Launch Button */}
      <div className="fixed bottom-6 right-22 z-50">
        <motion.button
          id="ai-assistant-toggle"
          onClick={() => setIsOpen(!isOpen)}
          className={`p-3.5 rounded-full flex items-center justify-center cursor-pointer shadow-lg border transition-all ${
            isOpen 
              ? 'bg-[#ef4444] border-red-500/20 text-white' 
              : 'bg-gradient-to-tr from-[#8b5cf6] to-[#3b82f6] border-[#8b5cf6]/20 text-white hover:shadow-[0_0_20px_rgba(139,92,246,0.45)]'
          }`}
          whileHover={{ y: -3, scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          title={isOpen ? "Close AI Assistant" : "Ask AI Portfolio Guide"}
        >
          {isOpen ? (
            <X className="w-4 h-4" />
          ) : (
            <div className="relative flex items-center justify-center">
              <Sparkles className="w-4 h-4 animate-pulse text-white font-bold" />
              {/* Outer decorative ring glowing element */}
              <span className="absolute -top-1 -right-1 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400"></span>
              </span>
            </div>
          )}
        </motion.button>
      </div>

      {/* Main Interactive Assistant Pane Drawer overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="ai-assistant-panel"
            className="fixed bottom-24 right-6 md:right-8 w-[92vw] sm:w-[420px] h-[520px] max-h-[80vh] rounded-3xl bg-[#0a0a0f] border border-white/10 shadow-2xl flex flex-col overflow-hidden z-50 backdrop-blur-md"
            initial={{ opacity: 0, scale: 0.85, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 50 }}
            transition={{ type: 'spring', damping: 22, stiffness: 180 }}
          >
            {/* Header section context */}
            <div className="p-4 border-b border-white/5 flex items-center justify-between bg-gradient-to-r from-brand-purple/10 to-brand-blue/10">
              <div className="flex items-center gap-2 text-left">
                <div className="p-1 px-1.5 rounded-lg bg-brand-purple/20 border border-brand-purple/30 text-[#8b5cf6]">
                  <MessageSquareCode className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-white tracking-tight flex items-center gap-1.5">
                    <span>AI Portfolio Guide</span>
                    {/* Live status dot indicator */}
                    <span className="flex h-2 w-2 rounded-full bg-[#10b981] relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10b981] opacity-75"></span>
                    </span>
                  </h3>
                  <p className="text-[10px] text-white/50 font-mono">// GEMINI 3.5 POWERED</p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={clearChatHistory}
                  className="p-1.5 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors cursor-pointer"
                  title="Reset conversation history"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Scrollable messages reel */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-none">
              
              {messages.map((msg) => {
                const isAI = msg.role === 'assistant';
                return (
                  <div
                    key={msg.id}
                    className={`flex gap-2 w-full text-left max-w-[85%] ${isAI ? 'mr-auto' : 'ml-auto flex-row-reverse text-right'}`}
                  >
                    {/* Avatar badges */}
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-[10px] ${
                      isAI 
                        ? 'bg-brand-purple/20 border border-brand-purple/30 text-brand-purple' 
                        : 'bg-brand-blue/20 border border-brand-blue/30 text-brand-blue'
                    }`}>
                      {isAI ? <Bot className="w-3 h-3" /> : <User className="w-3 h-3" />}
                    </div>

                    {/* Messages bubbles content */}
                    <div className="space-y-1">
                      <div className={`p-3 rounded-2xl text-xs sm:text-xs leading-relaxed font-sans ${
                        isAI 
                          ? 'bg-white/5 border border-white/5 text-white/90 rounded-tl-none' 
                          : 'bg-brand-purple text-white rounded-tr-none'
                      }`}>
                        {/* Split text by lines to support simple paragraphs */}
                        {msg.text.split('\n').map((line, i) => (
                          <p key={i} className={i > 0 ? "mt-1.5" : ""}>{line}</p>
                        ))}
                      </div>
                      
                      {/* Message times */}
                      <span className="text-[9px] text-white/30 font-mono block px-1">
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                );
              })}

              {/* Streaming loading state spinner symbol */}
              {isLoading && (
                <div className="flex items-center gap-2 max-w-[60%] mr-auto">
                  <div className="w-6 h-6 rounded-full bg-brand-purple/10 border border-brand-purple/20 text-brand-purple flex items-center justify-center shrink-0">
                    <Bot className="w-3 h-3 animate-bounce" />
                  </div>
                  <div className="p-3 py-2.5 rounded-2xl bg-white/5 border border-white/5 rounded-tl-none flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8b5cf6] animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8b5cf6] animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8b5cf6] animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}

              {/* Exception/Error panel fallback dialog */}
              {errorStatus && (
                <div className="p-3.5 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs text-left space-y-1">
                  <div className="flex items-center gap-1.5 font-bold">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>Communication Interruption</span>
                  </div>
                  <p className="font-mono text-[10px] leading-relaxed text-red-300">{errorStatus}</p>
                </div>
              )}

              {/* Scroll anchor target bottom */}
              <div ref={bottomRef} />
            </div>

            {/* Quick Suggestion buttons footer block */}
            {messages.length === 1 && (
              <div className="px-4 py-2 bg-black/20 border-t border-white/5 text-left space-y-1.5">
                <span className="text-[10px] font-mono text-white/40 tracking-wider flex items-center gap-1">
                  <ArrowDownRight className="w-3 h-3 text-[#3b82f6]" />
                  <span>SUGGESTED QUESTIONS:</span>
                </span>
                <div className="flex flex-wrap gap-1.5 max-h-[70px] overflow-y-auto no-scrollbar pb-1">
                  {SUGGESTIONS.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleSendMessage(item.query)}
                      className="px-2.5 py-1.5 rounded-xl bg-white/5 border border-white/5 hover:border-[#8b5cf6]/40 hover:bg-[#8b5cf6]/10 text-[10px] font-medium text-white/70 hover:text-white transition-all cursor-pointer whitespace-nowrap block"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Chat Input area */}
            <div className="p-3 border-t border-white/5 bg-black/40">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage(inputValue);
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask me a question about Harshita..."
                  disabled={isLoading}
                  className="flex-1 px-4 py-2.5 rounded-2xl bg-[#050508]/50 border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-brand-purple disabled:opacity-50 transition-colors font-sans"
                />
                
                <button
                  type="submit"
                  disabled={isLoading || !inputValue.trim()}
                  className="p-2.5 rounded-2xl bg-gradient-to-tr from-brand-purple to-brand-blue text-white hover:opacity-95 active:scale-95 disabled:opacity-30 disabled:scale-100 transition-all cursor-pointer shrink-0"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
