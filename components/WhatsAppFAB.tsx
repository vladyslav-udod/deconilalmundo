import type { SiteSettings } from '@/types'
import { WhatsApp } from '@/components/icons'

interface WhatsAppFABProps {
  settings: Pick<SiteSettings, 'whatsappNumber' | 'whatsappMessage'>
}

export default function WhatsAppFAB({ settings }: WhatsAppFABProps) {
  const url = `https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(settings.whatsappMessage)}`

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
  )
}
