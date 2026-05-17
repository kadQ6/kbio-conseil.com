import { headers } from "next/headers";
import type { AppLocale } from "./config";
import { normalizeLocale } from "./config";

export async function getRequestLocale(): Promise<AppLocale> {
  const h = await headers();
  return normalizeLocale(h.get("x-next-locale") ?? undefined);
}
