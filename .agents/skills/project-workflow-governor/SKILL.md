---
name: project-workflow-governor
description: >-
  Governs project workflow, phase gates (DF-GATE-00 to DF-GATE-05), and v1.0
  scope compliance in devfolio-core. Enforces the 8 Golden Anti-Hallucination
  Rules (R1-R8), reads docs/00-governance/project-state.md first, verifies gate
  status strictly from real command/file evidence without inferring approvals,
  triggers BLOCKED_BY_GOVERNANCE on violations, logs decisions in
  decision-log.md, and reports explicit exit state on closeout.
risk: high
source: custom
version: "1.0.0"
tags:
  - governance
  - workflow-gates
  - scope-guard
  - anti-hallucination
  - portfolio-v1
---

# Project Workflow Governor — `devfolio-core`

Garantiza disciplina de fases, trazabilidad y acceso rápido al estado real del repositorio sin exploraciones ciegas, sin alucinación de dependencias y sin aprobaciones implícitas.

---

## Reglas operativas obligatorias

1. **Lectura rápida obligatoria antes de explorar**
   - Al iniciar cualquier tarea, lee primero `docs/00-governance/project-state.md`.
   - Usa su índice de rutas clave para navegar directamente a los archivos relevantes en lugar de recorrer el repositorio a ciegas.

2. **Validación estricta de compuertas por evidencia (`DF-GATE-00` a `DF-GATE-05`)**
   - Contrasta el estado de las compuertas en `docs/00-governance/project-state.md` contra los criterios de `docs/00-governance/gates-registry.md` y contra evidencia real verificada en la sesión (archivos inspeccionados, `package.json`, salidas reales de comandos, builds o URLs).
   - **Prohibido inferir aprobaciones**: nunca marques una compuerta como `APPROVED`, ni asumas que una fase anterior está cerrada o que una dependencia futura ya está instalada, salvo que exista evidencia concreta y confirmación explícita.

3. **Bloqueo de alcance fuera de `docs/SCOPE.md` (v1.0) y registro de decisiones**
   - Bloquea inmediatamente cualquier solicitud fuera de `v1.0` o que intente saltar una compuerta no aprobada emitiendo el código `BLOCKED_BY_GOVERNANCE`.
   - Registra decisiones estructurales, excepciones aprobadas o cambios de gobierno en `docs/00-governance/decision-log.md` con identificador correlativo `DF-DXX`.

4. **Cierre explícito con estado verificable**
   - Al concluir cada ejecución, reporta explícitamente:
     - El **estado esperado alcanzado** o **`BLOCKED_BY_GOVERNANCE`**.
     - El estado individual vigente de las compuertas `DF-GATE-00` a `DF-GATE-05`.
     - La evidencia real de los comandos ejecutados (`pnpm typecheck`, `pnpm lint`, `pnpm build`, `git status`).

---

## 8 Reglas de Oro Anti-Hallazgos (`R1` a `R8`)

| Código | Regla de Oro | Criterio de verificación obligatoria |
| :---: | :--- | :--- |
| **`R1`** | **Lectura canónica primero** | Leer `docs/00-governance/project-state.md` y `docs/SCOPE.md` al inicio de cada turno antes de explorar carpetas a ciegas o editar archivos. |
| **`R2`** | **Cero aprobaciones o dependencias inferidas** | Prohibido asumir que una compuerta (`DF-GATE-00`..`05`) está `APPROVED` o que librerías de Fase 1/2 (`next-intl`, `shadcn/ui`, `MDX`, `Zod`) están instaladas sin verificar `project-state.md` y `package.json`. |
| **`R3`** | **Línea roja v1.0 inquebrantable** | Bloquear cualquier feature congelada de `v2.0`: CMS externos, BD SQL/NoSQL, paneles admin, blog completo, comentarios/newsletter, 3D/WebGL pesado, cursores custom, tercer idioma o push autónomo a `main`. |
| **`R4`** | **Estructura plana de skills en nivel 1** | Toda skill (interna, comando slash o externa curada) debe ubicarse en `.agents/skills/<nombre>/SKILL.md` y mapearse en `references/routing-map.md` dentro de las 5 ramas oficiales (`01`..`05`). Prohibido usar `.agent/workflows/` o subcarpetas anidadas `_external/`. Toda nueva skill propia debe seguir el estándar de `skill-creator` (carga progresiva y descripciones concisas). |
| **`R5`** | **Paridad bilingüe ES/EN al 100 %** | Cero texto visible hardcodeado en componentes. Toda clave en `messages/es.json` y todo caso de estudio en `content/projects/es/<slug>.mdx` exige su par exacto y natural en `en`. |
| **`R6`** | **Server Components por defecto y tipado estricto** | Mantener rutas y carga de datos en Server Components (Next.js 16 App Router), aislar `"use client"` al componente hoja mínimo, prohibir `any` y validar fronteras de datos/MDX con Zod (a partir de Fase 2). |
| **`R7`** | **Mobile-first, WCAG AA y movimiento sobrio** | Diseñar desde 375px hasta 1440px sin overflow horizontal, con paridad de tema claro/oscuro, contraste WCAG AA (≥ 4.5:1 texto normal), foco de teclado visible y respeto a `prefers-reduced-motion`. |
| **`R8`** | **Cero regresiones de compilación** | Ninguna ejecución se da por cerrada sin comprobar con salida real que `pnpm typecheck`, `pnpm lint`, `pnpm build` y `git status` terminan sin regresiones. |

---

## Protocolo de Bloqueo (`BLOCKED_BY_GOVERNANCE`)

Cuando una instrucción viole cualquiera de las reglas `R1`..`R8` o intente operar sobre una fase cuya compuerta previa no esté `APPROVED`:
1. **No modifiques archivos de código ni configuración.**
2. **Declara explícitamente**: `Estado: BLOCKED_BY_GOVERNANCE`.
3. **Detalla**:
   - **Compuerta / Regla activada**: (`DF-GATE-XX` y/o `R1`..`R8`).
   - **Causa verificada**: qué evidencia falta o qué límite de `docs/SCOPE.md` fue excedido.
   - **Ruta de desbloqueo**: qué paso previo debe completarse y aprobarse primero.
