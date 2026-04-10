import { Layout, Layers, Code, Globe, Zap } from "lucide-react";
import React from "react";
export const portfolioData = {
  personalInfo: {
    name: "Sangramjit Dutta",
    role: "Lead Software Engineer",
    location: "Silchar, Assam, India",
    email: "sangramjitdutta@gmail.com",
    summary:
      "Results-driven Software Engineer with 4+ years of experience focused on Frontend and Full Stack Development (React Ecosystem). Experienced in building performant, scalable SaaS applications using React.js, Next.js, TypeScript, and Node.js.",
    github: "https://github.com/100ngramjit",
    linkedin: "https://www.linkedin.com/in/sangramjitdutta/",
    x: "https://x.com/sangramj1t",
    resume:
      "https://drive.google.com/drive/u/0/folders/1MHP9FGIFlvjq38RpV8G2si1vWwraaXMf",
  },

  skills: [
    {
      category: "Languages",
      skills: ["TypeScript", "JavaScript", "Python", "HTML", "CSS", "Markdown"],
    },
    {
      category: "Frontend",
      skills: [
        "React.js",
        "Next.js",
        "Expo",
        "Node.js",
        "Python",
        "Tailwind CSS",
        "ShadCN UI",
        "React Native",
      ],
    },
    {
      category: "Backend",
      skills: ["Node.js", "Express.js", "FastAPI", "Nest.js", "Hono.js"],
    },
    {
      category: "Tools & DB",
      skills: ["PostgreSQL", "MySQL", "MongoDB", "Git", "Docker", "Prisma"],
    },
  ],

  experience: [
    {
      role: "Lead Software Engineer",
      company: "Trikon",
      companyUrl: "https://trikon.io",
      period: "Aug 2024 - Present",
      description: [
        "Built a Web3 AI chat app for agentic transactions and predictions using OpenAI SDK and Next.js.",
        "Developed an account abstracted blockchain wallet with user and admin dashboard.",
        "Built a mobile web app with React, Vite and Telegram SDK.",
      ],
    },
    {
      role: "Software Development Engineer",
      company: "AVRL",
      companyUrl: "https://avrl.io",
      period: "Jan 2023 - Apr 2024",
      description: [
        "Built a SaaS platform for automated bidding for transport management systems.",
        "Automated workflows via micro-frontends and scripts for users.",
        "Built reusable packages and modernised legacy code to improve maintainability and speed.",
      ],
    },
    {
      role: "Frontend Engineer",
      company: "Auriga IT",
      companyUrl: "https://aurigait.com",
      period: "May 2022 - Dec 2022",
      description: [
        "Built real-time IoT device dashboards, improving monitoring efficiency by 40%.",
        "Consolidated 5 services to a single web application using module federation.",
        "Built an internal dashboard to track service statuses and issues.",
      ],
    },
    {
      role: "Frontend Developer",
      company: "AirCampus",
      companyUrl: "https://aircampus.in",
      period: "Jan 2021 - Apr 2022",
      description: [
        "Integrated a quizzing module and migrated projects to React 17.",
        "Improved application speeds by 50% through CDN migration.",
      ],
    },
  ],

  projects: [
    {
      title: "Padhho",
      subtitle: "AI Learning Platform",
      description:
        "Padhho is an AI-powered book recommendation engine that curates reading lists based on your personality, mood, and reading patterns. Discover hidden gems, organize your library, and scan ISBNs—all in one secure, intelligent platform.",
      tags: ["Next.js", "PostgreSQL", "Google GenAI SDK", "Better Auth"],
      link: "https://padhho.vercel.app",
      github: "",
      icon: <Layout className="w-4 h-4" />,
      variant: "chrome" as const,
    },
    {
      title: "Codeclip",
      subtitle: "AI Code Sharing",
      description:
        "AI-powered code sharing platform with instant code reviews, smart improvements, and auto-documentation. Multi-language support with syntax highlighting.",
      tags: ["Next.js", "Clerk Auth", "Prisma", "PostgreSQL"],
      link: "https://codeclip.vercel.app",
      github: "https://github.com/100ngramjit/codeclip",
      icon: <Code className="w-4 h-4" />,
      variant: "safari" as const,
    },
    {
      title: "Kwiksave",
      subtitle: "High-Performance Media Engine",
      description:
        "A powerful open-source download engine for extracting high-fidelity media from Instagram, X, Facebook, and TikTok. Features asynchronous processing with FastAPI, real-time SSE progress tracking, and automated FFmpeg merging.",
      tags: ["FastAPI", "Python", "React", "FFmpeg", "Docker", "yt-dlp"],
      link: "https://kwiksave.netlify.app/",
      github: "https://github.com/100ngramjit/kwiksave",
      icon: <Zap className="w-4 h-4" />,
      variant: "chrome" as const,
    },
    {
      title: "Blogen",
      subtitle: "Serverless Blog",
      description:
        "Modern blogging platform with serverless architecture. Real-time rendering, Cloudflare Workers backend, and JWT-based authentication.",
      tags: ["Next.js", "TypeScript", "Cloudflare Workers"],
      link: "https://blogen-iota.vercel.app",
      github: "https://github.com/100ngramjit/blogen",
      icon: <Globe className="w-4 h-4" />,
      variant: "chrome" as const,
    },
    {
      title: "Posty",
      subtitle: "A cross platform API client",
      description:
        "Posty is a next-generation API client designed for developers who value aesthetics and efficiency. Built with Tauri v2 and Rust, it delivers a lightning-fast experience with a minimal footprint, outperforming traditional Electron-based clients while maintaining a premium, modern interface.",
      tags: ["Tauri", "Rust", "React", "Tailwind"],
      link: "https://posttyy.vercel.app/",
      github: "",
      icon: <Layers className="w-4 h-4" />,
      variant: "chrome" as const,
    },
  ],
};
