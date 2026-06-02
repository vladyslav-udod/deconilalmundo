import Image from 'next/image'
import { Instagram } from '@/components/icons'

export interface InstagramPost {
  /** Link to the specific post; falls back to the profile when omitted. */
  href?: string
  image: string
  alt?: string
}

interface InstagramFeedProps {
  /** Profile handle without the @ (e.g. "deconilalmundo"). */
  handle?: string
  profileUrl?: string
  posts?: InstagramPost[] | null
}

const DEFAULT_HANDLE = 'deconilalmundo'
const DEFAULT_PROFILE = 'https://www.instagram.com/deconilalmundo'

// Curated travel imagery shown when the live Instagram feed can't be reached.
const FALLBACK_POSTS: InstagramPost[] = [
  { image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&q=80', alt: 'Japón' },
  { image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=600&q=80', alt: 'Machu Picchu' },
  { image: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=600&q=80', alt: 'Vietnam' },
  { image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600&q=80', alt: 'Safari en Tanzania' },
  { image: 'https://images.unsplash.com/photo-1527838832700-5059252407fa?w=600&q=80', alt: 'Capadocia' },
  { image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80', alt: 'Australia' },
]

/** Instagram's CDN hostnames change constantly, so those images bypass the
 *  next/image optimizer (which needs an allow-list) and use a plain <img>. */
function isOptimizable(url: string): boolean {
  return url.includes('images.unsplash.com') || url.includes('cdn.sanity.io')
}

export default function InstagramFeed({
  handle = DEFAULT_HANDLE,
  profileUrl = DEFAULT_PROFILE,
  posts,
}: InstagramFeedProps) {
  const items = posts && posts.length > 0 ? posts : FALLBACK_POSTS

  return (
    <section className="ig" id="instagram" aria-labelledby="ig-heading">
      <div className="wrap">
        <div className="ig-head">
          <p className="section-label" style={{ justifyContent: 'center' }}>
            Síguenos en redes
          </p>
          <h2 className="display" id="ig-heading">
            Síguenos en <em>Instagram</em>.
          </h2>
          <a className="ig-handle" href={profileUrl} target="_blank" rel="noopener noreferrer">
            <Instagram />
            @{handle}
          </a>
        </div>

        <div className="ig-grid" role="list" aria-label="Últimas publicaciones de Instagram">
          {items.slice(0, 6).map((post, i) => (
            <a
              key={i}
              className="ig-item"
              href={post.href ?? profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              role="listitem"
              aria-label={post.alt ?? `Publicación ${i + 1} en Instagram`}
            >
              {isOptimizable(post.image) ? (
                <Image
                  src={post.image}
                  alt={post.alt ?? ''}
                  fill
                  sizes="(max-width: 600px) 50vw, (max-width: 1000px) 33vw, 16vw"
                  style={{ objectFit: 'cover' }}
                  loading="lazy"
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={post.image}
                  alt={post.alt ?? ''}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              )}
              <span className="ig-hover" aria-hidden="true">
                <Instagram />
              </span>
            </a>
          ))}
        </div>

        <div className="ig-cta">
          <a className="btn-primary" href={profileUrl} target="_blank" rel="noopener noreferrer">
            <Instagram />
            <span>Seguir en Instagram</span>
          </a>
        </div>
      </div>
    </section>
  )
}
