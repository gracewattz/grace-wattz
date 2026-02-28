import { motion } from "framer-motion";
import { ExternalLink, Zap } from "lucide-react";
import { resumeData } from "@/data/resumeData";

const ProjectsSection = () => {
  return (
    <section id="projects" className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="text-sm font-mono text-primary mb-2 block">03 / Projects</span>
          <h2 className="text-4xl font-bold">What I've Built</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {resumeData.projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="glass rounded-xl p-8 group hover:glow-border transition-all duration-500"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition">
                  <Zap size={22} className="text-primary" />
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-mono ${
                    project.status === "Active"
                      ? "bg-primary/10 text-primary border border-primary/20"
                      : "bg-secondary text-secondary-foreground border border-border"
                  }`}
                >
                  {project.status}
                </span>
              </div>

              <h3 className="text-2xl font-bold mb-2">{project.name}</h3>
              <p className="text-muted-foreground text-sm mb-6">{project.description}</p>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.map((t, j) => (
                  <span
                    key={j}
                    className="px-2.5 py-1 rounded-md text-xs font-mono bg-secondary/80 text-secondary-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <ul className="space-y-2">
                {project.highlights.map((h, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-accent mt-0.5 shrink-0">→</span>
                    {h}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
