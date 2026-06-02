'use client'

import { useEffect, useState } from 'react'
import { SHOW_COOKIE_BANNER } from '@/lib/config'

const STORAGE_KEY = 'dcm-cookie-consent'

/**
 * Cookie consent banner. Rendered only when SHOW_COOKIE_BANNER is enabled
 * (flip the flag in lib/config.ts when Google Analytics is introduced).
 * The choice is persisted in localStorage so it isn't shown again.
 */
export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!SHOW_COOKIE_BANNER) return
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true)
    } catch {
      setVisible(true)
    }
  }, [])

  if (!SHOW_COOKIE_BANNER || !visible) return null

  const decide = (value: 'accepted' | 'rejected') => {
    try {
      localStorage.setItem(STORAGE_KEY, value)
    } catch {
      /* ignore storage errors */
    }
    setVisible(false)
    // When GA is wired in, initialise it here if value === 'accepted'.
  }

  return (
    <div className="cookie-banner" role="dialog" aria-live="polite" aria-label="Aviso de cookies">
      <div className="cookie-inner">
        <p className="cookie-text">
          Usamos cookies técnicas necesarias y, con tu permiso, cookies de análisis para mejorar el
          sitio. Consulta nuestra <a href="/cookies">política de cookies</a>.
        </p>
        <div className="cookie-actions">
          <button type="button" className="cookie-btn cookie-reject" onClick={() => decide('rejected')}>
            Rechazar
          </button>
          <button type="button" className="cookie-btn cookie-accept" onClick={() => decide('accepted')}>
            Aceptar
          </button>
        </div>
      </div>
    </div>
  )
}
