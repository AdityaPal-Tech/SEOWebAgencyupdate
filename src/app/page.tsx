"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Zap,
  ArrowRight,
  TrendingUp,
  MessageSquare,
  ShieldCheck,
  Cpu,
  Layers,
  ChevronRight,
  Send,
  Calendar,
  MousePointer,
  LineChart,
  Phone,
  Mail,
} from "lucide-react";

import Navbar from "@/components/Navbar";
import ThreeCanvas from "@/components/ThreeCanvas";
import ServicesGrid from "@/components/ServicesGrid";
import SaaSResults from "@/components/SaaSResults";
import AuditTool from "@/components/AuditTool";
import TestimonialsSlider from "@/components/TestimonialsSlider";
import ClientShowcase from "@/components/ClientShowcase";
import Pricing from "@/components/Pricing";
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

export default function Home() {
  const glowPos = useCursorGlow();
  const [formState, setFormState] = useState({ name: "", email: "", website: "", service: "SEO Services", message: "" });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Counter stats for Hero
  const [stats, setStats] = useState({ projects: 0, increase: 0, experts: 0 });

  useEffect(() => {
    let start = Date.now();
    const duration = 1500; // 1.5s
    const animate = () => {
      const progress = Math.min((Date.now() - start) / duration, 1);
      setStats({
        projects: Math.floor(500 * progress),
        increase: Math.floor(312 * progress),
        experts: Math.floor(18 * progress),
      });
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate SMTP email notifications dispatch
    console.log(`[SMTP] Sending inquiry from ${formState.name} (${formState.email}) for ${formState.service} to seowebagency.in@gmail.com...`);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
    }, 1200);
  };

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

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16">
        {/* WebGL Canvas Background */}
        <div className="absolute inset-0 z-0">
          <ThreeCanvas />
        </div>

        {/* Ambient Gradient Glow Meshes */}
        <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] glow-mesh-indigo glow-mesh rounded-full pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] glow-mesh-cyan glow-mesh rounded-full pointer-events-none" />

        {/* Grid Overlay */}
        <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Content */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* AI badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-primary/20 bg-primary/10 text-primary text-[10px] font-extrabold tracking-wider uppercase mb-6"
            >
              <Cpu className="w-3.5 h-3.5" />
              Next-Gen Search Automation Suite
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.1] text-black dark:text-white"
            >
              Grow Faster with{" "}
              <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent animate-pulse">
                AI-Powered SEO
              </span>{" "}
              & Digital Growth
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg opacity-75 mt-6 max-w-xl font-medium leading-8"
            >
              We build high-performance websites, generate qualified leads, automate workflows, and help brands dominate Google search rankings.
            </motion.p>

            {/* Call to Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 mt-8 w-full sm:w-auto"
            >
              <a
                href="#contact"
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-extrabold text-sm hover:opacity-95 shadow-lg shadow-indigo-500/25 transition-all text-center flex items-center justify-center gap-2"
              >
                Book Free Consultation
                <ArrowRight className="w-4.5 h-4.5" />
              </a>
              <a
                href="https://wa.me/918860384919?text=Hello%20SEOWebAgency,%20I%20would%20like%20to%20know%20more%20about%20your%20services."
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-2xl border border-black/10 dark:border-white/10 bg-white/20 dark:bg-zinc-900/30 text-black dark:text-white font-extrabold text-sm hover:bg-black/5 dark:hover:bg-white/5 transition-all text-center flex items-center justify-center gap-2 backdrop-blur-md"
              >
                <MessageSquare className="w-4.5 h-4.5 text-emerald-500" />
                Chat on WhatsApp
              </a>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-12 border-t border-black/5 dark:border-white/5 pt-8 w-full"
            >
              <div>
                <p className="text-2xl font-black tracking-tight text-primary">+{stats.projects}</p>
                <p className="text-[10px] opacity-60 font-semibold uppercase mt-1">Projects Completed</p>
              </div>
              <div>
                <p className="text-2xl font-black tracking-tight text-cyan-500">+{stats.increase}%</p>
                <p className="text-[10px] opacity-60 font-semibold uppercase mt-1">Avg Traffic Increase</p>
              </div>
              <div>
                <p className="text-2xl font-black tracking-tight text-emerald-500">+{stats.experts}</p>
                <p className="text-[10px] opacity-60 font-semibold uppercase mt-1">SEO & AI Experts</p>
              </div>
              <div>
                <p className="text-2xl font-black tracking-tight text-purple-500">24/7</p>
                <p className="text-[10px] opacity-60 font-semibold uppercase mt-1">Global Support</p>
              </div>
            </motion.div>
          </div>

          {/* Interactive Floating Card Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateY: 10 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 hidden lg:block perspective-[1000px]"
          >
            <div className="glass-panel border-white/10 dark:border-white/5 bg-white/20 dark:bg-zinc-950/20 p-6 rounded-3xl relative animate-float shadow-2xl">
              <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <div className="flex items-center gap-3 border-b border-black/5 dark:border-white/5 pb-4 mb-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-primary">
                  <LineChart className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-xs">Live SEO Trajectory</h3>
                  <p className="text-[10px] opacity-50 font-semibold">Updated 2s ago</p>
                </div>
              </div>

              {/* Dotted visual grid */}
              <div className="h-40 relative flex items-end justify-between gap-1.5 border-b border-black/5 dark:border-white/5 pb-1">
                {[40, 25, 60, 50, 75, 95, 80, 110, 130].map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col justify-end items-center h-full">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ duration: 1.2, delay: i * 0.08, ease: "easeOut" }}
                      className={`w-full rounded-t-lg bg-gradient-to-t ${
                        i === 8 ? "from-indigo-500 to-cyan-500" : "from-black/10 to-black/20 dark:from-white/5 dark:to-white/10"
                      } relative`}
                    >
                      {i === 8 && <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-cyan-400">+312%</span>}
                    </motion.div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-[9px] opacity-40 uppercase font-bold mt-2.5">
                <span>Month 1</span>
                <span>Month 3</span>
                <span>Active Target</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="relative py-24 border-t border-black/5 dark:border-white/5">
        <div className="absolute top-0 right-1/4 w-[300px] h-[300px] glow-mesh-cyan glow-mesh rounded-full pointer-events-none opacity-40" />
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold bg-primary/10 text-primary px-3 py-1 rounded-full uppercase tracking-wider">
              Our Capabilities
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold mt-4 tracking-tight">
              Marketing Solutions
            </h2>
            <p className="text-sm opacity-60 mt-3 font-semibold leading-6">
              Accelerate your digital footprint. We leverage proprietary machine learning frameworks to audit keywords, develop fast platforms, and run automation.
            </p>
          </div>

          <ServicesGrid />
        </div>
      </section>

      {/* Solutions / Brand Values Section */}
      <section id="solutions" className="relative py-24 border-t border-black/5 dark:border-white/5 bg-black/[0.01] dark:bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Visual Specs grid */}
            <div className="grid grid-cols-2 gap-6">
              {[
                { title: "Trust", desc: "Verifiable transparent data signals.", icon: ShieldCheck, color: "text-indigo-500" },
                { title: "Innovation", desc: "Next-gen AI scraping algorithms.", icon: Cpu, color: "text-cyan-500" },
                { title: "Performance", desc: "100/100 core web vitals speed.", icon: Zap, color: "text-emerald-500" },
                { title: "Simplicity", desc: "SaaS dashboard tracking reports.", icon: Layers, color: "text-purple-500" },
              ].map((val, idx) => {
                const ValIcon = val.icon;
                return (
                  <div
                    key={val.title}
                    className="glass-panel border-black/5 dark:border-white/5 bg-white/20 dark:bg-zinc-950/20 p-5 rounded-2xl flex flex-col justify-between min-h-[160px] hover:border-primary/10 transition-colors duration-300"
                  >
                    <ValIcon className={`w-8 h-8 ${val.color}`} />
                    <div>
                      <h4 className="font-extrabold text-sm mt-3">{val.title}</h4>
                      <p className="text-[11px] opacity-60 mt-1 font-semibold leading-4">{val.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Solutions Description */}
            <div className="flex flex-col items-start text-left">
              <span className="text-xs font-semibold bg-primary/10 text-primary px-3 py-1 rounded-full uppercase tracking-wider">
                Core Philosophy
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold mt-4 tracking-tight leading-tight">
                Designed to Outperform Standard Agency Workflows
              </h2>
              <p className="text-sm opacity-60 mt-4 font-semibold leading-7">
                Traditional agencies rely on manual updates and static reporting tables. SEOWebAgency builds custom tech stacks for each client, utilizing real-time API syncs, AI automated follow-up triggers, and programmatic SEO models to scale your traffic.
              </p>

              <div className="mt-8 space-y-4 w-full">
                {[
                  "Real-time visibility metrics synced to your Google Search Console",
                  "Fully customized headless page speeds running on edge networks",
                  "Automated CRM updates to catalog inbound search leads instantly",
                ].map((text, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
                      <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs font-bold opacity-80">{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results Dashboard Section */}
      <section id="results" className="relative py-24 border-t border-black/5 dark:border-white/5">
        <div className="absolute top-1/3 left-1/3 w-[350px] h-[350px] glow-mesh-indigo glow-mesh rounded-full pointer-events-none opacity-40" />
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold bg-primary/10 text-primary px-3 py-1 rounded-full uppercase tracking-wider">
              Transparency
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold mt-4 tracking-tight">
              Interactive Growth Dashboard
            </h2>
            <p className="text-sm opacity-60 mt-3 font-semibold">
              Filter through verified timelines to view simulated conversion parameters and ranking data.
            </p>
          </div>

          <SaaSResults />
        </div>
      </section>

      {/* AI SEO Audit Tool Section */}
      <section id="about" className="relative py-24 border-t border-black/5 dark:border-white/5 bg-black/[0.01] dark:bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-6">
          <AuditTool />
        </div>
      </section>

      {/* Client Showcase Section */}
      <section id="portfolio" className="relative py-24 border-t border-black/5 dark:border-white/5">
        <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] glow-mesh-indigo glow-mesh rounded-full pointer-events-none opacity-30" />
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold bg-primary/10 text-primary px-3 py-1 rounded-full uppercase tracking-wider">
              Showcase
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold mt-4 tracking-tight">
              Trusted by Growing Businesses
            </h2>
            <p className="text-sm opacity-60 mt-3 font-semibold leading-6">
              We have successfully delivered website development and SEO solutions for multiple businesses across India, helping them increase traffic, leads, and online growth.
            </p>
          </div>

          <ClientShowcase />
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="relative py-24 border-t border-black/5 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold bg-primary/10 text-primary px-3 py-1 rounded-full uppercase tracking-wider">
              Testimonials
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold mt-4 tracking-tight">
              Backed by Client Growth
            </h2>
            <p className="text-sm opacity-60 mt-3 font-semibold">
              Hear directly from the managers, directors, and founders scaling their digital footprints.
            </p>
          </div>

          <TestimonialsSlider />
        </div>
      </section>

      {/* Pricing Section */}
      <Pricing />

      {/* Contact & Consultation Booking Section */}
      <section id="contact" className="relative py-24 border-t border-black/5 dark:border-white/5">
        <div className="absolute bottom-0 right-1/4 w-[350px] h-[350px] glow-mesh-indigo glow-mesh rounded-full pointer-events-none opacity-40" />
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            {/* Left Content */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <span className="text-xs font-semibold bg-primary/10 text-primary px-3 py-1 rounded-full uppercase tracking-wider">
                  Contact
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold mt-4 tracking-tight">
                  Schedule a Strategic Growth Briefing
                </h2>
                <p className="text-sm opacity-60 mt-4 font-semibold leading-7">
                  Analyze your site metrics, discuss search goals, and lay out an implementation pipeline with our engineering lead. Completely free. No strings.
                </p>
              </div>

              {/* Direct Contact Details Card */}
              <div className="mt-8 p-6 rounded-2xl glass-panel border-black/5 dark:border-white/5 bg-white/20 dark:bg-zinc-950/20 space-y-4">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider opacity-60">Prefer Direct Channels?</span>
                  <p className="text-sm font-semibold mt-2">Get in touch instantly via call, email, or chat.</p>
                </div>
                <div className="space-y-3 pt-2">
                  <a href="tel:+918803511070" className="flex items-center gap-3 text-xs font-extrabold hover:text-primary transition-all">
                    <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-500 shrink-0">
                      <Phone className="w-4 h-4" />
                    </div>
                    <span>Call: +91 8803511070</span>
                  </a>
                  <a href="mailto:seowebagency.in@gmail.com" className="flex items-center gap-3 text-xs font-extrabold hover:text-primary transition-all">
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-500 shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <span>Email: seowebagency.in@gmail.com</span>
                  </a>
                  <a
                    href="https://wa.me/918860384919?text=Hello%20SEOWebAgency,%20I%20would%20like%20to%20know%20more%20about%20your%20services."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-xs font-extrabold hover:text-primary transition-all"
                  >
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <span>WhatsApp Chat</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Booking Form */}
            <div className="lg:col-span-7">
              <div className="glass-panel border-black/5 dark:border-white/5 bg-white/25 dark:bg-zinc-950/25 p-8 rounded-3xl relative overflow-hidden">
                <AnimatePresence mode="wait">
                  {!formSubmitted ? (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleFormSubmit}
                      className="space-y-5"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-xs font-bold opacity-60 uppercase mb-2">Name</label>
                          <input
                            type="text"
                            required
                            placeholder="John Doe"
                            value={formState.name}
                            onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-black/10 dark:border-white/5 bg-white/40 dark:bg-black/40 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold opacity-60 uppercase mb-2">Email Address</label>
                          <input
                            type="email"
                            required
                            placeholder="john@example.com"
                            value={formState.email}
                            onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-black/10 dark:border-white/5 bg-white/40 dark:bg-black/40 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-xs font-bold opacity-60 uppercase mb-2">Website URL</label>
                          <input
                            type="text"
                            placeholder="example.com"
                            value={formState.website}
                            onChange={(e) => setFormState({ ...formState, website: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-black/10 dark:border-white/5 bg-white/40 dark:bg-black/40 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold opacity-60 uppercase mb-2">Service Required</label>
                          <select
                            value={formState.service}
                            onChange={(e) => setFormState({ ...formState, service: e.target.value })}
                            className="w-full px-4 py-3.5 rounded-xl border border-black/10 dark:border-white/5 bg-white/40 dark:bg-black/40 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-black dark:text-white"
                          >
                            <option value="SEO Services">SEO Services</option>
                            <option value="Website Development">Website Development</option>
                            <option value="Local SEO">Local SEO</option>
                            <option value="Google Business Optimization">Google Business Profile</option>
                            <option value="Digital Marketing">Digital Marketing</option>
                            <option value="AI Automation & Lead Gen">AI Automation & Lead Gen</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold opacity-60 uppercase mb-2">Message</label>
                        <textarea
                          rows={4}
                          placeholder="Tell us about your project & growth targets..."
                          value={formState.message}
                          onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-black/10 dark:border-white/5 bg-white/40 dark:bg-black/40 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-extrabold text-sm hover:opacity-95 shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 transition-all"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Booking Strategy Call...
                          </>
                        ) : (
                          <>
                            <Calendar className="w-4.5 h-4.5" />
                            Request Proposal & Book Call
                          </>
                        )}
                      </button>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-10"
                    >
                      <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 flex items-center justify-center mx-auto mb-6">
                        <ShieldCheck className="w-8 h-8" />
                      </div>
                      <h3 className="text-2xl font-extrabold">Strategy Call Scheduled!</h3>
                      <p className="text-sm opacity-60 mt-3 max-w-sm mx-auto leading-6">
                        Hi {formState.name}, we have received your request for {formState.service}. An invitation with meeting details has been dispatched to {formState.email}.
                      </p>
                      <div className="mt-5 p-3 rounded-xl bg-black/40 border border-white/5 font-mono text-[10px] text-cyan-400 text-left max-w-sm mx-auto">
                        <p className="opacity-50">// EMAIL TRANSCEIVER CORE</p>
                        <p className="mt-1 text-emerald-400">✓ SMTP connection initialized</p>
                        <p className="text-emerald-400">✓ Package dispatched to seowebagency.in@gmail.com</p>
                        <p className="text-zinc-500">Subject: Strategy Briefing Request - {formState.website || "No Web"}</p>
                      </div>
                      <button
                        onClick={() => setFormSubmitted(false)}
                        className="mt-8 px-6 py-2.5 rounded-xl border border-black/10 dark:border-white/10 text-xs font-bold hover:bg-black/5 dark:hover:bg-white/5 transition-all"
                      >
                        Submit Another Form
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 border-t border-black/5 dark:border-white/5 bg-zinc-50 dark:bg-black/40">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="flex flex-col items-start">
            <a href="#home" className="flex items-center gap-2 group mb-4 -my-4 overflow-visible">
              <img
                src="/logo.png"
                alt="SEOWebAgency Logo"
                className="h-22 sm:h-26 w-auto object-contain transition-all duration-300 group-hover:scale-[1.03] -my-5 sm:-my-6 drop-shadow-[0_0_12px_rgba(99,102,241,0.15)] dark:drop-shadow-[0_0_20px_rgba(34,211,238,0.45)] saturate-[1.3] hue-rotate-[120deg] dark:hue-rotate-[60deg] brightness-100 dark:brightness-[1.1]"
              />
            </a>
            <p className="text-[11px] opacity-50 font-semibold leading-5 max-w-[200px] mb-4">
              Futuristic, high-speed growth pipelines leveraging artificial intelligence systems.
            </p>
            {/* Prominent Contact Info */}
            <div className="space-y-2 text-xs font-bold opacity-85 mt-2">
              <a href="tel:+918803511070" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Phone className="w-3.5 h-3.5 text-indigo-500" />
                <span>+91 8803511070</span>
              </a>
              <a href="mailto:seowebagency.in@gmail.com" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Mail className="w-3.5 h-3.5 text-cyan-500" />
                <span>seowebagency.in@gmail.com</span>
              </a>
              <a href="https://wa.me/918860384919?text=Hello%20SEOWebAgency,%20I%20would%20like%20to%20know%20more%20about%20your%20services." className="flex items-center gap-2 hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">
                <MessageSquare className="w-3.5 h-3.5 text-emerald-500" />
                <span>WhatsApp Chat</span>
              </a>
            </div>
          </div>

          <div>
            <h5 className="text-xs font-extrabold tracking-wider uppercase opacity-40 mb-4">Core Offerings</h5>
            <ul className="space-y-2.5 text-xs font-bold opacity-75">
              <li>
                <a href="#services" className="hover:text-primary transition-colors">
                  Web Development
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-primary transition-colors">
                  Search Engine Optimization
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-primary transition-colors">
                  Local Search & Map Optimization
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-primary transition-colors">
                  Generative AI Automations
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="text-xs font-extrabold tracking-wider uppercase opacity-40 mb-4">Resources</h5>
            <ul className="space-y-2.5 text-xs font-bold opacity-75">
              <li>
                <a href="#results" className="hover:text-primary transition-colors">
                  Case Studies & ROI
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-primary transition-colors">
                  Diagnostics Engine
                </a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-primary transition-colors">
                  Client Reviews
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="text-xs font-extrabold tracking-wider uppercase opacity-40 mb-4">Verification</h5>
            <ul className="space-y-2.5 text-xs font-bold opacity-75">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                <span>Lighthouse: 100/100</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                <span>SEO Core Index: 100</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse" />
                <span>AI Agent Engine: Active</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 border-t border-black/5 dark:border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between text-[11px] opacity-60 font-semibold gap-4">
          <div className="flex items-center gap-3">
            <span>&copy; 2023 SEOWebAgency.</span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-[10px] font-extrabold tracking-wider uppercase animate-pulse-slow">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              All Systems Nominal
            </span>
          </div>
          <div className="flex gap-6">
            <a href="/terms" className="hover:text-primary transition-colors">
              Terms & Protocols
            </a>
            <a href="/privacy" className="hover:text-primary transition-colors">
              Privacy Shield
            </a>
          </div>
        </div>
      </footer>

      {/* Floating Elements */}
      <WhatsAppButton />
    </div>
  );
}
