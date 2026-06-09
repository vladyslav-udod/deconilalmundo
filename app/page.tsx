import {
  getSiteSettings,
  getHeroSection,
  getTourSection,
  getTours,
  getTravelTypeSection,
  getTravelTypes,
  getIntroSection,
  getAboutSection,
  getTestimonialSection,
  getTestimonials,
  getCtaSection,
} from "@/lib/sanity/queries";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Tours from "@/components/Tours";
import TiposDeViaje from "@/components/TiposDeViaje";
import Intro from "@/components/Intro";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import SocialFollow from "@/components/SocialFollow";
import CTAFinal from "@/components/CTAFinal";
import Footer from "@/components/Footer";
import WhatsAppFAB from "@/components/WhatsAppFAB";
import Contacts from "@/components/Contacts";
import FeaturedTour from "@/components/FeaturedTour";

// ISR: revalidate every 60 seconds — keeps the page fast while CMS changes propagate quickly
export const revalidate = 60;

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ region?: string; mes?: string; tipo?: string }>;
}) {
  // Fetch all data in parallel
  const [
    sp,
    settings,
    hero,
    tourSection,
    tours,
    travelTypeSection,
    travelTypes,
    intro,
    about,
    testimonialSection,
    testimonials,
    cta,
  ] = await Promise.all([
    await searchParams,
    getSiteSettings(),
    getHeroSection(),
    getTourSection(),
    getTours(),
    getTravelTypeSection(),
    getTravelTypes(),
    getIntroSection(),
    getAboutSection(),
    getTestimonialSection(),
    getTestimonials(),
    getCtaSection(),
  ]);

  return (
    <>
      <Nav settings={settings} />

      <main id="main">
        <Hero data={hero} />
        <FeaturedTour featuredTour={tours.filter((tour) => tour.featured)[0]} />
        <Tours
          tours={tours}
          section={tourSection}
          initialFilters={{
            region: sp.region ?? "todos",
            mes: sp.mes ?? "todos",
            tipo: sp.tipo ?? "todos",
          }}
          now={Date.now()}
        />
        <TiposDeViaje section={travelTypeSection} types={travelTypes} />
        <Intro data={intro} />
        <About data={about} />
        <Testimonials
          section={testimonialSection}
          testimonials={testimonials}
        />
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
