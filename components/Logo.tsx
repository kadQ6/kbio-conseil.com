import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site-data";

type Variant = "default" | "light";

/** Symbole K — `public/images/logo/kbio-logo.png` (`unoptimized` : évite blocage optimiseur PNG). */
const LOGO_SRC = "/images/logo/kbio-logo.png";

/**
 * Marque en colonne : disque léger encadrant le symbole, nom du cabinet en dessous
 * (aligné références « dashboard » sombre — adapté aussi au header clair).
 */
export function Logo({
  variant = "default",
  href = "/",
  ariaLabel = "K'BIO — Accueil",
}: {
  variant?: Variant;
  href?: string;
  ariaLabel?: string;
}) {
  const onDarkFooter = variant === "light";

  const disc = (
    <span
      className={`flex h-[2.875rem] w-[2.875rem] shrink-0 items-center justify-center rounded-full ring-1 ${
        onDarkFooter
          ? "bg-[#545b66] shadow-[inset_0_-1px_0_rgba(0,0,0,0.22)] ring-white/[0.14]"
          : "bg-[#e4e9ef] shadow-[inset_0_1px_2px_rgba(255,255,255,0.65)] ring-black/[0.07]"
      }`}
    >
      <span className="relative block h-[22px] w-[26px]" aria-hidden>
        <Image
          src={LOGO_SRC}
          alt=""
          fill
          unoptimized
          priority={!onDarkFooter}
          sizes="52px"
          className="object-contain object-center"
        />
      </span>
    </span>
  );

  const label = (
    <span
      className={`font-display text-[11px] font-semibold uppercase tracking-[0.2em] ${
        onDarkFooter ? "text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.25)]" : "text-[color:var(--color-ink)]"
      }`}
      aria-hidden
    >
      {site.name}
    </span>
  );

  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      className={`group outline-offset-4 transition-[transform,opacity] duration-300 hover:-translate-y-0.5 hover:opacity-95 inline-flex flex-col items-center gap-1 self-start`}
    >
      {disc}
      {label}
    </Link>
  );
}
