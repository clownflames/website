import { Icon } from "@/components/icons";
import { PageHeading } from "@/components/portal/ui";
import { formatDate } from "@/lib/format";
import { listAllBusinesses } from "@/lib/portal";
import { requireAdmin } from "@/lib/session";

export const metadata = { title: "Businesses" };

export default async function AdminBusinessesPage() {
  await requireAdmin();
  const businesses = await listAllBusinesses();

  return (
    <div className="space-y-6">
      <PageHeading
        description="Every business clients have added to their workspace, with the owner behind it."
        eyebrow="Client workspace"
        title="Businesses"
      />

      <div className="flex flex-wrap items-center gap-2 text-[0.7rem] text-ink/40">
        <span className="rounded-full border border-line bg-white px-2.5 py-1 font-medium text-ink/60">
          {businesses.length} total
        </span>
        <span className="rounded-full border border-line bg-white px-2.5 py-1 font-medium text-ink/60">
          {new Set(businesses.map((item) => item.ownerId)).size} owners
        </span>
      </div>

      {businesses.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-line bg-white/50 p-10 text-center">
          <p className="text-[0.9rem] font-semibold text-ink">No businesses yet.</p>
          <p className="mt-1 text-[0.78rem] text-ink/40">Businesses appear here when clients add them from their dashboard.</p>
        </div>
      ) : (
        <div className="grid gap-4 xl:grid-cols-2">
          {businesses.map((item) => (
            <article className="rounded-2xl border border-line bg-white p-5" key={item.id}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-cream text-[0.66rem] font-semibold text-ink/55">
                    {item.name.slice(0, 2).toUpperCase()}
                  </span>
                  <div className="min-w-0">
                    <p className="text-[0.9rem] font-semibold text-ink">{item.name}</p>
                    <p className="truncate text-[0.7rem] text-ink/40">
                      {[item.category, item.city].filter(Boolean).join(" · ") || "No category added"}
                    </p>
                  </div>
                </div>
                <span className="shrink-0 rounded-full bg-cream px-2.5 py-1 text-[0.62rem] font-medium text-ink/45">
                  {formatDate(item.createdAt)}
                </span>
              </div>

              {item.website ? (
                <a
                  className="mt-3 inline-flex items-center gap-1.5 text-[0.72rem] font-medium text-brand hover:underline"
                  href={item.website}
                  rel="noreferrer"
                  target="_blank"
                >
                  <Icon name="external" size={12} />
                  {item.website.replace(/^https?:\/\//, "")}
                </a>
              ) : null}

              {item.description ? (
                <p className="mt-3 line-clamp-3 text-[0.8rem] leading-6 text-ink/60">{item.description}</p>
              ) : null}

              {item.goals ? (
                <p className="mt-2 rounded-lg bg-paper px-3 py-2 text-[0.72rem] leading-5 text-ink/50">
                  <span className="font-semibold text-ink/60">Goal:</span> {item.goals}
                </p>
              ) : null}

              <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-line pt-3 text-[0.7rem] text-ink/40">
                <span className="min-w-0 truncate">
                  <span className="font-medium text-ink/60">{item.ownerName ?? "Unknown owner"}</span>
                  {item.ownerEmail ? " · " + item.ownerEmail : ""}
                </span>
                {item.ownerEmail ? (
                  <a className="inline-flex shrink-0 items-center gap-1.5 font-medium text-brand hover:underline" href={"mailto:" + item.ownerEmail}>
                    <Icon name="mail" size={12} />
                    Contact
                  </a>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
