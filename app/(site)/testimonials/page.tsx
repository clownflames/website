import type { Metadata } from "next";
import { Icon, StarRating } from "@/components/icons";
import { ReviewForm } from "@/components/forms/review-form";
import { CtaBand } from "@/components/site/cta-band";
import { getPublishedReviews, getTestimonials } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Client reviews & testimonials",
  description:
    "Read what founders and marketing teams say about working with Erstian Technologies — websites, campaigns, automation and software.",
};

export default async function TestimonialsPage() {
  const [testimonials, reviews] = await Promise.all([getTestimonials(), getPublishedReviews()]);

  const items = [
    ...testimonials.map((item) => ({
      id: item.id,
      name: item.authorName,
      company: item.company,
      role: item.role,
      quote: item.quote,
      rating: item.rating,
      verified: true,
    })),
    ...reviews.map((item) => ({
      id: item.id,
      name: item.authorName,
      company: item.company,
      role: "Verified client",
      quote: item.message,
      rating: item.rating,
      verified: true,
    })),
  ];
  const average = items.length
    ? Math.round((items.reduce((sum, item) => sum + item.rating, 0) / items.length) * 10) / 10
    : 5;

  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <div className="paper-grid pointer-events-none absolute inset-0 opacity-40 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
        <div className="shell relative grid gap-10 py-14 md:py-20 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <p className="eyebrow flex items-center gap-2 text-brand">
              <span className="inline-block size-1.5 rounded-full bg-brand" />
              Client reviews
            </p>
            <h1 className="mt-5 max-w-3xl text-balance text-[2.5rem] font-semibold leading-[0.98] tracking-[-0.045em] sm:text-5xl lg:text-[3.6rem]">
              Proof, in the words of the people who paid for it.
            </h1>
            <p className="mt-6 max-w-xl text-[1rem] leading-8 text-ink/60">
              No stock photos, no invented logos. These are real engagements — the brief, what we
              changed, and what happened next.
            </p>
          </div>

          <div className="rounded-2xl border border-line bg-white p-6">
            <div className="flex items-end gap-3">
              <p className="text-[3.2rem] font-semibold leading-none tracking-[-0.04em] text-ink">{average.toFixed(1)}</p>
              <div className="pb-1">
                <StarRating rating={Math.round(average)} size={16} />
                <p className="mt-1 text-xs text-ink/45">
                  Based on {items.length} verified {items.length === 1 ? "review" : "reviews"}
                </p>
              </div>
            </div>
            <div className="mt-5 space-y-2">
              {[5, 4, 3, 2, 1].map((star) => {
                const count = items.filter((item) => item.rating === star).length;
                const pct = items.length ? (count / items.length) * 100 : 0;
                return (
                  <div className="flex items-center gap-3 text-[0.7rem] text-ink/45" key={star}>
                    <span className="w-3 text-right">{star}</span>
                    <Icon className="text-ink/30" name="star" size={10} />
                    <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-line">
                      <span className="block h-full rounded-full bg-ink" style={{ width: pct + "%" }} />
                    </span>
                    <span className="w-3">{count}</span>
                  </div>
                );
              })}
            </div>
            <p className="mt-4 flex items-center gap-1.5 border-t border-line pt-3 text-[0.68rem] text-ink/40">
              <Icon name="shield" size={12} />
              Every review is checked by the team before publishing
            </p>
          </div>
        </div>
      </section>

      <section className="shell py-14 md:py-20">
        <div className="columns-1 gap-5 md:columns-2 lg:columns-3 [&>*]:mb-5">
          {items.map((item, index) => (
            <figure
              className="break-inside-avoid rounded-2xl border border-line bg-white p-6"
              key={item.id}
            >
              <div className="flex items-center justify-between">
                <StarRating rating={item.rating} size={13} />
                <Icon className="text-brand/25" name="quote" size={22} />
              </div>
              <blockquote className="mt-4 text-[0.94rem] leading-7 text-ink/75">“{item.quote}”</blockquote>
              <figcaption className="mt-5 flex items-center gap-3 border-t border-line pt-4">
                <span
                  className={
                    "grid size-9 shrink-0 place-items-center rounded-full text-[0.7rem] font-semibold " +
                    (index % 3 === 0
                      ? "bg-brand text-white"
                      : index % 3 === 1
                        ? "bg-ink text-lime"
                        : "bg-lime text-ink")
                  }
                >
                  {item.name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-[0.82rem] font-semibold text-ink">{item.name}</p>
                  <p className="truncate text-[0.7rem] text-ink/45">
                    {[item.role, item.company].filter(Boolean).join(" · ")}
                  </p>
                </div>
                {item.verified ? (
                  <span className="ml-auto flex shrink-0 items-center gap-1 rounded-full bg-cream px-2 py-1 text-[0.6rem] font-medium text-ink/45">
                    <Icon name="check" size={9} strokeWidth={2.6} />
                    Verified
                  </span>
                ) : null}
              </figcaption>
            </figure>
          ))}
        </div>
        {items.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-line p-10 text-center text-sm text-ink/45">
            Reviews are being verified. Check back soon.
          </p>
        ) : null}
      </section>

      <section className="border-y border-line bg-cream/50">
        <div className="shell grid gap-10 py-14 md:py-20 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <p className="eyebrow flex items-center gap-2 text-brand">
              <span className="inline-block size-1.5 rounded-full bg-brand" />
              Your turn
            </p>
            <h2 className="mt-4 text-balance text-[1.8rem] font-semibold leading-tight tracking-[-0.03em] sm:text-[2.2rem]">
              Worked with us? Tell the next founder.
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-7 text-ink/50">
              Honest reviews help small businesses choose the right partner. We read every one and
              publish them unedited after a quick verification.
            </p>
            <div className="mt-6 flex items-center gap-2 text-xs text-ink/40">
              <Icon name="clock" size={13} />
              Published within 48 hours of verification
            </div>
          </div>
          <ReviewForm />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
