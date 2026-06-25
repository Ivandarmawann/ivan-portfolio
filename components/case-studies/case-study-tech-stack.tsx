"use client";

import { motion } from "framer-motion";

import { fadeUp } from "./case-study-section";

type CaseStudyTechStackProps = {
  items: string[];
};

export function CaseStudyTechStack({ items }: CaseStudyTechStackProps) {
  return (
    <motion.div variants={fadeUp} transition={{ duration: 0.5, delay: 0.1 }}>
      <div className="mt-8 flex flex-wrap gap-3">
        {items.map((tech) => (
          <span
            key={tech}
            className="rounded-full border border-white/10 bg-white/[0.04] px-5 py-2.5 text-sm font-medium text-foreground backdrop-blur transition-colors hover:border-primary/30"
          >
            {tech}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
