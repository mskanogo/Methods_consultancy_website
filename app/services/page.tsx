import type { Metadata } from "next";
import PageHeader from "../components/PageHeader";
import ServiceCard from "../components/ServiceCard";
import CtaBand from "../components/CtaBand";
import { services } from "../data/services";

export const metadata: Metadata = {
  title: "Services | Methods Consultancy",
  description:
    "Ten enterprise architecture and technology governance services for central banks, regulators, financial institutions, and the public sector.",
};

export default function ServicesPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Services"
        title="Enterprise architecture that actually governs."
        summary="From the first framework to a working architecture practice: ten services that take an organisation from strategy papers to decisions that stick."
      />

      <section className="bg-white py-24">
        <div className="mx-auto max-w-6xl px-8">
          <div className="grid grid-cols-1 gap-px border border-brand-grey bg-brand-grey sm:grid-cols-2">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>

      <CtaBand heading="Not sure which service fits?" label="Talk to us" />
    </main>
  );
}
