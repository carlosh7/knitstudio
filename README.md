<div align="center">
  <h1>🧶 knitstudio</h1>
  <p><strong>Visual Application Builder Universal</strong></p>
  <p>Open Source · MIT · Para cualquier proyecto, lenguaje y plataforma</p>
  <p>
    <a href="#-qué-es-knitstudio">¿Qué es?</a> ·
    <a href="#-características-clave">Características</a> ·
    <a href="#-comparación-con-competencia">vs Otros</a> ·
    <a href="#-guía-de-inicio-rápido">Inicio Rápido</a> ·
    <a href="#-tutoriales">Tutoriales</a>
  </p>
  <br>
  <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="MIT License">
  <img src="https://img.shields.io/badge/version-1.0.0-green.svg" alt="Version 1.0.0">
  <img src="https://img.shields.io/badge/runtime-1.7KB-success.svg" alt="Runtime 1.7KB">
  <img src="https://img.shields.io/badge/builder-130KB_gzip-success.svg" alt="Builder 130KB gzip">
</div>

---

# 🧶 knitstudio

## Una herramienta, infinitas posibilidades

**knitstudio** es el primer **Visual Application Builder universal** que combina en una sola plataforma:

| 🎨 Page Designer | ⚡ Action Flows | 🔗 Data Binding | 🤖 AI Nativo | 📦 Export Universal |
|---|---|---|---|---|

**Todo open source, todo tuyo, sin vendor lock-in.**

---

## 🤔 ¿Qué es knitstudio?

Imagina poder **diseñar visualmente** una aplicación completa —desde una landing page hasta un dashboard con datos reales— **sin escribir código**, y luego **exportarla a React, HTML, Vue o lo que necesites**. Eso es knitstudio.

Como un telar que teje hilos sueltos en una tela cohesiva, knitstudio teje:

| Hilo | Qué hace | Ejemplo |
|------|----------|---------|
| 🧶 **Componentes visuales** | Construye la interfaz arrastrando 35+ componentes | Botones, tablas, formularios, charts |
| ⚡ **Action Flows** | Dale lógica a la interfaz sin código | "Al hacer click, llama a esta API y muestra el resultado" |
| 🔗 **Data Binding** | Conecta tu UI a datos reales | APIs, bases de datos, servicios externos |
| 🤖 **AI Nativa** | Genera layouts completos desde texto | "Crea un dashboard con sidebar, stats y tabla de datos" |
| 📦 **Export Universal** | Lleva tu diseño a cualquier framework | HTML, React, Vue, React Native, Capacitor |

### ¿Para quién es?

| Perfil | Por qué knitstudio |
|--------|-------------------|
| 🎨 **Diseñador** | Diseña visualmente sin código, exporta a código limpio para developers |
| 💻 **Developer** | Acelera prototipado, conecta APIs visualmente, genera backend con AI |
| 🏢 **Empresa** | Self-hosted, seguridad desde el día 1, sin dependencia de terceros |
| 🎓 **Estudiante** | Aprende arquitectura de apps visualmente, onboarding guiado |
| 🚀 **Startup** | MVP en horas, no en meses. Iteración visual sin fricción |

---

## ✨ Características Clave

### 🎨 Page Designer Profesional
- **35+ componentes** arrastrables: Container, Text, Button, Table, Form, Chart, Navbar, Sidebar, Tabs, Accordion, Timeline y más
- **Editor visual de estilos**: colores, tipografía, spacing, flexbox, bordes, sombras — todo drag & drop
- **Grid overlay configurable**: snap 4/8/12/16/24px para alineación perfecta
- **Modo Simple/Advanced**: desde 3 botones hasta el builder completo, según tu nivel
- **Component Sandbox**: previsualiza y prueba componentes aislados con sus props

### ⚡ Action Flows Visuales
- **Editor de flujos** con React Flow: nodos, conexiones, triggers
- **Data Binding panel**: conecta fuentes de datos, define bindings, ejecuta y debuggea
- **Modo Debug**: breakpoints, step-by-step, panel de logs de ejecución
- **Nodos**: API Call, Navigate, Toast, Set Variable, Condition, Loop, Delay, Code

### 🤖 AI Integrada (GPT-4o)
- **Prompt → Layout**: describe lo que quieres y la IA genera el layout completo
- **Traducción automática**: traduce páginas enteras a cualquier idioma
- **API key local**: tu clave se almacena en tu navegador, nunca en nuestros servidores

### 🔌 MCP Server Nativo
- **Protocolo MCP 2025-06-18**: conéctate con Claude, Cursor, Copilot, Windsurf, opencode
- **Tools remotas**: `create_page`, `list_projects`, `create_project`, `health`
- **100% compatible**: cualquier cliente MCP puede manipular tu proyecto

### 📦 Export Universal
- **HTML+CSS**: página completa y autónoma
- **React TSX**: componentes funcionales con estilos inline
- **Ruta de exportación**: `knit export --project=abc --format=react`
- **Runtime 1.7KB**: embedable en cualquier proyecto via `<script data-knit-runtime>`

### 🔒 Seguridad desde el Día 1
- **DOMPurify**: sanitización de todo HTML en canvas (XSS prevention)
- **JWT + RBAC**: autenticación y roles granulares (admin, user, etc.)
- **Rate limiting**: 9 grupos de rate limiters para protección de API
- **Helmet**: headers de seguridad, CSP, HSTS, X-Frame-Options
- **Keystore cifrado**: AES-256-GCM para secrets
- **Self-hosted total**: tus datos en tu servidor, 0 dependencia externa

### 🐳 Despliegue con Docker

### Stack autónomo (recomendado)

```bash
docker compose up -d
# Builder: http://localhost:3000
# API:     http://localhost:3001
# MCP:     http://localhost:3100
```

### Integración con Portainer existente

Si ya tienes Portainer en tu equipo, **no necesitas instalar otro**. knitstudio proporciona un archivo para importar directamente:

```
1. Abre Portainer → Stacks → + Add Stack
2. Pega el contenido de portainer-stack.yml
3. Asigna nombre "knitstudio"
4. Click "Deploy"
```

knitstudio **no instala ni gestiona Portainer**. Se integra con el que ya tengas.

---

## 🏆 Comparación con la Competencia

| Característica | knitstudio | Webflow | Retool | n8n | v0.dev | Builder.io |
|---|---|---|---|---|---|---|
| **Page Builder Visual** | ✅ Excelente | ✅ Excelente | ⚠️ Widgets | ❌ | ⚠️ Prompt→UI | ✅ |
| **Action Flows** | ✅ Nativo | ❌ | ✅ | ✅ | ❌ | ❌ |
| **Data Binding** | ✅ Nativo | ❌ | ✅ Excelente | ⚠️ | ❌ | ❌ |
| **Export Multi-Framework** | ✅ HTML+React+Vue+RN | ❌ Propietario | ❌ | ❌ | ⚠️ React | ❌ |
| **Runtime Embeddable** | ✅ 1.7KB | ❌ | ❌ | ❌ | ❌ | ⚠️ Pesado |
| **Self-hosted** | ✅ Docker completo | ❌ | ❌ | ✅ | ❌ | Parcial |
| **Open Source** | ✅ MIT | ❌ | ❌ | ✅ | ❌ | Parcial |
| **MCP Server** | ✅ Nativo | ✅ | ❌ | ✅ | ❌ | ✅ |
| **AI Generator** | ✅ GPT-4o | ✅ | ❌ | ⚠️ | ✅ | ❌ |
| **Offline-first** | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Sin Vendor Lock-in** | ✅ | ❌ | ❌ | ⚠️ | ❌ | ⚠️ |
| **Precio** | **Gratis+$29/mes** | $15-25/mes | $10-50/mes | Gratis+ | $20/mes | Enterprise |

### 🏅 Lo que hace único a knitstudio

> **knitstudio es el ÚNICO builder visual que combina page designer + action flows + data binding + export multi-framework + AI nativa + self-hosted + MCP server — TODO en una plataforma open source, sin vendor lock-in.**

Ninguna otra herramienta en el mercado ofrece esta combinación:
- **Webflow** tiene page builder pero no action flows ni data binding ni export
- **Retool** tiene data binding excelente pero su page builder es limitado
- **n8n** tiene action flows pero no page builder ni diseño visual
- **v0.dev** genera UI por prompt pero no edición visual ni data binding
- **Builder.io** tiene page builder y MCP pero no action flows ni es completamente open source

---

## 🚀 Guía de Inicio Rápido

### Opción 1: Docker (Recomendado)

```bash
# 1. Clona el repositorio
git clone https://github.com/knitstudio/knitstudio.git
cd knitstudio

# 2. Inicia todo con un solo comando
docker compose up

# 3. Abre el builder
open http://localhost:3000
```

En 30 segundos tienes knitstudio corriendo con PostgreSQL, Redis, API y MCP server.

### Opción 2: Desarrollo local

```bash
# Prerrequisitos: Node.js 20+, pnpm 9+
pnpm install
pnpm build
pnpm dev
# Builder: http://localhost:3000
# API: http://localhost:3001
```

### Opción 3: CLI

```bash
# Inicializa un proyecto
npx @knitstudio/cli init mi-proyecto
cd mi-proyecto

# Inicia el servidor de desarrollo
knit dev

# Verifica que todo funciona
knit health
```

---

## 🎓 Tutoriales

### Tutorial 1: Tu primera página en 5 minutos

```
1. Abre knitstudio → Dashboard
2. Click "New Project" → nombre: "Mi App"
3. Click en el proyecto → se abre el builder
4. Click "Components" panel → arrastra "Text" al canvas
5. Click "Button" → arrastra debajo del texto
6. En el toolbar, presiona "Publish"
```

### Tutorial 2: Conectar una API real

```
1. En el builder, click "Data" panel
2. Click "+ Add" → nombre: "Usuarios", URL: "https://api.example.com/users"
3. Click "▶ Execute" → ve los logs de la respuesta
4. Arrastra una "Table" al canvas desde Components
```

### Tutorial 3: Generar con AI

```
1. Click "AI" panel en el toolbar
2. Escribe: "un formulario de login con email y contraseña, tema oscuro"
3. Presiona Enter
4. La IA genera el layout completo en el canvas
```

### Tutorial 4: Exportar a código

```bash
# Exportar a HTML
knit export --project=mi-proyecto --format=html --out=./index.html

# Exportar a React
knit export --project=mi-proyecto --format=react --out=./App.tsx
```

### Tutorial 5: Conectar con Claude/Cursor via MCP

```json
// .vscode/mcp.json o claude_desktop_config.json
{
  "mcpServers": {
    "knitstudio": {
      "command": "node",
      "args": ["packages/mcp-server/dist/index.js"],
      "env": { "API_URL": "http://localhost:3001" }
    }
  }
}
```

---

## 📚 Documentación del Código

### Estructura del Monorepo (17 packages)

| Package | Propósito | Estado |
|---------|-----------|--------|
| `core` | Tipos compartidos, schemas, utilidades (uuid) | ✅ |
| `canvas` | Wrapper GrapesJS + DOMPurify | ✅ |
| `ui` | Componentes UI base (Toolbar, Panel, Button) | ✅ |
| `registry` | 35 componentes registrados con props y estilos | ✅ |
| `builder` | App principal (Dashboard + BuilderView + stores + panels) | ✅ |
| `runtime` | Runtime embeddable 1.7KB para proyectos externos | ✅ |
| `api` | Express + PostgreSQL + JWT + RBAC + rate limiting | ✅ |
| `cli` | CLI con comandos init, dev, build, export, health | ✅ |
| `bridge` | Bridge postMessage con origin validation | ✅ |
| `mcp-server` | MCP Server stdio con tools reales (consume API) | ✅ |
| `export` | Export engine (HTML y React) | ✅ |
| `import` | Import engine (HTML, URL, React JSX) | ✅ |
| `git` | Git nativo: init, commit, diff, layout en .knitstudio/ | ✅ |
| `ai` | AI engine (OpenAI provider) | ✅ |
| `annotations` | Sistema de anotaciones (comment, bug, suggestion) | ✅ |
| `monitoring` | Dashboard de métricas (load time, export, errores) | ✅ |
| `panels` | Entry points para lazy-loading de paneles | ✅ |

### Stores (Estado Global)

| Store | Propósito | Persistencia |
|-------|-----------|-------------|
| `useBuilderStore` | Editor, modo, panel activo, proyecto | ❌ No |
| `useUIStore` | Toasts, search, indicators | ✅ IndexedDB |
| `useUndoStore` | Undo/Redo histórico (200 snapshots) | ✅ IndexedDB |
| `useSaveStore` | Draft/Publish, dirty state | ✅ IndexedDB |
| `useGridStore` | Snap to grid, overlay | ✅ IndexedDB |
| `useDataBindingStore` | Data sources, bindings, ejecución | ✅ IndexedDB |
| `useSafetyNetStore` | Snapshots de seguridad (50) | ✅ IndexedDB |
| `useOnboardingStore` | Onboarding progreso, perfil | ✅ IndexedDB |
| `useStateExplorerStore` | Variables de estado activas | ❌ No |

---

## 📋 Licencia del Output

**El código que generes con knitstudio te pertenece a TI.**

knitstudio (MIT) no reclama ningún derecho de propiedad intelectual sobre el código, diseños o aplicaciones que crees usando la plataforma, incluyendo código generado por IA.

---

## 🌐 Comunidad

- **GitHub**: [github.com/knitstudio/knitstudio](https://github.com/knitstudio/knitstudio)
- **Documentación**: [docs.knitstudio.io](https://docs.knitstudio.io)
- **Discord**: [Próximamente]
- **X/Twitter**: [@knitstudio_dev](https://x.com/knitstudio_dev)

---

<div align="center">
  <p>Hecho con 🧶 y ☕ por la comunidad knitstudio</p>
  <p><strong>MIT — Haz lo que quieras. Úsalo, modifícalo, véndelo, créalo como SaaS.</strong></p>
</div>
