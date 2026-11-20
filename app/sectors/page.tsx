import type { Metadata } from "next";
import PageHeader from "../components/PageHeader";
import CtaBand from "../components/CtaBand";
import { sectors } from "../data/sectors";

export const metadata: Metadata = {
  title: "Sectors | Methods Consultancy",
  description:
    "Enterprise architecture and technology governance for central banks and regulators, financial institutions, and the public sector.",
};

export default function SectorsPage() {
  return (
    <main id="main">
      <PageHeader
        eyebrow="Sectors"
        title="Who we work with."
        summary="Central banks and regulators, banks and other financial institutions, and public-sector organisations across Africa."
      />

      <section className="bg-surface">
        <div className="mx-auto max-w-6xl px-8 py-24">
          <ul className="grid gap-6 md:grid-cols-3">
            {sectors.map((sector, i) => (
              <li
                key={sector.slug}
                className="rounded-2xl border border-line bg-surface p-8 shadow-sm"
              >
                <span
                  aria-hidden="true"
                  className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-tint text-sm font-bold text-accent"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="font-display text-2xl font-semibold text-ink">
                  {sector.title}
                </h2>
                <p className="mt-3 leading-relaxed text-muted">
                  {sector.summary}
                </p>
              </li>
            ))}
          </ul>
          <p className="mt-12 max-w-2xl leading-relaxed text-muted">
            We also support development partners and prime contractors who need
            specialist enterprise architecture subconsultants.
          </p>
          <p className="mt-6 text-sm italic text-muted">
            Working copy, pending confirmation.
          </p>
        </div>
      </section>

      <CtaBand heading="Tell us about your institution" label="Start a conversation" />
    </main>
  );
}
