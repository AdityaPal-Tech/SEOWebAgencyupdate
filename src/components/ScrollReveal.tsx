"use client";

import React, { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "none";
  delay?: number;
  duration?: number;
  distance?: number;
  once?: boolean;
  staggerChildren?: number;
  style?: React.CSSProperties;
}

const directionVariants = (
  direction: ScrollRevealProps["direction"],
  distance: number
): Variants => {
  const offset = { x: 0, y: 0 };
  if (direction === "up") offset.y = distance;
  else if (direction === "down") offset.y = -distance;
  else if (direction === "left") offset.x = distance;
  else if (direction === "right") offset.x = -distance;

  return {
    hidden: {
      opacity: 0,
      x: offset.x,
      y: offset.y,
      scale: direction === "none" ? 0.95 : 1,
      filter: "blur(4px)",
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.7,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };
};

export default function ScrollReveal({
  children,
  className = "",
  direction = "up",
  delay = 0,
  duration = 0.7,
  distance = 40,
  once = true,
  style,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-50px" });

  const variants = directionVariants(direction, distance);

  return (
    <div ref={ref} className={className} style={{ perspective: "1000px", ...style }}>
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={variants}
        transition={{
          delay,
          duration,
          ease: [0.25, 0.1, 0.25, 1],
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
