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
} from '@/lib/sanity/queries'
import { getInstagramPosts } from '@/lib/instagram'
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Tours from '@/components/Tours'
import TiposDeViaje from '@/components/TiposDeViaje'
import Intro from '@/components/Intro'
import About from '@/components/About'
import Testimonials from '@/components/Testimonials'
import InstagramFeed from '@/components/InstagramFeed'
import CTAFinal from '@/components/CTAFinal'
import Footer from '@/components/Footer'
import WhatsAppFAB from '@/components/WhatsAppFAB'

// ISR: revalidate every 60 seconds — keeps the page fast while CMS changes propagate quickly
export const revalidate = 60

export default async function HomePage() {
  // Fetch all data in parallel
  const [
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
    instagramPosts,
  ] = await Promise.all([
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
    getInstagramPosts(6),
  ])

  return (
    <>
      <Nav settings={settings} />

      <main id="main">
        <Hero data={hero} />
        <Tours tours={tours} section={tourSection} />
        <TiposDeViaje section={travelTypeSection} types={travelTypes} />
        <Intro data={intro} />
        <About data={about} />
        <Testimonials section={testimonialSection} testimonials={testimonials} />
        <InstagramFeed profileUrl={settings.instagram} posts={instagramPosts} />
        <CTAFinal data={cta} />
      </main>

      <Footer settings={settings} />
      <WhatsAppFAB settings={settings} />
    </>
  )
}
