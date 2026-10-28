"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LOCALE_COOKIE, locales, type Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

const short: Record<Locale, string> = { fr: "FR", ar: "عربي" };

// Mémorise le choix pour les prochaines visites (lu par src/proxy.ts)
function rememberLocale(l: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${l}; path=/; max-age=31536000; samesite=lax`;
}

export function LangSwitcher({ lang, label, className }: { lang: Locale; label: string; className?: string }) {
  const pathname = usePathname();
  const rest = pathname.replace(/^\/(fr|ar)(?=\/|$)/, "");

  return (
    <div role="group" aria-label={label} className={cn("flex rounded-full border border-line bg-white/70 p-0.5", className)}>
      {locales.map((l) => (
        <Link
          key={l}
          href={`/${l}${rest}`}
          hrefLang={l}
          lang={l}
          onClick={() => rememberLocale(l)}
          aria-current={l === lang ? "true" : undefined}
          className={cn(
            "rounded-full px-3 py-1.5 text-[13px] font-medium transition",
            l === lang ? "bg-ink text-white" : "text-muted hover:text-ink",
          )}
        >
          {short[l]}
        </Link>
      ))}
    </div>
  );
}
