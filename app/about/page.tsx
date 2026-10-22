import type { Metadata } from "next";
import PageHeader from "../components/PageHeader";
import CtaBand from "../components/CtaBand";

export const metadata: Metadata = {
  title: "About | Methods Consultancy",
  description:
    "An independent enterprise architecture and technology governance firm in Nairobi, working with financial institutions, regulators, and public-sector organisations across Africa.",
};

const values = [
  {
    title: "Precise and evidence-led",
    text: "We say what the evidence supports, and no more. Claims are backed by findings, not adjectives.",
  },
  {
    title: "Discreet by default",
    text: "Client engagements are confidential. We name clients only with their written consent.",
  },
  {
    title: "Built to outlast us",
    text: "We measure success by whether the discipline survives our exit.",
  },
];

const engagementModels = [
  {
    title: "Retained advisory",
    text: "Ongoing access to senior architecture guidance as your practice matures.",
  },
  {
    title: "Fixed-scope",
    text: "A defined deliverable, timeline, and price, such as a framework, a baseline, or a specification.",
  },
  {
    title: "Embedded consulting",
    text: "Our consultants work inside your teams to establish the practice alongside you.",
  },
];

const draftNote = "Working copy, pending confirmation.";

export default function AboutPage() {
  return (
    <main>
      <PageHeader
        eyebrow="About"
        title="An architecture firm for institutions that answer to regulators."
        summary="Methods Consultancy is an independent enterprise architecture and technology governance firm headquartered in Nairobi, Kenya."
      />

      {/* Firm story */}
      <section className="bg-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-8 py-24 md:grid-cols-[1fr_2fr]">
          <h2 className="font-display text-4xl font-semibold text-brand-ink">
            The firm
          </h2>
          <div className="space-y-6 leading-relaxed text-brand-mid-grey">
            <p>
              Established in 2009, we specialise in enterprise architecture,
              architecture governance, and technology strategy for financial
              institutions, regulators, and public-sector organisations in
              Africa.
            </p>
            <p>
              We do not stop at strategy papers. We design the governance
              bodies, write the frameworks and policies, run the baseline
              discovery, produce the architecture artefacts, specify the
              procurements, and review vendor solutions for conformance, so
              the client is left with a working architecture practice, not a
              binder.
            </p>
            <p>
              Our head office is in Nairobi, and our delivery footprint spans
              East Africa.
            </p>
            <p className="text-sm italic">{draftNote}</p>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="bg-brand-grey">
        <div className="mx-auto grid max-w-6xl gap-10 px-8 py-24 md:grid-cols-[1fr_2fr]">
          <h2 className="font-display text-4xl font-semibold text-brand-ink">
            Leadership
          </h2>
          <div className="flex flex-col gap-8 sm:flex-row">
            <div
              role="img"
              aria-label="Photo to be supplied"
              className="flex h-56 w-44 shrink-0 items-center justify-center bg-white text-center text-sm text-brand-mid-grey"
            >
              Photo to be supplied
            </div>
            <div>
              <h3 className="font-display text-2xl font-semibold text-brand-ink">
                Stanley Kibe Njonjo
              </h3>
              <p className="mt-1 text-sm font-semibold text-brand-red-dark">
                Lead Consultant and Director
              </p>
              <p className="mt-4 leading-relaxed text-brand-mid-grey">
                Biography to be supplied.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-8 py-24 md:grid-cols-[1fr_2fr]">
          <div>
            <h2 className="font-display text-4xl font-semibold text-brand-ink">
              How we work
            </h2>
            <p className="mt-4 text-sm italic text-brand-mid-grey">{draftNote}</p>
          </div>
          <ul className="divide-y divide-brand-grey border-y border-brand-grey">
            {values.map((value) => (
              <li key={value.title} className="py-8">
                <h3 className="font-display text-2xl font-semibold text-brand-ink">
                  {value.title}
                </h3>
                <p className="mt-2 max-w-lg text-sm leading-relaxed text-brand-mid-grey">
                  {value.text}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* How we engage */}
      <section className="bg-brand-ink text-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-8 py-24 md:grid-cols-[1fr_2fr]">
          <div>
            <h2 className="font-display text-4xl font-semibold">
              How we engage
            </h2>
            <p className="mt-4 text-sm italic text-brand-grey">{draftNote}</p>
          </div>
          <ul className="divide-y divide-white/15 border-y border-white/15">
            {engagementModels.map((model) => (
              <li key={model.title} className="py-8">
                <h3 className="font-display text-2xl font-semibold">
                  {model.title}
                </h3>
                <p className="mt-2 max-w-lg text-sm leading-relaxed text-brand-grey">
                  {model.text}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Standards */}
      <section className="bg-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-8 py-24 md:grid-cols-[1fr_2fr]">
          <h2 className="font-display text-4xl font-semibold text-brand-ink">
            Standards we work to
          </h2>
          <div className="leading-relaxed text-brand-mid-grey">
            <p>
              Our methods are anchored in TOGAF 10 for architecture method and
              content. For financial-sector clients we work to BCBS 239, ISO
              20022, and CPMI-PFMI, alongside national data-protection and
              cybersecurity frameworks.
            </p>
          </div>
        </div>
      </section>

      <CtaBand />
    </main>
  );
}
