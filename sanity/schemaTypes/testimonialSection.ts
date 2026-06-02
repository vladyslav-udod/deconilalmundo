import { defineField, defineType } from 'sanity'

export const testimonialSectionType = defineType({
  name: 'testimonialSection',
  title: 'Sección: Testimonios',
  type: 'document',
  fields: [
    defineField({
      name: 'sectionLabel',
      title: 'Etiqueta de sección',
      type: 'string',
      initialValue: 'La confianza de nuestros viajeros',
    }),
    defineField({
      name: 'heading',
      title: 'Título (parte normal)',
      type: 'string',
      initialValue: 'Vuelven año tras',
    }),
    defineField({
      name: 'headingEmphasis',
      title: 'Título (parte en cursiva/acento)',
      type: 'string',
      initialValue: 'año',
    }),
    defineField({
      name: 'description',
      title: 'Descripción',
      type: 'text',
      rows: 2,
      initialValue:
        'Muchas personas vuelven a viajar con nosotros recomendándonos por la cercanía, la profesionalidad y la pasión que ponemos en cada viaje.',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Sección Testimonios' }
    },
  },
})
