# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: builder.spec.ts >> knitstudio builder >> loads the dashboard
- Location: e2e/builder.spec.ts:4:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText('knitstudio')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByText('knitstudio')

```

```yaml
- text: verified_user
- heading "Check. Pro" [level=2]
- paragraph: Sistema de Registro Elite
- text: Email Corporativo
- textbox "tu@empresa.com"
- text: mail Código de Acceso
- textbox "••••••••"
- button "visibility"
- link "¿Olvidaste tu contraseña?":
  - /url: "#"
- button "Entrar al Ecosistema"
- link "Powered By Smart Eventos":
  - /url: https://smarteventos.co/
- paragraph: © 2026 Check Pro
- text: v12.44.762
```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | 
  3  | test.describe("knitstudio builder", () => {
  4  |   test("loads the dashboard", async ({ page }) => {
  5  |     await page.goto("/");
> 6  |     await expect(page.getByText("knitstudio")).toBeVisible();
     |                                                ^ Error: expect(locator).toBeVisible() failed
  7  |     await expect(page.getByText("Visual Application Builder")).toBeVisible();
  8  |   });
  9  | 
  10 |   test("search overlay opens with Cmd+K", async ({ page }) => {
  11 |     await page.goto("/");
  12 |     await page.keyboard.press("Control+k");
  13 |     await expect(page.getByPlaceholder("Search pages, components, actions...")).toBeVisible();
  14 |     await page.keyboard.press("Escape");
  15 |   });
  16 | 
  17 |   test("dashboard has create button", async ({ page }) => {
  18 |     await page.goto("/");
  19 |     const createBtn = page.getByText("Create your first project");
  20 |     await expect(createBtn).toBeVisible();
  21 |   });
  22 | 
  23 |   test("navbar links are visible", async ({ page }) => {
  24 |     await page.goto("/");
  25 |     await expect(page.getByRole("heading", { name: /welcome/i })).toBeVisible();
  26 |   });
  27 | 
  28 |   test("project creation form opens", async ({ page }) => {
  29 |     await page.goto("/");
  30 |     await page.getByText("New Project").click();
  31 |     await expect(page.getByPlaceholder("Project name...")).toBeVisible();
  32 |   });
  33 | 
  34 |   test("mode toggle exists in builder view", async ({ page }) => {
  35 |     // Create a project via direct URL navigation with a project ID
  36 |     await page.goto("/");
  37 |     await page.getByText("New Project").click();
  38 |     await page.getByPlaceholder("Project name...").fill("E2E Test");
  39 |     // The create button may or may not work without API
  40 |     // At minimum we verify the UI renders
  41 |     await expect(page.getByText("Visual Application Builder")).toBeVisible();
  42 |   });
  43 | });
  44 | 
```