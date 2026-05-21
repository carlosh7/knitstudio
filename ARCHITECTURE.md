# knitstudio — Architecture

## Package Structure (Monorepo)

```
knitstudio/
├── packages/
│   ├── core/              ← Tipos compartidos, schemas JSON, utilidades
│   ├── canvas/            ← Wrapper GrapesJS + @grapesjs/react
│   ├── ui/                ← Componentes UI base (Toolbar, Panel, Button, Modal, etc.)
│   ├── builder/           ← App principal del builder (compone canvas + paneles)
│   ├── panels/            ← Paneles individuales lazy-loadables
│   │   ├── PropsPanel/
│   │   ├── StylePanel/
│   │   ├── ActionPanel/
│   │   ├── LayerPanel/
│   │   ├── ChatPanel/
│   │   └── GitPanel/
│   ├── api/               ← Express + PostgreSQL + Redis
│   ├── cli/               ← CLI (knit init, dev, build, export, deploy, import...)
│   ├── runtime/           ← Vanilla JS <50KB (embed en proyectos existentes)
│   ├── bridge/            ← Bridge web (iframe postMessage)
│   ├── mcp-server/        ← MCP Server (stdio + HTTP + SSE)
│   ├── plugin-sdk/        ← npm create @knitstudio/plugin
│   ├── component-sdk/     ← npm create @knitstudio/component
│   ├── export/            ← Export engine (HTML, React, Vue, RN, Capacitor...)
│   └── import/            ← Import engine (Figma, HTML, React, Webflow...)
├── apps/
│   └── docs/              ← Docusaurus documentation site
├── docker/                ← Dockerfiles + compose + portainer-stack.yml
├── config/                ← ESLint, TypeScript, Prettier root configs
└── scripts/               ← Build, release, utility scripts
```

### Principios del monorepo

- **pnpm workspaces** con catálogo centralizado de versiones
- Cada package con `package.json`, `tsconfig.json`, y `README.md` propios
- Paneles del builder son lazy-loadables para cumplir performance budget:
  - Simple mode: solo carga `canvas` + `ui` básico (<200KB)
  - Advanced mode: carga todos los paneles bajo demanda (<500KB)
- Comunicación panel ↔ canvas solo via GrapesJS API (nunca DOM directo)
- Plugin SDK registrará nuevos paneles como packages independientes

## High-Level Architecture

```
┌──────────────────────────────────────────────────────────────────────────────────────────┐
│  UI STUDIO COMPLETE                                                                      │
├──────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                          │
│  ┌──────────────────────────────────────────────────────────────────────────────────┐   │
│  │  KERNEL (Capa Ineditable — React, ~20%)                                          │   │
│  │  • Canvas engine (GrapesJS + @grapesjs/react)                                       │   │
│  │  • Iframe Bridge (web) + WebSocket Bridge (RN) + origin validation               │   │
│  │  • MCP Client + MCP Server propio (stdio + HTTP + SSE)                            │   │
│  │  • State Manager + Undo/Redo Engine + Autoguardado (IndexedDB)                    │   │
│  │  • Auto-versioning: cada guardado crea versión recuperable                        │   │
│  │  • Version Browser + Version Diff + Version Rollback                              │   │
│  │  • Component Registry + Runtime Loader                                            │   │
│  │  • Security Core: DOMPurify, origin validation, rate limiting, CSRF, Helmet       │   │
│  │  • Self-Edit Mode toggle                                                          │   │
│  │  • Performance Budget enforcement + Lighthouse CI                                 │   │
│  │  • Offline Engine: Service Worker + IndexedDB + Sync Queue                        │   │
│  │  • Simple/Advanced Mode toggle (oculta/muestra complejidad)                       │   │
│  └──────────────────────────────────────────────────────────────────────────────────┘   │
│                                                                                          │
│  ┌──────────────────────────────────────────────────────────────────────────────────┐   │
│  │  SHELL (Capa Editable — JSON layout, ~80%)                                       │   │
│  │                                                                                    │   │
│  │  La interfaz del builder (toolbars, paneles, botones, colores) se carga desde     │   │
│  │  un layout.json que knitstudio renderiza con su propio runtime.                    │   │
│  │  En self-edit mode, este layout.json se carga en el canvas para editarlo.         │   │
│  │                                                                                    │   │
│  │  Componentes del shell según el modo:                                             │   │
│  │                                                                                    │   │
│  │  MODO SIMPLE (amateur):                                                           │   │
│  │    [Crear página] [Editar texto] [Cambiar color] [Publicar] + wizard guiado       │   │
│  │                                                                                    │   │
│  │  MODO ADVANCED (profesional):                                                     │   │
│  │    Toolbar + Canvas + PropsPanel + StylePanel + ActionPanel + ChatPanel +          │   │
│  │    Annotations + LayerTree + StatusBar + GitPanel + Dashboard de monitoreo        │   │
│  └──────────────────────────────────────────────────────────────────────────────────┘   │
│                                                                                          │
│  ┌──────────────────────────────────────────────────────────────────────────────────┐   │
│  │  MCP SERVER PROPIO + PLUGIN SDK                                                   │   │
│  │  • Transport: stdio (locales), HTTP Streamable (remotos), SSE (legacy)            │   │
│  │  • Protocol: 2025-06-18 con negociación descendente                               │   │
│  │  • Resources: layouts, components, annotations, canvas state                      │   │
│  │  • Tools: 50+ (create_page, add_component, set_styles, create_flow, etc)          │   │
│  │  • Prompts: templates para AI colaborativa                                        │   │
│  │  • Compatible: opencode, Claude, Cursor, Windsurf, Cline, Copilot, etc            │   │
│  │  • Plugin SDK: `npm create @knitstudio/plugin` → lifecycle hooks, toolbar          │   │
│  │    extensions, panel extensions, custom renderers                                 │   │
│  │  • Component SDK: `npm create @knitstudio/component` → boilerplate automático      │   │
│  └──────────────────────────────────────────────────────────────────────────────────┘   │
│                                                                                          │
│  ┌──────────────────────────────────────────────────────────────────────────────────┐   │
│  │  PIPELINE DE GENERACIÓN                                                           │   │
│  │                                                                                    │   │
│  │  INPUTS:                                                                          │   │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐               │   │
│  │  │ Prompt   │ │ Canvas   │ │ Screensh │ │ Document │ │ Import   │               │   │
│  │  │ (texto)  │ │ drag     │ │ ot       │ │ o        │ │ Figma/   │               │   │
│  │  │          │ │ & drop   │ │          │ │          │ │ HTML/React               │   │
│  │  └──────────┘ └──────────┘ └──────────┘ └──────────┘ └──────────┘               │   │
│  │         │           │           │           │           │                        │   │
│  │         ▼           ▼           ▼           ▼           ▼                        │   │
│  │    ┌────────────────────────────────────────────────────────────────┐             │   │
│  │    │  JSON UNIVERSAL (schema v1)                                    │             │   │
│  │    └────────────────────────────────────────────────────────────────┘             │   │
│  │         │                                                                          │   │
│  │         ▼                                                                          │   │
│  │    ┌────────────────────────────────────────────────────────────────┐             │   │
│  │    │  RENDERERS                                                    │             │   │
│  │    │  ┌───────┐ ┌───────┐ ┌───────┐ ┌───────┐ ┌───────┐ ┌───────┐ │             │   │
│  │    │  │ Web   │ │ React │ │ Vue   │ │ RN    │ │ Cap.   │ │ Backend│ │             │   │
│  │    │  │ DOM   │ │ TSX   │ │ SFC   │ │ JSX   │ │ WebView│ │ APIs   │ │             │   │
│  │    │  └───────┘ └───────┘ └───────┘ └───────┘ └───────┘ └───────┘ │             │   │
│  │    │  ┌───────┐ ┌───────┐ ┌───────┐                               │             │   │
│  │    │  │ Tailw │ │ Svelt │ │ Flutt │  (Custom renderers via SDK)   │             │   │
│  │    │  │ ind   │ │ e     │ │ er     │                               │             │   │
│  │    │  └───────┘ └───────┘ └───────┘                               │             │   │
│  │    └────────────────────────────────────────────────────────────────┘             │   │
│  └──────────────────────────────────────────────────────────────────────────────────┘   │
│                                                                                          │
│  ┌──────────────────────────────────────────────────────────────────────────────────┐   │
│  │  GIT NATIVO (Modo REPO)                                                           │   │
│  │                                                                                    │   │
│  │  Los layouts se guardan como archivos JSON dentro del repo del proyecto:          │   │
│  │  .knitstudio/                                                                      │   │
│  │  ├── pages/                                                                       │   │
│  │  │   ├── dashboard.json                                                           │   │
│  │  │   ├── guest-list.json                                                          │   │
│  │  │   └── settings.json                                                            │   │
│  │  ├── flows/                                                                       │   │
│  │  │   └── checkin-flow.json                                                        │   │
│  │  ├── theme.json                                                                   │   │
│  │  └── mcp.json                                                                     │   │
│  │                                                                                    │   │
│  │  • Diff visual entre versiones                                                    │   │
│  │  • `knitstudio build` corre en CI/CD (GitHub Actions)                              │   │
│  │  • Branch por ambiente: main → dev → staging → production                         │   │
│  │  • Modo DB alternativo para amateurs (layouts en BD de knitstudio)                │   │
│  └──────────────────────────────────────────────────────────────────────────────────┘   │
│                                                                                          │
│  ┌──────────────────────────────────────────────────────────────────────────────────┐   │
│  │  OFFLINE ENGINE                                                                   │   │
│  │                                                                                    │   │
│  │  • Service Worker: cache de assets del builder                                   │   │
│  │  • IndexedDB: layouts + cambios no guardados                                     │   │
│  │  • Sync Queue: cambios pendientes de sincronizar                                │   │
│  │  • Network detector: online/offline status                                        │   │
│  │  • Auto-sync cuando vuelve la conexión (como Google Docs)                        │   │
│  │  • Modo avión: builder completamente funcional sin internet                      │   │
│  └──────────────────────────────────────────────────────────────────────────────────┘   │
│                                                                                          │
│  ┌──────────────────────────────────────────────────────────────────────────────────┐   │
│  │  DASHBOARD DE MONITOREO                                                           │   │
│  │                                                                                    │   │
│  │  • Tiempo de carga del builder                                                    │   │
│  │  • Layouts activos por proyecto                                                   │   │
│  │  • Peso en KB por página (componentes + assets)                                  │   │
│  │  • Componentes más usados en la organización                                     │   │
│  │  • Errores en action flows (últimas 24h)                                         │   │
│  │  • Tiempo promedio de exportación                                                │   │
│  │  • Health check del servidor (API, BD, Redis, MCP)                               │   │
│  │  • Audit trail: quién modificó qué y cuándo                                      │   │
│  └──────────────────────────────────────────────────────────────────────────────────┘   │
│                                                                                          │
│  ┌──────────────────────────────────────────────────────────────────────────────────┐   │
│  │  IMPORT ENGINE                                                                   │   │
│  │                                                                                    │   │
│  │  knit import --from=figma     --file=design.fig → JSON universal                   │   │
│  │  knit import --from=html      --url=https://x.com → JSON universal                 │   │
│  │  knit import --from=react     --dir=./src/components → JSON universal               │   │
│  │  knit import --from=webflow   --file=export.zip → JSON universal                   │   │
│  │  knit import --from=appsmith  --file=app.json → JSON universal                     │   │
│  │  knit import --from=retool    --file=app.json → JSON universal                     │   │
│  └──────────────────────────────────────────────────────────────────────────────────┘   │
│                                                                                          │
│  ┌──────────────────────────────────────────────────────────────────────────────────┐   │
│  │  FORM SUBMISSIONS + SCHEDULED ACTIONS                                              │   │
│  │                                                                                    │   │
│  │  • Form Submissions: panel para ver, buscar, exportar respuestas (CSV/Excel)       │   │
│  │  • Scheduled Actions: cron jobs que ejecutan action flows en fecha/hora fija      │   │
│  │  • Analytics integrado: pageviews, clics, conversiones de las apps generadas      │   │
│  │  • Dashboard de analytics dentro del builder                                      │   │
│  └──────────────────────────────────────────────────────────────────────────────────┘   │
│                                                                                          │
│  ┌──────────────────────────────────────────────────────────────────────────────────┐   │
│  │  CUSTOM DOMAINS + EMBED + APPROVAL WORKFLOWS                                       │   │
│  │                                                                                    │   │
│  │  • Custom CSS/JS injection: bloques head/body, scripts globales por página/proyecto │   │
│  │  • External JS libraries: cargar Chart.js, Moment.js, etc desde el builder       │   │
│  │  • Custom Domains: DNS validation, Let's Encrypt SSL, CDN proxy                   │   │
│  │  • Embed: <iframe> o <script> para incrustar en sitios externos                    │   │
│  │  • Approval Workflows: draft → review → publish con roles                         │   │
│  │  • Scheduled Publishing: programar fecha/hora de publicación                       │   │
│  │  • Exit plan: proyecto autocontenido que funcione sin runtime knitstudio           │   │
│  │  • Migración gradual: proxy inverso, convivencia legacy, página por página        │   │
│  └──────────────────────────────────────────────────────────────────────────────────┘   │
│                                                                                          │
│  ┌──────────────────────────────────────────────────────────────────────────────────┐   │
│  │  VALIDACIÓN + TESTING DEL OUTPUT                                                   │   │
│  │                                                                                    │   │
│  │  • Compilación automática del código generado antes de exportar                   │   │
│  │  • Visual regression: captura del layout vs el diseño en el builder               │   │
│  │  • Validación de action flows: las APIs existen? el schema coincide?              │   │
│  │  • Preview deployment: URL temporal para ver resultado antes de publicar          │   │
│  └──────────────────────────────────────────────────────────────────────────────────┘   │
│                                                                                          │
│  ┌──────────────────────────────────────────────────────────────────────────────────┐   │
│  │  PLUGIN GOBERNANZA                                                                  │   │
│  │                                                                                    │   │
│  │  • Plugin sandboxing: ejecución en iframe aislado con postMessage                 │   │
│  │  • Plugin permissions: el usuario autoriza lectura/escritura/API/red              │   │
│  │  • Plugin curation: review de seguridad antes de publicar en marketplace          │   │
│  │  • Plugin versioning: semver, deprecation warnings, breaking change detection     │   │
│  └──────────────────────────────────────────────────────────────────────────────────┘   │
│  └──────────────────────────────────────────────────────────────────────────────────┘   │
│                                                                                          │
│  ┌──────────────────────────────────────────────────────────────────────────────────┐   │
│  │  PREVIEW EN DISPOSITIVOS                                                          │   │
│  │                                                                                    │   │
│  │  • QR Code → celular escanea → ve el layout en vivo                              │   │
│  │  • Preview simultáneo: mobile + tablet + desktop lado a lado                     │   │
│  │  • Resoluciones configurables                                                     │   │
│  └──────────────────────────────────────────────────────────────────────────────────┘   │
│                                                                                          │
│  ┌──────────────────────────────────────────────────────────────────────────────────┐   │
│  │  OPERACIONES / SRE                                                                  │   │
│  │                                                                                    │   │
│  │  • Keystore cifrado: secrets inyectados en runtime, no en layouts ni Git          │   │
│  │  • knit backup / knit restore: BD + assets + layouts completo                     │   │
│  │  • Feature Flags: rollout gradual, kill switch por feature                        │   │
│  │  • Zero-downtime: blue/green, health checks, graceful shutdown                    │   │
│  │  • Disaster Recovery: backup strategy, restore procedure, RTO/RPO targets         │   │
│  │  • Incident Response: alerting (PagerDuty), on-call, escalation, status page      │   │
│  └──────────────────────────────────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────────────────────────────────┘
```

## Layers

### 1. Presentation Layer (Builder)
- React 19 SPA with Vite
- GrapesJS + @grapesjs/react for page design canvas
- React Flow for action flow editor
- i18n (react-intl), a11y (WCAG 2.1 AA)
- Simple/Advanced mode toggle
- Wizards guiados para amateurs
- QR preview en dispositivos reales
- Dashboard de monitoreo

### 2. API Layer (Backend)
- Express.js with PostgreSQL
- JWT + RBAC authentication + roles granulares
- Rate limiting, CSRF, Helmet
- Redis caching
- Audit logging (compliance-ready)
- Multi-tenant support
- SSO enterprise (SAML, LDAP, Azure AD, Okta)

### 3. Runtime Layer (Embeddable)
- Vanilla JS, <50KB gzip
- No dependencies
- Framework-agnostic (script tag or npm)
- Component registry for extensibility
- Modo REPO (archivos Git) o modo DB (BD central)

### 4. Plugin Layer (Extensibilidad)
- Plugin SDK: `npm create @knitstudio/plugin`
- Component SDK: `npm create @knitstudio/component`
- Lifecycle hooks: onPageLoad, onPublish, onComponentRender
- Toolbar extensions + Panel extensions
- Custom renderers (cualquiera puede hacer un renderer para Qt, Tkinter, etc)

### 5. Integration Layer (MCP + Connectors + Imports)
- MCP Server (stdio + HTTP + SSE) para 12+ clientes AI
- HTTP Action (generic REST/GraphQL)
- Native connectors (Supabase, Stripe, OpenAI, etc)
- Import Engine (Figma, HTML, React, Webflow, Retool, Appsmith)

## Data Flow

```
User designs in Builder (online/offline)
  → JSON Universal (schema v1)
    → Preview in iframe (web) or WebSocket (RN) or QR (device)
    → Auto-save to IndexedDB (cada 30s)
    → Sync to PostgreSQL when online
    → Guardar en modo REPO (archivos .knitstudio/) o modo DB
    → Versionar en Git (diff visual)
    → Export to target:
        • HTML+CSS (runtime render)
        • React TSX + Tailwind
        • Vue SFC
        • React Native (JSX + StyleSheet)
        • Capacitor (WebView + plugins)
        • Backend code (Express/FastAPI/Next.js)
    → CI/CD: knitstudio build en GitHub Actions
    → Deploy: Vercel / Netlify / Docker
```

## Database Schema (PostgreSQL)

```sql
-- Core
projects     (id, name, type, config, tenant_id, created_at)
pages        (id, project_id, route, title, layout_json, version, published, mode) -- mode: 'repo' | 'db'
page_versions(id, page_id, version, layout_json, diff_json, created_by, created_at)
components   (id, name, type, props_schema, target, registry, plugin_id)
action_flows (id, page_id, steps_json, version)
templates    (id, name, category, layout_json, preview_url, level) -- level: 1-5
annotations  (id, page_id, element_id, type, rect, content, resolved)

-- Import
import_logs  (id, project_id, source_type, source_file, result_json, created_at)

-- Plugins
plugins      (id, name, version, sdk_version, entry_point, permissions, enabled)
plugin_instances (id, project_id, plugin_id, config, enabled)

-- Git/Repo
git_commits  (id, page_id, commit_sha, branch, diff_json, created_by, created_at)

-- Security
users        (id, email, password_hash, role, tenant_id, created_at)
roles        (id, name, permissions_json) -- permissions granulares: 'styles.edit', 'actions.create', etc
api_keys     (id, project_id, key_hash, permissions, expires_at, tenant_id)
sessions     (id, user_id, token, expires_at)
tenants      (id, name, domain, config, region) -- data residency

-- Audit
audit_logs   (id, user_id, action, resource, details, ip, user_agent, created_at)
change_log   (id, user_id, page_id, diff_json, created_at)

-- Monitoring
monitoring_events (id, event_type, value, tags, timestamp)
-- event_type: 'builder_load', 'export_time', 'flow_error', 'component_usage'
```

## Performance Targets

| Metric | Target |
|--------|--------|
| Runtime gzip | <50KB |
| Builder initial (advanced) | <500KB gzip |
| Builder initial (simple mode) | <200KB gzip |
| Time to Interactive | <3s |
| First Paint | <1s |
| Lighthouse | >90 |
| Canvas 500+ components | 60fps |
| Build/Export time | <5s |
| Offline sync on reconnect | <2s latency |
| QR preview load | <3s |

## Infrastructure

```
Docker:
  knitstudio/builder   → React SPA (nginx)
  knitstudio/api       → Express + PostgreSQL
  knitstudio/cdn       → nginx (runtime.js, bridge.js, assets)
  knitstudio/mcp       → MCP Server (WebSocket)
  knitstudio/plugin-sandbox → Sandbox para ejecución de plugins

Helm Chart:
  knitstudio/charts    → Kubernetes deployment
  - builder, api, cdn, mcp, redis, postgresql
  - Ingress, cert-manager, horizontal pod autoscaling

Terraform:
  knitstudio/terraform → Infraestructura como código
  - AWS / GCP / Azure modules
  - RDS, ElastiCache, CloudFront, EKS
```
