# 📖 Manual de Funciones y Capacidades

> Referencia completa de todas las capacidades de knitstudio v1.0.0

---

## 1. Dashboard (Panel Principal)

Al abrir knitstudio, el **Dashboard** es tu centro de control:

| Elemento | Descripción |
|----------|-------------|
| Lista de proyectos | Todos tus proyectos ordenados por última modificación |
| New Project | Crea un nuevo proyecto desde cero |
| Delete | Elimina un proyecto (no se puede deshacer) |
| Click en proyecto | Entra al builder para editar |

### Estados del Dashboard

- **Vacío**: Si no tienes proyectos, verás un mensaje de bienvenida con un botón para crear tu primer proyecto
- **Con proyectos**: Lista con nombre, tipo y fecha de última modificación
- **Carga**: Mientras se cargan los proyectos ("Loading projects...")

---

## 2. Builder (Editor Visual)

El builder es el corazón de knitstudio. Se divide en:

### 2.1 Toolbar (Barra Superior)

```
← Dashboard | knitstudio v1.0.0 | [Simple|Advanced] | 🔍 [Components|Layers|Styles|Actions|Data|AI|Safety|Versions|Monitor|SelfEdit|Sandbox] 🖼📋🗺💬⚙ [⌨] [⊞] [Publish]
```

| Elemento | Función |
|----------|---------|
| ← Dashboard | Volver al listado de proyectos |
| Simple/Advanced | Cambiar modo de uso |
| 🔍 | Búsqueda global (Cmd+K) |
| Components | Panel de componentes arrastrables |
| Layers | Árbol de componentes del canvas |
| Styles | Editor de estilos visual |
| Actions | Editor de action flows (React Flow) |
| Data | Panel de data binding y fuentes de datos |
| AI | Generación por inteligencia artificial |
| Safety | Snapshots de seguridad (safety net) |
| Versions | Historial de versiones con diff y rollback |
| Monitor | Dashboard de monitoreo en vivo |
| SelfEdit | Modo auto-edición del builder |
| Sandbox | Modo sandbox (sin guardar) |
| 🖼 | Galería de ejemplos (Showcase) |
| 📋 | Changelog de versiones |
| 🗺 | Roadmap del proyecto |
| 💬 | Enviar feedback |
| ⚙ | Configuración (API key, import) |
| ⌨ | Atajos de teclado |
| ⊞ | Configuración de grid |
| Publish | Publicar proyecto |

### 2.2 Canvas (Área de Diseño)

El canvas es donde construyes tu interfaz visualmente:

- **Drag & Drop**: arrastra componentes desde el panel al canvas
- **Selección**: click para seleccionar, click fuera para deseleccionar
- **Grid**: activa el grid overlay desde ⊞ para alinear componentes
- **Snap**: activa snap-to-grid para alineación perfecta

### 2.3 Paneles Laterales

Cada botón en el toolbar abre un panel lateral con funcionalidades específicas.

---

## 3. Panel de Componentes (35+)

### 3.1 Basic
| Componente | Props | Descripción |
|------------|-------|-------------|
| Button | text, variant, disabled | Botón interactivo |
| Text | content, tag (h1-h3, p, span) | Texto formateado |
| Icon | icon, size | Icono |
| Divider | - | Línea separadora |
| Pressable | - | Contenedor clickeable |

### 3.2 Layout
| Componente | Props | Descripción |
|------------|-------|-------------|
| Container | direction (column/row) | Contenedor flex |
| Stack | direction, gap | Stack de elementos |
| Card | - | Tarjeta con borde y padding |
| Spacer | height | Espaciador vertical |
| ScrollView | - | Contenedor con scroll |

### 3.3 Form
| Componente | Props | Descripción |
|------------|-------|-------------|
| Form | - | Contenedor de formulario |
| TextInput | placeholder, type | Campo de texto |
| Select | placeholder, options | Selector desplegable |
| Checkbox | label, checked | Checkbox |
| RadioGroup | options | Grupo de radios |
| DatePicker | - | Selector de fecha |
| FileUpload | accept | Subida de archivos |
| FormField | label, required | Campo de formulario con label |

### 3.4 Navigation
| Componente | Props | Descripción |
|------------|-------|-------------|
| Navbar | brand | Barra de navegación |
| Footer | - | Pie de página |
| Sidebar | - | Barra lateral |
| Tabs | tabs | Pestañas |
| Stepper | steps, current | Indicador de pasos |

### 3.5 Data
| Componente | Props | Descripción |
|------------|-------|-------------|
| Table | columns | Tabla de datos |
| DataList | - | Lista de datos |
| Chart | type (bar, line, pie) | Gráfico |
| Pagination | total | Paginación |
| SearchBar | placeholder | Barra de búsqueda |
| FilterBar | - | Barra de filtros |
| DataExport | format (csv, xlsx, json) | Botón de exportación |

### 3.6 Feedback
| Componente | Props | Descripción |
|------------|-------|-------------|
| Loading | size (sm, md, lg) | Indicador de carga |
| EmptyState | message | Estado vacío |

### 3.7 Media
| Componente | Props | Descripción |
|------------|-------|-------------|
| Image | src, alt, objectFit | Imagen |

### 3.8 Timeline
| Componente | Props | Descripción |
|------------|-------|-------------|
| Timeline | - | Línea de tiempo vertical |
| Accordion | items | Acordeón expandible |

---

## 4. Data Binding

El panel **Data** te permite conectar tu UI a APIs reales:

### Crear una fuente de datos:
```
1. Click "Data" en toolbar
2. Click "+ Add"
3. Nombre: "Usuarios"
4. URL: "https://api.misitio.com/usuarios"
5. Método: GET
6. Click "Save"
```

### Ejecutar y debuggear:
- Click "▶" para ejecutar una fuente individual
- Click "▶ Execute All" para ejecutar todas
- Los resultados aparecen en el panel de logs derecho
- Activa "Debug ON" para pausar en breakpoints

---

## 5. Action Flows (React Flow)

El panel **Actions** abre un editor visual de flujos con React Flow:

### Nodos disponibles:
- **Trigger**: punto de entrada del flujo
- **API Call**: llama a una API
- **Set Variable**: asigna un valor a una variable

### Cómo usar:
```
1. Click "Actions" en toolbar
2. Verás un canvas con nodos conectados
3. Arrastra nuevos nodos desde el menú
4. Conéctalos arrastrando desde los puntos blancos
5. Usa el MiniMap para navegar flujos grandes
```

---

## 6. AI Generator

El panel **AI** te permite generar layouts con inteligencia artificial:

### Requisito:
Necesitas una **API key de OpenAI** (https://platform.openai.com/api-keys).
Se configura en ⚙ Settings → "OpenAI API Key".

### Cómo generar:
```
1. Click "AI" en toolbar
2. Escribe tu descripción
3. Presiona Enter
4. La IA genera el layout en el canvas
```

### Ejemplos de prompts efectivos:
```
"una página de login con email, password y botón de submit, todo centrado"

"un dashboard con sidebar, 3 tarjetas de métricas, una tabla y un gráfico de barras"

"un formulario de registro con nombre, email, password y checkbox de términos"
```

---

## 7. Safety Net

El panel **Safety** protege tu trabajo:

### Cómo usar:
```
1. Click "Safety" en toolbar
2. Click "+ Take Snapshot" para guardar el estado actual
3. Cada snapshot guarda HTML + CSS del canvas
4. Click "Restore" para volver a un snapshot anterior
```

**Máximo:** 50 snapshots guardados automáticamente (los más viejos se descartan).

---

## 8. Version Browser

El panel **Versions** muestra el historial de cambios:

### Funcionalidades:
- **Lista de versiones**: cada versión muestra fecha, autor y mensaje
- **Diff**: toggle "Show Diff" para ver cambios entre versiones
- **Rollback**: click "Rollback to here" para volver a una versión anterior
- **Auto-versioning**: cada guardado crea una nueva versión

---

## 9. Monitoreo

El panel **Monitor** muestra métricas en vivo del builder:

### Métricas:
- **Avg Load Time**: tiempo promedio de carga del builder
- **Avg Export Time**: tiempo promedio de exportación
- **Total Errors**: cantidad de errores registrados
- **Recent Errors**: lista de los últimos errores

---

## 10. Self-Edit Mode

El panel **SelfEdit** activa el modo de auto-edición:

```
1. Click "SelfEdit" en toolbar
2. Click "Enter Self-Edit Mode"
3. La interfaz del builder se vuelve editable en el canvas
4. Puedes modificar toolbars, paneles y botones visualmente
```

**Advertencia:** En self-edit mode, puedes romper la interfaz del builder. Usa Safety Net primero.

---

## 11. Component Sandbox

El panel **Sandbox** te permite probar componentes aislados:

```
1. Click "Sandbox" en toolbar
2. Selecciona un componente de la lista izquierda
3. Centro: previsualización del componente
4. Derecha: edita las props en vivo
```

---

## 12. CLI (Línea de Comandos)

```bash
knit init [nombre]       # Inicializa un proyecto
knit dev [-p puerto]     # Inicia servidor de desarrollo
knit build [--out dir]   # Comppila para producción
knit export --project id # Exporta a HTML
knit health              # Verifica conectividad
knit doctor              # Diagnostica instalación
knit project:register    # Registra proyecto existente
```

---

## 13. Atajos de Teclado (Referencia Completa)

| Atajo | Acción | Dónde funciona |
|-------|--------|----------------|
| `Ctrl+Z` | Deshacer | Builder |
| `Ctrl+Shift+Z` | Rehacer | Builder |
| `Ctrl+S` | Guardar proyecto | Builder |
| `Cmd+K` / `Ctrl+K` | Búsqueda global | En cualquier lado |
| `?` | Abrir atajos | Builder |
| `E` | Editar texto inline | Canvas (con componente seleccionado) |
| `Delete` | Eliminar componente seleccionado | Canvas |
| `Escape` | Cerrar panel / deseleccionar | Builder |
| `Enter` | En AI panel: generar | AI Panel |
| `Enter` | En debug mode: continuar | Data Binding |

---

## 14. API REST (Referencia)

| Endpoint | Método | Descripción |
|----------|--------|-------------|
| `/api/health` | GET | Health check del servidor |
| `/api/projects` | GET | Listar proyectos |
| `/api/projects` | POST | Crear proyecto |
| `/api/projects/:id` | GET | Obtener proyecto |
| `/api/projects/:id` | DELETE | Eliminar proyecto |
| `/api/projects/save` | POST | Guardar layout |
| `/api/export/:projectId` | GET | Exportar proyecto |
| `/api/auth/register` | POST | Registrar usuario |
| `/api/auth/login` | POST | Iniciar sesión |
| `/bridge.js` | GET | Bridge script para inyección |

---

<div align="center">
  <p><strong>knitstudio v1.0.0</strong></p>
  <p>Documentación completa. ¿Algo no claro? Presiona 💬 en el toolbar.</p>
</div>
