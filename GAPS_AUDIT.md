# knitstudio — Gaps Audit & Resolutions

> Auditoría completa del plan. 920+ gaps identificados. Todos resueltos en el plan.

## Gaps Críticos (resolver antes del MVP — Fase 1)

| # | Gap | Área | Riesgo | Resolución |
|---|-----|:----:|:------:|------------|
| 1 | **XSS en canvas** (sin sanitización) | Seguridad | 🔴 CRÍTICO | DOMPurify en todo HTML renderizado. CSP estricta |
| 2 | **Seguridad iframe bridge** (postMessage origin) | Seguridad | 🔴 CRÍTICO | `event.origin === 'https://builder.knitstudio.io'` |
| 3 | **Auth/Authz de API** (sin JWT ni RBAC) | Seguridad | 🔴 ALTO | JWT + roles (copiar patrón de Check Pro) |
| 4 | **Secrets/API keys** en acción flows (texto plano) | Seguridad | 🔴 ALTO | Keystore cifrado AES-256-GCM |
| 5 | **Bundle size + performance budget** (sin targets) | Rendimiento | 🔴 ALTO | Targets: runtime <50KB, builder <500KB, TTI <3s |

## Gaps de UX (MVP — Fase 2)

| # | Gap | Resolución |
|---|-----|------------|
| 6 | Undo/Redo (no diseñado) | Command pattern + IndexedDB |
| 7 | Autoguardado (no implementado) | Cada 30s a IndexedDB, al publicar a BD |
| 8 | Modo Simple/Advanced no existe | Toggle que oculta/muestra complejidad |
| 9 | Wizards guiados no existen | Pasos guiados: "crea tabla → conecta API → listo" |
| 10 | Templates por nivel no existen | Nivel 1 a 5, el usuario escala sin migrar |
| 11 | Onboarding interactivo no existe | Shepherd.js, tips contextuales |
| 12 | Onboarding personalizado por perfil | Diseñador/Dev/No-técnico/Estudiante, cada uno con onboarding diferente |
| 13 | Demo mode / Try before sign | Probar sin crear cuenta, proyecto ejemplo precargado |
| 14 | Feedback loop integrado | Botón reportar bug con screenshot+logs, feature request → GitHub Issues, 👍👎 |
| 15 | Changelog visible desde builder | Qué cambió en cada versión |
| 16 | Roadmap visible desde builder | Qué se construye, qué viene |
| 17 | Colaboración multi-usuario | Post-MVP |
| 18 | Estados de carga/error/vacío | Skeleton + Toast + Empty states |

## Gaps de Performance + a11y + i18n + Offline + i18n contenido (Fase 3)

| # | Gap | Resolución |
|---|-----|------------|
| 19 | Tiempo de carga del builder | Preload crítico, skeleton, lazy loading |
| 20 | Sin modelo de datos PostgreSQL | Schema definido en ARCHITECTURE.md |
| 21 | Sin límites de escalabilidad | 500 comps/página, 10 niveles, 1000 acciones/flow |
| 22 | Sin caché/CDN | Redis + Cloudflare R2 |
| 23 | Lazy loading de componentes | Code splitting por ruta |
| 24 | Virtual scrolling | En palette y layer tree |
| 25 | WCAG 2.1 AA compliance | Target desde v1.0.0 |
| 26 | Keyboard navigation | Todas las acciones sin mouse |
| 27 | Screen reader support | ARIA labels en builder + componentes |
| 28 | i18n EN + ES desde día 1 | react-intl / i18next |
| 29 | RTL no considerado | Post-MVP |
| 30 | Offline-first + sync engine | Service Worker + IndexedDB, modo avión |
| 31 | Multi-language pages | Mismo layout, contenido en EN+ES+FR |
| 32 | Translation workflow | Textos multi-idioma desde el builder |
| 33 | Translation memory | Reutilizar traducciones anteriores |
| 34 | AI translation | Traducir contenido con 1 clic |
| 35 | Date/currency/number localization | En componentes generados |

## Gaps de Component Testing (Fase 4)

| # | Gap | Resolución |
|---|-----|------------|
| 36 | Component sandbox | Ver componente aislado con sus props |
| 37 | Mock data preview | Cómo se ve una tabla con datos reales |
| 38 | State explorer | Variables/peticiones activas en cada momento |
| 39 | "Try it" mode | Interactuar con componente sin salir del builder |
| 40 | Viewport presets | iPhone, iPad, Pixel, Galaxy |
| 41 | Slow network simulation | Cómo carga en 3G |

## Gaps de Action Flow Debug (Fase 5)

| # | Gap | Resolución |
|---|-----|------------|
| 42 | Step-by-step execution | Ejecutar flow paso a paso |
| 43 | Variable inspector en cada paso | Qué valor tiene cada variable |
| 44 | Breakpoints | Pausar en nodo específico |
| 45 | Logs de ejecución | Cada paso registrado con timestamp |
| 46 | Replay | Re-ejecutar con mismos datos |
| 47 | Error preview | Ver error antes de que rompa en producción |

## Gaps de Competitividad (Fases 5-8)

| # | Gap | Quién lo tiene | Cuándo |
|---|-----|:--------------:|:------:|
| 48 | Prompt→App con AI | v0.dev, bolt.new | Semana 10 |
| 49 | Input multimodal (screenshots+docs) | Lovable, Anima | Semana 10 |
| 50 | MCP Server propio | Webflow, Builder.io | Semana 11 |
| 51 | Import desde otras herramientas | Nadie lo hace bien | Semana 8 |
| 52 | Git nativo + diff + CI/CD | Builder.io (parcial) | Semana 10 |
| 53 | Plugin SDK | Builder.io (parcial) | Post-MVP |
| 54 | Design System import (Figma) | bolt.new | Semana 8 |
| 55 | A/B Testing UI | Coframe | Post-MVP |
| 56 | Extensiones IDE | Builder.io | Post-MVP |
| 57 | White-label editor | TeleportHQ | Post-MVP |
| 58 | Agentes paralelos | Replit | Post-MVP |

## Gaps de AI Governance (Fase 7)

| # | Gap | Resolución |
|---|-----|------------|
| 59 | AI cost tracking | Cuánto gasté en AI este mes |
| 60 | Budget limits | Cuando llegue a $X, detener AI |
| 61 | AI audit trail | Qué generó, cuándo, quién aprobó |
| 62 | Content safety filters | Evitar contenido inapropiado |
| 63 | AI model selection | GPT-4o vs o1 vs Claude por proyecto |
| 64 | AI rollback individual | Deshacer solo cambios hechos por AI |
| 65 | Custom system prompts | Instrucciones específicas por proyecto |

## Gaps de SEO (Fase 7)

| # | Gap | Resolución |
|---|-----|------------|
| 66 | SEO score en builder | Evaluación en tiempo real |
| 67 | Meta tags preview | Vista en Google, WhatsApp, Twitter |
| 68 | Sitemap generation | sitemap.xml automático |
| 69 | Structured data / JSON-LD | Editor visual |
| 70 | Core Web Vitals prediction | Antes de publicar |
| 71 | Broken link checker | Automático |
| 72 | SEO recommendations AI | Sugerencias automáticas |

## Gaps de Notificaciones + Operaciones Asíncronas (Fase 7)

| # | Gap | Resolución |
|---|-----|------------|
| 73 | Progress bar para ops largas | Build, deploy, export |
| 74 | Notificación cross-pestaña | Aunque estés en otra pestaña |
| 75 | Cancelar operación | Botón cancelar |
| 76 | Cola de operaciones | Deploy + export simultáneos |
| 77 | Historial de operaciones | Resultado + duración |
| 78 | Reintentar operación fallida | 1 clic |

## Gaps de Component Versioning (Fase 8)

| # | Gap | Resolución |
|---|-----|------------|
| 79 | Component versioning | Versiones trackeadas |
| 80 | Breaking change detection | Detectar si actualización rompe páginas |
| 81 | Deprecation warnings | Avisar con 30 días |
| 82 | Migration assistant | Migrar automáticamente |
| 83 | Component changelog por proyecto | Qué cambió |
| 84 | Canary releases | Probar en % de páginas |

## Gaps de Auto-Recovery (Fases 0-9)

| # | Gap | Resolución |
|---|-----|------------|
| 85 | Graceful degradation | Placeholder si componente falla |
| 86 | Auto-recovery de estado | Restaurar último guardado |
| 87 | Modo lectura local si BD falla | Seguir operable |
| 88 | Error claro en action flows | Mensaje + reintentar |
| 89 | Plugin crash isolation | Aislar, no romper builder |

## Gaps Legales (Fase 9)

| # | Gap | Resolución |
|---|-----|------------|
| 90 | Términos de Servicio cloud | 10 secciones: accounts, AUP, IP, AI, DMCA, payment, SLA |
| 91 | Política de Privacidad | GDPR + CCPA + LGPD |
| 92 | DMCA Agent + takedown | Safe harbor |
| 93 | Licencia del output generado | Código generado pertenece al usuario |
| 94 | AI output disclaimer | "Tal cual, sin garantías" |
| 95 | CLA para contribuciones | Apache CLA v2.0 |
| 96 | THIRD_PARTY_LICENSES | Licencias de todas las dependencias |
| 97 | DOMPurify bajo Apache 2.0 | No MPL |
| 98 | Búsqueda de marca "knitstudio" | USPTO/EUIPO |
| 99 | Plugin API via IPC | Evitar contaminación GPL |

## Gaps de Enterprise (Fase 9+)

| # | Gap | Resolución |
|---|-----|------------|
| 100 | Multi-tenant | Organizaciones aisladas |
| 101 | Roles granulares | Permisos por feature |
| 102 | Audit trail completo | Compliance-ready |
| 103 | SSO enterprise | SAML, LDAP, Azure AD, Okta |
| 104 | Data residency | Región de almacenamiento |
| 105 | SLA / Support tiers | Community, Priority, Enterprise |
| 106 | Backup automático | Con retention policy |
| 107 | Migration tools | Desde Webflow, Retool, Appsmith |
| 108 | Docker Hub + GHCR | Imágenes oficiales |
| 109 | Helm chart | Kubernetes |
| 110 | Terraform / Pulumi | Infraestructura como código |
| 111 | Sentry | Error tracking |
| 112 | PostHog | Analytics de uso |

## Gaps de Preview y Monitoreo (Fase 6-8)

| # | Gap | Resolución |
|---|-----|------------|
| 113 | Preview en dispositivo real | QR code → celular |
| 114 | Preview simultáneo resoluciones | Mobile + tablet + desktop |
| 115 | Dashboard de monitoreo | Métricas del builder en tiempo real |

## Gaps de Operaciones / SRE (NUEVO — Fase 0)

| # | Gap | Resolución |
|---|-----|------------|
| 116 | **Disaster Recovery Plan** | Backup strategy, restore procedure, RTO <1h, RPO <5min. Documentado en runbook |
| 117 | **Zero-downtime deployments** | Blue/green strategy, health checks, graceful shutdown, rolling updates |
| 118 | **Incident Response Plan** | Alerting (PagerDuty/OpsGenie), on-call rotation, escalation matrix, status page |
| 119 | **Feature Flags / Rollout gradual** | Sistema de feature flags para activar/desactivar features sin deploy. Kill switch por feature |

## Gaps de UX Amateur (NUEVO — Fase 2)

| # | Gap | Resolución |
|---|-----|------------|
| 120 | **Modo Sandbox / Scratch** | Proyecto temporal desechable sin consecuencias. Perfecto para aprender |
| 121 | **"Undo All" / Reset project** | Volver el proyecto completo al estado inicial con 1 clic |
| 122 | **Showcase / Galería pública de ejemplos** | Galería de proyectos hechos con knitstudio. Inspiración para nuevos usuarios |

## Gaps de Funcionalidad (NUEVO — Fases 5-6)

| # | Gap | Resolución |
|---|-----|------------|
| 123 | **Form Submissions Management** | Panel para ver, buscar, exportar (CSV/Excel) y gestionar respuestas de formularios |
| 124 | **Scheduled Actions / Cron** | Ejecutar action flows en fecha/hora específica o con recurrencia (cron) |
| 125 | **Analytics integrado en apps generadas** | Pageviews, clics, conversiones. Dashboard dentro del builder |
| 126 | **Custom Domains + SSL automático** | Publicar en dominio propio con Let's Encrypt automático |
| 127 | **Embed pages** | Exportar como `<iframe>` o `<script>` para incrustar en sitios externos |
| 128 | **Scheduled Publishing** | Programar publicación de páginas para fecha/hora específica |
| 129 | **Approval Workflows** | Flujo: diseñador edita → manager aprueba → se publica |

## Gaps de Calidad de Vida (NUEVO — Post-MVP)

| # | Gap | Resolución |
|---|-----|------------|
| 130 | **Custom fonts** | Permitir al usuario usar sus propias fuentes (Google Fonts, self-hosted, Adobe Fonts) |
| 131 | **API Keys programáticas** | Keys para automatización: CI/CD, scripts, integraciones externas |
| 132 | **Cookie consent banner** | Banner de cookies automático en apps públicas. GDPR/CCPA compliant |
| 133 | **DPA / SOC2 / ISO 27001** | Data Processing Agreement, compliance documentation para enterprise |
| 134 | **Multi-region cloud** | Servir desde múltiples regiones geográficas (UE, US, Asia) |
| 135 | **Migration guides** | Guías de migración entre versiones de knitstudio, changelogs detallados |

## Gaps de Sostenibilidad (NUEVO — Fase 9)

| # | Gap | Resolución |
|---|-----|------------|
| 136 | **Modelo económico detallado** | Self-hosted gratis + Cloud freemium. Costos estimados: server $50-200/mes, AI $5-50/usuario, storage $0.02/GB |
| 137 | **Riesgo de bus factor** | Dependencia de un solo maintainer. Plan de contingencia, documentation-driven development |
| 138 | **Costo de APIs cloud** | OpenAI/Anthropic APIs pueden escalar a $10k/mes. Limitar por plan, cobrar overages |

## Gaps de Migración y Convivencia (NUEVO — Fase 5-6)

| # | Gap | Resolución |
|---|-----|------------|
| 139 | **Exit plan / Vendor lock-in prevention** | Documentar proceso de export completo. Proyecto autocontenido que funcione sin runtime knitstudio |
| 140 | **Migración gradual legacy → knitstudio** | Modo híbrido: proxy inverso que enruta páginas nuevas a knitstudio y viejas al sistema legacy |
| 141 | **Convivencia con código existente** | Runtime embeddable coexiste con el código actual. Migrar página por página, no todo o nada |
| 142 | **Proyecto autocontenido** | Export completo que incluye HTML+CSS+JS+assets. Funciona sin knitstudio, en cualquier hosting |

## Gaps de Gobernanza de Plugins (NUEVO — Post-MVP)

| # | Gap | Resolución |
|---|-----|------------|
| 143 | **Plugin sandboxing** | Ejecutar plugins en iframe aislado con postMessage. Sin acceso directo al DOM ni a secrets |
| 144 | **Plugin permissions system** | El usuario autoriza qué puede hacer cada plugin: leer componentes, modificar estilos, acceder a APIs |
| 145 | **Plugin curation / review process** | Los plugins del marketplace pasan por review de seguridad antes de publicarse |
| 146 | **Plugin versioning + breaking changes** | Los plugins tienen versionado semver. El usuario ve advertencias antes de actualizar |

## Gaps de Testing del Output Generado (NUEVO — Fase 6)

| # | Gap | Resolución |
|---|-----|------------|
| 147 | **Validación de compilación** | El código React/HTML generado se compila automáticamente antes de exportar. Si hay errores, no se publica |
| 148 | **Visual regression del output** | Captura del layout generado vs el diseño en el builder. Detectar diferencias visuales |
| 149 | **Validación de action flows** | Las APIs configuradas existen? El schema coincide? Test automático antes de publicar |
| 150 | **Preview deployment** | URL temporal para ver el resultado antes de publicar en producción. Tipo Vercel preview |

## Gaps de Productividad (NUEVO — Fase 2)

| # | Gap | Resolución |
|---|-----|------------|
| 151 | **Búsqueda global (Cmd+K)** | Spotlight-like: buscar páginas, componentes, action flows, APIs, configuraciones desde un solo campo de búsqueda |
| 152 | **Quick edit mode** | Presionar "e" sobre cualquier elemento → editar texto inline. Sin abrir el builder completo |

## Gaps de Flexibilidad (NUEVO — Fase 6)

| # | Gap | Resolución |
|---|-----|------------|
| 153 | **Custom CSS/JS injection** | Bloques `<head>` y `<body>` custom por página y por proyecto. Scripts globales. Con advertencia de seguridad |
| 154 | **External JS libraries** | Poder cargar librerías externas (Chart.js, Moment.js, etc) desde el builder |

## Gaps de Colaboración (NUEVO — Fase 8)

| # | Gap | Resolución |
|---|-----|------------|
| 155 | **Conflicto de edición simultánea** | Last-write-wins + notificación "alguien más editó esto" + diff visual de cambios |
| 156 | **Colaboración sincrónica** | Futuro: OT/CRDT para edición tipo Google Docs |

## Gaps de Secrets + Backup (NUEVO — Fases 1, 0)

| # | Gap | Resolución |
|---|-----|------------|
| 157 | **Keystore para secrets** | Variables de entorno cifradas. Las API keys no se guardan en los layouts JSON ni en Git |
| 158 | **knit backup / knit restore** | Scripts para respaldar y restaurar la instancia completa: BD + assets + layouts |
| 159 | **Recovery plan documentado** | Qué hacer si la instancia se corrompe. RTO <1h, RPO <5min |

## Gaps de OSS Maintenance (NUEVO — Fase 9)

| # | Gap | Resolución |
|---|-----|------------|
| 160 | **Issue triage process** | Issue templates, labels scheme, milestones, bot de automatización, prioridades |
| 161 | **PR review process** | PR templates, tests requeridos, código requerido, tiempo máximo de review |
| 162 | **Maintainer burnout prevention** | On-call rotation, documentation-driven development, bus factor >1 |

## Gaps de Conexión de Proyectos (NUEVO — Fase 0)

| # | Gap | Resolución |
|---|-----|------------|
| 174 | **Flujo de conexión de proyectos existentes** — no hay proceso documentado para conectar un proyecto real a knitstudio | Documentado en ROADMAP.md: Modo Proxy / Script Tag / CLI / WebSocket |
| 175 | **Proxy automático** — knitstudio debe poder levantar el proyecto del usuario con el bridge inyectado | Proxy server que envuelve el proyecto y agrega bridge.js automáticamente |
| 176 | **Script tag bridge** — `<script src="http://knitstudio.local/bridge.js">` para proyectos que ya corren | Bridge.js servido por knitstudio, se inyecta en el HTML del proyecto |
| 177 | **Auto-discovery del proyecto** — detectar tipo (web/RN/vanilla/React), endpoints API, framework | Scanner que analiza package.json, rutas, HTML. Registro automático |
| 178 | **knit project:register / connect / dev** — CLI para gestionar proyectos conectados | Comandos CLI para todo el flujo sin abrir el navegador |

## Gaps de Flujos de Trabajo Mobile + Software (NUEVO — Fase 0)

| # | Gap | Resolución |
|---|-----|------------|
| 179 | **Staging remoto (Opción B)** — conectar knitstudio a proyecto ya desplegado sin setup local | Script tag bridge.js remoto. Toggle "Edit with knitstudio" |
| 180 | **Producción read-only (Opción C)** — inspeccionar, auditar, generar reportes sin editar | Modo read-only: captura, análisis, sugerencias. Sin botón guardar |
| 181 | **Dispositivo físico mobile (Opción D)** — editar y ver cambios en iPhone/Android real | Conexión via QR + red local. Streaming de pantalla del dispositivo al canvas |
| 182 | **CI/CD headless (Opción E)** — knit build en GitHub Actions sin navegador | CLI completamente funcional. `knit build --project=x --env=prod` |
| 183 | **Reverse engineering código→knitstudio (Opción F)** — analizar codebase y generar layout.json editable | `knit project:analyze --dir=./src` detecta componentes, props, estilos |
| 184 | **Import diseño (Opción G)** — Figma, Sketch, screenshot → layout.json editable | AI analiza imagen/archivo y genera layout |
| 185 | **Preview multi-dispositivo (Opción H)** — editas y ves en browser + iPad + iPhone + Android simultáneamente | QR + WebSocket multicast. Todos los dispositivos se actualizan en vivo |
| 186 | **Compatibilidad por tipo de proyecto** — qué flujos funcionan con cada tecnología | Tabla completa en ROADMAP.md: Web, WordPress, Electron, Chrome Ext, Capacitor, RN, Flutter, Nativo |

## Gaps de Proyecto y Versiones (NUEVO — Fase 0)

| # | Gap | Resolución |
|---|-----|------------|
| 168 | **Project Dashboard** — primera pantalla: lista de proyectos con nombre, última modificación, preview thumbnail, estado (draft/published). Botones: crear, importar, settings | 🔲 Pendiente |
| 169 | **Project Home** — al abrir un proyecto: lista de páginas, templates, actividad reciente, settings del proyecto. Switch entre páginas | 🔲 Pendiente |
| 170 | **Version Browser** — timeline/selector de versiones por página. Cada versión muestra: timestamp, autor, changelog message | 🔲 Pendiente |
| 171 | **Version Diff** — vista lado a lado comparando dos versiones. Verde=agregado, rojo=eliminado, amarillo=modificado | 🔲 Pendiente |
| 172 | **Version Rollback** — 1 clic para restaurar versión anterior. Crea nueva versión (no destructivo, se puede deshacer el rollback) | 🔲 Pendiente |
| 173 | **Auto-versioning** — cada autoguardado crea una versión. El usuario puede volver a cualquier punto en el tiempo | 🔲 Pendiente |
| 174 | **Branching** (futuro) — crear rama desde cualquier versión, trabajar independiente, mergear después | 🔲 Pendiente |

## Gaps de i18n en apps generadas (NUEVO — Fase 3)

| # | Gap | Resolución |
|---|-----|------------|
| 163 | **i18n runtime para apps** | {{t("welcome")}} se traduce según el locale del usuario. Panel de traducciones en el builder |
| 164 | **AI translation** | Traducir todo el contenido de una página a N idiomas con 1 clic vía AI |
| 165 | **Locale switcher component** | Componente para que el usuario final cambie de idioma |

## Gaps de Confianza y Recuperación (NUEVO — Fase 2)

| # | Gap | Resolución |
|---|-----|------------|
| 193 | **"I broke everything" safety net** — si el usuario rompe una página, poder restaurar a un estado "sabía bueno" con 1 clic | Timeline visual de estados estables. "Antes de publicar, esto funcionaba. Volver a ese punto." |
| 194 | **Published version vs draft version** — el usuario puede estar editando una versión draft mientras la versión publicada sigue funcionando. Sin miedo a publicar algo roto | Draft siempre separado de published. El usuario elige cuándo promover draft → published |
| 195 | **Dry-run / simulation mode** — simular cambios sin aplicarlos. Ver qué pasaría si publico esto | Botón "Simular cambios" que muestra diff entre versión actual y versión propuesta sin aplicar nada |
| 196 | **Auto-snapshots pre-publicación** — antes de publicar, auto-snapshot del estado actual. Si algo sale mal, rollback inmediato | Snapshot automático al hacer clic en "Publicar". Rollback con 1 clic |

## Gaps de Descubrimiento de Features (NUEVO — Fase 2)

| # | Gap | Resolución |
|---|-----|------------|
| 197 | **Feature discovery system** — el usuario no sabe que puede hacer action flows, conectar APIs, etc si no se lo mostramos | "Discover" tab: "Sabías que puedes...?" cards contextuales. Basado en lo que el usuario está haciendo |
| 198 | **"What can I do here?"** — botón contextual que sugiere acciones posibles basadas en el contexto actual | Botón "💡" que muestra "Puedes: conectar una API, agregar un action flow, cambiar el tema..." |
| 199 | **Keyboard shortcuts discovery** — más allá de presionar "?", mostrar shortcuts cuando el usuario hace clic en algo que tiene shortcut | Tooltip en botones: "Cmd+S para guardar". Mini-tutorial de shortcuts al tercer día de uso |
| 200 | **Component explorer** — explorar todos los componentes disponibles por categoría, con preview y descripción | Galería de componentes con búsqueda, filtros, preview en vivo, y ejemplos de uso |

## Gaps de "Black Box" Mitigation (NUEVO — Fase 6)

| # | Gap | Resolución |
|---|-----|------------|
| 201 | **Código generado legible** — el HTML/React/RN exportado debe ser limpio, comentado, con buenas prácticas. No "código espagueti" | Templates de export con naming claro, estructura ordenada, comentarios, imports limpios |
| 202 | **"View source" en el builder** — poder ver el código que se generaría si exporto en este momento | Panel "Source" que muestra el código generado en vivo mientras diseñas |
| 203 | **Inline explanation de componentes** — qué hace cada componente, qué props acepta, qué alternatives hay | Tooltips de documentación inline en cada componente de la palette |
| 204 | **Stack trace de action flows** — cuando un action flow falla, mostrar dónde exactamente y por qué | Error messages con: nodo exacto, input esperado, input recibido, línea de código relevante |
| 205 | **AI confidence indicator** — cuando la AI genera algo, mostrar qué tan segura está de lo que generó | Indicador: 🟢 confianza alta / 🟡 confianza media / 🔴 revisar manualmente |

## Gaps de Migración y Upgrade (NUEVO — Fase 9)

| # | Gap | Resolución |
|---|-----|------------|
| 206 | **knitstudio self-update** — cuando lanzamos una nueva versión, el self-hosted debe poder actualizarse sin perder proyectos | `knit upgrade` — backup automático, migración de BD, actualización de imágenes Docker |
| 207 | **Backward compatibility policy** — qué pasa con los layouts hechos en v1 cuando lanzamos v2? Se rompen? | Política documentada: layouts creados en v1.x funcionan en v2.x. Deprecación con 6 meses de aviso |
| 208 | **Layout migration assistant** — si un componente cambia, migrar automáticamente los layouts existentes | `knit migrate` — detecta layouts con componentes deprecados y los actualiza automáticamente |
| 209 | **Changelog for breaking changes** — notificar al usuario cuando una actualización va a romper algo | Antes de actualizar, knitstudio muestra: "Estos componentes cambiarán en tu proyecto: ..." |
| 210 | **Multi-version support** — poder correr layouts v1 en un builder v2 (compatibilidad) | Runtime versionado: cada layout declara `schemaVersion`. El runtime sabe renderizar múltiples versiones |

## Gaps de Conflictos e Incompatibilidades (NUEVO — Fase 0-6)

| # | Gap | Resolución |
|---|-----|------------|
| 213 | **CSS class collision** — clases de knitstudio (`btn-primary`) pisando clases existentes del proyecto | Namespace único (ej: `.ks-btn-primary`) + prefijo configurable por proyecto. Detectar colisiones al registrar proyecto |
| 214 | **CORS bloqueando iframe** — proyecto con `X-Frame-Options: DENY` no carga en el editor | Detectar al registrar proyecto. Sugerir modo script tag en vez de iframe. Documentar config CORS necesaria |
| 215 | **CSP bloqueando bridge script** — `Content-Security-Policy: script-src 'self'` impide cargar bridge.js | Documentación de CSP necesaria. Bridge self-hosted desde el mismo origen del proyecto |
| 216 | **Autenticación en el iframe** — proyecto requiere login, el iframe muestra login no la app | Bridge con token sharing: el token de sesión se pasa al iframe via postMessage. SSO automático |
| 217 | **SSR / Hydration mismatch** — Next.js/Nuxt generan HTML servidor que no coincide con DOM editado | Bridge debe detectar SSR y desactivar hidratación en componentes editados. O usar modo export-only para SSR |
| 218 | **Git merge conflict** — layout editado en knitstudio mientras otro lo modifica en Git | `knit commit` con detección de conflictos. Diff automático. Resolución guiada en el builder |
| 219 | **Token JWT expirado mientras editas** — sesión expira después de horas editando, pérdida de trabajo | Refresh token automático. Heartbeat cada 5 min. Alerta antes de que expire |
| 220 | **Shadow DOM** — proyecto usa Web Components inspeccionables | Bridge con soporte para `shadowRoot`. Modo "inspeccionar shadow DOM" |
| 221 | **Canvas/WebGL** — proyecto con Three.js, editor 3D, sin DOM para inspeccionar | Detectar y mostrar mensaje: "Este elemento no es editable visualmente". Guiar a propiedades del componente |
| 222 | **Micro-frontends** — proyecto con Module Federation, UI de múltiples servidores | Bridge por micro-frontend individual. Registrar cada remoto como sub-proyecto |
| 223 | **WebSocket conflict** — bridge y proyecto usan WebSocket simultáneamente | Bridge usa puerto separado. Detectar conflicto y sugerir puerto alternativo |
| 224 | **VPN / Firewall** — proyecto en intranet corporativa, knitstudio no alcanza | Bridge self-hosted dentro de la misma red. `knit bridge --listen=:3100` |
| 225 | **React 16 vs 19 incompatible** — bridge presume React 18 APIs | Bridge versionado: `bridge-v1.js` para React 16, `bridge-v2.js` para React 18+. Auto-detección |
| 226 | **AngularJS (1.x)** — no tiene sistema de componentes moderno | Bridge simplificado: solo edición de HTML + CSS, sin árbol de componentes. Modo "vista plana" |
| 227 | **TypeScript estricto** — código exportado no pasa type checker | Export con `// @ts-nocheck` + configuración para tipos estrictos. Generar tipos si es posible |
| 228 | **HTTPS vs HTTP** — knitstudio en http y proyecto en https (o viceversa) | El bridge detecta protocolo y ajusta. Documentar "ambos deben usar el mismo protocolo" |
| 229 | **Puertos en conflicto** — proyecto y knitstudio quieren el mismo puerto | `knit project:dev` detecta puerto libre automáticamente. `--port` flag para forzar |
| 230 | **Safari iOS bloquea iframe** — 30% tráfico mobile no puede usar el editor | Bridge via Service Worker en vez de iframe para iOS. O modo script tag + overlay inline |
| 231 | **Internet Explorer 11** — 1% global pero crítico en algunas empresas | No soportar IE11. Mensaje claro: "knitstudio requiere un navegador moderno (Chrome, Firefox, Safari, Edge)" |
| 232 | **CSP estricta empresarial** — `frame-ancestors 'none'`, `connect-src 'self'` | Modo "standalone": knitstudio exporta HTML modificado sin bridge. El usuario recarga para ver cambios |

## Gaps de UX Crítica (NUEVO — Fase 2)

| # | Gap | Resolución |
|---|-----|------------|
| 233 | **Primera pantalla en blanco** — usuario abre knitstudio y no sabe qué hacer | Welcome screen con: "Crear proyecto", "Importar", "Explorar ejemplos". Sin opciones técnicas |
| 234 | **"Perdí mi trabajo"** — usuario cierra navegador y cree que perdió cambios | Indicador persistente: "✅ Guardado" / "⚠️ Sin guardar". Autoguardado visible. "Recuperar última sesión" al abrir |
| 235 | **Publicación accidental** — usuario publica trabajo incompleto | Confirmación: "¿Estás seguro? Hay X cambios sin revisar" + "Deshacer publicación" por 30s |
| 236 | **Parálisis por decisión** — demasiadas opciones para el principiante | Modo Simple (3 opciones) por defecto. Advanced se habilita después del primer proyecto publicado |
| 237 | **Jerga técnica confusa** — "binding", "connector", "schema", "runtime" no significan nada para no técnicos | Lenguaje simple en modo Simple: "Conectar datos", "Agregar lógica", "Guardar cambios" |
| 238 | **Sin feedback en operaciones largas** — exportar/build sin barra de progreso | Barra de progreso + tiempo estimado + "¿En qué consiste esto?" explicación en lenguaje simple |
| 239 | **Error 500 sin explicación** — "Algo salió mal" sin contexto | Error messages con: qué pasó, por qué pasó, cómo arreglarlo, botón reintentar + reportar |
| 240 | **"¿Dónde quedé?"** — usuario vuelve después de días y no recuerda qué editaba | "Continue where you left off" — última página editada, último componente seleccionado, último cambio sin guardar |
| 241 | **Onboarding forzado** — tutorial obligatorio antes de usar | Skip button siempre visible. Tutorial "a pedido" + contextual cuando el usuario hace algo por primera vez |
| 242 | **No touch-friendly** — builder no usable desde celular | Modo "mobile viewer" para aprobar cambios desde el teléfono (no editor completo, solo revisión + approve/reject) |
| 243 | **AI no entendió** — usuario pide algo y AI genera cosa diferente | "No es lo que esperabas? Describe con más detalle" + "Probar de nuevo" + "Editar manualmente" |
| 244 | **Docker compose up falla** — usuario no tiene Docker o versión vieja | `knit doctor` — diagnóstico automático: "❌ Docker no instalado. Descargalo en: docker.com" |
| 245 | **Miedo a romper algo** — usuario no explora funciones avanzadas por miedo | Draft siempre separado de published. "Experimenta sin miedo: tus cambios no afectan producción hasta que publiques" |
| 246 | **Modelo mental inconsistente** — usuario no entiende qué hace cada interacción | Tooltips en cada botón + "¿Qué hace esto?" link a documentación en lenguaje simple |
| 247 | **No sé si está guardado** — sin indicador claro de estado | Indicador permanente en toolbar: "💾 Guardado" / "⏳ Guardando..." / "⚠️ Sin guardar" |
| 248 | **Onboarding personalizado falla** — perfil incorrecto lleva a tutorial inadecuado | Permitir cambiar perfil después del onboarding. "No soy diseñador, soy developer" — recargar tutorial |

## Nuevas Funcionalidades y Herramientas (NUEVO — Post-MVP)

| # | Feature | Propósito | Esfuerzo |
|---|---------|-----------|:--------:|
| 249 | **Design Token Editor** — editor visual de tokens (colores, spacing, tipografía). Genera CSS variables, Tailwind config, SCSS | Mantener design system sin código | M |
| 250 | **Component Playground** — aislar y probar componente con diferentes props, estados, viewports. Como Storybook | QA antes de ponerlo en página | M |
| 251 | **Form Builder Wizard** — UI dedicada para construir formularios: arrastrar campos, validación, destino de datos | Amateur crea formularios en 2 min | M |
| 252 | **Data Table Wizard** — pegas URL de API o seleccionas DB → tabla filtrable y ordenable lista en 2 clics | Conectar datos sin escribir queries | M |
| 253 | **One-click Theme Generation** — color primario + tono (moderno/clásico/fun) → AI genera tema completo | Amateur sin diseñador | L |
| 254 | **Component Library from GitHub** — conectas repo React → componentes aparecen en la palette | Equipos con su propia librería | L |
| 255 | **Voice Commands** — "cambia este botón a azul" por voz. Sin manos | Accesibilidad, productividad | XL |
| 256 | **Scheduled Tasks Visual Editor** — editor visual de cron con interfaz calendario | Programar sin código | M |
| 257 | **API Marketplace** — navegar y conectar APIs públicas (clima, maps, payments) sin configurar | Amateur conecta servicios reales | L |
| 258 | **Plugin/Component/Theme Store** — marketplace dentro del builder para comunidad | Ecosistema de extensiones | XL |
| 259 | **Web Capture** — pegar URL → knitstudio descarga HTML/CSS/JS/assets completa | Clonar cualquier web como base de proyecto | L |
| 260 | **HTML→knitstudio converter** — AI analiza la web, detecta componentes y genera layout.json editable | De web real a proyecto editable con 1 clic | L |
| 261 | **"Usar como base" project seed** — crear proyecto nuevo desde una web existente, con tema, assets y layout | No empezar de cero nunca | M |
| 262 | **Cross-project clipboard** — copiar componentes entre tabs/proyectos de knitstudio | Reutilizar entre proyectos | M |
| 263 | **AI Connect** — detectar componentes pegados y ofrecer crear backend automáticamente | AI genera CRUD + auth + API desde lo que pegas | L |

## Gaps de Flexibilidad (NUEVO — Fase 6)

| # | Gap | Resolución |
|---|-----|------------|
| 259 | **Custom HTML attributes** — `data-*`, `aria-*`, eventos inline no editables | Field "HTML attributes" en cada componente: key=value libre |
| 260 | **Custom component variants** — usuario no puede crear variantes propias | Variants editor: crear, nombrar, configurar variantes de cualquier componente |
| 261 | **Custom design tokens** — `--brand-gradient` no existe en el theme | Token editor libre: nombre + valor + tipo (color, size, shadow) |
| 262 | **Custom breakpoints** — 480px, 1440px no existen en el sistema | Breakpoints editor: agregar, nombrar, configurar cualquier breakpoint |
| 263 | **Composite components** — agrupar múltiples componentes en uno reutilizable | "Group as component": seleccionar hijos → nombrar → crear componente compuesto |
| 264 | **Extend built-in components** — agregar props/estados a componentes existentes | "Extend component" plugin: wrapper que agrega funcionalidad |
| 265 | **Custom state management** — usar Zustand/Redux/Context en vez del state manager propio | State adapter plugin: conectar state manager externo al runtime |
| 266 | **Component lifecycle hooks** — onMount, onUpdate, onDestroy por componente | Hooks editor en cada componente: código JS que se ejecuta en cada fase |
| 267 | **Lazy-load individual components** — controlar qué carga lazy y qué no | Prop `loading: eager | lazy` en cada componente |
| 268 | **SSR per-component** — marcar componentes específicos para server-side render | Prop `ssr: true | false` en cada componente |

## Gaps de Facilidad de Uso (NUEVO — Fase 2)

| # | Gap | Resolución |
|---|-----|------------|
| 269 | **Right-click context menu** — copiar, pegar, duplicar, eliminar, ordenar desde clic derecho | Context menu nativo del canvas con todas las acciones |
| 270 | **Multi-select (Cmd+click + drag selection)** — mover/redimensionar/eliminar varios a la vez | Selection box: arrastrar para seleccionar múltiples componentes |
| 271 | **Alignment tools** — alinear izquierda/centro/derecha/arriba/medio/abajo. Distribuir horizontal/vertical | Align toolbar al seleccionar múltiples componentes |
| 272 | **Keyboard nudging** — flechas: 1px, Shift+flechas: 10px | Movimiento pixel-perfect con teclado |
| 273 | **Component palette search + filter** — buscar por nombre, categoría, estado de uso | Search bar en palette + filtros por categoría + tags |
| 274 | **Recently used + favorites** — acceso rápido a lo que más usas | Sección "Recent" + "Favorites" en palette |
| 275 | **Folders en page list** — organizar páginas en carpetas | Folder tree en el panel de páginas |
| 276 | **Tags/labels en páginas y componentes** — filtrar por tags, búsqueda avanzada | Tag editor + tag filter en todos los paneles |
| 277 | **Batch rename + auto-numbering** — renombrar varios componentes a la vez. Al duplicar: "Button 2" | Auto-naming inteligente. Batch rename modal |
| 278 | **Spell check + emoji picker + color contrast checker** — en editor de texto | Toolbar enriquecido en text editor |
| 279 | **Image editor básico** — crop, resize, filtros sin salir de knitstudio | Modal de edición de imagen inline |
| 280 | **Icon library browser interno** — Feather, Material, Lucide desde el builder | Palette de íconos con búsqueda y preview |
| 281 | **Font preview interactivo** — ver fuentes con texto de muestra antes de seleccionar | Font preview modal con muestra personalizable |
| 282 | **Printable shortcut card** — PDF descargable con atajos de teclado | Generate PDF con shortcuts del builder |
| 283 | **Drag from desktop** — arrastrar imagen del explorador al canvas | Drop zone en canvas acepta archivos del sistema |
| 284 | **Paste from clipboard** — copiar diseño de Figma, pegar en knitstudio | Clipboard parser: analiza imagen o texto copiado |
| 285 | **Shift+click para selección múltiple en layer tree** — seleccionar rango | Range selection en layer tree (como en editores de archivos) |

## Nuevos Conflictos (NUEVO — Fase 8)

| # | Conflicto | Resolución |
|---|-----------|------------|
| 286 | **Plugin compite con otro plugin** — dos plugins modifican el mismo componente | Plugin isolation: cada plugin opera en espacio aislado. Detectar conflictos al instalar |
| 287 | **Theme override ambiguity** — proyecto define `--primary:blue`, componente define `--primary:red` | Herencia clara: instancia > página > proyecto > theme. Tooltip "de dónde viene este valor" |
| 288 | **Export format drift** — corriges en React, Vue queda desactualizado | Export sync: "React y Vue están desincronizados. ¿Sync?" |
| 289 | **Version drift en equipo** — tú knitstudio v2.0, compañero v1.8, layouts incompatibles | Version check al compartir layouts. "Este layout requiere knitstudio v2.0+" |
| 290 | **Schema version mismatch** — layout schema v2, runtime producción solo v1 | Schema validation al publicar. "Este layout usa features no soportadas en producción" |
| 291 | **Clock skew** — PC con hora incorrecta. Versiones con timestamp erróneo | Timestamp server-side. Alerta si la hora local difiere >1min del servidor |
| 292 | **Browser cache** — usuario cambia CSS, no ve cambios | Cache busting automático (?v=hash). Indicador "cambios aplicados" |
| 293 | **Concurrent knit commit** — dos usuarios ejecutan `knit commit` simultáneo | Lock en operaciones Git. Cola de commits. Notificar si otro está comiteando |
| 294 | **Asset hotlinking** — imágenes en knitstudio.cloud, migras a self-hosted, URLs rotas | Asset URLs relativas + migración automática de URLs al exportar |
| 295 | **DB migration conflict** — usuario cambia schema BD, data binding se rompe | Schema version tracking. Alerta "esta API cambió desde que configuraste el binding" |

## Gaps de Testing del Builder Mismo (NUEVO — Fase 0)

| # | Gap | Resolución |
|---|-----|------------|
| 296 | **Unit tests del builder** — componentes React del builder mismo sin test | Vitest + React Testing Library. Cobertura >80% en builder |
| 297 | **Unit tests de la API** — rutas Express sin test | Supertest + Jest. Cada endpoint con test de éxito y error |
| 298 | **Unit tests del runtime** — el runtime embeddable sin test | Vitest. Test de renderizado de cada componente soportado |
| 299 | **E2E del builder** — flujo completo: abrir builder → crear página → arrastrar componente → guardar | Playwright. Escenarios críticos cubiertos |
| 300 | **Visual regression del builder** — cambios visuales no detectados | Percy/Chromatic. Captura de cada pantalla del builder |
| 301 | **Load test** — 100 usuarios concurrentes editando | k6. La API debe responder <200ms con 100 conexiones simultáneas |
| 302 | **Stress test** — 10,000 proyectos, 100,000 páginas en BD | Simulación de BD poblada. Queries deben responder <500ms |
| 303 | **Build test** — `knit build` exitoso antes de cada release | CI/CD: cada PR ejecuta build completo + lint + typecheck + tests |
| 304 | **Smoke test post-deploy** — el builder funciona después de deploy | GitHub Actions: deploy → health check → E2E básico → OK |
| 305 | **Auto-validation del output exportado** — el código React generado compila sin errores | Compilación automática con TypeScript + ESLint del output |

## Gaps de Documentación Integral (NUEVO — Fase 0-9)

| # | Gap | Resolución |
|---|-----|------------|
| 306 | **JSDoc/TSDoc en todo el código** — sin documentación de código, contribuir es imposible | `typedoc` genera docs automáticas desde comentarios JSDoc. CI valida que no falten |
| 307 | **README por cada package** — cada package del monorepo debe explicar qué hace, cómo usarlo, dependencias | README.md template para cada package con: propósito, API, ejemplos, dependencias |
| 308 | **Storybook del builder** — catálogo visual de todos los componentes del builder (no los generados) | Storybook + Chromatic. Cada componente del builder documentado con variantes |
| 309 | **API reference autogenerada** — docs de la REST API de knitstudio | Swagger/OpenAPI + Docusaurus plugin. Documentación generada desde el código |
| 310 | **Arquitectura del código** — diagramas, flujos, decisiones técnicas documentadas en `docs/architecture/` | ADRs (Architecture Decision Records) + diagramas Mermaid en docs |
| 311 | **Guías de contribución por área** — no solo "cómo contribuir" general, sino guías específicas: "cómo agregar un componente", "cómo crear un conector" | CONTRIBUTING.md extendido con guías por área + templates de PR por tipo |
| 312 | **Changelog por versión** — cada release con changelog detallado: breaking changes, features, fixes, deprecated | `knit changelog` genera automáticamente desde conventional commits |

## Gaps de Riesgos Existenciales (NUEVO — Fase 0)

| # | Gap | Resolución |
|---|-----|------------|
| 313 | **Bus factor = 1** — si el maintainer principal se ausenta, el proyecto muere | Desde el día 1: documentación completa, CI/CD automatizado, onboarding de contributors, al menos 1 co-maintainer |
| 314 | **Dependencia crítica sin mantenimiento** — GrapesJS u otra dependencia puede quedar huérfana | Evaluación periódica de dependencias. Plan de contingencia: fork propio si es necesario |
| 315 | **API de AI cambia términos** — OpenAI/Anthropic pueden cambiar precios o prohibir builders | Múltiples proveedores de AI (OpenAI + Anthropic + Ollama local). El usuario elige. No depender de uno solo |
| 316 | **Suministro de dependencias comprometido** — un ataque a npm puede comprometer knitstudio | Dependabot + Snyk + lockfile + revisión manual de dependencias críticas |
| 317 | **Escalabilidad cloud no modelada** — 10k proyectos pueden colapsar la instancia cloud | Arquitectura cloud con auto-scaling, CDN, caché multi-nivel, y límites por tenant desde el día 1 |
| 318 | **Sin tests del builder** — releases que rompen funcionalidad existente | Suite completa de tests: unit + integration + E2E + visual regression + load. CI bloquea si falla |
| 319 | **Feature creep sin control** — el plan tiene 330+ gaps y nadie prioriza | Roadmap trimestral con priorización basada en impacto+esfuerzo. No todo se construye a la vez |

## Nuevas Incompatibilidades (NUEVO — Fase 0)

| # | Incompatibilidad | Resolución |
|---|-----------------|------------|
| 296 | **Yarn vs npm vs pnpm** — proyecto usa yarn workspaces, knitstudio asume npm | `knit project:register` detecta package manager y ajusta scripts |
| 297 | **Docker Compose v1 vs v2** — `docker-compose` vs `docker compose` | `knit doctor` detecta versión y usa el comando correcto |
| 298 | **Windows path separators** — `\` vs `/` en rutas | Normalización automática de paths en bridge y CLI |
| 299 | **macOS case-insensitive vs Linux case-sensitive** — asset `Logo.png` funciona en Mac, falla en Linux | Forzar lowercase en assets. Advertencia si hay duplicados por capitalización |
| 300 | **Unicode / RTL / LTR** — texto árabe/hebreo rompe layouts LTR | Soporte RTL en runtime: `dir: rtl` en contenedores. Auto-detección del idioma |
| 301 | **CRLF vs LF** — Windows CRLF, Linux LF. Git diff lleno de falsos cambios | `knit commit` normaliza a LF automáticamente |
| 302 | **Corporate proxy** — proxy bloquea npm, docker, git | Documentación de configuración de proxy corporativo. `knit doctor` detecta |
| 303 | **Air-gapped** — sin acceso a internet. No se pueden descargar dependencias | Offline bundle: `knit download --all` descarga todo antes de aislar |
| 304 | **M1/ARM vs x86 Docker** — imágenes sin soporte ARM | Multi-arch builds: `linux/amd64`, `linux/arm64`. Docker buildx |
| 305 | **Node.js version** — knitstudio requiere Node 20+, usuario tiene Node 16 | `knit doctor` detecta. Documentar versión mínima. Docker elimina este problema |
| 306 | **Docker missing** — usuario no tiene Docker | `knit doctor` guía instalación. Alternativa: npm install directo (sin Docker) |

## Nuevos Problemas UX (NUEVO — Fase 2)

| # | Problema | Resolución |
|---|----------|------------|
| 307 | **Notification overload** — tantos toasts que los ignora | Priority queue: toasts críticos siempre visibles. Info toasts → notification center |
| 308 | **Modal hell** — modales anidados que bloquean la UI | Stack de modales con breadcrumb. Cerrar todos con "Esc" |
| 309 | **Scroll fatigue** — paneles de propiedades de 50+ props, scrolling infinito | Collapsible sections + search dentro del panel. Props más usados primero |
| 310 | **Click fatigue** — 8 clics para cambiar tamaño de fuente | Quick actions: doble clic en valor numérico → editable inline |
| 311 | **Cognitive load** — demasiada información en pantalla | Modo "focus": oculta paneles no usados. Atajo "F" para toggle focus mode |
| 312 | **"¿Es seguro usar AI?"** — desconfianza del código generado | AI-generated badge en componentes. "Revisado" check. Audit trail de AI |
| 313 | **Email fatigue** — demasiados correos de knitstudio | Notification preferences granulares por defecto. Solo emails críticos |
| 314 | **Feature creep** — herramienta hace tanto que usuario no sabe por dónde empezar | Modo "path": elige objetivo ("quiero una landing") y oculta features irrelevantes |
| 315 | **Help no ayuda** — documentación no responde lo que pregunta | In-app search que busca en docs. "No encontraste? Reportar" → mejora la doc |
| 316 | **Community ghost town** — nadie responde en Discord/Foros | "Community hours" semanales. Respuesta automática con FAQ + enlaces |
| 317 | **Estado del sistema invisible** — no sabe si knitstudio está caído o es su internet | Status widget en el builder: "🟢 Todo bien | 🔴 Incidente reportado" |
| 318 | **"No sé si mi proyecto es seguro"** — preocupación por privacidad en cloud | Security summary panel: "Tus datos están cifrados en reposo y tránsito. Ubicación: UE" |

## Gaps de Publicación (Fase 0-9)

| # | Gap | Resolución |
|---|-----|------------|
## Gaps del Builder como Producto (NUEVO — Fase 0)

| # | Gap | Resolución |
|---|-----|------------|
| 320 | **Builder crash recovery** — si el builder crashea, el usuario no pierde trabajo | Autoguardado cada 30s + "Recuperar última sesión" al recargar |
| 321 | **Builder performance monitoring** — el builder se vuelve lento con proyectos grandes | Web Vitals monitoring en el builder. Alerta si FPS baja de 30. Sugerir optimizaciones |
| 322 | **Builder RAM/CPU usage** — el builder consume mucha memoria en proyectos complejos | Lazy loading de componentes, virtual scrolling, memory profiling periódico |
| 323 | **Builder self-version** — el builder mismo tiene versión. El usuario puede ver qué versión usa | Version badge en footer. `knit --version`. Changelog accesible desde el builder |
| 324 | **Builder update notification** — cuando hay nueva versión, el usuario debe saberlo | Badge "Nueva versión disponible" + one-click upgrade para self-hosted |
| 325 | **Builder error boundary** — si un panel del builder falla, no debe romper todo el builder | React Error Boundaries por panel. El panel roto muestra placeholder, el resto sigue funcionando |

## Gaps de Accesibilidad del Builder (NUEVO — Fase 3)

| # | Gap | Resolución |
|---|-----|------------|
| 326 | **Screen reader en el builder** — usuarios ciegos no pueden usar knitstudio | ARIA labels en todos los controles, roles semánticos, anuncios de cambios |
| 327 | **Keyboard navigation completa del builder** — todas las acciones sin mouse | Tab order lógico, atajos para todo, focus indicators visibles, skip to content |
| 328 | **Color blind mode** — indicadores rojo/verde en diff inútiles para 8% de hombres | Patrones + text labels además de color. Modo "high contrast" |
| 329 | **Reduced motion mode** — animaciones del builder causan náuseas | `prefers-reduced-motion` detectado automáticamente. Desactivar animaciones |
| 330 | **Builder responsive** — el builder debe funcionar en pantallas pequeñas | Dashboard responsivo. Al menos vista de solo lectura en tablets y móviles |
| 331 | **Modo oscuro / claro** — tema del builder sigue el sistema operativo | `prefers-color-scheme` detectado automáticamente. Toggle manual también |

## Gaps de Edge Cases (NUEVO — Fase 0-9)

| # | Gap | Resolución |
|---|-----|------------|
| 332 | **500+ proyectos** — el dashboard debe funcionar con cientos de proyectos | Virtual scrolling + búsqueda + filtros + paginación en la lista de proyectos |
| 333 | **10,000+ componentes por página** — canvas debe renderizar sin colapsar | Virtual rendering del canvas. Solo renderizar componentes visibles |
| 334 | **500+ steps en action flow** — el flow editor debe manejarlos | Virtual scrolling en el editor de flows. Agrupación de pasos |
| 335 | **Caracteres especiales en nombres** — nombres con / \ : * ? < > \| " no deben romper nada | Sanitización de nombres. Validación en tiempo real |
| 336 | **Emails con +** — correos como usuario+tag@domain.com deben funcionar | Validación RFC 5322 compliant. No rechazar caracteres válidos |
| 337 | **Nombres duplicados** — dos proyectos/páginas/componentes con el mismo nombre | Auto-naming: "Mi Página (2)", "Mi Página (3)". Alerta de duplicado |
| 338 | **Proyectos huérfanos** — cuando se elimina un usuario, qué pasa con sus proyectos | Soft delete. Proyectos transferibles a otro usuario. Período de gracia |

## Gaps de Offboarding (NUEVO — Fase 9)

| # | Gap | Resolución |
|---|-----|------------|
| 339 | **Eliminar cuenta** — el usuario debe poder eliminar su cuenta y datos | `knit account:delete` + web. Soft delete 30 días. Export de datos antes de borrar |
| 340 | **Cancelar suscripción** — el usuario cloud debe poder cancelar sin hablar con nadie | Self-service cancellation. Downgrade a free. Datos preservados 90 días |
| 341 | **Data export pre-eliminación** — antes de borrar cuenta, exportar todos los proyectos | ZIP con layouts JSON + assets + configuraciones. Enlace por email |
| 342 | **Retention policy** — cuánto tiempo se guardan los datos después de cancelar | 90 días para cloud. 30 días para self-hosted (configurable) |
| 343 | **Herencia de proyectos** — transferir proyectos a otro usuario antes de irse | Modal: "¿A quién quieres transferir tus proyectos?" al eliminar cuenta |

## Gaps de Cultural/Locale (NUEVO — Fase 3)

| # | Gap | Resolución |
|---|-----|------------|
| 344 | **Date format en el builder** — DD/MM/YYYY vs MM/DD/YYYY vs YYYY-MM-DD | Formato configurable por usuario. Detección automática del locale |
| 345 | **Number format en el builder** — 1,000.50 vs 1.000,50 | Formato configurable. Auto-detect del locale del navegador |
| 346 | **Currency format en el builder** — $ vs € vs R$ con posición correcta | Símbolo y posición configurable. Lista de monedas comunes |
| 347 | **First day of week** — lunes vs domingo según país | Configurable. Auto-detect del locale |
| 348 | **Time zone handling** — todos los timestamps deben ser en la zona horaria del usuario | Almacenar en UTC, mostrar en zona del usuario. Selector de timezone |

## Gaps de Publicación (Fase 0-9)

| # | Gap | Resolución |
|---|-----|------------|
## Gaps de Presencia Pública (NUEVO — Fase 9)

| # | Gap | Resolución |
|---|-----|------------|
| 349 | **Status page** — estado del servicio: builder, api, cdn, mcp. Página pública | `status.knitstudio.io` con historial de incidentes. Actualización automática desde monitoreo |
| 350 | **Public roadmap** — qué features están en progreso, planeadas, completadas | `roadmap.knitstudio.io` con votación de comunidad. Integrado con GitHub Projects |
| 351 | **Blog** — tutorials avanzados, release posts, case studies, comparativas | `blog.knitstudio.io` con RSS. Release posts automáticos + contenido original |
| 352 | **"Built with" showcase** — galería de proyectos hechos con knitstudio | Showcase público: cualquier usuario puede enviar su proyecto. Preview + stats |
| 353 | **Community contributors page** — reconocer a contribuidores | `CONTRIBUTORS.md` generado automáticamente. All-contributors bot. Sección en web |
| 354 | **"What's new" modal in-app** — mostrar novedades de cada versión dentro del builder | Modal al abrir después de una actualización. Changelog visual con screenshots |
| 355 | **Comparison page** — knitstudio vs Webflow, Retool, n8n, v0.dev, Appsmith | Página pública con tabla comparativa. Transparente y honesta |

## Gaps de Post-Publicación y Retención (NUEVO — Fase 6)

| # | Gap | Resolución |
|---|-----|------------|
| 356 | **Content Mode** — modo exclusivo para editar contenido (texto, fotos, precios) sin ver el builder completo | Toggle "Content/Design" en toolbar. Content mode oculta paletas, layers, action flows |
| 357 | **Post-publish engagement** — notificaciones después de publicar: compartir, analytics, sugerencias | Modal post-publish: "Compartir en redes", "Ver analytics", "Crear versión mobile", "Mejorar SEO" |
| 358 | **Re-engagement emails** — recordatorios después de inactividad | Email: "Hace 30 días que no editás tu proyecto. Estos son los cambios que podrías hacer..." (opt-in) |
| 359 | **Runtime lock-in mitigation** — el runtime es el vendor lock-in real, no el builder | Runtime standalone documentado. "Runtime-free export": HTML+CSS plano sin JS extra. Garantía por escrito |

## Gaps de Fidelidad y Consistencia (NUEVO — Fase 6)

| # | Gap | Resolución |
|---|-----|------------|
| 360 | **Fidelity gap** — lo que se ve en el builder difiere de lo que se publica | "Pixel match" test automático: screenshot builder vs screenshot export. Browser matrix preview: Chrome + Safari + Firefox + Edge |
| 361 | **Feature detection en export** — advertir si una interacción no se exporta al target elegido | Badge en componentes: "⚠️ No compatible con export HTML estático" |
| 362 | **Cross-browser preview** — ver cómo se ve el diseño en Chrome, Safari, Firefox sin salir del builder | Tabs de preview: "Chrome", "Safari", "Firefox", "Edge" con rendering real |

## Gaps de Integración y Automatización (NUEVO — Fase 0)

| # | Gap | Resolución |
|---|-----|------------|
| 363 | **API pública REST** — documentada, versionada, con API keys | `api.knitstudio.io/v1` con OpenAPI/Swagger. CRUD de proyectos, páginas, export |
| 364 | **CI/CD integration** — `curl` a la API desde GitHub Actions, GitLab CI, etc | Ejemplos en docs para GitHub Actions, GitLab CI, CircleCI. Endpoints de build + deploy |
| 365 | **Webhook events** — notificar a sistemas externos cuando algo cambia en knitstudio | Eventos: project.created, page.published, export.completed. POST a URL configurable |
| 366 | **CLI API wrapper** — `knit api:key create`, `knit api:key revoke` | CLI comandos para gestionar acceso programático sin interfaz web |

## Gaps de Regression Testing del Builder (NUEVO — Fase 0)

| # | Gap | Resolución |
|---|-----|------------|
| 367 | **Dependency upgrade tests** — testear el builder con cada actualización de dependencia crítica | CI matrix: React 19.0, 19.1, GrapesJS 0.30, 0.31. Detectar regresiones antes de merge |
| 368 | **Schema migration tests** — layouts v1 deben funcionar en runtime v2 | Test suite que carga layouts de todas las versiones anteriores y verifica renderizado correcto |
| 369 | **Snapshot testing del builder** — capturar estado visual de cada pantalla del builder | Chromatic/Percy + Playwright. Cada PR genera diff visual automático |
| 370 | **API contract tests** — la API REST no debe cambiar sin actualizar la documentación | Pact testing o OpenAPI diff. CI bloquea si hay breaking changes no documentados |

## Gaps de Publicación (Fase 0-9)

| # | Gap | Resolución |
|---|-----|------------|
## Gaps de Mantenimiento Post-Publicación (NUEVO — Fase 6)

| # | Gap | Resolución |
|---|-----|------------|
| 371 | **Health dashboard por página** — detectar APIs rotas, componentes deprecados, versiones desactualizadas | Dashboard: "🟢 Todo bien | 🟡 API cambió | 🔴 Componente deprecado". Health check automático periódico |
| 372 | **Proactive alerts** — notificar al usuario cuando algo deja de funcionar | "La API /api/guests ya no responde. Revisa tu action flow 'Check In'". Alertas por email/in-app |
| 373 | **Maintenance mode** — marcar página como "en mantenimiento" mientras se edita | Banner automático: "🛠 Esta página está siendo actualizada". Ocultable |
| 374 | **Last verified timestamp** — cada conexión externa registra cuándo funcionó correctamente por última vez | Timestamp en cada binding de API. Alertar si pasó >30 días sin verificar |

## Gaps de Colaboración Avanzada (NUEVO — Fase 8)

| # | Gap | Resolución |
|---|-----|------------|
| 375 | **Threads de comentarios en componentes** — no solo notas, sino discusiones con respuestas | Sidebar de comentarios por componente. @menciones con notificación. Como Figma |
| 376 | **Activity feed por proyecto y persona** — "qué editó Juan esta semana" | Timeline de actividad filtrable por persona, fecha, tipo de cambio |
| 377 | **Approval workflow completo** — draft → "en revisión" → aprobado → publicado | Estados de página con transiciones. Notificar al revisor. Historial de aprobaciones |

## Gaps de Anti-Lock-In (NUEVO — Fase 6)

| # | Gap | Resolución |
|---|-----|------------|
| 378 | **Export flat** — proyecto completo como archivos planos editables sin runtime ni knitstudio | `knit export --format=flat --out=./proyecto` → index.html + styles.css + scripts.js + assets + knit.json |
| 379 | **Emergency kit** — ZIP de emergencia generado periódicamente con todo el proyecto en HTML plano | Generación automática cada 24h. Descargable desde status page. `knit emergency:export` |
| 380 | **Runtime-free export guarantee** — el export flat funciona sin el runtime JS de knitstudio | HTML+CSS plano, sin JS extra. Funciona en cualquier hosting (Netlify, S3, Apache) |

## Gaps de UX Inteligente (NUEVO — Fase 4)

| # | Gap | Resolución |
|---|-----|------------|
| 381 | **Componentes auto-configurables** — al arrastrar un componente, detecta APIs disponibles y se conecta solo | El componente escanea las APIs del proyecto y se auto-configura. "GuestTable" → detecta GET /api/guests |
| 382 | **Smart defaults** — props se auto-configuran según contexto donde se arrastra el componente | Tooltip: "¿Sabías que puedes cambiar el color de fondo?" primera vez. Defaults contextuales |
| 383 | **Presets de configuración** — "Tabla con búsqueda", "Tabla con filtros", "Tabla editable" | Sets de props pre-configurados. Un clic para aplicar el preset completo |
| 384 | **Experto mode en props** — ocultar props default, mostrar solo avanzadas | Toggle "Simple/Advanced" en el panel de propiedades de cada componente |

## Gaps de Design System Sync (NUEVO — Fase 6)

| # | Gap | Resolución |
|---|-----|------------|
| 385 | **Design System Sync** — knitstudio como fuente de verdad del diseño | Exporta design tokens a Figma (vía API), CSS variables, Tailwind config, SCSS |
| 386 | **Figma → knitstudio → código** — pipeline completo de diseño a producción | Import desde Figma → editar en knitstudio → exportar a código. Sin drift |
| 387 | **Token drift detection** — alertar cuando Figma y knitstudio tienen valores diferentes | Comparación periódica. Alertar: "El color primario en Figma es #2563EB, en knitstudio es #0BA5EC" |

## Gaps de Presentación y Cliente (NUEVO — Fase 2)

| # | Gap | Resolución |
|---|-----|------------|
| 388 | **Presentation mode** — pantalla completa, sin toolbars, sin paneles, solo el canvas | Atajo "P" para presentation mode. Oculta toda la UI del builder |
| 389 | **Client view** — el cliente solo puede ver y dar feedback, no editar | Feedback: "👍 Me gusta", "✏️ Cambiaría esto". Sin acceso a herramientas de edición |
| 390 | **Export a PDF/Imagen** — capturar el diseño actual como documento | `knit export --format=pdf`. Download PNG de la página actual |

## Gaps de Compromiso Humano (NUEVO — Fase 5)

| # | Gap | Resolución |
|---|-----|------------|
| 391 | **Commit messages obligatorios/sugeridos** — al guardar versión, pedir "¿qué cambiaste?" | "¿Qué cambiaste?" (sugerido) o "Explica este cambio a tu equipo" (obligatorio en equipo) |
| 392 | **Timeline visual con etiquetas de contexto** — 👤 Cliente, 🐛 Bug, ✨ Feature | Etiquetas al crear versión. Timeline filtrable por etiqueta |
| 393 | **Activity storytelling** — "Juan cambió el color del botón porque el cliente pidió más contraste" | Commit messages + etiquetas + autor. Vista "historia" de la página |

## Gaps de Publicación (Fase 0-9)

| # | Gap | Resolución |
|---|-----|------------|
## Gaps de Interacción y Testing en el Builder (NUEVO — Fase 2)

| # | Gap | Resolución |
|---|-----|------------|
| 394 | **Preview/interact mode** — probar la página funcionalmente: clicks, navegación, formularios, action flows | Toggle "Editar/Probar" en toolbar. En modo Probar: overlay se oculta, la página es 100% interactiva |
| 395 | **Split view** — editar en una mitad, probar en la otra simultáneamente | Pantalla dividida 50/50: izquierda editable con overlay, derecha interactiva sin overlay |
| 396 | **Test mode con logs** — al probar, mostrar en un panel qué action flows se ejecutan, qué APIs se llaman, qué variables cambian | Console panel: "onClick → POST /api/checkin → 200 OK → toast ✅". Logs en vivo mientras pruebas |
| 397 | **Breakpoint mode** — pausar la interacción en un action flow específico. Ir paso a paso | Al hacer clic, el action flow se pausa en el primer paso. Botones "▶️ Siguiente", "⏭ Saltar", "🔄 Repetir" |
| 398 | **State inspector en test mode** — ver el valor actual de todas las variables, bindings, estado del componente | Panel lateral: "Variables: {currentUser, selectedGuest, isLoading}". Actualizado en vivo |
| 399 | **Network panel** — ver todas las llamadas a APIs durante la prueba: método, URL, request, response, duración | "POST /api/guests/123/checkin → 200 OK (230ms)". Request/response visibles |
| 400 | **Reset test state** — volver la página a su estado inicial para volver a probar desde cero | Botón "🔁 Reset" que recarga la página en modo prueba sin recargar el builder |

## Gaps de Publicación (Fase 0-9)

| # | Gap | Resolución |
|---|-----|------------|
## Gaps de Operaciones Masivas (NUEVO — Fase 6)

| # | Gap | Resolución |
|---|-----|------------|
| 401 | **Bulk operations** — cambiar N páginas/componentes a la vez | Selector múltiple en page list. "Aplicar cambio a X páginas". "Reemplazar componente en todo el proyecto" |
| 402 | **Component replace** — reemplazar todas las instancias de un componente por otro | "Replace Component": seleccionas viejo + nuevo → todas las páginas se actualizan |

## Gaps de Enfoque y Calidad de Vida (NUEVO — Fase 2)

| # | Gap | Resolución |
|---|-----|------------|
| 403 | **Do Not Disturb mode** — silenciar notificaciones mientras trabajas | Toggle "🔇 No molestar". Solo errores críticos pasan. Las demás notificaciones van al centro de notificaciones |
| 404 | **Notification center** — historial de todas las notificaciones | Panel accesible desde toolbar. Filtro por tipo: tips, errores, sistema. Marcado como leído/no leído |

## Gaps de Proyecto y Publicación (NUEVO — Fase 6)

| # | Gap | Resolución |
|---|-----|------------|
| 405 | **Published showcase** — URL pública de solo lectura del proyecto | `knitstudio.io/showcase/project-id`. Badge "Hecho con knitstudio". Feedback collecting opcional |
| 406 | **Pre-launch kit** — checklist automático antes de publicar | SEO, OG tags, favicon, analytics, responsive, 404. Score 7/10 antes de permitir publicar. Auto-fix |

## Gaps de Inteligencia y Análisis (NUEVO — Fase 5)

| # | Gap | Resolución |
|---|-----|------------|
| 407 | **Dependency graph** — qué depende de qué en el proyecto | "Usage inspector" al seleccionar componente: "Usado en 3 páginas, 2 action flows". "Delete preview" con advertencia |
| 408 | **Consistency inspector** — detectar textos/estilos inconsistentes | "Detecté 3 variaciones del botón 'Registrarse'. ¿Unifico?". Design lint con reglas configurables |

## Gaps de Gestión de Versiones y Acceso (NUEVO — Fase 8)

| # | Gap | Resolución |
|---|-----|------------|
| 409 | **Museum mode** — versiones congeladas, archivo, publicar desde cualquier versión | "Freeze version": no se puede eliminar. "Publish from": elegir qué versión publicar. "Archive": ocultar del timeline sin borrar |
| 410 | **Access history** — quién vio/exportó qué y cuándo | Access log: quién, cuándo, desde dónde. Export log: formato, cantidad. Suspicious access alert |

## Gaps de Calidad Post-Publicación (NUEVO — Fase 6)

| # | Gap | Resolución |
|---|-----|------------|
| 411 | **Sentinel mode** — monitoreo automático 24h post-publicación | Si detecta errores 5xx, carga >5s, JS errors → rollback automático |
| 412 | **Canary deploy** — publicar a % de usuarios primero | 10% → monitor 5 min → 100%. Si hay errores, no escala |
| 413 | **Health score** — métrica combinada de rendimiento, errores, uptime | Score 0-100 visible en dashboard. Histórico de 30 días |

## Gaps de Publicación (Fase 0-9)

| # | Gap | Resolución |
|---|-----|------------|
## Gaps de Integración CMS (NUEVO — Post-MVP)

| # | Gap | Resolución |
|---|-----|------------|
| 414 | **WordPress import** — descargar páginas/posts via REST API, convertir Gutenberg blocks a componentes knitstudio | Plugin WordPress opcional. Sin plugin: Application Passwords + WP REST API. Mapeo block→componente |
| 415 | **WordPress update** — editar en knitstudio, publicar de vuelta a WordPress | Componentes knitstudio → Gutenberg blocks. POST /wp/v2/pages/{id}. Soporte para theme.json |
| 416 | **WordPress theme.json sync** — detectar colores, tipografía, spacing del theme activo y usarlos en el editor | Importar theme.json → tokens de knitstudio. El diseño respeta el theme de WordPress |

## Gaps de Publicación (Fase 0-9)

| # | Gap | Resolución |
|---|-----|------------|
## Gaps de Documentación y Cumplimiento (NUEVO — Fase 6)

| # | Gap | Resolución |
|---|-----|------------|
| 417 | **Documentation Generator** — knitstudio genera docs automáticas del proyecto creado | `knit docs generate` produce: diagrama de flujo de datos, lista de componentes con props, guía de usuario, glosario de variables |
| 418 | **Compliance Kit** — apps legalmente seguras desde el builder | Cookie consent banner (GDPR/CCPA/LGPD), privacy notice generator, accessibility statement, ToS template |

## Gaps de Permisos y Límites (NUEVO — Fase 8)

| # | Gap | Resolución |
|---|-----|------------|
| 419 | **Per-project roles** — permisos específicos por proyecto, no solo globales | Invitar usuarios por proyecto con rol específico (editor/viewer). Herencia opcional desde roles globales |
| 420 | **Quotas y límites configurables** — controlar recursos en self-hosted | MAX_PAGES, MAX_COMPONENTS en .env. Alertas al 80%. Planes para self-hosted: Starter/Pro |

## Gaps de Marca y Presentación (NUEVO — Fase 2)

| # | Gap | Resolución |
|---|-----|------------|
| 421 | **Builder theming** — personalizar la apariencia del builder con marca propia | Logo personalizable, colores header/sidebar, nombre de instancia. Footer: "Powered by knitstudio" |
| 422 | **Gallery view de páginas** — ver todas las páginas como thumbnails, como PowerPoint | Vista galería con thumbnails, nombres, última modificación, estado (draft/published). Toggle lista/galería |
| 423 | **Gallery view de proyectos** — vista lista y galería para elegir proyecto | Vista tarjetas (grid) y vista lista (tabla) intercambiables. Preview del proyecto en cada tarjeta |
| 424 | **Project overview** — thumbnail de todas las páginas en grid para navegación rápida | Grid de miniaturas. Filtro por estado, búsqueda por nombre, drag para reordenar |

## Gaps de Colaboración Temporal (NUEVO — Fase 8)

| # | Gap | Resolución |
|---|-----|------------|
| 425 | **Snapshot sharing** — compartir avances con link temporal sin publicar ni dar acceso al builder | `knitstudio.io/s/abc123`. Página en vivo con cambios sin publicar. Link expirable (7d). Sin login |
| 426 | **Version Story** — títulos automáticos de versiones basados en lo que cambió | "Versión 5: Cambié el color del header + agregué campo de teléfono". Agrupación por sesión de edición |

## Gaps de Personalización del Builder (NUEVO — Fase 2)

| # | Gap | Resolución |
|---|-----|------------|
| 427 | **My Toolbox** — carpeta personal de componentes favoritos que persiste entre proyectos | Toolbox lateral con drag al canvas. Sincronizada con cuenta cloud. Sección "Recent" + "Favorites" |
| 428 | **Zoom levels** — editar a diferentes niveles de detalle | Project overview (grid de páginas), page zoom out (vista completa), pixel zoom (400%), component focus (pantalla completa) |

## Gaps de Publicación (Fase 0-9)

| # | Gap | Resolución |
|---|-----|------------|
## Gaps de Acción Rápida y Edición Express (NUEVO — Fase 2)

| # | Gap | Resolución |
|---|-----|------------|
| 429 | **Quick Actions** — cambiar 1 texto/color sin abrir el builder completo | Notificación push con "Corregir ahora". Email con enlace directo al componente. Mobile quick-fix (solo texto) |
| 430 | **Command palette universal (Cmd+K)** — ejecutar acciones, no solo buscar | "> Cambiar tema a oscuro", "> Publicar página", "> Exportar a React". Fuzzy search, historial, shortcuts personalizables |

## Gaps de Migración desde Otras Plataformas (NUEVO — Fase 5)

| # | Gap | Resolución |
|---|-----|------------|
| 431 | **Webflow full migration** — migrar proyecto completo con CMS, interacciones, hosting | Webflow CMS → knitstudio collections. Webflow interactions → action flows. Webflow hosting → knitstudio deploy |
| 432 | **Bubble migration** — migrar desde Bubble (workflows, DB, UI) | Bubble workflows → action flows. Bubble DB → PostgreSQL/Supabase. Bubble UI → componentes knitstudio |

## Gaps de Colaboración y Contexto (NUEVO — Fase 8)

| # | Gap | Resolución |
|---|-----|------------|
| 433 | **Decision Log** — registrar por qué se hizo cada cambio, no solo qué cambió | "Cliente pidió botón rojo. Reunión 15/05". Persiste aunque el componente cambie. Búsqueda por decisión |
| 434 | **Live cursors + presence** — ver en vivo qué editan otros diseñadores | Avatares flotantes en canvas. "Juan editando Header". Solo visualización, no edición simultánea |

## Gaps de Datos y Transformación (NUEVO — Fase 5)

| # | Gap | Resolución |
|---|-----|------------|
| 435 | **Visual Data Transformer** — mapear/filtrar/ordenar datos sin código | Drag & drop: arrastrar "name" a "nombre". Filter builder visual. Preview en vivo. Transform library reutilizable |

## Gaps de Importación y Referencias (NUEVO — Fase 5)

| # | Gap | Resolución |
|---|-----|------------|
| 436 | **Inspirarse en sección** — capturar UNA SECCIÓN de una URL, no toda la página | Selector visual: "haz clic en la sección que quieras copiar". Solo esa sección se importa |
| 437 | **Remix + atribución** — capturar, editar, publicar como propio | "Inspirado en ejemplo.com". Atribución opcional. Live reference a la página original |
| 438 | **Live reference** — mantener link a la página original para ver cómo cambia | Notificación: "La página original cambió. ¿Quieres actualizar tu versión?" |

## Gaps de Onboarding para Clientes (NUEVO — Fase 2)

| # | Gap | Resolución |
|---|-----|------------|
| 439 | **Client Onboarding Kit** — tutorial interactivo para el cliente no-técnico | "Haz clic en el texto que quieras cambiar". Modo "solo contenido". Video tutorial generado automáticamente |
| 440 | **Help contextual para clientes** — ayuda en lenguaje no técnico dentro del modo contenido | Tooltips: "Para cambiar esta foto, haz clic aquí". Enlaces a videos de 30 segundos |

## Gaps de Recuperación y Línea de Tiempo (NUEVO — Fase 8)

| # | Gap | Resolución |
|---|-----|------------|
| 441 | **Point-in-time recovery** — volver a cualquier minuto del proyecto | Auto-snapshots cada hora. Slider temporal en línea de tiempo. "Cómo se veía el lunes vs hoy" |
| 442 | **Auto-snapshots automáticos** — no solo versiones manuales, sino cada hora automáticamente | Snapshots cada 60 min. Retención: 7 días. No cuentan como "versiones" en el límite del plan |

## Gaps de Publicación (Fase 0-9)

| # | Gap | Resolución |
|---|-----|------------|
## Gaps de Export y Design Handoff (NUEVO — Fase 6)

| # | Gap | Resolución |
|---|-----|------------|
| 443 | **Single component export** — exportar 1 componente individual como React/Vue/HTML/WC | Botón derecho → "Export as...". Código autocontenido, action flows incluidos |
| 444 | **Design handoff mode** — specs para developer: medidas, colores, tipografía, espaciados | Modo "inspeccionar" tipo Figma. Spec sheet en PDF. Export a Figma/Zeplin/Avocode |

## Gaps de Calidad y Cumplimiento (NUEVO — Fase 3)

| # | Gap | Resolución |
|---|-----|------------|
| 445 | **Accessibility scanner** — auditoría a11y integrada antes de publicar | Detecta contraste bajo, ARIA faltante, headings fuera de orden, alt text. Score 0-10. Auto-fix |
| 446 | **Compliance scanner** — GDPR, CCPA, ADA, detección de formularios/cookies/tracking | Alerta si recoge datos sin aviso. Guía paso a paso. Genera banner + privacy notice + consent checkbox |

## Gaps de Ecosistema de Plugins (NUEVO — Post-MVP)

| # | Gap | Resolución |
|---|-----|------------|
| 447 | **Plugin compatibility checker** — verificar compatibilidad antes de instalar | "Este plugin requiere knitstudio v2.0+. Tienes v1.8". Test mode aislado. Conflict detection. Rollback automático |

## Gaps de Feedback de Usuarios (NUEVO — Fase 6)

| # | Gap | Resolución |
|---|-----|------------|
| 448 | **In-app feedback widget** — recolectar feedback de usuarios reales de la app generada | Widget flotante: 👍 👎 + comentario. Screenshot annotation. Dashboard: "78% satisfechos" |
| 449 | **Feedback → componente** — el feedback se vincula al componente específico | "Los usuarios reportaron problemas con el botón de pago". Enlace directo al componente en el builder |

## Gaps de Migración y Portabilidad (NUEVO — Fase 9)

| # | Gap | Resolución |
|---|-----|------------|
| 450 | **`knit migrate instance`** — mover proyecto completo entre instancias knitstudio | `knit export:instance --out=backup.zip`. `knit import:instance --from=backup.zip`. Incluye proyectos, usuarios, configs, plugins |

## Gaps de Seguridad y Acceso por Página (NUEVO — Fase 6)

| # | Gap | Resolución |
|---|-----|------------|
| 451 | **Page visibility** — pública, solo con enlace, protegida con contraseña, solo usuarios registrados | Selector de visibilidad por página. Auth integrado (login/signup). Roles: admin, client, team |
| 452 | **Auth providers integrados** — login con Auth0, Clerk, Supabase Auth en páginas generadas | Conectores de auth que funcionan tanto en el builder como en las páginas generadas |

## Gaps de Telemetría y Mejora Continua (NUEVO — Fase 9)

| # | Gap | Resolución |
|---|-----|------------|
| 453 | **Anonymous usage telemetry** — mejorar knitstudio con datos reales de uso (opt-in) | Features más usadas, abandonos, errores comunes, tiempo por tarea. Dashboard público. Sin datos personales |

## Gaps de Publicación (Fase 0-9)

| # | Gap | Resolución |
|---|-----|------------|
## Gaps de Micro-Experiencias (NUEVO — Fase 2)

| # | Gap | Resolución |
|---|-----|------------|
| 454 | **Toast Undo** — deshacer acciones desde el toast como Gmail | Toast "🗑️ GuestTable eliminada" con botón [Deshacer]. 5 segundos para hacer clic. Aparece solo en acciones destructivas |
| 455 | **Autosave status visible siempre** — indicador permanente en barra de estado | "💾 Guardado" (verde), "⏳ Guardando..." (amarillo), "⚠️ 3 cambios sin guardar" (rojo). Actualizado en tiempo real |
| 456 | **Contextual tips** — "Sabías que..." no intrusivos | Primera vez: "💡 Presiona Cmd+D para duplicar". Después de 3 usos: "💡 ¿Sabías que puedes guardar en Tu Toolbox?" |
| 457 | **What's New modal** — novedades visibles después de actualizar | Modal "🎉 What's New" al abrir post-actualización. Capturas + "Probar ahora". Solo si hay cambios importantes |
| 458 | **Focus mode** — ocultar todo excepto el canvas (F11-like) | Atajo "F". Oculta: toolbar, paneles, barra inferior, chat. Mouse al borde → "Exit focus" |

## Gaps de Edición y Productividad (NUEVO — Fase 2)

| # | Gap | Resolución |
|---|-----|------------|
| 459 | **Drag from desktop** — arrastrar archivos del sistema al canvas | Imagen → canvas. PDF → asset descargable. ZIP → descomprime assets. HTML → editor de código |
| 460 | **Paste from clipboard inteligente** — copiar de Figma/HTML/imagen y pegar en knitstudio | Copias Figma → "Detecté diseño Figma. ¿Importar?". Copias HTML → "¿Pegar como HTML o convertir a componentes?" |
| 461 | **Preview en nueva pestaña** — URL compartible de la página sin el builder | `preview.knitstudio.io/project/page`. Sin toolbars ni paneles. Auto-refresh al guardar. Protección opcional con contraseña |
| 462 | **Responsive drag handles** — cambiar tamaño del viewport arrastrando bordes | Handles en modo preview. Resolución mostrada arriba: "428×926". Presets: iPhone SE, iPad, Desktop. Ajuste automático |
| 463 | **Tab title dinámico** — nombre del proyecto y estado en la pestaña del navegador | "knitstudio — Mi App — Dashboard ⚠️". Favicon verde/rojo/gris según estado |
| 464 | **Multi-tab safety** — detectar proyecto abierto en otra pestaña y prevenir overwrite | Alerta: "Este proyecto ya está abierto en otra pestaña". Notificación de cambios. Conflict detection con confirmación |

## Gaps de Publicación (Fase 0-9)

| # | Gap | Resolución |
|---|-----|------------|
## Gaps de Personalización del Builder (NUEVO — Fase 2)

| # | Gap | Resolución |
|---|-----|------------|
| 465 | **Keyboard shortcut customization** — remapear atajos, presets Figma/Sketch/XD | Settings → Shortcuts → buscar → remapear. Presets: "Figma layout", "Sketch layout". Detección de conflictos. Export/import |
| 466 | **UI density preferences** — compacto, cómodo, personalizado por panel | Toggle "Compacto/Cómodo". Paneles angostos vs amplios. Mezcla personalizable por panel |
| 467 | **Code editor preferences** — font, ligaduras, line numbers, lint, Prettier | Font size, Fira Code/JetBrains Mono, ligaduras, line numbers, tab size, auto-complete, ESLint, Prettier on save |

## Gaps de Gestión Multi-Proyecto (NUEVO — Fase 0)

| # | Gap | Resolución |
|---|-----|------------|
| 468 | **Per-project builder version pinning** — congelar proyecto en versión específica del builder | Cada proyecto declara "compatible con vX.Y+". Upgrade opt-in. El builder corre múltiples versiones de runtime |
| 469 | **Cross-project dashboard** — métricas globales de todos los proyectos en una pantalla | Total proyectos, páginas, errores, inactivos, compartidos. Actividad reciente global. Export analytics |
| 470 | **Component analytics** — componentes más usados, no usados, más caros (render/bundle) | Top 10 componentes, no usados, más pesados. "Este componente está en 15 páginas" |

## Gaps de Onboarding y Descubrimiento (NUEVO — Fase 2)

| # | Gap | Resolución |
|---|-----|------------|
| 471 | **Onboarding checklist persistente** — próximos pasos visibles siempre en el dashboard | ☐ Crear proyecto ☐ Agregar página ☐ Arrastrar componente ☐ Conectar API ☐ Publicar. Se completa solo. Desaparece al terminar |
| 472 | **Progressive power user tips** — descubrimiento gradual basado en semanas de uso | Día 1: básicos. Semana 1: APIs. Mes 1: action flows. Mes 3: export RN. No intrusivo, contextual |

## Gaps de Feedback y Comunidad (NUEVO — Fase 9)

| # | Gap | Resolución |
|---|-----|------------|
| 473 | **Rate this update feedback** — feedback contextual sobre nuevas features después de usarlas | "¿Te resultó útil?" 1-5 + comentario. "No, porque..." → input de texto. Dashboard de respuestas |
| 474 | **Community hub integrado** — templates, showcases, ayuda sin salir del builder | Tab "Comunidad": templates populares, proyectos públicos, preguntas recientes del foro. "Comparte" tu proyecto |

## Gaps de Publicación (Fase 0-9)

| # | Gap | Resolución |
|---|-----|------------|
## Gaps de Ciclo de Vida del Proyecto (NUEVO — Fase 6)

| # | Gap | Resolución |
|---|-----|------------|
| 475 | **Project archive** — archivar proyectos sin borrar, auto-archive por inactividad | Sección "Archivados". Auto-sugerir archivar tras 90 días sin actividad. Filtros por estado. Búsqueda: `status:archived` |
| 476 | **Asset management** — cleanup de imágenes no usadas, storage usage, asset search | Detector de assets no usados. "50 imágenes no se usan ¿Eliminar?". Storage usage: "2.3/5GB". Asset groups por proyecto |
| 477 | **Seasonal / scheduled design changes** — programar cambios de diseño por fecha | "Tema Navidad: 1 dic - 6 ene". Auto-revert al terminar. Preview: "El 1 dic se verá así..." |

## Gaps de Salud del Proyecto (NUEVO — Fase 6)

| # | Gap | Resolución |
|---|-----|------------|
| 478 | **Component library health** — detectar componentes rotos, no usados, dependencias caídas | Health indicators: ✅ usado, ⚠️ sin uso 30 días, ❌ dependencia rota. Orphan detection. Dependency map |
| 479 | **Action flow complexity warnings** — alertar cuando un flow es muy complejo y sugerir refactor | Complexity score. "Dividir en 3 sub-flows". Visual complexity indicator en el editor |
| 480 | **Cross-project style drift detection** — detectar deriva de estilos entre proyectos | Style drift report. "5 proyectos usan #2563EB, 3 usan #1D4ED8. ¿Unificar?". Design system compliance check |
| 481 | **Cross-project component sync** — mantener componentes compartidos sincronizados entre proyectos | Linked component: compartido entre N proyectos. Sync status. Auto-sync opcional |

## Gaps de Equipos y Conocimiento (NUEVO — Fase 8)

| # | Gap | Resolución |
|---|-----|------------|
| 482 | **Team offboarding** — transferir proyectos y reportar impacto cuando alguien se va | Transfer ownership. User impact report: "Es owner de 3 proyectos". Offboarding checklist |
| 483 | **Knowledge transfer** — documentación auto-generada del proyecto + quién sabe qué | Project summary. Who knows what: "Juan editó 70%". README auto-generado. Screen recording opcional |
| 484 | **Macro recorder** — grabar, reproducir, compartir y programar acciones repetitivas | Record macro: secuencia de acciones. Play macro: 1 clic. Share con equipo. Schedule: ejecutar semanalmente |

## Gaps de Publicación (Fase 0-9)

| # | Gap | Resolución |
|---|-----|------------|
## Gaps de Integración con Ecosistema Dev (NUEVO — Fase 9)

| # | Gap | Resolución |
|---|-----|------------|
| 485 | **VS Code extension** — editar, previsualizar y publicar desde el IDE | Extension VS Code: navegar proyectos, editar componentes, preview, export. Comunicación via MCP |
| 486 | **Slack/Discord notifications** — notificar al equipo cuando alguien publica | Webhook out por proyecto. Eventos: page.published, page.error, member.added. Configurable por canal |
| 487 | **Jira/Linear integration** — crear issues desde el builder con contexto | Botón "Reportar bug en esta página" → crea issue en Jira/Linear con screenshot + logs |
| 488 | **Webhook out** — notificar a sistemas externos cuando algo pasa | Events: project.created, page.published, layout.changed, export.completed. POST a URL configurable con payload JSON |

## Gaps de Agencias y Multi-Tenant (NUEVO — Fase 9)

| # | Gap | Resolución |
|---|-----|------------|
| 489 | **Client portal** — cada cliente ve SOLO sus proyectos, con la marca de la agencia | Multi-tenant con branding por tenant (logo, colores, dominio). Sin acceso a otros proyectos |
| 490 | **White-label completo** — el cliente no ve "Powered by knitstudio" | Opción de ocultar marca knitstudio. Dominio personalizado. Branding completo del builder |
| 491 | **Facturación por proyecto/cliente** — cobrar a clientes desde knitstudio | Integración Stripe para cobrar por proyecto. Reportes de uso por cliente. Invoices |
| 492 | **Time tracking por proyecto** — registrar horas editando | Timer en el builder. Reporte: "20h en Proyecto Cliente A". Export para facturación |

## Gaps de Export a Plataformas Específicas (NUEVO — Fase 6)

| # | Gap | Resolución |
|---|-----|------------|
| 493 | **Export a Shopify** — liquid templates compatibles con Shopify Theme Store | Componentes knitstudio → Shopify sections/snippets. Soporte para Shopify metafields |
| 494 | **Export a WordPress** — Gutenberg blocks compatibles | Componentes knitstudio → WordPress blocks. theme.json sync. Shortcode fallback |
| 495 | **Export a Wix** — compatibilidad con Wix Editor | Export a Wix ADI format. Limitaciones documentadas |
| 496 | **Export a email HTML** — newsletters que funcionen en Outlook/Gmail | Tablas inline, sin JS, sin CSS moderno. Test en email clients. Preview responsivo |
| 497 | **Export a PDF/print** — flyers, brochures, documentación | Paginación automática. Print CSS. Export a PDF con knipstudio como generador de documentos |

## Gaps de CMS Headless (NUEVO — Fase 6)

| # | Gap | Resolución |
|---|-----|------------|
| 498 | **API headless REST** — servir layouts como JSON vía API | `GET /api/v1/pages/{id}` → layout JSON completo. API versionada. API Keys para acceso |
| 499 | **Webhook out por página** — notificar a sistemas externos cuando una página se publica/actualiza | "Cuando esta página se publique, llamar a mi API". Payload: layout JSON + metadata |
| 500 | **Preview embed JS SDK** — cargar página de knitstudio dentro de otra web | `<script src="https://cdn.knitstudio.io/embed.js" data-page="xxx">`. Carga la página en cualquier sitio |
| 501 | **Personalización server-side** — servir diferente layout según usuario/segmento | `GET /api/v1/pages/{id}?user=123` → layout personalizado por reglas. A/B testing server-side |

## Gaps de Cumplimiento Enterprise (NUEVO — Fase 9)

| # | Gap | Resolución |
|---|-----|------------|
| 502 | **SOC 2 Type II report** — auditoría de seguridad para vender a empresas | Obtener SOC 2. Publicar reporte bajo NDA. Costo estimado: $30-50k/año |
| 503 | **Penetration testing anual** — auditoría de seguridad externa | Contratar pentest. Publicar resultados. Timeline: Q4 cada año |
| 504 | **Data Processing Agreement (DPA)** — requerido por GDPR para clientes enterprise | DPA firmable online. Basado en cláusulas contractuales estándar de la UE |
| 505 | **Sub-processors list** — qué servicios tocan los datos del cliente | Lista actualizada: AWS, OpenAI, Stripe, Supabase, Sentry, PostHog. Notificar 30 días antes de cambios |
| 506 | **Data residency** — garantizar que los datos no salen de una región | Elegir región al crear instancia: UE, US, Asia. Datos almacenados solo en esa región |
| 507 | **SLA con compensación** — acuerdo de nivel de servicio con penalización | 99.9% uptime para Pro, 99.99% para Enterprise. Créditos si no se cumple |
| 508 | **Enterprise contract** — contrato con cláusulas de confidencialidad, indemnización | Template de contrato enterprise. Aprobación legal requerida antes de firmar |

## Gaps de i18n Completo (NUEVO — Fase 3)

| # | Gap | Resolución |
|---|-----|------------|
| 509 | **Translation memory** — reutilizar traducciones entre proyectos | Almacén de traducciones por proyecto/equipo. Sugerencias automáticas al traducir |
| 510 | **Translation workflow** — asignar traductores, revisar, aprobar | Roles: translator, reviewer, approver. Estados: draft → review → approved → published |
| 511 | **Pseudo-localization** — probar cómo se ve la app con texto largo antes de traducir | "[Ŧħīş ƒş ŧēşŧ ŧēxŧ]" simula caracteres acentuados y texto expandido. Preview antes de traducir |
| 512 | **Language fallback** — si no hay traducción al árabe, mostrar en inglés | Cadena de fallback: locale → locale_parent → default_locale → key. Configurable por proyecto |
| 513 | **Pluralization** — "1 item" vs "3 items" automático por idioma | ICU MessageFormat. Soporte para plural rules de cada idioma (1, few, many, other) |

## Gaps de Export para Diseñadores (NUEVO — Fase 6)

| # | Gap | Resolución |
|---|-----|------------|
| 514 | **Export a Figma** — design tokens + componentes como figma nodes | Via Figma REST API. Colores → paint styles. Tipografía → text styles. Componentes → figma components |
| 515 | **Export a Sketch** — diseño editable en Sketch | Via Sketch plugin o formato .sketch. Limitaciones documentadas |
| 516 | **Export a PDF (spec sheet)** — especificaciones para developers | Medidas, colores, tipografía, espaciados. Formato A4/Letter. Export por página o proyecto |
| 517 | **Export a PNG** — captura de la página o componente | PNG a resolución personalizable (1x, 2x, 3x). Background transparente o color sólido |
| 518 | **Export a ZIP** — proyecto completo para archivar o compartir | ZIP con: HTML + CSS + JS + assets + knit.json. Portable. Sin dependencia de knitstudio |

## Gaps de Plataforma Educativa (NUEVO — Fase 9)

| # | Gap | Resolución |
|---|-----|------------|
| 519 | **Tutorial interactivo** — "sigue estos pasos" dentro del builder | Overlay guiado que resalta elementos y guía al usuario. Como Figma: "Haz clic aquí, luego aquí" |
| 520 | **Challenges** — "Crea tu primera landing page en 5 minutos" | Desafíos con tiempo. Feedback automático. Leaderboard para equipos |
| 521 | **Certificación** — "knitstudio Certified Designer" | Examen online. Progreso guardado. Badge descargable. LinkedIn integration |
| 522 | **Learning paths** — "De 0 a experto en action flows" | Lecciones en secuencia. Progreso visible. Proyectos prácticos por módulo |
| 523 | **Playground sandbox** — proyecto dummy precargado para explorar sin registro | "Try it now" sin crear cuenta. Proyecto ejemplo con datos ficticios. 30 minutos de uso |

## Gaps de Pricing Formal (NUEVO — Fase 9)

| # | Gap | Resolución |
|---|-----|------------|
| 524 | **Pricing table formal** — planes con límites concretos | Free ($0, 3 proyectos, 100 AI req), Starter ($19, 15, 1k), Pro ($49, 50, 10k), Team ($99, ilimitado, 50k), Enterprise (custom) |
| 525 | **Fair usage policy** — qué pasa si excedes los límites del plan | Soft limit: notificación. Hard limit: bloqueo temporal. Upgrade para más. Sin cargos sorpresa |

## Gaps de Modo Noche y Bienestar (NUEVO — Fase 2)

| # | Gap | Resolución |
|---|-----|------------|
| 526 | **Quiet hours** — no enviar notificaciones/emails entre 10pm y 8am | Configurable en settings. Silence: Slack, email, push. Urgent breaks silence (publication error) |
| 527 | **Do Not Disturb programado** — silenciar todo durante horas específicas | DND schedule: "No molestar: 10pm-8am y fines de semana". Opcional: "excepción para errores críticos" |
| 528 | **Modo noche precavido** — confirmaciones extras después de las 11pm | "¿Estás seguro de publicar? Son las 2am." Doble confirmación en acciones destructivas. Sugerencia: "¿Mejor programar para mañana?" |
| 529 | **Focus mode automático** — después de 30 min sin pausas, sugerir descanso | Detector de actividad continua. "Has estado editando 30 min seguidos. ¿Quieres activar focus mode o tomar un descanso?" |

## Gaps de Publicación (Fase 0-9)

| # | Gap | Resolución |
|---|-----|------------|
## Gaps de Rendimiento del Output Generado (NUEVO — Fase 6)

| # | Gap | Resolución |
|---|-----|------------|
| 530 | **Performance budget para apps** — máximo 200KB, 90+ Lighthouse al exportar | Budget configurable por proyecto. CI bloquea si excede. Reporte post-export |
| 531 | **Auto-minify CSS/JS** — minificar automáticamente al exportar | esbuild/terser para JS. cssnano/lightningcss para CSS. Inline sourcemaps en dev |
| 532 | **Lazy loading automático** — imágenes y componentes grandes cargan lazy | `loading="lazy"` en imágenes. `IntersectionObserver` para componentes pesados. Threshold configurable |
| 533 | **Critical CSS inline** — CSS necesario para el primer renderizado, inline en el HTML | PurgeCSS para extraer CSS crítico. Inline en `<head>`. Diferir el resto |
| 534 | **Preconnect/preload automático** — recursos externos con hints | `<link rel="preconnect">` para Google Fonts, APIs. `<link rel="preload">` para assets críticos |
| 535 | **Resource hints** — prefetch, preload generados automáticamente | `prefetch` para páginas siguientes. `preload` para recursos críticos. `prerender` opcional |
| 536 | **Bundle analyzer integrado** — "tu página pesa 1.2MB, puedes reducirla 40%" | Panel en el builder. Desglose por componente, librería, asset. Sugerencias de optimización |
| 537 | **Performance regression alert** — "esta versión es 200ms más lenta que la anterior" | Comparación automática entre versiones. Umbral configurable. Alerta antes de publicar |

## Gaps de Seguridad del Output Generado (NUEVO — Fase 6)

| # | Gap | Resolución |
|---|-----|------------|
| 538 | **XSS protection automático** — escapado de variables en el output | Output encoding por defecto. Context-aware escaping (HTML, JS, CSS, URL). Configurable pero recomendado on |
| 539 | **CSRF tokens en formularios** — protección automática en forms generados | Token CSRF generado por request. Validación automática en action flows. Integración con backend del proyecto |
| 540 | **Content-Security-Policy generada** — CSP automática para la app | Generar CSP basada en recursos usados en la página. Modo report-only inicial. Sugerir política estricta |
| 541 | **SQL injection protection** — si la app conecta a DB, parámetros sanitizados | Prepared statements forzados (si el backend lo soporta). Input validation + sanitization |
| 542 | **HTTPS redirect automático** — redirigir HTTP → HTTPS | Redirect 301 configurable. HSTS header con max-age. Preload list opcional |
| 543 | **Security headers en output** — HSTS, X-Frame-Options, X-Content-Type-Options, etc | Headers generados automáticamente en el deploy. Configurables por proyecto. Modo estricto recomendado |
| 544 | **Dependabot para apps generadas** — monitorear vulnerabilidades en dependencias | Dependabot integrado en proyectos exportados. Alertas de seguridad. Sugerencias de actualización |

## Gaps de Self-Hosted Profundo (NUEVO — Fase 0)

| # | Gap | Resolución |
|---|-----|------------|
| 545 | **knit health** — diagnóstico completo del sistema | `knit health` → check: BD conectada, Redis respondiendo, disco disponible, memoria, versión, uptime |
| 546 | **knit logs** — ver logs del builder, api, mcp en tiempo real | `knit logs --service=api --tail=100`. Filtro por nivel (error, warn, info). Export a archivo |
| 547 | **knit stats** — uso de CPU, RAM, disco, BD | `knit stats` → dashboard en terminal. Tamaño de BD, conexiones activas, memoria usada |
| 548 | **knit update** — actualizar knitstudio a la última versión con 1 comando | `knit update` → backup automático → descargar nueva imagen → migrar BD → reiniciar servicios |
| 549 | **knit backup programado** — backups automáticos diarios | Backup automático configurable en `.env`. Rotación: 7 diarios, 4 semanales, 12 mensuales |
| 550 | **knit restore con verificación** — restaurar y validar que todo funcione | `knit restore --from=backup.zip` → restaurar BD + assets → health check → "✅ Restaurado" |
| 551 | **knit reset** — resetear a configuración de fábrica sin perder proyectos | `knit reset --keep-projects`. Resetear config + usuarios + plugins. Conservar layouts |
| 552 | **Admin dashboard web** — UI para gestionar self-hosted | `https://knitstudio.local/admin`. Usuarios, recursos, logs, backups, actualizaciones. Acceso solo admin |

## Gaps de AI Transparency (NUEVO — Fase 7)

| # | Gap | Resolución |
|---|-----|------------|
| 553 | **AI-generated watermark** — marcar componentes generados por AI | Badge "🤖 AI-generated" en componentes. Tooltip: "Este componente fue generado por AI el 15/05/2026" |
| 554 | **Confidence score visible** — mostrar qué tan segura está la AI | "🎯 85% confianza". Umbral configurable: <70% requiere revisión humana obligatoria |
| 555 | **Human review required** — bloquear publicación hasta que un humano revise | Flag por página: "Contiene contenido generado por AI sin revisar. Revisar antes de publicar" |
| 556 | **AI audit trail** — qué generó la AI vs qué editó un humano | Log por componente: cambios AI vs cambios manuales. Filtro: "mostrar solo cambios hechos por AI" |
| 557 | **Bias detection** — detectar contenido sesgado generado por AI | Escaneo de contenido generado: género, raza, edad, religión. Alerta si detecta patrones sesgados |
| 558 | **AI usage report** — cuánto AI usaste, qué generó, cuánto costó | Dashboard: requests de AI, tokens usados, costo estimado, componentes generados por mes |

## Gaps de Monetización de Apps (NUEVO — Fase 6)

| # | Gap | Resolución |
|---|-----|------------|
| 559 | **Stripe Checkout component** — cobrar por acceso a la app | Componente "Stripe Checkout": precio, producto, success URL, cancel URL. Webhook de confirmación |
| 560 | **Paywall component** — mostrar contenido solo si el usuario pagó | Componente "Paywall": contenido bloqueado, upsell, free trial management. Integración con Stripe/LemonSqueezy |
| 561 | **Subscription management** — planes de precios, cancelaciones | Componente "Pricing Table" + "Account Dashboard". Upgrade, downgrade, cancel. Emails transaccionales |
| 562 | **Metered billing** — cobrar por uso (ej: $0.01 por request) | Componente "Usage Meter". Cobro por API call, storage, users. Alertas de límite |
| 563 | **License key generation** — generar keys para apps vendidas como producto | Generación de license keys. Validación offline/online. Revocación. Dashboard de licencias |

## Gaps de Testing del Output Generado (NUEVO — Fase 6)

| # | Gap | Resolución |
|---|-----|------------|
| 564 | **Component unit test** — test automático generado al exportar | Vitest test por componente: "renderiza sin error", "props se aplican correctamente", "eventos funcionan" |
| 565 | **Integration test del action flow** — test del flujo principal | Playwright test: "click → API call → UI actualizada". Datos mock. Assertions automáticas |
| 566 | **Visual regression test** — comparar antes/después de cambios | Percy/Chromatic: captura del diseño anterior vs nuevo. Diff automático. Aprobar o rechazar |
| 567 | **Link checker** — detectar links rotos en la página | Crawl automático de todas las páginas. Reporte: links rotos, redirects, timeouts |
| 568 | **Form validation test** — formulario funciona con datos válidos e inválidos | Test automático: submit con datos válidos → success. Submit con datos inválidos → error mostrado |
| 569 | **Responsive test** — la app se ve bien en mobile, tablet, desktop | Capturas automáticas en 3 resoluciones. Diff visual entre breakpoints. Alertas de contenido oculto |

## Gaps de Offline-First para Apps (NUEVO — Fase 6)

| # | Gap | Resolución |
|---|-----|------------|
| 570 | **Service Worker generado** — caché offline para la app | SW generado automáticamente. Estrategia: stale-while-revalidate para páginas, cache-first para assets |
| 571 | **Offline fallback UI** — mostrar "Estás offline" en lugar de error | Componente "OfflineBanner". Se muestra automáticamente cuando navigator.onLine = false |
| 572 | **Data sync al reconectar** — si la app recolecta datos offline, sincronizar al volver | IndexedDB local + sync queue. Reintentar con backoff exponencial. Conflicto: last-write-wins |
| 573 | **Stale-while-revalidate** — mostrar datos cacheados mientras se actualizan | Mostrar datos de caché inmediatamente. Actualizar en segundo plano. Actualizar UI cuando llegue la respuesta |
| 574 | **Optimistic UI** — mostrar éxito antes de confirmar con la API | Actualizar UI inmediatamente. Revertir si la API falla. Toast "✅ Guardado" / "❌ Error, reintentando" |

## Gaps de Modo Demo para Apps (NUEVO — Fase 6)

| # | Gap | Resolución |
|---|-----|------------|
| 575 | **Demo mode** — datos ficticios, sin permisos de escritura | Flag "demo: true" en la app. Reemplazar APIs reales con mock data. Deshabilitar POST/PUT/DELETE |
| 576 | **Time-bomb** — la demo expira después de X horas | Cuenta regresiva visible. Al expirar: mostrar "Demo expirada. Contrata el plan completo". Configurable |
| 577 | **Demo reset** — cada visitante ve datos frescos | Reset automático por sesión. Datos generados aleatoriamente. Sin persistencia entre sesiones |
| 578 | **Watermark demo** — marca de agua visible | "🔷 Demo" semitransparente superpuesto. No bloquea funcionalidad pero es visible. Ocultable en producción |

## Gaps de Seguridad para Apps (NUEVO — Fase 6)

| # | Gap | Resolución |
|---|-----|------------|
| 579 | **Dependency check** — detectar vulnerabilidades en dependencias al exportar | `npm audit` automático en el bundle. Reporte: "React 18.2.0 tiene CVE-2026-1234. Actualizar a 19.0.0" |
| 580 | **Auto-update recomendado** — sugerir actualización de dependencias vulnerables | "Hay 3 dependencias con vulnerabilidades conocidas. ¿Actualizar ahora?" | 
| 581 | **SBOM (Software Bill of Materials)** — lista de todas las dependencias de la app | SBOM generado en formato SPDX o CycloneDX. Adjunto al export. Para compliance enterprise |
| 582 | **Security advisory** — notificar al usuario cuando una dependencia tiene una CVE | Notificación in-app + email: "React 18.2.0 tiene una vulnerabilidad crítica. Actualiza tu app." |

## Gaps de Retrocompatibilidad (NUEVO — Fase 8)

| # | Gap | Resolución |
|---|-----|------------|
| 583 | **Component version pinning** — congelar versión del componente por proyecto | Cada componente declara `version`. Proyecto puede pin "Button@v1" o "Button@latest". Default: latest |
| 584 | **Deprecation timeline visible** — mostrar cuándo dejará de funcionar un componente | "Button@v1 dejará de funcionar el 1/1/2027". Badge "⚠️ Deprecated" en componentes obsoletos |
| 585 | **Auto-migration** — knitstudio migra automáticamente componentes v1 a v2 | `knit migrate` → detecta componentes deprecados → migra automáticamente → diff → confirmar |
| 586 | **Compatibility report** — cuántos proyectos usan componentes que serán deprecados | Reporte global: "12 proyectos usan Button@v1. 3 usan Table@v1. Migración estimada: 2 horas" |

## Gaps de Publicación (Fase 0-9)

| # | Gap | Resolución |
|---|-----|------------|
## Gaps de Perfiles de Usuario No Considerados (NUEVO — Fase 2)

| # | Gap | Resolución |
|---|-----|------------|
| 587 | **Usuario con discapacidad visual** — builder operable con screen reader, componentes generados a11y desde inicio | ARIA labels en todos los controles. Modo "high contrast". Skip to content. Compatible con NVDA/JAWS |
| 588 | **Usuario con movilidad reducida** — 100% keyboard, voice control, switch device | Tab order lógico, focus indicators visibles, `aria-keyshortcuts`. Voice input para comandos básicos |
| 589 | **Usuario mayor (60+)** — fuente grande, menos opciones, alto contraste | "Modo sencillo extremo": 3 botones. Tamaño de fuente +20%. Contraste 7:1 mínimo |
| 590 | **Niño/adolescente (14-18)** — contenido educativo, supervisión parental, proyectos escolares | Templates: presentación, informe, proyecto ciencia. Parent dashboard. COPPA compliance |
| 591 | **Usuario baja alfabetización digital** — sin jerga técnica, iconos+texto, video tutoriales | "Modo asistente": un paso a la vez. Sin términos técnicos. Iconos siempre acompañados de texto |
| 592 | **Usuario internet lento** — builder funcional con 100kbps | Modo "bajo consumo": desactivar preview en vivo, reducir requests, comprimir assets. Offline-first builder |
| 593 | **Usuario no hablante EN/ES** — interfaz en FR, DE, PT, JP, CN, AR | i18n extendido: mínimo 8 idiomas. Community translations via Crowdin. Documentación en esos idiomas |
| 594 | **Usuario con TDAH/déficit de atención** — modo sin distracciones, tareas cortas | "Modo foco extremo": una tarea a la vez. Pomodoro timer integrado. Progreso visible. Sonidos ambientales opcionales |

## Gaps de Demo del Builder (NUEVO — Fase 9)

| # | Gap | Resolución |
|---|-----|------------|
| 595 | **Demo rápida** — recorrido de 60 segundos por las features principales | Video interactivo sin registro. "Prueba knitstudio en 60 segundos" en la landing page |
| 596 | **Interactive tour** — el visitante puede probar sin registrarse | Sandbox completo sin registro. 30 minutos de uso. Proyecto precargado. Sin necesidad de email |
| 597 | **Built with knitstudio gallery** — showcase de proyectos reales | Galería pública con filtros. "Inspírate con lo que otros crearon". Enlace para enviar tu proyecto |
| 598 | **Compare plans interactivo** — comparación visual de features por plan | Tabla interactiva. Destacar "más popular". Calcular costo según necesidades (proyectos, miembros, AI) |
| 599 | **Pricing calculator** — cuánto costaría según necesidades reales | Selectores: "¿Cuántos proyectos? ¿Cuántos miembros? ¿Necesitas AI?". Precio estimado en vivo |

## Gaps de Privacidad para Usuarios Finales (NUEVO — Fase 6)

| # | Gap | Resolución |
|---|-----|------------|
| 600 | **Privacy policy generator** — genera política de privacidad para la app basada en qué datos recolecta | Analiza la app: formularios, cookies, tracking, emails. Genera texto legal. Editable por el usuario |
| 601 | **Terms of Service generator** — genera términos de servicio para la app | Basado en tipo de app (SaaS, landing page, ecommerce). Templates legales. Aceptación requerida |
| 602 | **Cookie consent banner** — configurable por región | GDPR (UE), CCPA (California), LGPD (Brasil). Diseño personalizable. Auto-detección de región del usuario |
| 603 | **Data deletion request** — formulario para que usuarios soliciten borrar sus datos | Formulario auto-generado. Proceso: request → verificación → ejecución → confirmación. Log de cumplimiento |
| 604 | **Data portability** — exportar mis datos de la app en JSON | Botón "Descargar mis datos". JSON estructurado con toda la información del usuario. GDPR compliant |
| 605 | **COPPA compliance** — protección para apps que recolectan datos de menores de 13 años | Age gate al registro. Consentimiento parental requerido. Datos de menores con protección especial |

## Gaps de SEO para Apps Generadas (NUEVO — Fase 6)

| # | Gap | Resolución |
|---|-----|------------|
| 606 | **SEO audit automático** — puntuación SEO antes de publicar | "Tu página tiene 6/10 en SEO". Recomendaciones específicas con auto-fix cuando sea posible |
| 607 | **Meta/OG tags auto-generados** — title, description, OG tags desde el contenido | Generados desde el contenido de la página. Editables manualmente. Preview en Google/Facebook/Twitter |
| 608 | **Sitemap.xml auto-generado** — todas las páginas del proyecto | Generado automáticamente al publicar. Actualizado cuando se agregan/eliminan páginas. Enviado a Google |
| 609 | **Robots.txt configurable** — control de indexación por página | Editor visual de robots.txt. Por defecto: permitir todo. Opción: bloquear páginas específicas |
| 610 | **Schema.org structured data** — Article, Product, Event, Organization, etc | Editor visual de JSON-LD. Sugerencias según tipo de página. Preview en Google Rich Results |
| 611 | **Core Web Vitals prediction** — predecir rendimiento en móvil antes de publicar | Basado en: peso, recursos, imágenes. "Tu página cargará en 1.2s en móvil (p75)". Sugerencias de mejora |

## Gaps de AI Local/Privado (NUEVO — Fase 7)

| # | Gap | Resolución |
|---|-----|------------|
| 612 | **Ollama integration** — modelos open-source locales | Conector nativo. Auto-detecta ollama en localhost. Selector de modelos: llama3, mistral, codellama |
| 613 | **LM Studio integration** — modelos descargados localmente | API compatible con OpenAI. Auto-detecta servidor local. Modelos disponibles en la máquina del usuario |
| 614 | **vLLM / TGI** — modelos propios o fine-tuned | Conector configurable: URL + API key. Soporte para cualquier servidor compatible con OpenAI API |
| 615 | **Azure OpenAI** — para empresas en Azure | Conector nativo: endpoint + key + deployment name. Auth con Azure AD. Content filtering configurable |
| 616 | **AWS Bedrock** — para empresas en AWS | Conector nativo: access key + secret + region. Modelos: Claude, Llama, Mistral via Bedrock. IAM roles |
| 617 | **GCP Vertex AI** — para empresas en GCP | Conector nativo: service account + project + location. Modelos: Gemini, Claude, Llama via Vertex |

## Gaps de Internal Developer Platform (NUEVO — Fase 9)

| # | Gap | Resolución |
|---|-----|------------|
| 618 | **Backstage integration** — plugin para Backstage (Spotify) | Backstage plugin: catalog de proyectos knitstudio, self-service, docs. Publicar en Backstage Marketplace |
| 619 | **Port/Guides integration** — plataformas internas de desarrollo | API REST compatible. Webhooks para eventos. Catálogo de servicios sincronizado |
| 620 | **Custom API para IDP** — API específica para plataformas internas | Endpoints: proyectos, páginas, deploys, usuarios. Rate limits enterprise. API keys por equipo |
| 621 | **SSO enterprise reforzado** — SAML, LDAP, OIDC con configuración self-service | Setup wizard: "Conectar con Azure AD", "Conectar con Okta". Test connection. Group sync automático |

## Gaps de User Research (NUEVO — Fase 6)

| # | Gap | Resolución |
|---|-----|------------|
| 622 | **Modo investigación** — reclutar usuarios para probar tu app | Invitar beta testers desde el builder. Segmentación por perfil. Consentimiento de grabación |
| 623 | **Session recording** — grabar cómo usan los usuarios la app | Grabación de clicks, scroll, navegación. Reproducción tipo "video". Sin grabar datos sensibles (passwords) |
| 624 | **Click heatmaps** — dónde hacen clic, dónde se quedan trabados | Mapa de calor superpuesto en la página. Top áreas de clic. Áreas sin clic (oportunidades) |
| 625 | **A/B testing visual** — comparar dos versiones del mismo diseño | Crear variante B desde el builder. Dividir tráfico 50/50. Métricas: clicks, conversión, tiempo en página |
| 626 | **Survey/poll component** — preguntar a usuarios dentro de la app | Componente "Survey". Tipos: NPS, CSAT, CES, pregunta abierta. Resultados en dashboard del builder |

## Gaps de Costos y Proyecciones (NUEVO — Fase 6)

| # | Gap | Resolución |
|---|-----|------------|
| 627 | **Cost calculator** — cuánto cuesta mantener la app | "Tu app costará ~$47/mes en hosting + APIs". Desglose: hosting, AI, storage, bandwidth |
| 628 | **Traffic estimator** — proyección de costos según tráfico | "Si tienes 10k visitas/mes, necesitarás plan Pro (~$49/mes)". Escalabilidad vertical estimada |
| 629 | **Revenue projection** — ingreso potencial según modelo de negocio | "Con 5% de conversión y $29/mes, ingresarías ~$14,500/mes". Basado en tipo de app y precio |
| 630 | **Break-even analysis** — cuántos clientes necesitas para cubrir costos | "Necesitas 47 clientes a $29/mes para cubrir costos de $1,363/mes". Calculadora interactiva |

## Gaps de Formatos de Intercambio (NUEVO — Fase 6)

| # | Gap | Resolución |
|---|-----|------------|
| 631 | **Export a PDF rellenable** — formularios con campos editables | `knit export --format=pdf-form`. Campos de texto, checkboxes, selects. Acrobat compatible |
| 632 | **Export a CSV/XLSX** — datos de tablas del builder | Exportar datos de tablas, formularios, colecciones. UTF-8. Formato Excel compatible |
| 633 | **Export a Markdown** — documentación del proyecto | README.md + docs/ generados automáticamente. Para incluir en el repo del proyecto |
| 634 | **Export a JSON Schema** — schema de datos del proyecto | Schema de formularios, APIs, colecciones. Para validación externa. Integración con TypeScript |
| 635 | **Export a OpenAPI/Swagger** — API specs desde los action flows | Endpoints detectados automáticamente. Paths, methods, request/response schemas. Documentación interactiva |

## Gaps de Modo Legacy para Apps (NUEVO — Fase 6)

| # | Gap | Resolución |
|---|-----|------------|
| 636 | **Modo legacy** — output compatible con IE11, Safari 12, Firefox 68 | Target browser selector. CSS prefixer automático. Polyfill injection. Transpile a ES5 |
| 637 | **Polyfill injection automático** — según target browser | Polyfill.io o core-js. Solo los polyfills necesarios para el target. Feature detection vs browser detection |
| 638 | **Graceful degradation** — la app funciona (fea pero funciona) en navegadores viejos | CSS feature queries (@supports). JS feature detection. Mensaje de upgrade opcional |
| 639 | **Browser matrix testing** — screenshots automáticos en múltiples navegadores | Playwright + BrowserStack. Capturas en Chrome, Firefox, Safari, Edge, IE11. Reporte de diferencias |

## Gaps de Publicación (Fase 0-9)

| # | Gap | Resolución |
|---|-----|------------|
## Gaps de OSC / Control de Dispositivos (NUEVO — Post-MVP)

| # | Gap | Resolución |
|---|-----|------------|
| 640 | **OSC Protocol Bridge** — conectar interfaces diseñadas en knitstudio con dispositivos OSC | OSC Bridge Node.js: WebSocket → UDP → dispositivo OSC. Auto-descubrimiento de dispositivos en red local |
| 641 | **Componentes OSC** — faders, knobs, buttons, XY pads, color pickers, meters, waveforms | 10+ componentes OSC con mapeo visual a paths OSC: path, type, min, max, response. Feedback bi-directional |
| 642 | **Templates OSC** — mixer, DJ controller, lighting console, Ableton Live, Resolume, EQ, monitor mix | 7+ templates pre-diseñados. Configuración de IP/puerto por template. Testing en vivo |
| 643 | **OSC Discovery** — detectar dispositivos OSC en la red local automáticamente | Escaneo UDP de puertos comunes (8000, 9000, 10000). Auto-configurar IP y puerto. Health check |

## Gaps de Publicación (Fase 0-9)

| # | Gap | Resolución |
|---|-----|------------|
## Gaps de Protocolos Hardware (NUEVO — Post-MVP)

| # | Gap | Resolución |
|---|-----|------------|
| 644 | **MIDI** — control de instrumentos musicales, DAWs, controladores | Bridge WebSocket → MIDI via WebMIDI API o Node.js. Componentes: Piano Roll, Note Grid, MIDI CC knobs, Transport |
| 645 | **DMX512** — iluminación profesional, escenarios, conciertos | Bridge WebSocket → Art-Net / sACN (DMX over IP). Componentes: Channel faders, Color mixer, Strobe, Scene selector |
| 646 | **MQTT** — IoT, smart home, sensores, automatización | Bridge WebSocket → MQTT broker → dispositivos. Componentes: Switch, Thermostat, Gauge, Timeline, Dashboard |
| 647 | **Modbus** — automatización industrial, PLCs, sensores | Bridge WebSocket → Modbus TCP → dispositivos. Componentes: Register reader, Coil control, Alarm panel |
| 648 | **Bluetooth/BLE** — wearables, beacons, sensores cercanos | Bridge Web Bluetooth API (navegador) o Node.js. Componentes: Device list, Signal strength, Characteristic RW |
| 649 | **Serial/USB** — Arduino, Raspberry Pi, hardware custom | Bridge Web Serial API (navegador) o Node.js. Componentes: Serial monitor, Pin control, PWM slider, Analog reader |

## Gaps de Developer Tools (NUEVO — Post-MVP)

| # | Gap | Resolución |
|---|-----|------------|
| 650 | **Browser extension** — inspector de knitstudio como React DevTools | Extensión Chrome/Firefox: inspeccionar componentes knitstudio en páginas, ver layout JSON en vivo, editar props |
| 651 | **Desktop app** — Electron/Tauri para trabajo offline | App nativa con menú, notificaciones, taskbar. Integración con sistema de archivos local. Sin navegador |
| 652 | **API client libraries** — SDKs en Python, Go, Rust | knitstudio-py, knitstudio-go, knitstudio-rs. Mismas features que el SDK JS/TS |
| 653 | **CLI power tools** — knit diff, knit lint, knit validate | `knit diff`: comparar versiones. `knit lint`: validar reglas del equipo. `knit validate`: action flows localmente |
| 654 | **Terraform provider** — gestionar proyectos como infraestructura | `knitstudio_project`, `knitstudio_page`, `knitstudio_deploy`. Proyectos declarativos como código |
| 655 | **Docker SDK** — interactuar con knitstudio desde contenedores | API client dentro de Docker. Health checks para orquestación. Sidecar container para CI/CD |

## Gaps de Business Operations (NUEVO — Fase 9)

| # | Gap | Resolución |
|---|-----|------------|
| 656 | **Invoicing/billing management** — facturas automáticas, historial de pagos, cambio de plan pro-rata | Facturas mensuales auto-generadas. Portal de pagos. Historial descargable en PDF/CSV |
| 657 | **Team cost allocation** — cuánto gasta cada equipo/proyecto | Reportes de uso por departamento. Budget alerts. Dashboard de costos por proyecto |
| 658 | **Usage analytics for billing** — AI requests, storage, API calls vs límite | Medidores en vivo. Alertas al 80/90/100% del límite. Upgrade sugerido automáticamente |
| 659 | **Audit reports for compliance** — reportes listos para SOC 2 | Export de logs de acceso. Certificación de datos. Reporte de cumplimiento descargable |
| 660 | **Vendor risk assessment** — documentación para procurement | Security questionnaire autocompletado. Pen test results, SOC 2 report, DPA en portal |

## Gaps de Community Ecosystem (NUEVO — Fase 9)

| # | Gap | Resolución |
|---|-----|------------|
| 661 | **Feature voting** — usuarios votan qué construir | Tablero público. "Upvote" las features que quieres. Roadmap priorizado por votos |
| 662 | **Community templates marketplace** — usuarios comparten/venden templates | Ratings, reviews, categorías. Revenue share 70/30. Verified badge. Preview antes de comprar |
| 663 | **Community components marketplace** — componentes custom de la comunidad | Plugin equivalents for components. Verified badge. Compatibilidad chequeada automáticamente |
| 664 | **Knowledge base + forums integrados** — help center searchable | Community answers con votos. "Was this helpful?" en cada artículo. Integración con el builder |
| 665 | **In-builder hackathons/challenges** — competencias semanales | "Crea la mejor landing page esta semana". Jueces de la comunidad. Premios: créditos, swag, badges |

## Gaps de Advanced Education (NUEVO — Fase 9)

| # | Gap | Resolución |
|---|-----|------------|
| 666 | **Knitstudio Academy** — plataforma de aprendizaje formal | Cursos: Principiante → Avanzado → Experto. Videos, ejercicios, proyectos, quizzes. Certificación por nivel |
| 667 | **Live workshops/webinars** — sesiones semanales en vivo | Q&A en tiempo real. Grabaciones disponibles. Calendario visible desde el builder |
| 668 | **Office hours** — soporte 1:1 para usuarios Pro+ | 30 min/semana con experto. Review de proyecto. Optimización y best practices |
| 669 | **Case studies / success stories** — "cómo X empresa construyó Y" | Tiempo ahorrado, ROI, lecciones. Inspiración para nuevos usuarios. Submit your story |

## Gaps de Disaster Recovery (NUEVO — Fase 9)

| # | Gap | Resolución |
|---|-----|------------|
| 670 | **Multi-region failover** — si una región cae, otra toma el control | Active-passive: EU primaria, US secundaria. DNS failover automático. RTO <5min, RPO <1min |
| 671 | **Database replication** — PostgreSQL en cluster | Primary + replicas de lectura. Auto-failover. Sin pérdida de datos. Reparación automática |
| 672 | **Backup strategy documentada** — backup diario/semanal/mensual | Restore drill cada 3 meses. Backup en región separada. Política de retención documentada |
| 673 | **Incident response playbook** — runbook para cada escenario | Who to call, what to do, timeline. Post-mortem template. Mejora continua del proceso |

## Gaps de UI/UX Refinements (NUEVO — Fase 2)

| # | Gap | Resolución |
|---|-----|------------|
| 674 | **Smooth transitions** — animaciones suaves entre paneles | Transiciones CSS fluidas. Gestos táctiles en tablets. Sin saltos bruscos |
| 675 | **Drag & drop mejorado** — preview del componente mientras arrastras | Sombra del componente siguiendo el cursor. Zonas de drop highlight. Snap to guides |
| 676 | **Loading states creativos** — skeleton con colores del proyecto | Progress indicators con mensajes contextuales. Easter eggs para tiempos largos |
| 677 | **Empty states con propósito** — ilustraciones + call to action | "No tienes proyectos aún. ¿Quieres crear uno?". Ejemplos de lo que podrías crear |
| 678 | **Error states con humor** — "algo salió mal pero no es tu culpa" | Ilustraciones divertidas. Botón Reintentar + Reportar. ¿Chistes mientras esperas? |
| 679 | **404 personalizada** — para proyectos no encontrados | Búsqueda de proyectos similares. Link al dashboard. Ilustración amigable |

## Gaps de Testing Environments (NUEVO — Fase 6)

| # | Gap | Resolución |
|---|-----|------------|
| 680 | **Dev environment** — sandbox aislado del proyecto real | Editar sin afectar nada. Datos dummy. Sin conexiones a APIs reales. Reset con 1 clic |
| 681 | **Staging environment** — réplica exacta del proyecto | Mismas APIs, misma DB (copia). URL de staging única. Probar antes de publicar |
| 682 | **Production environment** — la versión real | Solo deploy desde staging aprobado. Rollback inmediato. Health check automático |
| 683 | **Environment promotion workflow** — dev → staging → production | Cada paso requiere aprobación. Changelog auto-generado entre promociones. Notificaciones al equipo |

## Gaps de APIs que knitstudio Consume (NUEVO — Post-MVP)

| # | Gap | Resolución |
|---|-----|------------|
| 684 | **GitHub API** — crear repos, PRs, issues, wikis desde knitstudio | Conector nativo. "Exportar proyecto a nuevo repo". "Crear PR con cambios". "Crear issue desde feedback" |
| 685 | **GitLab API** — lo mismo para GitLab | Conector nativo. Mismas operaciones que GitHub. Auto-detección de self-hosted vs cloud |
| 686 | **Bitbucket API** — lo mismo para Bitbucket | Conector nativo. Mismas operaciones. Soporte para Bitbucket Cloud y Server |
| 687 | **Linear API** — crear y gestionar issues | "Reportar bug" crea issue en Linear. "Nueva feature request" → Linear. Sync bidireccional |
| 688 | **Jira API** — crear y gestionar issues | "Reportar bug" crea issue en Jira. Vinculación proyecto knitstudio ↔ proyecto Jira |

## Gaps de AI Avanzado (NUEVO — Fase 7)

| # | Gap | Resolución |
|---|-----|------------|
| 689 | **AI code review** — revisar el código generado antes de exportar | "Este componente no tiene manejo de errores". "Esta función es muy compleja, simplificarla" |
| 690 | **AI accessibility audit** — auditar accesibilidad del diseño | "Este botón no tiene contraste suficiente". "Esta imagen no tiene alt text". Score + sugerencias |
| 691 | **AI performance audit** — auditar rendimiento potencial | "Esta imagen de 5MB va a ralentizar la carga". "Este action flow con 30 pasos debería dividirse" |
| 692 | **AI SEO audit** — auditar SEO de la página | "No hay meta description". "Los headings no siguen jerarquía lógica". Score + auto-fix |
| 693 | **AI translation quality check** — verificar traducciones | "La traducción al español tiene errores gramaticales". "Texto en francés parece automático, revisar" |

## Gaps de Publicación (Fase 0-9)

| # | Gap | Resolución |
|---|-----|------------|
## Gaps de Free Trials para Apps (NUEVO — Fase 6)

| # | Gap | Resolución |
|---|-----|------------|
| 694 | **Free trial component** — "Prueba gratis 14 días" sin tarjeta de crédito | Componente "TrialBanner". Timer de 14 días. Upgrade flow. Emails de recordatorio automáticos |
| 695 | **Metered trial** — límite de uso (100 requests gratis) no de tiempo | Contador de uso. Reset mensual. Alerta al 80% del límite. Upgrade forzado al alcanzarlo |
| 696 | **Trial → Paid conversion funnel** — emails automáticos, descuento por tiempo limitado | Día 7: "¿Cómo va tu prueba?". Día 12: "Tu prueba termina en 2 días". Día 14: "Oferta especial: 20% off si te suscribes hoy" |

## Gaps de Modo Escuela (NUEVO — Post-MVP)

| # | Gap | Resolución |
|---|-----|------------|
| 697 | **Class management** — crear clases, invitar estudiantes, asignar proyectos | Dashboard del profesor: roster, proyectos asignados, fechas de entrega. Invitación por link o email |
| 698 | **Student dashboard** — el estudiante ve sus proyectos y los del curso | Vista estudiante: proyectos personales + proyectos del curso. Estado: entregado, pendiente, calificado |
| 699 | **Grading** — el profesor puede calificar proyectos con rúbrica + comentarios | Rúbrica configurable. Comentarios por componente. Score total. Feedback visible para el estudiante |
| 700 | **Plagiarism detection** — detectar si dos estudiantes entregaron lo mismo | Comparación de layouts y código. Alerta si similitud >70%. Reporte de coincidencias |

## Gaps de Accesibilidad Extrema (NUEVO — Fase 3)

| # | Gap | Resolución |
|---|-----|------------|
| 701 | **WCAG 2.2 AAA compliance** — nivel más estricto de accesibilidad | Target AAA para apps gubernamentales. Checker integrado. Reporte de cumplimiento. Auto-fix cuando sea posible |
| 702 | **Section 508 (USA)** — requerimiento legal para apps del gobierno federal | Checklist Section 508 integrado. Reporte de cumplimiento exportable. Declaración de conformidad |
| 703 | **EN 301 549 (UE)** — estándar europeo de accesibilidad digital | Checklist EN 301 549. Armonizado con WCAG. Reporte para licitaciones públicas europeas |
| 704 | **Accessibility statement generator** — declaración de accesibilidad requerida por ley | Genera declaración basada en el estado actual de la app. Fecha de última revisión. Plan de mejora |

## Gaps de Modo Catástrofe (NUEVO — Fase 9)

| # | Gap | Resolución |
|---|-----|------------|
| 705 | **Read-only mode** — si la BD está caída, la app sigue funcionando | Cache estático del último estado conocido. Modo lectura sin guardar. Banner: "Modo lectura - Los cambios no se guardarán" |
| 706 | **Fallback CDN** — si el CDN primario falla, servir desde el secundario | Multi-CDN: CloudFront + Cloudflare + Fastly. Health check automático. Failover en <30s |
| 707 | **Graceful degradation de action flows** — si una API no responde, mostrar mensaje amigable | Timeout configurable. "Este servicio no está disponible ahora. Intenta más tarde." Log del error para debugging |
| 708 | **Emergency contact** — quién llamar si knitstudio.cloud está caído | Página de estado con teléfono + email de emergencia. SLA response times visibles |
| 709 | **SLA credit request** — formulario para pedir compensación si no se cumple el SLA | Formulario automático: fecha del incidente, duración, impacto. Crédito calculado automáticamente |

## Gaps de Modo Nostalgia (NUEVO — Fase 6)

| # | Gap | Resolución |
|---|-----|------------|
| 710 | **Export a HTML 4.01 Transitional** — para sistemas legacy empresariales | Output compatible con IE6+, sin CSS moderno, sin JS. Tablas para layout. DOCTYPE HTML 4.01 |
| 711 | **Export a PDF/A** — archivo digital de larga duración (ISO 19005) | PDF/A-2b. Fuentes embebidas. Metadatos XMP. Sin dependencias externas. Para archivo legal |
| 712 | **Export a texto plano** — sin formato, solo contenido | Strip HTML, markdown, estilos. Solo texto estructurado. UTF-8. Para análisis de contenido |
| 713 | **Export a RSS/Atom** — feed de contenido para syndication | RSS 2.0 + Atom 1.0. Items por página publicada. Metadata: title, description, fecha, author |

## Gaps de Modo Científico (NUEVO — Post-MVP)

| # | Gap | Resolución |
|---|-----|------------|
| 714 | **Data export en formatos científicos** — NetCDF, HDF5, FITS | Export de datos de tablas/charts a formatos estándar de investigación. Para análisis en Python/Matlab |
| 715 | **Graph/Chart types científicos** — box plot, violin plot, error bars, survival curves | Componentes de chart específicos para investigación. Ejes logarítmicos, barras de error, intervalos de confianza |
| 716 | **LaTeX export** — documentación del proyecto en formato académico | `knit export --format=latex`. Genera .tex con tablas, figuras, referencias. Para papers |
| 717 | **Citation generator** — "cómo citar este proyecto en un paper" | Genera cita en formatos: BibTeX, APA, MLA, Chicago. DOI opcional. "Hecho con knitstudio" en acknowledgments |

## Gaps de Modo Legal (NUEVO — Fase 9)

| # | Gap | Resolución |
|---|-----|------------|
| 718 | **Court exhibit export** — formato diseñado para ser presentado como evidencia digital | PDF con metadatos forenses. Checksum SHA-256. Fecha/hora certificada. Sin posibilidad de edición posterior |
| 719 | **Chain of custody log** — quién accedió a qué, cuándo, desde dónde | Log inmutable (append-only). Quién, qué, cuándo, IP, user agent. Firmado digitalmente |
| 720 | **Legal hold** — preservar proyectos aunque el usuario quiera borrarlos | Preservación legal: el proyecto no puede ser eliminado ni modificado. Para e-discovery en litigios |
| 721 | **Time-stamped screenshots** — captura con sello de tiempo verificable | Screenshot automático con timestamp visible + hash blockchain. Para evidencia de diseño en una fecha específica |

## Gaps de Modo Salud (NUEVO — Fase 9)

| # | Gap | Resolución |
|---|-----|------------|
| 722 | **HIPAA BA agreement** — Business Associate Agreement para datos médicos | BA agreement firmable online. Documentación de cumplimiento HIPAA. Contacto de privacy officer |
| 723 | **PHI detection** — detectar si la app recolecta Protected Health Information | Escaneo de formularios y campos. Alerta si se detectan campos de salud (SSN, diagnosis, medicación) |
| 724 | **Audit log HIPAA-compliant** — logs de acceso con requisitos de HIPAA | Logs con: quién, qué, cuándo, desde dónde. Retención mínima 6 años. No repudio. Acceso restringido |
| 725 | **Data encryption** — encriptación en reposo y tránsito para datos de salud | AES-256 en reposo. TLS 1.3 en tránsito. Key rotation automática. HSM para keys maestras |

## Gaps de Modo Deportes (NUEVO — Post-MVP)

| # | Gap | Resolución |
|---|-----|------------|
| 726 | **Leaderboard component** — tablas de posiciones en vivo | Ordenable por puntos, victorias, racha. Auto-actualización. Highlight al equipo del usuario |
| 727 | **Timer/Clock component** — cronómetros, countdown, reloj de juego | Modos: countdown, countup, reloj digital/analógico. Eventos onTimerStart, onTimerEnd. Timeout configurable |
| 728 | **Scoreboard component** — marcadores personalizables por deporte | Fútbol, básquet, tenis, eSports. Puntos, sets, innings. Historial de cambios en vivo |

## Gaps de Modo Viajes (NUEVO — Post-MVP)

| # | Gap | Resolución |
|---|-----|------------|
| 729 | **Booking calendar** — calendario de disponibilidad con reservas | Date picker con disponibilidad. Bloqueo de fechas reservadas. Confirmación de reserva. Integración con Stripe |
| 730 | **Map integration avanzado** — rutas, waypoints, geocercas | Mapbox/Google Maps. Draw route, markers, info windows. Geocoding, reverse geocoding. Distance matrix |
| 731 | **Currency converter** — cambio de moneda en vivo | API de tasas de cambio. Selector de moneda. Actualización automática. Conversión en vivo |
| 732 | **Weather widget** — clima en destino | OpenWeatherMap / WeatherAPI. Pronóstico 7 días. Gráfico de temperatura. Alertas climáticas |

## Gaps de Publicación (Fase 0-9)

| # | Gap | Resolución |
|---|-----|------------|
## Gaps de Air-Gapped / Offline Activation (NUEVO — Fase 0)

| # | Gap | Resolución |
|---|-----|------------|
| 733 | **Offline installer** — tar.gz completo con todas las dependencias sin internet | Script `knit offline:installer` genera: imágenes Docker + npm packages + binarios. Checksum SHA-256 |
| 734 | **License activation offline** — activar licencia sin llamada a casa | Archivo de licencia firmado criptográficamente. Validación offline. Expiración local |
| 735 | **Network requirements documentado** — puertos, protocolos, URLs necesarias | Docs: "Firewall rules", "DNS entries", "Proxy configuration". Para entornos corporativos cerrados |
| 736 | **Integrity verification** — verificar que el installer no fue manipulado | Checksum SHA-256 + firma GPG. Verify antes de instalar. Reporte de integridad |

## Gaps de Custom Storage Backends (NUEVO — Fase 0)

| # | Gap | Resolución |
|---|-----|------------|
| 737 | **S3-compatible storage** — MinIO, Cloudflare R2, DigitalOcean Spaces | Conector configurable: endpoint, bucket, region, credentials. Auto-detección de proveedor |
| 738 | **NFS / NAS mount** — almacenamiento en red local | Configuración de mount point. Permisos. Lock management para escritura concurrente |
| 739 | **Database BLOB storage** — PostgreSQL large objects para assets pequeños | Configurable por tipo de asset: imágenes <1MB en DB, >1MB en S3. Híbrido automático |
| 740 | **Storage migration tool** — mover assets entre backends sin perder URLs | `knit storage:migrate --from=local --to=s3`. Zero-downtime. URLs persistentes. Verificación post-migración |

## Gaps de Modo Análisis del Proyecto (NUEVO — Fase 6)

| # | Gap | Resolución |
|---|-----|------------|
| 741 | **Page views analytics** — qué páginas se visitan más en la app generada | Panel de analytics en el builder. Top páginas, tendencias, comparación mes a mes |
| 742 | **Component usage analytics** — qué componentes se usan más en el proyecto | Heatmap de componentes en el proyecto. No usados, poco usados, sobre-usados |
| 743 | **Action flow execution stats** — qué flows se ejecutan más, cuáles fallan más | Tabla de flows con: ejecuciones, tasa de éxito, tiempo promedio, errores más comunes |
| 744 | **User session recordings** — cómo navegan los usuarios por la app | Reproducción de sesiones. Filtro por duración, páginas visitadas, acciones realizadas. Sin datos sensibles |
| 745 | **Funnel analysis** — conversión paso a paso (registro → login → compra) | Editor visual de funnels. Drop-off en cada paso. Oportunidades de mejora destacadas |

## Gaps de Modo Monitor para Apps (NUEVO — Fase 6)

| # | Gap | Resolución |
|---|-----|------------|
| 746 | **Uptime monitoring** — "tu app lleva 30 días sin caídas" | Check cada 5 min desde múltiples regiones. Historial de uptime. SLA real vs contratado |
| 747 | **Performance monitoring** — "tu app carga en 1.2s (p75)" | RUM (Real User Monitoring). Core Web Vitals. Distribución de tiempos de carga. Alertas de degradación |
| 748 | **Error tracking** — errores de JS, APIs caídas, action flows fallidos | Source maps para errores JS. Stack traces. Frecuencia por error. Usuarios afectados |
| 749 | **Custom dashboard** — widgets que el usuario elige monitorear | Drag & drop dashboard. Métricas: uptime, performance, errors, users, conversions. Export a PDF |
| 750 | **Alertas configurables** — email/Slack/webhook si algo falla | Reglas: "si uptime <99% por 5 min → alertar". Thresholds configurables. Silenciamiento programado |

## Gaps de Modo Respaldo de Action Flows (NUEVO — Fase 5)

| # | Gap | Resolución |
|---|-----|------------|
| 751 | **Version history por action flow** — no solo por página, sino por flow individual | Cada action flow tiene su propio historial de versiones. Timestamp + autor + changelog |
| 752 | **Diff de action flows** — comparar dos versiones del mismo flow | Vista lado a lado. Nodos agregados/eliminados/modificados. Conexiones cambiadas. Aceptar/rechazar cambios |
| 753 | **Rollback de action flow individual** — revertir un flow sin afectar la página | Rollback con 1 clic. Nueva versión creada (no destructivo). Confirmación: "¿Esto afecta a 3 páginas que usan este flow?" |
| 754 | **Test aislado de action flow** — ejecutar un flow sin afectar datos reales | Sandbox: mock de APIs, datos dummy, sin side effects. Reporte: "✅ Flow ejecutado correctamente" o "❌ Error en paso 3" |

## Gaps de Modo Purga (NUEVO — Fase 6)

| # | Gap | Resolución |
|---|-----|------------|
| 755 | **Purge unused projects** — eliminar proyectos no tocados en >1 año | Auto-detección. Confirmación: "X proyectos no fueron tocados en 1 año. ¿Archivar o eliminar?" |
| 756 | **Purge unused assets** — eliminar assets no referenciados por ningún layout | Scanner de assets vs layouts. "50 imágenes no se usan. Ocupan 2.3GB. ¿Eliminar?" |
| 757 | **Purge old versions** — mantener solo las últimas N versiones de cada página | Configurable: "mantener últimas 10 versiones". Política por proyecto. Purge automático semanal |
| 758 | **Purge audit logs** — eliminar logs más antiguos que X días | Retención legal configurable: 90 días default, 7 años para compliance. Purge automático |
| 759 | **Purge preview deployments** — eliminar previews temporales después de X días | Previews expiran automáticamente. Notificación antes de eliminar. Enlace permanente opcional |

## Gaps de Modo Watch — Componentes de Terceros (NUEVO — Fase 6)

| # | Gap | Resolución |
|---|-----|------------|
| 760 | **Dependency health check** — el componente de terceros está funcionando? | Ping periódico a APIs de terceros (Google Maps, Stripe, YouTube). Status: 🟢 ok / 🟡 lento / 🔴 caído |
| 761 | **Version tracking** — qué versión del SDK de terceros estás usando | Inventario de librerías externas en el proyecto. Versión actual, última disponible, changelog |
| 762 | **Deprecation alert** — "Google Maps API v2 será deprecada en 6 meses" | Monitoreo de anuncios de deprecación. Alerta con tiempo suficiente para migrar. Guía de migración |
| 763 | **Alternative suggestion** — "Google Maps va a cobrar más, ¿quieres cambiar a Mapbox?" | Análisis de costos vs alternativas. Compatibilidad de componentes. Tiempo estimado de migración |

## Gaps de Modo Recurso para Self-Hosted (NUEVO — Fase 0)

| # | Gap | Resolución |
|---|-----|------------|
| 764 | **Capacity planner** — cuánto CPU/RAM/disco necesitas según tus proyectos | Calculadora: inputs = proyectos, páginas, usuarios, AI reqs. Output = recursos recomendados |
| 765 | **Growth estimator** — si creces 20% al mes, ¿cuándo necesitas más servidor? | Proyección a 6/12/24 meses. Alerta: "Según tu crecimiento, necesitarás duplicar servidor en 4 meses" |
| 766 | **Cost comparator** — self-hosted vs cloud, cuál es más barato según tu uso | Calculadora: costos de servidor + electricidad + mantenimiento vs plan cloud mensual |
| 767 | **Migration planner** — cuánto tiempo lleva migrar de self-hosted a cloud | Estimación basada en tamaño del proyecto. Pasos documentados. Downtime esperado. Rollback plan |

## Gaps de Modo Scripts / Hooks (NUEVO — Fase 6)

| # | Gap | Resolución |
|---|-----|------------|
| 768 | **Pre-export hook** — script que se ejecuta antes de exportar | Hook: optimizar imágenes, minificar assets, validar links. Script JS/Python configurable por proyecto |
| 769 | **Post-export hook** — script después de exportar | Hook: deploy a servidor, notificar a Slack, actualizar sitemap. Resultado visible en logs |
| 770 | **Pre-publish hook** — validaciones custom antes de publicar | Hook: "correr tests", "verificar accesibilidad", "aprobar compliance". Bloquea publicación si falla |
| 771 | **Post-publish hook** — acciones después de publicar | Hook: invalidar CDN, enviar email al equipo, crear release en GitHub. Log de ejecución |
| 772 | **Scheduled scripts** — ejecutar scripts en cron (diario, semanal, mensual) | "Backup automático todas las noches". "Reporte semanal de analytics". Editor visual de cron |

## Gaps de Compliance Regulatorio (NUEVO — Fase 9)

| # | Gap | Resolución |
|---|-----|------------|
| 773 | **PCI DSS** — si la app procesa pagos, cumplir con PCI | Checklist PCI. Guía de implementación segura. Escaneo de vulnerabilidades trimestral |
| 774 | **SOX** — si la empresa es pública, cumplir con Sarbanes-Oxley | Audit trail completo. Segregación de funciones. Controles de acceso documentados. Reportes trimestrales |
| 775 | **FedRAMP** — si la app es para el gobierno federal USA | Documentación de seguridad requerida. Controles NIST 800-53. Assessment externo requerido |
| 776 | **IRAP** — si la app es para el gobierno australiano | IRAP assessment guide. Protección de datos clasificados. Zonas de seguridad |
| 777 | **SOC 2 + SOC 3** — reportes de control interno para cualquier empresa | SOC 2 Type II anual. SOC 3 público. Trust Services Criteria: security, availability, confidentiality |

## Gaps de Publicación (Fase 0-9)

| # | Gap | Resolución |
|---|-----|------------|
## Gaps de Industrias Verticales (NUEVO — Post-MVP)

| # | Gap | Resolución |
|---|-----|------------|
| 778 | **E-commerce template** — catálogo, carrito, checkout, pagos, tracking de envíos | Template completo con componentes de producto, carrito, checkout (Stripe/PayPal), y tracking de órdenes |
| 779 | **Restaurante template** — menú, reservas, delivery, reviews, ubicación | Template con menú interactivo, booking calendar, integración con Google Maps, sistema de reviews |
| 780 | **Bienes raíces template** — listado de propiedades, galería, tour virtual, contacto agente | Template con MLS listing, image gallery, virtual tour embed, contact form, mortgage calculator |
| 781 | **Bolsa de trabajo template** — ofertas, postulación, perfil candidato, filtros | Template con job board, resume upload, applicant tracking, filters by category/location/salary |
| 782 | **Clasificados / Marketplace template** — anuncios, búsqueda, mensajes, reputación | Template con listing creation, search, messaging, ratings, payment escrow |
| 783 | **Red social template** — feed, perfiles, amigos/mensajes, notificaciones | Template con news feed, user profiles, friend system, direct messages, notifications, likes/comments |
| 784 | **Dating app template** — perfiles, swipe, match, chat, geolocalización | Template con swipe cards, match algorithm, chat, geolocation, photo verification |
| 785 | **Wiki / Knowledge base template** — artículos, búsqueda, categorías, historial de versiones | Template con rich text editor, category tree, full-text search, version history, markdown support |

## Gaps de Builder Settings (NUEVO — Fase 2)

| # | Gap | Resolución |
|---|-----|------------|
| 786 | **User profile page** — nombre, email, avatar, cambio de password, 2FA | Página de perfil dentro del builder. Cambio de avatar, password, activación de 2FA TOTP |
| 787 | **Notification preferences** — qué notificaciones, por qué canal | Checkboxes: publicación, errores, comentarios, actualizaciones. Canales: email, push, in-app |
| 788 | **Theme preferences** — dark/light/system, densidad, font size, accent color | Selector de tema del builder. Persistencia en localStorage + cuenta cloud |
| 789 | **Editor preferences** — auto-save interval, snap to grid, default zoom level | Sliders y toggles para configurar el comportamiento del editor. Reset a defaults |
| 790 | **Language/locale selection** — idioma, formato fecha/moneda/timezone | Selector de idioma. Formatos: DD/MM vs MM/DD, $ vs €, UTC vs local. Persistente |
| 791 | **Privacy settings** — visibilidad de perfil, telemetry opt-in | Toggles: perfil público/privado, compartir datos de uso anónimamente, GDPR consent management |

## Gaps de Builder Help System (NUEVO — Fase 2)

| # | Gap | Resolución |
|---|-----|------------|
| 792 | **"What's this?" tooltips** — en cada botón, panel, opción del builder | Icono "?" en cada control. Tooltip con explicación de 1 línea + link a docs |
| 793 | **Contextual quick help (F1)** — al presionar F1, muestra ayuda sobre lo que estás viendo | F1 abre modal con ayuda contextual. "Estás editando un action flow. Aquí te explicamos cómo funciona" |
| 794 | **Interactive tutorial replay** — repetir el tutorial de onboarding cuando quieras | Botón "Volver a ver tutorial" en settings. Reproduce el mismo onboarding interactivo |
| 795 | **Help search integrado** — buscar en docs desde el builder con resultados en vivo | Cmd+Shift+H abre buscador de ayuda. Resultados de Docusaurus en vivo. Feedback: "¿Te sirvió?" |

## Gaps de Builder Error Pages (NUEVO — Fase 2)

| # | Gap | Resolución |
|---|-----|------------|
| 796 | **404 page del builder** — "Esta página no existe en knitstudio" | Página 404 con ilustración, búsqueda de proyectos, link al dashboard. No más "Not Found" en blanco |
| 797 | **500 page del builder** — "Algo salió mal. Ya lo estamos viendo." | Página 500 con mensaje amigable, botón reintentar, botón reportar, ID de error para soporte |
| 798 | **Offline page del builder** — "No tienes conexión. Tus cambios locales están seguros." | Página offline con indicador de estado, proyectos cacheados, mensaje de "reconectando..." |

## Gaps de Builder Performance (NUEVO — Fase 3)

| # | Gap | Resolución |
|---|-----|------------|
| 799 | **Web Vitals monitoring del builder** — FCP, LCP, TTI, CLS del editor | Métricas visibles en modo dev. Alerta si FCP >2s o LCP >4s. Histórico de rendimiento |
| 800 | **Bundle size budget** — alerta si el JS del builder crece más de lo esperado | Budget en CI: si bundle >500KB, falla el build. Reporte semanal de tamaño |
| 801 | **Memory leak detection** — alerta si el builder acumula memoria | Heap snapshot periódico. Alerta si memoria crece >100MB sin liberar. Sugerencia de recargar |

## Gaps de Builder Accessibility (NUEVO — Fase 3)

| # | Gap | Resolución |
|---|-----|------------|
| 802 | **Full keyboard audit** — todos los flujos sin mouse | Auditoría automatizada con axe-core. Cobertura 100% de flujos. Reporte de cumplimiento |
| 803 | **Screen reader audit** — NVDA/JAWS/ChromeVox compatibilidad completa | Test manual trimestral con screen readers reales. Labeling ARIA completo. Anuncios de cambios |

## Gaps de Builder i18n (NUEVO — Fase 3)

| # | Gap | Resolución |
|---|-----|------------|
| 804 | **All strings externalized** — sin texto hardcodeado en el código | ESLint rule: no string literals en JSX. i18next extractor automático en CI. Coverage 100% |
| 805 | **Translation platform** — Crowdin/Transifex para community translations | Integración con Crowdin. Traductores voluntarios. Sync automático de nuevas strings |

## Gaps de Web3/Crypto (NUEVO — Post-MVP)

| # | Gap | Resolución |
|---|-----|------------|
| 806 | **Wallet Connect component** — conectar MetaMask, WalletConnect, Phantom | Componente "Connect Wallet": detecta wallets instalados, QR para WalletConnect, login con firma |
| 807 | **NFT Gallery component** — mostrar NFTs de una wallet | Componente "NFT Gallery": grid de NFTs, metadata on-chain, preview multimedia, link a marketplace |

## Gaps de AI Agents (NUEVO — Post-MVP)

| # | Gap | Resolución |
|---|-----|------------|
| 808 | **AI Chatbot component** — chatbot integrable en la app generada (no solo en el builder) | Componente configurable: modelo, prompt, knowledge base, apariencia. Embed en cualquier página |
| 809 | **AI Agent deploy** — crear un agente AI que ejecute acciones en la app | Agent builder visual: trigger → LLM call → action (call API, send email, update DB). Deploy autónomo |
| 810 | **AI Assistant embed** — widget de ayuda AI para usuarios de la app | Widget flotante "💬 ¿Necesitas ayuda?". Context-aware: sabe qué página está viendo el usuario |

## Gaps de Real-Time Infrastructure (NUEVO — Post-MVP)

| # | Gap | Resolución |
|---|-----|------------|
| 811 | **WebSocket management panel** — conexiones activas en la app generada | Panel en el builder: conexiones activas, mensajes por segundo, latencia, errores. Health check |
| 812 | **Broadcast channel** — comunicación entre usuarios en tiempo real | API `knit.broadcast(channel, message)`. Suscribirse con `knit.subscribe(channel)`. Para apps colaborativas |

## Gaps de Publicación (Fase 0-9)

| # | Gap | Resolución |
|---|-----|------------|
| 813 | Docker Hub / GHCR | Publicar imágenes docker oficiales |
| 814 | Helm chart | Orquestación Kubernetes |

## Lo que SÍ tenemos bien cubierto

✅ Modelo de comunidad OSS
✅ Gobernanza (BDFL → Meritocracia)
✅ Estrategia de lanzamiento (PH → HN → Reddit)
✅ Modelo de negocio (MIT + Cloud tiers)
✅ Arquitectura RN Live Edit
✅ Pipeline de exportación mobile
✅ Catálogo de componentes (110+)
✅ Competición analizada (15 herramientas)
✅ Seguridad planificada (9 medidas)
✅ MCP Server multi-cliente
✅ Auto-esculpido
✅ 65+ conectores a servicios
✅ Modo Simple/Advanced + wizards
✅ Import Engine multi-formato
✅ Git nativo + CI/CD
✅ Plugin SDK + Component SDK
✅ Offline-first + sync
✅ Localización de contenido multi-idioma
✅ Debug de action flows
✅ Component sandbox + testing
✅ AI governance + cost tracking
✅ SEO tooling integrado
✅ Notificaciones + operaciones asíncronas
✅ Component versioning + deprecation
✅ Auto-recovery + graceful degradation
✅ Modelo económico dual (self-hosted + cloud)
✅ Exit plan + migración gradual + proyecto autocontenido
✅ Plugin gobernanza (sandboxing, permisos, curaduría)
✅ Testing del output generado (compilación, visual regression, validación de action flows)
✅ Preview deployment antes de publicar
✅ Feedback loop + changelog + roadmap
✅ Legal completo (TOS, Privacy, DMCA, CLA, licencias)
✅ Enterprise (multi-tenant, SSO, Helm, Terraform)
✅ Búsqueda global (Cmd+K)
✅ Quick edit mode (editar inline)
✅ Custom CSS/JS injection (escape hatch)
✅ Secrets management (keystore + env vars)
✅ Backup/restore de instancia (knit backup/restore)
✅ Issue/PR triage process (maintainer sustainability)
✅ i18n runtime para apps generadas
✅ Colaboración con detección de conflictos
✅ Flujo de conexión de proyectos existentes (proxy + script tag + CLI + WebSocket)
✅ Auto-discovery del proyecto (tipo, framework, APIs, rutas)
✅ Flujos de trabajo: Local, Staging, Producción RO, Dispositivo físico, CI/CD, Reverse, Import, Multi-preview
✅ Compatibilidad por tipo de proyecto (Web, WordPress, Electron, Chrome Ext, Capacitor, RN, Flutter, SwiftUI)
✅ Safety net: estados estables, draft vs published, dry-run, auto-snapshots
✅ Feature discovery: "Sabías que...?", botón 💡 contextual, shortcuts discovery, component explorer
✅ Black box mitigation: código legible, view source, inline docs, stack traces, AI confidence
✅ Migration/upgrade: knit upgrade, backward compatibility, migration assistant, multi-version runtime
✅ Conflictos: CSS class collision, Git merge conflict, edición simultánea, dependencias huérfanas, type mismatch
✅ Incompatibilidades: CORS/CSP, SSR, Shadow DOM, WebGL, micro-frontends, Safari iOS, React/Angular legacy
✅ UX crítica: welcome screen, indicador guardado, publicación accidental, parálisis decisión, jerga técnica, "dónde quedé", "perdí mi trabajo", error 500, AI no entendió, miedo a romper, modelo mental, token expirado, docker doctor
✅ Nuevas funcionalidades: Design Token Editor, Component Playground, Form/Data Wizards, Theme Generator, GitHub Components, Voice Commands, Scheduled Tasks, API Marketplace, Plugin Store
✅ Flexibilidad extendida: custom attributes, variants, tokens, breakpoints, composite components, lifecycle hooks, lazy-load, SSR per-component, state mgmt externo
✅ Facilidad de uso: right-click menu, multi-select, alignment, nudge, palette search+filter, favorites, folders, tags, batch rename, spell/emoji/contrast checker, image editor, icon browser, font preview, drag from desktop, paste from clipboard, shift+click range
✅ Conflictos: plugin competition, theme ambiguity, export format drift, version drift, schema mismatch, clock skew, browser cache, concurrent commit, asset hotlinking, DB migration
✅ Incompatibilidades: Yarn/pnpm/npm, Docker v1/v2, Windows paths, macOS case-insensitive, Unicode/RTL, CRLF/LF, corporate proxy, air-gapped, ARM/M1, Node version, Docker missing
✅ UX avanzada: notification priority, modal stack, collapsible panels, click fatigue, focus mode, AI trust, email prefs, feature creep path, help search, community hours, system status, security summary
✅ Testing del builder mismo: unit + integration + E2E + visual regression + load + stress + build + smoke + auto-validation del output
✅ Documentación integral: JSDoc/TSDoc, README por package, Storybook del builder, API reference autogenerada, ADRs, guías de contribución por área, changelog automático
✅ Riesgos existenciales mitigados: bus factor, dependencias críticas, AI provider diversification, supply chain security, escalabilidad cloud, tests de regresión, feature creep control
✅ Builder como producto: crash recovery, performance monitoring, RAM/CPU, self-version, update notification, error boundary
✅ Accesibilidad del builder: screen reader, keyboard nav, color blind mode, reduced motion, responsive builder, dark/light mode
✅ Edge cases: 500+ proyectos, 10k+ componentes, 500+ steps, caracteres especiales, emails con +, nombres duplicados, proyectos huérfanos
✅ Offboarding: eliminar cuenta, cancelar suscripción, data export, retention policy, herencia de proyectos
✅ Cultural/locale: date format, number format, currency format, first day of week, time zone handling
✅ Presencia pública: status page, public roadmap, blog, built-with showcase, contributors, what's new modal, comparison page
✅ Post-publish: content mode, re-engagement, runtime lock-in mitigation, fidelity gap, cross-browser preview
✅ API pública: REST API + CI/CD integration + webhook events + CLI wrapper
✅ Regression testing del builder: dependency upgrade tests, schema migration tests, snapshot testing, API contract tests
✅ Mantenimiento post-publicación: health dashboard, proactive alerts, maintenance mode, last verified timestamp
✅ Colaboración avanzada: threads de comentarios, activity feed, approval workflows
✅ Anti-lock-in: export flat, emergency kit, runtime-free export guarantee
✅ UX inteligente: componentes auto-configurables, smart defaults, presets, experto mode en props
✅ Design System Sync: knitstudio como fuente de verdad, Figma→knitstudio→código, token drift detection
✅ Presentación: presentation mode, client view, export a PDF/Imagen
✅ Compromiso humano: commit messages, timeline con etiquetas, activity storytelling
✅ Interacción y testing en el builder: preview/interact mode, split view, test mode con logs, breakpoint mode, state inspector, network panel, reset test state
✅ Operaciones masivas: bulk operations, component replace
✅ Enfoque y calidad de vida: do not disturb mode, notification center
✅ Proyecto y publicación: published showcase, pre-launch kit (checklist + auto-fix)
✅ Inteligencia: dependency graph, consistency inspector, design lint
✅ Gestión de versiones: museum mode (freeze, archive, publish from), access history
✅ Calidad post-publicación: sentinel mode, canary deploy, health score
✅ Integración CMS: WordPress import/update via REST API, theme.json sync
✅ Documentación y cumplimiento: Documentation Generator, Compliance Kit (cookies, privacy, WCAG, ToS)
✅ Permisos y límites: per-project roles, quotas configurables, alertas 80%
✅ Marca y presentación: builder theming, gallery view de páginas (PowerPoint-like), gallery view de proyectos, project overview
✅ Colaboración temporal: snapshot sharing (link expirable sin login), version story (títulos automáticos)
✅ Personalización: My Toolbox (favoritos entre proyectos), zoom levels (overview, page, pixel, component)
✅ Acción rápida: quick actions (cambiar 1 cosa sin abrir builder), command palette universal (Cmd+K para ejecutar)
✅ Migración desde otras plataformas: Webflow full migration (CMS + interacciones), Bubble migration
✅ Colaboración y contexto: decision log (por qué se hizo cada cambio), live cursors + presence
✅ Datos y transformación: visual data transformer (mapeo drag & drop, filter builder, preview en vivo)
✅ Importación y referencias: inspirarse en sección, remix + atribución, live reference
✅ Onboarding para clientes: client onboarding kit (tutorial interactivo), help contextual para no-técnicos
✅ Recuperación temporal: point-in-time recovery (slider temporal), auto-snapshots cada hora
✅ Export y design handoff: single component export, design handoff mode (specs), inspeccionar tipo Figma
✅ Calidad y cumplimiento: accessibility scanner, compliance scanner (GDPR/CCPA/ADA)
✅ Ecosistema de plugins: plugin compatibility checker, test mode aislado, conflict detection
✅ Feedback de usuarios: in-app feedback widget, feedback vinculado a componente específico
✅ Migración y portabilidad: knit migrate instance (export/import entre instancias)
✅ Seguridad por página: page visibility (pública/enlace/contraseña/auth), auth providers integrados
✅ Telemetría anónima: anonymous usage analytics opt-in para mejorar el producto
✅ Micro-experiencias: toast undo, autosave status visible, contextual tips, what's new modal, focus mode
✅ Edición y productividad: drag from desktop, paste from clipboard inteligente, preview en nueva pestaña, responsive drag handles, tab title dinámico, multi-tab safety
✅ Personalización del builder: keyboard shortcut customization, UI density preferences, code editor preferences (font, lint, Prettier)
✅ Gestión multi-proyecto: per-project builder version pinning, cross-project dashboard, component analytics
✅ Onboarding y descubrimiento: onboarding checklist persistente, progressive power user tips (descubrimiento gradual)
✅ Feedback y comunidad: rate this update, community hub integrado (templates, showcases, foros)
✅ Ciclo de vida del proyecto: project archive, asset management, seasonal design changes
✅ Salud del proyecto: component library health, action flow complexity warnings, cross-project style drift detection, cross-project component sync
✅ Equipos y conocimiento: team offboarding (transfer ownership), knowledge transfer (summary + who knows what + README auto + screen recording), macro recorder (grabar, reproducir, compartir, schedule)
✅ Integración ecosistema dev: VS Code extension, Slack/Discord notifications, Jira/Linear, webhook out
✅ Agencias y multi-tenant: client portal, white-label completo, facturación por proyecto, time tracking
✅ Export a plataformas específicas: Shopify, WordPress, Wix, email HTML, PDF/print
✅ CMS headless: API REST headless, webhook out por página, preview embed JS SDK, personalización server-side
✅ Cumplimiento enterprise: SOC 2, pentest, DPA, sub-processors, data residency, SLA, enterprise contract
✅ i18n completo: translation memory, translation workflow, pseudo-localization, language fallback, pluralization
✅ Export para diseñadores: Figma, Sketch, PDF specs, PNG, ZIP
✅ Plataforma educativa: tutorial interactivo, challenges, certificación, learning paths, playground sandbox
✅ Pricing formal: tabla de planes (Free/Starter/Pro/Team/Enterprise), fair usage policy
✅ Modo noche y bienestar: quiet hours, DND programado, modo noche precavido, focus mode automático
✅ Rendimiento del output: performance budget, auto-minify, lazy loading, critical CSS, preconnect, resource hints, bundle analyzer, regression alerts
✅ Seguridad del output: XSS protection, CSRF tokens, CSP, SQLi protection, HTTPS redirect, security headers, dependabot
✅ Self-hosted profundo: knit health, logs, stats, update, backup, restore, reset, admin dashboard web
✅ AI transparency: AI-generated watermark, confidence score, human review, audit trail, bias detection, usage report
✅ Monetización apps: Stripe Checkout component, paywall, subscription management, metered billing, license keys
✅ Testing del output: unit tests, integration tests, visual regression, link checker, form tests, responsive tests
✅ Offline-first apps: service worker, offline fallback, data sync, stale-while-revalidate, optimistic UI
✅ Modo demo apps: demo mode, time-bomb, demo reset, watermark
✅ Seguridad apps: dependency check, auto-update, SBOM, security advisory
✅ Retrocompatibilidad: component version pinning, deprecation timeline, auto-migration, compatibility report
✅ Perfiles no considerados: discapacidad visual, movilidad reducida, mayores, niños, baja alfabetización, internet lento, multi-idioma, TDAH
✅ Demo del builder: demo rápida, interactive tour, gallery, compare plans, pricing calculator
✅ Privacidad usuarios finales: privacy policy gen, ToS gen, cookie consent GDPR/CCPA/LGPD, data deletion, portability, COPPA
✅ SEO apps: SEO audit, meta/OG tags, sitemap, robots.txt, schema.org, Core Web Vitals prediction
✅ AI local: Ollama, LM Studio, vLLM, Azure OpenAI, AWS Bedrock, GCP Vertex AI
✅ IDP integration: Backstage plugin, Port/Guides, custom API, SSO enterprise reforzado
✅ User research: modo investigación, session recording, heatmaps, A/B testing, surveys
✅ Costos: cost calculator, traffic estimator, revenue projection, break-even analysis
✅ Formatos intercambio: PDF rellenable, CSV/XLSX, Markdown, JSON Schema, OpenAPI/Swagger
✅ Modo legacy: IE11, polyfills, graceful degradation, browser matrix testing
✅ OSC / Control de dispositivos: OSC Bridge, componentes OSC, templates OSC, OSC Discovery
✅ Protocolos hardware: MIDI, DMX512, MQTT, Modbus, BLE, Serial/USB
✅ Developer tools: browser extension, desktop app, API clients (Python/Go/Rust), CLI power tools, Terraform provider, Docker SDK
✅ Business operations: invoicing, cost allocation, usage analytics, audit reports, vendor risk
✅ Community ecosystem: feature voting, templates marketplace, components marketplace, knowledge base, hackathons
✅ Advanced education: academy, live workshops, office hours, case studies
✅ Disaster recovery: multi-region failover, DB replication, backup strategy, incident playbook
✅ UI/UX refinements: smooth transitions, drag & drop, loading states, empty states, error states, 404
✅ Testing environments: dev/staging/production sandbox, promotion workflow
✅ APIs consumidas: GitHub, GitLab, Bitbucket, Linear, Jira
✅ AI avanzado: code review, a11y audit, performance audit, SEO audit, translation quality check
✅ Free trials: trial component, metered trial, conversion funnel
✅ Modo escuela: classes, student dashboard, grading, plagiarism detection
✅ Accesibilidad extrema: WCAG AAA, Section 508, EN 301 549, statement generator
✅ Modo catástrofe: read-only mode, fallback CDN, graceful degradation, emergency contact, SLA credits
✅ Modo nostalgia: HTML 4.01, PDF/A, texto plano, RSS/Atom
✅ Modo científico: NetCDF/HDF5/FITS, scientific charts, LaTeX export, citation generator
✅ Modo legal: court exhibit, chain of custody, legal hold, time-stamped screenshots
✅ Modo salud: HIPAA BA, PHI detection, HIPAA audit log, data encryption
✅ Modo deportes: leaderboard, timer/clock, scoreboard
✅ Modo viajes: booking calendar, maps avanzado, currency converter, weather widget
✅ Air-gapped: offline installer, license offline, network requirements, integrity verification
✅ Custom storage: S3-compatible, NFS/mount, DB BLOB, storage migration tool
✅ Modo análisis proyecto: page views, component usage, action flow stats, session recordings, funnels
✅ Modo monitor app: uptime, performance, error tracking, custom dashboard, alerts
✅ Modo respaldo action flows: version history, diff, rollback, test aislado
✅ Modo purga: unused projects/assets/versions/audit logs/previews
✅ Modo watch: dependency health, version tracking, deprecation alerts, alternative suggestions
✅ Modo recurso: capacity planner, growth estimator, cost comparator, migration planner
✅ Modo scripts/hooks: pre/post export/publish hooks, scheduled scripts
✅ Compliance regulatorio: PCI DSS, SOX, FedRAMP, IRAP, SOC 2+3
✅ Industrias verticales: e-commerce, restaurante, real estate, job board, marketplace, social, dating, wiki
✅ Builder settings: profile, notifications, theme, editor, language, privacy
✅ Builder help: tooltips, F1 contextual, tutorial replay, help search
✅ Builder error pages: 404, 500, offline page
✅ Builder performance: Web Vitals, bundle budget, memory leak detection
✅ Builder a11y: keyboard audit, screen reader audit
✅ Builder i18n: externalized strings, translation platform
✅ Web3/Crypto: wallet connect, NFT gallery
✅ AI Agents: chatbot component, agent deploy, assistant embed
✅ Real-time infra: WebSocket panel, broadcast channel
