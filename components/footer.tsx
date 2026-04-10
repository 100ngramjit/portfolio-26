import { portfolioData } from "@/lib/data";

export function Footer() {
  return (
    <footer className="bg-secondary/30 border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-8 md:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2026 Sangramjit Dutta. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a
              href={portfolioData.personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              GitHub
            </a>
            <a
              href={portfolioData.personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              LinkedIn
            </a>
            {portfolioData.personalInfo.x && (
              <a
                href={portfolioData.personalInfo.x}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                X
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
