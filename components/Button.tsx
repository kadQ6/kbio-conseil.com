import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "outline-light";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-medium rounded-full transition-all duration-200 will-change-transform select-none whitespace-nowrap";

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-[15px]",
};

const variants: Record<Variant, string> = {
  primary:
    "bg-[color:var(--color-ink)] text-white hover:bg-[color:var(--color-ink-700)] hover:-translate-y-0.5 shadow-[var(--shadow-soft)]",
  secondary:
    "bg-[color:var(--color-teal)] text-white hover:bg-[color:var(--color-teal-700)] hover:-translate-y-0.5 shadow-[var(--shadow-soft)]",
  ghost:
    "bg-transparent text-[color:var(--color-ink)] hover:bg-[color:var(--color-soft)] border border-[color:var(--color-line)]",
  "outline-light":
    "bg-transparent text-white border border-white/30 hover:bg-white/10 hover:border-white/50",
};

type LinkProps = ComponentProps<typeof Link> & {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
};

export function ButtonLink({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: LinkProps) {
  return (
    <Link {...props} className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}>
      {children}
    </Link>
  );
}

type ButtonProps = ComponentProps<"button"> & {
  variant?: Variant;
  size?: Size;
};

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button {...props} className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
}
