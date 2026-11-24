# Mapa de Enrutamiento de Skills — `devfolio-core`

Referencia oficial del `skill-master-orchestrator`. Todas las skills (internas y externas) viven en **estructura plana de nivel 1** (`.agents/skills/<skill-name>/SKILL.md`) para autodescubrimiento nativo en Antigravity y se clasifican lógicamente en **5 ramas oficiales**.

---

## Ramas oficiales (Nivel 1 plano)

### `01-orchestration-governance`
Coordinación maestra, control de compuertas (`DF-GATE-00`..`DF-GATE-05`), alcance v1.0 y flujos slash ejecutables.

| Skill | Ruta | Tipo | Cuándo invocarla |
| :--- | :--- | :---: | :--- |
| `skill-master-orchestrator` | `.agents/skills/skill-master-orchestrator/SKILL.md` | Core | Punto de entrada para tareas compuestas, cambios de fase o ingesta de repos externos. |
| `project-workflow-governor` | `.agents/skills/project-workflow-governor/SKILL.md` | Core | Lectura rápida de estado (`docs/00-governance/project-state.md`), validación de compuertas y bloqueo de scope creep. |
| `add-project` | `.agents/skills/add-project/SKILL.md` | Slash `/add-project` | Ingestar repo GitHub + demo en casos de estudio MDX bilingües. |
| `ui-audit` | `.agents/skills/ui-audit/SKILL.md` | Slash `/ui-audit` | Auditoría responsive, tema claro/oscuro, WCAG AA, i18n y Core Web Vitals. |
| `pre-deploy` | `.agents/skills/pre-deploy/SKILL.md` | Slash `/pre-deploy` | Puerta completa pre-merge/deploy (typecheck, lint, build, paridad ES/EN, SEO y Vercel). |
| `skill-creator` | `.agents/skills/skill-creator/SKILL.md` | Externa (`anthropics/skills`) | Creación o auditoría de skills propias del workspace bajo el estándar `agentskills.io` con carga progresiva y mínimo uso de tokens. |

### `02-web-platform-ui`
Sistema de diseño, accesibilidad WCAG AA, Tailwind CSS v4, shadcn/ui y microinteracciones sobrias.

| Skill | Ruta | Tipo | Cuándo invocarla |
| :--- | :--- | :---: | :--- |
| `ui-ux-craft` | `.agents/skills/ui-ux-craft/SKILL.md` | Core | Construcción o refinamiento de componentes en `src/components/` y tokens en `src/styles/`. |
| `modern-web-guidance` | `.agents/skills/modern-web-guidance/SKILL.md` | Externa (`v1.0.2`) | Consulta de patrones modernos de plataforma web (CSS nativo, layout, `color-scheme`/dark mode, a11y) y escaneo `legacy-scan` (soporte secundario a `05-qa-seo-deploy`). |
| `taste-design` | `.agents/skills/taste-design/SKILL.md` | Externa (`stitch-skills`) | Criterio estético, dirección visual, balance tipográfico y prevención de interfaces genéricas de IA. |
| `design-md` | `.agents/skills/design-md/SKILL.md` | Externa (`stitch-skills`) | Estructuración y mantenimiento de especificaciones de diseño en formato `DESIGN.md`. |
| `enhance-prompt` | `.agents/skills/enhance-prompt/SKILL.md` | Externa (`stitch-skills`) | Refinamiento de prompts de UI/UX antes de generar o iterar pantallas en Stitch. |
| `generate-design` | `.agents/skills/generate-design/SKILL.md` | Externa (`stitch-skills`) | Generación e iteración de pantallas de alta fidelidad con Stitch MCP *(requiere Stitch MCP autenticado)*. |
| `manage-design-system` | `.agents/skills/manage-design-system/SKILL.md` | Externa (`stitch-skills`) | Creación, sincronización y aplicación de design systems en Stitch MCP *(requiere Stitch MCP autenticado)*. |
| `shadcn-ui` | `.agents/skills/shadcn-ui/SKILL.md` | Externa (`stitch-skills`) | Patrones de composición, theming y personalización de primitivos `shadcn/ui` en `src/components/ui/`. |
| `web-design-guidelines` | `.agents/skills/web-design-guidelines/SKILL.md` | Externa (`vercel-labs/agent-skills`) | Auditoría de interfaz, accesibilidad, jerarquía visual y cumplimiento de Web Interface Guidelines. |
| `vercel-react-view-transitions` | `.agents/skills/vercel-react-view-transitions/SKILL.md` | Externa (`vercel-labs/agent-skills`) | Transiciones nativas de vista con React `<ViewTransition>` en Next.js *(regla obligatoria: transiciones sobrias y respeto estricto a `prefers-reduced-motion`)*. |
| `emil-design-eng` | `.agents/skills/emil-design-eng/SKILL.md` | Externa (`emilkowalski/skills`) | Criterio de ingeniería de diseño para refinamiento de interacciones, estados press/hover, timings y coherencia visual (`DF-D19`). |
| `animate` | `.agents/skills/animate/SKILL.md` | Externa (`emilkowalski/skills`) | Diseño e implementación disciplinada de microinteracciones y transiciones (decidir si animar, herramienta más barata, curvas, interrupción y salida; subordinada a `DF-D19` y `prefers-reduced-motion`). |
| `animation-performance` | `.agents/skills/animation-performance/SKILL.md` | Externa (`emilkowalski/skills`) | Presupuesto de frames, propiedades compositor-only (`transform`/`opacity`), prevención de jank y diagnóstico de `will-change`/capas GPU (`DF-D19`). |
| `mobile-native` | `.agents/skills/mobile-native/SKILL.md` | Externa (`emilkowalski/skills`) | Ergonomía táctil y comportamiento nativo en móvil (hover sticky, `dvh`, tap highlight, zoom en inputs, safe areas, overscroll y validación en hardware real iOS/Android). |
| `threejs-react-three-fiber` | `.agents/skills/threejs-react-three-fiber/SKILL.md` | Externa (`CloudAI-X/threejs-skills`) | Arquitectura React Three Fiber + drei acotada **exclusivamente** a la propuesta condicional de una única pieza 3D arquitectónica en el Hero (`DF-D19`, sujeta a viabilidad en Bloque B y fallback SVG/CSS). |
| `threejs-performance` | `.agents/skills/threejs-performance/SKILL.md` | Externa (`CloudAI-X/threejs-skills`) | Presupuesto de rendimiento GPU/WebGL (triángulos `< 10.000`, draw calls, memoria GPU, DPR adaptativo, pausa fuera de vista y disposal; soporte secundario a `05-qa-seo-deploy` bajo `DF-D19`). |

### `03-frontend-architecture`
Arquitectura Next.js 16 App Router, React 19, Server Components, TypeScript estricto, Zod y `src/proxy.ts`.

| Skill | Ruta | Tipo | Cuándo invocarla |
| :--- | :--- | :---: | :--- |
| `frontend-architect` | `.agents/skills/frontend-architect/SKILL.md` | Core | Rutas App Router, loaders MDX/Zod, `src/lib/`, `src/proxy.ts` y límites `"use client"`. |
| `react-components` | `.agents/skills/react-components/SKILL.md` | Externa (`stitch-skills`) | Traducción de pantallas aprobadas de Stitch a componentes React modulares *(nota obligatoria: toda salida se adapta a Next.js 16 App Router Server/Client Components, Tailwind v4 y `next-intl` bajo `frontend-architect` e `i18n-specialist`)*. |
| `vercel-react-best-practices` | `.agents/skills/vercel-react-best-practices/SKILL.md` | Externa (`vercel-labs/agent-skills`) | Optimización de rendimiento en React 19 y Next.js App Router (Server Components, data fetching, eliminación de waterfalls y reducción de bundle). |
| `vercel-composition-patterns` | `.agents/skills/vercel-composition-patterns/SKILL.md` | Externa (`vercel-labs/agent-skills`) | Patrones escalables de composición en React 19 (compound components, eliminación de proliferación de props booleanas y APIs limpias). |

### `04-i18n-content`
Internacionalización ES/EN con `next-intl`, diccionarios sincronizados y redacción técnica de casos de estudio MDX.

| Skill | Ruta | Tipo | Cuándo invocarla |
| :--- | :--- | :---: | :--- |
| `i18n-specialist` | `.agents/skills/i18n-specialist/SKILL.md` | Core | Configuración `next-intl`, paridad `messages/{es,en}.json`, rutas `/[locale]`, SEO y CVs por idioma. |
| `github-project-ingestor` | `.agents/skills/github-project-ingestor/SKILL.md` | Core | Extracción técnica de repos GitHub y generación de MDX bilingüe en `content/projects/{es,en}/`. |
| `pdf` | `.agents/skills/pdf/SKILL.md` | Externa (`anthropics/skills`) | Acotada exclusivamente a revisión, validación o generación de `public/cv/CV-*-ES.pdf` y `public/cv/CV-*-EN.pdf`. |

### `05-qa-seo-deploy`
Calidad de compilación, metadatos OpenGraph, sitemap/robots, optimización de activos y configuración de Vercel.

| Skill | Ruta | Tipo | Cuándo invocarla |
| :--- | :--- | :---: | :--- |
| `vercel-qa-seo` | `.agents/skills/vercel-qa-seo/SKILL.md` | Core | Validación de build/lint/typecheck, enlaces rotos, imágenes, OpenGraph, `sitemap.ts` y `vercel.json`. |
| `deploy-to-vercel` | `.agents/skills/deploy-to-vercel/SKILL.md` | Externa (`vercel-labs/agent-skills`) | Preparación y ejecución de despliegues de previsualización en Vercel *(regla dura de `docs/SCOPE.md`: prohibido hacer push o deploy directo a `main` / producción sin revisión y autorización explícita del usuario)*. |
| `webapp-testing` | `.agents/skills/webapp-testing/SKILL.md` | Externa (`anthropics/skills`) | Verificación opcional en navegador local (Playwright) de layout responsive, rutas `/es` y `/en`, dark mode y enlaces cuando el servidor local esté activo. |

---

## Registro de skills externas instaladas (Curadas en Fase 0+)

*(Toda skill externa aprobada se instalará en `.agents/skills/<nombre>/SKILL.md` —nunca en subcarpetas anidadas— y se asignará a una de las 5 ramas oficiales.)*

| Skill externa | Rama oficial | Origen (Repo) | Ruta | Cuándo invocarla |
| :--- | :--- | :--- | :--- | :--- |
| `modern-web-guidance` | `02-web-platform-ui` *(soporte secundario: `05-qa-seo-deploy`)* | `GoogleChrome/modern-web-guidance` (`v1.0.2`) | `.agents/skills/modern-web-guidance/SKILL.md` | Patrones nativos de CSS, layout, dark mode (`color-scheme`), accesibilidad y auditoría `legacy-scan src`. **Excluidas en v1.0**: `built-in-ai`, `wasm`, `pwa`, `webmcp`, `apply-webgl-shaders` e `interactive-content-in-3d-scenes` (sin `.mwgrc` experimental). |
| `taste-design`, `design-md`, `enhance-prompt`, `generate-design`, `manage-design-system`, `shadcn-ui`, `react-components` | `02-web-platform-ui` (`6` skills) y `03-frontend-architecture` (`react-components`) | `google-labs-code/stitch-skills` (`main` / `62fdcd6`) | `.agents/skills/{taste-design,design-md,enhance-prompt,generate-design,manage-design-system,shadcn-ui,react-components}/SKILL.md` | Diseño visual, especificación `DESIGN.md`, generación en Stitch MCP (prerrequisito: Stitch MCP activo y autenticado), primitivos `shadcn/ui` y conversión a componentes React adaptados a Next.js 16 App Router + `next-intl`. **Excluidas (9)**: `react-native`, `react-vite-dashboard`, `remotion`, `code-to-design`, `extract-design-md`, `extract-static-html`, `upload-to-stitch`, `site-md`, `stitch-loop`. |
| `vercel-react-best-practices`, `vercel-composition-patterns`, `web-design-guidelines`, `vercel-react-view-transitions`, `deploy-to-vercel` | `02-web-platform-ui` (`web-design-guidelines`, `vercel-react-view-transitions`), `03-frontend-architecture` (`vercel-react-best-practices`, `vercel-composition-patterns`) y `05-qa-seo-deploy` (`deploy-to-vercel`) | `vercel-labs/agent-skills` (`main` / `5a37a63`) | `.agents/skills/{vercel-react-best-practices,vercel-composition-patterns,web-design-guidelines,vercel-react-view-transitions,deploy-to-vercel}/SKILL.md` | Rendimiento React 19/Next.js 16, composición escalable, auditoría de Web Interface Guidelines, View Transitions sobrias (`prefers-reduced-motion`) y despliegues preview en Vercel (sin push/deploy directo a `main` sin aprobación humana). **Excluidas**: `react-native-guidelines` (`vercel-react-native-skills`), `vercel-optimize` y `writing-guidelines`. |
| `skill-creator`, `webapp-testing`, `pdf` | `01-orchestration-governance` (`skill-creator`), `04-i18n-content` (`pdf`) y `05-qa-seo-deploy` (`webapp-testing`) | `anthropics/skills` (`main` / `e4bb5d9`) | `.agents/skills/{skill-creator,webapp-testing,pdf}/SKILL.md` | Creación/auditoría de skills propias con ahorro de tokens (`skill-creator`), revisión/generación de `public/cv/CV-*-{ES,EN}.pdf` (`pdf`) y pruebas locales en navegador de `/es`, `/en`, responsive y dark mode (`webapp-testing`). **Excluidas (17)**: `docx`, `pptx`, `xlsx`, `frontend-design`, `mcp-builder` y las 12 skills restantes de ejemplos/empresa fuera de v1.0. |
| `emil-design-eng`, `animate`, `animation-performance`, `mobile-native` | `02-web-platform-ui` *(soporte móvil/rendimiento a `05-qa-seo-deploy`)* | `emilkowalski/skills` (`main` / `64eb3de`) | `.agents/skills/{emil-design-eng,animate,animation-performance,mobile-native}/SKILL.md` | Refinamiento de craft UI, diseño disciplinado de movimiento compositor-only, presupuesto de frames y ergonomía táctil nativa en móvil/iOS (`DF-D19`). Sin instalar librerías no aprobadas (`Vaul`, `Sonner`, `GSAP`). **Excluidas (16)**: `animate-expo`, `animation-vocabulary`, `apple-design`, `ask-emil`, `ask-sonner`, `break-ui`, `choreograph`, `find-animation-opportunities`, `gestures`, `improve-animations`, `learn-taste`, `pick-ui-library`, `prototype`, `remove-animations`, `review-animations`, `write-swift`. |
| `threejs-react-three-fiber`, `threejs-performance` | `02-web-platform-ui` *(soporte técnico a `03-frontend-architecture` y `05-qa-seo-deploy`)* | `CloudAI-X/threejs-skills` (`main` / `0e18186`) | `.agents/skills/{threejs-react-three-fiber,threejs-performance}/SKILL.md` | Evaluación e implementación condicional de una **única** pieza 3D arquitectónica en el Hero bajo presupuestos estrictos (`< 10.000` triángulos, draw calls/memoria GPU, DPR adaptativo, carga diferida, pausa fuera de vista, fallback SVG/CSS y `prefers-reduced-motion`, `DF-D19`). Prohibidas escenas 3D adicionales en v1.0. **Excluidas (11)**: `threejs-animation`, `threejs-asset-pipeline`, `threejs-fundamentals`, `threejs-geometry`, `threejs-interaction`, `threejs-lighting`, `threejs-loaders`, `threejs-materials`, `threejs-postprocessing`, `threejs-shaders`, `threejs-textures`. |
