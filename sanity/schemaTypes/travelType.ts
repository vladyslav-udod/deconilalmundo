import { defineField, defineType } from 'sanity'

export const travelTypeType = defineType({
  name: 'travelType',
  title: 'Tipo de viaje',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Nombre',
      type: 'string',
      description: 'Ej: Viajes en grupo, Escapadas especiales',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'description',
      title: 'Descripción corta',
      type: 'text',
      rows: 3,
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'image',
      title: 'Imagen de fondo',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Texto alternativo',
          type: 'string',
        }),
      ],
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'ctaText',
      title: 'Texto del enlace',
      type: 'string',
      initialValue: 'Explorar',
    }),
    defineField({
      name: 'ctaHref',
      title: 'Enlace (opcional)',
      type: 'url',
    }),
    defineField({
      name: 'order',
      title: 'Orden (1–6)',
      type: 'number',
      validation: (r) => r.required().min(1).max(6),
    }),
  ],
  preview: {
    select: { title: 'title', order: 'order', media: 'image' },
    prepare({ title, order, media }) {
      return { title: `${order}. ${title}`, media }
    },
  },
  orderings: [{ title: 'Orden', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
})
