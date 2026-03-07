import Navbar from "@/components/Navbar";
import ProjectsSection from "@/components/ProjectsSection";
import Footer from "@/components/Footer";

const Projects = () => (
  <main className="min-h-screen bg-background">
    <Navbar />
    <div className="pt-20">
      <ProjectsSection />
    </div>
    <Footer />
  </main>
);

export default Projects;
