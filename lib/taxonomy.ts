// ─── Shared taxonomy: the 6 "Seis formas de vivirlo" travel types ───────────────
// Single source of truth used by the Sanity tour schema (predefined labels),
// the "Próximas salidas" type filter, and the "Explorar" links on the
// "Seis formas de vivirlo" cards.

export interface TravelTypeOption {
  /** URL-safe id used in the ?tipo= query param and Explorar links. */
  value: string;
  /** Human label shown in the UI and stored on the tour (typeTag). */
  label: string;
}

export const TRAVEL_TYPES: TravelTypeOption[] = [
  { value: "grupo", label: "Viajes en grupo" },
  { value: "escapadas", label: "Escapadas especiales" },
  { value: "mujeres", label: "Viajes para mujeres" },
  { value: "solteros", label: "Viajes para solteros" },
  { value: "circuitos", label: "Circuitos internacionales" },
  { value: "medida", label: "Experiencias a medida" },
];

export const TRAVEL_TYPE_VALUES = TRAVEL_TYPES.map((t) => t.value);

/** Map a stored label (typeTag) -> filter value. */
export function travelTypeValueFromLabel(label?: string): string | undefined {
  if (!label) return undefined;
  const found = TRAVEL_TYPES.find(
    (t) => t.label.toLowerCase() === label.toLowerCase(),
  );
  return found?.value;
}

/** Map a TiposDeViaje card title -> filter value (best-effort by label match). */
export function travelTypeValueFromTitle(title: string): string | undefined {
  const norm = title.trim().toLowerCase();
  const exact = TRAVEL_TYPES.find((t) => t.label.toLowerCase() === norm);
  if (exact) return exact.value;
  // Loose keyword matching for CMS titles that differ slightly.
  if (norm.includes("grupo")) return "grupo";
  if (norm.includes("escapad")) return "escapadas";
  if (norm.includes("mujer")) return "mujeres";
  if (norm.includes("solter")) return "solteros";
  if (norm.includes("circuito")) return "circuitos";
  if (norm.includes("medida")) return "medida";
  return undefined;
}

// ─── Departure months ──────────────────────────────────────────────────────────
// Current month + the following N months, each labelled with its year. Used by
// both the front-end month filter and the Sanity schema dropdown so they always
// stay in sync.

export const MONTH_NAMES_LONG = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

export interface MonthOption {
  /** Stable YYYY-MM key. */
  value: string;
  label: string;
}

export function buildMonthOptions(
  count = 7,
  from: Date = new Date(),
): MonthOption[] {
  const opts: MonthOption[] = [];
  for (let i = 0; i < count; i++) {
    const d = new Date(from.getFullYear(), from.getMonth() + i, 1);
    const value = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    opts.push({
      value,
      label: `${MONTH_NAMES_LONG[d.getMonth()]} ${d.getFullYear()}`,
    });
  }
  return opts;
}

/** Stable YYYY-MM key for a date string (YYYY-MM-DD). */
export function monthKey(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

// ─── Regions ────────────────────────────────────────────────────────────────────

export const REGION_OPTIONS: { value: string; label: string }[] = [
  { value: "europa", label: "Europa" },
  { value: "america", label: "América" },
  { value: "asia", label: "Asia" },
  { value: "africa", label: "África" },
  { value: "oriente", label: "Oriente Medio" },
  { value: "oceania", label: "Oceanía" },
];

// ─── Duration ───────────────────────────────────────────────────────────────────

/**
 * Trip length in days, derived from the start/end dates (inclusive).
 * Returns undefined when there is no end date (e.g. "por confirmar").
 */
export function tourDuration(
  startDate?: string,
  endDate?: string,
): number | undefined {
  if (!startDate || !endDate) return undefined;
  const start = new Date(startDate + "T00:00:00");
  const end = new Date(endDate + "T00:00:00");
  const ms = end.getTime() - start.getTime();
  if (Number.isNaN(ms) || ms < 0) return undefined;
  return Math.round(ms / 86_400_000) + 1;
}
