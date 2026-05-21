# 🧶 knitstudio — Guía de Inicio para Novatos

> Bienvenido a knitstudio. Esta guía está diseñada para **personas sin experiencia técnica** que quieren crear aplicaciones visuales. No necesitas saber programar.

---

## 📋 ¿Qué necesitas?

- Un **navegador moderno** (Chrome, Edge, Firefox, Safari) — últimas 2 versiones
- Opcional: [Docker Desktop](https://docker.com) para la instalación local
- **3 minutos** para tu primera app

---

## 🎯 Tu primera app en 5 pasos

### Paso 1: Abre knitstudio

```
1. Abre tu navegador
2. Ve a http://localhost:3000 (o a knitstudio.io si usas cloud)
3. Verás la pantalla de bienvenida 🎉
```

**¿Qué ves?**
- El logo "knitstudio" arriba
- Un mensaje de bienvenida
- Un botón "Create your first project"

### Paso 2: Crea un proyecto

```
1. Click en "Create your first project"
2. Escribe el nombre: "Mi primera app"
3. Click "Create"
```

**¡Felicidades!** Acabas de crear tu primer proyecto. Ahora verás el **Dashboard** con tu proyecto listado.

### Paso 3: Entra al builder

```
1. Click en el nombre de tu proyecto ("Mi primera app")
2. ¡Bienvenido al builder!
```

**El builder tiene 3 partes:**

```
┌─────────────────────────────────────────────────┐
│  ← Dashboard │ knitstudio │ Simple │ Advanced │
├─────────────────────────────────────────────────┤
│                                                 │
│   [Components] [Layers] [Styles] [Actions]      │
│                                                 │
│   ┌─────────────────────────────────────────┐   │
│   │                                         │   │
│   │         CANVAS (área de diseño)          │   │
│   │                                         │   │
│   │   Arrastra componentes aquí             │   │
│   │                                         │   │
│   └─────────────────────────────────────────┘   │
│                                                 │
└─────────────────────────────────────────────────┘
```

### Paso 4: Agrega componentes

```
1. Click en "Components" (panel izquierdo)
2. Verás una lista de componentes: Button, Text, Container, Card, etc.
3. Arrastra "Text" desde el panel al canvas (el área blanca central)
4. Aparecerá un texto en el canvas
5. Arrastra "Button" debajo del texto
6. Arrastra "Card" debajo del botón
```

**¿Qué pasó?** Acabas de crear una página con un texto, un botón y una tarjeta — sin escribir código.

### Paso 5: Publica

```
1. Click en "Publish" (arriba a la derecha)
2. ¡Listo! Tu página está publicada
```

---

## 🎮 El panel de componentes (35+)

Cuando haces click en **Components**, ves todos los componentes disponibles agrupados por categoría:

| Categoría | Componentes | ¿Para qué? |
|-----------|-------------|------------|
| **Basic** | Button, Text, Icon, Divider | Elementos básicos de UI |
| **Layout** | Container, Stack, Card, Spacer, ScrollView | Estructura de la página |
| **Form** | TextInput, Form, Select, Checkbox, RadioGroup | Formularios y entradas |
| **Navigation** | Navbar, Footer, Sidebar, Tabs, Stepper | Navegación entre secciones |
| **Data** | Table, DataList, Chart, Pagination, SearchBar | Mostrar datos |
| **Feedback** | Loading, EmptyState | Estados de carga |
| **Media** | Image | Imágenes |

**Pro tip:** Cada componente se puede arrastrar al canvas. Una vez allí, puedes:
- **Seleccionarlo** con click
- **Moverlo** arrastrando
- **Eliminarlo** con la tecla Delete
- **Editarlo inline** selecciona el componente y presiona la tecla `E`

---

## 🔧 El modo Simple vs Advanced

knitstudio tiene **dos modos** de uso, y puedes cambiarlos en cualquier momento:

### 🟢 Modo Simple (para empezar)

```
Simple        [Active]    Advanced
```

En modo Simple ves solo lo esencial:
- Botón "Publish" con wizard guiado
- Componentes básicos en el panel
- Menos opciones, menos confusión

**Ideal para**: principiantes, no-técnicos, primeros proyectos

### 🔵 Modo Advanced (para profesionales)

```
Simple               [Active]    Advanced
```

En modo Advanced ves TODO:
- Todos los paneles: Components, Layers, Styles, Actions, Data, AI, Safety, Versions, Monitor, SelfEdit, Sandbox
- Editor completo de estilos
- Data binding
- Action flows
- AI generation
- Y mucho más

**Ideal para**: developers, diseñadores, proyectos complejos

---

## 💡 Funciones que deberías conocer

### 🔍 Búsqueda Global (Cmd+K)
Presiona `Cmd+K` (Mac) o `Ctrl+K` (Windows/Linux) para abrir un buscador tipo Spotlight.
Busca páginas, componentes, acciones y configuraciones.

### ⌨️ Atajos de Teclado
Presiona la tecla `?` en cualquier momento para ver todos los atajos disponibles.

| Atajo | Acción |
|-------|--------|
| `Ctrl+Z` | Deshacer |
| `Ctrl+Shift+Z` | Rehacer |
| `Ctrl+S` | Guardar |
| `E` | Editar texto inline |
| `?` | Ver atajos |
| `Cmd+K` | Buscar |
| `Delete` | Eliminar componente |

### 🏖️ Modo Sandbox
Activa el modo Sandbox para experimentar sin miedo:
- Tus cambios **no se guardan**
- Ideal para aprender y probar
- Se activa con el botón "Sandbox" en el toolbar

### 🧠 Generar con AI
1. Click en "AI" en el toolbar
2. Escribe lo que quieres crear
3. La IA genera el layout automáticamente

**Ejemplos de prompts:**
- "un formulario de login con email y contraseña, tema oscuro"
- "un dashboard con sidebar, 3 tarjetas de estadísticas y una tabla"
- "una landing page con hero, características, precio y footer"

---

## 🚨 ¿Algo salió mal?

| Problema | Solución |
|----------|----------|
| "No veo el canvas" | Click en ← Dashboard y vuelve a entrar |
| "Perdí mi trabajo" | El autoguardado cada 30s lo conserva. Recarga la página |
| "Rompi todo" | Usa la función Safety Net: panel "Safety" → elige un snapshot anterior |
| "No me gusta" | Click en "← Dashboard" para empezar de nuevo |
| "Dudas?" | Presiona `?` para atajos, o click en 💬 para enviar feedback |

---

## 📚 Siguientes pasos

Ahora que conoces lo básico:

1. **Guía de Componentes** → docs/guide/components.md
2. **Conexión de APIs** → docs/tutorials/connect-api.md
3. **Exportar a código** → docs/tutorials/export.md
4. **Usar con IA** → docs/tutorials/ai.md
5. **Comparación con otras herramientas** → docs/COMPARISON.md

---

<div align="center">
  <p>¿Dudas? Presiona 💬 en el toolbar para enviarnos feedback</p>
  <p><strong>knitstudio — Crea sin límites</strong></p>
</div>
