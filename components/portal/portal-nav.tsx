"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Icon } from "@/components/icons";
import { authClient } from "@/lib/auth-client";

export type PortalNavItem = { href: string; label: string; icon: string };

export function PortalNav({ items }: { items: PortalNavItem[] }) {
  const pathname = usePathname();

  return (
    <nav className="space-y-1">
      {items.map((item) => {
        const active =
          pathname === item.href || (item.href !== "/dashboard" && item.href !== "/admin" && pathname.startsWith(item.href));
        return (
          <Link
            className={
                "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-[0.82rem] font-medium transition-colors " +
                (active
                  ? "bg-brand-soft text-brand"
                  : "text-ink/55 hover:bg-white hover:text-ink")
            }
            href={item.href}
            key={item.href}
          >
            <Icon className={active ? "text-brand" : "text-ink/35 group-hover:text-ink/60"} name={item.icon} size={17} />
            {item.label}
            {active ? <span className="ml-auto size-1.5 rounded-full bg-brand" /> : null}
          </Link>
        );
      })}
    </nav>
  );
}

export function AdminNav({ items }: { items: PortalNavItem[] }) {
  const pathname = usePathname();

  return (
    <nav className="space-y-1">
      {items.map((item) => {
        const active = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
        return (
          <Link
            className={
              "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-[0.8rem] font-medium transition-colors " +
              (active ? "bg-white/[0.08] text-lime" : "text-paper/45 hover:bg-white/[0.05] hover:text-paper/80")
            }
            href={item.href}
            key={item.href}
          >
            <Icon className={active ? "text-lime" : "text-paper/30 group-hover:text-paper/60"} name={item.icon} size={16} />
            {item.label}
            {active ? <span className="ml-auto size-1.5 rounded-full bg-lime" /> : null}
          </Link>
        );
      })}
    </nav>
  );
}

export function MobileNav({ items, admin = false }: { items: PortalNavItem[]; admin?: boolean }) {
  const pathname = usePathname();

  return (
    <nav className={"no-scrollbar flex gap-1.5 overflow-x-auto border-b px-4 py-2 lg:hidden " + (admin ? "border-white/10 bg-ink" : "border-line bg-paper")}>
      {items.map((item) => {
        const active = pathname === item.href || (item.href !== "/dashboard" && item.href !== "/admin" && pathname.startsWith(item.href));
        return (
          <Link
            className={
              "flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-[0.74rem] font-medium " +
              (active
                ? admin
                  ? "bg-lime text-ink"
                  : "bg-ink text-paper"
                : admin
                  ? "text-paper/50"
                  : "text-ink/50")
            }
            href={item.href}
            key={item.href}
          >
            <Icon name={item.icon} size={13} />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

export function SignOutButton({ inverted = false }: { inverted?: boolean }) {
  const router = useRouter();

  return (
    <button
      aria-label="Sign out"
      className={
        "inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-[0.7rem] font-medium transition-colors " +
        (inverted ? "text-paper/45 hover:bg-white/10 hover:text-paper" : "text-ink/40 hover:bg-cream hover:text-ink")
      }
      onClick={async () => {
        await authClient.signOut();
        router.push("/");
        router.refresh();
      }}
      type="button"
    >
      <Icon name="logout" size={14} />
      Sign out
    </button>
  );
}
