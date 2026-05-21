# knitstudio — Connectors & API Integration

> 58 servicios analizados en 12 categorías. 23 nativos, 3 SDK, 32 HTTP genérico.

## Fase 1 — Conectores Core (MVP)

| Conector | Tipo | Auth | ¿Qué expone? |
|----------|:----:|:----:|--------------|
| **HTTP Action** (genérico) | Nativo | Basic, Bearer, OAuth, API Key, Custom | Cualquier REST/GraphQL |
| **Supabase** | Nativo | Service Key + anon key | DB (SQL), Auth, Storage, Realtime |
| **OpenAI** | Nativo | API Key | Chat, Embeddings, Assistants, Images, Audio |
| **Stripe** | Nativo | Secret Key | Payments, Subscriptions, Webhooks, Customers |
| **GitHub** | Nativo | PAT + OAuth | Repos, Issues, PRs, Actions, Content |
| **Vercel** | Nativo | Token | Deploy, Domains, Environment, Logs |

## Fase 2 — Conectores Avanzados

| Conector | Tipo | Auth |
|----------|:----:|:----:|
| PostgreSQL | Nativo | Connection string |
| Anthropic Claude | Nativo | API Key |
| Resend / SendGrid | Nativo | API Key |
| Clerk / NextAuth | Nativo | Secret Key |
| Slack / Discord | Nativo | Webhook URL + Bot Token |
| Google APIs | Nativo | OAuth 2.0 |

## Fase 3 — Conectores Extendidos

| Conector | Tipo |
|----------|:----:|
| Firebase | SDK |
| AWS S3 / Cloudflare R2 | Nativo |
| Sentry / PostHog / Plausible | HTTP |
| Twilio (SMS, WhatsApp) | Nativo |
| Ollama (local LLM) | HTTP |
| Mailgun / Postmark | HTTP |
| **Sentry** (error tracking) | Nativo |
| **PostHog** (analytics) | Nativo |
| **Plausible** (analytics) | HTTP |
| **Docker Hub / GHCR** (container registry) | HTTP |
| **Slack webhooks** | HTTP |
| **Discord webhooks** | HTTP |

## Flujo WordPress

```
1. Usuario conecta su WordPress a knitstudio
   → Ingresa URL del sitio + Application Password (o plugin)
   → knitstudio descubre páginas, posts, templates, theme.json

2. Selecciona qué página editar
   → knitstudio descarga el contenido via WP REST API
   → Convierte Gutenberg blocks → componentes knitstudio
   → Renderiza la página en el canvas

3. Edita visualmente en knitstudio
   → Cambia textos, colores, layout, imágenes
   → Arrastra nuevos componentes (que se convertirán a blocks)

4. Publica de vuelta a WordPress
   → knitstudio convierte componentes → Gutenberg blocks
   → Envía via WP REST API (POST /wp/v2/pages/{id})
   → O exporta como HTML para pegar en el editor clásico

Requisitos técnicos:
  • Plugin WordPress opcional (mejor integración, más features)
  • Sin plugin: Application Passwords + WP REST API (features básicas)
  • Mapeo de componentes: knitstudio card → WP cover/group block
  • Soporte para theme.json (colores, tipografía del theme activo)
  • WordPress Playground preview integrado
```

## Arquitectura de Conectores

## Infraestructura del Builder

| Servicio | Propósito | Integración |
|----------|-----------|-------------|
| **Sentry** | Error tracking del builder (capturar crashes, errores de red, bugs) | SDK nativo + source maps |
| **PostHog** | Analytics de uso (qué features usan más, funnel de adopción, retención) | SDK nativo |
| **Docker Hub / GHCR** | Publicar imágenes docker de knitstudio para `docker compose up` | GitHub Actions → push automático |
| **Kubernetes Helm chart** | Despliegue enterprise orquestado | Helm repo + CI/CD |
| **Terraform** | Infraestructura como código (AWS/GCP/Azure) | Terraform Registry |
| **Slack / Discord webhooks** | Notificaciones de publish, errores, deploys | HTTP Action genérico |

Cada conector se implementa como un plugin con:

```
connector/
├── index.js        → Definición: triggers + actions + auth
├── schema.js       → Input/output schema para el action flow
├── auth.js         → Configuración de autenticación
├── triggers.js     → Eventos que inician action flows
│   (onPayment, onMessage, onWebhook, etc)
└── actions.js      → Pasos que el action flow puede ejecutar
    (createCustomer, sendMessage, queryDB, etc)
```

## Uso en Action Flows

```json
{
  "trigger": "onClick",
  "steps": [
    {
      "type": "connector_call",
      "connector": "stripe",
      "action": "createCheckoutSession",
      "params": {
        "amount": "{{ form.total }}",
        "currency": "usd",
        "successUrl": "https://miapp.com/success"
      }
    },
    {
      "type": "connector_call",
      "connector": "supabase",
      "action": "insert",
      "params": {
        "table": "orders",
        "data": {
          "user_id": "{{ currentUser.id }}",
          "total": "{{ form.total }}",
          "stripe_session_id": "{{ $result.id }}"
        }
      }
    }
  ]
}
```

## Auto-discovery de APIs del proyecto anfitrión

Cuando knitstudio se conecta a un proyecto existente (check, planner, etc):

1. Escanea las rutas del backend
2. Detecta endpoints REST + métodos + parámetros
3. Los expone como conectores disponibles en el action editor
4. El usuario puede arrastrarlos directamente sin configurar URL

```json
// Endpoints auto-descubiertos de Check Pro:
// GET    /api/guests/{eventId}
// POST   /api/guests/{eventId}
// PUT    /api/guests/{eventId}/{guestId}
// DELETE /api/guests/{eventId}/{guestId}
// POST   /api/guests/{eventId}/checkin
// GET    /api/events
// POST   /api/events
// ...etc
```

## Protocolo OSC — Control de dispositivos en tiempo real

### ¿Qué es OSC?
OSC (Open Sound Control) es un protocolo de comunicación en red para dispositivos multimedia:
- Consolas de audio digital (Yamaha, Behringer)
- Controladores DMX (iluminación profesional)
- DAWs (Ableton Live, Reaper, Resolume)
- Sintetizadores y módulos de sonido
- Sistemas de proyección y video mapping
- Plataformas robóticas
- Instalaciones interactivas

### ¿Qué puede hacer knitstudio con OSC?

```
knitstudio permite DISEÑAR VISUALMENTE interfaces de control
que se comunican con dispositivos OSC en la red local.

Ejemplo: Diseñas un mixer de audio táctil en knitstudio
         → lo abres en tu iPad
         → mueves un fader → OSC message → consola de sonido
         → la consola responde → OSC message → fader se mueve

Sin programar. Solo arrastras componentes y los conectas visualmente.
```

### Componentes OSC específicos

| Componente | OSC Message | Uso típico |
|------------|-------------|------------|
| **Fader** | `/channel/1/volume` value 0-127 | Mezclador de audio |
| **Knob** | `/filter/cutoff` value 0-1 | Control de sintetizador |
| **Button** | `/scene/1/launch` 1 | Lanzar escena en Ableton |
| **Toggle** | `/effect/reverb/active` 0/1 | Activar/desactivar efecto |
| **XY Pad** | `/pan/position` x y | Panorámica estéreo |
| **Color Picker** | `/light/1/rgb` r g b | Control de luz DMX |
| **Slider** | `/master/volume` value 0-100 | Volumen general |
| **Rotary** | `/eq/mid/frequency` value | Ecualizador paramétrico |
| **Meter** | `/channel/1/level` (receive) | Medidor de nivel (feedback) |
| **Waveform** | `/visualizer/wave` (receive) | Visualización de onda |

### Conexión OSC en knitstudio

```
1. Abres un proyecto OSC en knitstudio (o conviertes web -> OSC)
2. Arrastras controles: faders, knobs, buttons, XY pads
3. Configuras el destino OSC:
   - IP del dispositivo (ej: 192.168.1.100)
   - Puerto (ej: 8000)
   - Path OSC (ej: /channel/1/volume)
   - Tipo de dato (int, float, string, blob)
4. La interfaz se comunica en tiempo real via WebSocket -> OSC bridge
5. Puedes abrir la interfaz en navegador, iPad, celular o pantalla táctil
```

### Arquitectura OSC

```
Navegador (interfaz diseñada en knitstudio)
  [Fader] [Knob] [Buttons] [XY Pad] [Color] [Meters]
       |
       | WebSocket
       v
knitstudio OSC Bridge (Node.js)
  - Recibe WebSocket del navegador
  - Traduce a mensajes OSC
  - Envía UDP al dispositivo
  - Recibe feedback del dispositivo
  - Reenvía al navegador via WebSocket
       |
       | UDP
       v
Dispositivo OSC (consola, DAW, DMX, sintetizador)
  Responde a: /channel/1/volume 0.75
  Envía feedback: /channel/1/level 0.8
```

### Templates OSC incluidos

| Template | Descripción |
|----------|-------------|
| **Mixer 8 canales** | 8 faders + mute/solo + master |
| **DJ Controller** | 2 decks, crossfader, EQ, effects |
| **Lighting Console** | DMX channels, color picker, strobe |
| **Ableton Live Control** | Scene launch, clip stop, transport |
| **Resolume Arena** | Layer control, effects, transitions |
| **Parametric EQ** | 4-band EQ con knobs y RTA |
| **Stage Monitor Mix** | Mix personalizado para cada músico |

### Mapeo OSC ejemplo

```json
{
  "component": "fader",
  "osc": {
    "path": "/channel/1/volume",
    "type": "float",
    "min": 0.0,
    "max": 1.0,
    "response": "/channel/1/level"
  },
  "props": {
    "label": "Canal 1",
    "color": "#00ff88",
    "default": 0.75
  }
}
```

### Limitaciones OSC
- OSC funciona en RED LOCAL. No está diseñado para internet.
- Latencia tipica: <5ms en red local. Depende del dispositivo y WiFi.
- No todos los dispositivos OSC soportan feedback (receive).
- OSC no es seguro por defecto (sin encriptación). Usar en redes confiables.
