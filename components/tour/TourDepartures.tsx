import { formatRange } from "@/app/utils/common";
import type { TourDetail, Availability, SiteSettings } from "@/types";

interface TourDeparturesProps {
  tour: TourDetail;
  settings: Pick<SiteSettings, "whatsappNumber">;
}

const MONTHS_FULL = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
];

function longDate(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return `${d.getDate()} de ${MONTHS_FULL[d.getMonth()]} de ${d.getFullYear()}`;
}

/** WhatsApp deep link with a message pre-filled for the selected departure. */
function whatsappLink(
  whatsappNumber: string,
  tour: TourDetail,
  dateStr: string,
): string {
  const msg = `Hola, me interesa el viaje a ${tour.title} con salida el ${longDate(dateStr)}. ¿Me dais más información?`;
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`;
}

const AVAIL: Record<Availability, { label: string; cls: string }> = {
  available: { label: "Disponible", cls: "ok" },
  last_spots: { label: "Últimas plazas", cls: "few" },
  full: { label: "Completo", cls: "soon" },
};

export default function TourDepartures({
  tour,
  settings,
}: TourDeparturesProps) {
  const departures = tour.departures ?? [];
  if (departures.length === 0) return null;

  return (
    <section className="sec dates band" id="fechas">
      <div className="tp-wrap">
        <div className="head">
          <div className="section-label">Próximas salidas</div>
          <h2 className="display">
            Elige tu <em>fecha</em>
          </h2>
        </div>

        <div className="date-table">
          <div className="thead">
            <span>Salida</span>
            <span>Disponibilidad</span>
            <span>Precio</span>
            <span></span>
          </div>
          {departures.map((dep) => {
            const { range, year } = formatRange(dep.date, tour.duration);
            const a = AVAIL[dep.availability] ?? AVAIL.available;
            const full = dep.availability === "full";
            return (
              <div className="date-row" key={dep._key}>
                <div className="when">
                  {range}
                  <small>{year}</small>
                </div>
                <div>
                  <span className={`badge ${a.cls}`}>{a.label}</span>
                </div>
                {dep.price ? (
                  <div className="pr">
                    {dep.price?.toLocaleString("es-ES")}€
                    <small>por persona</small>
                  </div>
                ) : (
                  <div></div>
                )}
                <div className="go">
                  {!full && (
                    <a
                      href={whatsappLink(
                        settings.whatsappNumber,
                        tour,
                        dep.date,
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary sm"
                    >
                      <span>Reservar</span>
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <p className="date-note">
          Precios por persona en habitación doble. Plazas sujetas a
          disponibilidad en el momento de la reserva. Consulta suplemento de
          habitación individual.
        </p>
      </div>
    </section>
  );
}
