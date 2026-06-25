"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Grid3X3, Info } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const stages = ["Wake", "N1", "N2", "N3", "REM", "Pre-sleep"];

const matrix = [
  [98.2, 0.8, 0.3, 0.0, 0.5, 0.2],
  [2.1, 85.4, 7.2, 1.8, 2.5, 1.0],
  [0.5, 4.8, 92.1, 1.2, 1.0, 0.4],
  [0.0, 1.2, 3.5, 94.8, 0.5, 0.0],
  [1.8, 5.2, 6.5, 2.0, 82.5, 2.0],
  [0.3, 0.5, 0.2, 0.0, 1.0, 98.0],
];

const metricsData: Record<
  string,
  { precision: number; recall: number; f1: number; support: number }
> = {
  Wake: { precision: 0.96, recall: 0.98, f1: 0.97, support: 12450 },
  N1: { precision: 0.82, recall: 0.85, f1: 0.83, support: 8920 },
  N2: { precision: 0.91, recall: 0.92, f1: 0.91, support: 28500 },
  N3: { precision: 0.93, recall: 0.95, f1: 0.94, support: 12680 },
  REM: { precision: 0.81, recall: 0.83, f1: 0.82, support: 15800 },
  "Pre-sleep": { precision: 0.97, recall: 0.98, f1: 0.97, support: 12000 },
};

const observations = [
  { text: "Excellent performance on Wake", color: "#22D3EE", desc: "98.2% accuracy — easily distinguishable from sleep states" },
  { text: "Excellent performance on N2", color: "#34D399", desc: "92.1% — most prevalent stage provides ample training data" },
  { text: "Moderate performance on REM", color: "#F97316", desc: "82.5% — similar EEG characteristics to N1 cause confusion" },
  { text: "Class imbalance affects N1", color: "#FF4B6A", desc: "Minority class with only 8,920 samples leads to lower recall" },
];

export default function ConfusionMatrix() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <section id="confusion" className="section-padding relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#22D3EE]/[0.02] to-transparent pointer-events-none" />
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
              <Grid3X3 className="w-3.5 h-3.5 text-[#7C5CFF]" />
              <span className="text-xs text-[#7C5CFF] font-medium tracking-wider uppercase">
                Evaluation
              </span>
            </motion.div>
            <span className="text-[11px] text-[#555] font-mono tracking-[0.2em] uppercase mb-2 block">Classification Analysis</span>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Confusion <span className="text-gradient">Matrix</span>
            </h2>
            <p className="text-[#888] max-w-2xl mx-auto">
              Per-class performance analysis reveals strong diagonal dominance
              with minor confusion between adjacent sleep stages.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-5 gap-8">
          <ScrollReveal delay={0.1} className="lg:col-span-3">
            <div className="glass rounded-3xl p-6 md:p-8">
              <div className="overflow-x-auto">
                <div className="min-w-[400px]">
                  <div className="grid grid-cols-7 gap-1 mb-1">
                    <div className="text-[10px] text-[#555] font-mono text-center" />
                    {stages.map((s) => (
                      <div
                        key={s}
                        className="text-[9px] text-[#666] font-medium text-center truncate rotate-0 py-2"
                      >
                        {s}
                      </div>
                    ))}
                  </div>
                  {matrix.map((row, i) => (
                    <div key={i} className="grid grid-cols-7 gap-1 mb-1">
                      <div className="text-[10px] text-[#666] font-mono flex items-center justify-end pr-2">
                        {stages[i]}
                      </div>
                      {row.map((val, j) => {
                        const isSelected =
                          selected === null || selected === stages[i] || selected === stages[j];
                        const opacity = isSelected ? 1 : 0.3;
                        const intensity = val / 100;
                        const r = Math.round(124 - intensity * 80);
                        const g = Math.round(92 - intensity * 40);
                        const b = Math.round(255);
                        return (
                          <motion.button
                            key={`${i}-${j}`}
                            className="relative rounded-lg py-2 text-center text-[10px] font-medium transition-all duration-200 cursor-pointer"
                            style={{
                              backgroundColor: `rgb(${r}, ${g}, ${b})`,
                              opacity,
                            }}
                            whileHover={{ scale: 1.08, zIndex: 10 }}
                            onClick={() =>
                              setSelected(selected === stages[i] ? null : stages[i])
                            }
                          >
                            {val.toFixed(1)}%
                          </motion.button>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between mt-4 text-[10px] text-[#555]">
                <span>Rows: True | Columns: Predicted</span>
                <span>Click a row to highlight</span>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2} className="lg:col-span-2">
            <div className="glass rounded-3xl p-6 md:p-8">
              <div className="flex items-center gap-2 mb-6">
                <Info className="w-4 h-4 text-[#22D3EE]" />
                <h3 className="text-sm font-semibold text-white">Observations</h3>
              </div>
              <div className="space-y-4 mb-8">
                {observations.map((obs, i) => (
                  <motion.div
                    key={obs.text}
                    className="p-4 rounded-xl bg-[#1A1A1A] border border-[#2A2A2A] hover:border-[#7C5CFF]/20 transition-all duration-300"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.1 }}
                    whileHover={{ x: 4 }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: obs.color }}
                      />
                      <span className="text-sm text-white font-medium">
                        {obs.text}
                      </span>
                    </div>
                    <p className="text-xs text-[#666] ml-4">{obs.desc}</p>
                  </motion.div>
                ))}
              </div>

              {selected && metricsData[selected] && (
                <motion.div
                  className="rounded-xl bg-[#7C5CFF]/10 border border-[#7C5CFF]/20 p-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={selected}
                >
                  <div className="text-sm font-semibold text-gradient mb-3">
                    {selected} — Metrics
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {(["precision", "recall", "f1", "support"] as const).map((m) => (
                      <div key={m}>
                        <div className="text-[10px] text-[#666] uppercase tracking-wider">
                          {m === "f1" ? "F1 Score" : m.charAt(0).toUpperCase() + m.slice(1)}
                        </div>
                        <div className="text-sm font-semibold text-white">
                          {m === "support"
                            ? metricsData[selected][m].toLocaleString()
                            : (metricsData[selected][m] * 100).toFixed(0) + "%"}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
