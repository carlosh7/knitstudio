import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  ListResourcesRequestSchema,
  ListToolsRequestSchema,
  CallToolRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

const API_URL = process.env.API_URL || "http://localhost:3001";

const server = new Server(
  { name: "knitstudio-mcp", version: "1.0.0" },
  { capabilities: { resources: {}, tools: {} } }
);

server.setRequestHandler(ListResourcesRequestSchema, async () => ({
  resources: [
    { uri: "studio://projects", name: "Projects", description: "List all knitstudio projects" },
  ],
}));

async function apiCall(path: string, method = "GET", body?: unknown) {
  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  return res.json();
}

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "studio.list_projects",
      description: "List all projects",
      inputSchema: { type: "object", properties: {} },
    },
    {
      name: "studio.create_project",
      description: "Create a new project",
      inputSchema: {
        type: "object",
        properties: {
          name: { type: "string" },
          type: { type: "string", enum: ["web", "react", "vue"] },
        },
        required: ["name"],
      },
    },
    {
      name: "studio.create_page",
      description: "Create a page in a project",
      inputSchema: {
        type: "object",
        properties: {
          projectId: { type: "string" },
          name: { type: "string" },
          route: { type: "string" },
        },
        required: ["projectId", "name"],
      },
    },
    {
      name: "studio.health",
      description: "Check if knitstudio API is healthy",
      inputSchema: { type: "object", properties: {} },
    },
  ],
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name } = request.params;

  try {
    let result: unknown;

    switch (name) {
      case "studio.list_projects":
        result = await apiCall("/api/projects");
        break;
      case "studio.create_project": {
        const args = request.params.arguments as any;
        result = await apiCall("/api/projects", "POST", { name: args?.name, type: args?.type || "web" });
        break;
      }
      case "studio.health":
        result = await apiCall("/api/health");
        break;
      case "studio.create_page":
        result = { message: "Page creation endpoint not yet implemented on API" };
        break;
      default:
        throw new Error(`Unknown tool: ${name}`);
    }

    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  } catch (err) {
    return {
      isError: true,
      content: [{ type: "text", text: `Error: ${err}` }],
    };
  }
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("[knitstudio/mcp] MCP Server running on stdio");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
