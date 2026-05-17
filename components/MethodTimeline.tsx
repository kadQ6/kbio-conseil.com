"use client";

import { motion } from "framer-motion";
import { methodSteps } from "@/lib/site-data";

export function MethodTimeline() {
  return (
    <ol className="relative grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5">
      {methodSteps.map((step, i) => (
        <motion.li
          key={step.number}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
          className="relative h-full"
        >
          <div className="flex h-full flex-col rounded-3xl border border-[color:var(--color-line)] bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-elev)]">
            <div className="flex items-center justify-between">
              <span className="num-tabular text-[40px] font-semibold leading-none text-[color:var(--color-ink)] tracking-tight">
                {step.number}
              </span>
              <span
                aria-hidden
                className="h-[2px] w-12 rounded-full bg-gradient-to-r from-[color:var(--color-teal)] to-transparent"
              />
            </div>
            <h3 className="mt-5 text-lg font-semibold text-[color:var(--color-ink)]">{step.title}</h3>
            <p className="mt-3 text-[14.5px] leading-relaxed text-[color:var(--color-muted-strong)]">
              {step.description}
            </p>
            <ul className="mt-5 space-y-2 border-t border-[color:var(--color-line)] pt-4 text-[13px] text-[color:var(--color-muted)]">
              {step.details.map((d) => (
                <li key={d} className="flex gap-2">
                  <span aria-hidden className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[color:var(--color-teal)]" />
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </motion.li>
      ))}
    </ol>
  );
}
