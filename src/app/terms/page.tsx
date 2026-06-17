"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Shield,
  Clock,
  Briefcase,
  AlertTriangle,
  Zap,
  Lock,
  MessageSquare,
  RefreshCw,
  FileCheck,
} from "lucide-react";
import { Instagram } from "@/components/InstagramIcon";
import Navbar from "@/components/Navbar";
import ThreeCanvas from "@/components/ThreeCanvas";
import WhatsAppButton from "@/components/WhatsAppButton";

// Custom Cursor Glow Hook
function useCursorGlow() {
  const [position, setPosition] = useState({ x: -400, y: -400 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return position;
}

export default function TermsPage() {
  const glowPos = useCursorGlow();

  const terms = [
    {
      title: "Service Timelines",
      desc: "Service timelines are estimates and may vary depending on the specific project scope and client complexity parameters.",
      icon: Clock,
    },
    {
      title: "Client Responsibilities",
      desc: "Clients are required to provide requested content, assets, credentials, and stage approvals within agreed timeframes.",
      icon: Briefcase,
    },
    {
      title: "Refund Policy",
      desc: "Payments made for setup, maintenance, or audit deliverables are generally non-refundable unless explicitly detailed in our agreement.",
      icon: AlertTriangle,
    },
    {
      title: "SEO Rankings",
      desc: "Search engine algorithms fluctuate constantly; organic rankings cannot be guaranteed but are driven by best-practice optimizations.",
      icon: Zap,
    },
    {
      title: "Intellectual Property",
      desc: "Unauthorized copying or distribution of SEOWebAgency website structures, assets, or diagnostic tools is prohibited.",
      icon: FileCheck,
    },
    {
      title: "Policy Modifications",
      desc: "We reserve the right to modify service modules, pricing slabs, or specific operational protocols at any time.",
      icon: RefreshCw,
    },
  ];

  const protocols = [
    {
      title: "Secure Data Handling",
      desc: "Client environment settings, login credentials, and database credentials are encrypted and stored in strict databases.",
      icon: Lock,
    },
    {
      title: "Ethical SEO Practices",
      desc: "We adhere strictly to search engine quality guidelines, avoiding artificial link farms or manipulative tactics.",
      icon: Shield,
    },
    {
      title: "Transparent Communication",
      desc: "All indexing issues, crawl errors, and organic progression updates are shared directly with the client weekly.",
      icon: MessageSquare,
    },
    {
      title: "Timely Project Updates",
      desc: "Automatic status briefs are synced to ensure team alignment across all active development tasks.",
      icon: Clock,
    },
    {
      title: "Confidentiality Shield",
      desc: "Client product configurations, business logic, and transaction parameters are protected by NDA standards.",
      icon: Shield,
    },
  ];

  return (
    <div className="relative min-h-screen bg-white dark:bg-dark-bg transition-colors duration-500 selection:bg-indigo-500/20">
      {/* 1. Global Interactive Mouse Glow Trail */}
      <div
        className="cursor-glow hidden md:block"
        style={{
          left: `${glowPos.x}px`,
          top: `${glowPos.y}px`,
        }}
      />

      {/* Navigation */}
      <Navbar />

      {/* Hero Header */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden pt-32 pb-16">
        {/* WebGL Canvas Background */}
        <div className="absolute inset-0 z-0">
          <ThreeCanvas />
        </div>

        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] glow-mesh-indigo glow-mesh rounded-full pointer-events-none opacity-40" />
        <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] glow-mesh-cyan glow-mesh rounded-full pointer-events-none opacity-40" />
        <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 relative z-10 w-full text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-primary/20 bg-primary/10 text-primary text-[10px] font-extrabold tracking-wider uppercase mb-6"
          >
            <FileText className="w-3.5 h-3.5" />
            Legal Protocols
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-black tracking-tight text-black dark:text-white"
          >
            Terms & Protocols
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm sm:text-base opacity-60 mt-4 max-w-xl mx-auto font-medium"
          >
            Operational guidelines, intellectual frameworks, and partnership obligations.
          </motion.p>
        </div>
      </section>

      {/* Terms Grid Section */}
      <section className="relative py-20 border-t border-black/5 dark:border-white/5 bg-black/[0.01] dark:bg-white/[0.01]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-left mb-12">
            <span className="text-xs font-semibold bg-primary/10 text-primary px-3 py-1 rounded-full uppercase tracking-wider">
              Terms of Service
            </span>
            <p className="text-sm opacity-60 mt-3 font-semibold leading-relaxed">
              By utilizing SEOWebAgency services, platforms, and AI optimization scripts, you agree to comply with the following structural parameters.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {terms.map((term, idx) => {
              const TermIcon = term.icon;
              return (
                <div
                  key={term.title}
                  className="glass-panel border-black/5 dark:border-white/5 bg-white/20 dark:bg-zinc-950/20 p-6 rounded-2xl flex gap-4 hover:border-primary/10 transition-all duration-300"
                >
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-500 flex items-center justify-center shrink-0">
                    <TermIcon className="w-4.5 h-4.5" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-extrabold text-sm mb-1.5">{term.title}</h4>
                    <p className="text-xs opacity-60 font-semibold leading-relaxed">{term.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Protocols Section */}
      <section className="relative py-24 border-t border-black/5 dark:border-white/5">
        <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] glow-mesh-cyan glow-mesh rounded-full pointer-events-none opacity-30" />
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-left mb-12">
            <span className="text-xs font-semibold bg-emerald-500/10 text-emerald-500 px-3 py-1 rounded-full uppercase tracking-wider">
              Internal Protocols
            </span>
            <p className="text-sm opacity-60 mt-3 font-semibold leading-relaxed">
              Our commitment to project execution, security standards, and transparent workflow integrity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {protocols.map((protocol, idx) => {
              const ProtocolIcon = protocol.icon;
              return (
                <div
                  key={protocol.title}
                  className="glass-panel border-black/5 dark:border-white/5 bg-white/20 dark:bg-zinc-950/20 p-6 rounded-2xl flex gap-4 hover:border-emerald-500/10 transition-all duration-300"
                >
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
                    <ProtocolIcon className="w-4.5 h-4.5" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-extrabold text-sm mb-1.5">{protocol.title}</h4>
                    <p className="text-xs opacity-60 font-semibold leading-relaxed">{protocol.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 border-t border-black/5 dark:border-white/5 bg-zinc-50 dark:bg-black/40">
        <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between text-xs opacity-60 font-semibold gap-4">
          <div className="flex items-center gap-3">
            <span>&copy; 2023 SEOWebAgency. All rights reserved.</span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-[10px] font-extrabold tracking-wider uppercase animate-pulse-slow">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              All Systems Nominal
            </span>
          </div>
          <div className="flex items-center gap-6">
            <a href="https://instagram.com/seoweb_agency" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition-colors text-pink-500 font-bold flex items-center gap-1">
              <Instagram className="w-3.5 h-3.5" />
              <span>Instagram</span>
            </a>
            <a href="/terms" className="hover:text-primary transition-colors">
              Terms & Protocols
            </a>
            <a href="/privacy" className="hover:text-primary transition-colors">
              Privacy Shield
            </a>
          </div>
        </div>
      </footer>

      {/* WhatsApp Button */}
      <WhatsAppButton />
    </div>
  );
}
