import { Icon } from "@/components/icons";
import { DeleteButton, ProjectForm, PublishToggle } from "@/components/forms/admin-forms";
import { PageHeading } from "@/components/portal/ui";
import { formatDate } from "@/lib/format";
import { listAllProjects } from "@/lib/portal";
import { requireAdmin } from "@/lib/session";

export default async function AdminPortfolioPage() {
  await requireAdmin();
  const projects = await listAllProjects();
  const published = projects.filter((item) => item.published).length;
  const featured = projects.filter((item) => item.featured).length;

  return (
    <div className="space-y-6">
      <PageHeading
        description="Add builds to the public portfolio. Featured projects are pulled forward on the site."
        eyebrow="Portfolio"
        title="Case studies & projects"
      />

      <div className="grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-line bg-white px-3 py-1.5 text-[0.72rem] font-medium text-ink/55">
              {projects.length} total
            </span>
            <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-[0.72rem] font-medium text-emerald-700">
              {published} published
            </span>
            <span className="rounded-full border border-line bg-cream px-3 py-1.5 text-[0.72rem] font-medium text-ink/55">
              {featured} featured
            </span>
          </div>

          {projects.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-line bg-white/50 p-10 text-center">
              <p className="text-[0.9rem] font-semibold text-ink">No projects yet.</p>
              <p className="mt-1 text-[0.78rem] text-ink/40">Add the first case study using the form.</p>
            </div>
          ) : (
            projects.map((item) => (
              <article className="rounded-2xl border border-line bg-white p-5" key={item.id}>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-brand-soft text-[0.62rem] font-semibold text-brand">
                      {item.title.slice(0, 2).toUpperCase()}
                    </span>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="text-[0.92rem] font-semibold text-ink">{item.title}</h2>
                        {item.featured ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-lime px-2 py-0.5 text-[0.58rem] font-semibold uppercase tracking-[0.08em] text-ink">
                            <Icon name="star" size={9} />
                            Featured
                          </span>
                        ) : null}
                      </div>
                      <p className="mt-0.5 text-[0.68rem] text-ink/35">
                        /{item.slug} · {item.category ?? "Uncategorised"} · {item.year ?? "Year TBC"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <PublishToggle endpoint="/api/projects" id={item.id} published={item.published} />
                    <DeleteButton endpoint="/api/projects" id={item.id} />
                  </div>
                </div>

                <p className="mt-3 text-[0.8rem] leading-6 text-ink/55">{item.summary}</p>

                <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-line pt-3 text-[0.68rem] text-ink/35">
                  {item.tags
                    ? item.tags.split(",").map((tag) => (
                        <span className="rounded-full bg-cream px-2 py-0.5 text-ink/50" key={tag}>
                          {tag.trim()}
                        </span>
                      ))
                    : null}
                  <span className="ml-auto">Added {formatDate(item.createdAt)}</span>
                </div>
              </article>
            ))
          )}
        </div>

        <div className="lg:sticky lg:top-6 lg:h-fit">
          <ProjectForm />
        </div>
      </div>
    </div>
  );
}
