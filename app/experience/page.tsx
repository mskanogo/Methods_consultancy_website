import type { Metadata } from "next";
import PageHeader from "../components/PageHeader";
import CtaBand from "../components/CtaBand";
import { featuredEngagement } from "../data/engagements";

export const metadata: Metadata = {
  title: "Experience | Methods Consultancy",
  description:
    "Selected enterprise architecture engagements. Client engagements are confidential and clients are named only with their written consent.",
};

// Add more entries here as case studies are approved.
const engagements = [featuredEngagement];

export default function ExperiencePage() {
  return (
    <main>
      <PageHeader
        eyebrow="Experience"
        title="Work that holds up under scrutiny."
        summary="Client engagements are confidential, so we name clients only with their written consent."
      />

      <section className="bg-surface">
        <div className="mx-auto max-w-6xl px-8 py-24">
          <ul className="grid gap-12 md:grid-cols-2">
            {engagements.map((engagement) => (
              <li key={engagement.slug} className="border-t-2 border-ink pt-6">
                <p className="text-sm font-semibold text-accent">
                  {engagement.sector}
                </p>
                <h2 className="mt-1 font-display text-2xl font-semibold text-ink">
                  {engagement.client ?? engagement.anonymisedLabel}
                </h2>
                <dl className="mt-6 space-y-5 text-sm">
                  <div>
                    <dt className="font-semibold text-ink">Mandate</dt>
                    <dd className="mt-1 leading-relaxed text-muted">
                      {engagement.mandate}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-ink">What we did</dt>
                    <dd className="mt-1 leading-relaxed text-muted">
                      {engagement.whatWeDid}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-ink">What changed</dt>
                    <dd className="mt-1 leading-relaxed text-muted">
                      {engagement.whatChanged}
                    </dd>
                  </div>
                </dl>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand />
    </main>
  );
}
