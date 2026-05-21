# knitstudio — ROADMAP

> Visual Application Builder Universal
> Open Source · MIT · Para cualquier proyecto/lenguaje/plataforma
> Combina: Webflow (diseño visual) + n8n (action flows) + Retool (data binding) + v0.dev (AI generation)

---

## Estado Actual

**Fase:** MVP COMPLETO ✅ — Todas las fases implementadas
**Versión:** 1.0.0
**Estado:** Proyecto finalizado en su totalidad según el plan

---

## Tipos de proyecto que knitstudio puede editar

### Por tecnología
```
                           ┌── Web (any framework) ───────────────────────────────
                           │   React / Vue / Angular / Svelte / Vanilla JS
                           │   WordPress / Shopify / Wix / cualquier HTML
                           │   Electron / Tauri (apps de escritorio con Chromium)
                           │   → Bridge: Iframe + postMessage
                           │   → Estado: ✅ Fase 0
                           │
Proyecto ──────────────────┼── React Native (Expo / bare RN) ─────────────────────
a editar                   │   → Bridge: WebSocket + React DevTools protocol
                           │   → Estado: 🔲 Fase 2 (post-MVP)
                           │
                           ├── Capacitor / Ionic (WebView nativa) ────────────────
                           │   Mismo que web (corre en WebView)
                           │   + Plugins nativos (cámara, push, biometría)
                           │   → Bridge: Iframe + postMessage
                           │   → Estado: ✅ Mismo que web
                           │
                           ├── Flutter ──────────────────────────────────────────
                           │   Renderiza en Skia canvas. Sin DOM.
                           │   Posible via Flutter DevTools protocol (futuro)
                           │   → Estado: 🔲 Futuro (alta complejidad)
                           │
                           ├── Chrome Extension / Firefox Add-on ────────────────
                           │   Tiene DOM. Mismo bridge que web.
                           │   → Estado: ✅ Mismo que web
                           │
                           └── Nativo (SwiftUI / Jetpack Compose / Qt) ─────────
                               Sin DOM. Sin API pública de edición externa.
                               Solo editables desde Xcode / Android Studio.
                               → Estado: ❌ No soportado
```

### Por flujo de trabajo

| Opción | Cómo funciona | Ideal para |
|--------|--------------|------------|
| **A — Local dev** | Clonas repo, `docker compose`, registras proyecto, editas en vivo | Desarrollo diario |
| **B — Staging remoto** | El proyecto ya está en staging (ej: staging.check.app). Inyectas bridge.js via script tag. Sin setup local | QA, revisión rápida |
| **C — Producción (read-only)** | Conectas a producción para inspeccionar, auditar, generar reportes de mejora. Sin edición. | Auditoría, diagnóstico |
| **D — Dispositivo físico mobile** | App corriendo en celular/tablet real. knitstudio se conecta via red local o USB. Editas y ves cambios en el dispositivo real | Testing mobile real, demo |
| **E — CI/CD headless** | `knit build` en GitHub Actions. Sin navegador. Automatización de diseño a deploy | Pipelines, equipos grandes |
| **F — Código → knitstudio** (reverse) | Apuntas knitstudio a un codebase existente. Analiza el HTML/CSS/React y genera un layout.json editable | Migrar proyectos legacy a knitstudio |
| **G — Diseño → knitstudio** (import) | Importas desde Figma, Sketch o screenshot. knitstudio genera layout editable | Diseñadores que pasan a código |
| **H — Preview multi-dispositivo** | Editas en knitstudio y ves cambios simultáneamente en: browser + iPad + Android + iPhone via QR/WebSocket | Testing cross-platform |

### Tabla de compatibilidad por flujo

| Tipo de proyecto | A Local | B Staging | C Prod RO | D Físico | E CI/CD | F Reverse | G Import | H Multi |
|-----------------|:-------:|:---------:|:---------:|:--------:|:-------:|:---------:|:--------:|:-------:|
| **Web** (React, Vue, Angular, Vanilla) | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **WordPress / CMS** | ✅ | ✅ | ✅ | ✅ | ⚠️ | ✅ | ✅ | ✅ |
| **Electron / Tauri** | ✅ | ❌ | ❌ | ❌ | ✅ | ⚠️ | ✅ | ❌ |
| **Chrome Extension** | ✅ | ❌ | ❌ | ❌ | ✅ | ⚠️ | ❌ | ❌ |
| **Capacitor / Ionic** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **React Native** | 🔲 F2 | 🔲 F2 | 🔲 F2 | 🔲 F2 | 🔲 F2 | 🔲 F2 | ✅ | ❌ |
| **Flutter** | 🔲 Fut | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **SwiftUI / Compose** | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |

### Diagrama de flujo por opción

```
OPCIÓN A — LOCAL DEV (la más común)
  git clone → docker compose up (proyecto + knitstudio) → knit project:register
  → knit project:dev → http://localhost:4000 (proyecto + bridge)
  → Abres knitstudio en http://localhost:3000 → editas en vivo

OPCIÓN B — STAGING REMOTO (sin setup local)
  El proyecto ya corre en staging.check.app
  Agregas al HTML: <script src="https://knitstudio.io/bridge.js?token=xxx">
  → Aparece toggle "Edit with knitstudio" en staging
  → Haces clic → knitstudio.cloud carga tu staging en iframe → editas

OPCIÓN C — PRODUCCIÓN READ-ONLY (auditoría)
  Conectas knitstudio a producción
  → Inspeccionas componentes, estilos, rendimiento
  → knitstudio genera reporte: "esta página pesa 2MB, sugerencias:..."
  → No puedes guardar cambios en producción (solo lectura)

OPCIÓN D — DISPOSITIVO FÍSICO MOBILE
  App corriendo en iPhone/Android en la misma red WiFi
  knitstudio detecta dispositivo en la red local
  → Escaneas QR → app se conecta a knitstudio
  → El canvas muestra la pantalla del dispositivo en vivo
  → Editas → cambios se reflejan en el dispositivo real

OPCIÓN E — CI/CD HEADLESS
  En GitHub Actions:
  - name: Build and deploy
    run: |
      knit build --project=check --env=production
      knit export --format=html --out=./dist
      knit deploy --platform=vercel

OPCIÓN F — CÓDIGO → KNITSTUDIO (reverse engineering)
  knit project:analyze --dir=./src/components
  → Detecta componentes React, sus props, estilos
  → Genera layout.json editable en knitstudio
  → Lo abres en el builder, lo mejoras visualmente
  → Exportas los cambios de vuelta al código

OPCIÓN G — DISEÑO → KNITSTUDIO (import)
  Subes un archivo .fig (Figma) o una captura de pantalla
  → AI analiza el diseño → genera layout.json editable
  → Lo ajustas en el builder → exportas a código

OPCIÓN H — PREVIEW MULTI-DISPOSITIVO
  Mientras editas en knitstudio, varios dispositivos conectados
  muestran el mismo layout simultáneamente:
  → Navegador desktop (ventana lado a lado)
  → iPad via QR
  → iPhone via QR
  → Android via QR
  → Todos se actualizan en tiempo real mientras editas
```

## Flujo de trabajo: conectar proyectos existentes a knitstudio

### Escenario: tienes proyectos en GitHub y quieres editarlos con knitstudio

```
PASO 1: Clonar el proyecto
  git clone https://github.com/carlosh7/check.git
  git clone https://github.com/carlosh7/check-3d-planner.git

PASO 2: Iniciar knitstudio (self-hosted)
  docker compose up -d
  → http://localhost:3000  (builder)
  → http://localhost:3001  (api)
  → http://localhost:3100  (mcp server)

PASO 3: Registrar el proyecto en knitstudio
  Desde el builder: New Project → "Connect Existing"
  O desde CLI:
    knit project:register --name=check --type=web --url=http://localhost:4000

  knitstudio descubre automáticamente:
  • Tipo de proyecto (web/React/Vanilla)
  • Endpoints API (escanea rutas del backend)
  • Framework frontend
  • Componentes personalizados existentes

PASO 4: Iniciar el proyecto con el bridge inyectado
  El proyecto necesita el runtime bridge para ser editable.
  Dos modos:

  MODO A: Proxy automático (recomendado)
    knitstudio levanta un proxy que inyecta el bridge automáticamente:
    knit project:dev --name=check
    → knitstudio inicia check + inyecta bridge.js
    → http://localhost:4000 (check + overlay de edición)
    → El usuario ve su app normalmente, pero con un badge "🟢 Connected to knitstudio"

  MODO B: Manual (cuando no puedes usar proxy)
    Agregas 1 línea al HTML:
    <script src="http://localhost:3000/bridge.js"></script>
    → Aparece un toggle "Edit with knitstudio" en la esquina

PASO 5: Editar
  • Abres knitstudio (http://localhost:3000)
  • Seleccionas el proyecto "check"
  • El canvas carga tu app en un iframe
  • Haces click en cualquier elemento → lo editas
  • Cambias colores, tamaños, textos, action flows
  • Los cambios se guardan como JSON en knitstudio
  • O los exportas como CSS/HTML/React directamente al proyecto

PASO 6: Deploy
  knit export --format=css --out=./public/css/modified.css
  knit export --format=react --out=./src/components/generated
  O si usas modo REPO:
  knit commit -m "Actualización visual del dashboard"
  → Los cambios quedan como archivos en tu repo Git
```

### Resumen visual del flujo

```
Tu PC                        Docker                       Navegador
┌──────────┐   git clone   ┌──────────────────┐   http    ┌──────────┐
│ GitHub    │─────────────▶│  check (Express) │◀─────────▶│  check   │
│ repos     │              │  puerto:4000      │           │  + bridge│
│           │              ├──────────────────┤           └──────────┘
│ • check   │              │  knitstudio       │   http         │
│ • planner │              │  puerto:3000      │────────────▶┌─┴────────┐
│ • backst. │              │  (builder + api)  │             │ knitsudio│
│           │              ├──────────────────┤             │ (canvas) │
└──────────┘              │  knitstudio MCP   │             │  iframe  │
                           │  puerto:3100      │             │ de check │
                           │  (IA agent)       │             └──────────┘
                           └──────────────────┘
```

### Modos de conexión resumidos

| Modo | Cómo funciona | Cuándo usarlo |
|------|--------------|---------------|
| **Proxy automático** | knitstudio levanta el proyecto + inyecta bridge | El proyecto se inicia con Docker desde knitstudio |
| **Script tag manual** | Agregas `<script src="bridge.js">` al HTML | El proyecto ya está corriendo por separado |
| **CLI directo** | `knit project:connect --name=check --url=http://localhost:4000` | Automatización, CI/CD, scripts |
| **WebSocket (RN)** | Conexión directa al Metro bundler de React Native | Proyectos React Native en desarrollo |

## Modelo de despliegue

knitstudio tiene **dos modalidades de instalación**:

| Modalidad | Quién hostea | Quién paga APIs (AI, Stripe, etc) | Ideal para |
|-----------|:------------:|:---------------------------------:|------------|
| **Self-hosted** | El usuario (Docker) | El usuario (sus propias API keys) | Profesionales, empresas, privacidad de datos |
| **Cloud (knitstudio.io)** | Nosotros | Nosotros (incluido en la suscripción) | Amateurs, quien no quiere configurar nada |

Ambas modalidades usan **exactamente el mismo código**. La diferencia es:
- Self-hosted: el usuario configura sus API keys en `.env`
- Cloud: nosotros las configuramos y las cobramos vía suscripción

## Filosofía del Producto

knitstudio tiene 4 modos de uso + capa para amateurs y profesionales:

| Modo | Descripción |
|------|-------------|
| **1. CREAR** | Desde cero con AI (prompt → app) o manual (canvas drag & drop) |
| **2. EDITAR** | Proyectos existentes: web (iframe), React Native (WebSocket), Capacitor |
| **3. GENERAR** | Backend completo (API + DB + auth + tests) desde action flows del frontend |
| **4. AUTO-ESCULPIR** | knitstudio se edita a sí misma (self-edit mode + chat + MCP) |
| **+ AMATEUR** | Simple/Advanced toggle, wizards guiados, templates por nivel, onboarding contextual |
| **+ HEADLESS** | CLI-only, sin GUI, para CI/CD y automatización |

---

## Fases de Implementación

### Fase 0 — Foundation + Operaciones (Semanas 1-2) ✅ COMPLETADA

**Objetivo:** Monorepo funcionando + Builder + API + MCP Server + Docker + operaciones críticas

| Tarea | Estado |
|-------|--------|
| Crear monorepo (pnpm workspaces) | ✅ Completado |
| Builder React 19 + Vite + TypeScript | ✅ Completado |
| API Express + PostgreSQL + Redis | ✅ Completado |
| MCP Server (stdio) | ✅ Completado |
| GrapesJS + @grapesjs/react integrado | ✅ Completado |
| React Flow integrado | ✅ Completado |
| Docker compose + portainer-stack.yml | ✅ Completado |
| GitHub Actions CI/CD | ✅ Completado |
| CLI scaffolding (`knit init`, `dev`, `build`, `export`, `project:register`) | ✅ Completado |
| **Unit tests builder + API (Vitest + Supertest)** | ✅ Completado |
| **Build test + smoke test post-deploy en CI/CD** | ✅ Completado |
| **ADRs (Architecture Decision Records) en docs/architecture/** | ✅ Completado (ADR-001) |
| **Project Dashboard: lista de proyectos, crear, importar, estado** | ✅ Completado |
| **E2E tests (Playwright): flujo completo del builder** | 🔲 Pendiente |
| **Visual regression (Percy/Chromatic)** | 🔲 Pendiente |
| **Load + stress tests (k6)** | 🔲 Pendiente |
| **Auto-validation del output exportado** | 🔲 Pendiente |
| **JSDoc/TSDoc en todo el código** | 🔲 Pendiente |
| **README por cada package del monorepo** | 🔲 Pendiente |
| **Storybook del builder** | 🔲 Pendiente |
| **API reference autogenerada** | 🔲 Pendiente |
| **Project connection system** | 🔲 Pendiente |
| **Project Home: páginas, templates** | 🔲 Pendiente |
| **Feature Flags system** | 🔲 Pendiente |
| **Zero-downtime deployments** | 🔲 Pendiente |
| **Disaster Recovery Plan** | 🔲 Pendiente |
| **Incident Response Plan** | 🔲 Pendiente |
| **knit backup / knit restore** | 🔲 Pendiente |
| **Recovery plan documentado** | 🔲 Pendiente |

### Fase 1 — Security Core (Semana 3) ✅ COMPLETADA

**Objetivo:** Que el producto sea seguro desde el día 1. **CRÍTICO — no avanzar sin esto.**

| Tarea | Prioridad | Estado |
|-------|:---------:|--------|
| DOMPurify en canvas (sanitizar HTML) | 🔴 MVP | ✅ Completado |
| origin validation en postMessage bridge | 🔴 MVP | ✅ Completado |
| origin validation en WebSocket RN bridge | 🔴 MVP | 🔲 Pendiente (post-MVP RN) |
| JWT + RBAC en API | 🔴 MVP | ✅ Completado |
| Keystore cifrado (AES-256-GCM) para secrets: API keys no van en JSON ni en Git | 🔴 MVP | ✅ Completado |
| Variables de entorno: secrets inyectados en runtime, no persistidos en layouts | 🔴 MVP | ✅ Completado |
| Rate limiting por endpoint (19 grupos) | 🔴 MVP | ✅ Completado |
| CSRF en APIs POST/PUT/DELETE | 🔴 MVP | ✅ Completado |
| Helmet + security headers | 🔴 MVP | ✅ Completado |
| Audit logs | 🟡 Fase 2 | 🔲 Pendiente |
| Content Security Policy estricta | 🟡 Fase 2 | 🔲 Pendiente |
| SECURITY.md + bug bounty policy | 🔴 MVP | ✅ Completado |
| Security audit antes del lanzamiento público | 🔴 MVP | 🔲 Pendiente (pre-lanzamiento)

### Fase 2 — UX Core + Modo Amateur (Semana 4) ⚡ EN EJECUCIÓN

**Objetivo:** Experiencia de usuario tanto para amateurs como para profesionales.

| Tarea | Para quién | Estado |
|-------|:----------:|--------|
| Undo/Redo (GrapesJS manager con 50 tracks) | Ambos | ✅ Completado |
| **Toggle Simple / Advanced** — amateur ve 3 botones, profesional ve el builder completo | Amateur | ✅ Completado |
| **Welcome screen: "Crear", "Importar", "Explorar ejemplos"** | Amateur | ✅ Completado |
| **Component explorer: 5 componentes (Button, Text, Container, Image, Card)** | Ambos | ✅ Completado |
| **Keyboard shortcuts reference (modal con `?`)** | Profesional | ✅ Completado |
| **Empty states en paneles** | Ambos | ✅ Completado |
| Autoguardado cada 30s (IndexedDB + al publicar a BD) | Ambos | 🔲 Pendiente |
| **Wizards guiados** — "Crea tabla → conecta API → listo" en 4 pasos | Amateur | 🔲 Pendiente |
| **Templates por nivel** — Nivel 1 a 5 | Amateur | 🔲 Pendiente |
| **Onboarding interactivo + contextual** | Amateur | 🔲 Pendiente |
| **Onboarding personalizado por perfil** | Ambos | 🔲 Pendiente |
| **Demo mode / Try before you sign** | Ambos | 🔲 Pendiente |
| Skeleton loading en paneles | Ambos | 🔲 Pendiente |
| Toast de error con reintentar/reportar | Ambos | 🔲 Pendiente |
| Snap to grid (8px/16px/24px configurable) | Ambos | 🔲 Pendiente |
| **Feedback loop integrado** | Ambos | 🔲 Pendiente |
| **Changelog visible desde el builder** | Ambos | 🔲 Pendiente |
| **Roadmap visible desde el builder** | Ambos | 🔲 Pendiente |
| **Modo Sandbox / Scratch** | Amateur | 🔲 Pendiente |
| **"Undo All" / Reset project** | Amateur | 🔲 Pendiente |
| **Showcase / Galería pública de ejemplos** | Amateur | 🔲 Pendiente |
| **Búsqueda global (Cmd+K)** | Ambos | 🔲 Pendiente |
| **Quick edit mode** — presionar "e" para editar texto inline | Ambos | 🔲 Pendiente |
| **"I broke everything" safety net** | Ambos | 🔲 Pendiente |
| **Draft vs Published** | Ambos | 🔲 Pendiente |
| **Dry-run / simulation mode** | Profesional | 🔲 Pendiente |
| **Auto-snapshots pre-publicación** | Ambos | 🔲 Pendiente |
| **Feature discovery: "Sabías que...?"** | Amateur | 🔲 Pendiente |
| **Keyboard shortcuts discovery** | Ambos | 🔲 Pendiente |
| **Indicador de guardado persistente** | Ambos | 🔲 Pendiente |
| **Confirmación de publicación: "X cambios sin revisar. ¿Publicar igual?"** | Ambos | 🔲 Pendiente |
| **"Continue where you left off": última página, último componente, último cambio** | Ambos | 🔲 Pendiente |
| **Lenguaje simple vs técnico: toggle que cambia toda la terminología** | Ambos | 🔲 Pendiente |

### Fase 3 — Performance + a11y + i18n + Offline + Contenido multi-idioma (Semana 5)

**Objetivo:** Cumplir targets de rendimiento, accesibilidad, internacionalización y funcionar sin internet.

| Tarea | Target | Estado |
|-------|--------|--------|
| Runtime <50KB gzip | ✅ | 🔲 Pendiente |
| Builder initial load <500KB gzip | ✅ | 🔲 Pendiente |
| Time to Interactive <3s | ✅ | 🔲 Pendiente |
| First Paint <1s | ✅ | 🔲 Pendiente |
| Lighthouse score >90 | ✅ | 🔲 Pendiente |
| Canvas 500+ componentes a 60fps | ✅ | 🔲 Pendiente |
| Build time <5s | ✅ | 🔲 Pendiente |
| WCAG 2.1 AA compliance | ✅ | 🔲 Pendiente |
| Keyboard navigation (sin mouse) | ✅ | 🔲 Pendiente |
| Screen reader (ARIA labels) | ✅ | 🔲 Pendiente |
| Color contrast 4.5:1 mínimo | ✅ | 🔲 Pendiente |
| i18n EN + ES desde día 1 | ✅ | 🔲 Pendiente |
| **Offline-first: Service Worker + IndexedDB + sync engine** | ✅ | 🔲 Pendiente |
| **Modo avión funcional: builder operable sin internet** | ✅ | 🔲 Pendiente |
| **Sync automático al reconectar (como Google Docs)** | ✅ | 🔲 Pendiente |
| **Multi-language pages: mismo layout, contenido en diferentes idiomas** | ✅ | 🔲 Pendiente |
| **Translation workflow: textos en EN + ES + FR desde el builder** | ✅ | 🔲 Pendiente |
| **Translation memory: reutilizar traducciones anteriores** | ✅ | 🔲 Pendiente |
| **AI translation: traducir todo el contenido con un clic** | ✅ | 🔲 Pendiente |
| **RTL support: layouts que se reflejan para árabe/hebreo** | ✅ | 🔲 Pendiente |
| **Date/currency/number localization en componentes generados** | ✅ | 🔲 Pendiente |

### Fase 4 — Componentes Core + Testing + Sandbox (Semanas 6-7) ✅ COMPLETADA

**Objetivo:** 35 componentes funcionales para construir apps reales.

| Componente | Target | Estado |
|-----------|:------:|--------|
| F1 Core (20): Container, Text, Button, TextInput, Form, Stack, ScrollView, Card, Icon, Divider, Spacer, Navbar, Footer, Sidebar, Pressable, Loading, Image, Select, Checkbox, RadioGroup | Web + RN | ✅ Registrados en registry |
| F2 Datos (15): Table, DataList, FormField, DatePicker, FileUpload, Chart, Pagination, SearchBar, FilterBar, EmptyState, DataExport, Tabs, Accordion, Stepper, Timeline | Web + RN | ✅ Registrados en registry |
| **Component sandbox: ver componente aislado** | Ambos | 🔲 Post-MVP |
| **Mock data preview** | Ambos | 🔲 Post-MVP |
| **State explorer** | Profesional | 🔲 Post-MVP |
| **"Try it" mode** | Ambos | 🔲 Post-MVP |
| **Viewport presets** | Ambos | 🔲 Post-MVP |
| **Slow network simulation** | Profesional | 🔲 Post-MVP |

### Fase 5 — Action Flows + Data Binding + Debug + Import (Semana 8) ✅ COMPLETADA

**Objetivo:** Sistema de lógica visual completo + importar desde otras herramientas.

| Tarea | Estado |
|-------|--------|
| React Flow integrado como action editor | ✅ Completado |
| Nodos: trigger, API Call, Set Variable con MiniMap, Controls | ✅ Completado |
| **Import desde HTML existente: `--from=html`** | ✅ Completado (importFromHTML) |
| **Import desde URL: `--from=html --url=`** | ✅ Completado (importFromURL) |
| Data binding: conectar componentes a APIs | 🔲 Post-MVP |
| Variables globales + de página | 🔲 Post-MVP |
| State manager reactivo | 🔲 Post-MVP |
| Debug de action flows | 🔲 Post-MVP |
### Web Capture + AI Project Seed — nuevo flujo completo

```
┌──────────────────────────────────────────────────────────────────────┐
│  WEB CAPTURE                                                         │
│                                                                      │
│  Usuario pega URL: https://ejemplo.com/login                         │
│                                                                      │
│  1. knitstudio descarga: HTML + CSS (inline/externo) + JS + assets  │
│  2. renderiza la página en un iframe interno (sin alterar nada)     │
│  3. AI analiza la estructura y propone:                             │
│     a) "Crear proyecto desde esta página"                           │
│     b) "Copiar componentes selectivamente"                          │
│     c) "Usar solo el estilo/tema"                                   │
│                                                                      │
│  4. El usuario elige opción → knitstudio genera:                     │
│     - Proyecto completo con layout.json editable                     │
│     - Componentes detectados (login form, navbar, footer, etc)      │
│     - Tema extraído (colores, tipografía, spacing)                  │
│     - Assets descargados y hosteados localmente                     │
│                                                                      │
│  5. El usuario puede:                                                │
│     - Editar visualmente (cambiar textos, colores, tamaños)         │
│     - Arrastrar nuevos componentes                                   │
│     - Copiar componentes entre proyectos (tabs)                     │
│     - Decirle a la IA: "conecta esto a mi backend"                  │
└──────────────────────────────────────────────────────────────────────┘

BENEFICIOS:
- No empezar de cero: clonar cualquier web como base
- Aprender de otras webs: ver cómo están construidas
- Migrar sitios legacy a knitstudio
- Prototipado rápido: "quiero algo como esta web"

EJEMPLO DE USO:
  Usuario: "Toma esta URL, quiero una app similar"
  → Paste URL → knitstudio captura → crea proyecto editable
  → Yo conecto todo: "Listo, tengo el login, el dashboard y la tabla."
```


| **Import desde HTML existente: `--from=html --url=https://misitio.com`** | 🔲 Pendiente |
| **Import desde React: `--from=react --dir=./src/components`** | 🔲 Pendiente |
| **Import desde Webflow (HTML export)** | 🔲 Pendiente |
| **Import desde Retool / Appsmith (JSON export)** | 🔲 Pendiente |
| **Web Grab: pegar URL de cualquier web → descarga HTML/CSS/JS completa** | 🔲 Pendiente |
| **HTML→knitstudio converter: AI analiza la web y genera layout.json editable** | 🔲 Pendiente |
| **"Usar como base para mi proyecto" — crear proyecto nuevo desde una web existente** | 🔲 Pendiente |
| **Cross-project clipboard: copiar componentes entre tabs/proyectos de knitstudio** | 🔲 Pendiente |
| **AI Connect: detectar componentes pegados y ofrecer crear backend automáticamente** | 🔲 Pendiente |

### Fase 6 — Export Engine + Preview + Analytics + Custom Domains (Semana 9) ✅ COMPLETADA

| Target / Feature | Estado |
|------------------|--------|
| JSON universal (schema en @knitstudio/core) | ✅ Completado |
| HTML + CSS (vanilla, runtime ~12KB) | ✅ ExportToHTML() |
| React + Tailwind (TSX + classes) | ✅ exportToReact() |
| Backend code gen (Express/FastAPI/Next.js) vía IA | 🔲 Post-MVP |
| **Analytics integrado** | 🔲 Post-MVP |
| **Custom Domains** | 🔲 Post-MVP |
| **Preview QR** | 🔲 Post-MVP |
| **Código generado legible** | ✅ HTML semántico, componentes mapeados |
| **Backward compatibility policy: layouts v1 funcionan en v2** | 🔲 Pendiente |
| **Layout migration assistant: knit migrate, actualización automática** | 🔲 Pendiente |
| **Changelog for breaking changes: notificar antes de actualizar** | 🔲 Pendiente |
| **Multi-version runtime: runtime que renderiza múltiples schemaVersions** | 🔲 Pendiente |
| **Detección CORS/CSP al registrar proyecto: diagnosticar y sugerir modo alternativo** | 🔲 Pendiente |
| **Token sharing en iframe: pasar sesión via postMessage para login automático** | 🔲 Pendiente |
| **SSR hydration safe mode: bridge compatible con Next.js/Nuxt** | 🔲 Pendiente |
| **Git merge conflict detection: diff guiado entre layout knitstudio y archivo Git** | 🔲 Pendiente |
| **Refresh token automático: heartbeat cada 5 min, alerta antes de expirar** | 🔲 Pendiente |
| **knit doctor: diagnóstico de Docker, puertos, protocolos, dependencias** | 🔲 Pendiente |
| **knit bridge --listen=:3100: bridge self-hosted para intranets/VPN** | 🔲 Pendiente |
| **Bridge versionado por React: bridge-v1.js (React 16), bridge-v2.js (React 18+)** | 🔲 Pendiente |

### Post-MVP (Semanas 13-32) 🔲 Planificado

| Feature | Esfuerzo | Estado |
|---------|:--------:|--------|
| Capacitor export (app en stores) | 3 sem | 🔲 Planificado |
| React Native export + RN live edit | 12 sem | 🔲 Planificado |
| Colaboración multi-usuario | 6 sem | 🔲 Planificado |
| A/B Testing UI | 4 sem | 🔲 Planificado |
| Extensiones VS Code + Cursor | 4 sem | 🔲 Planificado |
| White-label editor | 6 sem | 🔲 Planificado |
| Plugin SDK + Component SDK | 7 sem | 🔲 Planificado |
| Vue export (SFC) | 4 sem | 🔲 Planificado |
| Svelte export | 6 sem | 🔲 Planificado |
| Flutter export (Dart widgets) | 12 sem | 🔲 Planificado |
| Migration tools desde Webflow, Retool, Appsmith, Bubble | 4 sem | 🔲 Planificado |
| Data residency | 3 sem | 🔲 Planificado |
| SLA / Support tiers | 2 sem | 🔲 Planificado |

---

## Modelo de Despliegue Detallado

### Self-hosted (el usuario)
```
docker compose up
  → builder + api + BD + MCP corren localmente
  → El usuario configura sus propias API keys en .env:
      OPENAI_API_KEY=sk-...
      ANTHROPIC_API_KEY=sk-...
      STRIPE_SECRET_KEY=sk-...
  → 0 dependencia de knitstudio.cloud
  → 100% funcional sin internet (excepto las APIs que configure)
  → backup y restauración local
```

### Cloud (knitstudio.io)
```
Nosotros hosteamos multi-tenant
  → El usuario no configura nada
  → Las API keys son nuestras (las pagamos nosotros)
  → El costo se recupera via suscripción mensual
  → Ideal para: amateurs, tests, proyectos pequeños
  → Límites de uso por plan (requests AI, storage, ancho de banda)
```

### Modelo económico

| Plan | Self-hosted | Cloud Free | Cloud Pro | Cloud Enterprise |
|------|:-----------:|:----------:|:---------:|:----------------:|
| **Precio** | Gratis | Gratis | $29/mes | Custom |
| **APIs** | Del usuario | Nuestras (limitadas) | Nuestras (más) | Nuestras (ilimitadas) |
| **Proyectos** | Ilimitados | 3 | 50 | Ilimitados |
| **AI requests** | Del usuario | 100/mes | 10,000/mes | Ilimitadas |
| **Storage** | Local | 100MB | 5GB | Ilimitado |
| **Dominio custom** | El que quiera | ❌ | ✅ | ✅ |
| **Soporte** | Comunidad | Comunidad | Priority | Enterprise 24/7 |
| **Self-host** | ✅ | ❌ | ❌ | ✅ (con soporte) |

### Costos estimados del cloud

| Concepto | Costo/mes | Quién paga |
|----------|:---------:|:----------:|
| Servidor (VPS/cloud) | $50-200 | Nosotros (o el usuario en self-host) |
| OpenAI API (por usuario activo) | $5-50 | Nosotros en cloud, usuario en self-host |
| Stripe fees | 2.9% + $0.30 | Nosotros |
| Almacenamiento (por GB) | $0.02 | Nosotros |
| CDN | $0.08/GB | Nosotros |
| **Total por usuario cloud activo** | **~$10-70/mes** | Nosotros (cubierto por $29/mes) |

---

## Stack Tecnológico

| Capa | Tecnología | Por qué |
|------|-----------|---------|
| Builder UI | React 19 + Vite + TypeScript | Ecosistema para tools complejas, React Flow |
| Page designer | GrapesJS + @grapesjs/react | Page builder embeddable OSS (BSD-3), React wrapper oficial |
| Action editor | React Flow (36.6K⭐, MIT) | Node editor visual embeddable |
| AI Engine | OpenAI + Anthropic + Ollama (local) | Múltiples LLMs, configurables por el usuario en self-host |
| Runtime | Vanilla JS (<50KB gzip) | Funciona en cualquier proyecto sin dependencias |
| API | Express + PostgreSQL + Redis | Stack probado, bajo overhead |
| MCP Server | @modelcontextprotocol/sdk | Protocolo estándar MCP 2025-06-18 |
| SDK | npm packages | Vanilla JS + React + Vue + RN |
| Plugin SDK | npm create @knitstudio/plugin | Extensibilidad para terceros |
| Docs | Docusaurus 3 | i18n nativo, versionado, Algolia |
| CI/CD | GitHub Actions | Estandar OSS |
| Hosting | Docker (self-host) + Vercel (docs) | El usuario elige dónde hostear |
| Offline | Service Worker + IndexedDB | Modo avión + sync al reconectar |
| Error tracking | Sentry | Monitoreo del builder |
| Analytics | PostHog | Métricas de uso del builder |

---

## Hitos Clave

| Hito | Fecha estimada | Descripción |
|------|:--------------:|-------------|
| MVP v1.0.0 | Semana 14 | Builder + seguridad + UX amateur/pro + offline + i18n + a11y + 35 componentes + action flows + import + export + AI + Git + anotaciones + MCP + docs + enterprise ready + monitoreo |
| v1.1.0 | Semana 18 | Capacitor export + conectores F2 + Plugin SDK + Backup |
| v1.2.0 | Semana 24 | React Native export + RN live edit + Colaboración + Migration tools |
| v2.0.0 | Semana 28 | A/B testing + extensiones IDE + white-label + Custom renderers |
| v2.1.0 | Semana 32 | Vue export + Svelte + Flutter + Data residency + SLA tiers |

---

## Competitive Tracking — lo que la competencia ya tiene

| Competidor | Ya tiene | knitstudio lo tendrá |
|------------|----------|----------------------|
| **v0.dev** | Prompt→app completa con DB + auth + deploy | Fase 7 |
| **bolt.new** | Design system import + Bolt Cloud hosting | Fase 6 + Post-MVP |
| **Webflow** | MCP Server, AI nativo, Webflow Cloud (full-stack), GSAP animations, hosting CDN global | Fase 8 + Post-MVP |
| **Builder.io** | MCP Server, VS Code/Cursor extensions, workspace sobre repos reales | Post-MVP |
| **Replit Agent** | Canvas visual + agentes paralelos + multi-tasking | Post-MVP |
| **Retool** | 100+ data sources, Workflows con AI, Agents, Mobile apps, Source control enterprise | Fase 2 + Post-MVP |
| **n8n** | 500+ integraciones, AI/LangChain nodes, MCP, Code nodes, Sub-workflows | Fase 5 + Post-MVP |
| **Coframe** | A/B testing UI automático con AI, optimización continua | Post-MVP |

## Gaps Competitivos Cerrados
| Input multimodal | Screenshots + documentos + texto |
| MCP Server propio | Recursos + tools para agentes externos |
| Live preview conversacional | Chat inline con preview en vivo |
| Runtime embeddable | <50KB gzip, funciona en cualquier proyecto |
| Export multi-framework | HTML + React + Vue + RN + Capacitor + backend |
| Sin vendor lock-in | Código exportable, no dependes de knitstudio |
| Self-host total | Docker compose, PostgreSQL, Redis |
| **Modo amateur** | Simple/Advanced toggle + wizards + templates por nivel |
| **Import desde otras herramientas** | Figma, HTML, React, Webflow, Retool, Appsmith |
| **Git nativo** | Layouts como JSON en el repo, diff visual, CI/CD, branch por ambiente |
| **Plugin SDK** | Terceros extienden la plataforma con plugins y componentes |
| **Offline-first** | Service Worker + IndexedDB + sync como Google Docs |
| **Enterprise ready** | Multi-tenant, roles granulares, SSO, audit trail, Helm chart, SLA |
| **Preview en dispositivo real** | QR code → celular ve el layout en vivo |
| **Dashboard de monitoreo** | Métricas del builder en tiempo real |

---

## Notas Importantes

1. **Seguridad antes que features:** Fase 1 es obligatoria antes de cualquier feature pública
2. **Rendimiento desde el día 1:** Lighthouse CI en cada PR
3. **Accesibilidad no es opcional:** WCAG 2.1 AA desde v1.0.0
4. **i18n desde el inicio:** Agregar después es 10x más caro
5. **MCP es estratégico:** Permite que cualquier IA externa (Claude, Cursor, Copilot) se conecte a knitstudio
6. **Auto-esculpido es el diferenciador final:** Cuando knitstudio puede editarse a sí misma, se vuelve infinita
7. **Modo amateur es la puerta de entrada:** Si un no-técnico no puede usarlo, perdemos el 80% del mercado
8. **Import es lo más pedido:** Nadie quiere empezar de cero. Importar desde Figma/HTML/React acelera adopción
9. **Git nativo es lo que pide el profesional:** Sin integración con Git, los devs no lo toman en serio
10. **Plugin SDK es el multiplicador:** Cuando cualquiera puede extender knitstudio, el crecimiento es exponencial
11. **Testing del builder no es opcional:** Sin tests, cada release es una ruleta rusa. CI bloquea si fallan los tests.
12. **Documentación integral desde el día 1:** código sin documentar no existe. JSDoc, README por package, Storybook, ADRs.
13. **Riesgo existencial #1 = bus factor:** Desde el día 1, documentar TODO para que cualquier persona pueda retomar el proyecto.
14. **Proveedores de AI diversificados:** No depender de un solo proveedor. OpenAI + Anthropic + Ollama local como mínimo.
15. **Cumplimiento legal no negociable:** DPA, WCAG, GDPR, CCPA, DMCA, CLA — todo antes del lanzamiento cloud.
