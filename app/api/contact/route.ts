import { NextResponse } from "next/server";
import { DELIVERY_CONNECTED, validateContact } from "../../lib/contact";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const input = (
    typeof body === "object" && body !== null ? body : {}
  ) as Record<string, unknown>;

  // Honeypot: real visitors never see this hidden field, but bots fill it in.
  // We pretend it worked so the bot gets no signal, and we do nothing.
  if (typeof input.website === "string" && input.website.trim() !== "") {
    return NextResponse.json({ ok: true, delivered: DELIVERY_CONNECTED });
  }

  // Checked again here because browser checks can be skipped.
  const { values, errors } = validateContact(input);
  if (!values) {
    return NextResponse.json({ ok: false, errors }, { status: 400 });
  }

  // Next step (needs mailbox addresses and an email provider from Stanley):
  // route the enquiry by topic and send it. Nothing is stored or logged here,
  // because the message contains personal data.
  return NextResponse.json({ ok: true, delivered: DELIVERY_CONNECTED });
}
