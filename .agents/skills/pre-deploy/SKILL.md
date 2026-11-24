---
name: pre-deploy
description: >-
  Slash-command workflow (/pre-deploy) to run full pre-release verification in
  devfolio-core: typecheck, lint, production build, ES/EN parity checks, broken
  links, SEO/OpenGraph validation, and Vercel configuration audit before merging
  to main or deploying.
---

# `/pre-deploy` — Puerta de Calidad Pre-Despliegue

Ejecuta este flujo completo antes de abrir PR hacia `main` o publicar una versión en Vercel.

## Secuencia de ejecución
1. **Verificación de alcance**: Confirmar contra `docs/SCOPE.md` que los cambios corresponden a la fase activa y no introducen elementos congelados de v2.0.
2. **Chequeo de código y compilación (`frontend-architect`)**:
   - Ejecutar `pnpm typecheck`
   - Ejecutar `pnpm lint`
   - Ejecutar `pnpm build`
3. **Chequeo de paridad i18n (`i18n-specialist`)**:
   - Verificar claves idénticas en `messages/es.json` y `messages/en.json`.
   - Verificar slugs idénticos en `content/projects/es/` y `content/projects/en/`.
4. **Chequeo SEO, activos y Vercel (`vercel-qa-seo` + `deploy-to-vercel`)**:
   - Revisar `sitemap.ts`, `robots.ts`, metadatos OpenGraph por idioma, peso de imágenes, enlaces rotos y existencia de CVs en `public/cv/`.
   - Revisar `vercel.json` (headers de seguridad y caché) y preparar el flujo de despliegue según `.agents/skills/deploy-to-vercel/SKILL.md`, manteniendo bloqueado cualquier push o deploy a `main` / producción hasta contar con autorización humana explícita.
   - *(Opcional con servidor local activo)*: Verificar rutas `/es` y `/en`, dark mode y enlaces en navegador local apoyándose en `.agents/skills/webapp-testing/SKILL.md`.
5. **Veredicto final**: Emitir tabla `PASS / FAIL / WARN` y bloquear la recomendación de merge si existe algún `FAIL`.
