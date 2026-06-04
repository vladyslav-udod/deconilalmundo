"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import type { TourDetail } from "@/types";
import { PortableText, PortableTextBlock } from "next-sanity";

// Placeholder images per region for fallback itinerary thumbnails
const ITINERARY_PLACEHOLDERS = [
  "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=700&q=80",
  "https://images.unsplash.com/photo-1480796927426-f609979314bd?w=700&q=80",
  "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=700&q=80",
  "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=700&q=80",
  "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=700&q=80",
  "https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=700&q=80",
];

interface TourItineraryProps {
  tour: TourDetail;
}

/** Pull the leading number out of a day label for the big numeral. */
function dayNumber(label: string, fallback: number): string {
  const m = label.match(/\d+/);
  return m ? m[0].padStart(2, "0") : String(fallback + 1).padStart(2, "0");
}

/** Small inline icon shown next to each itinerary tag. */
function TagIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0 1 18 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

export default function TourItinerary({ tour }: TourItineraryProps) {
  const days = tour.itinerary ?? [];
  const [openIndex, setOpenIndex] = useState(0);

  if (days.length === 0) {
    return (
      <section className="sec iti band-paper" id="itinerario">
        <div className="tp-wrap">
          <div className="head">
            <div className="section-label">Día a día</div>
            <h2 className="display">
              El itinerario <em>completo</em>
            </h2>
          </div>
          <p style={{ color: "var(--muted)", fontStyle: "italic" }}>
            El itinerario detallado se publicará próximamente. Contacta con
            nosotros para más información.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="sec iti band-paper" id="itinerario">
      <div className="tp-wrap">
        <div className="head">
          <div className="section-label">Día a día</div>
          <h2 className="display">
            El itinerario <em>completo</em>
          </h2>
          <p className="lede">
            Despliega cada jornada para ver el plan detallado, los lugares que
            visitamos y una imagen de lo que te espera.
          </p>
        </div>

        <div className="iti-list">
          {days.map((day, i) => {
            const isOpen = openIndex === i;
            const img = day.imageUrl;
            const tags = day.tags ?? [];

            const [isTwoColBody, setIsTwoColBody] = useState(false);

            useEffect(() => {
              const handleResize = () => {
                setIsTwoColBody(!!(img && window.innerWidth >= 1000));
              };

              handleResize();
              window.addEventListener("resize", handleResize);
              return () => window.removeEventListener("resize", handleResize);
            }, [img]);

            return (
              <div key={day._key} className={`day${isOpen ? " open" : ""}`}>
                <button
                  className="row"
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? -1 : i)}
                >
                  <span className="num">
                    <b>Día</b>
                    <span>{dayNumber(day.dayLabel, i)}</span>
                  </span>
                  {img && (
                    <span className="thumb">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={img} alt="" loading="lazy" />
                    </span>
                  )}
                  <span className="ttl">
                    <h3>{day.title}</h3>
                    {tags.length > 0 && (
                      <span className="sub">
                        {tags.map((t, j) => (
                          <span className="tag" key={j}>
                            <TagIcon />
                            {t}
                          </span>
                        ))}
                      </span>
                    )}
                  </span>
                  <span className="chev">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </span>
                </button>
                <div className="panel">
                  <div className="inner">
                    <div
                      className="body"
                      style={{
                        gridTemplateColumns: isTwoColBody
                          ? "1fr 1.05fr"
                          : "1fr",
                      }}
                    >
                      {day.body && (
                        <div className="portableText-wrap">
                          <PortableText
                            value={day.body as PortableTextBlock[]}
                          />
                        </div>
                      )}

                      {img && (
                        <div className="ph">
                          <Image
                            src={img}
                            alt={day.image?.alt ?? day.title}
                            fill
                            sizes="(max-width:880px) 100vw, 40vw"
                            loading="lazy"
                            style={{ objectFit: "cover" }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
