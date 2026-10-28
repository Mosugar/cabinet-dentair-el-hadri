import { Plus } from "lucide-react";
import type { Dictionary } from "@/i18n/get-dictionary";
import { Reveal } from "./Reveal";
import { SectionHead } from "./ui";

export function Faq({ t }: { t: Dictionary }) {
  return (
    <section id="faq" className="container-x section-y">
      <SectionHead label={t.faq.eyebrow} title={t.faq.title} />

      <div className="mt-16 grid md:grid-cols-[1fr_2fr] md:gap-12">
        <div />
        <ul className="border-t border-line">
          {t.faq.items.map((item, i) => (
            <li key={item.q}>
              <Reveal delay={i * 0.04}>
                <details className="group border-b border-line">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-lg font-medium tracking-heading text-ink transition-colors hover:text-gold [&::-webkit-details-marker]:hidden">
                    {item.q}
                    <span className="grid size-9 shrink-0 place-items-center rounded-full border border-line transition-all duration-300 group-open:rotate-45 group-open:border-gold group-open:text-gold">
                      <Plus className="size-4" />
                    </span>
                  </summary>
                  <p className="max-w-2xl pb-7 leading-relaxed text-muted">{item.a}</p>
                </details>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
