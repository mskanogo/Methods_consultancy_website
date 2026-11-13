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
      <section className="bg-surface">
        <div className="mx-auto max-w-3xl px-8 py-24">
          <p className="leading-relaxed text-muted">
            The full text of this page is being prepared by Methods Consultancy
            and will be published after legal review.
          </p>
          {covers && covers.length > 0 && (
            <>
              <h2 className="mt-12 font-display text-2xl font-semibold text-ink">
                It will cover
              </h2>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-muted">
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
