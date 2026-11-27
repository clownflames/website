import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/icons";
import { CtaBand } from "@/components/site/cta-band";
import { ServiceEnquiryDialog } from "@/components/site/enquiry-dialog";
import { SectionHeading } from "@/components/site/section-heading";
import { ButtonLink } from "@/components/ui/button-link";
import { services } from "@/lib/content";

export const metadata: Metadata = {
  title: "Digital services — websites, ads, automation, CRM & cloud",
  description:
    "Explore all nine Erstian Technologies service verticals: web development, performance marketing, WhatsApp automation, video, branding, SEO, CRM/ERP, e-commerce and cloud hosting.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <div className="paper-grid pointer-events-none absolute inset-0 opacity-50 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
        <div className="shell relative grid gap-10 py-14 md:py-20 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
          <div>
            <p className="eyebrow flex items-center gap-2 text-brand">
              <span className="inline-block size-1.5 rounded-full bg-brand" />
              Services · 09 practice areas
            </p>
            <h1 className="mt-5 max-w-3xl text-balance text-[2.4rem] font-semibold leading-[1.0] tracking-[-0.045em] sm:text-5xl lg:text-[3.6rem]">
              Everything your business needs to be found, chosen and paid.
            </h1>
            <p className="mt-6 max-w-2xl text-[1rem] leading-8 text-ink/60">
              Nine connected practices that plug into each other. Start with the gap that is costing
              you the most, then scale into the rest — without changing partners or explaining your
              business twice.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/free-audit" size="lg">
                Get a free business audit
                <Icon name="arrow-up-right" size={18} />
              </ButtonLink>
              <ButtonLink href="/contact" size="lg" variant="outline">
                Talk to a strategist
              </ButtonLink>
            </div>
          </div>
          <div className="rounded-2xl border border-line bg-white p-6">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-ink/40">Quick jump</p>
            <div className="mt-4 grid gap-1">
              {services.map((service) => (
                <Link
                  className="flex items-center justify-between rounded-lg px-2.5 py-2 text-sm text-ink/65 transition-colors hover:bg-cream hover:text-ink"
                  href={"#" + service.slug}
                  key={service.slug}
                >
                  <span className="flex items-center gap-2.5">
                    <span className="text-[0.65rem] font-medium tracking-[0.1em] text-ink/30">{service.index}</span>
                    {service.title}
                  </span>
                  <Icon name="arrow-down" size={14} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="shell py-14 md:py-20">
        <SectionHeading
          description="Each engagement is scoped around a business outcome, with tracking in place so the result is never a matter of opinion."
          eyebrow="Full practice list"
          title="Choose where to start."
        />
      </section>

      <div className="shell pb-8">
        {services.map((service, index) => (
          <section className={"scroll-mt-28 border-t border-line py-12 md:py-16" + (index === services.length - 1 ? " border-b" : "")} id={service.slug} key={service.slug}>
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <div className="flex items-center gap-4">
                  <span className="grid size-12 place-items-center rounded-xl bg-ink text-lime">
                    <Icon name={service.icon} size={22} />
                  </span>
                  <span className="text-[0.7rem] font-semibold tracking-[0.2em] text-ink/30">{service.index}</span>
                </div>
                <h2 className="mt-5 text-balance text-[1.65rem] font-semibold leading-tight tracking-[-0.025em] text-ink sm:text-[2rem]">
                  {service.title}
                </h2>
                <p className="mt-4 max-w-md text-[0.94rem] leading-7 text-ink/55">{service.description}</p>

                <ul className="mt-6 space-y-2.5">
                  {service.outcomes.map((outcome) => (
                    <li className="flex items-start gap-2.5 text-sm leading-6 text-ink/70" key={outcome}>
                      <span className="mt-1 grid size-4 shrink-0 place-items-center rounded-full bg-brand-soft text-brand">
                        <Icon name="check" size={10} strokeWidth={2.4} />
                      </span>
                      {outcome}
                    </li>
                  ))}
                </ul>

                <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
                  <ServiceEnquiryDialog
                    items={service.items}
                    label="Get started"
                    serviceTitle={service.title}
                    variant="dark"
                  />
                  <Link
                    className="inline-flex items-center gap-2 text-sm font-semibold text-ink hover:text-brand"
                    href={"/services/" + service.slug}
                  >
                    Explore {service.title.split(" & ")[0]}
                    <span className="grid size-7 place-items-center rounded-full border border-line">
                      <Icon name="arrow-up-right" size={14} />
                    </span>
                  </Link>
                </div>
              </div>

              <div className="rounded-2xl border border-line bg-white p-6 sm:p-7">
                <div className="flex items-center justify-between border-b border-line pb-4">
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-ink/40">What is included</p>
                  <span className="rounded-full bg-cream px-2.5 py-1 text-[0.65rem] font-semibold text-ink/50">
                    {service.items.length} services
                  </span>
                </div>
                <ul className="mt-4 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
                  {service.items.map((item) => (
                    <li className="flex items-start gap-2 text-[0.8rem] leading-5 text-ink/60" key={item}>
                      <span className="mt-1.5 size-1 shrink-0 rounded-full bg-brand/50" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        ))}
      </div>

      <CtaBand />
    </>
  );
}
