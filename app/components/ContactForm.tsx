"use client";

import { useState } from "react";
import Link from "next/link";
import {
  LIMITS,
  TOPICS,
  validateContact,
  type FieldErrors,
  type FieldName,
} from "../lib/contact";

type Status = "idle" | "sending" | "sent" | "failed";

const FIELD_ORDER: FieldName[] = [
  "name",
  "organisation",
  "role",
  "email",
  "topic",
  "message",
  "consent",
];

const inputClass =
  "w-full border border-muted bg-surface px-4 py-3 text-sm text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

function focusFirstError(form: HTMLFormElement, errors: FieldErrors) {
  const first = FIELD_ORDER.find((field) => errors[field]);
  if (!first) return;
  const element = form.elements.namedItem(first);
  if (element instanceof HTMLElement) element.focus();
}

function FieldShell({
  id,
  label,
  optional,
  error,
  children,
}: {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-ink">
        {label}
        {optional && (
          <span className="font-normal text-muted"> (optional)</span>
        )}
      </label>
      <div className="mt-2">{children}</div>
      {error && (
        <p id={`${id}-error`} className="mt-2 text-sm font-medium text-accent">
          {error}
        </p>
      )}
    </div>
  );
}

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [delivered, setDelivered] = useState(false);

  function aria(field: FieldName) {
    return {
      "aria-invalid": errors[field] ? true : undefined,
      "aria-describedby": errors[field] ? `${field}-error` : undefined,
    };
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;

    const form = event.currentTarget;
    const data = new FormData(form);
    const input = {
      name: data.get("name"),
      organisation: data.get("organisation"),
      role: data.get("role"),
      email: data.get("email"),
      topic: data.get("topic"),
      message: data.get("message"),
      consent: data.get("consent") === "on",
      website: data.get("website"),
    };

    const { errors: found } = validateContact(input);
    if (Object.keys(found).length > 0) {
      setErrors(found);
      focusFirstError(form, found);
      return;
    }

    setErrors({});
    setStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      const result = (await response.json()) as {
        ok: boolean;
        delivered?: boolean;
        errors?: FieldErrors;
      };

      if (response.ok && result.ok) {
        setDelivered(Boolean(result.delivered));
        setStatus("sent");
        form.reset();
        return;
      }
      if (result.errors) {
        setErrors(result.errors);
        setStatus("idle");
        focusFirstError(form, result.errors);
        return;
      }
      setStatus("failed");
    } catch {
      setStatus("failed");
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="border border-line bg-surface p-8">
        <h3 className="font-display text-2xl font-semibold text-ink">
          Thank you
        </h3>
        <p className="mt-4 leading-relaxed text-muted">
          {delivered
            ? "Your message has been sent to the team."
            : "Your message passed our checks, but this preview site is not connected to email yet, so nothing was sent."}
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 font-semibold text-accent underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6">
      {Object.keys(errors).length > 0 && (
        <p role="alert" className="text-sm font-semibold text-accent">
          Please check the fields marked below.
        </p>
      )}
      {status === "failed" && (
        <p role="alert" className="text-sm font-semibold text-accent">
          Something went wrong and your message was not sent. Please try again,
          or use the booking option.
        </p>
      )}

      <FieldShell id="name" label="Name" error={errors.name}>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          maxLength={LIMITS.name}
          className={inputClass}
          {...aria("name")}
        />
      </FieldShell>

      <FieldShell id="organisation" label="Organisation" error={errors.organisation}>
        <input
          id="organisation"
          name="organisation"
          type="text"
          autoComplete="organization"
          maxLength={LIMITS.organisation}
          className={inputClass}
          {...aria("organisation")}
        />
      </FieldShell>

      <FieldShell id="role" label="Role" optional error={errors.role}>
        <input
          id="role"
          name="role"
          type="text"
          autoComplete="organization-title"
          maxLength={LIMITS.role}
          className={inputClass}
          {...aria("role")}
        />
      </FieldShell>

      <FieldShell id="email" label="Email address" error={errors.email}>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          maxLength={LIMITS.email}
          className={inputClass}
          {...aria("email")}
        />
      </FieldShell>

      <FieldShell id="topic" label="Topic" error={errors.topic}>
        <select
          id="topic"
          name="topic"
          defaultValue=""
          className={inputClass}
          {...aria("topic")}
        >
          <option value="" disabled>
            Choose a topic
          </option>
          {TOPICS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </FieldShell>

      <FieldShell id="message" label="Message" error={errors.message}>
        <textarea
          id="message"
          name="message"
          rows={6}
          maxLength={LIMITS.messageMax}
          className={inputClass}
          {...aria("message")}
        />
      </FieldShell>

      {/* Honeypot: hidden from people, but bots fill it in. */}
      <div aria-hidden="true" className="absolute left-[-9999px]">
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <div className="flex items-start gap-3">
          <input
            id="consent"
            name="consent"
            type="checkbox"
            className="mt-1 h-4 w-4"
            {...aria("consent")}
          />
          <label htmlFor="consent" className="text-sm leading-relaxed text-muted">
            I agree that Methods Consultancy may use these details to reply to
            my enquiry, as described in the{" "}
            <Link
              href="/legal/privacy"
              className="font-semibold text-accent underline"
            >
              privacy notice
            </Link>
            .
          </label>
        </div>
        {errors.consent && (
          <p id="consent-error" className="mt-2 text-sm font-medium text-accent">
            {errors.consent}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="bg-brand-red px-6 py-3 font-semibold text-white disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
      >
        {status === "sending" ? "Sending..." : "Send message"}
      </button>
    </form>
  );
}
