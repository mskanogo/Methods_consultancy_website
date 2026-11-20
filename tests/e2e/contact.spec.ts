import { test, expect, type Page } from "@playwright/test";

const REQUIRED = ["name", "organisation", "email", "topic", "message", "consent"];

async function fillValid(page: Page) {
  await page.getByLabel("Name", { exact: true }).fill("Test Visitor");
  await page.getByLabel("Organisation").fill("Test Bank");
  await page.getByLabel("Email address").fill("visitor@example.com");
  await page.getByLabel("Topic").selectOption("new-business");
  await page
    .getByLabel("Message")
    .fill("We would like to talk about an architecture review.");
  await page.getByLabel(/I agree that Methods Consultancy/).check();
}

test.describe("contact form", () => {
  test("empty submit shows every required error and focuses the first field", async ({ page }) => {
    await page.goto("/contact");
    await page.getByRole("button", { name: "Send message" }).click();

    await expect(page.getByRole("alert").first()).toContainText(
      "Please check the fields",
    );
    for (const field of REQUIRED) {
      await expect(page.locator(`#${field}-error`)).toBeVisible();
      await expect(page.locator(`#${field}`)).toHaveAttribute(
        "aria-invalid",
        "true",
      );
      await expect(page.locator(`#${field}`)).toHaveAttribute(
        "aria-describedby",
        `${field}-error`,
      );
    }
    await expect(page.locator("#name")).toBeFocused();
  });

  test("role is optional", async ({ page }) => {
    await page.goto("/contact");
    await page.getByRole("button", { name: "Send message" }).click();
    await expect(page.locator("#role-error")).toHaveCount(0);
  });

  test("rejects an invalid email and a too-short message", async ({ page }) => {
    await page.goto("/contact");
    await fillValid(page);
    await page.getByLabel("Email address").fill("not-an-email");
    await page.getByLabel("Message").fill("short");
    await page.getByRole("button", { name: "Send message" }).click();
    await expect(page.locator("#email-error")).toHaveText(
      "Enter a valid email address.",
    );
    await expect(page.locator("#message-error")).toContainText("at least 10");
    await expect(page.locator("#name-error")).toHaveCount(0);
    await expect(page.locator("#email")).toBeFocused();
  });

  test("a valid submission shows the thank-you message", async ({ page }) => {
    await page.goto("/contact");
    await fillValid(page);
    await page.getByRole("button", { name: "Send message" }).click();
    await expect(page.getByRole("status")).toContainText("Thank you");
    await page.getByRole("button", { name: "Send another message" }).click();
    await expect(page.getByLabel("Name", { exact: true })).toHaveValue("");
  });

  test("a failed request shows a clear error and keeps the form", async ({ page }) => {
    await page.route("**/api/contact", (route) => route.abort());
    await page.goto("/contact");
    await fillValid(page);
    await page.getByRole("button", { name: "Send message" }).click();
    await expect(
      page.getByRole("alert").filter({ hasText: "Something went wrong" }),
    ).toBeVisible();
    await expect(page.getByLabel("Name", { exact: true })).toHaveValue(
      "Test Visitor",
    );
  });

  test("the honeypot field is not reachable by keyboard or screen reader", async ({ page }) => {
    await page.goto("/contact");
    const honeypot = page.locator("#website");
    await expect(honeypot).toHaveAttribute("tabindex", "-1");
    await expect(honeypot.locator("xpath=ancestor::div[1]")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
  });

  test("the form can be completed with the keyboard only", async ({ page }) => {
    await page.goto("/contact");
    await page.locator("#name").focus();
    await page.keyboard.type("Test Visitor");
    await page.keyboard.press("Tab");
    await page.keyboard.type("Test Bank");
    await page.keyboard.press("Tab"); // role (optional)
    await page.keyboard.press("Tab");
    await page.keyboard.type("visitor@example.com");
    await page.keyboard.press("Tab");
    await page.keyboard.press("ArrowDown"); // first topic
    await page.keyboard.press("Tab");
    await page.keyboard.type("We would like to talk about a review.");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Space"); // consent
    await page.keyboard.press("Tab"); // privacy link
    await page.keyboard.press("Tab"); // send
    await page.keyboard.press("Enter");
    await expect(page.getByRole("status")).toContainText("Thank you");
  });
});

test.describe("booking", () => {
  test("the page offers a way to book a call", async ({ page }) => {
    await page.goto("/contact");
    await expect(
      page.getByRole("heading", { name: "Book a discovery call" }),
    ).toBeVisible();
  });

  // KNOWN OPEN ITEM: BOOKING_URL in app/lib/contact.ts is still null, waiting
  // for the Cal.com or Calendly link from Methods Consultancy. Remove .fixme
  // once the link is pasted in.
  test.fixme("the Book a call link opens the booking tool in a new tab", async ({ page }) => {
    await page.goto("/contact");
    const link = page.getByRole("link", { name: "Book a call" });
    await expect(link).toHaveAttribute("target", "_blank");
    await expect(link).toHaveAttribute("rel", /noopener/);
  });
});

test.describe("contact API (server-side checks)", () => {
  test("rejects a body that is not JSON", async ({ request }) => {
    const res = await request.post("/api/contact", {
      headers: { "content-type": "application/json" },
      data: "not json",
    });
    expect(res.status()).toBe(400);
  });

  test("rejects an empty submission with field errors", async ({ request }) => {
    const res = await request.post("/api/contact", { data: {} });
    expect(res.status()).toBe(400);
    const body = await res.json();
    expect(body.ok).toBe(false);
    for (const field of REQUIRED) expect(body.errors).toHaveProperty(field);
  });

  test("accepts a valid submission", async ({ request }) => {
    const res = await request.post("/api/contact", {
      data: {
        name: "Test Visitor",
        organisation: "Test Bank",
        email: "visitor@example.com",
        topic: "new-business",
        message: "We would like to talk about an architecture review.",
        consent: true,
      },
    });
    expect(res.status()).toBe(200);
    expect((await res.json()).ok).toBe(true);
  });

  test("honeypot submissions get a normal reply and no signal", async ({ request }) => {
    const res = await request.post("/api/contact", {
      data: { website: "http://spam.example" },
    });
    expect(res.status()).toBe(200);
    expect((await res.json()).ok).toBe(true);
  });

  test("rejects an unknown topic and an over-long message", async ({ request }) => {
    const base = {
      name: "Test Visitor",
      organisation: "Test Bank",
      email: "visitor@example.com",
      consent: true,
    };
    const badTopic = await request.post("/api/contact", {
      data: { ...base, topic: "hack", message: "A long enough message here." },
    });
    expect(badTopic.status()).toBe(400);
    const tooLong = await request.post("/api/contact", {
      data: { ...base, topic: "other", message: "x".repeat(2001) },
    });
    expect(tooLong.status()).toBe(400);
  });
});
