import type { TourDetail, SiteSettings } from '@/types'
import { Phone } from '@/components/icons'
import TourGallery from './TourGallery'

interface TourHeroProps {
  tour: TourDetail
  settings: Pick<SiteSettings, 'phone' | 'email'>
}

const REGION_LABELS: Record<string, string> = {
  europa: 'Europa',
  america: 'América',
  asia: 'Asia',
  africa: 'África',
  oriente: 'Oriente Medio',
  oceania: 'Oceanía',
}

const MONTHS_ES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic']

function formatShortDate(dateStr?: string): string {
  if (!dateStr) return 'Por confirmar'
  const d = new Date(dateStr + 'T00:00:00')
  return `${String(d.getDate()).padStart(2, '0')} ${MONTHS_ES[d.getMonth()]} ${d.getFullYear()}`
}

// Gallery placeholder images by region when no Sanity images are available
const REGION_GALLERY: Record<string, string[]> = {
  asia: [
    'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1400&q=80',
    'https://images.unsplash.com/photo-1528181304800-259b08848526?w=800&q=80',
    'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=800&q=80',
    'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=800&q=80',
    'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800&q=80',
    'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&q=80',
    'https://images.unsplash.com/photo-1480796927426-f609979314bd?w=800&q=80',
  ],
  america: [
    'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=1400&q=80',
    'https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?w=800&q=80',
    'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=800&q=80',
    'https://images.unsplash.com/photo-1589909202802-8f4aadce1849?w=800&q=80',
    'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=800&q=80',
  ],
  africa: [
    'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1400&q=80',
    'https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?w=800&q=80',
    'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&q=80',
    'https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=800&q=80',
    'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&q=80',
  ],
  oriente: [
    'https://images.unsplash.com/photo-1527838832700-5059252407fa?w=1400&q=80',
    'https://images.unsplash.com/photo-1548695607-9c73430c2795?w=800&q=80',
    'https://images.unsplash.com/photo-1568885972738-8f96f5c2c04d?w=800&q=80',
    'https://images.unsplash.com/photo-1512632578888-169bbbc64f33?w=800&q=80',
    'https://images.unsplash.com/photo-1571979596025-c3b3e073f1df?w=800&q=80',
  ],
  oceania: [
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&q=80',
    'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=800&q=80',
    'https://images.unsplash.com/photo-1529108190281-9a4f620bc2d8?w=800&q=80',
    'https://images.unsplash.com/photo-1504280317859-544bce2bdd0e?w=800&q=80',
    'https://images.unsplash.com/photo-1594495894542-a46cc73e081a?w=800&q=80',
  ],
  europa: [
    'https://images.unsplash.com/photo-1525874684015-58379d421a52?w=1400&q=80',
    'https://images.unsplash.com/photo-1503917988258-f87a78e3c995?w=800&q=80',
    'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&q=80',
    'https://images.unsplash.com/photo-1491557345352-5929e343eb89?w=800&q=80',
    'https://images.unsplash.com/photo-1504829857797-ddff29c27927?w=800&q=80',
  ],
}

export default function TourHero({ tour, settings }: TourHeroProps) {
  const galleryImages =
    tour.galleryUrls?.filter((g) => g.url) ??
    (REGION_GALLERY[tour.region] ?? REGION_GALLERY.asia).map((url, i) => ({
      url,
      alt: `${tour.title} — imagen ${i + 1}`,
    }))

  const phone = tour.contactPhone ?? settings.phone
  const email = settings.email
  const nextDeparture = tour.departures?.[0]?.date ?? tour.startDate
  const regionLabel = REGION_LABELS[tour.region] ?? tour.region

  return (
    <header className="tour-head">
      <div className="tp-wrap">
        <nav className="crumbs" aria-label="Migas de pan">
          <a href="/#tours">Destinos</a>
          <span className="sep">·</span>
          <a href={`/?region=${tour.region}#tours`}>{regionLabel}</a>
          <span className="sep">·</span>
          <span className="here">{tour.title}</span>
        </nav>

        <div className="title-row">
          <h1>{tour.title}</h1>
          {tour.subtitle && (
            <div className="glance">
              <span className="chip">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0 1 18 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {tour.subtitle}
              </span>
            </div>
          )}
        </div>

        {tour.lead && <p className="lede">{tour.lead}</p>}
      </div>

      <div className="tp-wrap">
        <div className="stage">
          <TourGallery images={galleryImages} />

          <aside className="booking" id="reservar" aria-label="Reserva">
            <div className="book-card">
              <div className="top">
                <div className="facts">
                  <div className="fact">
                    <div className="k">Duración</div>
                    <div className="v">{tour.duration ? `${tour.duration} días` : 'Por confirmar'}</div>
                  </div>
                  <div className="fact">
                    <div className="k">Próxima salida</div>
                    <div className="v">{formatShortDate(nextDeparture)}</div>
                  </div>
                  <div className="fact">
                    <div className="k">Grupo</div>
                    <div className="v">Reducido</div>
                  </div>
                  <div className="fact">
                    <div className="k">Vuelos</div>
                    <div className="v">Incluidos</div>
                  </div>
                </div>
              </div>
              <div className="price-row">
                <span className="lab">Precio</span>
                <span className="amt">
                  <em>Desde</em>
                  <strong>{tour.price.toLocaleString('es-ES')}€</strong>
                  <small>por persona</small>
                </span>
              </div>
              <div className="cta">
                <a href="#fechas" className="btn-primary">
                  <span>Ver próximas salidas</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </a>
                <div className="reassure">
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
                  Reserva con plaza garantizada
                </div>
              </div>
            </div>

            <div className="advisor">
              <div className="who">
                <div className="av" aria-hidden="true">{tour.contactInitials ?? 'MJ'}</div>
                <div>
                  <div className="lab">Tu asesora de viaje</div>
                  <div className="nm">
                    {tour.contactName ?? 'María José Pérez'}
                    <small>{tour.contactRole ?? 'Halcón Viajes · Conil'}</small>
                  </div>
                </div>
              </div>
              <div className="contact">
                {phone && (
                  <a className="phone" href={`tel:${phone.replace(/\s/g, '')}`}>
                    <Phone />
                    {phone}
                  </a>
                )}
                {email && (
                  <a className="phone" href={`mailto:${email}`}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
                      <rect x="3" y="5" width="18" height="14" rx="2" />
                      <path d="m4 7 8 6 8-6" />
                    </svg>
                    {email}
                  </a>
                )}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </header>
  )
}
