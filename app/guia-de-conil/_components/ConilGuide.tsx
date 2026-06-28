import type { GuideSection as GuideSectionType } from "@/types";
import CategoryBar from "./CategoryBar";
import GuideSection from "./GuideSection";
import styles from "./ConilGuide.module.css";

interface ConilGuideProps {
  sections: GuideSectionType[];
}

/**
 * The guide body: a sticky category bar derived from the sections plus the
 * rendered sections themselves. The site shell (nav, hero, footer, WhatsApp
 * FAB) is provided by the page. The category bar sticks below the site nav via
 * the `--guide-catbar-top` variable set on `.root`.
 */
export default function ConilGuide({ sections }: ConilGuideProps) {
  const cats = sections.map((s) => ({ anchor: s.anchor, label: s.navLabel }));

  // Several sections may share the same `anchor`. The first one keeps the bare
  // anchor as its id (that's what the deduped category bar links to and what
  // the scroll-spy observes); later duplicates get a unique suffix so the
  // rendered ids stay valid and unique.
  const seen = new Map<string, number>();
  const sectionIds = sections.map((s) => {
    const n = seen.get(s.anchor) ?? 0;
    seen.set(s.anchor, n + 1);
    return n === 0 ? s.anchor : `${s.anchor}-${n + 1}`;
  });

  return (
    <div className={styles.root}>
      <CategoryBar cats={cats} />
      {sections.map((section, i) => (
        <GuideSection key={section._key} section={section} id={sectionIds[i]} />
      ))}
    </div>
  );
}
