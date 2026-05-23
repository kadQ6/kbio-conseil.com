import Image from "next/image";
import Link from "next/link";

type Variant = "default" | "light";

/** Logo officiel PNG — `public/images/logo/kbio-logo.png`. */
const LOGO_SRC = "/images/logo/kbio-logo.png";

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

  const mark = (
    <span className="relative block h-9 w-[100px] sm:h-10 sm:w-[112px]">
      <Image
        src={LOGO_SRC}
        alt="K'BIO"
        fill
        unoptimized
        priority={!onDarkFooter}
        sizes="112px"
        className="object-contain object-left"
      />
    </span>
  );

  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      className="group inline-flex items-center transition-transform duration-300 hover:-translate-y-0.5"
    >
      {onDarkFooter ? (
        <span className="inline-flex rounded-2xl bg-white px-2.5 py-1 shadow-[var(--shadow-soft)] ring-1 ring-black/5">
          {mark}
        </span>
      ) : (
        mark
      )}
    </Link>
  );
}
