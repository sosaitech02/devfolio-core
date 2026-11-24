---
name: ui-ux-craft
description: >-
  Enforces visual hierarchy, mobile-first layout, Tailwind CSS v4 tokens,
  accessible shadcn/ui components, light/dark parity, WCAG AA contrast, and
  subtle reduced-motion animations in devfolio-core. Use when building or
  refining components under src/components/ or styles.
---

# UI/UX Craft — `devfolio-core`

## Responsabilidades
- Diseñar y refinar componentes en `src/components/{ui,layout,sections,projects}/` y tokens visuales en `src/styles/globals.css`.
- Evitar interfaces genéricas: priorizar legibilidad técnica, jerarquía tipográfica clara y foco en reclutadores (proyectos, stack, impacto y acceso inmediato al CV).

## Reglas de ejecución
1. **Mobile-first**: Diseña primero para 375px sin scroll horizontal, luego escala a tablet y escritorio (1440px).
2. **Tokens y shadcn/ui**: Usa primitivos accesibles en `src/components/ui/` y variables semánticas de color/superficie que funcionen con paridad en modo claro y oscuro.
3. **Accesibilidad WCAG AA**:
   - Contraste ≥ 4.5:1 en texto normal y ≥ 3:1 en texto grande y controles UI.
   - Navegación completa por teclado con anillos `focus-visible` claros.
   - HTML semántico (`header`, `nav`, `main`, `section`, `article`, `footer`).
4. **Animaciones medidas**: Microinteracciones sobrias y respetuosas de `prefers-reduced-motion`. Prohibidas escenas 3D/WebGL o cursores custom (fuera de alcance v1.0).
5. **Cero texto hardcodeado**: Todo texto visible y `aria-label` debe pasar por `next-intl`.
6. **Patrones nativos modernos (`modern-web-guidance`)**: Antes de añadir JS o utilidades complejas para layout, CSS, `color-scheme`/dark mode o accesibilidad, consulta `npx modern-web-guidance@latest search "<query>"` (ver `.agents/skills/modern-web-guidance/SKILL.md`), respetando las exclusiones de v1.0 (`built-in-ai`, `wasm`, `pwa`, `webmcp`, `apply-webgl-shaders`, `interactive-content-in-3d-scenes`).
7. **Flujo de diseño con Stitch (`stitch-skills`)**: Cuando se diseñen o iteren vistas con Stitch MCP e implementación UI, sigue la secuencia `enhance-prompt` → `taste-design` / `design-md` → `generate-design` / `manage-design-system` → `shadcn-ui` (ver `.agents/skills/<nombre>/SKILL.md`), consolidando tokens finales en `.agents/rules/design-system.md`.

## Verificación
- Revisar vista móvil y escritorio en ambos temas (claro/oscuro) y confirmar que no haya overflow, texto sin traducir ni controles inaccesibles.
