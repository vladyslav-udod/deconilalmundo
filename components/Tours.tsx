'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useMemo, useEffect, useCallback } from 'react'
import type { Tour, TourSection, Region } from '@/types'
import { MapPinOff } from '@/components/icons'
import {
  TRAVEL_TYPES,
  TRAVEL_TYPE_VALUES,
  travelTypeValueFromLabel,
  buildMonthOptions,
  monthKey,
} from '@/lib/taxonomy'

const REGION_LABELS: Record<Region | 'todos', string> = {
  todos: 'Todas',
  europa: 'Europa',
  america: 'América',
  asia: 'Asia',
  africa: 'África',
  oriente: 'Oriente Medio',
  oceania: 'Oceanía',
}

const MONTH_NAMES_SHORT = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic']

const TYPE_LABEL: Record<string, string> = Object.fromEntries(
  TRAVEL_TYPES.map((t) => [t.value, t.label])
)

function formatDateRange(tour: Tour): { display: string; note: string } {
  const start = new Date(tour.startDate + 'T00:00:00')
  const startDay = start.getDate()
  const startMonthName = MONTH_NAMES_SHORT[start.getMonth()]
  const year = start.getFullYear()

  if (!tour.endDate) {
    return { display: `Desde ${startDay} ${startMonthName}`, note: `Cierre por confirmar · ${year}` }
  }

  const end = new Date(tour.endDate + 'T00:00:00')
  const endDay = end.getDate()
  const endMonthName = MONTH_NAMES_SHORT[end.getMonth()]

  if (start.getMonth() === end.getMonth()) {
    return { display: `${startDay} — ${endDay} ${startMonthName}`, note: `${year}` }
  }
  return { display: `${startDay} ${startMonthName} — ${endDay} ${endMonthName}`, note: `${year}` }
}

interface ToursProps {
  tours: Tour[]
  section: TourSection
}

const VALID_REGIONS: Region[] = ['europa', 'america', 'asia', 'africa', 'oriente', 'oceania']

/** Custom event other components fire to reset the filters (e.g. "Ver próximos viajes"). */
export const TOURS_RESET_EVENT = 'tours:reset'

export default function Tours({ tours, section }: ToursProps) {
  // Filters default to "todos" for SSR (so the section is fully server-rendered
  // and SEO-friendly); the URL is read on mount.
  const [regionFilter, setRegionFilter] = useState<Region | 'todos'>('todos')
  const [monthFilter, setMonthFilter] = useState<string>('todos')
  const [typeFilter, setTypeFilter] = useState<string>('todos')

  // Month dropdown: current month + the following 6 months (with year).
  const monthOptions = useMemo(
    () => [{ value: 'todos', label: 'Cualquier mes' }, ...buildMonthOptions(7)],
    []
  )
  const validMonthValues = useMemo(() => new Set(monthOptions.map((m) => m.value)), [monthOptions])

  // Which type filters actually have tours (so we don't show empty chips).
  const typeOptions = useMemo(() => {
    const present = new Set(
      tours.map((t) => travelTypeValueFromLabel(t.typeTag)).filter(Boolean) as string[]
    )
    return TRAVEL_TYPES.filter((t) => present.has(t.value))
  }, [tours])

  // Seed filters from the URL after hydration + react to back/forward nav and
  // to deep links like /?region=asia&tipo=mujeres#tours.
  useEffect(() => {
    const apply = () => {
      const params = new URLSearchParams(window.location.search)
      const r = params.get('region')
      const m = params.get('mes')
      const t = params.get('tipo')
      setRegionFilter(r && VALID_REGIONS.includes(r as Region) ? (r as Region) : 'todos')
      setMonthFilter(m && validMonthValues.has(m) ? m : 'todos')
      setTypeFilter(t && TRAVEL_TYPE_VALUES.includes(t) ? t : 'todos')
    }
    apply()
    const reset = () => {
      setRegionFilter('todos')
      setMonthFilter('todos')
      setTypeFilter('todos')
      const params = new URLSearchParams(window.location.search)
      params.delete('region'); params.delete('mes'); params.delete('tipo')
      const qs = params.toString()
      window.history.replaceState(null, '', `${window.location.pathname}${qs ? `?${qs}` : ''}`)
    }
    window.addEventListener('popstate', apply)
    window.addEventListener(TOURS_RESET_EVENT, reset)
    return () => {
      window.removeEventListener('popstate', apply)
      window.removeEventListener(TOURS_RESET_EVENT, reset)
    }
  }, [validMonthValues])

  // Reflect the current filters back into the URL (shallow, no navigation).
  const syncUrl = useCallback(
    (region: Region | 'todos', month: string, type: string) => {
      if (typeof window === 'undefined') return
      const params = new URLSearchParams(window.location.search)
      region === 'todos' ? params.delete('region') : params.set('region', region)
      month === 'todos' ? params.delete('mes') : params.set('mes', month)
      type === 'todos' ? params.delete('tipo') : params.set('tipo', type)
      const qs = params.toString()
      window.history.replaceState(null, '', `${window.location.pathname}${qs ? `?${qs}` : ''}#tours`)
    },
    []
  )

  const changeRegion = (region: Region | 'todos') => {
    setRegionFilter(region)
    syncUrl(region, monthFilter, typeFilter)
  }
  const changeMonth = (month: string) => {
    setMonthFilter(month)
    syncUrl(regionFilter, month, typeFilter)
  }
  const changeType = (type: string) => {
    setTypeFilter(type)
    syncUrl(regionFilter, monthFilter, type)
  }

  const filtered = useMemo(() => {
    return tours.filter((t) => {
      const regionOk = regionFilter === 'todos' || t.region === regionFilter
      const monthOk = monthFilter === 'todos' || monthKey(t.startDate) === monthFilter
      const typeOk = typeFilter === 'todos' || travelTypeValueFromLabel(t.typeTag) === typeFilter
      return regionOk && monthOk && typeOk
    })
  }, [tours, regionFilter, monthFilter, typeFilter])

  const regions = useMemo(() => {
    const seen = new Set(tours.map((t) => t.region))
    return ['todos', ...Object.keys(REGION_LABELS).filter((k) => k !== 'todos' && seen.has(k as Region))] as (Region | 'todos')[]
  }, [tours])

  const hasActiveFilters = regionFilter !== 'todos' || monthFilter !== 'todos' || typeFilter !== 'todos'

  const resetFilters = () => {
    setRegionFilter('todos')
    setMonthFilter('todos')
    setTypeFilter('todos')
    syncUrl('todos', 'todos', 'todos')
  }

  return (
    <section className="tours" id="tours" aria-labelledby="tours-heading">
      <div className="wrap">
        <div className="head">
          <div>
            <p className="section-label">{section.sectionLabel}</p>
            <h2 className="display" id="tours-heading">
              {section.heading} <em>{section.headingEmphasis}</em>.
            </h2>
          </div>
        </div>

        {/* ── Filters ─────────────────────────────────────────────────────── */}
        <div className="tours-filters" role="group" aria-label="Filtrar próximas salidas">
          <div className="filter-group">
            <span className="row-label">Región</span>
            <div className="filter-chips">
              {regions.map((r) => (
                <button
                  key={r}
                  type="button"
                  className={`filter${regionFilter === r ? ' active' : ''}`}
                  onClick={() => changeRegion(r)}
                  aria-pressed={regionFilter === r}
                >
                  {REGION_LABELS[r]}
                </button>
              ))}
            </div>
          </div>

          {typeOptions.length > 0 && (
            <div className="filter-group">
              <label className="row-label" htmlFor="typeSelect">Tipo de viaje</label>
              <div className="select-wrap">
                <select
                  id="typeSelect"
                  value={typeFilter}
                  onChange={(e) => changeType(e.target.value)}
                  aria-label="Filtrar por tipo de viaje"
                >
                  <option value="todos">Todos los tipos</option>
                  {typeOptions.map((t) => (
                    <option key={t.value} value={t.value}>{t.label}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          <div className="filter-group">
            <label className="row-label" htmlFor="monthSelect">Salida</label>
            <div className="select-wrap">
              <select
                id="monthSelect"
                value={monthFilter}
                onChange={(e) => changeMonth(e.target.value)}
                aria-label="Filtrar por mes de salida"
              >
                {monthOptions.map((m) => (
                  <option key={m.value} value={m.value}>{m.label}</option>
                ))}
              </select>
            </div>
          </div>

          {hasActiveFilters && (
            <button type="button" className="filter-reset" onClick={resetFilters}>
              Limpiar filtros
            </button>
          )}
        </div>

        {filtered.length === 0 ? (
          <div className="tours-empty" role="status">
            <span className="tours-empty-icon" aria-hidden="true">
              <MapPinOff />
            </span>
            <p className="tours-empty-text">
              No hay salidas para esta combinación de filtros.
            </p>
            <button type="button" className="btn-primary tours-empty-btn" onClick={resetFilters}>
              <span>Limpiar filtros</span>
            </button>
          </div>
        ) : (
          <div className="tours-grid" role="list" aria-label="Próximas salidas">
            {filtered.map((tour) => {
              const { display, note } = formatDateRange(tour)
              const imgSrc = tour.imageUrl ?? `https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=1200&q=80`
              const typeValue = travelTypeValueFromLabel(tour.typeTag)

              return (
                <article key={tour._id} className="tour" role="listitem">
                  <Link href={`/viajes/${tour.slug}`} prefetch aria-label={`${tour.title} — desde ${tour.price.toLocaleString('es-ES')} €`}>
                    <div className="media">
                      <Image
                        src={imgSrc}
                        alt={`Viaje a ${tour.title}`}
                        fill
                        sizes="(max-width: 600px) 78vw, (max-width: 1000px) 45vw, 25vw"
                        style={{ objectFit: 'cover' }}
                        loading="lazy"
                      />
                      <div className="pill">{REGION_LABELS[tour.region]}</div>
                      <div className="overlay">
                        <div className="dates">
                          {display}
                          <small>{note}</small>
                        </div>
                        {typeValue && <div className="tag-type">{TYPE_LABEL[typeValue]}</div>}
                      </div>
                    </div>

                    <div className="meta-row">
                      <h3 className="tour-title">
                        {tour.title}
                        {tour.subtitle && <small>{tour.subtitle}</small>}
                      </h3>
                      <div className="price">
                        <em>desde</em>
                        <strong>{tour.price.toLocaleString('es-ES')} €</strong>
                      </div>
                    </div>
                  </Link>
                </article>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
