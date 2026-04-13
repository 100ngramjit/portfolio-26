"use client";

import { portfolioData } from "@/lib/data";
import * as SI from "simple-icons";
import { LogoCarousel, type Logo } from "@/components/ui/logo-carousel";

const skillToIcon: Record<string, SI.SimpleIcon | null> = {
  JavaScript: SI.siJavascript,
  TypeScript: SI.siTypescript,
  Python: SI.siPython,
  HTML: SI.siHtml5,
  CSS: SI.siCss,
  Markdown: SI.siMarkdown,
  "React.js": SI.siReact,
  "Next.js": SI.siNextdotjs,
  "React Native": SI.siReact,
  Expo: SI.siExpo,
  "Tailwind CSS": SI.siTailwindcss,
  "ShadCN UI": SI.siShadcnui,
  "Node.js": SI.siNodedotjs,
  "Express.js": SI.siExpress,
  FastAPI: SI.siFastapi,
  "Nest.js": SI.siNestjs,
  "Hono.js": SI.siHono,
  PostgreSQL: SI.siPostgresql,
  MySQL: SI.siMysql,
  MongoDB: SI.siMongodb,
  Git: SI.siGit,
  Docker: SI.siDocker,
  Prisma: SI.siPrisma,
  Vercel: SI.siVercel,
  JWT: SI.siJsonwebtokens,
  MUI: SI.siMui,
  Redux: SI.siRedux,
  Sass: SI.siSass,
  Zod: SI.siZod,
  Firebase: SI.siFirebase,
  Supabase: SI.siSupabase,
  GitLab: SI.siGitlab,
  GitHub: SI.siGithub,
  "React Router": SI.siReactrouter,
  "React Hook Form": SI.siReacthookform,
};

export function Skills() {
  const { skills } = portfolioData;

  // Create logos for the carousel from our skill icons
  const carouselLogos: Logo[] = Object.entries(skillToIcon)
    .filter(([_, icon]) => icon !== null)
    .map(([skill, icon], index) => ({
      name: skill,
      id: index,
      img: (props: React.SVGProps<SVGSVGElement>) => {
        const color = [
          "Next.js",
          "ShadCN UI",
          "Express.js",
          "Markdown",
          "GitHub",
          "Vercel",
        ].includes(skill)
          ? "#ffffff"
          : `#${icon!.hex}`;
        return (
          <svg role="img" viewBox="0 0 24 24" fill={color} {...props}>
            <path d={icon!.path} />
          </svg>
        );
      },
    }));

  return (
    <section id="skills" className="border-b border-border bg-[#03060a]">
      <div className="mx-auto max-w-6xl px-6 py-24 md:px-8 md:py-32">
        <div className="flex flex-col gap-4 mb-16 text-center">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white font-doto">
            Skills & Technologies
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            The modern toolkit I use to build performant and scalable web
            applications.
          </p>
        </div>

        {/* Logo Carousel Section */}
        <div className="mb-24 flex justify-center overflow-hidden py-8">
          <LogoCarousel columnCount={3} logos={carouselLogos} />
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          {skills
            .flatMap((category) => category.skills)
            .map((skill, index) => {
              const iconData = skillToIcon[skill];

              // To ensure visibility on dark mode, we force pure white or bright brand colors
              const color = iconData
                ? [
                    "Next.js",
                    "ShadCN UI",
                    "Express.js",
                    "Markdown",
                    "GitHub",
                  ].includes(skill)
                  ? "#ffffff"
                  : `#${iconData.hex}`
                : "#ffffff";

              return (
                <div
                  key={index}
                  className="flex items-center gap-2.5 px-3 py-1.5 bg-[#0d1117] border border-[#30363d] transition-all hover:bg-[#161b22] hover:border-[#8b949e] group"
                >
                  {iconData && (
                    <svg
                      role="img"
                      viewBox="0 0 24 24"
                      className="w-4 h-4 flex-shrink-0"
                      fill={color}
                    >
                      <path d={iconData.path} />
                    </svg>
                  )}
                  <span className="text-[12px] font-bold tracking-tight uppercase text-[#c9d1d9] font-doto">
                    {skill.toUpperCase()}
                  </span>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
}
