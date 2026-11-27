import Link from "next/link";
import { Icon } from "@/components/icons";
import { AuditReportForm, DeleteButton, StatusSelect } from "@/components/forms/admin-forms";
import { PageHeading, StatusBadge } from "@/components/portal/ui";
import { formatDate } from "@/lib/format";
import { listAllAudits } from "@/lib/portal";
import { requireAdmin } from "@/lib/session";

const statusOptions = [
  { value: "pending", label: "Pending" },
  { value: "in_review", label: "In review" },
  { value: "completed", label: "Completed" },
];

const filters = [
  { value: "all", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "in_review", label: "In review" },
  { value: "completed", label: "Completed" },
];

export default async function AdminAuditsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  await requireAdmin();
  const { status } = await searchParams;
  const active = filters.some((filter) => filter.value === status) ? (status as string) : "all";
  const all = await listAllAudits();
  const audits = active === "all" ? all : all.filter((audit) => audit.status === active);
  const pending = all.filter((audit) => audit.status === "pending").length;

  return (
    <div className="space-y-6">
      <PageHeading
        description="Read the website, fill in a score and growth ideas, then mark it complete. The client sees the report immediately."
        eyebrow="Audit requests"
        title="Free business audits"
      />

      <div className="flex flex-wrap items-center gap-1.5">
        {filters.map((filter) => {
          const count = filter.value === "all" ? all.length : all.filter((audit) => audit.status === filter.value).length;
          return (
            <Link
              className={
                "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[0.72rem] font-medium transition-colors " +
                (active === filter.value
                  ? "border-ink bg-ink text-paper"
                  : "border-line bg-white text-ink/50 hover:text-ink")
              }
              href={filter.value === "all" ? "/admin/audits" : "/admin/audits?status=" + filter.value}
              key={filter.value}
            >
              {filter.label}
              <span className={"rounded-full px-1.5 text-[0.62rem] " + (active === filter.value ? "bg-white/15" : "bg-cream")}>
                {count}
              </span>
            </Link>
          );
        })}
        <span className="ml-auto text-[0.7rem] text-ink/40">
          {pending > 0 ? pending + " waiting for review" : "Inbox clear"}
        </span>
      </div>

      {audits.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-line bg-white/50 p-10 text-center">
          <p className="text-[0.9rem] font-semibold text-ink">Nothing here.</p>
          <p className="mt-1 text-[0.78rem] text-ink/40">No audit requests match this filter.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {audits.map((audit) => (
            <article className="rounded-2xl border border-line bg-white" key={audit.id}>
              <div className="flex flex-col gap-3 border-b border-line p-5 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-[1rem] font-semibold text-ink">{audit.businessName}</h2>
                    <StatusBadge status={audit.status} />
                  </div>
                  <p className="mt-1 text-[0.72rem] text-ink/40">
                    {audit.category ?? "General"} · {audit.city ?? "City not shared"} · submitted {formatDate(audit.createdAt)}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <StatusSelect endpoint="/api/audits" id={audit.id} options={statusOptions} value={audit.status} />
                  <DeleteButton endpoint="/api/audits" id={audit.id} />
                </div>
              </div>

              <div className="grid gap-5 p-5 lg:grid-cols-[0.75fr_1.25fr]">
                <div className="space-y-3">
                  <div className="rounded-xl bg-paper p-3.5">
                    <p className="text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-ink/30">Contact</p>
                    <p className="mt-1.5 text-[0.84rem] font-semibold text-ink">{audit.contactName}</p>
                    <a className="mt-0.5 block truncate text-[0.74rem] text-brand hover:underline" href={"mailto:" + audit.email}>
                      {audit.email}
                    </a>
                    {audit.phone ? <p className="mt-0.5 text-[0.74rem] text-ink/50">{audit.phone}</p> : null}
                    <a
                      className="mt-2 inline-flex items-center gap-1.5 text-[0.72rem] font-medium text-ink/60 hover:text-ink"
                      href={audit.website.startsWith("http") ? audit.website : "https://" + audit.website}
                      rel="noreferrer"
                      target="_blank"
                    >
                      <Icon name="globe" size={12} />
                      Open website
                      <Icon name="external" size={10} />
                    </a>
                  </div>

                  <div>
                    <p className="text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-ink/30">Goal</p>
                    <p className="mt-1 text-[0.78rem] leading-6 text-ink/60">{audit.goals ?? "Not shared"}</p>
                  </div>
                  <div>
                    <p className="text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-ink/30">Current challenges</p>
                    <p className="mt-1 whitespace-pre-line text-[0.78rem] leading-6 text-ink/60">{audit.challenges ?? "Not shared"}</p>
                  </div>
                </div>

                <AuditReportForm
                  growthIdeas={audit.growthIdeas}
                  id={audit.id}
                  score={audit.score}
                  status={audit.status}
                  summary={audit.summary}
                />
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
