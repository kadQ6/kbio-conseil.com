"use client";

import { motion } from "framer-motion";
import { Container } from "./Container";

const partners: { name: string; mark: "plus" | "pulse" | "ring" | "hex" | "wave" | "shield" }[] = [
  { name: "Programme FSE — Rwanda", mark: "pulse" },
  { name: "UNICEF — Somalia", mark: "shield" },
  { name: "CHUD Djibouti", mark: "hex" },
  { name: "BERTIN Stérilwave", mark: "ring" },
  { name: "Réseaux France & IDF", mark: "wave" },
  { name: "Gabon multisites", mark: "plus" },
];

export function LogoWall({
  eyebrow = "Confiance",
  title = "Ils nous font confiance",
  subtitle = "Exemples de programme : bailleurs institutionnels, ministères de santé, opérateurs privés multisites.",
  disclaimer = "Logos d'illustration — à remplacer par les références réelles.",
}: {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  disclaimer?: string;
}) {
  return (
    <section className="relative border-y border-[color:var(--color-line)] bg-white">
      <Container className="py-16 md:py-20">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">{eyebrow}</p>
            <h2 className="mt-3 text-2xl md:text-3xl font-semibold tracking-tight text-[color:var(--color-ink)]">
              {title}
            </h2>
            <p className="mt-2 max-w-xl text-[14.5px] text-[color:var(--color-muted)]">{subtitle}</p>
          </div>
          <p className="text-[11px] italic text-[color:var(--color-muted)]">{disclaimer}</p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[color:var(--color-line)] bg-[color:var(--color-line)] sm:grid-cols-3 lg:grid-cols-6">
          {partners.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: i * 0.04 }}
              className="group flex h-24 items-center justify-center bg-white"
            >
              <PartnerLogo name={p.name} mark={p.mark} />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function PartnerLogo({
  name,
  mark,
}: {
  name: string;
  mark: "plus" | "pulse" | "ring" | "hex" | "wave" | "shield";
}) {
  return (
    <div className="flex items-center gap-2.5 px-4 opacity-70 transition-all duration-300 group-hover:opacity-100 group-hover:scale-[1.02]">
      <Mark mark={mark} />
      <span className="text-[13.5px] font-semibold tracking-tight text-[color:var(--color-ink)]">
        {name}
      </span>
    </div>
  );
}

function Mark({ mark }: { mark: "plus" | "pulse" | "ring" | "hex" | "wave" | "shield" }) {
  const c1 = "var(--color-ink)";
  const c2 = "var(--color-teal-700)";
  switch (mark) {
    case "plus":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden>
          <rect x="2" y="2" width="20" height="20" rx="6" fill={c1} />
          <path d="M12 7v10M7 12h10" stroke={c2} strokeWidth="2.4" strokeLinecap="round" />
        </svg>
      );
    case "pulse":
      return (
        <svg width="26" height="22" viewBox="0 0 28 22" aria-hidden>
          <path
            d="M2 12h5l3-7 4 14 3-9 3 4h6"
            stroke={c1}
            strokeWidth="2.2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "ring":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden>
          <circle cx="12" cy="12" r="9" stroke={c1} strokeWidth="2.4" fill="none" />
          <circle cx="12" cy="12" r="3.5" fill={c2} />
        </svg>
      );
    case "hex":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden>
          <path d="M12 2 22 8v8L12 22 2 16V8z" fill={c1} />
          <path d="M12 7l5 3v4l-5 3-5-3v-4z" fill={c2} />
        </svg>
      );
    case "wave":
      return (
        <svg width="26" height="22" viewBox="0 0 28 22" aria-hidden>
          <path
            d="M2 14c4-8 8 0 12-4s8 4 12-2"
            stroke={c1}
            strokeWidth="2.4"
            fill="none"
            strokeLinecap="round"
          />
          <circle cx="14" cy="10" r="2" fill={c2} />
        </svg>
      );
    case "shield":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden>
          <path d="M12 2 4 5v6c0 5 3.5 8.5 8 11 4.5-2.5 8-6 8-11V5z" fill={c1} />
          <path d="M9 12l2 2 4-4" stroke={c2} strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
  }
}
