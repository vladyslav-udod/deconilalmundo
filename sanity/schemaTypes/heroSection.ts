import { defineField, defineType } from 'sanity'

export const heroSectionType = defineType({
  name: 'heroSection',
  title: 'Hero (primera pantalla)',
  type: 'document',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Texto sobre el título',
      type: 'string',
      initialValue: 'Viajes acompañados · Desde 2004',
    }),
    defineField({
      name: 'heading',
      title: 'Título (parte normal)',
      type: 'string',
      initialValue: 'De Conil',
      description: 'Se muestra en blanco, sin cursiva',
    }),
    defineField({
      name: 'headingEmphasis',
      title: 'Título (parte en cursiva dorada)',
      type: 'string',
      initialValue: 'al mundo',
      description: 'Se muestra en cursiva con color dorado',
    }),
    defineField({
      name: 'lede',
      title: 'Párrafo introductorio',
      type: 'text',
      rows: 3,
      initialValue:
        'Experiencias únicas para descubrir el planeta acompañado, seguro y disfrutando desde el primer momento. Más de 58 países recorridos y cada destino vivido antes de recomendarlo.',
    }),
    defineField({
      name: 'ctaText',
      title: 'Texto del botón principal',
      type: 'string',
      initialValue: 'Ver próximos viajes',
    }),
    defineField({
      name: 'ghostCtaText',
      title: 'Texto del enlace secundario',
      type: 'string',
      initialValue: 'Conoce nuestra historia',
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Imagen de fondo del hero',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', title: 'Texto alternativo', type: 'string' }),
      ],
    }),
    defineField({
      name: 'metaLine',
      title: 'Texto de localización (abajo a la izquierda)',
      type: 'string',
      initialValue: 'Conil de la Frontera · Cádiz · Madrid',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Sección Hero' }
    },
  },
})
