import Link from "next/link";
import Hero from "./components/Hero";
import ServiceCard from "./components/ServiceCard";
import SectionHeading from "./components/SectionHeading";
import { services } from "./data/services";
import { sectors } from "./data/sectors";
import { featuredEngagement } from "./data/engagements";
import CtaBand from "./components/CtaBand";

const standards = ["TOGAF 10", "BCBS 239", "ISO 20022", "CPMI-PFMI"];

export default function Home() {
  return (
    <main id="main">
      <Hero />

      {/* Standards */}
      <section className="border-b border-line bg-surface px-8 py-8">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 text-center">
          <p className="text-sm text-muted">
            We work to these standards, and to national data-protection and
            cybersecurity frameworks.
          </p>
          <ul className="flex flex-wrap justify-center gap-3">
            {standards.map((standard) => (
              <li
                key={standard}
                className="rounded-full border border-line bg-alt px-4 py-1.5 text-sm font-semibold text-ink"
              >
                {standard}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Intro */}
      <section className="bg-surface">
        <div className="mx-auto grid max-w-6xl gap-10 px-8 py-24 md:grid-cols-[1fr_2fr]">
          <p className="max-w-xs text-sm leading-relaxed text-muted">
            An independent firm in Nairobi, working with financial institutions,
            regulators, and public-sector organisations across Africa since 2009.
          </p>
          <div>
            <h2 className="font-display text-4xl font-semibold leading-tight text-ink md:text-5xl">
              We turn enterprise architecture from a document into a working
              institution.
            </h2>
            <p className="mt-6 max-w-2xl leading-relaxed text-muted">
              We design the governance bodies, write the frameworks and
              policies, run the baseline discovery, produce the artefacts, and
              review vendor solutions for conformance. Clients are left with a
              functioning, standards-aligned architecture practice.
            </p>
            <Link href="/about" className="btn-secondary mt-8">
              About the firm <span aria-hidden="true" className="ml-2">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-surface pb-24">
        <div className="mx-auto max-w-6xl px-8">
          <SectionHeading
            eyebrow="Services"
            title="Ten services, one working discipline"
          />
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {services.map((service, i) => (
              <ServiceCard key={service.slug} service={service} index={i} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href="/services" className="btn-primary">
              View all services
            </Link>
          </div>
        </div>
      </section>

      {/* Sectors */}
      <section className="bg-alt">
        <div className="mx-auto max-w-6xl px-8 py-24">
          <SectionHeading eyebrow="Sectors" title="Who we work with" />
          <ul className="mt-12 grid gap-6 md:grid-cols-3">
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
                <h3 className="font-display text-2xl font-semibold text-ink">
                  {sector.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {sector.summary}
                </p>
              </li>
            ))}
          </ul>
          <div className="mt-12 text-center">
            <Link href="/sectors" className="btn-primary">
              View sectors
            </Link>
          </div>
        </div>
      </section>

      {/* Featured engagement */}
      <section className="bg-surface">
        <div className="mx-auto max-w-6xl px-8 py-24">
          <SectionHeading eyebrow="Experience" title="Featured engagement" />
          <div className="mt-12 rounded-3xl border border-line bg-surface p-8 shadow-lg md:p-12">
            <span className="pill">{featuredEngagement.sector}</span>
            <h3 className="mt-4 font-display text-3xl font-semibold text-ink">
              {featuredEngagement.client ?? featuredEngagement.anonymisedLabel}
            </h3>
            <dl className="mt-8 grid gap-8 text-sm md:grid-cols-3">
              <div>
                <dt className="font-semibold text-ink">Mandate</dt>
                <dd className="mt-2 leading-relaxed text-muted">
                  {featuredEngagement.mandate}
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-ink">What we did</dt>
                <dd className="mt-2 leading-relaxed text-muted">
                  {featuredEngagement.whatWeDid}
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-ink">What changed</dt>
                <dd className="mt-2 leading-relaxed text-muted">
                  {featuredEngagement.whatChanged}
                </dd>
              </div>
            </dl>
            <Link href="/experience" className="btn-secondary mt-10">
              See our experience <span aria-hidden="true" className="ml-2">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Closing call to action */}
      <CtaBand />
    </main>
  );
}
