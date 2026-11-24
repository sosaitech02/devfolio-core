---
name: ui-audit
description: >-
  Slash-command workflow (/ui-audit) to audit responsive layout (mobile 375px
  and desktop 1440px), light/dark theme parity, WCAG AA contrast, keyboard
  accessibility, i18n copy hygiene, and Core Web Vitals risks in devfolio-core.
---

# `/ui-audit` — Auditoría de Interfaz, Accesibilidad y Rendimiento

Ejecuta esta auditoría sobre los componentes y vistas implementados en `src/components/` y `src/app/[locale]/`.

## Secuencia de ejecución
1. **Revisión visual y responsive (`ui-ux-craft`)**:
   - Comprobar diseño mobile-first (375px), tablet (768px) y escritorio (1440px) sin scroll horizontal ni elementos recortados.
   - Revisar jerarquía tipográfica, espaciado y consistencia con `.agents/rules/design-system.md`.
2. **Modo claro/oscuro y WCAG AA**:
   - Verificar contraste de textos, badges, bordes y estados `hover`/`focus-visible` en ambos temas.
   - Verificar navegación por teclado, etiquetas semánticas y `aria-label` en botones de solo ícono.
   - Confirmar respeto por `prefers-reduced-motion`.
3. **Higiene i18n (`i18n-specialist`)**:
   - Detectar cualquier cadena de texto visible hardcodeada en JSX/TSX o desbordamientos de texto entre ES y EN (el español suele ser 15–25% más largo).
4. **Rendimiento, Web Interface Guidelines y plataforma web (`vercel-qa-seo` + `web-design-guidelines` + `modern-web-guidance`)**:
   - Detectar uso innecesario de `"use client"`, imágenes sin `next/image` o sin dimensiones explícitas y dependencias pesadas en el cliente.
   - Auditar el cumplimiento de `.agents/skills/web-design-guidelines/SKILL.md` (accesibilidad, estados de foco, formularios, tipografía y microinteracciones).
   - Ejecutar el paso verificable `npx modern-web-guidance@latest legacy-scan src` para detectar patrones web legacy y proponer alternativas nativas modernas dentro del alcance v1.0.
   - *(Opcional con servidor local activo)*: Apoyarse en `.agents/skills/webapp-testing/SKILL.md` para verificar en navegador local los viewports (375px/1440px), el cambio de tema claro/oscuro y las rutas `/es` y `/en`.
5. **Reporte**: Entregar hallazgos clasificados por severidad (`Crítico`, `Mejora`, `Pulido`) con archivos exactos y propuesta de corrección.
