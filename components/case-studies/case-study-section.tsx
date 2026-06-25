"use client";

import { cn } from "@/lib/utils";

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

type CaseStudySectionProps = {
  id?: string;
  children: React.ReactNode;
  className?: string;
};

export function CaseStudySection({ id, children, className }: CaseStudySectionProps) {
  return (
    <section id={id} className={cn("scroll-mt-28 py-16 sm:py-20 lg:py-24", className)}>
      <div className="mx-auto w-full max-w-6xl px-6 sm:px-8 lg:px-10">{children}</div>
    </section>
  );
}
