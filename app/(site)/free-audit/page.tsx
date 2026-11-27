import type { Metadata } from "next";
import { Icon } from "@/components/icons";
import { AuditForm } from "@/components/forms/audit-form";
import { CtaBand } from "@/components/site/cta-band";
import { auditChecklist, faqs } from "@/lib/content";
import { getCurrentUser } from "@/lib/session";

export const metadata: Metadata = {
  title: "Free business audit — View My Business",
  description:
    "Submit your website for a free, manually reviewed business audit from Erstian Technologies. Get scored feedback and prioritised growth ideas within 48 hours.",
};

export default async function FreeAuditPage() {
  const user = await getCurrentUser();

  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <div className="paper-grid pointer-events-none absolute inset-0 opacity-50 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
        <div className="pointer-events-none absolute -right-24 top-0 size-[30rem] rounded-full bg-brand/10 blur-[110px]" />
        <div className="shell relative grid gap-12 py-12 md:py-16 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <div className="lg:pt-6">
            <p className="inline-flex items-center gap-2 rounded-full border border-line bg-white/70 px-3.5 py-1.5 text-[0.72rem] font-medium text-ink/70 backdrop-blur">
              <span className="inline-flex size-1.5 rounded-full bg-lime ring-2 ring-lime/30" />
              View My Business
              <span className="text-ink/25">·</span>
              Free of cost
            </p>

            <h1 className="mt-6 text-balance text-[2.4rem] font-semibold leading-[1.0] tracking-[-0.045em] sm:text-5xl lg:text-[3.4rem]">
              Let our team review your business — free.
            </h1>
            <p className="mt-6 max-w-xl text-[1rem] leading-8 text-ink/60">
              Share your website. A strategist reviews it manually, checks the fundamentals that
              decide enquiries, and sends you the gaps we would fix first — plus growth ideas for the
              next 90 days. You will hear back within 48 hours.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                { icon: "shield", title: "Free", text: "No cost, no strings" },
                { icon: "users", title: "Manual", text: "A strategist reviews it" },
                { icon: "clock", title: "48 hours", text: "Reply window" },
              ].map((item) => (
                <div className="rounded-xl border border-line bg-white/60 p-4" key={item.title}>
                  <Icon className="text-brand" name={item.icon} size={18} />
                  <p className="mt-2.5 text-sm font-semibold text-ink">{item.title}</p>
                  <p className="mt-0.5 text-[0.7rem] leading-4 text-ink/45">{item.text}</p>
                </div>
              ))}
            </div>

            <div className="mt-9 rounded-2xl border border-line bg-cream/60 p-6">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-ink/40">What the team checks</p>
              <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                {auditChecklist.map((item) => (
                  <li className="flex items-start gap-2 text-[0.8rem] leading-5 text-ink/65" key={item}>
                    <span className="mt-0.5 grid size-4 shrink-0 place-items-center rounded-full bg-white text-brand">
                      <Icon name="check" size={10} strokeWidth={2.4} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <ol className="mt-8 space-y-4">
              {[
                { n: "1", t: "You submit the form", d: "Website, city and what you want more of." },
                { n: "2", t: "We review it manually", d: "No automated scanner, no generic PDF." },
                { n: "3", t: "You get ideas in 48 hours", d: "Prioritised, practical, and yours to keep." },
              ].map((step) => (
                <li className="flex gap-3.5" key={step.n}>
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-ink text-[0.75rem] font-semibold text-lime">
                    {step.n}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-ink">{step.t}</p>
                    <p className="text-[0.8rem] text-ink/45">{step.d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="relative">
            <AuditForm
              defaultEmail={user?.email ?? ""}
              defaultName={user?.name ?? ""}
              signedIn={Boolean(user)}
            />
            <p className="mt-4 text-center text-[0.7rem] leading-5 text-ink/40">
              By submitting, you agree to be contacted about this audit. We never sell your data.
            </p>
          </div>
        </div>
      </section>

      <section className="shell py-14 md:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="eyebrow flex items-center gap-2 text-brand">
              <span className="inline-block size-1.5 rounded-full bg-brand" />
              Good to know
            </p>
            <h2 className="mt-4 text-balance text-[1.8rem] font-semibold leading-tight tracking-[-0.03em] sm:text-[2.2rem]">
              A real second opinion, not a sales script.
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-7 text-ink/50">
              We only take on work when we believe we can move a number that matters. If your
              priorities lie elsewhere, we will tell you that too.
            </p>
          </div>
          <div className="divide-y divide-line border-y border-line">
            {faqs.map((faq) => (
              <details className="group py-5" key={faq.q}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[0.95rem] font-medium text-ink [&::-webkit-details-marker]:hidden">
                  {faq.q}
                  <span className="grid size-7 shrink-0 place-items-center rounded-full border border-line bg-white text-ink transition-transform duration-300 group-open:rotate-45">
                    <Icon name="plus" size={14} />
                  </span>
                </summary>
                <p className="mt-3 max-w-xl pr-10 text-sm leading-6 text-ink/55">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
