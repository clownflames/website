import { Icon } from "@/components/icons";
import { ButtonLink } from "@/components/ui/button-link";
import { EmptyState, PageHeading, StatusBadge } from "@/components/portal/ui";
import { formatDateTime } from "@/lib/format";
import { getUserLeads } from "@/lib/portal";
import { requireUser } from "@/lib/session";

export default async function DashboardContactsPage() {
  const user = await requireUser("/dashboard/contacts");
  const leads = await getUserLeads(user.id, user.email);

  return (
    <div className="space-y-6">
      <PageHeading
        action={
          <ButtonLink href="/contact" size="md" variant="outline">
            <Icon name="plus" size={15} />
            New enquiry
          </ButtonLink>
        }
        description="Messages you have sent to the Erstian team. Replies arrive by email — usually within one working day."
        eyebrow="Enquiries"
        title="Your conversations"
      />

      {leads.length === 0 ? (
        <EmptyState
          action={
            <ButtonLink href="/contact" size="sm">
              Send a message
            </ButtonLink>
          }
          description="Questions about a project, a quote or a service? Start a conversation and a strategist will reply personally."
          icon="mail"
          title="No enquiries yet"
        />
      ) : (
        <div className="space-y-4">
          {leads.map((lead) => (
            <article className="rounded-2xl border border-line bg-white p-5 sm:p-6" key={lead.id}>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-brand-soft text-brand">
                    <Icon name="mail" size={15} />
                  </span>
                  <div>
                    <p className="text-[0.92rem] font-semibold text-ink">{lead.subject ?? "General enquiry"}</p>
                    <p className="mt-0.5 text-[0.7rem] text-ink/40">
                      Sent {formatDateTime(lead.createdAt)} · {lead.source.replace(/_/g, " ")}
                    </p>
                  </div>
                </div>
                <StatusBadge status={lead.status} />
              </div>

              <p className="mt-4 whitespace-pre-line border-t border-line pt-4 text-[0.84rem] leading-7 text-ink/65">
                {lead.message}
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.7rem] text-ink/40">
                <span className="inline-flex items-center gap-1.5">
                  <Icon name="users" size={12} />
                  {lead.name}
                </span>
                <a className="inline-flex items-center gap-1.5 font-medium text-brand hover:underline" href={"mailto:" + lead.email}>
                  <Icon name="mail" size={12} />
                  {lead.email}
                </a>
                {lead.phone ? (
                  <span className="inline-flex items-center gap-1.5">
                    <Icon name="phone" size={12} />
                    {lead.phone}
                  </span>
                ) : null}
                {lead.company ? (
                  <span className="inline-flex items-center gap-1.5">
                    <Icon name="building" size={12} />
                    {lead.company}
                  </span>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
