import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white border-b border-brand-grey">
      <nav className="max-w-6xl mx-auto flex items-center justify-between p-4">
        <Link href="/" className="text-brand-red font-bold text-xl">
          Methods Consultancy
        </Link>
        <div className="flex gap-6 text-brand-ink text-sm">
          <Link href="/about">About</Link>
          <Link href="/services">Services</Link>
          <Link href="/sectors">Sectors</Link>
          <Link href="/experience">Experience</Link>
          <Link href="/contact">Contact</Link>
        </div>
      </nav>
    </header>
  );
}
