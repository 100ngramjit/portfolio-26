"use client";

import { motion, AnimatePresence } from "motion/react";
import { Globe, ExternalLink } from "lucide-react";

interface ProjectPreviewOverlayProps {
  isVisible: boolean;
  link: string;
}

export function ProjectPreviewOverlay({
  isVisible,
  link,
}: ProjectPreviewOverlayProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Unified Seamless Interaction Blocker & Overlay Background */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-20 flex flex-col justify-end"
          >
            {/* The Atmospheric Backdrop */}
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/95 via-zinc-950/60 to-transparent backdrop-blur-3xl [mask-image:linear-gradient(to_top,black_20%,transparent_90%)]" />

            {/* Interaction Barrier */}
            <div className="absolute inset-0 cursor-not-allowed z-10" />

            {/* Bottom Banner Content (Floating on the unified backdrop) */}
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative z-30 p-6 md:p-12"
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

              <div className="relative max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
                <div className="flex items-center gap-6 text-center md:text-left">
                  <motion.div
                    initial={{ scale: 0.8, rotate: -10 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.2 }}
                    className="relative flex-shrink-0"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border border-white/10 shadow-inner">
                      <Globe className="w-8 h-8 text-primary shadow-lg" />
                    </div>
                    <div className="absolute -top-2 -right-2 px-2 py-0.5 bg-primary text-[8px] font-black text-primary-foreground rounded-full uppercase tracking-tighter">
                      LIVE
                    </div>
                  </motion.div>

                  <div className="space-y-1.5">
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      className="flex items-center gap-2 justify-center md:justify-start"
                    >
                      <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] font-mono">
                        Preview Mode Limited
                      </span>
                      <div className="h-px w-8 bg-primary/30" />
                    </motion.div>
                    <motion.h4
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="text-2xl font-black text-white font-doto tracking-tight leading-none"
                    >
                      Explore Full Features
                    </motion.h4>
                    {/* <motion.p
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-zinc-200 text-sm max-w-md leading-relaxed"
                  >
                    Experience high-performance rendering, full interactivity,
                    and adaptive layouts on our official domain.
                  </motion.p> */}
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 }}
                  className="w-full md:w-auto"
                >
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative w-full md:w-auto px-6 py-3 bg-primary text-primary-foreground font-black transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(var(--primary-rgb),0.3)] overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    <span className="relative z-10 text-base uppercase tracking-wider">
                      Visit Website
                    </span>
                    <ExternalLink className="w-5 h-5 relative z-10 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </a>
                  {/* <p className="hidden md:block text-center mt-3 text-[10px] text-zinc-400 font-mono tracking-tighter">
                  HTTPS SECURED • HIGH PERFORMANCE
                </p> */}
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
