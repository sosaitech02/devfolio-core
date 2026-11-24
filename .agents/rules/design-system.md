# Design System & UI Craft Rules — `devfolio-core`

> **Single Source of Truth (Phase 3A Locked)**: Synchronized with [`.stitch/DESIGN.md`](../../.stitch/DESIGN.md) and Stitch Project `DevFolio Core V1 — Cruzmar Sosa` (`projects/1853127612835409612`). All Phase 3B UI implementation in `src/` MUST adhere strictly to these tokens and constraints.

## 1. Visual Identity & Aesthetic Guardrails
- **Direction**: **Precision Software Engineering — Cobalt & Electric Cyan** (editorial minimalism, architectural rigor, enterprise software clarity).
- **No graphic logo**: Never render a graphic logo file. Use clean typographic branding (`Cruzmar Sosa` / optional compact mono mark) built strictly through typography, color, and layout rhythm.
- **Banned patterns**: No AI purple/violet gradients, no pure `#000000`, no `Inter` font, no 3D/WebGL, no custom cursors, no heavy glassmorphism, no decorative circuit art, no emojis in UI chrome, no "scroll down" filler, no fake KPIs/metrics, and no personal phone number.

## 2. Locked Palette & Verified WCAG 2.2 AA Tokens
Define all tokens in `src/styles/globals.css` (`@theme inline` + CSS-first `prefers-color-scheme` + `data-theme`); zero ad-hoc hex colors in components.

- **Brand Anchors**: Deep Cobalt Indigo (`#233A8E`) · Electric Cyan (`#1DA4DF`).
- **Dark Mode (Default)**:
  - Canvas: `#070B14` · Surface: `#0D1424` · Elevated Surface: `#131D33` · Subtle Control: `#1A2742`
  - Text: Primary `#F1F5F9` (`17.97:1`) · Secondary `#94A3B8` (`7.17:1`) · Muted `#8899B4` (`5.80:1`)
  - Primary Action: Fill `#3B63D6` (`3.69:1` vs canvas; `#F8FAFC` text `5.09:1`) · Hover `#4C74E8` · Link `#7BA3FF` (`6.81:1`) · Brand Tonal Container `#233A8E`
  - Accent: `#1DA4DF` (`6.50:1` on surface; `#070B14` ink `6.96:1`) · Hover/Focus Ring `#38BDF8` (`8.58:1`)
  - Borders: Subtle `#1E293B` · Interactive Input Border `#5A6D8C` (`3.50:1`, WCAG 1.4.11)
  - Status: Success `#34D399` · Warning `#FBBF24` · Error `#F87171`
- **Light Mode (First-Class Parity)**:
  - Canvas: `#F8FAFC` · Surface: `#FFFFFF` · Elevated Surface: `#F1F5F9` · Subtle Control: `#E2E8F0`
  - Text: Primary `#0B1220` (`18.72:1`) · Secondary `#475569` (`7.58:1`) · Muted `#526075` (`5.83:1`)
  - Primary Action: Fill `#233A8E` (`10.16:1` with `#FFFFFF` text) · Hover `#1B2E73`
  - Accent: Text/Icon/Link **`#0369A1`** (`5.93:1` on `#FFFFFF`, `5.23:1` on `#E0F4FC`); raw `#1DA4DF` is **forbidden** for text/icons on light surfaces (`2.83:1`) and allowed only for decorative bars or solid chips with `#0B1220` ink (`6.62:1`)
  - Borders: Subtle `#E2E8F0` · Interactive Input Border `#64748B` (`4.76:1`, WCAG 1.4.11) · Focus Ring `#233A8E`
  - Status: Success `#047857` · Warning `#B45309` · Error `#B91C1C`

## 3. Typography & Bilingual Resilience
- **Pairing**: **Geist** (`--font-geist-sans`) for display/headings/body + **Geist Mono** (`--font-geist-mono`) for technical tags, dates (`tabular-nums`), status labels, and code blocks.
- **Fluid Scale (`clamp()`)**: Combine `rem + vw` with `max <= 2.5 × min` to preserve WCAG 1.4.4 200% zoom (`h1`: `clamp(2.25rem, 1.5rem + 2.4vw, 3.75rem)`, `h2`: `clamp(1.625rem, 1.25rem + 1.2vw, 2.25rem)`, body minimum `1rem` / `16px`).
- **Prose & i18n**: Cap reading width to `65ch`–`72ch`; allow flexible wrapping (`min-w-0`) so ES copy (15–25% longer than EN) never overflows or clips. Zero hardcoded visible text (`next-intl`).

## 4. Mobile-First Multi-Device Layout & Components
- **Reference Viewports**: Mobile `390×844` (base 4-col, `16px` gutter, `min-h` safe `dvh`) · Tablet `768×1024` (`md` 8-col, `24px`) · Laptop `1366×768` (`lg/xl` 12-col, compact Hero height) · Desktop `1440×900` (`2xl` 12-col, `max-w-[1280px]`).
- **Layout Engine**: CSS Grid + Flexbox + `@container` queries for component-driven cards; zero horizontal overflow; touch targets ≥ `44×44px` on coarse pointers (≥ `24×24px` minimum on fine pointers).
- **Primitives**: `shadcn/ui` (Radix UI) in `src/components/ui/` + `cn()` helper; border-first elevation (`rounded-xl` cards, `rounded-lg` buttons/inputs); asymmetric Hero & Featured Projects compositions (no generic 3-equal-card grids).

## 5. Accessibility (WCAG 2.2 AA)
- Semantic landmarks (`<header>`, `<nav aria-label>`, single `<main>`, `<article>`, `<footer>`), visible-on-focus skip link, strict `h1` → `h2` → `h3` hierarchy.
- Never convey state by color alone (always pair with icons/text); support `@media (forced-colors: active)` with real outlines/borders.
- Native `<button>`, `<a href>`, `<label for>`, `autocomplete`, `aria-describedby` error linking, and visible `2px` `:focus-visible` ring with `3px` offset.

## 6. Performance, Progressive Loading & Motion Budget
- **Core Web Vitals Targets**: LCP ≤ 2.5s · INP ≤ 200ms · CLS ≤ 0.1 · Lighthouse ≥ 95 across all 4 categories.
- **Server-First & Progressive Loading**: Keep routes, data, and MDX compilation in Server Components; isolate `"use client"` to leaf controls. Reserve `aspect-video` / `width`+`height` on all media. Use `fetchpriority="high"` + `loading="eager"` **only** on LCP images; use native `loading="lazy"` (without `fetchpriority="low"`) on below-the-fold images; apply `content-visibility: auto` + `contain-intrinsic-block-size` only to heavy below-the-fold sections.
- **Skeleton UI**: Match exact geometry (`CLS = 0`) strictly for async/streaming boundaries and image decoding; never hide static SSG content; disable shimmer under `prefers-reduced-motion: reduce`.
- **Functional Motion**: Animate only `transform` and `opacity`; opt into spatial animations inside `@media (prefers-reduced-motion: no-preference)` (no `0.01ms` global hack). Plan `/projects` → `/projects/[slug]` shared-element continuity via React 19 `<ViewTransition>` + Next.js 16 `<Link transitionTypes>`.
