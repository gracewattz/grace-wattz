import { useState, useRef, useEffect } from "react";
import { Send, Bot, User } from "lucide-react";
import { chatbotFacts } from "@/data/resumeData";

interface Message {
  role: "user" | "bot";
  text: string;
}

const findAnswer = (query: string): string => {
  const q = query.toLowerCase().trim();

  const keywords: Record<string, string[]> = {
    name: ["name", "who is", "whose", "about grace", "tell me about her", "introduce", "overview"],
    education: ["education", "school", "university", "degree", "study", "studied", "college", "boulder", "colorado", "gpa", "scholarship", "coursework", "major", "minor", "italian", "international relations"],
    likealocal: ["likealocal", "like a local", "travel app", "travel discovery", "likelocal"],
    brixit: ["brixit", "brix", "brick", "lego", "pitch deck", "investor", "financial model", "e-commerce"],
    fratmaps: ["frat map", "frat maps", "fratmaps", "college app", "social discovery", "app store"],
    "target roles": ["role", "looking for", "target", "job", "position", "opportunities", "hiring", "open to", "next step", "seeking"],
    skills: ["skills", "abilities", "good at", "strengths", "capable", "tools", "software", "tech stack", "proficient"],
    marketing: ["marketing", "brand", "social media", "growth", "outreach", "campaigns", "customer", "audience"],
    leadership: ["leadership", "led", "managed", "team", "president", "founder", "manage", "supervise", "direct"],
    experience: ["experience", "work history", "background", "career", "work", "job history", "professional"],
    contact: ["contact", "email", "reach", "hire", "calendly", "schedule", "phone", "get in touch"],
    location: ["location", "where", "based", "live", "city", "san francisco"],
    travel: ["travel", "asia", "solo", "vietnam", "thailand", "italy", "abroad", "countries", "motorbike"],
    resume: ["resume", "cv", "download"],
    volunteering: ["volunteer", "thailand", "give volunteers", "permaculture", "teach", "english"],
    languages: ["language", "italian", "speak", "fluent", "bilingual"],
    pickleball: ["pickleball", "club", "president", "sport", "tournament"],
    bohemian: ["bohemian", "bohemian club", "grove", "intern", "servers", "dining", "hospitality"],
    personality: ["personality", "interests", "hobbies", "outside work", "fun", "snowboard", "climb", "ceramics", "cook", "podcast"],
    moxiceo: ["moxie", "moxi", "mox", "mortgage", "ceo", "personal assistant", "executive assistant", "current job", "current role"],
    "what makes her unique": ["unique", "different", "stand out", "special", "why hire", "why should", "best candidate", "what sets"],
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
  "Tell me about her leadership experience",
  "Has she done marketing?",
  "What is LikeALocal?",
  "What makes Grace unique?",
  "What roles is Grace targeting?",
];

const Chatbot = () => {
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

    if (msg.toLowerCase().includes("resume") || msg.toLowerCase().includes("download")) {
      const userMsg: Message = { role: "user", text: msg };
      const botMsg: Message = {
        role: "bot",
        text: 'Grace\'s resume is available for download — look for the "Download Resume" button at the bottom of this page.',
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
    <div
      className="w-full md:w-[380px] bg-card rounded-2xl overflow-hidden flex flex-col border border-primary/30 glow-border"
      style={{ height: "420px" }}
    >
      {/* Header */}
      <div className="px-5 py-3 border-b border-border flex items-center gap-3 bg-card">
        <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center">
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
              <div className="w-6 h-6 rounded-full bg-primary/15 flex items-center justify-center shrink-0 mt-1">
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

        {/* Suggested questions — shown only on initial state */}
        {messages.length === 1 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {suggestedQuestions.map((q, i) => (
              <button
                key={i}
                onClick={() => handleSend(q)}
                className="px-3 py-1.5 rounded-full text-xs border border-primary/40 text-primary hover:bg-primary/10 transition-colors"
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
    </div>
  );
};

export default Chatbot;
