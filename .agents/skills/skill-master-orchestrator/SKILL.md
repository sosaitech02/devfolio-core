---
name: skill-master-orchestrator
description: >-
  Primary orchestration entry point for devfolio-core. Enforces system-wide
  awareness across Phase 0 installed stack vs Phase 1/2 planned layers, routes
  tasks across the 5 official skill branches in references/routing-map.md,
  applies gate-locked execution modes (DF-GATE-00 to DF-GATE-05) with
  BLOCKED_BY_GOVERNANCE enforcement, and coordinates surgical execution with
  project-workflow-governor.
risk: high
source: custom
version: "1.0.0"
tags:
  - orchestration
  - governance
  - nextjs-16
  - i18n
  - portfolio-v1
---

# Skill Master Orchestrator — `devfolio-core`

Orquestador maestro del repositorio `devfolio-core`. Coordina la ejecución técnica bajo control estricto de compuertas (`DF-GATE-00`..`DF-GATE-05`), evitando inferir dependencias no instaladas o aprobaciones de fase inexistentes.

---

## 1. CONCIENCIA INTEGRAL DEL SISTEMA

El orquestador distingue con precisión quirúrgica entre lo que **ya está instalado en `package.json`** y las capas **planificadas para fases posteriores** (prohibido asumirlas como instaladas mientras su compuerta esté `LOCKED`):

### 1.1 Estado real del Stack por Fase
- **Capas Instaladas y Verificadas (Fase 0 + Fase 1 + Fase 2 — `DF-GATE-00`, `DF-GATE-01` y `DF-GATE-02` `APPROVED`)**:
  - **Next.js `16.4.6`** (App Router, Turbopack, `cacheComponents: true`, `partialPrefetching: true`, convención oficial `src/proxy.ts`)
  - **React `19.3.0`** y **React DOM `19.3.0`**
  - **TypeScript `5.9.3`** (`strict: true`, alias `@/*` → `./src/*`, `.agents` excluido)
  - **Tailwind CSS `4.3.3`** (`@tailwindcss/turbopack` `4.3.3`)
  - **ESLint `9.39.5`** (`eslint-config-next` `16.4.6`, `.agents/**` excluido)
  - **Gestor de paquetes**: `pnpm` `12.23.0`
  - **`next-intl` `4.15.3`** (`locales: ['es', 'en']`, `defaultLocale: 'es'`, `localePrefix: 'always'`, `src/i18n/{routing,request,navigation}.ts`, `src/proxy.ts`, `messages/{es,en}.json`)
  - **`shadcn/ui` base** (`components.json`, `src/lib/utils.ts`, primitivos `button` y `badge` en `src/components/ui/`, `@radix-ui/react-slot`, `class-variance-authority`, `clsx`, `tailwind-merge`)
  - **`lucide-react` `1.78.0`** (iconografía ligera con tree-shaking)
  - **`ThemeProvider` nativo CSS-first** (`prefers-color-scheme` + `data-theme` en `src/styles/globals.css`, `useSyncExternalStore`, `0` etiquetas `<script>`/`<Script>` en `src/`)
  - **Motor MDX** (`@mdx-js/mdx` `3.1.1`, `remark-gfm` `4.0.1`, `gray-matter` `4.0.3`, `@types/mdx` `2.0.14`, compilador RSC `src/lib/mdx.ts`, lector bilingüe `src/lib/projects.ts` y fixture `content/projects/{es,en}/sample-architecture.mdx`)
  - **`Zod` `4.6.7`** (esquemas centralizados en `src/lib/content-schemas.ts`, datos reales bilingües del CV en `content/data/{socials,skills-matrix,experience}.ts` y validador CI `pnpm validate:content` en `scripts/validate-content.mjs`)
  - **Infraestructura CI y Vercel**: `.github/workflows/ci.yml` (`validate:content` + `typecheck` + `lint` + `build`), `vercel.json`, `src/app/sitemap.ts` dinámico y despliegue verificado en `https://devfolio-core.vercel.app/` (`READY`)
- **Próximas Fases del Roadmap (Stack base v1.0 completo; pendientes de ejecución controlada por compuertas)**:
  - **Fase 3 (`DF-GATE-03` — `READY_TO_START`)**: diseño y construcción de secciones UI/catálogo/detalle sobre paleta Cobalt `#233A8E` / Cyan `#1DA4DF` (sin logo gráfico) y auditoría `/ui-audit`.
  - **Fase 4 (`DF-GATE-04` — `LOCKED`)**: ingesta de 3 a 5 proyectos reales vía `/add-project` reemplazando el fixture temporal.
  - **Fase 5 (`DF-GATE-05` — `LOCKED`)**: auditoría `/pre-deploy`, OpenGraph bilingüe, CVs en PDF y lanzamiento en producción.

### 1.2 Arquitectura en 3 Módulos Independientes
- **Módulo A — Gobernanza e Inteligencia (`.agents/` y `docs/`)**:
  - Punto de entrada `AGENTS.md`, contrato `docs/SCOPE.md`, estado canónico `docs/00-governance/{project-state,gates-registry,decision-log}.md`, bitácora `docs/references.md`, reglas `.agents/rules/*.md` y skills en nivel 1 `.agents/skills/*/SKILL.md`.
- **Módulo B — Contenido y Localización (`content/` y `messages/`)**:
  - Casos de estudio MDX (`content/projects/es/` y `content/projects/en/`), datos estructurados (`content/data/`) y diccionarios de interfaz (`messages/es.json` y `messages/en.json`).
- **Módulo C — Aplicación y Activos (`src/` y `public/`)**:
  - Rutas App Router (`src/app/[locale]/`), componentes (`src/components/{ui,layout,sections,projects}/`), configuración i18n (`src/i18n/`, `src/proxy.ts`), utilidades (`src/lib/`), estilos (`src/styles/`) y estáticos (`public/{cv,images/projects,og}/`).

---

## 2. ORQUESTACIÓN DE SKILLS DEL PROYECTO

Toda tarea se enruta a través de las **5 ramas oficiales** en estructura plana de nivel 1 detalladas en [references/routing-map.md](./references/routing-map.md). Activa únicamente la skill primaria y las skills de apoyo requeridas por la capa afectada:

| Naturaleza de la Tarea | Rama Oficial (`01`..`05`) | Skill Primaria | Skills de Apoyo |
| :--- | :--- | :--- | :--- |
| Gobernanza, validación de compuertas (`DF-GATE-00`..`05`), control de alcance e ingesta de skills/repos externos | `01-orchestration-governance` | `project-workflow-governor` | `skill-master-orchestrator` |
| Flujo ejecutable: ingesta completa de nuevo proyecto (`/add-project`) | `01-orchestration-governance` | `add-project` | `github-project-ingestor`, `i18n-specialist`, `vercel-qa-seo` |
| Flujo ejecutable: auditoría visual, responsive, WCAG AA e i18n (`/ui-audit`) | `01-orchestration-governance` | `ui-audit` | `ui-ux-craft`, `i18n-specialist`, `vercel-qa-seo` |
| Flujo ejecutable: verificación pre-merge y despliegue (`/pre-deploy`) | `01-orchestration-governance` | `pre-deploy` | `frontend-architect`, `i18n-specialist`, `vercel-qa-seo` |
| Diseño UI/UX, tokens Tailwind v4, componentes `shadcn/ui`, claro/oscuro, responsive y accesibilidad WCAG AA | `02-web-platform-ui` | `ui-ux-craft` | `i18n-specialist`, `frontend-architect` |
| Arquitectura Next.js 16 App Router, Server/Client Components, `src/proxy.ts`, cargadores MDX y validación Zod | `03-frontend-architecture` | `frontend-architect` | `i18n-specialist`, `vercel-qa-seo` |
| Configuración `next-intl`, paridad `messages/{es,en}.json`, rutas localizadas y metadatos/CV por idioma | `04-i18n-content` | `i18n-specialist` | `frontend-architect`, `vercel-qa-seo` |
| Extracción técnica de repositorios GitHub y redacción de casos de estudio MDX (`es`/`en`) | `04-i18n-content` | `github-project-ingestor` | `i18n-specialist`, `vercel-qa-seo` |
| Compilación (`typecheck`/`lint`/`build`), SEO, OpenGraph, `sitemap.ts`, `robots.ts` y `vercel.json` | `05-qa-seo-deploy` | `vercel-qa-seo` | `frontend-architect`, `i18n-specialist`, `ui-ux-craft` |

---

## 3. ANÁLISIS DE IMPACTO Y COMPUERTAS DE BLOQUEO

El orquestador no fija una fase activa estática en este documento: **el modo vigente (`Modo A`, `Modo B` o `Modo C`) se determina siempre en tiempo real leyendo `docs/00-governance/project-state.md`**.

### Modo A — Entorno, Gobernanza e Ingesta de Skills (`DF-GATE-00`)
- **Alcance permitido**: Estructura base, `docs/00-governance/`, `docs/SCOPE.md`, `docs/references.md`, reglas en `.agents/rules/`, refinamiento de skills internas e ingesta curada de skills externas en `.agents/skills/*/SKILL.md`.
- **Restricción**: Prohibido implementar código de Fase 1+ en `src/` mientras `DF-GATE-00` no figure como `APPROVED` en `docs/00-governance/project-state.md`.

### Modo B — Fundación Técnica y Motor de Contenido (`DF-GATE-01` / `DF-GATE-02`)
- **Condición de desbloqueo**:
  - `DF-GATE-01` exige `DF-GATE-00 = APPROVED` (habilita instalación y configuración de `next-intl`, `src/proxy.ts`, tema claro/oscuro, `shadcn/ui` base, CI y primer deploy limpio a Vercel).
  - `DF-GATE-02` exige `DF-GATE-01 = APPROVED` (habilita instalación de `MDX` + `Zod`, esquemas en `src/lib/projects.ts`, `content/data/*.ts` y validación con fixture bilingüe).
- **Restricción**: Prohibido construir secciones definitivas de la landing o ingestar proyectos reales antes de que `DF-GATE-02` esté `APPROVED`.

### Modo C — Interfaz, Proyectos Reales y Lanzamiento (`DF-GATE-03` .. `DF-GATE-05`)
- **Condición de desbloqueo secuencial**:
  - `DF-GATE-03` exige `DF-GATE-02 = APPROVED` (construcción de secciones UI, catálogo `/projects`, detalle `/projects/[slug]` y aprobación de `/ui-audit`).
  - `DF-GATE-04` exige `DF-GATE-03 = APPROVED` (ingesta de 3 a 5 proyectos reales vía `/add-project` con capturas WebP/AVIF y links verificados).
  - `DF-GATE-05` exige `DF-GATE-04 = APPROVED` (ejecución `/pre-deploy`, OpenGraph ES/EN, CVs PDF, Lighthouse ≥ 95 y despliegue final en Vercel).

### Regla de Detención Inmediata (`BLOCKED_BY_GOVERNANCE`)
Si una solicitud intenta:
1. Ejecutar tareas de un Modo cuya compuerta previa no esté en estado `APPROVED` en `docs/00-governance/project-state.md`,
2. Asumir como instalada cualquier librería de Fase 1/2 que no exista en `package.json`, o
3. Introducir cualquier elemento prohibido de `v2.0` (`docs/SCOPE.md`),

el orquestador **detiene inmediatamente la ejecución antes de modificar código** y devuelve el código de estado `BLOCKED_BY_GOVERNANCE` citando la compuerta o regla violada.

---

## 4. MARCO DE EJECUCIÓN DEL ORQUESTADOR

1. **Comprensión del Contexto**
   - Leer `docs/00-governance/project-state.md`, `docs/00-governance/gates-registry.md` y `docs/SCOPE.md` antes de explorar carpetas o proponer cambios.
   - Identificar la fase activa, la rama actual y el Modo operativo (`Modo A`, `Modo B` o `Modo C`).

2. **Detección Preventiva de Riesgos**
   - Contrastar la tarea contra las **8 Reglas de Oro Anti-Hallazgos (`R1` a `R8`)** definidas en `.agents/skills/project-workflow-governor/SKILL.md`.
   - Verificar en `package.json` qué dependencias están realmente instaladas; si se detecta cualquier violación de fase, alcance o compuerta, activar `BLOCKED_BY_GOVERNANCE`.

3. **Ejecución Quirúrgica**
   - Invocar únicamente las skills mapeadas en [references/routing-map.md](./references/routing-map.md) para la tarea activa.
   - Aplicar cambios mínimos, trazables y acotados a la fase actual; registrar decisiones arquitectónicas o de gobierno en `docs/00-governance/decision-log.md` (`DF-DXX`).

4. **Verificación de Integridad**
   - Ejecutar `pnpm typecheck`, `pnpm lint`, `pnpm build` y `git status`.
   - Cerrar reportando explícitamente el estado individual de `DF-GATE-00`..`DF-GATE-05`, la salida real de los comandos y el estado operativo alcanzado.
