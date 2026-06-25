"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { Moon, Heart, Watch, Shield, Users, Smartphone, ArrowUpRight } from "lucide-react";
import { useTilt } from "./useHooks";
import ScrollReveal from "./ScrollReveal";

const applications = [
  { icon: Moon, title: "Sleep Monitoring", description: "Continuous at-home sleep stage tracking without clinical visits", color: "#7C5CFF" },
  { icon: Heart, title: "Wearable Healthcare", description: "Integrate into smartwatches for real-time health insights", color: "#FF4B6A" },
  { icon: Watch, title: "Smartwatch AI", description: "On-device inference for privacy-preserving sleep analysis", color: "#22D3EE" },
  { icon: Shield, title: "Preventive Healthcare", description: "Early detection of sleep disorders and circadian rhythm disruptions", color: "#34D399" },
  { icon: Users, title: "Remote Patient Monitoring", description: "Telemedicine integration for sleep specialists to review patient data", color: "#F97316" },
  { icon: Smartphone, title: "Digital Health", description: "Scalable platform for population-level sleep health analytics", color: "#F472B6" },
];

function TiltCard({ app, i }: { app: (typeof applications)[0]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const tiltStyle = useTilt(ref, 8);

  return (
    <ScrollReveal delay={0.05 * i}>
      <motion.div
        ref={ref}
        className="group relative overflow-hidden rounded-3xl p-6 cursor-pointer"
        style={{
          background: `linear-gradient(135deg, ${app.color}08, transparent)`,
          border: `1px solid ${app.color}20`,
          ...tiltStyle,
        }}
        whileHover={{ y: -4 }}
      >
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: `radial-gradient(600px circle at 50% 0%, ${app.color}15, transparent)` }}
        />
        <div className="relative z-10">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-[-5deg] transition-all duration-300"
            style={{ backgroundColor: `${app.color}15` }}
          >
            <app.icon className="w-6 h-6" style={{ color: app.color }} />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">{app.title}</h3>
          <p className="text-sm text-[#666] leading-relaxed">{app.description}</p>
          <div
            className="mt-4 flex items-center gap-1 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ color: app.color }}
          >
            <span>Learn more</span>
            <ArrowUpRight className="w-3 h-3" />
          </div>
        </div>
      </motion.div>
    </ScrollReveal>
  );
}

export default function Applications() {
  return (
    <section id="applications" className="section-padding relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#7C5CFF]/[0.02] to-transparent pointer-events-none" />
      <div className="section-container">
        <ScrollReveal>
          <div className="text-center mb-16">
            <motion.div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#7C5CFF]/10 border border-[#7C5CFF]/20 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
            >
              <span className="text-xs text-[#7C5CFF] font-medium tracking-wider uppercase">Impact</span>
            </motion.div>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">Real World <span className="text-gradient">Applications</span></h2>
            <p className="text-[#888] max-w-2xl mx-auto">From consumer wearables to clinical decision support systems, this technology bridges the gap between research and real-world impact.</p>
          </div>
        </ScrollReveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {applications.map((app, i) => (
            <TiltCard key={app.title} app={app} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
