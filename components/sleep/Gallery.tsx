"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Images, X } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const springEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface GalleryItem {
  src: string;
  title: string;
  description: string;
}

const items: GalleryItem[] = [
  {
    src: "/projects/sleep-stage-prediction/gallery/accuracy.png",
    title: "Training Accuracy",
    description: "Training and validation accuracy during 50 epochs of LSTM training.",
  },
  {
    src: "/projects/sleep-stage-prediction/gallery/loss.png",
    title: "Training Loss",
    description: "Training and validation loss showing stable convergence.",
  },
  {
    src: "/projects/sleep-stage-prediction/gallery/confusion-matrix.png",
    title: "Confusion Matrix",
    description: "Classification performance across all sleep stages.",
  },
  {
    src: "/projects/sleep-stage-prediction/gallery/dataset-distribution.png",
    title: "Dataset Distribution",
    description: "Distribution of sleep stage classes after preprocessing.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: springEase },
  },
};

export default function Gallery() {
  const [selected, setSelected] = useState<number | null>(null);

  const close = useCallback(() => setSelected(null), []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [close]);

  return (
    <section id="gallery" className="section-padding relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#7C5CFF]/[0.02] to-transparent pointer-events-none" />
      <div className="section-container">
        <ScrollReveal>
          <div className="text-center mb-16">
            <motion.div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#22D3EE]/10 border border-[#22D3EE]/20 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
            >
              <Images className="w-3.5 h-3.5 text-[#22D3EE]" />
              <span className="text-xs text-[#22D3EE] font-medium tracking-wider uppercase">Gallery</span>
            </motion.div>
            <span className="text-[11px] text-[#555] font-mono tracking-[0.2em] uppercase mb-2 block">Project Artifacts</span>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">Research <span className="text-gradient">Gallery</span></h2>
            <p className="text-[#888] max-w-2xl mx-auto">
              Visual assets from the research and development process. Click to expand.
            </p>
          </div>
        </ScrollReveal>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
        >
          {items.map((item, i) => (
            <motion.div key={item.title} variants={cardVariants}>
              <motion.button
                className="group relative w-full overflow-hidden rounded-xl border border-[#2A2A2A] bg-[#1A1A1A] cursor-pointer transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(124,92,255,0.15)]"
                onClick={() => setSelected(i)}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3, ease: springEase }}
              >
                <div className="aspect-[4/3] overflow-hidden relative">
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                <div className="p-4 text-left border-t border-[#2A2A2A]">
                  <h3 className="text-sm font-semibold text-white">{item.title}</h3>
                  <p className="text-xs text-[#888] mt-1">{item.description}</p>
                </div>
              </motion.button>
            </motion.div>
          ))}
        </motion.div>

        <AnimatePresence>
          {selected !== null && (
            <motion.div
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="absolute inset-0 bg-black/90 backdrop-blur-sm"
                onClick={close}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
              <motion.div
                className="relative z-10 w-full max-w-5xl flex flex-col items-center"
                initial={{ scale: 0.92, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.92, opacity: 0, y: 20 }}
                transition={{ duration: 0.4, ease: springEase }}
              >
                <div className="w-full overflow-hidden rounded-xl border border-[#2A2A2A] bg-black relative" style={{ minHeight: "300px", maxHeight: "75vh" }}>
                  <Image
                    src={items[selected].src}
                    alt={items[selected].title}
                    fill
                    sizes="(max-width: 768px) 100vw, 80vw"
                    className="object-contain"
                  />
                </div>
                <div className="mt-4 flex items-start justify-between w-full max-w-5xl">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{items[selected].title}</h3>
                    <p className="text-sm text-[#888] mt-1">{items[selected].description}</p>
                  </div>
                  <motion.button
                    className="shrink-0 w-10 h-10 rounded-full bg-[#1A1A1A] border border-[#2A2A2A] flex items-center justify-center text-white hover:border-[#FF4B6A]/50 transition-colors ml-4"
                    onClick={close}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
