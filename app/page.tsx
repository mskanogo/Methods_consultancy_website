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
          <button className="bg-brand-red text-white px-6 py-3 rounded font-medium">
            Book a consultation
          </button>
          <button className="border border-brand-ink text-brand-ink px-6 py-3 rounded font-medium">
            Explore services
          </button>
        </div>
      </section>

      {/* Proof band — standards/frameworks, text only per brief */}
      <section className="px-8 py-10 bg-white border-b border-brand-grey">
        <p className="text-center text-sm text-brand-mid-grey uppercase tracking-wide">
          Working to TOGAF 10 · BCBS 239 · ISO 20022 · CPMI-PFMI
        </p>
      </section>

      {/* Services overview placeholder */}
      <main className="px-8 py-16 bg-white">
        <h2 className="text-2xl font-bold text-brand-ink mb-8 text-center">
          Our Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            "Enterprise Architecture Establishment",
            "Architecture Governance Design",
            "Baseline Discovery & Assessment",
          ].map((service) => (
            <div
              key={service}
              className="border border-brand-grey rounded p-6 text-brand-ink"
            >
              <h3 className="font-semibold mb-2">{service}</h3>
              <p className="text-sm text-brand-mid-grey">
                Placeholder description — final copy pending content load.
              </p>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
