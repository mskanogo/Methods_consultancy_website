import { test, expect } from "@playwright/test";

const WHITE = "rgb(255, 255, 255)";
const BLACK = "rgb(0, 0, 0)";

test.describe("light and dark mode", () => {
  test.use({ viewport: { width: 1280, height: 800 } });

  test("toggle switches between pure white and pure black and is remembered", async ({ page }) => {
    await page.emulateMedia({ colorScheme: "light" });
    await page.goto("/");
    const html = page.locator("html");
    const background = () =>
      page.evaluate(() => getComputedStyle(document.body).backgroundColor);

    await expect(html).not.toHaveClass(/dark/);
    expect(await background()).toBe(WHITE);

    await page.getByRole("button", { name: "Dark mode" }).click();
    await expect(html).toHaveClass(/dark/);
    expect(await background()).toBe(BLACK);

    await page.reload();
    await expect(html).toHaveClass(/dark/);
    expect(await background()).toBe(BLACK);

    await page.goto("/contact");
    await expect(html).toHaveClass(/dark/);

    await page.getByRole("button", { name: "Light mode" }).click();
    await expect(html).not.toHaveClass(/dark/);
    expect(await background()).toBe(WHITE);
  });

  test("hero shows the matching icon for each theme", async ({ page }) => {
    await page.emulateMedia({ colorScheme: "light" });
    await page.goto("/");
    await expect(page.locator('img[src*="icon-color"]')).toBeVisible();
    await expect(page.locator('img[src*="icon-white"]')).toBeHidden();
    await page.getByRole("button", { name: "Dark mode" }).click();
    await expect(page.locator('img[src*="icon-white"]')).toBeVisible();
    await expect(page.locator('img[src*="icon-color"]')).toBeHidden();
  });
});

test.describe("follows the system setting on first visit", () => {
  test.use({ colorScheme: "dark" });
  test("dark system setting gives dark mode", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("html")).toHaveClass(/dark/);
  });
});

test.describe("saved choice beats the system setting", () => {
  test.use({ colorScheme: "dark" });
  test("saved light stays light on a dark system", async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem("theme", "light"));
    await page.goto("/");
    await expect(page.locator("html")).not.toHaveClass(/dark/);
  });
});
