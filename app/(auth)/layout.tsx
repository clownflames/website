import Link from "next/link";
import { Icon } from "@/components/icons";
import { Logo } from "@/components/site/logo";

export const metadata = { robots: { index: false, follow: false } };

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-dvh lg:grid-cols-[1fr_1.05fr]">
      <aside className="relative hidden overflow-hidden bg-ink p-10 text-paper lg:flex lg:flex-col lg:justify-between">
        <div className="dark-grid pointer-events-none absolute inset-0 opacity-70" />
        <div className="hero-glow pointer-events-none absolute inset-0 opacity-50" />

        <div className="relative">
          <Logo inverted />
        </div>

        <div className="relative max-w-md py-10">
          <p className="eyebrow flex items-center gap-2 text-lime">
            <span className="inline-block size-1.5 rounded-full bg-lime" />
            Your Erstian workspace
          </p>
          <p className="mt-5 text-[2.2rem] font-semibold leading-[1.05] tracking-[-0.035em]">
            One place for every business you are growing.
          </p>
          <ul className="mt-8 space-y-4">
            {[
              { icon: "building", text: "Add and manage multiple businesses under one login" },
              { icon: "file-text", text: "Track your free audit requests and reports" },
              { icon: "calendar", text: "See every call booking and enquiry in one timeline" },
            ].map((item) => (
              <li className="flex items-start gap-3 text-sm leading-6 text-paper/65" key={item.text}>
                <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-white/[0.06] text-lime">
                  <Icon name={item.icon} size={14} />
                </span>
                {item.text}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative rounded-2xl border border-white/10 bg-white/[0.04] p-5">
          <p className="text-[0.85rem] leading-6 text-paper/70">
            “Clear reporting, honest recommendations and a website that finally loads fast on mobile.
            Working with them feels like having an in-house digital team.”
          </p>
          <p className="mt-3 text-[0.7rem] font-semibold text-paper/50">Sana Kapoor · Real estate group</p>
        </div>
      </aside>

      <main className="flex flex-col">
        <div className="flex items-center justify-between border-b border-line px-6 py-4 lg:justify-end lg:border-0">
          <div className="lg:hidden">
            <Logo />
          </div>
          <Link className="inline-flex items-center gap-1.5 text-xs font-medium text-ink/45 hover:text-ink" href="/">
            <Icon name="arrow-right" size={13} />
            Back to website
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center px-6 py-10">
          <div className="w-full max-w-md">{children}</div>
        </div>
        <div className="border-t border-line px-6 py-4 text-center text-[0.68rem] text-ink/35">
          © {new Date().getFullYear()} Erstian Technologies · hello@erstiantech.com
        </div>
      </main>
    </div>
  );
}
