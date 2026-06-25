"use client";

import { ArrowDown, Mail } from "lucide-react";
import { motion } from "framer-motion";
import * as React from "react";
import { MagneticButton } from "@/components/effects/magnetic-button";

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-14"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(37, 99, 235, 0.06), transparent)",
        }}
      />

      <div className="mx-auto w-full max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-1.5"
        >
          <span className="size-1.5 rounded-full bg-green-500" />
          <span className="text-xs font-medium text-muted-foreground">
            Open for opportunities
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl xl:leading-[0.9]"
        >
          Muhammad Ivan Darmawan
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-medium text-muted-foreground sm:text-base"
        >
          <span className="text-primary">Full-Stack Developer</span>
          <span className="hidden h-3 w-px bg-border sm:block" />
          <span>Data Analyst</span>
          <span className="hidden h-3 w-px bg-border sm:block" />
          <span>AI & Machine Learning Enthusiast</span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
          className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          Building practical digital products through web development, data
          analytics, and artificial intelligence.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <MagneticButton as="a" href="#projects">
            <div className="inline-flex h-11 items-center gap-2 rounded-lg bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-[0_0_20px_rgba(37,99,235,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              View Projects
              <ArrowDown aria-hidden="true" className="size-4" />
            </div>
          </MagneticButton>
          <MagneticButton as="a" href="#contact">
            <div className="inline-flex h-11 items-center gap-2 rounded-lg border border-border bg-secondary px-6 text-sm font-medium text-foreground transition-all hover:bg-muted hover:border-primary/30 hover:shadow-[0_0_20px_rgba(37,99,235,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              <Mail aria-hidden="true" className="size-4" />
              Contact Me
            </div>
          </MagneticButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4"
        >
          {[
            { value: "6+", label: "Projects" },
            { value: "3", label: "AI/ML Projects" },
            { value: "UPJ", label: "Informatics" },
            { value: "IDN", label: "Tangerang Selatan" },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              whileHover={{ scale: 1.03, y: -2 }}
              className="rounded-xl border border-border bg-card p-4 text-center transition-colors hover:border-primary/20 sm:p-5"
            >
              <p className="text-xl font-bold tracking-tight text-foreground sm:text-2xl lg:text-3xl">
                {stat.value}
              </p>
              <p className="mt-1 text-[11px] font-medium uppercase tracking-wider text-muted-foreground sm:text-xs">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
