import Link from "next/link";
import { figures } from "../data/figures";

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-tint via-surface to-surface">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-8 py-16 md:grid-cols-2 md:py-24">
        <div className="hero-rise">
          <span className="pill">
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-brand-red" />
            Enterprise architecture and technology governance
          </span>
          <h1 className="mt-6 font-display text-5xl font-semibold leading-[1.05] text-ink md:text-6xl">
            Architecture that <span className="text-accent">governs.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            We establish enterprise architecture inside central banks,
            regulators, and financial institutions: frameworks, boards, and
            artefacts that hold up under scrutiny.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/contact" className="btn-primary">
              Book a consultation
            </Link>
            <Link href="/services" className="btn-secondary">
              Explore services
            </Link>
          </div>

          <dl className="mt-12 flex flex-wrap gap-x-10 gap-y-4">
            {figures.map((figure) => (
              <div key={figure.label}>
                <dd className="font-display text-3xl font-semibold text-ink">
                  {figure.value}
                </dd>
                <dt className="text-sm text-muted">{figure.label}</dt>
              </div>
            ))}
          </dl>
        </div>

        {/* Visual card: network geometry, a nod to architecture diagrams */}
        <div
          aria-hidden="true"
          className="relative mx-auto hidden aspect-[5/4] w-full max-w-md overflow-hidden rounded-3xl border border-line bg-panel shadow-2xl md:block"
        >
          <div
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage:
                "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
          <svg viewBox="400 90 380 460" className="absolute inset-0 h-full w-full">
            <g stroke="#F50B14" strokeOpacity="0.7" strokeWidth="1.5">
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
              <circle cx="640" cy="200" r="7" />
              <circle cx="600" cy="330" r="7" />
              <circle cx="540" cy="470" r="6" />
              <circle cx="430" cy="300" r="6" />
            </g>
            <g fill="#fff" fillOpacity="0.8">
              <circle cx="520" cy="120" r="4" />
              <circle cx="720" cy="120" r="4" />
              <circle cx="740" cy="360" r="4" />
              <circle cx="680" cy="520" r="4" />
            </g>
          </svg>
          <div className="absolute bottom-5 left-5 rounded-2xl bg-surface px-4 py-3 shadow-lg">
            <p className="text-xs text-muted">Independent firm, Nairobi</p>
            <p className="font-display text-lg font-semibold text-ink">
              Working across Africa since 2009
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
