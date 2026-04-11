"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { portfolioData } from "@/lib/data";
import { FileDown, Send } from "lucide-react";

const { personalInfo } = portfolioData;

export function Contact() {
  return (
    <section id="contact" className="border-b border-border bg-muted/5">
      <div className="mx-auto max-w-6xl px-6 py-24 md:px-8 md:py-32">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 font-doto">
              Let&apos;s Connect
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Have a project in mind or just want to chat? Reach out via email
              or find me on social media. I&apos;ll get back to you as soon as
              possible.
            </p>
          </div>

          {/* Subtle Resume Option */}
          <a
            href={personalInfo.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 px-4 py-2 border border-border bg-card/50 hover:bg-card hover:border-accent transition-all text-sm font-medium"
          >
            <div className="flex items-center justify-center rounded-full bg-accent/10 group-hover:bg-accent/20 transition-colors">
              <FileDown className="w-4 h-4 text-primary" />
            </div>
            <span className="text-lg">Resume</span>
          </a>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-12">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4 font-doto">
                Email Me
              </h3>
              <a
                href={`mailto:${personalInfo.email}`}
                className="text-3xl font-bold hover:text-accent transition-colors block break-all font-doto"
              >
                {personalInfo.email}
              </a>
            </div>
          </div>

          <div className="space-y-8">
            <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-6 font-doto">
              Socials
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 px-4 py-2 border border-border bg-card hover:border-accent hover:text-accent transition-all"
              >
                <svg className="size-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                <span className="font-medium">GitHub</span>
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 px-4 py-2 border border-border bg-card hover:border-accent hover:text-accent transition-all"
              >
                <svg className="size-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.731-2.004 1.438-.103.25-.129.599-.129.948v5.419h-3.554s.047-8.733 0-9.652h3.554v1.366c.43-.664 1.199-1.608 2.928-1.608 2.136 0 3.745 1.398 3.745 4.406v5.488zM5.337 9.433c-1.144 0-1.915-.759-1.915-1.707 0-.955.77-1.708 1.958-1.708 1.187 0 1.914.753 1.939 1.708 0 .948-.752 1.707-1.982 1.707zm1.582 11.019H3.714v-9.652h3.205v9.652zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                </svg>
                <span className="font-medium">LinkedIn</span>
              </a>
              {personalInfo.x && (
                <a
                  href={personalInfo.x}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 px-6 py-3 border border-border bg-card hover:border-accent hover:text-accent transition-all"
                >
                  <svg
                    className="size-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                  </svg>
                  <span className="font-medium">Twitter</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
