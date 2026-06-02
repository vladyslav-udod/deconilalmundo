import { aboutSectionType } from './aboutSection'
import { ctaSectionType } from './ctaSection'
import { heroSectionType } from './heroSection'
import { introSectionType } from './introSection'
import { siteSettingsType } from './siteSettings'
import { testimonialSectionType } from './testimonialSection'
import { testimonialType } from './testimonial'
import { tourSectionType } from './tourSection'
import { tourType } from './tour'
import { travelTypeSectionType } from './travelTypeSection'
import { travelTypeType } from './travelType'

export const schemaTypes = [
  // Collections
  tourType,
  testimonialType,
  travelTypeType,
  // Singletons
  siteSettingsType,
  heroSectionType,
  tourSectionType,
  travelTypeSectionType,
  introSectionType,
  aboutSectionType,
  testimonialSectionType,
  ctaSectionType,
]
