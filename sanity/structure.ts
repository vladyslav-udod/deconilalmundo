import type { StructureResolver } from "sanity/structure";

// Singleton document types — only one document of each should exist
const singletonTypes = new Set([
  "siteSettings",
  "heroSection",
  "tourSection",
  "travelTypeSection",
  "introSection",
  "aboutSection",
  "testimonialSection",
  "ctaSection",
  "guidePage",
]);

const singletonListItems = [
  { id: "siteSettings", title: "Ajustes del sitio" },
  { id: "heroSection", title: "Hero (primera pantalla)" },
  { id: "tourSection", title: "Próximas salidas — cabecera" },
  { id: "travelTypeSection", title: "Tipos de viaje — cabecera" },
  { id: "introSection", title: "Nuestra forma de viajar" },
  { id: "aboutSection", title: "Sobre nosotros" },
  { id: "testimonialSection", title: "Testimonios — cabecera" },
  { id: "ctaSection", title: "CTA final" },
];

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Contenido")
    .items([
      S.listItem()
        .title("Viajes / Destinos")
        .schemaType("tour")
        .child(S.documentTypeList("tour").title("Viajes")),

      S.listItem()
        .title("Testimonios")
        .schemaType("testimonial")
        .child(S.documentTypeList("testimonial").title("Testimonios")),

      S.listItem()
        .title("Tipos de viaje")
        .schemaType("travelType")
        .child(S.documentTypeList("travelType").title("Tipos de viaje")),

      S.divider(),

      S.listItem()
        .title("Guía de Conil")
        .id("guidePage")
        .child(
          S.document().schemaType("guidePage").documentId("guidePage"),
        ),

      S.divider(),

      S.listItem()
        .title("Configuración de secciones")
        .child(
          S.list()
            .title("Secciones")
            .items(
              singletonListItems.map(({ id, title }) =>
                S.listItem()
                  .title(title)
                  .id(id)
                  .child(S.document().schemaType(id).documentId(id)),
              ),
            ),
        ),

      S.divider(),
    ]);
