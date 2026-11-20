import Link from "next/link";
import Image from "next/image";
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
              <div key={figure.label} className="flex flex-col-reverse">
                <dt className="text-sm text-muted">{figure.label}</dt>
                <dd className="font-display text-3xl font-semibold text-ink">
                  {figure.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Icon card: background and icon colour follow the light/dark theme */}
        <div className="mx-auto hidden aspect-square w-full max-w-sm items-center justify-center rounded-3xl border border-line bg-tint p-16 shadow-2xl md:flex">
          <Image
            src="/icon-color.svg"
            alt="Methods Consultancy"
            width={240}
            height={240}
            priority
            className="h-auto w-full dark:hidden"
          />
          <Image
            src="/icon-white.svg"
            alt=""
            width={240}
            height={240}
            priority
            className="hidden h-auto w-full dark:block"
          />
        </div>
      </div>
    </section>
  );
}
