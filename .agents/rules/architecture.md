# Architecture & Coding Conventions

## Framework & Runtime
- **Next.js 16 (App Router) + React 19**: Always check `node_modules/next/dist/docs/` before using framework APIs that changed in Next.js 16 (including `proxy.ts`, `cacheComponents`, async `params`/`searchParams`, and metadata conventions).
- **Server Components by default**: Keep pages, layouts, and content loaders as Server Components. Add `"use client"` only at the smallest interactive leaf component (e.g., theme toggle, language switcher, technology filter, copy-email button).
- **Package manager**: Use `pnpm` exclusively. Keep dependencies lean and avoid overlapping libraries.

## TypeScript & Validation
- **Strict TypeScript**: `strict: true` must remain enabled. Never use `any`, `@ts-ignore`, or unvalidated casts. Prefer explicit interfaces/types and `unknown` narrowed with Zod.
- **Zod at boundaries**: Every MDX frontmatter file (`content/projects/{es,en}/*.mdx`) and structured data module (`content/data/*.ts`) must be validated against a strict Zod schema in `src/lib/`.
- **Imports**: Use the `@/*` path alias mapped to `src/*`.

## Separation of Layers
- `.agents/` — Agent rules and skills (never imported by runtime app code).
- `content/` & `messages/` — Pure content and translations (adding a project must not require editing UI components).
- `src/app/[locale]/` — Route segments, layouts, metadata, and error/not-found boundaries.
- `src/components/` — Organized strictly into `ui/`, `layout/`, `sections/`, and `projects/`.
- `src/lib/` — Pure utilities, MDX parsing, and schema validation.
- `src/proxy.ts` — Locale detection and routing proxy (`next-intl`).
