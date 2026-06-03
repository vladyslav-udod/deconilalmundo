import { notFound } from "next/navigation";
import type { Metadata } from "next";

import {
  getTourBySlug,
  getAllTourSlugs,
  getSiteSettings,
  getTestimonialSection,
  getTestimonials,
  getCtaSection,
} from "@/lib/sanity/queries";

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import WhatsAppFAB from "@/components/WhatsAppFAB";
import Testimonials from "@/components/Testimonials";
import SocialFollow from "@/components/SocialFollow";
import CTAFinal from "@/components/CTAFinal";

import TourHero from "@/components/tour/TourHero";
import TourItinerary from "@/components/tour/TourItinerary";
import TourIncludes from "@/components/tour/TourIncludes";
import TourDepartures from "@/components/tour/TourDepartures";
import TourFlights from "@/components/tour/TourFlights";

export const revalidate = 60;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllTourSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tour = await getTourBySlug(slug);
  if (!tour) return { title: "Viaje no encontrado" };

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://deconilalmundo.es";
  const durationText = tour.duration ? `${tour.duration} días ` : "";
  const description =
    tour.lead ??
    `Viaje acompañado a ${tour.title} desde Conil de la Frontera, Cádiz. ${durationText}desde ${tour.price.toLocaleString("es-ES")} €. Halcón Viajes Conil.`;

  return {
    title: `${tour.title}${tour.subtitle ? ` — ${tour.subtitle}` : ""} · Viaje acompañado desde Conil, Cádiz`,
    description,
    alternates: { canonical: `/viajes/${slug}` },
    openGraph: {
      type: "article",
      url: `${siteUrl}/viajes/${slug}`,
      title: `${tour.title} — ${durationText}desde ${tour.price.toLocaleString("es-ES")} €`,
      description,
      images: tour.imageUrl
        ? [{ url: tour.imageUrl, width: 1200, height: 630 }]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${tour.title} · De Conil al Mundo`,
      description,
      images: tour.imageUrl ? [tour.imageUrl] : [],
    },
  };
}

export default async function TourPage({ params }: PageProps) {
  const { slug } = await params;

  const [tour, settings, testimonialSection, testimonials, cta] =
    await Promise.all([
      getTourBySlug(slug),
      getSiteSettings(),
      getTestimonialSection(),
      getTestimonials(),
      getCtaSection(),
    ]);

  if (!tour) notFound();

  // Pre-filled WhatsApp message for the topbar "Reservar".
  const reserveMessage =
    `Hola, me interesa reservar el viaje a ${tour.title}` +
    (tour.subtitle ? ` (${tour.subtitle})` : "") +
    `. ¿Me dais más información?`;
  const reserveUrl = `https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(reserveMessage)}`;

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://deconilalmundo.es";
  const tourJsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: `${tour.title}${tour.subtitle ? ` — ${tour.subtitle}` : ""}`,
    description: tour.lead,
    url: `${siteUrl}/viajes/${slug}`,
    image: tour.imageUrl ? [tour.imageUrl] : undefined,
    touristType: tour.typeTag,
    provider: {
      "@type": "TravelAgency",
      name: "De Conil al Mundo",
      url: siteUrl,
    },
    offers: {
      "@type": "Offer",
      price: tour.price,
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      url: `${siteUrl}/viajes/${slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(tourJsonLd) }}
      />
      <Nav
        settings={settings}
        forceSolid
        tourBar={{
          title: tour.title,
          meta: tour.duration ? `${tour.duration} días` : tour.title,
          price: tour.price,
          reserveUrl,
        }}
      />

      <main id="main">
        {/* ── Atlántico / Cartel / Cinta design system ─────────────────── */}
        <div className="tp">
          <TourHero tour={tour} settings={settings} />
          <TourItinerary tour={tour} />
          <TourIncludes tour={tour} />
          <TourDepartures tour={tour} settings={settings} />
          {tour.flights?.length ? <TourFlights tour={tour} /> : null}
        </div>

        {/* ── Shared main-page sections ─────────────────────────────────── */}
        <Testimonials
          section={testimonialSection}
          testimonials={testimonials}
        />
        <SocialFollow
          instagramUrl={settings.instagram}
          facebookUrl={settings.facebook}
        />
        <CTAFinal data={cta} />
      </main>

      <Footer settings={settings} />
      <WhatsAppFAB settings={settings} />
    </>
  );
}
