"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

const links = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/sectors", label: "Sectors" },
  { href: "/experience", label: "Experience" },
  { href: "/contact", label: "Contact" },
];

const focus =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Escape closes the mobile menu.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  const linkClass = (href: string) =>
    `rounded-full px-4 py-2 text-sm font-medium transition ${focus} ${
      isActive(href)
        ? "bg-tint font-semibold text-accent"
        : "text-ink hover:bg-alt"
    }`;

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-surface/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-8 py-3">
        <Link href="/" aria-label="Methods Consultancy home" className={focus}>
          <Image
            src="/logo-color.svg"
            alt="Methods Consultancy"
            width={208}
            height={32}
            priority
            className="h-8 w-auto dark:hidden"
          />
          <Image
            src="/logo-white.svg"
            alt=""
            width={208}
            height={32}
            priority
            className="hidden h-8 w-auto dark:block"
          />
        </Link>

        {/* Top-right navigation: each link opens its own page */}
        <div className="hidden items-center gap-2 md:flex">
          <nav aria-label="Main" className="flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={linkClass(link.href)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <ThemeToggle />
          <Link href="/contact" className="btn-primary ml-2">
            Book a consultation
          </Link>
        </div>

        {/* Mobile menu */}
        <div className="relative md:hidden">
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
            className={`rounded-full border border-line px-4 py-2 text-sm font-medium text-ink ${focus}`}
          >
            {open ? "Close" : "Menu"}
          </button>
          {open && (
            <div
              id="mobile-menu"
              className="absolute right-0 mt-3 flex w-64 flex-col gap-1 rounded-2xl border border-line bg-surface p-3 shadow-xl"
            >
              <nav aria-label="Main mobile" className="flex flex-col gap-1">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={isActive(link.href) ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className={`${linkClass(link.href)} text-base`}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-2 flex flex-col gap-2 border-t border-line pt-3">
                <ThemeToggle />
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="btn-primary"
                >
                  Book a consultation
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
