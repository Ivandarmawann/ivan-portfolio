"use client";

import * as React from "react";
import { ArrowRight, Code2, Lock } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import { SectionHeading } from "@/components/shared/section-heading";
import { projects } from "@/data/projects";
import { cn } from "@/lib/utils";
import type { ProjectLink } from "@/types/portfolio";

const categoryLabels: Record<string, string> = {
  web: "Web Development",
  data: "Data Analytics",
  "machine-learning": "Machine Learning",
  "fullstack-web": "Full-Stack Web",
};

const showcaseStyles: Record<string, { gradient: string; badge: string }> = {
  "machine-learning": {
    gradient: "from-indigo-950/60 via-indigo-900/20 to-background",
    badge: "border-indigo-500/20 bg-indigo-500/10 text-indigo-300",
  },
  "fullstack-web": {
    gradient: "from-emerald-950/60 via-emerald-900/20 to-background",
    badge: "border-emerald-500/20 bg-emerald-500/10 text-emerald-300",
  },
  data: {
    gradient: "from-amber-950/60 via-amber-900/20 to-background",
    badge: "border-amber-500/20 bg-amber-500/10 text-amber-300",
  },
  web: {
    gradient: "from-violet-950/60 via-violet-900/20 to-background",
    badge: "border-violet-500/20 bg-violet-500/10 text-violet-300",
  },
};

const previewImages: Record<string, string> = {
  "weather-detection-ai-yolov12": "/projects/weather-detection/hero.png",
  "upj-marketplace": "/projects/upj-marketplace/preview.svg",
  "employee-turnover-prediction-xgboost": "/projects/employee-turnover-prediction-xgboost/preview.svg",
  "sleep-stage-prediction-lstm": "/projects/sleep-stage-prediction-lstm/preview.svg",
};

export function ProjectsSection() {
  const featured = projects.filter((p) => p.featured);
  const nonFeatured = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="scroll-mt-20 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-6xl px-6 sm:px-8 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <SectionHeading
            eyebrow="Projects"
            title="Featured work."
            description="Four featured projects across machine learning, full-stack web, and data analytics."
            align="center"
          />
        </motion.div>
      </div>

      <div className="mx-auto mt-8 w-full max-w-6xl space-y-14 px-6 sm:mt-10 sm:space-y-18 sm:px-8 lg:space-y-20 lg:px-10">
        {featured.map((project, index) => {
          const caseStudyLink = project.links.find((l) => l.type === "case-study");
          const style = showcaseStyles[project.category] ?? showcaseStyles["machine-learning"];
          const previewImage = project.image ?? previewImages[project.slug];

          return (
            <motion.article
              key={project.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.5,
                delay: index * 0.06,
                ease: "easeOut",
              }}
            >
              <Link
                href={caseStudyLink?.href ?? "#"}
                className={cn(
                  "relative block aspect-[16/9] w-full overflow-hidden rounded-lg border border-border sm:rounded-xl",
                  !caseStudyLink && "pointer-events-none",
                )}
              >
                {previewImage ? (
                  previewImage.endsWith(".svg") ? (
                    <Image
                      src={previewImage}
                      alt={`${project.title} screenshot`}
                      fill
                      className="object-cover object-top"
                      unoptimized
                    />
                  ) : (
                    <>
                      <Image
                        src={previewImage}
                        alt={`${project.title} screenshot`}
                        fill
                        className="object-cover object-top"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1100px"
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                        <span
                          className={cn(
                            "inline-block rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-wider",
                            style.badge,
                          )}
                        >
                          {categoryLabels[project.category]}
                        </span>
                        <h3 className="mt-3 text-lg font-bold tracking-tight text-white sm:text-xl lg:text-2xl">
                          {project.title}
                        </h3>
                      </div>
                    </>
                  )
                ) : (
                  <div
                    className={cn(
                      "flex h-full items-center justify-center bg-gradient-to-br",
                      style.gradient,
                    )}
                  >
                    <div className="px-8 text-center">
                      <span
                        className={cn(
                          "inline-block rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-wider",
                          style.badge,
                        )}
                      >
                        {categoryLabels[project.category]}
                      </span>
                      <h3 className="mt-4 text-lg font-bold tracking-tight text-white sm:text-xl lg:text-2xl">
                        {project.title}
                      </h3>
                    </div>
                  </div>
                )}
              </Link>

              <div className="mt-5 grid gap-4 sm:grid-cols-[1.2fr_1fr] sm:gap-8 lg:gap-10">
                <div>
                  <p className="text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
                    {project.summary}
                  </p>
                </div>

                <div>
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-border bg-card px-2.5 py-1 text-xs font-medium text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    {caseStudyLink && (
                      <Link
                        href={caseStudyLink.href}
                        className="inline-flex h-9 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        View Case Study
                        <ArrowRight aria-hidden="true" className="size-3.5" />
                      </Link>
                    )}
                    <ProjectActions links={project.links} />
                  </div>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>

      {nonFeatured.length > 0 && (
        <div className="mx-auto mt-14 w-full max-w-6xl px-6 sm:mt-18 sm:px-8 lg:mt-20 lg:px-10">
          <hr className="border-border" />
          <h3 className="mt-8 text-base font-semibold text-foreground sm:text-lg">
            More projects
          </h3>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {nonFeatured.map((project, index) => {
              const style = showcaseStyles[project.category] ?? showcaseStyles["machine-learning"];
              return (
                <motion.div
                  key={project.slug}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="rounded-xl border border-border bg-card p-5"
                >
                  <span
                    className={cn(
                      "inline-block rounded-full border px-2.5 py-0.5 text-[11px] font-medium",
                      style.badge,
                    )}
                  >
                    {categoryLabels[project.category]}
                  </span>
                  <h4 className="mt-3 text-sm font-semibold text-foreground">
                    {project.title}
                  </h4>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {project.summary}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.techStack.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-border bg-secondary px-2 py-0.5 text-[11px] text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}

function ProjectActions({
  links,
}: {
  links: ProjectLink[];
}) {
  const repositoryLink = links.find((link) => link.type === "repository");

  const buttonClass =
    "inline-flex h-9 items-center justify-center gap-1.5 rounded-lg border border-border bg-secondary px-3.5 text-sm font-medium text-muted-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

  if (!repositoryLink) {
    return (
      <button type="button" className={cn(buttonClass, "cursor-not-allowed opacity-55")} disabled>
        <Lock aria-hidden="true" className="size-3.5" />
        Source Code (Private)
      </button>
    );
  }

  return (
    <a
      href={repositoryLink.href}
      target="_blank"
      rel="noreferrer"
      className={cn(buttonClass, "hover:bg-muted hover:text-foreground")}
      aria-label="Source code on GitHub"
    >
      <Code2 aria-hidden="true" className="size-3.5" />
      View Source
    </a>
  );
}
