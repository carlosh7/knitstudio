import type { AppSchema, ComponentNode, PageDefinition } from "@knitstudio/core";

export interface AIProvider {
  name: string;
  generateLayout: (prompt: string) => Promise<AppSchema>;
  generateComponent: (description: string) => Promise<ComponentNode>;
  translatePage: (page: PageDefinition, targetLang: string) => Promise<PageDefinition>;
}

export class OpenAIProvider implements AIProvider {
  name = "openai";
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async generateLayout(prompt: string): Promise<AppSchema> {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are knitstudio AI, a visual app builder assistant. Generate layouts in JSON format matching the knitstudio schema.",
          },
          { role: "user", content: prompt },
        ],
        response_format: { type: "json_object" },
      }),
    });

    const data = await response.json();
    return JSON.parse(data.choices[0].message.content) as AppSchema;
  }

  async generateComponent(description: string): Promise<ComponentNode> {
    const schema = await this.generateLayout(`Create a component: ${description}`);
    return schema.pages[0]?.root || { type: "container", key: "root" };
  }

  async translatePage(page: PageDefinition, targetLang: string): Promise<PageDefinition> {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: `Translate the following page content to ${targetLang}. Return the same JSON structure with translated text only.`,
          },
          { role: "user", content: JSON.stringify(page) },
        ],
        response_format: { type: "json_object" },
      }),
    });

    const data = await response.json();
    return JSON.parse(data.choices[0].message.content) as PageDefinition;
  }
}

export function createAIProvider(provider: "openai", apiKey: string): AIProvider {
  switch (provider) {
    case "openai":
      return new OpenAIProvider(apiKey);
    default:
      throw new Error(`Unknown AI provider: ${provider}`);
  }
}
