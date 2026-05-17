import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { footerColumns, site } from "@/lib/site-data";
import { Container } from "./Container";
import { Logo } from "./Logo";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-[color:var(--color-ink)] text-white">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.18]"
        style={{
          background:
            "radial-gradient(900px 400px at 90% -10%, rgba(8,145,178,0.55), transparent 60%), radial-gradient(700px 400px at 0% 110%, rgba(255,255,255,0.12), transparent 60%)",
        }}
      />
      <Container className="relative pt-20 pb-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Logo variant="light" />
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-white/75">
              {site.longName}. Missions PSA, dossiers AO, bloc opératoire & fluides médicaux, avec des
              livrables compatibles bailleurs et audits internationaux.
            </p>
            <div className="mt-8 space-y-3 text-[14px] text-white/80">
              <p className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-[color:var(--color-teal)]" aria-hidden />
                {site.contact.address}
              </p>
              {!site.contact.phone.includes("X") ? (
              <p className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-[color:var(--color-teal)]" aria-hidden />
                <a href={`tel:${site.contact.phone.replace(/\s+/g, "")}`} className="hover:text-white">
                  {site.contact.phone}
                </a>
              </p>
              ) : null}
              <p className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-[color:var(--color-teal)]" aria-hidden />
                <a href={`mailto:${site.contact.email}`} className="hover:text-white">
                  {site.contact.email}
                </a>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-7">
            {footerColumns.map((col) => (
              <div key={col.title}>
                <p className="text-xs uppercase tracking-[0.2em] text-white/55">{col.title}</p>
                <ul className="mt-5 space-y-3">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-[14.5px] text-white/85 hover:text-white transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-white/10 pt-8 text-xs text-white/55 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {site.name}. {site.longName}.
          </p>
          <p className="num-tabular text-white/50">Paris · Djibouti · missions internationales</p>
        </div>
      </Container>
    </footer>
  );
}
