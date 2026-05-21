# knitstudio — Universal JSON Schema

> Schema único para todos los targets. El mismo JSON se traduce a Web DOM, React, RN, Vue, etc.

## Principios

1. **Un schema, múltiples renderers** — el JSON describe QUÉ renderizar, no CÓMO
2. **Platform overrides** — ajustes por target sin romper el schema único
3. **Versiones** — schema versionado (v1.0.0) con compatibilidad hacia atrás
4. **Extensible** — nuevos targets no requieren cambiar el schema, solo agregar renderer

## Estructura General

```jsonc
{
  "$schema": {
    "version": "1.0.0",
    "targets": ["web", "react-native", "capacitor"],
    "meta": {
      "name": "Mi Proyecto",
      "description": "...",
      "minTargetVersion": {
        "web": "1.0.0",
        "react-native": "1.0.0"
      }
    }
  },

  "theme": {
    "colors": { ... },
    "typography": { ... },
    "spacing": { ... },
    "breakpoints": { "sm": 640, "md": 768, "lg": 1024, "xl": 1280 },
    "shadows": { ... },
    "borderRadius": { ... }
  },

  "variables": {
    "global": {
      "currentUser": { "type": "object", "default": null },
      "isLoading": { "type": "boolean", "default": false }
    }
  },

  "templates": {
    "authLayout": { "root": { ... } },
    "errorPage": { "root": { ... } }
  },

  "pages": [
    {
      "id": "dashboard",
      "route": "/dashboard",
      "title": "Panel de Control",
      "meta": {
        "description": "...",
        "auth": true,
        "roles": ["admin", "editor"]
      },
      "bindings": {
        "users": {
          "source": "api",
          "path": "/api/users",
          "cache": true,
          "ttl": 300000
        }
      },
      "root": {
        "type": "flex",
        "key": "dashboard-root",
        "styles": {
          "base": {
            "flexDirection": "row",
            "minHeight": "100vh",
            "bgColor": "{colors.background}"
          },
          "responsive": [
            { "breakpoint": "sm", "styles": { "flexDirection": "column" } }
          ],
          "platform": {
            "react-native": {
              "paddingTop": 44  // SafeArea
            }
          }
        },
        "children": [ ... ]
      }
    }
  ]
}
```

## TypeScript Types (resumen)

```typescript
// Core
interface AppSchema {
  $schema: SchemaVersion;
  theme: Theme;
  variables: VariableDefinitions;
  templates: Record<string, TemplateDefinition>;
  pages: PageDefinition[];
}

interface ComponentNode {
  type: string;           // 'button' | 'text' | 'flex' | 'card' | ...
  key: string;            // Identificador único en la página
  props?: Record<string, PropValue>;  // Propiedades del componente
  styles?: StylesDefinition;           // Estilos base + responsive + platform
  children?: ComponentNode[];          // Componentes anidados
  actions?: Record<string, ActionFlow>; // Eventos + steps
  bindings?: Record<string, string>;    // { data: "{{ users }}" }
  condition?: string;                    // {{ variable === 'x' }}
  repeat?: RepeatDefinition;            // Loop sobre arrays
}

interface StylesDefinition {
  base: Record<string, string>;                    // Estilos base
  responsive?: Array<{                              // Por breakpoint
    breakpoint: string;
    styles: Record<string, string>;
  }>;
  platform?: Record<string, Record<string, string>>; // Por target
}

interface ActionFlow {
  trigger: string;         // 'onClick' | 'onChange' | 'onSubmit' | ...
  steps: ActionStep[];    // Pasos a ejecutar
  debounce?: number;       // Debounce en ms
}

interface ActionStep {
  type: 'apiCall' | 'navigate' | 'setVariable' | 'showToast' |
        'showDialog' | 'refresh' | 'condition' | 'loop' | 'delay' |
        'tryCatch' | 'code' | 'dispatchEvent';
  // Cada type tiene sus props específicas
}
```

## Style Mapping: Web → RN

| CSS | RN StyleSheet |
|-----|---------------|
| `backgroundColor` | `backgroundColor` |
| `padding: 16` | `padding: 16` |
| `borderRadius: 8` | `borderRadius: 8` |
| `boxShadow: 0 2px 4px rgba(0,0,0,0.2)` | `shadowColor + shadowOffset + shadowOpacity + shadowRadius + elevation` |
| `display: flex` | (default en RN) |
| `gap: 8` | `gap: 8` |
| `position: absolute` | `position: 'absolute'` |
| `zIndex: 10` | `zIndex: 10` |
| `overflow: hidden` | `overflow: 'hidden'` |
| `cursor: pointer` | (no existe, se usa TouchableOpacity) |
