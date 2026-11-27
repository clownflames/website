import { Icon } from "@/components/icons";
import { DeleteButton, StatusSelect } from "@/components/forms/admin-forms";
import { PageHeading, StatusBadge } from "@/components/portal/ui";
import { formatDate, formatDateTime } from "@/lib/format";
import { listAllBookings } from "@/lib/portal";
import { requireAdmin } from "@/lib/session";

const statusOptions = [
  { value: "requested", label: "Requested" },
  { value: "confirmed", label: "Confirmed" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
];

export default async function AdminBookingsPage() {
  await requireAdmin();
  const bookings = await listAllBookings();
  const open = bookings.filter((booking) => booking.status === "requested").length;

  return (
    <div className="space-y-6">
      <PageHeading
        description="Confirm requested slots and send the meeting link. Slots are held for 24 hours."
        eyebrow="Bookings"
        title="Calls and meetings"
      />

      <div className="flex items-center gap-3">
        <span className="rounded-full border border-line bg-white px-3 py-1.5 text-[0.72rem] font-medium text-ink/55">
          {bookings.length} total
        </span>
        <span className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-[0.72rem] font-medium text-amber-700">
          {open} awaiting confirmation
        </span>
      </div>

      {bookings.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-line bg-white/50 p-10 text-center">
          <p className="text-[0.9rem] font-semibold text-ink">No bookings yet.</p>
          <p className="mt-1 text-[0.78rem] text-ink/40">Requests from the /book page will appear here.</p>
        </div>
      ) : (
        <div className="grid gap-4 xl:grid-cols-2">
          {bookings.map((booking) => (
            <article className="rounded-2xl border border-line bg-white p-5" key={booking.id}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-ink text-lime">
                    <Icon name="calendar" size={18} />
                  </span>
                  <div>
                    <p className="text-[0.9rem] font-semibold text-ink">
                      {formatDate(booking.preferredDate)} · {booking.preferredTime ?? "Time TBC"}
                    </p>
                    <p className="text-[0.7rem] text-ink/40">{booking.service ?? "General consultation"}</p>
                  </div>
                </div>
                <StatusBadge status={booking.status} />
              </div>

              <div className="mt-4 grid gap-2 rounded-xl bg-paper p-3.5 text-[0.76rem]">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-ink/35">Name</span>
                  <span className="font-medium text-ink/70">{booking.name}</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-ink/35">Email</span>
                  <a className="truncate font-medium text-brand hover:underline" href={"mailto:" + booking.email}>
                    {booking.email}
                  </a>
                </div>
                {booking.phone ? (
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-ink/35">Phone</span>
                    <a className="font-medium text-ink/70 hover:text-ink" href={"tel:" + booking.phone}>
                      {booking.phone}
                    </a>
                  </div>
                ) : null}
                <div className="flex items-center justify-between gap-3">
                  <span className="text-ink/35">Requested</span>
                  <span className="font-medium text-ink/70">{formatDateTime(booking.createdAt)}</span>
                </div>
              </div>

              {booking.message ? (
                <p className="mt-3 text-[0.78rem] leading-6 text-ink/55">{booking.message}</p>
              ) : null}

              <div className="mt-4 flex items-center justify-between gap-2 border-t border-line pt-3">
                <StatusSelect endpoint="/api/bookings" id={booking.id} options={statusOptions} value={booking.status} />
                <DeleteButton endpoint="/api/bookings" id={booking.id} />
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
