"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Upload, Cpu, Brain, CheckCircle, BarChart3, Clock,
} from "lucide-react";
import ScrollReveal from "./ScrollReveal";

type Stage = "idle" | "upload" | "analyzing" | "generating" | "running" | "complete";

const stages: { key: Stage; label: string; icon: typeof Upload; duration: number }[] = [
  { key: "upload", label: "Uploading CSV...", icon: Upload, duration: 800 },
  { key: "analyzing", label: "Analyzing Signals...", icon: BarChart3, duration: 1200 },
  { key: "generating", label: "Generating Sequences...", icon: Clock, duration: 1000 },
  { key: "running", label: "Running LSTM Inference...", icon: Cpu, duration: 1500 },
  { key: "complete", label: "Prediction Complete!", icon: CheckCircle, duration: 500 },
];

const resultStages = [
  { stage: "Wake", confidence: 2.1, color: "#FCD34D" },
  { stage: "N1", confidence: 5.3, color: "#818CF8" },
  { stage: "N2", confidence: 87.4, color: "#7C5CFF" },
  { stage: "N3", confidence: 1.8, color: "#5B21B6" },
  { stage: "REM", confidence: 2.5, color: "#22D3EE" },
  { stage: "Pre-sleep", confidence: 0.9, color: "#34D399" },
];

export default function Demo() {
  const [stage, setStage] = useState<Stage>("idle");
  const [progress, setProgress] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const runDemo = () => {
    if (started) return;
    setStarted(true);
    setStage("upload");

    let total = 0;
    const stageKeys: Stage[] = ["upload", "analyzing", "generating", "running", "complete"];
    stageKeys.forEach((key, i) => {
      const dur = stages.find((s) => s.key === key)?.duration || 1000;
      const t = setTimeout(() => {
        setStage(key);
        if (i < stageKeys.length - 1) {
          setProgress(((i + 1) / (stageKeys.length - 1)) * 100);
        } else {
          setProgress(100);
        }
      }, total);
      timerRef.current.push(t);
      total += dur;
    });
  };

  useEffect(() => {
    const timers = timerRef.current;
    return () => timers.forEach(clearTimeout);
  }, []);

  const reset = () => {
    timerRef.current.forEach(clearTimeout);
    setStage("idle");
    setProgress(0);
    setStarted(false);
  };

  return (
    <section id="demo" className="section-padding relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#22D3EE]/[0.02] to-transparent pointer-events-none" />
      <div className="section-container" ref={ref}>
        <ScrollReveal>
          <div className="text-center mb-16">
            <motion.div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#7C5CFF]/10 border border-[#7C5CFF]/20 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
            >
              <Brain className="w-3.5 h-3.5 text-[#7C5CFF]" />
              <span className="text-xs text-[#7C5CFF] font-medium tracking-wider uppercase">Live Demo</span>
            </motion.div>
            <span className="text-[11px] text-[#555] font-mono tracking-[0.2em] uppercase mb-2 block">Interactive Inference</span>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">AI <span className="text-gradient">Inference</span></h2>
            <p className="text-[#888] max-w-2xl mx-auto">See the model in action. Upload a sample and watch the LSTM process it in real-time.</p>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="max-w-2xl mx-auto glass rounded-3xl p-8 border border-[#2A2A2A]">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">Sleep Stage Classifier</h3>
              <div className="flex items-center gap-2 text-xs text-[#555]">
                <div className={`w-2 h-2 rounded-full ${stage === "complete" ? "bg-[#34D399]" : stage !== "idle" ? "bg-[#22D3EE] animate-pulse" : "bg-[#555]"}`} />
                {stage === "idle" ? "Ready" : stage === "complete" ? "Complete" : "Processing..."}
              </div>
            </div>

            <div className="space-y-2 mb-6">
              {stages.map((s) => {
                const isActive = stage === s.key;
                const isDone = stages.findIndex((x) => x.key === stage) > stages.findIndex((x) => x.key === s.key) || (stage === "complete" && s.key !== "complete");
                return (
                  <div
                    key={s.key}
                    className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${
                      isActive ? "bg-[#7C5CFF]/10 border border-[#7C5CFF]/20" : isDone ? "bg-[#34D399]/5 border border-[#34D399]/10" : "bg-[#1A1A1A] border border-[#2A2A2A] opacity-40"
                    }`}
                  >
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                      isDone ? "bg-[#34D399]/20" : isActive ? "bg-[#7C5CFF]/20" : "bg-[#222]"
                    }`}>
                      {isDone ? (
                        <CheckCircle className="w-3.5 h-3.5 text-[#34D399]" />
                      ) : (
                        <s.icon className={`w-3.5 h-3.5 ${isActive ? "text-[#7C5CFF]" : "text-[#555]"}`} />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className={`text-xs font-medium ${isDone ? "text-[#34D399]" : isActive ? "text-white" : "text-[#555]"}`}>
                        {s.label}
                      </div>
                    </div>
                    {isActive && (
                      <motion.div
                        className="w-4 h-4 rounded-full border-2 border-[#7C5CFF] border-t-transparent"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                      />
                    )}
                  </div>
                );
              })}
            </div>

            <div className="h-2 rounded-full bg-[#1A1A1A] mb-6 overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-[#7C5CFF] to-[#22D3EE]"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>

            {stage === "complete" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-5 mb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-sm font-semibold text-white">Prediction Result</div>
                      <div className="text-xs text-[#666]">Sleep Stage Classification</div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gradient">N2</div>
                      <div className="text-xs text-[#666]">87.4% confidence</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {resultStages.map((r) => (
                      <div key={r.stage} className="flex items-center gap-3">
                        <span className="text-xs text-[#666] w-16">{r.stage}</span>
                        <div className="flex-1 h-2 rounded-full bg-[#222] overflow-hidden">
                          <motion.div
                            className="h-full rounded-full"
                            style={{ backgroundColor: r.color }}
                            initial={{ width: 0 }}
                            animate={{ width: `${r.confidence}%` }}
                            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                          />
                        </div>
                        <span className="text-xs text-[#888] w-10 text-right">{r.confidence.toFixed(1)}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            <div className="flex gap-3">
              {!started ? (
                <motion.button
                  onClick={runDemo}
                  className="flex-1 px-6 py-3 rounded-full bg-[#7C5CFF] text-white text-sm font-medium flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Upload className="w-4 h-4" />
                  Run Prediction
                </motion.button>
              ) : (
                <motion.button
                  onClick={reset}
                  className="flex-1 px-6 py-3 rounded-full border border-[#333] text-white text-sm font-medium hover:border-[#7C5CFF]/50 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Reset
                </motion.button>
              )}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
