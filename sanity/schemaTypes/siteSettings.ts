import { defineField, defineType } from 'sanity'

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Ajustes del sitio',
  type: 'document',
  // Singleton — only one document of this type
  fields: [
    defineField({
      name: 'siteName',
      title: 'Nombre del sitio',
      type: 'string',
      initialValue: 'De Conil al Mundo',
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline bajo el logo',
      type: 'string',
      initialValue: 'Halcón Viajes',
    }),
    defineField({
      name: 'whatsappNumber',
      title: 'Número de WhatsApp',
      type: 'string',
      description: 'Solo dígitos, con prefijo. Ej: 34956000000',
      initialValue: '34600000000',
    }),
    defineField({
      name: 'whatsappMessage',
      title: 'Mensaje inicial de WhatsApp',
      type: 'string',
      initialValue: 'Hola, me interesa un viaje',
    }),
    defineField({
      name: 'phone',
      title: 'Teléfono de contacto',
      type: 'string',
      initialValue: '+34 956 00 00 00',
    }),
    defineField({
      name: 'email',
      title: 'Email de contacto',
      type: 'string',
      initialValue: 'hola@deconilalmundo.es',
    }),
    defineField({
      name: 'address',
      title: 'Dirección',
      type: 'string',
      initialValue: 'Conil de la Frontera, Cádiz',
    }),
    defineField({
      name: 'openingHours',
      title: 'Horario de atención',
      type: 'string',
      initialValue: 'L–V · 10:00 a 14:00 / 17:00 a 20:30',
    }),
    defineField({
      name: 'instagram',
      title: 'Instagram URL',
      type: 'url',
    }),
    defineField({
      name: 'facebook',
      title: 'Facebook URL',
      type: 'url',
    }),
    defineField({
      name: 'youtube',
      title: 'YouTube URL',
      type: 'url',
    }),
    defineField({
      name: 'newsletter',
      title: 'Newsletter URL',
      type: 'url',
    }),
    defineField({
      name: 'legalText',
      title: 'Texto legal (pie de página)',
      type: 'string',
      initialValue: '© 2026 · De Conil al Mundo · Halcón Viajes Conil',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Ajustes globales del sitio' }
    },
  },
})
