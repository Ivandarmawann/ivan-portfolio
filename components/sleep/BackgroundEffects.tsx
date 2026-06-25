"use client";

import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
}

export default function BackgroundEffects() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const blobRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const stars: Star[] = Array.from({ length: 60 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      size: Math.random() * 1.2 + 0.3,
      opacity: Math.random() * 0.4 + 0.1,
      speed: Math.random() * 0.15 + 0.05,
    }));

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    let animId: number;

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      for (const star of stars) {
        star.y -= star.speed;
        if (star.y < -2) {
          star.y = h + 2;
          star.x = Math.random() * w;
        }
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();
      }
      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  useEffect(() => {
    const blob = blobRef.current;
    if (!blob) return;
    const handle = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 30;
      const y = (e.clientY / window.innerHeight) * 30;
      blob.style.transform = `translate(${x}px, ${y}px)`;
    };
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      <canvas ref={canvasRef} className="absolute inset-0" />

      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-[#7C5CFF]/[0.04] blur-[120px] animate-aurora-slow" />
      <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-[#22D3EE]/[0.03] blur-[100px] animate-aurora-slow" style={{ animationDelay: "-5s" }} />
      <div className="absolute top-2/3 left-1/2 w-[600px] h-[600px] rounded-full bg-[#818CF8]/[0.02] blur-[150px] animate-aurora-slow" style={{ animationDelay: "-10s" }} />

      <div
        ref={blobRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-gradient-to-br from-[#7C5CFF]/[0.06] to-[#22D3EE]/[0.04] blur-[80px] transition-transform duration-700 ease-out"
      />

      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(124, 92, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(124, 92, 255, 0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
    </div>
  );
}
