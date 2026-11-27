import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "dark" | "light" | "lime" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-brand text-white hover:bg-ink",
  dark: "bg-ink text-paper hover:bg-brand",
  light: "bg-white text-ink hover:bg-cream",
  lime: "bg-lime text-ink hover:bg-white",
  outline: "border border-line bg-transparent text-ink hover:border-ink hover:bg-cream/60",
  ghost: "text-ink hover:bg-cream",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-[0.8125rem] gap-1.5",
  md: "h-11 px-5 text-sm gap-2",
  lg: "h-12 px-6 text-[0.9375rem] gap-2",
};

export function buttonClass(variant: ButtonVariant = "primary", size: ButtonSize = "md", className?: string) {
  return cn(
    "inline-flex select-none items-center justify-center rounded-full font-medium transition-colors duration-200 whitespace-nowrap disabled:pointer-events-none disabled:opacity-60",
    variants[variant],
    sizes[size],
    className,
  );
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
  target,
}: {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  target?: string;
}) {
  if (target || href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return (
      <a className={buttonClass(variant, size, className)} href={href} rel="noreferrer" target={target ?? "_blank"}>
        {children}
      </a>
    );
  }
  return (
    <Link className={buttonClass(variant, size, className)} href={href}>
      {children}
    </Link>
  );
}

export function ActionButton({
  children,
  className,
  variant = "primary",
  size = "md",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant; size?: ButtonSize }) {
  return (
    <button className={buttonClass(variant, size, className)} {...props}>
      {children}
    </button>
  );
}
