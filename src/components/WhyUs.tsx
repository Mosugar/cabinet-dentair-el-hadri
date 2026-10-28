import Image from "next/image";
import type { Dictionary } from "@/i18n/get-dictionary";
import { cn } from "@/lib/utils";
import { BlurText } from "./BlurText";
import { Reveal } from "./Reveal";

// Photos réelles du cabinet
const photos = [
  { src: "/images/clinic/room.webp", className: "row-span-2" },
  { src: "/images/clinic/scan-1.webp", className: "" },
  { src: "/images/clinic/scan-2.webp", className: "" },
];

export function WhyUs({ t }: { t: Dictionary }) {
  return (
    <section id="cabinet" className="px-3 sm:px-5">
      <div className="section-y rounded-[24px] bg-surface">
        <div className="container-x grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal className="grid h-[28rem] grid-cols-2 grid-rows-2 gap-3 sm:h-[36rem]">
            {photos.map((p) => (
              <div key={p.src} className={cn("relative overflow-hidden rounded-[24px] bg-line", p.className)}>
                <Image
                  src={p.src}
                  alt={t.gallery.alt}
                  fill
                  sizes="(min-width: 1024px) 300px, 45vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            ))}
          </Reveal>

          <div>
            <p className="label">{t.why.eyebrow}</p>
            <h2 className="mt-6 text-[clamp(2.2rem,4.4vw,3.8rem)] leading-[1.05] font-medium tracking-display text-ink">
              <BlurText text={t.why.title} onView stagger={0.05} />
            </h2>
            <p className="mt-5 max-w-lg text-lg text-muted">{t.why.subtitle}</p>

            <ul className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2">
              {t.why.points.map((p, i) => (
                <li key={p.title}>
                  <Reveal delay={i * 0.06} className="border-t border-line pt-5">
                    <span className="text-sm text-gold tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="mt-3 text-lg font-medium tracking-heading text-ink">{p.title}</h3>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-muted">{p.desc}</p>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
