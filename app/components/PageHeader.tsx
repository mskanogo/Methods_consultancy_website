type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  summary: string;
};

export default function PageHeader({ eyebrow, title, summary }: PageHeaderProps) {
  return (
    <section className="bg-brand-ink text-white">
      <div className="mx-auto max-w-6xl px-8 py-20 md:py-24">
        <div className="h-px w-16 bg-brand-red" />
        {eyebrow && (
          <p className="mt-8 text-sm font-semibold uppercase tracking-wide text-brand-grey">
            {eyebrow}
          </p>
        )}
        <h1 className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-tight md:text-6xl">
          {title}
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-brand-grey">{summary}</p>
      </div>
    </section>
  );
}
