"use client";

import { ArrowLeft, ArrowRight, Code2, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { fadeUp } from "./case-study-section";

type CaseStudyCTAProps = {
  nextProjectHref?: string;
  nextProjectLabel?: string;
  githubUrl?: string;
  demoUrl?: string;
};

export function CaseStudyCTA({ nextProjectHref, nextProjectLabel, githubUrl, demoUrl }: CaseStudyCTAProps) {
  return (
    <section className="scroll-mt-28 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-6xl px-6 sm:px-8 lg:px-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ staggerChildren: 0.1 }}
          className="rounded-3xl border border-white/10 bg-white/[0.045] p-8 text-center backdrop-blur-xl sm:p-12 lg:p-16"
        >
          <motion.h2 variants={fadeUp} transition={{ duration: 0.5 }} className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Explore the project
          </motion.h2>
          <motion.p variants={fadeUp} transition={{ duration: 0.5, delay: 0.05 }} className="mt-4 text-base text-muted-foreground">
            {demoUrl || githubUrl
              ? "Try the live demo or browse the source code."
              : "Learn more about the development process and technical decisions."}
          </motion.p>

          <motion.div variants={fadeUp} transition={{ duration: 0.5, delay: 0.1 }} className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            {demoUrl ? (
              <Button asChild size="lg" className="h-12 rounded-full px-8 text-sm">
                <a href={demoUrl} target="_blank" rel="noreferrer">
                  Live Demo
                  <ExternalLink aria-hidden="true" className="ml-2 size-4" />
                </a>
              </Button>
            ) : null}
            {githubUrl ? (
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-12 rounded-full border-white/10 bg-white/[0.04] px-8 text-sm text-foreground hover:bg-white/[0.08]"
              >
                <a href={githubUrl} target="_blank" rel="noreferrer">
                  <Code2 aria-hidden="true" className="mr-2 size-4" />
                  GitHub Repository
                </a>
              </Button>
            ) : null}
          </motion.div>

          <motion.div variants={fadeUp} transition={{ duration: 0.5, delay: 0.15 }} className="mt-8 flex flex-wrap items-center justify-center gap-6">
            <Link href="/#projects" className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
              <ArrowLeft aria-hidden="true" className="size-4" />
              Back to all projects
            </Link>
            {nextProjectHref && nextProjectLabel ? (
              <Link href={nextProjectHref} className="inline-flex items-center gap-2 text-sm text-foreground transition-colors hover:text-primary">
                {nextProjectLabel}
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            ) : null}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
