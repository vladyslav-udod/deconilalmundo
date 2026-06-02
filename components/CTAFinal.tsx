'use client'

import type { CtaSection } from '@/types'
import { ArrowRight } from '@/components/icons'

interface CTAFinalProps {
  data: CtaSection
}

const DEFAULT_BG = 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=2400&q=80'

export default function CTAFinal({ data }: CTAFinalProps) {
  const bgUrl = data.backgroundImageUrl ?? DEFAULT_BG

  // On the home page, reset the Próximas salidas filters and smooth-scroll;
  // elsewhere the link navigates to /#tours normally.
  const handleClick = (e: React.MouseEvent) => {
    const tours = document.getElementById('tours')
    if (!tours) return // not on home → let the link navigate
    e.preventDefault()
    window.dispatchEvent(new Event('tours:reset'))
    requestAnimationFrame(() => tours.scrollIntoView({ behavior: 'smooth', block: 'start' }))
  }

  return (
    <section className="cta-final" id="contacto" aria-labelledby="cta-heading">
      <div
        className="bg"
        aria-hidden="true"
        style={{ backgroundImage: `url('${bgUrl}')` }}
      />

      <div className="inner">
        <p className="section-label">{data.sectionLabel}</p>

        <p className="quote" id="cta-heading">
          {data.quote} <em>{data.quoteEmphasis}</em>
        </p>

        <p className="sub">{data.subtext}</p>

        <div className="actions">
          <a href="/#tours" className="btn-primary" onClick={handleClick}>
            <span>{data.ctaText}</span>
            <ArrowRight />
          </a>
        </div>
      </div>
    </section>
  )
}
