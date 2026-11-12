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
    <main>
      <PageHeader
        eyebrow="Sectors"
        title="Who we work with."
        summary="Central banks and regulators, banks and other financial institutions, and public-sector organisations across Africa."
      />

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-8 py-24">
          <ul className="divide-y divide-brand-grey border-y border-brand-grey">
            {sectors.map((sector) => (
              <li
                key={sector.slug}
                className="grid gap-4 py-12 md:grid-cols-[1fr_2fr]"
              >
                <h2 className="font-display text-3xl font-semibold text-brand-ink">
                  {sector.title}
                </h2>
                <p className="leading-relaxed text-brand-mid-grey">
                  {sector.summary}
                </p>
              </li>
            ))}
          </ul>
          <p className="mt-12 max-w-2xl leading-relaxed text-brand-mid-grey">
            We also support development partners and prime contractors who need
            specialist enterprise architecture subconsultants.
          </p>
          <p className="mt-6 text-sm italic text-brand-mid-grey">
            Working copy, pending confirmation.
          </p>
        </div>
      </section>

      <CtaBand heading="Tell us about your institution" label="Start a conversation" />
    </main>
  );
}
