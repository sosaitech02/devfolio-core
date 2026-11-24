---
name: github-project-ingestor
description: >-
  Analyzes a GitHub repository (README, structure, stack, architecture, and
  demo links) and drafts bilingual technical case studies in
  content/projects/es/<slug>.mdx and content/projects/en/<slug>.mdx following
  devfolio-core's Zod schema. Use when adding or updating portfolio projects.
---

# GitHub Project Ingestor — `devfolio-core`

## Responsabilidades
- Transformar repositorios reales de GitHub en casos de estudio técnicos concisos, verificables y orientados a reclutadores e engineering managers.
- Generar siempre ambos archivos (`es` y `en`) conforme a [project-mdx-template.md](./references/project-mdx-template.md).

## Pasos
1. **Recopilar evidencia real**: Lee el README, `package.json` (o manifiestos equivalentes), estructura de carpetas y URL de demo/repo proporcionados por el usuario. Nunca inventes métricas, usuarios o resultados que no estén confirmados.
2. **Definir slug e inventario de activos**:
   - Usa un `slug` en `kebab-case` estable e idéntico para `es` y `en`.
   - Verifica qué capturas optimizadas (`public/images/projects/<slug>/...`) existen o solicita al usuario las capturas reales.
3. **Redactar ambos casos de estudio**:
   - Sigue exactamente el frontmatter y las secciones de [project-mdx-template.md](./references/project-mdx-template.md): contexto/problema, decisiones de arquitectura, retos técnicos y resultado/aprendizajes.
   - Escribe cada idioma de forma natural (no traducción robótica).
4. **Validar**:
   - Confirma paridad de metadatos entre `es` y `en` y valida la compilación/esquema Zod con `pnpm typecheck && pnpm build`.
