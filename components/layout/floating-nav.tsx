"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

type NavItem = {
  id: string;
  label: string;
  href: `#${string}`;
};

const defaultNavItems: NavItem[] = [
  { id: "home", label: "Home", href: "#home" },
  { id: "skills", label: "Capabilities", href: "#skills" },
  { id: "projects", label: "Projects", href: "#projects" },
  { id: "contact", label: "Contact", href: "#contact" },
];

type FloatingNavProps = {
  items?: NavItem[];
  className?: string;
};

export function FloatingNav({ items = defaultNavItems, className }: FloatingNavProps) {
  const [activeId, setActiveId] = React.useState(items[0]?.id ?? "");
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    const onScroll = () => {
      const scrollPos = window.scrollY + 140;
      let currentId = items[0]?.id ?? "";

      for (const item of items) {
        const el = document.getElementById(item.id);
        if (!el) continue;
        if (scrollPos >= el.offsetTop) {
          currentId = item.id;
        }
      }

      setActiveId(currentId);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [items]);

  return (
    <nav
      aria-label="Primary navigation"
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border bg-background/72 shadow-sm backdrop-blur-xl"
          : "bg-transparent",
        className,
      )}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6 sm:px-8 lg:px-10">
        <a
          href="#home"
          className="text-sm font-semibold tracking-tight text-foreground transition-colors hover:text-primary"
        >
          Ivan Darmawan
        </a>

        <ul className="flex items-center gap-0.5">
          {items.map((item) => {
            const isActive = activeId === item.id;

            return (
              <li key={item.id} className="shrink-0">
                <a
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "relative flex h-8 items-center rounded-full px-3 text-sm font-medium text-muted-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:px-4",
                    "hover:text-foreground",
                    isActive && "text-foreground",
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute inset-0 -z-10 rounded-full transition-colors",
                      isActive ? "bg-secondary" : "bg-transparent",
                    )}
                  />
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
