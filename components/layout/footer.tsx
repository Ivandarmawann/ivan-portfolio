import { Code2, ExternalLink } from "lucide-react";

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

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "Capabilities", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const socialLinks = [
  { label: "GitHub", href: "https://github.com/ivandarmawann", icon: Code2 },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/ivandarmawann/", icon: ExternalLink },
  { label: "X (Twitter)", href: "https://x.com/mivannnn", icon: XIcon },
  { label: "Instagram", href: "https://instagram.com/ivandrmawn", icon: InstagramIcon },
];

type FooterProps = {
  className?: string;
};

export function Footer({ className }: FooterProps) {
  return (
    <footer className={cn("border-t border-border bg-background pb-6 pt-12 sm:pb-0 sm:pt-16", className)}>
      <div className="mx-auto w-full max-w-6xl px-6 sm:px-8 lg:px-10">
        <div className="grid gap-10 sm:grid-cols-3">
          <div>
            <p className="text-base font-bold text-foreground">
              Muhammad Ivan Darmawan
            </p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Full-Stack Developer
            </p>
            <p className="text-sm leading-6 text-muted-foreground">
              Data Analyst
            </p>
            <p className="text-sm leading-6 text-muted-foreground">
              AI & Machine Learning Enthusiast
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Quick Links
            </p>
            <ul className="mt-4 space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Socials
            </p>
            <ul className="mt-4 space-y-2.5">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-foreground transition-colors hover:text-primary"
                    >
                      <Icon aria-hidden="true" className="size-4" />
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 text-center text-xs text-muted-foreground sm:mt-12">
          &copy; 2026 Muhammad Ivan Darmawan
        </div>
      </div>
    </footer>
  );
}
