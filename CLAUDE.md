# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Dev server on port 3000 (0.0.0.0)
npm run build     # Production build
npm run preview   # Preview production build locally
npm run lint      # Type-check only (tsc --noEmit), no test runner
npm run clean     # Remove dist/
```

Env var required: `GEMINI_API_KEY` in `.env.local` (Gemini AI integration).

## Architecture

Single-page React 19 company profile, deployed to Vercel (`vercel.json` SPA rewrite).

**Page flow** (`src/App.tsx`): Navbar → Hero → About → Services → Methodology → ProductStage → Market → Contact → Footer, all wrapped in `HelmetProvider` + `ErrorBoundary`.

**Loading gate**: `Services` receives an `onReady` prop and calls it after the first canvas frame loads. `App` combines this with a mandatory 2.5s minimum delay before dismissing `LoadingScreen`.

**Section data** lives in `src/data/` as static TS exports — edit these to change content without touching components:
- `services.ts` — service cards
- `methodology.ts` — the 4 scroll-driven methodology points
- `products.ts` / `product-showcase.ts` — product listings
- `navigation.ts` — nav items

## Design System

Tailwind v4 with all tokens defined via `@theme` in `src/index.css` (no `tailwind.config.js`). Custom component classes (`.glass-panel`, `.dna-glass-card`, `.bg-grain`, etc.) live in `@layer components` in that same file.

Key brand tokens:
- `brand-bg`: `#09090b` (near-black background)
- `brand-accent`: `#0ea5e9` (sky blue — used for glows, borders, highlights)
- `brand-darker`: `#18181b`, `brand-darkborder`: `#27272a`
- Fonts: `font-serif` = Playfair Display, `font-sans` = Plus Jakarta Sans, `font-mono` = JetBrains Mono

## Animation Patterns

Uses `motion/react` (Motion v12, not Framer Motion). Always import from `'motion/react'`.

**Scroll-driven sections** (`Methodology`, `Services`, `Hero`): use `useScroll` + `useSpring` for smooth scroll tracking, then derive state/transforms from the spring value.

**Canvas performance rules** (followed in `Methodology` particles and `Services` frame player):
- Pre-render expensive effects (shadows, glows) to offscreen canvases once, then `drawImage` them per frame
- Use `useInView` to skip `requestAnimationFrame` renders when the canvas is off-screen
- Respect `useReducedMotion()` — skip or reduce motion animations

**Loading screen orchestration**: logo fades out first (600ms), then background fades (1s) — sequential, not parallel.

## Services Canvas Player

`src/components/sections/Services.tsx` plays 86 WebP frames from `public/frames/00001.webp`–`public/frames/00086.webp` on a `<canvas>`. Frame 1 is loaded first to unblock the loading gate; remaining frames load in the background. Scroll position drives frame index via `useScroll`.
