import type { Metadata } from "next";
import PageHeader from "../components/PageHeader";
import ContactForm from "../components/ContactForm";
import { BOOKING_URL } from "../lib/contact";

export const metadata: Metadata = {
  title: "Contact | Methods Consultancy",
  description:
    "Book a 30-minute discovery call with Methods Consultancy, or send the team a message.",
};

export default function ContactPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Contact"
        title="Start a conversation."
        summary="Book a 30-minute discovery call, or send the team a message."
      />

      <section className="bg-surface">
        <div className="mx-auto grid max-w-6xl gap-16 px-8 py-24 md:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl font-semibold text-ink">
              Book a discovery call
            </h2>
            <p className="mt-4 leading-relaxed text-muted">
              A 30-minute conversation with the team.
            </p>
            {BOOKING_URL ? (
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-block bg-brand-red px-6 py-3 font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
              >
                Book a call
              </a>
            ) : (
              <p className="mt-8 border border-line bg-alt/50 p-6 text-sm leading-relaxed text-muted">
                Online booking is being set up. In the meantime, please send us
                a message.
              </p>
            )}
          </div>

          <div>
            <h2 className="font-display text-3xl font-semibold text-ink">
              Send a message
            </h2>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
