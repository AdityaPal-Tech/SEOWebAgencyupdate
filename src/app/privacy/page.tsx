"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ShieldAlert,
  ShieldCheck,
  Eye,
  Mail,
  Phone,
  Lock,
  Database,
  Globe,
  Settings,
  Activity,
  UserCheck,
  ListTodo,
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

export default function PrivacyPage() {
  const glowPos = useCursorGlow();

  const collectedInfo = [
    { title: "Personal Details", desc: "Name, email address, and phone number to verify user identities.", icon: UserCheck },
    { title: "Business Metrics", desc: "Website URLs, SEO parameters, and search visibility values.", icon: Database },
    { title: "Analytics Data", desc: "Usage metrics, search queries, and engagement statistics.", icon: Activity },
  ];

  const usagePurposes = [
    { title: "Provide Services", desc: "Setting up campaign assets, indexing checks, and map positioning.", icon: Settings },
    { title: "System Analytics", desc: "Evaluating page load speeds, sitemap structures, and crawler depth.", icon: Globe },
    { title: "Client Briefings", desc: "Sending SEO report cards, lead alerts, and update messages.", icon: Mail },
  ];

  const protections = [
    { title: "SSL Encryption", desc: "All incoming traffic and form submissions are protected via active SSL transport layer protocols.", icon: Lock },
    { title: "Secure Storage", desc: "Database servers run strict firewall blocks to prevent unauthorized ingress.", icon: Database },
    { title: "Access Controls", desc: "Data access is restricted to verified optimization leads working on client accounts.", icon: ShieldCheck },
    { title: "Systems Monitoring", desc: "Continuous security checking to audit threat logs and system alerts.", icon: Activity },
  ];

  const thirdParties = [
    { name: "Google Analytics", type: "Traffic tracking and session diagnostics." },
    { name: "WhatsApp Integration", type: "Encrypted direct communication API." },
    { name: "SMTP Captures", type: "SSL-secured email transceiver routing." },
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
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 text-[10px] font-extrabold tracking-wider uppercase mb-6"
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            Security Shield Active
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-black tracking-tight text-black dark:text-white"
          >
            Privacy Shield
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm sm:text-base opacity-60 mt-4 max-w-xl mx-auto font-medium"
          >
            How we protect, process, and secure user diagnostic parameters.
          </motion.p>
        </div>
      </section>

      {/* Main Info Columns */}
      <section className="relative py-20 border-t border-black/5 dark:border-white/5 bg-black/[0.01] dark:bg-white/[0.01]">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-sm text-left opacity-75 font-bold leading-relaxed mb-12 max-w-2xl border-l-2 border-primary pl-4">
            SEOWebAgency values your privacy and is committed to protecting your information.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Left: What We Collect */}
            <div className="space-y-6 text-left">
              <h3 className="text-lg font-extrabold text-indigo-500 flex items-center gap-2">
                <ListTodo className="w-5 h-5" />
                Information We Collect
              </h3>
              <div className="space-y-4">
                {collectedInfo.map((info) => {
                  const InfoIcon = info.icon;
                  return (
                    <div key={info.title} className="glass-panel border-black/5 dark:border-white/5 bg-white/20 dark:bg-zinc-950/20 p-5 rounded-2xl flex gap-3.5">
                      <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-500 flex items-center justify-center shrink-0">
                        <InfoIcon className="w-4.5 h-4.5" />
                      </div>
                      <div>
                        <h4 className="font-extrabold text-xs mb-1">{info.title}</h4>
                        <p className="text-[11px] opacity-60 font-semibold leading-relaxed">{info.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: How We Use It */}
            <div className="space-y-6 text-left">
              <h3 className="text-lg font-extrabold text-cyan-500 flex items-center gap-2">
                <Eye className="w-5 h-5" />
                How We Use Information
              </h3>
              <div className="space-y-4">
                {usagePurposes.map((purpose) => {
                  const PurposeIcon = purpose.icon;
                  return (
                    <div key={purpose.title} className="glass-panel border-black/5 dark:border-white/5 bg-white/20 dark:bg-zinc-950/20 p-5 rounded-2xl flex gap-3.5">
                      <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-500 flex items-center justify-center shrink-0">
                        <PurposeIcon className="w-4.5 h-4.5" />
                      </div>
                      <div>
                        <h4 className="font-extrabold text-xs mb-1">{purpose.title}</h4>
                        <p className="text-[11px] opacity-60 font-semibold leading-relaxed">{purpose.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Protections Section */}
      <section className="relative py-24 border-t border-black/5 dark:border-white/5">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-left mb-12">
            <span className="text-xs font-semibold bg-emerald-500/10 text-emerald-500 px-3 py-1 rounded-full uppercase tracking-wider">
              Encryption & Controls
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold mt-3 tracking-tight">
              Data Protection Safeguards
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {protections.map((prot, idx) => {
              const ProtIcon = prot.icon;
              return (
                <div key={prot.title} className="glass-panel border-black/5 dark:border-white/5 bg-white/20 dark:bg-zinc-950/20 p-6 rounded-2xl flex flex-col justify-between text-left hover:border-emerald-500/10 transition-colors duration-300">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-4">
                    <ProtIcon className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-xs mb-1.5">{prot.title}</h4>
                    <p className="text-[10px] opacity-60 font-semibold leading-relaxed">{prot.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Third Parties & Data Deletion */}
      <section className="relative py-24 border-t border-black/5 dark:border-white/5 bg-black/[0.01] dark:bg-white/[0.01]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-stretch">
            {/* Third Parties */}
            <div className="md:col-span-6 text-left space-y-6">
              <div>
                <span className="text-xs font-semibold bg-indigo-500/10 text-indigo-500 px-3 py-1 rounded-full uppercase tracking-wider">
                  Partner Integrations
                </span>
                <h3 className="text-xl font-extrabold mt-3">Third-Party Services</h3>
              </div>
              
              <div className="space-y-3">
                {thirdParties.map((tp) => (
                  <div key={tp.name} className="p-4 rounded-xl border border-black/5 dark:border-white/5 bg-white/10 dark:bg-zinc-900/10 flex justify-between items-center text-xs font-semibold">
                    <span className="opacity-90">{tp.name}</span>
                    <span className="opacity-50 text-[10px]">{tp.type}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Data Deletion Requests */}
            <div className="md:col-span-6 flex flex-col justify-between text-left space-y-6">
              <div>
                <span className="text-xs font-semibold bg-emerald-500/10 text-emerald-500 px-3 py-1 rounded-full uppercase tracking-wider">
                  Access & Deletion
                </span>
                <h3 className="text-xl font-extrabold mt-3">User Data Rights</h3>
                <p className="text-xs opacity-60 mt-3 font-semibold leading-relaxed">
                  Users may request modification, transfer, or complete deletion of their stored tracking variables or contact brief entries by contacting us directly.
                </p>
              </div>

              <div className="p-5 rounded-2xl glass-panel border-black/5 dark:border-white/5 bg-white/20 dark:bg-zinc-950/20 space-y-3.5">
                <a href="mailto:seowebagency.in@gmail.com" className="flex items-center gap-3 text-xs font-extrabold hover:text-primary transition-all">
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-500 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span>seowebagency.in@gmail.com</span>
                </a>
                <a href="tel:+918803511070" className="flex items-center gap-3 text-xs font-extrabold hover:text-primary transition-all">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-500 shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <span>+91 8803511070</span>
                </a>
              </div>
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
            <a href="/privacy" className="hover:text-primary transition-colors text-primary font-bold">
              Privacy Shield
            </a>
          </div>
        </div>
        <div className="text-[9px] opacity-40 font-semibold mt-4 text-center">
          Last Updated: 2026
        </div>
      </footer>

      {/* WhatsApp Button */}
      <WhatsAppButton />
    </div>
  );
}
