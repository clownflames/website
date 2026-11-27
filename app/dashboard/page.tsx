import Link from "next/link";
import { Icon } from "@/components/icons";
import { EmptyState, PageHeading, PortalLink, StatCard, StatusBadge } from "@/components/portal/ui";
import { ButtonLink } from "@/components/ui/button-link";
import { formatDate, formatDateTime } from "@/lib/format";
import { getUserAudits, getUserBookings, getUserBusinesses, getUserLeads } from "@/lib/portal";
import { requireUser } from "@/lib/session";

export default async function DashboardPage() {
  const user = await requireUser("/dashboard");
  const [businesses, audits, bookings, leads] = await Promise.all([
    getUserBusinesses(user.id),
    getUserAudits(user.id, user.email),
    getUserBookings(user.id, user.email),
    getUserLeads(user.id, user.email),
  ]);

  const firstName = user.name.split(" ")[0] || "there";
  const latestAudit = audits[0];
  const nextBooking = bookings.find((item) => item.status === "requested" || item.status === "confirmed") ?? bookings[0];

  return (
    <div className="space-y-7">
      <PageHeading
        action={
          <ButtonLink href="/dashboard/businesses" size="md">
            <Icon name="plus" size={16} />
            Add a business
          </ButtonLink>
        }
        description={"Here is everything happening across your workspace as of " + formatDate(new Date()) + "."}
        eyebrow="Your workspace"
        title={"Welcome back, " + firstName + "."}
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard hint="Businesses you manage" icon="building" label="Businesses" value={businesses.length} />
        <StatCard accent hint={audits.filter((a) => a.status === "pending").length + " awaiting review"} icon="file-text" label="Audit requests" value={audits.length} />
        <StatCard hint="Calls requested or confirmed" icon="calendar" label="Bookings" value={bookings.length} />
        <StatCard hint="Messages you have sent" icon="mail" label="Enquiries" value={leads.length} />
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
        <section className="rounded-2xl border border-line bg-white p-5 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-[1rem] font-semibold text-ink">Your businesses</h2>
              <p className="mt-0.5 text-[0.72rem] text-ink/40">Each one can be audited and tracked separately.</p>
            </div>
            <PortalLink href="/dashboard/businesses">
              Manage
            </PortalLink>
          </div>

          {businesses.length === 0 ? (
            <div className="mt-5">
              <EmptyState
                action={
                  <ButtonLink href="/dashboard/businesses" size="sm">
                    Add your first business
                  </ButtonLink>
                }
                description="Add a business to track its audits, enquiries and bookings in one place."
                icon="building"
                title="No businesses yet"
              />
            </div>
          ) : (
            <ul className="mt-4 divide-y divide-line">
              {businesses.slice(0, 4).map((item) => (
                <li className="flex items-center gap-3 py-3.5" key={item.id}>
                  <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-cream text-[0.68rem] font-semibold text-ink/60">
                    {item.name.slice(0, 2).toUpperCase()}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[0.85rem] font-semibold text-ink">{item.name}</p>
                    <p className="truncate text-[0.7rem] text-ink/40">
                      {[item.category, item.city].filter(Boolean).join(" · ") || "No category yet"}
                    </p>
                  </div>
                  <StatusBadge status={item.status} />
                </li>
              ))}
            </ul>
          )}
        </section>

        <div className="space-y-5">
          <section className="rounded-2xl border border-line bg-white p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-[1rem] font-semibold text-ink">Latest audit request</h2>
              <PortalLink href="/dashboard/audits" muted>
                All
              </PortalLink>
            </div>
            {latestAudit ? (
              <div className="mt-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[0.86rem] font-semibold text-ink">{latestAudit.businessName}</p>
                    <p className="mt-0.5 truncate text-[0.72rem] text-ink/40">{latestAudit.website}</p>
                  </div>
                  <StatusBadge status={latestAudit.status} />
                </div>
                <div className="mt-3 flex items-center justify-between border-t border-line pt-3 text-[0.7rem] text-ink/40">
                  <span>Submitted {formatDate(latestAudit.createdAt)}</span>
                  <span>{latestAudit.score ? "Score " + latestAudit.score + "/100" : "Awaiting score"}</span>
                </div>
                <Link
                  className="mt-3 inline-flex items-center gap-1.5 text-[0.72rem] font-semibold text-brand hover:text-ink"
                  href="/dashboard/audits"
                >
                  {latestAudit.status === "completed" ? "Read the report" : "View request"}
                  <Icon name="arrow-right" size={12} />
                </Link>
              </div>
            ) : (
              <div className="mt-3">
                <p className="text-[0.8rem] leading-6 text-ink/45">
                  You have not requested an audit yet. It is free, manual, and answered within 48 hours.
                </p>
                <ButtonLink className="mt-3" href="/free-audit" size="sm" variant="lime">
                  View my business — free
                </ButtonLink>
              </div>
            )}
          </section>

          <section className="rounded-2xl border border-line bg-white p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-[1rem] font-semibold text-ink">Next booking</h2>
              <PortalLink href="/dashboard/bookings" muted>
                All
              </PortalLink>
            </div>
            {nextBooking ? (
              <div className="mt-3">
                <div className="flex items-center gap-2 text-[0.82rem] font-semibold text-ink">
                  <Icon className="text-brand" name="calendar" size={15} />
                  {nextBooking.preferredDate ?? "Date to confirm"} · {nextBooking.preferredTime ?? ""}
                </div>
                <p className="mt-1 text-[0.72rem] text-ink/40">{nextBooking.service ?? "Intro call"}</p>
                <div className="mt-3 flex items-center justify-between border-t border-line pt-3">
                  <StatusBadge status={nextBooking.status} />
                  <span className="text-[0.68rem] text-ink/35">Requested {formatDate(nextBooking.createdAt)}</span>
                </div>
              </div>
            ) : (
              <div className="mt-3">
                <p className="text-[0.8rem] leading-6 text-ink/45">
                  No calls booked. Pick a slot and we will confirm within one working day.
                </p>
                <ButtonLink className="mt-3" href="/book" size="sm" variant="outline">
                  Book a call
                </ButtonLink>
              </div>
            )}
          </section>
        </div>
      </div>

      <section className="rounded-2xl border border-line bg-white p-5 sm:p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-[1rem] font-semibold text-ink">Recent enquiries</h2>
            <p className="mt-0.5 text-[0.72rem] text-ink/40">Messages sent from your account or email.</p>
          </div>
          <PortalLink href="/dashboard/contacts" muted>
            All
          </PortalLink>
        </div>
        {leads.length === 0 ? (
          <p className="mt-4 rounded-xl bg-paper px-4 py-3 text-[0.78rem] text-ink/45">
            No enquiries yet.{" "}
            <Link className="font-semibold text-brand" href="/contact">
              Start a conversation
            </Link>
            .
          </p>
        ) : (
          <ul className="mt-2 divide-y divide-line">
            {leads.slice(0, 3).map((lead) => (
              <li className="flex items-center gap-3 py-3" key={lead.id}>
                <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-brand-soft text-brand">
                  <Icon name="mail" size={14} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[0.8rem] font-medium text-ink">{lead.subject ?? "General enquiry"}</p>
                  <p className="truncate text-[0.68rem] text-ink/40">
                    {formatDateTime(lead.createdAt)} · {lead.message}
                  </p>
                </div>
                <StatusBadge status={lead.status} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
