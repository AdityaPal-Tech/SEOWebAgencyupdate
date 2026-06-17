"use client";

import React from "react";
import { ExternalLink, Globe, TrendingUp, CheckCircle, ArrowUpRight } from "lucide-react";

interface Project {
  name: string;
  description: string;
  category: "Web Dev" | "SEO";
  url: string;
  results?: string[];
  gradient: string;
}

const webProjects: Project[] = [
  {
    name: "Gaav Ki Chai",
    description: "Custom website development with modern UI, responsive design, and performance optimization.",
    category: "Web Dev",
    url: "https://gaavkichai.in/",
    gradient: "from-amber-500/10 to-orange-500/10 dark:from-amber-500/20 dark:to-orange-500/20 border-amber-500/30",
  },
  {
    name: "Voice of News 24",
    description: "Developed a fast and scalable news portal with SEO-friendly architecture.",
    category: "Web Dev",
    url: "https://voiceofnews24.in/",
    gradient: "from-indigo-500/10 to-cyan-500/10 dark:from-indigo-500/20 dark:to-cyan-500/20 border-indigo-500/30",
  },
  {
    name: "Hitachi AC",
    description: "Designed and optimized a service-based website with lead generation features and local SEO structure.",
    category: "Web Dev",
    url: "https://www.hitachiac.com/",
    gradient: "from-blue-500/10 to-indigo-500/10 dark:from-blue-500/20 dark:to-indigo-500/20 border-blue-500/30",
  },
];

const seoStories: Project[] = [
  {
    name: "Scholars Group",
    description: "Successfully optimized pages for better search visibility and local SEO performance.",
    category: "SEO",
    url: "https://scholarsgroup.in/best-preschool-in-lucknow/",
    gradient: "from-emerald-500/10 to-teal-500/10 dark:from-emerald-500/20 dark:to-teal-500/20 border-emerald-500/30",
  },
  {
    name: "Pawan MTC",
    description: "Implemented SEO strategies to improve rankings, visibility, and organic traffic.",
    category: "SEO",
    url: "https://pawanmtc.in/",
    gradient: "from-purple-500/10 to-pink-500/10 dark:from-purple-500/20 dark:to-pink-500/20 border-purple-500/30",
  },
];

const resultsDelivered = [
  "Higher Google Rankings",
  "Increased Organic Traffic",
  "Better Lead Generation",
  "Improved Website Performance",
  "Enhanced User Experience",
];

export default function ClientShowcase() {
  return (
    <div className="space-y-16">
      {/* Upper Grid: Dev Projects and SEO Success */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Web Development Projects */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-primary">
              <Globe className="w-4 h-4" />
            </div>
            <h3 className="text-xl font-extrabold tracking-tight">Website Development Projects</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {webProjects.map((proj) => (
              <ProjectCard key={proj.name} project={proj} />
            ))}
            
            {/* "And Many More..." static card */}
            <div className="glass-panel border-black/5 dark:border-white/5 bg-black/[0.01] dark:bg-white/[0.01] rounded-3xl p-6 flex flex-col justify-between min-h-[180px] relative overflow-hidden group">
              <div>
                <span className="text-[9px] uppercase font-bold tracking-wider opacity-40">Client Portfolio</span>
                <h4 className="text-base font-extrabold mt-2 tracking-tight group-hover:text-primary transition-colors">
                  And Many More...
                </h4>
                <p className="text-xs opacity-65 mt-2.5 font-medium leading-relaxed">
                  We have successfully delivered high-performance websites for multiple businesses across India.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-black/5 dark:border-white/5 text-[11px] font-bold opacity-50">
                Custom Integrations & APIs
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: SEO Success Stories */}
        <div className="lg:col-span-5 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500">
              <TrendingUp className="w-4 h-4" />
            </div>
            <h3 className="text-xl font-extrabold tracking-tight">SEO Success Stories</h3>
          </div>

          <div className="space-y-6">
            {seoStories.map((proj) => (
              <ProjectCard key={proj.name} project={proj} isFullWidth />
            ))}
          </div>
        </div>
      </div>

      {/* Lower Banner: Results Delivered Summary */}
      <div className="relative rounded-3xl overflow-hidden border border-black/5 dark:border-white/5 bg-gradient-to-r from-indigo-500/5 via-cyan-500/5 to-emerald-500/5 dark:from-indigo-950/10 dark:via-cyan-950/10 dark:to-emerald-950/10 p-8 md:p-10">
        <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-primary/10 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 space-y-3">
            <span className="text-[10px] uppercase font-mono font-extrabold tracking-wider text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
              Outcome Driven
            </span>
            <h4 className="text-2xl font-extrabold tracking-tight">Helping Businesses Scale Online</h4>
            <p className="text-sm opacity-75 font-semibold leading-relaxed">
              We focus on measurable marketing channels, web speed audits, and GBP local indexing to drive consistent leads and revenue.
            </p>
          </div>

          {/* Results checkmark grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {resultsDelivered.map((res) => (
              <div 
                key={res} 
                className="flex items-center gap-2.5 p-3 rounded-2xl bg-white/40 dark:bg-zinc-900/30 border border-black/5 dark:border-white/5 hover:border-emerald-500/20 hover:bg-white/60 dark:hover:bg-zinc-900/50 transition-all duration-300"
              >
                <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0">
                  <CheckCircle className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-bold text-black/80 dark:text-white/80">{res}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project, isFullWidth = false }: { project: Project; isFullWidth?: boolean }) {
  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`glass-panel border-black/5 dark:border-white/5 bg-white/20 dark:bg-zinc-950/20 rounded-3xl p-6 relative overflow-hidden group hover:border-primary/20 dark:hover:border-primary/20 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300 cursor-pointer flex flex-col justify-between ${
        isFullWidth ? "min-h-[140px]" : "min-h-[180px]"
      }`}
    >
      {/* Light glow pattern inside */}
      <div className={`absolute -right-10 -top-10 w-24 h-24 rounded-full blur-[40px] bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

      <div>
        <div className="flex items-center justify-between">
          <span className={`text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md border ${
            project.category === "Web Dev" 
              ? "bg-indigo-500/10 text-primary border-primary/20" 
              : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
          }`}>
            {project.category}
          </span>
          <ArrowUpRight className="w-4 h-4 opacity-30 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
        </div>

        <h4 className="text-base font-extrabold mt-3 tracking-tight group-hover:text-primary transition-colors">
          {project.name}
        </h4>
        <p className="text-xs opacity-65 mt-2 font-medium leading-relaxed">
          {project.description}
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-[10px] font-bold opacity-60">
        <span className="truncate">{project.url.replace("https://", "").replace("www.", "")}</span>
        <span className="text-[9px] uppercase tracking-wider text-primary group-hover:underline">Visit Site</span>
      </div>
    </a>
  );
}
