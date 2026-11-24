# Scope Guard & Phase Discipline

1. **Read governance state first**: Always read `docs/00-governance/project-state.md` and `docs/SCOPE.md` before exploring folders or planning work, following `project-workflow-governor`.
2. **Evidence-only gate checks**: Validate `DF-GATE-00`..`DF-GATE-05` against `docs/00-governance/gates-registry.md` using real command/file evidence. Never infer or assume gate approvals.
3. **Hard stop on v2.0 scope**: Never add CMS integrations, SQL/NoSQL databases, admin panels, blogs, newsletters, comment systems, 3D/WebGL scenes, custom cursors, or a third language during v1.0 (`DF-D04`).
4. **One phase at a time**: Do not jump ahead to future phases whose predecessor gate is not `APPROVED`. Log governance or scope decisions in `docs/00-governance/decision-log.md`.
5. **External repo vetting**: Before installing any external repository, skill, or UI package, evaluate it against the ingestion protocol in `docs/SCOPE.md`, record the decision in `docs/references.md`, and map adopted level-1 skills in `.agents/skills/skill-master-orchestrator/references/routing-map.md`.
6. **Safe Git workflow**: Never commit or push directly to `main`. Keep changes scoped to phase/feature branches (`chore/phase-*`, `feat/*`, `fix/*`) and require human review before merging to `main`.
