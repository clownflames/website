import Link from "next/link";
import type { ReactNode } from "react";
import { Icon } from "@/components/icons";

export function PageHeading({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="eyebrow flex items-center gap-2 text-brand">
          <span className="inline-block size-1.5 rounded-full bg-brand" />
          {eyebrow}
        </p>
        <h1 className="mt-2.5 text-[1.8rem] font-semibold leading-tight tracking-[-0.035em] text-ink sm:text-[2.1rem]">
          {title}
        </h1>
        {description ? <p className="mt-1.5 max-w-xl text-[0.84rem] leading-6 text-ink/45">{description}</p> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

export function StatCard({
  label,
  value,
  hint,
  icon,
  accent = false,
}: {
  label: string;
  value: number | string;
  hint?: string;
  icon: string;
  accent?: boolean;
}) {
  return (
    <div className={"rounded-2xl border p-5 " + (accent ? "border-ink bg-ink text-paper" : "border-line bg-white")}>
      <div className="flex items-center justify-between">
        <p className={"text-[0.66rem] font-semibold uppercase tracking-[0.12em] " + (accent ? "text-paper/45" : "text-ink/35")}>
          {label}
        </p>
        <Icon className={accent ? "text-lime" : "text-ink/25"} name={icon} size={15} />
      </div>
      <p className={"mt-3 text-[1.9rem] font-semibold leading-none tracking-[-0.04em] " + (accent ? "text-paper" : "text-ink")}>
        {value}
      </p>
      {hint ? <p className={"mt-2 text-[0.68rem] " + (accent ? "text-paper/40" : "text-ink/35")}>{hint}</p> : null}
    </div>
  );
}

export function EmptyState({
  icon = "sparkle",
  title,
  description,
  action,
}: {
  icon?: string;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-dashed border-line bg-white/50 px-6 py-12 text-center">
      <span className="grid size-11 place-items-center rounded-xl bg-cream text-ink/40">
        <Icon name={icon} size={20} />
      </span>
      <p className="mt-4 text-[0.95rem] font-semibold text-ink">{title}</p>
      <p className="mt-1.5 max-w-sm text-[0.8rem] leading-6 text-ink/45">{description}</p>
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
}

const tones: Record<string, string> = {
  pending: "bg-amber-50 text-amber-700 border-amber-200",
  requested: "bg-amber-50 text-amber-700 border-amber-200",
  new: "bg-amber-50 text-amber-700 border-amber-200",
  in_review: "bg-sky-50 text-sky-700 border-sky-200",
  scheduled: "bg-sky-50 text-sky-700 border-sky-200",
  contacted: "bg-sky-50 text-sky-700 border-sky-200",
  completed: "bg-emerald-50 text-emerald-700 border-emerald-200",
  confirmed: "bg-emerald-50 text-emerald-700 border-emerald-200",
  responded: "bg-emerald-50 text-emerald-700 border-emerald-200",
  active: "bg-emerald-50 text-emerald-700 border-emerald-200",
  published: "bg-emerald-50 text-emerald-700 border-emerald-200",
  cancelled: "bg-line/40 text-ink/45 border-line",
  archived: "bg-line/40 text-ink/45 border-line",
  draft: "bg-line/40 text-ink/45 border-line",
  closed: "bg-line/40 text-ink/45 border-line",
};

export function StatusBadge({ status, label }: { status: string; label?: string }) {
  const tone = tones[status] ?? "bg-cream text-ink/55 border-line";
  return (
    <span className={"inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[0.64rem] font-semibold capitalize " + tone}>
      <span className="size-1.5 rounded-full bg-current" />
      {label ?? status.replace(/_/g, " ")}
    </span>
  );
}

export function DataRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-line/60 py-2 last:border-0">
      <p className="text-[0.68rem] font-medium uppercase tracking-[0.08em] text-ink/35">{label}</p>
      <div className="text-right text-[0.78rem] font-medium text-ink/70">{children}</div>
    </div>
  );
}

export function PortalLink({ href, children, muted = false }: { href: string; children: ReactNode; muted?: boolean }) {
  return (
    <Link
      className={
        "inline-flex items-center gap-1.5 text-[0.72rem] font-semibold transition-colors " +
        (muted ? "text-ink/35 hover:text-ink" : "text-brand hover:text-ink")
      }
      href={href}
    >
      {children}
      <Icon name="arrow-up-right" size={12} />
    </Link>
  );
}
