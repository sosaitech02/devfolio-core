# Project State — `devfolio-core`

> **Punto de lectura obligatorio** antes de explorar carpetas o iniciar cualquier tarea. Mantenido por `project-workflow-governor`.

- **Proyecto**: `devfolio-core` (v1.0)
- **Rama activa**: `feat/phase-4-real-projects`
- **Fase activa**: `Fase 4 — Ingesta de Proyectos Reales (DF-GATE-04 IN_PROGRESS · Proyecto #1 EtoursLeon · DF-D21)`
- **Estado operativo actual**: `PHASE_4_ETOURSLEON_INGESTED_READY_FOR_REVIEW`
- **Última actualización**: `2026-11-24`

---

## Índice rápido de rutas clave

| Área | Ruta | Propósito |
| :--- | :--- | :--- |
| **Entrada de agentes** | `AGENTS.md` | Contrato maestro y punto de entrada obligatorio. |
| **Alcance v1.0 / Hoja de ruta** | `docs/SCOPE.md` | Línea roja v1.0 vs v2.0, fases 0–5 y protocolo de ingesta. |
| **Gobernanza** | `docs/00-governance/` | `project-state.md`, `gates-registry.md`, `decision-log.md`. |
| **Referencias externas** | `docs/references.md` | Inventario trazable de repos/skills/librerías evaluadas. |
| **Reglas activas** | `.agents/rules/` | `scope-guard.md`, `architecture.md`, `design-system.md`, `i18n-policy.md`. |
| **Orquestador y mapa** | `.agents/skills/skill-master-orchestrator/` | `SKILL.md` (4 bloques + Modos A/B/C) + `references/routing-map.md` (5 ramas planas). |
| **Gobernador de flujo** | `.agents/skills/project-workflow-governor/SKILL.md` | 8 Reglas de Oro Anti-Hallazgos (`R1`..`R8`), control de compuertas y bloqueo `BLOCKED_BY_GOVERNANCE`. |
| **Contenido y diccionarios** | `content/` · `messages/` | MDX bilingüe (`projects/{es,en}`), datos tipados y JSON `next-intl`. |
| **Aplicación** | `src/app/` · `src/components/` · `src/lib/` · `src/i18n/` | Código Next.js 16 App Router (a implementar a partir de Fase 1). |

---

## Estado de compuertas (`DF-GATE-00` .. `DF-GATE-05`)

> Ninguna compuerta puede marcarse `APPROVED` sin evidencia verificada de todos sus criterios en `docs/00-governance/gates-registry.md`.

| Compuerta | Fase asociada | Estado | Evidencia / Bloqueo actual |
| :--- | :--- | :---: | :--- |
| **DF-GATE-00** | Fase 0 — Entorno y Esqueleto | `APPROVED` | Esqueleto Next.js 16.4.6, gobernanza endurecida, `.agents/**` excluido en ESLint/TS, línea base inicial de `26` skills en nivel 1 (`DF-D10`; enmendada posteriormente a `32` skills reales en disco bajo `DF-D19`) y `typecheck`/`lint`/`build` con `0 errors, 0 warnings`. |
| **DF-GATE-01** | Fase 1 — Base Técnica y Despliegue Cero | `APPROVED` | Bloque 1A + 1B verificados (`next-intl`, `src/proxy.ts`, `shadcn/ui`, tema CSS-first con `0` console errors, `vercel.json`, `.github/workflows/ci.yml` `PASS`, despliegue Vercel `READY` en `https://devfolio-core.vercel.app/` validado en PC y móvil, `DF-D13`). |
| **DF-GATE-02** | Fase 2 — Motor de Contenido | `APPROVED` | Motor MDX + Zod (`src/lib/{content-schemas,projects,mdx}.ts`), datos reales bilingües del CV 2026 en `content/data/{socials,skills-matrix,experience}.ts` (`isPlaceholder: false`, sin teléfono personal), fixture `sample-architecture.mdx`, `scripts/validate-content.mjs` en CI, `sitemap.ts` dinámico, rutas estáticas `/[locale]/projects` y `/[locale]/projects/[slug]` y `validate:content`/`typecheck`/`lint --max-warnings=0`/`build` en verde (`DF-D14`, `DF-D15`). |
| **DF-GATE-03** | Fase 3 — Interfaz y Secciones | `APPROVED` | Aprobada en `DF-D18` y consolidada en `main` (`5940d43`) tras fusionar Fase 3C Bloque A (`DF-D19`: hotfixes EN↔ES, Skip Link, Cobalt/Cyan, 6 skills) y Bloque B (`DF-D20`: `motion@14.14.0`, `three@0.187.0`, `@react-three/fiber@9.8.2` sin `drei`, escena 3D Hero diferida con `680` tris / `6` draw calls + fallback SVG/CSS y microinteracciones accesibles). |
| **DF-GATE-04** | Fase 4 — Ingesta de Proyectos Reales | `IN_PROGRESS` | Iniciada en `feat/phase-4-real-projects` (`DF-D21`): Proyecto #1 `etours-leon` publicado en `content/projects/{es,en}/etours-leon.mdx` con 5 capturas 16:9 WebP verificadas visualmente (`public/images/projects/etours-leon/*`), soporte de repositorios privados y galería editorial MDX implementado y fixture `sample-architecture.mdx` eliminado. Pendientes los demás proyectos estrella y CVs en PDF para cerrar `DF-GATE-04`. |
| **DF-GATE-05** | Fase 5 — Auditoría QA, SEO y Lanzamiento | `LOCKED` | Bloqueada hasta que `DF-GATE-04` sea `APPROVED`. |
