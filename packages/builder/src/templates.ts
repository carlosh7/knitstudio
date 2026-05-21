import type { ComponentNode } from "@knitstudio/core";

export interface Template {
  id: string;
  name: string;
  level: 1 | 2 | 3 | 4 | 5;
  category: string;
  description: string;
  layout: { pages: Array<{ route: string; title: string; root: ComponentNode }> };
  previewUrl?: string;
}

function text(text: string): ComponentNode {
  return { type: "text", key: `text-${crypto.randomUUID().slice(0, 6)}`, props: { tag: "h1", content: text }, styles: { base: { fontSize: "32px", color: "#fff", fontWeight: "bold" } } };
}

function button(text: string): ComponentNode {
  return { type: "button", key: `btn-${crypto.randomUUID().slice(0, 6)}`, props: { text, variant: "primary" }, styles: { base: { background: "#4f46e5", color: "#fff", padding: "10px 20px", borderRadius: "6px", border: "none", cursor: "pointer" } } };
}

function container(children: ComponentNode[], direction: "column" | "row" = "column"): ComponentNode {
  return { type: "container", key: `container-${crypto.randomUUID().slice(0, 6)}`, styles: { base: { display: "flex", flexDirection: direction, padding: "16px", gap: "8px" } }, children };
}

function card(children: ComponentNode[]): ComponentNode {
  return { type: "card", key: `card-${crypto.randomUUID().slice(0, 6)}`, styles: { base: { background: "#1a1a2e", borderRadius: "8px", padding: "20px", border: "1px solid #333" } }, children };
}

export const templates: Template[] = [
  {
    id: "blank",
    name: "Blank Page",
    level: 1,
    category: "Basic",
    description: "Empty canvas — start from scratch",
    layout: {
      pages: [{ route: "/", title: "Blank Page", root: container([text("Welcome"), button("Get Started")]) }],
    },
  },
  {
    id: "landing",
    name: "Landing Page",
    level: 2,
    category: "Marketing",
    description: "Hero section, features, CTA — ideal for product launches",
    layout: {
      pages: [{
        route: "/", title: "Landing",
        root: container([
          { type: "navbar", key: "nav", props: { brand: "MyProduct" }, styles: { base: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 24px", background: "#1a1a2e", borderBottom: "1px solid #333" } } },
          container([text("Build Something Amazing"), text("Landing page description here")]),
          container([
            card([text("Feature 1"), { type: "text", key: "f1d", props: { tag: "p", content: "Description of feature 1" }, styles: { base: { fontSize: "14px", color: "#8899aa" } } }]),
            card([text("Feature 2"), { type: "text", key: "f2d", props: { tag: "p", content: "Description of feature 2" }, styles: { base: { fontSize: "14px", color: "#8899aa" } } }]),
            card([text("Feature 3"), { type: "text", key: "f3d", props: { tag: "p", content: "Description of feature 3" }, styles: { base: { fontSize: "14px", color: "#8899aa" } } }]),
          ], "row"),
          button("Get Started"),
        ]),
      }],
    },
  },
  {
    id: "dashboard",
    name: "Dashboard",
    level: 3,
    category: "Application",
    description: "Sidebar + header + stats cards + data table",
    layout: {
      pages: [{
        route: "/", title: "Dashboard",
        root: container([
          { type: "sidebar", key: "sb", styles: { base: { width: "240px", background: "#16213e", borderRight: "1px solid #333", padding: "16px" }, platform: { web: {} } } },
          container([
            { type: "navbar", key: "dnav", props: { brand: "Dashboard" }, styles: { base: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 24px" } } },
            container([
              card([text("1,234"), { type: "text", key: "st1", props: { tag: "p", content: "Users" }, styles: { base: { fontSize: "12px", color: "#8899aa" } } }]),
              card([text("$45.6K"), { type: "text", key: "st2", props: { tag: "p", content: "Revenue" }, styles: { base: { fontSize: "12px", color: "#8899aa" } } }]),
              card([text("89%"), { type: "text", key: "st3", props: { tag: "p", content: "Retention" }, styles: { base: { fontSize: "12px", color: "#8899aa" } } }]),
            ], "row"),
            { type: "table", key: "dt", props: { columns: "Name,Email,Status" }, styles: { base: { width: "100%", borderCollapse: "collapse" } } },
          ]),
        ], "row"),
      }],
    },
  },
  {
    id: "auth-app",
    name: "Auth + Full App",
    level: 4,
    category: "Application",
    description: "Login, registration, protected dashboard, user menu",
    layout: {
      pages: [
        { route: "/login", title: "Login", root: container([text("Sign In"), { type: "textinput", key: "email", props: { placeholder: "Email", type: "email" } }, { type: "textinput", key: "pw", props: { placeholder: "Password", type: "password" } }, button("Log In")]) },
        { route: "/dashboard", title: "Dashboard", root: container([
          { type: "navbar", key: "anav", props: { brand: "MyApp" } },
          container([text("Welcome back!"), button("View Profile")]),
        ]) },
      ],
    },
  },
  {
    id: "full-app",
    name: "Full Application",
    level: 5,
    category: "Application",
    description: "Complete app: auth, dashboard, settings, API integration, roles",
    layout: {
      pages: [
        { route: "/", title: "Landing", root: container([text("MyApp"), text("Full-stack application template"), button("Get Started")]) },
        { route: "/login", title: "Login", root: container([text("Sign In"), { type: "textinput", key: "l-email", props: { placeholder: "Email" } }, { type: "textinput", key: "l-pw", props: { placeholder: "Password", type: "password" } }, button("Sign In")]) },
        { route: "/dashboard", title: "Dashboard", root: container([
          { type: "sidebar", key: "f-sb" },
          container([
            { type: "navbar", key: "f-nav", props: { brand: "MyApp" } },
            container([card([text("Stats")]), card([text("Chart")])], "row"),
            { type: "table", key: "f-tbl", props: { columns: "ID,Name,Status" } },
          ]),
        ], "row") },
        { route: "/settings", title: "Settings", root: container([text("Settings"), { type: "tabs", key: "st", props: { tabs: "Profile,Account,Notifications,Billing" } }]) },
      ],
    },
  },
];

export function getTemplatesByLevel(level: number): Template[] {
  return templates.filter((t) => t.level <= level);
}

export function getTemplate(id: string): Template | undefined {
  return templates.find((t) => t.id === id);
}
