import { cn } from "@/lib/utils";
import { BlurText } from "./BlurText";

// Titre de section : filet fin, étiquette [ … ] à gauche, grand titre à droite (comme Wardd).
export function SectionHead({
  label,
  title,
  subtitle,
  invert = false,
  className,
}: {
  label: string;
  title: string;
  subtitle?: string;
  invert?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid gap-6 border-t pt-6 md:grid-cols-[1fr_2fr] md:gap-12",
        invert ? "border-white/15" : "border-line",
        className,
      )}
    >
      <p className={cn("label", invert && "text-white")}>{label}</p>
      <div>
        <h2
          className={cn(
            "text-[clamp(2.2rem,5vw,4.25rem)] font-medium leading-[1.05] tracking-display",
            invert ? "text-white" : "text-ink",
          )}
        >
          <BlurText text={title} onView stagger={0.05} />
        </h2>
        {subtitle && <p className={cn("mt-5 max-w-xl text-lg", invert ? "text-white/60" : "text-muted")}>{subtitle}</p>}
      </div>
    </div>
  );
}
