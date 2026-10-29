import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHeader from "../../components/PageHeader";
import ServiceCard from "../../components/ServiceCard";
import CtaBand from "../../components/CtaBand";
import { services } from "../../data/services";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title: `${service.title} | Methods Consultancy`,
    description: service.summary,
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const index = services.findIndex((s) => s.slug === slug);
  if (index === -1) notFound();

  const service = services[index];
  const related = [1, 2, 3].map((n) => services[(index + n) % services.length]);

  return (
    <main>
      <PageHeader
        eyebrow="Service"
        title={service.title}
        summary={service.summary}
      />

      {/* Intro */}
      <section className="bg-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-8 py-24 md:grid-cols-[1fr_2fr]">
          <h2 className="font-display text-4xl font-semibold text-brand-ink">
            What it is
          </h2>
          <div>
            <p className="text-lg leading-relaxed text-brand-mid-grey">
              {service.intro}
            </p>
            <Link
              href={`/assistant?topic=${service.slug}`}
              className="mt-8 inline-block font-semibold text-brand-red-dark underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red-dark"
            >
              Ask our assistant about this service
            </Link>
          </div>
        </div>
      </section>

      {/* What we deliver */}
      <section className="bg-brand-grey">
        <div className="mx-auto max-w-6xl px-8 py-24">
          <h2 className="font-display text-4xl font-semibold text-brand-ink">
            What we deliver
          </h2>
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {service.deliverables.map((item) => (
              <li key={item} className="border border-brand-grey bg-white p-6">
                <div aria-hidden="true" className="mb-5 space-y-2">
                  <div className="h-1.5 w-1/3 bg-brand-red" />
                  <div className="h-1 w-full bg-brand-grey" />
                  <div className="h-1 w-5/6 bg-brand-grey" />
                  <div className="h-1 w-2/3 bg-brand-grey" />
                </div>
                <p className="font-display text-lg font-semibold text-brand-ink">
                  {item}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* How we work */}
      <section className="bg-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-8 py-24 md:grid-cols-[1fr_2fr]">
          <h2 className="font-display text-4xl font-semibold text-brand-ink">
            How we work
          </h2>
          <p className="leading-relaxed text-brand-mid-grey">
            Method summary to be supplied. Where relevant, this section will be
            anchored to the TOGAF ADM.
            <span className="mt-4 block text-sm italic">
              Working copy, pending confirmation.
            </span>
          </p>
        </div>
      </section>

      {/* Related services */}
      <section className="bg-white pb-24">
        <div className="mx-auto max-w-6xl px-8">
          <h2 className="font-display text-4xl font-semibold text-brand-ink">
            Related services
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-px border border-brand-grey bg-brand-grey sm:grid-cols-3">
            {related.map((item) => (
              <ServiceCard key={item.slug} service={item} />
            ))}
          </div>
        </div>
      </section>

      <CtaBand heading={`Talk to us about ${service.title.toLowerCase()}`} />
    </main>
  );
}
