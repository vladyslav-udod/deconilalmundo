import type { TourDetail } from '@/types'

interface TourIncludesProps {
  tour: TourDetail
}

export default function TourIncludes({ tour }: TourIncludesProps) {
  const includes = tour.includes ?? []
  const excludes = tour.excludes ?? []

  if (includes.length === 0 && excludes.length === 0) return null

  return (
    <section className="sec incl" id="incluye">
      <div className="tp-wrap">
        <div className="head">
          <div className="section-label">Qué incluye</div>
          <h2 className="display">Todo <em>organizado</em></h2>
        </div>

        <div className="incl-grid">
          {includes.length > 0 && (
            <div className="incl-col yes">
              <h3>
                <span className="ic">
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
                </span>
                Incluye
              </h3>
              <ul>
                {includes.map((item, i) => (
                  <li key={i}>
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {excludes.length > 0 && (
            <div className="incl-col no">
              <h3>
                <span className="ic">
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12" /></svg>
                </span>
                No incluye
              </h3>
              <ul>
                {excludes.map((item, i) => (
                  <li key={i}>
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12" /></svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
