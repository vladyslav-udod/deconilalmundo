import createImageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const imageBuilder = createImageUrlBuilder({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
} as any)

export function urlFor(source: SanityImageSource) {
  return imageBuilder.image(source)
}
