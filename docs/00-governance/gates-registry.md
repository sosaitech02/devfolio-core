# Gates Registry — `devfolio-core`

Registro canónico de criterios verificables de apertura y cierre para las compuertas `DF-GATE-00` a `DF-GATE-05`.

## Política de compuertas
- **Estados permitidos**: `LOCKED` · `READY_TO_START` · `IN_PROGRESS` · `BLOCKED` · `APPROVED`.
- **Regla anti-inferencia**: Está estrictamente prohibido inferir o asumir una aprobación. Toda transición a `APPROVED` exige evidencia concreta (comandos ejecutados, archivos revisados o despliegue verificado) y confirmación explícita.
- **Secuencialidad**: No se abre `DF-GATE-N` (`READY_TO_START` / `IN_PROGRESS`) mientras `DF-GATE-(N-1)` no esté en estado `APPROVED`.

---

## Registro de Compuertas

### `DF-GATE-00` — Fase 0: Entorno y Esqueleto
- **Estado actual**: `APPROVED` (`2026-11-24`, `DF-D10`)
- **Criterio de apertura**: Repositorio inicializado en rama dedicada (`chore/phase-0-setup`) con `docs/SCOPE.md` definido.
- **Criterios verificables de cierre**:
  1. Proyecto base Next.js 16 + TypeScript estricto + Tailwind CSS v4 + ESLint + `pnpm` operativo.
  2. Árbol completo de carpetas (`.agents/`, `content/`, `messages/`, `public/`, `src/`, `docs/`, `.github/workflows/`).
  3. Gobernanza instalada (`AGENTS.md`, `.agents/rules/`, `docs/00-governance/`, `skill-master-orchestrator` con 5 ramas planas y `project-workflow-governor`).
  4. Skills externas curadas de Fase 0 evaluadas en `docs/references.md`, instaladas en `.agents/skills/*/SKILL.md` (`26` skills totales en nivel 1) y mapeadas en `routing-map.md`.
  5. `pnpm typecheck`, `pnpm lint` (`0 errors, 0 warnings` con `.agents/**` excluido) y `pnpm build` finalizan con código `0`.

### `DF-GATE-01` — Fase 1: Base Técnica y Despliegue Cero
- **Estado actual**: `IN_PROGRESS` *(Bloque 1A implementado en `feat/phase-1-foundation`; pendiente Bloque 1B: Preview URL en Vercel)*
- **Criterio de apertura**: `DF-GATE-00 = APPROVED`.
- **Criterios verificables de cierre**:
  1. `next-intl` operativo con locales `es` y `en` y enrutamiento en `src/proxy.ts`.
  2. Tema claro/oscuro sin errores de hidratación y base `shadcn/ui` instalada en `src/components/ui/`.
  3. CI en `.github/workflows/ci.yml` y cabeceras/caché en `vercel.json`.
  4. Preview URL activa en Vercel validando `/es` ↔ `/en`, modo claro/oscuro y `pnpm typecheck && pnpm lint && pnpm build` en verde.

### `DF-GATE-02` — Fase 2: Motor de Contenido
- **Estado actual**: `LOCKED`
- **Criterio de apertura**: `DF-GATE-01 = APPROVED`.
- **Criterios verificables de cierre**:
  1. Esquema Zod estricto para frontmatter MDX y lector `src/lib/projects.ts` con fallo explícito ante campos faltantes o asimetría ES/EN.
  2. Módulos tipados `content/data/{experience,skills-matrix,socials}.ts` validados.
  3. Al menos 1 proyecto fixture en `content/projects/{es,en}/` compilado y verificado por `pnpm typecheck && pnpm build`.

### `DF-GATE-03` — Fase 3: Interfaz y Secciones
- **Estado actual**: `LOCKED`
- **Criterio de apertura**: `DF-GATE-02 = APPROVED`.
- **Criterios verificables de cierre**:
  1. Vistas completas de v1.0 implementadas: Home (Hero, FeaturedProjects, TechStack, Experience + CV, Contact), `/[locale]/projects` con filtro y `/[locale]/projects/[slug]`.
  2. Cero cadenas visibles hardcodeadas y paridad 100% entre `messages/es.json` y `messages/en.json`.
  3. Ejecución de `/ui-audit` aprobada en 375px y 1440px, claro/oscuro y contraste WCAG AA.

### `DF-GATE-04` — Fase 4: Ingesta de Proyectos Reales
- **Estado actual**: `LOCKED`
- **Criterio de apertura**: `DF-GATE-03 = APPROVED`.
- **Criterios verificables de cierre**:
  1. De 3 a 5 proyectos estrella reales ingresados vía `/add-project` con paridad total en `content/projects/{es,en}/`.
  2. Capturas optimizadas (WebP/AVIF) en `public/images/projects/<slug>/` y enlaces a demo/GitHub verificados sin 404.
  3. `pnpm typecheck && pnpm lint && pnpm build` en verde sin fixtures temporales residuales.

### `DF-GATE-05` — Fase 5: Auditoría QA, SEO y Lanzamiento
- **Estado actual**: `LOCKED`
- **Criterio de apertura**: `DF-GATE-04 = APPROVED`.
- **Criterios verificables de cierre**:
  1. `/pre-deploy` ejecutado con veredicto `PASS` (sin hallazgos `FAIL`).
  2. OpenGraph bilingüe validado para LinkedIn/CV, `sitemap.ts` y `robots.ts` activos, y CVs descargables (`public/cv/CV-*-{ES,EN}.pdf`).
  3. Lighthouse ≥ 95 en Performance, Accessibility, Best Practices y SEO, más despliegue de producción verificado en Vercel.
