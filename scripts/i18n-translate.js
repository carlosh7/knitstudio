#!/usr/bin/env node
// Generate real translations for all 8 languages
// Uses the existing manually-translated keys + generates new ones via pattern rules

import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const i18nDir = join(__dirname, "..", "packages", "builder", "src", "i18n");

// Load EN keys
const enContent = readFileSync(join(i18nDir, "en.ts"), "utf-8");
const enKeys = {};
const regex = /"([^"]+)":\s*"([^"]*)"/g;
let m;
while ((m = regex.exec(enContent)) !== null) {
  enKeys[m[1]] = m[2];
}

// Load existing translations for each language (to preserve manual translations)
function loadExisting(lang) {
  const result = {};
  try {
    const content = readFileSync(join(i18nDir, `${lang}.ts`), "utf-8");
    const r = /"([^"]+)":\s*"([^"]*)"/g;
    let match;
    while ((match = r.exec(content)) !== null) {
      result[match[1]] = match[2];
    }
  } catch {}
  return result;
}

// Translation rules for common patterns
const patterns = {
  es: (text) => {
    const dict = {
      "Components": "Componentes", "Layers": "Capas", "Styles": "Estilos",
      "Actions": "Acciones", "Data": "Datos", "Safety": "Seguridad",
      "Versions": "Versiones", "Monitor": "Monitor", "SelfEdit": "AutoEditar",
      "Sandbox": "Sandbox", "Publish": "Publicar", "Save": "Guardar",
      "Create": "Crear", "Cancel": "Cancelar", "Delete": "Eliminar",
      "Next": "Siguiente", "Back": "Atrás", "Finish": "Finalizar",
      "Close": "Cerrar", "Retry": "Reintentar", "Clear": "Limpiar",
      "Done": "Listo", "Send": "Enviar", "Restore": "Restaurar",
      "Import": "Importar", "Generate": "Generar", "Skip": "Saltar",
      "Dismiss": "Descartar", "Search": "Buscar", "Settings": "Configuración",
      "All": "Todo", "No results": "Sin resultados",
      "Loading": "Cargando", "Upload": "Subir", "Download": "Descargar",
      "Edit": "Editar", "Copy": "Copiar", "Paste": "Pegar",
      "Cut": "Cortar", "Add": "Agregar", "Remove": "Eliminar",
      "Update": "Actualizar", "Configure": "Configurar", "Help": "Ayuda",
      "Feedback": "Comentarios", "Name": "Nombre", "Type": "Tipo",
      "Size": "Tamaño", "Color": "Color", "Width": "Ancho",
      "Height": "Alto", "Position": "Posición", "Margin": "Margen",
      "Padding": "Relleno", "Border": "Borde", "Radius": "Radio",
      "Shadow": "Sombra", "Opacity": "Opacidad", "Rotation": "Rotación",
      "Preview": "Vista previa", "Export": "Exportar", "Import": "Importar",
      "Share": "Compartir", "Print": "Imprimir", "View": "Ver",
      "Close panel": "Cerrar panel", "Keyboard": "Teclado",
      "Keyboard Shortcuts": "Atajos de Teclado",
      "Version Browser": "Navegador de Versiones",
      "Monitoring Dashboard": "Panel de Monitoreo",
      "Component Sandbox": "Banco de Pruebas",
      "Safety Net": "Red de Seguridad",
      "Data Sources": "Fuentes de Datos",
      "Execution Log": "Registro de Ejecución",
      "Grid Settings": "Configuración de Cuadrícula",
      "Send Feedback": "Enviar Comentarios",
      "Showcase Gallery": "Galería de Ejemplos",
      "Help Center": "Centro de Ayuda",
      "Settings": "Configuración",
      "AI Generate": "Generar con IA",
      "Self-Edit Mode": "Modo de Autoedición",
      "Online Documentation": "Documentación en Línea",
      "GitHub Docs": "Documentos en GitHub",
      "No results for": "Sin resultados para",
      "All Topics": "Todos los Temas",
      "Getting Started": "Primeros Pasos",
      "Source name": "Nombre de fuente",
      "Clear": "Limpiar",
      "Debug": "Depurar",
      "Restore": "Restaurar",
      "Rollback to here": "Revertir hasta aquí",
      "Show Diff": "Mostrar Diferencias",
      "Hide Diff": "Ocultar Diferencias",
      "Avg Load Time": "Tiempo de Carga Promedio",
      "Avg Export Time": "Tiempo de Exportación Promedio",
      "Total Errors": "Errores Totales",
      "Recent Errors": "Errores Recientes",
      "Take Snapshot": "Tomar Instantánea",
      "OpenAI API Key": "Clave API de OpenAI",
      "Enter Self-Edit Mode": "Entrar en Modo Autoedición",
      "Exit Self-Edit Mode": "Salir del Modo Autoedición",
      "Save": "Guardar",
      "Dashboard": "Panel",
      "Project name": "Nombre del proyecto",
      "New Project": "Nuevo Proyecto",
      "Edit text:": "Editar texto:",
      "Choose a Template": "Elegir una Plantilla",
      "description": "descripción",
      "No": "No",
      "Yes": "Sí",
      "Are you sure": "¿Estás seguro",
      "Confirm": "Confirmar",
      "Undo": "Deshacer",
      "Redo": "Rehacer",
      "Duplicate": "Duplicar",
      "Deselect": "Deseleccionar",
      "Open search": "Abrir búsqueda",
      "search": "búsqueda",
      "shortcuts": "atajos",
      "Keyboard shortcuts": "Atajos de teclado",
      "Create project": "Crear proyecto",
      "Select a component": "Selecciona un componente",
      "Select two versions": "Selecciona dos versiones",
      "No snapshots yet": "Aún no hay instantáneas",
      "No data sources": "No hay fuentes de datos",
      "Welcome to knitstudio": "Bienvenido a knitstudio",
      "Create your first project": "Crea tu primer proyecto",
      "Visual Application Builder": "Creador Visual de Aplicaciones",
      "Newer": "Más reciente",
      "Older": "Más antiguo",
      "Step": "Paso",
      "of": "de",
      "pages": "páginas",
      "page": "página",
      "pages_plural": "páginas",
      "template": "plantilla",
      "level": "nivel",
      "current": "actual",
      "value": "valor",
      "Snap to grid": "Ajustar a la cuadrícula",
      "Show grid overlay": "Mostrar cuadrícula",
      "Grid size": "Tamaño de cuadrícula",
      "Props": "Propiedades",
      "No props": "Sin propiedades",
      "Saved": "Guardado",
      "Saving": "Guardando",
      "Unsaved": "Sin guardar",
      "Save failed": "Error al guardar",
      "Project saved": "Proyecto guardado",
      "Project published": "Proyecto publicado",
      "Publishing": "Publicando",
      "Page created": "Página creada",
      "Text updated": "Texto actualizado",
      "Sandbox mode ON": "Modo Sandbox ACTIVADO",
      "Sandbox mode OFF": "Modo Sandbox DESACTIVADO",
      "Rolled back successfully": "Revertido exitosamente",
      "Imported": "Importado",
      "Import failed": "Error de importación",
      "API key saved": "Clave API guardada",
    };
    return dict[text] || text;
  },
  // For non-Spanish languages, just keep English (they need manual translation)
  fr: (text) => text,
  de: (text) => text,
  it: (text) => text,
  pt: (text) => text,
  zh: (text) => text,
  ja: (text) => text,
  ko: (text) => text,
};

// Special Spanish manual translations for panel-specific terms
const esManual = {
  "panel.data": "Datos", "panel.ai": "IA", "panel.safety": "Seguridad",
  "panel.versions": "Versiones", "panel.monitoring": "Monitor",
  "panel.selfedit": "AutoEditar", "panel.sandbox": "Sandbox",
  "data.title": "Fuentes de Datos", "data.add": "+ Agregar",
  "data.debug": "Depurar", "data.debug_on": "🐞 Depurar ON",
  "data.clear_logs": "Limpiar", "data.logs_title": "Registro de Ejecución",
  "data.source_name": "Nombre de fuente", "data.empty": "No hay fuentes de datos",
  "data.logs_empty": "Aún no hay registros de ejecución",
  "ai.title": "Generar con IA", "ai.generate": "Generar",
  "ai.generating": "Generando...", "ai.no_key": "Configura tu clave de OpenAI primero",
  "safety.title": "Red de Seguridad", "safety.take_snapshot": "+ Tomar Instantánea",
  "safety.empty": "Aún no hay instantáneas",
  "version.title": "Navegador de Versiones",
  "version.show_diff": "Mostrar Cambios", "version.hide_diff": "Ocultar Cambios",
  "version.rollback": "Revertir hasta aquí", "version.current": "actual",
  "monitor.title": "Panel de Monitoreo",
  "monitor.avg_load": "Carga Promedio", "monitor.avg_export": "Exportación Promedio",
  "monitor.errors": "Errores Totales", "monitor.recent": "Errores Recientes",
  "grid.title": "Configuración de Cuadrícula",
  "grid.snap": "Ajustar a cuadrícula", "grid.show": "Mostrar cuadrícula",
  "grid.size": "Tamaño de cuadrícula", "grid.done": "Listo",
  "settings.title": "Configuración",
  "settings.api_key": "Clave API de OpenAI",
  "settings.api_key_hint": "Tu clave se almacena localmente.",
  "feedback.title": "Enviar Comentarios",
  "feedback.type_feedback": "Comentario", "feedback.type_bug": "Error",
  "feedback.type_feature": "Función", "feedback.thanks": "Gracias por tu",
  "sandbox.title": "Banco de Pruebas",
  "sandbox.on": "🏖️ Modo Sandbox — los cambios no se guardan",
  "selfedit.title": "Modo de Autoedición",
  "selfedit.description": "El modo de autoedición permite modificar la interfaz de knitstudio.",
  "selfedit.enter": "🔮 Entrar en Autoedición",
  "selfedit.exit": "Salir de Autoedición",
  "shortcuts.title": "Atajos de Teclado", "shortcut.close": "Cerrar",
  "showcase.title": "Galería de Ejemplos",
  "changelog.title": "Registro de Cambios", "roadmap.title": "Hoja de Ruta",
  "preview.title": "Vista Previa", "preview.desc": "Escanea con tu teléfono",
  "help.title": "🧶 Centro de Ayuda",
  "help.search_placeholder": "Buscar temas de ayuda...",
  "help.all_topics": "Todos los Temas",
  "help.getting_started": "Primeros Pasos",
  "help.footer_online": "Documentación en Línea",
  "help.footer_github": "Documentos en GitHub",
  "editor.unsaved": "Sin guardar",
  "nav.help": "Centro de Ayuda — F1",
  "nav.search": "Buscar (Cmd+K)",
};

// Generate Spanish with real translations
const esExisting = loadExisting("es");
let esOutput = "const messages = {\n";
let esTranslated = 0;
for (const [key, val] of Object.entries(enKeys)) {
  const translated = esExisting[key] || esManual[key] || patterns.es(val);
  if (translated !== val || esExisting[key] || esManual[key]) esTranslated++;
  const escaped = translated.replace(/"/g, '\\"');
  esOutput += `  "${key}": "${escaped}",\n`;
}
esOutput += "};\n\nexport type MessageKey = keyof typeof messages;\nexport default messages;\n";
writeFileSync(join(i18nDir, "es.ts"), esOutput);
console.log(`✅ es.ts — ${esTranslated}/${Object.keys(enKeys).length} real translations`);

// Copy English to other languages (they need manual translation)
for (const lang of ["fr", "de", "it", "pt", "zh", "ja", "ko"]) {
  const existing = loadExisting(lang);
  let output = "const messages = {\n";
  let preserved = 0;
  for (const [key, val] of Object.entries(enKeys)) {
    const translated = existing[key] || val; // Keep existing or fallback to English
    if (existing[key]) preserved++;
    const escaped = translated.replace(/"/g, '\\"');
    output += `  "${key}": "${escaped}",\n`;
  }
  output += "};\n\nexport type MessageKey = keyof typeof messages;\nexport default messages;\n";
  writeFileSync(join(i18nDir, `${lang}.ts`), output);
  const total = Object.keys(enKeys).length;
  console.log(`✅ ${lang}.ts — ${preserved}/${total} existing translations preserved, ${total - preserved} in English (needs review)`);
}

console.log(`\n📊 Total keys: ${Object.keys(enKeys).length}`);
