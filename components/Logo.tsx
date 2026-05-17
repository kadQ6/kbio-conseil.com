import Link from "next/link";

type Variant = "default" | "light";

export function Logo({ variant = "default" }: { variant?: Variant }) {
  const inkColor = variant === "light" ? "#FFFFFF" : "var(--color-ink)";
  const subColor = variant === "light" ? "rgba(255,255,255,0.72)" : "var(--color-muted)";

  return (
    <Link href="/" aria-label="K'BIO Conseil — Accueil" className="group inline-flex items-center gap-3">
      <span
        aria-hidden
        className="grid h-10 w-10 place-items-center rounded-xl bg-[color:var(--color-ink)] text-white shadow-[var(--shadow-soft)] transition-transform group-hover:-translate-y-0.5"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M5 12h3l2-5 4 10 2-5h3"
            stroke="var(--color-teal)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="flex flex-col leading-tight">
        <span className="text-[10px] uppercase tracking-[0.2em]" style={{ color: subColor }}>
          Génie biomédical
        </span>
        <span className="font-semibold text-[17px]" style={{ color: inkColor, letterSpacing: "-0.02em" }}>
          K'BIO<span className="text-[color:var(--color-teal)]"> </span>
          Conseil
        </span>
      </span>
    </Link>
  );
}
