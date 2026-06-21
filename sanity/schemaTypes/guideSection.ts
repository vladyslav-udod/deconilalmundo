import { defineArrayMember, defineField, defineType } from 'sanity'

/**
 * One editable section of the guide.
 * Core fields: label, title, description, google map link.
 * Extras that reproduce the design: anchor (deep-link / scroll-spy id),
 * navLabel (tab text in the sticky bar), titleHighlight (emphasised word),
 * and variant (background treatment).
 */
export const guideSectionType = defineType({
  name: 'guideSection',
  title: 'Sección',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Etiqueta',
      description: 'Rótulo encima del título (ej. "Playas").',
      type: 'string',
    }),
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'titleHighlight',
      title: 'Palabra destacada',
      description:
        'Una palabra/parte del título que se resalta (cursiva + acento). Debe aparecer literal en el título, ej. "Conil".',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Descripción',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'googleMapLink',
      title: 'Enlace de mapa (toda la categoría)',
      type: 'url',
      validation: (r) => r.uri({ scheme: ['http', 'https'] }),
    }),
    defineField({
      name: 'anchor',
      title: 'Ancla / ID',
      description: 'Usado para el enlace #ancla y la barra de categorías.',
      type: 'slug',
      options: { source: 'navLabel', maxLength: 40 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'navLabel',
      title: 'Texto en la barra de categorías',
      description: 'Etiqueta corta para la barra superior (ej. "Calas").',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'variant',
      title: 'Estilo de fondo',
      type: 'string',
      initialValue: 'plain',
      options: {
        list: [
          { title: 'Claro', value: 'plain' },
          { title: 'Alterno (papel)', value: 'alt' },
          { title: 'Oscuro (agenda)', value: 'dark' },
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'items',
      title: 'Fichas',
      type: 'array',
      of: [defineArrayMember({ type: 'guideItem' })],
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'label', variant: 'variant' },
    prepare({ title, subtitle, variant }) {
      return {
        title,
        subtitle: [subtitle, variant].filter(Boolean).join(' · '),
      }
    },
  },
})
