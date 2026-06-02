import { defineField, defineType } from 'sanity'

export const introSectionType = defineType({
  name: 'introSection',
  title: 'Sección: Nuestra forma de viajar',
  type: 'document',
  fields: [
    defineField({
      name: 'sectionLabel',
      title: 'Etiqueta de sección',
      type: 'string',
      initialValue: 'Nuestra forma de viajar',
    }),
    defineField({
      name: 'heading',
      title: 'Título (parte normal)',
      type: 'string',
      initialValue: 'Especialistas en viajar',
    }),
    defineField({
      name: 'headingEmphasis',
      title: 'Título (parte en cursiva/acento)',
      type: 'string',
      initialValue: 'acompañados',
    }),
    defineField({
      name: 'leadQuote',
      title: 'Cita destacada',
      type: 'string',
      initialValue:
        '«Creemos que la mejor manera de recomendar un destino es haberlo vivido antes.»',
    }),
    defineField({
      name: 'signature',
      title: 'Firma',
      type: 'string',
      initialValue: '— Equipo de Halcón Viajes Conil',
    }),
    defineField({
      name: 'body',
      title: 'Párrafos del cuerpo',
      type: 'array',
      of: [{ type: 'block' }],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Nuestra forma de viajar' }
    },
  },
})
