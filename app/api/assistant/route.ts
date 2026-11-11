import { NextResponse } from "next/server";
import { buildSystemPrompt } from "../../lib/assistantPrompt";

// Limits are enforced here, on the server, because anything in the
// browser can be bypassed.
const MAX_USER_MESSAGE_LENGTH = 500;
const MAX_ASSISTANT_MESSAGE_LENGTH = 2000;
const MAX_USER_TURNS = 30;
const MAX_OUTPUT_TOKENS = 400;
const REQUEST_TIMEOUT_MS = 20000;

type ChatMessage = { role: "user" | "assistant"; content: string };

function parseMessages(value: unknown): ChatMessage[] | null {
  if (!Array.isArray(value) || value.length === 0) return null;

  const messages: ChatMessage[] = [];
  for (const item of value) {
    if (typeof item !== "object" || item === null) return null;
    const { role, content } = item as Record<string, unknown>;
    if (role !== "user" && role !== "assistant") return null;
    if (typeof content !== "string" || content.trim() === "") return null;
    const maxLength =
      role === "user" ? MAX_USER_MESSAGE_LENGTH : MAX_ASSISTANT_MESSAGE_LENGTH;
    if (content.length > maxLength) return null;
    messages.push({ role: role as "user" | "assistant", content });
  }

  // Must run user, assistant, user, ... and end on a user message.
  const alternates = messages.every(
    (m, i) => m.role === (i % 2 === 0 ? "user" : "assistant")
  );
  if (!alternates || messages.length % 2 === 0) return null;

  return messages;
}

export async function POST(request: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error("ANTHROPIC_API_KEY is not set");
    return NextResponse.json({ error: "unavailable" }, { status: 503 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  const payload = (
    typeof body === "object" && body !== null ? body : {}
  ) as Record<string, unknown>;

  const messages = parseMessages(payload.messages);
  if (!messages) {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  if ((messages.length + 1) / 2 > MAX_USER_TURNS) {
    return NextResponse.json({ error: "limit" }, { status: 429 });
  }

  const topic = typeof payload.topic === "string" ? payload.topic : undefined;
  // Model is configuration, so it can change without a code edit.
  const model = process.env.ANTHROPIC_MODEL ?? "claude-sonnet-5-5";

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model,
        max_tokens: MAX_OUTPUT_TOKENS,
        system: buildSystemPrompt(topic),
        messages,
      }),
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });

    if (!response.ok) {
      console.error("Anthropic API error", response.status);
      return NextResponse.json({ error: "unavailable" }, { status: 502 });
    }

    const data = (await response.json()) as {
      content?: { type: string; text?: string }[];
    };
    const reply = (data.content ?? [])
      .filter((block) => block.type === "text" && typeof block.text === "string")
      .map((block) => block.text)
      .join("\n")
      .trim();

    if (!reply) {
      return NextResponse.json({ error: "unavailable" }, { status: 502 });
    }

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Assistant request failed", error);
    return NextResponse.json({ error: "unavailable" }, { status: 502 });
  }
}
