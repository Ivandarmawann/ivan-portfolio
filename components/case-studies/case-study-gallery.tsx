"use client";

import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

import { cn } from "@/lib/utils";

type GalleryImage = {
  src: string;
  caption: string;
};

type CaseStudyGalleryProps = {
  images: GalleryImage[];
};

export function CaseStudyGallery({ images }: CaseStudyGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
    };
    if (lightboxOpen) window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightboxOpen, closeLightbox]);

  const goNext = () => setLightboxIndex((i) => (i + 1) % images.length);
  const goPrev = () => setLightboxIndex((i) => (i - 1 + images.length) % images.length);

  return (
    <>
      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {images.map(({ src, caption }, index) => {
          const isFirst = index === 0;
          return (
            <button
              key={src}
              type="button"
              onClick={() => openLightbox(index)}
              className={cn(
                "group relative overflow-hidden rounded-xl border border-white/10 bg-card text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-sm hover:shadow-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                isFirst && "sm:col-span-2",
              )}
            >
              <div className={cn("relative overflow-hidden", isFirst ? "aspect-[16/7]" : "aspect-[4/3]")}>
                <Image
                  src={src}
                  alt={caption}
                  fill
                  className="object-cover transition-all duration-500 group-hover:scale-[1.04]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 900px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
              <div className="flex items-center justify-between border-t border-white/5 px-5 py-4">
                <p className="text-sm font-medium text-foreground">{caption}</p>
                <span className="inline-flex size-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-muted-foreground transition-colors group-hover:border-primary/30 group-hover:text-primary">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                </span>
              </div>
            </button>
          );
        })}
      </div>

      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
          >
            <button
              type="button"
              onClick={closeLightbox}
              className="absolute right-4 top-4 z-10 inline-flex size-10 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Close"
            >
              <X aria-hidden="true" className="size-5" />
            </button>

            <button
              type="button"
              onClick={goPrev}
              className="absolute left-4 top-1/2 z-10 inline-flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Previous"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </button>

            <button
              type="button"
              onClick={goNext}
              className="absolute right-4 top-1/2 z-10 inline-flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Next"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </button>

            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              className="relative max-h-[85vh] max-w-[90vw]"
            >
              <Image
                src={images[lightboxIndex].src}
                alt={images[lightboxIndex].caption}
                width={1600}
                height={900}
                className="h-auto max-h-[85vh] w-auto max-w-[90vw] rounded-lg object-contain"
                unoptimized
              />
              <p className="mt-3 text-center text-sm text-white/70">
                {images[lightboxIndex].caption}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
