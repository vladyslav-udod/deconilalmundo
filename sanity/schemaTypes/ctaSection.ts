import { defineField, defineType } from 'sanity'

export const ctaSectionType = defineType({
  name: 'ctaSection',
  title: 'Sección: CTA final',
  type: 'document',
  fields: [
    defineField({
      name: 'sectionLabel',
      title: 'Etiqueta de sección',
      type: 'string',
      initialValue: 'Atrévete',
    }),
    defineField({
      name: 'quote',
      title: 'Cita (parte normal)',
      type: 'string',
      initialValue:
        '«Porque el mundo es demasiado bonito para recorrerlo solo.',
    }),
    defineField({
      name: 'quoteEmphasis',
      title: 'Cita (parte en cursiva)',
      type: 'string',
      initialValue: 'Viajemos juntos.»',
    }),
    defineField({
      name: 'subtext',
      title: 'Subtexto',
      type: 'text',
      rows: 2,
      initialValue:
        'Confía en nosotros y ven a recorrer el mundo acompañado por profesionales apasionados por los viajes.',
    }),
    defineField({
      name: 'ctaText',
      title: 'Texto del botón',
      type: 'string',
      initialValue: 'Ver próximos viajes',
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Imagen de fondo',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', title: 'Texto alternativo', type: 'string' }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'CTA Final' }
    },
  },
})
