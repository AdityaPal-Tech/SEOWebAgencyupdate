"use client";

import React from "react";
import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function WhatsAppButton() {
  const whatsappUrl = "https://wa.me/918860384919?text=Hello%20SEOWebAgency,%20I%20would%20like%20to%20know%20more%20about%20your%20services.";

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.5, type: "spring", stiffness: 260, damping: 20 }}
      className="fixed bottom-6 right-6 z-50 pointer-events-auto"
    >
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact us on WhatsApp"
        className="relative flex items-center justify-center w-14 h-14 rounded-full bg-emerald-500 text-white shadow-xl shadow-emerald-500/30 hover:bg-emerald-600 transition-all hover:scale-105 active:scale-95 group"
      >
        {/* Pulsing Outer Rings */}
        <span className="absolute inset-0 rounded-full bg-emerald-500 opacity-40 animate-ping pointer-events-none" />
        <span className="absolute -inset-1.5 rounded-full border-2 border-emerald-500/20 animate-pulse pointer-events-none" />

        <MessageCircle className="w-7 h-7" />

        {/* Hover Label */}
        <span className="absolute right-16 bg-white dark:bg-zinc-900 border border-black/10 dark:border-white/5 text-black dark:text-white px-3 py-1.5 rounded-xl text-xs font-extrabold whitespace-nowrap shadow-lg opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none">
          Chat on WhatsApp
        </span>
      </a>
    </motion.div>
  );
}
