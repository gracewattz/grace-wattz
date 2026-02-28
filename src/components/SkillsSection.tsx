import { motion } from "framer-motion";
import { resumeData } from "@/data/resumeData";

const categories = [
  { key: "business" as const, label: "Business & Strategy", color: "primary" },
  { key: "marketing" as const, label: "Marketing", color: "accent" },
  { key: "technical" as const, label: "Technical", color: "primary" },
  { key: "languages" as const, label: "Languages", color: "accent" },
  { key: "soft" as const, label: "Soft Skills", color: "primary" },
];

const SkillsSection = () => {
  return (
    <section id="skills" className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="text-sm font-mono text-primary mb-2 block">04 / Skills</span>
          <h2 className="text-4xl font-bold">What I Bring</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass rounded-xl p-6"
            >
              <h3 className="text-sm font-mono text-primary mb-4">{cat.label}</h3>
              <div className="flex flex-wrap gap-2">
                {resumeData.skills[cat.key].map((skill, j) => (
                  <span
                    key={j}
                    className="px-3 py-1.5 rounded-lg text-xs bg-secondary text-secondary-foreground border border-border hover:border-primary/30 transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
