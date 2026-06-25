"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Heart, Activity, ArrowUpRight, ChevronDown,
} from "lucide-react";
import { useMousePosition } from "./useHooks";

function LiveECG() {
  return (
    <div className="relative w-full h-20 overflow-hidden rounded-xl bg-[#0a0a0a] border border-[#1A1A1A]">
      <svg viewBox="0 0 400 80" className="w-full h-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="ecgLive" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#7C5CFF" />
            <stop offset="50%" stopColor="#22D3EE" />
            <stop offset="100%" stopColor="#7C5CFF" />
          </linearGradient>
          <filter id="ecgGlow"><feGaussianBlur stdDeviation="2" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        </defs>
        <motion.path
          d="M0 60 L20 60 L40 60 L45 20 L55 70 L65 60 L85 60 L105 60 L110 15 L120 65 L130 60 L150 60 L180 60 L200 60 L205 10 L215 72 L225 60 L245 60 L265 60 L270 25 L280 55 L290 60 L310 60 L340 60 L350 60 L355 18 L365 68 L375 60 L400 60"
          fill="none"
          stroke="url(#ecgLive)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#ecgGlow)"
          animate={{ x: [0, -200] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
        <motion.path
          d="M400 60 L420 60 L440 60 L445 20 L455 70 L465 60 L485 60 L505 60 L510 15 L520 65 L530 60 L550 60 L580 60 L600 60 L605 10 L615 72 L625 60 L645 60 L665 60 L670 25 L680 55 L690 60 L710 60 L740 60 L750 60 L755 18 L765 68 L775 60 L800 60"
          fill="none"
          stroke="url(#ecgLive)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#ecgGlow)"
          animate={{ x: [0, -200] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
      </svg>
    </div>
  );
}

function NeuralNetworkViz() {
  const layers = [
    { count: 8, label: "Input", color: "#22D3EE" },
    { count: 6, label: "LSTM", color: "#7C5CFF" },
    { count: 4, label: "Drop", color: "#F472B6" },
    { count: 6, label: "LSTM", color: "#7C5CFF" },
    { count: 6, label: "Out", color: "#34D399" },
  ];

  return (
    <div className="flex items-center justify-center gap-1.5 py-3">
      {layers.map((layer, i) => (
        <motion.div
          key={`${layer.label}-${i}`}
          className="flex flex-col items-center gap-0.5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 + i * 0.1 }}
        >
          {Array.from({ length: layer.count }).map((_, j) => (
            <motion.div
              key={j}
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: layer.color, opacity: 0.3 + (j / layer.count) * 0.5 }}
              animate={{ opacity: [0.3, 0.8, 0.3], scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.15 + j * 0.05, ease: "easeInOut" }}
            />
          ))}
          <span className="text-[7px] text-[#555] mt-1 font-mono">{layer.label}</span>
        </motion.div>
      ))}
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={`flow-${i}`}
          className="absolute w-1 h-1 rounded-full bg-[#22D3EE]"
          style={{ filter: "blur(1px)" }}
          animate={{
            x: [0, 120],
            opacity: [0, 1, 0],
          }}
          transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
        />
      ))}
    </div>
  );
}

function PredictionCard() {
  const [hr, setHr] = useState(72);
  const [spo2, setSpo2] = useState(98);

  useEffect(() => {
    const interval = setInterval(() => {
      setHr(70 + Math.floor(Math.random() * 6));
      setSpo2(96 + Math.floor(Math.random() * 3));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="glass rounded-2xl p-4 border border-[#2A2A2A]"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5, duration: 0.6 }}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] text-[#555] uppercase tracking-wider font-mono">Current Prediction</span>
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#22D3EE] animate-pulse" />
          <span className="text-[10px] text-[#22D3EE] font-mono">LIVE</span>
        </span>
      </div>
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="text-2xl font-bold text-gradient">N2</div>
          <div className="text-[10px] text-[#555]">Light Sleep</div>
        </div>
        <div className="text-right">
          <div className="text-lg font-semibold text-white">87.4%</div>
          <div className="text-[10px] text-[#555]">Confidence</div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 pt-3 border-t border-[#2A2A2A]">
        <div className="flex items-center gap-2">
          <Heart className="w-3 h-3 text-[#FF4B6A]" />
          <div>
            <div className="text-xs font-medium text-white">{hr} <span className="text-[10px] text-[#555]">BPM</span></div>
            <div className="text-[9px] text-[#555]">Heart Rate</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Activity className="w-3 h-3 text-[#22D3EE]" />
          <div>
            <div className="text-xs font-medium text-white">{spo2}<span className="text-[10px] text-[#555]">%</span></div>
            <div className="text-[9px] text-[#555]">SpO₂</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function PipelineIndicator({ label, active }: { label: string; active: boolean }) {
  return (
    <motion.div
      className={`text-[9px] font-mono px-2 py-1 rounded-md transition-all duration-300 ${
        active ? "bg-[#7C5CFF]/20 text-[#7C5CFF] border border-[#7C5CFF]/30" : "text-[#444] border border-[#1A1A1A]"
      }`}
      animate={active ? { opacity: [0.5, 1, 0.5] } : { opacity: 0.4 }}
      transition={active ? { duration: 2, repeat: Infinity } : {}}
    >
      {label}
    </motion.div>
  );
}

export default function Hero() {
  const mouse = useMousePosition();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [pipelineStep, setPipelineStep] = useState(0);
  const pipelineLabels = ["Signal", "Clean", "LSTM", "Predict"];

  useEffect(() => {
    const interval = setInterval(() => {
      setPipelineStep((p) => (p + 1) % pipelineLabels.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [pipelineLabels.length]);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <div
          className="absolute top-1/4 -left-1/4 w-[800px] h-[800px] rounded-full bg-[#7C5CFF]/[0.05] blur-[160px] transition-transform duration-1000 ease-out"
          style={{ transform: `translate(${(mouse.x - 0.5) * 25}px, ${(mouse.y - 0.5) * 25}px)` }}
        />
        <div
          className="absolute bottom-1/4 -right-1/4 w-[600px] h-[600px] rounded-full bg-[#22D3EE]/[0.03] blur-[120px] transition-transform duration-1000 ease-out"
          style={{ transform: `translate(${(mouse.x - 0.5) * -20}px, ${(mouse.y - 0.5) * -20}px)` }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full bg-[#818CF8]/[0.02] blur-[200px]" />
      </div>

      <div className="section-container w-full pt-28 pb-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#7C5CFF]/10 border border-[#7C5CFF]/20 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-[#22D3EE] animate-pulse" />
              <span className="text-xs text-[#22D3EE] font-medium tracking-wider uppercase">Deep Learning · Healthcare AI</span>
            </motion.div>

            <motion.h1
              className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.6 }}
            >
              <span className="text-white">Sleep Stage</span><br />
              <span className="text-gradient">Prediction</span><br />
              <span className="text-white/60 text-3xl sm:text-4xl lg:text-5xl">using LSTM</span>
            </motion.h1>

            <motion.p
              className="text-base text-[#888] max-w-lg mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Deep Learning for Wearable Sleep Analysis — A high-performance LSTM model
              classifying sleep stages from wearable physiological signals with 90.16% accuracy,
              bringing clinical-grade sleep monitoring to consumer devices.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.6 }}
            >
              {[
                { label: "View Case Study", href: "#metrics", primary: true },
                { label: "Architecture", href: "#architecture", primary: false },
                { label: "Dataset", href: "#dataset", primary: false },
              ].map((btn) => (
                <motion.a
                  key={btn.label}
                  href={btn.href}
                  className={`group relative inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium overflow-hidden ${
                    btn.primary
                      ? "bg-[#7C5CFF] text-white"
                      : "border border-[#333] text-white hover:border-[#7C5CFF]/50"
                  }`}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-[#6B4FE8] to-[#7C5CFF] opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="relative flex items-center gap-2">
                    {btn.label}
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </span>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            className="hidden lg:flex flex-col gap-3"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-[#555] font-mono uppercase tracking-wider">Inference Pipeline</span>
              <div className="flex gap-1.5">
                {pipelineLabels.map((l, i) => (
                  <PipelineIndicator key={l} label={l} active={i === pipelineStep} />
                ))}
              </div>
            </div>

            <div className="glass rounded-2xl p-4 border border-[#2A2A2A]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] text-[#555] font-mono uppercase">ECG Signal</span>
                <span className="text-[9px] text-[#555] font-mono">256 Hz</span>
              </div>
              <LiveECG />
            </div>

            <div className="glass rounded-2xl p-4 border border-[#2A2A2A]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] text-[#555] font-mono uppercase">Neural Network</span>
                <motion.span
                  className="text-[9px] text-[#7C5CFF] font-mono"
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Processing...
                </motion.span>
              </div>
              <div className="relative overflow-hidden">
                <NeuralNetworkViz />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <PredictionCard />
              <motion.div
                className="glass rounded-2xl p-4 border border-[#2A2A2A] flex flex-col justify-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.7, duration: 0.6 }}
              >
                <span className="text-[10px] text-[#555] font-mono uppercase mb-2">Model Info</span>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-[#555]">Architecture</span>
                    <span className="text-white font-medium">Stacked LSTM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#555]">Parameters</span>
                    <span className="text-white font-medium">58K</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#555]">Accuracy</span>
                    <span className="text-[#22D3EE] font-medium">90.16%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#555]">Features</span>
                    <span className="text-white font-medium">8</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 6, 0] }}
        transition={{ delay: 2.5, duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown className="w-5 h-5 text-[#444]" />
      </motion.div>
    </section>
  );
}
