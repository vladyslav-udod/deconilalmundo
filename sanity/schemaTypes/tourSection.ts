import { defineField, defineType } from 'sanity'

export const tourSectionType = defineType({
  name: 'tourSection',
  title: 'Sección: Próximas salidas',
  type: 'document',
  fields: [
    defineField({
      name: 'sectionLabel',
      title: 'Etiqueta de sección',
      type: 'string',
      initialValue: 'Próximas salidas',
    }),
    defineField({
      name: 'heading',
      title: 'Título (parte normal)',
      type: 'string',
      initialValue: 'Destinos para los próximos',
    }),
    defineField({
      name: 'headingEmphasis',
      title: 'Título (parte en cursiva/acento)',
      type: 'string',
      initialValue: 'meses',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Sección Próximas salidas' }
    },
  },
})
