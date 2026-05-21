// Help data for the interactive HelpPanel
// Each item pairs a UI element with contextual guidance

export interface HelpItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  target?: string; // CSS selector for highlight
  link?: string; // Link to detailed docs
}

export const helpItems: HelpItem[] = [
  // Dashboard
  { id: "dashboard", title: "Dashboard", description: "Here you see all your projects. Click any to edit, or create a new one.", icon: "🏠" },
  { id: "new-project", title: "New Project", description: "Click here to create a new project. Give it a name and start building!", icon: "➕", target: "[data-onboard='new-project']" },
  { id: "empty-state", title: "Welcome Screen", description: "If you see this, you have no projects yet. Click 'Create your first project' to begin!", icon: "👋" },

  // Builder toolbar
  { id: "toolbar", title: "Toolbar", description: "This is your command center. From here you can access all features of knitstudio.", icon: "🔧" },
  { id: "mode-toggle", title: "Simple / Advanced", description: "Switch between Simple mode (3 buttons, great for beginners) and Advanced mode (full builder, all panels).", icon: "🔄" },
  { id: "search", title: "Search (Cmd+K)", description: "Press Cmd+K (Mac) or Ctrl+K (Windows) to open the global search. Find pages, components, and actions instantly.", icon: "🔍" },
  { id: "publish", title: "Publish", description: "When your page is ready, click Publish. In Simple mode, a wizard guides you through the process.", icon: "🚀" },
  { id: "back-dashboard", title: "← Dashboard", description: "Click here to go back to your project list at any time. Your work is auto-saved.", icon: "🔙" },

  // Panels
  { id: "components-panel", title: "Components Panel", description: "All 35+ components are here. Drag any onto the canvas to start building your UI.", icon: "🧩" },
  { id: "actions-panel", title: "Actions Panel", description: "The visual flow editor. Connect components to APIs, add logic, and create interactions.", icon: "⚡" },
  { id: "data-panel", title: "Data Panel", description: "Connect your UI to real APIs. Add data sources, bind them to components, and execute with one click.", icon: "🔗" },
  { id: "ai-panel", title: "AI Panel", description: "Describe what you want and knitstudio's AI generates the layout. Requires an OpenAI API key.", icon: "🤖" },
  { id: "safety-panel", title: "Safety Net", description: "Take snapshots of your work so you can always go back. Like a time machine for your project.", icon: "🛟" },
  { id: "versions-panel", title: "Version Browser", description: "See every saved version of your page. Compare changes and rollback if needed.", icon: "📋" },
  { id: "monitor-panel", title: "Monitor", description: "Real-time metrics: load times, export times, and error tracking for your builder instance.", icon: "📊" },
  { id: "selfedit-panel", title: "Self-Edit Mode", description: "Advanced mode that lets you edit knitstudio's own interface. Use with caution!", icon: "🔮" },
  { id: "sandbox-panel", title: "Component Sandbox", description: "Test components in isolation. Select a component, tweak its props, and see changes in real-time.", icon: "🧪" },

  // Features
  { id: "quick-edit", title: "Quick Edit (E key)", description: "Select a text or button component on the canvas and press 'E' to edit its content inline.", icon: "✏️" },
  { id: "shortcuts", title: "Keyboard Shortcuts (?)", description: "Press '?' to see all available keyboard shortcuts. Undo, redo, save, and more.", icon: "⌨️" },
  { id: "grid", title: "Grid Settings (⊞)", description: "Configure snap-to-grid and show/hide the grid overlay for precise alignment.", icon: "⊞" },
  { id: "showcase", title: "Showcase Gallery (🖼)", description: "Browse example projects for inspiration. Click any to use it as a starting point.", icon: "🖼" },
  { id: "changelog", title: "Changelog (📋)", description: "See what changed in each version of knitstudio. New features, fixes, and improvements.", icon: "📋" },
  { id: "roadmap", title: "Roadmap (🗺)", description: "See what's coming next. Track progress across all development phases.", icon: "🗺" },
  { id: "feedback", title: "Feedback (💬)", description: "Send us your thoughts! Report bugs, suggest features, or just say hi.", icon: "💬" },
  { id: "settings", title: "Settings (⚙)", description: "Configure your OpenAI API key for AI generation, or import a page from a URL.", icon: "⚙" },

  // Canvas
  { id: "canvas", title: "Canvas", description: "This is your design area. Drag components here, select them, move them around. What you see is what you get.", icon: "🎨" },
  { id: "component-select", title: "Selecting Components", description: "Click any component on the canvas to select it. You can then edit, move, or delete it.", icon: "👆" },
  { id: "component-drag", title: "Drag & Drop", description: "Grab components from the panel and drag them onto the canvas. Drop them where you want them.", icon: "🖱️" },

  // Wizards
  { id: "wizard", title: "Publish Wizard", description: "In Simple mode, clicking Publish opens a wizard that guides you through creating a page step by step.", icon: "🧙" },
  { id: "template-selector", title: "Template Selector", description: "Choose from 5 levels of templates — from simple pages to full applications with auth and databases.", icon: "📄" },
];

export const gettingStartedSteps = [
  { id: "welcome", title: "Welcome!", description: "You're in the builder. This is where you design your app visually.", icon: "👋" },
  { id: "explore-panels", title: "Explore Panels", description: "Click any button in the toolbar to open a panel. Try 'Components' to see available building blocks.", icon: "🧩" },
  { id: "add-component", title: "Add a Component", description: "Open the Components panel and drag a 'Text' component onto the canvas.", icon: "📝" },
  { id: "edit-text", title: "Edit Text", description: "Select the text you just added and press 'E' to edit it. Type something fun!", icon: "✏️" },
  { id: "add-more", title: "Add More Components", description: "Try adding a Button, a Card, or a Container. Experiment!", icon: "➕" },
  { id: "publish", title: "Publish", description: "When you're happy, click Publish. You can always come back and edit later.", icon: "🚀" },
  { id: "explore-more", title: "Explore More", description: "Try the Data panel to connect an API, or the AI panel to generate layouts.", icon: "🔍" },
];

export function getHelpForId(id: string): HelpItem | undefined {
  return helpItems.find((item) => item.id === id);
}

export function searchHelp(query: string): HelpItem[] {
  const q = query.toLowerCase();
  return helpItems.filter(
    (item) =>
      item.title.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q)
  );
}
