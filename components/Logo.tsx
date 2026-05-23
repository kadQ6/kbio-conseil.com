import Image from "next/image";
import Link from "next/link";

type Variant = "default" | "light";

/**
 * Composition verticale (disque K + typo) — fichier fourni équivalent « image 2 ».
 */
const LOCKUP_SRC = "/images/logo/kbio-lockup-vertical.png";

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

  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      className="group outline-offset-4 transition-[transform,opacity] duration-300 hover:-translate-y-0.5 hover:opacity-95 inline-flex self-start"
    >
      <Image
        src={LOCKUP_SRC}
        alt=""
        width={218}
        height={202}
        unoptimized
        priority={!onDarkFooter}
        sizes="120px"
        className={`block w-auto object-contain object-left ${
          onDarkFooter ? "h-[72px] sm:h-[76px]" : "h-[62px] sm:h-[68px]"
        } ${onDarkFooter ? "brightness-[1.06] contrast-[1.02]" : ""}`}
      />
    </Link>
  );
}
