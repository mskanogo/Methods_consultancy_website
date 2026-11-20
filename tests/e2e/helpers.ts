import type { Page } from "@playwright/test";
import { services } from "../../app/data/services";

export const NAV = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Sectors", href: "/sectors" },
  { label: "Experience", href: "/experience" },
  { label: "Contact", href: "/contact" },
];

export const FIRST_SERVICE = services[0];

// Every page of the site that a visitor can reach.
export const ROUTES = [
  "/",
  "/about",
  "/services",
  `/services/${FIRST_SERVICE.slug}`,
  "/sectors",
  "/experience",
  "/contact",
  "/assistant",
  "/legal/privacy",
  "/legal/terms",
  "/legal/cookies",
];

export type Theme = "light" | "dark";

// Sets the saved theme before the page loads, the same way the toggle does.
export async function useTheme(page: Page, theme: Theme) {
  await page.addInitScript((t) => localStorage.setItem("theme", t), theme);
}

export function mockAssistant(
  page: Page,
  response: { status: number; body: unknown },
) {
  return page.route("**/api/assistant", (route) =>
    route.fulfill({
      status: response.status,
      contentType: "application/json",
      body: JSON.stringify(response.body),
    }),
  );
}
