"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AssistantLauncher() {
const pathname = usePathname();
    if (pathname === "/assistant") return null;
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
