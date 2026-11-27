import Link from "next/link";
import { Icon } from "@/components/icons";
import { ButtonLink } from "@/components/ui/button-link";

export function CtaBand() {
  return (
    <section className="shell py-16 md:py-24">
      <div className="relative overflow-hidden rounded-[2rem] bg-ink px-6 py-14 text-paper md:px-14 md:py-20">
        <div className="dark-grid pointer-events-none absolute inset-0 opacity-70" />
        <div className="hero-glow pointer-events-none absolute inset-0 opacity-70" />
        <div className="relative grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <div>
            <p className="eyebrow flex items-center gap-2 text-lime">
              <span className="inline-block size-1.5 rounded-full bg-lime" />
              Free · No obligation
            </p>
            <h2 className="mt-5 max-w-2xl text-balance text-3xl font-semibold leading-[1.05] tracking-[-0.04em] sm:text-4xl lg:text-[3.1rem]">
              Let our team look at your business — and tell you what to fix first.
            </h2>
            <p className="mt-5 max-w-xl text-[0.97rem] leading-7 text-paper/60">
              Share your website. A strategist reviews it manually, rates the fundamentals and sends
              prioritised growth ideas. You will hear back within 48 hours.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-stretch">
            <ButtonLink className="w-full" href="/free-audit" size="lg" variant="lime">
              View my business — free
              <Icon name="arrow-up-right" size={18} />
            </ButtonLink>
            <ButtonLink className="w-full border-white/20 text-paper hover:border-white hover:bg-white/5" href="/contact" size="lg" variant="outline">
              Talk to the team
            </ButtonLink>
            <p className="mt-1 flex items-center justify-center gap-2 text-xs text-paper/40">
              <Icon name="clock" size={14} />
              Average reply time: under 48 hours
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
