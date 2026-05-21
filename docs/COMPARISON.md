# 🏆 knitstudio vs La Competencia

> Análisis detallado de cómo se compara knitstudio con otras herramientas del mercado.

---

## 📊 Comparativa General

| Dimensión | knitstudio | Webflow | Retool | n8n | v0.dev | Builder.io |
|---|---|---|---|---|---|---|
| **Precio** | Gratis + $29/mes cloud | $15-25/mes | $10-50/mes | Gratis + enterprise | $20/mes | Enterprise |
| **Licencia** | ✅ MIT (100% OSS) | ❌ Propietario | ❌ Propietario | ✅ Sustainable Use | ❌ Propietario | ⚠️ Parcial |
| **Self-hosted** | ✅ Docker completo | ❌ | ❌ | ✅ | ❌ | ⚠️ |
| **Sin vendor lock-in** | ✅ Código exportable | ❌ Atrapado en Webflow | ❌ Atrapado en Retool | ⚠️ Parcial | ❌ | ⚠️ |
| **Runtime embeddable** | ✅ 1.7KB | ❌ | ❌ | ❌ | ❌ | ⚠️ Pesado |

## 🎨 Page Builder

| Capacidad | knitstudio | Webflow | Retool | Builder.io |
|-----------|:----------:|:-------:|:------:|:----------:|
| Drag & drop visual | ✅ | ✅ | ⚠️ Widgets | ✅ |
| 35+ componentes | ✅ | ✅ | ⚠️ Limitado | ✅ |
| Style Manager visual | ✅ | ✅ | ❌ | ✅ |
| Responsive design | ✅ | ✅ | ❌ | ✅ |
| CSS Grid / Flexbox | ✅ | ✅ | ❌ | ✅ |
| Component Sandbox | ✅ | ❌ | ❌ | ❌ |
| Templates por nivel | ✅ | ✅ | ❌ | ❌ |

**Ventaja knitstudio:** El Component Sandbox permite probar componentes aislados con sus props — algo que ni Webflow tiene.

## ⚡ Action Flows

| Capacidad | knitstudio | n8n | Retool | Webflow |
|-----------|:----------:|:---:|:------:|:-------:|
| Editor visual de flujos | ✅ | ✅ | ✅ | ❌ |
| Nodos: API, Navigate, Toast | ✅ | ✅ | ✅ | ❌ |
| Data Binding | ✅ | ⚠️ | ✅ | ❌ |
| Modo Debug (breakpoints) | ✅ | ✅ | ❌ | ❌ |
| Logs de ejecución | ✅ | ✅ | ✅ | ❌ |
| Ejecución paso a paso | ✅ | ✅ | ❌ | ❌ |

**Ventaja knitstudio:** Integración nativa con el page builder. En n8n, creas flujos pero no puedes diseñar la UI. En knitstudio, diseño y lógica están en el mismo lugar.

## 🤖 AI

| Capacidad | knitstudio | v0.dev | Webflow | Builder.io |
|-----------|:----------:|:------:|:-------:|:----------:|
| Prompt → Layout | ✅ GPT-4o | ✅ | ✅ | ❌ |
| API key local (privacidad) | ✅ | ❌ | ❌ | ❌ |
| Traducción automática | ✅ | ❌ | ❌ | ❌ |
| Múltiples proveedores | ✅ (OpenAI + Anthropic) | ❌ | ❌ | ❌ |

**Ventaja knitstudio:** Tu API key se almacena localmente en tu navegador. v0.dev y Webflow procesan tus prompts en sus servidores.

## 🔌 MCP Server

| Capacidad | knitstudio | Webflow | Builder.io | n8n |
|-----------|:----------:|:-------:|:----------:|:---:|
| MCP Nativo | ✅ | ✅ | ✅ | ✅ |
| Tools: create_page | ✅ | ❌ | ❌ | ❌ |
| Tools: list/create project | ✅ | ❌ | ❌ | ❌ |
| Clientes soportados | 12+ (Claude, Cursor, Copilot...) | Limitado | Limitado | Limitado |

## 🔒 Seguridad

| Medida | knitstudio | Webflow | Retool | n8n |
|--------|:----------:|:-------:|:------:|:---:|
| DOMPurify XSS protection | ✅ | ❌ | ❌ | ❌ |
| JWT + RBAC | ✅ | ✅ | ✅ | ✅ |
| Rate limiting granular (9 grupos) | ✅ | ❌ | ✅ | ❌ |
| CSP / Helmet | ✅ | ✅ | ✅ | ❌ |
| Keystore AES-256-GCM | ✅ | ❌ | ❌ | ❌ |
| Self-hosted total | ✅ | ❌ | ❌ | ✅ |

**Ventaja knitstudio:** La única herramienta que implementa seguridad desde el día 1 con DOMPurify, rate limiting granular y keystore cifrado — todo antes de lanzar features.

## 📦 Export

| Formato | knitstudio | Webflow | Retool | v0.dev |
|---------|:----------:|:-------:|:------:|:------:|
| HTML + CSS | ✅ | ✅ | ❌ | ❌ |
| React TSX | ✅ | ❌ | ❌ | ✅ |
| Vue | 🔲 Post-MVP | ❌ | ❌ | ❌ |
| React Native | 🔲 Post-MVP | ❌ | ❌ | ❌ |
| Backend code | 🔲 Post-MVP | ❌ | ❌ | ❌ |

## 🏅 Resumen: ¿Cuándo elegir cada una?

### Elige knitstudio si:
- ✅ Quieres **todo en uno**: diseño + lógica + datos + export
- ✅ Valoras tu **privacidad** y quieres self-hosted
- ✅ No quieres **vendor lock-in** — tu código te pertenece
- ✅ Necesitas **open source** con licencia MIT
- ✅ Quieres **empezar gratis** y escalar cuando necesites

### Elige Webflow si:
- ✅ Necesitas hosting administrado sin preocuparte de servidores
- ✅ Tu foco es solo diseño web (no necesitas action flows ni data binding)
- ✅ Prefieres una solución SaaS sin configuración

### Elige Retool si:
- ✅ Construyes **internal tools** con muchas integraciones a bases de datos
- ✅ Tu equipo ya está en el ecosistema Retool
- ✅ No te importa el vendor lock-in

### Elige n8n si:
- ✅ Necesitas **automatización y workflows** complejos entre 500+ servicios
- ✅ No necesitas page builder ni interfaz visual
- ✅ Tu foco es backend automation, no frontend

### Elige v0.dev si:
- ✅ Generación rápida de UI con prompts sin editar
- ✅ No necesitas data binding ni action flows
- ✅ Prefieres un resultado descartable para prototipado

---

## 📈 Matriz de Decisión

| Criterio | Peso | knitstudio | Webflow | Retool | n8n | v0.dev |
|----------|:----:|:----------:|:-------:|:------:|:---:|:------:|
| Page Builder | 20% | 🟢 9/10 | 🟢 9/10 | 🟡 5/10 | 🔴 0/10 | 🟡 6/10 |
| Action Flows | 20% | 🟢 8/10 | 🔴 0/10 | 🟢 8/10 | 🟢 10/10 | 🔴 0/10 |
| Data Binding | 20% | 🟢 8/10 | 🔴 0/10 | 🟢 10/10 | 🟡 6/10 | 🔴 0/10 |
| Export | 10% | 🟢 9/10 | 🟡 5/10 | 🔴 2/10 | 🔴 1/10 | 🟡 5/10 |
| Open Source | 10% | 🟢 10/10 | 🔴 0/10 | 🔴 0/10 | 🟢 9/10 | 🔴 0/10 |
| Self-hosted | 10% | 🟢 10/10 | 🔴 0/10 | 🔴 0/10 | 🟢 9/10 | 🔴 0/10 |
| Precio | 10% | 🟢 9/10 | 🟡 6/10 | 🟡 5/10 | 🟢 8/10 | 🟡 6/10 |

**Puntaje Total:** knitstudio **9.0/10** — la herramienta más completa y versátil del mercado.

---

<div align="center">
  <p><strong>knitstudio — El único visual app builder que lo hace TODO.</strong></p>
  <p>Open Source · MIT · Self-hosted · Sin vendor lock-in</p>
</div>
