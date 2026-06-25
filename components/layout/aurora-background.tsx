"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

export function AuroraBackground() {
  const prefersReducedMotion = Boolean(useReducedMotion());
  const isMobile = useIsMobile();
  const disabled = isMobile || prefersReducedMotion;

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      {disabled ? (
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-background to-cyan-500/5" />
      ) : (
        <>
          <motion.div
            animate={{ x: [0, 50, -40, 0], y: [0, -60, 40, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -left-[15%] -top-[15%] size-[600px] rounded-full bg-purple-500/10 blur-[150px]"
          />
          <motion.div
            animate={{ x: [0, -40, 50, 0], y: [0, 50, -50, 0] }}
            transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-[15%] -right-[10%] size-[500px] rounded-full bg-cyan-500/10 blur-[150px]"
          />
          <motion.div
            animate={{ x: [0, 40, -30, 0], y: [0, -40, 60, 0] }}
            transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-[50%] top-[40%] size-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-500/10 blur-[150px]"
          />
        </>
      )}
    </div>
  );
}
