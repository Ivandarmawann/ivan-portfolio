"use client";

import { motion } from "framer-motion";
import {
  XAxis, YAxis, CartesianGrid, Tooltip, Area, AreaChart,
  ResponsiveContainer,
} from "recharts";
import { BarChart3, TrendingUp, TrendingDown } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const accuracyData = [
  { epoch: 0, training: 40, validation: 38 },
  { epoch: 5, training: 52, validation: 48 },
  { epoch: 10, training: 61, validation: 57 },
  { epoch: 15, training: 68, validation: 65 },
  { epoch: 20, training: 74, validation: 72 },
  { epoch: 25, training: 79, validation: 77 },
  { epoch: 30, training: 83, validation: 80 },
  { epoch: 35, training: 86, validation: 83 },
  { epoch: 40, training: 88, validation: 85 },
  { epoch: 50, training: 90, validation: 90.16 },
];

const lossData = [
  { epoch: 0, training: 1.8, validation: 1.9 },
  { epoch: 5, training: 1.3, validation: 1.4 },
  { epoch: 10, training: 1.0, validation: 1.1 },
  { epoch: 15, training: 0.78, validation: 0.85 },
  { epoch: 20, training: 0.62, validation: 0.68 },
  { epoch: 25, training: 0.50, validation: 0.55 },
  { epoch: 30, training: 0.41, validation: 0.46 },
  { epoch: 35, training: 0.34, validation: 0.38 },
  { epoch: 40, training: 0.28, validation: 0.32 },
  { epoch: 50, training: 0.20, validation: 0.25 },
];

const chartDefaults = {
  strokeWidth: 2.5,
  dot: false,
  activeDot: { r: 5, strokeWidth: 0 },
};

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: { name: string; value: number; color: string; dataKey: string }[]; label?: number }) {
  if (!active || !payload) return null;
  return (
    <div className="glass rounded-xl p-3 border border-[#2A2A2A]">
      <div className="text-xs text-[#666] mb-1">Epoch {label}</div>
      {payload.map((p) => (
        <div key={p.name} className="flex items-center gap-2 text-xs">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
          <span style={{ color: p.color }} className="font-medium">
            {p.name}: {p.name === "validation" && p.dataKey === "validation" ? `${p.value.toFixed(2)}%` : p.value.toFixed(2)}
          </span>
        </div>
      ))}
    </div>
  );
}

function AccuracyChart() {
  return (
    <div className="glass rounded-3xl p-6 md:p-8 glow-card">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-white">Training & Validation Accuracy</h3>
          <p className="text-xs text-[#666] mt-1">Over 50 epochs of training</p>
        </div>
        <TrendingUp className="w-5 h-5 text-[#22D3EE]" />
      </div>
      <div className="h-64 md:h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={accuracyData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
            <defs>
              <linearGradient id="accTrain" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#7C5CFF" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#7C5CFF" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="accVal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22D3EE" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#22D3EE" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#222" strokeWidth={0.5} />
            <XAxis dataKey="epoch" stroke="#444" tick={{ fill: "#555", fontSize: 11 }} tickLine={false} axisLine={false} />
            <YAxis domain={[30, 100]} stroke="#444" tick={{ fill: "#555", fontSize: 11 }} tickLine={false} axisLine={false} tickFormatter={(v) => `${v}%`} />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: "#333", strokeWidth: 1 }} />
            <Area type="monotone" dataKey="training" stroke="#7C5CFF" {...chartDefaults} fill="url(#accTrain)" isAnimationActive={false} />
            <Area type="monotone" dataKey="validation" stroke="#22D3EE" {...chartDefaults} fill="url(#accVal)" isAnimationActive={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="flex items-center gap-6 mt-4">
        {[
          { color: "#7C5CFF", label: "Training" },
          { color: "#22D3EE", label: "Validation" },
        ].map((l) => (
          <div key={l.label} className="flex items-center gap-2">
            <div className="w-3 h-0.5 rounded-full" style={{ backgroundColor: l.color }} />
            <span className="text-xs text-[#666]">{l.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function LossChart() {
  return (
    <div className="glass rounded-3xl p-6 md:p-8 glow-card">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-white">Training & Validation Loss</h3>
          <p className="text-xs text-[#666] mt-1">Categorical cross-entropy loss</p>
        </div>
        <TrendingDown className="w-5 h-5 text-[#34D399]" />
      </div>
      <div className="h-64 md:h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={lossData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
            <defs>
              <linearGradient id="lossTrain" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#F472B6" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#F472B6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="lossVal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#34D399" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#34D399" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#222" strokeWidth={0.5} />
            <XAxis dataKey="epoch" stroke="#444" tick={{ fill: "#555", fontSize: 11 }} tickLine={false} axisLine={false} />
            <YAxis domain={[0, 2]} stroke="#444" tick={{ fill: "#555", fontSize: 11 }} tickLine={false} axisLine={false} />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: "#333", strokeWidth: 1 }} />
            <Area type="monotone" dataKey="training" stroke="#F472B6" {...chartDefaults} fill="url(#lossTrain)" isAnimationActive={false} />
            <Area type="monotone" dataKey="validation" stroke="#34D399" {...chartDefaults} fill="url(#lossVal)" isAnimationActive={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="flex items-center gap-6 mt-4">
        {[
          { color: "#F472B6", label: "Training Loss" },
          { color: "#34D399", label: "Validation Loss" },
        ].map((l) => (
          <div key={l.label} className="flex items-center gap-2">
            <div className="w-3 h-0.5 rounded-full" style={{ backgroundColor: l.color }} />
            <span className="text-xs text-[#666]">{l.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Charts() {
  return (
    <section id="training" className="section-padding relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#7C5CFF]/[0.02] to-transparent pointer-events-none" />
      <div className="section-container">
        <ScrollReveal>
          <div className="text-center mb-16">
            <motion.div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#22D3EE]/10 border border-[#22D3EE]/20 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <BarChart3 className="w-3.5 h-3.5 text-[#22D3EE]" />
              <span className="text-xs text-[#22D3EE] font-medium tracking-wider uppercase">Performance</span>
            </motion.div>
            <span className="text-[11px] text-[#555] font-mono tracking-[0.2em] uppercase mb-2 block">Convergence Analysis</span>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Training <span className="text-gradient">Performance</span>
            </h2>
            <p className="text-[#888] max-w-2xl mx-auto">
              The model converged smoothly over 50 epochs with no signs of overfitting,
              achieving strong generalization on held-out data.
            </p>
          </div>
        </ScrollReveal>
        <div className="grid md:grid-cols-2 gap-8">
          <ScrollReveal delay={0.1}><AccuracyChart /></ScrollReveal>
          <ScrollReveal delay={0.2}><LossChart /></ScrollReveal>
        </div>
      </div>
    </section>
  );
}
