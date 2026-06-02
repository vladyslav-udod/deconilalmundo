'use client'

import { useCallback } from 'react'
import type { HeroSection } from '@/types'
import { ArrowDown, ChevronDown } from '@/components/icons'

interface HeroProps {
  data: HeroSection
}

// Keep phrases like "Más de 58 países" from wrapping awkwardly onto a new row.
const NOWRAP_PHRASES = [/Más de \d+ países/g]

function renderLede(text: string): React.ReactNode {
  let parts: React.ReactNode[] = [text]
  for (const re of NOWRAP_PHRASES) {
    const next: React.ReactNode[] = []
    parts.forEach((part) => {
      if (typeof part !== 'string') {
        next.push(part)
        return
      }
      let last = 0
      let m: RegExpExecArray | null
      re.lastIndex = 0
      while ((m = re.exec(part)) !== null) {
        if (m.index > last) next.push(part.slice(last, m.index))
        next.push(
          <span key={`${m[0]}-${m.index}`} style={{ whiteSpace: 'nowrap' }}>
            {m[0]}
          </span>
        )
        last = m.index + m[0].length
      }
      if (last < part.length) next.push(part.slice(last))
    })
    parts = next
  }
  return parts
}

export default function Hero({ data }: HeroProps) {
  // "Ver próximos viajes" resets the Próximas salidas filters to the default
  // state, then scrolls to the section.
  const scrollToTours = useCallback(() => {
    window.dispatchEvent(new Event('tours:reset'))
    requestAnimationFrame(() => {
      document.getElementById('tours')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }, [])

  const bgUrl = data.backgroundImageUrl ?? '/hero-bg.jpg'

  return (
    <header className="hero" id="top">
      <div
        className="bg"
        aria-hidden="true"
        style={{ backgroundImage: `url('${bgUrl}')` }}
      />

      <div className="inner">
        <div className="eyebrow uppercase">
          <span className="line" aria-hidden="true" />
          <span>{data.eyebrow}</span>
        </div>

        <h1>
          {data.heading} <em>{data.headingEmphasis}</em>.
        </h1>

        <p className="lede">{renderLede(data.lede)}</p>

        <div className="actions">
          <button type="button" className="btn-primary" onClick={scrollToTours}>
            <span>{data.ctaText}</span>
            <ArrowDown />
          </button>
          <a href="#nosotros" className="btn-ghost">
            {data.ghostCtaText}
          </a>
        </div>
      </div>

      <div className="meta" aria-hidden="true">
        <span>{data.metaLine}</span>
      </div>

      <button
        type="button"
        className="scroll-down"
        onClick={scrollToTours}
        aria-label="Bajar a los destinos"
      >
        <span className="drop-line" aria-hidden="true" />
        <ChevronDown />
      </button>
    </header>
  )
}
