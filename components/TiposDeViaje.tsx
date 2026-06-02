import type { TravelType, TravelTypeSection } from '@/types'
import { ArrowRight } from '@/components/icons'
import { travelTypeValueFromTitle } from '@/lib/taxonomy'

interface TiposDeViajeProps {
  section: TravelTypeSection
  types: TravelType[]
}

export default function TiposDeViaje({ section, types }: TiposDeViajeProps) {
  return (
    <section className="types" id="tipos" aria-labelledby="tipos-heading">
      <div className="wrap">
        <div className="head">
          <div>
            <p className="section-label">{section.sectionLabel}</p>
            <h2 className="display" id="tipos-heading">
              {section.heading} <em>{section.headingEmphasis}</em>.
            </h2>
          </div>
          <p>{section.description}</p>
        </div>

        <div className="types-grid" role="list">
          {types.map((type) => {
            const imgSrc = type.imageUrl ?? 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80'
            // "Explorar" pre-filters Próximas salidas by this travel type.
            const typeValue = travelTypeValueFromTitle(type.title)
            const href = type.ctaHref ?? (typeValue ? `/?tipo=${typeValue}#tours` : '/#tours')

            return (
              <article key={type._id} className="type-card" role="listitem">
                {/* Background via CSS for these decorative full-bleed images; Unsplash CDN handles format optimisation */}
                <div
                  className="bg"
                  aria-hidden="true"
                  style={{ backgroundImage: `url('${imgSrc}')` }}
                />

                <h3>{type.title}</h3>
                <p>{type.description}</p>

                <a href={href} className="more" aria-label={`${type.ctaText ?? 'Explorar'} — ${type.title}`}>
                  {type.ctaText ?? 'Explorar'}
                  <ArrowRight />
                </a>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
