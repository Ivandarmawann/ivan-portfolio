"use client";

import { Brain, Code2, DatabaseZap } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { SectionShell } from "@/components/layout/section-shell";
import { SectionHeading } from "@/components/shared/section-heading";
import { skills } from "@/data/skills";

const getSkills = (category: string) =>
  skills.find((group) => group.category === category)?.skills ?? [];

const capabilities = [
  {
    title: "Web Development",
    description:
      "Building responsive, database-backed web applications with practical user flows and maintainable structure.",
    icon: Code2,
    tags: [
      ...getSkills("Web Development"),
      "PHP",
      "JavaScript",
      "HTML",
      "CSS",
      "MySQL",
    ],
  },
  {
    title: "Data Analytics",
    description:
      "Cleaning, exploring, and interpreting data to surface useful patterns for decision-making and reporting.",
    icon: DatabaseZap,
    tags: ["Python", "SQL", "Pandas", "NumPy", "Scikit-Learn", "MySQL"],
  },
  {
    title: "Machine Learning",
    description:
      "Developing applied models for prediction, computer vision, NLP, and sequence-based learning workflows.",
    icon: Brain,
    tags: [
      "TensorFlow",
      "Keras",
      "XGBoost",
      "YOLOv12",
      "NLP",
      "LDA",
      "Google Colab",
    ],
  },
];

export function CapabilitiesSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <SectionShell id="skills" className="relative pt-8 sm:pt-12 lg:pt-16">
      <motion.div
        initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.55, ease: "easeOut" }}
      >
        <SectionHeading
          eyebrow="02 - Capabilities"
          title="Core strengths for internship teams."
          description="A focused skill set across application development, data analysis, and applied machine learning projects."
        />
      </motion.div>

      <div className="mt-10 grid gap-4 lg:grid-cols-3">
        {capabilities.map((capability, index) => {
          const Icon = capability.icon;

          return (
            <motion.article
              key={capability.title}
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{
                duration: 0.55,
                ease: "easeOut",
                delay: prefersReducedMotion ? 0 : index * 0.08,
              }}
              className="group rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/15 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:bg-white/[0.06]"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="inline-flex size-11 items-center justify-center rounded-xl border border-white/10 bg-background/45 text-primary">
                  <Icon aria-hidden="true" className="size-5" />
                </div>
                <span className="text-sm font-semibold text-muted-foreground">
                  0{index + 1}
                </span>
              </div>

              <h3 className="mt-6 text-xl font-bold tracking-tight text-foreground">
                {capability.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                {capability.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {capability.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-background/35 px-3 py-1 text-xs font-medium text-muted-foreground transition-colors group-hover:text-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.article>
          );
        })}
      </div>
    </SectionShell>
  );
}
