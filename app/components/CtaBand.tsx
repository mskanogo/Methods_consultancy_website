import Link from "next/link";

type CtaBandProps = {
  heading?: string;
  label?: string;
  href?: string;
};

export default function CtaBand({
  heading = "Ready to make architecture govern?",
  label = "Book a consultation",
  href = "/contact",
}: CtaBandProps) {
  return (
    <section className="bg-brand-red">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-8 py-20 md:flex-row md:items-center md:justify-between">
        <h2 className="max-w-2xl font-display text-4xl font-semibold text-white md:text-5xl">
          {heading}
        </h2>
        <Link
          href={href}
          className="shrink-0 bg-white px-6 py-3 font-semibold text-brand-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-ink"
        >
          {label}
        </Link>
      </div>
    </section>
  );
}
