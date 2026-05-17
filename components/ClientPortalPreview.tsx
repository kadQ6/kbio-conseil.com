"use client";

import { motion } from "framer-motion";
import { Activity, FileText, ShieldCheck, Wrench } from "lucide-react";

export function ClientPortalPreview() {
  return (
    <div className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-6 top-10 -z-10 h-[80%] rounded-[2.5rem] bg-gradient-to-br from-[color:var(--color-ink)] via-[color:var(--color-ink-700)] to-[color:var(--color-teal-700)] opacity-90 blur-2xl"
        style={{ filter: "blur(60px)" }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-[1.75rem] border border-[color:var(--color-line)] bg-white shadow-[0_24px_80px_rgba(11,37,69,0.18)]"
      >
        <div className="flex items-center justify-between border-b border-[color:var(--color-line)] bg-[color:var(--color-soft)] px-5 py-3">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[color:var(--color-line-strong)]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[color:var(--color-line-strong)]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[color:var(--color-line-strong)]" />
          </div>
          <span className="num-tabular rounded-md bg-white px-3 py-1 text-[11px] text-[color:var(--color-muted)] border border-[color:var(--color-line)]">
            psa.kbio-conseil.com
          </span>
          <span className="text-[11px] text-[color:var(--color-muted)]">v1.4</span>
        </div>

        <div className="grid grid-cols-12">
          <aside className="hidden md:block col-span-3 border-r border-[color:var(--color-line)] p-5">
            <p className="eyebrow">Plateforme mission</p>
            <p className="mt-2 text-[14px] font-semibold text-[color:var(--color-ink)]">
              Programme PSA — périmètre bailleur
            </p>
            <ul className="mt-6 space-y-1 text-[13.5px]">
              {[
                { label: "Tableau de bord", active: true },
                { label: "Équipements" },
                { label: "Interventions" },
                { label: "Rapports" },
                { label: "Contrats" },
              ].map((it) => (
                <li
                  key={it.label}
                  className={`flex items-center justify-between rounded-lg px-3 py-2 ${
                    it.active
                      ? "bg-[color:var(--color-soft)] font-medium text-[color:var(--color-ink)]"
                      : "text-[color:var(--color-muted-strong)]"
                  }`}
                >
                  {it.label}
                  {it.active && (
                    <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--color-teal)]" />
                  )}
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-2xl bg-[color:var(--color-ink)] p-4 text-white">
              <p className="text-[11px] uppercase tracking-[0.18em] text-white/70">Prochaine visite</p>
              <p className="mt-2 num-tabular text-lg font-semibold">12 juin 2026</p>
              <p className="mt-1 text-[12px] text-white/70">Maintenance préventive — bloc opératoire</p>
            </div>
          </aside>

          <div className="col-span-12 md:col-span-9 p-6 md:p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] uppercase tracking-[0.18em] text-[color:var(--color-muted)]">
                  Aperçu — mai 2026
                </p>
                <h3 className="mt-1 text-2xl font-semibold text-[color:var(--color-ink)]">
                  Performance du parc biomédical
                </h3>
              </div>
              <span className="hidden md:inline-flex items-center gap-2 rounded-full bg-[color:var(--color-teal-100)] px-3 py-1.5 text-[12px] font-medium text-[color:var(--color-teal-700)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--color-teal-700)]" />
                Synchronisé il y a 2 min
              </span>
            </div>

            <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
              <Tile Icon={Activity} label="Disponibilité" value="98 %" delta="+2.4 pts" tone="success" />
              <Tile Icon={Wrench} label="Tickets ouverts" value="14" delta="−6 vs M-1" tone="default" />
              <Tile Icon={ShieldCheck} label="Conformité" value="96 %" delta="Stable" tone="default" />
              <Tile Icon={FileText} label="Rapports livrés" value="22" delta="+4" tone="default" />
            </div>

            <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2 rounded-2xl border border-[color:var(--color-line)] p-5">
                <div className="flex items-center justify-between">
                  <p className="text-[12px] font-medium text-[color:var(--color-ink)]">
                    Disponibilité — 12 derniers mois
                  </p>
                  <span className="num-tabular text-[11px] text-[color:var(--color-muted)]">K'BIO PSA</span>
                </div>
                <Chart />
              </div>
              <div className="rounded-2xl border border-[color:var(--color-line)] p-5">
                <p className="text-[12px] font-medium text-[color:var(--color-ink)]">Derniers rapports</p>
                <ul className="mt-4 space-y-3">
                  {[
                    "Rapport audit imagerie — V2",
                    "PV intervention bloc 3",
                    "Plan préventif T2 2026",
                  ].map((t) => (
                    <li
                      key={t}
                      className="flex items-center gap-3 rounded-lg p-2 hover:bg-[color:var(--color-soft)]"
                    >
                      <span
                        aria-hidden
                        className="grid h-8 w-8 place-items-center rounded-lg bg-[color:var(--color-soft)] text-[color:var(--color-ink)]"
                      >
                        <FileText className="h-4 w-4" />
                      </span>
                      <span className="text-[13px] text-[color:var(--color-muted-strong)]">{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function Tile({
  Icon,
  label,
  value,
  delta,
  tone,
}: {
  Icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  delta: string;
  tone: "default" | "success";
}) {
  const deltaCls =
    tone === "success" ? "text-[color:var(--color-success)]" : "text-[color:var(--color-muted)]";
  return (
    <div className="rounded-2xl border border-[color:var(--color-line)] p-4">
      <div className="flex items-center justify-between">
        <Icon className="h-4 w-4 text-[color:var(--color-teal-700)]" />
        <span className={`text-[11px] font-medium ${deltaCls}`}>{delta}</span>
      </div>
      <p className="num-tabular mt-3 text-2xl font-semibold text-[color:var(--color-ink)]">{value}</p>
      <p className="text-[11px] uppercase tracking-[0.18em] text-[color:var(--color-muted)]">{label}</p>
    </div>
  );
}

function Chart() {
  return (
    <svg viewBox="0 0 400 120" className="mt-4 h-32 w-full">
      <defs>
        <linearGradient id="chart-g" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="var(--color-teal)" stopOpacity="0.4" />
          <stop offset="100%" stopColor="var(--color-teal)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M0,90 L40,82 L80,76 L120,68 L160,62 L200,52 L240,46 L280,38 L320,32 L360,26 L400,20 L400,120 L0,120 Z"
        fill="url(#chart-g)"
      />
      <path
        d="M0,90 L40,82 L80,76 L120,68 L160,62 L200,52 L240,46 L280,38 L320,32 L360,26 L400,20"
        fill="none"
        stroke="var(--color-teal-700)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {[40, 120, 200, 280, 360].map((x) => (
        <circle key={x} cx={x} cy={getY(x)} r="2.5" fill="white" stroke="var(--color-teal-700)" strokeWidth="2" />
      ))}
    </svg>
  );

  function getY(x: number) {
    const map: Record<number, number> = { 40: 82, 120: 68, 200: 52, 280: 38, 360: 26 };
    return map[x] ?? 60;
  }
}
