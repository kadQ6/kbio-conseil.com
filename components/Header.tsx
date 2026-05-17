"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { ChromeStrings } from "@/lib/copy/chrome";
import type { AppLocale } from "@/lib/i18n/config";
import { localizeHref, stripLocalePath } from "@/lib/i18n/paths";
import { Logo } from "./Logo";
import { ButtonLink } from "./Button";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Header({ chrome, locale }: { chrome: ChromeStrings; locale: AppLocale }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathBase = pathname ? stripLocalePath(pathname) : "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/85 backdrop-blur-md border-b border-[color:var(--color-line)]"
          : "bg-transparent"
      }`}
    >
      <div className="container-cimb flex h-[72px] items-center justify-between gap-6">
        <Logo
          href={localizeHref(locale, "/")}
          ariaLabel={chrome.logoAriaHome}
        />

        <nav aria-label="Navigation principale" className="hidden lg:flex items-center gap-1">
          {chrome.navigation.map((item) => {
            const href = localizeHref(locale, item.href);
            const active =
              pathBase === item.href || (item.href !== "/" && pathBase.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={href}
                lang={locale}
                className={`relative px-3.5 py-2 text-[13.5px] font-medium rounded-full transition-colors ${
                  active
                    ? "text-[color:var(--color-ink)]"
                    : "text-[color:var(--color-muted-strong)] hover:text-[color:var(--color-ink)]"
                }`}
              >
                {item.label}
                {active && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute inset-x-3 -bottom-0.5 h-[2px] rounded-full bg-[color:var(--color-teal)]"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <LanguageSwitcher chrome={chrome} />
          <ButtonLink href={localizeHref(locale, "/contact")} variant="secondary" size="md">
            {chrome.headerCtaRdv}
            <ArrowUpRight className="h-4 w-4" />
          </ButtonLink>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <LanguageSwitcher chrome={chrome} />
          <button
            aria-label={mobileOpen ? chrome.mobileMenuClose : chrome.mobileMenuOpen}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full border border-[color:var(--color-line)] bg-white"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden border-t border-[color:var(--color-line)] bg-white"
          >
            <nav aria-label="Navigation mobile" className="container-cimb py-6 flex flex-col gap-1">
              {chrome.navigation.map((item) => {
                const href = localizeHref(locale, item.href);
                const active = pathBase === item.href;
                return (
                  <Link
                    key={item.href}
                    href={href}
                    className={`flex items-center justify-between rounded-xl px-4 py-3.5 text-base font-medium transition-colors ${
                      active
                        ? "bg-[color:var(--color-soft)] text-[color:var(--color-ink)]"
                        : "text-[color:var(--color-muted-strong)] hover:bg-[color:var(--color-soft)]"
                    }`}
                  >
                    {item.label}
                    <ArrowUpRight className="h-4 w-4 text-[color:var(--color-teal)]" />
                  </Link>
                );
              })}
              <div className="mt-4">
                <ButtonLink href={localizeHref(locale, "/contact")} variant="secondary" size="lg" className="w-full">
                  {chrome.headerCtaRdv}
                </ButtonLink>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
