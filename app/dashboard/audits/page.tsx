import { Icon } from "@/components/icons";
import { ButtonLink } from "@/components/ui/button-link";
import { EmptyState, PageHeading, StatusBadge } from "@/components/portal/ui";
import { formatDate } from "@/lib/format";
import { getUserAudits } from "@/lib/portal";
import { requireUser } from "@/lib/session";

const steps = [
  { key: "pending", label: "Received" },
  { key: "in_review", label: "In review" },
  { key: "completed", label: "Report ready" },
];

export default async function DashboardAuditsPage() {
  const user = await requireUser("/dashboard/audits");
  const audits = await getUserAudits(user.id, user.email);

  return (
    <div className="space-y-6">
      <PageHeading
        action={
          <ButtonLink href="/free-audit" size="md">
            <Icon name="plus" size={15} />
            New audit request
          </ButtonLink>
        }
        description="Every request is reviewed manually by a strategist. Reports are delivered within 48 hours of submission."
        eyebrow="Audit requests"
        title="Your free business audits"
      />

      {audits.length === 0 ? (
        <EmptyState
          action={
            <ButtonLink href="/free-audit" size="sm">
              Request a free audit
            </ButtonLink>
          }
          description="Send us a website and we will review it manually — scored fundamentals, gaps worth fixing first, and growth ideas for the next 90 days."
          icon="file-text"
          title="No audit requests yet"
        />
      ) : (
        <div className="space-y-4">
          {audits.map((audit) => {
            const completed = audit.status === "completed";
            const currentStep = completed ? 2 : audit.status === "in_review" ? 1 : 0;
            return (
              <article className="overflow-hidden rounded-2xl border border-line bg-white" key={audit.id}>
                <div className="flex flex-col gap-3 border-b border-line p-5 sm:flex-row sm:items-start sm:justify-between sm:p-6">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <h2 className="text-[1.02rem] font-semibold text-ink">{audit.businessName}</h2>
                      <StatusBadge status={audit.status} />
                    </div>
                    <p className="mt-1 truncate text-[0.75rem] text-ink/40">{audit.website}</p>
                  </div>
                  <div className="shrink-0 text-left sm:text-right">
                    <p className="text-[0.66rem] uppercase tracking-[0.1em] text-ink/30">Submitted</p>
                    <p className="text-[0.78rem] font-medium text-ink/60">{formatDate(audit.createdAt)}</p>
                  </div>
                </div>

                <div className="grid gap-5 p-5 sm:p-6 lg:grid-cols-[1fr_1.4fr]">
                  <div>
                    <div className="flex items-center gap-1.5">
                      {steps.map((step, index) => (
                        <div className="flex flex-1 items-center gap-1.5" key={step.key}>
                          <span
                            className={
                              "grid size-6 shrink-0 place-items-center rounded-full text-[0.6rem] font-semibold " +
                              (index <= currentStep ? "bg-ink text-lime" : "bg-cream text-ink/35")
                            }
                          >
                            {index < currentStep ? <Icon name="check" size={10} /> : index + 1}
                          </span>
                          {index < steps.length - 1 ? (
                            <span className={"h-px flex-1 " + (index < currentStep ? "bg-ink" : "bg-line")} />
                          ) : null}
                        </div>
                      ))}
                    </div>
                    <div className="mt-2 flex justify-between text-[0.62rem] font-medium text-ink/40">
                      {steps.map((step) => (
                        <span key={step.key}>{step.label}</span>
                      ))}
                    </div>

                    <dl className="mt-5 space-y-2.5 text-[0.78rem]">
                      {audit.category ? (
                        <div>
                          <dt className="text-[0.62rem] uppercase tracking-[0.1em] text-ink/30">Focus</dt>
                          <dd className="mt-0.5 text-ink/65">{audit.category}</dd>
                        </div>
                      ) : null}
                      {audit.goals ? (
                        <div>
                          <dt className="text-[0.62rem] uppercase tracking-[0.1em] text-ink/30">Goal</dt>
                          <dd className="mt-0.5 text-ink/65">{audit.goals}</dd>
                        </div>
                      ) : null}
                      {audit.phone ? (
                        <div>
                          <dt className="text-[0.62rem] uppercase tracking-[0.1em] text-ink/30">Contact</dt>
                          <dd className="mt-0.5 text-ink/65">{audit.phone}</dd>
                        </div>
                      ) : null}
                    </dl>
                  </div>

                  <div className={"rounded-xl p-4 " + (completed ? "bg-paper" : "bg-cream/50")}>
                    {completed ? (
                      <div>
                        <div className="flex items-center justify-between gap-3">
                          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-ink/40">Audit report</p>
                          <span className="rounded-full bg-ink px-3 py-1 text-[0.72rem] font-semibold text-lime">
                            {audit.score ?? "—"}/100
                          </span>
                        </div>
                        {audit.summary ? (
                          <p className="mt-3 whitespace-pre-line text-[0.82rem] leading-6 text-ink/65">{audit.summary}</p>
                        ) : null}
                        {audit.growthIdeas ? (
                          <>
                            <p className="mt-4 text-[0.66rem] font-semibold uppercase tracking-[0.1em] text-ink/35">Growth ideas</p>
                            <p className="mt-1.5 whitespace-pre-line text-[0.8rem] leading-6 text-ink/55">{audit.growthIdeas}</p>
                          </>
                        ) : null}
                        <p className="mt-4 border-t border-line pt-3 text-[0.68rem] text-ink/35">
                          Delivered {formatDate(audit.respondedAt ?? audit.createdAt)} · reply to the email to discuss
                        </p>
                      </div>
                    ) : (
                      <div className="flex h-full flex-col justify-center">
                        <Icon className="text-brand/60" name="clock" size={20} />
                        <p className="mt-2.5 text-[0.86rem] font-semibold text-ink">A strategist is on it.</p>
                        <p className="mt-1 max-w-sm text-[0.78rem] leading-6 text-ink/50">
                          {audit.status === "in_review"
                            ? "Your website is being reviewed manually. You will get an email as soon as the report is ready."
                            : "You will hear back at " + audit.email + " within 48 hours with a scored snapshot and practical next steps."}
                        </p>
                        <p className="mt-3 text-[0.68rem] text-ink/35">
                          Need to add context? Write to hello@erstiantech.com with your business name.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
