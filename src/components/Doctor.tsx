import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import type { Dictionary } from "@/i18n/get-dictionary";
import { BlurText } from "./BlurText";
import { Reveal } from "./Reveal";

export function Doctor({ t }: { t: Dictionary }) {
  return (
    <section id="docteur" className="container-x section-y">
      <div className="grid gap-6 border-t border-line pt-6 md:grid-cols-[1fr_2fr] md:gap-12">
        <p className="label">{t.doctor.eyebrow}</p>

        <div>
          <blockquote className="text-[clamp(1.9rem,4vw,3.4rem)] leading-[1.15] font-medium tracking-heading text-ink">
            <span className="text-gold">“</span>
            <BlurText text={t.doctor.quote} onView stagger={0.03} />
            <span className="text-gold">”</span>
          </blockquote>

          <Reveal delay={0.2}>
            <div className="mt-12 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex items-center gap-4">
                {/* EN ATTENTE : photo du docteur */}
                <span className="grid size-14 shrink-0 place-items-center rounded-full bg-ink">
                  <Image src="/brand/logo-mark.png" alt="" width={30} height={28} />
                </span>
                <div>
                  <p className="font-medium text-ink">{t.doctor.name}</p>
                  <p className="text-sm text-muted">{t.doctor.role}</p>
                  <p className="mt-1 max-w-sm text-sm text-subtle">{t.doctor.bio}</p>
                </div>
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
