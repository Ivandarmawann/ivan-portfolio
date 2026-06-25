"use client";

import { Activity, BarChart3, Brain, Cpu, Database, Layers, LineChart } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

import { CaseStudyHero, CaseStudySection, CaseStudyCTA, CaseStudyTechStack, CaseStudyGallery, fadeUp } from "@/components/case-studies";
import { SectionHeading } from "@/components/shared/section-heading";

const metrics = [
  { value: "90.16%", label: "Accuracy" },
  { value: "200K+", label: "Samples Processed" },
  { value: "5", label: "Sleep Stages" },
  { value: "LSTM", label: "Model Architecture" },
];

const techStack = [
  "Python", "TensorFlow", "Keras", "NumPy", "Pandas", "Jupyter Notebook", "Scikit-Learn", "Matplotlib",
];

const architectureHighlights = [
  {
    title: "Sequence Processing",
    description: "LSTM processes sleep data as time sequences, capturing temporal dependencies between consecutive readings that traditional models would miss.",
    icon: Activity,
  },
  {
    title: "Multi-Layer Architecture",
    description: "Stacked LSTM layers with dropout regularization to prevent overfitting while learning hierarchical patterns in sleep stage transitions.",
    icon: Layers,
  },
  {
    title: "Five-Class Classification",
    description: "Model predicts across Wake, N1, N2, N3 (deep sleep), and REM stages using a softmax output layer for multi-class probability distribution.",
    icon: Brain,
  },
];

const resultsMetrics = [
  { value: "90.16%", label: "Overall Accuracy", icon: BarChart3 },
  { value: "0.89", label: "F1 Score (Weighted)", icon: LineChart },
  { value: "200,000+", label: "Training Samples", icon: Database },
  { value: "5 Epochs", label: "Training Duration", icon: Cpu },
];

const galleryImages = [
  { src: "/projects/sleep-stage-prediction-lstm/preview.svg", caption: "Model Architecture — LSTM Sleep Stage Classifier" },
];

export default function SleepStageCaseStudy() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <CaseStudyHero
        category="Machine Learning &bull; Deep Learning"
        title="Sleep Stage Prediction"
        subtitle="Healthcare AI with LSTM Neural Networks"
        description="A deep learning system that uses an LSTM neural network to classify sleep stages from physiological time-series data, achieving 90.16% accuracy across five sleep stages."
        heroImage="/projects/sleep-stage-prediction-lstm/preview.svg"
        heroImageAlt="Sleep Stage Prediction LSTM model architecture"
        metrics={metrics}
        backHref="/#projects"
      />

      <CaseStudySection id="overview">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ staggerChildren: 0.1 }}
          className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start"
        >
          <motion.div variants={fadeUp} transition={{ duration: 0.5 }}>
            <SectionHeading
              eyebrow="Overview"
              title="Classifying sleep stages from physiological data"
              description=""
            />
            <p className="mt-5 text-base leading-8 text-muted-foreground">
              Sleep stage analysis plays a critical role in diagnosing sleep disorders, assessing cognitive health, and understanding overall well-being. This project applies an LSTM (Long Short-Term Memory) neural network to classify sleep stages from time-dependent physiological signal data.
            </p>
            <p className="mt-4 text-base leading-8 text-muted-foreground">
              Unlike traditional classification approaches that treat each observation independently, the LSTM architecture captures temporal dependencies across sequential readings — making it particularly well-suited for sleep stage transitions where context from previous moments informs the current state.
            </p>
            <p className="mt-4 text-base leading-8 text-muted-foreground">
              The model achieves <strong className="text-foreground">90.16% accuracy</strong> across five sleep stages (Wake, N1, N2, N3, REM), demonstrating reliable performance on healthcare time-series data.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} transition={{ duration: 0.5, delay: 0.1 }} className="rounded-2xl border border-white/10 bg-white/[0.045] p-6 backdrop-blur-xl">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Key Details</h3>
            <dl className="mt-5 space-y-4">
              {[
                { term: "Category", desc: "Machine Learning / Deep Learning" },
                { term: "Role", desc: "Machine Learning Developer" },
                { term: "Architecture", desc: "LSTM Neural Network" },
                { term: "Classes", desc: "Wake, N1, N2, N3, REM" },
                { term: "Status", desc: "Production Ready" },
              ].map(({ term, desc }) => (
                <div key={term} className="flex items-baseline justify-between gap-4">
                  <dt className="text-sm text-muted-foreground">{term}</dt>
                  <dd className="text-sm font-medium text-foreground">{desc}</dd>
                </div>
              ))}
            </dl>
          </motion.div>
        </motion.div>
      </CaseStudySection>

      <CaseStudySection>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ staggerChildren: 0.08 }}
        >
          <motion.div variants={fadeUp} transition={{ duration: 0.5 }}>
            <SectionHeading
              eyebrow="Architecture"
              title="LSTM neural network design"
              description=""
            />
          </motion.div>

          <motion.div variants={fadeUp} transition={{ duration: 0.5, delay: 0.1 }} className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {architectureHighlights.map(({ title, description, icon: Icon }) => (
              <div key={title} className="rounded-2xl border border-white/10 bg-white/[0.045] p-6 backdrop-blur-xl transition-colors hover:border-primary/25">
                <span className="inline-flex size-12 items-center justify-center rounded-xl border border-primary/20 bg-primary/[0.08] text-primary">
                  <Icon aria-hidden="true" className="size-5" />
                </span>
                <h3 className="mt-5 text-lg font-bold text-foreground">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{description}</p>
              </div>
            ))}
          </motion.div>

          <motion.div variants={fadeUp} transition={{ duration: 0.5, delay: 0.15 }} className="mt-10 overflow-hidden rounded-2xl border border-white/10 bg-card">
            <div className="relative aspect-[16/9] overflow-hidden">
              <Image
                src="/projects/sleep-stage-prediction-lstm/preview.svg"
                alt="LSTM model architecture diagram showing input sequence, LSTM layers, dropout, and dense output layers"
                fill
                className="object-contain p-4"
                unoptimized
              />
            </div>
            <div className="border-t border-white/5 px-6 py-4">
              <p className="text-sm text-muted-foreground">
                Model architecture: Input sequence &rarr; LSTM layers with dropout &rarr; Dense layers &rarr; Softmax output (5 sleep stages)
              </p>
            </div>
          </motion.div>
        </motion.div>
      </CaseStudySection>

      <CaseStudySection>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ staggerChildren: 0.08 }}
        >
          <motion.div variants={fadeUp} transition={{ duration: 0.5 }}>
            <SectionHeading
              eyebrow="Technology Stack"
              title="Tools &amp; frameworks used"
              description=""
            />
          </motion.div>
          <CaseStudyTechStack items={techStack} />
        </motion.div>
      </CaseStudySection>

      <CaseStudySection>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ staggerChildren: 0.1 }}
          className="rounded-3xl border border-primary/20 bg-primary/[0.06] p-8 backdrop-blur-xl sm:p-10 lg:p-12"
        >
          <motion.div variants={fadeUp} transition={{ duration: 0.5 }}>
            <span className="inline-flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <BarChart3 aria-hidden="true" className="size-5" />
            </span>
          </motion.div>
          <motion.h2 variants={fadeUp} transition={{ duration: 0.5, delay: 0.05 }} className="mt-5 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Results &amp; Performance
          </motion.h2>
          <motion.p variants={fadeUp} transition={{ duration: 0.5, delay: 0.1 }} className="mt-4 max-w-3xl text-base leading-8 text-muted-foreground">
            The LSTM model achieved <strong className="text-foreground">90.16% accuracy</strong> with a weighted F1 score of <strong className="text-foreground">0.89</strong>, demonstrating strong performance across all five sleep stages. The model processed over <strong className="text-foreground">200,000 training samples</strong> across 5 training epochs, effectively learning temporal sleep stage transition patterns.
          </motion.p>

          <motion.div variants={fadeUp} transition={{ duration: 0.5, delay: 0.15 }} className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {resultsMetrics.map(({ value, label }) => (
              <div key={label} className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-3 text-center backdrop-blur transition-colors hover:border-primary/25">
                <p className="text-lg font-bold text-foreground">{value}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </CaseStudySection>

      <CaseStudySection>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ staggerChildren: 0.08 }}
        >
          <motion.div variants={fadeUp} transition={{ duration: 0.5 }}>
            <SectionHeading
              eyebrow="Screenshots"
              title="Model walkthrough"
              description=""
            />
          </motion.div>
          <CaseStudyGallery images={galleryImages} />
        </motion.div>
      </CaseStudySection>

      <CaseStudyCTA
        nextProjectHref="/projects/weather-detection-ai"
        nextProjectLabel="Next: Weather Detection AI"
      />
    </div>
  );
}
