import React from "react";
import type { Metadata } from "next";
import { MapPin, Zap, Star } from "lucide-react";

import Navbar from "@/components/Navbar";
import ThreeCanvas from "@/components/ThreeCanvas";
import WhatsAppButton from "@/components/WhatsAppButton";
import LocationForm from "@/components/LocationForm";
import ClientShowcase from "@/components/ClientShowcase";

// Static location data maps for localized targets
interface LocationData {
  name: string;
  headline: string;
  tagline: string;
  trafficEst: string;
  competitorsScore: string;
  leadTarget: string;
  lat: string;
  lon: string;
  seoTitle: string;
  seoDesc: string;
}

const locationData: Record<string, LocationData> = {
  meerut: {
    name: "Meerut",
    headline: "Dominate Local Search & Maps Rankings in Meerut",
    tagline: "Unleash next-gen local SEO, Google Business Profile optimizations, and AI automation for Meerut businesses.",
    trafficEst: "45K/mo avg",
    competitorsScore: "Low-Medium (42/100)",
    leadTarget: "350 leads/mo",
    lat: "28.9845",
    lon: "77.7064",
    seoTitle: "Local SEO Services in Meerut | Google Maps Ranking | SEOWebAgency",
    seoDesc: "Partner with Meerut's premier SEO agency. We scale your Google Business Profile rankings, local search presence, and traffic using AI-powered automation.",
  },
  noida: {
    name: "Noida",
    headline: "Dominate Noida Corporate & Startup Search Rankings",
    tagline: "Deploy headless SEO, programmatic backlinking, and semantic indexing in Delhi-NCR's IT hub.",
    trafficEst: "140K/mo avg",
    competitorsScore: "High (74/100)",
    leadTarget: "850 leads/mo",
    lat: "28.5355",
    lon: "77.3910",
    seoTitle: "Best SEO Agency in Noida | Startup Growth Solutions | SEOWebAgency",
    seoDesc: "Dominate organic search results and lead generation pipelines in Noida. Experienced Next.js SEO team leveraging AI audits and structured metadata.",
  },
  delhi: {
    name: "Delhi",
    headline: "India's Capital SEO & Dynamic Search Integrations",
    tagline: "Scale your organic traffic, maps indexing, and lead pipeline across New Delhi.",
    trafficEst: "320K/mo avg",
    competitorsScore: "High (82/100)",
    leadTarget: "1,800 leads/mo",
    lat: "28.6139",
    lon: "77.2090",
    seoTitle: "Top Local SEO Agency in Delhi NCR | Search Engine Audits | SEOWebAgency",
    seoDesc: "India's leading local SEO agency in Delhi NCR. Leverage real-time maps optimization, schemas, sitemaps, and robots configuration to scale.",
  },
  ghaziabad: {
    name: "Ghaziabad",
    headline: "Drive Maximum Local Traffic Across Ghaziabad",
    tagline: "Dominate Google search pack coordinates, map tags, and reviews in Ghaziabad's commercial grids.",
    trafficEst: "85K/mo avg",
    competitorsScore: "Medium (58/100)",
    leadTarget: "540 leads/mo",
    lat: "28.6692",
    lon: "77.4538",
    seoTitle: "Local SEO & Google Business Profile Optimization in Ghaziabad | SEOWebAgency",
    seoDesc: "Dominate search pack rankings and local listings in Ghaziabad. We build fast localized funnels, semantic schema markup, and optimize search visibility.",
  },
  gurugram: {
    name: "Gurugram",
    headline: "Enterprise-Grade SEO Solutions in Gurugram (Gurgaon)",
    tagline: "High-performance tech stacks, GEO optimizations, and SEO frameworks built for India's corporate millennium city.",
    trafficEst: "165K/mo avg",
    competitorsScore: "Very High (86/100)",
    leadTarget: "950 leads/mo",
    lat: "28.4595",
    lon: "77.0266",
    seoTitle: "Enterprise SEO Agency Gurugram | Google Maps Ranking | SEOWebAgency",
    seoDesc: "Gurugram's top SEO consulting group. We build high-speed headless platforms, schema graphs, and rank GSC keywords to generate enterprise search leads.",
  },
  hapur: {
    name: "Hapur",
    headline: "Accelerate Inbound Traffic in Hapur District",
    tagline: "Optimizing Google Business profiles and organic visibility for regional growth.",
    trafficEst: "20K/mo avg",
    competitorsScore: "Low (28/100)",
    leadTarget: "180 leads/mo",
    lat: "28.7244",
    lon: "77.7813",
    seoTitle: "Local SEO Hapur | Google Business Listing Services | SEOWebAgency",
    seoDesc: "Grow your local store and business presence in Hapur. Programmatic local SEO audits, maps pack ranking, and click-to-WhatsApp conversions.",
  },
  muzaffarnagar: {
    name: "Muzaffarnagar",
    headline: "Dominate Local Search Grids in Muzaffarnagar",
    tagline: "Optimize map pack listings, schema graphs, and mobile click-to-call conversions.",
    trafficEst: "28K/mo avg",
    competitorsScore: "Low-Medium (35/100)",
    leadTarget: "220 leads/mo",
    lat: "29.4727",
    lon: "77.7085",
    seoTitle: "Local Maps Optimization Muzaffarnagar | SEO Audits | SEOWebAgency",
    seoDesc: "Professional SEO and GBP solutions in Muzaffarnagar. Optimize your store reviews, local search presence, and ranking signals with AI agents.",
  },
  modinagar: {
    name: "Modinagar",
    headline: "Local Search Domination in Modinagar NCR",
    tagline: "Capture search listings, local directory signals, and organic inquiries in Modinagar.",
    trafficEst: "18K/mo avg",
    competitorsScore: "Low (26/100)",
    leadTarget: "150 leads/mo",
    lat: "28.8329",
    lon: "77.5818",
    seoTitle: "Local SEO Modinagar | GBP Listing Optimization | SEOWebAgency",
    seoDesc: "Grow local search leads in Modinagar. We configure maps tags, Google Business updates, sitemaps, and automate local CRM pipelines.",
  },
};

interface PageProps {
  params: Promise<{ location: string }>;
}

// Next.js dynamic metadata generation for Server Components
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { location } = await params;
  const city = locationData[location] || locationData["meerut"];
  
  return {
    title: city.seoTitle,
    description: city.seoDesc,
    alternates: {
      canonical: `https://seowebagency.in/solutions/${location}`,
    },
  };
}

export default async function LocationPage({ params }: PageProps) {
  const { location } = await params;
  const city = locationData[location] || locationData["meerut"];

  const citySchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": `SEOWebAgency - ${city.name} Office`,
    "url": `https://seowebagency.in/solutions/${location}`,
    "logo": "https://seowebagency.in/logo.png",
    "image": "https://seowebagency.in/hero-screenshot.png",
    "telephone": "+918803511070",
    "email": "seowebagency.in@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": city.name,
      "addressRegion": location === "delhi" ? "DL" : location === "gurugram" ? "HR" : "UP",
      "addressCountry": "IN",
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": city.lat,
      "longitude": city.lon,
    },
  };

  return (
    <div className="relative min-h-screen bg-white dark:bg-dark-bg transition-colors duration-500 selection:bg-indigo-500/20">
      {/* Schema dynamic injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(citySchema) }}
      />

      {/* Dynamic Navigation */}
      <Navbar />

      {/* Hero / Local Banner */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-16">
        {/* WebGL Backdrop */}
        <div className="absolute inset-0 z-0">
          <ThreeCanvas />
        </div>

        {/* Neon meshes */}
        <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] glow-mesh-indigo glow-mesh rounded-full pointer-events-none opacity-40" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] glow-mesh-cyan glow-mesh rounded-full pointer-events-none opacity-40" />
        <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Local Marker */}
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-primary/20 bg-primary/10 text-primary text-[10px] font-extrabold tracking-wider uppercase mb-6 transition-all duration-300">
              <MapPin className="w-3.5 h-3.5" />
              Local SEO Solution // {city.name}
            </div>

            {/* City Title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.1] text-black dark:text-white transition-all duration-300">
              {city.headline}
            </h1>

            <p className="text-base sm:text-lg opacity-75 mt-6 max-w-xl font-medium leading-8 transition-all duration-300">
              {city.tagline} We implement hyper-local maps schema, search engine crawling checks, and fast page caching networks.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full sm:w-auto transition-all duration-300">
              <a
                href="#local-contact"
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-extrabold text-sm hover:opacity-95 shadow-lg shadow-indigo-500/25 transition-all text-center"
              >
                Launch {city.name} Campaign
              </a>
              <a
                href="/"
                className="px-6 py-3.5 rounded-2xl border border-black/10 dark:border-white/10 bg-white/20 dark:bg-zinc-900/30 text-black dark:text-white font-extrabold text-sm hover:bg-black/5 dark:hover:bg-white/5 transition-all text-center flex items-center justify-center gap-1.5 backdrop-blur-md"
              >
                Back to Home
              </a>
            </div>
          </div>

          {/* Local Analytics Stats */}
          <div className="lg:col-span-5 w-full transition-all duration-300">
            <div className="glass-panel border-white/10 dark:border-white/5 bg-white/20 dark:bg-zinc-950/20 p-6 rounded-3xl relative shadow-2xl space-y-5">
              <span className="text-[9px] uppercase font-bold tracking-wider opacity-60">Estimated Search Index Specs</span>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-black/5 dark:border-white/5 pb-3">
                  <span className="text-xs font-semibold opacity-75">Target Traffic Capture:</span>
                  <span className="text-xs font-extrabold text-primary">{city.trafficEst}</span>
                </div>
                <div className="flex items-center justify-between border-b border-black/5 dark:border-white/5 pb-3">
                  <span className="text-xs font-semibold opacity-75">City Organic Density:</span>
                  <span className="text-xs font-extrabold text-cyan-500">{city.competitorsScore}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold opacity-75">Inbound Lead Pipeline:</span>
                  <span className="text-xs font-extrabold text-emerald-500">{city.leadTarget}</span>
                </div>
              </div>

              {/* Local Badges */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-2 p-3 rounded-xl bg-black/5 dark:bg-white/5 text-[10px] font-bold">
                  <Zap className="w-4 h-4 text-amber-500" />
                  <span>Map Pack Index #1</span>
                </div>
                <div className="flex items-center gap-2 p-3 rounded-xl bg-black/5 dark:bg-white/5 text-[10px] font-bold">
                  <Star className="w-4 h-4 text-indigo-500 fill-indigo-500" />
                  <span>100% Core Vitals</span>
                </div>
              </div>
            </div>
          </div>
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

      {/* Local Consultation / Booking Section */}
      <section id="local-contact" className="relative py-24 border-t border-black/5 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            {/* Left Content */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <span className="text-xs font-semibold bg-primary/10 text-primary px-3 py-1 rounded-full uppercase tracking-wider">
                  Inquire // {city.name}
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold mt-4 tracking-tight">
                  Book Local SEO Strategy Call
                </h2>
                <p className="text-sm opacity-60 mt-4 font-semibold leading-7">
                  Consult with our engineering and SEO lead in {city.name} to outline structural, crawling, sitemap, and localized search engine optimization plans.
                </p>
              </div>

              {/* Direct Channels */}
              <div className="mt-8 p-6 rounded-2xl glass-panel border-black/5 dark:border-white/5 bg-white/20 dark:bg-zinc-950/20 space-y-4">
                <div className="space-y-3">
                  <a href="tel:+918803511070" className="flex items-center gap-3 text-xs font-extrabold hover:text-primary transition-all">
                    <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-500 shrink-0">
                      <Zap className="w-4 h-4" />
                    </div>
                    <span>Call: +91 8803511070</span>
                  </a>
                  <a href="mailto:seowebagency.in@gmail.com" className="flex items-center gap-3 text-xs font-extrabold hover:text-primary transition-all">
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-500 shrink-0">
                      <Star className="w-4 h-4" />
                    </div>
                    <span>Email: seowebagency.in@gmail.com</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Booking Form Client Wrapper */}
            <div className="lg:col-span-7">
              <LocationForm cityName={city.name} />
            </div>
          </div>
        </div>
      </section>

      <footer className="relative py-12 border-t border-black/5 dark:border-white/5 bg-zinc-50 dark:bg-black/40">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between text-xs opacity-60 font-semibold gap-4">
          <div className="flex items-center gap-3">
            <span>&copy; 2023 SEOWebAgency. All rights reserved.</span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-[10px] font-extrabold tracking-wider uppercase animate-pulse-slow">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              All Systems Nominal
            </span>
          </div>
          <span className="text-[10px] opacity-75 font-mono uppercase tracking-wider bg-black/5 dark:bg-white/5 px-2.5 py-1 rounded-md border border-black/5 dark:border-white/5">
            {city.name} Office // SSL Secured
          </span>
        </div>
      </footer>

      {/* WhatsApp Floating */}
      <WhatsAppButton />
    </div>
  );
}

// Next.js static parameters generation for SSG
export function generateStaticParams() {
  return [
    { location: "meerut" },
    { location: "noida" },
    { location: "delhi" },
    { location: "ghaziabad" },
    { location: "gurugram" },
    { location: "hapur" },
    { location: "muzaffarnagar" },
    { location: "modinagar" },
  ];
}
