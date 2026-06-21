import { defineField, defineType } from 'sanity'

/**
 * A single card inside a guide section.
 * Fields: label, title, description, image, google link, + optional phone.
 * `when` is an optional extra used by agenda-style (dark) sections.
 */
export const guideItemType = defineType({
  name: 'guideItem',
  title: 'Ficha / Item',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Etiqueta',
      description: 'Pequeño rótulo en mayúsculas (ej. "Playa urbana").',
      type: 'string',
    }),
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'description',
      title: 'Descripción',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'image',
      title: 'Imagen',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Texto alternativo (SEO / accesibilidad)',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'googleLink',
      title: 'Enlace de Google Maps',
      type: 'url',
      validation: (r) =>
        r.uri({ scheme: ['http', 'https'] }).custom((v) =>
          !v || v.includes('google.')
            ? true
            : 'Debería ser un enlace de Google Maps',
        ),
    }),
    defineField({
      name: 'phone',
      title: 'Teléfono (opcional)',
      type: 'string',
    }),
    defineField({
      name: 'when',
      title: 'Fecha / Agenda (opcional)',
      description:
        'Para fichas de agenda en secciones oscuras (ej. "Mayo", "Jun – Sep"). Si se rellena, sustituye al mapa/teléfono.',
      type: 'string',
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'label', media: 'image' },
  },
})
