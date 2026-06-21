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

const guideTitle = "Guía de Conil de la Frontera | Qué ver, hacer y comer";
const guideDescription =
  "Guía local de Conil de la Frontera (Cádiz): playas y calas vírgenes, casco antiguo marinero, atún de almadraba y los mejores lugares, actividades y consejos para tu visita.";

export const metadata: Metadata = {
  // `absolute` opts out of the "%s | De Conil al Mundo" template from the
  // root layout so the title isn't double-branded / too long.
  title: { absolute: guideTitle },
  description: guideDescription,
  keywords: [
    "guía conil de la frontera",
    "qué ver en conil",
    "qué hacer en conil",
    "playas conil",
    "calas conil",
    "atún de almadraba conil",
    "turismo conil cádiz",
  ],
  alternates: {
    canonical: "/guia-de-conil",
    languages: { "es-ES": "/guia-de-conil" },
  },
  openGraph: {
    type: "article",
    locale: "es_ES",
    url: "/guia-de-conil",
    siteName: "De Conil al Mundo",
    title: guideTitle,
    description: guideDescription,
    images: [
      {
        url: "/conil-bg.jpeg",
        width: 1200,
        height: 630,
        alt: "Conil de la Frontera, Cádiz",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: guideTitle,
    description: guideDescription,
    images: ["/conil-bg.jpeg"],
  },
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
