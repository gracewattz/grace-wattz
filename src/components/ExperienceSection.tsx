import { motion } from "framer-motion";
import { Briefcase, MapPin } from "lucide-react";
import { resumeData } from "@/data/resumeData";

const ExperienceSection = () => {
  return (
    <section id="experience" className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="text-sm font-mono text-primary mb-2 block">02 / Experience</span>
          <h2 className="text-4xl font-bold">Where I've Worked</h2>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[19px] top-0 bottom-0 w-px bg-border hidden md:block" />

          <div className="space-y-12">
            {resumeData.experience.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative md:pl-14"
              >
                {/* Timeline dot */}
                <div className="absolute left-2.5 top-2 w-4 h-4 rounded-full bg-primary/20 border-2 border-primary hidden md:block" />

                <div className="glass rounded-xl p-8 hover:glow-border transition-shadow duration-500">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-xl font-semibold">{exp.role}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Briefcase size={14} className="text-primary" />
                        <span className="text-primary font-medium">{exp.company}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-mono text-muted-foreground">{exp.period}</span>
                      <div className="flex items-center gap-1 mt-1 justify-end">
                        <MapPin size={12} className="text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{exp.location}</span>
                      </div>
                    </div>
                  </div>

                  <ul className="space-y-2">
                    {exp.points.map((p, j) => (
                      <li key={j} className="flex items-start gap-3 text-sm text-muted-foreground">
                        <span className="text-primary mt-1.5 shrink-0">▸</span>
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
