"use client";

import { FloatingNav } from "@/components/layout/floating-nav";
import dynamic from "next/dynamic";

const ParticleBackground = dynamic(() => import("@/components/sleep/ParticleBackground"), { ssr: false });
const BackgroundEffects = dynamic(() => import("@/components/sleep/BackgroundEffects"), { ssr: false });
const Hero = dynamic(() => import("@/components/sleep/Hero"), { ssr: false });
const Metrics = dynamic(() => import("@/components/sleep/Metrics"), { ssr: false });
const Problem = dynamic(() => import("@/components/sleep/Problem"), { ssr: false });
const Dataset = dynamic(() => import("@/components/sleep/Dataset"), { ssr: false });
const Pipeline = dynamic(() => import("@/components/sleep/Pipeline"), { ssr: false });
const Architecture = dynamic(() => import("@/components/sleep/Architecture"), { ssr: false });
const Charts = dynamic(() => import("@/components/sleep/Charts"), { ssr: false });
const ConfusionMatrix = dynamic(() => import("@/components/sleep/ConfusionMatrix"), { ssr: false });
const Results = dynamic(() => import("@/components/sleep/Results"), { ssr: false });
const TechnicalCredibility = dynamic(() => import("@/components/sleep/TechnicalCredibility"), { ssr: false });
const Applications = dynamic(() => import("@/components/sleep/Applications"), { ssr: false });
const TechStack = dynamic(() => import("@/components/sleep/TechStack"), { ssr: false });
const Achievements = dynamic(() => import("@/components/sleep/Achievements"), { ssr: false });
const Demo = dynamic(() => import("@/components/sleep/Demo"), { ssr: false });
const Gallery = dynamic(() => import("@/components/sleep/Gallery"), { ssr: false });
const Timeline = dynamic(() => import("@/components/sleep/Timeline"), { ssr: false });
const Footer = dynamic(() => import("@/components/sleep/Footer"), { ssr: false });
const SectionDivider = dynamic(() => import("@/components/sleep/SectionDivider"), { ssr: false });

export default function SleepStageCaseStudy() {
  return (
    <>
      <FloatingNav />
      <ParticleBackground />
      <BackgroundEffects />
      <div className="aurora-bg relative z-[1] pt-14">
        <Hero />
        <SectionDivider />
        <Metrics />
        <SectionDivider />
        <Problem />
        <SectionDivider />
        <Dataset />
        <SectionDivider />
        <Pipeline />
        <SectionDivider />
        <Architecture />
        <SectionDivider />
        <Charts />
        <SectionDivider />
        <ConfusionMatrix />
        <SectionDivider />
        <Results />
        <SectionDivider />
        <TechnicalCredibility />
        <SectionDivider />
        <Applications />
        <SectionDivider />
        <TechStack />
        <SectionDivider />
        <Achievements />
        <SectionDivider />
        <Demo />
        <SectionDivider />
        <Gallery />
        <SectionDivider />
        <Timeline />
        <SectionDivider />
        <Footer />
      </div>
    </>
  );
}
