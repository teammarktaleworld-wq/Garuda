"use client";

// ─────────────────────────────────────────────────────────────────────────────
// GarudChatbot.tsx — Single-file AI Chatbot for Garud Tata
// Drop this file anywhere in your project and import it.
// Requires: framer-motion, lucide-react (already in your project)
// API route at /app/api/chat/route.ts handles Groq — see below.
// ─────────────────────────────────────────────────────────────────────────────

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  KeyboardEvent,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Phone, MessageCircle } from "lucide-react";

// ─── Dealership Config ────────────────────────────────────────────────────────
// Update this object to change chatbot info without touching any logic.

const DEALERSHIP = {
  name: "Garud Tata",
  type: "Authorized Tata Motors Dealer",
  city: "New Delhi",
  address:
    "Sales-Garg Plaza, RZ A70, Dabri - Palam Rd, Main Shiv Market, Palam, New Delhi, Delhi - 110045",
  phone: "+91 98765 43210",
  whatsapp: "919876543210",
  email: "info@garudtata.com",
  googleMapsUrl:
    "https://maps.google.com/?q=RZ+A70,Dabri+Palam+Rd,Main+Shiv+Market,Palam,New+Delhi,Delhi+110045",
  hours: {
    weekdays: "9:00 AM – 7:00 PM",
    saturday: "9:00 AM – 6:00 PM",
    sunday: "10:00 AM – 4:00 PM",
  },
};

// ─── Types ────────────────────────────────────────────────────────────────────

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

// ─── Quick Actions & Suggestions ─────────────────────────────────────────────

const QUICK_ACTIONS = [
  { icon: "🚗", label: "Explore Cars", message: "Show me all available Tata cars at Garud Tata." },
  { icon: "⚖️", label: "Compare Cars", message: "I want to compare two Tata cars." },
  { icon: "🧪", label: "Test Drive", message: "I want to book a test drive." },
  { icon: "💰", label: "View Offers", message: "What offers are currently available at Garud Tata?" },
  { icon: "📍", label: "Find Showroom", message: "Where is Garud Tata located? How can I visit?" },
  { icon: "📞", label: "Contact Us", message: "How can I contact Garud Tata?" },
];

const POPULAR_QUESTIONS = [
  "Which Tata SUV is best for a family?",
  "What Tata cars are available under ₹10 lakh?",
  "Compare Harrier and Safari",
  "Bhai 12 lakh ke andar best Tata car kaunsi hai?",
  "Do you have any EV options?",
];

// ─── Markdown Renderer ────────────────────────────────────────────────────────

function inlineFormat(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[.+?\]\(.+?\))/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**"))
      return <strong key={i} className="font-semibold">{part.slice(2, -2)}</strong>;
    if (part.startsWith("*") && part.endsWith("*"))
      return <em key={i}>{part.slice(1, -1)}</em>;
    if (part.startsWith("`") && part.endsWith("`"))
      return <code key={i} className="bg-white/10 px-1 py-0.5 rounded text-xs font-mono">{part.slice(1, -1)}</code>;
    const linkMatch = part.match(/\[(.+?)\]\((.+?)\)/);
    if (linkMatch)
      return <a key={i} href={linkMatch[2]} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 opacity-90 hover:opacity-100">{linkMatch[1]}</a>;
    return part;
  });
}

function MarkdownRenderer({ content, isUser = false }: { content: string; isUser?: boolean }) {
  const textColor = isUser ? "text-white" : "text-gray-100";
  const lines = content.split("\n");

  const renderLine = (line: string, idx: number): React.ReactNode => {
    if (line.startsWith("### ") || line.startsWith("## ") || line.startsWith("# ")) {
      const sliceAt = line.startsWith("### ") ? 4 : line.startsWith("## ") ? 3 : 2;
      return <p key={idx} className={`font-bold text-sm mt-2 mb-1 ${textColor}`}>{inlineFormat(line.slice(sliceAt))}</p>;
    }
    if (line.startsWith("- ") || line.startsWith("• "))
      return (
        <div key={idx} className="flex gap-2 my-0.5">
          <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${isUser ? "bg-white/70" : "bg-blue-400"}`} />
          <span className={`text-sm leading-relaxed ${textColor}`}>{inlineFormat(line.slice(2))}</span>
        </div>
      );
    const num = line.match(/^(\d+)\.\s(.+)/);
    if (num)
      return (
        <div key={idx} className="flex gap-2 my-0.5">
          <span className={`text-xs font-bold flex-shrink-0 mt-0.5 ${isUser ? "text-white/70" : "text-blue-400"}`}>{num[1]}.</span>
          <span className={`text-sm leading-relaxed ${textColor}`}>{inlineFormat(num[2])}</span>
        </div>
      );
    if (line === "---" || line === "***")
      return <hr key={idx} className={`my-2 border-t ${isUser ? "border-white/20" : "border-white/10"}`} />;
    if (line.trim() === "") return <div key={idx} className="h-1.5" />;
    return <p key={idx} className={`text-sm leading-relaxed ${textColor}`}>{inlineFormat(line)}</p>;
  };

  return <div className="space-y-0.5">{lines.map(renderLine)}</div>;
}

// ─── Spark Icon (shared) ──────────────────────────────────────────────────────

function SparkIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 2L13.5 7.5H19L14.5 11L16 16.5L12 13.5L8 16.5L9.5 11L5 7.5H10.5L12 2Z" fill="white" />
    </svg>
  );
}

// ─── Typing Indicator ─────────────────────────────────────────────────────────

function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 6 }}
      className="flex items-start gap-2.5"
    >
      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-lg shadow-blue-500/20">
        <SparkIcon size={14} />
      </div>
      <div className="bg-[#1e2535] border border-white/5 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
        <div className="flex items-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-blue-400"
              animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1, 0.8] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2, ease: "easeInOut" }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Chat Message ─────────────────────────────────────────────────────────────

function formatTime(date: Date) {
  return date.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
}

function ChatMessage({ message }: { message: Message }) {
  const isUser = message.role === "user";

  if (isUser) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="flex justify-end"
      >
        <div className="max-w-[80%] group">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl rounded-tr-sm px-4 py-2.5 shadow-lg shadow-blue-500/20">
            <MarkdownRenderer content={message.content} isUser />
          </div>
          <p className="text-[10px] text-gray-500 mt-1 text-right pr-1 opacity-0 group-hover:opacity-100 transition-opacity">
            {formatTime(message.timestamp)}
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="flex items-start gap-2.5"
    >
      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-lg shadow-blue-500/20">
        <SparkIcon size={12} />
      </div>
      <div className="max-w-[80%] group">
        <div className="bg-[#1e2535] border border-white/5 rounded-2xl rounded-tl-sm px-4 py-2.5 shadow-sm">
          <MarkdownRenderer content={message.content} />
        </div>
        <p className="text-[10px] text-gray-500 mt-1 pl-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {formatTime(message.timestamp)}
        </p>
      </div>
    </motion.div>
  );
}

// ─── Welcome / Empty State ────────────────────────────────────────────────────

function WelcomeState({ onSend }: { onSend: (msg: string) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center px-3 py-4 gap-5"
    >
      {/* Greeting */}
      <div className="text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
          className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center mx-auto mb-3 shadow-xl shadow-blue-500/30"
        >
          <SparkIcon size={24} />
        </motion.div>
        <motion.h3
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="text-white font-semibold text-base"
        >
          Hi! I'm Garud AI 👋
        </motion.h3>
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-gray-400 text-xs mt-1 leading-relaxed"
        >
          Your virtual Tata Motors assistant.
          <br />
          Find the perfect car, compare models,
          <br />
          book a test drive, and more.
        </motion.p>
      </div>

      {/* Quick actions */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="w-full"
      >
        <p className="text-[10px] uppercase tracking-widest text-gray-500 font-semibold mb-2 px-1">
          Quick Actions
        </p>
        <div className="grid grid-cols-2 gap-2">
          {QUICK_ACTIONS.map((action, i) => (
            <motion.button
              key={action.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28 + i * 0.05 }}
              onClick={() => onSend(action.message)}
              className="flex items-center gap-2 bg-[#1e2535] hover:bg-[#252d42] border border-white/5 hover:border-blue-500/30 rounded-xl px-3 py-2.5 text-left transition-all group cursor-pointer"
            >
              <span className="text-base">{action.icon}</span>
              <span className="text-gray-300 text-xs font-medium group-hover:text-white transition-colors">
                {action.label}
              </span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Popular questions */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="w-full"
      >
        <p className="text-[10px] uppercase tracking-widest text-gray-500 font-semibold mb-2 px-1">
          Popular Questions
        </p>
        <div className="flex flex-col gap-1.5">
          {POPULAR_QUESTIONS.map((q, i) => (
            <motion.button
              key={q}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.52 + i * 0.04 }}
              onClick={() => onSend(q)}
              className="flex items-center gap-2 text-left bg-[#1a2030] hover:bg-[#1e2535] border border-white/[0.04] hover:border-blue-500/20 rounded-xl px-3 py-2 transition-all group cursor-pointer"
            >
              <span className="text-blue-400/60 text-xs">→</span>
              <span className="text-gray-400 text-xs group-hover:text-gray-200 transition-colors">{q}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Chat Input ───────────────────────────────────────────────────────────────

const MAX_CHARS = 800;

function ChatInput({ onSend, isLoading }: { onSend: (msg: string) => void; isLoading: boolean }) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 120) + "px";
  }, [value]);

  const handleSend = () => {
    const trimmed = value.trim();
    if (!trimmed || isLoading) return;
    onSend(trimmed);
    setValue("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
  };

  const handleKey = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  const canSend = value.trim().length > 0 && !isLoading && value.length <= MAX_CHARS;
  const overLimit = value.length > MAX_CHARS;

  return (
    <div className="border-t border-white/5 bg-[#0f1521]/95 backdrop-blur-sm px-3 py-3">
      <div className={`flex items-end gap-2 bg-[#1a2030] border rounded-2xl px-3 py-2 transition-all ${overLimit ? "border-red-500/50" : "border-white/[0.08] focus-within:border-blue-500/40"}`}>
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Ask Garud AI anything..."
          rows={1}
          disabled={isLoading}
          className="flex-1 bg-transparent text-gray-200 text-sm placeholder:text-gray-500 resize-none outline-none leading-relaxed max-h-[120px] overflow-y-auto"
          style={{ minHeight: "24px" }}
        />
        <div className="flex items-center gap-2 pb-0.5 flex-shrink-0">
          {value.length > MAX_CHARS * 0.75 && (
            <span className={`text-[10px] ${overLimit ? "text-red-400" : "text-gray-500"}`}>
              {value.length}/{MAX_CHARS}
            </span>
          )}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleSend}
            disabled={!canSend}
            className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${canSend ? "bg-blue-500 hover:bg-blue-400 shadow-lg shadow-blue-500/30" : "bg-white/5 cursor-not-allowed"}`}
          >
            {isLoading ? (
              <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className={canSend ? "text-white" : "text-gray-600"}>
                <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </motion.button>
        </div>
      </div>
      <p className="text-[10px] text-gray-600 text-center mt-2">
        Shift+Enter for new line · Prices shown are approximate
      </p>
    </div>
  );
}

// ─── Chat Window ──────────────────────────────────────────────────────────────

function ChatWindow({ onClose, onMinimize, messages, isLoading, isTyping, sendMessage }: {
  onClose: () => void;
  onMinimize: () => void;
  messages: Message[];
  isLoading: boolean;
  isTyping: boolean;
  sendMessage: (msg: string) => void;
}) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const whatsappUrl = `https://wa.me/${DEALERSHIP.whatsapp}?text=Hi%2C%20I%20visited%20Garud%20Tata%20website%20and%20need%20assistance.`;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.88, y: 16 }}
      transition={{ type: "spring", stiffness: 300, damping: 28 }}
      className="fixed bottom-24 right-4 z-50 w-[calc(100vw-2rem)] max-w-[420px] sm:w-[420px] h-[600px] max-h-[calc(100dvh-7rem)] flex flex-col rounded-2xl overflow-hidden shadow-2xl shadow-black/60 border border-white/[0.08]"
      style={{ background: "linear-gradient(180deg, #0d1520 0%, #0f1521 100%)" }}
    >
      {/* Header */}
      <div
        className="flex items-center gap-3 px-4 py-3.5 flex-shrink-0 relative"
        style={{ background: "linear-gradient(135deg, #0a1628 0%, #0e1d35 50%, #0a1628 100%)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="absolute inset-0 bg-blue-500/5 pointer-events-none" />

        {/* Avatar */}
        <div className="relative flex-shrink-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-500/30">
            <SparkIcon size={16} />
          </div>
          <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-[#0a1628]" />
        </div>

        {/* Title */}
        <div className="flex-1 min-w-0">
          <p className="text-white font-semibold text-sm leading-tight">Garud Tata AI</p>
          <p className="text-gray-400 text-[11px] leading-tight">
            <span className="text-green-400">●</span> Online · Your Tata car assistant
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1">
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer"
            className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:text-green-400 hover:bg-white/5 transition-all" title="WhatsApp Garud Tata">
            <MessageCircle size={14} />
          </a>
          <a href={`tel:${DEALERSHIP.phone}`}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:text-blue-400 hover:bg-white/5 transition-all" title={`Call: ${DEALERSHIP.phone}`}>
            <Phone size={13} />
          </a>
          <button onClick={onMinimize} className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 transition-all cursor-pointer">
            <Minus size={14} />
          </button>
          <button onClick={onClose} className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 transition-all cursor-pointer">
            <X size={14} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div
        className="flex-1 overflow-y-auto px-3 py-3 space-y-3 scroll-smooth"
        style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(255,255,255,0.08) transparent" }}
      >
        <AnimatePresence mode="popLayout">
          {messages.length === 0
            ? <WelcomeState key="welcome" onSend={sendMessage} />
            : messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)
          }
          {isTyping && <TypingIndicator key="typing" />}
        </AnimatePresence>
        <div ref={bottomRef} />
      </div>

      {/* Contact strip */}
      {messages.length > 0 && (
        <div className="flex items-center justify-center gap-3 px-4 py-2 border-t border-white/[0.04]">
          <a href={`tel:${DEALERSHIP.phone}`} className="flex items-center gap-1.5 text-[11px] text-gray-500 hover:text-blue-400 transition-colors">
            <Phone size={10} /> Call Garud Tata
          </a>
          <span className="text-gray-700">·</span>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-[11px] text-gray-500 hover:text-green-400 transition-colors">
            <MessageCircle size={10} /> WhatsApp
          </a>
          <span className="text-gray-700">·</span>
          <a href={DEALERSHIP.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="text-[11px] text-gray-500 hover:text-orange-400 transition-colors">
            📍 Directions
          </a>
        </div>
      )}

      {/* Input */}
      <ChatInput onSend={sendMessage} isLoading={isLoading} />
    </motion.div>
  );
}

// ─── Floating Button ──────────────────────────────────────────────────────────

function ChatButton({ isOpen, onClick, hasUnread = false }: { isOpen: boolean; onClick: () => void; hasUnread?: boolean }) {
  return (
    <motion.div
      className="fixed bottom-5 right-5 z-50 flex flex-col items-center gap-2"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.8 }}
    >
      <AnimatePresence>
        {!isOpen && (
          <motion.span
            initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 4 }}
            className="text-[11px] font-medium text-gray-400 whitespace-nowrap select-none"
          >
            AI Assistant
          </motion.span>
        )}
      </AnimatePresence>

      {/* Pulse rings */}
      {!isOpen && (
        <>
          <motion.span className="absolute w-14 h-14 rounded-full bg-blue-500/20 pointer-events-none"
            animate={{ scale: [1, 1.5, 1.5], opacity: [0.6, 0, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }} />
          <motion.span className="absolute w-14 h-14 rounded-full bg-blue-500/10 pointer-events-none"
            animate={{ scale: [1, 1.8, 1.8], opacity: [0.4, 0, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 0.3 }} />
        </>
      )}

      <motion.button
        onClick={onClick}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.93 }}
        className="relative w-14 h-14 rounded-2xl flex items-center justify-center cursor-pointer shadow-xl shadow-blue-500/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
        style={{
          background: isOpen ? "linear-gradient(135deg, #1e2535, #252d42)" : "linear-gradient(135deg, #1d6ff5, #0f52c4)",
          border: "1px solid rgba(255,255,255,0.12)",
        }}
        aria-label={isOpen ? "Close chat" : "Open Garud Tata AI chat"}
      >
        {!isOpen && <div className="absolute inset-0 rounded-2xl bg-blue-400/20 blur-md pointer-events-none" />}

        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.svg key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}
              width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </motion.svg>
          ) : (
            <motion.svg key="spark" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18 }}
              width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L13.5 7.5H19L14.5 11L16 16.5L12 13.5L8 16.5L9.5 11L5 7.5H10.5L12 2Z" fill="white" />
              <circle cx="19" cy="4" r="1.2" fill="rgba(255,255,255,0.7)" />
              <circle cx="21" cy="9" r="0.8" fill="rgba(255,255,255,0.5)" />
              <circle cx="5" cy="3" r="0.8" fill="rgba(255,255,255,0.5)" />
            </motion.svg>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {hasUnread && !isOpen && (
            <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
              className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-[#0f1521] text-[9px] text-white font-bold flex items-center justify-center">
              1
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </motion.div>
  );
}

// ─── useChatbot Hook (inlined) ────────────────────────────────────────────────

function useChatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || isLoading) return;

    const userMsg: Message = { id: `u-${Date.now()}`, role: "user", content: content.trim(), timestamp: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);
    setIsLoading(true);

    const history = [...messages, userMsg].map((m) => ({ role: m.role, content: m.content }));
    const assistantId = `a-${Date.now()}`;
    abortRef.current = new AbortController();

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
        signal: abortRef.current.signal,
      });

      setIsTyping(false);

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Something went wrong. Please try again.");
      }
      if (!res.body) throw new Error("No response body");

      setMessages((prev) => [...prev, { id: assistantId, role: "assistant", content: "", timestamp: new Date() }]);

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let fullText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        fullText += decoder.decode(value, { stream: true });
        setMessages((prev) => prev.map((m) => m.id === assistantId ? { ...m, content: fullText } : m));
      }
    } catch (err: unknown) {
      setIsTyping(false);
      if (err instanceof Error && err.name === "AbortError") return;
      const msg = err instanceof Error ? err.message : "Sorry, I'm having trouble connecting. Please try again or contact Garud Tata directly.";
      setMessages((prev) => [...prev, { id: `err-${Date.now()}`, role: "assistant", content: msg, timestamp: new Date() }]);
    } finally {
      setIsLoading(false);
      setIsTyping(false);
    }
  }, [messages, isLoading]);

  return { messages, isLoading, isTyping, sendMessage };
}

// ─── Root Export ──────────────────────────────────────────────────────────────

export default function GarudChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const { messages, isLoading, isTyping, sendMessage } = useChatbot();

  useEffect(() => {
    const isMobile = window.innerWidth < 640;
    if (isMobile && isOpen && !isMinimized) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen, isMinimized]);

  const showWindow = isOpen && !isMinimized;

  return (
    <>
      <AnimatePresence>
        {showWindow && (
          <ChatWindow
            key="chat-window"
            onClose={() => { setIsOpen(false); setIsMinimized(false); }}
            onMinimize={() => { setIsMinimized(true); setIsOpen(false); }}
            messages={messages}
            isLoading={isLoading}
            isTyping={isTyping}
            sendMessage={sendMessage}
          />
        )}
      </AnimatePresence>

      <ChatButton
        isOpen={showWindow}
        onClick={() => { setIsOpen(!showWindow); setIsMinimized(false); }}
        hasUnread={isMinimized}
      />
    </>
  );
}