import Link from "next/link";
import type { Service } from "../data/services";

type ServiceCardProps = {
  service: Service;
  index?: number;
};

export default function ServiceCard({ service, index }: ServiceCardProps) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group flex h-full flex-col rounded-2xl border border-line bg-surface p-7 shadow-sm transition hover:shadow-lg motion-safe:hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      {index !== undefined && (
        <span
          aria-hidden="true"
          className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-tint text-sm font-bold text-accent"
        >
          {String(index + 1).padStart(2, "0")}
        </span>
      )}
      <h3 className="font-display text-xl font-semibold text-ink">
        {service.title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        {service.summary}
      </p>
      <span className="mt-auto pt-6 text-sm font-semibold text-accent group-hover:underline">
        Learn more <span aria-hidden="true">→</span>
      </span>
    </Link>
  );
}
