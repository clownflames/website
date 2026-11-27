"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Icon } from "@/components/icons";
import { buttonClass } from "@/components/ui/button-link";
import { cn } from "@/lib/utils";

type NavItem = { label: string; href: string };

export function SiteNav({ items, signedIn }: { items: NavItem[]; signedIn: boolean }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <nav className="hidden items-center gap-1 lg:flex">
        {items.map((item) => (
          <Link
            className={cn(
              "relative rounded-full px-3.5 py-2 text-[0.84rem] font-medium text-ink/70 transition-colors hover:text-ink",
              isActive(item.href) && "text-ink",
            )}
            href={item.href}
            key={item.href}
          >
            {item.label}
            {item.href === "/free-audit" ? (
              <span className="ml-1.5 inline-block size-1.5 -translate-y-1 rounded-full bg-brand" />
            ) : null}
          </Link>
        ))}
      </nav>

      <div className="flex items-center gap-2">
        <Link className="hidden text-[0.84rem] font-medium text-ink/65 transition-colors hover:text-ink sm:block" href={signedIn ? "/dashboard" : "/sign-in"}>
          {signedIn ? "Dashboard" : "Sign in"}
        </Link>
        <Link className={buttonClass("dark", "sm", "hidden sm:inline-flex")} href="/free-audit">
          Free audit
          <Icon name="arrow-up-right" size={15} />
        </Link>
        <button
          aria-expanded={open}
          aria-label="Open menu"
          className="grid size-10 place-items-center rounded-full border border-line bg-white/70 text-ink lg:hidden"
          onClick={() => setOpen((value) => !value)}
          type="button"
        >
          <Icon name={open ? "close" : "menu"} size={20} />
        </button>
      </div>

      {open ? (
        <div className="fixed inset-x-0 top-16 z-40 border-b border-line bg-paper px-5 pb-8 pt-4 md:top-20 lg:hidden">
          <div className="flex flex-col divide-y divide-line/70">
            {items.map((item) => (
              <Link
                className={cn(
                  "flex items-center justify-between py-3.5 text-lg font-medium text-ink/80",
                  isActive(item.href) && "text-brand",
                )}
                href={item.href}
                key={item.href}
              >
                {item.label}
                <Icon name="arrow-up-right" size={18} />
              </Link>
            ))}
            <Link className="flex items-center justify-between py-3.5 text-lg font-medium text-ink/80" href={signedIn ? "/dashboard" : "/sign-in"}>
              {signedIn ? "Dashboard" : "Sign in"}
              <Icon name="arrow-up-right" size={18} />
            </Link>
          </div>
          <Link className={buttonClass("dark", "md", "mt-5 w-full")} href="/free-audit">
            Get a free business audit
            <Icon name="arrow-up-right" size={17} />
          </Link>
        </div>
      ) : null}

    </>
  );
}
