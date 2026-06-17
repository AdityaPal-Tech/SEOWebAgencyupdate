"use client";

import React, { useState, useEffect, useRef } from "react";
import { Moon, Sun, Laptop, MessageSquare, Calendar, Menu, X, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system");
  const [showThemeDropdown, setShowThemeDropdown] = useState(false);
  const [showMobileThemeDropdown, setShowMobileThemeDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileDropdownRef = useRef<HTMLDivElement>(null);

  // Load theme from localStorage or default to system
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | "system" | null;
    const initialTheme = savedTheme || "system";
    setTheme(initialTheme);
  }, []);

  // Handle class modifications on documentElement and register system query change listeners
  useEffect(() => {
    const root = document.documentElement;
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const applyTheme = () => {
      if (theme === "dark") {
        root.classList.add("dark");
      } else if (theme === "light") {
        root.classList.remove("dark");
      } else {
        // system theme
        if (mediaQuery.matches) {
          root.classList.add("dark");
        } else {
          root.classList.remove("dark");
        }
      }
    };

    applyTheme();

    const handleSystemThemeChange = () => {
      if (theme === "system") {
        applyTheme();
      }
    };

    mediaQuery.addEventListener("change", handleSystemThemeChange);
    return () => mediaQuery.removeEventListener("change", handleSystemThemeChange);
  }, [theme]);

  // Handle scroll class toggle
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle outside clicks to close theme dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowThemeDropdown(false);
      }
      if (mobileDropdownRef.current && !mobileDropdownRef.current.contains(event.target as Node)) {
        setShowMobileThemeDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
        ? "py-3 bg-white/70 dark:bg-black/70 backdrop-blur-xl border-b border-black/5 dark:border-white/5 shadow-lg shadow-black/5"
        : "py-5 bg-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo (Increased size by ~12.5% and optimized prominence) */}
        <a href="/#home" className="flex items-center gap-2 group -my-4 overflow-visible">
          <img
            src="/logo.png"
            alt="SEOWebAgency Logo"
            className="h-28 sm:h-32 md:h-36 w-auto object-contain transition-all duration-300 group-hover:scale-[1.03] -my-8 sm:-my-9 md:-my-10 drop-shadow-[0_0_15px_rgba(99,102,241,0.2)] dark:drop-shadow-[0_0_25px_rgba(34,211,238,0.55)] saturate-[1.3] hue-rotate-[120deg] dark:hue-rotate-[60deg] brightness-100 dark:brightness-[1.1]"
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

        {/* Desktop CTAs (Perfect inline alignment and equal heights) */}
        <div className="hidden lg:flex items-center gap-3">

          {/* Theme switcher with separator gap */}
          <div ref={dropdownRef} className="relative mr-2 pr-4 border-r border-black/10 dark:border-white/5 flex items-center">
            <button
              onClick={() => setShowThemeDropdown(!showThemeDropdown)}
              aria-label="Select Theme"
              className="p-2.5 rounded-full border border-black/10 dark:border-white/5 bg-white/50 dark:bg-zinc-900/50 hover:bg-black/5 dark:hover:bg-white/10 active:scale-95 transition-all cursor-pointer flex items-center justify-center"
            >
              {theme === "light" && <Sun className="w-4 h-4 text-amber-500 animate-spin-slow" />}
              {theme === "dark" && <Moon className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />}
              {theme === "system" && <Laptop className="w-4 h-4 text-zinc-500" />}
            </button>

            <AnimatePresence>
              {showThemeDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-2 w-36 glass-panel rounded-2xl p-1.5 shadow-xl border border-black/15 dark:border-white/10 z-50 bg-white/90 dark:bg-zinc-950/90"
                >
                  <button
                    onClick={() => {
                      setTheme("light");
                      localStorage.setItem("theme", "light");
                      setShowThemeDropdown(false);
                    }}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-bold rounded-xl text-left transition-colors cursor-pointer ${theme === "light"
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-black/5 dark:hover:bg-white/5 opacity-75 hover:opacity-100"
                      }`}
                  >
                    <Sun className="w-3.5 h-3.5 text-amber-500" />
                    <span>Light</span>
                  </button>
                  <button
                    onClick={() => {
                      setTheme("dark");
                      localStorage.setItem("theme", "dark");
                      setShowThemeDropdown(false);
                    }}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-bold rounded-xl text-left transition-colors cursor-pointer ${theme === "dark"
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-black/5 dark:hover:bg-white/5 opacity-75 hover:opacity-100"
                      }`}
                  >
                    <Moon className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
                    <span>Dark</span>
                  </button>
                  <button
                    onClick={() => {
                      setTheme("system");
                      localStorage.setItem("theme", "system");
                      setShowThemeDropdown(false);
                    }}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-bold rounded-xl text-left transition-colors cursor-pointer ${theme === "system"
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-black/5 dark:hover:bg-white/5 opacity-75 hover:opacity-100"
                      }`}
                  >
                    <Laptop className="w-3.5 h-3.5 text-zinc-500" />
                    <span>System</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Call CTA */}
          <a
            href="tel:+918803511070"
            aria-label="Call Us"
            className="p-2.5 rounded-full border border-black/10 dark:border-white/5 bg-white/50 dark:bg-zinc-900/50 hover:bg-black/5 dark:hover:bg-white/10 active:scale-95 transition-all cursor-pointer flex items-center justify-center shrink-0"
          >
            <Phone className="w-4 h-4 text-indigo-500" />
          </a>

          {/* WhatsApp CTA */}
          <a
            href="https://wa.me/918860384919?text=Hello%20SEOWebAgency,%20I%20would%20like%20to%20know%20more%20about%20your%20services."
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className="p-2.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 hover:bg-emerald-500/20 dark:hover:bg-emerald-500/20 active:scale-95 transition-all cursor-pointer flex items-center justify-center shrink-0"
          >
            <MessageSquare className="w-4 h-4 text-emerald-500" />
          </a>

          {/* Contact / Consultation CTA */}
          <a
            href="/#contact"
            className="h-[38px] flex items-center justify-center gap-1.5 text-xs font-bold px-5 rounded-full bg-primary text-white hover:bg-indigo-600 shadow-md shadow-indigo-500/25 transition-all whitespace-nowrap shrink-0 active:scale-95"
          >
            Book Free Call
          </a>
        </div>

        {/* Mobile Action Buttons (Menu & Theme toggle) */}
        <div className="flex lg:hidden items-center gap-3">

          {/* Mobile Theme Toggle dropdown */}
          <div ref={mobileDropdownRef} className="relative">
            <button
              onClick={() => setShowMobileThemeDropdown(!showMobileThemeDropdown)}
              aria-label="Select Theme"
              className="p-2.5 rounded-full border border-black/10 dark:border-white/5 bg-white/50 dark:bg-zinc-900/50 flex items-center justify-center cursor-pointer"
            >
              {theme === "light" && <Sun className="w-4 h-4 text-amber-500" />}
              {theme === "dark" && <Moon className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />}
              {theme === "system" && <Laptop className="w-4 h-4 text-zinc-500" />}
            </button>

            <AnimatePresence>
              {showMobileThemeDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-2 w-36 glass-panel rounded-2xl p-1.5 shadow-xl border border-black/15 dark:border-white/10 z-50 bg-white/90 dark:bg-zinc-950/90"
                >
                  <button
                    onClick={() => {
                      setTheme("light");
                      localStorage.setItem("theme", "light");
                      setShowMobileThemeDropdown(false);
                    }}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-bold rounded-xl text-left transition-colors cursor-pointer ${theme === "light"
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-black/5 dark:hover:bg-white/5 opacity-75 hover:opacity-100"
                      }`}
                  >
                    <Sun className="w-3.5 h-3.5 text-amber-500" />
                    <span>Light </span>
                  </button>
                  <button
                    onClick={() => {
                      setTheme("dark");
                      localStorage.setItem("theme", "dark");
                      setShowMobileThemeDropdown(false);
                    }}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-bold rounded-xl text-left transition-colors cursor-pointer ${theme === "dark"
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-black/5 dark:hover:bg-white/5 opacity-75 hover:opacity-100"
                      }`}
                  >
                    <Moon className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
                    <span>Dark </span>
                  </button>
                  <button
                    onClick={() => {
                      setTheme("system");
                      localStorage.setItem("theme", "system");
                      setShowMobileThemeDropdown(false);
                    }}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-bold rounded-xl text-left transition-colors cursor-pointer ${theme === "system"
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-black/5 dark:hover:bg-white/5 opacity-75 hover:opacity-100"
                      }`}
                  >
                    <Laptop className="w-3.5 h-3.5 text-zinc-500" />
                    <span>System </span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-full border border-black/10 dark:border-white/5 bg-white/50 dark:bg-zinc-900/50"
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
                  className="text-sm font-semibold tracking-wide py-1 border-b border-black/5 dark:border-white/5 text-left"
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
                <MessageSquare className="w-4.5 h-4.5 text-emerald-500" />
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
