"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Flame, MessageSquare, Phone, Mail, Sparkles } from "lucide-react";

interface PlanFeature {
  text: string;
}

interface PricingPlan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  whatsappText: string;
  popular?: boolean;
}

const seoPlans: PricingPlan[] = [
  {
    name: "Starter SEO",
    price: "₹2,999",
    period: "/month",
    description: "Perfect for local businesses and startups looking to build initial search footprints.",
    features: [
      "On-Page SEO Optimization",
      "Keyword Research (10 Keywords)",
      "Google Business Profile Optimization",
      "Monthly SEO Report",
      "Technical SEO Audit",
      "Basic Competitor Analysis",
      "WhatsApp Support",
    ],
    cta: "Start SEO",
    whatsappText: "Hello SEOWebAgency, I'm interested in the Starter SEO package (₹2,999/month). Please guide me on the next steps.",
  },
  {
    name: "Business Growth",
    price: "₹7,999",
    period: "/month",
    description: "Ideal for growing companies aiming to expand organic traffic and lead conversions.",
    features: [
      "Complete SEO Optimization",
      "Local SEO Optimization",
      "25 Target Keywords",
      "Content Optimization",
      "Backlink Strategy",
      "Google Analytics Setup",
      "Monthly Reports",
      "Priority Support",
    ],
    cta: "Grow My Business",
    whatsappText: "Hello SEOWebAgency, I'm interested in the Business Growth SEO package (₹7,999/month). Let's schedule a call.",
    popular: true,
  },
  {
    name: "Premium Growth",
    price: "₹14,999",
    period: "/month",
    description: "Designed for businesses seeking aggressive expansion, automation, and dedicated management.",
    features: [
      "Advanced SEO Strategy",
      "Unlimited Keyword Tracking",
      "Competitor Analysis",
      "High-Quality Backlinks",
      "Conversion Optimization",
      "AI Marketing Automation",
      "Dedicated SEO Manager",
      "Priority Support",
    ],
    cta: "Scale My Business",
    whatsappText: "Hello SEOWebAgency, I'm interested in the Premium Growth SEO package (₹14,999/month). Let's connect.",
  },
];

const webPlans: PricingPlan[] = [
  {
    name: "Basic Website",
    price: "₹9,999",
    period: " One-Time",
    description: "Affordable and clean mobile-friendly site to establish your brand's digital presence.",
    features: [
      "5 Pages Website",
      "Mobile Responsive Design",
      "WhatsApp Chat Integration",
      "Contact Inquiry Form",
      "Basic SEO Setup",
      "SSL Certificate Install",
      "1 Month Free Support",
    ],
    cta: "Build Website",
    whatsappText: "Hello SEOWebAgency, I'm interested in the Basic Website package (₹9,999). I'd like to get started.",
  },
  {
    name: "Business Website",
    price: "₹19,999",
    period: " One-Time",
    description: "High-performance premium site complete with custom layouts, blog system, and optimization.",
    features: [
      "10–15 Pages Website",
      "Premium UI/UX Design",
      "Advanced SEO Setup",
      "Fully Functional Blog System",
      "Lead Capture Forms",
      "Speed & Core Web Vitals Optimization",
      "Google Analytics Integration",
      "3 Months Free Support",
    ],
    cta: "Launch Website",
    whatsappText: "Hello SEOWebAgency, I'm interested in the Business Website package (₹19,999). Let's design my site.",
    popular: true,
  },
  {
    name: "Premium Business Website",
    price: "₹29,999+",
    period: " starting",
    description: "Full-scale custom platform built with Next.js/React, AI features, and direct CRM pipelines.",
    features: [
      "Fully Custom Unique Design",
      "Premium SaaS-Style UI/UX",
      "Artificial Intelligence (AI) Integration",
      "CRM & Autoresponder Integration",
      "Marketing Automation Setup",
      "Advanced Web Security & Firewalls",
      "Edge-Network Speed Optimization",
      "Lifetime Technical Support*",
    ],
    cta: "Contact Us",
    whatsappText: "Hello SEOWebAgency, I'd like to query about the Premium Business Website package (₹29,999+). Let's discuss requirements.",
  },
];

export default function Pricing() {
  const [activeTab, setActiveTab] = useState<"seo" | "web">("seo");

  const currentPlans = activeTab === "seo" ? seoPlans : webPlans;

  return (
    <section id="pricing" className="relative py-24 border-t border-black/5 dark:border-white/5 bg-zinc-50/50 dark:bg-black/[0.05] overflow-hidden">
      {/* Visual background meshes */}
      <div className="absolute top-1/3 left-1/4 w-[350px] h-[350px] glow-mesh glow-mesh-indigo rounded-full pointer-events-none opacity-20 dark:opacity-30" />
      <div className="absolute bottom-1/3 right-1/4 w-[350px] h-[350px] glow-mesh glow-mesh-cyan rounded-full pointer-events-none opacity-20 dark:opacity-30" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold bg-primary/10 text-primary px-3 py-1 rounded-full uppercase tracking-wider">
            Investment Plans
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold mt-4 tracking-tight">
            SEO & Website Solutions for Every Business
          </h2>
          <p className="text-sm opacity-60 mt-3 font-semibold">
            Choose a high-converting plan tailored to scale your leads, rankings, and digital authority.
          </p>

          {/* Toggle Switcher */}
          <div className="grid grid-cols-2 p-1.5 rounded-2xl bg-black/5 dark:bg-zinc-900/50 border border-black/10 dark:border-white/5 mt-10 relative max-w-md mx-auto w-full backdrop-blur-md shadow-inner">
            <button
              onClick={() => setActiveTab("seo")}
              className={`py-3 rounded-xl text-xs font-extrabold transition-colors duration-300 relative z-10 cursor-pointer ${
                activeTab === "seo" ? "text-white" : "opacity-60 text-black dark:text-white hover:opacity-100"
              }`}
            >
              SEO Campaigns (Monthly)
              {activeTab === "seo" && (
                <motion.div
                  layoutId="activePricingTab"
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 shadow-lg shadow-indigo-500/25 z-[-1]"
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
              )}
            </button>
            <button
              onClick={() => setActiveTab("web")}
              className={`py-3 rounded-xl text-xs font-extrabold transition-colors duration-300 relative z-10 cursor-pointer ${
                activeTab === "web" ? "text-white" : "opacity-60 text-black dark:text-white hover:opacity-100"
              }`}
            >
              Website Development (One-Time)
              {activeTab === "web" && (
                <motion.div
                  layoutId="activePricingTab"
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 shadow-lg shadow-indigo-500/25 z-[-1]"
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
              )}
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-20">
          <AnimatePresence mode="wait">
            {currentPlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className={`glass-panel border rounded-3xl p-8 flex flex-col justify-between relative transition-all duration-300 ${
                  plan.popular
                    ? "border-primary bg-white/30 dark:bg-zinc-950/30 ring-2 ring-indigo-500/40 shadow-xl shadow-indigo-500/10"
                    : "border-black/5 dark:border-white/5 bg-white/20 dark:bg-zinc-950/20"
                }`}
              >
                {/* Popular Glow Ring / Accent Tag */}
                {plan.popular && (
                  <span className="absolute -top-3.5 right-6 inline-flex items-center gap-1 px-3.5 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-black uppercase tracking-wider shadow-md animate-pulse">
                    <Flame className="w-3.5 h-3.5" />
                    Most Popular
                  </span>
                )}

                <div>
                  <div className="flex justify-between items-start">
                    <h4 className="text-lg font-black tracking-tight">{plan.name}</h4>
                    {plan.popular && <Sparkles className="w-5 h-5 text-amber-500" />}
                  </div>
                  <p className="text-xs opacity-60 font-semibold mt-2.5 leading-5 min-h-[40px]">
                    {plan.description}
                  </p>

                  <div className="mt-6 mb-6">
                    <span className="text-3xl font-black tracking-tight">{plan.price}</span>
                    <span className="text-xs opacity-60 font-bold">{plan.period}</span>
                  </div>

                  <ul className="space-y-4 border-t border-black/5 dark:border-white/5 pt-6">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 text-xs font-semibold">
                        <div className="w-4.5 h-4.5 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                        <span className="opacity-80">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-4">
                  <a
                    href={`https://wa.me/918860384919?text=${encodeURIComponent(plan.whatsappText)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block w-full py-3 rounded-2xl text-center text-xs font-black transition-all shadow-md ${
                      plan.popular
                        ? "bg-gradient-to-r from-indigo-500 to-cyan-500 text-white hover:opacity-95 shadow-indigo-500/25"
                        : "bg-white/80 dark:bg-zinc-900/60 border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 text-black dark:text-white"
                    }`}
                  >
                    {plan.cta}
                  </a>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Need a Custom Solution Callout */}
        <div className="glass-panel border border-black/5 dark:border-white/5 bg-white/20 dark:bg-zinc-950/20 rounded-3xl p-8 max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg shadow-black/5">
          <div className="text-left">
            <h4 className="text-lg font-black tracking-tight">Need a Custom Solution?</h4>
            <p className="text-xs opacity-60 font-semibold mt-1">
              Custom integrations, unique agency partnerships, or tailored scopes? Let's design a program specifically for your scale.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 justify-center md:justify-end shrink-0">
            <a
              href="tel:+918803511070"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-black/10 dark:border-white/10 bg-white/40 dark:bg-zinc-900/40 hover:bg-black/5 dark:hover:bg-white/5 text-xs font-bold transition-all"
            >
              <Phone className="w-3.5 h-3.5 text-indigo-500" />
              Call Team
            </a>
            <a
              href="https://wa.me/918860384919?text=Hello%20SEOWebAgency,%20I'm%20looking%20for%20a%20custom%20SEO%20or%20Website%20solution.%20Let's%20discuss."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-black/10 dark:border-white/10 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 text-xs font-bold transition-all"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-500" />
              WhatsApp
            </a>
            <a
              href="mailto:seowebagency.in@gmail.com?subject=Custom%20SEO%20/%20Website%20Solution%20Inquiry"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-black/10 dark:border-white/10 bg-white/40 dark:bg-zinc-900/40 hover:bg-black/5 dark:hover:bg-white/5 text-xs font-bold transition-all"
            >
              <Mail className="w-3.5 h-3.5 text-cyan-500" />
              Email
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
