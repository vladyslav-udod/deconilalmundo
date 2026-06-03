'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import type { TravelType, TravelTypeSection } from '@/types'
import { ArrowRight } from '@/components/icons'
import { travelTypeValueFromTitle } from '@/lib/taxonomy'
import { TOURS_APPLY_EVENT, type ToursApplyDetail } from '@/components/Tours'

interface TiposDeViajeProps {
  section: TravelTypeSection
  types: TravelType[]
}

export default function TiposDeViaje({ section, types }: TiposDeViajeProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const explore = useCallback(
    (typeValue: string | undefined, href: string) => (e: React.MouseEvent) => {
      // On the home page, apply the filter in place (no navigation) with a brief
      // loading overlay; elsewhere, fall back to a normal navigation.
      const tours = document.getElementById('tours')
      if (!tours || !typeValue) {
        // Not on the home page (or no mappable type) → let the link navigate,
        // but still show the overlay so the wait feels intentional.
        setLoading(true)
        if (!tours) {
          e.preventDefault()
          router.push(href)
        }
        return
      }

      e.preventDefault()
      setLoading(true)
      // Defer the (potentially heavy) filter + scroll so the overlay paints first.
      requestAnimationFrame(() => {
        window.dispatchEvent(
          new CustomEvent<ToursApplyDetail>(TOURS_APPLY_EVENT, { detail: { tipo: typeValue } })
        )
        tours.scrollIntoView({ behavior: 'smooth', block: 'start' })
        // Hide the overlay once the smooth scroll has had time to run.
        window.setTimeout(() => setLoading(false), 650)
      })
    },
    [router]
  )

  return (
    <section className="types" id="tipos" aria-labelledby="tipos-heading">
      {loading && (
        <div className="types-loading" role="status" aria-live="polite">
          <span className="types-spinner" aria-hidden="true" />
          <span className="types-loading-text">Cargando viajes…</span>
        </div>
      )}

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

                <a
                  href={href}
                  className="more"
                  aria-label={`${type.ctaText ?? 'Explorar'} — ${type.title}`}
                  onClick={explore(typeValue, href)}
                >
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
