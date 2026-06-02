import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import type { AboutSection } from '@/types'

interface AboutProps {
  data: AboutSection
}

const FALLBACK_BODY = [
  'Llevamos desde 2004 dedicándonos al mundo de los viajes y coordinando grupos por numerosos destinos internacionales. Después de recorrer más de 58 países, conocemos de primera mano muchos de los lugares que ofrecemos.',
  'Viajar con nosotros significa sentirte acompañado, conocer gente nueva, descubrir culturas diferentes y olvidarte del estrés de la organización para dedicarte únicamente a disfrutar.',
]

const DEFAULT_IMAGE_URL = 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1400&q=80'

export default function About({ data }: AboutProps) {
  const hasPortableText = Array.isArray(data.body) && data.body.length > 0
  const imgSrc = data.imageUrl ?? DEFAULT_IMAGE_URL

  return (
    <section className="about" id="nosotros" aria-labelledby="nosotros-heading">
      <div className="wrap">
        <div className="grid">
          <div>
            <p className="section-label">{data.sectionLabel}</p>
            <h2 className="display" id="nosotros-heading">
              {data.heading} <em>{data.headingEmphasis}</em>.
            </h2>

            {hasPortableText ? (
              <PortableText value={data.body as Parameters<typeof PortableText>[0]['value']} />
            ) : (
              FALLBACK_BODY.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))
            )}

            <div className="stats" aria-label="Estadísticas">
              {data.stats.map((stat, i) => (
                <div key={i} className="stat">
                  <div className="n" aria-label={`${stat.value} — ${stat.label}`}>
                    {stat.value}
                  </div>
                  <div className="l">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="media" role="img" aria-label={data.image?.alt ?? 'Equipo Halcón Viajes Conil'} style={{ backgroundImage: `url('${imgSrc}')` }}>
            <div className="badge">
              <span className="y">{data.badgeAttribution}</span>
              {data.badgeQuote}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
