"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useMemo, useEffect, useCallback } from "react";
import type { Tour, TourSection, Region } from "@/types";
import { MapPinOff } from "@/components/icons";
import {
  TRAVEL_TYPES,
  TRAVEL_TYPE_VALUES,
  travelTypeValueFromLabel,
  buildMonthOptions,
  monthKey,
  tourDuration,
  MONTH_NAMES_LONG,
} from "@/lib/taxonomy";
import { FilterSelect, SelectOption } from "./common/FilterSelect";
import { formatRange, getNextDeparture } from "@/app/utils/common";

const REGION_LABELS: Record<Region | "todos", string> = {
  todos: "Todas",
  europa: "Europa",
  america: "América",
  asia: "Asia",
  africa: "África",
  oriente: "Oriente Medio",
  oceania: "Oceanía",
};

const MONTH_NAMES_SHORT = [
  "ene",
  "feb",
  "mar",
  "abr",
  "may",
  "jun",
  "jul",
  "ago",
  "sep",
  "oct",
  "nov",
  "dic",
];

const TYPE_LABEL: Record<string, string> = Object.fromEntries(
  TRAVEL_TYPES.map((t) => [t.value, t.label]),
);

function formatDateRange(tour: Tour): { display: string; note: string } {
  const start = new Date(tour.startDate + "T00:00:00");
  const startDay = start.getDate();
  const startMonthName = MONTH_NAMES_SHORT[start.getMonth()];
  const proximaSalida = getNextDeparture(tour.departures);
  const proximaSalidaFormatted = formatRange(proximaSalida!, tour.duration);
  const year = proximaSalidaFormatted.year;

  if (!tour.endDate) {
    return {
      display: `Desde ${startDay} ${startMonthName}`,
      note: `Cierre por confirmar · ${year}`,
    };
  }

  const end = new Date(tour.endDate + "T00:00:00");
  const endDay = end.getDate();
  const endMonthName = MONTH_NAMES_SHORT[end.getMonth()];

  if (tour.startDate === tour.endDate) {
    if (start < new Date()) {
      return {
        display: proximaSalidaFormatted.range,
        note: `${year}`,
      };
    }

    return {
      display: `${startDay} ${startMonthName}`,
      note: `${year}`,
    };
  }

  if (start.getMonth() === end.getMonth()) {
    return {
      display: `${startDay} - ${endDay} ${startMonthName}`,
      note: `${year}`,
    };
  }
  return {
    display: `${startDay} ${startMonthName} - ${endDay} ${endMonthName}`,
    note: `${year}`,
  };
}

const VALID_REGIONS: Region[] = [
  "europa",
  "america",
  "asia",
  "africa",
  "oriente",
  "oceania",
];

/** Custom event other components fire to reset the filters (e.g. "Ver próximos viajes"). */
export const TOURS_RESET_EVENT = "tours:reset";
/** Event to apply a specific filter set (e.g. "Explorar" cards) without navigating. */
export const TOURS_APPLY_EVENT = "tours:apply";

export interface ToursApplyDetail {
  region?: Region | "todos";
  mes?: string;
  tipo?: string;
}

export interface ToursProps {
  tours: Tour[];
  section: TourSection;
  initialFilters: { region: string; mes: string; tipo: string };
}

export default function Tours({ tours, section, initialFilters }: ToursProps) {
  // Filters default to "todos" for SSR (so the section is fully server-rendered
  // and SEO-friendly); the URL is read on mount.
  const initRegion = VALID_REGIONS.includes(initialFilters.region as Region)
    ? (initialFilters.region as Region)
    : "todos";
  const initType = TRAVEL_TYPE_VALUES.includes(initialFilters.tipo)
    ? initialFilters.tipo
    : "todos";

  const [regionFilter, setRegionFilter] = useState<Region | "todos">(
    initRegion,
  );
  const [typeFilter, setTypeFilter] = useState<string>(initType);
  const [monthFilter, setMonthFilter] = useState<string>(() => {
    const valid = new Set(buildMonthOptions(7).map((m) => m.value));
    return valid.has(initialFilters.mes) ? initialFilters.mes : "todos";
  });

  // Month dropdown: current month + the following 6 months (with year).
  const monthOptions = useMemo(() => {
    const availableOptions = Array.from(
      new Set(tours.map((t) => t.startDate.slice(0, 7))),
    ).map((m) => {
      const [year, month] = m!.split("-");
      return {
        label: `${MONTH_NAMES_LONG[parseInt(month, 10) - 1]} ${year}`,
        value: m,
      };
    });

    return [{ value: "todos", label: "Cualquier mes" }, ...availableOptions];
  }, []);

  const validMonthValues = useMemo(
    () => new Set(monthOptions.map((m) => m.value)),
    [monthOptions],
  );

  // Which type filters actually have tours (so we don't show empty chips).
  const typeOptions = useMemo(() => {
    const present = new Set(
      tours
        .flatMap((t) => t.typeTag)
        .map((tag) => travelTypeValueFromLabel(tag))
        .filter(Boolean) as string[],
    );
    return TRAVEL_TYPES.filter((t) => present.has(t.value));
  }, [tours]);

  // Seed filters from the URL after hydration + react to back/forward nav and
  // to deep links like /?region=asia&tipo=mujeres#tours.
  useEffect(() => {
    const apply = () => {
      const params = new URLSearchParams(window.location.search);
      const r = params.get("region");
      const m = params.get("mes");
      const t = params.get("tipo");
      setRegionFilter(
        r && VALID_REGIONS.includes(r as Region) ? (r as Region) : "todos",
      );
      setMonthFilter(m && validMonthValues.has(m) ? m : "todos");
      setTypeFilter(t && TRAVEL_TYPE_VALUES.includes(t) ? t : "todos");
    };
    apply();
    const reset = () => {
      setRegionFilter("todos");
      setMonthFilter("todos");
      setTypeFilter("todos");
      const params = new URLSearchParams(window.location.search);
      params.delete("region");
      params.delete("mes");
      params.delete("tipo");
      const qs = params.toString();
      window.history.replaceState(
        null,
        "",
        `${window.location.pathname}${qs ? `?${qs}` : ""}`,
      );
    };
    const applyFromEvent = (e: Event) => {
      const d = (e as CustomEvent<ToursApplyDetail>).detail ?? {};
      const region =
        d.region && VALID_REGIONS.includes(d.region as Region)
          ? d.region
          : "todos";
      const mes = d.mes && validMonthValues.has(d.mes) ? d.mes : "todos";
      const tipo =
        d.tipo && TRAVEL_TYPE_VALUES.includes(d.tipo) ? d.tipo : "todos";
      setRegionFilter(region);
      setMonthFilter(mes);
      setTypeFilter(tipo);
      const params = new URLSearchParams(window.location.search);
      region === "todos"
        ? params.delete("region")
        : params.set("region", region);
      mes === "todos" ? params.delete("mes") : params.set("mes", mes);
      tipo === "todos" ? params.delete("tipo") : params.set("tipo", tipo);
      const qs = params.toString();
      window.history.replaceState(
        null,
        "",
        `${window.location.pathname}${qs ? `?${qs}` : ""}#tours`,
      );
    };
    window.addEventListener("popstate", apply);
    window.addEventListener(TOURS_RESET_EVENT, reset);
    window.addEventListener(TOURS_APPLY_EVENT, applyFromEvent as EventListener);
    return () => {
      window.removeEventListener("popstate", apply);
      window.removeEventListener(TOURS_RESET_EVENT, reset);
      window.removeEventListener(
        TOURS_APPLY_EVENT,
        applyFromEvent as EventListener,
      );
    };
  }, [validMonthValues]);

  // Reflect the current filters back into the URL (shallow, no navigation).
  const syncUrl = useCallback(
    (region: Region | "todos", month: string, type: string) => {
      if (typeof window === "undefined") return;
      const params = new URLSearchParams(window.location.search);
      region === "todos"
        ? params.delete("region")
        : params.set("region", region);
      month === "todos" ? params.delete("mes") : params.set("mes", month);
      type === "todos" ? params.delete("tipo") : params.set("tipo", type);
      const qs = params.toString();
      window.history.replaceState(
        null,
        "",
        `${window.location.pathname}${qs ? `?${qs}` : ""}#tours`,
      );
    },
    [],
  );

  const changeRegion = (region: Region | "todos") => {
    setRegionFilter(region);
    syncUrl(region, monthFilter, typeFilter);
  };
  const changeMonth = (month: string) => {
    setMonthFilter(month);
    syncUrl(regionFilter, month, typeFilter);
  };
  const changeType = (type: string) => {
    setTypeFilter(type);
    syncUrl(regionFilter, monthFilter, type);
  };

  const filtered = useMemo(() => {
    return tours.filter((t) => {
      const regionOk = regionFilter === "todos" || t.region === regionFilter;
      const monthOk =
        monthFilter === "todos" || monthKey(t.startDate) === monthFilter;
      const typeOk =
        typeFilter === "todos" ||
        (t.typeTag &&
          Array.isArray(t.typeTag) &&
          t.typeTag.some(
            (tag) => travelTypeValueFromLabel(tag) === typeFilter,
          ));
      return regionOk && monthOk && typeOk;
    });
  }, [tours, regionFilter, monthFilter, typeFilter]);

  const regions = useMemo(() => {
    const seen = new Set(tours.map((t) => t.region));
    return [
      "todos",
      ...Object.keys(REGION_LABELS).filter(
        (k) => k !== "todos" && seen.has(k as Region),
      ),
    ] as (Region | "todos")[];
  }, [tours]);

  const hasActiveFilters =
    regionFilter !== "todos" ||
    monthFilter !== "todos" ||
    typeFilter !== "todos";

  const resetFilters = () => {
    setRegionFilter("todos");
    setMonthFilter("todos");
    setTypeFilter("todos");
    syncUrl("todos", "todos", "todos");
  };

  // near your other useMemo blocks:
  const regionSelectOptions = useMemo<SelectOption[]>(
    () =>
      regions.map((r) => ({
        value: r,
        label: r === "todos" ? "Todas las regiones" : REGION_LABELS[r],
      })),
    [regions],
  );

  const typeSelectOptions = useMemo<SelectOption[]>(
    () => [
      { value: "todos", label: "Todos los tipos" },
      ...typeOptions.map((t) => ({ value: t.value, label: t.label })),
    ],
    [typeOptions],
  );

  const monthSelectOptions = useMemo<SelectOption[]>(
    () => monthOptions.map((m) => ({ value: String(m.value), label: m.label })),
    [monthOptions],
  );

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
        <div
          className="tours-filters"
          role="group"
          aria-label="Filtrar próximas salidas"
        >
          <div className="filter-group">
            <label className="row-label" htmlFor="regionSelect">
              Región
            </label>
            {/* Desktop: chips. Mobile (≤1000px): a compact dropdown to save space. */}
            <div className="filter-chips">
              {regions.map((r) => (
                <button
                  key={r}
                  type="button"
                  className={`filter${regionFilter === r ? " active" : ""}`}
                  onClick={() => changeRegion(r)}
                  aria-pressed={regionFilter === r}
                >
                  {REGION_LABELS[r]}
                </button>
              ))}
            </div>

            <div className="select-wrap select-region">
              <FilterSelect
                value={regionFilter}
                options={regionSelectOptions}
                onChange={(v) => changeRegion(v as Region | "todos")}
                ariaLabel="Filtrar por región"
              />
            </div>
          </div>

          {typeOptions.length > 0 && (
            <div className="filter-group">
              <label className="row-label" htmlFor="typeSelect">
                Tipo de viaje
              </label>
              <div className="select-wrap">
                <FilterSelect
                  value={typeFilter}
                  options={typeSelectOptions}
                  onChange={changeType}
                  ariaLabel="Filtrar por tipo de viaje"
                />
              </div>
            </div>
          )}

          <div className="filter-group">
            <label className="row-label" htmlFor="monthSelect">
              Salida
            </label>
            <div className="select-wrap">
              <FilterSelect
                value={monthFilter}
                options={monthSelectOptions}
                onChange={changeMonth}
                ariaLabel="Filtrar por mes de salida"
              />
            </div>
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              className="filter-reset"
              onClick={resetFilters}
            >
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
            <button
              type="button"
              className="btn-primary tours-empty-btn"
              onClick={resetFilters}
            >
              <span>Limpiar filtros</span>
            </button>
          </div>
        ) : (
          <div className="tours-grid" role="list" aria-label="Próximas salidas">
            {filtered.map((tour) => {
              const { display, note } = formatDateRange(tour);
              const imgSrc =
                tour.imageUrl ??
                `https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=1200&q=80`;
              const typeValue =
                tour.typeTag && Array.isArray(tour.typeTag)
                  ? tour.typeTag.map((i) => travelTypeValueFromLabel(i))
                  : null;

              return (
                <article key={tour._id} className="tour" role="listitem">
                  <Link
                    href={`/viajes/${tour.slug}`}
                    prefetch
                    aria-label={`${tour.title} - desde ${tour.price.toLocaleString("es-ES")} €`}
                  >
                    <div className="media">
                      <Image
                        src={imgSrc}
                        alt={`Viaje a ${tour.title}`}
                        fill
                        sizes="(max-width: 600px) 78vw, (max-width: 1000px) 45vw, 25vw"
                        style={{ objectFit: "cover" }}
                        loading="lazy"
                      />
                      <div className="pill">{REGION_LABELS[tour.region]}</div>
                      <div className="overlay">
                        <div className="dates">
                          {display}
                          <small>{note}</small>
                        </div>
                        <div className="pill -duration">
                          {tourDuration(tour.startDate, tour.endDate) === 1
                            ? `${tourDuration(tour.startDate, tour.endDate)} día`
                            : `${tourDuration(tour.startDate, tour.endDate)} días`}
                        </div>
                        {tour.subtitle && (
                          <small className="overlay-subtitle">
                            {tour.subtitle}
                          </small>
                        )}
                      </div>
                    </div>

                    <div className="meta-row">
                      <div className="meta-main">
                        <h3 className="tour-title">{tour.title}</h3>
                        {typeValue &&
                          typeValue.map(
                            (t, i) =>
                              t && (
                                <span className="tour-type" key={i}>
                                  {TYPE_LABEL[t]}
                                </span>
                              ),
                          )}
                      </div>
                      <div className="price">
                        <em>desde</em>
                        <strong>{tour.price.toLocaleString("es-ES")} €</strong>
                      </div>
                    </div>
                  </Link>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
