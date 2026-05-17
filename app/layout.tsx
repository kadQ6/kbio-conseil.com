import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";
import { site } from "@/lib/site-data";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.longName}`,
    template: `%s | ${site.name}`,
  },
  applicationName: site.name,
  category: "Healthcare engineering",
};

export const viewport: Viewport = {
  themeColor: "#003F72",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = ((await headers()).get("x-next-locale") ?? "fr") === "en" ? "en" : "fr";

  return (
    <html lang={locale === "en" ? "en" : "fr"} suppressHydrationWarning className={inter.variable}>
      <body className="min-h-screen flex flex-col antialiased bg-white">{children}</body>
    </html>
  );
}
