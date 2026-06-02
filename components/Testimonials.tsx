import type { Testimonial, TestimonialSection } from '@/types'

interface TestimonialsProps {
  section: TestimonialSection
  testimonials: Testimonial[]
}

function Stars({ count }: { count: number }) {
  return (
    <div className="stars" aria-label={`${count} de 5 estrellas`}>
      {'★'.repeat(Math.min(5, Math.max(0, count)))}
    </div>
  )
}

export default function Testimonials({ section, testimonials }: TestimonialsProps) {
  return (
    <section className="testimonials" id="testimonios" aria-labelledby="testimonios-heading">
      <div className="wrap">
        <div className="head">
          <p className="section-label" style={{ justifyContent: 'center' }}>
            {section.sectionLabel}
          </p>
          <h2 className="display" id="testimonios-heading">
            {section.heading} <em>{section.headingEmphasis}</em>.
          </h2>
          <p>{section.description}</p>

          <a
            className="google-rating"
            href="https://www.google.com/maps/place/De+Conil+al+mundo/@36.2799946,-6.0927532,17z/data=!4m8!3m7!1s0xd0c39817d434afd:0x6371eac50dca6ce1!8m2!3d36.2799903!4d-6.0901783!9m1!1b1!16s%2Fg%2F11wmhj8rpj?authuser=0&entry=ttu&g_ep=EgoyMDI2MDUyNy4wIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Reseñas en Google: 5 sobre 5"
          >
            <span className="gr-score">5,0</span>
            <span className="gr-stars" aria-hidden="true">★★★★★</span>
            <span className="gr-label">Reseñas reales en Google</span>
          </a>
        </div>

        <div className="testi-grid" role="list" aria-label="Opiniones de viajeros">
          {testimonials.map((t) => (
            <figure key={t._id} className="testi" role="listitem">
              <Stars count={t.stars} />
              <blockquote>{t.quote}</blockquote>
              <figcaption className="by">
                <div className="av" aria-hidden="true">{t.authorInitials}</div>
                <div className="who">
                  {t.authorName}
                  {(t.trip || t.year) && (
                    <small>
                      {t.trip && `Viajó a ${t.trip}`}
                      {t.trip && t.year && ' · '}
                      {t.year}
                    </small>
                  )}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
