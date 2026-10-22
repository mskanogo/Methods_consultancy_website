import Link from "next/link";
import Hero from "./components/Hero";
import ServiceCard from "./components/ServiceCard";
import { services } from "./data/services";
import { sectors } from "./data/sectors";
import { featuredEngagement } from "./data/engagements";
import CtaBand from "./components/CtaBand";

// Facts taken from the brief (Section 2.1 and Section 3)
const figures = [
  { label: "Established", value: "2009" },
  { label: "Service lines", value: "10" },
  { label: "Sectors served", value: "3" },
];

export default function Home() {
  return (
    <main>
      <Hero />

      {/* Standards */}
      <section className="border-b border-brand-grey bg-white px-8 py-8">
        <p className="mx-auto max-w-4xl text-center text-sm text-brand-mid-grey">
          We work to TOGAF 10, BCBS 239, ISO 20022, CPMI-PFMI, and national
          data-protection and cybersecurity frameworks.
        </p>
      </section>

      {/* Intro */}
      <section className="bg-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-8 py-24 md:grid-cols-[1fr_2fr]">
          <p className="max-w-xs text-sm leading-relaxed text-brand-mid-grey">
            An independent firm in Nairobi, working with financial institutions,
            regulators, and public-sector organisations across Africa since 2009.
          </p>
          <div>
            <h2 className="font-display text-4xl font-semibold leading-tight text-brand-ink md:text-5xl">
              We turn enterprise architecture from a document into a working
              institution.
            </h2>
            <p className="mt-6 max-w-2xl leading-relaxed text-brand-mid-grey">
              We design the governance bodies, write the frameworks and
              policies, run the baseline discovery, produce the artefacts, and
              review vendor solutions for conformance. Clients are left with a
              functioning, standards-aligned architecture practice.
            </p>
            <Link
              href="/about"
              className="mt-8 inline-block font-semibold text-brand-red-dark underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red-dark"
            >
              About the firm
            </Link>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-white pb-24">
        <div className="mx-auto max-w-6xl px-8">
          <h2 className="font-display text-4xl font-semibold text-brand-ink md:text-5xl">
            Ten services, one working discipline
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-px border border-brand-grey bg-brand-grey sm:grid-cols-2">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* Sectors */}
      <section className="bg-brand-ink text-white">
        <div className="mx-auto grid max-w-6xl gap-12 px-8 py-24 md:grid-cols-[1fr_2fr]">
          <div>
            <h2 className="font-display text-4xl font-semibold">
              Who we work with
            </h2>
            <Link
              href="/sectors"
              className="mt-8 inline-block bg-white px-6 py-3 font-medium text-brand-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              View sectors
            </Link>
          </div>
          <ul className="divide-y divide-white/15 border-y border-white/15">
            {sectors.map((sector) => (
              <li key={sector.slug} className="py-8">
                <h3 className="font-display text-2xl font-semibold">
                  {sector.title}
                </h3>
                <p className="mt-2 max-w-lg text-sm leading-relaxed text-brand-grey">
                  {sector.summary}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Featured engagement */}
      <section className="bg-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-8 py-24 md:grid-cols-[1fr_2fr]">
          <div>
            <h2 className="font-display text-4xl font-semibold text-brand-ink">
              Featured engagement
            </h2>
            <Link
              href="/experience"
              className="mt-6 inline-block font-semibold text-brand-red-dark underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red-dark"
            >
              See our experience
            </Link>
          </div>
          <div className="border-t-2 border-brand-ink pt-6">
            <p className="text-sm font-semibold text-brand-red-dark">
              {featuredEngagement.sector}
            </p>
            <h3 className="mt-1 font-display text-2xl font-semibold text-brand-ink">
              {featuredEngagement.client ?? featuredEngagement.anonymisedLabel}
            </h3>
            <dl className="mt-6 space-y-5 text-sm">
              <div>
                <dt className="font-semibold text-brand-ink">Mandate</dt>
                <dd className="mt-1 leading-relaxed text-brand-mid-grey">
                  {featuredEngagement.mandate}
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-brand-ink">What we did</dt>
                <dd className="mt-1 leading-relaxed text-brand-mid-grey">
                  {featuredEngagement.whatWeDid}
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-brand-ink">What changed</dt>
                <dd className="mt-1 leading-relaxed text-brand-mid-grey">
                  {featuredEngagement.whatChanged}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* Figures */}
      <section className="bg-brand-grey">
        <div className="mx-auto grid max-w-6xl gap-10 px-8 py-24 md:grid-cols-[1fr_2fr]">
          <h2 className="font-display text-4xl font-semibold text-brand-ink">
            The practice in figures
          </h2>
          <dl className="divide-y divide-brand-ink/15 border-y border-brand-ink/15">
            {figures.map((figure) => (
              <div
                key={figure.label}
                className="flex items-baseline justify-between py-6"
              >
                <dt className="text-sm text-brand-mid-grey">{figure.label}</dt>
                <dd className="font-display text-5xl font-semibold text-brand-ink">
                  {figure.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Closing call to action */}
      <CtaBand />
    </main>
  );
}
