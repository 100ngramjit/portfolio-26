"use client";

import { useState, useEffect, useRef } from "react";
import { BrowserWindow } from "@/components/ui/mock-browser-window";
import {
  ExternalLink,
  Github,
  Info,
  Globe,
  Loader2,
  MousePointer2,
} from "lucide-react";
import { portfolioData } from "@/lib/data";
import { motion, AnimatePresence } from "motion/react";
import { ProjectPreviewOverlay } from "./project-preview-overlay";

export function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showOverlay, setShowOverlay] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const { projects } = portfolioData;

  const activeProject = projects[activeIndex];

  useEffect(() => {
    // Reset states when project changes
    setShowOverlay(false);
    setIsLoaded(false);

    // Clear existing timer
    if (timerRef.current) clearTimeout(timerRef.current);

    // Set new 6s timer for interaction overlay
    timerRef.current = setTimeout(() => {
      setShowOverlay(true);
    }, 6000);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [activeIndex]);

  return (
    <section id="projects" className="border-b border-border bg-muted/20">
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-8 md:py-32">
        <div className="flex flex-col gap-4 mb-16 text-center">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight font-doto">
            Project Showcase
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto px-4">
            Explore my featured projects through this unified browser interface.
            Select a project to view its live preview and technical details.
          </p>
        </div>

        <div className="relative group max-w-6xl mx-auto hidden md:block">
          {/* Primary Decorative Glow */}
          <div className="absolute -inset-10 bg-primary/20 rounded-[3rem] blur-[100px] opacity-40 group-hover:opacity-60 transition duration-700 pointer-events-none" />
          <div className="absolute -inset-4 bg-gradient-to-br from-primary/30 to-background/0 rounded-[2rem] blur-2xl opacity-50 group-hover:opacity-75 transition duration-500 pointer-events-none" />

          <BrowserWindow
            size="xl"
            variant={activeProject.variant}
            headerStyle="full"
            url={activeProject.link}
            showSidebar={false}
            className="w-full shadow-2xl border-border/50 bg-background overflow-hidden h-[500px] md:h-[650px]"
          >
            <div className="flex flex-col md:flex-row h-full">
              {/* Sidebar - Desktop Only */}
              <div className="hidden md:flex flex-col w-64 border-r border-border/50 bg-muted/10">
                <div className="p-3 space-y-1">
                  {projects.map((p, i) => (
                    <button
                      key={p.title}
                      onClick={() => setActiveIndex(i)}
                      className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all cursor-pointer font-black ${
                        i === activeIndex
                          ? "bg-primary/10 text-white border border-primary/20 shadow-sm"
                          : "text-foreground hover:text-foreground hover:bg-muted/30"
                      }`}
                    >
                      <div className="w-4 h-4 flex-shrink-0 opacity-80">
                        {p.icon}
                      </div>
                      <span className="flex-1 truncate font-medium font-doto">
                        {p.title}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Concise Project Details Overlay - Desktop Sidebar */}
                <div className="mt-auto border-t border-border/50 bg-background/50 p-5 space-y-4">
                  <div>
                    <h4 className="text-sm font-bold text-foreground">
                      {activeProject.title}
                    </h4>
                    <p className="text-[10px] text-muted-foreground mt-2 leading-relaxed">
                      {activeProject.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {activeProject.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-1.5 py-0.5 rounded bg-muted text-[10px] font-medium text-neutral-400 whitespace-nowrap"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <a
                      href={activeProject.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 h-8 flex items-center justify-center gap-1.5 bg-primary text-primary-foreground rounded-md font-medium text-xs hover:opacity-90 transition-opacity whitespace-nowrap"
                    >
                      Visit <ExternalLink className="w-3 h-3" />
                    </a>
                    {activeProject.github && (
                      <a
                        href={activeProject.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 flex flex-shrink-0 items-center justify-center border border-border text-neutral-400 rounded-md hover:bg-white/5 hover:text-foreground transition-colors"
                      >
                        <Github className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Main Content Area */}
              <div className="flex-1 flex flex-col relative min-w-0 bg-zinc-950">
                {/* Preview Frame */}
                <div className="flex-1 relative">
                  <AnimatePresence mode="wait">
                    {!isLoaded && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-zinc-950"
                      >
                        <div className="absolute inset-0 opacity-20">
                          <img
                            src={activeProject.image}
                            alt=""
                            className="w-full h-full object-cover blur-sm"
                          />
                        </div>
                        <div className="relative z-20 flex flex-col items-center gap-4 text-center px-6">
                          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center animate-pulse">
                            <Loader2 className="w-6 h-6 text-primary animate-spin" />
                          </div>
                          <div>
                            <h5 className="text-white font-bold font-doto">
                              Loading Preview...
                            </h5>
                            <p className="text-xs text-zinc-200 mt-1 max-w-[200px]">
                              Attempting to connect to{" "}
                              {new URL(activeProject.link).hostname}
                            </p>
                          </div>
                          <a
                            href={activeProject.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-full text-xs font-bold transition-all flex items-center gap-2 hover:scale-105"
                          >
                            Visit Website <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <iframe
                    src={activeProject.link}
                    className={`w-full h-full border-0 absolute inset-0 bg-white dark:bg-zinc-950 transition-opacity duration-500 ${isLoaded ? "opacity-100" : "opacity-0"}`}
                    title={activeProject.title}
                    key={activeProject.link}
                    loading="lazy"
                    onLoad={() => setIsLoaded(true)}
                  />

                  {/* 10s Interaction Overlay (Separate Component) */}
                  <ProjectPreviewOverlay
                    isVisible={showOverlay}
                    link={activeProject.link}
                  />
                </div>
              </div>
            </div>
          </BrowserWindow>
        </div>

        {/* Mobile View - Horizontal Scrollable Cards */}
        <div className="md:hidden mt-4">
          <div
            className="flex overflow-x-auto pb-12 gap-5 snap-x snap-mandatory no-scrollbar px-4 -mx-4"
            onScroll={(e) => {
              const target = e.currentTarget;
              const scrollPosition = target.scrollLeft;
              const cardWidth = target.offsetWidth * 0.85 + 20; // 85vw + gap
              const nextIndex = Math.round(scrollPosition / cardWidth);
              if (
                nextIndex !== activeIndex &&
                nextIndex >= 0 &&
                nextIndex < projects.length
              ) {
                setActiveIndex(nextIndex);
              }
            }}
          >
            {projects.map((project, i) => (
              <div
                key={i}
                className="min-w-[85vw] snap-center p-6 rounded-[2.5rem] border border-border/50 bg-card/50 backdrop-blur-xl shadow-2xl overflow-hidden relative group flex flex-col"
              >
                <div className="absolute top-0 right-0 p-6 opacity-10 scale-150 rotate-12">
                  {project.icon}
                </div>

                <div className="relative flex-1">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="bg-primary/10 text-primary text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-[0.2em] font-mono border border-primary/20">
                      {project.subtitle}
                    </span>
                  </div>

                  <h3 className="text-3xl font-black mb-4 tracking-tighter text-foreground font-doto">
                    {project.title}
                  </h3>

                  <p className="text-muted-foreground leading-relaxed mb-6 text-sm line-clamp-4">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 rounded-xl text-[10px] bg-muted/30 text-muted-foreground font-bold border border-border/30 backdrop-blur-sm"
                      >
                        {tag.toUpperCase()}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 mt-auto pt-4 relative">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-[2] h-14 flex items-center justify-center gap-2 bg-primary text-primary-foreground rounded-2xl font-bold transition-all active:scale-95 shadow-lg shadow-primary/20"
                  >
                    Live Preview <ExternalLink className="w-4 h-4" />
                  </a>
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 h-14 flex items-center justify-center border border-border/50 rounded-2xl font-bold text-foreground transition-all active:scale-95 bg-muted/20 backdrop-blur-md"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Indicators for Mobile */}
          <div className="flex justify-center gap-1.5 mt-2">
            {projects.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === activeIndex
                    ? "w-6 bg-primary"
                    : "w-1.5 bg-muted-foreground/30"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
