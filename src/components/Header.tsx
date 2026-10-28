"use client";

import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { LangSwitcher } from "./LangSwitcher";

export function Header({ t, lang }: { t: Dictionary; lang: Locale }) {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");

  const links = [
    { id: "services", label: t.nav.services },
    { id: "cabinet", label: t.nav.why },
    { id: "docteur", label: t.nav.doctor },
    { id: "faq", label: t.nav.faq },
    { id: "contact", label: t.nav.contact },
  ];

  // Se cache quand on descend, revient quand on remonte
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      if (Math.abs(y - lastY) > 8) {
        setHidden(y > lastY && y > 160);
        lastY = y;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Point doré sous le lien de la section visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ["services", "cabinet", "docteur", "faq", "contact"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Menu mobile : bloque le scroll, ferme avec Échap
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 pt-3 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:pt-5",
          hidden && !open ? "-translate-y-[140%]" : "translate-y-0",
        )}
      >
        <div className="container-x">
          <nav
            aria-label="Navigation"
            className={cn(
              "flex h-[60px] items-center justify-between rounded-full border ps-3 pe-2 backdrop-blur-xl transition-colors duration-300",
              scrolled || open
                ? "border-line bg-white/85 shadow-[0_8px_30px_rgba(10,10,10,0.06)]"
                : "border-black/5 bg-white/60",
            )}
          >
            <Link href={`/${lang}`} onClick={() => setOpen(false)} className="flex items-center gap-2.5">
              <Image src="/brand/logo-mark.png" alt="" width={36} height={34} priority />
              <span className="leading-none">
                <span className="block text-[11px] text-muted">{t.brand.line1}</span>
                <span className="mt-0.5 block text-[15px] font-semibold tracking-heading text-ink">{t.brand.line2}</span>
              </span>
            </Link>

            <ul className="hidden items-center gap-1 lg:flex">
              {links.map((l) => (
                <li key={l.id}>
                  <a
                    href={`#${l.id}`}
                    className={cn(
                      "relative rounded-full px-4 py-2 text-[15px] transition-colors hover:text-ink",
                      active === l.id ? "text-ink" : "text-muted",
                    )}
                  >
                    {l.label}
                    <span
                      className={cn(
                        "absolute bottom-[5px] left-1/2 size-[4px] -translate-x-1/2 rounded-full bg-gold transition-opacity duration-300",
                        active === l.id ? "opacity-100" : "opacity-0",
                      )}
                    />
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2">
              <LangSwitcher lang={lang} label={t.nav.language} className="hidden sm:flex" />
              <a href="#rendez-vous" className="btn-pill hidden !h-11 !px-5 sm:inline-flex">
                {t.nav.cta}
                <ArrowUpRight className="size-4 rtl:-scale-x-100" />
              </a>
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-controls="mobile-menu"
                className="btn-ghost !h-11 !px-5 lg:!hidden"
              >
                {open ? t.nav.closeMenu : t.nav.openMenu}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Menu mobile plein écran */}
      <div
        id="mobile-menu"
        aria-hidden={!open}
        className={cn(
          "fixed inset-0 z-40 flex flex-col overflow-y-auto bg-paper px-5 pt-[100px] pb-8 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] lg:hidden",
          open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-3 opacity-0",
        )}
      >
        <ul>
          {links.map((l, i) => (
            <li key={l.id} className="border-b border-line">
              <a
                href={`#${l.id}`}
                onClick={() => setOpen(false)}
                className="flex items-baseline gap-4 py-4 text-[clamp(1.8rem,8vw,2.6rem)] font-medium leading-none tracking-heading text-ink"
              >
                <span className="w-8 text-xs font-normal tracking-normal text-gold">[{String(i + 1).padStart(2, "0")}]</span>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-col gap-4">
          <a href="#rendez-vous" onClick={() => setOpen(false)} className="btn-pill w-full">
            {t.nav.cta}
            <ArrowUpRight className="size-4 rtl:-scale-x-100" />
          </a>
          <a href={site.phones[0].href} className="btn-ghost w-full" dir="ltr">
            {site.phones[0].display}
          </a>
          <LangSwitcher lang={lang} label={t.nav.language} className="mt-2 self-center" />
        </div>
      </div>
    </>
  );
}
