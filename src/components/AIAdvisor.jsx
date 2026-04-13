import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, Sparkles } from 'lucide-react';

export default function AIAdvisor() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, type: 'bot', text: 'Hi there! I am your AI Risk Advisor. I scan your portfolio for vulnerabilities. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = { id: Date.now(), type: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, {
        id: Date.now(),
        type: 'bot',
        text: "Based on my analysis, adding a comprehensive rider to your car policy would cover 98% of typical urban damages. Would you like me to simulate that?"
      }]);
    }, 1500);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 w-80 md:w-96 bg-white rounded-3xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden z-50 origin-bottom-right"
          >
            {/* Header */}
            <div className="bg-brand-blue p-4 flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-full">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-sm flex items-center gap-1">AI Risk Advisor <Sparkles className="w-3 h-3 text-orange-400" /></h3>
                  <p className="text-[10px] text-blue-200">Online & Analyzing</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Body */}
            <div className="h-80 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${msg.type === 'user' ? 'bg-brand-blue text-white rounded-tr-sm' : 'bg-white border border-gray-100 shadow-sm text-gray-700 rounded-tl-sm'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                   <div className="bg-white border border-gray-100 shadow-sm rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1 items-center">
                     <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                     <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                     <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                   </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Footer */}
            <div className="p-3 bg-white border-t border-gray-100">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about your coverage..."
                  className="w-full bg-gray-100 text-sm rounded-full py-3 pl-4 pr-12 outline-none focus:ring-2 focus:ring-brand-blue/20 transition-all font-medium text-gray-700"
                />
                <button
                  onClick={handleSend}
                  className="absolute right-1 top-1/2 -translate-y-1/2 w-8 h-8 bg-brand-blue rounded-full text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-md"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <div className="text-center mt-2">
                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Powered by RiskEngine AI</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-brand-blue hover:bg-brand-indigo rounded-full shadow-2xl shadow-brand-blue/40 flex items-center justify-center text-white transition-all hover:scale-110 active:scale-95 z-50 group"
      >
        <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-orange-400 animate-pulse" />
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6 group-hover:-rotate-12 transition-transform" />}
      </button>
    </>
  );
}
