"use client";

import { Check, Copy, ExternalLink, Mail, Smartphone } from "lucide-react";
import { motion } from "framer-motion";
import * as React from "react";

import { socials } from "@/data/socials";
import { cn } from "@/lib/utils";

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

const contactMethods = [
  { platform: "Email", icon: Mail, label: "mhmmdipand@gmail.com", href: "mailto:mhmmdipand@gmail.com", action: "Copy" },
  { platform: "GitHub", icon: ExternalLink, label: "github.com/ivandarmawann", href: "https://github.com/ivandarmawann", action: "Open" },
  { platform: "WhatsApp", icon: Smartphone, label: "+62 815-8537-2171", href: "https://wa.me/6281585372171", action: "Chat" },
  { platform: "X (Twitter)", icon: XIcon, label: "@mivannnn", href: "https://x.com/mivannnn", action: "Open" },
  { platform: "Instagram", icon: InstagramIcon, label: "@ivandrmawn", href: "https://instagram.com/ivandrmawn", action: "Open" },
];

const focusItems = [
  "Full-stack Development",
  "Data Analytics",
  "Machine Learning",
];

const availableItems = [
  "Internship",
  "Freelance",
  "Collaboration",
];

export function ContactSection() {
  const [copiedEmail, setCopiedEmail] = React.useState(false);

  const emailAddress = socials.find((s) => s.platform === "Email")?.href.replace("mailto:", "") ?? "";

  const handleCopyEmail = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(emailAddress);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      // Clipboard API unavailable
    }
  };

  return (
    <section id="contact" className="scroll-mt-20 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-6xl px-6 sm:px-8 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-primary">
            Contact
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Get In Touch
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-8 text-muted-foreground sm:text-lg">
            Open to collaboration, internship opportunities, or a conversation
            about software engineering, data analytics, and machine learning.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mx-auto mt-10 grid max-w-2xl gap-3 sm:mt-12"
        >
          {contactMethods.map((method) => {
            const isEmail = method.platform === "Email";
            const isExternal = method.href.startsWith("http");
            const Icon = method.icon;

            if (isEmail) {
              return (
                <a
                  key={method.platform}
                  href={method.href}
                  className="group flex items-center justify-between gap-3 rounded-xl border border-primary/20 bg-primary/[0.04] p-4 transition-all hover:bg-primary/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:p-5"
                >
                  <span className="flex items-center gap-3 min-w-0">
                    <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg border border-primary/20 bg-primary/[0.06] text-primary">
                      <Icon aria-hidden="true" className="size-4" />
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-semibold text-foreground">
                        {method.label}
                      </span>
                      <span className="mt-0.5 block text-xs text-muted-foreground">
                        {method.platform}
                      </span>
                    </span>
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className={cn(
                      "inline-flex size-9 shrink-0 items-center justify-center rounded-lg border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      copiedEmail
                        ? "border-green-500/30 bg-green-500/10 text-green-400"
                        : "border-border bg-secondary text-muted-foreground hover:text-foreground",
                    )}
                    aria-label={copiedEmail ? "Copied" : "Copy email"}
                  >
                    {copiedEmail ? (
                      <Check aria-hidden="true" className="size-4" />
                    ) : (
                      <Copy aria-hidden="true" className="size-4" />
                    )}
                  </button>
                </a>
              );
            }

            return (
              <a
                key={method.platform}
                href={method.href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noreferrer" : undefined}
                className="group flex items-center justify-between gap-3 rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/30 hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:p-5"
              >
                <span className="flex items-center gap-3 min-w-0">
                  <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg border border-border bg-secondary text-muted-foreground">
                    <Icon aria-hidden="true" className="size-4" />
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-semibold text-foreground">
                      {method.label}
                    </span>
                    <span className="mt-0.5 block text-xs text-muted-foreground">
                      {method.platform}
                    </span>
                  </span>
                </span>
                <span className="shrink-0 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground group-hover:text-foreground">
                  {method.action}
                </span>
              </a>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mx-auto mt-12 grid gap-4 sm:grid-cols-2 sm:gap-5 sm:mt-14"
        >
          <div className="rounded-xl border border-border bg-card p-5 sm:p-6">
            <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-primary">
              Current Focus
            </h3>
            <ul className="mt-4 space-y-2.5">
              {focusItems.map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-foreground">
                  <span className="inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Check aria-hidden="true" className="size-3" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-border bg-card p-5 sm:p-6">
            <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-primary">
              Available For
            </h3>
            <ul className="mt-4 space-y-2.5">
              {availableItems.map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-foreground">
                  <span className="inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Check aria-hidden="true" className="size-3" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto mt-10 flex items-center justify-center gap-6 text-xs text-muted-foreground"
        >
          <span className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-green-500" />
            Open for opportunities
          </span>
          <span className="h-3 w-px bg-border" />
          <span>Tangerang Selatan, Indonesia</span>
        </motion.div>
      </div>
    </section>
  );
}
