import Link from "next/link";

export default function AssistantLauncher() {
  return (
    <Link
      href="/assistant"
      aria-label="Open the AI assistant"
      className="fixed bottom-6 right-6 z-50 bg-brand-red text-white px-5 py-3 rounded-full shadow-lg font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-ink"
    >
      Ask our AI assistant
    </Link>
  );
}
