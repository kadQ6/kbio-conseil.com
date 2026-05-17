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
                Île-de-France · Djibouti · Afrique subsaharienne
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="display mt-6 text-balance text-5xl md:text-6xl lg:text-[68px] leading-[1.02]"
            >
              L'expertise biomédicale
              <span className="block">
                au service de la <span className="text-[color:var(--color-teal-700)]">continuité des soins</span>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.12 }}
              className="mt-7 max-w-2xl text-pretty text-lg md:text-[19px] leading-relaxed text-[color:var(--color-muted-strong)]"
            >
              K'BIO Conseil structure des missions d'audit biomédical, de programmes GMAO multisites et
              d'études architecture hospitalière — pour ministères de santé, bailleurs (UNICEF, FSE, banques
              de développement) et opérateurs privés. Nous donnons aux directions techniques des bases
              chiffrées, normatives et opposables lors des audits et des investissements.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-10 flex flex-col gap-3 sm:flex-row"
            >
              <ButtonLink href="/contact" variant="secondary" size="lg">
                Demander un audit
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
              <ButtonLink href="/offres" variant="ghost" size="lg">
                Découvrir nos offres
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
              Tableau de bord parc
            </span>
          </div>
          <span className="num-tabular text-[11px] text-[color:var(--color-muted)]">K'BIO · PSA</span>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <MiniKpi label="Disponibilité" value="98 %" tone="success" />
          <MiniKpi label="Pannes critiques" value="2" tone="warning" />
          <MiniKpi label="MTBF moyen" value="412 j" tone="default" />
          <MiniKpi label="Tickets ouverts" value="14" tone="default" />
        </div>

        <div className="mt-5 rounded-2xl bg-[color:var(--color-soft)] p-4">
          <div className="flex items-center justify-between">
            <span className="text-[11px] uppercase tracking-[0.18em] text-[color:var(--color-muted)]">
              Disponibilité 12 mois
            </span>
            <span className="num-tabular text-[11px] text-[color:var(--color-muted-strong)]">+3.4 pts</span>
          </div>
          <SparkChart />
        </div>

        <ul className="mt-4 space-y-2 text-[13px] text-[color:var(--color-muted-strong)]">
          <Row site="Bloc opératoire" status="success" label="Conforme" />
          <Row site="Imagerie médicale" status="warning" label="Plan d'action" />
          <Row site="Laboratoire" status="success" label="Conforme" />
        </ul>
      </div>

      <div
        aria-hidden
        className="absolute -bottom-6 -left-6 hidden rounded-2xl border border-[color:var(--color-line)] bg-white p-4 shadow-[var(--shadow-elev)] sm:block"
      >
        <p className="text-[10px] uppercase tracking-[0.2em] text-[color:var(--color-muted)]">
          Audit en cours
        </p>
        <p className="mt-1 num-tabular text-2xl font-semibold text-[color:var(--color-ink)]">
          420<span className="text-base text-[color:var(--color-muted)]"> équipements</span>
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

function SparkChart() {
  return (
    <svg viewBox="0 0 200 60" className="mt-3 h-14 w-full">
      <defs>
        <linearGradient id="g" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="var(--color-teal)" stopOpacity="0.45" />
          <stop offset="100%" stopColor="var(--color-teal)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M0,40 L20,38 L40,32 L60,30 L80,28 L100,22 L120,24 L140,16 L160,18 L180,12 L200,10 L200,60 L0,60 Z"
        fill="url(#g)"
      />
      <path
        d="M0,40 L20,38 L40,32 L60,30 L80,28 L100,22 L120,24 L140,16 L160,18 L180,12 L200,10"
        fill="none"
        stroke="var(--color-teal-700)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Row({
  site,
  label,
  status,
}: {
  site: string;
  label: string;
  status: "success" | "warning";
}) {
  const dot =
    status === "success" ? "bg-[color:var(--color-success)]" : "bg-[color:var(--color-warning)]";
  return (
    <li className="flex items-center justify-between rounded-lg px-2 py-1.5">
      <span className="flex items-center gap-2">
        <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
        {site}
      </span>
      <span className="text-[12px] text-[color:var(--color-muted)]">{label}</span>
    </li>
  );
}
