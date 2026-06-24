"use client";

import { motion } from "framer-motion";

const capabilities = [
  {
    id: "01",
    title: "Full-Stack Web Development",
    description:
      "Building modern web applications with scalable backends, responsive interfaces, APIs, authentication systems, and database-driven architectures.",
    tags: [
      "Python", "Flask", "Laravel", "SQLAlchemy", "SQLite", "MySQL",
      "Bootstrap", "JavaScript", "HTML", "CSS", "React", "Next.js",
    ],
    metric: "15+ Web Projects Built",
    accent: "from-blue-500/20 to-cyan-500/10",
    borderAccent: "group-hover:border-blue-500/30",
  },
  {
    id: "02",
    title: "Data Analytics",
    description:
      "Transforming raw data into actionable insights through data cleaning, preprocessing, visualization, dashboarding, and statistical analysis.",
    tags: [
      "Python", "Pandas", "NumPy", "Scikit-Learn", "XGBoost",
      "Jupyter Notebook", "Google Colab", "Power BI",
    ],
    metric: "100K+ Rows Processed",
    accent: "from-emerald-500/20 to-teal-500/10",
    borderAccent: "group-hover:border-emerald-500/30",
  },
  {
    id: "03",
    title: "Artificial Intelligence & Machine Learning",
    description:
      "Developing intelligent systems using deep learning, computer vision, predictive analytics, and AI automation.",
    tags: [
      "Python", "TensorFlow", "Keras", "YOLOv12", "Roboflow", "NumPy",
      "Pandas", "Google Colab", "Jupyter Notebook", "Computer Vision", "LSTM", "NLP",
    ],
    metric: "3+ AI Models Developed",
    accent: "from-purple-500/20 to-pink-500/10",
    borderAccent: "group-hover:border-purple-500/30",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" as const },
  },
};

const tagVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: 0.3 + i * 0.03, duration: 0.25, ease: "easeOut" as const },
  }),
};

export function SkillsSection() {
  return (
    <section id="skills" className="scroll-mt-20 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-6xl px-6 sm:px-8 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="mx-auto max-w-xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-3.5 py-1 text-xs font-medium text-muted-foreground">
              Capabilities
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              What I Do
            </h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Core areas of expertise developed through academic coursework, hands-on projects, and continuous learning.
            </p>
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6"
        >
          {capabilities.map((cap) => (
            <motion.div
              key={cap.id}
              variants={cardVariants}
              className={`group relative overflow-hidden rounded-2xl border border-border bg-card/80 backdrop-blur-sm transition-all duration-400 hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(37,99,235,0.06)] ${cap.borderAccent}`}
            >
              <div
                className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${cap.accent} opacity-0 transition-opacity duration-400 group-hover:opacity-100`}
              />
              <div className="relative z-10 p-6 sm:p-7 lg:p-8">
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  className="inline-flex items-center justify-center rounded-xl border border-border bg-secondary px-3 py-1.5 text-sm font-bold tracking-wider text-primary"
                >
                  {cap.id}
                </motion.span>
                <h3 className="mt-5 text-lg font-bold tracking-tight text-foreground sm:text-xl">
                  {cap.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {cap.description}
                </p>
                <div className="mt-6 flex flex-wrap gap-1.5">
                  {cap.tags.map((tag, i) => (
                    <motion.span
                      key={tag}
                      custom={i}
                      variants={tagVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      className="rounded-md border border-border bg-secondary/80 px-2 py-0.5 text-[11px] font-medium text-muted-foreground transition-all duration-200 hover:border-primary/30 hover:text-primary"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
                <div className="mt-6 flex items-center gap-2.5 border-t border-border pt-5">
                  <span className="flex h-2 w-2 rounded-full bg-primary/60" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-primary/80">
                    {cap.metric}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
