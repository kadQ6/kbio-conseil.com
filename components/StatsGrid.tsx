"use client";

import { motion, useInView, useMotionValue, useTransform, animate, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { heroStats } from "@/lib/site-data";

export function StatsGrid() {
  return (
    <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-[color:var(--color-line)] bg-[color:var(--color-line)] sm:grid-cols-2 lg:grid-cols-4">
      {heroStats.map((s, i) => (
        <li key={s.label} className="bg-white p-7 md:p-8">
          <p className="eyebrow">{`0${i + 1}`}</p>
          <p className="mt-4 num-tabular text-4xl font-semibold text-[color:var(--color-ink)] md:text-5xl">
            <Counter value={s.value} />
            {s.suffix && <span className="text-[color:var(--color-teal-700)]">{s.suffix}</span>}
          </p>
          <p className="mt-3 text-[15px] font-medium text-[color:var(--color-ink)]">{s.label}</p>
          <p className="mt-1 text-[13px] text-[color:var(--color-muted)]">{s.hint}</p>
        </li>
      ))}
    </ul>
  );
}

function Counter({ value }: { value: string }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const numeric = parseFloat(value.replace(/\s/g, "").replace(",", "."));
  const isNumeric = !Number.isNaN(numeric);
  const [display, setDisplay] = useState(isNumeric ? "0" : value);
  const mv = useMotionValue(0);
  const formatted = useTransform(mv, (v) => formatLikeOriginal(v, value));

  useEffect(() => {
    if (!isNumeric) return;
    if (!inView) return;
    if (reduce) {
      setDisplay(value);
      return;
    }
    const controls = animate(mv, numeric, {
      duration: 1.2,
      ease: [0.22, 1, 0.36, 1],
    });
    const unsub = formatted.on("change", (v) => setDisplay(v));
    return () => {
      controls.stop();
      unsub();
    };
  }, [inView, numeric, isNumeric, value, reduce, mv, formatted]);

  return (
    <motion.span ref={ref} className="inline-block">
      {display}
    </motion.span>
  );
}

function formatLikeOriginal(num: number, original: string): string {
  const hasSpace = /\s/.test(original);
  const rounded = Math.round(num);
  if (hasSpace) {
    return rounded.toLocaleString("fr-FR").replace(/\u202f/g, " ");
  }
  return String(rounded);
}
