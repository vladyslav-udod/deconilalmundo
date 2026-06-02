import type { Metadata } from 'next'
import LegalLayout from '@/components/LegalLayout'

export const metadata: Metadata = {
  title: 'Política de privacidad',
  description:
    'Política de privacidad de De Conil al Mundo: cómo tratamos tus datos personales conforme al RGPD y la LOPDGDD.',
  alternates: { canonical: '/privacidad' },
}

export default function PrivacidadPage() {
  return (
    <LegalLayout eyebrow="Tus datos" title="Política de privacidad" updated="junio de 2026">
      <h2>1. Responsable del tratamiento</h2>
      <p>
        El responsable del tratamiento de los datos recabados a través de este sitio es
        <strong> De Conil al Mundo</strong> (Halcón Viajes Conil), con domicilio en Conil de la Frontera
        (Cádiz) y correo electrónico de contacto hola@deconilalmundo.es.
      </p>

      <h2>2. Finalidad del tratamiento</h2>
      <p>Tratamos los datos que nos facilitas con las siguientes finalidades:</p>
      <ul>
        <li>Atender tus solicitudes de información y presupuestos de viaje.</li>
        <li>Gestionar la reserva y contratación de los servicios turísticos solicitados.</li>
        <li>Enviarte comunicaciones sobre próximas salidas, siempre que lo autorices.</li>
      </ul>

      <h2>3. Legitimación</h2>
      <p>
        La base legal es el consentimiento del interesado, la ejecución de un contrato de servicios de
        viaje y el cumplimiento de obligaciones legales aplicables a la actividad de agencia de viajes.
      </p>

      <h2>4. Conservación de los datos</h2>
      <p>
        Conservaremos tus datos mientras exista una relación comercial o durante los años necesarios para
        cumplir con las obligaciones legales. Cuando ya no sean necesarios se suprimirán con medidas de
        seguridad adecuadas.
      </p>

      <h2>5. Destinatarios</h2>
      <p>
        Tus datos podrán comunicarse a los proveedores necesarios para prestar el servicio contratado
        (mayoristas, aerolíneas, hoteles, aseguradoras) y a las administraciones públicas cuando exista
        obligación legal. No se realizan cesiones distintas de las indicadas.
      </p>

      <h2>6. Tus derechos</h2>
      <p>
        Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición, limitación y
        portabilidad escribiendo a hola@deconilalmundo.es. Asimismo, tienes derecho a presentar una
        reclamación ante la Agencia Española de Protección de Datos (www.aepd.es).
      </p>
    </LegalLayout>
  )
}
