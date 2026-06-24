"use client";

import {
  ArrowLeft,
  CheckCircle2,
  ChevronRight,
  Cloud,
  Code2,
  Cpu,
  ExternalLink,
  Eye,
  Lock,
  Target,
} from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const metrics = [
  { value: "94.7%", label: "Accuracy", icon: Target },
  { value: "83.3%", label: "Recall", icon: Eye },
  { value: "3", label: "Weather Classes", icon: Cloud },
  { value: "YOLOv12", label: "Model Architecture", icon: Cpu },
];

const techStack = [
  "Python",
  "YOLOv12",
  "Streamlit",
  "Roboflow",
  "Google Colab",
  "OpenCV",
];

const workflowSteps = [
  {
    step: 1,
    title: "Upload Image",
    description:
      "Users upload weather images through a Streamlit web interface. The app accepts common image formats and displays the uploaded file for preview before analysis.",
    image: "/projects/weather-detection/upload.png",
  },
  {
    step: 2,
    title: "Model Analysis",
    description:
      "YOLOv12 processes image features and predicts weather classes. The model evaluates visual patterns and outputs confidence scores for each category.",
    image: "/projects/weather-detection/analysis.png",
  },
];

const resultClasses = [
  { image: "/projects/weather-detection/cerah.png", title: "Sunny Detection" },
  { image: "/projects/weather-detection/mendung.png", title: "Cloudy Detection" },
  { image: "/projects/weather-detection/hujan.png", title: "Rainy Detection" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function WeatherDetectionCaseStudy() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Hero />
      <Overview />
      <TechStackSection />
      <WorkflowSection />
      <ResultsSection />
      <CTASection />
    </div>
  );
}

function SectionWrapper({
  id,
  children,
  className,
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-28 py-16 sm:py-20 lg:py-24",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-6xl px-6 sm:px-8 lg:px-10">
        {children}
      </div>
    </section>
  );
}

function Hero() {
  return (
    <div className="relative isolate flex min-h-[70vh] items-center overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          animate={{ x: [0, 20, -10, 0], y: [0, -15, 8, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-[-16rem] top-10 size-[34rem] rounded-full bg-glow-cyan/15 blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -18, 14, 0], y: [0, 18, -8, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-14rem] right-[-12rem] size-[38rem] rounded-full bg-glow-violet/15 blur-3xl"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(circle_at_center,black,transparent_65%)]" />
      </div>

      <SectionWrapper className="w-full py-0">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.15fr]">
          <motion.div
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.08 }}
          >
            <motion.div variants={fadeUp} transition={{ duration: 0.5 }}>
              <Link
                href="/#projects"
                className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                <ArrowLeft aria-hidden="true" className="size-4" />
                Back to Projects
              </Link>
            </motion.div>

            <motion.div variants={fadeUp} transition={{ duration: 0.55 }}>
              <span className="inline-flex rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-primary backdrop-blur">
                Machine Learning &bull; Computer Vision
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              transition={{ duration: 0.6 }}
              className="mt-6 max-w-4xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
            >
              Weather Detection AI
              <span className="mt-2 block text-lg font-semibold tracking-normal text-muted-foreground sm:text-xl lg:text-2xl">
                Real-Time Weather Classification with YOLOv12
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.6 }}
              className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl sm:leading-9"
            >
              A computer vision system that classifies weather conditions from
              images in real time, built with YOLOv12 object detection and
              deployed via an interactive Streamlit interface.
            </motion.p>

            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4"
            >
              {metrics.map(({ value, label }) => (
                <div
                  key={label}
                  className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-3 text-center backdrop-blur transition-colors hover:border-primary/25"
                >
                  <p className="text-lg font-bold text-foreground">{value}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{label}</p>
                </div>
              ))}
            </motion.div>

            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.55 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <Button
                asChild
                size="lg"
                className="h-11 rounded-full px-6 text-sm"
              >
                <a href="#overview">
                  Explore Case Study
                  <ChevronRight aria-hidden="true" className="ml-1 size-4" />
                </a>
              </Button>
              <Button
                variant="outline"
                size="lg"
                disabled
                title="Repository is not publicly available yet"
                className="group relative h-11 cursor-not-allowed rounded-full border-white/10 bg-white/[0.04] px-6 text-sm text-muted-foreground/60 opacity-60"
              >
                <Lock aria-hidden="true" className="mr-1 size-4" />
                Source Code (Private)
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
            className="relative mx-auto w-full max-w-xl"
          >
            <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-card shadow-2xl shadow-black/30">
              <Image
                src="/projects/weather-detection/hero.png"
                alt="Weather Detection AI interface showcase"
                fill
                className="object-cover transition-all duration-500 group-hover:scale-[1.03]"
                sizes="(max-width: 640px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />
            </div>
          </motion.div>
        </div>
      </SectionWrapper>
    </div>
  );
}

function Overview() {
  return (
    <SectionWrapper id="overview">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        transition={{ staggerChildren: 0.1 }}
        className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start"
      >
        <motion.div variants={fadeUp} transition={{ duration: 0.5 }}>
          <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
            Overview
          </h2>
          <p className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Classifying weather from images
          </p>
          <p className="mt-5 text-base leading-8 text-muted-foreground">
            This project applies the YOLOv12 object detection architecture to
            classify weather conditions from visual imagery. The model
            distinguishes between three weather classes &mdash;{" "}
            <span className="font-medium text-foreground">Cerah</span> (clear),
            <span className="font-medium text-foreground"> Mendung</span>{" "}
            (cloudy), and{" "}
            <span className="font-medium text-foreground">Hujan</span> (rainy)
            &mdash; enabling automated weather observation from照片.
          </p>
          <p className="mt-4 text-base leading-8 text-muted-foreground">
            The system was built end-to-end: from dataset curation and
            annotation in Roboflow, through model training in Google Colab, to
            deployment as an interactive Streamlit web application.
          </p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-2xl border border-white/10 bg-white/[0.045] p-6 backdrop-blur-xl"
        >
          <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Key Details
          </h3>
          <dl className="mt-5 space-y-4">
            {[
              { term: "Category", desc: "Machine Learning / Computer Vision" },
              { term: "Role", desc: "Machine Learning Developer" },
              { term: "Classes", desc: "Cerah, Mendung, Hujan" },
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
    </SectionWrapper>
  );
}

function TechStackSection() {
  return (
    <SectionWrapper>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        transition={{ staggerChildren: 0.06 }}
      >
        <motion.div variants={fadeUp} transition={{ duration: 0.5 }}>
          <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
            Technology Stack
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Tools &amp; frameworks used
          </p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-8 flex flex-wrap gap-3"
        >
          {techStack.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-white/10 bg-white/[0.04] px-5 py-2.5 text-sm font-medium text-foreground backdrop-blur transition-colors hover:border-primary/30"
            >
              {tech}
            </span>
          ))}
        </motion.div>
      </motion.div>
    </SectionWrapper>
  );
}

function WorkflowSection() {
  return (
    <SectionWrapper>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        transition={{ staggerChildren: 0.08 }}
      >
        <motion.div variants={fadeUp} transition={{ duration: 0.5 }}>
          <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
            Workflow
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            From image upload to prediction
          </p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-8 grid gap-6 sm:grid-cols-2"
        >
          {workflowSteps.map(({ step, title, description, image }) => (
            <div
              key={step}
              className="group overflow-hidden rounded-xl border border-white/10 bg-card transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-sm hover:shadow-primary/5"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={image}
                  alt={title}
                  fill
                  className="object-cover transition-all duration-500 group-hover:scale-[1.05]"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
              </div>
              <div className="border-t border-white/5 p-5">
                <div className="flex items-center gap-3">
                  <span className="inline-flex size-8 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                    {step}
                  </span>
                  <h3 className="text-lg font-bold text-foreground">{title}</h3>
                </div>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </motion.div>

        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-10"
        >
          <h3 className="text-lg font-bold tracking-tight text-foreground sm:text-xl">
            Prediction Results
          </h3>
          <p className="mt-2 text-sm leading-7 text-muted-foreground">
            The model classifies weather conditions into three categories with
            confidence scores displayed on each prediction.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {resultClasses.map(({ image, title }) => (
              <div
                key={title}
                className="group overflow-hidden rounded-xl border border-white/10 bg-card transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-sm hover:shadow-primary/5"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover transition-all duration-500 group-hover:scale-[1.06]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="border-t border-white/5 px-4 py-3">
                  <p className="text-sm font-medium text-foreground">{title}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </SectionWrapper>
  );
}

function ResultsSection() {
  return (
    <SectionWrapper>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        transition={{ staggerChildren: 0.1 }}
        className="rounded-3xl border border-primary/20 bg-primary/[0.06] p-8 backdrop-blur-xl sm:p-10 lg:p-12"
      >
        <motion.div variants={fadeUp} transition={{ duration: 0.5 }}>
          <CheckCircle2
            aria-hidden="true"
            className="size-8 text-primary"
          />
        </motion.div>
        <motion.h2
          variants={fadeUp}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="mt-5 text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
        >
          Results &amp; Performance
        </motion.h2>
        <motion.p
          variants={fadeUp}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-4 max-w-3xl text-base leading-8 text-muted-foreground"
        >
          The YOLOv12 model achieved <strong className="text-foreground">94.7% accuracy</strong> and{" "}
          <strong className="text-foreground">83.3% recall</strong> across three
          weather classes, demonstrating reliable real-time classification
          performance. The model successfully distinguishes between clear,
          cloudy, and rainy conditions from visual input, with robustness across
          varying lighting conditions and backgrounds. The Streamlit deployment
          provides an intuitive interface for uploading images and receiving
          instant predictions.
        </motion.p>
      </motion.div>
    </SectionWrapper>
  );
}

function CTASection() {
  return (
    <SectionWrapper id="cta">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        transition={{ staggerChildren: 0.1 }}
        className="rounded-3xl border border-white/10 bg-white/[0.045] p-8 text-center backdrop-blur-xl sm:p-12 lg:p-16"
      >
        <motion.h2
          variants={fadeUp}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
        >
          Explore the project
        </motion.h2>
        <motion.p
          variants={fadeUp}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="mt-4 text-base text-muted-foreground"
        >
          Try the live demo or browse the source code on GitHub.
        </motion.p>

        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Button
            asChild
            size="lg"
            className="h-12 rounded-full px-8 text-sm"
          >
            <a
              href="https://streamlit.io"
              target="_blank"
              rel="noreferrer"
            >
              Live Demo
              <ExternalLink aria-hidden="true" className="ml-2 size-4" />
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="h-12 rounded-full border-white/10 bg-white/[0.04] px-8 text-sm text-foreground hover:bg-white/[0.08]"
          >
            <a
              href="https://github.com/Ivandarmawann/weather-detection-ai"
              target="_blank"
              rel="noreferrer"
            >
              <Code2 aria-hidden="true" className="mr-2 size-4" />
              GitHub Repository
            </a>
          </Button>
        </motion.div>

        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-8"
        >
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            Back to all projects
          </Link>
        </motion.div>
      </motion.div>
    </SectionWrapper>
  );
}
