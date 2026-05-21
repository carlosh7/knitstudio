# knitstudio — Performance Targets

## Bundle Size

| Artifact | Target gzip | Estrategia |
|----------|:-----------:|------------|
| Runtime (production) | <50KB | Vanilla JS, zero dependencies, tree-shaking |
| Builder initial load | <500KB | Code splitting por ruta, lazy loading de paneles |
| Builder full (all panels) | <1MB | Diferir panels no visibles (Chat, Annotations) |

## Load Time

| Metric | Target | Cómo |
|--------|:------:|------|
| First Paint | <1s | Shell mínimo inline, skeleton loading |
| Time to Interactive | <3s | Preload crítico, diferir no crítico, lazy load |
| Full load (all features) | <5s | Parallel chunk loading, priority hints |

## Runtime Performance

| Scenario | Target | Cómo |
|----------|:------:|------|
| Canvas con 10 componentes | 60fps | Directo, sin virtualización |
| Canvas con 100 componentes | 60fps | Virtual scrolling en palette/layers |
| Canvas con 500+ componentes | 30fps+ | Virtual scrolling + debounced renders |
| Action flow con 50 nodos | <100ms ejecución | Compilado a función plana, no interpretado |
| Export a React (500 componentes) | <5s | esbuild parallel, caché de compilación |
| Undo/Redo (1000 historial) | <10ms | Command pattern en memoria RAM |

## Network

| Request | Target | Cómo |
|---------|:------:|------|
| API response (layouts) | <100ms | Redis cache + PostgreSQL indexed |
| API response (CRUD) | <200ms | Direct query, indexed |
| Static assets | CDN | Cloudflare R2 or similar |
| MCP WebSocket latency | <50ms | Binary framing, keep-alive |

## Monitoring

- Lighthouse CI en cada PR
- Web Vitals: FCP, LCP, TTI, CLS, INP
- Bundle analyzer en CI
- Performance budget enforcement (si se excede, CI falla)
- Real user monitoring post-MVP (PostHog / Plausible)

## Performance Budget

```json
{
  "budgets": [
    { "type": "resource", "resourceType": "script", "budget": 500 },
    { "type": "resource", "resourceType": "total", "budget": 800 },
    { "type": "timing", "metric": "interactive", "budget": 3000 },
    { "type": "timing", "metric": "firstPaint", "budget": 1000 }
  ]
}
```
