---
name: vercel-qa-seo
description: >-
  Audits production readiness for Vercel deployment in devfolio-core:
  typecheck, ESLint, production build, broken links, image optimization,
  ES/EN OpenGraph cards, sitemap/robots, CV PDF availability, and vercel.json
  security/cache headers. Use before merging to main or releasing to production.
---

# Vercel QA & SEO — `devfolio-core`

## Responsabilidades
- Validar que cada cambio desplegable en Vercel cumpla calidad de producción, velocidad (Lighthouse ≥ 95) y presentación impecable al compartir el enlace en LinkedIn, correo o CV.

## Lista de verificación
1. **Integridad técnica**:
   - `pnpm typecheck`
   - `pnpm lint`
   - `pnpm build`
2. **Paridad y enlaces**:
   - Ningún proyecto faltante entre `content/projects/es/` y `content/projects/en/`.
   - Claves idénticas en `messages/es.json` y `messages/en.json`.
   - Verificación de enlaces internos, demos, repos de GitHub y archivos `public/cv/CV-*-{ES,EN}.pdf`.
3. **SEO y OpenGraph bilingüe**:
   - `src/app/sitemap.ts` y `src/app/robots.ts` generando URLs válidas con `es` y `en`.
   - Metadatos `title`, `description`, `openGraph`, `twitter` y `alternates.languages` por idioma.
   - Imágenes en `public/og/` y `public/images/projects/` en formato optimizado (WebP/AVIF/PNG optimizado) y sin pesos excesivos.
4. **Configuración y despliegue en Vercel (`deploy-to-vercel`)**:
   - `vercel.json` con cabeceras de seguridad (CSP/X-Frame-Options/Referrer-Policy/X-Content-Type-Options) y política de caché adecuada para assets estáticos y CVs.
   - Al preparar o ejecutar despliegues de previsualización, apóyate en `.agents/skills/deploy-to-vercel/SKILL.md` respetando la restricción inquebrantable de `docs/SCOPE.md`: prohibido hacer push o deploy directo a `main` / producción sin revisión y aprobación humana explícita.

## Criterio de aprobación
- Reportar explícitamente el estado de cada punto (Aprobado / Pendiente / Bloqueante) antes de recomendar merge a `main`.
