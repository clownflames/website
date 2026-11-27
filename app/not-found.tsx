import Link from "next/link";
import { Icon } from "@/components/icons";
import { buttonClass } from "@/components/ui/button-link";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <section className="relative overflow-hidden">
      <div className="paper-grid pointer-events-none absolute inset-0 opacity-50 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <div className="shell relative flex min-h-[70vh] flex-col items-start justify-center py-20">
        <p className="eyebrow flex items-center gap-2 text-brand">
          <span className="inline-block size-1.5 rounded-full bg-brand" />
          404 — page not found
        </p>
        <h1 className="mt-5 max-w-2xl text-balance text-[2.6rem] font-semibold leading-[0.98] tracking-[-0.045em] sm:text-6xl">
          This page took a different route.
        </h1>
        <p className="mt-5 max-w-md text-[0.95rem] leading-7 text-ink/55">
          The link may be old, or the page may have moved. Here are a few useful places instead.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link className={buttonClass("dark", "lg")} href="/">
            Back to home
            <Icon name="arrow-right" size={16} />
          </Link>
          <Link className={buttonClass("outline", "lg")} href="/services">
            Explore services
          </Link>
          <Link className={buttonClass("outline", "lg")} href="/free-audit">
            Free audit
          </Link>
        </div>
      </div>
    </section>
  );
}
