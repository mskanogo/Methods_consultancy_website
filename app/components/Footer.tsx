import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-brand-ink text-white mt-16">
      <div className="max-w-6xl mx-auto p-8 flex flex-col md:flex-row justify-between gap-6">
        <div>
          <p className="font-bold text-lg">Methods Consultancy</p>
          <p className="text-sm text-brand-grey mt-1">
            Nairobi, Kenya
          </p>
        </div>
        <div className="flex gap-6 text-sm">
          <Link href="/legal/privacy">Privacy</Link>
          <Link href="/legal/terms">Terms</Link>
          <Link href="/legal/cookies">Cookies</Link>
        </div>
      </div>
    </footer>
  );
}
