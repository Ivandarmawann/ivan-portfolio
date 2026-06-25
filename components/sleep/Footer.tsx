"use client";

import { motion } from "framer-motion";
import { GitBranch, Globe, Mail, ArrowUp, Brain, Heart, Clock, Database, Cpu } from "lucide-react";

const links = [
  { icon: GitBranch, href: "#", label: "GitHub Repository" },
  { icon: Globe, href: "#", label: "LinkedIn" },
  { icon: Mail, href: "#", label: "Contact" },
];

const footerStats = [
  { icon: Clock, label: "Research Duration", value: "12 Weeks" },
  { icon: Database, label: "Dataset", value: "DREAMT" },
  { icon: Cpu, label: "Framework", value: "TensorFlow" },
  { icon: Brain, label: "Model", value: "Stacked LSTM" },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative overflow-hidden">
      <div className="h-px bg-gradient-to-r from-transparent via-[#7C5CFF]/50 to-transparent" />

      <div className="section-container py-16">
        <div className="grid md:grid-cols-3 gap-10 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#7C5CFF]/10 flex items-center justify-center">
                <Brain className="w-5 h-5 text-[#7C5CFF]" />
              </div>
              <div>
                <div className="text-sm font-semibold text-white">Sleep Stage Prediction</div>
                <div className="text-[10px] text-[#555] font-mono">using LSTM</div>
              </div>
            </div>
            <p className="text-xs text-[#555] leading-relaxed max-w-xs">
              A deep learning approach to sleep stage classification from wearable
              physiological signals. Built with TensorFlow and Keras.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex flex-col items-start"
          >
            <div className="text-xs text-[#555] font-mono uppercase tracking-wider mb-4">Project Details</div>
            <div className="grid grid-cols-2 gap-x-8 gap-y-3">
              {footerStats.map((s) => (
                <div key={s.label}>
                  <div className="text-[10px] text-[#555]">{s.label}</div>
                  <div className="text-xs text-white font-medium">{s.value}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-start"
          >
            <div className="text-xs text-[#555] font-mono uppercase tracking-wider mb-4">Connect</div>
            <div className="flex items-center gap-3 mb-4">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="w-10 h-10 rounded-full bg-[#1A1A1A] border border-[#2A2A2A] flex items-center justify-center text-[#666] hover:text-white hover:border-[#7C5CFF]/50 transition-all duration-300"
                  aria-label={link.label}
                >
                  <link.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
            <span className="text-[10px] text-[#555]">Thank you for viewing</span>
          </motion.div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-[#1A1A1A] gap-4">
          <span className="text-[10px] text-[#444]">
            © {new Date().getFullYear()} — AI Case Study
          </span>
          <span className="text-[10px] text-[#333] font-mono">
            built with Next.js · TypeScript · TailwindCSS · Framer Motion
          </span>
          <motion.button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full bg-[#1A1A1A] border border-[#2A2A2A] flex items-center justify-center text-white hover:border-[#7C5CFF]/50 transition-all duration-300"
            aria-label="Back to top"
          >
            <ArrowUp className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
