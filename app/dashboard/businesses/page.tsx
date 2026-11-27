import Link from "next/link";
import { Icon } from "@/components/icons";
import { BusinessForm, DeleteBusinessButton } from "@/components/forms/business-form";
import { EmptyState, PageHeading } from "@/components/portal/ui";
import { ButtonLink } from "@/components/ui/button-link";
import { formatDate } from "@/lib/format";
import { getUserBusinesses } from "@/lib/portal";
import { requireUser } from "@/lib/session";

export default async function DashboardBusinessesPage() {
  const user = await requireUser("/dashboard/businesses");
  const businesses = await getUserBusinesses(user.id);

  return (
    <div className="space-y-6">
      <PageHeading
        action={
          <ButtonLink href="/free-audit" size="md" variant="outline">
            Free audit
            <Icon name="arrow-up-right" size={15} />
          </ButtonLink>
        }
        description="Keep the core details of each business here so audits, enquiries and bookings stay connected."
        eyebrow="Businesses"
        title="My businesses"
      />

      <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-4">
          {businesses.length === 0 ? (
            <EmptyState
              description="Add your first business using the form. You can add as many as you manage — each one is tracked separately."
              icon="building"
              title="No businesses added yet"
            />
          ) : (
            businesses.map((item) => (
              <article className="rounded-2xl border border-line bg-white p-5 sm:p-6" key={item.id}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex min-w-0 items-start gap-3">
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-cream text-[0.72rem] font-semibold text-ink/60">
                      {item.name.slice(0, 2).toUpperCase()}
                    </span>
                    <div className="min-w-0">
                      <h2 className="truncate text-[1rem] font-semibold text-ink">{item.name}</h2>
                      <p className="mt-0.5 truncate text-[0.72rem] text-ink/40">
                        {[item.category, item.city].filter(Boolean).join(" · ") || "Category not set"}
                      </p>
                    </div>
                  </div>
                  <span className="rounded-full border border-line bg-cream px-2.5 py-1 text-[0.62rem] font-semibold capitalize text-ink/55">
                    {item.status}
                  </span>
                </div>

                {item.description ? (
                  <p className="mt-4 text-[0.82rem] leading-6 text-ink/55">{item.description}</p>
                ) : null}

                {item.goals ? (
                  <div className="mt-3 rounded-xl bg-paper px-3.5 py-2.5">
                    <p className="text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-ink/35">Goal</p>
                    <p className="mt-0.5 text-[0.78rem] text-ink/60">{item.goals}</p>
                  </div>
                ) : null}

                <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-line pt-3.5 text-[0.7rem] text-ink/40">
                  {item.website ? (
                    <a
                      className="inline-flex items-center gap-1.5 font-medium text-brand hover:underline"
                      href={item.website.startsWith("http") ? item.website : "https://" + item.website}
                      rel="noreferrer"
                      target="_blank"
                    >
                      <Icon name="globe" size={12} />
                      {item.website.replace(/^https?:\/\//, "")}
                    </a>
                  ) : null}
                  <span className="inline-flex items-center gap-1.5">
                    <Icon name="clock" size={12} />
                    Added {formatDate(item.createdAt)}
                  </span>
                  <Link className="inline-flex items-center gap-1.5 font-medium text-ink/55 hover:text-ink" href="/free-audit">
                    <Icon name="sparkle" size={12} />
                    Request audit
                  </Link>
                  <span className="ml-auto">
                    <DeleteBusinessButton id={item.id} />
                  </span>
                </div>
              </article>
            ))
          )}

          <div className="rounded-xl border border-dashed border-line px-4 py-3 text-[0.72rem] leading-5 text-ink/40">
            Deleting a business removes it from your workspace. Its past audit requests stay in your
            history.
          </div>
        </div>

        <div className="lg:sticky lg:top-6 lg:h-fit">
          <BusinessForm />
        </div>
      </div>
    </div>
  );
}
