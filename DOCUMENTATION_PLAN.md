# knitstudio — Documentation Plan

> Estilo Ubuntu / Diátaxis. Herramienta: Docusaurus 3.

## Structure

```
docs.knitstudio.io/
├── tutorials/          → Learning-oriented (hands-on, paso a paso)
├── how-to/             → Goal-oriented (recetas para resolver problemas)
├── reference/          → Information-oriented (API docs, catálogos)
└── explanation/        → Understanding-oriented (conceptos, arquitectura)

Features:
  • Multi-idioma: EN + ES desde día 1
  • Multi-versión: v1.0, v1.1, v2.0, etc
  • Algolia DocSearch integrado
  • Dark mode
  • Edit this page (GitHub)
  • Feedback widget (👍 👎)
  • Analytics (Plausible / Umami)
```

## Tutorials (5)

| # | Tutorial | Tiempo | Aprenden |
|---|----------|:------:|----------|
| 1 | Hello World: Tu primer botón en el canvas | 10 min | Navegar canvas, inspector de propiedades, preview |
| 2 | Conecta tu primera API | 20 min | Data binding, HTTP action, variables, template syntax |
| 3 | Formulario con validación + notificación | 30 min | Form components, validación, action flows condicionales |
| 4 | Dashboard en tiempo real con WebSocket | 45 min | MCP protocol, real-time binding, charts |
| 5 | Publica tu app como PWA + Mobile | 30 min | Export pipeline, PWA manifest, Capacitor wrap |

## How-to Guides (25)

| Categoría | Guías |
|-----------|-------|
| **Instalación** (4) | Docker setup, JWT/OAuth config, migración de versiones, configuración DB |
| **Diseño visual** (5) | Responsive layout, themes, animaciones, custom CSS, multi-step forms |
| **Action flows** (4) | Branching, loops sobre arrays, error handling, timeouts/debounce |
| **Data binding** (3) | Datos locales vs remotos, filtros y sorting, cache y revalidación |
| **Export y deploy** (3) | Static HTML, React/Next.js, Deploy con GitHub Actions |
| **Integraciones** (3) | Stripe pagos, Supabase backend, OpenAI/Anthropic |
| **IA / MCP** (3) | Crear MCP tool personalizado, IA para generar UI, validación con LLM |

## Reference

| Sección | Contenido |
|---------|-----------|
| **API** | Endpoints REST de knitstudio (método, path, params, body, response, errores, ejemplos curl) |
| **Runtime API** | `StudioRuntime.app`, `.state`, `.navigate`, `.http`, `.notify`, `.storage`, `.auth`, `.i18n` |
| **Component Catalog** | Cada componente con props, eventos, slots, ejemplos, target |
| **Action Nodes** | HTTP Request, Set Variable, Condition, Loop, Navigate, Notify, Code JS/Python, MCP Tool |
| **MCP Protocol** | Recursos, tools, prompts, mensajes, transporte |
| **CLI** | `init`, `dev`, `build`, `deploy`, `export`, `mcp:connect` |
| **Schema** | `.knitstudio/app.json`, `pages/*.json`, `flows/*.json`, `theme.json`, `mcp.json` |

## Explanation

| Artículo | Explica |
|----------|---------|
| Architecture Overview | Backend ↔ Frontend ↔ Runtime ↔ MCP. Diagrama de bloques |
| How the Runtime Works | Editar → serializar a JSON → renderizar en target |
| Iframe Bridge Protocol | postMessage padre↔hijo con origin validation |
| Export Pipeline | Source → Compiler → Bundler → Output (SPA/PWA/RN) |
| Security Model | Sandbox triple: iframe, Worker, MCP. CSP, permisos |
| Comparisons | knitstudio vs Webflow, Retool, n8n, v0.dev. Cuándo usar cada uno |

## Contribution Guide

```
HOW TO WRITE DOCS:
  • Tutorials: lenguaje paso a paso, "haz click aquí", screenshots
  • How-to: lenguaje imperativo, "Para hacer X, usa Y". Sin teoría.
  • Reference: lenguaje descriptivo, tipos, tablas. Sin ejemplos de uso.
  • Explanation: lenguaje conceptual, diagramas, por qué. Sin pasos.
  
STYLE GUIDE:
  • Tono: Tú (informal), activo ("Haz click")
  • Máximo 3 niveles de heading
  • TypeScript con tipado explícito
  • Screenshots: 1200px, WebP, anotaciones rojas
  • Un archivo por concepto. Sin mega-docs de 2000 líneas
  
REVIEW PROCESS:
  PR → CI (build + textlint + alex) → reviewer técnico → reviewer docs → merge
  
TRANSLATIONS:
  • i18n/en/ (source), i18n/es/ (copia + traducción)
  • Términos NO traducibles: component, action flow, MCP, canvas, runtime
  • Crowdin para community translations
```
