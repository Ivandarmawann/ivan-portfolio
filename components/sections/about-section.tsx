"use client";

import { motion } from "framer-motion";

export function AboutSection() {
  return (
    <section id="about" className="scroll-mt-20 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-3xl px-6 sm:px-8 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-primary">
            <span className="size-1.5 rounded-full bg-primary" />
            About
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.08, ease: "easeOut" }}
          className="mt-8 text-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
        >
          Building Practical Digital Products Through
          <br />
          <span className="text-primary">Software, Data, and AI.</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
          className="mx-auto mt-8 max-w-2xl space-y-6 text-center text-base leading-8 text-muted-foreground sm:text-lg sm:leading-9"
        >
          <p>
            I am an Informatics student at Universitas Pembangunan Jaya with
            interests in full-stack web development, data analytics, and
            machine learning.
          </p>
          <p>
            I enjoy building practical systems that combine software
            engineering, databases, analytics, and artificial intelligence to
            solve real-world problems.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
