type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  summary: string;
};

export default function PageHeader({ eyebrow, title, summary }: PageHeaderProps) {
  return (
    <section className="border-b border-line bg-gradient-to-br from-tint via-surface to-surface">
      <div className="mx-auto max-w-6xl px-8 py-16 md:py-20">
        {eyebrow && <span className="pill">{eyebrow}</span>}
        <h1 className="mt-5 max-w-3xl font-display text-4xl font-semibold leading-tight text-ink md:text-6xl">
          {title}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
          {summary}
        </p>
      </div>
    </section>
  );
}
