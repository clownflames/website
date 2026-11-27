import Link from "next/link";
import { Icon } from "@/components/icons";
import { PageHeading, PortalLink, StatCard, StatusBadge } from "@/components/portal/ui";
import { ButtonLink } from "@/components/ui/button-link";
import { formatDate, formatDateTime } from "@/lib/format";
import { getAdminCounts, listAllAudits, listAllLeads, listUsers } from "@/lib/portal";
import { requireAdmin } from "@/lib/session";

export default async function AdminPage() {
  await requireAdmin();
  const [counts, audits, leads, users] = await Promise.all([
    getAdminCounts(),
    listAllAudits(),
    listAllLeads(),
    listUsers(),
  ]);

  const content = [
    { label: "Testimonials", value: counts.testimonials, href: "/admin/testimonials", icon: "star" },
    { label: "Reviews", value: counts.pendingReviews + " pending", href: "/admin/reviews", icon: "quote" },
    { label: "Projects", value: counts.projects, href: "/admin/portfolio", icon: "layers" },
    { label: "Articles", value: counts.posts, href: "/admin/blog", icon: "edit" },
  ];

  return (
    <div className="space-y-7">
      <PageHeading
        action={
          <ButtonLink href="/" target="_blank" variant="outline">
            View website
            <Icon name="external" size={14} />
          </ButtonLink>
        }
        description="Audit requests, enquiries, bookings and content — the operating view of the business."
        eyebrow="Admin console"
        title="The whole business, at a glance."
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard accent hint="Waiting for a manual review" icon="file-text" label="Pending audits" value={counts.pendingAudits} />
        <StatCard hint="Unread enquiries" icon="mail" label="New enquiries" value={counts.newLeads} />
        <StatCard hint="Awaiting confirmation" icon="calendar" label="Booking requests" value={counts.openBookings} />
        <StatCard hint="Need moderation" icon="quote" label="Reviews to approve" value={counts.pendingReviews} />
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {content.map((item) => (
          <Link
            className="group flex items-center justify-between rounded-2xl border border-line bg-white p-4 transition-colors hover:border-ink/20"
            href={item.href}
            key={item.label}
          >
            <div className="flex items-center gap-3">
              <span className="grid size-9 place-items-center rounded-lg bg-cream text-ink/45">
                <Icon name={item.icon} size={15} />
              </span>
              <div>
                <p className="text-[0.7rem] font-medium text-ink/40">{item.label}</p>
                <p className="text-[0.9rem] font-semibold text-ink">{item.value}</p>
              </div>
            </div>
            <Icon className="text-ink/25 group-hover:text-brand" name="arrow-right" size={14} />
          </Link>
        ))}
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
        <section className="rounded-2xl border border-line bg-white p-5 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-[1rem] font-semibold text-ink">Latest audit requests</h2>
              <p className="mt-0.5 text-[0.72rem] text-ink/40">Reviewed manually — respond within 48 hours.</p>
            </div>
            <PortalLink href="/admin/audits">All</PortalLink>
          </div>
          {audits.length === 0 ? (
            <p className="mt-4 rounded-xl bg-paper px-4 py-3 text-[0.78rem] text-ink/45">No audit requests yet.</p>
          ) : (
            <div className="-mx-1 mt-3 overflow-x-auto">
              <table className="w-full min-w-[34rem] text-left text-[0.78rem]">
                <thead>
                  <tr className="text-[0.62rem] uppercase tracking-[0.1em] text-ink/30">
                    <th className="px-1 py-2 font-semibold">Business</th>
                    <th className="px-1 py-2 font-semibold">Contact</th>
                    <th className="px-1 py-2 font-semibold">Submitted</th>
                    <th className="px-1 py-2 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {audits.slice(0, 5).map((audit) => (
                    <tr key={audit.id}>
                      <td className="px-1 py-3">
                        <p className="font-semibold text-ink">{audit.businessName}</p>
                        <p className="text-[0.68rem] text-ink/35">{audit.category ?? "General"}</p>
                      </td>
                      <td className="px-1 py-3">
                        <a className="text-ink/60 hover:text-brand" href={"mailto:" + audit.email}>
                          {audit.email}
                        </a>
                      </td>
                      <td className="px-1 py-3 text-ink/45">{formatDate(audit.createdAt)}</td>
                      <td className="px-1 py-3">
                        <StatusBadge status={audit.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <section className="rounded-2xl border border-line bg-white p-5 sm:p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-[1rem] font-semibold text-ink">Fresh enquiries</h2>
            <PortalLink href="/admin/leads">All</PortalLink>
          </div>
          {leads.length === 0 ? (
            <p className="mt-4 rounded-xl bg-paper px-4 py-3 text-[0.78rem] text-ink/45">No enquiries yet.</p>
          ) : (
            <ul className="mt-3 divide-y divide-line">
              {leads.slice(0, 4).map((lead) => (
                <li className="py-3" key={lead.id}>
                  <div className="flex items-center justify-between gap-3">
                    <p className="truncate text-[0.8rem] font-semibold text-ink">{lead.name}</p>
                    <StatusBadge status={lead.status} />
                  </div>
                  <p className="mt-0.5 truncate text-[0.7rem] text-ink/40">{lead.subject ?? "General enquiry"}</p>
                  <p className="mt-1 line-clamp-2 text-[0.72rem] leading-5 text-ink/50">{lead.message}</p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
        <section className="rounded-2xl border border-line bg-white p-5 sm:p-6">
          <h2 className="text-[1rem] font-semibold text-ink">Accounts</h2>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <div className="rounded-xl bg-paper p-3">
              <p className="text-[0.62rem] uppercase tracking-[0.1em] text-ink/30">Users</p>
              <p className="mt-1 text-[1.2rem] font-semibold text-ink">{counts.users}</p>
            </div>
            <div className="rounded-xl bg-paper p-3">
              <p className="text-[0.62rem] uppercase tracking-[0.1em] text-ink/30">Businesses</p>
              <p className="mt-1 text-[1.2rem] font-semibold text-ink">{counts.businesses}</p>
            </div>
          </div>
          <ul className="mt-4 space-y-2.5">
            {users.slice(0, 5).map((account) => (
              <li className="flex items-center gap-2.5" key={account.id}>
                <span className="grid size-7 shrink-0 place-items-center rounded-full bg-brand-soft text-[0.6rem] font-semibold text-brand">
                  {(account.name || account.email).slice(0, 2).toUpperCase()}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[0.76rem] font-medium text-ink">{account.name || "Unnamed"}</p>
                  <p className="truncate text-[0.66rem] text-ink/35">{account.email}</p>
                </div>
                <span className="rounded-full bg-cream px-2 py-0.5 text-[0.6rem] font-semibold capitalize text-ink/45">
                  {account.role ?? "user"}
                </span>
              </li>
            ))}
            {users.length === 0 ? <li className="text-[0.78rem] text-ink/40">No accounts yet.</li> : null}
          </ul>
        </section>

        <section className="rounded-2xl border border-ink bg-ink p-5 text-paper sm:p-6">
          <div className="flex items-center gap-2 text-lime">
            <Icon name="sparkle" size={15} />
            <p className="text-[0.66rem] font-semibold uppercase tracking-[0.12em]">Daily routine</p>
          </div>
          <h2 className="mt-3 text-[1.25rem] font-semibold tracking-[-0.02em]">Keep the promise: 48 hours.</h2>
          <p className="mt-1.5 max-w-md text-[0.8rem] leading-6 text-paper/50">
            Every free audit is a live lead. Review the website, fill the report, and mark it complete —
            the client sees it instantly in their dashboard.
          </p>
          <ol className="mt-5 space-y-3">
            {[
              { href: "/admin/audits", label: "Review pending audit requests" },
              { href: "/admin/leads", label: "Reply to new enquiries" },
              { href: "/admin/bookings", label: "Confirm call slots" },
              { href: "/admin/reviews", label: "Approve verified reviews" },
            ].map((item, index) => (
              <li key={item.href}>
                <Link className="group flex items-center gap-3" href={item.href}>
                  <span className="grid size-6 shrink-0 place-items-center rounded-full border border-white/15 text-[0.6rem] font-semibold text-paper/50 group-hover:border-lime group-hover:text-lime">
                    {index + 1}
                  </span>
                  <span className="text-[0.8rem] text-paper/65 group-hover:text-paper">{item.label}</span>
                  <Icon className="ml-auto text-paper/20 group-hover:text-lime" name="arrow-right" size={13} />
                </Link>
              </li>
            ))}
          </ol>
          <p className="mt-5 border-t border-white/10 pt-3 text-[0.66rem] text-paper/30">
            Newest account {users[0] ? formatDateTime(users[0].createdAt) : "—"}
          </p>
        </section>
      </div>
    </div>
  );
}
