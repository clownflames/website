import Link from "next/link";
import { Icon } from "@/components/icons";
import type { Service } from "@/lib/content";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      className="group relative flex h-full flex-col rounded-2xl border border-line bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-ink/15 hover:shadow-[0_24px_60px_-32px_rgba(10,12,18,0.35)]"
      href={"/services/" + service.slug}
    >
      <div className="flex items-start justify-between">
        <span className="grid size-11 place-items-center rounded-xl bg-brand-soft text-brand transition-colors duration-300 group-hover:bg-ink group-hover:text-lime">
          <Icon name={service.icon} size={21} />
        </span>
        <span className="text-[0.7rem] font-medium tracking-[0.18em] text-ink/30">{service.index}</span>
      </div>
      <h3 className="mt-5 text-[1.08rem] font-semibold leading-snug tracking-[-0.01em] text-ink">{service.title}</h3>
      <p className="mt-2.5 text-sm leading-6 text-ink/50">{service.short}</p>
      <div className="mt-auto flex items-center justify-between pt-6">
        <span className="text-[0.78rem] font-semibold text-ink/45 group-hover:text-brand">{service.items.length} services</span>
        <span className="grid size-8 place-items-center rounded-full border border-line text-ink transition-colors group-hover:border-brand group-hover:bg-brand group-hover:text-white">
          <Icon name="arrow-up-right" size={15} />
        </span>
      </div>
    </Link>
  );
}
