"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  Watch, Filter, Gauge, Box, Split, Cpu, Brain, ArrowDown,
} from "lucide-react";
import ScrollReveal from "./ScrollReveal";

interface Step {
  icon: typeof Watch;
  label: string;
  sub: string;
  color: string;
  highlight?: boolean;
  details: string;
}

const pipelineSteps: Step[] = [
  { icon: Watch, label: "Wearable Signals", sub: "PPG, EDA, ACC, Temp", color: "#22D3EE", details: "Raw multi-sensor data captured at 256 Hz from consumer wearable devices." },
  { icon: Filter, label: "Cleaning", sub: "Artifact removal, filtering", color: "#818CF8", details: "Removal of motion artifacts, power-line interference, and high-frequency noise." },
  { icon: Gauge, label: "Normalization", sub: "Z-score standardization", color: "#34D399", details: "Standardizing each feature to zero mean and unit variance across the dataset." },
  { icon: Box, label: "Feature Extraction", sub: "Statistical & spectral", color: "#F97316", details: "Time-domain (mean, variance) and frequency-domain (PSD, band power) features." },
  { icon: Split, label: "Sequence Generator", sub: "Sliding window", color: "#F472B6", details: "Overlapping 30-second windows with 50% overlap, creating 30-epoch input sequences." },
  { icon: Cpu, label: "LSTM Network", sub: "64 units, 3 layers", color: "#7C5CFF", details: "Stacked bidirectional LSTM layers with dropout for temporal dependency modeling." },
  { icon: Brain, label: "Sleep Prediction", sub: "6 sleep stage classes", color: "#22D3EE", highlight: true, details: "Softmax output layer classifying into Wake, N1, N2, N3, REM, and Pre-sleep." },
];

function DataParticle({ delay, color }: { delay: number; color: string }) {
  return (
    <motion.div
      className="absolute w-1.5 h-1.5 rounded-full"
      style={{ backgroundColor: color, boxShadow: `0 0 6px ${color}` }}
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 20, opacity: [0, 1, 0] }}
      transition={{ duration: 1.5, repeat: Infinity, delay, ease: "easeInOut" }}
    />
  );
}

function PipelineNode({ step, index, isLast }: { step: Step; index: number; isLast: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [hovered, setHovered] = useState(false);

  return (
    <div ref={ref} className="flex flex-col items-center w-full">
      <motion.div
        className={`w-full rounded-2xl p-5 flex items-center gap-4 border relative overflow-hidden transition-all duration-500 cursor-default ${
          step.highlight
            ? "bg-[#7C5CFF]/10 border-[#7C5CFF]/30 shadow-lg shadow-[#7C5CFF]/10"
            : "bg-[#1A1A1A] border-[#2A2A2A] hover:border-[#7C5CFF]/20"
        }`}
        initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30, scale: 0.95 }}
        animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
        transition={{ delay: index * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300"
          style={{
            backgroundColor: `${step.color}15`,
            boxShadow: hovered ? `0 0 24px ${step.color}30` : "none",
          }}
        >
          <step.icon className="w-5 h-5" style={{ color: step.color }} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className={`text-xs font-mono ${step.highlight ? "text-[#22D3EE]" : "text-[#555]"}`}>
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className={`font-semibold ${step.highlight ? "text-gradient" : "text-white"}`}>
              {step.label}
            </span>
          </div>
          <div className="text-xs text-[#666] mt-0.5">{step.sub}</div>
        </div>

        <div className="relative">
          <motion.div
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ backgroundColor: `${step.color}10` }}
            animate={isInView ? { scale: [1, 1.15, 1] } : {}}
            transition={{ delay: index * 0.12 + 0.4, duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
          >
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: step.color }} />
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[2px]"
          style={{
            background: `linear-gradient(90deg, ${step.color}, ${step.color}88, transparent)`,
            transformOrigin: "left",
          }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ delay: index * 0.12 + 0.6, duration: 0.8 }}
        />

        {hovered && (
          <motion.div
            className="absolute -top-1 left-1/2 -translate-x-1/2 -translate-y-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-3 shadow-xl z-20 w-56"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.2 }}
          >
            <div className="text-xs text-[#888] leading-relaxed">{step.details}</div>
          </motion.div>
        )}
      </motion.div>

      {!isLast && (
        <motion.div
          className="flex flex-col items-center py-3 relative"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: index * 0.12 + 0.3, duration: 0.4 }}
        >
          <motion.div
            className="w-0.5 h-10"
            style={{
              background: `linear-gradient(to bottom, ${step.color}40, ${pipelineSteps[index + 1].color}20)`,
              transformOrigin: "top",
            }}
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ delay: index * 0.12 + 0.4, duration: 0.5 }}
          />
          <motion.div
            animate={isInView ? { y: [0, 4, 0], opacity: [0.2, 0.6, 0.2] } : { opacity: 0 }}
            transition={{ duration: 2, repeat: Infinity, delay: index * 0.12 + 0.5 }}
            className="relative"
          >
            <ArrowDown className="w-3.5 h-3.5 text-[#555]" />

            <DataParticle delay={0} color={step.color} />
            <DataParticle delay={0.3} color={step.color} />
            <DataParticle delay={0.6} color={step.color} />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

export default function Pipeline() {
  return (
    <section id="pipeline" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#7C5CFF]/[0.02] to-transparent pointer-events-none" />
      <div className="section-container">
        <ScrollReveal>
          <div className="text-center mb-16">
            <motion.div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#7C5CFF]/10 border border-[#7C5CFF]/20 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-xs text-[#7C5CFF] font-medium tracking-wider uppercase">Data Pipeline</span>
            </motion.div>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Processing <span className="text-gradient">Pipeline</span>
            </h2>
            <p className="text-[#888] max-w-2xl mx-auto">
              From raw sensor data to sleep stage classification — each stage of the
              pipeline is designed for robust physiological signal processing.
            </p>
          </div>
        </ScrollReveal>
        <div className="flex flex-col items-center max-w-2xl mx-auto">
          {pipelineSteps.map((step, i) => (
            <PipelineNode key={step.label} step={step} index={i} isLast={i === pipelineSteps.length - 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
