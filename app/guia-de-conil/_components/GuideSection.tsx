import type { GuideSection as GuideSectionType } from "@/types";
import PlaceCard from "./PlaceCard";
import { IconArrow, IconPin } from "./icons";
import styles from "./ConilGuide.module.css";

/** Wraps the highlighted word in <em> without dangerouslySetInnerHTML. */
function Title({ title, highlight }: { title: string; highlight?: string }) {
  if (!highlight || !title.includes(highlight)) return <>{title}</>;
  const i = title.indexOf(highlight);
  return (
    <>
      {title.slice(0, i)}
      <em>{highlight}</em>
      {title.slice(i + highlight.length)}
    </>
  );
}

const VARIANT_CLASS = {
  plain: "",
  alt: styles.alt,
  dark: styles.dark,
} as const;

export default function GuideSection({
  section,
}: {
  section: GuideSectionType;
}) {
  console.log(section.titleHighlight);

  return (
    <section
      id={section.anchor}
      className={`${styles.guide} ${VARIANT_CLASS[section.variant]}`}
    >
      <div className={styles.wrap}>
        <div className={styles.shead}>
          {section.label && (
            <div className={styles.sectionLabel}>{section.label}</div>
          )}
          <h2 className={styles.display}>
            <Title title={section.title} highlight={section.titleHighlight} />
          </h2>
          {section.description && (
            <p className={styles.sintro}>{section.description}</p>
          )}
          {section.googleMapLink && (
            <a
              className={styles.catMapBtn}
              href={section.googleMapLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconPin className={styles.pin} />
              <span>Ver toda la categoría en el mapa</span>
              <IconArrow className={styles.arr} />
            </a>
          )}
        </div>

        <div className={styles.places}>
          {section.items.map((item) => (
            <PlaceCard key={item._key} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
