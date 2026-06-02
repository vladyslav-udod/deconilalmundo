import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from '@/components/icons'

export const metadata: Metadata = {
  title: 'Página no encontrada',
  description: 'La página que buscas no existe o se ha movido.',
  robots: { index: false, follow: false },
}

const BG = 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=2400&q=80'

export default function NotFound() {
  return (
    <main className="notfound">
      <div className="bg" aria-hidden="true" style={{ backgroundImage: `url('${BG}')` }} />
      <div className="nf-inner">
        <p className="nf-code">404</p>
        <h1 className="nf-title">
          Este destino <em>no aparece en el mapa</em>.
        </h1>
        <p className="nf-sub">
          La página que buscas no existe o se ha movido. Pero el mundo es muy grande:
          volvamos al inicio y elijamos tu próximo viaje.
        </p>
        <div className="nf-actions">
          <Link href="/" className="btn-primary">
            <span>Volver al inicio</span>
            <ArrowRight />
          </Link>
          <Link href="/#tours" className="btn-ghost-dark">
            Ver próximas salidas
          </Link>
        </div>
      </div>
    </main>
  )
}
