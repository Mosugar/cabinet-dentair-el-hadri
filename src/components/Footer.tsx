import Image from "next/image";
import type { Dictionary } from "@/i18n/get-dictionary";
import { site } from "@/lib/site";

const YEAR = new Date().getFullYear();

export function Footer({ t }: { t: Dictionary }) {
  const links = [
    { href: "#services", label: t.nav.services },
    { href: "#cabinet", label: t.nav.why },
    { href: "#docteur", label: t.nav.doctor },
    { href: "#rendez-vous", label: t.nav.cta },
    { href: "#faq", label: t.nav.faq },
    { href: "#contact", label: t.nav.contact },
  ];

  return (
    <footer className="px-3 pb-3 sm:px-5 sm:pb-5">
      <div className="overflow-hidden rounded-[24px] bg-ink text-white/60">
        <div className="container-x grid gap-12 pt-16 pb-10 md:grid-cols-[1fr_1fr_1fr]">
          <div>
            <Image src="/brand/logo-mark.png" alt="" width={48} height={45} />
            <p className="mt-5 max-w-xs">{t.footer.tagline}</p>
          </div>

          <div>
            <p className="label text-white">{t.footer.links}</p>
            <ul className="mt-5 space-y-2">
              {links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="transition-colors hover:text-white">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="label text-white">{t.footer.contact}</p>
            <ul className="mt-5 space-y-2">
              {site.phones.map((p) => (
                <li key={p.href}>
                  <a href={p.href} dir="ltr" className="transition-colors hover:text-white">
                    {p.display}
                  </a>
                </li>
              ))}
              <li>
                <a href={`mailto:${site.email}`} className="break-all transition-colors hover:text-white">
                  {site.email}
                </a>
              </li>
              <li>
                <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" dir="ltr" className="transition-colors hover:text-white">
                  Instagram {site.instagram.handle}
                </a>
              </li>
              <li>
                <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Grand nom en or, en bas de page */}
        <div className="container-x overflow-hidden">
          <p
            aria-hidden
            className="text-gold -mb-[0.18em] text-[clamp(4.5rem,19vw,17rem)] leading-none font-medium tracking-display select-none"
          >
            {t.brand.short}
          </p>
        </div>

        <div className="border-t border-white/10">
          <p className="container-x py-5 text-[13px] text-white/40">
            © {YEAR} {site.name}. {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
