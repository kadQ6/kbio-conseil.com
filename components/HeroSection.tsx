"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { ButtonLink } from "./Button";
import { Container } from "./Container";

export function HeroSection() {
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
              <span className="text-xs font-medium text-[color:var(--color-muted-strong)]">
                France - Afrique - Moyen Orient
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="display mt-6 text-balance text-4xl sm:text-5xl md:text-[52px] lg:text-[58px] leading-[1.05]"
            >
              Transformer la gestion biomédicale en levier de{" "}
              <span className="text-[color:var(--color-teal-700)]">performance hospitalière</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.12 }}
              className="mt-7 flex max-w-2xl flex-col gap-5"
            >
              <p className="m-0 font-sans font-normal text-pretty text-lg leading-relaxed text-[color:var(--color-muted-strong)] md:text-[19px]">
                K'BIO structure des missions d'audit biomédical, des programmes d'équipement multisites et des études d'architecture hospitalière pour les acteurs publics, les bailleurs et les opérateurs privés de santé.
              </p>
              <p className="m-0 font-sans font-normal text-pretty text-lg leading-relaxed text-[color:var(--color-muted-strong)] md:text-[19px]">
                Nous transformons les constats techniques en données fiables, chiffrées et opposables pour éclairer les décisions, sécuriser les investissements et renforcer la continuité des soins.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-10 flex flex-col gap-3 sm:flex-row"
            >
              <ButtonLink href="/contact" variant="secondary" size="lg">
                Demander un RDV
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
              <ButtonLink href="/expertises" variant="ghost" size="lg">
                Découvrir nos expertises
              </ButtonLink>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mt-12 flex items-center gap-6 text-xs text-[color:var(--color-muted)]"
            >
              <span className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--color-success)]" />
                Conformité IEC 60601 / 62353
              </span>
              <span className="hidden h-3 w-px bg-[color:var(--color-line-strong)] sm:block" />
              <span className="hidden sm:inline">Méthodologie alignée OMS</span>
            </motion.div>
          </div>

          <div className="lg:col-span-5">
            <HeroVisual />
          </div>
        </div>
      </Container>
    </section>
  );
}

/** Illustration dashboard — répartition des projets actifs par filière */
const ACTIVE_PROJECT_SPLIT = {
  biomedical: 8,
  architecture: 5,
} as const;

const ACTIVE_PROJECTS_TOTAL =
  ACTIVE_PROJECT_SPLIT.biomedical + ACTIVE_PROJECT_SPLIT.architecture;

/** Illustration — pays où des projets sont actifs (liste éditable) */
const HERO_PROJECT_COUNTRIES = [
  "Djibouti",
  "France",
  "Gabon",
  "Rwanda",
  "Somalie",
] as const;

function HeroVisual() {
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
              Tableau de bord projets
            </span>
          </div>
          <span className="num-tabular text-[11px] text-[color:var(--color-muted)]">K'BIO · Live</span>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <MiniKpi label="Projets actifs" value={String(ACTIVE_PROJECTS_TOTAL)} tone="default" />
          <MiniKpi label="Avancement moyen" value="72 %" tone="success" />
          <MiniKpi label="Points vigilance" value="3" tone="warning" />
          <MiniKpi label="Jalons sous 45 j" value="5" tone="default" />
        </div>

        <HeroProjectsChart />

        <div className="mt-5 border-t border-[color:var(--color-line)] pt-4">
          <p className="text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-muted)]">
            Pays avec projets en cours
          </p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {HERO_PROJECT_COUNTRIES.map((country) => (
              <li key={country}>
                <span className="inline-flex rounded-full border border-[color:var(--color-line)] bg-[color:var(--color-soft)] px-2.5 py-1 text-[12px] font-medium text-[color:var(--color-muted-strong)]">
                  {country}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div
        aria-hidden
        className="absolute -bottom-6 -left-6 hidden rounded-2xl border border-[color:var(--color-line)] bg-white p-4 shadow-[var(--shadow-elev)] sm:block"
      >
        <p className="text-[10px] uppercase tracking-[0.2em] text-[color:var(--color-muted)]">
          Livrables en rédaction
        </p>
        <p className="mt-1 num-tabular text-2xl font-semibold text-[color:var(--color-ink)]">
          14<span className="text-base text-[color:var(--color-muted)]"> dossiers</span>
        </p>
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

function HeroProjectsChart() {
  const total = ACTIVE_PROJECTS_TOTAL;
  const pctBiomedical =
    total > 0 ? Math.round((ACTIVE_PROJECT_SPLIT.biomedical / total) * 100) : 0;
  const pctArchitecture = total > 0 ? 100 - pctBiomedical : 0;

  return (
    <div
      className="mt-5 rounded-2xl bg-[color:var(--color-soft)] p-4"
      role="img"
      aria-label={`${total} projets en cours : ${ACTIVE_PROJECT_SPLIT.biomedical} ingénierie biomédicale, ${ACTIVE_PROJECT_SPLIT.architecture} architecture hospitalière`}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-[11px] uppercase tracking-[0.18em] text-[color:var(--color-muted)]">
          Projets en cours
        </span>
        <span className="num-tabular text-[11px] font-semibold text-[color:var(--color-muted-strong)]">
          {total} <span className="font-normal text-[color:var(--color-muted)]">actifs</span>
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

      <ul className="mt-3 space-y-2">
        <li className="flex items-center justify-between gap-2 text-[13px] text-[color:var(--color-muted-strong)]">
          <span className="flex min-w-0 items-center gap-2">
            <span
              aria-hidden
              className="h-2 w-2 shrink-0 rounded-full bg-[color:var(--color-teal-700)]"
            />
            <span className="truncate leading-snug">Ingénierie biomédicale</span>
          </span>
          <span className="num-tabular shrink-0 text-[12px] text-[color:var(--color-muted)]">
            {ACTIVE_PROJECT_SPLIT.biomedical}{" "}
            <span className="tabular-nums">({pctBiomedical}%)</span>
          </span>
        </li>
        <li className="flex items-center justify-between gap-2 text-[13px] text-[color:var(--color-muted-strong)]">
          <span className="flex min-w-0 items-center gap-2">
            <span aria-hidden className="h-2 w-2 shrink-0 rounded-full bg-[color:var(--color-ink)]" />
            <span className="truncate leading-snug">Architecture hospitalière</span>
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
