# Referencias y Repositorios Externos Evaluados

Registro trazable de todos los repositorios de GitHub, skills, librerías y referencias visuales evaluados para `devfolio-core` bajo el protocolo de `docs/SCOPE.md`.

## Criterios de aceptación

- **Skills de IA**: compatibilidad con el estándar `SKILL.md`, sin duplicar skills existentes, instaladas en `.agents/skills/<nombre>/SKILL.md` y mapeadas en `.agents/skills/skill-master-orchestrator/references/routing-map.md`.
- **Librerías / UI**: compatibilidad verificada con Next.js 16 + React 19 + Tailwind CSS v4, mínimo impacto en bundle del cliente.
- **Referencias visuales**: extracción de tokens y decisiones de diseño hacia `.agents/rules/design-system.md` (nunca copiar repos completos).

---

## Inventario de Repositorios e Insumos

| Fecha | Recurso / Repo | Categoría | Estado | Destino en el repo | Notas / Decisión |
| :--- | :--- | :--- | :---: | :--- | :--- |
| 2026-11-23 | `GoogleChrome/modern-web-guidance` (`v1.0.2`) | Skill de IA (`SKILL.md` + CLI `npx`) | **APROBADO (Parcial curado)** | `.agents/skills/modern-web-guidance/SKILL.md` | Instalado solo el pack `modern-web-guidance` en rama `02-web-platform-ui` (soporte `05-qa-seo-deploy`). Excluido pack `chrome-extensions` y tópicos fuera de v1.0 (`DF-D06`). |
| 2026-11-23 | `google-labs-code/stitch-skills` (`main` / `62fdcd6`) | Suite de Skills de IA (`SKILL.md` + `scripts/`/`resources/`/`examples/`) | **APROBADO (7 de 16 skills)** | `.agents/skills/{taste-design,design-md,enhance-prompt,generate-design,manage-design-system,shadcn-ui,react-components}/SKILL.md` | Instaladas 7 skills en nivel 1 (`02-web-platform-ui` y `03-frontend-architecture`). Excluidas 9 skills incompatibles o redundantes y descartado Buzzy MCP en v1.0 (`DF-D07`). |
| 2026-11-23 | `vercel-labs/agent-skills` (`main` / `5a37a63`) | Suite de Skills de IA (`SKILL.md` + `references/`/`scripts/`/`rules/`) | **APROBADO (5 de 9 skills)** | `.agents/skills/{vercel-react-best-practices,vercel-composition-patterns,web-design-guidelines,vercel-react-view-transitions,deploy-to-vercel}/SKILL.md` | Instaladas 5 skills en nivel 1 (`02-web-platform-ui`, `03-frontend-architecture` y `05-qa-seo-deploy`). Excluidas `react-native-guidelines` (`vercel-react-native-skills`), `vercel-optimize` y `writing-guidelines` (`DF-D08`). |
| 2026-11-23 | `anthropics/skills` (`main` / `e4bb5d9`) | Suite de Skills de IA (`SKILL.md` + `scripts/`/`references/`) | **APROBADO (3 de 20 skills)** | `.agents/skills/{skill-creator,webapp-testing,pdf}/SKILL.md` | Instaladas 3 skills complementarias sin solapamiento (`01-orchestration-governance`, `04-i18n-content`, `05-qa-seo-deploy`). Excluidas `docx`, `pptx`, `xlsx`, `frontend-design`, `mcp-builder` y las 12 skills restantes (`DF-D09`). |
| 2026-11-24 | `emilkowalski/skills` (`main` / `64eb3de`) | Suite de Skills de IA (`SKILL.md` + `RECIPES.md`, MIT) | **APROBADO (4 de 20 skills · DF-D19)** | `.agents/skills/{emil-design-eng,animate,animation-performance,mobile-native}/SKILL.md` | Incorporación excepcional bajo `DF-D19` en rama `02-web-platform-ui` (cero scripts ejecutables; `Gen: Safe`, `Socket: 0 alerts`). Excluidas las 16 skills restantes; sin instalar paquetes npm en Fase 3C Bloque A. |
| 2026-11-24 | `CloudAI-X/threejs-skills` (`main` / `0e18186`) | Suite de Skills de IA (`SKILL.md`, MIT) | **APROBADO (2 de 13 skills · DF-D19)** | `.agents/skills/{threejs-react-three-fiber,threejs-performance}/SKILL.md` | Incorporación excepcional bajo `DF-D19` acotada a evaluar una única pieza 3D arquitectónica condicional en el Hero (cero scripts ejecutables; `Gen: Safe`, `Socket: 0 alerts`, `Snyk: Low Risk`). Excluidas las 11 skills restantes; prohibidas escenas 3D adicionales en v1.0 y sin instalar paquetes npm en Bloque A. |

---

## Fichas Técnicas de Skills Integradas

### 1. `modern-web-guidance` (`GoogleChrome/modern-web-guidance`)
- **URL del repositorio**: https://github.com/GoogleChrome/modern-web-guidance
- **Versión integrada**: `v1.0.2`
- **Rama oficial asignada**: `02-web-platform-ui` *(con soporte secundario a `05-qa-seo-deploy`)*
- **Ruta exacta en nivel 1**: `.agents/skills/modern-web-guidance/SKILL.md`
- **Packs descartados**: `chrome-extensions` (no aplica a `devfolio-core`).
- **Guías y capacidades excluidas en v1.0**:
  - `built-in-ai`
  - `wasm`
  - `pwa`
  - `webmcp`
  - `apply-webgl-shaders`
  - `interactive-content-in-3d-scenes`
  - Prohibida la creación o activación de `.mwgrc` con `allowOriginTrials` o `allowVolatileFeatures`.
- **Comandos de uso y mantenimiento**:
  - Búsqueda de patrones: `npx modern-web-guidance@latest search "<query>"`
  - Auditoría de patrones legacy: `npx modern-web-guidance@latest legacy-scan src`
  - Actualización oficial: `npx modern-web-guidance@latest update`

### 2. `stitch-skills` (`google-labs-code/stitch-skills`)
- **URL del repositorio**: https://github.com/google-labs-code/stitch-skills
- **Rama / Commit de referencia**: `main` / `62fdcd6`
- **Ramas oficiales asignadas**:
  - `02-web-platform-ui`: `taste-design`, `design-md`, `enhance-prompt`, `generate-design`, `manage-design-system`, `shadcn-ui`
  - `03-frontend-architecture`: `react-components` *(con adaptación obligatoria a Next.js 16 App Router Server/Client Components, Tailwind CSS v4 y `next-intl`)*
- **Rutas exactas instaladas en nivel 1 (7 skills)**:
  1. `.agents/skills/taste-design/SKILL.md`
  2. `.agents/skills/design-md/SKILL.md`
  3. `.agents/skills/enhance-prompt/SKILL.md`
  4. `.agents/skills/generate-design/SKILL.md` *(upstream frontmatter `name: stitch::generate-design`; instalada con `--rename generate-design`)*
  5. `.agents/skills/manage-design-system/SKILL.md` *(upstream frontmatter `name: stitch::manage-design-system`; instalada con `--rename manage-design-system`)*
  6. `.agents/skills/shadcn-ui/SKILL.md`
  7. `.agents/skills/react-components/SKILL.md` *(upstream frontmatter `name: stitch::react-components`; instalada con `--rename react-components`)*
- **Skills excluidas explícitamente en v1.0 (9 de 16)**:
  - `react-native`, `react-vite-dashboard`, `remotion`, `code-to-design`, `extract-design-md`, `extract-static-html`, `upload-to-stitch`, `site-md`, `stitch-loop`
- **Política sobre servidores MCP relacionados**:
  - **Stitch MCP**: Prerrequisito activo para `generate-design` y `manage-design-system` durante las fases de diseño/UI.
  - **Buzzy MCP**: Descartado deliberadamente en `v1.0`.
- **Método de actualización**:
  - Skills sin prefijo: `npx skills add google-labs-code/stitch-skills --skill taste-design design-md enhance-prompt shadcn-ui -y`
  - Skills con prefijo `stitch::`: `npx skills add google-labs-code/stitch-skills --skill "stitch::<nombre>" --rename <nombre> -y` (seguido de limpieza de `skills-lock.json`).

### 3. `agent-skills` (`vercel-labs/agent-skills`)
- **URL del repositorio**: https://github.com/vercel-labs/agent-skills
- **Rama / Commit de referencia**: `main` / `5a37a63`
- **Ramas oficiales asignadas**:
  - `02-web-platform-ui`: `web-design-guidelines`, `vercel-react-view-transitions` *(con regla estricta de transiciones sobrias y respeto a `prefers-reduced-motion`)*
  - `03-frontend-architecture`: `vercel-react-best-practices`, `vercel-composition-patterns`
  - `05-qa-seo-deploy`: `deploy-to-vercel` *(sujeta a la prohibición de push/deploy directo a `main` o producción sin aprobación humana explícita)*
- **Rutas exactas instaladas en nivel 1 (5 skills con sus nombres publicados)**:
  1. `.agents/skills/vercel-react-best-practices/SKILL.md` *(nombre publicado para `react-best-practices`)*
  2. `.agents/skills/vercel-composition-patterns/SKILL.md` *(nombre publicado para `composition-patterns`)*
  3. `.agents/skills/web-design-guidelines/SKILL.md`
  4. `.agents/skills/vercel-react-view-transitions/SKILL.md` *(nombre publicado para `react-view-transitions`)*
  5. `.agents/skills/deploy-to-vercel/SKILL.md`
- **Skills excluidas explícitamente en v1.0**:
  - `react-native-guidelines` (publicada como `vercel-react-native-skills`)
  - `vercel-optimize`
  - `writing-guidelines`
  - *(Tampoco se instala `vercel-cli-with-tokens` por quedar fuera de la selección curada).*
- **Método de actualización**:
  - `npx skills add vercel-labs/agent-skills --skill vercel-react-best-practices vercel-composition-patterns web-design-guidelines vercel-react-view-transitions deploy-to-vercel -y` (seguido de limpieza de `skills-lock.json`).

### 4. `skills` (`anthropics/skills`)
- **URL del repositorio**: https://github.com/anthropics/skills
- **Rama / Commit de referencia**: `main` / `e4bb5d9`
- **Ramas oficiales asignadas**:
  - `01-orchestration-governance`: `skill-creator` *(solo para crear o auditar skills propias del workspace bajo el estándar `agentskills.io` con carga progresiva y mínimo uso de tokens)*
  - `04-i18n-content`: `pdf` *(acotada exclusivamente a revisión, validación o generación de `public/cv/CV-*-ES.pdf` y `public/cv/CV-*-EN.pdf`)*
  - `05-qa-seo-deploy`: `webapp-testing` *(verificación opcional en navegador local de layout responsive, rutas `/es` y `/en`, dark mode y enlaces)*
- **Rutas exactas instaladas en nivel 1 (3 skills)**:
  1. `.agents/skills/skill-creator/SKILL.md`
  2. `.agents/skills/webapp-testing/SKILL.md`
  3. `.agents/skills/pdf/SKILL.md`
- **Skills excluidas explícitamente en v1.0 (17 de 20)**:
  - Exclusiones clave por solapamiento o fuera de alcance: `docx`, `pptx`, `xlsx`, `frontend-design` (cubierto por `taste-design` + `ui-ux-craft` + `web-design-guidelines`), `mcp-builder`.
  - Resto de skills descartadas: `academy-guide`, `claude-api`, `discernment-nudge`, `algorithmic-art`, `brand-guidelines`, `canvas-design`, `doc-coauthoring`, `internal-comms`, `slack-gif-creator`, `theme-factory`, `web-artifacts-builder`, `template-skill`.
- **Prerrequisitos externos detectados en `scripts/` (NO instalados en `package.json`)**:
  - `skill-creator/scripts/`: scripts opcionales en Python 3 (`quick_validate.py`, `package_skill.py`, `run_eval.py`) para evaluación/empaquetado de skills.
  - `webapp-testing/scripts/`: `with_server.py` y uso opcional de Python + `playwright` para pruebas automatizadas locales (en Antigravity también puede delegarse al subagente nativo `browser` sin instalar paquetes en el proyecto).
  - `pdf/scripts/`: utilidades opcionales en Python (`pypdf`, `pdfplumber`, `reportlab`, `pdf2image`) para inspección/manipulación de PDFs de CV cuando se requiera fuera del runtime de Next.js.
- **Método de actualización**:
  - `npx skills add anthropics/skills --skill skill-creator webapp-testing pdf -y` (seguido de limpieza de `skills-lock.json`).

### 5. `skills` (`emilkowalski/skills`) — Enmienda `DF-D19`
- **URL del repositorio**: https://github.com/emilkowalski/skills
- **Licencia**: `MIT`
- **Rama / Commit de referencia**: `main` / `64eb3deb9a5fbfa041faf783e0bc3fd635872e9c` (`2026-11-15`)
- **Rama oficial asignada**: `02-web-platform-ui` *(soporte de ergonomía móvil y rendimiento a `05-qa-seo-deploy`)*
- **Rutas exactas instaladas en nivel 1 (4 skills)**:
  1. `.agents/skills/emil-design-eng/SKILL.md`
  2. `.agents/skills/animate/SKILL.md` *(incluye `RECIPES.md`)*
  3. `.agents/skills/animation-performance/SKILL.md`
  4. `.agents/skills/mobile-native/SKILL.md`
- **Skills excluidas explícitamente (16 de 20)**:
  - `animate-expo`, `animation-vocabulary`, `apple-design`, `ask-emil`, `ask-sonner`, `break-ui`, `choreograph`, `find-animation-opportunities`, `gestures`, `improve-animations`, `learn-taste`, `pick-ui-library`, `prototype`, `remove-animations`, `review-animations`, `write-swift`.
- **Auditoría de seguridad y gobernanza (pre-instalación)**:
  - `0` archivos ejecutables o scripts (`100%` documentación Markdown).
  - Escaneo de riesgo reportado por el CLI: `Gen: Safe`, `Socket: 0 alerts` en las 4 skills (`Snyk: Low/Med Risk` sobre guías Markdown sin ejecución automática).
  - Subordinación a gobernanza: aunque algunos ejemplos mencionan `motion/react`, `Vaul`, `Sonner` o `GSAP`, `devfolio-core` solo autoriza potencialmente `motion/react` a partir de Bloque B (`DF-D19`) y mantiene prohibida cualquier librería adicional no aprobada.
- **Método de actualización**:
  - `npx skills add emilkowalski/skills --skill emil-design-eng animate animation-performance mobile-native --agent antigravity --copy -y` (seguido de limpieza de `skills-lock.json`).

### 6. `threejs-skills` (`CloudAI-X/threejs-skills`) — Enmienda `DF-D19`
- **URL del repositorio**: https://github.com/CloudAI-X/threejs-skills
- **Licencia**: `MIT`
- **Rama / Commit de referencia**: `main` / `0e181866f095b5f06d005133876e926515390d95` (`2026-10-19`)
- **Rama oficial asignada**: `02-web-platform-ui` *(soporte técnico a `03-frontend-architecture` y `05-qa-seo-deploy`)*
- **Rutas exactas instaladas en nivel 1 (2 skills)**:
  1. `.agents/skills/threejs-react-three-fiber/SKILL.md`
  2. `.agents/skills/threejs-performance/SKILL.md`
- **Skills excluidas explícitamente (11 de 13)**:
  - `threejs-animation`, `threejs-asset-pipeline`, `threejs-fundamentals`, `threejs-geometry`, `threejs-interaction`, `threejs-lighting`, `threejs-loaders`, `threejs-materials`, `threejs-postprocessing` *(coherente con prohibición de postprocesamiento costoso en `DF-D19`)*, `threejs-shaders`, `threejs-textures`.
- **Auditoría de seguridad y gobernanza (pre-instalación)**:
  - `0` archivos ejecutables o scripts (`100%` documentación Markdown).
  - Escaneo de riesgo reportado por el CLI: `Gen: Safe`, `Socket: 0 alerts`, `Snyk: Low Risk` en ambas skills.
  - Subordinación a gobernanza (`DF-D19`): restringidas exclusivamente a evaluar e implementar —solo si el Bloque B demuestra utilidad visual y viabilidad técnica— una **única** pieza 3D arquitectónica en el Hero (`< 10.000` triángulos, presupuesto explícito de draw calls y memoria GPU, DPR adaptativo, lazy load, pausa fuera de vista/pestaña oculta, fallback SVG/CSS funcional, `prefers-reduced-motion`, sin bloquear scroll/touch y sin postprocesamiento costoso). Prohibidas escenas 3D adicionales en v1.0.
- **Método de actualización**:
  - `npx skills add CloudAI-X/threejs-skills --skill threejs-react-three-fiber threejs-performance --agent antigravity --copy -y` (seguido de limpieza de `skills-lock.json`).

---

## Notas de diseño extraídas

*(Se completará conforme se incorporen referencias visuales y librerías UI.)*
