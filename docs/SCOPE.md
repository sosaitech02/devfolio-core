# devfolio-core — Contrato de Alcance y Hoja de Ruta

> Documento maestro de control del proyecto. Ningún cambio de código, dependencia o vista puede entrar al repositorio si no corresponde a la **fase activa** y al alcance **v1.0**.

- **Proyecto**: `devfolio-core`
- **Versión objetivo**: `v1.0` (Listo para postulaciones y despliegue en Vercel)
- **Fase activa**: `Fase 1 — Base Técnica y Despliegue Cero (Cerrada: DF-GATE-01 APPROVED) → Fase 2 (READY_TO_START)`
- **Rama actual**: `feat/phase-1-foundation`
- **Stack bloqueado**: Next.js 16 (App Router) · React 19 · TypeScript estricto · Tailwind CSS v4 · shadcn/ui · `next-intl` · MDX · Zod · `pnpm` · Vercel

---

## 1. Contrato de Alcance (Línea Roja v1.0 vs v2.0)

Todo lo listado en **Fuera de alcance (v2.0)** permanece congelado hasta que `v1.0` esté publicado en Vercel con proyectos reales y auditoría QA/SEO completa.

| Dimensión | Dentro de alcance (v1.0 obligatorio) | Fuera de alcance (v2.0 — Congelado) |
| :--- | :--- | :--- |
| **Stack** | Next.js App Router + TypeScript estricto + Tailwind CSS + shadcn/ui + `next-intl` + MDX + Zod + `pnpm`. | CMS externos (Sanity, Strapi), bases de datos SQL/NoSQL, paneles admin o backends custom. |
| **Idiomas** | Español (`es`) e Inglés (`en`) con paridad 100% en UI, contenido MDX, metadatos y descarga de CV por idioma. | Tercer idioma o traducciones automáticas en tiempo de ejecución. |
| **Vistas** | Home (Hero, 3–5 Proyectos Destacados, Stack, Experiencia + CV, Contacto), `/[locale]/projects` con filtro por tecnología y `/[locale]/projects/[slug]`. | Blog técnico completo, comentarios, newsletter o buscador full-text complejo. |
| **Diseño y rendimiento** | Mobile-first, modo claro/oscuro, accesible (WCAG AA), animaciones sutiles respetando `prefers-reduced-motion` y Lighthouse ≥ 95. | Escenas 3D pesadas (Three.js/WebGL), cursores custom o animaciones que degraden móvil. |
| **Automatización IA** | `.agents/` con reglas globales, `skill-master-orchestrator`, `project-workflow-governor`, 5 skills especializadas, `docs/00-governance/` y skills ejecutables `/add-project`, `/ui-audit` y `/pre-deploy`. | Agentes autónomos haciendo push directo a `main` sin revisión humana. |

---

## 2. Hoja de Ruta por Fases

No se avanza de fase sin cumplir el criterio de cierre verificable de la fase actual.

| Fase | Estado | Objetivo | Criterio de cierre verificable |
| :--- | :---: | :--- | :--- |
| **Fase 0 — Entorno y Esqueleto** | **Completada (`DF-GATE-00 APPROVED`)** | Inicializar `devfolio-core`, estructura de carpetas, `docs/SCOPE.md`, reglas/skills en `.agents/` e ingesta de repos/skills externos seleccionados. | Árbol de carpetas completo, reglas y skills válidos, repos/skills curados registrados y `pnpm lint && pnpm build` en verde. |
| **Fase 1 — Base Técnica y Despliegue Cero** | **Completada (`DF-GATE-01 APPROVED`)** | Configurar `next-intl` (`es`/`en`), `src/proxy.ts`, tema claro/oscuro, shadcn/ui base, CI en GitHub Actions, `vercel.json` y primer deploy limpio a Vercel. | Preview URL de Vercel operativa cambiando `/es` ↔ `/en` y tema claro/oscuro sin errores de hidratación ni build. |
| **Fase 2 — Motor de Contenido** | **Lista (`READY_TO_START`)** | Esquema Zod para proyectos MDX, lector tipado `src/lib/projects.ts`, validador de paridad ES/EN y datos tipados (`experience.ts`, `skills-matrix.ts`, `socials.ts`). | Carga validada de al menos 1 proyecto fixture en `es` y `en` + fallo explícito si falta un campo o idioma. |
| **Fase 3 — Interfaz y Secciones** | Pendiente | Construir Navbar, LanguageSwitcher, ThemeToggle, Footer, Hero, FeaturedProjects, TechStack, Experience + CV, Contact, `/projects` con filtro y `/projects/[slug]`. | Revisión `/ui-audit` aprobada en móvil (375px) y escritorio (1440px), contraste WCAG AA y cero texto hardcodeado. |
| **Fase 4 — Ingesta de Proyectos Reales** | Pendiente | Documentar 3 a 5 proyectos estrella mediante `/add-project` con casos de estudio ES/EN, capturas WebP/AVIF, demos y repositorios. | 3–5 proyectos reales publicados con paridad total ES/EN e imágenes optimizadas sin links rotos. |
| **Fase 5 — Auditoría QA, SEO y Lanzamiento** | Pendiente | Ejecutar `/pre-deploy`, validar OpenGraph ES/EN (LinkedIn/CV), `sitemap.ts`, `robots.ts`, CVs en PDF (`public/cv/`) y conectar dominio de producción. | Lighthouse ≥ 95, OpenGraph validado en ES y EN, CVs descargables y despliegue en producción verificado. |

---

## 3. Protocolo de Ingesta de Repositorios y Recursos Externos

Cada enlace de GitHub, librería o referencia que entre a `devfolio-core` se evalúa antes de instalarse y se registra en `docs/references.md`:

| Categoría | Destino en `devfolio-core` | Criterio de integración |
| :--- | :--- | :--- |
| **Skill / Regla de IA (`SKILL.md`)** | `.agents/skills/<nombre>/SKILL.md` | Solo se adoptan skills con valor directo para v1.0; se instalan al primer nivel de `.agents/skills/` para autodescubrimiento nativo de Antigravity y se registran en `skill-master-orchestrator/references/routing-map.md`. |
| **Librería o componente UI** | `package.json` o `src/components/ui/` | Evaluar peso en bundle, compatibilidad con Next.js 16 App Router / React 19 / Server Components y mantenimiento activo. |
| **Plantilla / Referencia visual** | `docs/references.md` (sin clonar código sucio) | Extraer únicamente tokens, patrones de layout, tipografía o espaciado y consolidarlos en `.agents/rules/design-system.md`. |
