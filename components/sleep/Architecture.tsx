"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowDown, Layers, Sigma, Grid3X3, Brain, Info } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

interface LayerDef {
  id: string;
  icon: typeof Layers;
  label: string;
  sub: string;
  color: string;
  highlight?: boolean;
  nodeCount: number;
  inputShape: string;
  outputShape: string;
  activation: string;
  purpose: string;
}

const layers: LayerDef[] = [
  { id: "input", icon: Grid3X3, label: "Input Sequence", sub: "30 epochs × 8 features", color: "#22D3EE", nodeCount: 8, inputShape: "(batch, 30, 8)", outputShape: "(batch, 30, 8)", activation: "—", purpose: "Sliding window of 30 consecutive 30-second epochs, each with 8 physiological features." },
  { id: "lstm-1", icon: Layers, label: "LSTM (64)", sub: "Return sequences = True", color: "#7C5CFF", nodeCount: 6, inputShape: "(batch, 30, 8)", outputShape: "(batch, 30, 64)", activation: "tanh", purpose: "First LSTM layer captures short-term temporal patterns while maintaining the sequence for the next layer." },
  { id: "dropout-1", icon: Layers, label: "Dropout (0.5)", sub: "Regularization", color: "#F472B6", nodeCount: 4, inputShape: "(batch, 30, 64)", outputShape: "(batch, 30, 64)", activation: "—", purpose: "Randomly drops 50% of neurons during training to prevent overfitting." },
  { id: "lstm-2", icon: Layers, label: "LSTM (64)", sub: "Return sequences = False", color: "#7C5CFF", nodeCount: 6, inputShape: "(batch, 30, 64)", outputShape: "(batch, 64)", activation: "tanh", purpose: "Second LSTM layer compresses the sequence into a single feature vector." },
  { id: "dropout-2", icon: Layers, label: "Dropout (0.5)", sub: "Regularization", color: "#F472B6", nodeCount: 4, inputShape: "(batch, 64)", outputShape: "(batch, 64)", activation: "—", purpose: "Further regularization to improve generalization on unseen data." },
  { id: "dense-32", icon: Layers, label: "Dense (32)", sub: "Hidden layer", color: "#818CF8", nodeCount: 5, inputShape: "(batch, 64)", outputShape: "(batch, 32)", activation: "ReLU", purpose: "Fully connected layer learns high-level feature combinations from LSTM output." },
  { id: "dense-6", icon: Layers, label: "Dense (6)", sub: "Output layer", color: "#34D399", nodeCount: 6, inputShape: "(batch, 32)", outputShape: "(batch, 6)", activation: "Softmax", purpose: "Produces probability distribution over 6 sleep stages." },
  { id: "output", icon: Brain, label: "Sleep Stage", sub: "Wake, N1, N2, N3, REM, Pre", color: "#7C5CFF", nodeCount: 6, highlight: true, inputShape: "(batch, 6)", outputShape: "(batch, 6)", activation: "argmax", purpose: "Final classification — the class with highest probability is the predicted sleep stage." },
];

function ArchLayer({ layer, index, isLast }: { layer: LayerDef; index: number; isLast: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [hovered, setHovered] = useState(false);

  return (
    <div ref={ref} className="flex flex-col items-center">
      <motion.div
        className={`relative rounded-2xl p-5 border transition-all duration-300 cursor-default overflow-hidden ${
          layer.highlight
            ? "bg-[#7C5CFF]/10 border-[#7C5CFF]/30 shadow-lg shadow-[#7C5CFF]/10"
            : "bg-[#1A1A1A] border-[#2A2A2A] hover:border-[#7C5CFF]/20"
        }`}
        style={{ width: "clamp(14rem, 80vw, 18rem)" }}
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ delay: index * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        whileHover={{ y: -3, scale: 1.02 }}
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${layer.color}15` }}>
            <layer.icon className="w-4.5 h-4.5" style={{ color: layer.color }} />
          </div>
          <div>
            <div className={`text-sm font-semibold ${layer.highlight ? "text-gradient" : "text-white"}`}>{layer.label}</div>
            <div className="text-[10px] text-[#666]">{layer.sub}</div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-1.5 mb-3">
          {Array.from({ length: layer.nodeCount }).map((_, j) => (
            <motion.div
              key={j}
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: layer.color, opacity: 0.3 + (j / layer.nodeCount) * 0.5 }}
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ delay: index * 0.1 + j * 0.05, duration: 0.3, type: "spring", stiffness: 300 }}
            />
          ))}
        </div>

        <motion.div
          className="flex items-center justify-center gap-1 text-[10px] text-[#555]"
          animate={hovered ? { opacity: 1 } : { opacity: 0.6 }}
        >
          <Info className="w-3 h-3" />
          <span>Hover for details</span>
        </motion.div>

        <motion.div
          className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full"
          style={{ backgroundColor: layer.color }}
          animate={isInView ? { opacity: [0, 0.6, 0], scale: [0.5, 1.5, 0.5] } : {}}
          transition={{ duration: 2, repeat: Infinity, delay: index * 0.1 + 0.5 }}
        />

        {hovered && (
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 top-0 -translate-y-full -mt-2 w-64 z-20 pointer-events-none"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.15 }}
          >
            <div className="bg-[#111] border border-[#2A2A2A] rounded-xl p-4 shadow-2xl">
              <div className="text-xs font-semibold text-white mb-2" style={{ color: layer.color }}>{layer.label}</div>
              <div className="text-[11px] text-[#888] leading-relaxed mb-3">{layer.purpose}</div>
              <div className="grid grid-cols-2 gap-2 text-[10px]">
                <div><span className="text-[#555]">Input:</span> <span className="text-white font-mono">{layer.inputShape}</span></div>
                <div><span className="text-[#555]">Output:</span> <span className="text-white font-mono">{layer.outputShape}</span></div>
                <div><span className="text-[#555]">Activation:</span> <span className="text-white">{layer.activation}</span></div>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>

      {!isLast && (
        <motion.div
          className="flex flex-col items-center py-2"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: index * 0.1 + 0.3 }}
        >
          <motion.div
            className="w-0.5 h-8"
            style={{
              background: `linear-gradient(to bottom, ${layer.color}40, ${layers[index + 1].color}20)`,
              transformOrigin: "top",
            }}
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ delay: index * 0.1 + 0.4, duration: 0.4 }}
          />
          <motion.div
            animate={isInView ? { y: [0, 3, 0], opacity: [0.2, 0.6, 0.2] } : { opacity: 0 }}
            transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.1 + 0.5 }}
          >
            <ArrowDown className="w-3 h-3 text-[#555]" />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

export default function Architecture() {
  return (
    <section id="architecture" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#22D3EE]/[0.02] to-transparent pointer-events-none" />
      <div className="section-container">
        <ScrollReveal>
          <div className="text-center mb-16">
            <motion.div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#7C5CFF]/10 border border-[#7C5CFF]/20 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
            >
              <Sigma className="w-3.5 h-3.5 text-[#7C5CFF]" />
              <span className="text-xs text-[#7C5CFF] font-medium tracking-wider uppercase">Model Architecture</span>
            </motion.div>
            <span className="text-[11px] text-[#555] font-mono tracking-[0.2em] uppercase mb-2 block">Network Design</span>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">LSTM <span className="text-gradient">Architecture</span></h2>
            <p className="text-[#888] max-w-2xl mx-auto">A stacked LSTM network designed to capture long-term temporal dependencies in physiological time-series data. Hover each layer for details.</p>
          </div>
        </ScrollReveal>

        <div className="flex flex-col items-center">
          {layers.map((layer, i) => (
            <ArchLayer key={layer.id} layer={layer} index={i} isLast={i === layers.length - 1} />
          ))}
        </div>

        <ScrollReveal delay={0.4}>
          <div className="mt-16 grid md:grid-cols-3 gap-6">
            {[
              { label: "Total Parameters", value: "~58,000", sub: "Lightweight for edge deployment", color: "#22D3EE" },
              { label: "Loss Function", value: "Categorical Crossentropy", sub: "Multi-class classification", color: "#7C5CFF" },
              { label: "Optimizer", value: "Adam (lr=0.001)", sub: "Adaptive learning rate", color: "#34D399" },
            ].map((s) => (
              <div key={s.label} className="glass rounded-2xl p-6 glow-card">
                <div className="text-sm font-medium text-white mb-2">{s.label}</div>
                <div className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</div>
                <div className="text-xs text-[#666] mt-1">{s.sub}</div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
