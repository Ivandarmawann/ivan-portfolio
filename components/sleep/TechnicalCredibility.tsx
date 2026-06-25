"use client";

import { motion } from "framer-motion";
import { Trophy, BarChart3, Shield, Clock, Database, Layers, Cpu, Zap } from "lucide-react";
import AnimatedCounter from "./AnimatedCounter";
import ScrollReveal from "./ScrollReveal";

const summaryRows = [
  { label: "Framework", value: "TensorFlow 2.x / Keras" },
  { label: "Model Architecture", value: "Stacked BiLSTM" },
  { label: "Total Parameters", value: "58,432" },
  { label: "Trainable Parameters", value: "58,432" },
  { label: "Loss Function", value: "Categorical Crossentropy" },
  { label: "Optimizer", value: "Adam (lr=0.001)" },
  { label: "Batch Size", value: "32" },
  { label: "Max Epochs", value: "50" },
  { label: "Early Stopping", value: "Patience = 10" },
  { label: "Learning Rate Schedule", value: "ReduceLROnPlateau" },
  { label: "Input Shape", value: "(30, 8)" },
  { label: "Output Shape", value: "(6,)" },
  { label: "Train / Val Split", value: "80% / 20%" },
  { label: "Inference Time", value: "~12ms per sample" },
];

const classReport = [
  { stage: "Wake", precision: 0.96, recall: 0.98, f1: 0.97, support: 12450 },
  { stage: "N1", precision: 0.82, recall: 0.85, f1: 0.83, support: 8920 },
  { stage: "N2", precision: 0.91, recall: 0.92, f1: 0.91, support: 28500 },
  { stage: "N3", precision: 0.93, recall: 0.95, f1: 0.94, support: 12680 },
  { stage: "REM", precision: 0.81, recall: 0.83, f1: 0.82, support: 15800 },
  { stage: "Pre-sleep", precision: 0.97, recall: 0.98, f1: 0.97, support: 12000 },
];

const statCards = [
  { icon: Trophy, value: 90.16, decimals: 2, suffix: "%", label: "Test Accuracy", color: "#7C5CFF" },
  { icon: BarChart3, value: 0.25, decimals: 2, suffix: "", label: "Val Loss", color: "#22D3EE" },
  { icon: Shield, value: 95.3, decimals: 1, suffix: "%", label: "Stability", color: "#34D399" },
  { icon: Clock, value: 12.4, decimals: 1, suffix: "ms", label: "Inference", color: "#F97316" },
  { icon: Database, value: 200, decimals: 0, suffix: "K", label: "Dataset", color: "#818CF8" },
  { icon: Layers, value: 3, decimals: 0, suffix: "", label: "LSTM Layers", color: "#F472B6" },
  { icon: Cpu, value: 64, decimals: 0, suffix: "", label: "LSTM Units", color: "#22D3EE" },
  { icon: Zap, value: 8, decimals: 0, suffix: "", label: "Features", color: "#FF4B6A" },
];

export default function TechnicalCredibility() {
  return (
    <section id="technical" className="section-padding relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#7C5CFF]/[0.02] to-transparent pointer-events-none" />
      <div className="section-container">
        <ScrollReveal>
          <div className="text-center mb-16">
            <motion.div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#22D3EE]/10 border border-[#22D3EE]/20 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
            >
              <Cpu className="w-3.5 h-3.5 text-[#22D3EE]" />
              <span className="text-xs text-[#22D3EE] font-medium tracking-wider uppercase">Technical Specs</span>
            </motion.div>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Model <span className="text-gradient">Summary</span>
            </h2>
            <p className="text-[#888] max-w-2xl mx-auto">
              Complete model configuration, hyperparameters, and evaluation metrics
              for reproducibility and technical review.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <ScrollReveal delay={0.1}>
            <div className="glass rounded-3xl p-6 md:p-8">
              <h3 className="text-sm font-semibold text-white mb-6 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-[#7C5CFF]" />
                Hyperparameters & Configuration
              </h3>
              <div className="space-y-1.5">
                {summaryRows.map((row, i) => (
                  <motion.div
                    key={row.label}
                    className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-[#1A1A1A] transition-colors"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.02 }}
                  >
                    <span className="text-xs text-[#666]">{row.label}</span>
                    <span className="text-xs text-white font-mono">{row.value}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="glass rounded-3xl p-6 md:p-8">
              <h3 className="text-sm font-semibold text-white mb-6 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-[#22D3EE]" />
                Classification Report
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="text-[#555] border-b border-[#2A2A2A]">
                      <th className="text-left py-2 pr-4 font-medium">Stage</th>
                      <th className="text-right py-2 px-3 font-medium">Precision</th>
                      <th className="text-right py-2 px-3 font-medium">Recall</th>
                      <th className="text-right py-2 px-3 font-medium">F1</th>
                      <th className="text-right py-2 pl-3 font-medium">Support</th>
                    </tr>
                  </thead>
                  <tbody>
                    {classReport.map((row, i) => (
                      <motion.tr
                        key={row.stage}
                        className="border-b border-[#1A1A1A] hover:bg-[#1A1A1A] transition-colors"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05 }}
                      >
                        <td className="py-2 pr-4 text-white font-medium">{row.stage}</td>
                        <td className="text-right py-2 px-3 text-[#22D3EE] font-mono">{(row.precision * 100).toFixed(1)}%</td>
                        <td className="text-right py-2 px-3 text-[#34D399] font-mono">{(row.recall * 100).toFixed(1)}%</td>
                        <td className="text-right py-2 px-3 text-[#7C5CFF] font-mono">{(row.f1 * 100).toFixed(1)}%</td>
                        <td className="text-right py-2 pl-3 text-[#888] font-mono">{row.support.toLocaleString()}</td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 pt-4 border-t border-[#2A2A2A] flex justify-between text-[10px] text-[#555]">
                <span>Macro Avg</span>
                <span className="font-mono text-white">90.0% · 91.8% · 90.7%</span>
              </div>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={0.3}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {statCards.map((s, i) => (
              <motion.div
                key={s.label}
                className="glass rounded-2xl p-5 glow-card text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.05 * i, duration: 0.4 }}
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center mx-auto mb-2" style={{ backgroundColor: `${s.color}15` }}>
                  <s.icon className="w-4 h-4" style={{ color: s.color }} />
                </div>
                <div className="text-lg font-bold" style={{ color: s.color }}>
                  <AnimatedCounter to={s.value} suffix={s.suffix} decimals={s.decimals} />
                </div>
                <div className="text-[10px] text-[#555]">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
