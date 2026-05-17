import type { ReactNode } from "react";
import { AnimatedReveal } from "./AnimatedReveal";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  as: Tag = "h2",
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  as?: "h1" | "h2" | "h3";
  children?: ReactNode;
}) {
  const isCenter = align === "center";
  return (
    <div className={`max-w-3xl ${isCenter ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <AnimatedReveal>
          <p className="eyebrow">{eyebrow}</p>
        </AnimatedReveal>
      )}
      <AnimatedReveal delay={0.05}>
        <Tag className={`display mt-4 text-4xl md:text-5xl ${isCenter ? "" : ""}`}>{title}</Tag>
      </AnimatedReveal>
      {description && (
        <AnimatedReveal delay={0.1}>
          <p className="mt-5 text-lg text-pretty text-[color:var(--color-muted-strong)]">{description}</p>
        </AnimatedReveal>
      )}
      {children && <AnimatedReveal delay={0.15}>{children}</AnimatedReveal>}
    </div>
  );
}
