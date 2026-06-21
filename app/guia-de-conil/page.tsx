import type { Metadata } from "next";
import Hero from "@/components/Hero";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import WhatsAppFAB from "@/components/WhatsAppFAB";
import SocialFollow from "@/components/SocialFollow";
import Contacts from "@/components/Contacts";
import CTAFinal from "@/components/CTAFinal";
import {
  getCtaSection,
  getGuidePage,
  getSiteSettings,
} from "@/lib/sanity/queries";
import { ConilGuide } from "./_components";

export const metadata: Metadata = {
  title: "GUÍA DE CONIL DE LA FRONTERA",
  description:
    "Guía de Conil de la Frontera: descubre los mejores lugares, actividades y consejos para tu visita.",
  alternates: { canonical: "/guia-de-conil" },
};

export default async function GuiaDeConilDeLaFronteraPage() {
  const [settings, cta, guide] = await Promise.all([
    getSiteSettings(),
    getCtaSection(),
    getGuidePage(),
  ]);

  return (
    <>
      <Nav settings={settings} />

      <main id="main" className="-secondary">
        <Hero
          data={{
            eyebrow: "Guía local · Conil de la Frontera",
            heading: "Qué ver y hacer en",
            headingEmphasis: "Conil de la Frontera",
            lede: "Playas y calas vírgenes, casco antiguo marinero, atún de almadraba y noches de verano. Nuestra guía con todo lo que no te puedes perder, ordenado por temas.",
            ctaText: "Empezar por las playas",
            ctaUrl: "#playas",
            ghostCtaText: "Ver nuestros viajes",
            ghostCtaUrl: "/#tours",
            metaLine: "Conil de la Frontera · Cádiz",
          }}
          bkgImage="/conil-bg.jpeg"
        />

        <ConilGuide sections={guide.sections} />

        <SocialFollow
          instagramUrl={settings.instagram}
          facebookUrl={settings.facebook}
        />
        <Contacts settings={settings} />
        <CTAFinal data={cta} />
      </main>

      <Footer settings={settings} />
      <WhatsAppFAB settings={settings} />
    </>
  );
}
