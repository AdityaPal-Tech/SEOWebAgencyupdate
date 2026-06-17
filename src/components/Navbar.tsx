"use client";

import React, { useState, useEffect } from "react";
import { Moon, Sun, MessageSquare, Calendar, Menu, X, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Initial theme set
    const savedTheme = localStorage.getItem("theme") as "dark" | "light" | null;
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    const initialTheme = savedTheme || (systemPrefersDark ? "dark" : "light");
    setTheme(initialTheme);
    
    if (initialTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const navItems = [
    { label: "Home", href: "/#home" },
    { label: "Services", href: "/#services" },
    { label: "Solutions", href: "/#solutions" },
    { label: "Results", href: "/#results" },
    { label: "About", href: "/about" },
    { label: "Testimonials", href: "/#testimonials" },
    { label: "Pricing", href: "/#pricing" },
    { label: "Contact", href: "/#contact" },
  ];

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "py-3 bg-white/70 dark:bg-black/70 backdrop-blur-xl border-b border-black/5 dark:border-white/5 shadow-lg shadow-black/5"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-2 group -my-4 overflow-visible">
          <img
            src="/logo.png"
            alt="SEOWebAgency Logo"
            className="h-24 sm:h-28 md:h-32 w-auto object-contain transition-all duration-300 group-hover:scale-[1.03] -my-6 sm:-my-7 md:-my-8 drop-shadow-[0_0_15px_rgba(99,102,241,0.2)] dark:drop-shadow-[0_0_25px_rgba(34,211,238,0.55)] saturate-[1.3] hue-rotate-[120deg] dark:hue-rotate-[60deg] brightness-100 dark:brightness-[1.1]"
          />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 bg-black/5 dark:bg-white/5 px-2 py-1.5 rounded-full border border-black/10 dark:border-white/5">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-xs font-semibold px-4 py-2 rounded-full transition-colors opacity-75 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/5"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Theme switcher */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="p-2.5 rounded-full border border-black/10 dark:border-white/5 bg-white/50 dark:bg-zinc-900/50 hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          >
            {theme === "dark" ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
          </button>

          {/* Call CTA */}
          <a
            href="tel:+918803511070"
            className="flex items-center gap-1.5 text-xs font-bold px-4 py-2.5 rounded-full border border-black/10 dark:border-white/5 bg-white/50 dark:bg-zinc-900/50 hover:bg-black/5 dark:hover:bg-white/10 transition-all shadow-sm whitespace-nowrap shrink-0"
          >
            <Phone className="w-3.5 h-3.5 text-indigo-500" />
            +91 8803511070
          </a>

          {/* WhatsApp */}
          <a
            href="https://wa.me/918860384919?text=Hello%20SEOWebAgency,%20I%20would%20like%20to%20know%20more%20about%20your%20services."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-bold px-4 py-2.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 transition-all shadow-sm whitespace-nowrap shrink-0"
          >
            <MessageSquare className="w-4 h-4" />
            WhatsApp
          </a>

          {/* Consultation CTA */}
          <a
            href="/#contact"
            className="text-xs font-bold px-5 py-2.5 rounded-full bg-primary text-white hover:bg-indigo-600 shadow-md shadow-indigo-500/25 transition-all whitespace-nowrap shrink-0"
          >
            Book Free Call
          </a>
        </div>

        {/* Mobile Action Buttons (Menu & Theme toggle) */}
        <div className="flex lg:hidden items-center gap-3">
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="p-2 rounded-full border border-black/10 dark:border-white/5 bg-white/50 dark:bg-zinc-900/50"
          >
            {theme === "dark" ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-full border border-black/10 dark:border-white/5 bg-white/50 dark:bg-zinc-900/50"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-b border-black/10 dark:border-white/5 bg-white dark:bg-black px-6 py-6 absolute top-[100%] left-0 right-0 shadow-xl"
          >
            <nav className="flex flex-col gap-4 mb-6">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-semibold tracking-wide py-1 border-b border-black/5 dark:border-white/5"
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <div className="flex flex-col gap-3">
              <a
                href="tel:+918803511070"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 font-bold py-3 rounded-xl border border-black/10 dark:border-white/10 bg-white/50 dark:bg-zinc-900/50 text-black dark:text-white"
              >
                <Phone className="w-4.5 h-4.5 text-indigo-500" />
                Call: +91 8803511070
              </a>
              <a
                href="https://wa.me/918860384919?text=Hello%20SEOWebAgency,%20I%20would%20like%20to%20know%20more%20about%20your%20services."
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 font-bold py-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
              >
                <MessageSquare className="w-4.5 h-4.5" />
                Chat on WhatsApp
              </a>
              <a
                href="/#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center font-bold py-3 rounded-xl bg-primary text-white shadow-lg shadow-indigo-500/20"
              >
                <Calendar className="w-4.5 h-4.5 mr-2" />
                Book Free Consultation
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
