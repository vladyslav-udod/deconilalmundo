import { defineField, defineType } from 'sanity'

export const testimonialType = defineType({
  name: 'testimonial',
  title: 'Testimonio',
  type: 'document',
  fields: [
    defineField({
      name: 'quote',
      title: 'Cita',
      type: 'text',
      rows: 4,
      description: 'Opinión del viajero, tal cual se mostrará entre comillas.',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'authorName',
      title: 'Nombre del viajero',
      type: 'string',
      description: 'Nombre de la persona que deja la opinión.',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'authorInitials',
      title: 'Iniciales (para el avatar)',
      type: 'string',
      description: 'Se muestran en el círculo del avatar. Ej: MC, JR, LP.',
      validation: (r) => r.required().max(3),
    }),
    defineField({
      name: 'trip',
      title: 'Destino del viaje',
      type: 'string',
      description: 'Destino al que viajó. Ej: Japón, Vietnam, Marruecos.',
    }),
    defineField({
      name: 'year',
      title: 'Año',
      type: 'number',
      description: 'Año en que realizó el viaje.',
    }),
    defineField({
      name: 'stars',
      title: 'Valoración (estrellas)',
      type: 'number',
      description: 'Número de estrellas, de 1 a 5.',
      options: {
        list: [1, 2, 3, 4, 5],
        layout: 'radio',
      },
      initialValue: 5,
    }),
    defineField({
      name: 'order',
      title: 'Orden de aparición',
      type: 'number',
      description: 'Posición en el listado. Un número más bajo aparece primero.',
    }),
  ],
  preview: {
    select: {
      title: 'authorName',
      subtitle: 'trip',
    },
    prepare({ title, subtitle }) {
      return { title, subtitle: subtitle ? `Viajó a ${subtitle}` : '' }
    },
  },
})
