import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { resumeData } from "@/data/resumeData";

const ContactSection = () => {
  return (
    <section id="contact" className="py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-3xl font-bold mb-8 text-foreground">Contact</h2>

          <a
            href={`mailto:${resumeData.email}`}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-12"
          >
            <Mail size={16} />
            {resumeData.email}
          </a>

          <div className="mt-8">
            <h3 className="text-xl font-semibold text-foreground mb-2">Schedule a Call</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Pick a time that works — shows only availability.
            </p>

            <div className="rounded-xl border border-border overflow-hidden">
              <iframe
                src="https://calendly.com/gracewattz?hide_gdpr_banner=1"
                width="100%"
                height="950"
                frameBorder="0"
                title="Schedule a call with Grace"
                className="w-full"
                style={{ minHeight: "950px" }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
