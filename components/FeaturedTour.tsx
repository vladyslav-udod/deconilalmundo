import { formatShortDate, getNextDeparture } from "@/app/utils/common";
import { Tour } from "@/types";

interface FeaturedTourProps {
  featuredTour?: Tour;
}

export default function FeaturedTour({ featuredTour }: FeaturedTourProps) {
  const { kicker, dateLabel, ctaLabel, emphasis, pulse, floating } = {
    kicker: "Viaje destacado",
    dateLabel: "Próxima salida ·",
    ctaLabel: "Ver viaje",
    emphasis: "marco",
    pulse: true,
    floating: true,
  };

  if (!featuredTour) {
    return null;
  }

  const { title: name, slug } = featuredTour;
  const href = `/viajes/${slug}`;
  const dateValue = featuredTour
    ? getNextDeparture(featuredTour.departures, Date.now())
    : null;

  const cls = ["ft", floating && "is-floating", pulse && "is-pulse"]
    .filter(Boolean)
    .join(" ");

  return (
    <a
      className={cls}
      data-emphasis={emphasis}
      href={href}
      aria-label={`${kicker}: ${name}. ${dateLabel} ${dateValue}`}
    >
      <span className="ft-body">
        <span className="ft-kicker">
          <span className="ft-dot" aria-hidden="true"></span>
          {kicker}
        </span>
        <span className="ft-name">{name}</span>
        {dateValue && (
          <span className="ft-when">
            {dateLabel} <b>{formatShortDate(dateValue)}</b>
          </span>
        )}
        <span className="ft-cta">
          {ctaLabel}
          <svg viewBox="0 0 24 24">
            <path d="M5 12h14M13 5l7 7-7 7" />
          </svg>
        </span>
      </span>
    </a>
  );
}
