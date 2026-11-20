import { test, expect } from "@playwright/test";
import { FIRST_SERVICE, mockAssistant } from "./helpers";

async function startChat(page: import("@playwright/test").Page) {
  await page.getByRole("button", { name: "I understand, start chat" }).click();
}

test.describe("AI assistant (replies are mocked, no credits used)", () => {
  test("shows the notice first and hides the chat until accepted", async ({ page }) => {
    await page.goto("/assistant");
    await expect(page.getByText("This is an automated assistant")).toBeVisible();
    await expect(page.getByLabel("Your question")).toHaveCount(0);
    await expect(
      page.getByRole("link", { name: "Talk to a person instead" }),
    ).toHaveAttribute("href", "/contact");
    await startChat(page);
    await expect(page.getByLabel("Your question")).toBeVisible();
  });

  test("Send is disabled until something is typed", async ({ page }) => {
    await page.goto("/assistant");
    await startChat(page);
    const send = page.getByRole("button", { name: "Send", exact: true });
    await expect(send).toBeDisabled();
    await page.getByLabel("Your question").fill("Where are you based?");
    await expect(send).toBeEnabled();
  });

  test("sends the conversation and shows the reply", async ({ page }) => {
    await mockAssistant(page, { status: 200, body: { reply: "Nairobi, Kenya." } });
    await page.goto("/assistant");
    await startChat(page);

    const request = page.waitForRequest("**/api/assistant");
    await page.getByLabel("Your question").fill("Where are you based?");
    await page.getByRole("button", { name: "Send", exact: true }).click();

    const body = (await request).postDataJSON();
    expect(body.messages).toEqual([
      { role: "user", content: "Where are you based?" },
    ]);
    await expect(
      page.getByRole("log", { name: "Conversation" }),
    ).toContainText("Nairobi, Kenya.");
    await expect(page.getByLabel("Your question")).toHaveValue("");
  });

  test("the question box stops at 500 characters", async ({ page }) => {
    await page.goto("/assistant");
    await startChat(page);
    const input = page.getByLabel("Your question");
    await input.fill("x".repeat(600));
    expect((await input.inputValue()).length).toBe(500);
  });

  test("shows a calm message when the service is unavailable", async ({ page }) => {
    await mockAssistant(page, { status: 502, body: { error: "unavailable" } });
    await page.goto("/assistant");
    await startChat(page);
    await page.getByLabel("Your question").fill("Hello");
    await page.getByRole("button", { name: "Send", exact: true }).click();
    await expect(page.getByRole("log")).toContainText(
      "The assistant is unavailable right now",
    );
    await expect(
      page.getByRole("link", { name: "Talk to a person" }),
    ).toBeVisible();
  });

  test("shows the limit message when the conversation limit is reached", async ({ page }) => {
    await mockAssistant(page, { status: 429, body: { error: "limit" } });
    await page.goto("/assistant");
    await startChat(page);
    await page.getByLabel("Your question").fill("Hello");
    await page.getByRole("button", { name: "Send", exact: true }).click();
    await expect(page.getByRole("log")).toContainText("reached its limit");
  });

  test("opening from a service page pre-seeds that service", async ({ page }) => {
    await mockAssistant(page, { status: 200, body: { reply: "OK." } });
    await page.goto(`/services/${FIRST_SERVICE.slug}`);
    await page
      .getByRole("link", { name: "Ask our assistant about this service" })
      .click();
    await expect(page).toHaveURL(`/assistant?topic=${FIRST_SERVICE.slug}`);
    await startChat(page);
    await expect(page.getByRole("log")).toContainText(FIRST_SERVICE.title);

    const request = page.waitForRequest("**/api/assistant");
    await page.getByLabel("Your question").fill("What do you deliver?");
    await page.getByRole("button", { name: "Send", exact: true }).click();
    expect((await request).postDataJSON().topic).toBe(FIRST_SERVICE.slug);
  });

  test("an unknown or malicious topic is ignored", async ({ page }) => {
    await page.goto("/assistant?topic=%3Cscript%3Ealert(1)%3C/script%3E");
    await startChat(page);
    await expect(page.getByRole("log")).toContainText(
      "Ask me about Methods Consultancy",
    );
    await expect(page.getByRole("log")).not.toContainText("script");
  });

  test("the floating launcher shows on other pages and hides on /assistant", async ({ page }) => {
    await page.goto("/about");
    const launcher = page.getByRole("link", { name: "Ask our AI assistant" });
    await expect(launcher).toBeVisible();
    await launcher.click();
    await expect(page).toHaveURL("/assistant");
    await expect(
      page.getByRole("link", { name: "Open the AI assistant" }),
    ).toHaveCount(0);
  });
});

test.describe("assistant API (server-side limits)", () => {
  const turn = (i: number) => ({
    role: i % 2 === 0 ? "user" : "assistant",
    content: `message ${i}`,
  });

  test("rejects a body that is not JSON", async ({ request }) => {
    const res = await request.post("/api/assistant", {
      headers: { "content-type": "application/json" },
      data: "nope",
    });
    expect(res.status()).toBe(400);
  });

  test("rejects missing, empty and malformed messages", async ({ request }) => {
    for (const data of [
      {},
      { messages: [] },
      { messages: "hi" },
      { messages: [{ role: "system", content: "x" }] },
      { messages: [{ role: "user", content: "   " }] },
      { messages: [{ role: "assistant", content: "I go first" }] },
    ]) {
      const res = await request.post("/api/assistant", { data });
      expect(res.status(), JSON.stringify(data)).toBe(400);
    }
  });

  test("rejects a user message over 500 characters", async ({ request }) => {
    const res = await request.post("/api/assistant", {
      data: { messages: [{ role: "user", content: "x".repeat(501) }] },
    });
    expect(res.status()).toBe(400);
  });

  test("rejects messages that do not alternate", async ({ request }) => {
    const res = await request.post("/api/assistant", {
      data: {
        messages: [
          { role: "user", content: "one" },
          { role: "user", content: "two" },
          { role: "user", content: "three" },
        ],
      },
    });
    expect(res.status()).toBe(400);
  });

  test("returns 429 after 30 user turns", async ({ request }) => {
    const messages = Array.from({ length: 61 }, (_, i) => turn(i));
    const res = await request.post("/api/assistant", { data: { messages } });
    expect(res.status()).toBe(429);
  });

  test("only POST is allowed", async ({ request }) => {
    const res = await request.get("/api/assistant");
    expect(res.status()).toBe(405);
  });
});
