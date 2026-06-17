"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Search, Globe, Users, TrendingUp, DollarSign } from "lucide-react";
import DigitalGlobe from "./DigitalGlobe";

type FilterType = "7D" | "30D" | "ALL";

interface Metric {
  name: string;
  value: string;
  change: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  strokeColor: string;
}

const chartData: Record<number, Record<FilterType, { points: string; gradientPoints: string; labels: string[]; peak: string }>> = {
  0: { // Keyword Rankings
    "7D": {
      points: "M 0 160 Q 50 140 100 130 T 200 90 T 300 100 T 400 40 T 500 20",
      gradientPoints: "M 0 160 Q 50 140 100 130 T 200 90 T 300 100 T 400 40 T 500 20 L 500 200 L 0 200 Z",
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      peak: "+8.4%",
    },
    "30D": {
      points: "M 0 150 Q 50 120 100 140 T 200 80 T 300 70 T 400 30 T 500 10",
      gradientPoints: "M 0 150 Q 50 120 100 140 T 200 80 T 300 70 T 400 30 T 500 10 L 500 200 L 0 200 Z",
      labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
      peak: "+24.5%",
    },
    ALL: {
      points: "M 0 180 Q 50 160 100 120 T 200 90 T 300 50 T 400 20 T 500 5",
      gradientPoints: "M 0 180 Q 50 160 100 120 T 200 90 T 300 50 T 400 20 T 500 5 L 500 200 L 0 200 Z",
      labels: ["Q1", "Q2", "Q3", "Q4", "Year End"],
      peak: "+312%",
    },
  },
  1: { // Organic Traffic
    "7D": {
      points: "M 0 170 Q 50 150 100 110 T 200 120 T 300 80 T 400 70 T 500 40",
      gradientPoints: "M 0 170 Q 50 150 100 110 T 200 120 T 300 80 T 400 70 T 500 40 L 500 200 L 0 200 Z",
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      peak: "+12.1%",
    },
    "30D": {
      points: "M 0 160 Q 50 130 100 120 T 200 90 T 300 60 T 400 40 T 500 25",
      gradientPoints: "M 0 160 Q 50 130 100 120 T 200 90 T 300 60 T 400 40 T 500 25 L 500 200 L 0 200 Z",
      labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
      peak: "+34.2%",
    },
    ALL: {
      points: "M 0 190 Q 50 170 100 130 T 200 100 T 300 70 T 400 35 T 500 12",
      gradientPoints: "M 0 190 Q 50 170 100 130 T 200 100 T 300 70 T 400 35 T 500 12 L 500 200 L 0 200 Z",
      labels: ["Q1", "Q2", "Q3", "Q4", "Year End"],
      peak: "+420%",
    },
  },
  2: { // Conversion Rate
    "7D": {
      points: "M 0 140 Q 50 130 100 120 T 200 110 T 300 100 T 400 90 T 500 80",
      gradientPoints: "M 0 140 Q 50 130 100 120 T 200 110 T 300 100 T 400 90 T 500 80 L 500 200 L 0 200 Z",
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      peak: "+0.8%",
    },
    "30D": {
      points: "M 0 150 Q 50 135 100 115 T 200 95 T 300 85 T 400 65 T 500 45",
      gradientPoints: "M 0 150 Q 50 135 100 115 T 200 95 T 300 85 T 400 65 T 500 45 L 500 200 L 0 200 Z",
      labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
      peak: "+1.8%",
    },
    ALL: {
      points: "M 0 180 Q 50 160 100 140 T 200 110 T 300 90 T 400 70 T 500 30",
      gradientPoints: "M 0 180 Q 50 160 100 140 T 200 110 T 300 90 T 400 70 T 500 30 L 500 200 L 0 200 Z",
      labels: ["Q1", "Q2", "Q3", "Q4", "Year End"],
      peak: "+6.2%",
    },
  },
  3: { // Leads Generated
    "7D": {
      points: "M 0 160 Q 50 150 100 140 T 200 100 T 300 110 T 400 50 T 500 30",
      gradientPoints: "M 0 160 Q 50 150 100 140 T 200 100 T 300 110 T 400 50 T 500 30 L 500 200 L 0 200 Z",
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      peak: "+15%",
    },
    "30D": {
      points: "M 0 170 Q 50 140 100 130 T 200 80 T 300 75 T 400 35 T 500 15",
      gradientPoints: "M 0 170 Q 50 140 100 130 T 200 80 T 300 75 T 400 35 T 500 15 L 500 200 L 0 200 Z",
      labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
      peak: "+48%",
    },
    ALL: {
      points: "M 0 195 Q 50 175 100 135 T 200 95 T 300 55 T 400 25 T 500 8",
      gradientPoints: "M 0 195 Q 50 175 100 135 T 200 95 T 300 55 T 400 25 T 500 8 L 500 200 L 0 200 Z",
      labels: ["Q1", "Q2", "Q3", "Q4", "Year End"],
      peak: "+240%",
    },
  },
  4: { // ROI Improvement
    "7D": {
      points: "M 0 150 Q 50 130 100 110 T 200 120 T 300 70 T 400 50 T 500 35",
      gradientPoints: "M 0 150 Q 50 130 100 110 T 200 120 T 300 70 T 400 50 T 500 35 L 500 200 L 0 200 Z",
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      peak: "+20%",
    },
    "30D": {
      points: "M 0 165 Q 50 145 100 115 T 200 85 T 300 70 T 400 30 T 500 10",
      gradientPoints: "M 0 165 Q 50 145 100 115 T 200 85 T 300 70 T 400 30 T 500 10 L 500 200 L 0 200 Z",
      labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
      peak: "+50%",
    },
    ALL: {
      points: "M 0 185 Q 50 155 100 105 T 200 75 T 300 45 T 400 15 T 500 2",
      gradientPoints: "M 0 185 Q 50 155 100 105 T 200 75 T 300 45 T 400 15 T 500 2 L 500 200 L 0 200 Z",
      labels: ["Q1", "Q2", "Q3", "Q4", "Year End"],
      peak: "+380%",
    },
  },
};

export default function SaaSResults() {
  const [filter, setFilter] = useState<FilterType>("30D");
  const [activeMetric, setActiveMetric] = useState(0);
  const [counters, setCounters] = useState({ keywords: 0, traffic: 0, conv: 0.0, leads: 0, roi: 0 });

  // Handle counter animations
  useEffect(() => {
    const targets = {
      "7D": { keywords: 840, traffic: 12, conv: 3.1, leads: 180, roi: 95 },
      "30D": { keywords: 3240, traffic: 58, conv: 4.8, leads: 820, roi: 190 },
      ALL: { keywords: 18450, traffic: 420, conv: 6.2, leads: 6400, roi: 380 },
    }[filter];

    let start = Date.now();
    const duration = 800; // ms

    const animate = () => {
      const progress = Math.min((Date.now() - start) / duration, 1);
      
      setCounters({
        keywords: Math.floor(targets.keywords * progress),
        traffic: Math.floor(targets.traffic * progress),
        conv: parseFloat((targets.conv * progress).toFixed(1)),
        leads: Math.floor(targets.leads * progress),
        roi: Math.floor(targets.roi * progress),
      });

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [filter]);

  const metrics: Metric[] = [
    {
      name: "Keyword Rankings",
      value: `Top 3: +${counters.keywords}`,
      change: filter === "7D" ? "+4.2%" : filter === "30D" ? "+18.6%" : "+312%",
      icon: Search,
      color: "from-indigo-500 to-purple-500",
      strokeColor: "rgb(99, 102, 241)",
    },
    {
      name: "Organic Traffic",
      value: `${counters.traffic}K /mo`,
      change: filter === "7D" ? "+8.1%" : filter === "30D" ? "+34.2%" : "+420%",
      icon: Users,
      color: "from-cyan-500 to-blue-500",
      strokeColor: "rgb(6, 182, 212)",
    },
    {
      name: "Conversion Rate",
      value: `${counters.conv}%`,
      change: filter === "7D" ? "+0.5%" : filter === "30D" ? "+1.8%" : "+2.4%",
      icon: TrendingUp,
      color: "from-emerald-500 to-teal-500",
      strokeColor: "rgb(16, 185, 129)",
    },
    {
      name: "Leads Generated",
      value: `+${counters.leads}`,
      change: filter === "7D" ? "+12%" : filter === "30D" ? "+48%" : "+240%",
      icon: Globe,
      color: "from-rose-500 to-pink-500",
      strokeColor: "rgb(244, 63, 94)",
    },
    {
      name: "ROI Improvement",
      value: `${counters.roi}% Net`,
      change: filter === "7D" ? "+15%" : filter === "30D" ? "+50%" : "+380%",
      icon: DollarSign,
      color: "from-amber-500 to-orange-500",
      strokeColor: "rgb(245, 158, 11)",
    },
  ];

  const activeData = chartData[activeMetric][filter];

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
      {/* Metrics List */}
      <div className="lg:col-span-4 flex flex-col gap-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold tracking-wider uppercase opacity-60">SaaS Metrics</h3>
          <div className="flex bg-black/5 dark:bg-white/5 p-1 rounded-lg border border-black/10 dark:border-white/5">
            {(["7D", "30D", "ALL"] as FilterType[]).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`text-xs px-2.5 py-1.5 rounded-md font-medium transition-all ${
                  filter === f
                    ? "bg-primary text-white shadow-lg shadow-indigo-500/25"
                    : "opacity-60 hover:opacity-100"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {metrics.map((metric, i) => {
          const Icon = metric.icon;
          const isActive = activeMetric === i;
          return (
            <button
              key={metric.name}
              onClick={() => setActiveMetric(i)}
              className={`text-left p-4 rounded-xl transition-all duration-300 border flex items-center justify-between group ${
                isActive
                  ? "glass-panel bg-white/70 dark:bg-zinc-900/60 shadow-xl border-primary/30 dark:border-primary/20 scale-[1.02]"
                  : "bg-white/10 dark:bg-zinc-950/20 border-black/5 dark:border-white/5 hover:bg-white/20 dark:hover:bg-zinc-900/30"
              }`}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`p-3 rounded-lg bg-gradient-to-tr ${metric.color} text-white shadow-md transition-transform duration-300 group-hover:scale-110`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs opacity-60 font-medium">{metric.name}</p>
                  <p className="text-lg font-bold tracking-tight">{metric.value}</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-full text-xs font-semibold">
                <ArrowUpRight className="w-3.5 h-3.5" />
                {metric.change}
              </div>
            </button>
          );
        })}
      </div>

      {/* Interactive Charts & 3D Globe */}
      <div className="lg:col-span-8 flex flex-col gap-6">
        <div className="glass-panel rounded-2xl p-6 flex-1 flex flex-col min-h-[350px] relative overflow-hidden">
          {/* Glowing Background Mesh */}
          <div className="absolute top-0 right-0 w-[300px] h-[300px] glow-mesh-indigo glow-mesh rounded-full pointer-events-none" />

          <div className="flex items-center justify-between mb-4 z-10">
            <div>
              <h4 className="text-lg font-bold">{metrics[activeMetric].name} Growth</h4>
              <p className="text-xs opacity-60">Real-time simulated indexing & conversions</p>
            </div>
            <div className="text-right">
              <span className="text-xs opacity-60">Peak Delta: </span>
              <span className="text-sm font-bold text-emerald-500">{activeData.peak}</span>
            </div>
          </div>

          {/* SVG Animated Chart */}
          <div className="flex-1 w-full relative min-h-[220px]">
            <svg viewBox="0 0 500 200" className="w-full h-[200px] overflow-visible" preserveAspectRatio="none">
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={metrics[activeMetric].strokeColor} stopOpacity="0.45" />
                  <stop offset="100%" stopColor={metrics[activeMetric].strokeColor} stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              <line x1="0" y1="40" x2="500" y2="40" stroke="currentColor" strokeOpacity="0.05" strokeDasharray="4 4" />
              <line x1="0" y1="90" x2="500" y2="90" stroke="currentColor" strokeOpacity="0.05" strokeDasharray="4 4" />
              <line x1="0" y1="140" x2="500" y2="140" stroke="currentColor" strokeOpacity="0.05" strokeDasharray="4 4" />

              <motion.path
                d={activeData.gradientPoints}
                animate={{ d: activeData.gradientPoints }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                fill="url(#chartGradient)"
              />

              <motion.path
                d={activeData.points}
                animate={{ d: activeData.points }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                fill="none"
                stroke={metrics[activeMetric].strokeColor}
                strokeWidth="3.5"
                strokeLinecap="round"
              />
            </svg>

            {/* Labels overlay */}
            <div className="flex justify-between w-full mt-4 text-xs opacity-50 px-2">
              {activeData.labels.map((lbl) => (
                <span key={lbl}>{lbl}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Global Connection Stream Grid with Three.js Dotted Globe */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          <div className="glass-panel rounded-2xl p-6 flex flex-col justify-between overflow-hidden relative group min-h-[220px]">
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div>
              <span className="text-xs opacity-60 font-semibold tracking-wide uppercase">Organic Streams</span>
              <h4 className="text-xl font-bold mt-1">SEO Signal Indexer</h4>
              <p className="text-xs opacity-60 mt-1 max-w-[200px]">
                Aggregating backlinks, semantic searches, and keywords globally 24/7.
              </p>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-xs font-semibold bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 px-2 py-0.5 rounded-full">
                Active Indexing
              </span>
              <span className="text-xs opacity-60 font-mono">1.2ms latency</span>
            </div>
          </div>

          <div className="glass-panel rounded-2xl p-0 relative overflow-hidden h-[220px] flex items-center justify-center bg-black/20 dark:bg-black/40">
            {/* Embed 3D WebGL Globe */}
            <div className="absolute inset-0">
              <DigitalGlobe />
            </div>
            <div className="absolute top-4 left-4 pointer-events-none bg-black/40 dark:bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/5">
              <span className="text-[10px] font-bold tracking-wider text-cyan-400 uppercase">Interactive Network Stream</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
