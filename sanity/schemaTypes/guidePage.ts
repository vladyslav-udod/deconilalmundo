import { defineArrayMember, defineField, defineType } from 'sanity'

/**
 * Singleton document for /guia-de-conil. Holds an ordered, editable list of
 * sections. Fetched by type in lib/sanity/queries.ts (one document only).
 */
export const guidePageType = defineType({
  name: 'guidePage',
  title: 'Guía de Conil',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título de la página',
      type: 'string',
      initialValue: 'Guía de Conil de la Frontera',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'sections',
      title: 'Secciones',
      type: 'array',
      of: [defineArrayMember({ type: 'guideSection' })],
    }),
  ],
  preview: {
    select: { title: 'title' },
  },
})
