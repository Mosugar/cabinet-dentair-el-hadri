import { ArrowUpRight, Navigation } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { site } from "@/lib/site";

/*
  Carte Google Maps en fond de la carte (position exacte de la fiche Google),
  avec un encart en verre par-dessus : adresse + Itinéraire + Waze + Google Maps.
*/
export function MapCard({
  lang,
  title,
  address,
  mapTitle,
  directionsLabel,
}: {
  lang: Locale;
  title: string;
  address: string;
  mapTitle: string;
  directionsLabel: string;
}) {
  const { lat, lng } = site.geo;
  const src = `https://maps.google.com/maps?q=${lat},${lng}&z=17&hl=${lang}&output=embed`;

  return (
    <div className="relative h-full min-h-[28rem] overflow-hidden rounded-[24px] bg-surface ring-1 ring-line">
      <iframe
        title={mapTitle}
        src={src}
        className="absolute inset-0 h-full w-full border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />

      {/* Encart en verre */}
      <div className="pointer-events-none absolute inset-x-3 bottom-3 sm:inset-x-auto sm:start-3">
        <div className="pointer-events-auto flex flex-col gap-4 rounded-[18px] bg-ink/85 p-5 shadow-[0_20px_50px_rgba(10,10,10,0.35)] ring-1 ring-gold/25 backdrop-blur-xl sm:max-w-sm">
          <div>
            <p className="text-[13px] text-gold">{title}</p>
            <p className="mt-1 leading-snug text-white">{address}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <a
              href={site.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gold inline-flex h-10 items-center gap-2 rounded-full px-4 text-sm font-medium text-ink transition-transform hover:-translate-y-0.5"
            >
              <Navigation className="size-4" />
              {directionsLabel}
            </a>
            <a
              href={site.wazeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center gap-1.5 rounded-full px-4 text-sm font-medium text-white ring-1 ring-white/20 transition-colors hover:bg-white/10"
            >
              Waze
              <ArrowUpRight className="size-3.5 rtl:-scale-x-100" />
            </a>
            <a
              href={site.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center gap-1.5 rounded-full px-4 text-sm font-medium text-white ring-1 ring-white/20 transition-colors hover:bg-white/10"
            >
              Google Maps
              <ArrowUpRight className="size-3.5 rtl:-scale-x-100" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
