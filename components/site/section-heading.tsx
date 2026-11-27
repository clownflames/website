import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  action,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
  action?: ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" ? "items-center text-center" : "md:flex-row md:items-end md:justify-between",
        className,
      )}
    >
      <div className={align === "center" ? "max-w-2xl" : "max-w-2xl"}>
        <p className={cn("eyebrow flex items-center gap-2 text-brand", align === "center" && "justify-center")}>
          <span className="inline-block size-1.5 rounded-full bg-brand" />
          {eyebrow}
        </p>
        <h2 className="mt-4 text-balance text-[1.9rem] font-semibold leading-[1.08] tracking-[-0.035em] text-ink sm:text-4xl lg:text-[2.85rem]">
          {title}
        </h2>
        {description ? (
          <p className={cn("mt-4 text-[0.97rem] leading-7 text-ink/55", align === "center" && "mx-auto")}>
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
