"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

type Message = { role: "user" | "assistant"; text: string };

const MAX_LENGTH = 500;

const GREETING: Message = {
  role: "assistant",
  text: "Hello. Ask me about Methods Consultancy: what we do, who we work with, or how to start a conversation.",
};

const UNAVAILABLE =
  "The assistant is unavailable right now. You can still use the Book a consultation button, or the Contact page, to reach the team.";

const LIMIT =
  "This conversation has reached its limit. Please refresh the page to start a new one, or contact the team.";

const focus =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red-dark";

export default function AssistantChat() {
  const [consented, setConsented] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const log = logRef.current;
    if (log) log.scrollTop = log.scrollHeight;
  }, [messages, busy]);

  async function send(event: React.FormEvent) {
    event.preventDefault();
    const text = input.trim();
    if (!text || busy) return;

    const next: Message[] = [...messages, { role: "user", text }];
    setMessages(next);
    setInput("");
    setBusy(true);

    try {
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          // Skip the greeting, which only exists on the page.
          messages: next.slice(1).map((m) => ({ role: m.role, content: m.text })),
        }),
      });
      if (response.status === 429) throw new Error("limit");
      if (!response.ok) throw new Error("unavailable");

      const data = (await response.json()) as { reply: string };
      setMessages([...next, { role: "assistant", text: data.reply }]);
    } catch (error) {
      const limit = error instanceof Error && error.message === "limit";
      setMessages([...next, { role: "assistant", text: limit ? LIMIT : UNAVAILABLE }]);
    } finally {
      setBusy(false);
    }
  }

  if (!consented) {
    return (
      <div className="border border-brand-grey bg-white p-8">
        <h2 className="font-display text-2xl font-semibold text-brand-ink">
          Before we start
        </h2>
        <p className="mt-4 leading-relaxed text-brand-mid-grey">
          This is an automated assistant, not a person. It answers questions
          about Methods Consultancy from approved information only, and it
          cannot give advice on your own situation.
        </p>
        <p className="mt-3 leading-relaxed text-brand-mid-grey">
          Please do not share confidential or sensitive details in this chat.
          You never need to give personal details to ask a question.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-6">
          <button
            type="button"
            onClick={() => setConsented(true)}
            className={`bg-brand-red px-6 py-3 font-semibold text-white ${focus}`}
          >
            I understand, start chat
          </button>
          <Link
            href="/contact"
            className={`font-semibold text-brand-red-dark underline underline-offset-4 ${focus}`}
          >
            Talk to a person instead
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="border border-brand-grey bg-white">
      <div
        ref={logRef}
        role="log"
        aria-live="polite"
        aria-label="Conversation"
        className="h-[28rem] space-y-4 overflow-y-auto p-6"
      >
        {messages.map((message, i) => (
          <div
            key={i}
            className={message.role === "user" ? "flex justify-end" : "flex justify-start"}
          >
            <p
              className={`max-w-[85%] px-4 py-3 text-sm leading-relaxed ${
                message.role === "user"
                  ? "bg-brand-ink text-white"
                  : "bg-brand-grey text-brand-ink"
              }`}
            >
              <span className="sr-only">
                {message.role === "user" ? "You: " : "Assistant: "}
              </span>
              {message.text}
            </p>
          </div>
        ))}
        {busy && (
          <p className="text-sm text-brand-mid-grey">The assistant is replying...</p>
        )}
      </div>

      <form onSubmit={send} className="flex gap-3 border-t border-brand-grey p-4">
        <label htmlFor="assistant-input" className="sr-only">
          Your question
        </label>
        <input
          id="assistant-input"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          maxLength={MAX_LENGTH}
          placeholder="Ask a question"
          autoComplete="off"
          className="min-w-0 flex-1 border border-brand-mid-grey px-4 py-3 text-sm text-brand-ink"
        />
        <button
          type="submit"
          disabled={!input.trim() || busy}
          className={`bg-brand-red px-5 py-3 text-sm font-semibold text-white disabled:opacity-50 ${focus}`}
        >
          Send
        </button>
      </form>

      <p className="border-t border-brand-grey px-4 py-3 text-xs text-brand-mid-grey">
        Automated assistant.{" "}
        <Link
          href="/contact"
          className={`font-semibold text-brand-red-dark underline ${focus}`}
        >
          Talk to a person
        </Link>
      </p>
    </div>
  );
}
