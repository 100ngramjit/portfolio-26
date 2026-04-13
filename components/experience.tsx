"use client";

import { portfolioData } from "@/lib/data";
import { motion, useScroll, useSpring } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Calendar, Link as LinkIcon, Sparkles } from "lucide-react";
import { useRef } from "react";
import { GlareHover } from "@/components/ui/glare-hover";

export function Experience() {
  const { experience } = portfolioData;
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section
      id="experience"
      ref={containerRef}
      className="relative py-24 md:py-40 overflow-hidden bg-background border-b border-white/5"
    >
      {/* Dynamic Background Effects */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full opacity-50 pointer-events-none -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent/5 blur-[150px] rounded-full opacity-40 pointer-events-none translate-y-1/2 -translate-x-1/2" />

      <div className="mx-auto max-w-6xl px-6 relative z-10">
        <div className="flex flex-col gap-4 mb-16 text-center">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight font-doto">
            Professional Experience
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A timeline of my growth and contributions across different roles and
            organizations.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative space-y-12 md:space-y-0">
          {/* Central Line Base */}
          <div className="absolute inset-0 ml-5 -translate-x-px md:mx-auto md:translate-x-0 h-full w-[2px] bg-white/5" />

          {/* Central Line Progress */}
          <motion.div
            style={{ scaleY, originY: 0 }}
            className="absolute inset-0 ml-5 -translate-x-px md:mx-auto md:translate-x-0 h-full w-[2px] bg-gradient-to-b from-primary via-accent to-primary shadow-[0_0_15px_rgba(var(--primary-rgb),0.5)] z-10"
          />

          {experience.map((exp, index) => (
            <ExperienceItem key={index} exp={exp} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceItem({ exp, index }: { exp: any; index: number }) {
  const isEven = index % 2 === 0;

  return (
    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group py-12 md:py-24">
      {/* Icon/Dot on Timeline */}
      <div className="flex items-center justify-center w-12 h-12 rounded-full border border-white/10 bg-black/60 backdrop-blur-2xl shadow-2xl z-20 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 transition-all duration-500 group-hover:scale-110 group-hover:border-primary/50 group-hover:shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)] absolute left-0 md:left-1/2 top-6 md:top-auto">
        <Briefcase className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
      </div>

      {/* Experience Content Card */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? 80 : -80 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="w-[calc(100%-3.5rem)] md:w-[44%] ml-auto md:ml-0 md:group-even:mr-auto"
      >
        <GlareHover
          className="overflow-hidden w-full cursor-default"
          background="transparent"
          opacity={0.15}
          duration={800}
        >
          <div className="relative p-8 md:p-12 border border-white/5 bg-white/[0.01] backdrop-blur-3xl transition-all duration-700 hover:bg-white/[0.03] hover:border-white/10 group/card overflow-hidden">
            {/* Animated Hover Light */}
            <div className="absolute -inset-24 bg-[radial-gradient(circle_at_center,rgba(var(--primary-rgb),0.08)_0%,transparent_70%)] opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 pointer-events-none" />

          <div className="relative">
            <div className="flex flex-col gap-5 mb-10">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <h3 className="text-3xl md:text-4xl font-black text-neutral-100 font-doto tracking-tighter leading-tight">
                  {exp.role}
                </h3>
                <span className="flex items-center gap-2 text-[11px] font-mono font-bold text-primary bg-primary/5 border border-primary/10 px-4 py-2 rounded-full uppercase tracking-tighter">
                  <Calendar className="w-3.5 h-3.5" />
                  {exp.period}
                </span>
              </div>

              <a
                href={exp.companyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-xl font-bold text-muted-foreground hover:text-primary transition-all font-doto tracking-tight group/link"
              >
                {exp.company}
                <div className="w-8 h-[1px] bg-white/10 group-hover/link:w-12 group-hover/link:bg-primary transition-all duration-500" />
                <LinkIcon className="w-4 h-4 opacity-30 group-hover/link:opacity-100 transition-all" />
              </a>
            </div>

            <ul className="space-y-5">
              {exp.description.map((item: string, i: number) => (
                <li
                  key={i}
                  className="text-neutral-400/90 leading-relaxed flex gap-5 text-[15px] md:text-plus group/item"
                >
                  <div className="mt-2.5 w-1.5 h-1.5 rounded-full bg-primary/20 shrink-0 group-hover/item:bg-primary group-hover/item:shadow-[0_0_8px_rgba(var(--primary-rgb),0.6)] group-hover/item:scale-125 transition-all duration-300" />
                  <span className="group-hover:text-neutral-100 transition-colors duration-300">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </GlareHover>
      </motion.div>
    </div>
  );
}
