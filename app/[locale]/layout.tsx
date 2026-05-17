import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEOJsonLd } from "@/components/SEOJsonLd";
import { organizationJsonLd, professionalServiceJsonLd } from "@/lib/seo";
import { locales, normalizeLocale, type AppLocale } from "@/lib/i18n/config";
import { getChrome } from "@/lib/copy/chrome";

export function generateStaticParams(): { locale: AppLocale }[] {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!locales.includes(raw as AppLocale)) notFound();

  const locale = normalizeLocale(raw);
  const chrome = getChrome(locale);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-[color:var(--color-ink)] focus:px-4 focus:py-2 focus:text-white"
      >
        {chrome.skipToContent}
      </a>
      <Header chrome={chrome} locale={locale} />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer chrome={chrome} locale={locale} />
      <SEOJsonLd data={[organizationJsonLd(), professionalServiceJsonLd()]} />
    </>
  );
}
