"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

type Stat = { value: string; label: string };

export function ImageFeature({
  eyebrow,
  title,
  description,
  image,
  imageAlt,
  reverse = false,
  stats,
  children,
}: {
  eyebrow?: string;
  title: string;
  description: ReactNode;
  image: string;
  imageAlt: string;
  reverse?: boolean;
  stats?: Stat[];
  children?: ReactNode;
}) {
  return (
    <div
      className={`grid grid-cols-1 gap-10 lg:gap-14 items-center ${
        reverse ? "lg:grid-cols-[6fr_5fr]" : "lg:grid-cols-[5fr_6fr]"
      }`}
    >
      <motion.div
        initial={{ opacity: 0, x: reverse ? 30 : -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={reverse ? "lg:order-2" : ""}
      >
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2 className="display mt-4 text-3xl md:text-[40px] leading-[1.06] text-balance">{title}</h2>
        <div className="mt-5 text-[16px] leading-relaxed text-[color:var(--color-muted-strong)] text-pretty space-y-4">
          {description}
        </div>

        {stats && stats.length > 0 && (
          <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-[color:var(--color-line)] pt-6">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="text-[11px] uppercase tracking-[0.16em] text-[color:var(--color-muted)]">
                  {s.label}
                </dt>
                <dd className="num-tabular mt-1 text-2xl font-semibold text-[color:var(--color-ink)]">
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
        )}

        {children && <div className="mt-8">{children}</div>}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`relative ${reverse ? "lg:order-1" : ""}`}
      >
        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-[color:var(--color-soft)] shadow-[var(--shadow-elev)]">
          <Image
            src={image}
            alt={imageAlt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(11,37,69,0) 60%, rgba(11,37,69,0.18) 100%)",
            }}
          />
        </div>
        <div
          aria-hidden
          className={`absolute -z-10 h-[110%] w-[110%] rounded-[2rem] bg-[color:var(--color-teal)]/8 blur-3xl ${
            reverse ? "-right-6 -top-6" : "-left-6 -top-6"
          }`}
        />
      </motion.div>
    </div>
  );
}
