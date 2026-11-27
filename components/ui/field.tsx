import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const base =
  "w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-ink/35 transition-colors focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/15 disabled:opacity-60";

export function inputClass(className?: string) {
  return cn(base, "h-11", className);
}

export function textareaClass(className?: string) {
  return cn(base, "min-h-28 resize-y", className);
}

export function selectClass(className?: string) {
  return cn(base, "h-11 appearance-none bg-[length:16px] bg-[right_0.9rem_center] bg-no-repeat pr-10", className);
}

export function Field({
  label,
  hint,
  required,
  children,
  className,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label className="flex flex-col gap-1.5">
        <span className="text-[0.78rem] font-semibold uppercase tracking-[0.1em] text-ink/60">
          {label}
          {required ? <span className="ml-1 text-brand">*</span> : null}
        </span>
        {children}
      </label>
      {hint ? <p className="text-xs text-ink/45">{hint}</p> : null}
    </div>
  );
}

export function TextInput({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={inputClass(className)} {...props} />;
}

export function TextArea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={textareaClass(className)} {...props} />;
}

export function Select({ className, children, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select className={selectClass(className)} {...props}>
      {children}
    </select>
  );
}
