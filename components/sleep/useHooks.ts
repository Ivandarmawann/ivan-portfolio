"use client";

import { useState, useEffect, useRef, type RefObject } from "react";
import { useMediaQuery } from "./useMediaQuery";

export function useMousePosition() {
  const [pos, setPos] = useState({ x: 0.5, y: 0.5 });
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    if (isMobile) return;
    const handle = (e: MouseEvent) => {
      setPos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    };
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, [isMobile]);

  return pos;
}

export function useTilt(ref: RefObject<HTMLElement | null>, sensitivity = 10) {
  const [style, setStyle] = useState({});
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    if (isMobile) return;
    const el = ref.current;
    if (!el) return;
    const handle = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const tiltX = (y - 0.5) * sensitivity;
      const tiltY = (0.5 - x) * sensitivity;
      setStyle({
        transform: `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02,1.02,1.02)`,
        transition: "transform 0.1s ease-out",
      });
    };
    const leave = () => {
      setStyle({
        transform: "perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)",
        transition: "transform 0.5s ease-out",
      });
    };
    el.addEventListener("mousemove", handle);
    el.addEventListener("mouseleave", leave);
    return () => {
      el.removeEventListener("mousemove", handle);
      el.removeEventListener("mouseleave", leave);
    };
  }, [ref, sensitivity, isMobile]);

  return style;
}
