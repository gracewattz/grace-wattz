import { motion } from "framer-motion";
import { GraduationCap, Award, BookOpen } from "lucide-react";
import { resumeData } from "@/data/resumeData";

const AboutSection = () => {
  const edu = resumeData.education[0];

  return (
    <section id="about" className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="text-sm font-mono text-primary mb-2 block">01 / About</span>
          <h2 className="text-4xl font-bold">Background</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Education */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass rounded-xl p-8 glow-border"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <GraduationCap size={20} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Education</h3>
            </div>

            <h4 className="font-semibold text-lg mb-1">{edu.school}</h4>
            <p className="text-muted-foreground mb-1">{edu.degree}</p>
            <p className="text-sm text-muted-foreground mb-1">Concentration: {edu.concentration}</p>
            <p className="text-sm text-primary font-mono mb-4">{edu.period}</p>

            <div className="flex items-center gap-2 mb-4">
              <Award size={16} className="text-accent" />
              <span className="text-sm font-medium">GPA: {edu.gpa}</span>
            </div>

            {edu.highlights.map((h, i) => (
              <div key={i} className="flex items-start gap-2 mb-2">
                <BookOpen size={14} className="text-muted-foreground mt-1 shrink-0" />
                <span className="text-sm text-muted-foreground">{h}</span>
              </div>
            ))}
          </motion.div>

          {/* Certifications & Interests */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass rounded-xl p-8"
            >
              <h3 className="text-xl font-semibold mb-4">Certifications</h3>
              <div className="space-y-3">
                {resumeData.certifications.map((c, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span className="text-sm text-muted-foreground">{c}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="glass rounded-xl p-8"
            >
              <h3 className="text-xl font-semibold mb-4">Interests</h3>
              <div className="flex flex-wrap gap-2">
                {resumeData.interests.map((item, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 rounded-full text-xs font-mono bg-secondary text-secondary-foreground border border-border"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
