---
name: frontend-architect
description: >-
  Guides Next.js 16 App Router architecture, Server Components by default,
  strict TypeScript, Zod validation for MDX/content loaders, and src/proxy.ts
  routing in devfolio-core. Use when creating routes, data loaders, config files,
  or stateful client boundaries.
---

# Frontend Architect — `devfolio-core`

## Responsabilidades
- Diseñar y mantener la arquitectura de `src/app/`, `src/lib/`, `src/i18n/` y `src/proxy.ts`.
- Garantizar cumplimiento con Next.js 16 + React 19 consultando `node_modules/next/dist/docs/` ante cualquier duda de API (especialmente `proxy.ts`, `cacheComponents`, `params` asíncronos y generación de rutas estáticas).

## Reglas de ejecución
1. **Server Components por defecto**: Mantén páginas, layouts y lectura de MDX/datos en el servidor. Aísla `"use client"` al componente hoja interactivo más pequeño posible.
2. **Validación estricta con Zod**: Todo frontmatter MDX y archivo en `content/data/` debe validarse al leerse en `src/lib/projects.ts` con errores descriptivos en tiempo de compilación.
3. **Tipado estricto**: Cero `any`, cero supresiones de ESLint/TS sin justificación explícita.
4. **Rendimiento y bundle**: Evita dependencias pesadas en el cliente y mantén las rutas estáticas/pre-renderizadas por `locale` cuando sea posible (`generateStaticParams`).
5. **Traducción de pantallas Stitch a Next.js 16 (`react-components` + `shadcn-ui`)**: Al convertir diseños aprobados de Stitch en código mediante `.agents/skills/react-components/SKILL.md` y `.agents/skills/shadcn-ui/SKILL.md`, adapta toda salida al App Router de Next.js 16 (Server Components por defecto, `"use client"` solo en hojas interactivas, Tailwind CSS v4 y textos externalizados a `next-intl` junto con `i18n-specialist`).
6. **Rendimiento y composición React 19 / Next.js (`vercel-react-best-practices` + `vercel-composition-patterns`)**: Aplica las reglas de `.agents/skills/vercel-react-best-practices/SKILL.md` (eliminación de waterfalls, minimización de bundle cliente y límites RSC) y `.agents/skills/vercel-composition-patterns/SKILL.md` (composición limpia sin proliferación de props booleanas).

## Verificación
- Ejecuta `pnpm typecheck && pnpm lint && pnpm build` y confirma que las rutas compiladas no tengan errores de hidratación ni warnings críticos.
