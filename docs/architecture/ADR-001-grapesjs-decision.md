# ADR-001: GrapesJS como Canvas Engine

**Fecha:** 2026-05-20
**Estado:** Aceptado
**Decisión:** GrapesJS + @grapesjs/react

## Contexto

knitstudio necesita un canvas engine para su page designer visual. Dos opciones principales fueron evaluadas: GrapesJS (25.8k⭐) y BlockSuite (5.8k⭐). La decisión es crítica porque define la arquitectura del componente central del builder.

## Opciones Evaluadas

### GrapesJS
- **Stars:** 25.8k
- **Licencia:** BSD 3-Clause
- **Propósito:** Web Builder Framework (drag & drop HTML/CSS)
- **React wrapper:** @grapesjs/react oficial
- **Built-in:** Style Manager, Layer Manager, Block Manager, Asset Manager, Code Viewer, Pages
- **Ecosistema:** 50+ plugins oficiales y comunitarios
- **Canvas:** Iframe aislado (seguridad por defecto)
- **Madurez:** 10+ años, 115 releases, 6,232 commits

### BlockSuite
- **Stars:** 5.8k
- **Licencia:** MPL 2.0
- **Propósito:** Editor/Document toolkit (tipo Notion/AFFiNE)
- **React wrapper:** No tiene (web components nativos)
- **Built-in:** CRDT (Yjs) para colaboración, inline editor rico
- **Ecosistema:** Pequeño, principalmente AFFiNE
- **Canvas:** PageEditor (documento) + EdgelessEditor (lienzo libre)
- **Madurez:** ~3 años, 64 releases, 6,594 commits

## Criterios de Evaluación

1. **Adecuación al propósito (page builder visual)** — Peso: Alto
2. **Madurez y estabilidad** — Peso: Alto
3. **Ecosistema de plugins** — Peso: Medio
4. **Integración con React 19** — Peso: Alto
5. **Licencia (compatibilidad MIT)** — Peso: Medio
6. **Facilidad de exportación multi-framework** — Peso: Alto
7. **Colaboración en tiempo real** — Peso: Bajo (post-MVP)

## Decisión

Se elige **GrapesJS + @grapesjs/react** por las siguientes razones:

| Criterio | GrapesJS | BlockSuite |
|----------|:--------:|:----------:|
| Page builder visual | ✅ Excelente | ⚠️ Document editor |
| Madurez | ✅ 10+ años | ⚠️ ~3 años |
| Ecosistema plugins | ✅ 50+ plugins | ❌ Pequeño |
| React wrapper | ✅ @grapesjs/react | ❌ Web components |
| Style Manager built-in | ✅ Sí | ❌ No tiene |
| Layer Manager built-in | ✅ Sí | ❌ Parcial |
| Licencia | ✅ BSD 3-Clause | ⚠️ MPL 2.0 |
| Export HTML/CSS | ✅ Nativo | ❌ Necesita transformación |
| Colaboración nativa | ❌ Requiere Yjs externo | ✅ CRDT nativo |

### Ventajas clave de GrapesJS para knitstudio

1. **Ahorra meses de desarrollo:** GrapesJS ya tiene Style Manager (edición visual de CSS), Layer Manager (árbol de componentes), Block Manager (palette), Asset Manager, Code Viewer. Todo esto habría que construirlo desde cero con BlockSuite.

2. **Export-friendly:** GrapesJS trabaja con HTML/CSS nativo, lo que hace directa la exportación a HTML, React, Vue, etc. BlockSuite trabaja con su propio modelo de bloques Yjs que requiere transformación.

3. **Arquitectura de iframe:** GrapesJS aísla el canvas en un iframe, lo que da seguridad por defecto (postMessage bridge, origin validation) y coincide con la arquitectura planteada en el plan.

4. **Plugin ecosystem:** GrapesJS tiene un sistema de plugins maduro que sirve como inspiración directa para el Plugin SDK de knitstudio.

### Desventaja y mitigación

- **Colaboración no nativa:** GrapesJS no tiene colaboración en tiempo real integrada. BlockSuite sí (vía Yjs). Mitigación: la colaboración es post-MVP, y se puede integrar Yjs como storage adapter de GrapesJS cuando sea necesario.

## Consecuencias

- El canvas del builder usará iframe aislado con comunicación vía GrapesJS API
- @grapesjs/react permite construir la UI del builder en React puro
- Los componentes knitstudio se registrarán como GrapesJS components + blocks
- El Style Manager de GrapesJS se reutilizará y extenderá
- Para colaboración (post-MVP), se integrará Yjs como capa de storage
- La estructura modular del monorepo se mantiene independientemente de esta decisión

## Referencias

- GrapesJS: https://github.com/GrapesJS/grapesjs
- @grapesjs/react: https://github.com/GrapesJS/react
- BlockSuite: https://github.com/toeverything/blocksuite
- Documentación GrapesJS: https://grapesjs.com/docs/
- Documentación BlockSuite: https://blocksuite.io/guide/overview.html
