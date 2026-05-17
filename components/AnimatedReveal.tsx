"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "none";

export function AnimatedReveal({
  children,
  delay = 0,
  direction = "up",
  className = "",
  amount = 0.2,
}: {
  children: ReactNode;
  delay?: number;
  direction?: Direction;
  className?: string;
  amount?: number;
}) {
  const reduce = useReducedMotion();

  const offset = reduce
    ? { x: 0, y: 0 }
    : direction === "up"
    ? { x: 0, y: 20 }
    : direction === "down"
    ? { x: 0, y: -20 }
    : direction === "left"
    ? { x: 20, y: 0 }
    : direction === "right"
    ? { x: -20, y: 0 }
    : { x: 0, y: 0 };

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
