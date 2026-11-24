# Design System & UI Craft Rules

## Core Principles
- **Mobile-first responsive design**: Design and verify at 375px first, then scale cleanly through `sm`, `md`, `lg`, and `xl` breakpoints without horizontal overflow.
- **Tailwind CSS v4 + shadcn/ui**: Keep accessible primitives in `src/components/ui/` (Radix-backed, editable in-repo). Use the `cn()` helper in `src/lib/utils.ts` for conditional classes.
- **Semantic design tokens**: Define color, surface, border, radius, and typography tokens in `src/styles/globals.css` (or `src/app/globals.css` until moved in Phase 1). Avoid raw ad-hoc hex colors scattered across components.

## Light / Dark Mode & Accessibility
- **Theme parity**: Every surface, border, text color, badge, and code block must have balanced contrast in both light and dark modes.
- **WCAG AA minimum**: Contrast ratio ≥ 4.5:1 for normal text and ≥ 3:1 for large text and UI controls.
- **Keyboard & focus**: All interactive controls must use semantic HTML (`button`, `a`, `nav`, `main`), visible `focus-visible` rings, and descriptive `aria-label`s when icon-only.

## Motion & Performance Budget
- **Subtle motion only**: Transitions must feel fast and purposeful; always honor `prefers-reduced-motion`.
- **Media discipline**: Serve project screenshots as optimized WebP/AVIF via `next/image` with explicit dimensions and `sizes` attributes.
- **Performance target**: Maintain Lighthouse ≥ 95 across Performance, Accessibility, Best Practices, and SEO.

## Adopted Visual Tokens (Pending Visual References)
- *(Typography pairing, palette tokens, and layout rhythm will be locked here once visual references are reviewed in Phase 0/1.)*
