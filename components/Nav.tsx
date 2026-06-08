"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import type { SiteSettings } from "@/types";

export interface TourBarInfo {
  title: string;
  meta: string;
  price: number;
  /** Where "Reservar" goes (e.g. a WhatsApp deep link). Defaults to #reservar. */
  reserveUrl?: string;
}

interface NavProps {
  settings: Pick<SiteSettings, "siteName" | "tagline">;
  /** Force the solid (light) nav style — used on pages without a dark hero. */
  forceSolid?: boolean;
  /** When provided, the bar reveals tour title + price + Reservar on scroll. */
  tourBar?: TourBarInfo;
}

const LINKS = [
  { id: "tours", label: "Destinos" },
  { id: "tipos", label: "Tipos de viaje" },
  { id: "nosotros", label: "Nosotros" },
  // { id: "testimonios", label: "Opiniones" },
  { id: "contacts", label: "Contactos", existOnAllPages: true },
];

export default function Nav({
  settings,
  forceSolid = false,
  tourBar,
}: NavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const onHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const solid = forceSolid || scrolled;
  // Reveal the tour booking strip once the user scrolls past the hero.
  const showBooking = Boolean(tourBar) && scrolled;

  const handleClick = (id: string) => (e: React.MouseEvent) => {
    if (!onHome) return;
    e.preventDefault();
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const closeAnd = (fn?: () => void) => () => {
    setMenuOpen(false);
    fn?.();
  };

  return (
    <>
      <nav
        className={`nav${solid ? " is-solid" : ""}${showBooking ? " show-booking" : ""}`}
        aria-label="Navegación principal"
      >
        <a className="brand" href="/" aria-label={settings.siteName}>
          <span className="mark" aria-hidden="true" />
          <span className="wordmark">
            <b>{settings.siteName}</b>
            <small>{settings.tagline}</small>
          </span>
        </a>

        <div className="nav-center">
          <ul className="nav-links" role="list">
            {LINKS.map(({ id, label, existOnAllPages }) => (
              <li key={id}>
                <a
                  href={existOnAllPages && !onHome ? `#${id}` : `/#${id}`}
                  onClick={handleClick(id)}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          {tourBar && (
            <div className="nav-tour-tag" aria-hidden={!showBooking}>
              <b>{tourBar.title}</b>
              <span className="dot" />
              <span>{tourBar.meta}</span>
            </div>
          )}
        </div>

        <div className="nav-right">
          {tourBar && (
            <div className="nav-booking" inert={!showBooking}>
              <div className="pr">
                <em>Desde</em>
                <strong>{tourBar.price.toLocaleString("es-ES")}€</strong>
              </div>
              <a
                href={tourBar.reserveUrl ?? "#reservar"}
                {...(tourBar.reserveUrl
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="btn-primary nav-reservar"
              >
                <span>Reservar</span>
              </a>
            </div>
          )}

          <button
            type="button"
            className={`nav-burger${menuOpen ? " is-open" : ""}`}
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`nav-drawer${menuOpen ? " is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menú"
        inert={!menuOpen}
      >
        <ul>
          {LINKS.map(({ id, label, existOnAllPages }) => (
            <li key={id}>
              <a
                href={existOnAllPages && !onHome ? `#${id}` : `/#${id}`}
                onClick={closeAnd(
                  onHome
                    ? () =>
                        document
                          .getElementById(id)
                          ?.scrollIntoView({ behavior: "smooth" })
                    : undefined,
                )}
              >
                {label}
              </a>
            </li>
          ))}
          {tourBar && (
            <li>
              <a
                href={tourBar.reserveUrl ?? "#reservar"}
                {...(tourBar.reserveUrl
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                onClick={closeAnd()}
                className="drawer-cta"
              >
                Reservar — desde {tourBar.price.toLocaleString("es-ES")}€
              </a>
            </li>
          )}
        </ul>
      </div>
      {menuOpen && (
        <div
          className="nav-scrim"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}
