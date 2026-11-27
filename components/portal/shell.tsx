import Link from "next/link";
import { Icon } from "@/components/icons";
import { AdminNav, MobileNav, PortalNav, SignOutButton, type PortalNavItem } from "@/components/portal/portal-nav";
import { Logo } from "@/components/site/logo";

const userNav: PortalNavItem[] = [
  { href: "/dashboard", label: "Overview", icon: "dashboard" },
  { href: "/dashboard/businesses", label: "My businesses", icon: "building" },
  { href: "/dashboard/audits", label: "Audit requests", icon: "file-text" },
  { href: "/dashboard/bookings", label: "Bookings", icon: "calendar" },
  { href: "/dashboard/contacts", label: "Enquiries", icon: "mail" },
];

const adminNav: PortalNavItem[] = [
  { href: "/admin", label: "Overview", icon: "dashboard" },
  { href: "/admin/businesses", label: "Businesses", icon: "building" },
  { href: "/admin/audits", label: "Audit requests", icon: "file-text" },
  { href: "/admin/leads", label: "Enquiries", icon: "mail" },
  { href: "/admin/bookings", label: "Bookings", icon: "calendar" },
  { href: "/admin/testimonials", label: "Testimonials", icon: "star" },
  { href: "/admin/reviews", label: "Reviews", icon: "quote" },
  { href: "/admin/portfolio", label: "Portfolio", icon: "layers" },
  { href: "/admin/blog", label: "Journal", icon: "edit" },
];

function initials(name: string) {
  return (
    name
      .split(" ")
      .filter(Boolean)
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "ET"
  );
}

export function PortalShell({
  user,
  admin = false,
  adminAccess = false,
  children,
}: {
  user: { name: string; email: string; role?: string | null };
  admin?: boolean;
  adminAccess?: boolean;
  children: React.ReactNode;
}) {
  const items = admin ? adminNav : userNav;

  if (admin) {
    return (
      <div className="min-h-dvh bg-paper lg:grid lg:grid-cols-[248px_1fr]">
        <aside className="relative hidden bg-ink p-5 text-paper lg:sticky lg:top-0 lg:flex lg:h-dvh lg:flex-col">
          <div className="flex items-center justify-between">
            <Logo inverted />
          </div>
          <div className="mt-8 flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2">
            <Icon className="text-lime" name="shield" size={14} />
            <span className="text-[0.66rem] font-semibold uppercase tracking-[0.12em] text-paper/55">Admin console</span>
          </div>
          <div className="mt-6">
            <AdminNav items={items} />
          </div>
          <div className="mt-6 rounded-xl border border-white/10 p-4">
            <p className="text-[0.7rem] font-semibold text-paper/70">Need the public site?</p>
            <Link className="mt-1 inline-flex items-center gap-1.5 text-[0.72rem] font-medium text-lime" href="/">
              View website
              <Icon name="external" size={12} />
            </Link>
          </div>
          <div className="mt-auto border-t border-white/10 pt-4">
            <div className="flex items-center gap-2.5">
              <span className="grid size-8 shrink-0 place-items-center rounded-full bg-lime text-[0.66rem] font-semibold text-ink">
                {initials(user.name)}
              </span>
              <div className="min-w-0">
                <p className="truncate text-[0.78rem] font-medium text-paper/85">{user.name}</p>
                <p className="truncate text-[0.65rem] text-paper/35">{user.email}</p>
              </div>
            </div>
            <SignOutButton inverted />
          </div>
        </aside>

        <div className="min-w-0">
          <header className="flex items-center justify-between border-b border-white/10 bg-ink px-5 py-3.5 text-paper lg:hidden">
            <Logo inverted />
            <SignOutButton inverted />
          </header>
          <MobileNav admin items={items} />
          <main className="px-5 py-8 md:px-9 md:py-10">{children}</main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-paper lg:grid lg:grid-cols-[260px_1fr]">
      <aside className="hidden border-r border-line bg-white lg:sticky lg:top-0 lg:flex lg:h-dvh lg:flex-col lg:p-5">
        <Logo />
        <p className="mt-6 px-3 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-ink/30">Workspace</p>
        <div className="mt-2">
          <PortalNav items={items} />
        </div>

        <div className="mt-6 rounded-2xl bg-ink p-4 text-paper">
          <div className="flex items-center gap-2 text-lime">
            <Icon name="sparkle" size={14} />
            <span className="text-[0.62rem] font-semibold uppercase tracking-[0.12em]">Free forever</span>
          </div>
          <p className="mt-2 text-[0.76rem] leading-5 text-paper/60">
            Get a manual review of your business with a 48-hour reply.
          </p>
          <Link
            className="mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-lime px-3 py-2 text-[0.72rem] font-semibold text-ink"
            href="/free-audit"
          >
            View my business
            <Icon name="arrow-up-right" size={12} />
          </Link>
        </div>

        <div className="mt-auto border-t border-line pt-4">
          <div className="flex items-center gap-2.5">
            <span className="grid size-9 shrink-0 place-items-center rounded-full bg-brand-soft text-[0.7rem] font-semibold text-brand">
              {initials(user.name)}
            </span>
            <div className="min-w-0">
              <p className="truncate text-[0.8rem] font-semibold text-ink">{user.name}</p>
              <p className="truncate text-[0.66rem] text-ink/40">{user.email}</p>
            </div>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <SignOutButton />
            <div className="flex items-center gap-3">
              {adminAccess ? (
                <Link className="inline-flex items-center gap-1 text-[0.68rem] font-medium text-brand hover:underline" href="/admin">
                  <Icon name="shield" size={11} />
                  Admin
                </Link>
              ) : null}
              <Link className="text-[0.68rem] text-ink/35 hover:text-ink" href="/">
                Website
              </Link>
            </div>
          </div>
        </div>
      </aside>

      <div className="min-w-0">
        <header className="flex items-center justify-between border-b border-line bg-white/80 px-5 py-3.5 backdrop-blur lg:hidden">
          <Logo />
          <SignOutButton />
        </header>
        <MobileNav items={items} />
        <main className="px-5 py-8 md:px-9 md:py-10">{children}</main>
      </div>
    </div>
  );
}
