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
    <section className="bg-surface px-8 py-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 rounded-3xl bg-brand-red px-8 py-14 md:flex-row md:items-center md:justify-between md:px-14">
        <h2 className="max-w-2xl font-display text-4xl font-semibold text-white md:text-5xl">
          {heading}
        </h2>
        <Link href={href} className="btn-light shrink-0">
          {label}
        </Link>
      </div>
    </section>
  );
}
