import Link from "next/link";
import { Icon } from "@/components/icons";
import { DeleteButton, StatusSelect } from "@/components/forms/admin-forms";
import { PageHeading, StatusBadge } from "@/components/portal/ui";
import { formatDateTime } from "@/lib/format";
import { listAllLeads } from "@/lib/portal";
import { requireAdmin } from "@/lib/session";

const statusOptions = [
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "closed", label: "Closed" },
];

const filters = [
  { value: "all", label: "All" },
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "closed", label: "Closed" },
];

export default async function AdminLeadsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  await requireAdmin();
  const { status } = await searchParams;
  const active = filters.some((filter) => filter.value === status) ? (status as string) : "all";
  const all = await listAllLeads();
  const leads = active === "all" ? all : all.filter((lead) => lead.status === active);

  return (
    <div className="space-y-6">
      <PageHeading
        description="Every message from the site, with the person behind it. Reply by email, then move the status along."
        eyebrow="Enquiries"
        title="Inbox"
      />

      <div className="flex flex-wrap items-center gap-1.5">
        {filters.map((filter) => {
          const count = filter.value === "all" ? all.length : all.filter((lead) => lead.status === filter.value).length;
          return (
            <Link
              className={
                "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[0.72rem] font-medium transition-colors " +
                (active === filter.value ? "border-ink bg-ink text-paper" : "border-line bg-white text-ink/50 hover:text-ink")
              }
              href={filter.value === "all" ? "/admin/leads" : "/admin/leads?status=" + filter.value}
              key={filter.value}
            >
              {filter.label}
              <span className={"rounded-full px-1.5 text-[0.62rem] " + (active === filter.value ? "bg-white/15" : "bg-cream")}>
                {count}
              </span>
            </Link>
          );
        })}
      </div>

      {leads.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-line bg-white/50 p-10 text-center">
          <p className="text-[0.9rem] font-semibold text-ink">Inbox zero.</p>
          <p className="mt-1 text-[0.78rem] text-ink/40">No enquiries match this filter.</p>
        </div>
      ) : (
        <div className="grid gap-4 xl:grid-cols-2">
          {leads.map((lead) => (
            <article className="rounded-2xl border border-line bg-white p-5" key={lead.id}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-brand-soft text-[0.66rem] font-semibold text-brand">
                    {lead.name.slice(0, 2).toUpperCase()}
                  </span>
                  <div className="min-w-0">
                    <p className="text-[0.88rem] font-semibold text-ink">{lead.name}</p>
                    <p className="truncate text-[0.7rem] text-ink/40">
                      {lead.company ? lead.company + " · " : ""}
                      {lead.email}
                    </p>
                  </div>
                </div>
                <StatusBadge status={lead.status} />
              </div>

              <div className="mt-3 flex flex-wrap gap-1.5">
                <span className="rounded-full bg-cream px-2.5 py-1 text-[0.64rem] font-medium text-ink/50">
                  {lead.subject ?? "General enquiry"}
                </span>
                <span className="rounded-full bg-cream px-2.5 py-1 text-[0.64rem] font-medium text-ink/50">
                  {formatDateTime(lead.createdAt)}
                </span>
              </div>

              <p className="mt-3 whitespace-pre-line text-[0.8rem] leading-6 text-ink/60">{lead.message}</p>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-3">
                <div className="flex flex-wrap items-center gap-3 text-[0.7rem]">
                  <a className="inline-flex items-center gap-1.5 font-medium text-brand hover:underline" href={"mailto:" + lead.email}>
                    <Icon name="mail" size={12} />
                    Reply
                  </a>
                  {lead.phone ? (
                    <a className="inline-flex items-center gap-1.5 text-ink/50 hover:text-ink" href={"tel:" + lead.phone}>
                      <Icon name="phone" size={12} />
                      {lead.phone}
                    </a>
                  ) : null}
                </div>
                <div className="flex items-center gap-2">
                  <StatusSelect endpoint="/api/leads" id={lead.id} options={statusOptions} value={lead.status} />
                  <DeleteButton endpoint="/api/leads" id={lead.id} />
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
