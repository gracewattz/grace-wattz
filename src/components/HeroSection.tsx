import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { Link } from "react-router-dom";
import Chatbot from "./Chatbot";

const fullText = "Hi, I'm Grace Wattz.";

const promptHints = [
  "→ Tell me about her leadership",
  "→ Has she done marketing?",
  "→ What projects has she built?",
  "→ What roles is she targeting?",
];

const HeroSection = () => {
  const [displayed, setDisplayed] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(fullText.slice(0, i));
      if (i >= fullText.length) {
        clearInterval(interval);
        setTimeout(() => setShowCursor(false), 2000);
      }
    }, 110); // slowed down from 70ms
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="min-h-screen flex flex-col items-center pt-24 pb-16 px-6">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center mb-14"
      >
        <h1 className="text-5xl md:text-7xl font-bold leading-tight text-primary text-glow">
          {displayed}
          {showCursor && (
            <span className="inline-block w-[3px] h-[1em] bg-primary ml-1 animate-pulse align-middle" />
          )}
        </h1>
      </motion.div>

      {/* Chatbot area — centered, with promotional glow background */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="flex-1 flex items-center justify-center w-full"
      >
        <div
          className="relative rounded-3xl p-8 md:p-10 promo-glow"
          style={{
            background:
              "radial-gradient(ellipse at center, hsl(224 100% 50% / 0.06) 0%, hsl(224 100% 30% / 0.03) 50%, transparent 75%)",
            border: "1px solid hsl(224 100% 50% / 0.1)",
          }}
        >
          <div className="flex flex-col md:flex-row items-start gap-8">
            {/* Left: label + prompt hints */}
            <div className="flex flex-col gap-4 md:pt-4 md:max-w-[200px]">
              <p className="text-xl font-bold text-primary leading-snug">
                Ask me about Grace
              </p>
              <div className="flex flex-col gap-2">
                {promptHints.map((hint, i) => (
                  <span key={i} className="text-xs text-muted-foreground leading-relaxed">
                    {hint}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: Chatbot panel */}
            <Chatbot />
          </div>
        </div>
      </motion.div>

      {/* Bottom: Download Resume + CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="flex flex-col items-center gap-3 mt-12"
      >
        <a
          href="/Grace_Wattz_Resume.pdf"
          download
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-primary/50 text-sm text-primary hover:bg-primary/10 transition-colors"
        >
          <Download size={14} />
          Download Resume
        </a>
        <Link
          to="/projects"
          className="text-xs text-muted-foreground hover:text-primary transition-colors"
        >
          Tap to see what I've built →
        </Link>
      </motion.div>
    </section>
  );
};

export default HeroSection;
