# ADR-002: Zustand como State Manager

**Fecha:** 2026-05-20
**Estado:** Aceptado
**Decisión:** Zustand con middleware `persist` para IndexedDB

## Contexto

El builder necesita manejar estado global compartido entre múltiples paneles, el canvas y la toolbar. Los requisitos incluyen:
- Persistencia en IndexedDB para datos críticos (undo, drafts, preferencias)
- Reactividad: cambios en el estado deben reflejarse inmediatamente en la UI
- Simplicidad: el equipo debe poder agregar nuevas stores sin boilerplate
- Compatibilidad con React 19 y TypeScript estricto

## Opciones Evaluadas

### Zustand (elegido)
- **Bundle:** ~1KB gzip
- **Persistencia:** middleware `persist` built-in con soporte IndexedDB/localStorage
- **Reactividad:** selectores con `useStore(selector)` — solo re-renderiza cuando cambia el valor seleccionado
- **TypeScript:** tipado completo sin ceremonia
- **Tests:** facilidad para testear stores fuera de React

### Context + useReducer
- **Bundle:** 0KB (nativo)
- **Persistencia:** requiere implementación manual
- **Problema:** re-renderiza todos los consumidores cuando cualquier valor cambia
- **Problema:** anidamiento de Providers crece con cada store nuevo

### Redux Toolkit
- **Bundle:** ~12KB gzip
- **Persistencia:** redux-persist
- **Problema:** demasiado boilerplate para un proyecto de este tamaño
- **Problema:** curva de aprendizaje para contribuidores

### Jotai / Valtio
- **Bundle:** ~3KB
- **Problema:** ecosistema más pequeño, menos recursos
- **Problema:** el patrón atómico no siempre es intuitivo para stores globales grandes

## Decisión

Se elige **Zustand** por:
1. **1KB gzip** — no impacta el performance budget
2. **`persist` middleware** — IndexedDB out of the box para undo, drafts, y preferencias
3. **Selectores** — cada panel solo re-renderiza cuando su slice de estado cambia
4. **Simplicidad** — ~5 líneas por store, sin actions ni reducers
5. **Testeable** — `getState()` y `setState()` funcionan sin React

## Stores implementadas (9)

| Store | Propósito | Persiste | Key IndexedDB |
|-------|-----------|----------|---------------|
| `useBuilderStore` | Editor, modo, panel activo | ❌ | - |
| `useUIStore` | Toasts, search, modales | ✅ | `knitstudio-ui` |
| `useUndoStore` | Undo/Redo (200 snapshots) | ✅ | `knitstudio-undo` |
| `useSaveStore` | Draft/Publish, dirty state | ✅ | `knitstudio-save` |
| `useGridStore` | Snap to grid, overlay | ✅ | `knitstudio-grid` |
| `useDataBindingStore` | Data sources, bindings | ✅ | `knitstudio-databinding` |
| `useSafetyNetStore` | Safety snapshots (50) | ✅ | `knitstudio-safety` |
| `useOnboardingStore` | Onboarding progreso, perfil | ✅ | `knitstudio-onboarding` |
| `useStateExplorerStore` | Variables de estado activas | ❌ | - |

## Consecuencias

- No hay Provider wrapping — las stores se importan donde se necesitan
- Para testing, `useBuilderStore.getState()` permite acceder/setear estado sin montar React
- El middleware `persist` serializa a JSON automáticamente (objetos, arrays, primitivos)
- Funciones y clases no persisten (limitación de JSON serialization)

## Referencias

- Zustand: https://github.com/pmndrs/zustand
- ADR-001: Decisión GrapesJS como Canvas Engine
