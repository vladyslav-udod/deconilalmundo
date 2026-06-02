import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'De Conil al Mundo',
    short_name: 'De Conil al Mundo',
    description:
      'Agencia de viajes acompañados en Conil de la Frontera, Cádiz. Viajes en grupo, circuitos internacionales, viajes para mujeres y solteros.',
    start_url: '/',
    display: 'standalone',
    background_color: '#e9eced',
    theme_color: '#2b7a8a',
    lang: 'es-ES',
    icons: [
      { src: '/icon.png', sizes: '512x512', type: 'image/png' },
      { src: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  }
}
