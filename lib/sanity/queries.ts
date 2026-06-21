import { client, isConfigured } from "./client";
import { urlFor } from "./image";
import { tourDuration } from "../taxonomy";
import type {
  AboutSection,
  CtaSection,
  Departure,
  GuidePage,
  GuideSection,
  HeroSection,
  IntroSection,
  ItineraryDay,
  SiteSettings,
  Testimonial,
  TestimonialSection,
  Tour,
  TourDetail,
  TourSection,
  TravelType,
  TravelTypeSection,
} from "@/types";

// ─── Static fallback data ──────────────────────────────────────────────────────
// Used when Sanity is not yet configured, so the site is functional immediately.

const FALLBACK_SITE_SETTINGS: SiteSettings = {
  siteName: "De Conil al Mundo",
  tagline: "Halcón Viajes",
  whatsappNumber: "34600000000",
  whatsappMessage: "Hola, me interesa un viaje",
  phone: "+34 956 00 00 00",
  email: "hola@deconilalmundo.es",
  address: "Conil de la Frontera, Cádiz",
  openingHours: "L–V · 10:00 a 14:00 / 17:00 a 20:30",
  instagram: "https://www.instagram.com/deconilalmundo",
  facebook: "https://www.facebook.com/deconilalmundo",
  legalText: "© 2026 · De Conil al Mundo · Halcón Viajes Conil",
};

const FALLBACK_HERO: HeroSection = {
  eyebrow: "Viajes acompañados · Desde 2004",
  heading: "De Conil",
  headingEmphasis: "al mundo",
  lede: "Experiencias únicas para descubrir el planeta acompañado, seguro y disfrutando desde el primer momento. Más de 58 países recorridos y cada destino vivido antes de recomendarlo.",
  ctaText: "Ver próximos viajes",
  ghostCtaText: "Conoce nuestra historia",
  metaLine: "Conil de la Frontera · Cádiz",
};

const FALLBACK_TOUR_SECTION: TourSection = {
  sectionLabel: "Próximas salidas",
  heading: "Destinos para los próximos",
  headingEmphasis: "meses",
};

const FALLBACK_TRAVEL_TYPE_SECTION: TravelTypeSection = {
  sectionLabel: "Qué organizamos",
  heading: "Seis formas de",
  headingEmphasis: "vivirlo",
  description:
    "Viajes pensados para cada momento de la vida. Elige el tuyo y déjanos el resto: nosotros nos encargamos de todo para que tú solo te ocupes de disfrutar.",
};

const FALLBACK_INTRO: IntroSection = {
  sectionLabel: "Nuestra forma de viajar",
  heading: "Especialistas en viajar",
  headingEmphasis: "acompañados",
  leadQuote:
    "«Creemos que la mejor manera de recomendar un destino es haberlo vivido antes.»",
  signature: "— Equipo de Halcón Viajes Conil",
  body: [],
};

const FALLBACK_ABOUT: AboutSection = {
  sectionLabel: "Sobre nosotros",
  heading: "Más de dos décadas",
  headingEmphasis: "coordinando grupos por el mundo",
  body: [],
  stats: [
    { value: "2004", label: "Año de fundación" },
    { value: "58+", label: "Países recorridos" },
    { value: "2.400+", label: "Viajeros acompañados" },
    { value: "96%", label: "Repiten con nosotros" },
  ],
  badgeQuote: "«Acompañamos a cada grupo de principio a fin.»",
  badgeAttribution: "Equipo Halcón Viajes Conil",
};

const FALLBACK_TESTIMONIAL_SECTION: TestimonialSection = {
  sectionLabel: "La confianza de nuestros viajeros",
  heading: "Vuelven año tras",
  headingEmphasis: "año",
  description:
    "Muchas personas vuelven a viajar con nosotros recomendándonos por la cercanía, la profesionalidad y la pasión que ponemos en cada viaje.",
};

const FALLBACK_CTA: CtaSection = {
  sectionLabel: "Atrévete",
  quote: "«Porque el mundo es demasiado bonito para recorrerlo solo.",
  quoteEmphasis: "Viajemos juntos.»",
  subtext:
    "Confía en nosotros y ven a recorrer el mundo acompañado por profesionales apasionados por los viajes.",
  ctaText: "Ver próximos viajes",
};

const FALLBACK_TOURS: Tour[] = [
  {
    _id: "1",
    title: "Costa Oeste EE.UU.",
    subtitle: "Estados Unidos",
    slug: "costa-oeste-jun",
    region: "america",
    month: "JUN",
    startDate: "2026-06-02",
    endDate: "2026-06-20",
    duration: 19,
    price: 3590,
    imageUrl:
      "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=1200&q=80",
    order: 1,
    typeTag: ["Circuitos internacionales"],
  },
  {
    _id: "2",
    title: "Vietnam",
    subtitle: "Indochina esencial",
    slug: "vietnam-jul",
    region: "asia",
    month: "JUL",
    startDate: "2026-07-01",
    endDate: "2026-07-16",
    duration: 16,
    price: 2490,
    imageUrl:
      "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?auto=format&fit=crop&w=1200&q=80",
    order: 2,
    typeTag: ["Viajes en grupo"],
  },
  {
    _id: "3",
    title: "Tailandia",
    subtitle: "Templos y playas",
    slug: "tailandia-jul-1",
    region: "asia",
    month: "JUL",
    startDate: "2026-07-02",
    endDate: "2026-07-18",
    duration: 17,
    price: 2690,
    imageUrl:
      "https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=1200&q=80",
    order: 3,
    typeTag: ["Viajes en grupo"],
  },
  {
    _id: "4",
    title: "Turquía",
    subtitle: "De Estambul a Capadocia",
    slug: "turquia-jul",
    region: "oriente",
    month: "JUL",
    startDate: "2026-07-02",
    endDate: "2026-07-13",
    duration: 12,
    price: 1950,
    imageUrl:
      "https://images.unsplash.com/photo-1527838832700-5059252407fa?auto=format&fit=crop&w=1200&q=80",
    order: 4,
    typeTag: ["Escapadas especiales"],
  },
  {
    _id: "5",
    title: "Tailandia",
    subtitle: "2.ª salida del mes",
    slug: "tailandia-jul-2",
    region: "asia",
    month: "JUL",
    startDate: "2026-07-14",
    endDate: "2026-07-30",
    duration: 17,
    price: 2690,
    imageUrl:
      "https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=1200&q=80",
    order: 5,
    typeTag: ["Viajes para solteros"],
  },
  {
    _id: "6",
    title: "Costa Rica",
    subtitle: "Volcanes y selva",
    slug: "costa-rica-jul",
    region: "america",
    month: "JUL",
    startDate: "2026-07-16",
    endDate: "2026-07-31",
    duration: 16,
    price: 3300,
    imageUrl:
      "https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=1200&q=80",
    order: 6,
    typeTag: ["Viajes en grupo"],
  },
  {
    _id: "7",
    title: "Tanzania",
    subtitle: "Safari + Zanzíbar",
    slug: "tanzania-jul",
    region: "africa",
    month: "JUL",
    startDate: "2026-07-31",
    endDate: "2026-08-12",
    duration: 13,
    price: 4750,
    imageUrl:
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80",
    order: 7,
    typeTag: ["Circuitos internacionales"],
  },
  {
    _id: "8",
    title: "Tailandia",
    subtitle: "Ruta clásica",
    slug: "tailandia-ago-1",
    region: "asia",
    month: "AGO",
    startDate: "2026-08-02",
    endDate: "2026-08-18",
    duration: 17,
    price: 2690,
    imageUrl:
      "https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=1200&q=80",
    order: 8,
    typeTag: ["Viajes en grupo"],
  },
  {
    _id: "9",
    title: "Colombia con Amazonas",
    subtitle: "Bogotá · Cartagena",
    slug: "colombia-ago-1",
    region: "america",
    month: "AGO",
    startDate: "2026-08-02",
    duration: 15,
    price: 3200,
    imageUrl:
      "https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?auto=format&fit=crop&w=1200&q=80",
    order: 9,
    typeTag: ["Circuitos internacionales"],
  },
  {
    _id: "10",
    title: "Japón",
    subtitle: "Tokio · Kioto · Hakone",
    slug: "japon-ago",
    region: "asia",
    month: "AGO",
    startDate: "2026-08-03",
    endDate: "2026-08-18",
    duration: 16,
    price: 3600,
    imageUrl:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80",
    order: 10,
    typeTag: ["Viajes en grupo"],
  },
  {
    _id: "11",
    title: "Costa Oeste EE.UU.",
    subtitle: "Parques nacionales",
    slug: "costa-oeste-ago-1",
    region: "america",
    month: "AGO",
    startDate: "2026-08-04",
    endDate: "2026-08-22",
    duration: 19,
    price: 3690,
    imageUrl:
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80",
    order: 11,
    typeTag: ["Circuitos internacionales"],
  },
  {
    _id: "12",
    title: "Tailandia",
    subtitle: "3.ª salida del mes",
    slug: "tailandia-ago-2",
    region: "asia",
    month: "AGO",
    startDate: "2026-08-13",
    endDate: "2026-08-29",
    duration: 17,
    price: 2690,
    imageUrl:
      "https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=1200&q=80",
    order: 12,
    typeTag: ["Viajes para mujeres"],
  },
  {
    _id: "13",
    title: "Costa Oeste EE.UU.",
    subtitle: "Salida garantizada",
    slug: "costa-oeste-ago-2",
    region: "america",
    month: "AGO",
    startDate: "2026-08-13",
    endDate: "2026-08-31",
    duration: 19,
    price: 3690,
    imageUrl:
      "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=1200&q=80",
    order: 13,
    typeTag: ["Viajes para solteros"],
  },
  {
    _id: "14",
    title: "Senegal",
    subtitle: "Cultura mandinga",
    slug: "senegal-ago",
    region: "africa",
    month: "AGO",
    startDate: "2026-08-27",
    duration: 12,
    price: 1820,
    imageUrl:
      "https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?auto=format&fit=crop&w=1200&q=80",
    order: 14,
    typeTag: ["Experiencias a medida"],
  },
  {
    _id: "15",
    title: "Japón",
    subtitle: "Vuelos directos",
    slug: "japon-oct",
    region: "asia",
    month: "OCT",
    startDate: "2026-10-05",
    duration: 15,
    price: 3850,
    imageUrl:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80",
    order: 15,
    typeTag: ["Viajes en grupo"],
  },
  {
    _id: "16",
    title: "Argentina",
    subtitle: "Buenos Aires · Patagonia",
    slug: "argentina-oct",
    region: "america",
    month: "OCT",
    startDate: "2026-10-06",
    endDate: "2026-10-27",
    duration: 22,
    price: 4800,
    imageUrl:
      "https://images.unsplash.com/photo-1589909202802-8f4aadce1849?auto=format&fit=crop&w=1200&q=80",
    order: 16,
    typeTag: ["Circuitos internacionales"],
  },
  {
    _id: "17",
    title: "Perú",
    subtitle: "Cusco · Machu Picchu",
    slug: "peru-oct",
    region: "america",
    month: "OCT",
    startDate: "2026-10-08",
    endDate: "2026-10-24",
    duration: 17,
    price: 3150,
    imageUrl:
      "https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=1200&q=80",
    order: 17,
    typeTag: ["Viajes en grupo"],
  },
  {
    _id: "18",
    title: "China",
    subtitle: "Pekín · Xi'an · Shanghái",
    slug: "china-oct",
    region: "asia",
    month: "OCT",
    startDate: "2026-10-19",
    endDate: "2026-11-04",
    duration: 17,
    price: 3200,
    imageUrl:
      "https://images.unsplash.com/photo-1508804052814-cd3ba865a116?auto=format&fit=crop&w=1200&q=80",
    order: 18,
    typeTag: ["Circuitos internacionales"],
  },
  {
    _id: "19",
    title: "Colombia con Amazonas",
    subtitle: "2.ª salida",
    slug: "colombia-oct",
    region: "america",
    month: "OCT",
    startDate: "2026-10-22",
    duration: 15,
    price: 3250,
    imageUrl:
      "https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?auto=format&fit=crop&w=1200&q=80",
    order: 19,
    typeTag: ["Viajes para mujeres"],
  },
  {
    _id: "20",
    title: "Costa Rica",
    subtitle: "Naturaleza pura",
    slug: "costa-rica-nov",
    region: "america",
    month: "NOV",
    startDate: "2026-11-05",
    endDate: "2026-11-20",
    duration: 16,
    price: 3400,
    imageUrl:
      "https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=1200&q=80",
    order: 20,
    typeTag: ["Viajes en grupo"],
  },
  {
    _id: "21",
    title: "Australia y Nueva Zelanda",
    subtitle: "Sídney · Auckland",
    slug: "australia-nov",
    region: "oceania",
    month: "NOV",
    startDate: "2026-11-01",
    duration: 19,
    price: 5900,
    imageUrl:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80",
    order: 21,
    typeTag: ["Circuitos internacionales"],
  },
  {
    _id: "22",
    title: "Tailandia",
    subtitle: "Salida del puente",
    slug: "tailandia-nov",
    region: "asia",
    month: "NOV",
    startDate: "2026-11-05",
    endDate: "2026-11-21",
    duration: 17,
    price: 2690,
    imageUrl:
      "https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=1200&q=80",
    order: 22,
    typeTag: ["Escapadas especiales"],
  },
  {
    _id: "23",
    title: "Islandia",
    subtitle: "Auroras y cascadas",
    slug: "islandia-oct",
    region: "europa",
    month: "OCT",
    startDate: "2026-10-10",
    endDate: "2026-10-17",
    duration: 8,
    price: 2450,
    imageUrl:
      "https://images.unsplash.com/photo-1504829857797-ddff29c27927?auto=format&fit=crop&w=1200&q=80",
    order: 23,
    typeTag: ["Escapadas especiales"],
  },
  {
    _id: "24",
    title: "Italia",
    subtitle: "Roma · Florencia · Venecia",
    slug: "italia-sep",
    region: "europa",
    month: "SEP",
    startDate: "2026-09-12",
    endDate: "2026-09-20",
    duration: 9,
    price: 1980,
    imageUrl:
      "https://images.unsplash.com/photo-1525874684015-58379d421a52?auto=format&fit=crop&w=1200&q=80",
    order: 24,
    typeTag: ["Viajes en grupo"],
  },
];

// Reviews reflecting the agency's real Google Maps profile (4,7★ · reseñas
// reales): viaje perfectamente organizado, hoteles magníficos, el trato de
// Rocío, y clientes que repiten. Editable en el CMS.
const FALLBACK_TESTIMONIALS: Testimonial[] = [
  {
    _id: "t1",
    quote:
      "«Viaje perfectamente organizado y con hoteles magníficos. Rocío estuvo pendiente de todo en cada momento; nos sentimos en muy buenas manos. Totalmente recomendable.»",
    authorName: "Antonio Jiménez",
    authorInitials: "AJ",
    trip: "Circuito internacional",
    year: 2025,
    stars: 5,
    order: 1,
  },
  {
    _id: "t2",
    quote:
      "«Repetimos con ellos cada año. La organización es impecable y el trato cercano marca la diferencia. Una agencia de total confianza en Conil.»",
    authorName: "María Dolores Sánchez",
    authorInitials: "MS",
    trip: "Viaje en grupo",
    year: 2025,
    stars: 5,
    order: 2,
  },
  {
    _id: "t3",
    quote:
      "«Todo salió a la perfección, sin un solo imprevisto. Profesionales, atentos y siempre disponibles. Sin duda volveremos a viajar con ellos.»",
    authorName: "Francisco Gómez",
    authorInitials: "FG",
    trip: "Circuito internacional",
    year: 2024,
    stars: 5,
    order: 3,
  },
];

const FALLBACK_TRAVEL_TYPES: TravelType[] = [
  // Group of travellers together
  {
    _id: "tt1",
    title: "Viajes en grupo",
    description:
      "Recorridos para descubrir destinos rodeado de gente con tus mismas inquietudes. Acompañamiento permanente del equipo.",
    imageUrl:
      "https://images.unsplash.com/photo-1539635278303-d4002c07eae3?auto=format&fit=crop&w=1200&q=80",
    ctaText: "Explorar",
    order: 1,
  },
  // Short weekend getaway vibe
  {
    _id: "tt2",
    title: "Escapadas especiales",
    description:
      "Fines de semana largos y puentes para desconectar sin complicaciones. Itinerarios cuidados al detalle.",
    imageUrl:
      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80",
    ctaText: "Explorar",
    order: 2,
  },
  // Group of women travelling together
  {
    _id: "tt3",
    title: "Viajes para mujeres",
    description:
      "Grupos exclusivamente femeninos para descubrir el mundo en un entorno cómodo, cercano y lleno de complicidad.",
    imageUrl:
      "https://images.unsplash.com/photo-1516589091380-5d8e87df6999?auto=format&fit=crop&w=1200&q=80",
    ctaText: "Explorar",
    order: 3,
  },
  // Friends / new connections
  {
    _id: "tt4",
    title: "Viajes para solteros",
    description:
      "Viaja solo, llega acompañado. Grupos pensados para conectar con gente nueva y compartir aventuras inolvidables.",
    imageUrl:
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1200&q=80",
    ctaText: "Explorar",
    order: 4,
  },
  // Long-haul / iconic world landmark
  {
    _id: "tt5",
    title: "Circuitos internacionales",
    description:
      "Itinerarios completos por destinos lejanos: Asia, América, África, Oriente Medio. Coordinados de principio a fin.",
    imageUrl:
      "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80",
    ctaText: "Explorar",
    order: 5,
  },
  // Tailor-made / map planning
  {
    _id: "tt6",
    title: "Experiencias a medida",
    description:
      "Viajes diseñados para disfrutar sin preocupaciones. Cuéntanos qué imaginas y construimos tu próxima historia.",
    imageUrl:
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80",
    ctaText: "Explorar",
    order: 6,
  },
];

// ─── Helpers ───────────────────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function addImageUrl<T extends Record<string, any>>(
  item: T,
): T & { imageUrl?: string } {
  if (item?.image?.asset) {
    return {
      ...item,
      imageUrl: urlFor(item.image).width(1200).auto("format").url(),
    };
  }
  return item;
}

async function fetchSingleton<T>(type: string, fallback: T): Promise<T> {
  if (!isConfigured) return fallback;
  try {
    const result = await client.fetch<T | null>(
      `*[_type == $type][0]`,
      { type },
      { next: { revalidate: 60 } },
    );
    return result ?? fallback;
  } catch {
    return fallback;
  }
}

// ─── Exported fetchers ─────────────────────────────────────────────────────────

export async function getSiteSettings(): Promise<SiteSettings> {
  return fetchSingleton("siteSettings", FALLBACK_SITE_SETTINGS);
}

export async function getHeroSection(): Promise<HeroSection> {
  if (!isConfigured) return FALLBACK_HERO;
  try {
    const raw = await client.fetch<HeroSection | null>(
      `*[_type == "heroSection"][0]`,
      {},
      { next: { revalidate: 60 } },
    );
    if (!raw) return FALLBACK_HERO;
    return addImageUrl(raw) as HeroSection;
  } catch {
    return FALLBACK_HERO;
  }
}

export async function getTourSection(): Promise<TourSection> {
  return fetchSingleton("tourSection", FALLBACK_TOUR_SECTION);
}

export async function getTours(): Promise<Tour[]> {
  if (!isConfigured) return FALLBACK_TOURS;
  try {
    const rows = await client.fetch<
      (Tour & { image?: { asset: unknown }; departures: Departure[] })[]
    >(
      `*[_type == "tour" && active != false] | order(month asc, order asc) {
        _id, title, subtitle, "slug": slug.current,
        region, month, startDate, endDate, price,
        image, typeTag, featured, active, order, departures, duration
      }`,
      {},
      { next: { revalidate: 60 } },
    );
    // Duration is derived from the dates, not stored.
    const result = rows.map((r) => ({
      ...addImageUrl(r),
      duration: tourDuration(r.startDate, r.endDate),
    })) as Tour[];
    return result.length > 0 ? result : FALLBACK_TOURS;
  } catch {
    return FALLBACK_TOURS;
  }
}

export async function getTravelTypeSection(): Promise<TravelTypeSection> {
  return fetchSingleton("travelTypeSection", FALLBACK_TRAVEL_TYPE_SECTION);
}

export async function getTravelTypes(): Promise<TravelType[]> {
  if (!isConfigured) return FALLBACK_TRAVEL_TYPES;
  try {
    const rows = await client.fetch<TravelType[]>(
      `*[_type == "travelType"] | order(order asc) {
        _id, title, description, image, ctaText, ctaHref, order
      }`,
      {},
      { next: { revalidate: 60 } },
    );
    const result = rows.map(addImageUrl) as TravelType[];
    return result.length > 0 ? result : FALLBACK_TRAVEL_TYPES;
  } catch {
    return FALLBACK_TRAVEL_TYPES;
  }
}

export async function getIntroSection(): Promise<IntroSection> {
  return fetchSingleton("introSection", FALLBACK_INTRO);
}

export async function getAboutSection(): Promise<AboutSection> {
  if (!isConfigured) return FALLBACK_ABOUT;
  try {
    const raw = await client.fetch<AboutSection | null>(
      `*[_type == "aboutSection"][0]`,
      {},
      { next: { revalidate: 60 } },
    );
    if (!raw) return FALLBACK_ABOUT;
    const withUrl = addImageUrl(raw) as AboutSection;
    return { ...FALLBACK_ABOUT, ...withUrl };
  } catch {
    return FALLBACK_ABOUT;
  }
}

export async function getTestimonialSection(): Promise<TestimonialSection> {
  return fetchSingleton("testimonialSection", FALLBACK_TESTIMONIAL_SECTION);
}

export async function getTestimonials(): Promise<Testimonial[]> {
  if (!isConfigured) return FALLBACK_TESTIMONIALS;
  try {
    const rows = await client.fetch<Testimonial[]>(
      `*[_type == "testimonial"] | order(order asc) {
        _id, quote, authorName, authorInitials, trip, year, stars, order
      }`,
      {},
      { next: { revalidate: 60 } },
    );
    return rows.length > 0 ? rows : FALLBACK_TESTIMONIALS;
  } catch {
    return FALLBACK_TESTIMONIALS;
  }
}

export async function getCtaSection(): Promise<CtaSection> {
  if (!isConfigured) return FALLBACK_CTA;
  try {
    const raw = await client.fetch<CtaSection | null>(
      `*[_type == "ctaSection"][0]`,
      {},
      { next: { revalidate: 60 } },
    );
    if (!raw) return FALLBACK_CTA;
    return addImageUrl(raw) as CtaSection;
  } catch {
    return FALLBACK_CTA;
  }
}

// ─── Tour detail ───────────────────────────────────────────────────────────────

const DEFAULT_INCLUDES = [
  "Vuelos en línea regular, ida y vuelta",
  "Acompañante de Halcón Viajes todo el recorrido",
  "Hoteles con desayuno incluido",
  "Traslados y transporte privado",
  "Guías locales de habla hispana",
  "Seguro de viaje completo",
];
const DEFAULT_EXCLUDES = [
  "Tasas aéreas (consultar importe vigente)",
  "Visado, si aplica al destino",
  "Comidas no indicadas en el programa",
  "Bebidas, propinas y gastos personales",
];

// Representative gateway airport per region, for fallback flight data.
const REGION_GATEWAY: Record<
  string,
  { code: string; city: string; airline: string }
> = {
  asia: { code: "BKK", city: "Bangkok", airline: "Qatar Airways" },
  america: { code: "JFK", city: "Nueva York", airline: "Iberia" },
  africa: { code: "JNB", city: "Johannesburgo", airline: "Turkish Airlines" },
  oriente: { code: "IST", city: "Estambul", airline: "Turkish Airlines" },
  oceania: { code: "SYD", city: "Sídney", airline: "Emirates" },
};

// function makeFallbackFlights(tour: Tour): import("@/types").Flight[] {
//   const g = REGION_GATEWAY[tour.region] ?? REGION_GATEWAY.asia;
//   return [
//     {
//       _key: "f1",
//       direction: "outbound",
//       airline: g.airline,
//       flightNumber: "XX1234",
//       fromCode: "MAD",
//       fromCity: "Madrid",
//       toCode: g.code,
//       toCity: g.city,
//       departTime: "10:30",
//       arriveTime: "06:15 (+1)",
//       duration: "12h 45m",
//       stops: "1 escala",
//     },
//     {
//       _key: "f2",
//       direction: "return",
//       airline: g.airline,
//       flightNumber: "XX1235",
//       fromCode: g.code,
//       fromCity: g.city,
//       toCode: "MAD",
//       toCity: "Madrid",
//       departTime: "23:50",
//       arriveTime: "09:20 (+1)",
//       duration: "13h 30m",
//       stops: "1 escala",
//     },
//   ];
// }

function makeFallbackItinerary(tour: Tour): import("@/types").ItineraryDay[] {
  const days = tour.duration ?? tourDuration(tour.startDate, tour.endDate) ?? 1;
  const last = String(days).padStart(2, "0");
  return [
    {
      _key: "i1",
      dayLabel: "Día 01",
      title: `Vuelo a ${tour.title}`,
      tags: ["Vuelo", "Llegada y traslado"],
      body: `Salida desde España con destino ${tour.title}. A la llegada, nuestro equipo te recibe para el traslado privado al hotel.\nTraslado privado aeropuerto–hotel\nReunión de bienvenida con el grupo\nNoche en hotel 4★`,
    },
    {
      _key: "i2",
      dayLabel: "Día 02",
      title: "Primeras visitas",
      tags: ["Visita guiada", "Día completo"],
      body: `Día completo descubriendo los imprescindibles del destino acompañados por nuestro guía.\nVisita guiada de los puntos más emblemáticos\nTiempo libre para pasear\nDesayuno incluido`,
    },
    {
      _key: "i3",
      dayLabel: "Día 03",
      title: "Cultura y naturaleza",
      tags: ["Naturaleza", "Experiencia local"],
      body: `Jornada para vivir la cultura local y disfrutar de los paisajes más característicos del destino.\nExperiencia local exclusiva del grupo\nAlmuerzo típico incluido`,
    },
    {
      _key: "i4",
      dayLabel: `Día ${last}`,
      title: "Regreso a casa",
      tags: ["Vuelo de vuelta"],
      body: `Tras el desayuno, traslado al aeropuerto y vuelo de regreso a España con un álbum lleno de recuerdos.\nTraslado privado hotel–aeropuerto\nAsistencia de nuestro equipo`,
    },
  ];
}

function makeFallbackDetail(tour: Tour): TourDetail {
  return {
    ...tour,
    lead: `Un viaje acompañado a ${tour.title}${tour.subtitle ? ` — ${tour.subtitle}` : ""}, organizado de principio a fin por Halcón Viajes Conil desde Conil de la Frontera, Cádiz. Grupo reducido con acompañante de la agencia durante todo el recorrido.`,
    itinerary: makeFallbackItinerary(tour),
    includes: DEFAULT_INCLUDES,
    excludes: DEFAULT_EXCLUDES,
    departures: [
      {
        _key: "d1",
        date: tour.startDate,
        availability: "available",
        price: tour.price,
      },
      ...(tour.endDate
        ? []
        : [
            {
              _key: "d2",
              date: tour.startDate,
              availability: "last_spots" as const,
              price: tour.price + 100,
            },
          ]),
    ],
    flights: [],
    contactName: "María José Pérez",
    contactRole: "Halcón Viajes Conil",
    contactInitials: "MJ",
  };
}

export async function getTourBySlug(slug: string): Promise<TourDetail | null> {
  if (!isConfigured) {
    const found = FALLBACK_TOURS.find((t) => t.slug === slug);
    return found ? makeFallbackDetail(found) : null;
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const raw = await client.fetch<any | null>(
      `*[_type == "tour" && slug.current == $slug][0] {
        _id, title, subtitle, "slug": slug.current,
        region, month, startDate, endDate, price,
        image, typeTag, featured, active, order,
        lead,
        "gallery": gallery[] {
          asset, hotspot, "alt": alt
        },
        "itinerary": itinerary[] {
          _key, dayLabel, title, body, tags, image
        },
        includes, excludes,
        importantInfo, deposit,
        "departures": departures[] {
          _key, date, availability, price
        },
        "flights": flights[] {
          _key, direction, airline, flightNumber,
          fromCode, fromCity, toCode, toCity,
          departTime, arriveTime, duration, stops
        },
        contactName, contactRole, contactInitials, contactPhone, contactInstagram
      }`,
      { slug },
      { next: { revalidate: 60 } },
    );

    if (!raw) return null;

    // Resolve image URLs
    const withCard = addImageUrl(raw) as TourDetail;
    // Duration is derived from the dates, not stored.
    withCard.duration = tourDuration(raw.startDate, raw.endDate);

    // Gallery image URLs
    if (raw.gallery?.length) {
      withCard.galleryUrls = raw.gallery.map(
        (img: { asset?: unknown; alt?: string }) => ({
          url: img.asset ? urlFor(img).width(1600).auto("format").url() : "",
          alt: img.alt ?? "",
        }),
      );
    }

    // Itinerary day image URLs
    if (raw.itinerary?.length) {
      withCard.itinerary = raw.itinerary.map(
        (day: ItineraryDay & { image?: { asset?: unknown } }) => ({
          ...day,
          imageUrl: day.image?.asset
            ? urlFor(day.image).width(800).auto("format").url()
            : undefined,
        }),
      );
    }

    // Use defaults when CMS fields are empty
    if (!withCard.includes?.length) withCard.includes = DEFAULT_INCLUDES;
    if (!withCard.excludes?.length) withCard.excludes = DEFAULT_EXCLUDES;
    if (!withCard.departures?.length) {
      withCard.departures = [
        {
          _key: "d1",
          date: raw.startDate,
          availability: "available",
          price: raw.price,
        },
      ];
    }
    if (!withCard.flights?.length) withCard.flights = [];
    if (!withCard.itinerary?.length)
      withCard.itinerary = makeFallbackItinerary(raw as Tour);

    return withCard;
  } catch {
    const found = FALLBACK_TOURS.find((t) => t.slug === slug);
    return found ? makeFallbackDetail(found) : null;
  }
}

// ─── Guía de Conil ───────────────────────────────────────────────────────────

// Editorial fallback so /guia-de-conil renders fully before the CMS document
// exists. Images use Unsplash (allowed in next.config remotePatterns).
const FALLBACK_GUIDE: GuidePage = {
  title: "Guía de Conil de la Frontera",
  sections: [
    {
      _key: "playas",
      anchor: "playas",
      navLabel: "Playas",
      label: "Sol y arena",
      title: "Las mejores playas de Conil",
      titleHighlight: "playas",
      description:
        "Kilómetros de arena fina y aguas turquesa, desde la animada playa urbana hasta calas escondidas entre acantilados.",
      googleMapLink: "https://maps.google.com/?q=Playas+de+Conil",
      variant: "plain",
      items: [
        {
          _key: "p1",
          label: "Playa urbana",
          title: "Playa de los Bateles",
          description:
            "La playa del pueblo, junto al casco antiguo. Arena dorada, paseo marítimo y chiringuitos a pie de orilla.",
          image: {
            url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=640&h=427&q=75",
            alt: "Playa de los Bateles en Conil",
          },
          googleLink: "https://maps.google.com/?q=Playa+de+los+Bateles",
        },
        {
          _key: "p2",
          label: "Calas vírgenes",
          title: "Calas de Roche",
          description:
            "Pequeñas calas resguardadas entre acantilados de arcilla, ideales para una jornada tranquila lejos del bullicio.",
          image: {
            url: "https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?auto=format&fit=crop&w=640&h=427&q=75",
            alt: "Calas de Roche",
          },
          googleLink: "https://maps.google.com/?q=Calas+de+Roche",
        },
        {
          _key: "p3",
          label: "Naturaleza",
          title: "Playa de Castilnovo",
          description:
            "Playa virgen de más de 4 km junto a la antigua torre almenara. Dunas, marismas y atardeceres de postal.",
          image: {
            url: "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=640&h=427&q=75",
            alt: "Playa de Castilnovo",
          },
          googleLink: "https://maps.google.com/?q=Playa+de+Castilnovo",
        },
      ],
    },
    {
      _key: "casco-antiguo",
      anchor: "casco-antiguo",
      navLabel: "Casco antiguo",
      label: "Historia marinera",
      title: "Paseo por el casco antiguo",
      titleHighlight: "casco antiguo",
      description:
        "Calles blancas, plazas con encanto y la herencia de un pueblo de pescadores. El corazón de Conil.",
      variant: "alt",
      items: [
        {
          _key: "c1",
          label: "Mirador",
          title: "Torre de Guzmán",
          description:
            "Torre del siglo XV, antiguo bastión defensivo. Sube a lo alto para una vista privilegiada del pueblo y el mar.",
          image: {
            url: "https://images.unsplash.com/photo-1558642084-fd07fae5282e?auto=format&fit=crop&w=640&h=427&q=75",
            alt: "Torre de Guzmán",
          },
          googleLink: "https://maps.google.com/?q=Torre+de+Guzm%C3%A1n+Conil",
        },
        {
          _key: "c2",
          label: "Plaza",
          title: "Plaza de Santa Catalina",
          description:
            "El antiguo enclave de la iglesia, hoy un balcón sobre la playa de los Bateles y punto de encuentro al atardecer.",
          image: {
            url: "https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?auto=format&fit=crop&w=640&h=427&q=75",
            alt: "Plaza de Santa Catalina",
          },
          googleLink: "https://maps.google.com/?q=Santa+Catalina+Conil",
        },
      ],
    },
    {
      _key: "gastronomia",
      anchor: "gastronomia",
      navLabel: "Gastronomía",
      label: "Sabor del mar",
      title: "Dónde comer en Conil",
      titleHighlight: "comer",
      description:
        "El atún rojo de almadraba es el rey. Tabernas marineras, ventas y arrocería frente al mar.",
      variant: "plain",
      items: [
        {
          _key: "g1",
          label: "Atún de almadraba",
          title: "La Almadraba",
          description:
            "Templo del atún rojo capturado con el arte milenario de la almadraba. Imprescindible en temporada (mayo–junio).",
          image: {
            url: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?auto=format&fit=crop&w=640&h=427&q=75",
            alt: "Plato de atún rojo",
          },
          phone: "+34956000000",
          googleLink: "https://maps.google.com/?q=Restaurante+atun+Conil",
        },
        {
          _key: "g2",
          label: "Tapas",
          title: "Tabernas del centro",
          description:
            "Pescaíto frito, tortillitas de camarones y vino de la tierra en las tabernas de las calles blancas.",
          image: {
            url: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=640&h=427&q=75",
            alt: "Tapas andaluzas",
          },
        },
      ],
    },
    {
      _key: "agenda",
      anchor: "agenda",
      navLabel: "Agenda",
      label: "Todo el año",
      title: "Fiestas y eventos de Conil",
      titleHighlight: "Fiestas",
      description:
        "Tradiciones marineras, ferias y noches de verano que marcan el calendario conileño.",
      variant: "dark",
      items: [
        {
          _key: "a1",
          label: "Gastronomía",
          title: "Ruta del Atún",
          description:
            "Jornadas gastronómicas dedicadas al atún rojo de almadraba en los restaurantes del pueblo.",
          when: "Mayo",
        },
        {
          _key: "a2",
          label: "Tradición",
          title: "Feria y Velada",
          description:
            "La gran fiesta del verano: casetas, música y ambiente en honor a la Virgen de las Virtudes.",
          when: "Junio",
        },
        {
          _key: "a3",
          label: "Verano",
          title: "Noches de cine y música",
          description:
            "Cine de verano, conciertos al aire libre y mercadillos nocturnos durante toda la temporada estival.",
          when: "Jul – Sep",
        },
      ],
    },
  ],
};

const guidePageQuery = `
  *[_type == "guidePage"][0]{
    title,
    "sections": sections[]{
      _key,
      "anchor": anchor.current,
      navLabel,
      label,
      title,
      titleHighlight,
      description,
      googleMapLink,
      variant,
      "items": items[]{
        _key,
        label,
        title,
        description,
        image{
          ...,
          "alt": alt,
          "lqip": asset->metadata.lqip,
          "dimensions": asset->metadata.dimensions
        },
        googleLink,
        phone,
        when
      }
    }
  }
`;

type RawGuideSection = Omit<GuideSection, "items" | "variant"> & {
  variant?: GuideSection["variant"];
  items: Array<
    Omit<GuideSection["items"][number], "image"> & {
      image?: {
        asset?: unknown;
        alt?: string;
        lqip?: string;
        dimensions?: { width: number; height: number };
      } | null;
    }
  >;
};

function mapGuideSections(sections: RawGuideSection[]): GuideSection[] {
  return (sections ?? []).map((s) => ({
    ...s,
    variant: s.variant ?? "plain",
    items: (s.items ?? []).map((it) => ({
      ...it,
      image: it.image?.asset
        ? {
            url: urlFor(it.image)
              .width(640)
              .height(427)
              .fit("crop")
              .auto("format")
              .url(),
            alt: it.image.alt,
            lqip: it.image.lqip,
            width: it.image.dimensions?.width,
            height: it.image.dimensions?.height,
          }
        : null,
    })),
  }));
}

export async function getGuidePage(): Promise<GuidePage> {
  if (!isConfigured) return FALLBACK_GUIDE;
  try {
    const data = await client.fetch<
      (Omit<GuidePage, "sections"> & { sections: RawGuideSection[] }) | null
    >(guidePageQuery, {}, { next: { revalidate: 60 } });
    if (!data?.sections?.length) return FALLBACK_GUIDE;
    return { title: data.title, sections: mapGuideSections(data.sections) };
  } catch {
    return FALLBACK_GUIDE;
  }
}

export async function getAllTourSlugs(): Promise<string[]> {
  if (!isConfigured) return FALLBACK_TOURS.map((t) => t.slug);
  try {
    const slugs = await client.fetch<string[]>(
      `*[_type == "tour" && active != false && defined(slug.current)][].slug.current`,
      {},
      { next: { revalidate: 3600 } },
    );
    return slugs.length > 0 ? slugs : FALLBACK_TOURS.map((t) => t.slug);
  } catch {
    return FALLBACK_TOURS.map((t) => t.slug);
  }
}
