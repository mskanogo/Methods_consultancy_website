import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-brand-ink text-white">
      {/* Grid, a nod to architecture diagrams */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "96px 96px",
        }}
      />

      {/* Network geometry */}
      <svg
        aria-hidden="true"
        viewBox="0 0 800 600"
        className="absolute right-0 top-0 -z-10 hidden h-full w-auto max-w-none opacity-60 md:block"
      >
        <g stroke="#F50B14" strokeOpacity="0.55" strokeWidth="1">
          <line x1="520" y1="120" x2="640" y2="200" />
          <line x1="640" y1="200" x2="720" y2="120" />
          <line x1="640" y1="200" x2="600" y2="330" />
          <line x1="600" y1="330" x2="740" y2="360" />
          <line x1="600" y1="330" x2="540" y2="470" />
          <line x1="540" y1="470" x2="680" y2="520" />
          <line x1="430" y1="300" x2="600" y2="330" />
          <line x1="430" y1="300" x2="520" y2="120" />
          <line x1="740" y1="360" x2="680" y2="520" />
        </g>
        <g fill="#F50B14">
          <circle cx="640" cy="200" r="5" />
          <circle cx="600" cy="330" r="5" />
          <circle cx="540" cy="470" r="4" />
          <circle cx="430" cy="300" r="4" />
        </g>
        <g fill="#fff" fillOpacity="0.7">
          <circle cx="520" cy="120" r="3" />
          <circle cx="720" cy="120" r="3" />
          <circle cx="740" cy="360" r="3" />
          <circle cx="680" cy="520" r="3" />
        </g>
      </svg>

      <div className="mx-auto flex min-h-[80svh] max-w-6xl flex-col justify-center px-8 py-24">
        <div className="hero-rule h-px w-16 bg-brand-red" />
        <div className="hero-rise">
          <h1 className="mt-8 max-w-3xl font-display text-5xl font-semibold leading-[1.05] md:text-7xl">
            Architecture that governs.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-brand-grey">
            We establish enterprise architecture inside central banks,
            regulators, and financial institutions: frameworks, boards, and
            artefacts that hold up under scrutiny.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="bg-brand-red px-6 py-3 font-medium text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Book a consultation
            </Link>
            <Link
              href="/services"
              className="border border-white/40 px-6 py-3 font-medium text-white hover:border-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Explore services
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
