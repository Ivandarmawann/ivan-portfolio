"use client";

import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { SectionShell } from "@/components/layout/section-shell";
import { SectionHeading } from "@/components/shared/section-heading";
import { certifications } from "@/data/certifications";

function useCardsPerPage() {
  const [cardsPerPage, setCardsPerPage] = useState(3);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setCardsPerPage(3);
      else if (window.innerWidth >= 640) setCardsPerPage(2);
      else setCardsPerPage(1);
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return cardsPerPage;
}

export function CertificationsSection({ embedded = false }: { embedded?: boolean }) {
  const cardsPerPage = useCardsPerPage();
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedCert, setSelectedCert] = useState<typeof certifications[number] | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  const totalPages = Math.ceil(certifications.length / cardsPerPage);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerWidth(entry.contentRect.width);
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const safePage = totalPages > 0 ? Math.min(currentPage, totalPages - 1) : 0;

  const goToPage = useCallback(
    (page: number) => {
      setCurrentPage(Math.max(0, Math.min(page, totalPages - 1)));
    },
    [totalPages],
  );

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedCert(null);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const groups = useMemo(() => {
    const result: (typeof certifications)[] = [];
    for (let i = 0; i < certifications.length; i += cardsPerPage) {
      result.push(certifications.slice(i, i + cardsPerPage));
    }
    return result;
  }, [cardsPerPage]);

  const carousel = (
    <>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <SectionHeading
          eyebrow="Certificates"
          title="Professional certifications."
          description="Industry-recognized credentials across software engineering, data analytics, databases, artificial intelligence, and development."
        />
      </motion.div>

      <div className="relative mt-10" ref={containerRef}>
        <div className="overflow-hidden rounded-xl">
          <motion.div
            className="flex"
            animate={{ x: containerWidth ? -safePage * containerWidth : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            drag={containerWidth > 0 ? "x" : false}
            dragConstraints={
              containerWidth > 0
                ? {
                    left: -(totalPages - 1) * containerWidth,
                    right: 0,
                  }
                : undefined
            }
            dragElastic={0.08}
            onDragEnd={(_, info) => {
              if (containerWidth <= 0) return;
              const threshold = containerWidth * 0.2;
              const velocity = info.velocity.x;
              if (info.offset.x < -threshold || velocity < -500) {
                goToPage(safePage + 1);
              } else if (info.offset.x > threshold || velocity > 500) {
                goToPage(safePage - 1);
              }
            }}
          >
            {groups.map((group, groupIndex) => (
              <div
                key={groupIndex}
                className="flex shrink-0 gap-4 sm:gap-5"
                style={{ width: containerWidth || "auto" }}
              >
                {group.map((cert) => (
                  <button
                    key={cert.title}
                    type="button"
                    onClick={() => setSelectedCert(cert)}
                    className="group flex min-w-0 flex-1 flex-col overflow-hidden rounded-xl border border-border bg-card text-left shadow-sm transition-all duration-200 hover:border-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <div className="relative aspect-[3/2] overflow-hidden bg-card">
                      <Image
                        src={cert.image}
                        alt={cert.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <div className="flex items-center justify-between gap-2">
                        <span className="truncate text-xs font-semibold uppercase tracking-[0.1em] text-primary">
                          {cert.issuer}
                        </span>
                        <span className="shrink-0 text-xs text-muted-foreground">
                          {cert.date}
                        </span>
                      </div>
                      <h3 className="mt-2 line-clamp-2 text-sm font-semibold leading-snug text-foreground">
                        {cert.title}
                      </h3>
                    </div>
                  </button>
                ))}
              </div>
            ))}
          </motion.div>
        </div>

        {totalPages > 1 && (
          <>
            <button
              type="button"
              onClick={() => goToPage(safePage - 1)}
              disabled={safePage === 0}
              className="absolute left-2 top-1/2 hidden -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/80 p-2 text-muted-foreground shadow-sm backdrop-blur transition-colors hover:text-foreground disabled:cursor-not-allowed disabled:opacity-30 sm:inline-flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Previous certificates"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => goToPage(safePage + 1)}
              disabled={safePage >= totalPages - 1}
              className="absolute right-2 top-1/2 hidden -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/80 p-2 text-muted-foreground shadow-sm backdrop-blur transition-colors hover:text-foreground disabled:cursor-not-allowed disabled:opacity-30 sm:inline-flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Next certificates"
            >
              <ChevronRight className="size-5" />
            </button>
          </>
        )}

        {totalPages > 1 && (
          <div className="mt-6 flex items-center justify-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goToPage(i)}
                className={`h-2 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                  i === safePage
                    ? "w-6 bg-primary"
                    : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
                aria-label={`Go to page ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative flex max-h-[90vh] max-w-[95vw] flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setSelectedCert(null)}
                className="absolute -top-12 right-0 inline-flex size-10 items-center justify-center rounded-full text-white/70 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                aria-label="Close lightbox"
              >
                <X className="size-6" />
              </button>
              <div className="relative max-h-[80vh] max-w-full overflow-hidden rounded-xl shadow-xl">
                <Image
                  src={selectedCert.image}
                  alt={selectedCert.title}
                  width={1200}
                  height={900}
                  className="h-auto max-h-[80vh] w-auto max-w-full object-contain"
                />
              </div>
              <div className="mt-4 text-center">
                <p className="text-base font-semibold text-white">
                  {selectedCert.title}
                </p>
                <p className="mt-1 text-sm text-white/60">
                  {selectedCert.issuer} &middot; {selectedCert.date}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );

  if (embedded) {
    return <div className="mt-16">{carousel}</div>;
  }

  return <SectionShell id="certifications">{carousel}</SectionShell>;
}
