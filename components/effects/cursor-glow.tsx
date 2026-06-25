"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

export function CursorGlow() {
  const [mouse, setMouse] = useState({ x: -1000, y: -1000 });
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const disabled = isMobile || prefersReducedMotion;

  useEffect(() => {
    if (disabled) return;
    const onMove = (e: PointerEvent) => {
      setMouse({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [disabled]);

  const springX = useSpring(mouse.x, { stiffness: disabled ? 0 : 80, damping: 25, mass: 0.8 });
  const springY = useSpring(mouse.y, { stiffness: disabled ? 0 : 80, damping: 25, mass: 0.8 });
  const x = useTransform(springX, (v) => v - 250);
  const y = useTransform(springY, (v) => v - 250);

  if (disabled) return null;

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[9999]"
      aria-hidden="true"
      style={{ x, y, position: "fixed", left: 0, top: 0 }}
    >
      <div
        className="size-[500px] rounded-full opacity-[0.08]"
        style={{
          background:
            "radial-gradient(circle, rgba(120, 80, 255, 0.6) 0%, rgba(37, 99, 235, 0.3) 35%, transparent 65%)",
          filter: "blur(80px)",
          mixBlendMode: "soft-light",
        }}
      />
    </motion.div>
  );
}
