import { defineField, defineType } from 'sanity'

export const travelTypeSectionType = defineType({
  name: 'travelTypeSection',
  title: 'Sección: Seis formas de vivirlo',
  type: 'document',
  fields: [
    defineField({
      name: 'sectionLabel',
      title: 'Etiqueta de sección',
      type: 'string',
      initialValue: 'Qué organizamos',
    }),
    defineField({
      name: 'heading',
      title: 'Título (parte normal)',
      type: 'string',
      initialValue: 'Seis formas de',
    }),
    defineField({
      name: 'headingEmphasis',
      title: 'Título (parte en cursiva/acento)',
      type: 'string',
      initialValue: 'vivirlo',
    }),
    defineField({
      name: 'description',
      title: 'Descripción',
      type: 'text',
      rows: 2,
      initialValue:
        'Viajes pensados para cada momento de la vida. Elige el tuyo y déjanos el resto: nosotros nos encargamos de todo para que tú solo te ocupes de disfrutar.',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Sección Tipos de viaje' }
    },
  },
})
