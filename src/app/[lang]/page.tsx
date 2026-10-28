import { notFound } from "next/navigation";
import { Booking } from "@/components/Booking";
import { Contact } from "@/components/Contact";
import { Doctor } from "@/components/Doctor";
import { Faq } from "@/components/Faq";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { WhyUs } from "@/components/WhyUs";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { site } from "@/lib/site";

// Données structurées pour Google (recherche locale "dentiste Salé")
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Dentist",
  name: site.name,
  url: site.url,
  email: site.email,
  telephone: "+212538707030",
  image: `${site.url}/brand/logo.png`,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    postalCode: site.address.postalCode,
    addressRegion: "Rabat-Salé-Kénitra",
    addressCountry: "MA",
  },
  geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng },
  hasMap: site.mapsUrl,
  sameAs: [site.instagram.url],
};

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang);

  return (
    <>
      <Header t={t} lang={lang} />
      <main>
        <Hero t={t} />
        <Services t={t} />
        <WhyUs t={t} />
        <Doctor t={t} />
        <Booking t={t} />
        <Faq t={t} />
        <Contact t={t} lang={lang} />
      </main>
      <Footer t={t} />
      <FloatingWhatsApp label={t.whatsappLabel} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
