<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Sleep Stage Prediction — Animation Refactoring (Jun 25 2026)

**Goal:** Remove all continuous/infinite animations, parallax, mouse tracking, particles, heavy blurs, and decorative motion from the Sleep Stage Prediction case study (`components/sleep/`). Keep only fade-in-on-viewport (`whileInView` + `viewport={{ once: true }}`), card hover scale (max 1.02), and button hover. Preserve layout, typography, colors, and premium AI aesthetic.

**Scope:** All 24 files in `components/sleep/` — 16 `.tsx` components were modified. The remaining 8 (utility `.ts` files, `ScrollReveal.tsx`, `AnimatedCounter.tsx`, `SleepStagePredictionLayout.tsx`, index, page) were left untouched.

**Changes made in this session:**

| Component | Removed animations |
|---|---|
| `ParticleBackground.tsx` | Returns `null` entirely |
| `BackgroundEffects.tsx` | Aurora CSS animation, mouse-following blob, 60 animated falling stars → 30 static stars drawn once via canvas, no `requestAnimationFrame` loop |
| `Hero.tsx` | Mouse parallax on bg circles, infinite ECG path animation, SVG glow filter, neural network pulsing opacity, PredictionCard live update interval, PipelineIndicator rotation, chevron scroll bounce |
| `Metrics.tsx` | `whileHover={{ y: -6 }}`, `group-hover` radial gradient overlay, `group-hover:scale-110 group-hover:rotate-[-5deg]` icon, glow bottom bar |
| `Dataset.tsx` | `whileHover={{ y: -2 }}` on sensor & stage distribution cards (3 occurrences) |
| `Pipeline.tsx` | `DataParticle` component, `AnimatePresence` hover tooltip, `whileHover={{ scale: 1.02 }}`, arrow `repeat: Infinity` bounce, pulsing LIVE dot |
| `Architecture.tsx` | Hover tooltip, pulsing dot with `repeat: Infinity`, `whileHover={{ y: -3, scale: 1.02 }}` |
| `Charts.tsx` | `animationDuration`/`animationEasing`/`animationBegin` → `isAnimationActive={false}` on all Area elements; removed `useInView`, `useMediaQuery`, isMobile |
| `Results.tsx` | Mouse glow follower circle, `isInView`/`useInView` replaced with `whileInView` |
| `Gallery.tsx` | `whileHover={{ y: -4, scale: 1.02 }}` on cards, `Maximize2` overlay, `whileHover`/`whileTap` on modal nav buttons, `useMediaQuery`/`isMobile` |
| `Demo.tsx` | Infinite spinner `animate={{ rotate: 360, repeat: Infinity }}`, `whileHover={{ scale: 1.02 }}` on buttons, `Download` icon import |
| `ConfusionMatrix.tsx` | `whileHover={{ scale: 1.08, zIndex: 10 }}` on matrix cells, `whileHover={{ x: 4 }}` on observation cards |
| `TechnicalCredibility.tsx` | Already clean (only `whileInView` fade-in, no infinite animations) — no changes needed |
| `Applications.tsx` | `useTilt` hook/import, `whileHover={{ y: -4 }}`, `group-hover:scale-110 group-hover:rotate-[-5deg]`, `group-hover:opacity-100` radial gradient + "Learn more" link, `ArrowUpRight` icon |
| `Achievements.tsx` | `stagger`/`childVariant` framer-motion variants replaced with simple `ScrollReveal` per item |
| `Timeline.tsx` | `hovered` state, `AnimatePresence` + details tooltip, `whileHover={{ x: 4 }}`, glow box-shadow on hover |
| `Footer.tsx` | `whileHover={{ scale: 1.1, y: -2 }}` + `whileTap{{ scale: 0.95 }}` on social links and scroll-to-top button |
| `Problem.tsx` | `useRef`/`useInView`/`isInView` → all `animate={isInView ...}` replaced with `whileInView` + `viewport={{ once: true }}` |
| `TechStack.tsx` | Infinite marquee `animate={{ x: [0, -1920], repeat: Infinity }}`, `whileHover` on tech cards (scale, y, rotate, boxShadow) — replaced with static flex-wrap grid + `hover:scale-105` CSS |

**Build status:** `npm run build` passes with zero errors.

**Follow-up (low priority):**
- `useHooks.ts` exports `useMousePosition` and `useTilt` — no longer imported by any component, could be cleaned up
- `components/sleep/mobile/` directory exists but is unused after dropping the dual-render approach
- `useMediaQuery.ts` in `components/sleep/` is imported by components/sleep/Gallery.tsx — import removed; file could be cleaned up
