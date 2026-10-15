import { featuredEngagement } from "./data/engagements";
import Link from "next/link";
import ServiceCard from "./components/ServiceCard";
import { services } from "./data/services";
import { sectors } from "./data/sectors";

export default function Home() {
  return (
    <main>
      {/* Hero */}
      <section className="px-8 py-20 bg-brand-grey text-center">
        <h1 className="text-4xl font-bold text-brand-ink max-w-3xl mx-auto">
          Architecture that governs.
        </h1>
        <p className="text-brand-mid-grey mt-4 max-w-xl mx-auto">
          We establish enterprise architecture inside central banks, regulators,
          and financial institutions — frameworks, boards, and artefacts that
          hold up under scrutiny.
        </p>
        <div className="mt-8 flex gap-4 justify-center">
          <Link
            href="/contact"
            className="bg-brand-red text-white px-6 py-3 rounded font-medium"
          >
            Book a consultation
          </Link>
          <Link
            href="/services"
            className="border border-brand-ink text-brand-ink px-6 py-3 rounded font-medium"
          >
            Explore services
          </Link>
        </div>
      </section>

      {/* Proof band */}
      <section className="px-8 py-10 bg-white border-b border-brand-grey">
        <p className="text-center text-sm text-brand-mid-grey uppercase tracking-wide">
          Working to TOGAF 10 · BCBS 239 · ISO 20022 · CPMI-PFMI
        </p>
      </section>

      {/* Services overview */}
      <section className="px-8 py-16 bg-white">
        <h2 className="text-2xl font-bold text-brand-ink mb-8 text-center">
          Our Services
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </section>

      {/* Sectors strip */}
      <section className="px-8 py-16 bg-brand-grey">
        <h2 className="text-2xl font-bold text-brand-ink mb-8 text-center">
          Who We Work With
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {sectors.map((sector) => (
            <div key={sector.slug} className="bg-white rounded p-6">
              <h3 className="font-semibold text-brand-ink mb-2">{sector.title}</h3>
              <p className="text-sm text-brand-mid-grey">{sector.summary}</p>
            </div>
          ))}
        </div>
      </section>
      {/* Featured engagement */}
      <section className="px-8 py-16 bg-white">
        <h2 className="text-2xl font-bold text-brand-ink mb-8 text-center">
          Featured Engagement
        </h2>
        <div className="max-w-3xl mx-auto border border-brand-grey rounded p-8">
          <p className="text-sm font-medium text-brand-red-dark uppercase tracking-wide">
            {featuredEngagement.sector}
          </p>
          <h3 className="text-xl font-semibold text-brand-ink mt-1">
            {featuredEngagement.client ?? featuredEngagement.anonymisedLabel}
          </h3>
          <dl className="mt-4 space-y-3 text-sm">
            <div>
              <dt className="font-semibold text-brand-ink">Mandate</dt>
              <dd className="text-brand-mid-grey">{featuredEngagement.mandate}</dd>
            </div>
            <div>
              <dt className="font-semibold text-brand-ink">What we did</dt>
              <dd className="text-brand-mid-grey">{featuredEngagement.whatWeDid}</dd>
            </div>
            <div>
              <dt className="font-semibold text-brand-ink">What changed</dt>
              <dd className="text-brand-mid-grey">{featuredEngagement.whatChanged}</dd>
            </div>
          </dl>
        </div>
      </section>
      {/* Closing CTA */}
      <section className="px-8 py-16 bg-brand-ink text-center">
        <h2 className="text-2xl font-bold text-white max-w-2xl mx-auto">
          Ready to make architecture govern?
        </h2>
        <p className="text-brand-grey mt-3 max-w-xl mx-auto">
          Book a 30-minute discovery conversation with our team.
        </p>
        <Link
          href="/contact"
          className="inline-block mt-8 bg-brand-red text-white px-6 py-3 rounded font-medium"
        >
          Book a consultation
        </Link>
      </section>
    </main>
  );
}
