"use client";

import { motion } from "framer-motion";
import { Search, BookOpen, Database, Cpu, BarChart3, Rocket, Circle } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const milestones = [
  { icon: Search, title: "Problem Definition", sub: "Research Question", date: "Phase 1", color: "#FF4B6A", description: "Identified the gap between clinical PSG and accessible at-home sleep monitoring.", details: "Sleep disorders affect 50M+ people. Traditional PSG costs $1,500-3,000/night. Goal: make sleep monitoring accessible via wearables." },
  { icon: BookOpen, title: "Literature Review", sub: "Background Study", date: "Phase 2", color: "#F97316", description: "Surveyed state-of-the-art deep learning approaches for sleep stage classification.", details: "Reviewed CNN, LSTM, and hybrid architectures. Key insight: LSTMs excel at capturing temporal dependencies in physiological time-series." },
  { icon: Database, title: "Data Collection", sub: "DREAMT Dataset", date: "Phase 3", color: "#7C5CFF", description: "Acquired the DREAMT dataset with 200K+ samples across 8 features.", details: "25 subjects, ~8 hours/night, 256 Hz sampling rate. 6 sleep stages annotated by sleep experts." },
  { icon: Cpu, title: "Model Training", sub: "LSTM Implementation", date: "Phase 4", color: "#22D3EE", description: "Trained stacked LSTM with dropout regularization.", details: "Architecture: Input → LSTM(64) → Dropout → LSTM(64) → Dropout → Dense(32) → Dense(6). Adam optimizer, categorical crossentropy loss." },
  { icon: BarChart3, title: "Evaluation", sub: "Performance Analysis", date: "Phase 5", color: "#34D399", description: "Rigorously evaluated using accuracy, precision, recall, and F1-score.", details: "Achieved 90.16% test accuracy. Strong diagonal dominance in confusion matrix. Minor confusion between N1/REM due to physiological similarity." },
  { icon: Rocket, title: "Deployment", sub: "Real-World Impact", date: "Phase 6", color: "#F472B6", description: "Prepared for integration with wearable devices and mobile health platforms.", details: "Model size: ~58K parameters — suitable for on-device inference. Potential integration with smartwatch OS for real-time monitoring." },
];

export default function Timeline() {
  return (
    <section id="research" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#22D3EE]/[0.02] to-transparent pointer-events-none" />
      <div className="section-container">
        <ScrollReveal>
          <div className="text-center mb-16">
            <motion.div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#7C5CFF]/10 border border-[#7C5CFF]/20 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
            >
              <Rocket className="w-3.5 h-3.5 text-[#7C5CFF]" />
              <span className="text-xs text-[#7C5CFF] font-medium tracking-wider uppercase">Research Journey</span>
            </motion.div>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">Research <span className="text-gradient">Contribution</span></h2>
            <p className="text-[#888] max-w-2xl mx-auto">The complete journey from problem identification to deployment-ready solution.</p>
          </div>
        </ScrollReveal>

        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-[#7C5CFF]/30 via-[#22D3EE]/20 to-transparent" />
          {milestones.map((m, i) => (
            <MilestoneNode key={m.title} milestone={m} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function MilestoneNode({ milestone, index }: {
  milestone: (typeof milestones)[0];
  index: number;
}) {
  return (
    <div className="relative pl-16 pb-12 last:pb-0">
      <motion.div
        className="absolute left-4 top-1"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.12, duration: 0.4, type: "spring" }}
      >
        <div
          className="w-5 h-5 rounded-full flex items-center justify-center"
          style={{ backgroundColor: `${milestone.color}20` }}
        >
          <Circle className="w-2 h-2" style={{ color: milestone.color, fill: milestone.color }} />
        </div>
      </motion.div>

      <motion.div
        className="glass rounded-2xl p-6 border border-[#2A2A2A]"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.12, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex items-start gap-4">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
            style={{ backgroundColor: `${milestone.color}15` }}
          >
            <milestone.icon className="w-5 h-5" style={{ color: milestone.color }} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-1">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full" style={{ backgroundColor: `${milestone.color}15`, color: milestone.color }}>
                {milestone.date}
              </span>
              <span className="text-xs text-[#555]">{milestone.sub}</span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-1">{milestone.title}</h3>
            <p className="text-sm text-[#666] leading-relaxed">{milestone.description}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
