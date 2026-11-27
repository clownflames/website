import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/icons";
import { CtaBand } from "@/components/site/cta-band";
import { ButtonLink } from "@/components/ui/button-link";
import { processSteps, services, stats } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "Erstian Technologies is a digital services company building websites, marketing engines, automation and software for growing businesses.",
};

const principles = [
  { icon: "target", title: "Own the number", text: "We scope around a business outcome — enquiries, orders, retention — not a list of deliverables." },
  { icon: "users", title: "Senior people only", text: "The person in the first call is the person doing the thinking. No layers, no handoff to a junior." },
  { icon: "eye", title: "Say the honest thing", text: "If a redesign will not move the needle, we will say so. Clarity now beats a costly detour later." },
  { icon: "chart", title: "Build to be measured", text: "Analytics, events and call tracking go in before launch, so the result is never a matter of opinion." },
  { icon: "layers", title: "Simple beats clever", text: "Fewer moving parts, faster pages, clearer flows. Complexity is a cost the client should not pay." },
  { icon: "shield", title: "Hand over the keys", text: "You own your domain, accounts and code. Documentation and training are part of every handover." },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <div className="paper-grid pointer-events-none absolute inset-0 opacity-50 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
        <div className="shell relative grid gap-12 py-14 md:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div>
            <p className="eyebrow flex items-center gap-2 text-brand">
              <span className="inline-block size-1.5 rounded-full bg-brand" />
              About Erstian
            </p>
            <h1 className="mt-5 text-balance text-[2.5rem] font-semibold leading-[0.98] tracking-[-0.045em] sm:text-5xl lg:text-[3.7rem]">
              A small team with a large sense of ownership.
            </h1>
            <p className="mt-6 max-w-xl text-[1rem] leading-8 text-ink/60">
              Erstian Technologies is a digital services company. We design and build the websites,
              campaigns, automations and software that growing businesses rely on to find customers
              — and keep them.
            </p>
            <p className="mt-4 max-w-xl text-[0.94rem] leading-7 text-ink/45">
              One team across strategy, design, engineering and marketing. That means fewer
              meetings, faster decisions, and someone accountable for the whole result.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/free-audit" size="lg">
                Get a free business audit
                <Icon name="arrow-up-right" size={18} />
              </ButtonLink>
              <ButtonLink href="/portfolio" size="lg" variant="outline">
                See our work
              </ButtonLink>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {stats.map((stat) => (
              <div className="rounded-2xl border border-line bg-white p-5" key={stat.label}>
                <p className="text-[1.9rem] font-semibold leading-none tracking-[-0.04em] text-ink">{stat.value}</p>
                <p className="mt-2 text-[0.72rem] leading-4 text-ink/45">{stat.label}</p>
              </div>
            ))}
            <div className="col-span-2 rounded-2xl bg-ink p-5 text-paper">
              <div className="flex items-center gap-2 text-lime">
                <Icon name="sparkle" size={15} />
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em]">Free, forever</p>
              </div>
              <p className="mt-2 text-[0.88rem] leading-6 text-paper/70">
                Every business can request a manual website review — no cost, no obligation, a real
                reply within 48 hours.
              </p>
              <Link className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-lime" href="/free-audit">
                View my business
                <Icon name="arrow-up-right" size={13} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="shell py-14 md:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <p className="eyebrow flex items-center gap-2 text-brand">
              <span className="inline-block size-1.5 rounded-full bg-brand" />
              Why we exist
            </p>
            <h2 className="mt-4 text-balance text-[1.8rem] font-semibold leading-tight tracking-[-0.03em] sm:text-[2.3rem]">
              Good businesses lose to better-presented ones.
            </h2>
          </div>
          <div className="grid gap-5 text-[0.95rem] leading-8 text-ink/60 sm:grid-cols-2">
            <p>
              A clinic with excellent doctors, a manufacturer with a superior product, a founder with
              a genuinely better offer — and still the enquiries go to a competitor with a faster
              site, a clearer message and a follow-up that actually happens.
            </p>
            <p>
              That gap is not a design problem or an ads problem. It is a system problem. So we work
              across the whole chain: how the business is positioned, how it is found, how it
              converts, and how it follows up.
            </p>
            <p>
              We are deliberately small. The people who plan the work do the work, which keeps
              quality high and decisions fast. It also means we take on a limited number of
              engagements at a time.
            </p>
            <p>
              Every engagement starts with the same question: what number are we trying to move? If
              we cannot answer that together, we are not the right partner yet — and we will say so.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-white">
        <div className="shell py-14 md:py-20">
          <div className="max-w-2xl">
            <p className="eyebrow flex items-center gap-2 text-brand">
              <span className="inline-block size-1.5 rounded-full bg-brand" />
              How we work
            </p>
            <h2 className="mt-4 text-balance text-[1.9rem] font-semibold leading-tight tracking-[-0.035em] sm:text-[2.4rem]">
              Six principles we do not negotiate on.
            </h2>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {principles.map((principle, index) => (
              <div className="rounded-2xl border border-line bg-paper p-6" key={principle.title}>
                <div className="flex items-center justify-between">
                  <span className="grid size-10 place-items-center rounded-xl bg-white text-brand ring-1 ring-line">
                    <Icon name={principle.icon} size={18} />
                  </span>
                  <span className="text-[0.68rem] font-semibold tracking-[0.16em] text-ink/25">0{index + 1}</span>
                </div>
                <p className="mt-4 text-[0.98rem] font-semibold text-ink">{principle.title}</p>
                <p className="mt-2 text-[0.83rem] leading-6 text-ink/50">{principle.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="shell py-14 md:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="eyebrow flex items-center gap-2 text-brand">
              <span className="inline-block size-1.5 rounded-full bg-brand" />
              The process
            </p>
            <h2 className="mt-4 text-balance text-[1.8rem] font-semibold leading-tight tracking-[-0.03em] sm:text-[2.2rem]">
              Predictable, visible, and built to hand over.
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-7 text-ink/50">
              No black boxes. You always know what is happening this week, what is blocked, and what
              is coming next.
            </p>
            <div className="mt-6 rounded-2xl border border-line bg-cream/60 p-5">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-ink/40">Nine practices</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {services.map((service) => (
                  <Link
                    className="rounded-full border border-line bg-white px-2.5 py-1 text-[0.7rem] font-medium text-ink/60 transition-colors hover:border-ink/20 hover:text-ink"
                    href={"/services/" + service.slug}
                    key={service.slug}
                  >
                    {service.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <ol className="relative border-l border-line pl-6 sm:pl-8">
            {processSteps.map((step, index) => (
              <li className="relative pb-8 last:pb-0" key={step.title}>
                <span className="absolute -left-[31px] grid size-7 place-items-center rounded-full border border-line bg-white text-[0.65rem] font-semibold text-ink sm:-left-[39px]">
                  {index + 1}
                </span>
                <p className="text-[0.98rem] font-semibold text-ink">{step.title}</p>
                <p className="mt-1.5 max-w-lg text-[0.88rem] leading-6 text-ink/50">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
