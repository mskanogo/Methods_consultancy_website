import Link from "next/link";
import Image from "next/image";

const LOGO_ON_DARK = "/logo-white.svg";

const links = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/sectors", label: "Sectors" },
  { href: "/experience", label: "Experience" },
  { href: "/contact", label: "Contact" },
];

const focus =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-brand-ink text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-8 py-4">
        <Link href="/" aria-label="Methods Consultancy home" className={focus}>
          {LOGO_ON_DARK ? (
            <Image
              src={LOGO_ON_DARK}
              alt="Methods Consultancy"
              width={208}
              height={32}
              priority
              className="h-8 w-auto"
            />
          ) : (
            <span className="text-xl font-extrabold lowercase tracking-tight">
              methods <span className="text-brand-red">consultancy</span>
            </span>
          )}
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-8 text-sm md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`underline-offset-4 hover:underline ${focus}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/contact"
          className={`hidden bg-brand-red px-4 py-2 text-sm font-semibold text-white md:inline-block ${focus}`}
        >
          Book a consultation
        </Link>

        {/* Mobile menu */}
        <details className="relative md:hidden">
          <summary
            className={`cursor-pointer list-none border border-white/30 px-3 py-2 text-sm font-medium [&::-webkit-details-marker]:hidden ${focus}`}
          >
            Menu
          </summary>
          <div className="absolute right-0 mt-2 flex w-60 flex-col gap-4 border border-white/15 bg-brand-ink p-5">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className={focus}>
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className={`bg-brand-red px-4 py-2 text-center font-semibold ${focus}`}
            >
              Book a consultation
            </Link>
          </div>
        </details>
      </div>
    </header>
  );
}
