import Link from "next/link";
import type { Service } from "../data/services";

export default function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="block border border-brand-grey rounded p-6 bg-white hover:border-brand-red transition-colors focus-visible:outline-2 focus-visible:outline-brand-red"
    >
      <h3 className="font-semibold text-brand-ink mb-2">{service.title}</h3>
      <p className="text-sm text-brand-mid-grey mb-4">{service.summary}</p>
      <span className="text-sm font-medium text-brand-red-dark">Learn more →</span>
    </Link>
  );
}
