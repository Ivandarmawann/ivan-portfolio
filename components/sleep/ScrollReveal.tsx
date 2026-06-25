"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  duration?: number;
  distance?: number;
  once?: boolean;
  blur?: boolean;
  stagger?: boolean;
  staggerDelay?: number;
}

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  duration = 0.7,
  distance = 40,
  once = true,
  blur = false,
  stagger = false,
  staggerDelay = 0.1,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-80px" });

  const getInitial = () => {
    const base: Record<string, string | number> = {
      opacity: 0,
    };
    if (blur) base.filter = "blur(8px)";
    if (direction === "up") base.y = distance;
    if (direction === "down") base.y = -distance;
    if (direction === "left") base.x = distance;
    if (direction === "right") base.x = -distance;
    return base;
  };

  const getAnimate = () => {
    const base: Record<string, string | number> = {
      opacity: 1,
    };
    if (blur) base.filter = "blur(0px)";
    if (direction !== "none") base.y = 0;
    if (direction !== "none") base.x = 0;
    return base;
  };

  if (stagger) {
    return (
      <div ref={ref} className={className}>
        <motion.div
          initial={getInitial()}
          animate={isInView ? getAnimate() : getInitial()}
          transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: staggerDelay } },
            }}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {children}
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div ref={ref} className={className}>
      <motion.div
        initial={getInitial()}
        animate={isInView ? getAnimate() : getInitial()}
        transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}
