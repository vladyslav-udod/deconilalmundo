import { defineField, defineType } from "sanity";
import { TRAVEL_TYPES, buildMonthOptions } from "../../lib/taxonomy";

// Month dropdown options generated the same way as the front-end filter:
// current month + the following 6 months, each with its year.
const MONTH_OPTIONS = buildMonthOptions(7).map((m) => ({
  title: m.label,
  value: m.value,
}));

// Predefined travel-type labels from "Seis formas de vivirlo".
const TYPE_OPTIONS = TRAVEL_TYPES.map((t) => ({
  title: t.label,
  value: t.label,
}));

export const tourType = defineType({
  name: "tour",
  title: "Viaje / Destino",
  type: "document",
  groups: [
    { name: "basic", title: "Datos básicos", default: true },
    { name: "detail", title: "Detalle del viaje" },
    { name: "contact", title: "Asesor de contacto" },
  ],
  fields: [
    // ─── Basic info ─────────────────────────────────────────────────────────
    defineField({
      name: "title",
      title: "Destino",
      type: "string",
      group: "basic",
      description: "Nombre del destino. Ej: Japón, Costa Oeste EE.UU.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Subtítulo",
      type: "string",
      group: "basic",
      description: "Texto breve bajo el destino. Ej: Tokio · Kioto · Hakone",
    }),
    defineField({
      name: "slug",
      title: "Identificador (slug)",
      type: "slug",
      group: "basic",
      description:
        'Parte final de la URL del viaje. Pulsa "Generate" para crearlo a partir del destino.',
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "region",
      title: "Región",
      type: "string",
      group: "basic",
      description:
        'Continente o zona del destino. Se usa para filtrar en "Próximas salidas".',
      options: {
        list: [
          { title: "Europa", value: "europa" },
          { title: "América", value: "america" },
          { title: "Asia", value: "asia" },
          { title: "África", value: "africa" },
          { title: "Oriente Medio", value: "oriente" },
          { title: "Oceanía", value: "oceania" },
        ],
        layout: "radio",
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "month",
      title: "Mes de salida",
      type: "string",
      group: "basic",
      description:
        "Mes (con año) de la próxima salida. Las opciones se generan automáticamente: el mes actual y los 6 siguientes.",
      options: {
        list: MONTH_OPTIONS,
        layout: "dropdown",
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "startDate",
      title: "Fecha de inicio",
      type: "date",
      group: "basic",
      description: "Día de salida del viaje.",
      options: { dateFormat: "DD/MM/YYYY" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "endDate",
      title: "Fecha de fin",
      type: "date",
      group: "basic",
      description:
        "Déjala en blanco si la fecha está por confirmar. La duración (días) se calcula automáticamente a partir de las fechas de inicio y fin.",
      options: { dateFormat: "DD/MM/YYYY" },
    }),
    defineField({
      name: "price",
      title: "Precio desde (€)",
      type: "number",
      group: "basic",
      description:
        "Precio por persona desde el que se anuncia el viaje (en euros).",
      validation: (r) => r.required().min(0),
    }),
    defineField({
      name: "image",
      title: "Imagen de la tarjeta",
      type: "image",
      group: "basic",
      description:
        'Imagen que se muestra en la tarjeta del viaje en "Próximas salidas".',
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Texto alternativo",
          type: "string",
          description: "Describe la imagen para accesibilidad y SEO.",
          validation: (r) => r.required(),
        }),
      ],
    }),
    defineField({
      name: "typeTag",
      title: "Tipo de viaje",
      type: "array",
      of: [{ type: "string" }],
      group: "basic",
      description:
        'Una de las "Seis formas de vivirlo". Se muestra en la tarjeta y permite filtrar en "Próximas salidas".',
      options: {
        list: TYPE_OPTIONS,
        layout: "grid",
      },
    }),
    defineField({
      name: "featured",
      title: "Viaje destacado",
      type: "boolean",
      group: "basic",
      description: "Márcalo para resaltar este viaje.",
      initialValue: false,
    }),
    defineField({
      name: "active",
      title: "Visible en la web",
      type: "boolean",
      group: "basic",
      description: "Desactívalo para ocultar el viaje sin borrarlo.",
      initialValue: true,
    }),
    defineField({
      name: "order",
      title: "Orden",
      type: "number",
      group: "basic",
      description:
        "Posición en el listado. Un número más bajo aparece primero.",
    }),

    // ─── Contenido de la página de detalle ───────────────────────────────────
    defineField({
      name: "lead",
      title: "Párrafo introductorio",
      type: "text",
      group: "detail",
      rows: 3,
      description:
        "Texto que aparece debajo del título en la página del viaje.",
    }),
    defineField({
      name: "gallery",
      title: "Galería de fotos",
      type: "array",
      group: "detail",
      description:
        "Las 5 primeras forman la cuadrícula; el resto se ven a pantalla completa.",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Texto alternativo",
              type: "string",
              description: "Describe la foto para accesibilidad y SEO.",
            }),
          ],
        },
      ],
      validation: (r) => r.max(30),
    }),
    defineField({
      name: "itinerary",
      title: "Itinerario día a día",
      type: "array",
      group: "detail",
      description: "Cada jornada del viaje, con su descripción e imagen.",
      of: [
        {
          type: "object",
          title: "Jornada",
          fields: [
            defineField({
              name: "dayLabel",
              title: "Etiqueta del día",
              type: "string",
              description: "Ej: Día 1, Día 2–3, Días 4 a 6.",
            }),
            defineField({
              name: "title",
              title: "Título de la jornada",
              type: "string",
              description: "Ej: Vuelo a Tokio.",
            }),
            defineField({
              name: "tags",
              title: "Etiquetas",
              type: "array",
              of: [{ type: "string" }],
              description:
                "Pequeñas etiquetas bajo el título del día. Ej: Vuelo, Visita guiada.",
            }),
            defineField({
              name: "body",
              title: "Descripción",
              type: "text",
              rows: 4,
              description:
                "La primera línea es la introducción; las siguientes líneas se muestran como lista de puntos.",
            }),
            defineField({
              name: "image",
              title: "Imagen de la jornada",
              type: "image",
              description: "Foto representativa del día.",
              options: { hotspot: true },
              fields: [
                defineField({
                  name: "alt",
                  title: "Texto alternativo",
                  type: "string",
                  description: "Describe la foto para accesibilidad y SEO.",
                }),
              ],
            }),
          ],
          preview: {
            select: { title: "title", subtitle: "dayLabel" },
          },
        },
      ],
    }),
    defineField({
      name: "includes",
      title: "Qué incluye el viaje",
      type: "array",
      group: "detail",
      description: "Un punto por línea. Ej: Vuelos, hoteles, guía acompañante…",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "excludes",
      title: "Qué NO incluye el viaje",
      type: "array",
      group: "detail",
      description:
        "Un punto por línea. Ej: Tasas aéreas, comidas no indicadas…",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "importantInfo",
      title: "Información importante",
      type: "array",
      group: "detail",
      description:
        "Un punto por línea. Aquí puedes destacar información relevante que no encaje en los apartados anteriores",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "departures",
      title: "Fechas de salida con disponibilidad",
      type: "array",
      group: "detail",
      description:
        'Salidas concretas que se muestran en la tabla "Elige tu fecha".',
      of: [
        {
          type: "object",
          title: "Salida",
          fields: [
            defineField({
              name: "date",
              title: "Fecha de salida",
              type: "date",
              description: "Día de salida.",
              options: { dateFormat: "DD/MM/YYYY" },
            }),
            defineField({
              name: "availability",
              title: "Disponibilidad",
              type: "string",
              description: "Estado de las plazas de esta salida.",
              options: {
                list: [
                  { title: "Disponible", value: "available" },
                  { title: "Últimas plazas", value: "last_spots" },
                  { title: "Completo", value: "full" },
                ],
                layout: "radio",
              },
              initialValue: "available",
            }),
            defineField({
              name: "price",
              title: "Precio (€)",
              type: "number",
              description: "Precio por persona de esta salida.",
            }),
          ],
          preview: {
            select: { title: "date", subtitle: "availability" },
          },
        },
      ],
    }),
    defineField({
      name: "flights",
      title: "Vuelos (ida y vuelta)",
      type: "array",
      group: "detail",
      description: "Datos orientativos de los vuelos de ida y vuelta.",
      of: [
        {
          type: "object",
          title: "Vuelo",
          fields: [
            defineField({
              name: "direction",
              title: "Trayecto",
              type: "string",
              description: "Indica si es el vuelo de ida o el de vuelta.",
              options: {
                list: [
                  { title: "Ida", value: "outbound" },
                  { title: "Vuelta", value: "return" },
                ],
                layout: "radio",
              },
              initialValue: "outbound",
            }),
            defineField({
              name: "airline",
              title: "Aerolínea",
              type: "string",
              description: "Ej: Iberia, Turkish Airlines.",
            }),
            defineField({
              name: "flightNumber",
              title: "Número de vuelo",
              type: "string",
              description: "Ej: IB6845.",
            }),
            defineField({
              name: "fromCode",
              title: "Código del aeropuerto de origen",
              type: "string",
              description: "Ej: MAD.",
            }),
            defineField({
              name: "fromCity",
              title: "Ciudad de origen",
              type: "string",
              description: "Ej: Madrid.",
            }),
            defineField({
              name: "toCode",
              title: "Código del aeropuerto de destino",
              type: "string",
              description: "Ej: HAN.",
            }),
            defineField({
              name: "toCity",
              title: "Ciudad de destino",
              type: "string",
              description: "Ej: Hanói.",
            }),
            defineField({
              name: "departTime",
              title: "Hora de salida",
              type: "string",
              description: "Ej: 10:30.",
            }),
            defineField({
              name: "arriveTime",
              title: "Hora de llegada",
              type: "string",
              description: "Ej: 06:15 (+1).",
            }),
            defineField({
              name: "duration",
              title: "Duración del vuelo",
              type: "string",
              description: "Ej: 12h 45m.",
            }),
            defineField({
              name: "stops",
              title: "Escalas",
              type: "string",
              description: "Ej: Directo, 1 escala en Doha.",
            }),
          ],
          preview: {
            select: {
              direction: "direction",
              airline: "airline",
              flightNumber: "flightNumber",
              from: "fromCode",
              to: "toCode",
            },
            prepare({ direction, airline, flightNumber, from, to }) {
              const dir = direction === "return" ? "Vuelta" : "Ida";
              return {
                title: `${dir} · ${from ?? "???"} → ${to ?? "???"}`,
                subtitle: [airline, flightNumber].filter(Boolean).join(" · "),
              };
            },
          },
        },
      ],
    }),

    // ─── Asesor/a de contacto ────────────────────────────────────────────────
    defineField({
      name: "contactName",
      title: "Nombre del asesor/a",
      type: "string",
      group: "contact",
      description: "Persona de contacto que aparece en la tarjeta de reserva.",
      initialValue: "ROCÍO TRUJILLO AMAYA",
    }),
    defineField({
      name: "contactRole",
      title: "Cargo",
      type: "string",
      group: "contact",
      description: "Puesto o equipo. Ej: Halcón Viajes · Conil.",
      initialValue: "Halcón Viajes Conil",
    }),
    defineField({
      name: "contactInitials",
      title: "Iniciales (2–3 letras)",
      type: "string",
      group: "contact",
      description:
        "Se muestran en el círculo del avatar cuando no hay foto. Ej: MJ.",
      initialValue: "RT",
      validation: (r) => r.max(3),
    }),
    defineField({
      name: "contactPhone",
      title: "Teléfono del asesor/a",
      type: "string",
      group: "contact",
      description: "Teléfono de contacto para este viaje.",
      initialValue: "+34 667 06 80 85",
    }),
    defineField({
      name: "contactInstagram",
      title: "Usuario de Instagram (sin @)",
      type: "string",
      group: "contact",
      description: "Nombre de usuario de Instagram, sin la arroba.",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "subtitle",
      month: "month",
      price: "price",
      media: "image",
    },
    prepare({ title, subtitle, month, price, media }) {
      return {
        title: `${title} — ${month}`,
        subtitle: `${subtitle ?? ""} · ${price ? `${price.toLocaleString("es-ES")} €` : ""}`,
        media,
      };
    },
  },
  orderings: [
    {
      title: "Mes de salida",
      name: "monthAsc",
      by: [
        { field: "month", direction: "asc" },
        { field: "order", direction: "asc" },
      ],
    },
  ],
});
