import Link from "next/link";

export function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <Link className="group inline-flex items-center gap-2.5" href="/">
      <span
        className={
          inverted
            ? "relative grid size-9 place-items-center rounded-[11px] bg-lime text-ink"
            : "relative grid size-9 place-items-center rounded-[11px] bg-ink text-lime transition-transform duration-300 group-hover:-rotate-6"
        }
      >
        <svg fill="none" height="20" viewBox="0 0 20 20" width="20">
          <path d="M5 4h10v2.6H8v2.2h6v2.6H8v2.3h7V20H5V4Z" fill="currentColor" />
          <circle cx="15.4" cy="5" fill="currentColor" opacity="0.45" r="1.6" />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span className={inverted ? "text-[1.05rem] font-semibold tracking-tight text-paper" : "text-[1.05rem] font-semibold tracking-tight text-ink"}>
          Erstian
        </span>
        <span className={inverted ? "mt-1 text-[0.5rem] font-medium tracking-[0.34em] text-paper/50" : "mt-1 text-[0.5rem] font-medium tracking-[0.34em] text-ink/45"}>
          TECHNOLOGIES
        </span>
      </span>
    </Link>
  );
}
