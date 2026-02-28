const Footer = () => (
  <footer className="py-8 border-t border-border">
    <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
      <span className="text-sm text-muted-foreground">
        © {new Date().getFullYear()} Grace Wattz. All rights reserved.
      </span>
      <span className="text-xs text-muted-foreground/60 font-mono">
        Built with purpose ✦
      </span>
    </div>
  </footer>
);

export default Footer;
