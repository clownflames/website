import type { Metadata } from "next";
import { Icon } from "@/components/icons";
import { ContactForm } from "@/components/forms/contact-form";
import { CtaBand } from "@/components/site/cta-band";
import { getCurrentUser } from "@/lib/session";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Talk to Erstian Technologies about a website, campaign, automation or software project. Email hello@erstiantech.com or send the project brief.",
};

export default async function ContactPage() {
  const user = await getCurrentUser();

  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <div className="paper-grid pointer-events-none absolute inset-0 opacity-50 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
        <div className="shell relative grid gap-12 py-12 md:py-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <p className="eyebrow flex items-center gap-2 text-brand">
              <span className="inline-block size-1.5 rounded-full bg-brand" />
              Contact
            </p>
            <h1 className="mt-5 text-balance text-[2.5rem] font-semibold leading-[0.98] tracking-[-0.045em] sm:text-5xl lg:text-[3.6rem]">
              Tell us what you are trying to grow.
            </h1>
            <p className="mt-6 max-w-md text-[1rem] leading-8 text-ink/60">
              One short message is enough. We will come back with honest questions, a suggested
              approach and a clear next step — not a generic brochure.
            </p>

            <div className="mt-9 space-y-3">
              <a
                className="group flex items-start gap-4 rounded-2xl border border-line bg-white p-5 transition-colors hover:border-ink/20"
                href="mailto:hello@erstiantech.com"
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-soft text-brand">
                  <Icon name="mail" size={18} />
                </span>
                <span className="min-w-0">
                  <span className="block text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-ink/35">Email</span>
                  <span className="mt-1 block text-[0.95rem] font-medium text-ink">hello@erstiantech.com</span>
                  <span className="mt-0.5 block text-xs text-ink/45">Best for briefs and documents</span>
                </span>
                <Icon className="ml-auto mt-1 shrink-0 text-ink/25 transition-colors group-hover:text-brand" name="arrow-up-right" size={16} />
              </a>

              <div className="flex items-start gap-4 rounded-2xl border border-line bg-white p-5">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-cream text-ink/70">
                  <Icon name="map-pin" size={18} />
                </span>
                <div>
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-ink/35">Where we work</p>
                  <p className="mt-1 text-[0.95rem] font-medium text-ink">Remote-first, serving clients across India</p>
                  <p className="mt-0.5 text-xs text-ink/45">Calls on Google Meet · on-site for larger engagements</p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-2xl border border-line bg-white p-5">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-cream text-ink/70">
                  <Icon name="clock" size={18} />
                </span>
                <div>
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-ink/35">Working hours</p>
                  <p className="mt-1 text-[0.95rem] font-medium text-ink">Monday – Saturday, 10:00 – 19:00 IST</p>
                  <p className="mt-0.5 text-xs text-ink/45">Replies within one working day</p>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-2xl bg-ink p-6 text-paper">
              <div className="flex items-center gap-3">
                <Icon className="text-lime" name="calendar" size={20} />
                <p className="text-sm font-semibold">Prefer to talk it through?</p>
              </div>
              <p className="mt-2 text-[0.82rem] leading-6 text-paper/55">
                Book a focused 20-minute intro call. No pitch deck, no obligation — just a useful
                conversation about the next move.
              </p>
              <a className="mt-4 inline-flex items-center gap-2 text-[0.8rem] font-semibold text-lime" href="/book">
                Book a call
                <Icon name="arrow-up-right" size={14} />
              </a>
            </div>
          </div>

          <ContactForm defaultEmail={user?.email ?? ""} defaultName={user?.name ?? ""} />
        </div>
      </section>

      <section className="shell py-14">
        <div className="grid gap-6 rounded-2xl border border-line bg-white p-6 sm:grid-cols-3 sm:p-8">
          {[
            { icon: "file-text", title: "Send the brief", text: "Any format works. A link to your site and a goal is plenty." },
            { icon: "users", title: "We reply with questions", text: "A strategist reads it and comes back with specifics within a day." },
            { icon: "rocket", title: "You get a clear plan", text: "Scope, timeline and what success will be measured against." },
          ].map((step, index) => (
            <div className="flex gap-4" key={step.title}>
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-paper text-brand">
                <Icon name={step.icon} size={16} />
              </span>
              <div>
                <p className="text-[0.7rem] font-semibold tracking-[0.12em] text-ink/30">STEP 0{index + 1}</p>
                <p className="mt-1 text-sm font-semibold text-ink">{step.title}</p>
                <p className="mt-1 text-[0.8rem] leading-5 text-ink/45">{step.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
