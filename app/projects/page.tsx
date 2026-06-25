"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import { FloatingNav } from "@/components/layout/floating-nav";
import { Footer } from "@/components/layout/footer";
import { projects } from "@/data/projects";
import { cn } from "@/lib/utils";

const categoryLabels: Record<string, string> = {
  web: "Web Development",
  data: "Data Analytics",
  "machine-learning": "Machine Learning",
  "fullstack-web": "Full-Stack Web",
};

const previewImages: Record<string, string> = {
  "weather-detection-ai-yolov12": "/projects/weather-detection/hero.png",
  "upj-marketplace": "/projects/upj-marketplace/preview.svg",
  "employee-turnover-prediction-xgboost": "/projects/employee-turnover-prediction-xgboost/preview.svg",
  "sleep-stage-prediction-lstm": "/projects/sleep-stage-prediction-lstm/preview.svg",
};

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <FloatingNav />
      <main className="pt-28">
        <div className="mx-auto w-full max-w-6xl px-6 sm:px-8 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-3.5 py-1 text-xs font-medium text-muted-foreground">
              Portfolio
            </span>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              All Projects
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
              A collection of projects spanning web development, data analytics, machine learning, and deep learning.
            </p>
          </motion.div>
        </div>

        <div className="mx-auto mt-12 w-full max-w-6xl space-y-16 px-6 sm:px-8 lg:px-10">
          {projects.filter((p) => p.featured).map((project, index) => {
            const caseStudyLink = project.links.find((l) => l.type === "case-study");
            const previewImage = project.image ?? previewImages[project.slug];

            return (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
              >
                <Link
                  href={caseStudyLink?.href ?? "#"}
                  className={cn(
                    "group grid overflow-hidden rounded-2xl border border-border bg-card transition-all duration-500 hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-[0_0_30px_rgba(37,99,235,0.06)] lg:grid-cols-[1.2fr_1fr]",
                    !caseStudyLink && "pointer-events-none",
                  )}
                >
                  <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto">
                    {previewImage ? (
                      previewImage.endsWith(".svg") ? (
                        <Image
                          src={previewImage}
                          alt={`${project.title} preview`}
                          fill
                          className="object-cover object-top transition-all duration-700 group-hover:scale-[1.03]"
                          unoptimized
                        />
                      ) : (
                        <Image
                          src={previewImage}
                          alt={`${project.title} preview`}
                          fill
                          className="object-cover object-top transition-all duration-700 group-hover:scale-[1.03]"
                          sizes="(max-width: 640px) 100vw, 50vw"
                        />
                      )
                    ) : null}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />
                  </div>

                  <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
                    <span className="w-fit rounded-full border border-primary/20 bg-primary/[0.06] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary">
                      {categoryLabels[project.category]}
                    </span>
                    <h3 className="mt-3 text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                      {project.title}
                    </h3>
                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">
                      {project.summary}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {project.techStack.slice(0, 6).map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md border border-border bg-secondary/80 px-2 py-0.5 text-[11px] font-medium text-muted-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    {caseStudyLink ? (
                      <div className="mt-5 inline-flex h-10 w-fit items-center gap-2 rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-sm transition-all group-hover:bg-primary/90">
                        View Case Study
                        <ArrowRight aria-hidden="true" className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                      </div>
                    ) : null}
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <div className="mx-auto mt-16 w-full max-w-6xl px-6 pb-24 sm:px-8 lg:px-10">
          <hr className="border-border" />
          <h3 className="mt-8 text-base font-semibold text-foreground sm:text-lg">
            Additional Projects
          </h3>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {projects.filter((p) => !p.featured).map((project, index) => (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="rounded-xl border border-border bg-card p-5"
              >
                <span className="inline-block rounded-full border border-indigo-500/20 bg-indigo-500/10 px-2.5 py-0.5 text-[11px] font-medium text-indigo-300">
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
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
