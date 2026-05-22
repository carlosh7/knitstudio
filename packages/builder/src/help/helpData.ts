import type { MessageKey } from "../i18n/en";

export interface HelpItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  target?: string;
  link?: string;
}

type TFunction = (key: MessageKey) => string;

export function getHelpItems(t: TFunction): HelpItem[] {
  return [
    { id: "dashboard", title: t("help.dashboard"), description: t("help.dashboard_desc"), icon: "🏠" },
    { id: "new-project", title: t("help.new_project"), description: t("help.new_project_desc"), icon: "➕", target: "[data-onboard='new-project']" },
    { id: "empty-state", title: t("help.welcome_screen"), description: t("help.welcome_screen_desc"), icon: "👋" },
    { id: "toolbar", title: t("help.toolbar"), description: t("help.toolbar_desc"), icon: "🔧" },
    { id: "mode-toggle", title: t("help.mode_toggle"), description: t("help.mode_toggle_desc"), icon: "🔄" },
    { id: "search", title: t("help.search"), description: t("help.search_desc"), icon: "🔍" },
    { id: "publish", title: t("help.publish"), description: t("help.publish_desc"), icon: "🚀" },
    { id: "back-dashboard", title: t("help.back_dashboard"), description: t("help.back_dashboard_desc"), icon: "🔙" },
    { id: "components-panel", title: t("help.components_panel"), description: t("help.components_panel_desc"), icon: "🧩" },
    { id: "actions-panel", title: t("help.actions_panel"), description: t("help.actions_panel_desc"), icon: "⚡" },
    { id: "data-panel", title: t("help.data_panel"), description: t("help.data_panel_desc"), icon: "🔗" },
    { id: "ai-panel", title: t("help.ai_panel"), description: t("help.ai_panel_desc"), icon: "🤖" },
    { id: "safety-panel", title: t("help.safety_panel"), description: t("help.safety_panel_desc"), icon: "🛟" },
    { id: "versions-panel", title: t("help.versions_panel"), description: t("help.versions_panel_desc"), icon: "📋" },
    { id: "monitor-panel", title: t("help.monitor_panel"), description: t("help.monitor_panel_desc"), icon: "📊" },
    { id: "selfedit-panel", title: t("help.selfedit_panel"), description: t("help.selfedit_panel_desc"), icon: "🔮" },
    { id: "sandbox-panel", title: t("help.sandbox_panel"), description: t("help.sandbox_panel_desc"), icon: "🧪" },
    { id: "quick-edit", title: t("help.quick_edit"), description: t("help.quick_edit_desc"), icon: "✏️" },
    { id: "shortcuts", title: t("help.shortcuts"), description: t("help.shortcuts_desc"), icon: "⌨️" },
    { id: "grid", title: t("help.grid"), description: t("help.grid_desc"), icon: "⊞" },
    { id: "showcase", title: t("help.showcase"), description: t("help.showcase_desc"), icon: "🖼" },
    { id: "changelog", title: t("help.changelog"), description: t("help.changelog_desc"), icon: "📋" },
    { id: "roadmap", title: t("help.roadmap"), description: t("help.roadmap_desc"), icon: "🗺" },
    { id: "feedback", title: t("help.feedback"), description: t("help.feedback_desc"), icon: "💬" },
    { id: "settings", title: t("help.settings"), description: t("help.settings_desc"), icon: "⚙" },
    { id: "canvas", title: t("help.canvas"), description: t("help.canvas_desc"), icon: "🎨" },
    { id: "component-select", title: t("help.component_select"), description: t("help.component_select_desc"), icon: "👆" },
    { id: "component-drag", title: t("help.component_drag"), description: t("help.component_drag_desc"), icon: "🖱️" },
    { id: "wizard", title: t("help.wizard"), description: t("help.wizard_desc"), icon: "🧙" },
    { id: "template-selector", title: t("help.template_selector"), description: t("help.template_selector_desc"), icon: "📄" },
  ];
}

export function getGettingStartedSteps(t: TFunction) {
  return [
    { id: "welcome", title: t("help.gs_welcome"), description: t("help.gs_welcome_desc"), icon: "👋" },
    { id: "explore-panels", title: t("help.gs_explore"), description: t("help.gs_explore_desc"), icon: "🧩" },
    { id: "add-component", title: t("help.gs_add"), description: t("help.gs_add_desc"), icon: "📝" },
    { id: "edit-text", title: t("help.gs_edit"), description: t("help.gs_edit_desc"), icon: "✏️" },
    { id: "add-more", title: t("help.gs_add_more"), description: t("help.gs_add_more_desc"), icon: "➕" },
    { id: "publish", title: t("help.gs_publish"), description: t("help.gs_publish_desc"), icon: "🚀" },
    { id: "explore-more", title: t("help.gs_explore_more"), description: t("help.gs_explore_more_desc"), icon: "🔍" },
  ];
}
