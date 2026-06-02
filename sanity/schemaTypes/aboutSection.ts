import { defineField, defineType } from 'sanity'

export const aboutSectionType = defineType({
  name: 'aboutSection',
  title: 'Sección: Sobre nosotros',
  type: 'document',
  fields: [
    defineField({
      name: 'sectionLabel',
      title: 'Etiqueta de sección',
      type: 'string',
      initialValue: 'Sobre nosotros',
    }),
    defineField({
      name: 'heading',
      title: 'Título (parte normal)',
      type: 'string',
      initialValue: 'Más de dos décadas',
    }),
    defineField({
      name: 'headingEmphasis',
      title: 'Título (parte en cursiva/acento)',
      type: 'string',
      initialValue: 'coordinando grupos por el mundo',
    }),
    defineField({
      name: 'body',
      title: 'Párrafos',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'stats',
      title: 'Estadísticas',
      type: 'array',
      of: [
        defineField({
          name: 'stat',
          title: 'Estadística',
          type: 'object',
          fields: [
            defineField({ name: 'value', title: 'Valor', type: 'string' }),
            defineField({ name: 'label', title: 'Etiqueta', type: 'string' }),
          ],
          preview: {
            select: { title: 'value', subtitle: 'label' },
          },
        }),
      ],
      initialValue: [
        { _type: 'stat', _key: '1', value: '2004', label: 'Año de fundación' },
        { _type: 'stat', _key: '2', value: '58+', label: 'Países recorridos' },
        { _type: 'stat', _key: '3', value: '2.400+', label: 'Viajeros acompañados' },
        { _type: 'stat', _key: '4', value: '96%', label: 'Repiten con nosotros' },
      ],
    }),
    defineField({
      name: 'badgeQuote',
      title: 'Cita del badge de imagen',
      type: 'string',
      initialValue: '«Acompañamos a cada grupo de principio a fin.»',
    }),
    defineField({
      name: 'badgeAttribution',
      title: 'Atribución del badge',
      type: 'string',
      initialValue: 'Equipo Halcón Viajes Conil',
    }),
    defineField({
      name: 'image',
      title: 'Imagen de la sección',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', title: 'Texto alternativo', type: 'string' }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Sobre nosotros' }
    },
  },
})
