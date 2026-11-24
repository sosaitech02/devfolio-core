<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

---

# devfolio-core — Instrucciones Maestras para Agentes

## 1. Punto de entrada obligatorio (Gobernanza y Orquestación)
Antes de explorar carpetas, planificar cambios o instalar dependencias:
1. Lee `docs/00-governance/project-state.md` para conocer la fase activa, rama, rutas clave y estado real de las compuertas `DF-GATE-00`..`DF-GATE-05`.
2. Aplica `project-workflow-governor` (`.agents/skills/project-workflow-governor/SKILL.md`) para validar alcance (`docs/SCOPE.md`) y verificar compuertas únicamente con evidencia real (prohibido inferir aprobaciones).
3. Coordina tareas compuestas o multifase desde `skill-master-orchestrator` (`.agents/skills/skill-master-orchestrator/SKILL.md`) y su mapa oficial de 5 ramas en `.agents/skills/skill-master-orchestrator/references/routing-map.md`.

## 2. Fuente de verdad del alcance
- Respeta estrictamente la **fase activa** y la línea roja **v1.0 vs v2.0** definida en `docs/SCOPE.md` y trazada en `docs/00-governance/decision-log.md`.
- Prohibido introducir features congeladas de v2.0 (CMS, BD, paneles admin, blog completo, 3D/WebGL pesado, tercer idioma).

## 3. Reglas activas del proyecto
Consulta y aplica las reglas específicas en `.agents/rules/`:
- `.agents/rules/scope-guard.md` — Control de fase, compuertas, ramas y prevención de scope creep.
- `.agents/rules/architecture.md` — Next.js 16 App Router, Server Components, TypeScript estricto, Zod y `pnpm`.
- `.agents/rules/design-system.md` — Tokens, Tailwind v4, shadcn/ui, WCAG AA y rendimiento.
- `.agents/rules/i18n-policy.md` — Paridad obligatoria ES/EN y cero texto visible hardcodeado.

## 4. Comandos slash nativos
- Disponibles como skills en nivel 1 (`.agents/skills/*/SKILL.md`): `/add-project`, `/ui-audit` y `/pre-deploy`.

## 5. Disciplina de ingeniería
- Usa exclusivamente `pnpm` (nunca `npm install` ni `yarn`).
- No hagas push directo a `main`; trabaja en ramas por fase o feature (`chore/...`, `feat/...`, `fix/...`).
- Antes de cerrar una tarea, valida con evidencia real (`pnpm typecheck`, `pnpm lint`, `pnpm build` y `git status`) y reporta el estado esperado alcanzado o bloqueado.

