import { Instagram, Facebook } from '@/components/icons'

interface SocialFollowProps {
  instagramUrl?: string
  facebookUrl?: string
}

const DEFAULT_INSTAGRAM = 'https://www.instagram.com/deconilalmundo'
const DEFAULT_FACEBOOK = 'https://www.facebook.com/deconilalmundo'

/** Handle shown on the card, derived from the profile URL. */
function handleFrom(url: string): string {
  const m = url.replace(/\/+$/, '').match(/([^/]+)$/)
  return m ? `@${m[1]}` : ''
}

/**
 * "Síguenos en redes" — links to the agency's social profiles (Instagram +
 * Facebook). Replaces the previous Instagram photo grid.
 */
export default function SocialFollow({
  instagramUrl = DEFAULT_INSTAGRAM,
  facebookUrl = DEFAULT_FACEBOOK,
}: SocialFollowProps) {
  const networks = [
    {
      key: 'instagram',
      label: 'Instagram',
      handle: handleFrom(instagramUrl || DEFAULT_INSTAGRAM),
      url: instagramUrl || DEFAULT_INSTAGRAM,
      Icon: Instagram,
    },
    {
      key: 'facebook',
      label: 'Facebook',
      handle: handleFrom(facebookUrl || DEFAULT_FACEBOOK),
      url: facebookUrl || DEFAULT_FACEBOOK,
      Icon: Facebook,
    },
  ]

  return (
    <section className="social" id="instagram" aria-labelledby="social-heading">
      <div className="wrap">
        <div className="social-head">
          <p className="section-label" style={{ justifyContent: 'center' }}>
            Síguenos en redes
          </p>
          <h2 className="display" id="social-heading">
            Viaja con nosotros también <em>online</em>.
          </h2>
          <p className="social-sub">
            Fotos de nuestros grupos, próximas salidas y la vida de la agencia. Síguenos y no te
            pierdas nada.
          </p>
        </div>

        <div className="social-cards">
          {networks.map(({ key, label, handle, url, Icon }) => (
            <a
              key={key}
              className={`social-card social-card--${key}`}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="social-icon" aria-hidden="true">
                <Icon />
              </span>
              <span className="social-meta">
                <span className="social-name">{label}</span>
                {handle && <span className="social-handle">{handle}</span>}
              </span>
              <span className="social-cta" aria-hidden="true">Seguir</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
