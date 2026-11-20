import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { ROUTES, useTheme, type Theme } from "./helpers";

// WCAG 2.2 level A and AA, the target in the project plan (Section 7).
const TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];

async function scan(page: Page) {
  const results = await new AxeBuilder({ page }).withTags(TAGS).analyze();
  // A short, readable summary if anything fails.
  return results.violations.map((v) => ({
    rule: v.id,
    impact: v.impact,
    help: v.help,
    where: v.nodes.slice(0, 4).map((n) => n.target.join(" ")),
  }));
}

const THEMES: Theme[] = ["light", "dark"];

test.describe("automated WCAG 2.2 AA scan, every page, both themes", () => {
  for (const theme of THEMES) {
    for (const route of ROUTES) {
      test(`${route} (${theme})`, async ({ page }) => {
        await useTheme(page, theme);
        await page.goto(route);
        await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
        expect(await scan(page)).toEqual([]);
      });
    }
  }
});

test.describe("automated scan of interactive states", () => {
  for (const theme of THEMES) {
    test(`contact form showing errors (${theme})`, async ({ page }) => {
      await useTheme(page, theme);
      await page.goto("/contact");
      await page.getByRole("button", { name: "Send message" }).click();
      await expect(page.locator("#name-error")).toBeVisible();
      expect(await scan(page)).toEqual([]);
    });

    test(`assistant chat open (${theme})`, async ({ page }) => {
      await useTheme(page, theme);
      await page.goto("/assistant");
      await page.getByRole("button", { name: "I understand, start chat" }).click();
      await expect(page.getByLabel("Your question")).toBeVisible();
      expect(await scan(page)).toEqual([]);
    });

    test(`mobile menu open (${theme})`, async ({ page }) => {
      await useTheme(page, theme);
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto("/");
      await page.getByRole("button", { name: "Menu" }).click();
      await expect(page.locator("#mobile-menu")).toBeVisible();
      expect(await scan(page)).toEqual([]);
    });
  }
});

test.describe("keyboard", () => {
  for (const route of ["/", "/services", "/contact", "/assistant"]) {
    test(`${route}: every tab stop has a visible focus indicator`, async ({ page }) => {
      await page.goto(route);
      const failures: string[] = [];
      for (let i = 0; i < 25; i++) {
        await page.keyboard.press("Tab");
        const info = await page.evaluate(() => {
          const el = document.activeElement as HTMLElement | null;
          if (!el || el === document.body) return null;
          const s = getComputedStyle(el);
          const visible =
            s.outlineStyle !== "none" && parseFloat(s.outlineWidth) > 0;
          const shadow = s.boxShadow !== "none";
          return {
            label:
              (el.getAttribute("aria-label") ||
                el.textContent ||
                el.tagName).trim().slice(0, 40),
            ok: visible || shadow,
          };
        });
        if (info && !info.ok) failures.push(info.label);
      }
      expect(failures).toEqual([]);
    });
  }
});

test.describe("reflow at 320 px wide (WCAG 1.4.10)", () => {
  test.use({ viewport: { width: 320, height: 640 } });
  for (const route of ROUTES) {
    test(`${route} has no sideways scrolling`, async ({ page }) => {
      await page.goto(route);
      const overflow = await page.evaluate(
        () =>
          document.documentElement.scrollWidth -
          document.documentElement.clientWidth,
      );
      expect(overflow).toBeLessThanOrEqual(0);
    });
  }
});

test.describe("zoom and motion", () => {
  test("text can be resized to 200 percent without losing content", async ({ page }) => {
    await page.goto("/contact");
    await page.addStyleTag({ content: "html { font-size: 200% !important; }" });
    await expect(page.getByRole("button", { name: "Send message" })).toBeVisible();
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow).toBeLessThanOrEqual(0);
  });

  test("animation is switched off for people who ask for reduced motion", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    const name = await page.evaluate(
      () => getComputedStyle(document.querySelector(".hero-rise")!).animationName,
    );
    expect(name).toBe("none");
  });
});
