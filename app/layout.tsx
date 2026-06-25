import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import dynamic from "next/dynamic";

import { AuroraBackground } from "@/components/layout/aurora-background";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const AnimatedGrid = dynamic(() =>
  import("@/components/effects/animated-grid").then((m) => ({ default: m.AnimatedGrid }))
);

const CursorGlow = dynamic(() =>
  import("@/components/effects/cursor-glow").then((m) => ({ default: m.CursorGlow }))
);

const FloatingParticles = dynamic(() =>
  import("@/components/effects/floating-particles").then((m) => ({ default: m.FloatingParticles }))
);

const CommandPalette = dynamic(() =>
  import("@/components/effects/command-palette").then((m) => ({ default: m.CommandPalette }))
);

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Muhammad Ivan Darmawan | Full-Stack Developer & ML Developer",
    template: "%s | Muhammad Ivan Darmawan",
  },
  description:
    "Portfolio of Muhammad Ivan Darmawan — building intelligent digital systems through full-stack development, data analytics, and machine learning.",
  applicationName: "Muhammad Ivan Darmawan Portfolio",
  authors: [{ name: "Muhammad Ivan Darmawan" }],
  creator: "Muhammad Ivan Darmawan",
  keywords: [
    "Muhammad Ivan Darmawan",
    "software engineer",
    "full stack developer",
    "data analyst",
    "machine learning",
    "portfolio",
  ],
  openGraph: {
    title: "Muhammad Ivan Darmawan | Full-Stack Developer & ML Developer",
    description:
      "Building intelligent digital systems through full-stack development, data analytics, and machine learning.",
    siteName: "Muhammad Ivan Darmawan Portfolio",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Ivan Darmawan | Full-Stack Developer & ML Developer",
    description:
      "Building intelligent digital systems through full-stack development, data analytics, and machine learning.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} h-full scroll-smooth antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <AnimatedGrid />
          <AuroraBackground />
          <FloatingParticles />
          <CursorGlow />
          <CommandPalette />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
