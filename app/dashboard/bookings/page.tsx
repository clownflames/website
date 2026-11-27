import { Icon } from "@/components/icons";
import { ButtonLink } from "@/components/ui/button-link";
import { EmptyState, PageHeading, StatusBadge } from "@/components/portal/ui";
import { formatDate, formatDateTime } from "@/lib/format";
import { getUserBookings } from "@/lib/portal";
import { requireUser } from "@/lib/session";

export default async function DashboardBookingsPage() {
  const user = await requireUser("/dashboard/bookings");
  const bookings = await getUserBookings(user.id, user.email);

  return (
    <div className="space-y-6">
      <PageHeading
        action={
          <ButtonLink href="/book" size="md">
            <Icon name="calendar" size={15} />
            Book a call
          </ButtonLink>
        }
        description="Slots you have requested for an intro call. We confirm every booking by email within one working day."
        eyebrow="Bookings"
        title="Calls and meetings"
      />

      {bookings.length === 0 ? (
        <EmptyState
          action={
            <ButtonLink href="/book" size="sm">
              Find a slot
            </ButtonLink>
          }
          description="A focused 20-minute conversation about your goals, current funnel and the highest-leverage next step."
          icon="calendar"
          title="No calls booked"
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {bookings.map((item) => (
            <article className="rounded-2xl border border-line bg-white p-5" key={item.id}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-ink text-lime">
                    <Icon name="calendar" size={18} />
                  </span>
                  <div>
                    <p className="text-[0.92rem] font-semibold text-ink">{formatDate(item.preferredDate)}</p>
                    <p className="text-[0.72rem] text-ink/45">{item.preferredTime ?? "Time to confirm"}</p>
                  </div>
                </div>
                <StatusBadge status={item.status} />
              </div>

              <dl className="mt-4 space-y-2 border-t border-line pt-3 text-[0.76rem]">
                <div className="flex justify-between gap-3">
                  <dt className="text-ink/35">Topic</dt>
                  <dd className="text-right font-medium text-ink/65">{item.service ?? "General consultation"}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-ink/35">Requested</dt>
                  <dd className="text-right font-medium text-ink/65">{formatDateTime(item.createdAt)}</dd>
                </div>
                {item.phone ? (
                  <div className="flex justify-between gap-3">
                    <dt className="text-ink/35">Phone</dt>
                    <dd className="text-right font-medium text-ink/65">{item.phone}</dd>
                  </div>
                ) : null}
              </dl>

              {item.message ? (
                <p className="mt-3 rounded-lg bg-paper px-3 py-2 text-[0.75rem] leading-5 text-ink/55">{item.message}</p>
              ) : null}

              <p className="mt-3 text-[0.66rem] text-ink/35">
                {item.status === "confirmed"
                  ? "Confirmed — a calendar invite has been sent to your email."
                  : item.status === "completed"
                    ? "Completed. Thanks for the conversation."
                    : item.status === "cancelled"
                      ? "Cancelled. Book a new slot any time."
                      : "Awaiting confirmation. We will email a meeting link shortly."}
              </p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
