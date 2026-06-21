"use client";

import { useEffect, useRef } from "react";
import { useScrollSpy, useStuck } from "./useScrollSpy";
import styles from "./ConilGuide.module.css";

export interface CatBarItem {
  anchor: string;
  label: string;
}

/**
 * Sticky category bar. Highlights the section in view (scroll-spy) and keeps
 * the active pill scrolled into the horizontal viewport. Client-only because
 * it relies on IntersectionObserver + scroll position.
 */
export default function CategoryBar({ cats }: { cats: CatBarItem[] }) {
  const barRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  const filteredCats = cats.filter(
    (c, i, arr) =>
      c.anchor && c.label && arr.findIndex((x) => x.anchor === c.anchor) === i,
  );

  const anchors = filteredCats.map((c) => c.anchor);
  const active = useScrollSpy(anchors);
  const stuck = useStuck(barRef);

  // keep the active pill within the horizontal scroller
  useEffect(() => {
    const a = linkRefs.current[active];
    const row = rowRef.current;
    if (!a || !row) return;
    const r = a.getBoundingClientRect();
    const cr = row.getBoundingClientRect();
    if (r.left < cr.left + 40) row.scrollLeft += r.left - cr.left - 40;
    else if (r.right > cr.right - 40) row.scrollLeft += r.right - cr.right + 40;
  }, [active]);

  return (
    <nav
      ref={barRef}
      className={`${styles.catbar} ${stuck ? styles.isStuck : ""}`}
      aria-label="Categorías de la guía"
    >
      <div className={styles.crow} ref={rowRef}>
        {filteredCats.map((c) => (
          <a
            key={c.anchor}
            href={`#${c.anchor}`}
            ref={(el) => {
              linkRefs.current[c.anchor] = el;
            }}
            className={active === c.anchor ? styles.active : ""}
            aria-current={active === c.anchor ? "true" : undefined}
          >
            {c.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
