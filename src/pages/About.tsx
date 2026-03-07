import Navbar from "@/components/Navbar";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";

const About = () => (
  <main className="min-h-screen bg-background">
    <Navbar />
    <div className="pt-20">
      <AboutSection />
    </div>
    <Footer />
  </main>
);

export default About;
