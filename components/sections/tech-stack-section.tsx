"use client";

import { motion } from "framer-motion";
import * as React from "react";

const techRows = [
  [
    { name: "Python", color: "#3776AB", text: "Py" },
    { name: "Flask", color: "#000000", text: "Fl" },
    { name: "Laravel", color: "#FF2D20", text: "Lv" },
    { name: "MySQL", color: "#4479A1", text: "My" },
    { name: "React", color: "#61DAFB", text: "Rc" },
    { name: "Next.js", color: "#000000", text: "Nj" },
    { name: "JavaScript", color: "#F7DF1E", text: "Js" },
    { name: "HTML5", color: "#E34F26", text: "H5" },
    { name: "CSS3", color: "#1572B6", text: "Cs" },
    { name: "Bootstrap", color: "#7952B3", text: "Bs" },
    { name: "Pandas", color: "#150458", text: "Pd" },
  ],
  [
    { name: "TensorFlow", color: "#FF6F00", text: "Tf" },
    { name: "Scikit-Learn", color: "#F89939", text: "Sk" },
    { name: "NumPy", color: "#013243", text: "Np" },
    { name: "YOLOv12", color: "#00FFFF", text: "Yl" },
    { name: "Git", color: "#F05032", text: "Gi" },
    { name: "GitHub", color: "#FFFFFF", text: "Gh" },
    { name: "Streamlit", color: "#FF4B4B", text: "St" },
    { name: "VS Code", color: "#007ACC", text: "Vs" },
    { name: "Roboflow", color: "#673AB8", text: "Rf" },
    { name: "Jupyter", color: "#F37626", text: "Jp" },
    { name: "Google Colab", color: "#F9AB00", text: "Gc" },
  ],
];

const maskStyle = {
  maskImage: "linear-gradient(to right, transparent, black 4%, black 96%, transparent)",
  WebkitMaskImage: "linear-gradient(to right, transparent, black 4%, black 96%, transparent)",
};

export function TechStackSection() {
  const [paused, setPaused] = React.useState(false);

  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-6xl px-6 sm:px-8 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="mx-auto max-w-xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-3.5 py-1 text-xs font-medium text-muted-foreground">
              Toolbox
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Tech Stack
            </h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Technologies I use to build web applications, data analytics solutions, and AI systems.
            </p>
          </div>
        </motion.div>
      </div>

      <div
        className="mt-10 space-y-4"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {techRows.map((row, rowIndex) => (
          <div key={rowIndex} className="relative overflow-hidden py-2" style={maskStyle}>
            <motion.div
              animate={
                paused
                  ? {}
                  : { x: rowIndex === 0 ? ["0%", "-50%"] : ["-50%", "0%"] }
              }
              transition={{
                x: {
                  duration: 50,
                  repeat: Infinity,
                  ease: "linear",
                },
              }}
              className="flex w-max gap-3"
            >
              {[...row, ...row].map((tech, index) => (
                <div
                  key={`${tech.name}-${index}`}
                  className="group flex items-center gap-3 rounded-xl border border-border bg-card/60 px-4 py-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:bg-card hover:shadow-[0_0_24px_rgba(37,99,235,0.08)]"
                >
                  <span
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[10px] font-bold"
                    style={{ backgroundColor: `${tech.color}20`, color: tech.color }}
                  >
                    {tech.text}
                  </span>
                  <span className="whitespace-nowrap text-sm font-medium text-muted-foreground transition-colors group-hover:text-foreground">
                    {tech.name}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}
