import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { defaultLocale, type AppLocale } from "@/lib/i18n/config";

function hasEnPrefix(pathname: string): boolean {
  return pathname === "/en" || pathname.startsWith("/en/");
}

function localeFromPathname(pathname: string): AppLocale {
  return hasEnPrefix(pathname) ? "en" : defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/favicon.ico" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml"
  ) {
    return NextResponse.next();
  }

  if (/\.[a-zA-Z0-9]+$/.test(pathname)) {
    return NextResponse.next();
  }

  // Redirect explicit /fr/* to unprefixed French URLs
  if (pathname === "/fr" || pathname === "/fr/") {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url, 308);
  }
  if (pathname.startsWith("/fr/")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(3) || "/";
    return NextResponse.redirect(url, 308);
  }

  const locale = localeFromPathname(pathname);

  if (hasEnPrefix(pathname)) {
    const res = NextResponse.next();
    res.headers.set("x-next-locale", locale);
    return res;
  }

  const url = request.nextUrl.clone();
  const suffix = pathname === "/" ? "" : pathname;
  url.pathname = `/${defaultLocale}${suffix}`;
  const res = NextResponse.rewrite(url);
  res.headers.set("x-next-locale", locale);
  return res;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)"],
};
