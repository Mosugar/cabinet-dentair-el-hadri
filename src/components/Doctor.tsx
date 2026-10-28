import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import type { Dictionary } from "@/i18n/get-dictionary";
import { BlurText } from "./BlurText";
import { Reveal } from "./Reveal";

export function Doctor({ t }: { t: Dictionary }) {
  return (
    <section id="docteur" className="container-x section-y">
      <div className="grid gap-10 border-t border-line pt-6 md:grid-cols-[1fr_2fr] md:gap-12">
        <div>
          <p className="label">{t.doctor.eyebrow}</p>
          <Reveal delay={0.1} className="relative mt-8 aspect-[4/5] overflow-hidden rounded-[24px] bg-surface">
            <Image
              src="/images/clinic/portrait.webp"
              alt={`${t.doctor.name}, ${t.doctor.role}`}
              fill
              sizes="(min-width: 768px) 30vw, 90vw"
              className="object-cover"
            />
            <span className="absolute start-4 bottom-4 rounded-full bg-ink/70 px-3 py-1 text-[12px] text-white backdrop-blur-md">
              <span className="text-gold">● </span>
              {t.brand.line1} {t.brand.line2}
            </span>
          </Reveal>
        </div>

        <div className="flex flex-col justify-between gap-12">
          <blockquote className="text-[clamp(1.9rem,4vw,3.4rem)] leading-[1.15] font-medium tracking-heading text-ink">
            <span className="text-gold">“</span>
            <BlurText text={t.doctor.quote} onView stagger={0.03} />
            <span className="text-gold">”</span>
          </blockquote>

          <Reveal delay={0.2}>
            <div className="flex flex-col gap-8 border-t border-line pt-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-lg font-medium text-ink">{t.doctor.name}</p>
                <p className="text-sm text-muted">{t.doctor.role}</p>
                <p className="mt-2 max-w-sm text-sm text-subtle">{t.doctor.bio}</p>
              </div>
              <a href="#rendez-vous" className="btn-ghost self-start sm:self-auto">
                {t.doctor.cta}
                <ArrowUpRight className="size-4 rtl:-scale-x-100" />
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
