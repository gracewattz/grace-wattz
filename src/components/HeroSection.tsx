import { motion } from "framer-motion";
import { ArrowDown, MapPin } from "lucide-react";
import { resumeData } from "@/data/resumeData";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden grid-bg">
      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "1.5s" }} />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-2 mb-6"
          >
            <div className="w-3 h-3 rounded-full bg-primary animate-pulse-glow" />
            <span className="text-sm font-mono text-primary">Open to opportunities</span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
            Hi, I'm{" "}
            <span className="text-gradient">{resumeData.name}</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-4 font-light">
            {resumeData.title}
          </p>

          <p className="text-base text-muted-foreground/80 mb-6 max-w-xl">
            {resumeData.tagline}
          </p>

          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-10">
            <MapPin size={14} className="text-primary" />
            <span>{resumeData.location}</span>
          </div>

          <div className="flex flex-wrap gap-4">
            <a
              href="#projects"
              className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition"
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="px-6 py-3 rounded-lg border border-border hover:border-primary/50 text-foreground transition"
            >
              Contact Me
            </a>
          </div>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <ArrowDown size={20} className="text-muted-foreground" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
