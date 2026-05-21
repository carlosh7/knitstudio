const messages = {
  "app.name": "knitstudio",
  "app.tagline": "Visual Application Builder",
  "app.version": "v0.6.0",

  "nav.back": "← Dashboard",
  "nav.search": "Search",
  "nav.shortcuts": "Keyboard shortcuts",

  "mode.simple": "Simple",
  "mode.advanced": "Advanced",

  "panel.components": "Components",
  "panel.layers": "Layers",
  "panel.styles": "Styles",
  "panel.actions": "Actions",

  "action.publish": "Publish",
  "action.save": "Save",
  "action.create": "Create",
  "action.cancel": "Cancel",
  "action.delete": "Delete",
  "action.next": "Next",
  "action.back": "Back",
  "action.finish": "Finish",

  "project.new": "New Project",
  "project.name": "Project name",
  "project.empty.title": "Welcome to knitstudio",
  "project.empty.desc": "Create your first project to start building visual applications with drag & drop, action flows, and data binding.",
  "project.empty.cta": "Create your first project",

  "editor.save.success": "Project saved",
  "editor.save.error": "Save failed",
  "editor.autosave": "Autosaving...",

  "search.placeholder": "Search pages, components, actions...",
  "search.noresults": "No results",

  "shortcuts.title": "Keyboard Shortcuts",
  "shortcuts.undo": "Undo",
  "shortcuts.redo": "Redo",
  "shortcuts.save": "Save project",
  "shortcuts.delete": "Delete selected component",
  "shortcuts.duplicate": "Duplicate component",
  "shortcuts.deselect": "Deselect / Close panel",
  "shortcuts.search": "Open search",
  "shortcuts.help": "Toggle shortcuts reference",

  "wizard.createPage": "Create a new page",
  "wizard.name": "Name your page",
  "wizard.name.desc": "Give your new page a name and URL route.",
  "wizard.template": "Choose a template",
  "wizard.template.desc": "Start from a blank page or choose a template: Dashboard, Form, Landing, or List.",
  "wizard.layout": "Pick a layout",
  "wizard.layout.desc": "Choose a column layout: single column, two columns, sidebar + content.",
  "wizard.ready": "Ready to edit",
  "wizard.ready.desc": "Your page is ready! Start dragging components onto it.",
};

export type MessageKey = keyof typeof messages;
export default messages;
