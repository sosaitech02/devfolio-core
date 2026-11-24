# Plantilla MDX de Caso de Estudio (`content/projects/{es,en}/<slug>.mdx`)

Usa exactamente este contrato de frontmatter (validado por Zod en Fase 2) en ambos idiomas. Los campos técnicos (`slug`, `date`, `featured`, `order`, `stack`, `repoUrl`, `demoUrl`, `coverImage`) deben coincidir entre `es` y `en`.

```mdx
---
slug: "nombre-del-proyecto"
title: "Título claro y específico del proyecto"
summary: "Resumen de 1 a 2 frases con foco en el problema resuelto y valor técnico (máx. 160 caracteres)."
role: "Full-Stack Developer"
date: "2026-01"
featured: true
order: 1
stack:
  - "Next.js"
  - "TypeScript"
  - "PostgreSQL"
repoUrl: "https://github.com/usuario/repo"
demoUrl: "https://demo.ejemplo.com"
coverImage: "/images/projects/nombre-del-proyecto/cover.webp"
coverAlt: "Descripción accesible de la captura principal"
highlights:
  - "Decisión técnica o resultado concreto verificable 1"
  - "Decisión técnica o resultado concreto verificable 2"
---

## Problema y contexto

Explica brevemente qué necesidad real resuelve el sistema y bajo qué restricciones operaba.

## Arquitectura y decisiones técnicas

Describe el diseño general, por qué elegiste este stack y cómo se organizan las piezas clave.

## Retos técnicos y soluciones

Detalla 2 o 3 problemas reales que resolviste (rendimiento, modelado de datos, despliegue, UX, etc.) y cómo los abordaste.

## Resultado y aprendizajes

Resume el estado actual, qué mejoras técnicas dejó el proyecto y qué harías distinto en la siguiente iteración.
```
