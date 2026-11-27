import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "@/components/icons";
import { CtaBand } from "@/components/site/cta-band";
import { ServiceEnquiryDialog } from "@/components/site/enquiry-dialog";
import { ButtonLink } from "@/components/ui/button-link";
import { services } from "@/lib/content";

type Params = { slug: string };

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) return { title: "Service not found" };
  return {
    title: service.title,
    description: service.description,
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) notFound();

  const related = services.filter((item) => item.slug !== service.slug).slice(0, 3);
  const index = services.findIndex((item) => item.slug === service.slug);

  return (
    <>
      <section className="relative overflow-hidden border-b border-line bg-ink text-paper">
        <div className="dark-grid pointer-events-none absolute inset-0 opacity-60" />
        <div className="hero-glow pointer-events-none absolute inset-0 opacity-60" />
        <div className="shell relative py-12 md:py-20">
          <nav className="flex flex-wrap items-center gap-2 text-xs text-paper/40">
            <Link className="hover:text-lime" href="/">Home</Link>
            <span>/</span>
            <Link className="hover:text-lime" href="/services">Services</Link>
            <span>/</span>
            <span className="text-paper/70">{service.title}</span>
          </nav>

          <div className="mt-8 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <div className="flex items-center gap-4">
                <span className="grid size-12 place-items-center rounded-xl bg-lime text-ink">
                  <Icon name={service.icon} size={22} />
                </span>
                <span className="text-[0.7rem] font-semibold tracking-[0.22em] text-paper/35">
                  Service {service.index} / 09
                </span>
              </div>
              <h1 className="mt-6 max-w-3xl text-balance text-[2.3rem] font-semibold leading-[1.02] tracking-[-0.045em] sm:text-5xl lg:text-[3.5rem]">
                {service.title}
              </h1>
              <p className="mt-5 max-w-2xl text-[1rem] leading-8 text-paper/60">{service.description}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-paper/40">Start here</p>
              <p className="mt-3 text-[0.95rem] font-medium leading-6 text-paper/85">
                Not sure if this is the right first move? Send us your website — we will tell you honestly.
              </p>
              <ButtonLink className="mt-5 w-full" href="/free-audit" variant="lime">
                Free business audit
                <Icon name="arrow-up-right" size={16} />
              </ButtonLink>
              <p className="mt-3 text-center text-[0.68rem] text-paper/35">Free · reply within 48 hours</p>
              <ServiceEnquiryDialog
                className="mt-2 w-full text-paper/55 hover:bg-white/5 hover:text-paper"
                items={service.items}
                label="Or request a proposal"
                serviceTitle={service.title}
                size="sm"
                variant="ghost"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="shell py-14 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="eyebrow flex items-center gap-2 text-brand">
              <span className="inline-block size-1.5 rounded-full bg-brand" />
              What is included
            </p>
            <h2 className="mt-4 text-balance text-[1.7rem] font-semibold leading-tight tracking-[-0.03em] sm:text-[2.1rem]">
              {service.items.length} deliverables, scoped to your business.
            </h2>
            <div className="mt-7 grid gap-x-8 sm:grid-cols-2">
              {service.items.map((item, itemIndex) => (
                <div className="flex items-start gap-3 border-b border-line/70 py-3.5" key={item}>
                  <span className="mt-0.5 text-[0.66rem] font-semibold tracking-[0.08em] text-brand/60">
                    {String(itemIndex + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[0.9rem] leading-6 text-ink/75">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <aside className="h-fit rounded-2xl border border-line bg-white p-6 lg:sticky lg:top-28">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-ink/40">The outcome</p>
            <ul className="mt-4 space-y-4">
              {service.outcomes.map((outcome) => (
                <li className="flex items-start gap-3 text-sm leading-6 text-ink/65" key={outcome}>
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-lime text-ink">
                    <Icon name="check" size={11} strokeWidth={2.4} />
                  </span>
                  {outcome}
                </li>
              ))}
            </ul>
            <div className="mt-6 rounded-xl bg-paper p-4">
              <p className="text-xs leading-5 text-ink/50">
                Typical timelines, budgets and next steps are shared after a short discovery call —
                so the scope fits your business instead of a fixed package.
              </p>
            </div>
            <div className="mt-5 space-y-2">
              <ServiceEnquiryDialog
                className="w-full"
                intro="Pick what you need and we will reply with scope, timeline and pricing."
                items={service.items}
                label="Request a proposal"
                serviceTitle={service.title}
                variant="dark"
              />
              <p className="flex items-center justify-center gap-1.5 text-[0.67rem] text-ink/40">
                <Icon name="clock" size={12} />
                Reply within one working day
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-y border-line bg-cream/40">
        <div className="shell py-14 md:py-20">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow flex items-center gap-2 text-brand">
                <span className="inline-block size-1.5 rounded-full bg-brand" />
                Pairs well with
              </p>
              <h2 className="mt-3 text-[1.7rem] font-semibold tracking-[-0.03em] sm:text-[2rem]">
                Build the loop, not just the page.
              </h2>
            </div>
            <ButtonLink href="/services" variant="outline">
              All services
              <Icon name="arrow-right" size={16} />
            </ButtonLink>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {related.map((item) => (
              <Link
                className="group rounded-2xl border border-line bg-white p-6 transition-all hover:-translate-y-1 hover:border-ink/15"
                href={"/services/" + item.slug}
                key={item.slug}
              >
                <div className="flex items-center justify-between">
                  <span className="grid size-10 place-items-center rounded-lg bg-brand-soft text-brand">
                    <Icon name={item.icon} size={18} />
                  </span>
                  <span className="text-[0.68rem] tracking-[0.18em] text-ink/30">{item.index}</span>
                </div>
                <p className="mt-4 text-[0.98rem] font-semibold text-ink">{item.title}</p>
                <p className="mt-2 text-[0.82rem] leading-6 text-ink/50">{item.short}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-ink/50 group-hover:text-brand">
                  View service
                  <Icon name="arrow-up-right" size={13} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="shell flex items-center justify-between border-b border-line py-4 text-xs text-ink/40">
        <Link className="hover:text-ink" href="/services">
          ← Back to all services
        </Link>
        <span>{service.index} / 09</span>
      </div>

      <CtaBand />
    </>
  );
}
