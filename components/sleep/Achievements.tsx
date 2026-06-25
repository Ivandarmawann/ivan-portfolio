"use client";

import { motion } from "framer-motion";
import { BarChart3, Waves, Hash, Layers, Brain, Heart } from "lucide-react";
import AnimatedCounter from "./AnimatedCounter";
import ScrollReveal from "./ScrollReveal";

const achievements = [
  {
    value: 90.16,
    decimals: 2,
    suffix: "%",
    label: "Accuracy",
    sub: "Test performance",
    icon: BarChart3,
    color: "#7C5CFF",
  },
  {
    value: 200,
    decimals: 0,
    suffix: "K+",
    label: "Samples",
    sub: "Time-series data",
    icon: Waves,
    color: "#22D3EE",
  },
  {
    value: 6,
    decimals: 0,
    suffix: "",
    label: "Sleep Stages",
    sub: "Multi-class classification",
    icon: Hash,
    color: "#34D399",
  },
  {
    value: 50,
    decimals: 0,
    suffix: "",
    label: "Epochs",
    sub: "Training iterations",
    icon: Layers,
    color: "#F97316",
  },
  {
    value: 1,
    decimals: 0,
    suffix: "",
    label: "LSTM",
    sub: "Architecture",
    icon: Brain,
    color: "#F472B6",
  },
  {
    value: 1,
    decimals: 0,
    suffix: "",
    label: "Healthcare",
    sub: "Application",
    icon: Heart,
    color: "#FF4B6A",
  },
];

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const childVariant = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export default function Achievements() {
  return (
    <section className="section-padding relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#22D3EE]/[0.02] to-transparent pointer-events-none" />
      <div className="section-container">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="text-[11px] text-[#555] font-mono tracking-[0.2em] uppercase mb-2 block">Milestones</span>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Key <span className="text-gradient">Achievements</span>
            </h2>
            <p className="text-[#888] max-w-2xl mx-auto">
              Milestones that define the impact and capability of this project.
            </p>
          </div>
        </ScrollReveal>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {achievements.map((a) => (
            <motion.div
              key={a.label}
              variants={childVariant}
              className="glass rounded-2xl p-6 glow-card text-center"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: `${a.color}15` }}
              >
                <a.icon className="w-5 h-5" style={{ color: a.color }} />
              </div>
              <div className="text-2xl sm:text-3xl font-bold mb-1" style={{ color: a.color }}>
                <AnimatedCounter to={a.value} suffix={a.suffix} decimals={a.decimals} />
              </div>
              <div className="text-sm font-medium text-white">{a.label}</div>
              <div className="text-xs text-[#555]">{a.sub}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
