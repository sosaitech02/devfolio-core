# Design System: DevFolio Core V1 — Cruzmar Sosa

- **Project**: `DevFolio Core V1 — Cruzmar Sosa`
- **Stitch Project ID**: `1853127612835409612` (`projects/1853127612835409612`)
- **Author / Subject**: Cruzmar Ramón Sosa Rubí — Software Architect & Full Stack Software Engineer
- **Aesthetic Direction**: **Precision Software Engineering — Cobalt & Electric Cyan**
- **Target Stack (Phase 3B)**: Next.js 16 (App Router) · React 19 · Tailwind CSS v4 · shadcn/ui (Radix) · `next-intl` (`es` / `en`) · CSS-first Light/Dark Theme
- **Default Theme**: Dark Mode (`#070B14`), with full first-class Light Mode parity (`#F8FAFC`)
- **Brand Mark Policy**: Strictly **no graphic logo**. Identity is built purely through disciplined typography, Cobalt/Cyan chromatic restraint, editorial grid rhythm, and an optional minimal typographic wordmark (`cruzmar.sosa` / `CS` mono badge).

---

## 1. Visual Theme & Atmosphere

**Precision Software Engineering** balances the clarity of an architectural blueprint with the restraint of a technical monograph. The interface feels calm, structured, and authoritative — designed to present real enterprise software engineering (ERP systems, REST APIs, relational database optimization, full-stack web products, and AI-assisted workflows) rather than decorative developer tropes.

- **Density**: `5 / 10` — Balanced editorial density. Generous negative space isolates the Hero value proposition and case study narratives; structured grids keep technical metadata scannable.
- **Structural Variance**: `6 / 10` — Confident asymmetric compositions on desktop (12-column editorial splits, featured flagship card + supporting cards, sticky reading rail on case studies), collapsing cleanly into single-column vertical flow on mobile.
- **Motion Intensity**: `4 / 10` — Purposeful, hardware-accelerated micro-interactions and native React 19 `ViewTransition` continuity. Zero decorative bounce, zero perpetual glow loops, full compliance with `prefers-reduced-motion`.
- **Atmosphere**: Deep oceanic obsidian canvases in Dark Mode (`#070B14`) layered with crisp slate-navy surfaces (`#0D1424`, `#131D33`) separated by hairline cool-slate borders (`1px solid #1E293B`), anchored by Deep Cobalt Indigo (`#233A8E` / calibrated `#3B63D6`) and surgical Electric Cyan (`#1DA4DF`) technical accents. In Light Mode, cool architectural alabaster (`#F8FAFC`) and crisp pure paper surfaces (`#FFFFFF`) keep the exact same structural rigor.

---

## 2. Color Palette, Semantic Tokens & WCAG 2.2 AA Verification

No raw hex colors are applied ad hoc in components. Every token is separated by functional role (canvas, surface, text, primary interactive, accent, border, focus ring, and semantic status) and verified mathematically against **WCAG 2.2 AA** (`≥ 4.5:1` normal text, `≥ 3.0:1` large text & non-text UI boundaries per SC 1.4.3 and 1.4.11).

### 2.1 Core Brand Identity
- **Deep Cobalt Indigo** (`#233A8E`) — Primary architectural brand anchor (authoritative engineering tone, Light Mode primary interactive fill/text, Dark Mode structural accents and deep tonal containers).
- **Electric Cyan** (`#1DA4DF`) — Precision technical accent (Dark Mode interactive highlights, active indicators, technical telemetry labels, subtle accent underlines; restricted in Light Mode to decorative accents or high-contrast chips with dark ink `#0B1220`).

### 2.2 Dark Mode Tokens (Default)

| Semantic Token | Descriptive Name | Hex / Value | Functional Role |
| :--- | :--- | :---: | :--- |
| `--bg-canvas` | Deep Obsidian Navy | `#070B14` | Primary page canvas (never pure `#000000`) |
| `--bg-surface` | Midnight Slate Surface | `#0D1424` | Primary cards, sticky header surface, case study containers |
| `--bg-surface-elevated` | Elevated Indigo Slate | `#131D33` | Nested cards, code blocks, active filter pills, hover surfaces |
| `--bg-surface-subtle` | Tinted Slate Control | `#1A2742` | Secondary button hover, active nav indicator, skeleton base |
| `--text-primary` | Crisp Polar White | `#F1F5F9` | Primary headings, body copy, high-emphasis labels |
| `--text-secondary` | Cool Engineering Slate | `#94A3B8` | Supporting descriptions, timelines, body metadata |
| `--text-muted` | Calibrated Muted Slate | `#8899B4` | Monospace timestamps, captions, secondary tags |
| `--primary-fill` | Calibrated Cobalt Action | `#3B63D6` | Primary CTA fill in Dark Mode (meets ≥ 3:1 boundary vs canvas & ≥ 4.5:1 white text) |
| `--primary-fill-hover` | Bright Cobalt Hover | `#4C74E8` | Primary CTA hover state |
| `--primary-foreground` | Pure Snow Ink | `#F8FAFC` | Text and icons on primary Cobalt buttons |
| `--primary-brand-deep` | Deep Cobalt Indigo | `#233A8E` | Brand tonal containers, subtle editorial bands (`rgba(35,58,142,0.22)`) |
| `--primary-text` | Luminous Cobalt Link | `#7BA3FF` | Inline links and cobalt emphasis on dark surfaces |
| `--accent` | Electric Cyan | `#1DA4DF` | Active indicators, mono metadata highlights, subtle active underlines |
| `--accent-hover` | Bright Sky Cyan | `#38BDF8` | Accent hover state and keyboard focus ring |
| `--accent-foreground` | Deep Obsidian Ink | `#070B14` | Text on solid Electric Cyan pills/buttons |
| `--border-subtle` | Hairline Slate Border | `#1E293B` | Structural card dividers, section rules, table borders |
| `--border-interactive` | Accessible Input Border | `#5A6D8C` | Form inputs, checkboxes, interactive control outlines (`≥ 3:1` UI contrast) |
| `--focus-ring` | High-Contrast Cyan Ring | `#38BDF8` | `2px solid` `:focus-visible` outline with `3px` offset |
| `--status-success` | Emerald Signal | `#34D399` | Published / Available status text & icons (paired with icon + text label) |
| `--status-warning` | Amber Engineering | `#FBBF24` | In-progress project status text & icons |
| `--status-error` | Coral Alert | `#F87171` | Form validation errors and destructive notices |

### 2.3 Light Mode Tokens (Complete First-Class Parity)

| Semantic Token | Descriptive Name | Hex / Value | Functional Role |
| :--- | :--- | :---: | :--- |
| `--bg-canvas` | Cool Architectural Alabaster | `#F8FAFC` | Primary page canvas |
| `--bg-surface` | Crisp Drafting White | `#FFFFFF` | Primary cards, sticky header, contact form container |
| `--bg-surface-elevated` | Soft Ice Slate | `#F1F5F9` | Nested surfaces, code blocks, filter bar, skeleton base |
| `--bg-surface-subtle` | Muted Steel Tint | `#E2E8F0` | Subtle hover backgrounds, skeleton shimmer highlight |
| `--text-primary` | Deep Carbon Navy | `#0B1220` | Primary headings, body copy, wordmark |
| `--text-secondary` | Precision Slate Gray | `#475569` | Body descriptions, experience details, secondary copy |
| `--text-muted` | Accessible Steel Muted | `#526075` | Captions, dates, secondary mono annotations |
| `--primary-fill` | Deep Cobalt Indigo | `#233A8E` | Primary CTA fill, primary interactive brand text & active tabs |
| `--primary-fill-hover` | Midnight Cobalt Hover | `#1B2E73` | Primary CTA hover state |
| `--primary-foreground` | Pure Paper White | `#FFFFFF` | Text and icons on primary Cobalt buttons |
| `--accent-decorative` | Electric Cyan | `#1DA4DF` | Decorative hairlines, progress accents, or badge fills **only** with `#0B1220` ink |
| `--accent-text` | Deep Accessible Cyan | `#0369A1` | Accessible Cyan links, mono labels, and icons on light surfaces (`#FFFFFF` / `#F8FAFC` / `#E0F4FC`) |
| `--accent-tint` | Frost Cyan Surface | `#E0F4FC` | Soft highlight background for primary tech badges and callouts |
| `--border-subtle` | Drafting Line Gray | `#E2E8F0` | Structural card borders, section dividers, table rules |
| `--border-interactive` | Accessible Slate Border | `#64748B` | Input fields, checkboxes, radio controls (`≥ 3:1` WCAG 1.4.11) |
| `--focus-ring` | Deep Cobalt Ring | `#233A8E` | `2px solid` `:focus-visible` outline with `3px` offset |
| `--status-success` | Deep Emerald | `#047857` | Published / Available status text & icons |
| `--status-warning` | Deep Amber | `#B45309` | In-progress project status text & icons |
| `--status-error` | Crimson Alert | `#B91C1C` | Form validation errors |

### 2.4 Verified Contrast Matrix (WCAG 2.2 AA — Computed Ratios)

| Mode | Foreground / Boundary | Background | Computed Ratio | WCAG 2.2 AA Requirement | Result |
| :--- | :--- | :--- | :---: | :---: | :---: |
| **Dark** | `#F1F5F9` (`--text-primary`) | `#070B14` (`--bg-canvas`) | **17.97:1** | ≥ 4.5:1 (Text) | PASS (AAA) |
| **Dark** | `#F1F5F9` (`--text-primary`) | `#0D1424` (`--bg-surface`) | **16.78:1** | ≥ 4.5:1 (Text) | PASS (AAA) |
| **Dark** | `#94A3B8` (`--text-secondary`) | `#0D1424` (`--bg-surface`) | **7.17:1** | ≥ 4.5:1 (Text) | PASS (AAA) |
| **Dark** | `#8899B4` (`--text-muted`) | `#131D33` (`--bg-surface-elevated`) | **5.80:1** | ≥ 4.5:1 (Text) | PASS (AA) |
| **Dark** | `#F8FAFC` (`--primary-foreground`) | `#3B63D6` (`--primary-fill`) | **5.09:1** | ≥ 4.5:1 (Text) | PASS (AA) |
| **Dark** | `#3B63D6` (`--primary-fill` boundary) | `#070B14` (`--bg-canvas`) | **3.69:1** | ≥ 3.0:1 (SC 1.4.11) | PASS (AA) |
| **Dark** | `#3B63D6` (`--primary-fill` boundary) | `#0D1424` (`--bg-surface`) | **3.45:1** | ≥ 3.0:1 (SC 1.4.11) | PASS (AA) |
| **Dark** | `#7BA3FF` (`--primary-text`) | `#131D33` (`--bg-surface-elevated`) | **6.81:1** | ≥ 4.5:1 (Text) | PASS (AA) |
| **Dark** | `#1DA4DF` (`--accent`) | `#070B14` / `#0D1424` / `#131D33` | **6.96 / 6.50 / 5.94:1** | ≥ 4.5:1 (Text & UI) | PASS (AA) |
| **Dark** | `#070B14` (`--accent-foreground`) | `#1DA4DF` (`--accent`) | **6.96:1** | ≥ 4.5:1 (Text) | PASS (AA) |
| **Dark** | `#5A6D8C` (`--border-interactive`) | `#0D1424` (`--bg-surface`) | **3.50:1** | ≥ 3.0:1 (SC 1.4.11) | PASS (AA) |
| **Dark** | `#38BDF8` (`--focus-ring`) | `#0D1424` (`--bg-surface`) | **8.58:1** | ≥ 3.0:1 (SC 1.4.11/2.4.7) | PASS (AAA) |
| **Dark** | `#34D399` / `#FBBF24` / `#F87171` | `#0D1424` (`--bg-surface`) | **9.56 / 11.01 / 6.64:1** | ≥ 4.5:1 (Text) | PASS (AA+) |
| **Light** | `#0B1220` (`--text-primary`) | `#F8FAFC` / `#FFFFFF` | **17.89 / 18.72:1** | ≥ 4.5:1 (Text) | PASS (AAA) |
| **Light** | `#475569` (`--text-secondary`) | `#F8FAFC` / `#FFFFFF` / `#F1F5F9` | **7.24 / 7.58 / 6.92:1** | ≥ 4.5:1 (Text) | PASS (AA+) |
| **Light** | `#526075` (`--text-muted`) | `#F1F5F9` (`--bg-surface-elevated`) | **5.83:1** | ≥ 4.5:1 (Text) | PASS (AA) |
| **Light** | `#233A8E` (`--primary-fill`) | `#F8FAFC` / `#FFFFFF` | **9.71 / 10.16:1** | ≥ 4.5:1 (Text & UI) | PASS (AAA) |
| **Light** | `#FFFFFF` (`--primary-foreground`) | `#233A8E` (`--primary-fill`) | **10.16:1** | ≥ 4.5:1 (Text) | PASS (AAA) |
| **Light** | `#0B1220` (Ink) | `#1DA4DF` (`--accent-decorative`) | **6.62:1** | ≥ 4.5:1 (Text) | PASS (AA) |
| **Light** | `#0369A1` (`--accent-text`) | `#FFFFFF` / `#F8FAFC` / `#E0F4FC` | **5.93 / 5.67 / 5.23:1** | ≥ 4.5:1 (Text & UI) | PASS (AA) |
| **Light** | `#64748B` (`--border-interactive`) | `#FFFFFF` / `#F1F5F9` | **4.76 / 4.34:1** | ≥ 3.0:1 (SC 1.4.11) | PASS (AA) |
| **Light** | `#047857` / `#B45309` / `#B91C1C` | `#FFFFFF` (`--bg-surface`) | **5.48 / 5.02 / 6.47:1** | ≥ 4.5:1 (Text) | PASS (AA) |

> **Critical Light Mode Guardrail**: Raw Electric Cyan `#1DA4DF` on `#FFFFFF` measures `2.83:1` and is **strictly forbidden** for text, links, or interactive icon strokes on light backgrounds. Always use `#0369A1` (`--accent-text`) on light surfaces, or pair `#1DA4DF` fills exclusively with `#0B1220` dark ink (`6.62:1`).
> **Forced Colors Mode**: Always preserve native `outline` and system keywords (`CanvasText`, `LinkText`, `Highlight`) under `@media (forced-colors: active)`; never communicate state or borders via color or `box-shadow` alone (WCAG 1.4.1).

---

## 3. Typographic Architecture

### 3.1 Font Pairing
- **Display & Body Sans**: **Geist** (`var(--font-geist-sans)`, already loaded via `next/font/google` in `src/app/[locale]/layout.tsx`; Stitch enum `GEIST`). Clean neo-grotesk geometry with technical poise, crisp numerals, and zero decorative clutter.
- **Technical Monospace**: **Geist Mono** in Next.js 16 (`var(--font-geist-mono)`) / **JetBrains Mono** (`JETBRAINS_MONO`) in Stitch. Reserved exclusively for engineering metadata: technology tags, date ranges (`2024-08 — Present`), locale/status indicators, architectural notes, and inline code snippets.
- **Banned Fonts**: `Inter`, generic system serifs (`Times New Roman`, `Georgia`), and playful display scripts.

### 3.2 Fluid Scale & Bilingual Resilience (`clamp()` + WCAG 1.4.4 Zoom Safety)
Per Chrome `modern-web-guidance` (`responsive-design`), every `clamp()` declaration combines `rem` + `vw` and maintains **`max <= 2.5 × min`** so browser zoom up to 200% never stalls text scaling.

| Token / Level | Font Family | Fluid Size (`clamp`) | Desktop Ref | Mobile Ref | Weight | Line Height | Tracking |
| :--- | :--- | :--- | :---: | :---: | :---: | :---: | :---: |
| `display-hero` (`h1`) | Geist | `clamp(2.25rem, 1.5rem + 2.4vw, 3.75rem)` | `60px` | `36px` | `700` | `1.08` | `-0.03em` |
| `heading-section` (`h2`) | Geist | `clamp(1.625rem, 1.25rem + 1.2vw, 2.25rem)` | `36px` | `26px` | `600` | `1.18` | `-0.02em` |
| `heading-card` (`h3`) | Geist | `clamp(1.1875rem, 1.05rem + 0.45vw, 1.375rem)` | `22px` | `19px` | `600` | `1.30` | `-0.015em` |
| `heading-sub` (`h4`) | Geist | `1rem` | `16px` | `16px` | `600` | `1.40` | `-0.01em` |
| `body-lead` | Geist | `clamp(1.0625rem, 0.98rem + 0.3vw, 1.1875rem)` | `19px` | `17px` | `400` | `1.62` | `0em` |
| `body-base` | Geist | `1rem` (`16px` minimum) | `16px` | `16px` | `400` | `1.65` | `0em` |
| `body-sm` | Geist | `0.875rem` (`14px`) | `14px` | `14px` | `400` | `1.55` | `0em` |
| `mono-label` | Geist Mono / JetBrains Mono | `0.75rem` (`12px`) | `12px` | `12px` | `500` | `1.35` | `+0.04em` |
| `mono-code` | Geist Mono / JetBrains Mono | `0.875rem` (`14px`) | `14px` | `14px` | `400` | `1.60` | `0em` |

- **Prose Measure**: Body copy and MDX case study prose are capped at **`65ch`–`72ch`** for sustained reading comfort.
- **Bilingual Length Tolerance (`es` / `en`)**: Spanish strings average 15%–25% longer than English equivalents. Navigation links, buttons, filter pills, and card headers must use flexible padding/wrapping (`min-w-0`, `text-balance` on headlines, `text-pretty` on body copy) with zero fixed-width truncation.
- **Tabular Figures**: All dates, project indices (`01`, `02`), and technical timelines use `font-variant-numeric: tabular-nums`.

---

## 4. Spacing, Shape, Elevation & Grid System

### 4.1 Spacing Scale (4px / 8px Rhythmic Base)
- `space-1`: `4px` (`0.25rem`) · `space-2`: `8px` (`0.5rem`) · `space-3`: `12px` (`0.75rem`) · `space-4`: `16px` (`1rem`) · `space-6`: `24px` (`1.5rem`) · `space-8`: `32px` (`2rem`) · `space-12`: `48px` (`3rem`) · `space-16`: `64px` (`4rem`).
- **Vertical Section Rhythm**: `clamp(4rem, 7vw, 6.5rem)` (`64px` mobile → `104px` desktop) to create unmistakable chapter separation without dead voids.
- **Container Max Width**: `1280px` (`max-w-7xl`) centered with responsive inline padding: `16px` (Mobile), `24px` (Tablet), `32px` (Laptop), `48px` (Desktop).

### 4.2 Geometry & Elevation
- **Corner Roundness (`ROUND_EIGHT` baseline)**:
  - Primary containers & cards: gently rounded corners (`12px` / `rounded-xl`).
  - Buttons, inputs, code containers: crisp subtly rounded corners (`8px` / `rounded-lg`).
  - Technical tags & filter chips: clean compact corners (`6px` / `rounded-md`) or pill badges (`rounded-full`) reserved exclusively for status indicators (`Available`, `In Progress`, `Published`).
- **Elevation Philosophy**: **Border-first architectural layering** rather than heavy drop shadows or frosted glass.
  - Dark Mode: elevation is communicated by surface luminance stepping (`#070B14` → `#0D1424` → `#131D33`) plus `1px solid #1E293B` hairlines and subtle top edge highlight (`inset 0 1px 0 rgba(241,245,249,0.04)`).
  - Light Mode: `#F8FAFC` canvas vs `#FFFFFF` elevated cards with `1px solid #E2E8F0` and whisper-soft cool tint shadow (`0 1px 2px rgba(11,18,32,0.04), 0 8px 24px -12px rgba(35,58,142,0.08)`).

---

## 5. Multi-Device Responsive Architecture (Mobile-First)

The interface is architected mobile-first using **CSS Grid**, **Flexbox**, and **CSS `@container` queries** (`container-type: inline-size` on project cards and bento sections so components adapt to their column width, not just viewport width). Zero horizontal overflow across every viewport.

### 5.1 Breakpoints & Reference Viewports

| Device Tier | Breakpoint Range | Reference Viewport | Grid Columns | Inline Padding | Key Structural Adaptation |
| :--- | :--- | :---: | :---: | :---: | :--- |
| **Mobile** | `< 640px` (`base`) | **390 × 844** | `4 cols` (1-col stack) | `16px` | Compact sticky bar (`56px`) with wordmark + ES/EN + Theme + accessible Menu Drawer (`<dialog>` / Sheet); single-column vertical flow; full-width or paired accessible `44px+` CTAs; zero hover-only dependencies. |
| **Tablet** | `640px – 1023px` (`sm`/`md`) | **768 × 1024** | `8 cols` (2-col cards) | `24px` | Navigation remains uncluttered (wordmark + 4 concise links or compact drawer below `md` + ES/EN + Theme + CV icon/button); 2-column project grid and 2-column skill category matrix; readable timeline without cramped columns. |
| **Laptop** | `1024px – 1399px` (`lg`/`xl`) | **1366 × 768** | `12 cols` | `32px` | Hero constrained to fit comfortably inside `768px` viewport height (`min-h-[min(82dvh,680px)]` — never bloated `100vh` forcing immediate scroll); asymmetric 7/5 Hero split; horizontal navbar with all links visible; 2-column featured layout. |
| **Desktop** | `≥ 1400px` (`2xl`) | **1440 × 900** | `12 cols` (`max-w-[1280px]`) | `48px` | Expansive editorial proportions; asymmetric 7/5 Hero with structured architectural summary panel; Featured Projects flagship wide card (`12-col` split) + 2 supporting `6-col` cards; Case Study `8-col` MDX reading column + `4-col` sticky metadata/TOC rail. |

### 5.2 Mandatory Responsive Rules
- **Dynamic Viewport Units**: Use `dvh` instead of `vh` to avoid mobile Safari/Chrome address-bar jumps.
- **Touch Targets**: Minimum `44 × 44px` on coarse pointers (`@media (pointer: coarse)`), never smaller than `24 × 24px` on fine pointers (WCAG 2.2 SC 2.5.8).
- **Content Parity**: Never strip critical capabilities (CV download, language switcher, theme toggle, project filters, or case study architecture details) on mobile — reorganize them ergonomically.
- **No Generic 3-Equal-Card Feature Rows**: Featured Projects uses an asymmetric editorial composition (1 flagship horizontal split card + 2 paired 2-column cards on Desktop/Laptop; 2-column on Tablet; crisp 1-column stack on Mobile).

---

## 6. Component Specifications (shadcn/ui Radix Reference)

All interactive primitives map cleanly to `shadcn/ui` (Radix UI + Tailwind CSS v4 + `cn()`) for Phase 3B implementation:

- **Navigation Bar (`Header`)**: Sticky (`top-0 z-40`), `64px` desktop / `56px` mobile, translucent canvas surface (`backdrop-blur-md` at `88%` opacity, `1px solid` bottom hairline — subtle clarity, never foggy glassmorphism). Left: typographic wordmark `Cruzmar Sosa` with subtle monospace qualifier `// Full Stack & Architecture` (omitted on small mobile to preserve breathing room). Center: `Projects`, `Experience`, `About`, `Contact` (anchor/route links per `docs/SCOPE.md`). Right: compact `ES | EN` segmented switcher, Light/Dark icon toggle (`aria-label` localized), and outlined `Download CV` button (`CV` on tablet). Mobile opens an accessible slide-over navigation sheet containing links, CV CTA, and social links.
- **Buttons (`src/components/ui/button.tsx`)**:
  - *Primary*: Solid Cobalt (`#3B63D6` Dark / `#233A8E` Light), crisp white text, `44px` default height, `rounded-lg`, subtle `-1px` vertical press feedback on `:active`, zero neon outer glow.
  - *Secondary / Outline*: Transparent surface with `1px solid` border (`#2A3A57` Dark / `#CBD5E1` Light), subtle surface fill on hover.
  - *Ghost / Link*: Clean underline transition with directional arrow micro-shift (`translateX(2px)` on hover).
- **Hero Section (`Home`)**: Left-aligned asymmetric 12-column composition (7 cols narrative / 5 cols structured engineering profile card — **no centered generic hero**, **no graphic logo**, **no stock avatar**, **no "scroll down" filler**).
  - Left column: Availability status pill (verified from `socials.ts`: *León, Nicaragua · Remote*), H1 headline positioning **Software Architect & Full Stack Software Engineer**, concise 2-sentence engineering value proposition drawn verbatim from `socials.ts`, Primary CTA (*Explore Projects*), Secondary CTA (*Download CV*), and inline text links to *Contact*, *GitHub*, and *LinkedIn*.
  - Right column: Precision **Engineering Profile Card** displaying real factual specialization pillars grounded in `socials.ts` & `experience.ts` (Enterprise ERP & Systems Architecture · Full-Stack Web Products · REST APIs & SQL Optimization · AI-Assisted Workflows) plus spoken languages (`ES Native` · `EN B2 Upper-Intermediate`) and location. Zero invented KPIs or fake counters.
- **Project Cards (`FeaturedProjects` & `/projects`)**:
  - `@container`-aware cards with reserved `16:9` visual preview frame (`aspect-video`, neutral technical wireframe/diagram placeholder for fixture/in-progress projects until Phase 4 screenshots).
  - Content hierarchy: Status badge (`Published` / `In Progress` / `Technical Fixture` — never presenting WIP projects as shipped), Project Title (`h3`), Role + Date in monospace, concise 1-line **Problem Solved** highlight, concise Summary, top 4–5 stack tags (overflow count `+N`), and clear action row (*Read Case Study* primary link + *GitHub* / *Live Demo* icon-text links when available).
- **Filter Controls (`/projects`)**: Horizontal scrollable pill group on mobile / wrapped row on desktop with explicit active state (filled Cobalt/Cyan tint + crisp border + checkmark/dot icon so color is never the sole indicator), visible result counter, active filter reset button, and composed **Empty State** (*No projects match this filter* + one-click *Reset filters* CTA).
- **Tech Stack Matrix (`Home`)**: Structured bento/editorial matrix organized into clear categories backed by `content/data/skills-matrix.ts` (**Languages**, **Frontend**, **Backend**, **Databases**, **DevOps & Tools**, highlighting **AI-Assisted Workflows** clearly as an engineering capability). **Visual Weight Hierarchy**: Primary technologies (`primary: true`) render with stronger contrast, elevated surface chip, and Cobalt/Cyan subtle indicator dot; secondary/supporting technologies render as lighter, muted outline tags so recruiters immediately read core expertise.
- **Experience & Education Timeline (`Home`)**: Vertical editorial rail with left monospace period column (`2024-08 — Present`) and right content block highlighting **TiHouse** (Enterprise ERP across agriculture, livestock, poultry, logistics, access control, mining; SQL Server & API optimization; JMeter load testing; n8n), **Freelance Full Stack**, **Nixi "Your Adventure Companion"**, and **ULSA — Electronic & Cybernetic Engineering**. Includes prominent localized CV Download callout bar (`CV-Cruzmar-Sosa-ES.pdf` / `CV-Cruzmar-Sosa-EN.pdf`).
- **Contact Section (`Home`)**: Split 5/7 layout. Left: Direct contact channels — copyable email card (`cruzmarsosa18@gmail.com` with instant copy feedback & `aria-live="polite"` confirmation), GitHub link, LinkedIn link, location & remote availability (**no personal phone number**). Right: Accessible contact form (Name, Email, Message) with explicit `<label for>`, `autocomplete`, `aria-describedby` helper/error text below fields, visible inline validation states, submitting button state, and clear confirmation state.
- **Case Study Layout (`/projects/[slug]`)**: Clean editorial reading experience optimized for MDX: breadcrumb back to `/projects`, Hero header (Title, Summary, Role, Date, Status, Stack, Repo/Demo CTAs), reserved `16:9` cover media slot, and `8/4` desktop split (`68ch` MDX prose covering Context, Problem, Objectives, Solution, Architecture, Stack, Technical Decisions, Challenges, Verifiable Outcomes, Gallery slot + sticky `4-col` Table of Contents & Metadata Rail), followed by Previous/Next Project navigation cards.

---

## 7. Performance, Progressive Loading & Skeleton UI Strategy

Performance is treated as an architectural design constraint targeting **Lighthouse ≥ 95** across Performance, Accessibility, Best Practices, and SEO, with **Core Web Vitals** budgets: **LCP ≤ 2.5s**, **INP ≤ 200ms**, **CLS ≤ 0.1**.

### 7.1 Progressive Priority Ladder
1. **Immediate (Critical Render Path — Server Rendered, Zero Skeletons)**: Sticky Navbar, Hero headline/value proposition, primary CTAs, and core profile context render immediately as React Server Components (`next/font` preloaded `Geist` / `Geist_Mono`, CSS-first theme with zero blocking JS).
2. **Above-the-Fold / First Scroll**: Featured Projects semantic HTML shell and metadata render immediately; below-the-fold project thumbnails load progressively.
3. **Below-the-Fold Sections**: Tech Stack, Experience Timeline, and Contact form hydrate only minimal leaf Client Components (`LanguageSwitcher`, `ThemeToggle`, `CopyEmailButton`, `ContactForm`, `ProjectsFilter`).
4. **Deferred Case Study Media**: Secondary gallery screenshots and architecture diagrams in `/projects/[slug]` load on demand with strict `aspect-video` / `width`+`height` reservation.

### 7.2 Lazy Loading, Image Priority & CSS Containment (`modern-web-guidance`)
- **LCP Images** (e.g., Case Study cover image on `/projects/[slug]`): Render in initial HTML with `fetchpriority="high"` and `loading="eager"` (`next/image` `priority` / `preload`), serving AVIF/WebP with accurate `sizes` and explicit dimensions. **Never** apply `loading="lazy"` to LCP candidates.
- **Below-the-Fold Images** (Featured card thumbnails, Catalog thumbnails, Case Study gallery): Use native `loading="lazy"` **without** `fetchpriority="low"` (per Chrome `optimize-image-priority`, standard lazy images should load at normal priority once approaching the viewport).
- **CSS Containment**: Apply `content-visibility: auto` paired with content-derived `contain-intrinsic-block-size: auto <rem>` strictly on heavy below-the-fold sections (never above the fold) and verify keyboard Tab reachability across deferred sections.
- **Code Splitting & Server-First Architecture**: Keep pages, MDX compilation (`src/lib/mdx.ts`), and data loaders strictly as Server Components. Use dynamic imports only for genuinely non-critical interactive modules (e.g., mobile drawer or future lightbox viewer if needed).
- **Catalog Strategy (No Forced Infinite Scroll)**: For v1.0 (3–5 flagship projects), render the complete filterable catalog cleanly with instant client-side tag filtering and clear counts; if the catalog scales beyond 12 items in future versions, use predictable pagination or an accessible "Load more" button rather than infinite scroll.

### 7.3 Skeleton UI & Loading States Specification
Skeleton loaders are reserved strictly for asynchronous/streaming states (route loading boundaries `loading.tsx`, image decoding placeholders, form submission states) — **never** used to hide static SSG content.
- **Anatomy**: Match exact card geometry (`aspect-video` media slot + 24px title bar + two 14px summary lines + 3 compact tag pills) so `CLS = 0`.
- **Visual Treatment**: Subtle surface blocks (`#131D33` → `#1A2742` in Dark Mode; `#F1F5F9` → `#E2E8F0` in Light Mode) with gentle horizontal shimmer (`1.8s ease-in-out`) enabled **only** inside `@media (prefers-reduced-motion: no-preference)`. Under `prefers-reduced-motion: reduce`, skeletons remain crisp static placeholders.
- **Form States**: Idle → Validating (inline field feedback) → Submitting (disabled submit button with subtle inline progress indicator and `aria-busy="true"`) → Success/Error banner with `role="status"` / `role="alert"`.

---

## 8. Functional Motion & View Transitions (Conceptual Spec for Phase 3B)

All motion serves spatial orientation and continuity, stays exclusively on the GPU compositor (`transform`, `opacity`), and degrades gracefully when unsupported.

- **Micro-Interactions**:
  - Button active press: `translateY(1px)` (`120ms ease-out`).
  - Card hover (fine pointer only `@media (hover: hover)`): subtle border highlight transition (`--border-subtle` → `--accent` at `40%` opacity) + arrow nudge `translateX(3px)` (`180ms cubic-bezier(0.22, 1, 0.36, 1)`).
  - Focus ring appearance: instant, zero lag.
- **Project Catalog → Case Study Continuity (`/projects` → `/projects/[slug]`)**:
  - Architected for **React 19 `<ViewTransition>`** + **Next.js 16 `<Link transitionTypes={['nav-forward']}>`** (per `vercel-react-view-transitions`):
    1. **Shared Element (`name="project-media-${slug}"` & `name="project-title-${slug}"`, `share="morph"`)**: Clicking a project card smoothly morphs the card's `16:9` visual header and title into the Case Study hero header (`240ms cubic-bezier(0.22, 1, 0.36, 1)`).
    2. **Directional Page Context (`nav-forward` / `nav-back`)**: Subtle horizontal opacity + `12px` directional glide when entering/leaving case studies; lateral tab switches (`Home` ↔ `Projects`) use understated cross-fade (`default="none"` or brief `150ms` fade) without misleading directional slides.
    3. **List Identity**: Filter transitions in `/projects` wrap cards in keyed `<ViewTransition key={project.slug}>` triggered inside `startTransition` so filtered cards reposition smoothly.
- **Reduced Motion Policy (`modern-web-guidance` `motion`)**:
  - Never apply a global `animation-duration: 0.01ms` hack.
  - Opt into spatial animations inside `@media (prefers-reduced-motion: no-preference)` and keep non-motion color/border transitions active for interactive affordance.

---

## 9. Accessibility Standards (WCAG 2.2 AA Checklist)

- Single `<main>` landmark, semantic `<header>`, `<nav aria-label="...">`, `<article>`, `<aside>`, `<footer>`, plus visible-on-focus **Skip to main content** link (`#main-content`).
- Strict heading hierarchy (`<h1>` once per page, sequential `<h2>` → `<h3>`, never skipping levels).
- Native HTML controls (`<button>`, `<a href>`, `<label for>`, `<dialog>`) preferred over ARIA div recreations.
- Every form control has a persistent visible `<label>` (never placeholder-only), `autocomplete`, `required`, and `aria-describedby` linked error messages.
- Icon-only controls (Theme toggle, GitHub/LinkedIn icons, Copy button, Mobile menu button) always carry localized accessible names (`aria-label`) via `next-intl`.
- Full keyboard navigation (`Tab`, `Shift+Tab`, `Enter`, `Space`, `Esc`) with high-contrast `:focus-visible` outlines (`2px` solid + `3px` offset).

---

## 10. Anti-Patterns (Strictly Banned in Stitch & Phase 3B)

- **No graphic logo** — typographic identity only.
- **No AI neon purple/violet gradients**, glowing radial blobs, or glassmorphism overload.
- **No pure `#000000` black** backgrounds.
- **No `Inter` font** and no generic classic serif fonts.
- **No 3D/WebGL scenes**, particles, or custom cursors (frozen v2.0).
- **No fabricated metrics, fake uptime counters, fake years of experience, fake clients, or "BY THE NUMBERS" stat cards**.
- **No decorative circuit-board graphics**, generic stock developer photos, or emojis in UI chrome.
- **No "Scroll to explore" filler text** or bouncing scroll arrows.
- **No generic 3-equal-column feature card rows** or centered boilerplate heroes.
- **No personal phone number** displayed anywhere in the portfolio.
- **No presenting in-progress or fixture projects as completed production launches**.
