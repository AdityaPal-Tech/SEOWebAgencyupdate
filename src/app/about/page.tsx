"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Cpu,
  Layers,
  Zap,
  ShieldCheck,
  CheckCircle2,
  Users,
  Target,
  ArrowRight,
  TrendingUp,
  Heart,
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

export default function AboutPage() {
  const glowPos = useCursorGlow();

  const coreValues = [
    {
      title: "Innovation",
      desc: "Leveraging cutting-edge AI technologies and methodologies to stay ahead of search algorithms.",
      icon: Cpu,
      color: "text-indigo-500",
      bgColor: "bg-indigo-500/10",
    },
    {
      title: "Transparency",
      desc: "Open reporting, clear traffic attribution, and verifiable SEO progress metrics.",
      icon: Layers,
      color: "text-cyan-500",
      bgColor: "bg-cyan-500/10",
    },
    {
      title: "Performance",
      desc: "Fast, headless websites that load in milliseconds and maintain high Core Web Vitals score.",
      icon: Zap,
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
    },
    {
      title: "Customer Success",
      desc: "Aligning optimization strategy directly with business leads and transaction revenue growth.",
      icon: Target,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
    {
      title: "Long-Term Partnerships",
      desc: "Creating sustainable digital growth pipelines built on mutual trust and consistent ROI.",
      icon: Heart,
      color: "text-rose-500",
      bgColor: "bg-rose-500/10",
    },
  ];

  const whyChooseUs = [
    {
      title: "Result-Oriented Strategies",
      desc: "We prioritize actual revenue and qualified inquiries over empty vanity metrics.",
    },
    {
      title: "SEO Experts",
      desc: "Years of technical mapping, schema graph building, and crawl depth optimization experience.",
    },
    {
      title: "Premium Website Development",
      desc: "Fast-loading, high-conversion headless Next.js platforms optimized for search engines.",
    },
    {
      title: "AI-Powered Solutions",
      desc: "Deploying custom scrapers, semantic analysis suites, and automated workflow triggers.",
    },
    {
      title: "Dedicated Support",
      desc: "Direct communication channels, monthly consultations, and round-the-clock systems monitoring.",
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

      {/* Hero / About Banner */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-32 pb-16">
        {/* WebGL Canvas Background */}
        <div className="absolute inset-0 z-0">
          <ThreeCanvas />
        </div>

        {/* Ambient Gradient Glow Meshes */}
        <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] glow-mesh-indigo glow-mesh rounded-full pointer-events-none opacity-40" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] glow-mesh-cyan glow-mesh rounded-full pointer-events-none opacity-40" />
        <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />

        <div className="max-w-5xl mx-auto px-6 relative z-10 w-full text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-primary/20 bg-primary/10 text-primary text-[10px] font-extrabold tracking-wider uppercase mb-6"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Who We Are
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.1] text-black dark:text-white"
          >
            About{" "}
            <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
              SEOWebAgency
            </span>
          </motion.h1>

          {/* Hero Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl opacity-85 mt-6 max-w-2xl mx-auto font-medium leading-relaxed"
          >
            Empowering Businesses with Digital Growth & AI Innovation
          </motion.p>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="relative py-20 border-t border-black/5 dark:border-white/5 bg-black/[0.01] dark:bg-white/[0.01]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            {/* Left Content */}
            <div className="md:col-span-7 space-y-6 text-left">
              <span className="text-xs font-semibold bg-primary/10 text-primary px-3 py-1 rounded-full uppercase tracking-wider">
                Our Story & Mission
              </span>
              <p className="text-base opacity-80 leading-8 font-medium">
                SEOWebAgency is a modern digital growth partner based in Meerut, India, helping businesses scale through Website Development, SEO, Digital Marketing, AI Automation, and Lead Generation.
              </p>
              <p className="text-base opacity-80 leading-8 font-medium">
                Our mission is to simplify digital growth by delivering high-performance solutions that generate measurable results. We combine creativity, technology, and data-driven strategies to help businesses build a stronger online presence.
              </p>

              <div className="pt-4">
                <a
                  href="/#contact"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-extrabold text-sm hover:opacity-95 shadow-lg shadow-indigo-500/25 transition-all"
                >
                  Work With Us
                  <ArrowRight className="w-4.5 h-4.5" />
                </a>
              </div>
            </div>

            {/* Right Meta details */}
            <div className="md:col-span-5 w-full">
              <div className="glass-panel border-black/5 dark:border-white/5 bg-white/20 dark:bg-zinc-950/20 p-6 rounded-3xl shadow-xl space-y-6">
                <div className="flex items-center gap-3 border-b border-black/5 dark:border-white/5 pb-4">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-primary">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-xs">Our Presence</h3>
                    <p className="text-[10px] opacity-60 font-semibold">Meerut, UP, India</p>
                  </div>
                </div>
                
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="opacity-60">HQ Location:</span>
                    <span>Meerut, India</span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="opacity-60">Specialties:</span>
                    <span>AI SEO & Development</span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="opacity-60">Client Growth Target:</span>
                    <span className="text-emerald-500">3x Organic Traffic</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="relative py-24 border-t border-black/5 dark:border-white/5">
        <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] glow-mesh-cyan glow-mesh rounded-full pointer-events-none opacity-30" />
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold bg-primary/10 text-primary px-3 py-1 rounded-full uppercase tracking-wider">
              Core Principles
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold mt-4 tracking-tight">
              Our Core Values
            </h2>
            <p className="text-sm opacity-60 mt-3 font-semibold">
              The fundamental standards guiding our development cycles and optimization benchmarks.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreValues.map((val, idx) => {
              const ValIcon = val.icon;
              return (
                <div
                  key={val.title}
                  className="glass-panel border-black/5 dark:border-white/5 bg-white/20 dark:bg-zinc-950/20 p-6 rounded-2xl flex flex-col justify-between hover:border-primary/10 transition-all duration-300"
                >
                  <div>
                    <div className={`w-10 h-10 rounded-xl ${val.bgColor} ${val.color} flex items-center justify-center mb-4`}>
                      <ValIcon className="w-5 h-5" />
                    </div>
                    <h4 className="font-extrabold text-sm mb-2">{val.title}</h4>
                    <p className="text-xs opacity-60 font-semibold leading-relaxed">{val.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="relative py-24 border-t border-black/5 dark:border-white/5 bg-black/[0.01] dark:bg-white/[0.01]">
        <div className="absolute bottom-1/4 left-1/4 w-[350px] h-[350px] glow-mesh-indigo glow-mesh rounded-full pointer-events-none opacity-30" />
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-5 text-left">
              <span className="text-xs font-semibold bg-primary/10 text-primary px-3 py-1 rounded-full uppercase tracking-wider">
                Our Advantage
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold mt-4 tracking-tight leading-tight">
                Why Partners Choose SEOWebAgency
              </h2>
              <p className="text-sm opacity-60 mt-4 font-semibold leading-7">
                We design custom architectures built to perform. Here is how we build long-term, scalable, and data-driven organic traffic growth for our clients.
              </p>
            </div>

            {/* Right List Card */}
            <div className="lg:col-span-7 space-y-4">
              {whyChooseUs.map((item, idx) => (
                <div
                  key={item.title}
                  className="glass-panel border-black/5 dark:border-white/5 bg-white/10 dark:bg-zinc-950/10 p-5 rounded-2xl flex items-start gap-4 hover:bg-white/20 dark:hover:bg-zinc-900/20 transition-all duration-300"
                >
                  <div className="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm text-left">{item.title}</h4>
                    <p className="text-[11px] opacity-60 mt-1 font-semibold leading-relaxed text-left">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
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
