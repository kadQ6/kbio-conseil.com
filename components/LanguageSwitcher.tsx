"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { AppLocale } from "@/lib/i18n/config";
import { switchLocaleHref } from "@/lib/i18n/paths";
import type { ChromeStrings } from "@/lib/copy/chrome";

export function LanguageSwitcher({ chrome }: { chrome: ChromeStrings }) {
  const pathname = usePathname() ?? "/";
  const locale: AppLocale = pathname === "/en" || pathname.startsWith("/en/") ? "en" : "fr";
  const frHref = switchLocaleHref(pathname, "fr");
  const enHref = switchLocaleHref(pathname, "en");

  const pill =
    "inline-flex h-9 min-w-[4.75rem] items-center justify-center rounded-full px-3 text-[12px] font-bold tracking-[0.12em] transition-colors";

  return (
    <nav
      aria-label={chrome.langSwitcherNavAria}
      className="inline-flex shrink-0 items-center gap-px rounded-full border border-[color:var(--color-line)] bg-[color:var(--color-soft)] p-0.5 shadow-sm"
    >
      <Link
        href={frHref}
        hrefLang="fr"
        lang="fr"
        aria-label={chrome.langAriaToFr}
        aria-current={locale === "fr" ? "page" : undefined}
        className={`${pill} ${
          locale === "fr"
            ? "bg-white text-[color:var(--color-ink)] shadow-sm ring-1 ring-[color:var(--color-line)]"
            : "text-[color:var(--color-muted-strong)] hover:text-[color:var(--color-ink)]"
        }`}
      >
        {chrome.langShortFr}
      </Link>
      <Link
        href={enHref}
        hrefLang="en"
        lang="en"
        aria-label={chrome.langAriaToEn}
        aria-current={locale === "en" ? "page" : undefined}
        className={`${pill} ${
          locale === "en"
            ? "bg-white text-[color:var(--color-ink)] shadow-sm ring-1 ring-[color:var(--color-line)]"
            : "text-[color:var(--color-muted-strong)] hover:text-[color:var(--color-ink)]"
        }`}
      >
        {chrome.langShortEn}
      </Link>
    </nav>
  );
}
