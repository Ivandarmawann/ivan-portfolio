"use client";

import * as React from "react";
import { useCallback } from "react";
import { ArrowRight, BarChart3, Brain, Cloud, ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/shared/section-heading";
import { projects } from "@/data/projects";
import { cn } from "@/lib/utils";
import type { Project } from "@/types/portfolio";

const categoryLabels: Record<string, string> = {
  web: "Web Development",
  data: "Data Analytics",
  "machine-learning": "Machine Learning",
  "fullstack-web": "Full-Stack Web",
};

const previewImages: Record<string, string> = {
  "weather-detection-ai-yolov12": "/projects/weather-detection/hero.png",
  "upj-marketplace": "/projects/upj-marketplace/preview.svg",
  "employee-turnover-prediction-xgboost":
    "/projects/employee-turnover-prediction-xgboost/preview.svg",
  "sleep-stage-prediction-lstm": "/projects/sleep-stage-prediction-lstm/preview.svg",
};

const projectMetrics: Record<string, { value: string; label: string }[]> = {
  "sleep-stage-prediction-lstm": [
    { value: "90.16%", label: "Accuracy" },
    { value: "200K+", label: "Samples" },
  ],
  "weather-detection-ai-yolov12": [
    { value: "94.7%", label: "Accuracy" },
    { value: "3", label: "Classes" },
  ],
  "upj-marketplace": [
    { value: "7", label: "Features" },
    { value: "Flask", label: "Backend" },
  ],
  "employee-turnover-prediction-xgboost": [
    { value: "XGBoost", label: "Model" },
    { value: "HR", label: "Domain" },
  ],
};

const projectIcons: Record<string, React.ElementType> = {
  "sleep-stage-prediction-lstm": Brain,
  "weather-detection-ai-yolov12": Cloud,
  "upj-marketplace": ShoppingCart,
  "employee-turnover-prediction-xgboost": BarChart3,
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: "easeOut" as const },
  }),
};

function useSpotlight() {
  const [mousePos, setMousePos] = React.useState({ x: 50, y: 50 });
  const [tilt, setTilt] = React.useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  const handleMouse = React.useCallback((e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setTilt({
      x: ((y - centerY) / centerY) * -3,
      y: ((x - centerX) / centerX) * 3,
    });
  }, []);

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
    setMousePos({ x: 50, y: 50 });
  }, []);

  return { ref, mousePos, tilt, isHovered, handleMouse, handleMouseEnter, handleMouseLeave };
}

function SpotlightOverlay({ mousePos }: { mousePos: { x: number; y: number } }) {
  return (
    <div
      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      style={{
        background: `radial-gradient(600px circle at ${mousePos.x}% ${mousePos.y}%, rgba(120, 80, 255, 0.12), transparent 50%)`,
      }}
    />
  );
}

export function ProjectsSection() {
  const featured = projects.filter((p) => p.featured);
  const heroProject = featured.find(
    (p) => p.slug === "sleep-stage-prediction-lstm",
  );
  const otherFeatured = featured.filter(
    (p) => p.slug !== "sleep-stage-prediction-lstm",
  );
  const nonFeatured = projects.filter((p) => !p.featured);

  return (
    <section
      id="projects"
      className="scroll-mt-20 py-16 sm:py-20 lg:py-24"
    >
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
            description="Flagship projects across machine learning, full-stack web, and data analytics."
            align="center"
          />
        </motion.div>
      </div>

      <div className="mx-auto mt-10 w-full max-w-6xl space-y-12 px-6 sm:px-8 lg:px-10">
        {heroProject ? (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            custom={0}
            variants={cardVariants}
          >
            <ProjectHeroCard project={heroProject} />
          </motion.div>
        ) : null}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {otherFeatured.map((project, index) => (
            <motion.div
              key={project.slug}
              custom={index + 1}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </div>

      {nonFeatured.length > 0 && (
        <div className="mx-auto mt-14 w-full max-w-6xl px-6 sm:mt-18 sm:px-8 lg:mt-20 lg:px-10">
          <hr className="border-border" />
          <h3 className="mt-8 text-base font-semibold text-foreground sm:text-lg">
            More projects
          </h3>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {nonFeatured.map((project, index) => {
              const style = {
                gradient:
                  "from-indigo-950/60 via-indigo-900/20 to-background",
                badge:
                  "border-indigo-500/20 bg-indigo-500/10 text-indigo-300",
              };
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

function ProjectHeroCard({ project }: { project: Project }) {
  const caseStudyLink = project.links.find((l) => l.type === "case-study");
  const previewImage = project.image ?? previewImages[project.slug];
  const metrics = projectMetrics[project.slug] ?? [];
  const Icon = projectIcons[project.slug] ?? Brain;
  const { ref, mousePos, tilt, isHovered, handleMouse, handleMouseEnter, handleMouseLeave } = useSpotlight();

  return (
    <Link
      href={caseStudyLink?.href ?? "#"}
      className={cn(
        "group relative block overflow-hidden rounded-2xl border border-border bg-card transition-all duration-500",
        !caseStudyLink && "pointer-events-none",
      )}
      style={{ perspective: "1200px" }}
    >
      <motion.div
        ref={ref}
        onPointerMove={handleMouse}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative"
        animate={{
          rotateX: tilt.x,
          rotateY: tilt.y,
          y: isHovered ? -6 : 0,
          scale: isHovered ? 1.015 : 1,
        }}
        transition={{ type: "spring", stiffness: 250, damping: 20, mass: 0.5 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <SpotlightOverlay mousePos={mousePos} />
        <div className="grid lg:grid-cols-[1.3fr_1fr]">
          <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto">
            {previewImage ? (
              previewImage.endsWith(".svg") ? (
                <Image
                  src={previewImage}
                  alt={`${project.title} screenshot`}
                  fill
                  className="object-cover object-top transition-all duration-700 group-hover:scale-[1.03]"
                  unoptimized
                />
              ) : (
                <>
                  <Image
                    src={previewImage}
                    alt={`${project.title} screenshot`}
                    fill
                    className="object-cover object-top transition-all duration-700 group-hover:scale-[1.03]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 650px"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
                </>
              )
            ) : null}
          </div>

          <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
            <div className="flex items-center gap-3">
              <span className="inline-flex size-10 items-center justify-center rounded-xl border border-primary/20 bg-primary/[0.08] text-primary">
                <Icon aria-hidden="true" className="size-5" />
              </span>
              <span className="rounded-full border border-primary/20 bg-primary/[0.06] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary">
                Featured Project
              </span>
            </div>

            <h3 className="mt-4 text-xl font-bold tracking-tight text-foreground sm:text-2xl">
              {project.title}
            </h3>
            <p className="mt-3 line-clamp-2 text-sm leading-6 text-muted-foreground">
              {project.summary}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {project.techStack.slice(0, 6).map((tech) => (
                <span
                  key={tech}
                  className="rounded-md border border-border bg-secondary/80 px-2 py-0.5 text-[11px] font-medium text-muted-foreground transition-colors group-hover:border-primary/30 group-hover:text-primary"
                >
                  {tech}
                </span>
              ))}
            </div>

            {metrics.length > 0 ? (
              <div className="mt-5 flex flex-wrap gap-4">
                {metrics.map((m) => (
                  <div key={m.label} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary/60" />
                    <div>
                      <span className="text-sm font-bold text-foreground">
                        {m.value}
                      </span>
                      <span className="ml-1 text-xs text-muted-foreground">
                        {m.label}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : null}

            <div className="mt-6 inline-flex h-10 w-fit items-center gap-2 rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-sm transition-all group-hover:bg-primary/90">
              View Case Study
              <ArrowRight
                aria-hidden="true"
                className="size-3.5 transition-transform group-hover:translate-x-0.5"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const caseStudyLink = project.links.find((l) => l.type === "case-study");
  const previewImage = project.image ?? previewImages[project.slug];
  const metrics = projectMetrics[project.slug] ?? [];
  const { ref, mousePos, tilt, isHovered, handleMouse, handleMouseEnter, handleMouseLeave } = useSpotlight();

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMouse}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative overflow-hidden rounded-2xl border border-border bg-card"
      animate={{
        rotateX: tilt.x,
        rotateY: tilt.y,
        y: isHovered ? -8 : 0,
        scale: isHovered ? 1.02 : 1,
      }}
      transition={{ type: "spring", stiffness: 250, damping: 20, mass: 0.5 }}
      style={{
        transformStyle: "preserve-3d",
        boxShadow: isHovered
          ? "0 0 40px rgba(37,99,235,0.12), 0 20px 60px rgba(0,0,0,0.3)"
          : "0 0 0px rgba(37,99,235,0)",
      }}
    >
      <SpotlightOverlay mousePos={mousePos} />
      <Link
        href={caseStudyLink?.href ?? "#"}
        className={cn(!caseStudyLink && "pointer-events-none")}
      >
        <div className="relative aspect-[16/10] overflow-hidden">
          {previewImage ? (
            previewImage.endsWith(".svg") ? (
              <Image
                src={previewImage}
                alt={`${project.title} screenshot`}
                fill
                className="object-cover object-top transition-all duration-500 group-hover:scale-[1.04]"
                unoptimized
              />
            ) : (
              <>
                <Image
                  src={previewImage}
                  alt={`${project.title} screenshot`}
                  fill
                  className="object-cover object-top transition-all duration-500 group-hover:scale-[1.04]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </>
            )
          ) : null}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 p-4">
            <span className="rounded-full border border-white/20 bg-black/40 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
              {categoryLabels[project.category]}
            </span>
          </div>
        </div>

        <div className="p-5">
          <h3 className="text-base font-bold text-foreground sm:text-lg">
            {project.title}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">
            {project.summary}
          </p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.techStack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-border bg-secondary/80 px-2 py-0.5 text-[11px] font-medium text-muted-foreground transition-colors group-hover:border-primary/30 group-hover:text-primary"
              >
                {tech}
              </span>
            ))}
          </div>

          {metrics.length > 0 ? (
            <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1">
              {metrics.map((m) => (
                <div key={m.label} className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-primary/50" />
                  <span className="text-xs font-semibold text-foreground">
                    {m.value}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {m.label}
                  </span>
                </div>
              ))}
            </div>
          ) : null}

          {caseStudyLink ? (
            <div className="mt-5 inline-flex h-9 items-center gap-2 rounded-lg bg-primary px-4 text-xs font-semibold text-primary-foreground shadow-sm transition-all group-hover:bg-primary/90">
              View Case Study
              <ArrowRight aria-hidden="true" className="size-3" />
            </div>
          ) : null}
        </div>
      </Link>
    </motion.div>
  );
}
