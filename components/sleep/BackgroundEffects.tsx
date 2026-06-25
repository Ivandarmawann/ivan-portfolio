"use client";

import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
}

export default function BackgroundEffects() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const stars: Star[] = Array.from({ length: 30 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      size: Math.random() * 1 + 0.3,
      opacity: Math.random() * 0.3 + 0.05,
    }));

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);
      for (const star of stars) {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();
      }
    }
    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      <canvas ref={canvasRef} className="absolute inset-0" />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-[#7C5CFF]/[0.04] blur-[120px]" />
      <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-[#22D3EE]/[0.03] blur-[100px]" />
      <div className="absolute top-2/3 left-1/2 w-[600px] h-[600px] rounded-full bg-[#818CF8]/[0.02] blur-[150px]" />
      <div
        className="absolute inset-0 opacity-[0.015] max-md:opacity-[0.008]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(124, 92, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(124, 92, 255, 0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
    </div>
  );
}
