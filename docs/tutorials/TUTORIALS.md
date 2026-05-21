# 🎓 Tutoriales de knitstudio

> Aprende paso a paso cómo usar todas las capacidades de knitstudio.

---

## Tutorial 1: Crear una Landing Page desde cero

**Duración:** 5 minutos · **Dificultad:** 🟢 Principiante

### Objetivo
Crear una página de aterrizaje (landing page) con hero, características y llamada a la acción.

### Paso 1: Crear proyecto
```
1. Abre knitstudio (http://localhost:3000)
2. Click "Create your first project"
3. Nombre: "Mi Landing Page"
4. Click "Create"
```

### Paso 2: Abrir el builder
```
1. Click en "Mi Landing Page"
2. El builder se abre con el toolbar y canvas
```

### Paso 3: Agregar una barra de navegación
```
1. Click "Components" en toolbar → se abre el panel izquierdo
2. Busca "Navbar" en la categoría Navigation
3. Arrástralo al canvas (parte superior)
4. Click en el Navbar para seleccionarlo
```

### Paso 4: Agregar hero section
```
1. Arrastra "Container" debajo del Navbar
2. Arrastra "Text" dentro del Container
3. Click en el Text → escribe: "Bienvenido a mi App"
4. Arrastra otro "Text" debajo → escribe: "La mejor aplicación para..."
5. Arrastra "Button" → escribe: "Comenzar ahora"
```

### Paso 5: Agregar características
```
1. Arrastra otro "Container" (fila) debajo del hero
2. Cambia su dirección a "row" en el panel Styles
3. Arrastra 3 "Card" dentro de la fila
4. Dentro de cada Card, agrega un "Text" con el nombre de la característica
```

### Paso 6: Previsualizar
```
1. Click "Publish" en el toolbar
2. ¡Tu landing page está lista!
```

### Resultado esperado:
```
┌──────────────────────────────────────┐
│  Mi Landing Page                     │
├──────────────────────────────────────┤
│  Bienvenido a mi App                 │
│  La mejor aplicación para...         │
│  [Comenzar ahora]                    │
│                                      │
│  ┌──────┐ ┌──────┐ ┌──────┐        │
│  │ Car1 │ │ Car2 │ │ Car3 │        │
│  └──────┘ └──────┘ └──────┘        │
└──────────────────────────────────────┘
```

---

## Tutorial 2: Conectar una API real

**Duración:** 7 minutos · **Dificultad:** 🟡 Intermedio

### Objetivo
Conectar tu UI a una API REST real y mostrar los datos en una tabla.

### Paso 1: Crear proyecto
```
1. Dashboard → "New Project" → nombre: "API Demo"
2. Abre el builder
```

### Paso 2: Agregar una tabla
```
1. Click "Components"
2. Arrastra "Table" al canvas
3. Configura: Columns = "ID,Nombre,Email,Status"
```

### Paso 3: Configurar data source
```
1. Click "Data" en toolbar
2. Click "+ Add"
3. Nombre: "Usuarios"
4. URL: "https://jsonplaceholder.typicode.com/users"
5. Método: GET
6. Click "Save"
```

### Paso 4: Ejecutar y verificar
```
1. Click "▶" junto a "Usuarios"
2. Mira el panel de logs (derecha) — deberías ver "200 OK"
3. Si hay datos, aparecen en el log
```

### Paso 5: Modo Debug
```
1. Activa "Debug ON" en el panel Data
2. Click en "●" junto a "Usuarios" para agregar un breakpoint
3. Click "▶ Execute All"
4. El flujo se pausa en el breakpoint — presiona Enter para continuar
```

### Solución de problemas
| Error | Causa | Solución |
|-------|-------|----------|
| "Failed to fetch" | CORS | La API debe permitir CORS o usa el bridge |
| "404" | URL incorrecta | Verifica la URL en el navegador |
| Timeout | API lenta | Aumenta el timeout en Settings |

---

## Tutorial 3: Generar un Dashboard con AI

**Duración:** 3 minutos · **Dificultad:** 🟢 Principiante

### Paso 1: Configurar API key
```
1. Click "⚙" (Settings) en toolbar
2. En "OpenAI API Key", pega tu key de OpenAI
3. Click "Save"
```

### Paso 2: Generar con AI
```
1. Click "AI" en toolbar
2. Escribe: "un dashboard con sidebar a la izquierda, header arriba,
   3 tarjetas de estadísticas (Usuarios, Ventas, Visitas),
   una tabla de datos abajo, y un gráfico de barras"
3. Presiona Enter
```

### Paso 3: La IA genera
En 3-5 segundos, la IA crea el layout completo en el canvas.

### Paso 4: Personalizar
```
1. Selecciona cualquier componente
2. Edita textos, colores y estilos
3. Agrega más componentes si es necesario
```

### Consejos para mejores prompts:
```
✅ "un formulario de login oscuro con email, password y botón"
✅ "una tabla con datos de usuarios con columnas: Nombre, Email, Rol"
✅ "un dashboard ejecutivo con 4 KPI cards, un chart de línea y una tabla"
❌ "haz algo bonito" (demasiado vago)
❌ "una app compleja con muchas cosas" (demasiado ambigüo)
```

---

## Tutorial 4: Exportar a código HTML/React

**Duración:** 2 minutos · **Dificultad:** 🟡 Intermedio

### Paso 1: Desde el builder
El código generado se exporta vía CLI.

### Paso 2: Usar el CLI
```bash
# Exportar a HTML
knit export --project=MI_PROYECTO_ID --format=html --out=./mi-app.html

# Exportar a React
knit export --project=MI_PROYECTO_ID --format=react --out=./mi-app.tsx
```

### Paso 3: Ver el resultado
```bash
# Abre el HTML en tu navegador
open ./mi-app.html

# O si exportaste React
npm init -y
npm install react react-dom
# Importa y usa el componente generado
```

### Exportar vía API directamente:
```bash
curl http://localhost:3001/api/export/MI_PROYECTO_ID > export.html
```

---

## Tutorial 5: Usar el Modo Sandbox

**Duración:** 1 minuto · **Dificultad:** 🟢 Principiante

### Objetivo
Experimentar sin miedo a romper nada.

```
1. En el builder, haz click en "Sandbox" en el toolbar
2. Verás "🏖️ Sandbox mode" aparecer arriba
3. Ahora puedes editar, romper y experimentar — nada se guarda
4. Para salir, haz click en "Sandbox" otra vez
```

---

## Tutorial 6: Safety Net — Nunca pierdas tu trabajo

**Duración:** 2 minutos · **Dificultad:** 🟢 Principiante

### Objetivo
Aprender a usar snapshots de seguridad.

### Tomar un snapshot:
```
1. Click "Safety" en toolbar
2. Click "+ Take Snapshot"
3. Ponle un nombre descriptivo (opcional)
```

### Restaurar un snapshot:
```
1. En el panel Safety, busca el snapshot que quieras
2. Click "Restore"
3. El canvas vuelve al estado de ese snapshot
```

### Buenas prácticas:
- Toma un snapshot ANTES de hacer cambios grandes
- Toma un snapshot antes de publicar
- Los snapshots se guardan automáticamente (máx 50)

---

## Tutorial 7: Colaborar con IA via MCP

**Duración:** 5 minutos · **Dificultad:** 🔴 Avanzado

### Objetivo
Conectar Claude, Cursor o Copilot a knitstudio via MCP.

### Conectar con Claude Desktop:
```json
// ~/Library/Application Support/Claude/claude_desktop_config.json
{
  "mcpServers": {
    "knitstudio": {
      "command": "node",
      "args": ["/ruta/a/knitstudio/packages/mcp-server/dist/index.js"],
      "env": { "API_URL": "http://localhost:3001" }
    }
  }
}
```

### Comandos MCP disponibles:
```
studio.list_projects    → Lista todos tus proyectos
studio.create_project   → Crea un nuevo proyecto
studio.health           → Verifica que knitstudio funciona
```

### Ejemplo de uso con Claude:
```
Usuario: "Claude, lista mis proyectos de knitstudio"
Claude: (usa studio.list_projects)
        "Tienes 3 proyectos: Landing Page, Dashboard Admin, API Demo"

Usuario: "Crea un proyecto nuevo llamado 'Mi App'"
Claude: (usa studio.create_project)
        "Proyecto 'Mi App' creado correctamente"
```

---

## Tutorial 8: Quick Edit Mode

**Duración:** 1 minuto · **Dificultad:** 🟢 Principiante

```
1. En el canvas, selecciona un componente "Text" o "Button"
2. Presiona la tecla "E" en tu teclado
3. Aparece un cuadro de diálogo para editar el texto
4. Escribe el nuevo texto y presiona OK
5. ¡El texto cambió al instante!
```

**Tip:** Funciona con componentes de tipo Text y Button.

---

## Tutorial 9: Usar Templates por Nivel

**Duración:** 3 minutos · **Dificultad:** 🟢 Principiante

### Objetivo
Empezar desde una plantilla en lugar de una página en blanco.

### Niveles de template:
| Nivel | Descripción | Ideal para |
|-------|-------------|------------|
| 1 ⭐ | Página simple | Principiantes |
| 2 ⭐⭐ | Landing page | Marketing |
| 3 ⭐⭐⭐ | Dashboard | Aplicaciones |
| 4 ⭐⭐⭐⭐ | Auth + Dashboard | Apps con usuarios |
| 5 ⭐⭐⭐⭐⭐ | App completa | Proyectos avanzados |

### Cómo usar:
```
1. En el builder, click "🖼" (Showcase)
2. Selecciona un nivel (1-5)
3. Elige un template
4. Click para cargarlo
5. Personaliza a tu gusto
```

---

## 🎯 Resumen de Habilidades por Nivel

| Lo que sabes hacer | 🟢 Nivel 1 | 🟡 Nivel 2 | 🔴 Nivel 3 |
|-------------------|:----------:|:----------:|:----------:|
| Arrastrar componentes | ✅ | ✅ | ✅ |
| Editar textos | ✅ | ✅ | ✅ |
| Publicar proyecto | ✅ | ✅ | ✅ |
| Conectar APIs | - | ✅ | ✅ |
| Usar AI | - | ✅ | ✅ |
| Exportar a código | - | ✅ | ✅ |
| Debug action flows | - | - | ✅ |
| Self-Edit mode | - | - | ✅ |
| MCP / CLI | - | - | ✅ |

---

<div align="center">
  <p>¿Completaste todos los tutoriales? 🎉</p>
  <p>Ya eres un usuario avanzado de knitstudio.</p>
  <p><strong>¿Sugerencias? Presiona 💬 en el toolbar.</strong></p>
</div>
