import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const links = [
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
];

const Navbar = () => {
  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg border-b border-border"
    >
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        {/* Left side intentionally blank */}
        <div className="w-24" />

        {/* Nav links — always visible */}
        <div className="flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              to={l.href}
              className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Right spacer to keep links centered */}
        <div className="w-24" />
      </div>
    </motion.nav>
  );
};

export default Navbar;
