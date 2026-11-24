---
name: add-project
description: >-
  Slash-command workflow (/add-project) to ingest a GitHub repository and live
  demo into devfolio-core, producing paired ES/EN MDX case studies, validating
  i18n/Zod schemas, and verifying build readiness for Vercel preview deploy.
---

# `/add-project` — Ingesta de Proyecto a `devfolio-core`

Ejecuta este flujo paso a paso cuando el usuario quiera publicar o actualizar un proyecto real en el portafolio.

## Entradas requeridas
- URL del repositorio de GitHub (obligatoria).
- URL de demo en vivo (opcional si es librería/CLI; confirmar con el usuario).
- Capturas o confirmación de ruta en `public/images/projects/<slug>/` (si faltan, indicar qué capturas agregar).
- Indicar si es proyecto destacado (`featured: true`) y su prioridad (`order`).

## Secuencia de ejecución
1. **Verificar fase**: Confirmar en `docs/SCOPE.md` que el motor de contenido MDX (Fase 2) está activo antes de crear archivos definitivos (o advertir si todavía estamos en Fase 0/1).
2. **Ingesta técnica (`github-project-ingestor`)**: Analizar README, stack real y arquitectura del repo; definir `slug` estable en `kebab-case` y redactar `content/projects/es/<slug>.mdx` y `content/projects/en/<slug>.mdx`.
3. **Paridad bilingüe (`i18n-specialist`)**: Revisar naturalidad técnica en ES y EN y validar que todos los campos estructurados coincidan entre ambos archivos.
4. **Validación QA (`vercel-qa-seo`)**: Ejecutar `pnpm typecheck`, `pnpm lint` y `pnpm build`; comprobar imágenes, links y metadatos OpenGraph del proyecto.
5. **Entrega**: Resumir archivos creados, capturas pendientes (si aplica) y sugerir mensaje de commit en rama `feat/project-<slug>` (sin hacer push directo a `main`).
