"use client";

import { ArrowLeft, ChevronRight, Layout, Lock, Search, ShoppingCart, Store, Users, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const techStack = [
  "Python", "Flask", "SQLAlchemy", "SQLite", "Bootstrap", "JavaScript", "HTML", "CSS",
];

const features = [
  { title: "Product Listing Management", description: "Users can create, edit, and manage product listings with images, descriptions, pricing, and category assignment through an intuitive interface.", icon: ShoppingCart },
  { title: "Product Search and Category Filtering", description: "Full-text search across product titles and descriptions with real-time filtering by category, helping students find what they need quickly.", icon: Search },
  { title: "Buyer Dashboard", description: "Personalized dashboard for buyers to track orders, view purchase history, manage favorites, and monitor ongoing transactions.", icon: Users },
  { title: "Seller Dashboard", description: "Analytics dashboard for sellers to monitor listing performance, track sales, manage inventory, and view customer engagement metrics.", icon: Store },
  { title: "Product Detail Pages", description: "Rich product detail pages with high-resolution images, specifications, seller information, and related product recommendations.", icon: Layout },
  { title: "Responsive User Interface", description: "Bootstrap-themed responsive design that works seamlessly across desktop, tablet, and mobile devices for on-the-go campus access.", icon: Layout },
  { title: "Campus Marketplace Experience", description: "Tailored for the UPJ academic community with campus-centric categories, student verification, and community-driven trust features.", icon: ChevronRight },
];

const galleryImages = [
  { src: "/projects/upj-marketplace/hero.jpg", caption: "Homepage — Marketplace Overview" },
  { src: "/projects/upj-marketplace/catalog.jpg", caption: "Product Catalog — Category Browsing" },
  { src: "/projects/upj-marketplace/product-detail.jpg", caption: "Product Detail — Item View" },
  { src: "/projects/upj-marketplace/seller-dashboard.jpg", caption: "Seller Dashboard — Analytics & Listings" },
  { src: "/projects/upj-marketplace/buyer-dashboard.jpg", caption: "Buyer Dashboard — Orders & Activity" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function UPJMarketplaceCaseStudy() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Hero />
      <Overview />
      <FeaturesSection />
      <TechStackSection />
      <GallerySection />
      <CTASection />
    </div>
  );
}

function SectionWrapper({ id, children, className }: { id?: string; children: React.ReactNode; className?: string }) {
  return (
    <section id={id} className={cn("scroll-mt-28 py-16 sm:py-20 lg:py-24", className)}>
      <div className="mx-auto w-full max-w-6xl px-6 sm:px-8 lg:px-10">{children}</div>
    </section>
  );
}

function Hero() {
  return (
    <div className="relative isolate flex min-h-[70vh] items-center overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          animate={{ x: [0, 20, -10, 0], y: [0, -15, 8, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-[-16rem] top-10 size-[34rem] rounded-full bg-glow-cyan/15 blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -18, 14, 0], y: [0, 18, -8, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-14rem] right-[-12rem] size-[38rem] rounded-full bg-glow-violet/15 blur-3xl"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(circle_at_center,black,transparent_65%)]" />
      </div>

      <SectionWrapper className="w-full py-0">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.15fr]">
          <motion.div initial="hidden" animate="visible" transition={{ staggerChildren: 0.08 }}>
            <motion.div variants={fadeUp} transition={{ duration: 0.5 }}>
              <Link href="/#projects" className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                <ArrowLeft aria-hidden="true" className="size-4" />
                Back to Projects
              </Link>
            </motion.div>

            <motion.div variants={fadeUp} transition={{ duration: 0.55 }}>
              <span className="inline-flex rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-primary backdrop-blur">
                Full-Stack Web Development
              </span>
            </motion.div>

            <motion.h1 variants={fadeUp} transition={{ duration: 0.6 }} className="mt-6 max-w-4xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              UPJ Marketplace
              <span className="mt-2 block text-lg font-semibold tracking-normal text-muted-foreground sm:text-xl lg:text-2xl">
                Campus Marketplace Platform for UPJ Students
              </span>
            </motion.h1>

            <motion.p variants={fadeUp} transition={{ duration: 0.6 }} className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl sm:leading-9">
              A full-stack campus marketplace platform built with Flask and SQLAlchemy that enables students to buy and sell academic materials, electronics, fashion items, and personal goods.
            </motion.p>

            <motion.div variants={fadeUp} transition={{ duration: 0.55 }} className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="h-11 rounded-full px-6 text-sm">
                <a href="#overview">
                  Explore Case Study
                  <ChevronRight aria-hidden="true" className="ml-1 size-4" />
                </a>
              </Button>
              <Button variant="outline" size="lg" disabled title="Repository is not publicly available yet" className="group relative h-11 cursor-not-allowed rounded-full border-white/10 bg-white/[0.04] px-6 text-sm text-muted-foreground/60 opacity-60">
                <Lock aria-hidden="true" className="mr-1 size-4" />
                Source Code (Private)
              </Button>
            </motion.div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }} className="relative mx-auto w-full max-w-xl">
            <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-card shadow-2xl shadow-black/30">
              <Image src="/projects/upj-marketplace/hero.jpg" alt="UPJ Marketplace homepage" fill className="object-cover transition-all duration-500 group-hover:scale-[1.03]" sizes="(max-width: 640px) 100vw, 50vw" priority />
              <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />
            </div>
          </motion.div>
        </div>
      </SectionWrapper>
    </div>
  );
}

function Overview() {
  return (
    <SectionWrapper id="overview">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} transition={{ staggerChildren: 0.1 }} className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
        <motion.div variants={fadeUp} transition={{ duration: 0.5 }}>
          <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">Overview</h2>
          <p className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">A campus marketplace for the UPJ community</p>
          <p className="mt-5 text-base leading-8 text-muted-foreground">
            UPJ Marketplace is a campus-focused marketplace platform developed for Universitas Pembangunan Jaya students and academic communities. The platform enables users to buy and sell academic materials, electronics, fashion items, and personal goods through a modern web-based interface.
          </p>
          <p className="mt-4 text-base leading-8 text-muted-foreground">
            Key features include product management, category filtering, seller analytics dashboards, buyer activity tracking, and responsive user experiences designed for campus communities. The platform replaces scattered chat groups and informal posts with a structured, searchable marketplace.
          </p>
        </motion.div>

        <motion.div variants={fadeUp} transition={{ duration: 0.5, delay: 0.1 }} className="rounded-2xl border border-white/10 bg-white/[0.045] p-6 backdrop-blur-xl">
          <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Key Details</h3>
          <dl className="mt-5 space-y-4">
            {[
              { term: "Category", desc: "Full-Stack Web Development" },
              { term: "Role", desc: "Full-Stack Web Developer" },
              { term: "Framework", desc: "Flask (Python)" },
              { term: "Status", desc: "Production Ready" },
            ].map(({ term, desc }) => (
              <div key={term} className="flex items-baseline justify-between gap-4">
                <dt className="text-sm text-muted-foreground">{term}</dt>
                <dd className="text-sm font-medium text-foreground">{desc}</dd>
              </div>
            ))}
          </dl>
        </motion.div>
      </motion.div>
    </SectionWrapper>
  );
}

function FeaturesSection() {
  return (
    <SectionWrapper>
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} transition={{ staggerChildren: 0.08 }}>
        <motion.div variants={fadeUp} transition={{ duration: 0.5 }}>
          <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">Key Features</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">What the platform offers</p>
        </motion.div>

        <motion.div variants={fadeUp} transition={{ duration: 0.5, delay: 0.1 }} className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ title, description, icon: Icon }) => (
            <div key={title} className="rounded-2xl border border-white/10 bg-white/[0.045] p-6 backdrop-blur-xl transition-colors hover:border-primary/25">
              <span className="inline-flex size-12 items-center justify-center rounded-xl border border-primary/20 bg-primary/[0.08] text-primary">
                <Icon aria-hidden="true" className="size-5" />
              </span>
              <h3 className="mt-5 text-lg font-bold text-foreground">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{description}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </SectionWrapper>
  );
}

function TechStackSection() {
  return (
    <SectionWrapper>
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} transition={{ staggerChildren: 0.06 }}>
        <motion.div variants={fadeUp} transition={{ duration: 0.5 }}>
          <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">Technology Stack</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Tools &amp; frameworks used</p>
        </motion.div>

        <motion.div variants={fadeUp} transition={{ duration: 0.5, delay: 0.1 }} className="mt-8 flex flex-wrap gap-3">
          {techStack.map((tech) => (
            <span key={tech} className="rounded-full border border-white/10 bg-white/[0.04] px-5 py-2.5 text-sm font-medium text-foreground backdrop-blur transition-colors hover:border-primary/30">
              {tech}
            </span>
          ))}
        </motion.div>
      </motion.div>
    </SectionWrapper>
  );
}

function GallerySection() {
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

  const goNext = () => setLightboxIndex((i) => (i + 1) % galleryImages.length);
  const goPrev = () => setLightboxIndex((i) => (i - 1 + galleryImages.length) % galleryImages.length);

  return (
    <SectionWrapper>
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} transition={{ staggerChildren: 0.08 }}>
        <motion.div variants={fadeUp} transition={{ duration: 0.5 }}>
          <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">Screenshot Gallery</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Platform walkthrough</p>
        </motion.div>

        <motion.div variants={fadeUp} transition={{ duration: 0.5, delay: 0.1 }} className="mt-8 grid gap-5 sm:grid-cols-2">
          {galleryImages.map(({ src, caption }, index) => {
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
                  <Image src={src} alt={caption} fill className="object-cover transition-all duration-500 group-hover:scale-[1.04]" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 900px" />
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
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
          >
            <button type="button" onClick={closeLightbox} className="absolute right-4 top-4 z-10 inline-flex size-10 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label="Close">
              <X aria-hidden="true" className="size-5" />
            </button>

            <button type="button" onClick={goPrev} className="absolute left-4 top-1/2 z-10 inline-flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label="Previous">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </button>

            <button type="button" onClick={goNext} className="absolute right-4 top-1/2 z-10 inline-flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label="Next">
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
                src={galleryImages[lightboxIndex].src}
                alt={galleryImages[lightboxIndex].caption}
                width={1600}
                height={900}
                className="h-auto max-h-[85vh] w-auto max-w-[90vw] rounded-lg object-contain"
                unoptimized
              />
              <p className="mt-3 text-center text-sm text-white/70">
                {galleryImages[lightboxIndex].caption}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </SectionWrapper>
  );
}

function CTASection() {
  return (
    <SectionWrapper id="cta">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} transition={{ staggerChildren: 0.1 }} className="rounded-3xl border border-white/10 bg-white/[0.045] p-8 text-center backdrop-blur-xl sm:p-12 lg:p-16">
        <motion.h2 variants={fadeUp} transition={{ duration: 0.5 }} className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Explore the project
        </motion.h2>
        <motion.p variants={fadeUp} transition={{ duration: 0.5, delay: 0.05 }} className="mt-4 text-base text-muted-foreground">
          Learn more about the development process and technical decisions.
        </motion.p>
        <motion.div variants={fadeUp} transition={{ duration: 0.5, delay: 0.15 }} className="mt-8">
          <Link href="/#projects" className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
            <ArrowLeft aria-hidden="true" className="size-4" />
            Back to all projects
          </Link>
        </motion.div>
      </motion.div>
    </SectionWrapper>
  );
}
