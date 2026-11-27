import { StarRating } from "@/components/icons";
import { DeleteButton, PublishToggle } from "@/components/forms/admin-forms";
import { PageHeading } from "@/components/portal/ui";
import { formatDateTime } from "@/lib/format";
import { listAllReviews } from "@/lib/portal";
import { requireAdmin } from "@/lib/session";

export default async function AdminReviewsPage() {
  await requireAdmin();
  const reviews = await listAllReviews();
  const pending = reviews.filter((item) => !item.published);
  const live = reviews.filter((item) => item.published);

  return (
    <div className="space-y-7">
      <PageHeading
        description="Visitor-submitted reviews stay hidden until you verify them. Publish the genuine ones — with the name and company intact."
        eyebrow="Moderation"
        title="Client reviews"
      />

      <section>
        <div className="flex items-center gap-2">
          <h2 className="text-[1.05rem] font-semibold text-ink">Waiting for approval</h2>
          <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[0.66rem] font-semibold text-amber-700">
            {pending.length}
          </span>
        </div>
        {pending.length === 0 ? (
          <p className="mt-3 rounded-2xl border border-dashed border-line bg-white/50 px-5 py-8 text-center text-[0.8rem] text-ink/40">
            Nothing waiting. New submissions will appear here.
          </p>
        ) : (
          <div className="mt-4 grid gap-4 xl:grid-cols-2">
            {pending.map((item) => (
              <article className="rounded-2xl border border-amber-200/70 bg-white p-5" key={item.id}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <StarRating rating={item.rating} size={13} />
                    <p className="mt-1.5 text-[0.86rem] font-semibold text-ink">{item.authorName}</p>
                    <p className="text-[0.7rem] text-ink/40">
                      {[item.company, item.email].filter(Boolean).join(" · ") || "No contact details"}
                    </p>
                  </div>
                  <span className="rounded-full bg-amber-50 px-2.5 py-1 text-[0.62rem] font-semibold text-amber-700">Pending</span>
                </div>
                <p className="mt-3 whitespace-pre-line text-[0.82rem] leading-6 text-ink/65">{item.message}</p>
                <div className="mt-4 flex items-center justify-between border-t border-line pt-3">
                  <span className="text-[0.66rem] text-ink/30">{formatDateTime(item.createdAt)}</span>
                  <div className="flex items-center gap-2">
                    <PublishToggle endpoint="/api/reviews" id={item.id} labelOff="Approve" labelOn="Live" published={item.published} />
                    <DeleteButton endpoint="/api/reviews" id={item.id} />
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <section>
        <div className="flex items-center gap-2">
          <h2 className="text-[1.05rem] font-semibold text-ink">Published on the site</h2>
          <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[0.66rem] font-semibold text-emerald-700">{live.length}</span>
        </div>
        {live.length === 0 ? (
          <p className="mt-3 rounded-2xl border border-dashed border-line bg-white/50 px-5 py-8 text-center text-[0.8rem] text-ink/40">
            No published visitor reviews yet.
          </p>
        ) : (
          <div className="mt-4 grid gap-4 xl:grid-cols-2">
            {live.map((item) => (
              <article className="rounded-2xl border border-line bg-white p-5" key={item.id}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <StarRating rating={item.rating} size={13} />
                    <p className="mt-1.5 text-[0.86rem] font-semibold text-ink">{item.authorName}</p>
                    <p className="text-[0.7rem] text-ink/40">{[item.company, item.email].filter(Boolean).join(" · ")}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <PublishToggle endpoint="/api/reviews" id={item.id} labelOff="Approve" labelOn="Live" published={item.published} />
                    <DeleteButton endpoint="/api/reviews" id={item.id} />
                  </div>
                </div>
                <p className="mt-3 whitespace-pre-line text-[0.82rem] leading-6 text-ink/65">{item.message}</p>
                <p className="mt-3 border-t border-line pt-3 text-[0.66rem] text-ink/30">{formatDateTime(item.createdAt)}</p>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
