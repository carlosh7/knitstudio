import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const esPath = join(__dirname, "..", "packages", "builder", "src", "i18n", "es.ts");

let es = readFileSync(esPath, "utf-8");

const translations = {
  "help.steps": "Pasos",
  "help.search_placeholder": "Buscar temas de ayuda...",
  "help.footer_email": "¿Necesitas ayuda? Haz clic en 💬 o escribe a support@knitstudio.io",
  "help.dashboard_desc": "Aquí ves todos tus proyectos. Haz clic para editar o crea uno nuevo.",
  "help.new_project_desc": "Haz clic aquí para crear un nuevo proyecto. ¡Dale un nombre y empieza!",
  "help.welcome_screen_desc": "No tienes proyectos aún. Haz clic en Crea tu primer proyecto para empezar.",
  "help.toolbar_desc": "Tu centro de control. Desde aquí accedes a todas las funciones de knitstudio.",
  "help.mode_toggle_desc": "Cambia entre modo Simple (3 botones) y modo Avanzado (builder completo).",
  "help.search_desc": "Presiona Cmd+K o Ctrl+K para abrir la búsqueda global.",
  "help.publish_desc": "Cuando tu página esté lista, haz clic en Publicar.",
  "help.back_dashboard_desc": "Vuelve a la lista de proyectos. Tu trabajo se guarda automáticamente.",
  "help.components_panel_desc": "Los 35+ componentes están aquí. Arrastra cualquiera al canvas.",
  "help.actions_panel_desc": "Editor visual de flujos. Conecta componentes a APIs y crea interacciones.",
  "help.data_panel_desc": "Conecta tu UI a APIs reales. Agrega fuentes y ejecuta con un clic.",
  "help.ai_panel_desc": "Describe lo que quieres y la IA genera el layout. Requiere API key de OpenAI.",
  "help.safety_panel_desc": "Toma instantáneas para poder volver atrás. Como una máquina del tiempo.",
  "help.versions_panel_desc": "Ve cada versión guardada. Compara cambios y revierte si es necesario.",
  "help.monitor_panel_desc": "Métricas en tiempo real: carga, exportación y errores.",
  "help.selfedit_panel_desc": "Modo avanzado que permite editar la interfaz de knitstudio. ¡Con precaución!",
  "help.sandbox_panel_desc": "Prueba componentes de forma aislada. Ajusta props y ve cambios en vivo.",
  "help.quick_edit_desc": "Selecciona texto o botón y presiona E para editar su contenido directamente.",
  "help.shortcuts_desc": "Presiona ? para ver todos los atajos de teclado.",
  "help.grid_desc": "Configura el ajuste a la cuadrícula para alineación precisa.",
  "help.showcase_desc": "Explora proyectos de ejemplo para inspirarte.",
  "help.changelog_desc": "Ve qué cambió en cada versión. Nuevas funciones y mejoras.",
  "help.roadmap_desc": "Ve lo que viene después. Progreso de todas las fases de desarrollo.",
  "help.feedback_desc": "Envíanos tus comentarios. Reporta errores o sugiere funciones.",
  "help.settings_desc": "Configura tu clave API de OpenAI o importa una página desde una URL.",
  "help.canvas_desc": "Área de diseño. Arrastra componentes, selecciónalos y muévelos.",
  "help.component_select_desc": "Haz clic en cualquier componente para seleccionarlo. Edítalo o muévelo.",
  "help.component_drag_desc": "Toma componentes del panel y arrástralos al canvas.",
  "help.wizard_desc": "En modo Simple, Publicar abre un asistente paso a paso.",
  "help.template_selector_desc": "Elige entre 5 niveles de plantillas: de página simple a app completa.",
  "help.gs_welcome_desc": "Estás en el builder. Aquí diseñas tu app visualmente.",
  "help.gs_explore_desc": "Haz clic en cualquier botón de la barra para abrir un panel.",
  "help.gs_add_desc": "Abre Componentes y arrastra un Texto al canvas.",
  "help.gs_edit_desc": "Selecciona el texto y presiona E para editarlo.",
  "help.gs_add_more_desc": "Agrega un Botón, Tarjeta o Contenedor. ¡Experimenta!",
  "help.gs_publish_desc": "Cuando estés listo, haz clic en Publicar. Siempre puedes volver.",
  "help.gs_explore_more_desc": "Prueba Datos para conectar una API o IA para generar layouts.",
};

let count = 0;
for (const [key, val] of Object.entries(translations)) {
  const searchKey = `"${key}": "`;
  const startIdx = es.indexOf(searchKey);
  if (startIdx !== -1) {
    const valStart = startIdx + searchKey.length;
    const valEnd = es.indexOf('"', valStart);
    if (valEnd !== -1) {
      const escaped = val.replace(/"/g, '\\"');
      es = es.slice(0, valStart) + escaped + es.slice(valEnd);
      count++;
    }
  }
}

writeFileSync(esPath, es);
console.log(`✅ es.ts — ${count} help keys translated to Spanish`);
