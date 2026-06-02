import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import WhatsAppFAB from '@/components/WhatsAppFAB'
import { getSiteSettings } from '@/lib/sanity/queries'

interface LegalLayoutProps {
  eyebrow: string
  title: string
  updated?: string
  children: React.ReactNode
}

/** Shared chrome (nav + footer + WhatsApp) and typographic shell for the
 *  legal pages: Aviso legal, Política de privacidad, Cookies. */
export default async function LegalLayout({ eyebrow, title, updated, children }: LegalLayoutProps) {
  const settings = await getSiteSettings()

  return (
    <>
      <Nav settings={settings} forceSolid />
      <main id="main" className="legal-page">
        <div className="legal-wrap">
          <p className="legal-eyebrow">{eyebrow}</p>
          <h1 className="legal-title">{title}</h1>
          {updated && <p className="legal-updated">Última actualización: {updated}</p>}
          <div className="legal-body">{children}</div>
        </div>
      </main>
      <Footer settings={settings} />
      <WhatsAppFAB settings={settings} />
    </>
  )
}
