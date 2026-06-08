import { Instagram, Facebook } from "@/components/icons";
import { SiteSettings } from "@/types";

interface SocialFollowProps {
  settings: SiteSettings;
}

/* --- inline icons --- */
const PhoneIcon = () => (
  <svg viewBox="0 0 24 24">
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.6a2 2 0 0 1-.5 2.1L8 9.6a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.8.3 1.7.5 2.6.6a2 2 0 0 1 1.7 2.1z" />
  </svg>
);
const MailIcon = () => (
  <svg viewBox="0 0 24 24">
    <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
    <path d="M3 6l9 6 9-6" />
  </svg>
);
const PinIcon = () => (
  <svg viewBox="0 0 24 24">
    <path d="M21 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);
const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24">
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.9c0 2.1.55 4.06 1.6 5.83L2 22l4.4-1.7a9.9 9.9 0 0 0 5.64 1.75h.01c5.46 0 9.9-4.45 9.9-9.9C21.95 6.45 17.5 2 12.04 2zm5.8 14.1c-.24.69-1.4 1.32-1.94 1.4-.5.07-1.13.1-1.82-.11-.42-.13-.96-.31-1.65-.61-2.9-1.25-4.8-4.17-4.95-4.36-.14-.19-1.18-1.57-1.18-3 0-1.42.75-2.12 1.01-2.41.27-.29.58-.36.78-.36.19 0 .39 0 .56.01.18.01.42-.07.66.5.24.59.83 2.02.9 2.16.07.15.12.32.02.51-.1.19-.15.31-.29.48-.15.17-.31.39-.44.52-.15.14-.3.3-.13.59.17.29.76 1.25 1.63 2.02 1.12.99 2.06 1.31 2.35 1.46.29.15.46.12.63-.07.17-.19.73-.85.92-1.14.19-.29.39-.24.66-.15.27.1 1.7.81 1.99.96.29.15.48.21.55.34.07.12.07.71-.17 1.4z" />
  </svg>
);

const ICONS = { phone: PhoneIcon, mail: MailIcon, pin: PinIcon } as const;

export default function Contacts({ settings }: SocialFollowProps) {
  const DEFAULT_CHANNELS = [
    {
      icon: "phone",
      label: "Teléfono",
      value: settings.phone,
      href: `tel:${settings.phone.replace(/\s/g, "")}`,
    },
    {
      icon: "mail",
      label: "Email",
      value: settings.email,
      href: `mailto:${settings.email}`,
    },
    {
      icon: "pin",
      label: "Oficina",
      value: settings.address,
      href: `https://maps.google.com/?q=${encodeURIComponent(settings.address)}`,
      external: true,
    },
  ];

  const whatsappHref = `https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(
    settings.whatsappMessage ||
      "Hola, me gustaría recibir más información sobre vuestros viajes acompañados.",
  )}`;

  return (
    <section
      className="contacts"
      id="contacts"
      aria-labelledby="contacts-heading"
    >
      <div className="wrap">
        <div className="head">
          <div>
            <p className="section-label">Hablemos</p>
            <h2 className="display" id="contacts-heading">
              Estamos <em>aquí</em>.
            </h2>
          </div>
        </div>

        <div className="cx-grid">
          {DEFAULT_CHANNELS.map((c, i) => {
            const Icon = ICONS[c.icon as keyof typeof ICONS] || PhoneIcon;
            const ext = c.external ? { target: "_blank", rel: "noopener" } : {};
            return (
              <a className="cx-card" key={i} href={c.href} {...ext}>
                <span className="cx-ic" aria-hidden="true">
                  <Icon />
                </span>
                <span className="cx-txt">
                  <span className="cx-lab">{c.label}</span>
                  <span className="cx-val">{c.value}</span>
                </span>
              </a>
            );
          })}
        </div>

        <div className="cx-bar">
          <span className="cx-when">{settings.openingHours}</span>
          <a
            className="cx-wa"
            href={whatsappHref}
            target="_blank"
            rel="noopener"
          >
            <WhatsAppIcon />
            Escríbenos por WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
