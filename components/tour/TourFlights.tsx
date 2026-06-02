import type { TourDetail, Flight } from '@/types'

interface TourFlightsProps {
  tour: TourDetail
}

const DIRECTION_LABEL: Record<Flight['direction'], string> = {
  outbound: 'Ida',
  return: 'Vuelta',
}

function Leg({ flight }: { flight: Flight }) {
  const meta = [flight.flightNumber, flight.departTime && flight.arriveTime ? `${flight.departTime} – ${flight.arriveTime}` : flight.departTime]
    .filter(Boolean)
    .join(' · ')

  return (
    <div className="legwrap">
      <span className="dir">{DIRECTION_LABEL[flight.direction]}</span>
      <div className="leg has-dir">
        <div className="endpoint">
          <div className="code">{flight.fromCode}</div>
          <div className="city">{flight.fromCity}</div>
        </div>
        <div className="route">
          <span className="air">{[flight.airline, meta].filter(Boolean).join(' · ')}</span>
          <span className="lineviz">
            <span className="l" />
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 16l20-7-9 16-2-7-9-2z" /></svg>
            <span className="l" />
          </span>
          {(flight.stops || flight.duration) && (
            <span className="stop">{[flight.stops, flight.duration].filter(Boolean).join(' · ')}</span>
          )}
        </div>
        <div className="endpoint to">
          <div className="code">{flight.toCode}</div>
          <div className="city">{flight.toCity}</div>
        </div>
      </div>
    </div>
  )
}

export default function TourFlights({ tour }: TourFlightsProps) {
  const flights = tour.flights ?? []
  if (flights.length === 0) return null

  return (
    <section className="sec flights" id="vuelos">
      <div className="tp-wrap">
        <div className="head">
          <div className="section-label">Cómo volamos</div>
          <h2 className="display">Detalle de <em>vuelos</em></h2>
        </div>

        <div className="flight-card">
          {flights.map((flight) => (
            <Leg key={flight._key} flight={flight} />
          ))}
        </div>

        <p className="flight-note">
          Horarios y números de vuelo orientativos; pueden variar según la fecha de salida y la
          compañía aérea. Te confirmamos los datos definitivos antes de la emisión de billetes.
          Consulta salidas desde Madrid y otras ciudades.
        </p>
      </div>
    </section>
  )
}
