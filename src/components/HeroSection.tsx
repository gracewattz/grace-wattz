import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Download } from "lucide-react";

const fullText = "Hi, I'm Grace Wattz.";

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
        // Blink cursor a few times then hide
        setTimeout(() => setShowCursor(false), 2000);
      }
    }, 70);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center pt-20">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-8 text-primary">
              {displayed}
              {showCursor && (
                <span className="inline-block w-[3px] h-[1em] bg-primary ml-1 animate-pulse align-middle" />
              )}
            </h1>

            <div className="flex flex-col items-center gap-4 text-muted-foreground">
              <a
                href="/Grace_Wattz_Resume.pdf"
                download
                className="inline-flex items-center gap-2 text-sm hover:text-primary transition-colors"
              >
                <Download size={14} />
                Download my resume
              </a>
              <a
                href="#projects"
                className="inline-flex items-center gap-2 text-sm hover:text-primary transition-colors"
              >
                <ArrowDown size={14} />
                Scroll to see what I've built
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
