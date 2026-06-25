"use client";

import { motion, useReducedMotion } from "framer-motion";
import * as React from "react";
import { GraduationCap, UsersRound, Brain, Cloud, ShoppingCart, Sparkles } from "lucide-react";

import { SectionHeading } from "@/components/shared/section-heading";

const milestones = [
  {
    year: "2022",
    title: "Started Professional Gaming Services",
    description: "Began freelancing as a gaming service provider on Facebook Marketplace in Indonesia, delivering in-game achievements, rank boosts, and account progression for clients.",
    technologies: ["Customer Service", "Marketing", "Freelancing"],
    gradient: "from-amber-400 to-orange-500",
    icon: UsersRound,
  },
  {
    year: "2023",
    title: "Started Informatics at Universitas Pembangunan Jaya",
    description: "Began pursuing a Bachelor's degree in Informatics. Building foundations in programming, data structures, algorithms, and software engineering principles.",
    technologies: ["Python", "Java", "SQL", "Web Development"],
    gradient: "from-cyan-400 to-blue-500",
    icon: GraduationCap,
  },
  {
    year: "2024",
    title: "Built UPJ Marketplace",
    description: "Developed a campus-focused marketplace platform using Flask and SQLAlchemy, enabling students to buy and sell academic materials, electronics, and personal goods.",
    technologies: ["Python", "Flask", "SQLAlchemy", "Bootstrap"],
    gradient: "from-violet-400 to-purple-500",
    icon: ShoppingCart,
  },
  {
    year: "2025",
    title: "Developed Weather Detection AI",
    description: "Applied YOLOv12 object detection to identify weather conditions from images. Managed dataset preparation, annotation, and model training in Google Colab.",
    technologies: ["Python", "YOLOv12", "Roboflow", "Google Colab"],
    gradient: "from-emerald-400 to-teal-500",
    icon: Cloud,
  },
  {
    year: "2025",
    title: "Developed Sleep Stage Prediction using LSTM",
    description: "Built a deep learning model using LSTM to classify sleep stages from physiological signals. Achieved 90.16% accuracy on a 200K+ sample dataset.",
    technologies: ["Python", "TensorFlow", "Keras", "LSTM", "Pandas"],
    gradient: "from-purple-400 to-pink-500",
    icon: Brain,
  },
  {
    year: "2026",
    title: "Seeking AI / Data / Full-Stack Internship",
    description: "Actively looking for internship opportunities in software engineering, data analytics, and machine learning to apply academic knowledge to real-world challenges.",
    technologies: ["Full-Stack", "Data Analytics", "Machine Learning", "AI"],
    gradient: "from-blue-400 to-cyan-500",
    icon: Sparkles,
  },
];

export function ExperienceSection() {
  const prefersReducedMotion = useReducedMotion();
  const reducedMotion = Boolean(prefersReducedMotion);

  return (
    <section id="experience" className="scroll-mt-28 overflow-hidden py-20 sm:py-24 lg:py-32">
      <div className="mx-auto w-full max-w-6xl px-6 sm:px-8 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: reducedMotion ? 0 : 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <SectionHeading
            eyebrow="Experience"
            title="Path of growth & discovery."
            description="A journey from independent freelancing to AI development — building skills across software engineering, data analytics, and machine learning."
          />
        </motion.div>
      </div>

      <div className="relative mx-auto mt-16 w-full max-w-4xl px-6 sm:px-8 lg:px-10">
        <div className="absolute left-8 top-0 h-full w-px bg-gradient-to-b from-primary/30 via-primary/10 to-transparent lg:left-1/2 lg:-translate-x-px" />

        <div className="space-y-12">
          {milestones.map((milestone, index) => {
            const Icon = milestone.icon;
            const isLeft = index % 2 === 0;

            return (
              <motion.div
                key={milestone.year + milestone.title}
                initial={{ opacity: 0, y: reducedMotion ? 0 : 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.5,
                  delay: reducedMotion ? 0 : index * 0.08,
                  ease: "easeOut",
                }}
                className={cn(
                  "relative pl-16 lg:w-[calc(50%+2rem)] lg:pl-0",
                  isLeft ? "lg:pr-14 lg:text-right" : "lg:ml-[calc(50%+2rem)] lg:pl-14",
                )}
              >
                <div
                  className={cn(
                    "absolute left-0 top-1 flex items-center justify-center lg:absolute",
                    isLeft
                      ? "lg:right-[-2.25rem] lg:left-auto"
                      : "lg:left-[-2.25rem]",
                  )}
                >
                  <motion.span
                    whileHover={{ scale: 1.15 }}
                    className={`inline-flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br ${milestone.gradient} text-white shadow-lg shadow-black/20`}
                  >
                    <Icon aria-hidden="true" className="size-5" />
                  </motion.span>
                </div>

                <motion.div
                  whileHover={{ y: -4, scale: 1.01 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="group cursor-default rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-xl shadow-black/10 backdrop-blur-xl transition-all duration-300 hover:border-primary/30 hover:bg-white/[0.07] hover:shadow-[0_0_30px_rgba(37,99,235,0.08)] sm:p-7"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`inline-flex rounded-full bg-gradient-to-br ${milestone.gradient} px-3 py-0.5 text-[11px] font-bold uppercase tracking-wider text-white`}
                    >
                      {milestone.year}
                    </span>
                  </div>

                  <h3 className="mt-3 text-lg font-bold tracking-tight text-foreground sm:text-xl">
                    {milestone.title}
                  </h3>

                  <p className="mt-2 text-sm leading-7 text-muted-foreground">
                    {milestone.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {milestone.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-white/10 bg-background/35 px-2 py-0.5 text-[11px] font-medium text-muted-foreground transition-colors group-hover:border-primary/20 group-hover:text-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function cn(...classes: (string | false | undefined | null)[]) {
  return classes.filter(Boolean).join(" ");
}
