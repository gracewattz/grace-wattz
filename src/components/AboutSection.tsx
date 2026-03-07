import { motion } from "framer-motion";

const AboutSection = () => {
  return (
    <section id="about" className="py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <h2 className="text-3xl font-bold mb-8 text-foreground">About</h2>

          <div className="space-y-5 text-muted-foreground leading-relaxed">
            <p>
              Recent graduate from the University of Colorado Boulder. I'm passionate about startups, 
              early-stage building, and the messy work of turning ideas into real things.
            </p>
            <p>
              I'm drawn to roles that blend strategy and execution — the kind where you're writing 
              the pitch deck in the morning and talking to customers in the afternoon.
            </p>
            <p>
              I solo traveled through Asia, which taught me more about adaptability, independence, 
              and initiative than any classroom ever could. It shaped how I approach ambiguity 
              and unfamiliar problems.
            </p>
            <p>
              I'm looking to work in the startup industry — specifically in operations, strategy, 
              and growth roles at early-stage companies where I can build, learn, and make a 
              meaningful impact.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
