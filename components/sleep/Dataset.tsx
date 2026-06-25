"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell,
} from "recharts";
import {
  Heart, Thermometer, Gauge, Activity, Waves, Zap,
  Moon, Sun, CloudMoon, CloudSun, Database, BarChart3,
  Split, SlidersHorizontal, Table2,
} from "lucide-react";
import AnimatedCounter from "./AnimatedCounter";
import ScrollReveal from "./ScrollReveal";

const sensors = [
  { icon: Heart, label: "Heart Rate", desc: "PPG-derived BPM", color: "#FF4B6A" },
  { icon: Gauge, label: "EDA", desc: "Electrodermal activity", color: "#7C5CFF" },
  { icon: Thermometer, label: "Temperature", desc: "Skin temperature", color: "#F97316" },
  { icon: Activity, label: "Accelerometer", desc: "3-axis movement", color: "#22D3EE" },
  { icon: Waves, label: "IBI", desc: "Inter-beat interval", color: "#34D399" },
  { icon: Zap, label: "BVP", desc: "Blood volume pulse", color: "#818CF8" },
];

const stages = [
  { label: "Wake", color: "#FCD34D", samples: 12450 },
  { label: "N1", color: "#818CF8", samples: 8920 },
  { label: "N2", color: "#7C5CFF", samples: 28500 },
  { label: "N3", color: "#5B21B6", samples: 12680 },
  { label: "REM", color: "#22D3EE", samples: 15800 },
  { label: "Pre-sleep", color: "#34D399", samples: 12000 },
];

const stageIcons = [Sun, CloudMoon, Moon, Moon, CloudSun, CloudMoon];

const dashboardStats = [
  { icon: Database, label: "Dataset Size", value: 200, suffix: "K+", color: "#7C5CFF" },
  { icon: BarChart3, label: "Features", value: 8, suffix: "", color: "#22D3EE" },
  { icon: Moon, label: "Classes", value: 6, suffix: "", color: "#818CF8" },
  { icon: Split, label: "Sequence Length", value: 30, suffix: "", color: "#34D399" },
  { icon: SlidersHorizontal, label: "Train/Test Split", value: 80, suffix: "/20", color: "#F97316" },
  { icon: Table2, label: "Window Size", value: 30, suffix: "s", color: "#F472B6" },
];

function ClassDistributionChart() {
  const ref = useRef<HTMLDivElement>(null);
  useInView(ref, { once: true, margin: "-40px" });

  return (
    <div ref={ref} className="glass rounded-3xl p-6 md:p-8">
      <h3 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
        <BarChart3 className="w-4 h-4 text-[#22D3EE]" />
        Class Distribution
      </h3>
      <p className="text-[10px] text-[#555] mb-6">Note: N1 is a minority class — affects model recall</p>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={stages} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
            <XAxis dataKey="label" stroke="#444" tick={{ fill: "#555", fontSize: 11 }} tickLine={false} axisLine={false} />
            <YAxis stroke="#444" tick={{ fill: "#555", fontSize: 11 }} tickLine={false} axisLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`} />
            <Tooltip
              content={({ active, payload }) => {
                if (!active || !payload?.[0]) return null;
                const d = payload[0].payload;
                return (
                  <div className="glass rounded-xl p-3 border border-[#2A2A2A]">
                    <div className="flex items-center gap-2 text-xs mb-1">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }} />
                      <span className="text-white font-medium">{d.label}</span>
                    </div>
                    <div className="text-[11px] text-[#888]">{d.samples.toLocaleString()} samples</div>
                  </div>
                );
              }}
              cursor={{ fill: "#1A1A1A" }}
            />
            <Bar dataKey="samples" radius={[4, 4, 0, 0]} animationDuration={1200} animationEasing="ease-out">
              {stages.map((s) => (
                <Cell key={s.label} fill={s.color} fillOpacity={0.7} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default function Dataset() {
  return (
    <section id="dataset" className="section-padding relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#7C5CFF]/[0.02] to-transparent pointer-events-none" />
      <div className="section-container">
        <ScrollReveal>
          <div className="flex flex-col items-center text-center mb-16">
            <motion.div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#22D3EE]/10 border border-[#22D3EE]/20 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
            >
              <Database className="w-3.5 h-3.5 text-[#22D3EE]" />
              <span className="text-xs text-[#22D3EE] font-medium tracking-wider uppercase">Data</span>
            </motion.div>
            <span className="text-[11px] text-[#555] font-mono tracking-[0.2em] uppercase mb-2">Dataset Overview</span>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">DREAMT <span className="text-gradient">Sleep Dataset</span></h2>
            <p className="text-[#888] max-w-2xl">A comprehensive multi-sensor sleep dataset collected from wearable devices, featuring synchronized physiological signals and expert-annotated sleep stages.</p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="glass rounded-3xl p-6 md:p-8 mb-8">
            <span className="text-[11px] text-[#555] font-mono tracking-[0.2em] uppercase mb-4 block">Configuration</span>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {dashboardStats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="text-center p-4 rounded-xl bg-[#1A1A1A] border border-[#2A2A2A] hover:border-[#7C5CFF]/20 transition-all duration-300"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.06 }}
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center mx-auto mb-2" style={{ backgroundColor: `${stat.color}15` }}>
                    <stat.icon className="w-4 h-4" style={{ color: stat.color }} />
                  </div>
                  <div className="text-lg font-bold" style={{ color: stat.color }}>
                    <AnimatedCounter to={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-[10px] text-[#555]">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <ScrollReveal delay={0.15}>
            <div className="glass rounded-3xl p-6 md:p-8">
              <span className="text-[11px] text-[#555] font-mono tracking-[0.2em] uppercase mb-4 block">Sensors</span>
              <div className="grid grid-cols-2 gap-3">
                {sensors.map((sensor, i) => (
                  <motion.div
                    key={sensor.label}
                    className="flex items-start gap-3 p-3 rounded-xl bg-[#1A1A1A] border border-[#2A2A2A] hover:border-[#7C5CFF]/30 transition-all duration-300"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.04 }}
                    whileHover={{ y: -2 }}
                  >
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${sensor.color}15` }}>
                      <sensor.icon className="w-4 h-4" style={{ color: sensor.color }} />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white">{sensor.label}</div>
                      <div className="text-[11px] text-[#666]">{sensor.desc}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <ClassDistributionChart />
          </ScrollReveal>
        </div>

        <ScrollReveal delay={0.25}>
          <div className="glass rounded-3xl p-6 md:p-8">
            <span className="text-[11px] text-[#555] font-mono tracking-[0.2em] uppercase mb-4 block">Target Classes</span>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
              {stages.map((stage, i) => {
                const Icon = stageIcons[i];
                const total = stages.reduce((a, s) => a + s.samples, 0);
                const pct = ((stage.samples / total) * 100).toFixed(1);
                return (
                  <motion.div
                    key={stage.label}
                    className="text-center p-4 rounded-xl bg-[#1A1A1A] border border-[#2A2A2A] hover:border-[#7C5CFF]/20 transition-all duration-300"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.04 }}
                    whileHover={{ y: -2 }}
                  >
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center mx-auto mb-2" style={{ backgroundColor: `${stage.color}15` }}>
                      <Icon className="w-4 h-4" style={{ color: stage.color }} />
                    </div>
                    <div className="text-sm font-medium text-white">{stage.label}</div>
                    <div className="text-[10px] text-[#555]">{stage.samples.toLocaleString()}</div>
                    <div className="text-[9px] font-mono" style={{ color: stage.color }}>{pct}%</div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
