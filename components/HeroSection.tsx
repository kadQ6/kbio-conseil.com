"use client";

import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import type { HeroCopyStrings } from "@/lib/copy/home";
import type { AppLocale } from "@/lib/i18n/config";
import { ButtonLink } from "./Button";
import { Container } from "./Container";

const HERO_TRUST_IMAGE_SRC = [
  "/images/hero/trust-audit.png",
  "/images/hero/trust-field.png",
  "/images/hero/trust-analytics.png",
] as const;

const ACTIVE_PROJECT_SPLIT = {
  biomedical: 8,
  architecture: 5,
} as const;

const ACTIVE_PROJECTS_TOTAL =
  ACTIVE_PROJECT_SPLIT.biomedical + ACTIVE_PROJECT_SPLIT.architecture;

const HERO_PROJECT_COUNTRIES: Record<AppLocale, readonly string[]> = {
  fr: ["Djibouti", "Ethiopie", "France", "Gabon", "RDC", "Rwanda", "Somalie"],
  en: ["Djibouti", "Ethiopia", "France", "Gabon", "DRC", "Rwanda", "Somalia"],
};

function chartAria(copy: HeroCopyStrings) {
  return copy.chartAria
    .replace("{total}", String(ACTIVE_PROJECTS_TOTAL))
    .replace("{bio}", String(ACTIVE_PROJECT_SPLIT.biomedical))
    .replace("{archi}", String(ACTIVE_PROJECT_SPLIT.architecture));
}

export function HeroSection({
  hero,
  locale,
  contactHref,
  expertisesHref,
}: {
  hero: HeroCopyStrings;
  locale: AppLocale;
  contactHref: string;
  expertisesHref: string;
}) {
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="absolute inset-0 -z-10 bg-radial-fade" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-grid opacity-[0.6]" />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-[-10%] -z-10 h-[520px] w-[520px] rounded-full bg-[color:var(--color-teal)]/15 blur-3xl"
      />

      <Container className="relative pt-16 pb-24 md:pt-24 md:pb-36">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-10 items-center">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-[color:var(--color-line)] bg-white/70 px-3 py-1.5 backdrop-blur"
            >
              <Sparkles className="h-3.5 w-3.5 text-[color:var(--color-teal)]" />
              <span className="text-xs font-medium text-[color:var(--color-muted-strong)]">{hero.badge}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="display mt-6 text-balance text-4xl sm:text-5xl md:text-[52px] lg:text-[58px] leading-[1.05]"
            >
              {hero.titleLead}{" "}
              <span className="text-[color:var(--color-teal-700)]">{hero.titleAccent}</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.12 }}
              className="mt-7 flex max-w-2xl flex-col gap-5"
            >
              <p className="m-0 font-sans font-normal text-pretty text-lg leading-relaxed text-[color:var(--color-muted-strong)] md:text-[19px]">
                {hero.intro[0]}
              </p>
              <p className="m-0 font-sans font-normal text-pretty text-lg leading-relaxed text-[color:var(--color-muted-strong)] md:text-[19px]">
                {hero.intro[1]}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-10 flex flex-col gap-3 sm:flex-row"
            >
              <ButtonLink href={contactHref} variant="secondary" size="lg">
                {hero.ctaPrimary}
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
              <ButtonLink href={expertisesHref} variant="ghost" size="lg">
                {hero.ctaSecondary}
              </ButtonLink>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mt-12 flex flex-wrap items-center gap-3 sm:gap-5"
              role="list"
            >
              {HERO_TRUST_IMAGE_SRC.map((src, i) => (
                <div key={src} role="listitem" className="shrink-0">
                  <Image
                    src={src}
                    alt={hero.trustImageAlts[i] ?? ""}
                    width={100}
                    height={100}
                    sizes="(max-width: 640px) 14vw, 70px"
                    className="h-7 w-auto object-contain opacity-90 sm:h-[2.25rem]"
                  />
                </div>
              ))}
            </motion.div>
          </div>

          <div className="lg:col-span-5">
            <HeroVisual hero={hero} locale={locale} />
          </div>
        </div>
      </Container>
    </section>
  );
}

function HeroVisual({ hero, locale }: { hero: HeroCopyStrings; locale: AppLocale }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto max-w-md lg:ml-auto"
    >
      <div className="relative rounded-3xl border border-[color:var(--color-line)] bg-white p-5 shadow-[var(--shadow-elev)]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[color:var(--color-success)]" />
            <span className="text-[11px] uppercase tracking-[0.18em] text-[color:var(--color-muted)]">
              {hero.visualEyebrow}
            </span>
          </div>
          <span className="num-tabular text-[11px] text-[color:var(--color-muted)]">{hero.visualLive}</span>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <MiniKpi label={hero.kpiActiveProjects} value={String(ACTIVE_PROJECTS_TOTAL)} tone="default" />
          <MiniKpi label={hero.kpiAvgProgress} value="72 %" tone="success" />
          <MiniKpi label={hero.kpiWatchpoints} value="3" tone="warning" />
          <MiniKpi label={hero.kpiMilestones} value="5" tone="default" />
        </div>

        <HeroProjectsChart hero={hero} />

        <div className="mt-5 border-t border-[color:var(--color-line)] pt-4">
          <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:gap-y-3 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-muted)]">
                {hero.countriesEyebrow}
              </p>
              <ul className="mt-3 flex flex-wrap gap-x-2 gap-y-2">
                {HERO_PROJECT_COUNTRIES[locale].map((country) => (
                  <li key={country}>
                    <span className="inline-flex rounded-full border border-[color:var(--color-line)] bg-[color:var(--color-soft)] px-2.5 py-1 text-[12px] font-medium text-[color:var(--color-muted-strong)]">
                      {country}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div
              className="rounded-lg border border-[color:var(--color-line)] bg-[color:var(--color-soft)] px-2.5 py-2 md:min-w-[5.75rem] md:max-w-[8rem] md:justify-self-end md:px-2.5 md:py-2 md:text-right"
              role="status"
              aria-label={`${hero.sideCardEyebrow} — ${hero.sideCardMetric} ${hero.sideCardUnit.trim()}`}
            >
              <p className="text-[9px] font-medium leading-tight tracking-normal text-[color:var(--color-muted-strong)]">
                {hero.sideCardEyebrow}
              </p>
              <p className="num-tabular mt-1 text-base font-semibold tabular-nums leading-none text-[color:var(--color-ink)]">
                {hero.sideCardMetric}
                <span className="normal-nums pl-1 text-[10px] font-normal text-[color:var(--color-muted)]">
                  {hero.sideCardUnit.trim()}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function MiniKpi({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "default" | "success" | "warning";
}) {
  const toneCls =
    tone === "success"
      ? "text-[color:var(--color-success)]"
      : tone === "warning"
        ? "text-[color:var(--color-warning)]"
        : "text-[color:var(--color-ink)]";
  return (
    <div className="rounded-xl border border-[color:var(--color-line)] bg-white p-3">
      <p className="text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-muted)]">{label}</p>
      <p className={`num-tabular mt-1 text-xl font-semibold ${toneCls}`}>{value}</p>
    </div>
  );
}

function HeroProjectsChart({ hero }: { hero: HeroCopyStrings }) {
  const total = ACTIVE_PROJECTS_TOTAL;
  const pctBiomedical =
    total > 0 ? Math.round((ACTIVE_PROJECT_SPLIT.biomedical / total) * 100) : 0;
  const pctArchitecture = total > 0 ? 100 - pctBiomedical : 0;

  return (
    <div
      className="mt-5 rounded-2xl bg-[color:var(--color-soft)] p-4"
      role="img"
      aria-label={chartAria(hero)}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-[11px] uppercase tracking-[0.18em] text-[color:var(--color-muted)]">
          {hero.chartEyebrow}
        </span>
        <span className="num-tabular text-[11px] font-semibold text-[color:var(--color-muted-strong)]">
          {total}{" "}
          <span className="font-normal text-[color:var(--color-muted)]">{hero.chartSubtitle}</span>
        </span>
      </div>

      <div
        className="mt-3 flex h-3 w-full overflow-hidden rounded-full bg-white ring-1 ring-[color:var(--color-line)]"
        aria-hidden
      >
        <motion.span
          initial={{ width: 0 }}
          animate={{ width: `${pctBiomedical}%` }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="h-full bg-[color:var(--color-teal-700)]"
          style={{ minWidth: total ? "4px" : undefined }}
        />
        <motion.span
          initial={{ width: 0 }}
          animate={{ width: `${pctArchitecture}%` }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.28 }}
          className="h-full bg-[color:var(--color-ink)]"
          style={{ minWidth: total ? "4px" : undefined }}
        />
      </div>

      <div className="mt-3">
        <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-[color:var(--color-muted)]">
          {hero.chartTitle}
        </p>
      </div>

      <ul className="mt-3 space-y-2">
        <li className="flex items-center justify-between gap-2 text-[13px] text-[color:var(--color-muted-strong)]">
          <span className="flex min-w-0 items-center gap-2">
            <span
              aria-hidden
              className="h-2 w-2 shrink-0 rounded-full bg-[color:var(--color-teal-700)]"
            />
            <span className="truncate leading-snug">{hero.rowBio}</span>
          </span>
          <span className="num-tabular shrink-0 text-[12px] text-[color:var(--color-muted)]">
            {ACTIVE_PROJECT_SPLIT.biomedical}{" "}
            <span className="tabular-nums">({pctBiomedical}%)</span>
          </span>
        </li>
        <li className="flex items-center justify-between gap-2 text-[13px] text-[color:var(--color-muted-strong)]">
          <span className="flex min-w-0 items-center gap-2">
            <span aria-hidden className="h-2 w-2 shrink-0 rounded-full bg-[color:var(--color-ink)]" />
            <span className="truncate leading-snug">{hero.rowArchi}</span>
          </span>
          <span className="num-tabular shrink-0 text-[12px] text-[color:var(--color-muted)]">
            {ACTIVE_PROJECT_SPLIT.architecture}{" "}
            <span className="tabular-nums">({pctArchitecture}%)</span>
          </span>
        </li>
      </ul>
    </div>
  );
}
