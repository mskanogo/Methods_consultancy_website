import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-brand-grey">
      <section className="max-w-4xl mx-auto text-center py-32 px-6">
        <h1 className="text-brand-ink text-5xl font-bold leading-tight">
          Architecture that governs.
        </h1>
        <p className="text-brand-mid-grey text-lg mt-6 max-w-2xl mx-auto">
          We establish enterprise architecture inside central banks, regulators,
          and financial institutions — frameworks, boards, and artefacts that
          hold up under scrutiny.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
          <Link
            href="/contact"
            className="bg-brand-red text-white px-6 py-3 rounded font-semibold hover:bg-brand-red-dark transition-colors"
          >
            Book a consultation
          </Link>
          <Link
            href="/services"
            className="border border-brand-ink text-brand-ink px-6 py-3 rounded font-semibold hover:bg-white transition-colors"
          >
            Explore services
          </Link>
        </div>
      </section>
    </main>
  );
}
