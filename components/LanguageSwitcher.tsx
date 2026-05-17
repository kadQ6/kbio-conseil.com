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

  const segment =
    "inline-flex size-[26px] items-center justify-center rounded-full text-[10px] font-semibold uppercase tracking-[0.06em] transition-[color,background-color,box-shadow] duration-200";

  return (
    <nav
      aria-label={chrome.langSwitcherNavAria}
      className="inline-flex shrink-0 items-center gap-0 rounded-full border border-[color:var(--color-line)] bg-[color:var(--color-soft)] p-[3px]"
    >
      <Link
        href={frHref}
        hrefLang="fr"
        lang="fr"
        aria-label={chrome.langAriaToFr}
        aria-current={locale === "fr" ? "page" : undefined}
        className={`${segment} ${
          locale === "fr"
            ? "bg-[color:var(--color-teal)] text-white shadow-[var(--shadow-ring)]"
            : "text-[color:var(--color-muted-strong)] hover:bg-white/70 hover:text-[color:var(--color-ink)]"
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
        className={`${segment} ${
          locale === "en"
            ? "bg-[color:var(--color-teal)] text-white shadow-[var(--shadow-ring)]"
            : "text-[color:var(--color-muted-strong)] hover:bg-white/70 hover:text-[color:var(--color-ink)]"
        }`}
      >
        {chrome.langShortEn}
      </Link>
    </nav>
  );
}
