import { test, expect } from "@playwright/test";
import { services } from "../../app/data/services";
import { NAV, ROUTES } from "./helpers";

test.describe("top-right navigation (desktop)", () => {
  test.use({ viewport: { width: 1280, height: 800 } });

  for (const { label, href } of NAV) {
    test(`${label} opens ${href} and is marked as the current page`, async ({ page }) => {
      await page.goto("/");
      const link = page
        .getByRole("navigation", { name: "Main", exact: true })
        .getByRole("link", { name: label, exact: true });
      await link.click();
      await expect(page).toHaveURL(href);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      await expect(link).toHaveAttribute("aria-current", "page");
    });
  }

  test("nav sits at the top right, logo at the left", async ({ page }) => {
    await page.goto("/");
    const logo = page.getByRole("link", { name: "Methods Consultancy home" });
    const cta = page
      .getByRole("banner")
      .getByRole("link", { name: "Book a consultation" });
    const logoBox = await logo.boundingBox();
    const ctaBox = await cta.boundingBox();
    expect(logoBox!.x).toBeLessThan(400);
    expect(ctaBox!.x).toBeGreaterThan(800);
    expect(ctaBox!.y).toBeLessThan(100);
  });

  test("logo returns to the home page", async ({ page }) => {
    await page.goto("/about");
    await page.getByRole("link", { name: "Methods Consultancy home" }).click();
    await expect(page).toHaveURL("/");
  });

  test("header stays visible after scrolling", async ({ page }) => {
    await page.goto("/services");
    await page.mouse.wheel(0, 1500);
    await expect(page.getByRole("banner")).toBeInViewport();
  });
});

test.describe("mobile menu", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("opens, navigates, and closes itself", async ({ page }) => {
    await page.goto("/");
    const menuButton = page.getByRole("button", { name: "Menu" });
    await menuButton.click();
    const mobileNav = page.getByRole("navigation", { name: "Main mobile" });
    await expect(mobileNav).toBeVisible();
    await mobileNav.getByRole("link", { name: "Services" }).click();
    await expect(page).toHaveURL("/services");
    await expect(page.getByRole("button", { name: "Menu" })).toBeVisible();
    await expect(page.locator("#mobile-menu")).toHaveCount(0);
  });

  test("Escape closes the menu", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Menu" }).click();
    await expect(page.locator("#mobile-menu")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.locator("#mobile-menu")).toHaveCount(0);
  });

  test("desktop nav is hidden on mobile", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByRole("navigation", { name: "Main", exact: true }),
    ).toBeHidden();
  });
});

test.describe("every page loads", () => {
  for (const route of ROUTES) {
    test(`${route} responds 200 with one h1 and a title`, async ({ page }) => {
      const response = await page.goto(route);
      expect(response?.status()).toBe(200);
      await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
      await expect(page).toHaveTitle(/Methods Consultancy/);
      await expect(page.locator("main#main")).toHaveCount(1);
    });
  }

  for (const service of services) {
    test(`service page: ${service.title}`, async ({ page }) => {
      await page.goto(`/services/${service.slug}`);
      await expect(
        page.getByRole("heading", { level: 1, name: service.title }),
      ).toBeVisible();
      await expect(
        page.getByRole("link", { name: "Ask our assistant about this service" }),
      ).toHaveAttribute("href", `/assistant?topic=${service.slug}`);
    });
  }

  test("unknown address returns 404", async ({ page }) => {
    const response = await page.goto("/this-page-does-not-exist");
    expect(response?.status()).toBe(404);
  });

  test("unknown service slug returns 404", async ({ page }) => {
    const response = await page.goto("/services/not-a-real-service");
    expect(response?.status()).toBe(404);
  });
});

test.describe("links between pages", () => {
  test("home page links reach their pages", async ({ page }) => {
    const cases = [
      { name: "About the firm", url: "/about" },
      { name: "View all services", url: "/services" },
      { name: "View sectors", url: "/sectors" },
      { name: "See our experience", url: "/experience" },
    ];
    for (const { name, url } of cases) {
      await page.goto("/");
      await page.getByRole("link", { name }).first().click();
      await expect(page).toHaveURL(url);
    }
  });

  test("a service card opens its service page", async ({ page }) => {
    await page.goto("/services");
    await page
      .getByRole("link", { name: services[1].title })
      .first()
      .click();
    await expect(page).toHaveURL(`/services/${services[1].slug}`);
  });

  test("footer legal links open their pages", async ({ page }) => {
    for (const name of ["Privacy", "Terms", "Cookies"]) {
      await page.goto("/");
      await page
        .getByRole("contentinfo")
        .getByRole("link", { name, exact: true })
        .click();
      await expect(page).toHaveURL(new RegExp(`/legal/${name.toLowerCase()}`));
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    }
  });
});

test.describe("skip link", () => {
  test("is the first tab stop and jumps to the main content", async ({ page }) => {
    await page.goto("/about");
    await page.keyboard.press("Tab");
    const skip = page.getByRole("link", { name: "Skip to main content" });
    await expect(skip).toBeFocused();
    await expect(skip).toBeVisible();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/#main$/);
  });
});
