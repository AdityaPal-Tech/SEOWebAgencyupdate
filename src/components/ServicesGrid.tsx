"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code, Search, MapPin, BarChart3, Cpu, Sparkles, CheckCircle, X, Calendar, MessageSquare } from "lucide-react";

interface Service {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  benefits: string[];
  outcome: string;
  glowColor: string;
  detailedOverview: string;
  techStack: string[];
  phases: { name: string; duration: string; desc: string }[];
}

const services: Service[] = [
  {
    title: "Website Development",
    description: "Futuristic Next.js & React platforms optimized for speed, aesthetics, and maximum conversion rates.",
    icon: Code,
    benefits: ["100/100 Lighthouse speed scores", "Premium web animations & micro-interactions", "Responsive layout optimized for mobile"],
    outcome: "Conversion rates boosted up to 3.2x",
    glowColor: "group-hover:bg-indigo-500/10 border-indigo-500/30",
    detailedOverview: "We engineer lightning-fast headless Next.js platforms deployed on global edge networks. Every line of code is optimized for Core Web Vitals to achieve perfect Lighthouse audits, combined with immersive WebGL animations.",
    techStack: ["Next.js (App Router)", "React 19", "Tailwind CSS", "Framer Motion", "Three.js", "Vercel"],
    phases: [
      { name: "Phase 1: Architecture & UX Mockups", duration: "1-2 Weeks", desc: "Crafting custom Figma designs, wireframes, and mockups styled to represent high-tech start-ups." },
      { name: "Phase 2: Responsive Code & WebGL", duration: "2-3 Weeks", desc: "Developing Next.js pages with fluid animations, Three.js nodes, and full mobile responsiveness." },
      { name: "Phase 3: Vitals Tuning & Launch", duration: "1 Week", desc: "Core Web Vitals diagnostic optimizations, canonical setups, and staging deployment." },
    ],
  },
  {
    title: "SEO Services",
    description: "Organic strategy focusing on semantically rich copy, high authority profiles, and technical search signals.",
    icon: Search,
    benefits: ["Comprehensive semantic keyword matching", "High-tier authority backlink acquisition", "Daily crawl & site health monitoring"],
    outcome: "Rankings improved by +312% in 90 days",
    glowColor: "group-hover:bg-cyan-500/10 border-cyan-500/30",
    detailedOverview: "Our organic strategy aligns semantic keyword intelligence with technical crawling optimizations. We fix crawl errors, establish robust robots.txt/sitemap structures, and acquire high-authority backlink references to build trust.",
    techStack: ["Ahrefs", "SEMrush API", "Google Search Console", "Screaming Frog", "Structured Schema"],
    phases: [
      { name: "Phase 1: Keyword Research & Audits", duration: "1 Week", desc: "Detailed site audits, crawl validation, competitor backlink profiling, and target keyword modeling." },
      { name: "Phase 2: Copy Optimizations", duration: "2 Weeks", desc: "Rewriting content semantic graphs, setting clean heading outlines, and canonical tag structures." },
      { name: "Phase 3: Backlinks & Indexing", duration: "Ongoing", desc: "Acquiring authoritative citations, syncing sitemaps with GSC, and tracking rankings." },
    ],
  },
  {
    title: "Local SEO",
    description: "Targeted localized strategies connecting brick-and-mortar or geo-centric brands to local search markets.",
    icon: MapPin,
    benefits: ["Hyper-local citation directory building", "Localized content optimization structures", "Competitor analysis mapping"],
    outcome: "Local service leads increased +180%",
    glowColor: "group-hover:bg-emerald-500/10 border-emerald-500/30",
    detailedOverview: "Drive customers to your physical location. We construct customized schema.org LocalBusiness graphs, build local directory citations, and target queries tailored to Meerut, Noida, Delhi-NCR, and regional districts.",
    techStack: ["Schema.org", "Google Maps Pack", "Local Directories APIs", "Coordinate Mappings"],
    phases: [
      { name: "Phase 1: Citation Audits & Setup", duration: "1 Week", desc: "Auditing existing local directories, validating location coordinates, and formatting address structures." },
      { name: "Phase 2: Schema Graphs & Mappings", duration: "2 Weeks", desc: "Injecting LocalBusiness structured markup, building map links, and configuring local keywords." },
      { name: "Phase 3: Reviews & Geolocation", duration: "Ongoing", desc: "Placing directories, monitoring queries, and building review volume campaigns." },
    ],
  },
  {
    title: "Google Business Optimization",
    description: "Google Business Profile mapping, review strategies, and map integrations to dominate local search results.",
    icon: Sparkles,
    benefits: ["Daily map query monitoring", "Review acquisition strategies", "Geo-targeted media updates"],
    outcome: "Google Maps visibility increased +240%",
    glowColor: "group-hover:bg-purple-500/10 border-purple-500/30",
    detailedOverview: "Google Business Profile (GBP) is the most critical pipeline for local businesses. We manage reviews volume campaigns, geotag image assets, resolve query categories discrepancies, and boost map pack rankings.",
    techStack: ["GBP API", "Review Flow Automation", "Geotagging Tools", "GSC Local Pack Sync"],
    phases: [
      { name: "Phase 1: GBP Diagnostics & Setup", duration: "1 Week", desc: "Checking profile compliance, setting proper categories, and auditing map ranking markers." },
      { name: "Phase 2: Review flows & Media Sync", duration: "1-2 Weeks", desc: "Setting up automated customer review invites and uploading geo-optimized photographs." },
      { name: "Phase 3: Map Pack Domination", duration: "Ongoing", desc: "Monitoring local search stats, updating posts, and tracking category positions." },
    ],
  },
  {
    title: "Digital Marketing",
    description: "ROI-driven marketing channels, retargeting funnels, and programmatic ad spends tailored for conversion.",
    icon: BarChart3,
    benefits: ["Cross-channel search and social ads", "Custom landing page experiments", "Real-time performance analytics"],
    outcome: "Average client ROI of 4.5x target spend",
    glowColor: "group-hover:bg-rose-500/10 border-rose-500/30",
    detailedOverview: "We build digital advertising campaigns focused entirely on conversion value and customer acquisition cost. Every layout, copy variations, and paid search ad spend is continuously optimized using statistical split testing.",
    techStack: ["Google Analytics 4", "Meta Pixel API", "Google Ads Engine", "A/B Testing Frameworks"],
    phases: [
      { name: "Phase 1: Audience Modeling", duration: "1 Week", desc: "Building buyer profiles, structuring account campaign groups, and setting up tracking scripts." },
      { name: "Phase 2: Funnel Design & Launch", duration: "1 Week", desc: "Designing high-conversion landing page layouts, writing ads copy, and launching initial ad groups." },
      { name: "Phase 3: Bidding & ROI tuning", duration: "Ongoing", desc: "Analyzing conversions metrics, adjusting auction bidding algorithms, and optimizing CPA targets." },
    ],
  },
  {
    title: "AI Automation & Lead Gen",
    description: "Custom generative AI agents, webhook automations, and CRM integrations to convert leads 24/7.",
    icon: Cpu,
    benefits: ["Automated instant email/text follow-ups", "AI chat systems matching brand guidelines", "Automated marketing reports"],
    outcome: "Response lag reduced from hours to 8s",
    glowColor: "group-hover:bg-amber-500/10 border-amber-500/30",
    detailedOverview: "Convert organic traffic 24/7. We build customized LLM assistants trained on your corporate knowledge bases, hook them up to SMS/WhatsApp endpoints, and integrate them with CRM logs to streamline inbound leads.",
    techStack: ["OpenAI API", "LangChain", "Make.com", "Zapier Webhooks", "CRM REST APIs", "Twilio SMS"],
    phases: [
      { name: "Phase 1: Knowledge Base Training", duration: "1-2 Weeks", desc: "Compiling business datasets, training generative AI models, and setting prompt parameters." },
      { name: "Phase 2: Integrations Build", duration: "2 Weeks", desc: "Writing API webhooks, connecting chat panels, and linking lead dispatch flows to your CRM." },
      { name: "Phase 3: Pipeline Run & Safety Testing", duration: "1 Week", desc: "Simulating lead volume runs, optimizing response latencies, and verifying data security." },
    ],
  },
];

export default function ServicesGrid() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  // Esc key close handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedService(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((svc) => (
          <ServiceCard key={svc.title} service={svc} onOpenDetails={setSelectedService} />
        ))}
      </div>

      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-55 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="absolute inset-0 bg-black/60 dark:bg-zinc-950/80 backdrop-blur-md"
            />

            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", duration: 0.45 }}
              className="relative max-w-2xl w-full glass-panel bg-white/95 dark:bg-zinc-900/90 rounded-3xl p-6 md:p-8 shadow-2xl border-primary/20 overflow-y-auto max-h-[85vh] z-10 flex flex-col text-left"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-white transition-colors"
                aria-label="Close details"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Header Section */}
              <div className="flex items-start gap-4 pr-8 mb-6 border-b border-black/5 dark:border-white/5 pb-5">
                <div className="p-4 rounded-2xl bg-gradient-to-tr from-indigo-500/10 to-cyan-500/10 text-primary border border-primary/20 shrink-0">
                  {React.createElement(selectedService.icon, { className: "w-8 h-8" })}
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-black text-black dark:text-white tracking-tight">
                    {selectedService.title}
                  </h3>
                  <div className="mt-2 flex flex-wrap gap-2 items-center">
                    <span className="text-[10px] uppercase font-bold opacity-50 tracking-wider">Estimated Outcome:</span>
                    <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400">
                      {selectedService.outcome}
                    </span>
                  </div>
                </div>
              </div>

              {/* Body Content */}
              <div className="space-y-6 flex-1 pr-1 overflow-y-auto">
                {/* Detailed Description */}
                <div>
                  <h5 className="text-xs font-extrabold tracking-wider uppercase opacity-45 mb-2.5">Technical Strategy</h5>
                  <p className="text-sm opacity-80 leading-7 font-medium">
                    {selectedService.detailedOverview}
                  </p>
                </div>

                {/* Tech Stack */}
                <div>
                  <h5 className="text-xs font-extrabold tracking-wider uppercase opacity-45 mb-2.5">Optimized Stack & Tools</h5>
                  <div className="flex flex-wrap gap-2">
                    {selectedService.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs font-bold px-3 py-1.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/5 opacity-80"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Execution Timeline */}
                <div>
                  <h5 className="text-xs font-extrabold tracking-wider uppercase opacity-45 mb-4">Implementation Pipeline</h5>
                  <div className="space-y-4 relative pl-4 border-l border-black/10 dark:border-white/10 ml-2">
                    {selectedService.phases.map((phase, i) => (
                      <div key={phase.name} className="relative">
                        {/* Pulsing timeline point */}
                        <span className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-primary border border-white dark:border-zinc-900" />
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                          <h6 className="font-extrabold text-sm">{phase.name}</h6>
                          <span className="text-[10px] opacity-60 font-mono bg-black/5 dark:bg-white/5 px-2 py-0.5 rounded-md border border-black/5 dark:border-white/5">
                            {phase.duration}
                          </span>
                        </div>
                        <p className="text-xs opacity-65 leading-5 mt-1 font-semibold">
                          {phase.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer CTA Actions */}
              <div className="mt-8 pt-5 border-t border-black/5 dark:border-white/5 flex flex-col sm:flex-row gap-3">
                <a
                  href="#contact"
                  onClick={() => setSelectedService(null)}
                  className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-extrabold text-sm text-center shadow-lg shadow-indigo-500/25 hover:opacity-95 transition-all flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  Book Consultation
                </a>
                <a
                  href={`https://wa.me/918860384919?text=Hello%20SEOWebAgency,%20I%20would%20like%20to%20know%20more%20about%20your%20${encodeURIComponent(
                    selectedService.title
                  )}%20services.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-extrabold text-sm text-center hover:bg-emerald-500/20 transition-all flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4.5 h-4.5" />
                  Inquire on WhatsApp
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

function ServiceCard({ service, onOpenDetails }: { service: Service; onOpenDetails: (svc: Service) => void }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const Icon = service.icon;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Calculate rotation angles
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((centerY - y) / centerY) * 6; // max 6 degrees
    const rotateY = ((x - centerX) / centerX) * 6; // max 6 degrees

    card.style.setProperty("--rx", `${rotateX}deg`);
    card.style.setProperty("--ry", `${rotateY}deg`);
    card.style.setProperty("--mx", `${x}px`);
    card.style.setProperty("--my", `${y}px`);
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    card.style.setProperty("--rx", "0deg");
    card.style.setProperty("--ry", "0deg");
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onOpenDetails(service)}
      style={{
        transform: "perspective(1000px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg)) scale3d(1, 1, 1)",
        transition: "transform 0.1s ease, border-color 0.3s ease, box-shadow 0.3s ease",
      }}
      className={`glass-panel border-black/5 dark:border-white/5 bg-white/20 dark:bg-zinc-950/20 rounded-3xl p-6 relative overflow-hidden group hover:border-primary/20 dark:hover:border-primary/20 hover:shadow-2xl hover:shadow-indigo-500/5 cursor-pointer flex flex-col justify-between min-h-[380px]`}
    >
      {/* Light glow following the mouse */}
      <div
        className="absolute w-[200px] h-[200px] rounded-full blur-[60px] opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"
        style={{
          background: "radial-gradient(circle, var(--color-primary) 0%, transparent 70%)",
          left: "calc(var(--mx, 0px) - 100px)",
          top: "calc(var(--my, 0px) - 100px)",
        }}
      />

      <div>
        {/* Header Icon */}
        <div className="w-12 h-12 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-center text-primary mb-5 group-hover:scale-110 transition-transform duration-300">
          <Icon className="w-6 h-6" />
        </div>

        {/* Title & Description */}
        <h4 className="text-lg font-extrabold tracking-tight group-hover:text-primary transition-colors">
          {service.title}
        </h4>
        <p className="text-xs opacity-65 mt-2.5 font-medium leading-5">
          {service.description}
        </p>

        {/* Benefits checklist */}
        <ul className="mt-5 space-y-2 border-t border-black/5 dark:border-white/5 pt-4">
          {service.benefits.map((benefit) => (
            <li key={benefit} className="flex items-start gap-2 text-[11px] opacity-75 font-semibold leading-4">
              <CheckCircle className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Outcome Badge & Learn more action */}
      <div className="mt-6 flex items-center justify-between border-t border-black/5 dark:border-white/5 pt-4">
        <div>
          <span className="text-[9px] uppercase font-bold opacity-50 tracking-wider">Estimated Outcome</span>
          <p className="text-[11px] font-extrabold text-emerald-600 dark:text-emerald-400 mt-0.5">{service.outcome}</p>
        </div>
        <span className="text-xs font-bold text-primary group-hover:translate-x-1.5 transition-transform flex items-center gap-1">
          Details →
        </span>
      </div>
    </div>
  );
}

