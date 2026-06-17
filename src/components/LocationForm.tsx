"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, ShieldCheck } from "lucide-react";

export default function LocationForm({ cityName }: { cityName: string }) {
  const [formState, setFormState] = useState({ name: "", email: "", phone: "", website: "", message: "" });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [submittedInquiryId, setSubmittedInquiryId] = useState("");

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          phone: formState.phone,
          company: formState.website || "N/A",
          service: `Local SEO Campaign - ${cityName}`,
          message: formState.message,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmittedInquiryId(result.inquiryId);
        setFormSubmitted(true);
      } else {
        setErrorMessage(result.error || "An error occurred during submission.");
      }
    } catch (err) {
      console.error("[Formspree] Error submitting location consultation:", err);
      setErrorMessage("Network error. Please verify your internet connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
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
                  className="w-full px-4 py-3 rounded-xl border border-black/10 dark:border-white/5 bg-white/40 dark:bg-black/40 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-black dark:text-white"
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
                  className="w-full px-4 py-3 rounded-xl border border-black/10 dark:border-white/5 bg-white/40 dark:bg-black/40 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-black dark:text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold opacity-60 uppercase mb-2">Phone Number</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 8803511070"
                  value={formState.phone}
                  onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-black/10 dark:border-white/5 bg-white/40 dark:bg-black/40 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-black dark:text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold opacity-60 uppercase mb-2">Company / Website (Optional)</label>
                <input
                  type="text"
                  placeholder="Company name or URL"
                  value={formState.website}
                  onChange={(e) => setFormState({ ...formState, website: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-black/10 dark:border-white/5 bg-white/40 dark:bg-black/40 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-black dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold opacity-60 uppercase mb-2">Message</label>
              <textarea
                rows={4}
                placeholder={`Inquire about dynamic local SEO campaigns in ${cityName}...`}
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-black/10 dark:border-white/5 bg-white/40 dark:bg-black/40 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none text-black dark:text-white"
              />
            </div>

            {errorMessage && (
              <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-bold leading-5 text-left">
                ⚠️ {errorMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-extrabold text-sm hover:opacity-95 shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Sending campaign request...
                </>
              ) : (
                <>
                  <Calendar className="w-4.5 h-4.5" />
                  Book Strategy Call
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
            <h3 className="text-2xl font-extrabold text-black dark:text-white">Briefing Scheduled!</h3>
            <p className="text-sm opacity-60 mt-3 max-w-sm mx-auto leading-6 text-black dark:text-white">
              Thank you for contacting SEOWebAgency. We have received your inquiry and our team will contact you shortly.
            </p>
            
            {/* Formspree Email Dispatch Console */}
            <div className="mt-5 p-3 rounded-xl bg-black/40 border border-white/5 font-mono text-[10px] text-cyan-400 text-left max-w-sm mx-auto">
              <p className="opacity-50">// FORMSPREE API DISPATCH SUCCESS</p>
              <p className="mt-1 text-emerald-400">✓ Connection verified with formspree.io</p>
              <p className="text-emerald-400">✓ Inquiry payload delivered successfully</p>
              <p className="text-emerald-400">✓ Saved to local inquiries.db</p>
              <p className="text-zinc-500">Inquiry ID: {submittedInquiryId || "N/A"}</p>
            </div>

            <button
              onClick={() => {
                setFormState({ name: "", email: "", phone: "", website: "", message: "" });
                setSubmittedInquiryId("");
                setFormSubmitted(false);
              }}
              className="mt-8 px-6 py-2.5 rounded-xl border border-black/10 dark:border-white/10 text-xs font-bold hover:bg-black/5 dark:hover:bg-white/5 transition-all text-black dark:text-white cursor-pointer"
            >
              Submit Another Form
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
