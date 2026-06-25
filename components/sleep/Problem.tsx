"use client";

import { motion } from "framer-motion";
import {
  Building,
  Bed,
  DollarSign,
  Watch,
  Activity,
  Cpu,
  Brain,
} from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const steps = [
  {
    icon: Building,
    label: "Hospital",
    sub: "Sleep Clinic",
    description: "Traditional sleep studies require dedicated clinical facilities",
  },
  {
    icon: Bed,
    label: "Polysomnography",
    sub: "PSG",
    description: "Over 20 wired sensors attached to the patient's body",
  },
  {
    icon: DollarSign,
    label: "Expensive",
    sub: "$1,500–$3,000/night",
    description: "Cost prohibitive for widespread adoption",
  },
  {
    icon: Watch,
    label: "Wearable Devices",
    sub: "Consumer Sensors",
    description: "Smartwatches with PPG, EDA, and accelerometer sensors",
  },
  {
    icon: Activity,
    label: "Physiological Signals",
    sub: "HR, EDA, Temp, ACC",
    description: "Non-invasive, continuous monitoring at home",
  },
  {
    icon: Cpu,
    label: "Artificial Intelligence",
    sub: "Deep Learning",
    description: "LSTM captures temporal dependencies in time-series data",
  },
  {
    icon: Brain,
    label: "Sleep Prediction",
    sub: "6 Stages",
    description: "Accurate classification without clinical supervision",
    highlight: true,
  },
];

function StepNode({
  step,
  index,
  isLast,
}: {
  step: (typeof steps)[0];
  index: number;
  isLast: boolean;
}) {
  return (
    <div className="flex items-start gap-6">
      <div className="flex flex-col items-center">
        <motion.div
          className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
            step.highlight
              ? "bg-[#7C5CFF] shadow-lg shadow-[#7C5CFF]/25"
              : "bg-[#1A1A1A] border border-[#2A2A2A]"
          }`}
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.15, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <step.icon
            className={`w-6 h-6 ${step.highlight ? "text-white" : "text-[#7C5CFF]"}`}
          />
        </motion.div>
        {!isLast && (
          <motion.div
            className="w-px h-12 bg-gradient-to-b from-[#7C5CFF]/30 to-[#22D3EE]/10 my-2"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15 + 0.3, duration: 0.5 }}
            style={{ transformOrigin: "top" }}
          />
        )}
      </div>
      <motion.div
        className="flex-1 pb-8"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.15 + 0.1, duration: 0.5 }}
      >
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs text-[#555] font-mono">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="text-xs text-[#555]">·</span>
          <span className="text-xs text-[#555]">{step.sub}</span>
        </div>
        <h3
          className={`text-lg font-semibold mb-1 ${
            step.highlight ? "text-gradient" : "text-white"
          }`}
        >
          {step.label}
        </h3>
        <p className="text-sm text-[#666] max-w-md">{step.description}</p>
      </motion.div>
    </div>
  );
}

export default function Problem() {
  return (
    <section id="problem" className="section-padding relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#22D3EE]/[0.02] to-transparent pointer-events-none" />
      <div className="section-container">
        <ScrollReveal>
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            <div className="lg:w-1/2 lg:sticky lg:top-32">
              <motion.div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FF4B6A]/10 border border-[#FF4B6A]/20 mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <span className="text-xs text-[#FF4B6A] font-medium tracking-wider uppercase">
                  Challenge
                </span>
              </motion.div>
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
                The Problem
              </h2>
              <p className="text-[#888] text-lg leading-relaxed mb-6">
                Sleep disorders affect over 50 million people worldwide, yet
                traditional sleep monitoring remains inaccessible due to high
                costs and clinical requirements.
              </p>
              <p className="text-[#666] leading-relaxed">
                Polysomnography (PSG) requires overnight stays in sleep labs
                with over 20 wired sensors. This creates a critical gap between
                clinical-grade sleep analysis and accessible at-home monitoring
                through wearable devices.
              </p>
              <div className="mt-8 p-5 rounded-2xl bg-[#1A1A1A] border border-[#2A2A2A]">
                <div className="flex items-center gap-3 mb-2">
                  <Brain className="w-5 h-5 text-[#7C5CFF]" />
                  <span className="text-sm font-medium text-white">
                    Key Question
                  </span>
                </div>
                <p className="text-sm text-[#888] italic">
                  Can we accurately classify sleep stages using only non-invasive
                  wearable sensor data and deep learning?
                </p>
              </div>
            </div>
            <div className="lg:w-1/2">
              {steps.map((step, i) => (
                <StepNode
                  key={step.label}
                  step={step}
                  index={i}
                  isLast={i === steps.length - 1}
                />
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
