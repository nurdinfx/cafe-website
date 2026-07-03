import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, Mic, MicOff, Volume2, VolumeX, RefreshCw } from 'lucide-react';

interface ChatbotProps {
  language: 'EN' | 'SO' | 'AR';
  setLanguage: (lang: 'EN' | 'SO' | 'AR') => void;
  setView: (view: string) => void;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
}

export default function Chatbot({ language, setLanguage, setView }: ChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: "Greetings, connoisseur. ✨ I am Aura's luxury AI Sommelier. I am here to curate your sensory journey: recommend bespoke single-origins, match artisanal food pairings, or guide you through reserving private tables. How may I elevate your day?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const historyToSend = messages.map(m => ({
        role: m.role,
        text: m.text
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: textToSend,
          history: historyToSend
        })
      });

      if (!res.ok) {
        throw new Error('API request failed');
      }

      const data = await res.json();
      
      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        role: 'model',
        text: data.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMsg]);

      // Voice synthesizes if not muted
      if (!isMuted && 'speechSynthesis' in window) {
        const cleanedText = data.text.replace(/[\*\_]/g, ''); // strip markdown formatting
        const utterance = new SpeechSynthesisUtterance(cleanedText);
        if (language === 'AR') utterance.lang = 'ar-SA';
        else if (language === 'SO') utterance.lang = 'so-SO';
        else utterance.lang = 'en-US';
        window.speechSynthesis.speak(utterance);
      }

    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, {
        id: `err-${Date.now()}`,
        role: 'model',
        text: "Pardon me, my system seems briefly oversaturated like an over-extracted espresso. Could we try that again?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSpeechRecognition = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert("Voice input is not fully supported in this browser's container environment, but I am listening in spirit!");
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRec();
    recognition.continuous = false;
    
    if (language === 'AR') recognition.lang = 'ar-SA';
    else if (language === 'SO') recognition.lang = 'so-SO';
    else recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      const speechToText = event.results[0][0].transcript;
      setInput(speechToText);
      setIsListening(false);
      // Auto send
      handleSend(speechToText);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const quickReplies = [
    { text: "🌟 Recommend a signature", label: "Signature" },
    { text: "☕ Match with croissants?", label: "Croissant Pairing" },
    { text: "📅 Let's book a table", label: "Table Booking" },
    { text: "🇸🇴 Somali Help", label: "Somali" },
    { text: "🇸🇦 بالعربية", label: "Arabic" }
  ];

  const handleQuickReply = (reply: typeof quickReplies[0]) => {
    if (reply.label === "Somali") {
      setLanguage('SO');
      handleSend("Kala hadal Soomaali");
    } else if (reply.label === "Arabic") {
      setLanguage('AR');
      handleSend("تحدث باللغة العربية");
    } else if (reply.label === "Table Booking") {
      setView('reserve');
      setIsOpen(false);
    } else {
      handleSend(reply.text);
    }
  };

  return (
    <div id="ai-chatbot-root" className="fixed bottom-6 right-6 z-50">
      {/* Floating Button */}
      {!isOpen && (
        <button
          id="chatbot-launcher-btn"
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-gradient-to-tr from-orange to-gold flex items-center justify-center text-brand-gray glow-gold shadow-2xl hover:scale-110 active:scale-95 transition-all cursor-pointer relative group"
        >
          <MessageSquare className="w-6 h-6 shrink-0" />
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
          </span>
          {/* Tooltip */}
          <span className="absolute right-16 bg-brand-slate text-gold border border-gold/20 text-xs py-1.5 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-mono pointer-events-none">
            Aura AI Sommelier
          </span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          id="chatbot-window"
          className="w-[360px] sm:w-[400px] h-[550px] rounded-3xl bg-brand-slate border border-white/10 shadow-2xl overflow-hidden flex flex-col backdrop-blur-md glow-gold"
        >
          {/* Header */}
          <div className="p-4 bg-brand-gray border-b border-white/10 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-orange to-gold flex items-center justify-center font-bold">
                ✨
              </div>
              <div>
                <h3 className="font-display font-bold text-sm text-white flex items-center">
                  Aura AI Sommelier <Sparkles className="w-3 h-3 text-gold ml-1.5 animate-pulse" />
                </h3>
                <span className="text-[10px] font-mono text-gold block">
                  Luxury Coffee Concierge
                </span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              {/* Mute toggle */}
              <button
                id="chatbot-mute-toggle"
                onClick={() => setIsMuted(!isMuted)}
                className="p-1.5 rounded-lg text-white/50 hover:text-gold hover:bg-white/5 transition-colors"
                title={isMuted ? "Unmute vocal reply" : "Mute vocal reply"}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-gold" />}
              </button>
              
              {/* Reset chat */}
              <button
                id="chatbot-reset-btn"
                onClick={() => setMessages([
                  {
                    id: 'welcome',
                    role: 'model',
                    text: "Greetings, connoisseur. ✨ How can I elevate your luxury coffee experience today?",
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                  }
                ])}
                className="p-1.5 rounded-lg text-white/50 hover:text-gold hover:bg-white/5 transition-colors"
                title="Reset conversation"
              >
                <RefreshCw className="w-4 h-4" />
              </button>

              <button
                id="chatbot-close-btn"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages list */}
          <div id="chatbot-messages-list" className="flex-1 p-4 overflow-y-auto space-y-4 bg-brand-gray/30">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-tr from-orange to-gold text-brand-gray font-semibold rounded-tr-none shadow-md'
                      : 'bg-brand-slate text-white/90 border border-white/5 rounded-tl-none'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                  <span className={`block text-[9px] mt-1.5 text-right font-mono ${msg.role === 'user' ? 'text-brand-gray/60' : 'text-white/30'}`}>
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-brand-slate border border-white/5 rounded-2xl rounded-tl-none px-4 py-3">
                  {/* Glowing Coffee Cup Loader */}
                  <div className="flex items-center space-x-1.5">
                    <span className="text-sm animate-bounce">☕</span>
                    <div className="flex space-x-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-gold animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-1.5 h-1.5 rounded-full bg-gold animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-1.5 h-1.5 rounded-full bg-gold animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Audio Input Waveform overlay when listening */}
          {isListening && (
            <div className="p-3 bg-gold/10 border-t border-gold/20 flex flex-col items-center space-y-2">
              <span className="text-xs text-gold font-mono tracking-wider animate-pulse uppercase">
                AI Listening to Voice...
              </span>
              <div className="flex items-end justify-center space-x-1 h-8">
                <div className="w-1 bg-gold rounded animate-pulse" style={{ height: '40%', animationDuration: '0.6s' }} />
                <div className="w-1 bg-gold rounded animate-pulse" style={{ height: '90%', animationDuration: '0.4s' }} />
                <div className="w-1 bg-gold rounded animate-pulse" style={{ height: '60%', animationDuration: '0.7s' }} />
                <div className="w-1 bg-gold rounded animate-pulse" style={{ height: '100%', animationDuration: '0.3s' }} />
                <div className="w-1 bg-gold rounded animate-pulse" style={{ height: '30%', animationDuration: '0.5s' }} />
              </div>
            </div>
          )}

          {/* Quick replies slider */}
          <div className="p-2 overflow-x-auto whitespace-nowrap bg-brand-gray/50 border-t border-white/5 flex gap-2">
            {quickReplies.map((reply, idx) => (
              <button
                key={idx}
                id={`chatbot-quick-${idx}`}
                onClick={() => handleQuickReply(reply)}
                className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-gold/10 hover:text-gold text-[10px] font-medium text-white/80 border border-white/10 transition-colors"
              >
                {reply.label}
              </button>
            ))}
          </div>

          {/* Form Input */}
          <div className="p-3 bg-brand-gray border-t border-white/10 flex items-center space-x-2">
            {/* Mic trigger */}
            <button
              id="chatbot-mic-btn"
              onClick={toggleSpeechRecognition}
              className={`p-2.5 rounded-xl transition-all ${
                isListening ? 'bg-orange text-white glow-orange animate-pulse' : 'bg-white/5 text-white hover:text-gold hover:bg-white/10'
              }`}
              title="Voice Input"
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>

            <input
              id="chatbot-text-input"
              type="text"
              placeholder="Ask for recommendations..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSend(input);
              }}
              className="flex-1 bg-brand-slate text-xs border border-white/10 rounded-xl px-4 py-2.5 focus:outline-none focus:border-gold text-white"
            />
            
            <button
              id="chatbot-send-btn"
              onClick={() => handleSend(input)}
              className="p-2.5 rounded-xl bg-gradient-to-tr from-orange to-gold text-brand-gray hover:scale-105 active:scale-95 transition-transform"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
