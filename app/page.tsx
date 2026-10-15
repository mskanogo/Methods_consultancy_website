import Link from "next/link";
import ServiceCard from "./components/ServiceCard";
import { services } from "./data/services";

export default function Home() {
  return (
    <>
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
      <main className="px-8 py-16 bg-white">
        <h2 className="text-2xl font-bold text-brand-ink mb-8 text-center">
          Our Services
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </main>
    </>
  );
}
