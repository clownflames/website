import { StarRating } from "@/components/icons";
import { DeleteButton, PublishToggle, TestimonialForm } from "@/components/forms/admin-forms";
import { PageHeading } from "@/components/portal/ui";
import { formatDate } from "@/lib/format";
import { listAllTestimonials } from "@/lib/portal";
import { requireAdmin } from "@/lib/session";

export default async function AdminTestimonialsPage() {
  await requireAdmin();
  const testimonials = await listAllTestimonials();
  const published = testimonials.filter((item) => item.published).length;

  return (
    <div className="space-y-6">
      <PageHeading
        description="Curated client quotes shown on the homepage and the reviews page. Keep them short, specific and honest."
        eyebrow="Social proof"
        title="Testimonials"
      />

      <div className="grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="rounded-full border border-line bg-white px-3 py-1.5 text-[0.72rem] font-medium text-ink/55">
              {testimonials.length} total
            </span>
            <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-[0.72rem] font-medium text-emerald-700">
              {published} published
            </span>
          </div>

          {testimonials.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-line bg-white/50 p-10 text-center">
              <p className="text-[0.9rem] font-semibold text-ink">No testimonials yet.</p>
              <p className="mt-1 text-[0.78rem] text-ink/40">Add the first one using the form.</p>
            </div>
          ) : (
            testimonials.map((item) => (
              <article className="rounded-2xl border border-line bg-white p-5" key={item.id}>
                <div className="flex items-start justify-between gap-3">
                  <StarRating rating={item.rating} size={13} />
                  <div className="flex items-center gap-2">
                    <PublishToggle endpoint="/api/testimonials" id={item.id} published={item.published} />
                    <DeleteButton endpoint="/api/testimonials" id={item.id} />
                  </div>
                </div>
                <blockquote className="mt-3 text-[0.86rem] leading-7 text-ink/70">“{item.quote}”</blockquote>
                <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-line pt-3 text-[0.7rem]">
                  <span className="font-semibold text-ink">{item.authorName}</span>
                  <span className="text-ink/40">{[item.role, item.company].filter(Boolean).join(" · ")}</span>
                  <span className="ml-auto text-ink/30">{formatDate(item.createdAt)}</span>
                </div>
              </article>
            ))
          )}
        </div>

        <div className="lg:sticky lg:top-6 lg:h-fit">
          <TestimonialForm />
        </div>
      </div>
    </div>
  );
}
