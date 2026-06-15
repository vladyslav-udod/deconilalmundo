import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

// import CookieBanner from '@/components/CookieBanner'

// Single typeface across the whole site (replaces Oswald + Work Sans).
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-roboto",
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://deconilalmundo.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      "De Conil al Mundo | Viajes acompañados desde Conil de la Frontera, Cádiz",
    template: "%s | De Conil al Mundo",
  },
  description:
    "Agencia de viajes acompañados en Conil de la Frontera, Cádiz. Viajes en grupo, circuitos internacionales, viajes para mujeres y solteros. Más de 58 países desde 2004. Halcón Viajes Conil.",
  keywords: [
    "conil de la frontera viajes",
    "cadiz vacaciones",
    "turismo conil",
    "halcon viajes conil",
    "viajes acompañados cadiz",
    "viajes en grupo conil",
    "agencia viajes conil de la frontera",
    "viajes para mujeres cadiz",
    "viajes para solteros",
    "circuitos internacionales españa",
    "de conil al mundo",
    "halcón viajes conil",
  ],
  authors: [{ name: "De Conil al Mundo — Halcón Viajes Conil" }],
  creator: "De Conil al Mundo",
  publisher: "Halcón Viajes Conil",
  category: "travel",
  alternates: {
    canonical: "./",
    languages: {
      "es-ES": "/",
      // "en-US": "/en",
      // "de-DE": "/de",
    },
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: siteUrl,
    siteName: "De Conil al Mundo",
    title: "De Conil al Mundo | Viajes acompañados desde Conil de la Frontera",
    description:
      "Especialistas en viajes acompañados desde Conil de la Frontera, Cádiz. Más de 58 países, +2.400 viajeros, desde 2004. Halcón Viajes Conil.",
    images: [
      {
        url: "/hero-bg.jpg",
        width: 1200,
        height: 630,
        alt: "De Conil al Mundo — Viajes acompañados",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "De Conil al Mundo | Viajes acompañados desde Cádiz",
    description:
      "Especialistas en viajes acompañados desde Conil de la Frontera. Grupos, mujeres, solteros, circuitos. Halcón Viajes Conil.",
    images: ["/hero-bg.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: "De Conil al Mundo",
  alternateName: "Halcón Viajes Conil",
  description:
    "Agencia de viajes acompañados en Conil de la Frontera, Cádiz. Especialistas en viajes en grupo, circuitos internacionales, viajes para mujeres y solteros.",
  url: siteUrl,
  telephone: "+34667068085",
  email: "halcont90@halconviajes.com",
  foundingDate: "2004",
  address: {
    "@type": "PostalAddress",
    streetAddress:
      "Pl. Blas Infante, 4, 11140 Conil de la Frontera, Cádiz, España",
    addressLocality: "Conil de la Frontera",
    addressRegion: "Cádiz",
    addressCountry: "ES",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 36.2751,
    longitude: -6.0882,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "10:00",
      closes: "14:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "17:00",
      closes: "20:30",
    },
  ],
  priceRange: "€€€",
  currenciesAccepted: "EUR",
  paymentAccepted: "Cash, Credit Card, Bank Transfer",
  areaServed: [
    { "@type": "City", name: "Conil de la Frontera" },
    { "@type": "State", name: "Cádiz" },
    { "@type": "Country", name: "España" },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Viajes y circuitos internacionales 2026",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: { "@type": "TouristTrip", name: "Viajes en grupo" },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "TouristTrip", name: "Viajes para mujeres" },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "TouristTrip", name: "Viajes para solteros" },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "TouristTrip",
          name: "Circuitos internacionales",
        },
      },
    ],
  },
  sameAs: [
    "https://www.instagram.com/deconilalmundo",
    "https://www.facebook.com/deconilalmundo",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={roboto.variable}>
      <body suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {children}
        {/* TODO: uncomment when analitycs or userdata checks added */}
        {/* <CookieBanner /> */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
