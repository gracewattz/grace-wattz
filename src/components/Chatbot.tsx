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

  const keywords: Record<string, string[]> = {
    name: ["name", "who is", "whose", "about grace", "tell me about her"],
    education: ["education", "school", "university", "degree", "study", "studied", "college", "boulder", "colorado", "usiu"],
    likealocal: ["likealocal", "like a local", "travel app", "travel discovery"],
    brixit: ["brixit", "brix", "brick", "construction", "pitch deck", "investor"],
    fratmaps: ["frat map", "frat maps", "fratmaps", "college app", "social discovery"],
    "target roles": ["role", "looking for", "target", "job", "position", "opportunities", "hiring"],
    skills: ["skills", "abilities", "good at", "strengths", "capable", "tools"],
    experience: ["experience", "work history", "background", "career"],
    contact: ["contact", "email", "reach", "hire", "calendly", "schedule"],
    location: ["location", "where", "based", "live"],
    travel: ["travel", "asia", "solo", "vietnam"],
    resume: ["resume", "cv", "download"],
    "what makes her unique": ["unique", "different", "stand out", "special", "why hire", "why should"],
  };

  for (const [factKey, kws] of Object.entries(keywords)) {
    if (kws.some((kw) => q.includes(kw))) {
      return chatbotFacts[factKey] || "That information isn't available yet — but feel free to ask about Grace's projects, experience, or background.";
    }
  }

  if (/^(hi|hello|hey|sup|yo|greetings)/i.test(q)) {
    return "Hello! I can share details about Grace's projects, experience, education, and the types of roles she's pursuing. What would you like to know?";
  }

  return "Great question. I can provide information about Grace's projects (LikeALocal, BrixIt, Frat Maps), her education, skills, or the roles she's targeting. What interests you?";
};

const suggestedQuestions = [
  "Tell me about LikeALocal",
  "What did Grace do on Frat Maps?",
  "What is BrixIt?",
  "What roles is Grace looking for?",
  "Download her resume",
];

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      text: "Hello — I'm here to answer questions about Grace's background, projects, and experience. What would you like to know?",
    },
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

    // Handle resume download
    if (msg.toLowerCase().includes("resume") || msg.toLowerCase().includes("download")) {
      const userMsg: Message = { role: "user", text: msg };
      const botMsg: Message = {
        role: "bot",
        text: "Grace's resume is available for download from the homepage — look for the \"Download my resume\" link at the top of the page.",
      };
      setMessages((prev) => [...prev, userMsg, botMsg]);
      setInput("");
      return;
    }

    const userMsg: Message = { role: "user", text: msg };
    const botMsg: Message = { role: "bot", text: findAnswer(msg) };

    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput("");
  };

  return (
    <>
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

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] bg-background rounded-2xl overflow-hidden flex flex-col shadow-2xl border border-border"
            style={{ height: "500px" }}
          >
            {/* Header */}
            <div className="px-5 py-4 border-b border-border flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Bot size={16} className="text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Ask me about Grace.</p>
                <p className="text-xs text-muted-foreground">Projects · Experience · Background</p>
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
                    className={`max-w-[80%] px-4 py-2.5 rounded-xl text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground rounded-br-sm"
                        : "bg-secondary text-secondary-foreground rounded-bl-sm"
                    }`}
                  >
                    {msg.text}
                  </div>
                  {msg.role === "user" && (
                    <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center shrink-0 mt-1">
                      <User size={12} className="text-muted-foreground" />
                    </div>
                  )}
                </div>
              ))}

              {messages.length === 1 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {suggestedQuestions.map((q, i) => (
                    <button
                      key={i}
                      onClick={() => handleSend(q)}
                      className="px-3 py-1.5 rounded-full text-xs bg-secondary text-secondary-foreground border border-border hover:border-primary/40 transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-3 border-t border-border">
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
                  className="flex-1 bg-secondary text-foreground text-sm rounded-lg px-4 py-2.5 placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50"
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
