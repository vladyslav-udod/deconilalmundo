export type Region =
  | "america"
  | "asia"
  | "africa"
  | "oriente"
  | "oceania"
  | "europa";
export type Availability = "available" | "last_spots" | "full";

export interface SanityImage {
  _type: "image";
  asset: { _ref: string; _type: "reference" };
  hotspot?: { x: number; y: number };
  alt?: string;
}

export interface Tour {
  _id: string;
  title: string;
  subtitle?: string;
  slug: string;
  region: Region;
  /** Departure month label/key (legacy). Filtering now derives from startDate. */
  month?: string;
  startDate: string;
  /** Travel type label from "Seis formas de vivirlo" (matches TRAVEL_TYPES). */
  typeTag?: string[];
  endDate?: string;
  /** Duration in days. Derived from startDate/endDate — not stored in the CMS. */
  duration?: number;
  price: number;
  image?: SanityImage;
  imageUrl?: string;
  featured?: boolean;
  active?: boolean;
  order?: number;
}

export interface ItineraryDay {
  _key: string;
  dayLabel: string;
  title: string;
  body?: string;
  tags?: string[];
  image?: SanityImage;
  imageUrl?: string;
}

export interface Departure {
  _key: string;
  date: string;
  availability: Availability;
  price: number;
}

export interface Flight {
  _key: string;
  direction: "outbound" | "return";
  airline?: string;
  flightNumber?: string;
  fromCode?: string;
  fromCity?: string;
  toCode?: string;
  toCity?: string;
  departTime?: string;
  arriveTime?: string;
  duration?: string;
  stops?: string;
}

export interface TourDetail extends Tour {
  lead?: string;
  gallery?: (SanityImage & { imageUrl?: string; alt?: string })[];
  galleryUrls?: { url: string; alt: string }[];
  itinerary?: ItineraryDay[];
  includes?: string[];
  excludes?: string[];
  importantInfo?: string[];
  departures?: Departure[];
  flights?: Flight[];
  contactName?: string;
  contactRole?: string;
  contactInitials?: string;
  contactPhone?: string;
  contactInstagram?: string;
}

export interface Testimonial {
  _id: string;
  quote: string;
  authorName: string;
  authorInitials: string;
  trip?: string;
  year?: number;
  stars: number;
  order?: number;
}

export interface TravelType {
  _id: string;
  title: string;
  description: string;
  image?: SanityImage;
  imageUrl?: string;
  ctaText?: string;
  ctaHref?: string;
  order: number;
}

export interface Stat {
  value: string;
  label: string;
}

export interface SiteSettings {
  siteName: string;
  tagline: string;
  whatsappNumber: string;
  whatsappMessage: string;
  phone: string;
  email: string;
  address: string;
  openingHours: string;
  instagram?: string;
  facebook?: string;
  youtube?: string;
  newsletter?: string;
  legalText: string;
}

export interface HeroSection {
  eyebrow: string;
  heading: string;
  headingEmphasis: string;
  lede: string;
  ctaText: string;
  ghostCtaText: string;
  backgroundImage?: SanityImage;
  backgroundImageUrl?: string;
  metaLine: string;
}

export interface IntroSection {
  sectionLabel: string;
  heading: string;
  headingEmphasis: string;
  leadQuote: string;
  signature: string;
  body: unknown[];
}

export interface AboutSection {
  sectionLabel: string;
  heading: string;
  headingEmphasis: string;
  body: unknown[];
  stats: Stat[];
  badgeQuote: string;
  badgeAttribution: string;
  image?: SanityImage;
  imageUrl?: string;
}

export interface TestimonialSection {
  sectionLabel: string;
  heading: string;
  headingEmphasis: string;
  description: string;
}

export interface CtaSection {
  sectionLabel: string;
  quote: string;
  quoteEmphasis: string;
  subtext: string;
  ctaText: string;
  backgroundImage?: SanityImage;
  backgroundImageUrl?: string;
}

export interface TourSection {
  sectionLabel: string;
  heading: string;
  headingEmphasis: string;
}

export interface TravelTypeSection {
  sectionLabel: string;
  heading: string;
  headingEmphasis: string;
  description: string;
}
