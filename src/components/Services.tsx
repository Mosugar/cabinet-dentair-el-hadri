import type { Dictionary } from "@/i18n/get-dictionary";
import { Reveal } from "./Reveal";
import { SectionHead } from "./ui";

export function Services({ t }: { t: Dictionary }) {
  return (
    <section id="services" className="container-x section-y">
      <SectionHead label={t.services.eyebrow} title={t.services.title} subtitle={t.services.subtitle} />

      <ul className="mt-16 border-t border-line md:mt-20">
        {t.services.items.map((s, i) => (
          <li key={s.key}>
            <Reveal delay={(i % 4) * 0.05}>
              <div className="group grid grid-cols-[2.5rem_1fr] gap-4 border-b border-line py-7 md:grid-cols-[1fr_2fr] md:gap-12 md:py-9">
                <span className="pt-1.5 text-sm text-subtle tabular-nums transition-colors group-hover:text-gold">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between md:gap-10">
                  <h3 className="text-[clamp(1.6rem,3vw,2.6rem)] leading-tight font-medium tracking-heading text-ink transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-2 rtl:group-hover:-translate-x-2">
                    <span className="transition-colors group-hover:text-gold">{s.title}</span>
                  </h3>
                  <p className="text-muted md:max-w-xs md:text-end">{s.desc}</p>
                </div>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
