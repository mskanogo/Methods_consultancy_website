import PageHeader from "./PageHeader";

type LegalPageProps = {
  title: string;
  summary: string;
  covers?: string[];
};

export default function LegalPage({ title, summary, covers }: LegalPageProps) {
  return (
    <main>
      <PageHeader eyebrow="Legal" title={title} summary={summary} />
      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-8 py-24">
          <p className="leading-relaxed text-brand-mid-grey">
            The full text of this page is being prepared by Methods Consultancy
            and will be published after legal review.
          </p>
          {covers && covers.length > 0 && (
            <>
              <h2 className="mt-12 font-display text-2xl font-semibold text-brand-ink">
                It will cover
              </h2>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-brand-mid-grey">
                {covers.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
