"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  as?: "a" | "button";
  href?: string;
  target?: string;
  rel?: string;
  onClick?: (e: React.MouseEvent) => void;
}

export function MagneticButton({
  children,
  className,
  as = "button",
  href,
  target,
  rel,
  onClick,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const dist = Math.sqrt(x * x + y * y);
    const maxDist = Math.max(rect.width, rect.height);
    const strength = Math.min(1, dist / maxDist) * 8;
    setOffset({
      x: (x / (rect.width / 2)) * strength,
      y: (y / (rect.height / 2)) * strength,
    });
  };

  const handleLeave = () => setOffset({ x: 0, y: 0 });

  const content = (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: "spring", stiffness: 250, damping: 20, mass: 0.3 }}
      className={className}
      style={{ cursor: "pointer" }}
    >
      {children}
    </motion.div>
  );

  if (as === "a") {
    return (
      <a href={href} target={target} rel={rel} onClick={onClick} style={{ display: "inline-block" }}>
        {content}
      </a>
    );
  }

  return <button type="button" onClick={onClick} style={{ display: "inline-block" }}>{content}</button>;
}
