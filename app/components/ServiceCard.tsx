import Link from "next/link";
import type { Service } from "../data/services";

export default function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group block bg-surface p-8 hover:bg-alt/50 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent"
    >
      <h3 className="font-display text-xl font-semibold text-ink">
        {service.title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        {service.summary}
      </p>
      <span className="mt-6 inline-block text-sm font-semibold text-accent group-hover:underline">
        Learn more
      </span>
    </Link>
  );
}
