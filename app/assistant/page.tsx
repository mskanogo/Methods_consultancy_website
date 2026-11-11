import type { Metadata } from "next";
import PageHeader from "../components/PageHeader";
import AssistantChat from "../components/AssistantChat";
import { services } from "../data/services";

export const metadata: Metadata = {
  title: "Assistant | Methods Consultancy",
  description:
    "Ask questions about Methods Consultancy's services, methods, and how to start a conversation.",
};

type Props = { searchParams: Promise<{ topic?: string | string[] }> };

export default async function AssistantPage({ searchParams }: Props) {
  const { topic } = await searchParams;
  const slug = Array.isArray(topic) ? topic[0] : topic;
  // Only accept a topic that matches one of our own services.
  const service = services.find((s) => s.slug === slug);

  return (
    <main>
      <PageHeader
        eyebrow="Assistant"
        title="Ask us anything about Methods Consultancy."
        summary="Questions about our services, methods, and ways of working are answered from approved information. For anything else, we'll point you to the team."
      />
      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-8 py-16">
          <AssistantChat topic={service?.slug} topicTitle={service?.title} />
        </div>
      </section>
    </main>
  );
}
