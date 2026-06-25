"use client";

import { motion } from "framer-motion";
import { BarChart3, Waves, Hash, Layers, Brain, TrendingUp } from "lucide-react";
import AnimatedCounter from "./AnimatedCounter";
import ScrollReveal from "./ScrollReveal";

const metrics = [
  {
    icon: BarChart3,
    value: 90.16,
    suffix: "%",
    decimals: 2,
    label: "Test Accuracy",
    trend: "+4.8% vs baseline",
    color: "#7C5CFF",
  },
  {
    icon: Waves,
    value: 200,
    suffix: "K+",
    decimals: 0,
    label: "Time-Series Samples",
    trend: "Multi-sensor recordings",
    color: "#22D3EE",
  },
  {
    icon: Hash,
    value: 6,
    suffix: "",
    decimals: 0,
    label: "Sleep Stages",
    trend: "Wake, N1–N3, REM, Pre",
    color: "#818CF8",
  },
  {
    icon: Layers,
    value: 50,
    suffix: "",
    decimals: 0,
    label: "Training Epochs",
    trend: "Adam optimizer",
    color: "#34D399",
  },
  {
    icon: Brain,
    value: 8,
    suffix: "",
    decimals: 0,
    label: "Physio Features",
    trend: "PPG, EDA, ACC, Temp +",
    color: "#F472B6",
  },
];

export default function Metrics() {
  return (
    <section id="metrics" className="section-padding relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#7C5CFF]/[0.02] to-transparent pointer-events-none" />
      <div className="section-container">
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="text-[11px] text-[#555] font-mono tracking-[0.2em] uppercase">Key Performance Indicators</span>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {metrics.map((metric, i) => (
            <motion.div
              key={metric.label}
              className="glass rounded-2xl p-6 relative overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="relative z-10 text-center">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3"
                  style={{ backgroundColor: `${metric.color}15` }}
                >
                  <metric.icon className="w-5 h-5" style={{ color: metric.color }} />
                </div>

                <div className="text-3xl md:text-4xl font-bold mb-0.5" style={{ color: metric.color }}>
                  <AnimatedCounter to={metric.value} suffix={metric.suffix} decimals={metric.decimals} />
                </div>

                <div className="text-xs font-medium text-white mb-2">{metric.label}</div>

                <div className="flex items-center justify-center gap-1 text-[10px] text-[#555]">
                  <TrendingUp className="w-3 h-3" style={{ color: metric.color }} />
                  <span>{metric.trend}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
