"use client";

import { useEffect, useState, useCallback, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  User,
  FolderGit2,
  Zap,
  Briefcase,
  GraduationCap,
  Brain,
  Cloud,
  ShoppingCart,
  Download,
  Code2,
  ExternalLink,
  Mail,
  Command,
  Search,
} from "lucide-react";

interface Command {
  id: string;
  label: string;
  description?: string;
  icon: React.ElementType;
  action: () => void;
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const commands: Command[] = useMemo(
    () => [
      { id: "home", label: "Home", description: "Scroll to top", icon: Home, action: () => { document.getElementById("home")?.scrollIntoView({ behavior: "smooth" }); } },
      { id: "about", label: "About", description: "Learn about me", icon: User, action: () => { document.getElementById("about")?.scrollIntoView({ behavior: "smooth" }); } },
      { id: "projects", label: "Projects", description: "View my work", icon: FolderGit2, action: () => { document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }); } },
      { id: "skills", label: "Capabilities", description: "Technical skills", icon: Zap, action: () => { document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" }); } },
      { id: "experience", label: "Experience", description: "My journey", icon: Briefcase, action: () => { document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" }); } },
      { id: "education", label: "Education", description: "Academic background", icon: GraduationCap, action: () => { document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" }); } },
      { id: "sleep", label: "Sleep Stage Prediction", description: "LSTM Case Study", icon: Brain, action: () => { window.location.href = "/projects/sleep-stage-prediction"; } },
      { id: "weather", label: "Weather Detection", description: "YOLOv12 Case Study", icon: Cloud, action: () => { window.location.href = "/projects/weather-detection-ai"; } },
      { id: "marketplace", label: "UPJ Marketplace", description: "Flask Case Study", icon: ShoppingCart, action: () => { window.location.href = "/projects/upj-marketplace"; } },
      { id: "resume", label: "Download Resume", description: "Get my CV", icon: Download, action: () => { window.open("/resume.pdf", "_blank"); } },
      { id: "github", label: "GitHub", description: "View source code", icon: Code2, action: () => { window.open("https://github.com/ivandarmawann", "_blank"); } },
      { id: "linkedin", label: "LinkedIn", description: "Connect with me", icon: ExternalLink, action: () => { window.open("https://www.linkedin.com/in/ivandarmawann/", "_blank"); } },
      { id: "email", label: "Email", description: "Send a message", icon: Mail, action: () => { window.location.href = "mailto:mhmmdipand@gmail.com"; } },
    ],
    [],
  );

  const filtered = useMemo(
    () => {
      if (!query.trim()) return commands;
      const q = query.toLowerCase();
      return commands.filter(
        (c) =>
          c.label.toLowerCase().includes(q) ||
          c.description?.toLowerCase().includes(q),
      );
    },
    [commands, query],
  );

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setSelectedIndex(0);
  }, []);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((p) => !p);
      }
    };
    window.addEventListener("keydown", down);
    return () => window.removeEventListener("keydown", down);
  }, []);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  // Reset index when query changes (handled in onChange)

  useEffect(() => {
    const el = listRef.current?.children[selectedIndex] as HTMLElement | undefined;
    el?.scrollIntoView({ block: "nearest" });
  }, [selectedIndex]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      close();
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((i) => Math.min(i + 1, filtered.length - 1));
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((i) => Math.max(i - 1, 0));
      return;
    }
    if (e.key === "Enter" && filtered[selectedIndex]) {
      filtered[selectedIndex].action();
      close();
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-4 right-4 z-40 hidden items-center gap-1.5 rounded-lg border border-border bg-card/80 px-3 py-1.5 text-xs text-muted-foreground backdrop-blur-sm hover:text-foreground lg:flex"
        aria-label="Open command palette"
      >
        <Command className="size-3" />
        <span>Ctrl+K</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={close}
              aria-hidden="true"
            />

            <motion.div
              className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-background/90 shadow-2xl backdrop-blur-2xl"
              initial={{ opacity: 0, scale: 0.96, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              role="dialog"
              aria-modal="true"
              aria-label="Command palette"
            >
              <div className="flex items-center gap-3 border-b border-border px-4">
                <Search className="size-4 shrink-0 text-muted-foreground" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => { setQuery(e.target.value); setSelectedIndex(0); }}
                  onKeyDown={onKeyDown}
                  placeholder="Search commands..."
                  className="h-12 w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                  aria-label="Search commands"
                />
                <kbd className="shrink-0 rounded-md border border-border bg-secondary px-1.5 py-0.5 text-[10px] text-muted-foreground">
                  ESC
                </kbd>
              </div>

              <div
                ref={listRef}
                className="max-h-[300px] overflow-y-auto p-2"
                role="listbox"
                aria-label="Commands"
              >
                {filtered.length === 0 ? (
                  <div className="flex flex-col items-center gap-2 py-8 text-center">
                    <Search className="size-8 text-muted-foreground/40" />
                    <p className="text-sm text-muted-foreground">
                      No results found
                    </p>
                  </div>
                ) : (
                  filtered.map((cmd, i) => {
                    const Icon = cmd.icon;
                    return (
                      <button
                        key={cmd.id}
                        role="option"
                        aria-selected={i === selectedIndex}
                        onClick={() => {
                          cmd.action();
                          close();
                        }}
                        onMouseEnter={() => setSelectedIndex(i)}
                        className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                          i === selectedIndex
                            ? "bg-primary/10 text-primary"
                            : "text-foreground hover:bg-secondary"
                        }`}
                      >
                        <Icon className="size-4 shrink-0" />
                        <div className="min-w-0 flex-1">
                          <div className="font-medium">{cmd.label}</div>
                          {cmd.description && (
                            <div className="text-xs text-muted-foreground">
                              {cmd.description}
                            </div>
                          )}
                        </div>
                      </button>
                    );
                  })
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
