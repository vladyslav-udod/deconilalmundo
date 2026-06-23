import type { SiteSettings } from "@/types";

interface FooterProps {
  settings: SiteSettings;
}

export default function Footer({ settings }: FooterProps) {
  const socialLinks = [
    { href: settings.instagram, label: "Instagram" },
    { href: settings.facebook, label: "Facebook" },
    { href: settings.youtube, label: "YouTube" },
    { href: settings.newsletter, label: "Newsletter" },
  ].filter((l) => l.href);

  return (
    <footer>
      <div className="footer-grid">
        {/* Brand block */}
        <div className="footer-brand">
          <div className="logo">
            <span className="mark" aria-hidden="true" />
            {settings.siteName}
          </div>
          <p>
            Agencia de viajes acompañados. Operamos junto a {settings.tagline}{" "}
            desde 2004.
          </p>
        </div>

        {/* Nav */}
        <nav aria-label="Navegación del pie">
          <h4>Explorar</h4>
          <ul>
            <li>
              <a href="/#tours">Próximos destinos</a>
            </li>
            <li>
              <a href="/#tipos">Tipos de viaje</a>
            </li>
            <li>
              <a href="/#nosotros">Quiénes somos</a>
            </li>
            <li>
              <a href="/#testimonios">Opiniones</a>
            </li>
          </ul>
        </nav>

        {/* Contact */}
        <address style={{ fontStyle: "normal" }}>
          <h4>Contacto</h4>
          <ul>
            <li>{settings.address}</li>
            {settings.phone && (
              <li>
                <a href={`tel:${settings.phone.replace(/\s/g, "")}`}>
                  {settings.phone}
                </a>
              </li>
            )}
            {settings.email && (
              <li>
                <a href={`mailto:${settings.email}`}>{settings.email}</a>
              </li>
            )}
            {settings.openingHours && <li>{settings.openingHours}</li>}
          </ul>
        </address>

        {/* Social */}
        {socialLinks.length > 0 && (
          <nav aria-label="Redes sociales">
            <h4>Síguenos</h4>
            <ul>
              {socialLinks.map(({ href, label }) => (
                <li key={label}>
                  <a href={href!} target="_blank" rel="noopener noreferrer">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>

      <div className="footer-legal">
        <span>{settings.legalText}</span>
        <span>
          <a href="/aviso-legal">Aviso legal</a>
          {" · "}
          <a href="/privacidad">Política de privacidad</a>
          {" · "}
          <a href="/cookies">Cookies</a>
        </span>
      </div>
    </footer>
  );
}
