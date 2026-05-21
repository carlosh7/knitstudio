# @knitstudio/panels — Lazy-loadable panels

This package is an entry-point facade for lazy-loading builder panels.

## Architecture

Panel source code lives in `@knitstudio/builder/src/panels/`.  
At build time, Vite code-splits each panel into a separate chunk:

```
packages/builder/src/panels/
├── BlocksPanel.tsx        ← Component palette
├── ActionFlowPanel.tsx    ← React Flow editor
├── DataBindingPanel.tsx   ← API sources + execution
├── AIPromptPanel.tsx      ← AI generation
├── SafetyNetPanel.tsx     ← Snapshot timeline
├── VersionBrowser.tsx     ← Version history
├── MonitoringDashboard.tsx ← Metrics
├── SelfEditPanel.tsx      ← Self-edit mode
├── ComponentSandbox.tsx   ← Isolated preview
├── SettingsPanel.tsx      ← Settings modal
└── ShortcutsPanel.tsx     ← Keyboard shortcuts
```

## Usage

```ts
// Lazy import for code splitting
const BlocksPanel = lazy(() => import("@knitstudio/builder/panels/BlocksPanel"));
```

## Performance

- Simple mode: imports 0 panels (just canvas + toolbar) — <200KB gzip
- Advanced mode: imports panels on demand — <500KB gzip total
