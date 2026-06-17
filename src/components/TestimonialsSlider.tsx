"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, Star, ArrowLeft, ArrowRight } from "lucide-react";

interface Testimonial {
  id: number;
  quote: string;
  author: string;
  role: string;
  company: string;
  rating: number;
  avatarBg: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    quote: "SEOWebAgency transformed our online presence with a modern website and SEO optimization. Our customer inquiries increased significantly after launch. The team was professional and delivered beyond expectations.",
    author: "Sumit Saini",
    role: "Founder",
    company: "Gaav Ki Chai",
    rating: 5,
    avatarBg: "from-indigo-500 to-purple-500",
  },
  {
    id: 2,
    quote: "The website developed by SEOWebAgency is fast, responsive, and SEO-friendly. Their support and attention to detail made the entire process smooth and efficient.",
    author: "Sumit Saini",
    role: "Director",
    company: "Voice of News 24",
    rating: 5,
    avatarBg: "from-cyan-500 to-blue-500",
  },
  {
    id: 3,
    quote: "Their expertise in website development and local SEO helped us generate more leads and improve our Google visibility. Highly recommended for businesses looking to grow online.",
    author: "Ayan Khan",
    role: "Business Owner",
    company: "Hitachi AC Services",
    rating: 5,
    avatarBg: "from-emerald-500 to-teal-500",
  },
  {
    id: 4,
    quote: "The SEO strategies implemented by SEOWebAgency improved our search rankings and increased organic traffic. We saw measurable growth within a few months.",
    author: "Aditya Pal",
    role: "Marketing Manager",
    company: "",
    rating: 5,
    avatarBg: "from-purple-500 to-pink-500",
  },
  {
    id: 5,
    quote: "From design to SEO, the team handled everything professionally. The website not only looks premium but also converts visitors into customers.",
    author: "Ayan Rajput",
    role: "Founder",
    company: "Local Business",
    rating: 5,
    avatarBg: "from-rose-500 to-pink-500",
  },
];

export default function TestimonialsSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setActiveIndex((prevIndex) =>
          prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
        ),
      6000
    );

    return () => {
      resetTimeout();
    };
  }, [activeIndex]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  return (
    <div className="w-full max-w-4xl mx-auto relative px-4">
      {/* Testimonial Card Display */}
      <div className="relative min-h-[300px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.4 }}
            className="w-full glass-panel rounded-3xl p-8 md:p-12 border border-black/5 dark:border-white/5 bg-white/20 dark:bg-zinc-950/20 relative"
          >
            {/* Glowing Accent Mesh */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[250px] h-[100px] glow-mesh-indigo glow-mesh rounded-full pointer-events-none opacity-40" />

            <Quote className="w-12 h-12 text-primary opacity-20 absolute top-6 left-6" />

            <div className="flex flex-col items-center text-center relative z-10">
              {/* Stars */}
              <div className="flex items-center gap-1 mb-6">
                {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-base md:text-xl font-bold leading-8 md:leading-10 tracking-tight max-w-2xl">
                "{testimonials[activeIndex].quote}"
              </blockquote>

              {/* Author Info */}
              <div className="mt-8 flex items-center gap-3 text-left">
                <div
                  className={`w-11 h-11 rounded-full bg-gradient-to-tr ${testimonials[activeIndex].avatarBg} flex items-center justify-center text-white font-extrabold text-sm shadow-md`}
                >
                  {testimonials[activeIndex].author.charAt(0)}
                </div>
                <div>
                  <h5 className="font-extrabold text-sm tracking-tight">{testimonials[activeIndex].author}</h5>
                  <p className="text-[11px] opacity-60 font-semibold">
                    {testimonials[activeIndex].role}
                    {testimonials[activeIndex].company && (
                      <>
                        {" "}
                        &middot;{" "}
                        <span className="text-primary">
                          {testimonials[activeIndex].company}
                        </span>
                      </>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between mt-8 max-w-xs mx-auto">
        <button
          onClick={handlePrev}
          className="p-3 rounded-full border border-black/10 dark:border-white/5 bg-white/40 dark:bg-zinc-900/40 hover:bg-black/5 dark:hover:bg-white/10 transition-colors shadow-sm"
          aria-label="Previous Testimonial"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        {/* Bullet indicators */}
        <div className="flex items-center gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                activeIndex === i ? "bg-primary w-6" : "bg-black/20 dark:bg-white/20 hover:bg-black/40 dark:hover:bg-white/40"
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="p-3 rounded-full border border-black/10 dark:border-white/5 bg-white/40 dark:bg-zinc-900/40 hover:bg-black/5 dark:hover:bg-white/10 transition-colors shadow-sm"
          aria-label="Next Testimonial"
        >
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
