# devfolio-core — Contrato de Alcance y Hoja de Ruta

> Documento maestro de control del proyecto. Ningún cambio de código, dependencia o vista puede entrar al repositorio si no corresponde a la **fase activa** y al alcance **v1.0**.

- **Proyecto**: `devfolio-core`
- **Versión objetivo**: `v1.0` (Listo para postulaciones y despliegue en Vercel)
- **Fase activa**: `Fase 4 — Ingesta de Proyectos Reales (DF-GATE-04 IN_PROGRESS · Proyecto #1 EtoursLeon ingerido bajo DF-D21)`
- **Rama actual**: `feat/phase-4-real-projects`
- **Stack bloqueado**: Next.js 16 (App Router) · React 19 · TypeScript estricto · Tailwind CSS v4 · shadcn/ui · `next-intl` · MDX · Zod · `pnpm` · Vercel · `motion` · `three` · `@react-three/fiber` v9 *(incorporación acotada por `DF-D19`/`DF-D20`, sin `@react-three/drei`, estrictamente limitada a 1 escena 3D Hero con fallback SVG/CSS)*

---

## 1. Contrato de Alcance (Línea Roja v1.0 vs v2.0)

Todo lo listado en **Fuera de alcance (v2.0)** permanece congelado hasta que `v1.0` esté publicado en Vercel con proyectos reales y auditoría QA/SEO completa.

| Dimensión | Dentro de alcance (v1.0 obligatorio) | Fuera de alcance (v2.0 — Congelado) |
| :--- | :--- | :--- |
| **Stack** | Next.js App Router + TypeScript estricto + Tailwind CSS + shadcn/ui + `next-intl` + MDX + Zod + `pnpm`. | CMS externos (Sanity, Strapi), bases de datos SQL/NoSQL, paneles admin o backends custom. |
| **Idiomas** | Español (`es`) e Inglés (`en`) con paridad 100% en UI, contenido MDX, metadatos y descarga de CV por idioma. | Tercer idioma o traducciones automáticas en tiempo de ejecución. |
| **Vistas** | Home (Hero, 3–5 Proyectos Destacados, Stack, Experiencia + CV, Contacto), `/[locale]/projects` con filtro por tecnología y `/[locale]/projects/[slug]`. | Blog técnico completo, comentarios, newsletter o buscador full-text complejo. |
| **Diseño y rendimiento** | Mobile-first, modo claro/oscuro, accesible (WCAG AA), animaciones sutiles respetando `prefers-reduced-motion` y presupuesto de rendimiento medido contra línea base. **Enmienda controlada `DF-D19`**: se habilita evaluar en Bloque B el uso potencial de `motion/react` y una **única** pieza 3D arquitectónica en el Hero (`< 10.000` triángulos, límites explícitos de draw calls y memoria GPU definidos en Bloque B, DPR adaptativo, carga diferida, pausa fuera de vista/pestaña oculta, fallback SVG/CSS funcional, sin bloquear scroll/touch y sin postprocesamiento costoso), condicionada a demostrar utilidad visual y viabilidad técnica. | Escenas 3D pesadas o adicionales (prohibida más de 1 pieza 3D en v1.0), postprocesamiento WebGL costoso, cursores custom o animaciones que degraden móvil. |
| **Automatización IA** | `.agents/` con reglas globales, `skill-master-orchestrator`, `project-workflow-governor`, `docs/00-governance/`, `32` skills en nivel 1 (`10` internas + `22` externas curadas, incluidas las 6 incorporadas por `DF-D19`) y slash commands `/add-project`, `/ui-audit` y `/pre-deploy`. | Agentes autónomos haciendo push directo a `main` sin revisión humana. |

---

## 2. Hoja de Ruta por Fases

No se avanza de fase sin cumplir el criterio de cierre verificable de la fase actual.

| Fase | Estado | Objetivo | Criterio de cierre verificable |
| :--- | :---: | :--- | :--- |
| **Fase 0 — Entorno y Esqueleto** | **Completada (`DF-GATE-00 APPROVED`)** | Inicializar `devfolio-core`, estructura de carpetas, `docs/SCOPE.md`, reglas/skills en `.agents/` e ingesta de repos/skills externos seleccionados. | Árbol de carpetas completo, reglas y skills válidos, repos/skills curados registrados y `pnpm lint && pnpm build` en verde. |
| **Fase 1 — Base Técnica y Despliegue Cero** | **Completada (`DF-GATE-01 APPROVED`)** | Configurar `next-intl` (`es`/`en`), `src/proxy.ts`, tema claro/oscuro, shadcn/ui base, CI en GitHub Actions, `vercel.json` y primer deploy limpio a Vercel. | Preview URL de Vercel operativa cambiando `/es` ↔ `/en` y tema claro/oscuro sin errores de hidratación ni build. |
| **Fase 2 — Motor de Contenido** | **Completada (`DF-GATE-02 APPROVED`)** | Esquema Zod para proyectos MDX, lector tipado `src/lib/projects.ts`, validador de paridad ES/EN y datos tipados (`experience.ts`, `skills-matrix.ts`, `socials.ts`). | Carga validada de al menos 1 proyecto fixture en `es` y `en` + fallo explícito si falta un campo o idioma. |
| **Fase 3 — Interfaz y Secciones** | **Completada (`DF-GATE-03 APPROVED`)** | Construir Navbar, LanguageSwitcher, ThemeToggle, Footer, Hero, FeaturedProjects, TechStack, Experience + CV, Contact, `/projects` con filtro y `/projects/[slug]`. | Revisión `/ui-audit` aprobada en móvil (375px) y escritorio (1440px), contraste WCAG AA y cero texto hardcodeado. |
| **Fase 3C — Estabilización, Motion y 3D Hero (`DF-D19`/`DF-D20`)** | **Completada y fusionada en `main` (`5940d43`)** | Resolver defectos de producción (Bloque A) e implementar microinteracciones con `motion/react` + 1 única escena 3D arquitectónica diferida en el Hero con fallback SVG/CSS y presupuesto GPU verificado (Bloque B). | 5 validaciones en verde (`legacy-scan 0`, `validate:content`, `typecheck`, `lint`, `build`), `680` triángulos / `6` draw calls, pausa off-viewport/tab oculta y fallback móvil/reduced-motion/no-WebGL verificados. |
| **Fase 4 — Ingesta de Proyectos Reales** | **En curso (`DF-GATE-04 IN_PROGRESS`)** | Documentar 3 a 5 proyectos estrella mediante `/add-project` con casos de estudio ES/EN, capturas WebP/AVIF, demos y repositorios (Proyecto #1 `etours-leon` ingerido en `DF-D21`; fixture eliminado). | 3–5 proyectos reales publicados con paridad total ES/EN e imágenes optimizadas sin links rotos. |
| **Fase 5 — Auditoría QA, SEO y Lanzamiento** | Pendiente | Ejecutar `/pre-deploy`, validar OpenGraph ES/EN (LinkedIn/CV), `sitemap.ts`, `robots.ts`, CVs en PDF (`public/cv/`) y conectar dominio de producción. | Lighthouse ≥ 95, OpenGraph validado en ES y EN, CVs descargables y despliegue en producción verificado. |

---

## 3. Protocolo de Ingesta de Repositorios y Recursos Externos

Cada enlace de GitHub, librería o referencia que entre a `devfolio-core` se evalúa antes de instalarse y se registra en `docs/references.md`:

| Categoría | Destino en `devfolio-core` | Criterio de integración |
| :--- | :--- | :--- |
| **Skill / Regla de IA (`SKILL.md`)** | `.agents/skills/<nombre>/SKILL.md` | Solo se adoptan skills con valor directo para v1.0; se instalan al primer nivel de `.agents/skills/` para autodescubrimiento nativo de Antigravity y se registran en `skill-master-orchestrator/references/routing-map.md`. |
| **Librería o componente UI** | `package.json` o `src/components/ui/` | Evaluar peso en bundle, compatibilidad con Next.js 16 App Router / React 19 / Server Components y mantenimiento activo. |
| **Plantilla / Referencia visual** | `docs/references.md` (sin clonar código sucio) | Extraer únicamente tokens, patrones de layout, tipografía o espaciado y consolidarlos en `.agents/rules/design-system.md`. |
