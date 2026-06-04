import type { SiteSettings, TourDetail } from "@/types";
import { WhatsApp } from "@/components/icons";

interface WhatsAppFABProps {
  settings: Pick<SiteSettings, "whatsappNumber" | "whatsappMessage">;
  tour?: TourDetail;
}

export default function WhatsAppFAB({ settings, tour }: WhatsAppFABProps) {
  const url = `https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(
    tour
      ? `Hola, me interesa reservar el viaje a ${tour.title}${
          tour.startDate ? ` (${tour.startDate})` : ""
        }. ¿Me dais más información?`
      : settings.whatsappMessage,
  )}`;

  return (
    <a
      className="wa"
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
    >
      <span className="wa-label" aria-hidden="true">
        ¿Te ayudamos? Escríbenos
      </span>
      <span className="wa-btn">
        <WhatsApp />
      </span>
    </a>
  );
}
