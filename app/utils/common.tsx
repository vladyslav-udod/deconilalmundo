import { Departure, TourDetail } from "@/types";

export const MONTHS_ES = [
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

/** Format a departure as a "03 — 18 ago / 2026" range using the tour duration. */
export function formatRange(
  dateStr: string,
  durationDays?: number,
): { range: string; year: string } {
  const start = new Date(dateStr + "T00:00:00");
  const sd = start.getDate();
  const sm = MONTHS_ES[start.getMonth()];
  const year = String(start.getFullYear());

  // Without a known duration, show just the start day.
  if (!durationDays) return { range: `${sd} ${sm}`, year };

  const end = new Date(start);
  end.setDate(end.getDate() + Math.max(0, durationDays - 1));
  const ed = end.getDate();
  const em = MONTHS_ES[end.getMonth()];
  const range = sm === em ? `${sd} - ${ed} ${sm}` : `${sd} ${sm} - ${ed} ${em}`;
  return { range: durationDays === 1 ? `${sd} ${sm}` : range, year };
}

export const getNextDeparture = (
  departures?: Departure[],
  now = Date.now(),
): string | null => {
  return departures?.length
    ? (departures
        .filter((d) => new Date(d.date).getTime() > now)
        .sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
        )[0]?.date ?? null)
    : null;
};

export function formatShortDate(dateStr?: string): string {
  if (!dateStr) return "Por confirmar";
  const d = new Date(dateStr + "T00:00:00");
  return `${String(d.getDate()).padStart(2, "0")} ${MONTHS_ES[d.getMonth()]} ${d.getFullYear()}`;
}
