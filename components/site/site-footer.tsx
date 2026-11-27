import Link from "next/link";
import { Icon } from "@/components/icons";
import { Logo } from "@/components/site/logo";
import { company, services } from "@/lib/content";

const companyLinks = [
  { label: "About", href: "/about" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Client reviews", href: "/testimonials" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
  { label: "Free business audit", href: "/free-audit" },
];

const clientLinks = [
  { label: "Client dashboard", href: "/dashboard" },
  { label: "Create account", href: "/sign-up" },
  { label: "Sign in", href: "/sign-in" },
  { label: "Book a call", href: "/book" },
];

export function SiteFooter() {
  return (
    <footer className="bg-ink text-paper">
      <div className="shell border-b border-white/10 py-14 md:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="md:col-span-2 lg:col-span-1">
            <Logo inverted />
            <p className="mt-6 max-w-xs text-sm leading-6 text-paper/55">
              {company.description}
            </p>
            <a className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-lime hover:text-white" href={"mailto:" + company.email}>
              <Icon name="mail" size={16} />
              {company.email}
            </a>
            <p className="mt-3 flex items-center gap-2 text-xs text-paper/40">
              <Icon name="map-pin" size={14} />
              {company.location}
            </p>
            <p className="mt-6 max-w-xs text-[0.7rem] leading-5 text-paper/30">
              No spam, no hard sell. One reply from a strategist who has read your site.
            </p>
          </div>

          <div>
            <p className="eyebrow text-paper/35">Services</p>
            <ul className="mt-5 space-y-3 text-sm text-paper/65">
              {services.slice(0, 6).map((service) => (
                <li key={service.slug}>
                  <Link className="transition-colors hover:text-white" href={"/services/" + service.slug}>
                    {service.title.replace(/ Solutions| Production| & Online Business/, "")}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow text-paper/35">Company</p>
            <ul className="mt-5 space-y-3 text-sm text-paper/65">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link className="transition-colors hover:text-white" href={link.href}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow text-paper/35">For clients</p>
            <ul className="mt-5 space-y-3 text-sm text-paper/65">
              {clientLinks.map((link) => (
                <li key={link.href}>
                  <Link className="transition-colors hover:text-white" href={link.href}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="shell flex flex-col gap-3 py-6 text-xs text-paper/40 md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} {company.name}. All rights reserved.</p>
        <p className="flex items-center gap-2">
          <span className="inline-block size-1.5 rounded-full bg-lime" />
          Free business audits · replies within 48 hours
        </p>
      </div>
    </footer>
  );
}
