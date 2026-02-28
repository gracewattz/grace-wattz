import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { resumeData } from "@/data/resumeData";

const ProjectsSection = () => {
  return (
    <section id="projects" className="py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-3xl font-bold mb-12 text-foreground">Projects</h2>

          <div className="space-y-16">
            {resumeData.projects.map((project, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <h3 className="text-2xl font-semibold text-foreground mb-3">
                  {project.name}
                  {i === 0 && (
                    <span className="ml-3 text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary align-middle">
                      Featured
                    </span>
                  )}
                </h3>

                <p className="text-muted-foreground leading-relaxed mb-4">
                  {project.description}
                </p>

                <p className="text-sm text-muted-foreground/80 leading-relaxed mb-4">
                  {project.role}
                </p>

                {"positioning" in project && project.positioning && (
                  <p className="text-sm italic text-muted-foreground mb-4">
                    {project.positioning}
                  </p>
                )}

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((t, j) => (
                    <span
                      key={j}
                      className="px-2.5 py-1 rounded-md text-xs font-medium bg-secondary text-secondary-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:opacity-80 transition"
                  >
                    {project.name === "Frat Maps" ? (
                      <>View on App Store <ExternalLink size={14} /></>
                    ) : (
                      <>View Project <ExternalLink size={14} /></>
                    )}
                  </a>
                )}

                {"deckNote" in project && project.deckNote && (
                  <button className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:opacity-80 transition">
                    {project.deckNote} <ExternalLink size={14} />
                  </button>
                )}

                {i < resumeData.projects.length - 1 && (
                  <div className="border-b border-border mt-16" />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
