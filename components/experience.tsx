import { portfolioData } from "@/lib/data";

export function Experience() {
  const { experience } = portfolioData;

  return (
    <section id="experience" className="border-b border-border bg-secondary/30">
      <div className="mx-auto max-w-6xl px-6 py-24 md:px-8 md:py-32">
        <h2 className="mb-16 text-3xl md:text-5xl font-bold tracking-tight">
          Professional Experience
        </h2>

        <div className="space-y-16">
          {experience.map((exp, index) => (
            <div
              key={index}
              className="relative pl-8 before:absolute before:left-0 before:top-2 before:h-4 before:w-4 before:rounded-full before:bg-accent before:ring-4 before:ring-background before:shadow-[0_0_12px_rgba(var(--accent-rgb),0.3)]"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-primary">
                    {exp.role}
                  </h3>
                  <a
                    href={exp.companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg font-medium text-primary hover:underline decoration-accent/30 underline-offset-4 transition-all"
                  >
                    {exp.company}
                  </a>
                </div>
                <span className="text-sm font-mono text-muted-foreground bg-muted px-3 py-1 rounded-full mt-2 md:mt-0 self-start">
                  {exp.period}
                </span>
              </div>

              <ul className="space-y-3 max-w-4xl">
                {exp.description.map((item, i) => (
                  <li
                    key={i}
                    className="text-muted-foreground leading-relaxed flex gap-3"
                  >
                    <span className="text-accent mt-1.5 flex-shrink-0">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
