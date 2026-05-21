import { test, expect } from "@playwright/test";

test.describe("knitstudio builder", () => {
  test("loads the dashboard", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("knitstudio")).toBeVisible();
    await expect(page.getByText("Visual Application Builder")).toBeVisible();
  });

  test("can create a project", async ({ page }) => {
    await page.goto("/");
    await page.getByText("Create your first project").click();
    await page.getByPlaceholder("Project name...").fill("Test Project");
    await page.getByText("Create").click();
    await expect(page.getByText("Test Project")).toBeVisible();
  });

  test("opens the builder when clicking a project", async ({ page }) => {
    await page.goto("/");
    // Create project first
    const createBtn = page.getByText("Create your first project");
    if (await createBtn.isVisible()) {
      await createBtn.click();
      await page.getByPlaceholder("Project name...").fill("E2E Test");
      await page.getByText("Create").click();
    }
    // Click on the project
    await page.getByText("E2E Test").click();
    await expect(page.getByText("Simple")).toBeVisible();
    await expect(page.getByText("Advanced")).toBeVisible();
  });

  test("mode toggle switches between simple and advanced", async ({ page }) => {
    await page.goto("/");
    // Navigate to builder via a project
    const createBtn = page.getByText("Create your first project");
    if (await createBtn.isVisible()) {
      await createBtn.click();
      await page.getByPlaceholder("Project name...").fill("Mode Test");
      await page.getByText("Create").click();
    }
    await page.getByText("Mode Test").first().click();

    await page.getByText("Advanced").click();
    await expect(page.getByText("Components")).toBeVisible();

    await page.getByText("Simple").click();
    await expect(page.getByText("Publish")).toBeVisible();
  });

  test("search overlay opens with Cmd+K", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Control+k");
    await expect(page.getByPlaceholder("Search pages, components, actions...")).toBeVisible();
  });

  test("keyboard shortcuts modal opens with ?", async ({ page }) => {
    await page.goto("/");
    // Need to be in builder for shortcuts
    const createBtn = page.getByText("Create your first project");
    if (await createBtn.isVisible()) {
      await createBtn.click();
      await page.getByPlaceholder("Project name...").fill("Shortcuts Test");
      await page.getByText("Create").click();
    }
    await page.getByText("Shortcuts Test").first().click();
    await page.keyboard.press("?");
    await expect(page.getByText("Keyboard Shortcuts")).toBeVisible();
  });
});
