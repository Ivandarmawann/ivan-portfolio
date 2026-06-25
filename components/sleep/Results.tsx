"use client";

import { motion } from "framer-motion";
import { Trophy, Layers, Clock, Shield, Database, BarChart3 } from "lucide-react";
import AnimatedCounter from "./AnimatedCounter";
import ScrollReveal from "./ScrollReveal";

const stats = [
  { icon: Trophy, value: 90.16, decimals: 2, suffix: "%", label: "Test Accuracy", color: "#7C5CFF", sub: "On held-out test set" },
  { icon: BarChart3, value: 0.25, decimals: 2, suffix: "", label: "Validation Loss", color: "#22D3EE", sub: "Cross-entropy loss" },
  { icon: Layers, value: 50, decimals: 0, suffix: "", label: "Epochs to Converge", color: "#34D399", sub: "Stable convergence" },
  { icon: Shield, value: 95.3, decimals: 1, suffix: "%", label: "Model Stability", color: "#818CF8", sub: "Run-to-run variance" },
  { icon: Clock, value: 12.4, decimals: 1, suffix: "s", label: "Training Time / Epoch", color: "#F97316", sub: "On NVIDIA T4 GPU" },
  { icon: Database, value: 87.5, decimals: 1, suffix: "%", label: "Dataset Coverage", color: "#F472B6", sub: "Across all 6 stages" },
];

export default function Results() {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="section-container">
        <ScrollReveal>
          <div className="text-center max-w-4xl mx-auto mb-16">
            <motion.div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#22D3EE]/10 border border-[#22D3EE]/20 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Trophy className="w-3.5 h-3.5 text-[#22D3EE]" />
              <span className="text-xs text-[#22D3EE] font-medium tracking-wider uppercase">Final Result</span>
            </motion.div>
            <span className="text-[11px] text-[#555] font-mono tracking-[0.2em] uppercase mb-2 block">Performance Benchmark</span>

            <motion.div
              className="mb-4"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="text-7xl sm:text-8xl md:text-9xl font-bold text-gradient">
                <AnimatedCounter to={90.16} decimals={2} duration={2} />
                <span className="text-4xl sm:text-5xl md:text-6xl">%</span>
              </span>
            </motion.div>

            <motion.div
              className="text-xl sm:text-2xl font-semibold text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              Test Accuracy
            </motion.div>

            <motion.p
              className="text-[#888] text-lg leading-relaxed max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              The LSTM model successfully captured long-term temporal dependencies
              from wearable physiological signals and achieved high classification
              performance across six sleep stages, demonstrating the viability of
              deep learning for at-home sleep monitoring.
            </motion.p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="glass rounded-2xl p-5 glow-card text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center mx-auto mb-3"
                style={{ backgroundColor: `${stat.color}15` }}
              >
                <stat.icon className="w-4.5 h-4.5" style={{ color: stat.color }} />
              </div>
              <div className="text-xl sm:text-2xl font-bold mb-0.5" style={{ color: stat.color }}>
                <AnimatedCounter to={stat.value} suffix={stat.suffix} decimals={stat.decimals} />
              </div>
              <div className="text-xs font-medium text-white">{stat.label}</div>
              <div className="text-[10px] text-[#555] mt-0.5">{stat.sub}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
