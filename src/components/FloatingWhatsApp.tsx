import { site } from "@/lib/site";
import { WhatsAppIcon } from "./icons";

export function FloatingWhatsApp({ label }: { label: string }) {
  return (
    <a
      href={site.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      className="fixed end-5 bottom-5 z-40 grid size-14 place-items-center rounded-full bg-ink text-white shadow-[0_10px_30px_rgba(10,10,10,0.25)] ring-1 ring-gold/40 transition duration-300 hover:scale-105 hover:ring-gold"
    >
      <WhatsAppIcon className="size-6" />
    </a>
  );
}
