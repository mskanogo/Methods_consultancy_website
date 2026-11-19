import Link from "next/link";
import Image from "next/image";
import { services } from "../data/services";

const LOGO_ON_LIGHT = "/logo-color.svg";

const focus =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-surface text-ink">
      <div className="mx-auto grid max-w-6xl gap-12 px-8 py-16 md:grid-cols-3">
        <nav aria-label="Services">
          <p className="text-sm font-semibold">Services</p>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            {services.slice(0, 5).map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className={`hover:text-accent hover:underline ${focus}`}
                >
                  {service.title}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/services"
                className={`font-semibold text-accent hover:underline ${focus}`}
              >
                All services
              </Link>
            </li>
          </ul>
        </nav>

        <div className="md:text-center">
          {LOGO_ON_LIGHT ? (
                        <>
              <Image
                src={LOGO_ON_LIGHT}
                alt="Methods Consultancy"
                width={208}
                height={32}
                className="h-8 w-auto md:mx-auto dark:hidden"
              />
              <Image
                src="/logo-white.svg"
                alt="Methods Consultancy"
                width={208}
                height={32}
                className="hidden h-8 w-auto md:mx-auto dark:block"
              />
            </>
          ) : (
            <p className="text-xl font-extrabold lowercase tracking-tight">
              methods <span className="text-brand-red">consultancy</span>
            </p>
          )}
          <p className="mt-4 text-sm text-muted">
            We establish enterprise architecture that actually governs.
          </p>
          <p className="mt-2 text-sm text-muted">Nairobi, Kenya</p>
          <Link
            href="/contact"
            className="btn-primary mt-6"
          >
            Book a consultation
          </Link>
        </div>

        <nav aria-label="Site" className="md:text-right">
          <p className="text-sm font-semibold">Company</p>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            {[
              { href: "/about", label: "About" },
              { href: "/sectors", label: "Sectors" },
              { href: "/experience", label: "Experience" },
              { href: "/contact", label: "Contact" },
            ].map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`hover:text-accent hover:underline ${focus}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-8 py-6 text-sm text-muted md:flex-row md:items-center md:justify-between">
          <p>© 2026 Methods Consultancy Limited. All rights reserved.</p>
          <ul className="flex gap-6">
            <li>
              <Link href="/legal/privacy" className={`hover:underline ${focus}`}>
                Privacy
              </Link>
            </li>
            <li>
              <Link href="/legal/terms" className={`hover:underline ${focus}`}>
                Terms
              </Link>
            </li>
            <li>
              <Link href="/legal/cookies" className={`hover:underline ${focus}`}>
                Cookies
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
