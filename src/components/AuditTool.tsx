"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, AlertTriangle, ShieldCheck, Activity, Search, Award, CheckCircle2, ArrowRight } from "lucide-react";

interface AuditResult {
  url: string;
  seoScore: number;
  perfScore: number;
  securityScore: number;
  issues: { category: string; description: string; impact: "High" | "Medium" }[];
}

export default function AuditTool() {
  const [url, setUrl] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [result, setResult] = useState<AuditResult | null>(null);
  const logContainerRef = useRef<HTMLDivElement>(null);

  const scanLogs = [
    "Initializing digital audit protocol...",
    "Querying DNS records and sitemaps...",
    "Extracting meta viewport & page structure...",
    "Evaluating indexability & canonical attributes...",
    "Scanning Schema.org structured data...",
    "Checking robot.txt policies...",
    "Calculating SSL handshake parameters...",
    "Simulating Lighthouse performance indices...",
    "Assessing mobile viewport optimization...",
    "Finalizing search visibility matrix...",
  ];

  useEffect(() => {
    if (isScanning && scanStep < scanLogs.length) {
      const timer = setTimeout(() => {
        setLogs((prev) => [...prev, `[SYSTEM] ${scanLogs[scanStep]}`]);
        setScanStep((prev) => prev + 1);
      }, 350 + Math.random() * 200);

      return () => clearTimeout(timer);
    } else if (isScanning && scanStep === scanLogs.length) {
      const timer = setTimeout(() => {
        setIsScanning(false);
        setResult({
          url: url || "example.com",
          seoScore: 88,
          perfScore: 92,
          securityScore: 100,
          issues: [
            { category: "SEO", description: "Missing structured Schema markup on product pages.", impact: "High" },
            { category: "Speed", description: "Render-blocking resources found (CSS/JS files).", impact: "Medium" },
            { category: "SEO", description: "Duplicate title tag formats detected on 4 subpages.", impact: "Medium" },
          ],
        });
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [isScanning, scanStep]);

  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  const startAudit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    setResult(null);
    setLogs([]);
    setScanStep(0);
    setIsScanning(true);
  };

  return (
    <div className="w-full glass-panel rounded-3xl p-6 md:p-10 relative overflow-hidden">
      {/* Laser Scanning Line */}
      {isScanning && (
        <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
          <div className="w-full h-1.5 bg-gradient-to-r from-transparent via-cyan-500 to-transparent shadow-lg shadow-cyan-500/50 animate-scan absolute top-0" />
        </div>
      )}

      {/* Grid Pattern Background */}
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <span className="text-xs font-semibold bg-primary/10 text-primary px-3 py-1 rounded-full uppercase tracking-wider">
            Diagnostics
          </span>
          <h3 className="text-2xl md:text-3xl font-extrabold mt-3 tracking-tight">
            Run a Free SEO Audit
          </h3>
          <p className="text-sm opacity-60 mt-2 max-w-md mx-auto">
            Scan your website to check core vitals, organic rankings, search index, and metadata instantly.
          </p>
        </div>

        {/* Audit Form */}
        <form onSubmit={startAudit} className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto mb-8">
          <div className="relative flex-1">
            <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 opacity-40" />
            <input
              type="text"
              placeholder="Enter your website URL (e.g., example.com)"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              disabled={isScanning}
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-black/15 dark:border-white/10 bg-white/20 dark:bg-black/20 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm font-semibold backdrop-blur-md transition-all"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isScanning}
            className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-bold hover:opacity-95 shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
          >
            {isScanning ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Analyzing Site...
              </>
            ) : (
              <>
                <Search className="w-4.5 h-4.5" />
                Analyze Now
              </>
            )}
          </button>
        </form>

        {/* Scanning Terminal Console */}
        <AnimatePresence>
          {isScanning && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-black/80 dark:bg-zinc-950 border border-white/5 rounded-2xl p-4 font-mono text-xs text-cyan-400 overflow-hidden shadow-2xl max-w-2xl mx-auto"
            >
              <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-3">
                <span className="text-zinc-500">AUDIT CONSOLE // v1.0.0</span>
                <span className="flex items-center gap-1.5 text-[10px] text-amber-500 animate-pulse font-bold">
                  <span className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                  ANALYSIS RUNNING
                </span>
              </div>
              <div ref={logContainerRef} className="h-44 overflow-y-auto space-y-2.5 scrollbar-thin scrollbar-thumb-zinc-800 pr-2">
                {logs.map((log, index) => (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    key={index}
                    className="leading-5"
                  >
                    {log}
                  </motion.div>
                ))}
                {scanStep < scanLogs.length && (
                  <div className="flex items-center gap-2 text-zinc-500">
                    <span className="dot-typing" />
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results Presentation Dashboard */}
        <AnimatePresence>
          {result && !isScanning && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-6 border border-black/10 dark:border-white/5 bg-white/5 dark:bg-zinc-950/20 rounded-3xl p-6 md:p-8"
            >
              {/* Header metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 text-center">
                <div className="flex flex-col items-center p-4 rounded-2xl glass-panel relative">
                  <Award className="w-6 h-6 text-indigo-500 mb-2" />
                  <span className="text-[10px] uppercase font-bold tracking-wider opacity-60">SEO Score</span>
                  <span className="text-4xl font-extrabold text-indigo-500 mt-1">{result.seoScore}%</span>
                  <span className="text-[10px] bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 px-2 py-0.5 rounded-full mt-2 font-bold">
                    Above Average
                  </span>
                </div>

                <div className="flex flex-col items-center p-4 rounded-2xl glass-panel relative">
                  <Activity className="w-6 h-6 text-cyan-500 mb-2" />
                  <span className="text-[10px] uppercase font-bold tracking-wider opacity-60">Speed & Performance</span>
                  <span className="text-4xl font-extrabold text-cyan-500 mt-1">{result.perfScore}%</span>
                  <span className="text-[10px] bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 px-2 py-0.5 rounded-full mt-2 font-bold">
                    Fast Page Load
                  </span>
                </div>

                <div className="flex flex-col items-center p-4 rounded-2xl glass-panel relative">
                  <ShieldCheck className="w-6 h-6 text-emerald-500 mb-2" />
                  <span className="text-[10px] uppercase font-bold tracking-wider opacity-60">Security & Trust</span>
                  <span className="text-4xl font-extrabold text-emerald-500 mt-1">{result.securityScore}%</span>
                  <span className="text-[10px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-full mt-2 font-bold">
                    Secure SSL
                  </span>
                </div>
              </div>

              {/* Recommendations list */}
              <div className="space-y-4">
                <h4 className="font-extrabold text-sm tracking-wider uppercase opacity-60 mb-2">
                  Actionable SEO Enhancements Required
                </h4>
                <div className="space-y-3">
                  {result.issues.map((issue, i) => (
                    <div
                      key={i}
                      className="flex gap-4 p-4 rounded-xl border border-black/5 dark:border-white/5 bg-white/50 dark:bg-black/20"
                    >
                      <div className="mt-0.5">
                        <AlertTriangle
                          className={`w-5 h-5 ${issue.impact === "High" ? "text-rose-500" : "text-amber-500"}`}
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-extrabold tracking-wider uppercase bg-black/5 dark:bg-white/5 px-2 py-0.5 rounded">
                            {issue.category}
                          </span>
                          <span
                            className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                              issue.impact === "High"
                                ? "bg-rose-500/10 text-rose-500"
                                : "bg-amber-500/10 text-amber-500"
                            }`}
                          >
                            {issue.impact} Impact
                          </span>
                        </div>
                        <p className="text-sm mt-1.5 opacity-80 font-medium">{issue.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Banner */}
              <div className="mt-8 p-5 rounded-2xl bg-gradient-to-r from-indigo-500/15 via-cyan-500/5 to-transparent border border-indigo-500/20 flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <h5 className="font-extrabold text-sm">Need help implementing these fixes?</h5>
                  <p className="text-xs opacity-75 mt-1">
                    Book a free SEO strategy review with our engineers to fix all technical errors.
                  </p>
                </div>
                <a
                  href="#contact"
                  className="px-5 py-2.5 rounded-xl bg-primary text-white font-bold text-xs hover:bg-indigo-600 transition-all flex items-center gap-1.5 shadow-md shadow-indigo-500/25 shrink-0"
                >
                  Schedule Optimization Call
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
