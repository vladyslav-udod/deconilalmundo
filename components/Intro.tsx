import { PortableText } from '@portabletext/react'
import type { IntroSection } from '@/types'

interface IntroProps {
  data: IntroSection
}

const FALLBACK_BODY = [
  'En De Conil al Mundo somos especialistas en viajes acompañados, creando experiencias únicas para personas que desean descubrir el mundo acompañadas, seguras y disfrutando desde el primer momento.',
  'Organizamos salidas desde Conil, toda la provincia de Cádiz, alrededores e incluso Madrid, aunque nuestros viajes están abiertos a cualquier persona de cualquier punto de España.',
  'En todos nuestros grupos viaja siempre al menos una persona del equipo de Halcón Viajes Conil, acompañando al grupo en todo momento para que la experiencia sea cómoda, cercana, divertida y totalmente segura.',
]

export default function Intro({ data }: IntroProps) {
  const hasPortableText = Array.isArray(data.body) && data.body.length > 0

  return (
    <section className="intro" id="manifiesto" aria-labelledby="intro-heading">
      <div className="wrap">
        <div className="grid">
          <div>
            <p className="section-label">{data.sectionLabel}</p>
            <h2 className="display" id="intro-heading">
              {data.heading} <em>{data.headingEmphasis}</em>.
            </h2>
            <p className="lead">{data.leadQuote}</p>
            <p className="signature">{data.signature}</p>
          </div>

          <div>
            {hasPortableText ? (
              <PortableText value={data.body as Parameters<typeof PortableText>[0]['value']} />
            ) : (
              FALLBACK_BODY.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
