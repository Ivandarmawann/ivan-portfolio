"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

export function AnimatedGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReducedMotion = Boolean(useReducedMotion());
  const isMobile = useIsMobile();
  const disabled = isMobile || prefersReducedMotion;

  useEffect(() => {
    if (disabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    const spacing = 60;
    const glowPoints: { x: number; y: number; phase: number; speed: number }[] = [];

    for (let i = 0; i < 12; i++) {
      glowPoints.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        phase: Math.random() * Math.PI * 2,
        speed: 0.2 + Math.random() * 0.3,
      });
    }

    let animId: number;
    const loop = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = `rgba(120, 80, 255, ${isMobile ? 0.015 : 0.03})`;
      ctx.lineWidth = 1;

      for (let x = 0; x < canvas.width; x += spacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += spacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      if (!isMobile) {
        for (const pt of glowPoints) {
          const alpha = 0.3 + 0.3 * Math.sin(time * 0.001 * pt.speed + pt.phase);
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(120, 80, 255, ${alpha * 0.4})`;
          ctx.fill();

          const glow = ctx.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, 40);
          glow.addColorStop(0, `rgba(120, 80, 255, ${alpha * 0.06})`);
          glow.addColorStop(1, "transparent");
          ctx.fillStyle = glow;
          ctx.fillRect(pt.x - 40, pt.y - 40, 80, 80);
        }
      }

      animId = requestAnimationFrame(loop);
    };
    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, [disabled, isMobile]);

  if (disabled) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden="true"
    />
  );
}
