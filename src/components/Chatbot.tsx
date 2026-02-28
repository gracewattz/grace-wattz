import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import { chatbotFacts } from "@/data/resumeData";

interface Message {
  role: "user" | "bot";
  text: string;
}

const findAnswer = (query: string): string => {
  const q = query.toLowerCase().trim();

  // Direct keyword matching
  const keywords: Record<string, string[]> = {
    name: ["name", "who are you", "who is", "whose"],
    education: ["education", "school", "university", "degree", "study", "studied", "college", "major"],
    gpa: ["gpa", "grades", "honors", "cum laude"],
    "current role": ["current", "doing now", "work now", "currently"],
    brixit: ["brixit", "brick", "construction", "logistics", "delivery"],
    likealocal: ["likealocal", "like a local", "travel", "tourist", "local experience"],
    skills: ["skills", "abilities", "good at", "strengths", "capable"],
    languages: ["language", "speak", "swahili", "english"],
    certifications: ["certification", "certificate", "certified", "google", "hubspot"],
    interests: ["interests", "hobbies", "passionate", "enjoy"],
    experience: ["experience", "work history", "background", "career"],
    marketing: ["marketing", "digital", "social media", "content", "brand"],
    "what makes her unique": ["unique", "different", "stand out", "special", "why hire", "why should"],
    contact: ["contact", "email", "reach", "hire"],
    location: ["location", "where", "based", "live", "nairobi", "kenya"],
    school: ["usiu", "university"],
    "target roles": ["looking for", "target", "roles", "job", "position", "opportunities"],
  };

  for (const [factKey, kws] of Object.entries(keywords)) {
    if (kws.some((kw) => q.includes(kw))) {
      return chatbotFacts[factKey] || "I don't have that information yet.";
    }
  }

  // Greeting
  if (/^(hi|hello|hey|sup|yo|greetings)/i.test(q)) {
    return "Hey! 👋 I'm Grace's portfolio assistant. Ask me about her education, experience, projects, skills, or anything on her resume!";
  }

  return "Great question! I can tell you about Grace's education, experience, projects (Brixit, LikeaLocal), skills, certifications, or contact info. What would you like to know?";
};

const suggestedQuestions = [
  "What's her education?",
  "Tell me about Brixit",
  "What are her skills?",
  "What roles is she targeting?",
];

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: "Hi! 👋 I'm Grace's portfolio assistant. Ask me anything about her background, experience, or skills!" },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = (text?: string) => {
    const msg = text || input.trim();
    if (!msg) return;

    const userMsg: Message = { role: "user", text: msg };
    const botMsg: Message = { role: "bot", text: findAnswer(msg) };

    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput("");
  };

  return (
    <>
      {/* FAB */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring" }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg hover:opacity-90 transition"
        aria-label="Chat with Grace's assistant"
      >
        {isOpen ? <X size={22} /> : <MessageCircle size={22} />}
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] glass rounded-2xl overflow-hidden flex flex-col shadow-2xl"
            style={{ height: "480px" }}
          >
            {/* Header */}
            <div className="px-5 py-4 border-b border-border/50 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Bot size={16} className="text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold">Ask About Grace</p>
                <p className="text-xs text-muted-foreground">Resume facts & info</p>
              </div>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-2 ${msg.role === "user" ? "justify-end" : ""}`}>
                  {msg.role === "bot" && (
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                      <Bot size={12} className="text-primary" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] px-4 py-2.5 rounded-xl text-sm ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground rounded-br-sm"
                        : "bg-secondary text-secondary-foreground rounded-bl-sm"
                    }`}
                  >
                    {msg.text}
                  </div>
                  {msg.role === "user" && (
                    <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center shrink-0 mt-1">
                      <User size={12} className="text-accent" />
                    </div>
                  )}
                </div>
              ))}

              {/* Suggested questions (only show if 1 message) */}
              {messages.length === 1 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {suggestedQuestions.map((q, i) => (
                    <button
                      key={i}
                      onClick={() => handleSend(q)}
                      className="px-3 py-1.5 rounded-full text-xs bg-secondary text-secondary-foreground border border-border hover:border-primary/30 transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-3 border-t border-border/50">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-center gap-2"
              >
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about Grace..."
                  className="flex-1 bg-secondary/50 text-foreground text-sm rounded-lg px-4 py-2.5 placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50"
                />
                <button
                  type="submit"
                  className="w-9 h-9 rounded-lg bg-primary text-primary-foreground flex items-center justify-center hover:opacity-90 transition shrink-0"
                >
                  <Send size={14} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
