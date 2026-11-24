# Project State — `devfolio-core`

> **Punto de lectura obligatorio** antes de explorar carpetas o iniciar cualquier tarea. Mantenido por `project-workflow-governor`.

- **Proyecto**: `devfolio-core` (v1.0)
- **Rama activa**: `feat/phase-2-content-engine`
- **Fase activa**: `Fase 2 — Motor de Contenido (Cerrada · DF-GATE-02 APPROVED; DF-GATE-03 READY_TO_START)`
- **Estado operativo actual**: `DF_GATE_02_APPROVED`
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
| **DF-GATE-00** | Fase 0 — Entorno y Esqueleto | `APPROVED` | Esqueleto Next.js 16.4.6, gobernanza endurecida, `.agents/**` excluido en ESLint/TS, `26` skills en nivel 1 (`10` internas + `16` externas curadas congeladas para v1.0) y `typecheck`/`lint`/`build` con `0 errors, 0 warnings` (`DF-D10`). |
| **DF-GATE-01** | Fase 1 — Base Técnica y Despliegue Cero | `APPROVED` | Bloque 1A + 1B verificados (`next-intl`, `src/proxy.ts`, `shadcn/ui`, tema CSS-first con `0` console errors, `vercel.json`, `.github/workflows/ci.yml` `PASS`, despliegue Vercel `READY` en `https://devfolio-core.vercel.app/` validado en PC y móvil, `DF-D13`). |
| **DF-GATE-02** | Fase 2 — Motor de Contenido | `APPROVED` | Motor MDX + Zod (`src/lib/{content-schemas,projects,mdx}.ts`), datos reales bilingües del CV 2026 en `content/data/{socials,skills-matrix,experience}.ts` (`isPlaceholder: false`, sin teléfono personal), fixture `sample-architecture.mdx`, `scripts/validate-content.mjs` en CI, `sitemap.ts` dinámico, rutas estáticas `/[locale]/projects` y `/[locale]/projects/[slug]` y `validate:content`/`typecheck`/`lint --max-warnings=0`/`build` en verde (`DF-D14`, `DF-D15`). |
| **DF-GATE-03** | Fase 3 — Interfaz y Secciones | `READY_TO_START` | Desbloqueada tras `DF-GATE-02 = APPROVED` (`DF-D15`). Lista para iniciar diseño/UI en Fase 3 con paleta Cobalt `#233A8E` / Cyan `#1DA4DF` (identidad tipográfica sin logo gráfico). |
| **DF-GATE-04** | Fase 4 — Ingesta de Proyectos Reales | `LOCKED` | Bloqueada hasta que `DF-GATE-03` sea `APPROVED`. |
| **DF-GATE-05** | Fase 5 — Auditoría QA, SEO y Lanzamiento | `LOCKED` | Bloqueada hasta que `DF-GATE-04` sea `APPROVED`. |
