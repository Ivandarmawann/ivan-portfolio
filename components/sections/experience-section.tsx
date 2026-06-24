"use client";

import { BriefcaseBusiness, GraduationCap, Layers3, UsersRound } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import * as React from "react";

import { SectionHeading } from "@/components/shared/section-heading";
import { experience } from "@/data/experience";
import { cn } from "@/lib/utils";
import type { ExperienceType } from "@/types/portfolio";

const typeConfig: Record<
  ExperienceType,
  { icon: typeof GraduationCap; label: string; gradient: string }
> = {
  education: {
    icon: GraduationCap,
    label: "Education",
    gradient: "from-cyan-400 to-blue-500",
  },
  project: {
    icon: Layers3,
    label: "Project",
    gradient: "from-violet-400 to-purple-500",
  },
  organization: {
    icon: UsersRound,
    label: "Organization",
    gradient: "from-amber-400 to-orange-500",
  },
  training: {
    icon: BriefcaseBusiness,
    label: "Training",
    gradient: "from-emerald-400 to-teal-500",
  },
};

export function ExperienceSection() {
  const prefersReducedMotion = useReducedMotion();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const reducedMotion = mounted ? Boolean(prefersReducedMotion) : false;

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
            eyebrow="03 - Experience"
            title="Path of growth &amp; discovery."
            description="Academic foundation, project-based practice, and campus involvement that shaped a practical approach to technology."
          />
        </motion.div>
      </div>

      <div className="relative mx-auto mt-14 w-full max-w-4xl px-6 sm:px-8 lg:px-10">
        <div className="absolute left-6 top-0 h-full w-px bg-gradient-to-b from-primary/30 via-white/10 to-transparent lg:left-1/2 lg:-translate-x-px" />

        <div className="space-y-10">
          {experience.map((item, index) => {
            const config = typeConfig[item.type];
            const Icon = config.icon;
            const isLeft = index % 2 === 0;

            return (
              <motion.div
                key={`${item.title}-${item.organization}`}
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
                  isLeft ? "lg:pr-12 lg:text-right" : "lg:ml-[calc(50%+2rem)] lg:pl-12",
                )}
              >
                <div
                  className={cn(
                    "absolute left-0 top-1 flex items-center justify-center lg:absolute",
                    isLeft
                      ? "lg:right-[-2.35rem] lg:left-auto"
                      : "lg:left-[-2.35rem]",
                  )}
                >
                  <span
                    className={`inline-flex size-10 items-center justify-center rounded-xl bg-gradient-to-br ${config.gradient} text-white shadow-lg`}
                  >
                    <Icon aria-hidden="true" className="size-4" />
                  </span>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-xl shadow-black/10 backdrop-blur-xl transition-colors duration-300 hover:border-primary/25 hover:bg-white/[0.055] sm:p-6">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span
                      className={`inline-flex rounded-full bg-gradient-to-br ${config.gradient} px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white`}
                    >
                      {config.label}
                    </span>
                    <span className="text-muted-foreground/60">&middot;</span>
                    <span className="text-muted-foreground">{item.period}</span>
                    <span className="hidden text-muted-foreground/60 sm:inline">&middot;</span>
                    <span className="hidden text-muted-foreground sm:inline">{item.location}</span>
                  </div>

                  <p className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                    {item.organization}
                  </p>
                  <h3 className="mt-1 text-lg font-bold tracking-tight text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {item.summary}
                  </p>

                  {item.highlights.length > 0 && (
                    <ul className="mt-4 space-y-2.5">
                      {item.highlights.map((highlight) => (
                        <li
                          key={highlight}
                          className="flex gap-3 text-sm leading-6 text-muted-foreground"
                        >
                          <span
                            className={`mt-1.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${config.gradient} text-[10px] text-white`}
                          >
                            +
                          </span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
