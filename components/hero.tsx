"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { portfolioData } from "@/lib/data";
import {
  TerminalAnimationRoot,
  TerminalAnimationWindow,
  TerminalAnimationContent,
  TerminalAnimationCommandBar,
  TerminalAnimationOutput,
  TerminalAnimationTabList,
  TerminalAnimationTabTrigger,
  type TabContent,
} from "@/components/ui/terminal-animation";

const { personalInfo } = portfolioData;

const heroTabs: TabContent[] = [
  {
    label: "intro",
    command: `cat ${personalInfo.name.toLowerCase().replace(" ", "-") + "-intro.md"}`,
    lines: [
      { text: " ", delay: 100 },
      {
        text: `TITLE:${personalInfo.role} building exceptional digital experiences`,
        delay: 400,
      },
      { text: " ", delay: 100 },
      { text: `DESC:${personalInfo.summary}`, delay: 300 },
      { text: " ", delay: 200 },
      { text: "ACTIONS", delay: 0 },
    ],
  },
  {
    label: "whoami",
    command: "whoami",
    lines: [
      { text: `NAME: ${personalInfo.name}`, delay: 100 },
      { text: `BIO: ${personalInfo.role}`, delay: 100 },
      { text: `LOC: ${personalInfo.location}`, delay: 100 },
      { text: `EMAIL: ${personalInfo.email}`, delay: 100 },
      { text: " ", delay: 200 },
      {
        text: `SKILLS: ${portfolioData.skills[1].skills.slice(0, 5).join(", ")}`,
        color: "text-primary",
        delay: 100,
      },
    ],
  },
];

export function Hero() {
  return (
    <section
      id="about"
      className="relative h-[85vh] flex items-center justify-center overflow-hidden border-b border-border bg-background"
    >
      {/* Intensified Primary Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[700px] bg-primary/20 blur-[130px] rounded-full opacity-60 select-none pointer-events-none animate-pulse" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-primary/25 blur-[90px] rounded-full opacity-40 select-none pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[300px] bg-primary/30 blur-[60px] rounded-full opacity-30 select-none pointer-events-none" />

      <div className="relative w-full max-w-5xl px-6">
        <TerminalAnimationRoot
          tabs={heroTabs}
          defaultActiveTab={0}
          hideCursorOnComplete={false}
          className="shadow-2xl rounded-xl overflow-hidden border border-white/5 bg-black/40 backdrop-blur-3xl"
        >
          <TerminalAnimationWindow className="bg-transparent min-h-[380px] sm:min-h-[450px]">
            {/* Custom Terminal Header */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-border/10 bg-muted/5">
              <div className="flex gap-2">
                <div className="size-3 rounded-full bg-red-500/80 shadow-[0_0_8px_rgba(239,68,68,0.4)]" />
                <div className="size-3 rounded-full bg-yellow-500/80 shadow-[0_0_8px_rgba(234,179,8,0.4)]" />
                <div className="size-3 rounded-full bg-green-500/80 shadow-[0_0_8px_rgba(34,197,94,0.4)]" />
              </div>
              <div className="text-[10px] sm:text-xs font-mono text-muted-foreground uppercase tracking-widest opacity-50">
                {personalInfo.name.toLowerCase().replace(" ", "-")} — zsh —
                112×36
              </div>
              <div className="w-12" /> {/* Spacer */}
            </div>

            <TerminalAnimationContent className="p-6 sm:p-12 font-mono">
              <div className="flex items-center gap-3 text-neutral-400 mb-6">
                <span className="text-accent text-base sm:text-lg">➜</span>
                <span className="text-cyan-500">
                  ~/{personalInfo.name.split(" ")[0].toLowerCase()}
                </span>
                <span className="text-neutral-600">on</span>
                <span className="text-purple-400">main</span>
              </div>

              <TerminalAnimationCommandBar className="text-neutral-100 text-lg sm:text-2xl font-bold tracking-tight" />

              <TerminalAnimationOutput
                className="mt-8 space-y-4"
                renderLine={(line, index, visible) => {
                  if (!visible) return null;

                  if (line.text.startsWith("TITLE:")) {
                    const text = line.text.replace("TITLE:", "");
                    return (
                      <h1 className="text-2xl sm:text-5xl font-bold tracking-tighter text-neutral-100 leading-[1.1] text-balance">
                        {text.split(" ").map((word, i) => (
                          <span
                            key={i}
                            className={
                              word.toLowerCase() === "exceptional"
                                ? "text-primary italic"
                                : ""
                            }
                          >
                            {word}{" "}
                          </span>
                        ))}
                      </h1>
                    );
                  }

                  if (line.text.startsWith("DESC:")) {
                    const text = line.text.replace("DESC:", "");
                    return (
                      <p className="text-base sm:text-xl text-neutral-400 leading-relaxed max-w-2xl">
                        {text}
                      </p>
                    );
                  }

                  if (line.text === "ACTIONS") {
                    return (
                      <div className="flex flex-col sm:flex-row gap-4 mt-6 sm:mt-8 pt-2 sm:pt-4">
                        <Link href="#contact">
                          <Button
                            size="lg"
                            className="w-full sm:w-auto h-12 px-8 text-base shadow-[0_0_20px_rgba(var(--accent-rgb),0.2)] cursor-pointer"
                          >
                            Get in touch
                          </Button>
                        </Link>
                        <a
                          href={personalInfo.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-8 h-12 rounded-md border border-border/50 text-neutral-200 hover:bg-white/5 transition-all inline-flex items-center justify-center gap-2 font-medium backdrop-blur-sm text-sm sm:text-base"
                        >
                          View on GitHub
                          <svg
                            className="h-4 w-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                          </svg>
                        </a>
                      </div>
                    );
                  }

                  return (
                    <div
                      className={
                        line.color ?? "text-neutral-300 text-base sm:text-lg"
                      }
                    >
                      {line.text}
                    </div>
                  );
                }}
              />
            </TerminalAnimationContent>

            <div className="mt-auto">
              <TerminalAnimationTabList className="flex gap-px bg-black p-1 border-t border-white/5">
                {heroTabs.map((tab, index) => (
                  <TerminalAnimationTabTrigger
                    key={tab.label}
                    index={index}
                    className="flex-1 px-2 sm:px-4 py-2 sm:py-2.5 text-[10px] sm:text-[11px] uppercase tracking-[0.1em] sm:tracking-[0.2em] font-mono transition-all data-[state=active]:bg-white/10 data-[state=active]:text-foreground data-[state=active]:font-bold text-neutral-600 hover:text-neutral-400 hover:bg-white/5 rounded-xl"
                  >
                    {tab.label}
                  </TerminalAnimationTabTrigger>
                ))}
              </TerminalAnimationTabList>
            </div>
          </TerminalAnimationWindow>
        </TerminalAnimationRoot>
      </div>
    </section>
  );
}
