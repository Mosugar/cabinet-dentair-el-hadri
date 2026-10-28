import { ArrowUpRight, Phone } from "lucide-react";
import Image from "next/image";
import type { Dictionary } from "@/i18n/get-dictionary";
import { site } from "@/lib/site";
import { BlurText } from "./BlurText";
import { GoldWaves } from "./GoldWaves";
import { Reveal } from "./Reveal";

export function Hero({ t }: { t: Dictionary }) {
  const today = t.contact.schedule[0];

  return (
    <section id="top" className="container-x pt-[112px] pb-6 sm:pt-[136px]">
      <div className="grid items-stretch gap-6 lg:grid-cols-[1.2fr_1fr] lg:gap-6">
        {/* Texte */}
        <div className="flex flex-col justify-between rounded-[24px] bg-surface p-7 sm:p-10 lg:min-h-[min(74svh,720px)] lg:p-14">
          <Reveal>
            <p className="label">{t.hero.badge}</p>
          </Reveal>

          <div className="mt-16 lg:mt-0">
            <h1 className="text-[clamp(2.9rem,7.2vw,6.8rem)] leading-[0.98] font-medium tracking-display text-ink">
              <BlurText text={t.hero.titleStart} delay={0.1} />
              <br />
              <BlurText
                text={t.hero.titleHighlight}
                delay={0.35}
                wordClassName="text-gold pb-[0.08em]"
              />
            </h1>

            <Reveal delay={0.6}>
              <p className="mt-8 max-w-md text-lg leading-relaxed text-muted">{t.hero.subtitle}</p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a href="#rendez-vous" className="btn-pill">
                  {t.hero.book}
                  <ArrowUpRight className="size-4 rtl:-scale-x-100" />
                </a>
                <a href={site.phones[0].href} className="btn-ghost bg-white/60">
                  <Phone className="size-4" />
                  {t.hero.call}
                </a>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Carte noire et or, comme la carte de visite du cabinet */}
        <Reveal delay={0.2} className="relative min-h-[420px] overflow-hidden rounded-[24px] bg-ink">
          <div className="absolute inset-0">
            <GoldWaves />
          </div>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(10,10,10,0.15) 0%, rgba(10,10,10,0.75) 100%)",
            }}
          />

          <div className="absolute inset-0 grid place-items-center">
            <div className="grid size-36 place-items-center rounded-full bg-ink/70 ring-1 ring-gold/30 backdrop-blur-md sm:size-44">
              <Image src="/brand/logo-mark.png" alt="" width={92} height={87} className="sm:w-[110px]" />
            </div>
          </div>

          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 sm:p-8">
            <p className="text-[13px] text-white/80">
              <span className="text-gold">[ </span>
              {t.hero.cardPlace}
              <span className="text-gold"> ]</span>
            </p>
            <a href={site.phones[0].href} dir="ltr" className="text-[13px] font-medium text-white hover:text-gold-light">
              {site.phones[0].display}
            </a>
          </div>
        </Reveal>
      </div>

      {/* Bandeau d'infos pratiques */}
      <Reveal delay={0.4}>
        <dl className="mt-6 grid gap-px overflow-hidden rounded-[24px] border border-line bg-line sm:grid-cols-3">
          <InfoCell label={t.contact.phone}>
            <a href={site.phones[0].href} dir="ltr" className="hover:text-gold">
              {site.phones[0].display}
            </a>
          </InfoCell>
          <InfoCell label={t.contact.address}>{t.hero.cardPlace}</InfoCell>
          <InfoCell label={t.contact.hours}>
            {today.days} · <span dir="ltr">{today.time}</span>
          </InfoCell>
        </dl>
      </Reveal>
    </section>
  );
}

function InfoCell({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="bg-paper px-6 py-5 sm:px-8">
      <dt className="text-[13px] text-subtle">{label}</dt>
      <dd className="mt-1 font-medium text-ink">{children}</dd>
    </div>
  );
}
