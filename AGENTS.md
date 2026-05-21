# AGENTS.md — knitstudio

## Información General

- **Proyecto:** knitstudio — Visual Application Builder Universal
- **Repo:** `github.com/knitstudio/knitstudio`
- **Dominio:** `knitstudio.io`
- **API:** `api.knitstudio.io`
- **CDN:** `cdn.knitstudio.io`
- **Docs:** `docs.knitstudio.io`
- **Licencia:** MIT
- **Despliegue:** Self-hosted (Docker) + Cloud (knitstudio.io multi-tenant)
- **Modelo:** Self-hosted gratis + Cloud freemium ($29/mes Pro)
- **npm scope:** `@knitstudio/*`
- **Docker org:** `knitstudio`
- **GitHub org:** `github.com/knitstudio`

## Stack

| Capa | Tecnología |
|------|-----------|
| Builder | React 19 + Vite + TypeScript |
| Page Designer | GrapesJS + @grapesjs/react |
| Action Editor | React Flow (36.6K⭐, MIT) |
| Runtime | Vanilla JS (<50KB gzip) |
| API | Express + PostgreSQL + Redis |
| MCP | @modelcontextprotocol/sdk |
| Plugin SDK | @knitstudio/plugin-sdk |
| Component SDK | @knitstudio/component-sdk |
| Docs | Docusaurus 3 |
| CI/CD | GitHub Actions |
| Offline | Service Worker + IndexedDB |
| Error tracking | Sentry |
| Analytics | PostHog |

## Reglas para el agente

1. **Siempre leer ROADMAP.md primero** para saber el estado actual y qué sigue
2. **Siempre leer ARCHITECTURE.md** antes de hacer cambios estructurales
3. **Siempre leer SECURITY.md** antes de implementar cualquier feature que maneje datos del usuario
4. **Actualizar CHANGELOG.md** después de cada cambio significativo
5. **Nunca asumir la versión** — leer desde package.json
6. **Incrementar solo el último dígito (Z):** X.Y.Z → X.Y.(Z+1)
7. **No borrar ni simplificar funciones existentes** — crear nuevas al lado
8. **Documentar toda decisión técnica** en docs/ con enlace desde CHANGELOG

## Flujo de trabajo

1. Explicar plan al usuario
2. Esperar confirmación
3. Implementar
4. Version bump + commit + push + tag
5. Actualizar CHANGELOG y ROADMAP
6. Informar al usuario

## Documentos clave

| Archivo | Propósito |
|---------|-----------|
| `ROADMAP.md` | Plan maestro, fases, estado actual |
| `ARCHITECTURE.md` | Arquitectura completa del sistema |
| `AGENTS.md` | Instrucciones para el agente |
| `CHANGELOG.md` | Bitácora de cambios |
| `SECURITY.md` | Plan de seguridad antes del MVP |
| `PERFORMANCE.md` | Targets de rendimiento |
| `COMPONENTS.md` | Catálogo de componentes |
| `CONNECTORS.md` | Conectores a servicios/APIs |
| `MCP_COMPATIBILITY.md` | Compatibilidad con clientes MCP |
| `JSON_SCHEMA.md` | Schema universal JSON |
| `COMPETITION.md` | Análisis de competencia |
| `MOBILE.md` | Plan de soporte mobile nativo |
| `GAPS_AUDIT.md` | Auditoría de gaps y resoluciones |
| `DOCUMENTATION_PLAN.md` | Plan de documentación estilo Ubuntu |
| `COMMUNITY_PLAN.md` | Plan de comunidad open source |
| `THIRD_PARTY_LICENSES.md` | Licencias de dependencias |
| `docs/` | Documentación detallada por área |

## Conceptos clave a no olvidar

1. **Modo Simple vs Advanced** — toggle que cambia toda la UX. Simple = 3 botones + wizards. Advanced = builder completo
2. **Modo REPO vs Modo DB** — REPO = layouts como archivos JSON en Git del proyecto. DB = layouts en BD de knitstudio
3. **Import Engine** — Figma, HTML, React, Webflow, Retool, Appsmith. `knit import --from=...`
4. **Plugin SDK** — `npm create @knitstudio/plugin`. Terceros extienden la plataforma
5. **Offline-first** — Service Worker + IndexedDB + Sync Queue. Modo avión funcional
6. **Enterprise ready** — multi-tenant, roles granulares, SSO, Helm, Terraform, data residency
7. **Dashboard de monitoreo** — métricas del builder, errores, uso, rendimiento en tiempo real
8. **Preview en dispositivo real** — QR code → celular ve el layout
9. **CLI Headless** — `knit layout:create`, `component:add`, `export`, `deploy` sin abrir el navegador
10. **Sentry + PostHog** — error tracking y analytics del propio builder

## Comandos rápidos

```bash
# Desarrollo local
docker compose up
# Builder: http://localhost:3000
# API: http://localhost:3001

# Tests
pnpm test
pnpm test:coverage
pnpm lint
pnpm typecheck

# Build
pnpm build
knit export --format=react --out=./dist
```
