"use client";

import { ArrowLeft, ChevronRight, Lock } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { CaseStudySection, fadeUp } from "./case-study-section";

type Metric = {
  value: string;
  label: string;
};

type CaseStudyHeroProps = {
  category: string;
  title: string;
  subtitle: string;
  description: string;
  heroImage: string;
  heroImageAlt: string;
  metrics: Metric[];
  githubUrl?: string;
  demoUrl?: string;
  backHref?: string;
};

export function CaseStudyHero({
  category,
  title,
  subtitle,
  description,
  heroImage,
  heroImageAlt,
  metrics,
  githubUrl,
  demoUrl,
  backHref = "/#projects",
}: CaseStudyHeroProps) {
  return (
    <div className="relative isolate flex min-h-[70vh] items-center overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          animate={{ x: [0, 20, -10, 0], y: [0, -15, 8, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-[-16rem] top-10 size-[34rem] rounded-full bg-glow-cyan/15 blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -18, 14, 0], y: [0, 18, -8, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-14rem] right-[-12rem] size-[38rem] rounded-full bg-glow-violet/15 blur-3xl"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(circle_at_center,black,transparent_65%)]" />
      </div>

      <CaseStudySection className="w-full py-0">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.15fr]">
          <motion.div initial="hidden" animate="visible" transition={{ staggerChildren: 0.08 }}>
            <motion.div variants={fadeUp} transition={{ duration: 0.5 }}>
              <Link
                href={backHref}
                className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                <ArrowLeft aria-hidden="true" className="size-4" />
                Back to Projects
              </Link>
            </motion.div>

            <motion.div variants={fadeUp} transition={{ duration: 0.55 }}>
              <span className="inline-flex rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-primary backdrop-blur">
                {category}
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              transition={{ duration: 0.6 }}
              className="mt-6 max-w-4xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
            >
              {title}
              <span className="mt-2 block text-lg font-semibold tracking-normal text-muted-foreground sm:text-xl lg:text-2xl">
                {subtitle}
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.6 }}
              className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl sm:leading-9"
            >
              {description}
            </motion.p>

            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4"
            >
              {metrics.map(({ value, label }) => (
                <div
                  key={label}
                  className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-3 text-center backdrop-blur transition-colors hover:border-primary/25"
                >
                  <p className="text-lg font-bold text-foreground">{value}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{label}</p>
                </div>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} transition={{ duration: 0.55 }} className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="h-11 rounded-full px-6 text-sm">
                <a href="#overview">
                  Explore Case Study
                  <ChevronRight aria-hidden="true" className="ml-1 size-4" />
                </a>
              </Button>
              {demoUrl ? (
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="h-11 rounded-full border-white/10 bg-white/[0.04] px-6 text-sm text-foreground hover:bg-white/[0.08]"
                >
                  <a href={demoUrl} target="_blank" rel="noreferrer">
                    Live Demo
                  </a>
                </Button>
              ) : null}
              {githubUrl ? (
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="h-11 rounded-full border-white/10 bg-white/[0.04] px-6 text-sm text-foreground hover:bg-white/[0.08]"
                >
                  <a href={githubUrl} target="_blank" rel="noreferrer">
                    View Source
                  </a>
                </Button>
              ) : (
                <Button
                  variant="outline"
                  size="lg"
                  disabled
                  title="Repository is not publicly available yet"
                  className="h-11 cursor-not-allowed rounded-full border-white/10 bg-white/[0.04] px-6 text-sm text-muted-foreground/60 opacity-60"
                >
                  <Lock aria-hidden="true" className="mr-1 size-4" />
                  Source Code (Private)
                </Button>
              )}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
            className="relative mx-auto w-full max-w-xl"
          >
            <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-card shadow-2xl shadow-black/30">
              <Image
                src={heroImage}
                alt={heroImageAlt}
                fill
                className="object-cover transition-all duration-500 group-hover:scale-[1.03]"
                sizes="(max-width: 640px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />
            </div>
          </motion.div>
        </div>
      </CaseStudySection>
    </div>
  );
}
