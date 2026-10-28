import { ArrowUpRight } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { mapDirectionsUrl, site } from "@/lib/site";
import { MapCard } from "./MapCard";
import { Reveal } from "./Reveal";
import { SectionHead } from "./ui";

export function Contact({ t, lang }: { t: Dictionary; lang: Locale }) {
  const c = t.contact;
  const addressText = t.faq.items[t.faq.items.length - 1].a;

  return (
    <section id="contact" className="container-x pb-[clamp(80px,11vw,160px)]">
      <SectionHead label={c.eyebrow} title={c.title} />

      <div className="mt-16 grid gap-10 md:grid-cols-[1fr_2fr] md:gap-12">
        <Reveal>
          <dl className="divide-y divide-line border-y border-line">
            <Row label={c.address}>
              <p>{addressText}</p>
              <a
                href={mapDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-1 text-sm text-ink underline decoration-gold underline-offset-4 hover:text-gold"
              >
                {c.directions}
                <ArrowUpRight className="size-3.5 rtl:-scale-x-100" />
              </a>
            </Row>
            <Row label={c.phone}>
              {site.phones.map((p) => (
                <a key={p.href} href={p.href} dir="ltr" className="block w-fit hover:text-gold">
                  {p.display}
                </a>
              ))}
            </Row>
            <Row label={c.email}>
              <a href={`mailto:${site.email}`} className="break-all hover:text-gold">
                {site.email}
              </a>
            </Row>
            <Row label={c.hours}>
              {c.schedule.map((s) => (
                <div key={s.days} className="flex justify-between gap-4">
                  <span>{s.days}</span>
                  <span dir="ltr" className="text-muted">
                    {s.time}
                  </span>
                </div>
              ))}
            </Row>
          </dl>
        </Reveal>

        <Reveal delay={0.1} className="h-full">
          <MapCard lang={lang} title={c.address} address={addressText} mapTitle={c.mapTitle} directionsLabel={c.directions} />
        </Reveal>
      </div>
    </section>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="py-5">
      <dt className="text-[13px] text-subtle">{label}</dt>
      <dd className="mt-1.5 space-y-0.5 text-ink">{children}</dd>
    </div>
  );
}
