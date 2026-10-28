"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CircleCheck } from "lucide-react";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import type { Dictionary } from "@/i18n/get-dictionary";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { WhatsAppIcon } from "./icons";
import { SectionHead } from "./ui";

// Accepte 06…, 07…, 05…, +212…, 00212… avec ou sans espaces
const isMoroccanPhone = (v: string) => /^(\+212|00212|0)[5-7]\d{8}$/.test(v.replace(/[\s.-]/g, ""));

function makeSchema(t: Dictionary["booking"]) {
  return z.object({
    name: z.string().trim().min(2, t.errors.name),
    phone: z.string().trim().refine(isMoroccanPhone, t.errors.phone),
    service: z.string().min(1, t.errors.service),
    date: z.string().optional(),
    message: z.string().max(500).optional(),
  });
}
type FormValues = z.infer<ReturnType<typeof makeSchema>>;

// Champs "ligne" sur fond noir, soulignés en or au focus
const field =
  "w-full border-0 border-b border-white/20 bg-transparent px-0 py-3 text-lg text-white outline-none transition-colors placeholder:text-white/30 focus:border-gold";

export function Booking({ t }: { t: Dictionary }) {
  const b = t.booking;
  const schema = useMemo(() => makeSchema(b), [b]);
  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = (v: FormValues) => {
    const lines = [
      b.wa.intro,
      "",
      `${b.wa.name} : ${v.name}`,
      `${b.wa.phone} : ${v.phone}`,
      `${b.wa.service} : ${v.service}`,
      v.date ? `${b.wa.date} : ${v.date}` : null,
      v.message ? `${b.wa.message} : ${v.message}` : null,
    ].filter((l) => l !== null);

    window.open(`${site.whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`, "_blank", "noopener,noreferrer");
    setSent(true);
  };

  const services = [...t.services.items.map((s) => s.title), b.fields.serviceOther];

  return (
    <section id="rendez-vous" className="px-3 sm:px-5">
      <div className="section-y relative overflow-hidden rounded-[24px] bg-ink">
        {/* lueur dorée discrète */}
        <div aria-hidden className="pointer-events-none absolute -top-40 start-1/3 size-[36rem] rounded-full bg-gold/15 blur-[120px]" />

        <div className="container-x relative">
          <SectionHead invert label={b.eyebrow} title={b.title} subtitle={b.subtitle} />

          <div className="mt-16 grid gap-14 md:grid-cols-[1fr_2fr] md:gap-12">
            <div>
              <p className="text-[13px] text-white/50">{b.orCall}</p>
              <ul className="mt-3 space-y-1">
                {site.phones.map((p) => (
                  <li key={p.href}>
                    <a href={p.href} dir="ltr" className="text-2xl font-medium tracking-heading text-white transition-colors hover:text-gold-light">
                      {p.display}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} noValidate className="[color-scheme:dark]">
              <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
                <Field label={b.fields.name} error={errors.name?.message} htmlFor="name">
                  <input id="name" autoComplete="name" className={field} {...register("name")} />
                </Field>
                <Field label={b.fields.phone} error={errors.phone?.message} htmlFor="phone">
                  <input
                    id="phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    dir="ltr"
                    placeholder="06 12 34 56 78"
                    className={cn(field, "text-start rtl:text-end")}
                    {...register("phone")}
                  />
                </Field>
                <Field label={b.fields.service} error={errors.service?.message} htmlFor="service">
                  <select id="service" defaultValue="" className={cn(field, "[&>option]:bg-ink")} {...register("service")}>
                    <option value="" disabled>
                      {b.fields.servicePlaceholder}
                    </option>
                    {services.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label={b.fields.date} htmlFor="date">
                  <input id="date" type="date" className={field} {...register("date")} />
                </Field>
                <Field label={b.fields.message} htmlFor="message" className="sm:col-span-2">
                  <textarea id="message" rows={3} className={cn(field, "resize-none")} {...register("message")} />
                </Field>
              </div>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                <button
                  type="submit"
                  className="bg-gold inline-flex h-14 items-center justify-center gap-2.5 rounded-full px-8 font-medium text-ink transition-transform duration-300 hover:-translate-y-0.5 active:scale-[0.98]"
                >
                  <WhatsAppIcon className="size-5" />
                  {b.submit}
                </button>
                {sent && (
                  <p role="status" className="flex items-center gap-2 text-sm text-white/70">
                    <CircleCheck className="size-5 shrink-0 text-gold" />
                    {b.sent}
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  error,
  htmlFor,
  className,
  children,
}: {
  label: string;
  error?: string;
  htmlFor: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="block text-[13px] text-white/50">
        {label}
      </label>
      {children}
      {error && <p className="mt-2 text-sm text-[#ff8a7a]">{error}</p>}
    </div>
  );
}
