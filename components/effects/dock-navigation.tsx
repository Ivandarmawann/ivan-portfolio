"use client";

import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Home, User, FolderGit2, Zap, Mail, Code2, ExternalLink } from "lucide-react";

interface DockItem {
  id: string;
  label: string;
  icon: React.ElementType;
  href: string;
  external?: boolean;
}

const dockItems: DockItem[] = [
  { id: "home", label: "Home", icon: Home, href: "#home" },
  { id: "about", label: "About", icon: User, href: "#about" },
  { id: "projects", label: "Projects", icon: FolderGit2, href: "#projects" },
  { id: "skills", label: "Capabilities", icon: Zap, href: "#skills" },
  { id: "contact", label: "Contact", icon: Mail, href: "#contact" },
  { id: "github", label: "GitHub", icon: Code2, href: "https://github.com/ivandarmawann", external: true },
  { id: "linkedin", label: "LinkedIn", icon: ExternalLink, href: "https://www.linkedin.com/in/ivandarmawann/", external: true },
];

export function DockNavigation() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const dockRef = useRef<HTMLDivElement>(null);

  const getScale = useCallback(
    (itemId: string, index: number) => {
      if (!hoveredId) return 1;
      if (itemId === hoveredId) return 1.4;

      const hoveredIndex = dockItems.findIndex((i) => i.id === hoveredId);
      const distance = Math.abs(index - hoveredIndex);
      if (distance === 1) return 1.2;
      if (distance === 2) return 1.05;
      return 1;
    },
    [hoveredId],
  );

  return (
    <div className="fixed bottom-6 left-1/2 z-50 hidden -translate-x-1/2 lg:block">
      <div
        ref={dockRef}
        className="flex items-end gap-1 rounded-2xl border border-border bg-background/70 px-3 py-2 shadow-2xl backdrop-blur-2xl"
        role="navigation"
        aria-label="Dock navigation"
        onMouseLeave={() => setHoveredId(null)}
      >
        {dockItems.map((item, index) => {
          const Icon = item.icon;
          const scale = getScale(item.id, index);

          return (
            <div key={item.id} className="relative flex flex-col items-center">
              {hoveredId === item.id && (
                <motion.div
                  className="absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border border-border bg-background px-2 py-1 text-xs text-foreground shadow-lg"
                  initial={{ opacity: 0, y: 4, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 4, scale: 0.9 }}
                  transition={{ duration: 0.15 }}
                >
                  {item.label}
                </motion.div>
              )}

              <motion.a
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noreferrer" : undefined}
                aria-label={item.label}
                className="flex items-center justify-center rounded-xl transition-colors hover:bg-secondary"
                style={{
                  width: 48,
                  height: 48,
                  transform: `scale(${scale})`,
                  transformOrigin: "bottom center",
                }}
                animate={{ scale }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                onMouseEnter={() => setHoveredId(item.id)}
              >
                <Icon className="size-5 text-muted-foreground transition-colors hover:text-foreground" />
              </motion.a>
            </div>
          );
        })}
      </div>
    </div>
  );
}
