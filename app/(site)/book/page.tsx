import type { Metadata } from "next";
import { Icon } from "@/components/icons";
import { BookingForm } from "@/components/forms/booking-form";
import { CtaBand } from "@/components/site/cta-band";
import { getCurrentUser } from "@/lib/session";

export const metadata: Metadata = {
  title: "Book a call",
  description:
    "Request a free 20-minute intro call with Erstian Technologies. Pick a slot and tell us what you want to fix.",
};

export default async function BookPage() {
  const user = await getCurrentUser();

  return (
    <>
      <section className="border-b border-line">
        <div className="shell grid gap-12 py-12 md:py-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <p className="eyebrow flex items-center gap-2 text-brand">
              <span className="inline-block size-1.5 rounded-full bg-brand" />
              Book a call
            </p>
            <h1 className="mt-5 text-balance text-[2.4rem] font-semibold leading-[1.0] tracking-[-0.045em] sm:text-5xl">
              Twenty minutes. A clear next step.
            </h1>
            <p className="mt-5 max-w-md text-[0.98rem] leading-8 text-ink/60">
              A short, focused conversation with someone who will actually work on your account.
              Bring your website, your numbers, or just the problem.
            </p>

            <div className="mt-8 space-y-4 border-t border-line pt-7">
              {[
                { icon: "target", title: "What we cover", text: "Your goal, the current funnel, and the highest-leverage fix." },
                { icon: "users", title: "Who you speak to", text: "A strategist — not a salesperson reading a script." },
                { icon: "file-text", title: "What you leave with", text: "A suggested scope and honest feedback, whether we work together or not." },
                { icon: "clock", title: "How long", text: "20 minutes on Google Meet or a phone call. IST business hours." },
              ].map((item) => (
                <div className="flex gap-3.5" key={item.title}>
                  <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-lg bg-white text-brand ring-1 ring-line">
                    <Icon name={item.icon} size={15} />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-ink">{item.title}</p>
                    <p className="mt-0.5 text-[0.82rem] leading-5 text-ink/45">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-8 rounded-xl border border-line bg-cream/60 p-4 text-xs leading-5 text-ink/50">
              Slots are confirmed by email within one working day. If none of the times work, choose
              the closest one and tell us in the note — we will find an alternative.
            </p>
          </div>

          <BookingForm defaultEmail={user?.email ?? ""} defaultName={user?.name ?? ""} />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
