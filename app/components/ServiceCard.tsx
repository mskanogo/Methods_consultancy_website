import Link from "next/link";
import type { Service } from "../data/services";

export default function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group block bg-white p-8 hover:bg-brand-grey/50 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand-red-dark"
    >
      <h3 className="font-display text-xl font-semibold text-brand-ink">
        {service.title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-brand-mid-grey">
        {service.summary}
      </p>
      <span className="mt-6 inline-block text-sm font-semibold text-brand-red-dark group-hover:underline">
        Learn more
      </span>
    </Link>
  );
}
