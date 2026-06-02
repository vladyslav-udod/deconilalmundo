import type { Metadata } from 'next'
import LegalLayout from '@/components/LegalLayout'

export const metadata: Metadata = {
  title: 'Política de cookies',
  description:
    'Política de cookies de De Conil al Mundo: qué cookies usamos y cómo gestionarlas.',
  alternates: { canonical: '/cookies' },
}

export default function CookiesPage() {
  return (
    <LegalLayout eyebrow="Cookies" title="Política de cookies" updated="junio de 2026">
      <h2>1. ¿Qué son las cookies?</h2>
      <p>
        Una cookie es un pequeño archivo de texto que un sitio web almacena en tu navegador para recordar
        información sobre tu visita. Las cookies permiten que la web funcione correctamente y, con tu
        consentimiento, ayudan a entender cómo se utiliza para mejorarla.
      </p>

      <h2>2. Cookies que utilizamos</h2>
      <p>
        Actualmente este sitio solo emplea <strong>cookies técnicas</strong> imprescindibles para su
        funcionamiento, que están exentas de consentimiento. En el futuro podremos incorporar cookies de
        análisis (por ejemplo, Google Analytics) para medir de forma agregada el uso del sitio; en ese
        caso se solicitará tu consentimiento previo a través del banner de cookies y se actualizará esta
        tabla.
      </p>
      <ul>
        <li><strong>Técnicas / necesarias:</strong> permiten la navegación y el uso de las funciones básicas.</li>
        <li><strong>Analíticas (futuras, previa aceptación):</strong> medición estadística de visitas.</li>
      </ul>

      <h2>3. Gestión de cookies</h2>
      <p>
        Puedes permitir, bloquear o eliminar las cookies instaladas mediante la configuración de tu
        navegador. A continuación tienes los enlaces de ayuda de los navegadores más habituales:
      </p>
      <ul>
        <li>Google Chrome</li>
        <li>Mozilla Firefox</li>
        <li>Safari</li>
        <li>Microsoft Edge</li>
      </ul>

      <h2>4. Cambios en la política</h2>
      <p>
        Podemos actualizar esta política para adaptarla a novedades legislativas o técnicas. Te
        recomendamos revisarla periódicamente.
      </p>
    </LegalLayout>
  )
}
