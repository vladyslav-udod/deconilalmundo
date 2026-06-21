import Image from "next/image";
import type { GuideItem } from "@/types";
import { IconClock, IconPhone, IconPin } from "./icons";
import styles from "./ConilGuide.module.css";

/**
 * A single card. Server component — purely presentational.
 * Branching mirrors the original: if `when` is set we show a date chip
 * (agenda style); otherwise we show the optional phone + map footer.
 */
export default function PlaceCard({ item }: { item: GuideItem }) {
  const { image } = item;

  return (
    <article className={styles.place}>
      {image?.url && (
        <div className={styles.media}>
          <Image
            src={image.url}
            alt={image.alt ?? item.title}
            fill
            sizes="(max-width: 560px) 100vw, (max-width: 1000px) 50vw, 320px"
            className={styles.mediaImg}
            placeholder={image.lqip ? "blur" : "empty"}
            blurDataURL={image.lqip ?? undefined}
            loading="lazy"
          />
        </div>
      )}

      <div className={styles.body}>
        {item.label && <span className={styles.ptype}>{item.label}</span>}
        <h3 className={styles.cardTitle}>{item.title}</h3>
        {item.description && <p>{item.description}</p>}

        {item.when ? (
          <span className={styles.when}>
            <IconClock />
            <span>{item.when}</span>
          </span>
        ) : (
          (item.phone || item.googleLink) && (
            <div className={styles.cardfoot}>
              {item.phone && (
                <a className={styles.tel} href={`tel:${item.phone}`}>
                  <IconPhone />
                  <span className={styles.u}>{item.phone}</span>
                </a>
              )}
              {item.googleLink && (
                <a
                  className={styles.map}
                  href={item.googleLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IconPin />
                  <span className={styles.u}>Ver en Google Maps</span>
                </a>
              )}
            </div>
          )
        )}
      </div>
    </article>
  );
}
