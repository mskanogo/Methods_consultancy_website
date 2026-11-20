type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  summary?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  summary,
}: SectionHeadingProps) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <span className="pill">{eyebrow}</span>
      <h2 className="mt-5 font-display text-4xl font-semibold leading-tight text-ink md:text-5xl">
        {title}
      </h2>
      {summary && (
        <p className="mt-4 text-lg leading-relaxed text-muted">{summary}</p>
      )}
    </div>
  );
}
