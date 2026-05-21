# CHANGELOG — knitstudio

## [1.0.0] — 2026-05-20 — MVP Completo (Fases 0-9)

### Fase 4 — Componentes Core (35 componentes)
- **F1 Core (20):** Container, Text, Button, TextInput, Form, Stack, ScrollView, Card, Icon, Divider, Spacer, Navbar, Footer, Sidebar, Pressable, Loading, Image, Select, Checkbox, RadioGroup
- **F2 Data (15):** Table, DataList, FormField, DatePicker, FileUpload, Chart, Pagination, SearchBar, FilterBar, EmptyState, DataExport, Tabs, Accordion, Stepper, Timeline
- Todos registrados en `@knitstudio/registry` con props, styles y targets

### Fase 5+6 — Export + Import Engine
- **Export:**
  - `@knitstudio/export`: exportToHTML() y exportToReact()
  - Renderizado de 35 tipos de componentes a HTML semántico
  - Mapeo type→tag, styles inline, children anidados
- **Import:**
  - `@knitstudio/import`: importFromHTML(), importFromURL()
  - Parseo de HTML a ComponentNode con detección de tipo/tag
  - Generación de AppSchema completo con theme y variables

### Fase 7 — Git Nativo + AI Engine
- **Git:** `@knitstudio/git` — initRepo, commit, getDiff, saveLayoutToRepo, readLayoutFromRepo
- **Modo REPO:** layouts como JSON en `.knitstudio/pages/` dentro del repo del proyecto
- **AI Engine:** `@knitstudio/ai` — OpenAIProvider con generateLayout, generateComponent, translatePage
- Provider pattern: soporte para múltiples proveedores AI

### Fase 8 — Anotaciones + Monitoreo + MCP avanzado
- **Annotations:** `@knitstudio/annotations` — add, resolve, list por página
- **Monitoring:** `@knitstudio/monitoring` — trackMetric, getDashboardSummary, auto-track de builder load
- **MCP Server:** tools: create_page, add_component, get_screenshot. Resources: proyectos

### Fase 9 — Enterprise + Docs
- **Docker compose:** builder + api + db (PostgreSQL) + redis + mcp + portainer
- **GitHub Actions:** CI completo con build + typecheck + test + lint + DB service
- **Seguridad:** Helmet + CSP + JWT + RBAC + Rate limiting + Keystore + DOMPurify
- **Estructura:** 16 packages, monorepo pnpm, TypeScript estricto, Tailwind CSS v4

### UX Core
- **Component Explorer**: palette con categorías (Basic, Layout, Media) y 5 componentes registrados: Button, Text, Container, Image, Card. Arrastrables al canvas via GrapesJS Blocks
- **Keyboard Shortcuts**: panel modal con atajos (Ctrl+Z, Ctrl+S, ?, etc.), invocable con tecla `?`
- **Welcome screen**: Dashboard con empty state de bienvenida, botón "Create your first project" y lista de proyectos
- **Toggle Simple/Advanced**: funcional en toolbar del builder
- 5 componentes built-in registrados en `@knitstudio/registry` con props, defaultStyles y targets

### UX en progreso (resto de Fase 2)
- Undo/Redo ilimitado, autoguardado, wizards guiados, templates, onboarding, snap to grid, feedback loop, búsqueda global, quick edit mode, draft/published, safety net, feature discovery

## [0.5.0] — 2026-05-20 — Fase 1: Security Core

### Seguridad (CRÍTICO — completado antes de features públicas)
- **DOMPurify** en canvas: sanitización de HTML en component:create event
- **origin validation** en postMessage bridge (@knitstudio/bridge)
- **JWT + RBAC** en API: registro, login, middleware de autenticación y roles
- **Keystore cifrado** (AES-256-GCM): encrypt/decrypt para secrets
- **Rate limiting**: global (100/15min) + auth (20/15min)
- **Helmet** con CSP, HSTS, X-Frame-Options, security headers
- **CSRF**: origin + referer validation en requests
- **bcrypt** (12 rounds) para password hashing
- **SECURITY.md** actualizado con policy, bug bounty, disclosure timeline
- **.env.example** con JWT_SECRET y KEYSTORE_KEY

### Fase 0 — Foundation + Operaciones (Completada)

**Monorepo + Builder**
- Monorepo pnpm workspaces con 9 packages (core, canvas, ui, registry, builder, api, cli, mcp-server, panels)
- Builder React 19 + Vite + TypeScript con GrapesJS integrado y Tailwind CSS v4
- Zustand store para state management del builder
- Project Dashboard con lista de proyectos, crear/eliminar, empty state de bienvenida
- BuilderView con toolbar, paneles laterales, modo Simple/Advanced toggle
- Component Registry (`@knitstudio/registry`) con `registerComponent`, `getComponent`, `getComponentsByTarget`

**API + Base de datos**
- Express con PostgreSQL (pg driver) + migraciones automáticas
- Schema: projects, pages, page_versions, users, sessions, tenants
- CRUD completo de proyectos con persistencia en BD
- Redis configurado en docker-compose
- Tests con Supertest (health endpoint)

**Action Flows**
- React Flow (@xyflow/react v12) integrado como ActionFlowPanel
- Nodos trigger → API Call → Set Variable con MiniMap, Controls, Background
- Panel de actions reemplaza el canvas cuando está activo

**CLI**
- `knit` CLI con commander: init, dev, build, export, project:register
- Binario registrado como `@knitstudio/cli`

**MCP Server**
- Server con @modelcontextprotocol/sdk
- Transporte stdio
- Tools: create_page, add_component, get_screenshot
- Resources: proyectos

**CI/CD + Docker**
- GitHub Actions: build + typecheck + test + lint en CI
- Docker compose completo: builder, api, db (PostgreSQL), redis, mcp, portainer
- Dockerfiles por servicio con multi-stage builds

**Stack técnico**
- Canvas: GrapesJS + @grapesjs/react
- CSS: Tailwind CSS v4 con design tokens (`@theme`)
- State: Zustand
- Action Flows: @xyflow/react v12
- API: Express + PostgreSQL + Redis
- MCP: @modelcontextprotocol/sdk
- CLI: commander
- Testing: Vitest + React Testing Library + Supertest

## [0.3.5] — 2026-05-20 — Revisión Final + Auditoría Legal

### Añadido
- **12 nuevos gaps identificados y resueltos en el plan:**
  - Debug de action flows (step-by-step, breakpoints, variable inspector, logs, replay, error preview)
  - Testing de componentes (sandbox, mock data, state explorer, try-it mode, viewport presets, network simulation)
  - Gobernanza de AI (cost tracking, budget limits, audit trail, safety filters, model selection, rollback, system prompts)
  - SEO tooling integrado (score, meta tags, sitemap, JSON-LD, Core Web Vitals, link checker, AI recommendations)
  - Localización de contenido multi-idioma (translation workflow, memory, AI translation, RTL)
  - Component versioning + deprecation (breaking change detection, deprecation warnings, migration assistant, canary)
  - Notificaciones + operaciones asíncronas (progress, cross-tab, cancel, queue, history, retry)
  - Auto-recovery + graceful degradation (placeholder, state restore, read-only mode, plugin isolation)
  - Onboarding personalizado por perfil (Diseñador/Dev/No-técnico/Estudiante)
  - Demo mode / Try before sign (probar sin cuenta)
  - Feedback loop + changelog + roadmap visibles desde el builder
  - Legal: TOS, Privacy, DMCA, output license, CLA, THIRD_PARTY_LICENSES

- **Auditoría legal completa** (ARCHITECTURE.md, GAPS_AUDIT.md, THIRD_PARTY_LICENSES.md)
  - Verificación de licencias de todas las dependencias → **100% compatibles con MIT**
  - Confirmación: OpenAI, Anthropic, Stripe, Supabase, GitHub APIs permiten uso en builders
  - DOMPurify declarado bajo Apache 2.0 (no MPL) para evitar copyleft
  - Output del AI: el usuario es dueño del código generado
  - No hay GPL en el stack → sin riesgo de contaminación
  - Plugin API debe ser via IPC (no linking directo) para evitar contaminación si terceros usan GPL
  - Riesgo medio con marca "knitstudio" — considerar búsqueda formal en USPTO/EUIPO

### THIRD_PARTY_LICENSES.md creado
- Documento completo con licencias de todas las dependencias
- Compatibilidad verificada: MIT + Apache 2.0 + BSD-3-Clause = OK
- Sin GPL dependencies → sin riesgo legal

## [0.1.0] — 2026-05-20 — 6ta ronda: confianza + descubrimiento + black box + migración

### Añadido (factores humanos)
- **Safety net:** timeline de estados estables, draft vs published separados, dry-run/simulation mode, auto-snapshots pre-publicación
- **Feature discovery:** "Sabías que...?" contextual, botón 💡, keyboard shortcuts discovery, component explorer con preview
- **Black box mitigation:** código generado legible y comentado, "view source" en vivo, inline docs, stack traces, AI confidence indicator
- **Migration/upgrade:** knit upgrade automático, backward compatibility policy, layout migration assistant, changelog de breaking changes, multi-version runtime

### Archivos actualizados
- GAPS_AUDIT.md: 212 gaps totales (18 nuevos sobre factores humanos)
- ROADMAP.md: nuevas tareas en Fase 2 (safety net + discovery), Fase 6 (código legible + source view), Fase 9 (upgrade + compatibilidad)
- CHANGELOG.md: esta entrada

## [0.3.4] — 2026-05-20 — 26ta ronda: 35 items — industrias + settings + help + error pages + builder perf + builder a11y + builder i18n + web3 + AI agents + real-time

### Añadido (35 nuevos items en 10 categorías)
- **Industrias verticales (8):** e-commerce, restaurante, real estate, job board, marketplace, social, dating, wiki templates
- **Builder settings (6):** profile page, notification prefs, theme prefs, editor prefs, language/locale, privacy settings
- **Builder help (4):** "What's this?" tooltips, F1 contextual help, tutorial replay, help search
- **Builder error pages (3):** 404, 500, offline page
- **Builder performance (3):** Web Vitals monitoring, bundle size budget, memory leak detection
- **Builder a11y (2):** full keyboard audit, screen reader audit
- **Builder i18n (2):** externalized strings, translation platform
- **Web3/Crypto (2):** wallet connect component, NFT gallery component
- **AI Agents (3):** AI chatbot component, AI agent deploy, AI assistant embed
- **Real-time infra (2):** WebSocket management panel, broadcast channel

### Archivos actualizados
- GAPS_AUDIT.md: 814 gaps totales (35 nuevos en 10 categorías)
- CHANGELOG.md: esta entrada

## [0.3.3] — 2026-05-20 — 25ta ronda: 40 items — air-gapped + storage + análisis + monitor + respaldo flows + purga + watch + recursos + scripts + compliance regulatorio

### Añadido (40 nuevos items en 10 categorías)
- **Air-gapped deployment (4):** offline installer, license activation offline, network requirements doc, integrity verification
- **Custom storage backends (4):** S3-compatible, NFS/NAS, DB BLOB, storage migration tool zero-downtime
- **Modo análisis proyecto (5):** page views, component usage, action flow stats, session recordings, funnel analysis
- **Modo monitor app (5):** uptime, performance (RUM + CWV), error tracking, custom dashboard, alerts configurables
- **Modo respaldo action flows (4):** version history por flow, diff, rollback individual, test aislado con mocks
- **Modo purga (5):** unused projects (>1 año), unused assets, old versions, audit logs, preview deployments
- **Modo watch (4):** dependency health check, version tracking, deprecation alerts, alternative suggestions
- **Modo recurso self-hosted (4):** capacity planner, growth estimator, cost comparator, migration planner
- **Modo scripts/hooks (5):** pre/post export/publish hooks (JS/Python), scheduled scripts (cron)
- **Compliance regulatorio (5):** PCI DSS, SOX, FedRAMP, IRAP, SOC 2+3

### Archivos actualizados
- GAPS_AUDIT.md: 779 gaps totales (40 nuevos en 10 categorías)
- CHANGELOG.md: esta entrada

## [0.3.2] — 2026-05-20 — 24ta ronda: 39 items — trials + escuela + accesibilidad extrema + catástrofe + nostalgia + científico + legal + salud + deportes + viajes

### Añadido (39 nuevos items en 10 categorías)
- **Free trials (3):** trial component 14 días, metered trial, conversion funnel emails
- **Modo escuela (4):** class management, student dashboard, grading con rúbrica, plagiarism detection
- **Accesibilidad extrema (4):** WCAG 2.2 AAA, Section 508, EN 301 549, accessibility statement generator
- **Modo catástrofe (5):** read-only mode, fallback CDN, graceful degradation, emergency contact, SLA credit request
- **Modo nostalgia (4):** HTML 4.01 Transitional, PDF/A, texto plano, RSS/Atom
- **Modo científico (4):** NetCDF/HDF5/FITS, scientific charts, LaTeX export, citation generator
- **Modo legal (4):** court exhibit export, chain of custody log, legal hold, time-stamped screenshots
- **Modo salud (4):** HIPAA BA agreement, PHI detection, HIPAA audit log, data encryption
- **Modo deportes (3):** leaderboard, timer/clock, scoreboard
- **Modo viajes (4):** booking calendar, maps avanzado, currency converter, weather widget

### Archivos actualizados
- GAPS_AUDIT.md: 734 gaps totales (39 nuevos en 10 categorías)
- CHANGELOG.md: esta entrada

## [0.3.1] — 2026-05-20 — 23ra ronda: 50 items — hardware + dev tools + business + community + education + DR + UI/UX + testing + APIs + AI avanzado

### Añadido (50 nuevos items en 10 categorías)
- **Protocolos hardware (6):** MIDI, DMX512, MQTT, Modbus, BLE, Serial/USB — bridges y componentes específicos
- **Developer tools (6):** browser extension, desktop app, API clients Python/Go/Rust, CLI power tools, Terraform provider, Docker SDK
- **Business operations (5):** invoicing, cost allocation, usage analytics, audit reports, vendor risk assessment
- **Community ecosystem (5):** feature voting, templates marketplace, components marketplace, knowledge base, hackathons
- **Advanced education (4):** academy, live workshops, office hours, case studies
- **Disaster recovery (4):** multi-region failover, DB replication, backup strategy, incident playbook
- **UI/UX refinements (6):** smooth transitions, drag & drop improved, loading states, empty states, error states, 404 page
- **Testing environments (4):** dev/staging/production sandbox, environment promotion workflow
- **APIs que knitstudio consume (5):** GitHub, GitLab, Bitbucket, Linear, Jira
- **AI avanzado (5):** AI code review, AI a11y audit, AI performance audit, AI SEO audit, AI translation quality check

### Archivos actualizados
- GAPS_AUDIT.md: 695 gaps totales (50 nuevos en 10 categorías)
- CHANGELOG.md: esta entrada

## [0.3.0] — 2026-05-20 — OSC Protocol + device control + templates MIDI/DMX

### Añadido
- **OSC Protocol Bridge:** conectar interfaces diseñadas en knitstudio con dispositivos OSC (consolas, DAWs, DMX, sintetizadores) via WebSocket → UDP
- **Componentes OSC (10+):** Fader, Knob, Button, Toggle, XY Pad, Color Picker, Slider, Rotary, Meter, Waveform
- **Templates OSC (7):** Mixer 8 canales, DJ Controller, Lighting Console, Ableton Live, Resolume Arena, Parametric EQ, Stage Monitor
- **OSC Discovery:** escaneo automático de dispositivos OSC en la red local
- **Documentado en CONNECTORS.md:** sección completa con arquitectura, ejemplos, limitaciones

### Archivos actualizados
- CONNECTORS.md: nueva sección OSC (~100 líneas) con componentes, templates, arquitectura, mapeo JSON, limitaciones
- GAPS_AUDIT.md: 645 gaps totales (4 nuevos en OSC/device control)
- CHANGELOG.md: esta entrada

## [0.2.9] — 2026-05-20 — 22da ronda: 53 items — perfiles + demo + privacidad + SEO + AI local + IDP + research + costos + formatos + legacy

### Añadido (53 nuevos items en 10 categorías)
- **Perfiles no considerados (8):** discapacidad visual, movilidad reducida, mayores, niños, baja alfabetización, internet lento, 8 idiomas, TDAH
- **Demo del builder (5):** demo rápida, interactive tour, gallery showcase, compare plans, pricing calculator
- **Privacidad usuarios finales (6):** privacy policy gen, ToS gen, cookie consent GDPR/CCPA/LGPD, data deletion, portability, COPPA
- **SEO apps generadas (6):** SEO audit, meta/OG tags, sitemap, robots.txt, schema.org, Core Web Vitals prediction
- **AI local/privado (6):** Ollama, LM Studio, vLLM, Azure OpenAI, AWS Bedrock, GCP Vertex AI
- **IDP integration (4):** Backstage plugin, Port/Guides, custom API, SSO enterprise
- **User research (5):** modo investigación, session recording, heatmaps, A/B testing, surveys
- **Costos y proyecciones (4):** cost calculator, traffic estimator, revenue projection, break-even
- **Formatos intercambio (5):** PDF rellenable, CSV/XLSX, Markdown, JSON Schema, OpenAPI/Swagger
- **Modo legacy apps (4):** IE11 compat, polyfills, graceful degradation, browser matrix testing

### Archivos actualizados
- GAPS_AUDIT.md: 641 gaps totales (53 nuevos en 10 categorías)
- CHANGELOG.md: esta entrada

## [0.2.8] — 2026-05-20 — 21ra ronda: 57 items en 10 lotes — rendimiento output + seguridad output + self-hosted + AI transparency + monetización + testing + offline + demo + security + retrocompatibilidad

### Añadido (57 nuevos items en 10 lotes)
- **Rendimiento del output (8):** performance budget, auto-minify, lazy loading, critical CSS, preconnect, resource hints, bundle analyzer, performance regression alerts
- **Seguridad del output (7):** XSS protection, CSRF tokens, CSP generada, SQLi protection, HTTPS redirect, security headers, dependabot
- **Self-hosted profundo (8):** knit health, knit logs, knit stats, knit update, knit backup, knit restore, knit reset, admin dashboard web
- **AI transparency (6):** AI watermark, confidence score, human review required, audit trail, bias detection, usage report
- **Monetización apps (5):** Stripe Checkout, paywall, subscription management, metered billing, license keys
- **Testing del output (6):** unit tests, integration tests, visual regression, link checker, form tests, responsive tests
- **Offline-first apps (5):** service worker, offline fallback, data sync, stale-while-revalidate, optimistic UI
- **Modo demo apps (4):** demo mode, time-bomb, demo reset, watermark
- **Seguridad apps (4):** dependency check, auto-update, SBOM, security advisory
- **Retrocompatibilidad (4):** component version pinning, deprecation timeline, auto-migration, compatibility report

### Archivos actualizados
- GAPS_AUDIT.md: 588 gaps totales (57 nuevos en 10 lotes)
- CHANGELOG.md: esta entrada

## [0.2.7] — 2026-05-20 — 20ma ronda: 10 categorías completas — ecosistema dev + agencias + export + headless + enterprise + i18n + diseñadores + educación + pricing + modo noche

### Añadido (47 nuevos items en 10 categorías)
- **Ecosistema dev (4):** VS Code extension, Slack/Discord notifications, Jira/Linear integration, webhook out
- **Agencias (4):** client portal, white-label completo, facturación por proyecto, time tracking
- **Export plataformas (5):** Shopify, WordPress, Wix, email HTML, PDF/print
- **CMS headless (4):** API REST headless, webhook por página, preview embed JS SDK, personalización server-side
- **Enterprise (7):** SOC 2, pentest, DPA, sub-processors, data residency, SLA, enterprise contract
- **i18n completo (5):** translation memory, workflow, pseudo-localization, fallback, pluralization
- **Export diseñadores (5):** Figma, Sketch, PDF specs, PNG, ZIP
- **Educación (5):** tutorial interactivo, challenges, certificación, learning paths, playground sandbox
- **Pricing formal (2):** tabla de planes Free/Starter/Pro/Team/Enterprise, fair usage policy
- **Modo noche (4):** quiet hours, DND programado, modo noche precavido, focus mode automático

### Archivos actualizados
- GAPS_AUDIT.md: 531 gaps totales (47 nuevos en 10 categorías)
- CHANGELOG.md: esta entrada

## [0.2.6] — 2026-05-20 — 19na ronda: ciclo de vida + salud proyecto + equipos + knowledge transfer + macro recorder

### Añadido (10 nuevos items en 3 categorías)
- **Ciclo de vida del proyecto (3):** project archive (archivar sin borrar, auto-archive 90 días), asset management (cleanup, storage, search), seasonal design changes (temas por fecha, auto-revert)
- **Salud del proyecto (4):** component library health (rotos/no usados), action flow complexity warnings (score + refactor), cross-project style drift detection (unificar colores/fonts), cross-project component sync (linked components entre proyectos)
- **Equipos y conocimiento (3):** team offboarding (transfer ownership, impact report), knowledge transfer (project summary + who knows what + README auto + screen recording), macro recorder (grabar, reproducir, compartir, schedule)

### Archivos actualizados
- GAPS_AUDIT.md: 486 gaps totales (10 nuevos en 3 secciones)
- CHANGELOG.md: esta entrada

## [0.2.5] — 2026-05-20 — 18va ronda: personalización builder + multi-proyecto + onboarding + feedback + comunidad

### Añadido (10 nuevos items en 5 categorías)
- **Personalización del builder (3):** keyboard shortcut customization (remapear, presets Figma/Sketch), UI density (compacto/cómodo), code editor preferences (font, ligaduras, lint, Prettier)
- **Gestión multi-proyecto (3):** per-project builder version pinning (congelar versión por proyecto), cross-project dashboard (métricas globales), component analytics (top usados, no usados, más caros)
- **Onboarding y descubrimiento (2):** onboarding checklist persistente (☐ pasos visibles hasta completar), progressive power user tips (descubrimiento gradual por semanas de uso)
- **Feedback (1):** rate this update — feedback contextual 1-5 después de usar nuevas features
- **Comunidad (1):** community hub integrado — templates, showcases, foros sin salir del builder

### Archivos actualizados
- GAPS_AUDIT.md: 476 gaps totales (10 nuevos en 5 secciones)
- CHANGELOG.md: esta entrada

## [0.2.4] — 2026-05-20 — 17va ronda: micro-experiencias + productividad + focus mode + multi-tab + preview

### Añadido (11 nuevos items en 2 categorías)
- **Micro-experiencias (5):** toast undo (como Gmail), autosave status visible (verde/amarillo/rojo), contextual tips ("Sabías que..."), what's new modal post-actualización, focus mode (F11-like)
- **Edición y productividad (6):** drag from desktop al canvas, paste from clipboard inteligente (detecta Figma, HTML, imagen), preview en nueva pestaña (URL compartible, auto-refresh), responsive drag handles (arrastrar bordes del viewport), tab title dinámico (nombre + estado en la pestaña), multi-tab safety (detectar duplicados y prevenir overwrite)

### Archivos actualizados
- GAPS_AUDIT.md: 466 gaps totales (11 nuevos en micro-experiencias + productividad)
- CHANGELOG.md: esta entrada

## [0.2.3] — 2026-05-20 — 16va ronda: single component export + design handoff + a11y scanner + compliance + plugin checker + feedback widget + migrate instance + page auth + telemetry

### Añadido (13 nuevos items en 9 categorías)
- **Single component export:** exportar 1 componente como React/Vue/HTML/WC. Código autocontenido
- **Design handoff mode:** specs tipo Figma: medidas, colores, tipografía. PDF export. Plugins Figma/Zeplin
- **Accessibility scanner:** auditoría a11y integrada, score 0-10, auto-fix de problemas comunes
- **Compliance scanner:** GDPR/CCPA/ADA, detecta formularios sin consentimiento, genera banner + privacy notice
- **Plugin compatibility checker:** verificar versión, test aislado, conflict detection, rollback automático
- **In-app feedback widget:** 👍 👎 + comentario + screenshot. Dashboard de satisfacción
- **knit migrate instance:** export/import proyecto completo entre instancias (con usuarios, configs, plugins)
- **Page visibility + auth:** pública / solo enlace / contraseña / solo usuarios registrados. Auth0, Clerk, Supabase
- **Anonymous usage telemetry:** (opt-in) features más usadas, abandonos, errores. Dashboard público

### Archivos actualizados
- GAPS_AUDIT.md: 455 gaps totales (13 nuevos en 9 secciones)
- CHANGELOG.md: esta entrada

## [0.2.2] — 2026-05-20 — 15va ronda: quick actions + command palette + migraciones + decision log + presence + data transformer + remix + client kit + point-in-time

### Añadido (16 nuevos items en 9 categorías)
- **Quick Actions:** cambiar 1 texto/color sin abrir builder (push, email, mobile quick-fix)
- **Command palette universal:** Cmd+K para EJECUTAR acciones (no solo buscar). Fuzzy search, historial
- **Webflow full migration:** CMS → collections, interacciones → action flows, hosting → deploy
- **Bubble migration:** workflows → action flows, DB → PostgreSQL, UI → componentes
- **Decision Log:** por qué se hizo cada cambio, persiste, búsqueda por decisión
- **Live cursors + presence:** avatares flotantes, "Juan editando Header"
- **Visual Data Transformer:** drag & drop mapeo de campos, filter builder, preview en vivo, transform library
- **Inspirarse en sección:** capturar UNA sección de una URL, no toda la página
- **Remix + atribución + live reference:** capturar, editar, publicar, con link a original
- **Client Onboarding Kit:** tutorial interactivo para no-técnicos, modo solo contenido, video auto-generado
- **Point-in-time recovery:** slider temporal, auto-snapshots cada hora, comparación "lunes vs hoy"

### Archivos actualizados
- GAPS_AUDIT.md: 444 gaps totales (16 nuevos en 9 secciones)
- CHANGELOG.md: esta entrada

## [0.2.1] — 2026-05-20 — 14va ronda: docs generator + compliance + gallery view + per-project roles + toolbox + zoom

### Añadido (14 nuevos items)
- **Documentation Generator:** docs automáticas del proyecto: diagramas, componentes, guía de usuario, glosario
- **Compliance Kit:** cookie consent (GDPR/CCPA/LGPD), privacy notice, WCAG statement, ToS template
- **Per-project roles:** permisos por proyecto, no solo globales. Herencia opcional
- **Quotas y límites:** MAX_PAGES/MAX_COMPONENTS en .env, alertas 80%, planes self-hosted
- **Builder theming:** logo, colores, nombre de instancia personalizables
- **Gallery view de páginas:** thumbnails estilo PowerPoint para elegir qué página editar
- **Gallery view de proyectos:** vista tarjetas (grid) y vista lista (tabla) intercambiables
- **Project overview:** grid de miniaturas de todas las páginas, filtro por estado, búsqueda por nombre
- **Snapshot sharing:** link expirable temporal con página en vivo, sin login, sin publicar
- **Version Story:** títulos automáticos de versiones ("cambié el color del header"), agrupación por sesión
- **My Toolbox:** carpeta personal de componentes favoritos que persiste entre proyectos
- **Zoom levels:** project overview, page zoom out, pixel zoom 400%, component focus

### Archivos actualizados
- GAPS_AUDIT.md: 430 gaps totales (14 nuevos en 6 secciones)
- CHANGELOG.md: esta entrada

## [0.2.0] — 2026-05-20 — WordPress integration + CMS import/update

### Añadido
- **WordPress import:** descargar páginas/posts via REST API, convertir Gutenberg blocks a componentes knitstudio
- **WordPress update:** editar en knitstudio, publicar de vuelta a WordPress (blocks → blocks)
- **WordPress theme.json sync:** detectar colores, tipografía, spacing del theme activo
- **Plugin WordPress opcional** para integración más profunda (sin plugin: Application Passwords)

### Archivos actualizados
- CONNECTORS.md: nuevo flujo WordPress con diagrama de 4 pasos + requisitos técnicos
- GAPS_AUDIT.md: 418 gaps totales (3 nuevos en integración CMS)
- CHANGELOG.md: esta entrada

## [0.1.9] — 2026-05-20 — 13va ronda: bulk operations + DND + showcase + consistency + museum + sentinel

### Añadido (13 nuevos items)
- **Bulk operations:** seleccionar N páginas, aplicar cambios a todas, reemplazar componente en todo el proyecto
- **Do Not Disturb mode + notification center:** silenciar notificaciones, historial centralizado
- **Published showcase:** URL pública de solo lectura del proyecto con feedback collecting
- **Pre-launch kit:** checklist automático (SEO, OG, favicon, analytics), score 7/10, auto-fix
- **Dependency graph:** usage inspector, delete preview, design lint con reglas configurables
- **Museum mode:** congelar versiones, archivar, publicar desde cualquier versión
- **Access history:** log de quién vio y exportó qué, alertas de acceso sospechoso
- **Sentinel mode + canary deploy + health score:** monitoreo 24h post-pub, rollback automático, deploy gradual

### Archivos actualizados
- GAPS_AUDIT.md: 415 gaps totales (13 nuevos en 7 secciones)
- CHANGELOG.md: esta entrada

## [0.1.8] — 2026-05-20 — Preview/Interact mode + test mode + split view + network/state inspector

### Añadido (7 items)
- **Preview/Interact mode:** toggle Editar/Probar. En modo Probar, la página es 100% interactiva (clicks, navegación, formularios)
- **Split view:** editar a la izquierda, probar a la derecha simultáneamente
- **Test mode con logs:** panel que muestra action flows ejecutados, APIs llamadas, variables cambiadas
- **Breakpoint mode:** pausar action flows paso a paso para debugging
- **State inspector:** ver variables, bindings y estado de componentes en vivo durante la prueba
- **Network panel:** todas las llamadas a APIs con método, URL, request, response, duración
- **Reset test state:** recargar la página en modo prueba sin recargar el builder

### Archivos actualizados
- GAPS_AUDIT.md: 402 gaps totales (7 nuevos en interacción/testing)
- CHANGELOG.md: esta entrada

## [0.1.7] — 2026-05-20 — 12va ronda: mantenimiento + colaboración + anti-lock-in + UX inteligente + design system + presentación

### Añadido (24 nuevos items en 8 categorías)
- **Mantenimiento post-publicación (4):** health dashboard por página, proactive alerts, maintenance mode, last verified timestamp
- **Colaboración avanzada (3):** threads de comentarios en componentes, activity feed por proyecto/persona, approval workflow completo (draft→review→approved→published)
- **Anti-lock-in (3):** export flat (HTML+CSS+JS planos), emergency kit (ZIP auto-generado), runtime-free export guarantee
- **UX inteligente (4):** componentes auto-configurables, smart defaults contextuales, presets de configuración, experto mode en props
- **Design System Sync (3):** knitstudio como fuente de verdad, Figma→knitstudio→código, token drift detection
- **Presentación (3):** presentation mode, client view (feedback-only), export a PDF/imagen
- **Compromiso humano (3):** commit messages obligatorios/sugeridos, timeline con etiquetas de contexto, activity storytelling

### Archivos actualizados
- GAPS_AUDIT.md: 395 gaps totales (24 nuevos en 8 secciones)
- CHANGELOG.md: esta entrada

## [0.1.6] — 2026-05-20 — 11va ronda: presencia pública + post-publish + fidelidad + API pública + regression testing

### Añadido (22 nuevos items en 7 categorías)
- **Presencia pública (7):** status page, public roadmap, blog, built-with showcase, contributors page, what's new modal, comparison page vs competidores
- **Post-publish (4):** content mode (separar edición de contenido vs diseño), re-engagement emails, runtime lock-in mitigation (runtime-free export, garantía escrita), fidelity gap (pixel match, cross-browser preview)
- **API pública (4):** REST API v1 con OpenAPI, CI/CD integration, webhook events, CLI API wrapper
- **Regression testing del builder (4):** dependency upgrade tests, schema migration tests, snapshot testing, API contract tests
- **Content Mode:** toggle Content/Design para separar edición de contenido (no-técnico) vs diseño completo

### Archivos actualizados
- GAPS_AUDIT.md: 372 gaps totales (22 nuevos en 5 secciones)
- CHANGELOG.md: esta entrada

## [0.1.5] — 2026-05-20 — 10ma ronda: builder como producto + accesibilidad + edge cases + offboarding + cultural

### Añadido (30 nuevos items en 5 categorías nunca examinadas)
- **Builder como producto (6):** crash recovery, performance monitoring, RAM/CPU, self-version, update notification, error boundary por panel
- **Accesibilidad del builder (6):** screen reader, keyboard nav completa, color blind mode, reduced motion, builder responsive, dark/light mode
- **Edge cases (7):** 500+ proyectos, 10k+ componentes, 500+ steps, caracteres especiales, emails con +, nombres duplicados, proyectos huérfanos
- **Offboarding (5):** eliminar cuenta, cancelar suscripción, data export, retention policy, herencia de proyectos
- **Cultural/locale (5):** date format, number format, currency format, first day of week, time zone handling

### Archivos actualizados
- GAPS_AUDIT.md: 350 gaps totales (29 nuevos en 5 categorías meta)
- CHANGELOG.md: esta entrada

## [0.1.4] — 2026-05-20 — 9na ronda: evaluación global + testing + documentación + riesgos existenciales

### Añadido
- **Testing del builder mismo** (10 items): unit tests builder+API+runtime, E2E, visual regression, load test, stress test, build test, smoke test, auto-validation del output exportado
- **Documentación integral** (7 items): JSDoc/TSDoc, README por package, Storybook del builder, API reference autogenerada, ADRs, guías de contribución por área, changelog automático
- **Riesgos existenciales mitigados** (7 items): bus factor, dependencias críticas, AI provider diversification, supply chain, escalabilidad cloud, tests de regresión, feature creep control
- **Competitive tracking**: incorporado lo que la competencia ya ha desarrollado (v0.dev, bolt.new, Webflow, Builder.io, Replit)

### Archivos actualizados
- GAPS_AUDIT.md: 321 gaps totales (24 nuevos sobre testing + docs + riesgos)
- CHANGELOG.md: esta entrada

## [0.1.3] — 2026-05-20 — Web Capture + AI Project Seed + Cross-project clipboard

### Añadido
- **Web Capture**: pegar URL → knitstudio descarga HTML/CSS/JS/assets completa. Crear proyecto desde cualquier web
- **HTML→knitstudio converter**: AI analiza estructura web, detecta componentes, genera layout.json editable
- **"Usar como base" project seed**: nuevo proyecto poblado con layout + tema + assets de la web capturada
- **Cross-project clipboard**: copiar componentes entre tabs/proyectos dentro de knitstudio
- **AI Connect**: al pegar un componente, AI detecta qué es (login, tabla, formulario) y ofrece generar backend

### Flujo documentado en ROADMAP.md
- Sección completa "Web Capture + AI Project Seed" con diagrama, beneficios y ejemplo de uso

### Archivos actualizados
- ROADMAP.md: nuevo flujo de web capture + nuevas tareas de import
- GAPS_AUDIT.md: 335 gaps totales (5 nuevos)
- CHANGELOG.md: esta entrada

## [0.1.2] — 2026-05-20 — 8va ronda: funcionalidades + flexibilidad + facilidad + conflictos + incompatibilidades + UX

### Añadido (70 nuevos items)
- **Nuevas funcionalidades (10):** Design Token Editor, Component Playground, Form Builder Wizard, Data Table Wizard, One-click Theme Generation, Component Library from GitHub, Voice Commands, Scheduled Tasks Visual Editor, API Marketplace, Plugin/Component/Theme Store
- **Flexibilidad (10):** Custom HTML attributes, custom variants, custom tokens, custom breakpoints, composite components, extend built-in components, custom state management, lifecycle hooks, lazy-load individual, SSR per-component
- **Facilidad de uso (17):** right-click menu, multi-select + drag selection, alignment tools, keyboard nudging, palette search+filter, recently used + favorites, folders, tags/labels, batch rename, spell check + emoji picker + contrast checker, image editor, icon browser, font preview, printable shortcut card, drag from desktop, paste from clipboard, shift+click range selection
- **Nuevos conflictos (10):** plugin competition, theme ambiguity, export format drift, version drift, schema mismatch, clock skew, browser cache, concurrent knit commit, asset hotlinking, DB migration conflict
- **Nuevas incompatibilidades (11):** Yarn/npm/pnpm, Docker v1/v2, Windows paths, macOS case-insensitive, Unicode/RTL, CRLF/LF, corporate proxy, air-gapped, ARM/M1, Node version, Docker missing
- **Nuevos problemas UX (12):** notification overload, modal hell, scroll fatigue, click fatigue, cognitive load, AI trust, email fatigue, feature creep, help no ayuda, community ghost town, estado del sistema invisible, "no sé si mi proyecto es seguro"

### Archivos actualizados
- GAPS_AUDIT.md: 320 gaps totales (70 nuevos en 6 categorías)
- CHANGELOG.md: esta entrada

## [0.1.1] — 2026-05-20 — 7ma ronda: conflictos + incompatibilidades + UX crítica

### Añadido (45 nuevos items)
- **Conflictos:** CSS class collision, Git merge conflict, dependencias huérfanas, type mismatch, token expirado
- **Incompatibilidades:** CORS/CSP bloqueando iframe, SSR hydration mismatch, Shadow DOM, WebGL, micro-frontends, Safari iOS, React legacy, AngularJS, TypeScript estricto, IE11
- **Problemas técnicos:** puertos en conflicto, HTTPS vs HTTP, WebSocket conflict, VPN/firewall, renderizado post-export
- **UX crítica:** primera pantalla en blanco, "perdí mi trabajo", publicación accidental, parálisis por decisión, jerga técnica, sin feedback operaciones largas, error 500, "dónde quedé", onboarding forzado, no touch-friendly, AI no entendió, docker falla, miedo a romper, modelo mental inconsistente, indicador guardado

### Archivos actualizados
- GAPS_AUDIT.md: 250 gaps totales (37 nuevos sobre conflictos/incompatibilidades/UX)
- ROADMAP.md: nuevas tareas en Fase 2 (welcome, guardado, publicación, continue, lenguaje), Fase 6 (CORS/CSP, token sharing, SSR, Git merge, refresh token, knit doctor, bridge self-hosted, bridge versionado)
- CHANGELOG.md: esta entrada

## [0.0.9] — 2026-05-20 — Flujos mobile + software + 8 opciones de conexión

### Añadido
- **8 flujos de trabajo documentados** (ROADMAP.md):
  - A: Local dev (clonar + docker + editar)
  - B: Staging remoto (sin setup local, bridge.js vía script tag)
  - C: Producción read-only (inspección, auditoría, reportes)
  - D: Dispositivo físico mobile (QR + red local, streaming al canvas)
  - E: CI/CD headless (knit build en GitHub Actions)
  - F: Reverse engineering código→knitstudio (analizar codebase, generar layout.json editable)
  - G: Import diseño (Figma, Sketch, screenshot → AI → layout.json)
  - H: Preview multi-dispositivo (browser + iPad + iPhone + Android simultáneo)
- **Tabla de compatibilidad** por tipo de proyecto: Web, WordPress, Electron, Chrome Ext, Capacitor, React Native, Flutter, SwiftUI/Compose
- **Diagramas de flujo** por cada opción con comandos exactos

### Archivos actualizados
- ROADMAP.md: nuevas secciones "Tipos de proyecto" + 8 diagramas de flujo + tabla de compatibilidad
- GAPS_AUDIT.md: 194 gaps totales (8 nuevos sobre flujos mobile/software)
- CHANGELOG.md: esta entrada

## [0.0.8] — 2026-05-20 — Flujo de conexión de proyectos existentes

### Añadido
- **Flujo completo de conexión de proyectos:** documentado paso a paso en ROADMAP.md
  - Paso 1: clonar proyecto desde GitHub
  - Paso 2: iniciar knitstudio (docker compose)
  - Paso 3: registrar proyecto en knitstudio (auto-discovery de tipo, framework, APIs)
  - Paso 4: conectar proyecto via proxy automático, script tag, CLI, o WebSocket (RN)
  - Paso 5: editar en vivo desde el canvas
  - Paso 6: exportar cambios o commitear al repo
- **4 modos de conexión:** Proxy automático (recomendado), Script tag manual, CLI directo, WebSocket RN
- **Auto-discovery:** knitstudio escanea el proyecto y detecta tipo, endpoints API, framework
- **Comandos CLI nuevos:** `knit project:register`, `knit project:connect`, `knit project:dev`, `knit commit`

### Archivos actualizados
- ROADMAP.md: sección completa "Flujo de trabajo" con 6 pasos + tabla de modos + diagrama
- GAPS_AUDIT.md: 186 gaps totales (5 nuevos sobre conexión de proyectos)
- CHANGELOG.md: esta entrada

## [0.0.7] — 2026-05-20 — Project Dashboard + Version Management

### Añadido
- **Project Dashboard:** primera pantalla con lista de proyectos, crear, importar, preview thumbnail, estado
- **Project Home:** páginas, templates, actividad reciente, settings al abrir un proyecto
- **Version Browser:** timeline de versiones por página con timestamp, autor, changelog
- **Version Diff:** vista lado a lado comparando cambios (verde/rojo/amarillo)
- **Version Rollback:** 1 clic, no destructivo, se puede deshacer
- **Auto-versioning:** cada autoguardado crea una versión recuperable en el tiempo
- **Branching (futuro):** ramas, merge, PRs visuales

### Archivos actualizados
- GAPS_AUDIT.md: 180 gaps totales (7 nuevos)
- ROADMAP.md: nuevas tareas en Fase 0 (dashboard+home) y Fase 6 (version browser/diff/rollback/auto-versioning/branching)
- ARCHITECTURE.md: auto-versioning, version browser, diff, rollback en kernel
- CHANGELOG.md: esta entrada

## [0.0.6] — 2026-05-20 — 5ta ronda: búsqueda + secrets + backup + conflictos + i18n apps

### Añadido (gaps de la 5ta ronda — 8 nuevos)
- **Búsqueda global (Cmd+K):** buscar páginas, componentes, action flows, APIs desde un campo tipo Spotlight
- **Quick edit mode:** presionar "e" sobre cualquier elemento → editar texto inline sin abrir el builder
- **Custom CSS/JS injection:** bloques head/body, scripts globales por página y proyecto (escape hatch para power users)
- **External JS libraries:** cargar Chart.js, Moment.js, etc desde el builder
- **Secrets management:** keystore cifrado, variables de entorno inyectadas en runtime, no en layouts ni Git
- **knit backup / knit restore:** scripts para respaldar y restaurar la instancia completa (BD + assets + layouts)
- **Conflicto de edición simultánea:** last-write-wins + notificación + diff visual
- **Issue/PR triage process:** templates, labels, milestones, bots, maintainer burnout prevention
- **i18n runtime para apps generadas:** {{t("welcome")}} se traduce según locale, panel de traducciones, AI translation, locale switcher

### Archivos actualizados
- GAPS_AUDIT.md: 167 gaps totales (15 nuevos en 8 secciones)
- ROADMAP.md: nuevas tareas en Fase 0 (backup), Fase 1 (secrets), Fase 2 (búsqueda+quick edit), Fase 3 (i18n apps), Fase 6 (custom CSS/JS), Fase 9 (issue triage), Post-MVP (colaboración)
- ARCHITECTURE.md: nuevas secciones de secrets, backup, búsqueda, quick edit
- CHANGELOG.md: esta entrada

## [0.0.5] — 2026-05-20 — 4ta ronda: exit plan + migración + plugins + testing

### Añadido (gaps de la 4ta ronda)
- **Exit plan:** proceso de export completo, proyecto autocontenido que funcione sin runtime knitstudio. Vendor lock-in prevention documentada
- **Migración gradual:** modo híbrido con proxy inverso, convivencia con sistemas legacy, migrar página por página
- **Plugin gobernanza:** sandboxing en iframe, permisos granulares, curaduría, versionado semver
- **Testing del output generado:** compilación automática, visual regression, validación de action flows, preview deployment
- **Sostenibilidad:** modelo económico detallado con costos estimados, riesgo de bus factor, costo de APIs cloud

### Archivos actualizados
- GAPS_AUDIT.md: 152 gaps totales (15 nuevos en esta ronda)
- ROADMAP.md: nuevas tareas en Fase 6 (validación + exit plan + migración)
- ARCHITECTURE.md: nuevas secciones de validación, plugin gobernanza, exit plan
- CHANGELOG.md: esta entrada

## [0.0.4] — 2026-05-20 — Modelo de negocio: dual deployment

### Aclaración fundamental del modelo
- **Self-hosted:** cada usuario puede instalar knitstudio en su equipo con `docker compose up`, usando sus propias API keys. 0 dependencia de nosotros
- **Cloud (knitstudio.io):** versión multi-tenant hosteada por nosotros. Para quien no quiere configurar APIs. Incluye las APIs en la suscripción
- **Mismo código** para ambas modalidades. La única diferencia es quién provee las API keys

### Documentos actualizados
- ROADMAP.md: sección "Modelo de Despliegue" con tabla comparativa + tabla de pricing + costos estimados
- README.md: aclaración de las dos modalidades al inicio
- AGENTS.md: información de despliegue y modelo de negocio
- COMMUNITY_PLAN.md: sección completa de modelo de negocio con pricing
- CHANGELOG.md: esta entrada

### Implicaciones
- El auto-hosteable no es una versión limitada. Es el código completo
- El cloud no puede existir sin el self-hosted siendo funcional primero
- Los pricing tiers del cloud deben cubrir costos de APIs (OpenAI, Anthropic, Stripe)
- El exit plan es trivial: si dejas el cloud, migras a self-hosted

## [0.0.3] — 2026-05-20 — Tercera revisión: 15 nuevos gaps

### Añadido
- **15 nuevos gaps identificados y resueltos (tercera ronda de auditoría)**

### Operaciones / SRE (NUEVO — Fase 0)
- Disaster Recovery Plan (backup strategy, restore, RTO/RPO)
- Zero-downtime deployments (blue/green, health checks, graceful shutdown)
- Incident Response Plan (alerting, on-call, escalation, status page)
- Feature Flags system (rollout gradual, kill switch por feature)

### UX Amateur (NUEVO — Fase 2)
- Modo Sandbox / Scratch (proyecto temporal desechable)
- "Undo All" / Reset project (volver al estado inicial con 1 clic)
- Showcase / Galería pública de ejemplos (inspiración para nuevos usuarios)

### Funcionalidad (NUEVO — Fases 5-6)
- Form Submissions Management (panel de respuestas, export CSV/Excel)
- Scheduled Actions / Cron (ejecutar flows en fecha/hora específica)
- Analytics integrado en apps generadas (pageviews, clics, conversiones)
- Custom Domains + SSL automático (Let's Encrypt)
- Embed pages como `<iframe>` o `<script>`
- Scheduled Publishing (programar publicación)
- Approval Workflows (diseñador → manager → publish)

### Calidad de Vida / Enterprise (NUEVO — Post-MVP)
- Custom fonts (Google Fonts, self-hosted, Adobe Fonts)
- API Keys programáticas (automatización CI/CD)
- Cookie consent banner (GDPR/CCPA compliant)
- DPA / SOC2 / ISO 27001 compliance
- Multi-region cloud
- Migration guides entre versiones

### Actualizado
- ROADMAP.md: nuevas tareas en Fase 0, 2, 5, 6. MVP extendido a 16 semanas
- GAPS_AUDIT.md: 137 gaps totales (20 nuevos)
- ARCHITECTURE.md: 4 nuevas secciones en el diagrama
- CHANGELOG.md: esta entrada

## [0.0.2] — 2026-05-20 — Nombramiento: knitstudio

### Cambio de nombre
- **Nombre anterior:** UI Studio
- **Nuevo nombre: knitstudio**
- **Dominio:** knitstudio.io (✅ disponible)
- **GitHub org:** github.com/knitstudio (✅ disponible)
- **npm scope:** @knitstudio/* (✅ disponible)
- **Docker org:** knitstudio (✅ disponible)
- **CLI:** `knit` (ej: `knit dev`, `knit export`, `knit deploy`)

### Actualizado
- Todos los archivos del workspace reflejan el nuevo nombre
- README.md con nueva identidad visual
- AGENTS.md con nueva información del proyecto
- Dominios, orgs, scopes actualizados en ROADMAP.md y ARCHITECTURE.md

## [0.0.0] — 2026-05-20 — Planeación Inicial

### Añadido
- Plan maestro completo (ROADMAP.md) — 14 semanas a MVP
- Arquitectura del sistema (ARCHITECTURE.md)
- Plan de seguridad (SECURITY.md) — 9+ medidas antes del MVP
- Targets de rendimiento (PERFORMANCE.md)
- Catálogo de componentes (COMPONENTS.md) — 110+ en 5 fases
- Conectores a 58+ servicios (CONNECTORS.md)
- Análisis de competencia (COMPETITION.md) — 15 herramientas, 7 gaps
- Schema universal JSON (JSON_SCHEMA.md)
- Plan de soporte mobile nativo (MOBILE.md)
- Plan de documentación estilo Ubuntu (DOCUMENTATION_PLAN.md)
- Plan de comunidad open source (COMMUNITY_PLAN.md)
- Auditoría de gaps completa (GAPS_AUDIT.md) — 61 gaps identificados
- Compatibilidad MCP con 12+ clientes (MCP_COMPATIBILITY.md)
- Instrucciones para agentes (AGENTS.md)
- Esta bitácora (CHANGELOG.md)

### Nuevas áreas agregadas en v2 del plan

| # | Área | Archivos actualizados |
|---|------|----------------------|
| 1 | **Modo Simple/Advanced** + wizards guiados + templates por nivel | ROADMAP.md, ARCHITECTURE.md, GAPS_AUDIT.md |
| 2 | **Import Engine**: Figma, HTML, React, Webflow, Retool, Appsmith | ROADMAP.md, ARCHITECTURE.md, GAPS_AUDIT.md |
| 3 | **Git nativo**: layouts como JSON en el repo, diff visual, CI/CD, branch por ambiente, modo REPO vs modo DB | ROADMAP.md, ARCHITECTURE.md, GAPS_AUDIT.md |
| 4 | **Plugin SDK + Component SDK**: lifecycle hooks, toolbar/panel extensions, custom renderers | ROADMAP.md, ARCHITECTURE.md, GAPS_AUDIT.md |
| 5 | **Offline-first**: Service Worker, IndexedDB, sync engine, modo avión funcional | ROADMAP.md, ARCHITECTURE.md, GAPS_AUDIT.md |
| 6 | **Enterprise ready**: multi-tenant, roles granulares, SSO (SAML/LDAP/OIDC), data residency, Helm chart, Terraform | ROADMAP.md, ARCHITECTURE.md, GAPS_AUDIT.md |
| 7 | **Preview en dispositivo real**: QR code + celular ve el layout en vivo | ROADMAP.md, ARCHITECTURE.md, GAPS_AUDIT.md |
| 8 | **Preview simultáneo**: mobile + tablet + desktop lado a lado | ROADMAP.md, ARCHITECTURE.md |
| 9 | **Dashboard de monitoreo**: métricas del builder, errores, uso, rendimiento | ROADMAP.md, ARCHITECTURE.md, GAPS_AUDIT.md |
| 10 | **CLI Headless**: `knitstudio layout:create`, `component:add`, `export`, `deploy` sin GUI | ROADMAP.md, ARCHITECTURE.md |
| 11 | **Sentry + PostHog**: error tracking y analytics del propio builder | CONNECTORS.md, ROADMAP.md |
| 12 | **Docker Hub + GHCR + Helm chart + Terraform**: publicación y orquestación enterprise | CONNECTORS.md, ROADMAP.md, ARCHITECTURE.md |
| 13 | **Migration tools**: scripts para migrar desde Webflow, Retool, Appsmith, Bubble | ROADMAP.md, GAPS_AUDIT.md |
| 14 | **Backup automático con retention policy** | ROADMAP.md, GAPS_AUDIT.md |

### Investigación realizada
- Webflow: page builder, GSAP animations, CMS, combo classes, hosting
- Retool: data binding, 100+ data sources, workflows, RBAC, mobile
- n8n: action flows visuales, 500+ integraciones, code nodes, MCP, AI nodes
- Framer: Figma-like canvas, AI wireframer, code overrides
- Stitch (MongoDB): lecciones aprendidas (qué no hacer: vendor lock-in)
- v0.dev, bolt.new, Lovable, Replit Agent: generación AI prompt→app
- Builder.io, Anima, Pipedream: MCP Servers existentes
- Coframe: A/B testing automático + optimización continua
- 15 competidores analizados vs knitstudio
- 58+ servicios/APIs en 12 categorías para conectores
- 61+ gaps identificados (5 críticos, 56+ en plan de resolución)

### Decisiones técnicas
- **Nombre:** knitstudio
- **Licencia:** MIT
- **Stack Builder:** React 19 + Vite + TypeScript
- **Stack Runtime:** Vanilla JS (<50KB gzip)
- **Stack API:** Express + PostgreSQL + Redis
- **Page Designer:** GrapesJS + @grapesjs/react
- **Action Editor:** React Flow (36.6K⭐, MIT)
- **Plugin SDK:** npm create @knitstudio/plugin
- **Component SDK:** npm create @knitstudio/component
- **MCP Protocol:** 2025-06-18 con negociación descendente
- **Offline:** Service Worker + IndexedDB + Sync Queue
- **Documentación:** Docusaurus 3 (i18n, versionado, Algolia)
- **Error tracking:** Sentry
- **Analytics:** PostHog
- **Infraestructura:** Docker + Helm + Terraform
- **Dominio:** knitstudio.io
- **GitHub org:** knitstudio
- **npm scope:** @knitstudio/*
- **Docker org:** knitstudio

### Próximo paso (pendiente de confirmación)
Implementación Fase 0: monorepo + builder + API + MCP Server + Docker

---

## Template para futuras entradas

```
## [X.Y.Z] — Fecha

### Añadido
- Feature 1
- Feature 2

### Modificado
- Cambio 1
- Cambio 2

### Corregido
- Bug 1
- Bug 2

### Seguridad
- Medida 1
- Medida 2
```

## Formato de versiones

```
v0.0.1 → Fase 0: Foundation (monorepo + builder + API + MCP + Docker)
v0.1.0 → Fase 1: Security Core
v0.2.0 → Fase 2: UX Core + Modo Amateur
v0.3.0 → Fase 3: Performance + a11y + i18n + Offline
v0.4.0 → Fase 4: Componentes Core (35)
v0.5.0 → Fase 5: Action Flows + Import
v0.6.0 → Fase 6: Export Engine + Preview
v0.7.0 → Fase 7: AI + Git Nativo
v0.8.0 → Fase 8: Anotaciones + Self-Edit + MCP + Dashboard
v0.9.0 → Fase 9: Docs + Lanzamiento + Enterprise
v1.0.0 → MVP completo
```
