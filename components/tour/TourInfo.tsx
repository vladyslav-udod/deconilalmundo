"use client";

import type { TourDetail } from "@/types";

const DEFAULT_NOTES = [
  "El cliente ha de tener un documento de identidad en vigor para poder viajar.",
  "El orden de las visitas podrá ser modificado sin alterar el contenido.",
];

function CardIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      style={{
        width: 15,
        height: 15,
        fill: "none",
        stroke: "currentColor",
        strokeWidth: 2,
      }}
    >
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <path d="M2 10h20" />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      style={{
        width: 15,
        height: 15,
        fill: "none",
        stroke: "currentColor",
        strokeWidth: 2,
      }}
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8h.01M11 12h1v4h1" />
    </svg>
  );
}

function PaymentRow({ when, amount }: { when: string; amount: string }) {
  return (
    <li
      style={{
        display: "grid",
        gridTemplateColumns: "1fr auto",
        alignItems: "center",
        gap: 16,
      }}
    >
      <span>{when}</span>
      <span
        style={{
          fontWeight: 700,
          fontSize: 18,
        }}
      >
        {amount}
      </span>
    </li>
  );
}

interface TourItineraryProps {
  tour: TourDetail;
}

export default function TourInfo({ tour }: TourItineraryProps) {
  if (!tour.deposit && !tour.importantInfo) {
    return null;
  }

  return (
    <section className="sec iti band-paper" id="info">
      <div className="tp-wrap">
        <div className="head">
          <div className="section-label">Antes de reservar</div>
          <h2 className="display">
            Información y <em>forma de pago</em>
          </h2>
        </div>

        <div
          className="incl-grid"
          style={
            tour.deposit && tour.importantInfo
              ? {}
              : { gridTemplateColumns: "1fr" }
          }
        >
          {tour.importantInfo && (
            <div className="incl-col no">
              <h3>
                <span className="ic">
                  <InfoIcon />
                </span>
                Información importante
              </h3>
              <ul>
                {tour.importantInfo?.map((note, i) => (
                  <li key={i}>
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    {note}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {tour.deposit && (
            <div className="incl-col yes">
              <h3>
                <span className="ic">
                  <CardIcon />
                </span>
                Forma de pago
              </h3>
              <ul>
                {tour.deposit?.map((p, i) => (
                  <PaymentRow
                    key={i}
                    when={p.paymentDescription}
                    amount={p.paymentAmount}
                  />
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
