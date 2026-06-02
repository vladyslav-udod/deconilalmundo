import type { Metadata } from 'next'
import LegalLayout from '@/components/LegalLayout'

export const metadata: Metadata = {
  title: 'Aviso legal',
  description:
    'Aviso legal de De Conil al Mundo — agencia de viajes acompañados en Conil de la Frontera, Cádiz (Halcón Viajes Conil).',
  alternates: { canonical: '/aviso-legal' },
}

export default function AvisoLegalPage() {
  return (
    <LegalLayout eyebrow="Información legal" title="Aviso legal" updated="junio de 2026">
      <h2>1. Datos identificativos</h2>
      <p>
        En cumplimiento del artículo 10 de la Ley 34/2002, de Servicios de la Sociedad de la
        Información y de Comercio Electrónico (LSSI-CE), se informa de que este sitio web es titularidad
        de <strong>De Conil al Mundo</strong> (en adelante, «la Agencia»), marca operada junto a Halcón
        Viajes en Conil de la Frontera (Cádiz).
      </p>
      <ul>
        <li><strong>Denominación:</strong> De Conil al Mundo — Halcón Viajes Conil</li>
        <li><strong>Domicilio:</strong> Conil de la Frontera, Cádiz (España)</li>
        <li><strong>Correo electrónico:</strong> hola@deconilalmundo.es</li>
        <li><strong>Teléfono:</strong> +34 956 00 00 00</li>
      </ul>

      <h2>2. Objeto</h2>
      <p>
        El presente aviso regula el uso del sitio web a través del cual la Agencia ofrece información
        sobre sus viajes organizados, circuitos y servicios de intermediación turística. La navegación
        atribuye la condición de usuario e implica la aceptación plena de las presentes condiciones.
      </p>

      <h2>3. Condiciones de uso</h2>
      <p>
        El usuario se compromete a hacer un uso adecuado de los contenidos y servicios y a no emplearlos
        para incurrir en actividades ilícitas o lesivas de derechos de terceros. Los precios, fechas y
        disponibilidad de los viajes mostrados son orientativos y quedan sujetos a confirmación en el
        momento de la reserva.
      </p>

      <h2>4. Propiedad intelectual e industrial</h2>
      <p>
        Todos los contenidos del sitio (textos, fotografías, logotipos, diseño y código) son titularidad
        de la Agencia o de terceros que han autorizado su uso, y están protegidos por la normativa de
        propiedad intelectual e industrial. Queda prohibida su reproducción total o parcial sin
        autorización expresa.
      </p>

      <h2>5. Responsabilidad</h2>
      <p>
        La Agencia no se responsabiliza de los daños derivados del uso indebido del sitio ni de la
        indisponibilidad temporal del mismo por causas técnicas. Los enlaces a sitios de terceros se
        ofrecen únicamente a título informativo.
      </p>

      <h2>6. Legislación aplicable</h2>
      <p>
        Las presentes condiciones se rigen por la legislación española. Para cualquier controversia, las
        partes se someten a los juzgados y tribunales de la provincia de Cádiz, salvo que la normativa de
        consumo disponga otro fuero.
      </p>
    </LegalLayout>
  )
}
