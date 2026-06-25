"use client";

import { Code2 } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

interface Tech {
  name: string;
  color: string;
  bgColor: string;
  svg: string;
}

const techs: Tech[] = [
  { name: "Python", color: "#3776AB", bgColor: "#3776AB15", svg: `<svg viewBox="0 0 24 24" fill="none"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z" fill="#3776AB" opacity="0.2"/><path d="M9.5 8.5h5a1 1 0 011 1v5a1 1 0 01-1 1h-5a1 1 0 01-1-1v-5a1 1 0 011-1z" stroke="#3776AB" stroke-width="1.5"/><path d="M11 6h2v2.5h-2z" fill="#3776AB"/><path d="M11 15.5h2V18h-2z" fill="#FFD43B"/></svg>` },
  { name: "TensorFlow", color: "#FF6F00", bgColor: "#FF6F0015", svg: `<svg viewBox="0 0 24 24" fill="none"><path d="M12 2L4 7v10l8 5 8-5V7l-8-5z" stroke="#FF6F00" stroke-width="1.5" fill="none"/><path d="M12 7v10M8 9.5v5M16 9.5v5" stroke="#FF6F00" stroke-width="1.5" stroke-linecap="round"/></svg>` },
  { name: "Keras", color: "#D00000", bgColor: "#D0000015", svg: `<svg viewBox="0 0 24 24" fill="none"><path d="M6 4h12M6 8h12M6 12h12M6 16h12M6 20h12" stroke="#D00000" stroke-width="1.5" stroke-linecap="round"/><path d="M10 4l4 16" stroke="#D00000" stroke-width="1.5"/></svg>` },
  { name: "NumPy", color: "#013243", bgColor: "#01324315", svg: `<svg viewBox="0 0 24 24" fill="none"><path d="M12 3L3 8v8l9 5 9-5V8l-9-5z" stroke="#013243" stroke-width="1.5" fill="none"/><path d="M12 8l-6 3.5v4L12 12l6 3.5v-4L12 8z" fill="#4DABCF" opacity="0.5"/></svg>` },
  { name: "Pandas", color: "#150458", bgColor: "#15045815", svg: `<svg viewBox="0 0 24 24" fill="none"><rect x="5" y="4" width="3" height="16" rx="1" fill="#150458" opacity="0.3"/><rect x="10" y="7" width="3" height="13" rx="1" fill="#FFCA00" opacity="0.7"/><rect x="15" y="4" width="3" height="16" rx="1" fill="#150458" opacity="0.3"/></svg>` },
  { name: "Scikit-Learn", color: "#F7931E", bgColor: "#F7931E15", svg: `<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#F7931E" stroke-width="1.5" fill="none"/><path d="M8 12l3 3 5-6" stroke="#F7931E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>` },
  { name: "Colab", color: "#F9AB00", bgColor: "#F9AB0015", svg: `<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="3" stroke="#F9AB00" stroke-width="1.5" fill="none"/><path d="M8 8v8M16 8v8M12 8v8" stroke="#F9AB00" stroke-width="1.5" stroke-linecap="round"/></svg>` },
  { name: "Matplotlib", color: "#11557C", bgColor: "#11557C15", svg: `<svg viewBox="0 0 24 24" fill="none"><path d="M4 20V6l5 8 4-6 7 12" stroke="#11557C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/><circle cx="4" cy="20" r="1.5" fill="#11557C"/><circle cx="9" cy="14" r="1.5" fill="#11557C"/><circle cx="13" cy="8" r="1.5" fill="#11557C"/><circle cx="20" cy="20" r="1.5" fill="#11557C"/></svg>` },
  { name: "Jupyter", color: "#F37626", bgColor: "#F3762615", svg: `<svg viewBox="0 0 24 24" fill="none"><rect x="4" y="4" width="16" height="16" rx="2" stroke="#F37626" stroke-width="1.5" fill="none"/><path d="M9 9h6v6H9z" fill="#F37626" opacity="0.3"/><path d="M12 9v6M9 12h6" stroke="#F37626" stroke-width="1.5"/></svg>` },
  { name: "Git", color: "#F05032", bgColor: "#F0503215", svg: `<svg viewBox="0 0 24 24" fill="none"><path d="M12 3L3 12l9 9 9-9-9-9z" stroke="#F05032" stroke-width="1.5" fill="none"/><circle cx="12" cy="12" r="2" fill="#F05032" opacity="0.5"/><path d="M8 8l8 8M16 8l-8 8" stroke="#F05032" stroke-width="1"/></svg>` },
  { name: "GitHub", color: "#fff", bgColor: "#ffffff15", svg: `<svg viewBox="0 0 24 24" fill="none"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025.8-.223 1.65-.334 2.5-.334.85 0 1.7.111 2.5.334 1.91-1.294 2.75-1.025 2.75-1.025.544 1.377.201 2.394.099 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0022 12c0-5.523-4.477-10-10-10z" fill="#fff" opacity="0.5"/></svg>` },
  { name: "VS Code", color: "#007ACC", bgColor: "#007ACC15", svg: `<svg viewBox="0 0 24 24" fill="none"><path d="M17 3l4 4-4 4M7 21l-4-4 4-4" stroke="#007ACC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M21 7H7a4 4 0 00-4 4v2a4 4 0 004 4h14" stroke="#007ACC" stroke-width="1.5" fill="none"/></svg>` },
];

export default function TechStack() {
  return (
    <section id="tech-stack" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#22D3EE]/[0.02] to-transparent pointer-events-none" />
      <div className="section-container">
        <ScrollReveal>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#22D3EE]/10 border border-[#22D3EE]/20 mb-6">
              <Code2 className="w-3.5 h-3.5 text-[#22D3EE]" />
              <span className="text-xs text-[#22D3EE] font-medium tracking-wider uppercase">Technology</span>
            </div>
            <span className="text-[11px] text-[#555] font-mono tracking-[0.2em] uppercase mb-2 block">Tools & Frameworks</span>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">Technology <span className="text-gradient">Stack</span></h2>
            <p className="text-[#888] max-w-2xl mx-auto">Built with industry-standard tools for deep learning research and development.</p>
          </div>
        </ScrollReveal>

        <div className="flex flex-wrap justify-center gap-3">
          {techs.map((tech) => (
            <div
              key={tech.name}
              className="flex items-center gap-3 px-5 py-3 rounded-2xl hover:scale-105 transition-all duration-300"
              style={{ backgroundColor: tech.bgColor, border: `1px solid ${tech.color}15` }}
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                dangerouslySetInnerHTML={{ __html: tech.svg }}
              />
              <span className="text-sm font-medium text-white/80">{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
