import { motion } from "framer-motion";
import { Mail, MapPin, Send } from "lucide-react";
import { resumeData } from "@/data/resumeData";

const ContactSection = () => {
  return (
    <section id="contact" className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="text-sm font-mono text-primary mb-2 block">05 / Contact</span>
          <h2 className="text-4xl font-bold">Let's Connect</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl"
        >
          <p className="text-muted-foreground mb-8 text-lg">
            I'm currently open to new opportunities in operations, strategy, and startup roles. 
            Whether you have a question or just want to say hi — my inbox is always open.
          </p>

          <div className="space-y-4 mb-10">
            <a
              href={`mailto:${resumeData.email}`}
              className="flex items-center gap-4 glass rounded-xl p-5 hover:glow-border transition-shadow duration-300 group"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition">
                <Mail size={18} className="text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{resumeData.email}</p>
              </div>
              <Send size={16} className="text-muted-foreground ml-auto group-hover:text-primary transition-colors" />
            </a>

            <div className="flex items-center gap-4 glass rounded-xl p-5">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <MapPin size={18} className="text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Location</p>
                <p className="font-medium">{resumeData.location}</p>
              </div>
            </div>
          </div>

          <a
            href={`mailto:${resumeData.email}`}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-medium hover:opacity-90 transition text-lg"
          >
            Say Hello
            <Send size={18} />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
