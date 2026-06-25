"use client";

import { useRef } from "react";
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
}

const pipelineSteps: Step[] = [
  { icon: Watch, label: "Wearable Signals", sub: "PPG, EDA, ACC, Temp", color: "#22D3EE" },
  { icon: Filter, label: "Cleaning", sub: "Artifact removal, filtering", color: "#818CF8" },
  { icon: Gauge, label: "Normalization", sub: "Z-score standardization", color: "#34D399" },
  { icon: Box, label: "Feature Extraction", sub: "Statistical & spectral", color: "#F97316" },
  { icon: Split, label: "Sequence Generator", sub: "Sliding window", color: "#F472B6" },
  { icon: Cpu, label: "LSTM Network", sub: "64 units, 3 layers", color: "#7C5CFF" },
  { icon: Brain, label: "Sleep Prediction", sub: "6 sleep stage classes", color: "#22D3EE", highlight: true },
];

function PipelineNode({ step, index, isLast }: { step: Step; index: number; isLast: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div ref={ref} className="flex flex-col items-center w-full">
      <motion.div
        className={`w-full rounded-2xl p-5 flex items-center gap-4 border relative overflow-hidden transition-all duration-500 ${
          step.highlight
            ? "bg-[#7C5CFF]/10 border-[#7C5CFF]/30 shadow-lg shadow-[#7C5CFF]/10"
            : "bg-[#1A1A1A] border-[#2A2A2A] hover:border-[#7C5CFF]/20"
        }`}
        initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30, scale: 0.95 }}
        animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
        transition={{ delay: index * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
          style={{ backgroundColor: `${step.color}15` }}
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
      </motion.div>

      {!isLast && (
        <motion.div
          className="flex flex-col items-center py-3"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: index * 0.12 + 0.3, duration: 0.4 }}
        >
          <div className="w-0.5 h-10 bg-gradient-to-b from-[#7C5CFF]/40 to-[#22D3EE]/20" />
          <ArrowDown className="w-3.5 h-3.5 text-[#444]" />
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
