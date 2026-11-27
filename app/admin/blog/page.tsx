import { Icon } from "@/components/icons";
import { DeleteButton, PostForm, PublishToggle } from "@/components/forms/admin-forms";
import { PageHeading } from "@/components/portal/ui";
import { formatDate } from "@/lib/format";
import { listAllPosts } from "@/lib/portal";
import { requireAdmin } from "@/lib/session";

export default async function AdminBlogPage() {
  await requireAdmin();
  const posts = await listAllPosts();
  const published = posts.filter((item) => item.published).length;

  return (
    <div className="space-y-6">
      <PageHeading
        description="Write practical articles for business owners. Published pieces appear on the public journal and homepage."
        eyebrow="Journal"
        title="Blog & content"
      />

      <div className="grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="rounded-full border border-line bg-white px-3 py-1.5 text-[0.72rem] font-medium text-ink/55">
              {posts.length} total
            </span>
            <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-[0.72rem] font-medium text-emerald-700">
              {published} published
            </span>
          </div>

          {posts.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-line bg-white/50 p-10 text-center">
              <p className="text-[0.9rem] font-semibold text-ink">No articles yet.</p>
              <p className="mt-1 text-[0.78rem] text-ink/40">Write the first one using the form.</p>
            </div>
          ) : (
            posts.map((item) => (
              <article className="rounded-2xl border border-line bg-white p-5" key={item.id}>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-cream text-ink/40">
                      <Icon name="file-text" size={15} />
                    </span>
                    <div>
                      <h2 className="text-[0.92rem] font-semibold text-ink">{item.title}</h2>
                      <p className="mt-0.5 text-[0.68rem] text-ink/35">
                        /{item.slug} · {item.category ?? "Uncategorised"} · {item.readMinutes} min · {formatDate(item.publishedAt)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <PublishToggle endpoint="/api/posts" id={item.id} published={item.published} />
                    <DeleteButton endpoint="/api/posts" id={item.id} />
                  </div>
                </div>

                <p className="mt-3 text-[0.8rem] leading-6 text-ink/55">{item.excerpt}</p>

                <details className="mt-3 border-t border-line pt-3">
                  <summary className="cursor-pointer list-none text-[0.7rem] font-semibold text-ink/40 hover:text-ink">
                    Preview body ({item.content.length.toLocaleString()} characters)
                  </summary>
                  <p className="mt-2 max-h-64 overflow-y-auto whitespace-pre-line rounded-lg bg-paper p-3 text-[0.74rem] leading-6 text-ink/55">
                    {item.content}
                  </p>
                </details>

                <div className="mt-3 flex items-center justify-between border-t border-line pt-3 text-[0.66rem] text-ink/30">
                  <span>By {item.author}</span>
                  <span>Created {formatDate(item.createdAt)}</span>
                </div>
              </article>
            ))
          )}
        </div>

        <div className="lg:sticky lg:top-6 lg:h-fit">
          <PostForm />
        </div>
      </div>
    </div>
  );
}
