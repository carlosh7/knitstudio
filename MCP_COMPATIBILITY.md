# knitstudio — MCP Server Compatibility

> Protocolo: MCP 2025-06-18 con negociación descendente

## Transportes Soportados

| Transporte | Uso | Clientes |
|------------|-----|----------|
| **stdio** | Clientes locales (línea de comandos) | opencode, Claude Desktop, Claude Code, Cursor, Cline, Continue, Zed, JetBrains |
| **HTTP Streamable** | Clientes remotos (web/cloud) | ChatGPT, Claude.ai, Claude Code, Windsurf, Gemini CLI |
| **SSE** (legacy) | Compatibilidad con clientes antiguos | Deprecado, solo para transición |

## Clientes Soportados

| Cliente | Transporte | Archivo Config |
|---------|:----------:|----------------|
| opencode | stdio + HTTP | `.mcp.json` |
| Claude Desktop | stdio + HTTP | `claude_desktop_config.json` |
| Claude Code | stdio + HTTP | `.mcp.json` o `claude.json` |
| Cursor | stdio | `.cursor/mcp.json` |
| Windsurf | stdio + HTTP | Settings UI |
| Cline | stdio + HTTP | `cline_mcp_settings.json` |
| Copilot (VS Code) | stdio + HTTP | `.vscode/mcp.json` |
| Continue | stdio + HTTP | `config.json` |
| ChatGPT | HTTP remoto | Settings UI |
| Claude.ai | HTTP remoto | Settings UI |
| JetBrains | stdio | Plugin settings |
| Gemini CLI | stdio + HTTP | Config CLI |

## Configuración por Plataforma

### Linux — opencode
```json
{
  "mcpServers": {
    "knitstudio": {
      "command": "docker",
      "args": ["exec", "-i", "knitstudio-mcp", "node", "/app/mcp-server/index.js"],
      "env": { "UI_STUDIO_PROJECT": "check" }
    }
  }
}
```

### Windows — opencode + antigravity
```json
{
  "mcpServers": {
    "knitstudio": {
      "command": "npx",
      "args": ["@knitstudio/mcp-server"],
      "env": {
        "UI_STUDIO_PROJECT": "check",
        "UI_STUDIO_MODE": "windows",
        "UI_STUDIO_ANTIGRAVITY_PATH": "C:\\Users\\carlo\\check\\antigravity_bridge.ps1"
      }
    }
  }
}
```

### macOS — Claude Desktop
```json
{
  "mcpServers": {
    "knitstudio": {
      "command": "npx",
      "args": ["@knitstudio/mcp-server"],
      "env": { "UI_STUDIO_PROJECT": "check" }
    }
  }
}
```

### Cualquier plataforma — Cursor
```json
{
  "mcpServers": {
    "knitstudio": {
      "command": "npx",
      "args": ["@knitstudio/mcp-server"],
      "env": { "UI_STUDIO_PROJECT": "check" }
    }
  }
}
```

## MCP Tools Expuestas (50+)

### Pages
- `studio.create_page({ projectId, name, route, template })`
- `studio.delete_page({ pageId })`
- `studio.duplicate_page({ pageId, newName, newRoute })`

### Components
- `studio.add_component({ pageId, type, props, parentId, position })`
- `studio.remove_component({ pageId, elementId })`
- `studio.move_component({ pageId, elementId, parentId, position })`
- `studio.update_props({ pageId, elementId, props })`
- `studio.update_content({ pageId, elementId, content })`

### Styles
- `studio.set_styles({ pageId, elementId, styles })`
- `studio.set_style_property({ pageId, elementId, property, value })`
- `studio.add_class({ pageId, elementId, className })`
- `studio.remove_class({ pageId, elementId, className })`

### Action Flows
- `studio.create_action_flow({ pageId, elementId, trigger, steps })`
- `studio.update_action_flow({ pageId, elementId, flowId, steps })`
- `studio.remove_action_flow({ pageId, elementId, flowId })`

### Data
- `studio.connect_api({ pageId, componentId, endpoint, method, mapping })`
- `studio.set_variable({ pageId, name, value })`
- `studio.bind_data({ pageId, componentId, variable, property })`

### Publish
- `studio.publish({ pageId, environment })`
- `studio.rollback({ pageId, version })`
- `studio.schedule_publish({ pageId, datetime })`

### Annotations
- `studio.add_note({ pageId, elementId, rect, content })`
- `studio.resolve_note({ noteId })`
- `studio.chat({ noteId | elementId, message })`
- `studio.get_annotations({ pageId })`

### Analysis
- `studio.analyze_layout({ pageId })`
- `studio.check_accessibility({ pageId })`
- `studio.performance_audit({ pageId })`

### Control
- `studio.undo()` / `studio.redo()`
- `studio.get_screenshot()`
- `studio.sync()`

## MCP Resources

- `studio://project/{id}` → datos del proyecto
- `studio://layout/{id}` → árbol de componentes + estilos + actions
- `studio://element/{layoutId}/{elementId}` → elemento específico
- `studio://components/{projectType}` → componentes disponibles
- `studio://api-endpoints/{projectId}` → endpoints auto-descubiertos
- `studio://annotations/{pageId}` → notas activas
- `studio://canvas/screenshot` → captura del canvas actual
- `studio://state/{layoutId}` → variables de estado actuales

## CLI Wizard

```bash
# Configura knitstudio MCP para cualquier cliente
npx @knitstudio/mcp connect

# Te pregunta:
# ¿Qué cliente usas? → opencode | claude | cursor | windsurf | ...
# ¿Plataforma? → linux | mac | windows
# ¿Entorno? → local (docker) | remoto (url)

# Genera el archivo de configuración correcto
# en la ubicación correcta para ese cliente y plataforma
```

## Antigravity Bridge

```powershell
# Windows: antigravity_bridge.ps1
git add .
git commit -m "knitstudio update"
git push origin main
git tag v{VERSION} HEAD
git push origin v{VERSION}
# Pull en clon Docker + rebuild + health check
```

```bash
# Linux/Mac: antigravity_bridge.sh (misma lógica)
```
